import Stripe from 'stripe';

export function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  return new Stripe(key);
}

export async function getUncachableStripeClient(): Promise<Stripe> {
  return getStripeClient();
}
