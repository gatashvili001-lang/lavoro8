---
name: Stripe Setup
description: How Stripe is configured in lavoro8 — credential field name, migration workaround, product names, live price IDs
---

# Stripe Setup — lavoro8

## Credential field name
Replit's Stripe connector returns `settings.secret` (NOT `settings.secret_key`). The `stripeClient.ts` must read `settings.secret`.

**Why:** The toonSchema for the Stripe connector uses field name `secret`, but the stripe-replit-sync code template uses `secret_key`. This mismatch causes silent failure.

**How to apply:** Any time stripeClient.ts is recreated or modified, use `settings.secret` and `settings.webhook_secret`. stripeClient.ts now prefers STRIPE_SECRET_KEY env var first.

## Migration workaround
`runMigrations()` from stripe-replit-sync does NOT correctly apply all migrations when the schema already exists. The tables end up missing (stripe.accounts etc.), causing `findOrCreateManagedWebhook` to fail.

**Fix:** Run all migration SQL files manually via psql in order:
```bash
for f in $(ls node_modules/stripe-replit-sync/dist/migrations/*.sql | sort); do psql "$DATABASE_URL" -f "$f"; done
```

## Live Stripe products & price IDs (created 2026-07-21)
- Employer Premium Monthly → `price_1TviAhChOKMXwALBZQds7Bkr` (€7/month)
- Employer Premium Yearly  → `price_1TviAhChOKMXwALB21KUj9ON` (€60/year)
- Job Seeker Alerts Monthly→ `price_1TviAhChOKMXwALBmP2bUbPn` (€3/month)

Price IDs also saved as env vars: STRIPE_EMPLOYER_MONTHLY_PRICE_ID, STRIPE_EMPLOYER_YEARLY_PRICE_ID, STRIPE_SEEKER_MONTHLY_PRICE_ID.

## Checkout flow (Stripe Hosted Checkout)
- Paddle was rejected by its AUP for job boards — switched to Stripe hosted checkout
- `POST /api/stripe-checkout/session` → returns `{ url }` → frontend does `window.location.href = url`
- Success redirect: `/premium/success?session_id=...`
- Cancel redirect: `/pricing`
- Route: `artifacts/api-server/src/routes/stripe-checkout.ts`

## Key files
- `artifacts/api-server/src/stripeClient.ts` — credential fetch (env var first, then Replit connector)
- `artifacts/api-server/src/routes/stripe-checkout.ts` — /api/stripe-checkout/session
- `artifacts/api-server/src/routes/stripe.ts` — /api/stripe/products, /checkout, /subscription
- `artifacts/lavoro8/src/pages/pricing.tsx` — Stripe checkout button (monthly/yearly toggle)
- `artifacts/lavoro8/src/components/premium-modal.tsx` — modal checkout (employer/seeker)
- `artifacts/lavoro8/src/pages/premium-success.tsx` — post-checkout success page
- `scripts/src/seed-stripe-live.ts` — created live products (one-time use)
