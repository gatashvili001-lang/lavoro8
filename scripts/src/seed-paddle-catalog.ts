import { Environment, Paddle } from "@paddle/paddle-node-sdk";

const paddle = new Paddle(process.env.PADDLE_API_KEY!, {
  environment: Environment.production,
});

async function seed() {
  console.log("🚀 Creating Paddle catalog for lavoro8.com...\n");

  // ── Product 1: Employer Premium ──
  const employer = await paddle.products.create({
    name: "Employer Premium",
    taxCategory: "saas",
    description: "Post unlimited jobs on lavoro8.com — visible in 23 languages across Europe.",
  });
  console.log(`✓ Product: Employer Premium → ${employer.id}`);

  const empMonthly = await paddle.prices.create({
    productId: employer.id,
    description: "Employer Premium Monthly",
    unitPrice: { amount: "700", currencyCode: "EUR" },
    billingCycle: { interval: "month", frequency: 1 },
    unitPriceOverrides: [
      { countryCodes: ["GB"], unitPrice: { amount: "600", currencyCode: "GBP" } },
      { countryCodes: ["AU"], unitPrice: { amount: "1200", currencyCode: "AUD" } },
    ],
  });
  console.log(`  ✓ Price: €7/month → ${empMonthly.id}`);

  const empYearly = await paddle.prices.create({
    productId: employer.id,
    description: "Employer Premium Yearly",
    unitPrice: { amount: "6000", currencyCode: "EUR" },
    billingCycle: { interval: "year", frequency: 1 },
    unitPriceOverrides: [
      { countryCodes: ["GB"], unitPrice: { amount: "5000", currencyCode: "GBP" } },
      { countryCodes: ["AU"], unitPrice: { amount: "9500", currencyCode: "AUD" } },
    ],
  });
  console.log(`  ✓ Price: €60/year → ${empYearly.id}`);

  // ── Product 2: Job Seeker Alerts ──
  const seeker = await paddle.products.create({
    name: "Job Seeker Alerts",
    taxCategory: "saas",
    description: "Get instant email alerts for new job postings matching your profile.",
  });
  console.log(`\n✓ Product: Job Seeker Alerts → ${seeker.id}`);

  const seekMonthly = await paddle.prices.create({
    productId: seeker.id,
    description: "Job Seeker Alerts Monthly",
    unitPrice: { amount: "300", currencyCode: "EUR" },
    billingCycle: { interval: "month", frequency: 1 },
    unitPriceOverrides: [
      { countryCodes: ["GB"], unitPrice: { amount: "250", currencyCode: "GBP" } },
      { countryCodes: ["AU"], unitPrice: { amount: "500", currencyCode: "AUD" } },
    ],
  });
  console.log(`  ✓ Price: €3/month → ${seekMonthly.id}`);

  console.log("\n✅ Catalog created! IDs:\n");
  console.log(JSON.stringify({
    employer_premium: {
      product_id: employer.id,
      monthly_price_id: empMonthly.id,
      yearly_price_id: empYearly.id,
    },
    job_seeker_alerts: {
      product_id: seeker.id,
      monthly_price_id: seekMonthly.id,
    },
  }, null, 2));
}

seed().catch((e) => {
  console.error("❌", e.message ?? e);
  process.exit(1);
});
