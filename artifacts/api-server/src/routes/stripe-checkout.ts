import { Router } from "express";
import { getAuth } from "@clerk/express";
import Stripe from "stripe";

const router = Router();

const PRICE_IDS = {
  employer_monthly: process.env.STRIPE_EMPLOYER_MONTHLY_PRICE_ID ?? "price_1TviAhChOKMXwALBZQds7Bkr",
  employer_yearly:  process.env.STRIPE_EMPLOYER_YEARLY_PRICE_ID  ?? "price_1TviAhChOKMXwALB21KUj9ON",
  seeker_monthly:   process.env.STRIPE_SEEKER_MONTHLY_PRICE_ID   ?? "price_1TviAhChOKMXwALBmP2bUbPn",
};

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  return new Stripe(key);
}

// POST /stripe-checkout/session
router.post("/stripe-checkout/session", async (req, res) => {
  try {
    const { plan } = req.body as { plan: "employer_monthly" | "employer_yearly" | "seeker_monthly" };
    const auth = getAuth(req);
    const priceId = PRICE_IDS[plan];
    if (!priceId) return res.status(400).json({ error: "Invalid plan" });

    const stripe = getStripe();
    const origin = req.headers.origin ?? "https://lavoro8.com";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${origin}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      ...(auth?.userId ? { client_reference_id: auth.userId } : {}),
    });

    res.json({ url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
