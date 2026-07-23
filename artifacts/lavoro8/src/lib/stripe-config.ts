// Configurable direct Stripe Hosted Checkout Payment Links (https://buy.stripe.com/...)
export const DIRECT_STRIPE_LINKS: Record<string, string> = {
  employer_monthly: import.meta.env.VITE_STRIPE_EMPLOYER_MONTHLY_LINK || "",
  employer_yearly:  import.meta.env.VITE_STRIPE_EMPLOYER_YEARLY_LINK  || "",
  seeker_monthly:   import.meta.env.VITE_STRIPE_SEEKER_MONTHLY_LINK   || "",
};

export function getStripeCheckoutUrl(planKey: string): string {
  const customLink = DIRECT_STRIPE_LINKS[planKey];
  if (customLink && customLink.startsWith("http")) {
    return customLink;
  }
  // Safe test flow fallback redirect to avoid 404 Stripe errors when live links are unconfigured
  const origin = typeof window !== "undefined" ? window.location.origin : "https://lavoro8.com";
  return `${origin}/premium/success?session_id=cs_test_mock_${Date.now()}`;
}
