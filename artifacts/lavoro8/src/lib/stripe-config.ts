// Configurable direct Stripe Hosted Checkout URLs
export const DIRECT_STRIPE_LINKS: Record<string, string> = {
  employer_monthly: import.meta.env.VITE_STRIPE_EMPLOYER_MONTHLY_LINK || "https://checkout.stripe.com/c/pay/cs_live_lavoro8_employer_monthly",
  employer_yearly:  import.meta.env.VITE_STRIPE_EMPLOYER_YEARLY_LINK  || "https://checkout.stripe.com/c/pay/cs_live_lavoro8_employer_yearly",
  seeker_monthly:   import.meta.env.VITE_STRIPE_SEEKER_MONTHLY_LINK   || "https://checkout.stripe.com/c/pay/cs_live_lavoro8_seeker_monthly",
};

export function getStripeCheckoutUrl(planKey: string): string {
  return DIRECT_STRIPE_LINKS[planKey] || DIRECT_STRIPE_LINKS.employer_monthly;
}
