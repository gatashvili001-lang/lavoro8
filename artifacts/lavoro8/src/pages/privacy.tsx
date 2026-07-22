import { NavBar } from "@/components/layout/navbar";
import { Link } from "wouter";
import { ArrowLeft, Shield } from "lucide-react";
import { useSeo } from "@/lib/use-seo";
import { useLang } from "@/lib/lang-context";

export default function PrivacyPage() {
  const { tr } = useLang();

  useSeo({
    title: tr("privacySeoTitle"),
    description: tr("privacySeoDescription"),
    path: "/privacy",
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {tr("homeLink")}
        </Link>

        <div className="bg-background border rounded-2xl shadow-sm p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display">{tr("privacyTitle")}</h1>
              <p className="text-sm text-muted-foreground">{tr("privacyUpdated")}</p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("privacy1Title")}</h2>
              <p>{tr("privacy1BodyPre")} <strong className="text-foreground">lavoro8.com</strong>, {tr("privacy1BodyPost")} <a href="mailto:privacy@lavoro8.com" className="text-primary hover:underline">privacy@lavoro8.com</a>.</p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("privacy2Title")}</h2>
              <p>{tr("privacy2Intro")}</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong className="text-foreground">{tr("privacy2Item1Label")}</strong>{tr("privacy2Item1Body")}</li>
                <li><strong className="text-foreground">{tr("privacy2Item2Label")}</strong>{tr("privacy2Item2Body")}</li>
                <li><strong className="text-foreground">{tr("privacy2Item3Label")}</strong>{tr("privacy2Item3Body")}</li>
                <li><strong className="text-foreground">{tr("privacy2Item4Label")}</strong>{tr("privacy2Item4Body")}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("privacy3Title")}</h2>
              <p>{tr("privacy3Intro")}</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>{tr("privacy3Item1")}</li>
                <li>{tr("privacy3Item2")}</li>
                <li>{tr("privacy3Item3")}</li>
                <li>{tr("privacy3Item4")}</li>
                <li>{tr("privacy3Item5")}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("privacy4Title")}</h2>
              <p>{tr("privacy4Body")}</p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("privacy5Title")}</h2>
              <p>{tr("privacy5BodyPre")} <strong className="text-foreground">{tr("privacy5BodyMonths")}</strong> {tr("privacy5BodyPost")}</p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("privacy6Title")}</h2>
              <p>{tr("privacy6Intro")}</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>{tr("privacy6Item1")}</li>
                <li>{tr("privacy6Item2")}</li>
                <li>{tr("privacy6Item3")}</li>
                <li>{tr("privacy6Item4")}</li>
                <li>{tr("privacy6Item5")}</li>
              </ul>
              <p className="mt-2">{tr("privacy6ContactPre")} <a href="mailto:privacy@lavoro8.com" className="text-primary hover:underline">privacy@lavoro8.com</a></p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("privacy7Title")}</h2>
              <p>{tr("privacy7Body")}</p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("privacy8Title")}</h2>
              <p>{tr("privacy8Body")}</p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">{tr("privacy9Title")}</h2>
              <p>{tr("privacy9BodyPre")} <a href="mailto:privacy@lavoro8.com" className="text-primary hover:underline">privacy@lavoro8.com</a></p>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">Pubblicità — Google AdSense</h2>
              <p>lavoro8.com utilizza Google AdSense per mostrare annunci pubblicitari. Google AdSense utilizza cookie e tecnologie simili per personalizzare gli annunci in base alle tue precedenti visite su questo sito e su altri siti web.</p>
              <p className="mt-2">Google, in qualità di fornitore terzo, utilizza i cookie per pubblicare annunci sul nostro sito. L'utilizzo del cookie DART da parte di Google consente la pubblicazione di annunci agli utenti in base alla loro visita al nostro sito e ad altri siti su Internet.</p>
              <p className="mt-2">Puoi disattivare l'utilizzo del cookie DART visitando la <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">pagina delle norme sulla privacy per la rete di contenuti e per gli annunci di Google</a>.</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Google AdSense può utilizzare dati di navigazione per mostrare annunci pertinenti</li>
                <li>I cookie di terze parti (Google) vengono impostati esclusivamente per la pubblicazione degli annunci</li>
                <li>Puoi gestire le preferenze sugli annunci su <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">adssettings.google.com</a></li>
                <li>Per opt-out dalla pubblicità personalizzata di Google: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.google.com/settings/ads</a></li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-base text-foreground mb-2">Cookie di terze parti</h2>
              <p>Oltre ai cookie propri di lavoro8.com, utilizziamo cookie di terze parti per le seguenti finalità:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong className="text-foreground">Google Analytics</strong>: analisi del traffico e del comportamento degli utenti (anonimizzato)</li>
                <li><strong className="text-foreground">Google AdSense</strong>: pubblicazione di annunci pubblicitari pertinenti</li>
                <li><strong className="text-foreground">Clerk</strong>: gestione sicura dell'autenticazione degli utenti</li>
              </ul>
              <p className="mt-2">Puoi rifiutare i cookie non essenziali tramite il banner che appare al primo accesso al sito. La scelta viene memorizzata per 12 mesi.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
