import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function seed() {
  console.log("🚀 Creating Stripe live catalog...\n");

  // ── Employer Premium ──
  const empProd = await stripe.products.create({
    name: "Employer Premium",
    description: "Post unlimited jobs on lavoro8.com — visible in 23 languages across Europe.",
    metadata: { type: "employer_premium" },
  });
  console.log("✓ Product: Employer Premium →", empProd.id);

  const empMonthly = await stripe.prices.create({
    product: empProd.id,
    unit_amount: 700,
    currency: "eur",
    recurring: { interval: "month" },
    nickname: "Employer Monthly",
  });
  console.log("  ✓ €7/month →", empMonthly.id);

  const empYearly = await stripe.prices.create({
    product: empProd.id,
    unit_amount: 6000,
    currency: "eur",
    recurring: { interval: "year" },
    nickname: "Employer Yearly",
  });
  console.log("  ✓ €60/year →", empYearly.id);

  // ── Job Seeker Alerts ──
  const seekProd = await stripe.products.create({
    name: "Job Seeker Alerts",
    description: "Get instant email alerts for new job postings matching your profile.",
    metadata: { type: "seeker_alerts" },
  });
  console.log("\n✓ Product: Job Seeker Alerts →", seekProd.id);

  const seekMonthly = await stripe.prices.create({
    product: seekProd.id,
    unit_amount: 300,
    currency: "eur",
    recurring: { interval: "month" },
    nickname: "Seeker Monthly",
  });
  console.log("  ✓ €3/month →", seekMonthly.id);

  console.log("\n✅ Done!\n");
  console.log(JSON.stringify({
    employer_premium: {
      product_id: empProd.id,
      monthly_price_id: empMonthly.id,
      yearly_price_id: empYearly.id,
    },
    job_seeker_alerts: {
      product_id: seekProd.id,
      monthly_price_id: seekMonthly.id,
    },
  }, null, 2));
}

seed().catch((e) => { console.error("❌", e.message); process.exit(1); });
