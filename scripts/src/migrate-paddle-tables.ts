import pg from "pg";

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  await client.connect();
  console.log("⏳ Creating paddle_customers and paddle_subscriptions tables...");

  await client.query(`
    CREATE TABLE IF NOT EXISTS paddle_customers (
      customer_id TEXT PRIMARY KEY,
      user_id     TEXT,
      email       TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS paddle_customers_email_idx ON paddle_customers(email);
    CREATE INDEX IF NOT EXISTS paddle_customers_user_id_idx ON paddle_customers(user_id);

    CREATE TABLE IF NOT EXISTS paddle_subscriptions (
      subscription_id     TEXT PRIMARY KEY,
      customer_id         TEXT NOT NULL REFERENCES paddle_customers(customer_id),
      subscription_status TEXT NOT NULL,
      price_id            TEXT NOT NULL,
      product_id          TEXT NOT NULL,
      scheduled_change    TIMESTAMPTZ,
      created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS paddle_subs_customer_idx ON paddle_subscriptions(customer_id);
    CREATE INDEX IF NOT EXISTS paddle_subs_status_idx ON paddle_subscriptions(subscription_status);
  `);

  console.log("✅ Tables created.");
  await client.end();
}

migrate().catch((e) => { console.error("❌", e.message); process.exit(1); });
