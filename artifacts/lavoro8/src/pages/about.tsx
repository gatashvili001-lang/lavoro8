import { NavBar } from "@/components/layout/navbar";
import { Link } from "wouter";
import { ArrowLeft, Globe2, Users, Briefcase, Shield, CheckCircle, Heart, Search } from "lucide-react";
import { useGetJobStats } from "@workspace/api-client-react";
import { useLang } from "@/lib/lang-context";
import { useSeo } from "@/lib/use-seo";

export default function AboutPage() {
  const { tr } = useLang();
  const { data: stats } = useGetJobStats();

  useSeo({
    title: "Chi siamo — lavoro8.com",
    description: "Scopri lavoro8.com: la piattaforma europea per trovare lavoro in Italia e in Europa. Annunci verificati, 23 lingue, candidatura gratuita. La nostra missione, il nostro team e i nostri valori.",
    path: "/about",
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {tr("homepageLabel")}
        </Link>

        <div className="bg-background border rounded-2xl shadow-sm p-8 md:p-10 space-y-10">

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display">Chi siamo</h1>
              <p className="text-sm text-muted-foreground">La missione di lavoro8.com</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Briefcase className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">{stats?.totalJobs ?? "400+"}</div>
              <div className="text-xs text-muted-foreground">Offerte attive</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <Globe2 className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">24</div>
              <div className="text-xs text-muted-foreground">Paesi europei</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">23</div>
              <div className="text-xs text-muted-foreground">Lingue disponibili</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <Heart className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-xs text-muted-foreground">Gratuito per candidati</div>
            </div>
          </div>

          {/* Mission */}
          <section className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <h2 className="text-lg font-bold text-foreground font-display">La nostra storia</h2>
            <p>
              lavoro8.com nasce da un'esigenza semplice e concreta: rendere la ricerca di lavoro accessibile a tutti,
              indipendentemente dalla lingua parlata o dal paese di origine. Ogni anno milioni di lavoratori si spostano
              in Europa alla ricerca di opportunità migliori — e trovare offerte affidabili, evitare le truffe e
              capire come funziona il mercato del lavoro in un paese straniero è ancora troppo complicato.
            </p>
            <p>
              Abbiamo creato lavoro8.com per cambiare questo. La nostra piattaforma raccoglie annunci di lavoro verificati
              in 24 paesi europei, con interfaccia disponibile in 23 lingue. Che tu parli georgiano, romeno, ucraino,
              arabo, tagalog o qualsiasi altra lingua, puoi cercare lavoro nella tua lingua e candidarti in pochi clic.
            </p>
            <p>
              Ci concentriamo sui settori dove la domanda di manodopera è più alta e dove i lavoratori stranieri trovano
              più opportunità: magazzino e logistica, ristorazione, hotel e turismo, assistenza familiare (badante e colf),
              edilizia e costruzioni, agricoltura.
            </p>
          </section>

          {/* Values */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground font-display">I nostri valori</h2>
            <div className="grid gap-3">
              {[
                {
                  icon: Shield,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                  title: "Trasparenza totale",
                  desc: "Ogni annuncio mostra la fascia salariale, il tipo di contratto e i requisiti in modo chiaro. Nessuna sorpresa al colloquio.",
                },
                {
                  icon: CheckCircle,
                  color: "text-green-600",
                  bg: "bg-green-50",
                  title: "Annunci verificati",
                  desc: "Controlliamo ogni annuncio per eliminare le offerte false, le truffe e le situazioni di sfruttamento. La tua sicurezza prima di tutto.",
                },
                {
                  icon: Search,
                  color: "text-purple-600",
                  bg: "bg-purple-50",
                  title: "Candidatura gratuita",
                  desc: "Candidarsi su lavoro8.com è sempre gratuito per i lavoratori. Non chiediamo mai denaro per vedere le offerte o per inviare la candidatura.",
                },
                {
                  icon: Users,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                  title: "Inclusività",
                  desc: "Crediamo che tutti meritino di trovare un buon lavoro, indipendentemente dalla nazionalità, dalla lingua o dal livello di istruzione.",
                },
              ].map(({ icon: Icon, color, bg, title, desc }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-muted/30">
                  <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground mb-0.5">{title}</div>
                    <div className="text-sm text-muted-foreground">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground font-display">Come funziona lavoro8.com</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
              <p>
                lavoro8.com aggrega offerte di lavoro da due fonti principali: gli annunci pubblicati direttamente
                dalle aziende sul nostro portale, e le offerte verificate provenienti da portali partner europei.
                Ogni annuncio viene controllato prima della pubblicazione.
              </p>
              <p>
                Il nostro motore di ricerca permette di filtrare le offerte per paese, città, categoria professionale
                e tipo di contratto. La ricerca funziona anche con i nomi delle città in lingua locale (per esempio,
                cercare "Parigi" trova risultati con "Paris") grazie al nostro sistema di sinonimi multilingue.
              </p>
              <p>
                Le candidature vengono inviate direttamente alle aziende o tramite il portale partner di provenienza.
                Non facciamo da intermediari nelle trattative economiche — il rapporto è sempre diretto tra lavoratore
                e datore di lavoro.
              </p>
            </div>
          </section>

          {/* Blog / guide section */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground font-display">Guide gratuite per lavoratori</h2>
            <p className="text-sm text-muted-foreground">
              Nel nostro blog trovi guide pratiche su come trovare lavoro in Italia e in Europa: contratti, stipendi,
              diritti, CV, colloqui, visti e molto altro — scritte per chi viene dall'estero e deve orientarsi in
              un nuovo mercato del lavoro.
            </p>
            <Link href="/blog">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Leggi le guide gratuite →
              </div>
            </Link>
          </section>

          {/* Contact */}
          <section className="border-t pt-6">
            <h2 className="text-lg font-bold text-foreground font-display mb-3">Contatti</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Per segnalare un annuncio scorretto, per collaborazioni aziendali o per qualsiasi domanda:</p>
              <p>
                📧 <a href="mailto:info@lavoro8.com" className="text-primary hover:underline">info@lavoro8.com</a>
              </p>
              <p>
                🔒 Privacy: <a href="mailto:privacy@lavoro8.com" className="text-primary hover:underline">privacy@lavoro8.com</a>
              </p>
              <p className="mt-2">
                <Link href="/contact" className="text-primary hover:underline">Modulo di contatto →</Link>
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
