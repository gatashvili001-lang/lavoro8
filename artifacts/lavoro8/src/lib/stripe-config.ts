// Configurable direct Stripe Hosted Checkout Payment Links (https://buy.stripe.com/...)
export const DIRECT_STRIPE_LINKS: Record<string, string> = {
  employer_monthly: import.meta.env.VITE_STRIPE_EMPLOYER_MONTHLY_LINK || "https://buy.stripe.com/8wM3fg9xK56R7vOcMM",
  employer_yearly:  import.meta.env.VITE_STRIPE_EMPLOYER_YEARLY_LINK  || "https://buy.stripe.com/4gw5no4de7eZ8zS144",
  seeker_monthly:   import.meta.env.VITE_STRIPE_SEEKER_MONTHLY_LINK   || "https://buy.stripe.com/6oE6rsfWc0MB7vO4gg",
};

export function getStripeCheckoutUrl(planKey: string): string {
  return DIRECT_STRIPE_LINKS[planKey] || DIRECT_STRIPE_LINKS.employer_monthly;
}
