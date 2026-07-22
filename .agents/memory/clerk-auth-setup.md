---
name: Clerk Auth Setup for Lavoro8
description: Replit-managed Clerk is fully wired in Lavoro8; userId stored in applications; CSS import order matters with Tailwind v4
---

## Setup complete
- Clerk provisioned via `setupClerkWhitelabelAuth()` — keys auto-set in env
- clerkProxyMiddleware copied to `artifacts/api-server/src/middlewares/`
- `@clerk/express`, `@clerk/shared` installed in api-server
- `@clerk/react`, `@clerk/themes` installed in lavoro8

## CSS import order (Tailwind v4 + Clerk)
Google Fonts `@import url(...)` MUST come FIRST before `@layer` and `@import 'tailwindcss'`.
Wrong order causes postcss error: "@import must precede all other statements".

Correct order in index.css:
1. `@import url('https://fonts...')` ← FIRST
2. `@layer theme, base, clerk, components, utilities;`
3. `@import "tailwindcss";`
4. `@import "tw-animate-css";`

## Custom domain blank white screen (production)
When a custom domain is connected, Replit-managed Clerk issues a `pk_live_...` key bound to that domain (decode base64 body to see the target host, e.g. `clerk.<domain>`). If Clerk's own subdomains (`clerk.<domain>`, `accounts.<domain>`) don't have a working SSL cert yet, the Clerk JS SDK fails to load and the React app crashes to a blank white screen — on BOTH the custom domain AND the default `.replit.app` domain, since production always loads Clerk assets from the custom domain's Clerk subdomains once one is configured.
**Why:** the production pk_live key is domain-bound; it's not a per-origin fallback — every production origin depends on the same Clerk subdomain certs.
**How to apply:** diagnose with `curl -v https://clerk.<domain>/` — a TLS handshake failure (not DNS failure) confirms this. DNS/CNAME records can be fully correct (verify in Domains panel DNS Records table) while the cert still isn't issued. Disconnect/reconnect the domain and republishing are the only self-serve options; if those don't fix it within ~24h, it requires Replit Support (agent cannot force cert issuance).

## DB schema
`applicationsTable` has optional `userId: text("user_id")` column — populated server-side from `getAuth(req).userId` when user is logged in.

## Routes
- `/api/my-applications` — requires auth (getAuth), returns joined applications+jobs for current user
- `/api/jobs/:id/apply` — optionally attaches userId from Clerk session

**Why:** Phone/SMS login is NOT supported by Replit-managed Clerk. Email + Google SSO only.
