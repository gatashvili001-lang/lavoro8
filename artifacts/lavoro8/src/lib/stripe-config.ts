// Live Stripe Hosted Checkout Payment Links (https://buy.stripe.com/...)
export const DIRECT_STRIPE_LINKS: Record<string, string> = {
  employer_monthly: import.meta.env.VITE_STRIPE_EMPLOYER_MONTHLY_LINK || "https://buy.stripe.com/aFa14m1XA1Gh78oalG4Ja00",
  employer_yearly:  import.meta.env.VITE_STRIPE_EMPLOYER_YEARLY_LINK  || "https://buy.stripe.com/eVq14mau6et3dwM9hC4Ja01",
  seeker_monthly:   import.meta.env.VITE_STRIPE_SEEKER_MONTHLY_LINK   || "https://buy.stripe.com/6oUeVc0TwckVakAalG4Ja02",
};

export function getStripeCheckoutUrl(planKey: string): string {
  return DIRECT_STRIPE_LINKS[planKey] || DIRECT_STRIPE_LINKS.employer_monthly;
}
