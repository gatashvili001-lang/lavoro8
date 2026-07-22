import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobsTable } from "../../lib/db/src/schema/jobs.js";

const PROD_API = "https://lavoro8.com/api";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function main() {
  const devJobs = await db.select().from(jobsTable);
  console.log(`Dev jobs: ${devJobs.length}`);

  const res = await fetch(`${PROD_API}/jobs`);
  if (!res.ok) throw new Error(`Failed to fetch prod jobs: ${res.status}`);
  const prodJobs = (await res.json()) as any[];
  const prodKeys = new Set(prodJobs.map(j => `${j.title}|${j.city}|${j.country}`));
  console.log(`Prod jobs: ${prodJobs.length}`);

  const toPush = devJobs.filter(j => !prodKeys.has(`${j.title}|${j.city}|${j.country}`));
  console.log(`To push: ${toPush.length}`);

  let ok = 0, fail = 0;
  for (const j of toPush) {
    const body = {
      title: j.title,
      city: j.city,
      country: j.country ?? undefined,
      category: j.category,
      salaryMin: j.salaryMin,
      salaryMax: j.salaryMax,
      description: j.description,
      company: j.company ?? undefined,
      contractType: j.contractType ?? undefined,
      featured: j.featured,
    };
    const r = await fetch(`${PROD_API}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) { ok++; } else { fail++; console.error(`  ✗ ${j.title} (${j.city}) → ${r.status}`); }
    if ((ok + fail) % 25 === 0) console.log(`  ... ${ok + fail}/${toPush.length}`);
  }
  console.log(`✅ Pushed ${ok} jobs to production (${fail} failed).`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((e) => { console.error("❌", e.message); process.exit(1); });
