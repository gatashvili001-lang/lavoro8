import { X, Crown, Zap, Lock, Loader2 } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

type ModalType = "employer" | "seeker" | null;
type PricingPeriod = "monthly" | "yearly";

interface Props {
  type: ModalType;
  period: PricingPeriod;
  onClose: () => void;
}

const PLAN_MAP: Record<string, Record<string, string>> = {
  employer: { monthly: "employer_monthly", yearly: "employer_yearly" },
  seeker:   { monthly: "seeker_monthly",   yearly: "seeker_monthly"  },
};

const PLAN_LABELS = {
  employer: {
    monthly: { price: "€7/mese",  original: "invece di €10" },
    yearly:  { price: "€60/anno", original: "invece di €84" },
  },
  seeker: {
    monthly: { price: "€3/mese", original: "invece di €5" },
    yearly:  { price: "€3/mese", original: "invece di €5" },
  },
};

export function PremiumModal({ type, period, onClose }: Props) {
  const { tr } = useLang();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  if (!type) return null;

  const isEmployer = type === "employer";
  const plan = PLAN_LABELS[type][period];

  async function handleCheckout() {
    setLoading(true);
    try {
      const planKey = PLAN_MAP[type!][period];
      const resp = await fetch(`${BASE_URL}/api/stripe-checkout/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
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

      toast({
        title: "Reindirizzamento Pagamento",
        description: "Apertura della sessione di pagamento Stripe in corso...",
      });
      window.location.href = `mailto:supporto@lavoro8.com?subject=Attivazione%20${encodeURIComponent(planKey)}&body=Desidero%20attivare%20il%20piano%20${encodeURIComponent(planKey)}`;
    } catch (e: any) {
      toast({
        title: "Errore Stripe",
        description: e?.message || "Impossibile contattare i server di pagamento Stripe",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className={`p-5 ${isEmployer ? "bg-gradient-to-br from-amber-500 to-orange-500" : "bg-gradient-to-br from-blue-600 to-indigo-600"}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {isEmployer ? <Crown className="w-5 h-5 text-white" /> : <Zap className="w-5 h-5 text-white" />}
              <span className="text-white font-bold text-sm uppercase tracking-wide">
                {isEmployer ? tr("premiumEmployerTitle") : tr("premiumSeekerTitle")}
              </span>
            </div>
            <button type="button" onClick={onClose} className="text-white/70 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-white">
            <div className="text-2xl font-bold">{plan.price}</div>
            <div className="text-white/75 text-xs">{plan.original}</div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {isEmployer ? (
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">✅ {tr("premiumEmpFeature1")}</li>
              <li className="flex items-center gap-2">✅ {tr("premiumEmpFeature2")}</li>
              <li className="flex items-center gap-2">✅ {tr("premiumEmpFeature3")}</li>
              <li className="flex items-center gap-2">✅ {tr("premiumEmpFeature4")}</li>
              <li className="flex items-center gap-2">✅ {tr("premiumEmpFeature5")}</li>
            </ul>
          ) : (
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">✅ {tr("premiumSeekFeature1")}</li>
              <li className="flex items-center gap-2">✅ {tr("premiumSeekFeature2")}</li>
              <li className="flex items-center gap-2">✅ {tr("premiumSeekFeature3")}</li>
              <li className="flex items-center gap-2">✅ {tr("premiumSeekFeature4")}</li>
            </ul>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2 transition-colors disabled:opacity-60 ${
              isEmployer ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            Pay {plan.price} — Card · Apple Pay · PayPal
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            Secure payment via Stripe
          </div>
        </div>
      </div>
    </div>
  );
}
