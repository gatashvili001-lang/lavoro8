import { Router } from "express";
import { db, jobsTable, applicationsTable, jobAlertsTable } from "@workspace/db";
import { eq, ilike, and, or, sql } from "drizzle-orm";
import { getAuth } from "@clerk/express";
import {
  ListJobsQueryParams,
  CreateJobBody,
  GetJobParams,
  DeleteJobParams,
  ApplyToJobParams,
  ApplyToJobBody,
  CreateJobAlertBody,
} from "@workspace/api-zod";
import { pingIndexNow } from "../lib/indexnow";
import { expandCitySynonyms } from "../lib/city-synonyms";

const router = Router();

router.get("/jobs/stats", async (_req, res) => {
  const [totalJobsRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(jobsTable);

  const [totalAppsRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(applicationsTable);

  const jobsByCategory = await db
    .select({
      category: jobsTable.category,
      count: sql<number>`count(*)::int`,
    })
    .from(jobsTable)
    .groupBy(jobsTable.category)
    .orderBy(sql`count(*) desc`);

  const topCities = await db
    .select({
      city: jobsTable.city,
      count: sql<number>`count(*)::int`,
    })
    .from(jobsTable)
    .groupBy(jobsTable.city)
    .orderBy(sql`count(*) desc`)
    .limit(5);

  res.json({
    totalJobs: totalJobsRow.count,
    totalApplications: totalAppsRow.count,
    jobsByCategory,
    topCities,
  });
});

router.get("/jobs", async (req, res) => {
  const parsed = ListJobsQueryParams.safeParse(req.query);
  const filters = parsed.success ? parsed.data : {};

  const conditions = [];
  if (filters.city) {
    const variants = expandCitySynonyms(filters.city);
    const cityConds = variants.map(v => ilike(jobsTable.city, `%${v}%`));
    conditions.push(cityConds.length > 1 ? or(...cityConds)! : cityConds[0]);
  }
  if (filters.category) conditions.push(eq(jobsTable.category, filters.category));
  if (filters.country) conditions.push(eq(jobsTable.country, filters.country));
  if (filters.search) {
    conditions.push(ilike(jobsTable.title, `%${filters.search}%`));
  }

  const jobs = await db
    .select()
    .from(jobsTable)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(sql`featured desc, created_at desc`);

  res.json(jobs.map(j => ({ ...j, createdAt: j.createdAt.toISOString() })));
});

router.post("/jobs", async (req, res) => {
  const parsed = CreateJobBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Dati non validi" });
  }

  const [job] = await db.insert(jobsTable).values(parsed.data).returning();

  void pingIndexNow([`https://lavoro8.com/jobs/${job.id}`]);

  if (job.featured) {
    const alertConditions = [];
    if (job.country) alertConditions.push(eq(jobAlertsTable.country, job.country));
    alertConditions.push(eq(jobAlertsTable.category, job.category));
    const matchingAlerts = await db
      .select()
      .from(jobAlertsTable)
      .where(and(...alertConditions));
    if (matchingAlerts.length > 0) {
      console.log(`📣 Featured job "${job.title}" matched ${matchingAlerts.length} job alert subscriber(s) — notification queued.`);
    }
  }

  res.status(201).json({ ...job, createdAt: job.createdAt.toISOString() });
});

router.post("/job-alerts", async (req, res) => {
  const parsed = CreateJobAlertBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Dati non validi" });
  }

  const [alert] = await db.insert(jobAlertsTable).values(parsed.data).returning();
  res.status(201).json({ ...alert, createdAt: alert.createdAt.toISOString() });
});

router.get("/jobs/:id", async (req, res) => {
  const parsed = GetJobParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) return res.status(400).json({ error: "ID non valido" });

  const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, parsed.data.id));
  if (!job) return res.status(404).json({ error: "Annuncio non trovato" });

  res.json({ ...job, createdAt: job.createdAt.toISOString() });
});

router.delete("/jobs/:id", async (req, res) => {
  const parsed = DeleteJobParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) return res.status(400).json({ error: "ID non valido" });

  await db.delete(jobsTable).where(eq(jobsTable.id, parsed.data.id));
  res.status(204).send();
});

router.post("/jobs/:id/apply", async (req, res) => {
  const paramsParsed = ApplyToJobParams.safeParse({ id: Number(req.params.id) });
  if (!paramsParsed.success) return res.status(400).json({ error: "ID non valido" });

  const bodyParsed = ApplyToJobBody.safeParse(req.body);
  if (!bodyParsed.success) return res.status(400).json({ error: "Dati non validi" });

  const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, paramsParsed.data.id));
  if (!job) return res.status(404).json({ error: "Annuncio non trovato" });

  const auth = getAuth(req);
  const userId = auth?.userId ?? null;
  const cvUrl = typeof req.body.cvUrl === "string" ? req.body.cvUrl : null;

  const [application] = await db
    .insert(applicationsTable)
    .values({ jobId: paramsParsed.data.id, userId, cvUrl, ...bodyParsed.data })
    .returning();

  res.status(201).json({ ...application, createdAt: application.createdAt.toISOString() });
});

export default router;
