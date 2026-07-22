import { sql } from 'drizzle-orm';
import { db } from '@workspace/db';

export class StripeStorage {
  async listProductsWithPrices() {
    const result = await db.execute(sql`
      SELECT
        p.id as product_id,
        p.name as product_name,
        p.description as product_description,
        p.active as product_active,
        p.metadata as product_metadata,
        pr.id as price_id,
        pr.unit_amount,
        pr.currency,
        pr.recurring,
        pr.active as price_active
      FROM stripe.products p
      LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
      WHERE p.active = true
      ORDER BY p.id, pr.unit_amount
    `);
    return result.rows;
  }

  async getUser(id: string) {
    const result = await db.execute(sql`SELECT * FROM users WHERE id = ${id}`);
    return result.rows[0] ?? null;
  }

  async upsertUser(id: string, email: string) {
    await db.execute(sql`
      INSERT INTO users (id, email) VALUES (${id}, ${email})
      ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email
    `);
  }

  async updateUserStripeCustomer(userId: string, customerId: string) {
    await db.execute(sql`UPDATE users SET stripe_customer_id = ${customerId} WHERE id = ${userId}`);
  }

  async updateUserSubscription(userId: string, subscriptionId: string) {
    await db.execute(sql`UPDATE users SET stripe_subscription_id = ${subscriptionId} WHERE id = ${userId}`);
  }

  async getSubscription(subscriptionId: string) {
    const result = await db.execute(sql`SELECT * FROM stripe.subscriptions WHERE id = ${subscriptionId}`);
    return result.rows[0] ?? null;
  }
}

export const stripeStorage = new StripeStorage();
