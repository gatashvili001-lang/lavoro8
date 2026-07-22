import { Router } from "express";
import { getAuth } from "@clerk/express";
import { getPaddleClient, PRICE_IDS } from "../paddleClient.js";
import { EventName } from "@paddle/paddle-node-sdk";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router = Router();

// ── GET /paddle/prices — return price IDs + amounts for frontend ──
router.get("/paddle/prices", (_req, res) => {
  res.json({
    employer: {
      monthly: { priceId: PRICE_IDS.employer_monthly, amount: 700, currency: "EUR", interval: "month" },
      yearly:  { priceId: PRICE_IDS.employer_yearly,  amount: 6000, currency: "EUR", interval: "year" },
    },
    seeker: {
      monthly: { priceId: PRICE_IDS.seeker_monthly, amount: 300, currency: "EUR", interval: "month" },
    },
  });
});

// ── GET /paddle/subscription — check if current user has active subscription ──
router.get("/paddle/subscription", async (req, res) => {
  try {
    const auth = getAuth(req);
    const userId = auth?.userId;
    if (!userId) return res.json({ active: false, subscription: null });

    const result = await db.execute(sql`
      SELECT ps.* FROM paddle_subscriptions ps
      JOIN paddle_customers pc ON pc.customer_id = ps.customer_id
      WHERE pc.user_id = ${userId}
      AND ps.subscription_status IN ('active', 'trialing')
      ORDER BY ps.created_at DESC LIMIT 1
    `);

    if (!result.rows.length) return res.json({ active: false, subscription: null });
    res.json({ active: true, subscription: result.rows[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /paddle/webhook — receive Paddle events ──
router.post("/paddle/webhook", async (req, res) => {
  const paddle = getPaddleClient();
  const signature = req.headers["paddle-signature"] as string;
  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET ?? "";

  let event: any;
  try {
    const rawBody = (req as any).rawBody ?? JSON.stringify(req.body);
    event = await paddle.webhooks.unmarshal(rawBody, webhookSecret, signature);
  } catch (err: any) {
    console.error("[Paddle webhook] signature error:", err.message);
    return res.status(400).json({ error: "Invalid signature" });
  }

  try {
    switch (event.eventType) {
      case EventName.CustomerCreated:
      case EventName.CustomerUpdated: {
        const c = event.data;
        await db.execute(sql`
          INSERT INTO paddle_customers (customer_id, email, updated_at)
          VALUES (${c.id}, ${c.email}, NOW())
          ON CONFLICT (customer_id) DO UPDATE
            SET email = EXCLUDED.email, updated_at = NOW()
        `);
        break;
      }
      case EventName.SubscriptionCreated:
      case EventName.SubscriptionUpdated: {
        const s = event.data;
        const priceId = s.items?.[0]?.price?.id ?? "";
        const productId = s.items?.[0]?.price?.productId ?? "";
        await db.execute(sql`
          INSERT INTO paddle_subscriptions (subscription_id, customer_id, subscription_status, price_id, product_id, updated_at)
          VALUES (${s.id}, ${s.customerId}, ${s.status}, ${priceId}, ${productId}, NOW())
          ON CONFLICT (subscription_id) DO UPDATE
            SET subscription_status = EXCLUDED.subscription_status,
                price_id = EXCLUDED.price_id,
                product_id = EXCLUDED.product_id,
                updated_at = NOW()
        `);
        break;
      }
      case EventName.SubscriptionCanceled: {
        const s = event.data;
        await db.execute(sql`
          UPDATE paddle_subscriptions SET subscription_status = 'canceled', updated_at = NOW()
          WHERE subscription_id = ${s.id}
        `);
        break;
      }
    }
    res.json({ ok: true });
  } catch (err: any) {
    console.error("[Paddle webhook] processing error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
