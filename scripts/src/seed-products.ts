import { getUncachableStripeClient } from '../../artifacts/api-server/src/stripeClient.js';

async function seedProducts() {
  try {
    const stripe = await getUncachableStripeClient();
    console.log('Seeding Stripe products for lavoro.it...');

    // --- Employer Premium Monthly (€7/month) ---
    const existingMonthly = await stripe.products.search({
      query: "name:'Employer Premium Monthly' AND active:'true'"
    });
    if (existingMonthly.data.length === 0) {
      const product = await stripe.products.create({
        name: 'Employer Premium Monthly',
        description: 'Post unlimited jobs across Europe — billed monthly',
        metadata: { role: 'employer', period: 'monthly' },
      });
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 700,
        currency: 'eur',
        recurring: { interval: 'month' },
      });
      console.log(`✓ Employer Monthly: ${price.id} (€7/month)`);
    } else {
      console.log('✓ Employer Monthly already exists');
    }

    // --- Employer Premium Yearly (€60/year) ---
    const existingYearly = await stripe.products.search({
      query: "name:'Employer Premium Yearly' AND active:'true'"
    });
    if (existingYearly.data.length === 0) {
      const product = await stripe.products.create({
        name: 'Employer Premium Yearly',
        description: 'Post unlimited jobs across Europe — billed yearly (save 30%)',
        metadata: { role: 'employer', period: 'yearly' },
      });
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 6000,
        currency: 'eur',
        recurring: { interval: 'year' },
      });
      console.log(`✓ Employer Yearly: ${price.id} (€60/year)`);
    } else {
      console.log('✓ Employer Yearly already exists');
    }

    // --- Job Seeker Alerts (€3/month) ---
    const existingSeeker = await stripe.products.search({
      query: "name:'Job Seeker Alerts' AND active:'true'"
    });
    if (existingSeeker.data.length === 0) {
      const product = await stripe.products.create({
        name: 'Job Seeker Alerts',
        description: 'Instant job alerts matching your profile across Europe',
        metadata: { role: 'seeker', period: 'monthly' },
      });
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 300,
        currency: 'eur',
        recurring: { interval: 'month' },
      });
      console.log(`✓ Job Seeker Alerts: ${price.id} (€3/month)`);
    } else {
      console.log('✓ Job Seeker Alerts already exists');
    }

    console.log('\n✅ All products seeded!');
  } catch (err: any) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

seedProducts();
