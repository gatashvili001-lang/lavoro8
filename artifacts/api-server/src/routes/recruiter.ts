import { Router } from "express";
import { db, jobsTable, applicationsTable, applicationMessagesTable } from "@workspace/db";
import { eq, sql, and } from "drizzle-orm";
import { getAuth } from "@clerk/express";

const router = Router();

router.get("/recruiter/jobs", async (req, res) => {
  const auth = getAuth(req);
  const userId = auth?.userId;
  if (!userId) {
    res.status(401).json({ error: "Accesso negato. Effettua il login." });
    return;
  }

  const jobs = await db
    .select({
      id: jobsTable.id,
      title: jobsTable.title,
      company: jobsTable.company,
      city: jobsTable.city,
      country: jobsTable.country,
      category: jobsTable.category,
      contractType: jobsTable.contractType,
      createdAt: jobsTable.createdAt,
      applicationCount: sql<number>`(
        SELECT COUNT(*) FROM applications WHERE applications.job_id = ${jobsTable.id}
      )`.mapWith(Number),
      newCount: sql<number>`(
        SELECT COUNT(*) FROM applications WHERE applications.job_id = ${jobsTable.id} AND applications.status = 'pending'
      )`.mapWith(Number),
    })
    .from(jobsTable)
    .where(eq(jobsTable.userId, userId))
    .orderBy(sql`${jobsTable.createdAt} desc`);

  res.json(jobs.map(j => ({ ...j, createdAt: j.createdAt?.toISOString() ?? null })));
});

router.get("/recruiter/jobs/:jobId/applications", async (req, res) => {
  const auth = getAuth(req);
  const userId = auth?.userId;
  if (!userId) {
    res.status(401).json({ error: "Accesso negato." });
    return;
  }

  const jobId = Number(req.params.jobId);
  if (!jobId) {
    res.status(400).json({ error: "ID non valido" });
    return;
  }

  const [job] = await db.select().from(jobsTable).where(
    and(eq(jobsTable.id, jobId), eq(jobsTable.userId, userId))
  );
  if (!job) {
    res.status(403).json({ error: "Non autorizzato o offerta non trovata" });
    return;
  }

  const applications = await db
    .select()
    .from(applicationsTable)
    .where(eq(applicationsTable.jobId, jobId))
    .orderBy(sql`${applicationsTable.createdAt} desc`);

  if (applications.some(a => a.status === "pending")) {
    await db
      .update(applicationsTable)
      .set({ status: "viewed" })
      .where(and(eq(applicationsTable.jobId, jobId), eq(applicationsTable.status, "pending")));
  }

  res.json(applications.map(a => ({ ...a, createdAt: a.createdAt.toISOString() })));
});

router.get("/recruiter/applications/:id/messages", async (req, res) => {
  const auth = getAuth(req);
  const userId = auth?.userId;
  if (!userId) { res.status(401).json({ error: "Accesso negato." }); return; }

  const id = Number(req.params.id);
  if (!id) { res.status(400).json({ error: "ID non valido" }); return; }

  const [application] = await db.select().from(applicationsTable).where(eq(applicationsTable.id, id));
  if (!application) { res.status(404).json({ error: "Non trovato" }); return; }

  const [job] = await db.select().from(jobsTable).where(
    and(eq(jobsTable.id, application.jobId!), eq(jobsTable.userId, userId))
  );
  if (!job) { res.status(403).json({ error: "Non autorizzato" }); return; }

  if (application.status === "pending") {
    await db.update(applicationsTable).set({ status: "viewed" }).where(eq(applicationsTable.id, id));
  }

  const messages = await db
    .select()
    .from(applicationMessagesTable)
    .where(eq(applicationMessagesTable.applicationId, id))
    .orderBy(applicationMessagesTable.createdAt);

  res.json({
    application: { ...application, createdAt: application.createdAt.toISOString() },
    messages: messages.map(m => ({ ...m, createdAt: m.createdAt.toISOString() })),
  });
});

router.post("/recruiter/applications/:id/messages", async (req, res) => {
  const auth = getAuth(req);
  const userId = auth?.userId;
  if (!userId) { res.status(401).json({ error: "Accesso negato." }); return; }

  const id = Number(req.params.id);
  if (!id) { res.status(400).json({ error: "ID non valido" }); return; }

  const [application] = await db.select().from(applicationsTable).where(eq(applicationsTable.id, id));
  if (!application) { res.status(404).json({ error: "Non trovato" }); return; }

  const [job] = await db.select().from(jobsTable).where(
    and(eq(jobsTable.id, application.jobId!), eq(jobsTable.userId, userId))
  );
  if (!job) { res.status(403).json({ error: "Non autorizzato" }); return; }

  const { text } = req.body;
  if (!text || typeof text !== "string") { res.status(400).json({ error: "Testo obbligatorio" }); return; }

  const [msg] = await db
    .insert(applicationMessagesTable)
    .values({ applicationId: id, senderType: "admin", text })
    .returning();

  await db.update(applicationsTable).set({ status: "replied" }).where(eq(applicationsTable.id, id));

  res.status(201).json({ ...msg, createdAt: msg.createdAt.toISOString() });
});

export default router;
