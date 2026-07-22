---
name: lavoro8 care-category job seeding
description: How to add more Badante/Colf/Baby-sitter listings to lavoro8 without destroying existing data
---
`scripts/src/seed-jobs.ts` is DESTRUCTIVE — it deletes ALL rows in `jobs` before reinserting `ALL_JOBS`. Never re-run it to add a few new listings, or it wipes any employer-submitted jobs (via publish-job form) that aren't in its hardcoded array.

For incremental additions (e.g. filling a category/country gap), write a separate additive script (see `scripts/src/seed-care-jobs.ts`) that only calls `db.insert(jobsTable).values(...)` for the new rows, run via `pnpm --filter @workspace/scripts exec tsx src/<script>.ts` (plain `tsx` binary isn't globally available).

**Why:** Badante/Colf/Baby-sitter categories had only 1/0/0 listings vs 22 for Magazzino — an oversight in the original seed data, not a deliberate choice. Fixed by adding 25 real-style listings (families/agencies, not corporate brands, since these are typically private-hire roles) across IT, DE, FR, ES, PT, AT, CH, GB, IE, NL.

**How to apply:** When asked to grow job content for a specific category/country, check current distribution with `psql "$DATABASE_URL" -c "SELECT category, country, count(*) FROM jobs GROUP BY category, country"` first, then write an additive script rather than touching `seed-jobs.ts`.

**Bulk multi-country seeding:** `scripts/src/seed-bulk-jobs.ts` is the template-driven generator (5 language templates it/en/de/fr/es, others fall back to English; salaries scaled per-country to local currency per format.ts COUNTRY_CURRENCY). It is additive and idempotent — safe to re-run.

**Idempotency gotcha with seeded RNG:** if a deterministic-RNG generator skips work when a record already exists, the RNG stream shifts and every subsequent record differs → reruns insert "new" rows instead of zero. Fix: consume ALL randomness for each record first, then decide skip-vs-insert at the very end. Verified: rerun inserts 0.

## City filter + synonyms (July 2026)
- Jobs DB has mixed city naming (e.g. "Berlin" and "Berlino", "Paris"/"Parigi") — do NOT normalize the DB; the API expands synonyms instead: `artifacts/api-server/src/lib/city-synonyms.ts` → GET /jobs ORs ilike over variants. Add new exonym pairs there when seeding foreign cities.
- Frontend city chips per country live in `artifacts/lavoro8/src/lib/cities.ts` (Italian exonyms as labels); shown when a country is selected in /jobs filter.
- Seed batches so far: seed-care-jobs.ts, seed-italy-jobs.ts (35), seed-jobs-batch3.ts (28) — always additive, then push via push-jobs-to-prod.ts (dedupe title|city|country).
