import { Router } from "express";
import { getAuth } from "@clerk/express";
import { getStripeClient } from "../stripeClient";
import { db } from '@workspace/db';
import { sql } from 'drizzle-orm';

const router = Router();

router.get("/stripe/products", async (_req, res) => {
  try {
    const stripe = getStripeClient();
    const prices = await stripe.prices.list({ active: true, expand: ["data.product"], limit: 20 });
    const map = new Map<string, any>();
    for (const price of prices.data) {
      const prod = price.product as any;
      if (!map.has(prod.id)) {
        map.set(prod.id, { id: prod.id, name: prod.name, description: prod.description, metadata: prod.metadata, prices: [] });
      }
      map.get(prod.id).prices.push({
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
        recurring: price.recurring,
      });
    }
    res.json({ data: Array.from(map.values()) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/stripe/checkout", async (req, res) => {
  try {
    const auth = getAuth(req);
    const userId = auth?.userId;
    const { priceId } = req.body;
    if (!priceId) return res.status(400).json({ error: "priceId required" });

    const stripe = getStripeClient();
    const origin = req.headers.origin ?? "https://lavoro8.com";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      allow_promotion_codes: true,
      ...(userId ? { client_reference_id: userId } : {}),
    });

    res.json({ url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stripe/subscription", async (req, res) => {
  try {
    const auth = getAuth(req);
    const userId = auth?.userId;
    if (!userId) return res.json({ subscription: null, active: false });

    const result = await db.execute(sql`SELECT stripe_subscription_id FROM users WHERE id = ${userId}`);
    const user = result.rows[0] as any;
    if (!user?.stripe_subscription_id) return res.json({ subscription: null, active: false });

    const stripe = getStripeClient();
    const sub = await stripe.subscriptions.retrieve(user.stripe_subscription_id);
    const active = sub.status === "active" || sub.status === "trialing";
    res.json({ subscription: sub, active });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
