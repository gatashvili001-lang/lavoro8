import { NavBar } from "@/components/layout/navbar";
import { Link } from "wouter";
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useSeo } from "@/lib/use-seo";

const FAQ_ITEMS = [
  {
    category: "Trovare lavoro",
    questions: [
      {
        q: "Come trovo lavoro in Italia da straniero?",
        a: "Puoi cercare lavoro tramite portali come lavoro8.com, Indeed.it, InfoJobs.it, oppure iscrivendoti a un'agenzia interinale (Randstad, Adecco, Manpower, Gi Group). Per il primo lavoro, le agenzie interinali sono spesso il canale più rapido perché assumono anche senza esperienza pregressa in Italia.",
      },
      {
        q: "Quali documenti mi servono per lavorare in Italia?",
        a: "Per i cittadini UE: documento di identità valido e codice fiscale. Per i cittadini non UE: passaporto, visto di lavoro, permesso di soggiorno e codice fiscale. Il codice fiscale si ottiene gratuitamente all'Agenzia delle Entrate o ai consolati italiani all'estero.",
      },
      {
        q: "Devo sapere l'italiano per lavorare in Italia?",
        a: "Dipende dal ruolo. Per i lavori manuali (magazzino, edilizia, agricoltura, pulizie) spesso basta un italiano molto base. Per i lavori a contatto con il pubblico (ristorazione, hotel, badante) serve un livello A2-B1. Per posizioni di responsabilità serve almeno il B2.",
      },
      {
        q: "Quanto tempo ci vuole per trovare lavoro in Italia?",
        a: "Per i ruoli più richiesti (magazzino, logistica, assistenza, pulizie) di solito 1-4 settimane. Per posizioni qualificate può richiedere 1-3 mesi. Iscriverti a più agenzie interinali contemporaneamente accelera notevolmente la ricerca.",
      },
      {
        q: "Le agenzie interinale sono gratuite?",
        a: "Sì, per i lavoratori le agenzie interinale sono completamente gratuite. Non pagare mai un'agenzia per cercarti un lavoro — è illegale in Italia. Se un'agenzia chiede soldi, si tratta di una truffa.",
      },
    ],
  },
  {
    category: "Contratto e stipendio",
    questions: [
      {
        q: "Qual è lo stipendio minimo in Italia?",
        a: "In Italia non esiste un salario minimo legale unico, ma ogni settore ha il proprio CCNL (contratto collettivo nazionale) che stabilisce i minimi. In pratica: magazzino e logistica circa 1.300-1.500€ netti/mese, ristorazione 1.200-1.500€, edilizia 1.400-1.800€, colf/badante 900-1.400€ (spesso con vitto e alloggio).",
      },
      {
        q: "Che differenza c'è tra contratto a tempo determinato e indeterminato?",
        a: "Il contratto a tempo determinato ha una scadenza prefissata (6 mesi, 1 anno, ecc.) e non garantisce continuità. Il contratto a tempo indeterminato non ha scadenza e offre più tutele. La maggior parte dei lavoratori stranieri inizia con un determinato e dopo 12-24 mesi può essere stabilizzata.",
      },
      {
        q: "Cos'è il contratto in somministrazione (agenzia interinale)?",
        a: "Lavori fisicamente nell'azienda cliente ma sei assunto dall'agenzia interinale. Il contratto può essere determinato o indeterminato. Hai tutti i diritti del lavoratore dipendente: ferie, malattia, TFR, contributi INPS. È il tipo di contratto più comune per chi inizia in Italia.",
      },
      {
        q: "Cosa sono la tredicesima e la quattordicesima?",
        a: "La tredicesima è una mensilità aggiuntiva pagata a dicembre (Natale), obbligatoria per tutti i lavoratori dipendenti. La quattordicesima è un'ulteriore mensilità pagata a giugno-luglio, prevista da alcuni contratti collettivi (commercio, turismo). Sono calcolate in proporzione ai mesi lavorati nell'anno.",
      },
      {
        q: "Cos'è il TFR (Trattamento di Fine Rapporto)?",
        a: "Il TFR è una somma che l'azienda accantonaer ogni anno che lavori — circa 1 mensilità all'anno. Ti viene pagata quando lasci il lavoro (licenziamento, dimissioni, fine contratto). Dopo 8 anni puoi richiedere un anticipo del 70% per acquistare casa o spese mediche.",
      },
    ],
  },
  {
    category: "Permesso di soggiorno e visto",
    questions: [
      {
        q: "Ho bisogno del permesso di soggiorno per lavorare in Italia?",
        a: "I cittadini UE non hanno bisogno del permesso di soggiorno ma devono iscriversi all'anagrafe del comune se restano più di 3 mesi. I cittadini non UE hanno bisogno di un permesso di soggiorno per lavoro, che si ottiene tramite lo Sportello Unico per l'Immigrazione dopo aver ricevuto un'offerta di lavoro.",
      },
      {
        q: "Come funziona il visto di lavoro per l'Italia?",
        a: "Il sistema principale è il 'decreto flussi': ogni anno il governo italiano fissa un numero di ingressi per lavoratori non UE. Le aziende fanno domanda per assumere un lavoratore straniero, e se approvato il lavoratore ottiene il visto. C'è anche il ricongiungimento familiare e il visto per ricerca lavoro per alcuni categorie.",
      },
      {
        q: "Cosa succede se lavoro in Italia senza permesso di soggiorno?",
        a: "Lavorare senza permesso valido è illegale sia per il lavoratore che per il datore di lavoro. Il lavoratore rischia l'espulsione. Il datore di lavoro rischia multe severe (da 5.000 a 50.000€ per ogni lavoratore irregolare) e persino l'arresto. Non è mai consigliabile.",
      },
    ],
  },
  {
    category: "Vita pratica in Italia",
    questions: [
      {
        q: "Come ottengo il codice fiscale in Italia?",
        a: "Puoi ottenere il codice fiscale all'Agenzia delle Entrate più vicina, presentando solo il passaporto. È gratuito e viene rilasciato immediatamente (o tramite tessera spedita a casa in pochi giorni). I consolati italiani all'estero possono emetterlo anche prima di partire.",
      },
      {
        q: "Come apro un conto corrente in Italia da straniero?",
        a: "Le principali banche (Intesa, UniCredit, BancoPosta) richiedono documento d'identità, codice fiscale e permesso di soggiorno (per non UE). In alternativa, conti online come N26, Revolut, Buddybank sono più facili da aprire e spesso richiedono solo passaporto e selfie dall'app.",
      },
      {
        q: "Come funziona la sanità pubblica in Italia?",
        a: "L'Italia ha il Servizio Sanitario Nazionale (SSN), gratuito per chi ha la residenza. Devi iscriverti presso la ASL della tua zona e scegliere un medico di base. Con il medico di base puoi ottenere ricette, visite specialistiche e esami del sangue con ticket (compartecipazione) o gratuitamente se il reddito è basso.",
      },
      {
        q: "Come mando i soldi in patria dall'Italia?",
        a: "Il metodo più conveniente è Wise (ex TransferWise): usa il tasso di cambio reale con commissioni basse (5-10€ per 500€). Revolut è ottimo per piccoli importi. Western Union è utile se il destinatario non ha conto bancario. Evita i bonifici bancari SWIFT: costano 20-40€ e sono lenti.",
      },
      {
        q: "Come trovo casa in Italia da straniero?",
        a: "I portali principali sono Immobiliare.it, Idealista.it e Bakeca.it. Per iniziare, la stanza in condivisione (300-600€/mese) è la soluzione più accessibile. Cerca anche nei gruppi Facebook della tua comunità (georgiani, romeni, ucraini in Italia). Non pagare mai un deposito prima di aver visto la casa di persona.",
      },
    ],
  },
  {
    category: "Truffe e sicurezza",
    questions: [
      {
        q: "Come riconosco un annuncio di lavoro falso?",
        a: "Segnali di allarme: stipendio irrealisticamente alto senza qualifiche, richiesta di pagamento per 'iscrizione' o 'formazione', datore di lavoro che non risponde alle domande specifiche sul ruolo, colloquio fatto solo via WhatsApp senza mai incontrarsi, richiesta di inviare documenti (passaporto, IBAN) prima di firma del contratto.",
      },
      {
        q: "È normale che il datore di lavoro tenga il mio passaporto?",
        a: "No, è illegale. Nessun datore di lavoro in Italia ha il diritto di tenere i tuoi documenti. Se qualcuno ti chiede di lasciare il passaporto come 'garanzia', si tratta di una situazione di sfruttamento. Chiama il numero antitratta gratuito 800 290 290 (attivo 24/7).",
      },
      {
        q: "Ho ricevuto un'offerta di lavoro all'estero con vitto e alloggio inclusi. Come verifico che sia legittima?",
        a: "Cerca il nome dell'azienda su Google + 'recensioni' o 'truffa'. Chiedi il CCNL applicato e l'indirizzo fisico dell'azienda. Verifica che l'azienda esista davvero (cerca sul registro imprese del paese). Non pagare mai per il viaggio o il visto in anticipo — un'azienda seria paga queste spese o le anticipa.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold text-sm text-foreground">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t bg-muted/10">
          <p className="pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  useSeo({
    title: "Domande frequenti — lavoro8.com",
    description: "Risposte alle domande più comuni su come trovare lavoro in Italia da straniero: documenti, contratti, stipendi, permesso di soggiorno, casa e truffe da evitare.",
    path: "/faq",
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/10">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display">Domande frequenti</h1>
            <p className="text-sm text-muted-foreground">Tutto quello che devi sapere per lavorare in Italia e in Europa</p>
          </div>
        </div>

        <div className="space-y-10">
          {FAQ_ITEMS.map((section) => (
            <section key={section.category}>
              <h2 className="text-base font-bold text-foreground mb-4 px-1 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-primary inline-block" />
                {section.category}
              </h2>
              <div className="space-y-2">
                {section.questions.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-2xl text-center">
          <p className="text-sm font-semibold text-foreground mb-1">Non hai trovato la risposta che cercavi?</p>
          <p className="text-sm text-muted-foreground mb-4">Scrivici — rispondiamo entro 2 ore.</p>
          <Link href="/contact" className="inline-block text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-lg transition-colors">
            Contattaci →
          </Link>
        </div>

        <div className="mt-8 p-5 border rounded-2xl">
          <p className="text-sm font-semibold text-foreground mb-3">Guide dettagliate nel blog:</p>
          <div className="grid sm:grid-cols-2 gap-2">
            <Link href="/blog/come-scrivere-cv-italiano" className="text-sm text-primary hover:underline">→ Come scrivere il CV in italiano</Link>
            <Link href="/blog/contratto-lavoro-italia-guida-stranieri" className="text-sm text-primary hover:underline">→ I contratti di lavoro in Italia</Link>
            <Link href="/blog/diritti-lavoratori-stranieri-italia" className="text-sm text-primary hover:underline">→ Diritti dei lavoratori stranieri</Link>
            <Link href="/blog/come-evitare-truffe-lavoro-estero" className="text-sm text-primary hover:underline">→ Come evitare le truffe</Link>
            <Link href="/blog/trovare-casa-italia-stranieri" className="text-sm text-primary hover:underline">→ Come trovare casa in Italia</Link>
            <Link href="/blog/lavorare-logistica-magazzino-italia" className="text-sm text-primary hover:underline">→ Lavorare in magazzino</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
