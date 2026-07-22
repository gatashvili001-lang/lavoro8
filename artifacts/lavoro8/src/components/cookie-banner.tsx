import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";
import { useLang } from "@/lib/lang-context";

export function CookieBanner() {
  const { tr } = useLang();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setTimeout(() => setVisible(true), 1200);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-background border shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm mb-1">🍪 {tr("cookieTitle")}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {tr("cookieDesc")}
              </p>
              {expanded && (
                <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <p><strong className="text-foreground">Cookie essenziali</strong> — necessari per il funzionamento del sito (autenticazione, sessione). Sempre attivi.</p>
                  <p><strong className="text-foreground">Cookie analitici</strong> — ci aiutano a capire come viene usato il sito (Google Analytics). Opzionali.</p>
                  <p><strong className="text-foreground">Cookie pubblicitari</strong> — Google AdSense per mostrare annunci pertinenti. Opzionali.</p>
                  <p className="mt-2">
                    <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-primary hover:underline mt-2 flex items-center gap-1 font-medium"
              >
                {expanded
                  ? <><ChevronUp className="w-3 h-3" /> {tr("hideDetails")}</>
                  : <><ChevronDown className="w-3 h-3" /> {tr("showDetails")}</>}
              </button>
            </div>
            <button type="button" onClick={reject} className="text-muted-foreground hover:text-foreground shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2 mt-4 justify-end">
            <Button variant="outline" size="sm" onClick={reject} className="text-xs h-8">
              {tr("essentialOnly")}
            </Button>
            <Button size="sm" onClick={accept} className="text-xs h-8 bg-primary">
              {tr("acceptAll")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
