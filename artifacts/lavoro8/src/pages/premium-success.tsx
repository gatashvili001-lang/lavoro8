import { NavBar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useLang } from "@/lib/lang-context";
import { useSeo } from "@/lib/use-seo";

export default function PremiumSuccessPage() {
  const { tr } = useLang();

  useSeo({
    title: "Pagamento Confermato | lavoro8.com",
    description: "Abbonamento Premium attivato con successo su lavoro8.com",
    noindex: true,
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-green-50/50 to-background">
      <NavBar />
      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="max-w-md w-full text-center bg-background border border-green-200 rounded-3xl p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-200 animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Piano Attivato
          </div>

          <h1 className="text-3xl font-display font-bold text-foreground mb-3">
            Pagamento Confermato!
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Benvenuto in lavoro8.com Premium! Il tuo piano è ora attivo. Puoi pubblicare annunci illimitati e accedere a tutte le funzionalità riservate.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/pubblica"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-xl transition-colors shadow-md text-sm"
            >
              Pubblica Annuncio <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center gap-2 border border-border hover:bg-muted text-foreground font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Sfoglia Annunci
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
