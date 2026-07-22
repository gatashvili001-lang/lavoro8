import { Router } from "express";
import { db, reviewsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router = Router();

router.get("/reviews", async (_req, res) => {
  const reviews = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.approved, true))
    .orderBy(sql`created_at desc`);
  res.json(reviews.map(r => ({ ...r, createdAt: r.createdAt.toISOString() })));
});

router.post("/reviews", async (req, res) => {
  const { name, rating, body } = req.body;
  if (!name || !rating || !body) return res.status(400).json({ error: "Missing fields" });
  if (rating < 1 || rating > 5) return res.status(400).json({ error: "Rating must be 1-5" });

  const [review] = await db
    .insert(reviewsTable)
    .values({ name, rating: Number(rating), body, approved: false })
    .returning();
  res.status(201).json({ ...review, createdAt: review.createdAt.toISOString() });
});

router.get("/admin/reviews", async (_req, res) => {
  const reviews = await db
    .select()
    .from(reviewsTable)
    .orderBy(sql`created_at desc`);
  res.json(reviews.map(r => ({ ...r, createdAt: r.createdAt.toISOString() })));
});

router.post("/admin/reviews/:id/approve", async (req, res) => {
  const id = Number(req.params.id);
  const [review] = await db
    .update(reviewsTable)
    .set({ approved: true })
    .where(eq(reviewsTable.id, id))
    .returning();
  if (!review) return res.status(404).json({ error: "Not found" });
  res.json({ ...review, createdAt: review.createdAt.toISOString() });
});

router.delete("/admin/reviews/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(reviewsTable).where(eq(reviewsTable.id, id));
  res.status(204).send();
});

export default router;
