import { NavBar } from "@/components/layout/navbar";
import { useUser } from "@clerk/react";
import { Check, Zap, Building2, Crown, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/lang-context";
import { useSeo } from "@/lib/use-seo";
import { useToast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function PricingPage() {
  const { user } = useUser();
  const { tr } = useLang();
  const { toast } = useToast();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(false);

  useSeo({
    title: tr("pricingTitle"),
    description: "Scopri i piani Premium di lavoro8.com per aziende: visibilità avanzata, candidature dirette, dashboard admin e supporto prioritario a partire da €7/mese.",
    path: "/pricing",
  });

  const faqs = [
    { q: tr("faq1q"), a: tr("faq1a") },
    { q: tr("faq2q"), a: tr("faq2a") },
    { q: tr("faq3q"), a: tr("faq3a") },
    { q: tr("faq4q"), a: tr("faq4a") },
  ];

  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    script.dataset.faqSchema = "true";
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [faqs.map((f) => f.q + f.a).join("|")]);

  async function handleCheckout() {
    setLoading(true);
    try {
      const plan = billing === "yearly" ? "employer_yearly" : "employer_monthly";
      const resp = await fetch(`${BASE_URL}/api/stripe-checkout/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      
      const contentType = resp.headers.get("content-type") ?? "";
      if (resp.ok && contentType.includes("application/json")) {
        const data = await resp.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
        if (data.error) {
          toast({
            title: "Errore Stripe",
            description: data.error,
            variant: "destructive",
          });
          return;
        }
      }

      // Fallback notification & mailto checkout request for static hosting
      toast({
        title: "Contatta il Supporto Commerciale",
        description: "Reindirizzamento per l'attivazione immediata del piano aziendale...",
      });
      window.location.href = `mailto:supporto@lavoro8.com?subject=Attivazione%20Piano%20Aziendale%20${billing}&body=Vorrei%20attivare%20il%20piano%20${billing}%20su%20lavoro8.com.`;
    } catch (e: any) {
      toast({
        title: "Errore di Connessione Stripe",
        description: e?.message || "Impossibile avviare il pagamento automatizzato Stripe. Si prega di contattare supporto@lavoro8.com",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const PLANS = [
    {
      key: "employer",
      icon: Building2,
      name: tr("planEmployerName"),
      desc: tr("planEmployerDesc"),
      badge: tr("mostPopular"),
      features: [
        tr("featureUnlimitedJobs"),
        tr("featureVisibility23"),
        tr("featureDirectApps"),
        tr("featureAdminDashboard"),
        tr("featureStats"),
        tr("featurePrioritySupport"),
      ],
      monthly: 7,
      yearly: 60,
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-blue-50/40 to-background">
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <Crown className="w-4 h-4" /> Premium lavoro8.com
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            {tr("pricingTitle")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {tr("pricingSubtitle")}
          </p>

          <div className="inline-flex items-center bg-muted rounded-xl p-1 mt-6 gap-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                billing === "monthly" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tr("billingMonthly")}
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                billing === "yearly" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tr("billingYearly")}
              <span className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5">-29%</span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 mb-16 max-w-md mx-auto">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            const price = billing === "yearly" ? Math.round(plan.yearly / 12 * 10) / 10 : plan.monthly;
            const isPopular = !!plan.badge;

            return (
              <div
                key={plan.key}
                className={`relative bg-background rounded-2xl border-2 p-8 shadow-sm flex flex-col ${
                  isPopular ? "border-blue-600 shadow-blue-100 shadow-lg" : "border-border"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  isPopular ? "bg-blue-600 text-white" : "bg-muted text-foreground"
                }`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h2 className="text-xl font-bold text-foreground mb-1">{plan.name}</h2>
                <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>

                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-foreground">€{price}</span>
                  <span className="text-muted-foreground mb-1">{tr("perMonthLabel")}</span>
                </div>

                {billing === "yearly" ? (
                  <p className="text-xs text-green-600 font-semibold mb-6">
                    {tr("savingsLabel")} €{(plan.monthly * 12 - plan.yearly)}
                  </p>
                ) : <div className="mb-6" />}

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" />
                      <span className="text-sm text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                  <span className="text-xs text-muted-foreground">Pay with:</span>
                  <span className="text-xs bg-muted rounded px-2 py-0.5 font-medium">💳 Card</span>
                  <span className="text-xs bg-muted rounded px-2 py-0.5 font-medium"> Apple Pay</span>
                  <span className="text-xs bg-muted rounded px-2 py-0.5 font-medium">🅿️ PayPal</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-colors text-center flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {tr("startNow")} →
                </button>
              </div>
            );
          })}
        </div>

        <div className="border-t pt-12">
          <h2 className="text-2xl font-display font-bold text-center mb-8">{tr("faqTitle")}</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {faqs.map((item) => (
              <div key={item.q} className="bg-muted/50 rounded-xl p-5">
                <p className="font-semibold text-sm mb-2">{item.q}</p>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 p-8 bg-blue-600 rounded-2xl text-white">
          <Zap className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
          <h3 className="text-xl font-bold mb-2">{tr("pricingCtaTitle")}</h3>
          <p className="text-blue-100 text-sm">{tr("pricingCtaDesc")}</p>
        </div>
      </main>
    </div>
  );
}
