---
name: lavoro8 i18n full sweep completed
description: Status and pattern used to finish translating all hardcoded Italian text across lavoro8 into the it/en i18n keys (other 21 langs fall back to en).
---

All hardcoded Italian strings across public-facing pages/components were converted to `tr()` calls backed by keys added to both the `it` and `en` blocks in `i18n.ts` (the app's fallback chain means other 21 languages automatically fall back to `en` until translated).

Covered in the final sweep: publish-job.tsx, job-detail.tsx, blog-post.tsx, pricing.tsx, for-companies.tsx, profile.tsx, termini.tsx (Terms of Service), privacy.tsx (Privacy Policy). Homepage category section and most components were already using tr().

**Why:** legal pages (termini/privacy) were initially deprioritized as "large scope, need user decision," but on reflection they follow the exact same it/en-with-fallback convention as the rest of the site, so no separate scope decision was actually needed — just apply the established pattern.

**How to apply:** when asked to "finish" or "fully translate" the site, grep all of `src/pages` and `src/components` for Italian sentence patterns (e.g. regex for common Italian prepositions inside string literals) to find remaining hardcoded text — don't assume large pages are out of scope by default.

Left untranslated intentionally: `admin.tsx` — registered as a route (`/admin`) but not linked from any user-facing nav; internal management tool, not a public page.
