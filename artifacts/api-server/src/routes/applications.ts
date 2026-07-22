import { Router } from "express";
import { db, applicationsTable, applicationMessagesTable, jobsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { getAuth } from "@clerk/express";

const router = Router();

router.get("/my-applications", async (req, res) => {
  const auth = getAuth(req);
  const userId = auth?.userId;
  if (!userId) {
    res.status(401).json({ error: "Non autorizzato" });
    return;
  }

  const applications = await db
    .select({
      id: applicationsTable.id,
      jobId: applicationsTable.jobId,
      name: applicationsTable.name,
      email: applicationsTable.email,
      phone: applicationsTable.phone,
      message: applicationsTable.message,
      cvUrl: applicationsTable.cvUrl,
      status: applicationsTable.status,
      createdAt: applicationsTable.createdAt,
      jobTitle: jobsTable.title,
      jobCity: jobsTable.city,
      jobCompany: jobsTable.company,
      jobCategory: jobsTable.category,
      jobCountry: jobsTable.country,
    })
    .from(applicationsTable)
    .leftJoin(jobsTable, eq(applicationsTable.jobId, jobsTable.id))
    .where(eq(applicationsTable.userId, userId))
    .orderBy(sql`${applicationsTable.createdAt} desc`);

  res.json(applications.map(a => ({ ...a, createdAt: a.createdAt.toISOString() })));
});

router.get("/applications/:id/messages", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) { res.status(400).json({ error: "ID non valido" }); return; }

  const auth = getAuth(req);
  const userId = auth?.userId;

  const [application] = await db
    .select()
    .from(applicationsTable)
    .where(eq(applicationsTable.id, id));

  if (!application) { res.status(404).json({ error: "Non trovato" }); return; }

  if (application.userId && application.userId !== userId) {
    res.status(403).json({ error: "Non autorizzato" }); return;
  }

  if (application.status === "pending") {
    await db
      .update(applicationsTable)
      .set({ status: "viewed" })
      .where(eq(applicationsTable.id, id));
  }

  const messages = await db
    .select()
    .from(applicationMessagesTable)
    .where(eq(applicationMessagesTable.applicationId, id))
    .orderBy(applicationMessagesTable.createdAt);

  res.json({ application: { ...application, createdAt: application.createdAt.toISOString() }, messages: messages.map(m => ({ ...m, createdAt: m.createdAt.toISOString() })) });
});

router.post("/applications/:id/messages", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) { res.status(400).json({ error: "ID non valido" }); return; }

  const auth = getAuth(req);
  const userId = auth?.userId;

  const [application] = await db
    .select()
    .from(applicationsTable)
    .where(eq(applicationsTable.id, id));

  if (!application) { res.status(404).json({ error: "Non trovato" }); return; }

  const { text, attachmentUrl, senderType } = req.body;
  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "Testo obbligatorio" }); return;
  }

  const isAdmin = senderType === "admin";
  if (!isAdmin && application.userId && application.userId !== userId) {
    res.status(403).json({ error: "Non autorizzato" }); return;
  }

  const [msg] = await db
    .insert(applicationMessagesTable)
    .values({
      applicationId: id,
      senderType: isAdmin ? "admin" : "applicant",
      text,
      attachmentUrl: attachmentUrl || null,
    })
    .returning();

  if (isAdmin && application.status !== "accepted" && application.status !== "rejected") {
    await db.update(applicationsTable).set({ status: "replied" }).where(eq(applicationsTable.id, id));
  }

  res.status(201).json({ ...msg, createdAt: msg.createdAt.toISOString() });
});

router.patch("/applications/:id/status", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) { res.status(400).json({ error: "ID non valido" }); return; }

  const { status } = req.body;
  const allowed = ["pending", "viewed", "replied", "accepted", "rejected"];
  if (!allowed.includes(status)) {
    res.status(400).json({ error: "Status non valido" }); return;
  }

  const [updated] = await db
    .update(applicationsTable)
    .set({ status })
    .where(eq(applicationsTable.id, id))
    .returning();

  if (!updated) { res.status(404).json({ error: "Non trovato" }); return; }

  res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
});

router.get("/applications", async (_req, res) => {
  const applications = await db
    .select({
      id: applicationsTable.id,
      jobId: applicationsTable.jobId,
      userId: applicationsTable.userId,
      name: applicationsTable.name,
      email: applicationsTable.email,
      phone: applicationsTable.phone,
      message: applicationsTable.message,
      cvUrl: applicationsTable.cvUrl,
      status: applicationsTable.status,
      createdAt: applicationsTable.createdAt,
      jobTitle: jobsTable.title,
      jobCity: jobsTable.city,
      jobCompany: jobsTable.company,
      jobEmail: jobsTable.email,
    })
    .from(applicationsTable)
    .leftJoin(jobsTable, eq(applicationsTable.jobId, jobsTable.id))
    .orderBy(sql`${applicationsTable.createdAt} desc`);

  res.json(applications.map(a => ({ ...a, createdAt: a.createdAt.toISOString() })));
});

export default router;
