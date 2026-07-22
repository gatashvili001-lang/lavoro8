import { NavBar } from "@/components/layout/navbar";
import { useSeo } from "@/lib/use-seo";

export default function RefundsPage() {
  useSeo({
    title: "Refund Policy — lavoro8.com",
    description: "Refund policy for lavoro8.com Premium subscriptions.",
    path: "/refunds",
  });

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl prose prose-sm">
        <h1>Refund Policy</h1>
        <p><em>Last updated: July 2026</em></p>

        <h2>1. Subscription Plans</h2>
        <p>
          lavoro8.com offers monthly and annual subscription plans for employers ("Employer Premium")
          and job seekers ("Job Seeker Alerts"), processed via Paddle.com as our Merchant of Record.
        </p>

        <h2>2. Free Trial</h2>
        <p>
          Where a free trial is offered, you will not be charged during the trial period. You may
          cancel at any time before the trial ends and you will not be billed.
        </p>

        <h2>3. Cancellation</h2>
        <p>
          You may cancel your subscription at any time from your account dashboard. Cancellation
          takes effect at the end of the current billing period. You will continue to have access
          to Premium features until that date.
        </p>

        <h2>4. Refunds</h2>
        <p>
          We offer a <strong>14-day money-back guarantee</strong> on all new subscriptions. If you
          are not satisfied within 14 days of your first payment, contact us at{" "}
          <a href="mailto:support@lavoro8.com">support@lavoro8.com</a> and we will issue a full
          refund — no questions asked.
        </p>
        <p>
          After 14 days, subscription fees are non-refundable except where required by applicable law.
          Partial refunds for unused periods are not provided.
        </p>

        <h2>5. How to Request a Refund</h2>
        <p>
          Email <a href="mailto:support@lavoro8.com">support@lavoro8.com</a> with:
        </p>
        <ul>
          <li>Your registered email address</li>
          <li>The date of purchase</li>
          <li>The reason for your refund request (optional)</li>
        </ul>
        <p>Refunds are processed within 5–10 business days to your original payment method.</p>

        <h2>6. Paddle as Merchant of Record</h2>
        <p>
          All payments are processed by Paddle.com, who acts as Merchant of Record and handles
          billing, tax, and refund processing on our behalf. For billing enquiries, you may also
          contact Paddle directly at{" "}
          <a href="https://www.paddle.com/legal/contact" target="_blank" rel="noopener noreferrer">
            paddle.com/legal/contact
          </a>.
        </p>

        <h2>7. Contact</h2>
        <p>
          lavoro8.com — <a href="mailto:support@lavoro8.com">support@lavoro8.com</a>
        </p>
      </main>
    </div>
  );
}
