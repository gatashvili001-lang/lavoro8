---
name: hreflang + IndexNow setup
description: How lavoro8 implements 23-language hreflang and IndexNow search-engine pings
---

## hreflang (23 languages)
- Languages have no separate routes; `?lang=xx` URL param is the language-distinguishing URL.
- `lang-context.tsx`: reads `?lang=` on load (validated against `t` map), persists to localStorage; `setLang()` also rewrites the URL with `history.replaceState` so the URL stays authoritative.
- `use-seo.ts`: on every page clears old `link[rel=alternate][hreflang]` tags, then (if not noindex) injects x-default + 23 alternates pointing to `?lang=xx`. Canonical/og:url include `?lang=xx` when a valid param is present (self-canonical per language).
- `scripts/prerender.ts` also injects the same hreflang tags into prerendered static HTML (skipped for noindex routes) so crawlers see them without JS.
- **Why:** hreflang requires URL-distinguishable language versions; localStorage-only language is invisible to Google.
- **How to apply:** any new prerendered route automatically gets hreflang; keep `LANGUAGES` in i18n.ts as the single source of language codes.

## IndexNow (Bing/Yandex/Seznam/Naver)
- Key: `1f90e3a8d88c7ca356c5c993c314ace6`, key file at `artifacts/lavoro8/public/<key>.txt` (public by protocol design).
- `artifacts/api-server/src/lib/indexnow.ts` — `pingIndexNow(urls)` fire-and-forget POST to api.indexnow.org; **production-only** (dev logs "[indexnow] skipped").
- Hooked into POST /api/jobs after insert (pings the new job URL).
- Bulk one-time submit: `npx tsx scripts/src/submit-indexnow.ts` — verifies key file is live on lavoro8.com FIRST (fails if site not republished), then submits all sitemap + job URLs. Must run only AFTER the key file is published.

## Build gotcha
- `pnpm run build` in artifacts/lavoro8 requires `PORT` and `BASE_PATH` env vars (vite.config throws otherwise). Locally: `PORT=5000 BASE_PATH=/ pnpm run build`.

## Email alerts status (July 2026)
- User declined Resend connection for now ("no subscribers yet"). job_alerts emails still NOT sent. When ready: Resend connector `connector:ccfg_resend_...` via integrations, hook into POST /jobs matching-alerts block in routes/jobs.ts.
