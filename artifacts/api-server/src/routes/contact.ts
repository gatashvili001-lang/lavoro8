import { Router } from "express";
import { db, contactMessagesTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { CreateContactMessageBody } from "@workspace/api-zod";

const router = Router();

router.post("/contact", async (req, res) => {
  const parsed = CreateContactMessageBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Dati non validi" });
  }

  const [contactMessage] = await db
    .insert(contactMessagesTable)
    .values(parsed.data)
    .returning();

  res.status(201).json({ ...contactMessage, createdAt: contactMessage.createdAt.toISOString() });
});

router.get("/admin/contact-messages", async (_req, res) => {
  const messages = await db
    .select()
    .from(contactMessagesTable)
    .orderBy(sql`created_at desc`);

  res.json(messages.map(m => ({ ...m, createdAt: m.createdAt.toISOString() })));
});

export default router;
