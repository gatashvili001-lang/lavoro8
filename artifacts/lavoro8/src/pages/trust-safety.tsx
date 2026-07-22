import { NavBar } from "@/components/layout/navbar";
import { Link } from "wouter";
import { ArrowLeft, ShieldCheck, CheckCircle2, Lock, FileCheck, Building2, UserCheck, AlertTriangle } from "lucide-react";
import { useSeo } from "@/lib/use-seo";

export default function TrustSafetyPage() {
  useSeo({
    title: "Sicurezza e Verificabilità — Lavoro8.com",
    description: "Scopri le nostre garanzie di sicurezza, verifica delle aziende e protezione per i candidati su Lavoro8.com. 100% gratuito e sicuro.",
    path: "/trust-safety",
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Torna alla Home
        </Link>

        <div className="bg-background border rounded-2xl shadow-sm p-8 md:p-10 space-y-10">

          {/* Header */}
          <div className="flex items-center gap-3 border-b pb-6">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display">Sicurezza e Garanzia Lavoro8</h1>
              <p className="text-sm text-muted-foreground">Piattaforma Ufficiale e Verificata in Italia ed Europa</p>
            </div>
          </div>

          {/* Core Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-xl bg-green-50/50 border-green-200">
              <CheckCircle2 className="w-5 h-5 text-green-600 mb-2" />
              <div className="font-bold text-sm text-foreground">100% Gratuito per Candidati</div>
              <div className="text-xs text-muted-foreground mt-1">Nessun costo per inviare il CV o iscriversi.</div>
            </div>
            <div className="p-4 border rounded-xl bg-blue-50/50 border-blue-200">
              <Building2 className="w-5 h-5 text-blue-600 mb-2" />
              <div className="font-bold text-sm text-foreground">Aziende Verificate</div>
              <div className="text-xs text-muted-foreground mt-1">Verifica della Partita IVA e della sede aziendale.</div>
            </div>
            <div className="p-4 border rounded-xl bg-purple-50/50 border-purple-200">
              <Lock className="w-5 h-5 text-purple-600 mb-2" />
              <div className="font-bold text-sm text-foreground">Conforme al GDPR EU</div>
              <div className="text-xs text-muted-foreground mt-1">Protezione dei dati personali e dei documenti.</div>
            </div>
          </div>

          {/* Guarantees */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold font-display text-foreground">La nostra garanzia di sicurezza</h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Lavoro8.com è un portale di lavoro indipendente e ufficiale operante in Italia e nell'Unione Europea.
                La nostra missione è connettere direttamente i lavoratori con aziende reali ed etiche, eliminando ogni forma di intermediazione illegale o truffa.
              </p>
              <p>
                Ogni annuncio di lavoro viene sottoposto a controlli automatici e manuali prima della pubblicazione per verificare:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-foreground font-medium">
                <li>L'esistenza della società e della Partita IVA / Registro Imprese.</li>
                <li>L'assenza di richieste di denaro o pagamento per corsi e materiale.</li>
                <li>La chiarezza della retribuzione e del contratto di lavoro offerto.</li>
              </ul>
            </div>
          </section>

          {/* Anti-Scam Rules */}
          <section className="p-6 border border-amber-200 rounded-xl bg-amber-50/30 space-y-3">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Regole d'oro per i candidati:
            </div>
            <ul className="text-xs text-amber-900/90 space-y-1.5 list-disc pl-4">
              <li>Non pagare mai somma di denaro per una candidatura o un colloqui di lavoro.</li>
              <li>Invia il tuo CV solo tramite il nostro form protetto o la chat ufficiale di Lavoro8.com.</li>
              <li>Segnala immediatamente qualsiasi azienda che richieda pagamenti o comportamenti sospetti a <a href="mailto:info@lavoro8.com" className="underline font-bold">info@lavoro8.com</a>.</li>
            </ul>
          </section>

          {/* Contact & Support */}
          <section className="border-t pt-6 text-sm text-muted-foreground space-y-2">
            <div className="font-bold text-foreground">Contatti Ufficiali di Assistenza:</div>
            <p>Email Assistenza e Segnalazioni: <a href="mailto:info@lavoro8.com" className="text-primary hover:underline font-medium">info@lavoro8.com</a></p>
            <p>Modulo di contatto diretto: <Link href="/contact" className="text-primary hover:underline font-medium">Modulo Contatti →</Link></p>
          </section>

        </div>
      </main>
    </div>
  );
}
