---
name: lavoro8 contact form and job alerts backend
description: Contact form persistence pattern and job-alerts feature status in lavoro8
---
The contact page previously used a `mailto:` link (unreliable, no record kept). It now POSTs to `/api/contact`, which inserts into a `contact_messages` table, visible in the admin dashboard's "Messages" tab. Follow the same pattern (Drizzle table in `lib/db/src/schema/jobs.ts`, endpoint in `lib/api-spec/openapi.yaml`, route in `artifacts/api-server/src/routes/`, orval codegen) for any other form that currently just does `mailto:`.

A `job_alerts` table and `/job-alerts` endpoint already exist and are used by the newsletter signup on the homepage — but when a featured job is created, matching alerts are only logged to console (`console.log("📣 Featured job matched...")`), no actual email is sent. If asked to make job alerts "actually notify" subscribers, this is the gap to fill (needs an email-sending integration, e.g. Resend — none is configured yet).

**Why:** avoids re-diagnosing "does lavoro8 send emails" from scratch — it doesn't, contact form used to be client-side mailto and job alerts are stored but not delivered.
