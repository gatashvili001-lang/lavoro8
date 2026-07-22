import { getStripeClient } from './stripeClient';
import { db } from '@workspace/db';
import { sql } from 'drizzle-orm';

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string): Promise<void> {
    const stripe = getStripeClient();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET not set");

    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const userId = session.client_reference_id;
        const customerId = session.customer;
        const subscriptionId = session.subscription;
        if (userId && customerId) {
          await db.execute(sql`
            INSERT INTO users (id, email, stripe_customer_id, stripe_subscription_id)
            VALUES (${userId}, ${session.customer_details?.email ?? ''}, ${customerId}, ${subscriptionId ?? null})
            ON CONFLICT (id) DO UPDATE SET
              stripe_customer_id = EXCLUDED.stripe_customer_id,
              stripe_subscription_id = EXCLUDED.stripe_subscription_id
          `);
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as any;
        await db.execute(sql`
          UPDATE users SET stripe_subscription_id = NULL
          WHERE stripe_customer_id = ${sub.customer}
        `);
        break;
      }
      default:
        break;
    }
  }
}
