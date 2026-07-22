import { Environment, Paddle } from "@paddle/paddle-node-sdk";

const paddle = new Paddle(process.env.PADDLE_API_KEY!, { environment: Environment.production });

async function check() {
  const prods = await paddle.products.list();
  for await (const p of prods) {
    console.log("PRODUCT:", p.id, p.name, p.status);
  }
  const prices = await paddle.prices.list();
  for await (const p of prices) {
    console.log("PRICE:", p.id, p.status, p.unitPrice?.amount, p.billingCycle?.interval);
  }
}

check().catch((e) => { console.error("❌", e.message ?? e); process.exit(1); });
