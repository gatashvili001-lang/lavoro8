---
name: SEO landing routes and jobs routing
description: How lavoro8 disambiguates SEO slug landing pages from real job detail pages under /jobs/:id
---

lavoro8 exposes SEO landing pages at `/jobs/:country`, `/jobs/:country/:city`, and combo slugs like `/jobs/driver-germany` or `/jobs/warehouse-netherlands`, all sharing the single-segment `/jobs/:id` route with real job detail pages.

**Why:** Google Ads and SEO need clean, indexable per-country/category URLs, but the app already used `/jobs/:id` for real job postings, so ambiguity had to be resolved at runtime rather than via distinct route prefixes.

**How to apply:** `jobs-router.tsx` inspects the slug via `parseJobsSlug()` (in `seo-slugs.ts`) — if it matches a known country or category-country combo, it renders the shared `JobsLandingContent` component from `jobs-landing.tsx`; otherwise it falls back to rendering the real `JobDetailPage`. Two-segment `/jobs/:country/:city` is a separate wouter route entirely, so no ambiguity there. When adding new countries/categories, only `seo-slugs.ts` needs updating.

## Jobs page URL→state sync (category click-through)
Rule: jobs.tsx filter state must stay synced with the URL query via wouter's `useSearch()` effect (always setting category/country, including when params are absent), guarded by a `selfWrittenQs` ref so the debounced `history.replaceState` writer doesn't fight it.
**Why:** Filters were originally read once in `useState` on mount, so clicking category links (chips, sidebar, footer) while already on /jobs silently did nothing.
**How to apply:** Any new filter param added to /jobs must be added to BOTH the useSearch sync effect and the replaceState writer effect, or links will stop working / state will go stale.
