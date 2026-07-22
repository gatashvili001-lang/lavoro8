import type { Lang } from "./i18n";

export type BlogPost = {
  slug: string;
  originLang: Lang;
  originLabel: string;
  flag: string;
  category: string;
  publishedAt: string;
  title: Partial<Record<Lang, string>>;
  excerpt: Partial<Record<Lang, string>>;
  body: Partial<Record<Lang, string>>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "come-scrivere-cv-italiano",
    originLang: "it",
    originLabel: "Italiano",
    flag: "📄",
    category: "Consigli",
    publishedAt: "2026-07-15",
    title: {
      it: "Come scrivere un CV in italiano che funziona davvero",
      ka: "როგორ დავწეროთ CV იტალიურად, რომელიც მუშაობს",
    },
    excerpt: {
      it: "Guida completa per creare un curriculum vitae efficace per il mercato del lavoro italiano: struttura, errori da evitare, esempi pratici per ogni settore.",
      ka: "სრული გზამკვლევი ეფექტური CV-ის შესაქმნელად იტალიური სამუშაო ბაზრისთვის.",
    },
    body: {
      it: `Un curriculum vitae ben scritto è il primo passo per ottenere un colloquio in Italia. Molti candidati stranieri perdono ottime opportunità non perché manchino di competenze, ma perché il loro CV non rispetta le aspettative dei datori di lavoro italiani. In questa guida trovi tutto quello che serve per creare un curriculum efficace.

**Formato e lunghezza ideali**

In Italia il CV ideale è di massimo 2 pagine (1 pagina per chi ha meno di 5 anni di esperienza). Usa un layout pulito e professionale. Il formato più consigliato è il modello Europass, accettato in tutta Europa e riconoscibile da tutti i datori di lavoro italiani. Puoi scaricarlo gratuitamente su europass.europa.eu.

Evita colori sgargianti, foto scadenti o layout troppo creativi a meno che tu non stia cercando lavoro in un settore creativo come il design o la moda.

**La foto: sì o no?**

In Italia la foto sul CV è normale e spesso attesa, a differenza di altri paesi come gli USA o il Regno Unito dove non si usa. Usa una foto professionale, con sfondo neutro, abbigliamento curato e sorriso sobrio. Evita foto da vacanza, selfie o immagini ritagliate da gruppi.

**Struttura consigliata del CV italiano**

• **Dati personali**: nome, cognome, data di nascita, nazionalità, indirizzo (comune è sufficiente, non serve l'indirizzo preciso), email, telefono, eventuale LinkedIn
• **Titolo professionale**: una riga che riassume chi sei ("Magazziniere con 5 anni di esperienza", "Badante con esperienza in assistenza Alzheimer")
• **Profilo/Obiettivo**: 3-4 righe che spiegano cosa cerchi e cosa porti all'azienda
• **Esperienza lavorativa**: dal più recente al più vecchio. Per ogni lavoro: azienda, città, date, mansioni principali (max 4 punti)
• **Formazione**: titoli di studio con traduzione in italiano se necessario
• **Competenze**: lingue (con livello), computer, patente, certificazioni
• **Autorizzazione al trattamento dei dati**: in fondo aggiungi la frase "Autorizzo il trattamento dei dati personali contenuti nel presente CV ai sensi del D.lgs. 196/2003 e del GDPR (Regolamento UE 2016/679)"

**Come valorizzare l'esperienza all'estero**

Non sminuire le tue esperienze estere — valorizzale. Un datore di lavoro italiano apprezza la flessibilità e la capacità di adattarsi. Scrivi le mansioni svolte all'estero con la stessa cura che useresti per quelle italiane, e aggiungi una traduzione o spiegazione breve del ruolo se il nome non è intuitivo.

Esempio: invece di scrivere solo "Kasseirer bei Rewe" scrivi "Cassiere presso supermercato Rewe (Germania) — gestione cassa, assistenza clienti, operazioni di apertura e chiusura".

**Le competenze linguistiche**

Per ogni lingua indica il livello secondo il Quadro Europeo di Riferimento (QCER):
• A1-A2: livello base
• B1-B2: livello intermedio (B2 è spesso il minimo richiesto per molti lavori in Italia)
• C1-C2: livello avanzato / madrelingua

Se hai certificazioni linguistiche (CILS, CELI, PLIDA per l'italiano; IELTS, TOEFL per l'inglese; DELE per lo spagnolo) indicale sempre — aumentano il valore del CV.

**Errori comuni da evitare**

• CV troppo lungo: oltre 2 pagine non viene letto
• Errori di ortografia in italiano: fai sempre controllare il testo da un italiano madrelingua o usa un correttore
• Mancanza di cifre concrete: invece di "ho gestito un magazzino" scrivi "ho gestito un magazzino di 3.000 m² con 200 referenze"
• Foto non professionale: è uno dei motivi più frequenti per cui i CV vengono scartati al primo sguardo
• Indirizzi email non professionali: usa nome.cognome@gmail.com, non nicknames come "superstar87@hotmail.it"
• Non aggiornare il CV per ogni candidatura: personalizza sempre il titolo e le prime righe in base all'offerta

**CV per settore: cosa cambia**

Per il magazzino e la logistica, i datori cercano: esperienza con scanner/PDA, patentino muletto, conoscenza del sistema WMS, disponibilità a turni.

Per la ristorazione, evidenzia: cucine in cui hai lavorato, coperti gestiti, tipo di servizio (banqueting, à la carte, banchetti), eventuali specializzazioni.

Per badante e colf, includi: tipologia di assistiti (anziani, disabili, bambini), eventuali esperienze con patologie specifiche (Alzheimer, Parkinson), referenze di famiglie precedenti.

Per l'edilizia, specifica: certificazioni di sicurezza (corsi 16 ore, PLE, ponteggi), macchinari usati, tipo di cantieri.

**Come inviare il CV**

In Italia si usa ancora molto l'email. Scrivi un'email professionale con oggetto chiaro ("Candidatura per posizione di magazziniere — Nome Cognome") e un breve testo di presentazione nel corpo dell'email. Allega il CV in formato PDF (mai Word, potrebbe aprirsi male).

Sempre più aziende usano portali online come Indeed, InfoJobs, lavoro8.com o i siti aziendali. Carica il tuo CV aggiornato su queste piattaforme per essere trovato anche dai recruiter che cercano attivamente candidati.`,
      ka: `კარგად დაწერილი CV ბიოგრაფია პირველი ნაბიჯია იტალიაში ინტერვიუს მისაღებად. ამ გზამკვლევში ყველაფერს გეტყვით, რაც საჭიროა ეფექტური CV-ის შესაქმნელად.

**ფორმატი და სიგრძე**

იტალიაში CV მაქსიმუმ 2 გვერდი უნდა იყოს. რეკომენდებულია Europass ფორმატი, რომელიც უფასოდ შეგიძლიათ ჩამოტვირთოთ europass.europa.eu-დან.

**სტრუქტურა**

• პირადი მონაცემები (სახელი, ტელეფონი, ელ.ფოსტა)
• პროფესიული სათაური
• სამუშაო გამოცდილება (ახლიდან ძველისკენ)
• განათლება
• უნარები და ენები
• მონაცემთა დამუშავების ნებართვა (სავალდებულო იტალიაში)

**ფოტო**

იტალიაში CV-ზე ფოტო ჩვეულებრივია — გამოიყენეთ პროფესიული ფოტო.

**ენები**

მიუთითეთ ენის დონე ევროპული სისტემით: A1-A2 (საბაზო), B1-B2 (საშუალო), C1-C2 (მაღალი).`,
    },
  },
  {
    slug: "contratto-lavoro-italia-guida-stranieri",
    originLang: "it",
    originLabel: "Italiano",
    flag: "📋",
    category: "Consigli",
    publishedAt: "2026-07-14",
    title: {
      it: "Contratto di lavoro in Italia: guida completa per lavoratori stranieri",
      ka: "სამუშაო ხელშეკრულება იტალიაში: სრული გზამკვლევი",
    },
    excerpt: {
      it: "Tutto quello che devi sapere sui contratti di lavoro in Italia: tipologie, diritti, busta paga, ferie e cosa fare se non ti pagano.",
      ka: "ყველაფერი, რაც უნდა იცოდეთ იტალიაში სამუშაო ხელშეკრულებების შესახებ.",
    },
    body: {
      it: `Capire i contratti di lavoro italiani è fondamentale per tutelare i propri diritti. Molti lavoratori stranieri accettano condizioni svantaggiose perché non conoscono le regole. Questa guida ti spiega tutto in modo chiaro.

**I tipi di contratto più comuni in Italia**

• **Tempo indeterminato**: il contratto più tutelante. Non ha una data di scadenza e il datore di lavoro può licenziarti solo per giusta causa o giustificato motivo. È il contratto ideale a cui puntare.

• **Tempo determinato**: ha una scadenza (6 mesi, 1 anno, ecc.). Può essere rinnovato, ma non all'infinito — dopo 24 mesi il datore deve assumerti a tempo indeterminato o lasciarti andare.

• **Part-time**: puoi avere un contratto part-time sia a tempo determinato che indeterminato. L'orario ridotto (di solito 20-30 ore settimanali) non ti priva di nessun diritto fondamentale.

• **Contratto in somministrazione (interinale)**: vieni assunto da un'agenzia interinale che ti "presta" a un'azienda. Hai gli stessi diritti di un dipendente diretto, ma il rapporto è più flessibile.

• **Tirocinio/Stage**: non è un contratto di lavoro vero e proprio — ricevi solo un'indennità. Attenzione: molti datori di lavoro abusano dello stage per avere lavoratori a basso costo. Dopo 3-6 mesi dovresti essere assunto.

**CCNL: il contratto collettivo nazionale**

In Italia quasi ogni settore ha un CCNL — un contratto collettivo firmato dai sindacati che stabilisce i minimi salariali, le ferie, gli straordinari e tutti i diritti del lavoratore. I principali CCNL:

• CCNL Logistica e Trasporto
• CCNL Commercio (supermercati, negozi)
• CCNL Turismo (ristorazione, hotel)
• CCNL Edilizia
• CCNL Colf e Badanti
• CCNL Metalmeccanico

Quando firmi un contratto, assicurati che il CCNL applicato sia quello corretto per il tuo settore. Puoi verificare i minimi salariali sul sito del Ministero del Lavoro o su sindacati come CGIL, CISL e UIL.

**La busta paga: come si legge**

La busta paga italiana (cedolino) è spesso confusa. Ecco le voci principali:

• **Retribuzione lorda**: l'importo totale prima delle trattenute
• **Contributi INPS**: circa 9-10% a carico del lavoratore, destinati alla pensione e ai contributi sociali
• **IRPEF**: imposta sul reddito, variabile in base allo stipendio
• **Retribuzione netta**: quello che ricevi sul conto

Importante: il datore di lavoro paga anche una quota di contributi a suo carico (circa 30% in più del lordo). Questo è il motivo per cui il costo del lavoratore per l'azienda è molto superiore al tuo stipendio netto.

**Ferie, malattia e maternità**

• **Ferie**: almeno 4 settimane l'anno (28 giorni), obbligatorie per legge. Almeno 2 settimane consecutive devono essere godute nell'anno in cui maturano.

• **Malattia**: in caso di malattia hai diritto alla retribuzione (a carico dell'INPS o del datore, a seconda del contratto). Devi comunicare subito l'assenza e inviare il certificato medico entro 2 giorni.

• **Maternità**: le lavoratrici hanno diritto a 5 mesi di congedo obbligatorio (2 prima del parto + 3 dopo), con l'80% dello stipendio a carico dell'INPS.

**TFR: il trattamento di fine rapporto**

Il TFR è una liquidazione che accumuli ogni anno e ricevi quando lasci il lavoro (per qualsiasi motivo). Equivale a circa 1 mese di stipendio per ogni anno lavorato. È un diritto fondamentale — non puoi rinunciarvi.

**Se non ti pagano: cosa fare**

1. Metti tutto per iscritto: conserva buste paga, email, messaggi WhatsApp
2. Diffida formale: invia una raccomandata A/R al datore richiedendo il pagamento entro 15 giorni
3. Ispettorato del Lavoro: segnala la situazione all'ITL (ex DPL) del tuo territorio — è gratuito e potente
4. Sindacato: rivolgiti a CGIL, CISL o UIL che ti assistono gratuitamente
5. Tribunale del Lavoro: come ultima opzione, hai diritto a un giudice del lavoro

**Lavoro nero: i rischi**

Lavorare "in nero" (senza contratto) è molto rischioso. Non accumuli contributi per la pensione, non hai diritto a malattia e ferie, e se ti infortuni sul lavoro non sei coperto. Inoltre, per i lavoratori extracomunitari, lavorare in nero può compromettere il rinnovo del permesso di soggiorno.

Esigi sempre un contratto scritto prima di iniziare a lavorare.`,
      ka: `იტალიაში სამუშაო ხელშეკრულებების გაგება სასიცოცხლოდ მნიშვნელოვანია თქვენი უფლებების დასაცავად.

**ხელშეკრულებების ტიპები**

• **Tempo indeterminato** — განუსაზღვრელი ვადის: საუკეთესო, ყველაზე დაცული
• **Tempo determinato** — ვადიანი: 6-12 თვე, განახლება შეიძლება
• **Part-time** — ნახევარი განაკვეთი: 20-30 საათი კვირაში
• **Interinale** — სააგენტოს მეშვეობით: ყველა უფლება შეინარჩუნება

**CCNL — კოლექტიური ხელშეკრულება**

თითოეულ სფეროს თავისი CCNL აქვს, რომელიც ადგენს მინიმალურ ხელფასებს, შვებულებებს და სხვა უფლებებს.

**შვებულება და ავადმყოფობა**

• მინიმუმ 4 კვირა შვებულება წელიწადში
• ავადმყოფობის დროს — ანაზღაურება INPS-ის მხრიდან

**TFR — საბოლოო გადახდა**

სამუშაოს დატოვებისას გეძლევათ TFR — დაახლოებით 1 თვის ხელფასი ყოველი ნამუშევარი წლისთვის.`,
    },
  },
  {
    slug: "stipendi-italia-per-settore",
    originLang: "it",
    originLabel: "Italiano",
    flag: "💶",
    category: "Stipendi",
    publishedAt: "2026-07-12",
    title: {
      it: "Stipendi in Italia nel 2026: quanto si guadagna davvero per settore",
      ka: "ხელფასები იტალიაში 2026: რამდენს გამოიმუშავებთ სფეროების მიხედვით",
    },
    excerpt: {
      it: "Analisi completa degli stipendi reali (non solo quelli dichiarati) in Italia nel 2026: magazzino, logistica, ristorazione, hotel, badante, edilizia, rider e molto altro.",
      ka: "2026 წლის იტალიის ხელფასების სრული ანალიზი სფეროების მიხედვით.",
    },
    body: {
      it: `Conoscere gli stipendi reali in Italia è fondamentale per negoziare il proprio compenso e per capire se un'offerta è equa. In questa guida trovi i dati aggiornati al 2026, divisi per settore.

**Magazzino e logistica**

Il settore della logistica è uno dei più grandi datori di lavoro in Italia, con centinaia di migliaia di addetti.

• Magazziniere senza patentino muletto: 1.300-1.550€ netti/mese
• Magazziniere con patentino muletto: 1.450-1.750€ netti/mese
• Magazziniere con turno notturno: +20-30% di maggiorazione (esentasse fino a certi limiti)
• Team leader / capo magazzino: 1.800-2.200€ netti/mese
• Autista con patente B per consegne: 1.300-1.600€ netti/mese
• Autista con patente C+E (camionista): 2.000-2.600€ lordi/mese

Nota: in Lombardia e nel triangolo industriale (Milano-Torino-Genova) gli stipendi sono mediamente il 15-20% più alti rispetto al Sud Italia.

**Ristorazione e hotel**

• Lavapiatti: 950-1.200€ netti/mese
• Commis di cucina: 1.100-1.350€ netti/mese
• Cuoco (capo partita): 1.500-2.000€ netti/mese
• Sous chef: 1.800-2.400€ netti/mese
• Cameriere di sala: 1.100-1.500€ netti (+ mance, variabili)
• Bartender: 1.200-1.700€ netti + mance
• Receptionist hotel (3-4 stelle): 1.300-1.700€ netti/mese
• Cameriera ai piani (housekeeping): 1.100-1.400€ netti/mese

Attenzione: nel settore turistico gli straordinari non dichiarati sono frequenti. Controlla sempre che il tuo contratto sia in regola.

**Assistenza familiare (badante e colf)**

• Colf a ore (pulizie): 12-15€/ora (Tabelle INPS 2026)
• Badante part-time: 750-1.000€ netti/mese (20-25 ore)
• Badante non convivente full-time: 1.000-1.400€ netti/mese
• Badante convivente: 1.000-1.300€ netti/mese + vitto e alloggio (il valore del vitto/alloggio equivale ad altri 400-600€)
• Baby-sitter: 10-14€/ora (media nazionale), fino a 18-20€/ora a Milano e Roma

Il settore dell'assistenza familiare è regolato dal CCNL Colf e Badanti, uno dei più trasparenti. Consulta le tabelle salariali aggiornate sul sito di DOMINA (associazione datori di lavoro domestico).

**Edilizia e costruzioni**

• Manovale / operaio non qualificato: 1.350-1.600€ netti/mese
• Muratore qualificato: 1.600-2.000€ netti/mese
• Carpentiere in ferro: 1.700-2.100€ netti/mese
• Elettricista (installatore): 1.700-2.300€ netti/mese
• Idraulico: 1.800-2.400€ netti/mese
• Gruista: 2.000-2.500€ netti/mese (richiede patentino specifico)
• Geometra di cantiere: 1.800-2.400€ netti/mese

L'edilizia ha spesso maggiorazioni per lavori in quota, spazi confinati e in zone con difficoltà ambientali. Verifica il CCNL Edilizia Artigianato o Industria.

**Rider e consegne**

• Rider in bici/motorino (piattaforme): 6-9€ a consegna, media 900-1.400€/mese lavorando part-time
• Rider full-time (turni fissi, azienda): 1.200-1.500€ netti/mese
• Corriere con furgone (B patente): 1.300-1.600€ netti/mese

Il settore del delivery è molto flessibile ma poco tutelato. Dal 2024 le principali piattaforme sono obbligate a garantire il minimo salariale contrattuale anche ai rider autonomi.

**Come capire se un'offerta è equa**

Per verificare se lo stipendio proposto è in linea con il mercato:
1. Consulta il CCNL del settore sul sito del Ministero del Lavoro
2. Confronta con altre offerte sullo stesso portale (lavoro8.com, Indeed, InfoJobs)
3. Chiedi a colleghi dello stesso settore
4. Controlla le tabelle INPS per il lavoro domestico

**Nord vs Sud: le differenze**

Il divario salariale tra Nord e Sud Italia è reale ma diminuisce nei settori regolamentati da CCNL nazionali (lo stipendio base è lo stesso). La differenza si vede principalmente in:
• Premi di produzione aziendali (più alti al Nord)
• Costo della vita (più alto al Nord, ma stipendio netto effettivo spesso simile)
• Disponibilità di lavoro (molto maggiore al Nord per quasi tutti i settori)

**Quanto si paga di tasse**

Con uno stipendio netto di 1.500€/mese, il lordo è circa 2.100€/mese. La differenza (600€) va in contributi INPS (pensione, malattia) e IRPEF (imposta sul reddito). La percentuale totale di trattenuta varia tra il 25% e il 38% a seconda del reddito annuo.`,
      ka: `2026 წელს იტალიაში ხელფასები სფეროების მიხედვით:

**საწყობი და ლოგისტიკა**
• საწყობის მუშა: 1,300-1,550€ თვეში
• ვაზნასმოქმედის ლიცენზიით: 1,450-1,750€

**რესტორნები და სასტუმრო**
• სამზარეულოს მუშა: 1,100-1,350€
• მზარეული: 1,500-2,000€
• მიმტანი: 1,100-1,500€ + ჩაი

**ბადანტე და კოლფი**
• ბადანტე საცხოვრებლით: 1,000-1,300€ + კვება და სახლი
• კოლფი: 12-15€/საათი

**მშენებლობა**
• მაქმანი: 1,600-2,000€
• ელექტრიკოსი: 1,700-2,300€`,
    },
  },
  {
    slug: "diritti-lavoratori-stranieri-italia",
    originLang: "it",
    originLabel: "Italiano",
    flag: "⚖️",
    category: "Diritti",
    publishedAt: "2026-07-10",
    title: {
      it: "Diritti dei lavoratori stranieri in Italia: cosa devi sapere",
      ka: "უცხოელი მუშაკების უფლებები იტალიაში",
    },
    excerpt: {
      it: "Guida ai diritti fondamentali dei lavoratori stranieri in Italia: uguaglianza, discriminazione, permesso di soggiorno, sindacati e come difendersi.",
      ka: "გზამკვლევი იტალიაში უცხოელი მუშაკების ძირითადი უფლებების შესახებ.",
    },
    body: {
      it: `In Italia i lavoratori stranieri hanno, sulla carta, gli stessi diritti dei lavoratori italiani. Il problema è che spesso non li conoscono e non li esercitano. Questa guida ti aiuta a capire cosa ti spetta e come difenderti.

**Principio di parità di trattamento**

Per legge, un datore di lavoro italiano non può pagarti meno o darti condizioni peggiori rispetto a un collega italiano che fa lo stesso lavoro, solo perché sei straniero. Questo è sancito dal Testo Unico sull'Immigrazione (D.lgs. 286/98) e dai regolamenti UE.

La discriminazione sul lavoro è illegale e puoi denunciarla all'Ispettorato del Lavoro, all'UNAR (Ufficio Nazionale Antidiscriminazioni Razziali) o tramite un sindacato.

**I diritti fondamentali sul lavoro**

Indipendentemente dalla nazionalità o dal tipo di permesso di soggiorno, hai diritto a:

• Contratto di lavoro scritto
• Retribuzione minima stabilita dal CCNL di settore
• Almeno 4 settimane di ferie l'anno
• Riposo settimanale di almeno 1 giorno (di solito domenica o un giorno compensativo)
• Ambiente di lavoro sicuro (D.lgs. 81/2008 sulla sicurezza sul lavoro)
• Malattia pagata
• TFR (liquidazione) al termine del rapporto
• Accesso al sindacato

**Permesso di soggiorno e lavoro**

Per i cittadini non UE, il permesso di soggiorno per lavoro è fondamentale. Punti chiave:

• Il datore di lavoro non può tenere il tuo permesso — è un documento tuo
• Se perdi il lavoro, il permesso non scade immediatamente: hai tempo per trovarne un altro (varia a seconda del tipo di permesso)
• Il rinnovo del permesso richiede di dimostrare reddito e contributi — tieni sempre i cedolini paga
• Con 5 anni di residenza legale puoi richiedere il permesso UE per soggiornanti di lungo periodo (più stabile)

**I cittadini UE**

Se sei cittadino di un paese UE (Romania, Bulgaria, Polonia, ecc.), puoi lavorare in Italia senza permesso di lavoro. Hai bisogno solo di:
• Carta d'identità o passaporto
• Codice fiscale (gratuito all'Agenzia delle Entrate)
• Iscrizione all'AIRE se prevedi di restare più di 12 mesi (facoltativa ma utile)

**La sicurezza sul lavoro: un diritto fondamentale**

In Italia la sicurezza sul lavoro è regolata da una legge molto dettagliata (D.lgs. 81/2008). Il datore di lavoro è obbligato a:
• Fornire dispositivi di protezione individuale (DPI) gratuiti
• Formarti sulla sicurezza prima che tu inizi a lavorare
• Valutare i rischi e ridurli al minimo

Se il tuo posto di lavoro è pericoloso o ti chiedono di lavorare senza DPI, puoi rifiutarti e segnalare all'ASL locale o all'Ispettorato del Lavoro. È un tuo diritto.

**Il sindacato: il tuo principale alleato**

I principali sindacati italiani sono CGIL, CISL e UIL. Tutti e tre offrono assistenza anche ai lavoratori stranieri, in alcune città con sportelli multilingue. I loro servizi principali:

• Controllo del contratto e della busta paga
• Assistenza in caso di licenziamento
• Presentazione di denunce all'Ispettorato
• Supporto per il permesso di soggiorno
• Compilazione del modello 730 (dichiarazione dei redditi)

L'iscrizione al sindacato costa circa 5-10€/mese (una piccola percentuale della busta paga) e ne vale la pena, soprattutto nei primi anni.

**Infortunio sul lavoro**

Se ti infortuni mentre lavori, hai diritto all'indennizzo INAIL (l'ente pubblico per gli infortuni sul lavoro). Il datore di lavoro è obbligato ad assicurarti all'INAIL. Se non lo ha fatto e ti infortuni, il datore è responsabile e risarcisce i danni.

Cosa fare in caso di infortunio:
1. Fai assistere subito al Pronto Soccorso
2. Comunica l'infortunio al datore entro il giorno stesso
3. Il medico rilascerà un certificato di infortunio (non una normale malattia)
4. L'INAIL ti riconoscerà l'indennizzo per i giorni di prognosi

**Come denunciare abusi**

Se subisci un trattamento ingiusto, hai diverse opzioni:
• **Ispettorato Nazionale del Lavoro** (INL): puoi presentare un esposto online o di persona. È gratuito e anonimo.
• **CGIL/CISL/UIL**: si occupano dei casi di lavoro nero, mancato pagamento, discriminazione
• **Carabinieri del Lavoro**: in caso di gravi violazioni (caporalato, sfruttamento)
• **INPS**: per segnalare mancato versamento dei contributi

Non aver paura di denunciare — la legge protegge i lavoratori che segnalano illeciti, anche se stranieri.`,
      ka: `იტალიაში უცხოელ მუშაკებს კანონის მიხედვით იტალიელებთან თანაბარი უფლებები აქვთ.

**ძირითადი უფლებები**

• წერილობითი ხელშეკრულება
• მინიმალური ხელფასი CCNL-ის მიხედვით
• წელიწადში მინიმუმ 4 კვირა შვებულება
• უსაფრთხო სამუშაო გარემო
• TFR — გათავისუფლების შემდეგ გადახდა

**პროფკავშირები**

CGIL, CISL და UIL გთავაზობენ უფასო დახმარებას მათ შორის უცხოელ მუშაკებს.

**სამუშაო ადგილზე ტრავმა**

INAIL-ი ფარავს სამუშაო ადგილზე ყველა ტრავმას.`,
    },
  },
  {
    slug: "lavorare-badante-italia-guida",
    originLang: "it",
    originLabel: "Italiano",
    flag: "🤝",
    category: "Badante",
    publishedAt: "2026-07-08",
    title: {
      it: "Come lavorare come badante in Italia: guida completa 2026",
      ka: "როგორ ვიმუშაოთ ბადანტედ იტალიაში: სრული გზამკვლევი 2026",
    },
    excerpt: {
      it: "Tutto quello che serve sapere per lavorare come badante in Italia: contratto, stipendio, convivenza, diritti, come trovare famiglie serie e come evitare le truffe.",
      ka: "ყველაფერი, რაც საჭიროა იტალიაში ბადანტედ სამუშაოდ: ხელშეკრულება, ხელფასი, უფლებები.",
    },
    body: {
      it: `Il lavoro di badante è uno dei più richiesti in Italia. Con quasi 14 milioni di over 65 e una forte tradizione di assistenza familiare, le famiglie italiane cercano continuamente assistenti affidabili. Ecco tutto quello che devi sapere.

**Cosa fa una badante**

Il termine "badante" deriva dal verbo "badare" (occuparsi di). La badante assiste persone anziane o non autosufficienti nelle attività quotidiane:

• Igiene personale (bagno, vestizione)
• Preparazione dei pasti
• Somministrazione dei farmaci secondo prescrizione
• Accompagnamento a visite mediche
• Compagnia e stimolazione cognitiva
• Piccole faccende domestiche
• Gestione della routine quotidiana

**Badante convivente vs non convivente**

Convivente: vivi in casa dell'assistito. Hai vitto e alloggio inclusi, ma sei disponibile anche di notte in caso di emergenza. Lo stipendio netto è più basso (900-1.300€), ma il valore reale considerando vitto e alloggio è molto più alto.

Non convivente: vai al lavoro e torni a casa tua. Orario definito (di solito 8-12 ore al giorno, 5-6 giorni). Stipendio più alto in termini nominali (1.000-1.500€ per full-time).

**Il contratto CCNL Colf e Badanti**

Il contratto delle badanti è regolato dal CCNL Domestici (il più recente è del 2024). Prevede:

• **Livelli**: la retribuzione varia in base al livello (da D a CS). Una badante con competenze specifiche per anziani non autosufficienti è livello C o CS.
• **Minimo salariale 2026 livello CS** (badante con anziani non autosufficienti): circa 1.050€/mese netti per la non convivente full-time
• **Tredicesima**: obbligatoria a dicembre
• **Ferie**: 26 giorni l'anno
• **Riposo settimanale**: 24 ore consecutive + 8 ore aggiuntive (di solito domenica + altra mezza giornata)
• **TFR**: matura ogni anno e viene pagato alla fine del rapporto

**Come trovare una famiglia seria**

I canali più sicuri per trovare lavoro come badante:
• Portali online specializzati (lavoro8.com, Badante.it, Cuore e Badanti)
• Parrocchie e associazioni di volontariato locali
• Agenzie di assistenza accreditate (più costose ma più sicure)
• Passaparola tra connazionali già inseriti nel settore

Attenzione ai segnali di allarme:
• Famiglie che non vogliono fare il contratto regolare
• Pagamento solo in contanti
• Cambio continuo delle condizioni accordate
• Richiesta di documenti personali in più copie senza motivo

**Documenti per lavorare come badante**

Per cittadini UE: carta d'identità + codice fiscale
Per cittadini non UE: permesso di soggiorno + codice fiscale

I documenti utili ma non obbligatori:
• Certificato di residenza o domicilio
• Referenze scritte di famiglie precedenti (molto valorizzate)
• Eventuale attestato di assistente familiare o OSS
• Certificato di penale carichi pendenti (in alcuni casi richiesto)

**Come calcolare lo stipendio e i contributi**

Quando una famiglia ti assume, paga:
• Il tuo stipendio netto
• I contributi INPS (circa 9-11€ all'ora di lavoro a carico del datore)
• Le ritenute fiscali (IRPEF) che trattiene dal tuo stipendio lordo

Strumento utile: il calcolatore INPS per il lavoro domestico su inps.it ti permette di calcolare esattamente quanto costa la tua assunzione per la famiglia e quanto ricevi tu.

**Specializzarsi per guadagnare di più**

Le badanti con competenze specifiche guadagnano significativamente di più:
• Esperienza con Alzheimer o demenza senile: +15-20% sul salario base
• Conoscenza delle principali patologie geriatriche: più richiesta e meglio pagata
• Capacità di guidare (patente B): molto apprezzata per accompagnamenti
• Corso di primo soccorso: richiesto da molte famiglie

Corsi gratuiti o a basso costo per badanti si trovano presso:
• Comuni e servizi sociali locali
• Caritas e associazioni cattoliche
• Agenzie regionali per la formazione
• Sindacati dei lavoratori domestici

**Cosa fare quando la situazione è difficile**

Il lavoro di badante è emotivamente impegnativo. Ecco i supporti disponibili:
• ACLI COLF: associazione che tutela i lavoratori domestici, con sportelli in tutta Italia
• CGIL/CISL/UIL: hanno sezioni dedicate al lavoro domestico
• In molte città ci sono gruppi di supporto psicologico per badanti — chiediti al tuo Comune

Non isolarti: il passaparola tra badanti della tua comunità è spesso la fonte più preziosa di informazioni pratiche e supporto emotivo.`,
      ka: `ბადანტის სამუშაო ყველაზე მოთხოვნადი იტალიაში — 14 მილიონზე მეტი 65+ წლის ადამიანი.

**ორი ფორმა**

• **კონვივენტი** (სახლში მცხოვრები): 900-1,300€ + კვება + საცხოვრებელი
• **არაკონვივენტი** (ყოველდღე სახლიდან): 1,000-1,500€

**CCNL Colf e Badanti**

სავალდებულო ხელშეკრულება, 26 დღე შვებულება, 13-ე ხელფასი, TFR.

**სპეციალიზაცია = მეტი ხელფასი**

• ალცჰაიმერის გამოცდილება: +15-20%
• პირველი დახმარების კურსი: + ღირებულება
• მართვის მოწმობა: ძალიან სასარგებლო`,
    },
  },
  {
    slug: "lavorare-in-germania-guida-italiani",
    originLang: "it",
    originLabel: "Italiano",
    flag: "🇩🇪",
    category: "Estero",
    publishedAt: "2026-07-06",
    title: {
      it: "Lavorare in Germania nel 2026: guida completa per italiani e stranieri",
      ka: "სამუშაოდ გერმანიაში 2026: სრული გზამკვლევი",
    },
    excerpt: {
      it: "Come trovare lavoro in Germania, trasferirsi, aprire un conto bancario, imparare il tedesco: tutto quello che serve per iniziare la nuova vita in Germania.",
      ka: "გერმანიაში სამუშაოს პოვნა, გადასვლა, ანგარიშის გახსნა — ყველაფერი, რაც გჭირდება.",
    },
    body: {
      it: `La Germania è la prima economia europea e uno dei paesi con la maggiore domanda di manodopera al mondo. Nel 2026 mancano oltre 2 milioni di lavoratori qualificati. Ecco come cogliere questa opportunità.

**Perché la Germania?**

• Salari alti: il salario minimo 2026 è 12,82€/ora (circa 2.100€/mese per 40 ore)
• Disoccupazione ai minimi storici (5%)
• Stato sociale avanzato: sanità, disoccupazione, pensione
• Posizione centrale in Europa (ideale per tornare a casa nei weekend)
• Alta qualità della vita

**I settori più richiesti nel 2026**

• **Logistica e magazzino**: Amazon, DHL, DPD cercano migliaia di addetti. Non serve il tedesco per molte posizioni.
• **Edilizia**: stipendi tra 2.500 e 3.500€/mese per muratori qualificati
• **Assistenza sanitaria**: infermieri e OSS sono tra i più ricercati; la Germania offre programmi specifici per stranieri
• **Produzione industriale**: stabilimenti BMW, Mercedes, Volkswagen e indotto
• **Ristorazione e hotel**: grandi città come Berlino, Monaco, Amburgo
• **Trasporti**: autisti di camion (patente C+E) guadagnano 2.800-3.500€/mese

**Documenti necessari**

Per cittadini UE (italiani, romeni, polacchi, ecc.):
• Passaporto o carta d'identità
• Anmeldung (iscrizione all'anagrafe comunale) entro 2 settimane dall'arrivo
• Steueridentifikationsnummer (numero fiscale): arriva automaticamente per posta dopo l'Anmeldung
• Conto bancario tedesco

Per cittadini non UE:
• Visum zur Beschäftigung (visto di lavoro)
• Anerkennung delle qualifiche (riconoscimento dei titoli di studio)
• Per professioni regolamentate (infermieri, elettricisti): riconoscimento specifico

**Come cercare lavoro prima di partire**

• **Bundesagentur für Arbeit** (arbeitsagentur.de): il portale ufficiale del lavoro tedesco
• **Indeed.de**: il più usato in Germania
• **XING**: il LinkedIn tedesco
• **StepStone.de**: per profili più qualificati
• Contattare direttamente le agenzie interinale tedesche come Randstad Germania, Adecco Germania, Manpower

Molte grandi aziende tedesche (Amazon, BMW, BASF) hanno pagine di career in italiano o con processo di candidatura semplice.

**Il tedesco: quanto serve?**

Dipende dal settore:
• Logistica e produzione: spesso basta il tedesco di base (A2-B1) o anche solo l'inglese
• Edilizia: tedesco B1 necessario per comunicare in cantiere
• Sanità: tedesco B2-C1 obbligatorio per lavorare con i pazienti
• Ufficio e commercio: tedesco C1 necessario

Risorse gratuite per imparare il tedesco:
• App Duolingo e Babbel (per iniziare)
• Deutsche Welle (dw.com) offre corsi gratuiti online
• Istituto Goethe: corsi intensivi a pagamento ma molto efficaci
• Volkshochschule (VHS): corsi economici in ogni città tedesca

**Trovare casa in Germania**

La ricerca casa è il principale ostacolo per chi arriva in Germania. Soluzioni:
• Condivisione appartamento (WG - Wohngemeinschaft): trovate su WG-Gesucht.de
• Aziende con alloggio per dipendenti (chiedilo al momento della candidatura)
• Ostelli e affitti brevi per i primi mesi
• Piattaforme come Immobilienscout24.de, Immonet.de

Attenzione: servono sempre un Schufa-Auskunft (estratto del credito tedesco) e le ultime buste paga per affittare un appartamento.

**Aprire un conto bancario**

Il conto bancario tedesco è fondamentale per ricevere lo stipendio. Opzioni veloci:
• **N26**: banca digitale, si apre online in 10 minuti, accetta documenti esteri
• **Commerzbank** e **Deutsche Bank**: banche tradizionali, richiedono l'Anmeldung
• **Revolut** e **Wise**: utili come ponti prima di aprire un conto tedesco

**Sistema sanitario**

In Germania la sanità è obbligatoriamente assicurata tramite la Krankenkasse. Appena ti assumi, il datore di lavoro iscrive automaticamente te e la tua famiglia alla cassa malattia. Il contributo è circa l'8% del tuo stipendio.

**Quanto puoi risparmiare in Germania?**

Con uno stipendio di 2.000€ netti/mese:
• Affitto (WG): 600-800€
• Cibo: 250-300€
• Trasporti: 80-100€ (Deutschlandticket a 49€/mese)
• Risparmio possibile: 800-1.100€/mese

In Germania si risparmia davvero, specialmente nei primi anni quando si vive in condivisione.`,
      ka: `გერმანია ევროპის პირველი ეკონომიკა — 2026 წელს 2 მილიონზე მეტი მუშა აკლია.

**მოთხოვნადი სფეროები**

• ლოგისტიკა: Amazon, DHL — თუნდაც გერმანული არ იცოდეთ
• მშენებლობა: 2,500-3,500€
• ჯანდაცვა: ექთნები — ყველაზე მოთხოვნადი

**საჭირო დოკუმენტები (UE-ს მოქალაქეებისთვის)**

• პასპორტი
• Anmeldung (რეგისტრაცია) 2 კვირაში
• საგადასახადო ნომერი
• საბანკო ანგარიში

**გერმანული ენა**

• საწყობი: A2 კმარა ან ინგლისური
• მშენებლობა: B1
• ჯანდაცვა: B2-C1 სავალდებულო`,
    },
  },
  {
    slug: "colloquio-lavoro-italia-consigli",
    originLang: "it",
    originLabel: "Italiano",
    flag: "🎤",
    category: "Consigli",
    publishedAt: "2026-07-04",
    title: {
      it: "Colloquio di lavoro in Italia: consigli pratici per fare bella impressione",
      ka: "სამუშაო ინტერვიუ იტალიაში: პრაქტიკული რჩევები",
    },
    excerpt: {
      it: "Come prepararsi per un colloquio di lavoro in Italia: cosa indossare, cosa dire, le domande più frequenti e come rispondere se non parli ancora bene l'italiano.",
      ka: "როგორ მოვემზადოთ სამუშაო ინტერვიუსთვის იტალიაში: ტანსაცმელი, კითხვები, პასუხები.",
    },
    body: {
      it: `Il colloquio di lavoro è il momento decisivo. In Italia il rapporto umano conta moltissimo — spesso si assume la persona con cui si trova meglio in conversazione, non solo quella con il CV migliore. Ecco come prepararti.

**Prima del colloquio: la preparazione**

Ricerca l'azienda: cerca il sito web, leggi cosa fanno, quanti dipendenti hanno, eventuali notizie recenti. Dimostrare di sapere chi sei davanti al datore è un segnale fortissimo di interesse e professionalità.

Rileggi la tua candidatura: ricorda cosa hai scritto nel CV e nella lettera di presentazione — ti faranno domande basate su quello che hai dichiarato.

Prepara delle domande: alla fine del colloquio ti chiederanno "hai domande per noi?". Avere 2-3 domande intelligenti dimostra interesse. Esempi: "Quali sono le prospettive di crescita in questo ruolo?", "Come è organizzato il team?", "Quali sono le sfide principali di questa posizione?"

**Come vestirsi**

In Italia l'aspetto conta. La regola è sempre vestirsi un gradino sopra rispetto a come penserai di vestirsi a lavoro:
• Per magazzino o lavoro manuale: abbigliamento curato ma informale (no tuta, no canottiera)
• Per ristorazione e hotel: elegante-casual
• Per ufficio o banca: formale

Cura l'igiene personale: capelli ordinati, unghie pulite, profumo discreto. In Italia si nota e si apprezza.

**Le domande più frequenti**

"Parlami di te": non raccontare tutta la tua vita. Dai un riassunto professionale di 2-3 minuti: da dove vieni, che esperienza hai, perché hai scelto questo settore, perché vuoi lavorare qui.

"Perché vuoi lavorare da noi?": non dire solo "ho bisogno di soldi". Parla dell'azienda, del settore, delle opportunità di crescita.

"Quali sono i tuoi punti di forza?": cita 2-3 qualità concrete con esempi. "Sono puntuale — nei miei 3 anni in logistica non ho mai avuto assenze non giustificate."

"Quali sono i tuoi punti deboli?": scegli un punto debole reale ma non invalidante, e dimostrate di starlo migliorando. "Tendo ad essere troppo perfezionista, ma sto imparando a bilanciare qualità e velocità."

"Dove ti vedi tra 5 anni?": dimostra ambizione realistica allineata con l'azienda. "Vorrei crescere in questo settore, magari verso un ruolo di coordinamento del team."

"Qual è il tuo stipendio attuale / atteso?": in Italia spesso si chiede. Rispondi con una forchetta basata sulla ricerca di mercato che hai fatto. Non fare la prima offerta — chiedi tu prima: "Che budget avete previsto per questa posizione?"

**Se l'italiano non è perfetto**

Non aver paura di ammettere il tuo livello di italiano. I datori di lavoro apprezzano l'onestà. Puoi dire: "Il mio italiano è a livello B1, capisco bene tutto ma a volte cerco le parole. Sto frequentando un corso per migliorare."

Alcuni consigli per il colloquio se parli un italiano non ancora fluente:
• Parla lentamente e chiaramente, non velocemente e male
• Se non capisci una domanda, chiedi di ripeterla: "Scusi, può ripetere?"
• Usa frasi semplici e complete piuttosto che frasi complesse e scorrette
• Porta un dizionario sullo smartphone (non usarlo durante il colloquio, ma puoi preparare parole chiave prima)

**Il linguaggio del corpo**

In Italia il linguaggio del corpo è parte della comunicazione:
• Stretta di mano ferma all'inizio e alla fine
• Contatto visivo durante la conversazione
• Non incrociare le braccia (sembra che ti stai difendendo)
• Sorridi: l'Italia è un paese dove la simpatia conta

**Dopo il colloquio**

Invia un'email di ringraziamento entro 24 ore: "Gentile [nome], la ringrazio per il tempo dedicato al colloquio di oggi. Ho apprezzato molto conoscere la vostra realtà aziendale e rimango a disposizione per qualsiasi ulteriore informazione."

Se non hai notizie entro una settimana, puoi mandare un follow-up: "Buongiorno, volevo risentirla per sapere se avete preso una decisione riguardo alla candidatura. Resto in attesa."

**Le truffe nei colloqui di lavoro**

Attenzione a queste situazioni che dovrebbero allarmarti:
• Ti chiedono soldi per "formare un fascicolo" o "verificare i documenti" — è sempre illegale
• Il colloquio è completamente online con un "manager" che non mostra il volto
• Il contratto arriverà via email senza mai incontrarsi di persona
• L'offerta è troppo alta rispetto alla media (es. 3.000€ per un lavoro da ristorante)

Usa sempre piattaforme verificate come lavoro8.com e controlla la P.IVA dell'azienda sul Registro delle Imprese (imprese.italia.it).`,
      ka: `სამუშაო ინტერვიუ იტალიაში — ადამიანური კონტაქტი ძალიან მნიშვნელოვანია.

**მომზადება**

• კომპანიის ვებგვერდი გადახედეთ
• CV-ი გადაიხედეთ
• 2-3 კითხვა მოამზადეთ

**ჩაცმულობა**

ყოველთვის ოდნავ უფრო ოფიციალურად ჩაიცვით, ვიდრე ფიქრობთ საჭიროა.

**ხშირი კითხვები**

• "Parlami di te" — 2-3 წუთი პროფესიული სარეზიუმე
• "Perché vuoi lavorare da noi?" — კომპანიის შესახებ კომენტარი
• "Quali sono i tuoi punti di forza?" — კონკრეტული მაგალითებით

**თუ იტალიური კარგად არ იცით**

პირდაპირ თქვით დონე — ეს პატიოსნებაა. ნელ-ნელა ლაპარაკი სჯობია სწრაფ, მაგრამ გაუგებარ მეტყველებას.`,
    },
  },
  {
    slug: "lavorare-in-italia-guida-romeni",
    originLang: "ro",
    originLabel: "Română",
    flag: "🇷🇴",
    category: "Magazzino",
    publishedAt: "2026-07-01",
    title: {
      it: "Lavorare in Italia: guida per lavoratori romeni",
      ro: "Lucrul în Italia: ghid pentru muncitorii români",
    },
    excerpt: {
      it: "Tutto quello che serve sapere per trovare lavoro in Italia partendo dalla Romania: documenti, settori più richiesti, stipendi medi e consigli pratici.",
      ro: "Tot ce trebuie să știi pentru a găsi de lucru în Italia venind din România: documente, sectoare căutate, salarii medii.",
    },
    body: {
      it: `L'Italia rimane una delle destinazioni preferite dai lavoratori romeni grazie alla vicinanza culturale, alla lingua facilmente comprensibile e alla forte richiesta di manodopera nei settori della logistica, ristorazione e assistenza.

**Documenti necessari**

Essendo cittadino UE, non serve un permesso di lavoro. Ti basta:
• Carta d'identità o passaporto valido
• Codice fiscale italiano (si richiede gratuitamente all'Agenzia delle Entrate o online)
• Iscrizione all'anagrafe comunale dopo 90 giorni (obbligatoria per legge)
• Tessera sanitaria (si ottiene iscrivendosi al SSN tramite il medico di base)

**Riconoscimento dei titoli di studio**

I titoli di studio romeni sono riconosciuti in Italia per la maggior parte delle professioni non regolamentate (magazzino, ristorazione, edilizia). Per professioni regolamentate (medici, avvocati, ingegneri) serve il riconoscimento formale tramite il Ministero competente.

**Settori più richiesti**

• **Magazzino e logistica**: Amazon, GLS, BRT, DHL, TNT — stipendi 1.400-1.800€/mese con contratto CCNL logistica
• **Edilizia**: muratori, carpentieri, piastrellisti — molto richiesti al Nord, stipendi 1.600-2.200€/mese
• **Assistenza familiare (badante)**: vitto e alloggio spesso incluso, 900-1.400€/mese
• **Ristorazione e hotel**: soprattutto in stagione, molte strutture assumono e offrono vitto+alloggio
• **Agricoltura**: vendemmia, olive, pomodori — lavoro stagionale ma ben retribuito con i giusti datori

**Dove sono le maggiori opportunità**

• **Lombardia** (Milano e provincia): logistica, industria, servizi
• **Veneto** (Verona, Padova, Treviso): manifattura, edilizia, agroalimentare
• **Emilia-Romagna** (Bologna, Modena, Reggio Emilia): logistica, food
• **Lazio** (Roma): servizi, ristorazione, turismo
• **Toscana**: turismo, agricoltura, artigianato

**Stipendi medi per settore**

Il salario minimo in Italia non è fissato per legge ma dai CCNL di settore. Ecco le medie nette:
• Magazzino: 1.300-1.600€/mese
• Edilizia qualificata: 1.700-2.200€/mese
• Ristorazione: 1.100-1.500€/mese (+ mance)
• Assistenza anziani: 900-1.400€/mese
• Industria manifatturiera: 1.400-1.800€/mese

**Come trovare lavoro verificato**

Usa piattaforme con annunci verificati come lavoro8.com, Indeed.it, InfoJobs. Evita i gruppi Facebook dove circolano offerte spesso false o da caporali.

Segnali di offerta seria:
• P.IVA o ragione sociale dell'azienda indicata
• Contratto regolare esplicitamente menzionato
• Colloquio di persona o video reale
• Nessuna richiesta di denaro

**Consigli pratici per i primi mesi**

• Apri un conto bancario italiano o europeo (Revolut, N26 funzionano bene nell'attesa)
• Cerca casa tramite gruppi di connazionali fidati o agenzie serie — diffidate dalle stanze affittate senza contratto
• Iscriviti al sindacato (CGIL, CISL, UIL) già dal primo giorno: ti tutela e aiuta con le pratiche burocratiche
• Impara le frasi base italiane di lavoro — anche solo 50-100 frasi ti danno un vantaggio enorme`,
      ro: `Italia rămâne una dintre destinațiile preferate de muncitorii români datorită proximității culturale, limbii ușor de înțeles și cererii mari de forță de muncă.

**Documente necesare**

Fiind cetățean UE, nu ai nevoie de permis de muncă:
• Carte de identitate sau pașaport valid
• Cod fiscal italian (codice fiscale) — gratuit la Agenzia delle Entrate
• Înregistrare la comună după 90 de zile
• Card de sănătate prin medicul de familie

**Sectoare cu cerere mare**

• Depozit și logistică: 1.400-1.800€/lună (Amazon, GLS, DHL)
• Construcții: 1.600-2.200€/lună
• Îngrijire vârstnici (badantă): 900-1.400€ + cazare și masă
• Restaurante și hoteluri: 1.100-1.500€ + bacșiș
• Agricultură sezonieră

**Unde sunt mai multe oportunități**

• Lombardia (Milano): logistică, industrie
• Veneto (Verona, Padova): construcții, alimentar
• Emilia-Romagna (Bologna): logistică
• Lazio (Roma): servicii, turism

**Sfaturi practice**

• Deschide cont bancar italian sau european
• Înscrie-te la sindicat din prima zi
• Folosește platforme verificate ca lavoro8.com
• Evită grupurile Facebook cu oferte neverificate`,
    },
  },
  {
    slug: "lavorare-in-italia-guida-ucraini",
    originLang: "uk",
    originLabel: "Українська",
    flag: "🇺🇦",
    category: "Logistica",
    publishedAt: "2026-07-03",
    title: {
      it: "Lavorare in Italia: guida per lavoratori ucraini",
      uk: "Робота в Італії: путівник для українських працівників",
    },
    excerpt: {
      it: "Come trovare lavoro in Italia arrivando dall'Ucraina: permesso di protezione temporanea, settori aperti, dove cercare annunci sicuri e consigli pratici.",
      uk: "Як знайти роботу в Італії, приїхавши з України: дозвіл на тимчасовий захист, доступні сектори, де шукати надійні вакансії.",
    },
    body: {
      it: `I cittadini ucraini che beneficiano della protezione temporanea UE possono lavorare legalmente in Italia senza bisogno di un permesso di lavoro separato. Questa guida ti spiega tutto il necessario.

**La protezione temporanea: cos'è e quanto dura**

La Direttiva UE sulla Protezione Temporanea (attivata nel marzo 2022) permette ai cittadini ucraini fuggiti dalla guerra di risiedere e lavorare liberamente in tutti i paesi UE. In Italia il permesso viene rilasciato dalle Questure con una durata di 1 anno, rinnovabile.

Chi ne beneficia:
• Cittadini ucraini e loro familiari presenti in Ucraina prima del 24 febbraio 2022
• Apolidi e rifugiati riconosciuti in Ucraina

**Documenti necessari per lavorare**

• Permesso di soggiorno per protezione temporanea (rilasciato dalla Questura)
• Codice fiscale italiano (gratuito all'Agenzia delle Entrate o online su agenziaentrate.gov.it)
• Tessera sanitaria (si ottiene dal medico di base dopo l'iscrizione al SSN)

**Settori più aperti per i lavoratori ucraini**

• **Magazzino e logistica**: molte aziende assumono rapidamente, non serve l'italiano per molte posizioni entry-level. Stipendi 1.300-1.700€/mese.
• **Rider e consegne**: flessibile, buono per chi inizia o vuole orari adattabili
• **Pulizie e colf**: richiesta costante nelle grandi città — stipendi 10-14€/ora
• **Ristorazione**: soprattutto nelle zone turistiche, con o senza esperienza
• **Assistenza anziani (badante)**: settore con grande richiesta, vitto e alloggio inclusi
• **Industria manifatturiera**: molte fabbriche del Nord assumono con formazione rapida

**Dove cercare lavoro in Italia**

Piattaforme online verificate:
• lavoro8.com — offerte verificate in tutta Italia
• Indeed.it — molti annunci di aziende dirette
• InfoJobs.it — lavori per tutti i livelli

Sportelli locali:
• Centro per l'Impiego (CPI) del tuo comune: iscritti possono ricevere offerte mirate
• Caritas diocesana: supporto pratico e orientamento lavoro per rifugiati
• CGIL/CISL/UIL: sindacati con supporto in lingua ucraina in molte città

**Riconoscimento dei titoli di studio**

Se hai una laurea o un diploma tecnico ucraino, puoi richiederne il riconoscimento in Italia. Per professioni non regolamentate (magazzino, ristorazione, edilizia) non è necessario — la tua esperienza basta.

Per professioni regolamentate (medico, ingegnere, avvocato), contatta il Ministero dell'Istruzione o l'Ordine professionale competente.

**Imparare l'italiano: risorse gratuite**

• Scuole serali comunali (Centri Provinciali per l'Istruzione degli Adulti — CPIA): corsi gratuiti
• Corsi per rifugiati organizzati da Caritas, CRI e volontariato
• App Duolingo (italiano dal russo o dall'ucraino)
• Radio e TV italiana: YouTube con sottotitoli
• Gruppi di conversazione in molte città

**Supporto psicologico e sociale**

Molte associazioni italiane offrono supporto specifico per i lavoratori ucraini:
• Croce Rossa Italiana (CRI): assistenza pratica e psicologica
• Caritas: orientamento e supporto economico
• UNHCR Italia: tutela dei diritti e informazioni legali

**Consigli pratici per iniziare**

• Registrati all'anagrafe comunale e al medico di base: questi due passaggi aprono porte a molti servizi
• Apri un conto Revolut o N26 subito — funzionano anche senza permesso di residenza stabile
• Connettiti con la comunità ucraina locale: il passaparola è la fonte più rapida di informazioni pratiche`,
      uk: `Громадяни України з тимчасовим захистом можуть легально працювати в Італії без окремого дозволу на роботу.

**Необхідні документи**
• Посвідка на проживання за тимчасовим захистом
• Італійський податковий код (безкоштовно)
• Медична картка від сімейного лікаря

**Найдоступніші сектори**
• Склад і логістика: 1.300-1.700€/міс
• Прибирання: 10-14€/год
• Ресторани: 1.100-1.500€/міс
• Доглядальниця (badante): 900-1.400€ + проживання та харчування

**Де шукати роботу**
• lavoro8.com — перевірені вакансії
• Indeed.it
• Центр зайнятості (Centro per l'Impiego)
• Caritas — підтримка та орієнтація

**Вивчення італійської мови**
Безкоштовні курси у школах CPIA, Caritas, та через додаток Duolingo.`,
    },
  },
  {
    slug: "lavorare-in-italia-guida-albanesi",
    originLang: "sq",
    originLabel: "Shqip",
    flag: "🇦🇱",
    category: "Edilizia",
    publishedAt: "2026-07-05",
    title: {
      it: "Lavorare in Italia: guida per lavoratori albanesi",
      sq: "Puna në Itali: udhëzues për punëtorët shqiptarë",
    },
    excerpt: {
      it: "Guida pratica per chi arriva dall'Albania e cerca lavoro in Italia: permesso di soggiorno, settori richiesti, stipendi e come trovare un datore di lavoro serio.",
      sq: "Udhëzues praktik për ata që vijnë nga Shqipëria dhe kërkojnë punë në Itali.",
    },
    body: {
      it: `L'Albania ha una lunga tradizione di lavoratori emigrati in Italia, soprattutto nei settori dell'edilizia, agricoltura e ristorazione. Con oltre 440.000 albanesi regolarmente residenti, l'Albania è tra le prime comunità straniere in Italia.

**Documenti necessari per lavoratori non UE (albanesi)**

L'Albania non è nell'UE, quindi serve il permesso di lavoro:

• **Nulla Osta al Lavoro**: il datore di lavoro italiano deve richiederlo allo Sportello Unico per l'Immigrazione (SUI) prima che tu parta dall'Albania
• **Visto per lavoro subordinato**: si richiede al Consolato Italiano in Albania una volta ottenuto il nulla osta
• **Permesso di soggiorno**: da richiedere entro 8 giorni dall'arrivo in Italia
• **Codice fiscale**: gratuito all'Agenzia delle Entrate

**Il Decreto Flussi**

Ogni anno l'Italia pubblica il Decreto Flussi che determina quanti lavoratori non UE possono entrare in Italia per lavorare. Il "click day" (la data di apertura delle domande) è molto atteso dalla comunità albanese. Informati in anticipo tramite il sito del Ministero dell'Interno o il Consolato Italiano a Tirana.

**Riconoscimento dei titoli professionali**

L'Albania ha accordi di cooperazione con l'Italia per il riconoscimento di alcune qualifiche. Per l'edilizia, le competenze pratiche vengono spesso valutate direttamente dal datore di lavoro.

**Settori più richiesti**

• **Edilizia**: muratori, carpentieri, piastrellisti, elettricisti — molto richiesti al Nord. Stipendi netti 1.600-2.200€/mese per qualificati
• **Agricoltura**: stagionale ma con buoni guadagni. Vendemmia (settembre-ottobre), olive (ottobre-dicembre), pomodori (luglio-agosto)
• **Ristorazione e hotel**: soprattutto camerieri, lavapiatti, cuochi
• **Magazzino e logistica**: molte aziende assumono senza esperienza specifica

**Il vantaggio della lingua**

Molti albanesi parlano italiano abbastanza bene grazie alla televisione italiana. Questo è un vantaggio enorme nel mercato del lavoro italiano — valorizzalo nel CV e nei colloqui.

**Come trovare un datore serio**

Canali sicuri:
• Agenzie per il lavoro italiane autorizzate (lista sul sito ANPAL)
• Portali verificati come lavoro8.com
• Consulato Italiano a Tirana: fornisce liste di agenzie accreditate
• Rete di connazionali già in Italia con contratto regolare

Attenzione ai segnali di truffa:
• Richiesta di pagamento per garantire il posto
• Promessa di nulla osta già pronto senza mai aver comunicato con un'azienda italiana reale
• Offerte di stipendi irrealisticamente alti

**Vita pratica in Italia**

• Casa: molte comunità albanesi in Italia aiutano i nuovi arrivati nella ricerca della prima sistemazione
• Banca: apri un conto PostePay o Revolut subito dopo l'arrivo — non aspettare di avere tutti i documenti definitivi
• Medico: iscriviti subito al medico di base — è gratuito e fondamentale
• Scuola per i figli: la scuola pubblica italiana è gratuita e obbligatoria per tutti i minori, indipendentemente dallo status`,
      sq: `Shqipëria ka traditë të gjatë emigrimi në Itali — mbi 440.000 shqiptarë jetojnë aty rregullisht.

**Dokumentet e nevojshme**

• Nulla osta al lavoro (nga punëdhënësi italian)
• Viza për punë (nga Konsullata Italiane në Tiranë)
• Leje qëndrimi brenda 8 ditëve nga mbërritja
• Kodi fiskal (falas)

**Dekreti i Flukseve**

Çdo vit Italia lëshon kuota pune për shtetasit jo-BE. Ndiqni njoftimet nga Ministria e Brendshme italiane ose Konsullata Italiane në Tiranë.

**Sektorët më të kërkuar**

• Ndërtimi: 1.600-2.200€/muaj neto
• Bujqësia sezonale (vjelja e rrushit, ullinjve)
• Restorante dhe hotele
• Depo dhe logjistikë

**Avantazhi juaj**

Shumë shqiptarë flasin italisht falë televizionit italian — ky është avantazh i madh në tregun e punës.`,
    },
  },
  {
    slug: "lavorare-in-italia-guida-georgiani",
    originLang: "ka",
    originLabel: "ქართული",
    flag: "🇬🇪",
    category: "Badante",
    publishedAt: "2026-07-07",
    title: {
      it: "Lavorare in Italia: guida per lavoratori georgiani",
      ka: "მუშაობა იტალიაში: სრული გზამკვლევი ქართველი მუშაკებისთვის",
    },
    excerpt: {
      it: "Come trovare lavoro in Italia partendo dalla Georgia: visto, permesso di soggiorno, settori più richiesti come assistenza familiare e ristorazione, e come evitare le truffe.",
      ka: "როგორ ვიპოვოთ სამუშაო იტალიაში საქართველოდან: ვიზა, ბინადრობის ნებართვა, ყველაზე მოთხოვნადი სფეროები.",
    },
    body: {
      it: `Molti lavoratori georgiani scelgono l'Italia per lavorare nel settore dell'assistenza familiare (badanti), ristorazione e pulizie, settori dove la richiesta è costante e crescente.

**Status legale: visto e permesso di soggiorno**

La Georgia non fa parte dell'UE. Per lavorare legalmente in Italia hai bisogno di:

• **Nulla osta al lavoro**: il datore di lavoro italiano deve ottenerlo per te presso lo Sportello Unico per l'Immigrazione (SUI) prima che tu venga in Italia
• **Visto D per lavoro**: si richiede all'Ambasciata Italiana a Tbilisi dopo aver ottenuto il nulla osta
• **Permesso di soggiorno**: da richiedere entro 8 giorni dall'arrivo in Italia
• **Codice fiscale**: obbligatorio, si ottiene gratuitamente

**Il Decreto Flussi: l'opportunità principale**

Ogni anno l'Italia stabilisce quante persone non UE possono entrare per lavorare. Per la Georgia ci sono quote specifiche, soprattutto per il lavoro domestico e agricolo. Il processo:
1. Un datore di lavoro italiano presenta la domanda di nulla osta il giorno del click-day
2. Se accettata, ricevi la comunicazione e puoi richiedere il visto
3. Arrivi in Italia e fai il permesso di soggiorno

Informati sulle date del click-day tramite il sito del Ministero dell'Interno italiano o l'Ambasciata Italiana a Tbilisi.

**I settori più richiesti per i georgiani**

• **Assistenza familiare (badante)**: il settore principale. Vitto e alloggio spesso inclusi. Stipendi 900-1.400€/mese. Le famiglie italiane apprezzano le badanti georgiane per affidabilità e cura.
• **Colf e pulizie**: richiesta nelle grandi città, 10-15€/ora
• **Ristorazione**: cuochi e camerieri, stipendi 1.100-1.600€/mese
• **Magazzino e logistica**: nelle grandi città del Nord, buone possibilità
• **Edilizia**: muratori e manovali con esperienza trovano lavoro rapidamente al Nord

**Come trovare un datore di lavoro serio**

Questo è il passo più importante e più delicato. Canali sicuri:
• **Ambasciata Italiana a Tbilisi**: ha una lista di agenzie accreditate
• **Portali verificati**: lavoro8.com, Badante.it per il lavoro domestico
• **Rete di connazionali**: la comunità georgiana in Italia (circa 30.000 persone) è una risorsa preziosa
• **ACLI COLF** e **DOMINA**: associazioni che aiutano nella ricerca di lavoro domestico regolare

**Attenzione alle truffe**

Purtroppo esistono persone che si approfittano della voglia di lavorare dei georgiani. Segnali di allarme:
• Chiedono soldi per "trovare il posto" o "fare le pratiche" — è illegale
• Promettono visto o nulla osta già pronti senza mai aver parlato con un vero datore di lavoro italiano
• Offrono stipendi irrealisticamente alti o condizioni troppo belle

Non pagare mai intermediari. Il costo della procedura legale per il datore è a suo carico, non tuo.

**La comunità georgiana in Italia**

Circa 30.000 georgiani vivono regolarmente in Italia. Le principali concentrazioni sono a Roma, Milano, Torino, Genova. Molte associazioni georgiane offrono supporto pratico ai nuovi arrivati:
• Informazioni legali e burocratiche
• Aiuto nella ricerca di alloggio
• Supporto psicologico per chi si sente solo nei primi mesi
• Corsi di italiano

**Imparare l'italiano**

Anche un italiano di base (A2-B1) fa una differenza enorme sul mercato del lavoro. Risorse:
• App Duolingo (ha il corso italiano dal georgiano)
• YouTube: cerca "italiano per principianti"
• Centri di lingua italiana organizzati da Caritas e associazioni in Italia
• Radio italiana online: ascoltare italiano passivamente aiuta molto

**I diritti delle badanti georgiane**

Come badante regolarmente assunta, hai diritto a:
• Contratto CCNL Colf e Badanti
• 26 giorni di ferie l'anno
• Tredicesima a dicembre
• TFR (liquidazione) alla fine del rapporto
• Assicurazione malattia INPS
• Pensione (dopo anni di contributi)

Non accettare mai di lavorare senza contratto: non solo perdi i diritti, ma rischi anche il permesso di soggiorno.`,
      ka: `ბევრი ქართველი მუშაობს იტალიაში — ძირითადად ბადანტის, კოლფის, სარესტორნო სფეროში.

**სამართლებრივი სტატუსი**

• Nulla osta — დამსაქმებელმა უნდა მოიპოვოს
• D ვიზა — თბილისში იტალიის საელჩოდან
• ბინადრობის ნებართვა — 8 დღეში ჩასვლის შემდეგ

**Decreto Flussi — მთავარი შესაძლებლობა**

ყოველწლიური კვოტა, განსაკუთრებით სახლის მოვლის და სოფლის მეურნეობის სამუშაოებისთვის.

**ყველაზე მოთხოვნადი სფეროები**

• ბადანტე: 900-1,400€ + კვება + საცხოვრებელი
• კოლფი: 10-15€/საათი
• რესტორანი: 1,100-1,600€
• საწყობი/ლოგისტიკა: 1,300-1,700€

**თაღლითობა — ფრთხილად!**

არასდროს გადაუხადოთ შუამავლებს ადგილის "მოძიებისთვის" — ეს უკანონოა. გამოიყენეთ მხოლოდ დადასტურებული პლატფორმები.

**ქართული თემი იტალიაში**

დაახლოებით 30,000 ქართველი ცხოვრობს იტალიაში — რომი, მილანი, ტურინი. ისინი პირველი დახმარების წყარო არიან.`,
    },
  },
  {
    slug: "come-evitare-truffe-lavoro-estero",
    originLang: "it",
    originLabel: "Italiano",
    flag: "🚨",
    category: "Sicurezza",
    publishedAt: "2026-07-02",
    title: {
      it: "Come riconoscere e evitare le truffe sul lavoro all'estero",
      ka: "როგორ ამოვიცნოთ და თავიდან ავიცილოთ სამუშაო თაღლითობა",
    },
    excerpt: {
      it: "Guida per riconoscere le offerte di lavoro false in Italia e in Europa: i segnali d'allarme, le truffe più diffuse e cosa fare se sei già vittima.",
      ka: "გზამკვლევი სამუშაო შეთავაზებების თაღლითობის ამოსაცნობად.",
    },
    body: {
      it: `Ogni anno migliaia di lavoratori vengono truffati da false offerte di lavoro. La truffa può essere semplice (soldi persi) o grave (sfruttamento, situazioni pericolose). Conoscere i segnali d'allarme è fondamentale.

**Le truffe più diffuse nel 2026**

**Truffa 1 — Il "facilitatore" che chiede soldi**
Una persona (spesso nella tua stessa comunità o paese) si presenta come chi sa come trovare lavoro in Italia o Europa e chiede 500-3.000€ per "pratiche", "visto garantito" o "posto sicuro". Spesso sparisce con i soldi o ti manda in una situazione di sfruttamento.

La regola d'oro: nessuno che ti aiuta a trovare un lavoro legittimo ti chiede denaro. I costi delle pratiche legali (permesso, nulla osta) sono sempre a carico del datore di lavoro.

**Truffa 2 — L'annuncio di lavoro falso online**
L'annuncio promette uno stipendio altissimo per un lavoro semplice, spesso all'estero. Quando rispondi, ti chiedono di pagare per il visto, il trasporto o la "cauzione" per l'alloggio. Non vedrai mai né il lavoro né i tuoi soldi.

**Truffa 3 — Il finto colloquio via social**
Un "responsabile HR" ti contatta su WhatsApp, Instagram o Telegram con un'offerta di lavoro. Il colloquio avviene solo in chat o con video truccato. Ti chiedono i documenti e poi soldi per "spese di registrazione". È una truffa.

**Truffa 4 — Il caporalato**
Qualcuno ti promette lavoro agricolo o in edilizia, ti porta in Italia (a sue spese), ma poi ti richiede il rimborso con interesse, ti trattiene i documenti e ti fa lavorare in condizioni illegali. Il caporalato è un reato grave in Italia (art. 603-bis cp) punito con anni di carcere.

**Truffa 5 — L'alloggio fantasma**
Ti affittano una stanza pagata anticipatamente, ma quando arrivi l'indirizzo non esiste o la casa è completamente diversa da quella mostrata nelle foto. Perdi il deposito e ti ritrovi senza casa.

**I segnali d'allarme da non ignorare**

• Ti chiedono soldi PRIMA di iniziare a lavorare (per qualsiasi motivo)
• Lo stipendio proposto è 2x o 3x la media del settore senza spiegazione
• Non c'è mai un colloquio di persona o una videochiamata reale
• Il datore di lavoro non ha un sito web, una ragione sociale o una P.IVA verificabile
• Ti mandano il contratto ma non puoi parlare con nessuno di persona
• L'offerta arriva da profili social creati di recente senza storia

**Come verificare un'offerta di lavoro**

1. **Cerca la ragione sociale**: cerca il nome dell'azienda sul Registro delle Imprese (imprese.italia.it) — è gratuito e pubblico
2. **Verifica il sito**: un'azienda seria ha un sito web professionale con contatti reali
3. **Chiedi referenze**: chiedi il nome di colleghi già assunti o di chi lavora lì
4. **Colloquio fisico o video reale**: esigi un colloquio video reale (Zoom, Teams) non solo WhatsApp
5. **Non pagare nulla**: nessun datore legittimo ti chiede soldi

**Se sei già vittima di una truffa**

• **In Italia**: chiama il numero antitruffa della Polizia di Stato (113) o vai alla caserma dei Carabinieri più vicina
• **Per il caporalato**: chiama il numero antitratta 800 290 290 (gratuito, attivo h24)
• **Per truffa online**: segnala alla Polizia Postale (commissariatodips.it)
• **Per recuperare i soldi**: denuncia all'Autorità Garante della Concorrenza e del Mercato (AGCM)

**Piattaforme sicure per cercare lavoro**

Per evitare le truffe, usa sempre piattaforme verificate:
• lavoro8.com: annunci verificati con P.IVA dell'azienda
• Indeed.it: profilo azienda verificato
• InfoJobs.it
• LinkedIn: profili aziendali con storia verificabile
• Siti ufficiali delle aziende (Amazon Jobs, Lidl Careers, ecc.)

**Consigli finali**

Fidati del tuo istinto: se qualcosa sembra troppo bello per essere vero, probabilmente lo è. Un lavoro legittimo non richiede fretta, denaro anticipato o segreto. Prima di fare qualsiasi pagamento o firmare qualsiasi documento che non capisci bene, chiedi consiglio a un sindacato (CGIL, CISL, UIL) o a un'associazione di tutela.`,
      ka: `ყოველწლიურად ათასობით მუშაკი ხდება თაღლითობის მსხვერპლი. ამოიცანით სიგნალები.

**ყველაზე გავრცელებული თაღლითობები**

• "შუამავალი" რომელიც ფულს ითხოვს — ნებისმიერი მიზეზით
• არარეალურად მაღალი ხელფასი
• ყალბი სამუშაო განცხადება სოციალურ ქსელებში
• კაპორალატო — მონური მუშაობის პირობები

**გამაფრთხილებელი სიგნალები**

• სამუშაოს დაწყებამდე ფულის მოთხოვნა
• ხელფასი ბაზრის საშუალოს 2-3 ჯერ აღემატება
• პირადი შეხვედრა ან რეალური ვიდეო-ზარი არ არის
• კომპანიის ოფიციალური ვებგვერდი არ არსებობს

**დასარწმუნებლად**

• imprese.italia.it — კომპანიის P.IVA შეამოწმეთ (უფასო)
• ოფიციალური ვებგვერდი, რეალური კონტაქტი
• არასოდეს გადაიხადოთ

**თუ მსხვერპლი გახდით**

• პოლიციის ნომერი: 113
• ანტიტრეფიკინგი: 800 290 290 (უფასო, 24/7)`,
    },
  },
  {
    slug: "trovare-casa-italia-stranieri",
    originLang: "it",
    originLabel: "Italiano",
    flag: "🏠",
    category: "Consigli",
    publishedAt: "2026-07-16",
    title: {
      it: "Come trovare casa in Italia da straniero: guida pratica 2026",
      ka: "როგორ ვიპოვოთ სახლი იტალიაში უცხოელად: პრაქტიკული გზამკვლევი",
    },
    excerpt: {
      it: "Trovare una stanza o un appartamento in Italia da straniero può essere difficile. Ecco tutti i canali, i documenti necessari e come evitare le truffe immobiliari.",
      ka: "იტალიაში საცხოვრებლის პოვნა უცხოელად — სრული გზამკვლევი.",
    },
    body: {
      it: `Trovare casa in Italia da straniero è spesso la sfida più grande dei primi mesi. Molti proprietari sono diffidenti verso chi non ha una storia lavorativa italiana, ma con la giusta strategia è possibile trovare soluzioni buone e sicure.

**I canali principali per trovare casa**

• **Immobiliare.it e Idealista.it**: i due portali più grandi d'Italia per affitti e vendite. Filtri per città, prezzo, numero di camere, tipo (monolocale, bilocale, ecc.)
• **Bakeca.it**: ottimo per stanze in affitto singola e camere in appartamenti condivisi
• **Facebook Marketplace e gruppi locali**: "Affitti Roma", "Stanze Milano" — spesso si trovano offerte dirette dal proprietario senza agenzia
• **Subito.it**: simile a Bakeca, ampio catalogo
• **Agenzie immobiliari**: più costose (di solito 1 mese di affitto come commissione) ma più sicure per chi non conosce bene la zona

**Stanza in condivisione (la soluzione migliore per iniziare)**

Per chi arriva dall'estero e non ha ancora uno stipendio italiano, la stanza in condivisione (appartamento condiviso con altri inquilini) è spesso la soluzione più accessibile:
• Costo: 300-600€/mese a Roma, Milano, Torino; 200-400€ nelle città più piccole
• Spese incluse nella maggior parte dei casi
• Non serve garanzia bancaria
• Si trova in pochi giorni

Cerca nei gruppi Facebook della tua comunità (georgiani a Milano, romeni a Roma, ecc.) — il passaparola è spesso il canale più veloce e affidabile.

**Documenti richiesti per affittare**

I proprietari italiani di solito chiedono:
• Documento di identità valido (passaporto o carta d'identità)
• Codice fiscale italiano (obbligatorio per il contratto)
• Permesso di soggiorno (per i non UE)
• Ultime 3 buste paga o contratto di lavoro
• In assenza di buste paga: garanzia di un garante italiano o deposito più alto

**I tipi di contratto di affitto**

• **4+4 (contratto libero)**: durata 4 anni, rinnovabile di altri 4. Il canone è libero. Il più comune.
• **3+2 (contratto agevolato)**: canone concordato (più basso), agevolazioni fiscali per il proprietario. Più raro ma conveniente per inquilini con redditi bassi.
• **Contratto transitorio**: da 1 a 18 mesi. Ideale per chi non sa quanto starà.
• **Affitto breve (Airbnb-style)**: mese per mese ma molto più costoso.

**Il deposito cauzionale**

Il deposito (caparra) è di solito 2-3 mesi di affitto, che il proprietario tiene come garanzia. Viene restituito alla fine del contratto se l'appartamento è in buone condizioni. Per legge non può superare 3 mensilità.

**Le spese condominiali**

Oltre all'affitto, ci sono spesso spese condominiali (condominio). Chiedi sempre se sono incluse nel prezzo o escluse e qual è l'importo mensile.

**Residenza anagrafica: perché è importante**

Dopo aver trovato casa, puoi richiedere la residenza anagrafica (iscrizione al comune). Questo è fondamentale per:
• Richiedere il medico di base (SSN)
• Rinnovare il permesso di soggiorno
• Votare (per i cittadini UE)
• Accedere a molti servizi pubblici

Il proprietario deve autorizzarti a prendere la residenza — verificalo prima di firmare.

**Truffe immobiliari: come riconoscerle**

• Annuncio con foto bellissime ma prezzo molto basso per la zona
• Il "proprietario" è all'estero e non può incontrarsi di persona
• Ti chiedono di pagare il deposito via bonifico prima di vedere la casa
• Il contratto arriva solo via email e non è mai registrato all'Agenzia delle Entrate
• La chiave "arriverà per posta" dopo il pagamento

Non pagare mai prima di aver visto la casa di persona e aver verificato i documenti del proprietario (visura catastale disponibile su agenziaentrate.gov.it).

**Costi medi per città nel 2026**

• **Milano**: stanza 500-800€, monolocale 900-1.400€
• **Roma**: stanza 400-700€, monolocale 700-1.200€
• **Torino**: stanza 300-550€, monolocale 550-900€
• **Bologna**: stanza 400-600€, monolocale 650-1.000€
• **Napoli**: stanza 250-450€, monolocale 450-750€
• **Palermo/Catania**: stanza 200-380€, monolocale 380-600€

**Consigli finali**

Non cercare la sistemazione perfetta subito — è meglio partire con una stanza temporanea e poi trovare qualcosa di meglio una volta inseriti nel contesto locale. Molti appartamenti si trovano tramite il passaparola lavorativo: colleghi già sistemati spesso sanno di stanze disponibili vicino al posto di lavoro.`,
      ka: `იტალიაში სახლის პოვნა უცხოელად ხშირად ყველაზე რთული გამოწვევაა.

**ძირითადი პლატფორმები**
• Immobiliare.it, Idealista.it — ბინები
• Bakeca.it — ოთახები გაზიარებით
• Facebook Marketplace — პირდაპირ მფლობელებისგან

**ფასები 2026**
• მილანი: ოთახი 500-800€, სტუდია 900-1,400€
• რომი: ოთახი 400-700€, სტუდია 700-1,200€
• ტურინი: ოთახი 300-550€

**საჭირო დოკუმენტები**
• პასპორტი, codice fiscale, ბინადრობა
• ბოლო 3 ხელფასი ან სამუშაო ხელშეკრულება

**თაღლითობა**
არასდროს გადაიხადოთ სახლის ნახვამდე და დოკუმენტების გადამოწმებამდე.`,
    },
  },
  {
    slug: "lavorare-svizzera-guida",
    originLang: "it",
    originLabel: "Italiano",
    flag: "🇨🇭",
    category: "Estero",
    publishedAt: "2026-07-11",
    title: {
      it: "Lavorare in Svizzera nel 2026: stipendi, permessi e come trovare lavoro",
      ka: "სამუშაოდ შვეიცარიაში 2026: ხელფასები, ნებართვები, სამუშაოს პოვნა",
    },
    excerpt: {
      it: "La Svizzera offre gli stipendi più alti d'Europa. Ecco come trovare lavoro, quali permessi servono, quanto si guadagna davvero e come vivere a Ginevra, Zurigo e Basilea.",
      ka: "შვეიცარია ევროპის ყველაზე მაღალი ხელფასებს გვთავაზობს. სრული გზამკვლევი.",
    },
    body: {
      it: `La Svizzera non è nell'UE ma ha accordi bilaterali con l'Europa che permettono ai cittadini UE di lavorarci liberamente. Gli stipendi sono i più alti d'Europa, ma anche il costo della vita è elevato.

**Perché la Svizzera?**

• Salario minimo (dove esiste, varia per cantone): 23-24 CHF/ora (circa 21-22€/ora)
• Stipendi medi 2-3 volte superiori all'Italia
• Franchi svizzeri: moneta stabile, non influenzata dall'inflazione europea
• Sanità eccellente
• Sicurezza e qualità della vita tra le più alte al mondo
• Vicinanza all'Italia: molti frontalieri entrano dal Nord Italia ogni giorno

**I permessi di lavoro in Svizzera**

Per i cittadini UE (italiani, romeni, portoghesi, ecc.):
• **Permesso G (frontaliero)**: per chi abita in Italia entro 30 km dal confine e torna a casa almeno settimanalmente. Si lavora in Svizzera ma si risiede in Italia. Molto comune nel Ticino, Ginevra, Basilea.
• **Permesso B (soggiornante)**: per chi si trasferisce in Svizzera per più di 1 anno
• **Permesso L (di breve durata)**: per contratti da 90 giorni a 1 anno

Per i cittadini non UE (Georgia, Ucraina, Albania, ecc.): la Svizzera applica quote molto restrittive. Occorre un'offerta di lavoro concreta e la dimostrazione che nessun candidato UE era disponibile.

**Settori con maggiore domanda**

• **Edilizia e costruzioni**: muratori, carpentieri, idraulici — 4.000-5.500 CHF/mese
• **Ristorazione e hotel**: chef, camerieri, receptionist — 3.500-4.500 CHF/mese
• **Sanità**: infermieri, OSS — tra i più pagati, 4.500-6.000 CHF/mese (richiede riconoscimento qualifiche)
• **Agricoltura**: soprattutto viticultura nel Vallese e Ticino
• **Pulizie e housekeeping**: 3.000-3.800 CHF/mese
• **Logistica e magazzino**: 3.500-4.200 CHF/mese
• **Assistenza anziani**: 3.200-4.500 CHF/mese

**Costo della vita in Svizzera**

Con uno stipendio di 4.000 CHF netti/mese:
• Affitto monolocale: 1.200-1.800 CHF (Zurigo/Ginevra), 800-1.200 CHF (Ticino)
• Cibo: 400-600 CHF/mese
• Trasporti (abbonamento): 100-200 CHF/mese
• Assicurazione sanitaria (obbligatoria): 350-500 CHF/mese
• Risparmio possibile: 800-1.500 CHF/mese

Il risparmio netto in Svizzera è reale, soprattutto per chi viene dall'Italia o dall'Est Europa e mantiene abitudini di spesa moderate.

**Come trovare lavoro in Svizzera**

• **jobs.ch** e **jobup.ch**: i portali di lavoro svizzeri più utilizzati
• **Indeed.ch**: presente con molte offerte
• **LinkedIn**: molto usato per profili qualificati
• **Job Room** (jobroom.ch): portale ufficiale del Seco (autorità del lavoro svizzera)
• Contatto diretto con le imprese: molte PMI svizzere assumono tramite candidatura spontanea

Per il Ticino (cantone italiano): sono validi anche i portali italiani, e molte aziende accettano candidature in italiano.

**Il frontalierato: lavorare in Svizzera da casa**

La soluzione più conveniente per molti italiani del Nord: abitare in Italia (Varese, Como, Verbania, Chiasso) e lavorare in Ticino. Vantaggi:
• Stipendio svizzero, costo della vita italiano
• Niente affitto svizzero
• Mantenimento della rete sociale italiana
• Treno o auto ogni mattina (30-60 minuti)

I principali valichi: Chiasso, Luino, Stabio, Campione. L'accordo fiscale tra Italia e Svizzera del 2023 ha cambiato le regole fiscali per i frontalieri — informati bene prima.

**Il sistema sanitario svizzero**

In Svizzera l'assicurazione sanitaria è obbligatoria (Krankenkasse/Assurance maladie). Chi risiede in Svizzera deve iscriversi entro 3 mesi dall'arrivo. La premia (costo) varia per cantone e per cassa. I frontalieri italiani di solito mantengono il SSN italiano.

**Imparare le lingue svizzere**

La Svizzera ha 4 lingue nazionali: tedesco (73%), francese (23%), italiano (8%), romancio. La lingua necessaria dipende dal cantone dove lavori:
• Ticino → italiano (!)
• Ginevra, Vaud, Neuchâtel → francese
• Zurigo, Berna, Basilea → tedesco svizzero (diverso dal tedesco standard)`,
      ka: `შვეიცარია ევროპის ყველაზე მაღალი ხელფასებით — ოღონდ ცხოვრების ხარჯებიც მაღალია.

**ხელფასები სფეროების მიხედვით**
• მშენებლობა: 4,000-5,500 CHF/თვე
• სასტუმრო/რესტორანი: 3,500-4,500 CHF
• ჯანდაცვა: 4,500-6,000 CHF
• ბადანტე: 3,200-4,500 CHF

**ნებართვები**
• UE-ს მოქალაქე: ავტომატური (Permit G ან B)
• UE-ს არ მოქალაქე (საქართველო): ძალიან შეზღუდული კვოტები

**ტიჩინო — იტალიური კანტონი**

იტალიის საზღვართან ახლოს, იტალიურად საუბრობენ. საუკეთესო ვარიანტი იტალო/ქართველი მუშაკებისთვის.`,
    },
  },
  {
    slug: "mandare-soldi-italia-estero",
    originLang: "it",
    originLabel: "Italiano",
    flag: "💸",
    category: "Consigli",
    publishedAt: "2026-07-09",
    title: {
      it: "Come mandare soldi dall'Italia all'estero: confronto tra i metodi più convenienti",
      ka: "როგორ გავგზავნოთ ფული იტალიიდან სახლში: საუკეთესო მეთოდები",
    },
    excerpt: {
      it: "Confronto tra i metodi più usati per inviare denaro dall'Italia verso Georgia, Romania, Ucraina, Albania e altri paesi: commissioni, velocità e sicurezza.",
      ka: "ფულის გაგზავნის საუკეთესო მეთოდები იტალიიდან — საქართველო, რუმინეთი, უკრაინა.",
    },
    body: {
      it: `Ogni anno i lavoratori stranieri in Italia inviano decine di miliardi di euro nei loro paesi d'origine (rimesse). Scegliere il metodo giusto può farti risparmiare centinaia di euro l'anno in commissioni. Ecco un confronto aggiornato al 2026.

**I principali metodi di trasferimento**

**1. Wise (ex TransferWise) — il più conveniente**
Wise è la soluzione più consigliata per trasferimenti frequenti. Usa il tasso di cambio medio di mercato (quello che vedi su Google) e applica una commissione trasparente e bassa.

Commissioni tipiche per 500€:
• Verso Georgia (GEL): circa 5-8€ di commissione
• Verso Romania (RON): circa 3-5€
• Verso Ucraina (UAH): circa 6-10€
• Verso Albania (ALL): circa 4-7€

Tempo: 1-2 giorni lavorativi (spesso pochi minuti per i paesi partner).
Come aprire: vai su wise.com, app disponibile per smartphone. Serve un documento di identità e un conto bancario italiano o europeo.

**2. Revolut — ottimo per chi già lo usa**
Se usi già Revolut, puoi inviare denaro a basso costo. Il piano gratuito ha un limite mensile di cambio valuta (1.000€) senza commissioni, sopra il quale si applica una piccola percentuale. Ottimo per piccoli importi frequenti.

**3. Western Union e MoneyGram — per chi non ha conto bancario**
Questi servizi tradizionali permettono di inviare contanti (il destinatario ritira i soldi in contanti in un ufficio locale). Utile per:
• Chi riceve in zone rurali senza accesso bancario
• Invii urgenti (disponibili in poche ore)
• Chi non ha ancora un conto corrente

Svantaggi: commissioni più alte (3-8% spesso) e tasso di cambio meno favorevole rispetto a Wise.

**4. Poste Italiane — MoneyTransfer**
Disponibile in tutti gli uffici postali italiani. Affidabile e capillare. Commissioni leggermente più alte di Wise ma rete fisica ottima per chi preferisce operare allo sportello. Conveniente per la Romania grazie agli accordi specifici.

**5. Bonifico bancario SWIFT**
Il metodo classico bancario. Svantaggi: commissioni alte (15-35€ per bonifico), tempi lenti (3-5 giorni), tasso di cambio sfavorevole applicato dalla banca. Sconsigliato per le rimesse frequenti.

**Confronto veloce (invio di 500€ al mese)**

| Metodo | Commissione media | Tempo |
|--------|-----------------|-------|
| Wise | 5-10€ | Minuti/1 giorno |
| Revolut | 2-8€ | Minuti |
| Western Union | 15-30€ | Minuti/ore |
| MoneyGram | 10-25€ | Ore |
| Banca (SWIFT) | 20-40€ | 3-5 giorni |

**Consigli per risparmiare**

• Invia importi più grandi meno frequentemente: molti servizi hanno una commissione fissa — meglio inviare 500€ una volta al mese che 125€ quattro volte
• Confronta sempre i tassi su XE.com prima di scegliere il servizio
• Approfitta delle promozioni (Wise e Revolut offrono spesso i primi trasferimenti gratuiti)
• Attenzione ai tassi di cambio "garantiti" — spesso nascondono commissioni nella differenza tra il tasso reale e quello applicato

**Come non cadere in truffe**

• Usa solo servizi regolamentati (Wise, Revolut, Western Union hanno licenze bancarie europee)
• Non inviare mai denaro a qualcuno che non conosci di persona, anche se si presenta come un familiare in difficoltà
• Non usare profili privati sui social per trasferire denaro — è rischioso e illegale

**Aspetti fiscali**

In Italia non c'è un limite legale per inviare denaro all'estero, ma per importi superiori a 1.000€ gli istituti di pagamento registrano il trasferimento (normativa antiriciclaggio). Non devi fare nulla di speciale — il servizio lo gestisce automaticamente. Non è un problema se i tuoi guadagni sono dichiarati.`,
      ka: `ყოველწლიურად იტალიაში მომუშავე უცხოელები მილიარდობით ევროს გზავნიან სახლში.

**საუკეთესო სერვისები**

**Wise** — ყველაზე იაფი
• 500€-ზე: 5-10€ საკომისიო
• გადადის: წუთებში-1 დღეში

**Revolut** — კარგია პატარა თანხებისთვის
• 1,000€/თვე უფასო გაცვლა

**Western Union** — ნაღდი ფულისთვის
• უფრო ძვირია, მაგრამ ნაღდი ფულით

**Wise vs Western Union**

500€ გაგზავნისას: Wise — 7€, Western Union — 20€. Wise-ი თვეში 13€ ზოგავს.`,
    },
  },
  {
    slug: "lavorare-logistica-magazzino-italia",
    originLang: "it",
    originLabel: "Italiano",
    flag: "📦",
    category: "Magazzino",
    publishedAt: "2026-07-13",
    title: {
      it: "Lavorare in logistica e magazzino in Italia: tutto quello che devi sapere",
      ka: "მუშაობა ლოგისტიკასა და საწყობში იტალიაში: ყველაფერი, რაც უნდა იცოდეთ",
    },
    excerpt: {
      it: "Guida completa al lavoro in magazzino e logistica in Italia: mansioni, stipendi, come ottenere il patentino muletto, le aziende che assumono di più e come candidarsi.",
      ka: "სრული გზამკვლევი იტალიაში საწყობში და ლოგისტიკაში მუშაობის შესახებ.",
    },
    body: {
      it: `Il settore della logistica e del magazzino è uno dei più grandi datori di lavoro stranieri in Italia. Migliaia di aziende cercano continuamente personale, spesso senza esperienza pregressa. Ecco tutto quello che devi sapere.

**Cosa si fa nel magazzino**

Le mansioni variano in base al ruolo:

• **Picker (prelievo merci)**: prelevi i prodotti dagli scaffali seguendo una lista di ordini, usando uno scanner o un palmare PDA. È il ruolo entry-level più comune.
• **Packer (confezionamento)**: imballi i prodotti prima della spedizione, controlli la qualità e applichi le etichette.
• **Addetto al ricevimento**: controlli le merci in arrivo, le verifichi rispetto alla bolla di consegna e le registri nel sistema.
• **Addetto alle spedizioni**: prepari i carichi per la partenza, gestisci i documenti di trasporto.
• **Operatore muletto**: usi il carrello elevatore (muletto) per movimentare pallet e scaffalature alte.
• **Team leader**: coordini un piccolo gruppo di addetti, gestisci i turni e rispondi ai responsabili.

**Stipendi nel magazzino (2026)**

• Addetto picking/packing: 1.300-1.550€ netti/mese
• Con muletto: 1.450-1.750€ netti/mese
• Con turno notturno: +20-30% di maggiorazione
• Team leader: 1.800-2.100€ netti/mese
• Capo magazzino: 2.200-2.800€ netti/mese

**Il patentino muletto: come ottenerlo**

Il patentino per carrello elevatore è tra i certificati più utili in Italia. Ti permette di guadagnare di più e di trovare lavoro più facilmente. Come ottenerlo:

1. Frequenta un corso abilitante presso un'agenzia formativa riconosciuta (Regione o ente bilaterale di settore)
2. Il corso dura 8-12 ore (modulo teorico + pratico)
3. Costo: 150-350€ (a volte pagato dall'agenzia interinale che ti assume)
4. L'abilitazione è valida su tutto il territorio nazionale e deve essere rinnovata ogni 5 anni con un breve corso di aggiornamento

Tipi di muletto: frontale, retrattile, transpallet, carrello a braccio telescopico. Ogni tipo richiede moduli specifici.

**Le aziende che assumono di più**

• **Amazon** (vari centri in Italia: Piacenza, Castelguglielmo, Roma, ecc.): assumono migliaia di addetti, anche senza esperienza. Contratto diretto.
• **GLS, BRT, DHL, TNT, UPS**: hub corrieristici in tutta Italia, turni fissi.
• **Coop, Esselunga, Carrefour**: piattaforme della GDO, vicino alle grandi città.
• **IKEA** (Piacenza, Carugate): magazzino e negozio, contratti diretti.
• **Agenzie interinale** (Randstad, Manpower, Adecco, Gi Group): assumono per conto di centinaia di aziende — iscriversi a una (o tutte) aumenta molto le possibilità.

**I turni nel magazzino**

Quasi tutti i magazzini lavorano su turni:
• **Turno mattino**: solitamente 6:00-14:00
• **Turno pomeriggio**: 14:00-22:00
• **Turno notturno**: 22:00-6:00 (maggiorazione del 20-30%)
• **Turno a ciclo continuo**: rotazione tra tutti i turni

I turni vengono comunicati in anticipo (di solito 1-2 settimane prima). Le aziende più grandi hanno turni stabili; quelle più piccole possono avere variazioni frequenti.

**Come candidarsi**

• **Portali lavoro**: lavoro8.com, Indeed.it, InfoJobs.it — filtra per "magazzino" nella tua città
• **Agenzie interinale**: vai di persona o registrati online. Porta documento, codice fiscale e CV. Spesso ti chiamano entro 1-2 giorni.
• **Candidatura diretta**: vai all'ingresso dell'azienda e chiedi se assumono. In molti magazzini italiani funziona ancora così.
• **LinkedIn**: meno usato per i ruoli operativi ma utile per posizioni di coordinamento

**Cosa aspettarsi il primo giorno**

• Visita medica aziendale (il datore la organizza, è obbligatoria)
• Formazione sulla sicurezza (corso 16 ore per il settore logistica)
• Consegna dei DPI (giubbotto alta visibilità, guanti, scarpe antinfortunistiche)
• Affiancamento con un collega esperto per 1-3 giorni

**Italiano in magazzino: quanto serve?**

Per i ruoli operativi (picking, packing) serve un italiano molto base — bastano le istruzioni dell'app e i comandi del palmare. Molti magazzini hanno colleghi di decine di nazionalità.

Per i ruoli di team leader o responsabile, l'italiano B2 è necessario per comunicare con il management.

**Carriera nel magazzino**

La logistica offre percorsi di crescita reali:
• Addetto → Team leader (6-18 mesi con buone prestazioni)
• Team leader → Capo turno (2-4 anni)
• Capo turno → Operations manager (5+ anni, spesso con formazione aziendale)

Molte grandi aziende (Amazon, IKEA, GLS) hanno programmi di sviluppo interno per chi vuole crescere.`,
      ka: `ლოგისტიკა და საწყობი ერთ-ერთი ყველაზე მნიშვნელოვანი დამქირავებელია იტალიაში.

**ძირითადი პოზიციები**
• Picker — ნივთების შეგროვება: 1,300-1,550€
• Packer — შეფუთვა: 1,300-1,500€
• ვაზნასმოქმედი: 1,450-1,750€
• Team leader: 1,800-2,100€

**ვაზნასმოქმედის ლიცენზია (muletto)**

• კურსი: 8-12 საათი, 150-350€
• ხშირად სააგენტო იხდის
• ყოველ 5 წელიწადში განახლება

**ყველაზე მსხვილი დამქირავებლები**
• Amazon — ათასობით ადგილი, გამოცდილება არ სჭირდება
• GLS, DHL, BRT — კურიერული ჰაბები
• Coop, Esselunga — სუპერმარკეტების სკლადები
• სააგენტოები: Randstad, Adecco, Manpower`,
    },
  },
  {
    slug: "patente-guida-straniera-italia",
    originLang: "it",
    originLabel: "Italiano",
    flag: "🚗",
    category: "Consigli",
    publishedAt: "2026-07-17",
    title: {
      it: "Patente di guida straniera in Italia: come convertirla o rinnovarla",
      ka: "უცხოური მართვის მოწმობა იტალიაში: როგორ გარდავქმნათ ან განვაახლოთ",
    },
    excerpt: {
      it: "Guida pratica per chi ha la patente straniera e vuole guidare in Italia: paesi con accordo di conversione, come ottenere la patente italiana e cosa fare con la patente georgiana, rumena o ucraina.",
      ka: "სრული გზამკვლევი უცხოური მართვის მოწმობის შესახებ იტალიაში.",
    },
    body: {
      it: `La patente di guida è essenziale per molti lavori in Italia: autista, rider con motorino, magazziniere, badante automunita. Ecco tutto quello che devi sapere sulla tua patente straniera in Italia.

**Paesi UE: nessun problema**

Se hai la patente rilasciata da un paese UE (Romania, Bulgaria, Polonia, ecc.), puoi guidare in Italia con quella patente per tutta la sua validità. Non serve convertirla.

Quando scade, la rinnovi nel paese che l'ha rilasciata oppure, se sei residente in Italia da più di 2 anni, puoi rinnovarla direttamente in Italia presso la Motorizzazione Civile.

**Paesi non UE: dipende dall'accordo**

L'Italia ha accordi di conversione con diversi paesi extra-UE che permettono di convertire la patente straniera in italiana senza esame teorico:

Paesi con accordo di conversione diretto (selezione):
• Albania ✅
• Marocco ✅
• Macedonia del Nord ✅
• Moldova ✅
• Sri Lanka ✅

Paesi SENZA accordo di conversione (devi fare l'esame):
• Georgia ❌ — devi fare l'esame teorico e pratico in Italia
• Ucraina ❌ — devi fare l'esame completo (parziale esenzione per alcuni permessi)
• Filippine ❌
• Cina ❌

**Per chi deve fare l'esame italiano**

Se il tuo paese non ha accordo con l'Italia, puoi guidare con la patente originale solo per i primi 12 mesi dalla data di acquisizione della residenza in Italia. Dopo, devi:

1. Iscriverti a una scuola guida italiana (autoscuola)
2. Superare l'esame teorico (quiz a crocette su codice della strada)
3. Superare l'esame pratico (guida con istruttore e esaminatore)

Costo dell'iter completo: 700-1.200€ tra autoscuola, tasse e bolli.

Consiglio: molte autoscuole hanno istruttori che parlano romeno, ucraino, arabo. Chiedilo all'iscrizione.

**Per i guidatori georgiani in Italia**

La Georgia non ha accordo di conversione con l'Italia. Se sei georgiano/a e hai la patente georgiana:

• Puoi guidare per 1 anno dalla data di iscrizione all'anagrafe italiana (residenza)
• Dopo 1 anno devi avere la patente italiana o smettere di guidare
• La patente georgiana può essere usata come riferimento per l'esame pratico (sei esonerato da alcune lezioni base se hai già esperienza dimostrata)

**Per i guidatori ucraini**

La situazione è speciale per i rifugiati ucraini: l'accordo UE-Ucraina del 2022 ha temporaneamente permesso l'uso della patente ucraina in tutta l'UE. Verifica lo status attuale di questo accordo poiché può variare.

**Come fare per la patente AM (ciclomotore/motorino)**

Per lavorare come rider con motorino 50cc serve la patente AM (o superiore). La patente AM si ottiene a 14 anni in Italia. Se hai la patente B straniera, sei già autorizzato a guidare motorini 50cc in Italia.

Per i motorini 125cc (molto usati dai rider): serve la patente A1 o superiore.

**Patente C per i camionisti**

Se vuoi fare l'autista di camion in Italia e hai già la patente C nel tuo paese:
• Paese UE: conversione diretta se la patente è equivalente
• Paese non UE: devi fare l'esame teorico e pratico anche per la C, più la CQC (qualificazione professionale)

La CQC (Carta di Qualificazione del Conducente) è obbligatoria per chi guida professionalmente mezzi pesanti in Europa. Ha validità 5 anni.

**Dove fare le pratiche**

• **Motorizzazione Civile** (MIT): per conversioni e rinnovi
• **Autoscuola**: per gli esami e le pratiche burocratiche
• **Patronato CGIL/CISL/UIL**: per supporto burocratico gratuito
• **Sportello Unico per l'Immigrazione**: per informazioni sui requisiti specifici per i non UE`,
      ka: `მართვის მოწმობა სავალდებულოა მრავალი სამუშაოსთვის იტალიაში.

**UE-ს ქვეყნები (რუმინეთი, პოლონეთი...)**
პრობლემა არ არის — პირდაპირ იტალიაში გამოიყენება.

**საქართველო — შეთანხმება არ არის**
• პირველი 12 თვე — ქართული მოწმობით გაგება შეიძლება
• 12 თვის შემდეგ — იტალიური გამოცდა სავალდებულოა
• ღირებულება: 700-1,200€ (ავტოსკოლა + გამოცდები)

**გამოცდა**
1. თეორიული (ტესტი)
2. პრაქტიკული (ინსტრუქტორთან)

ბევრ ავტოსკოლაში ქართულმოსაუბრე ინსტრუქტორები არიან — ჰკითხეთ წინასწარ.`,
    },
  },
  {
    slug: "lavorare-spagna-guida",
    originLang: "it",
    originLabel: "Italiano",
    flag: "🇪🇸",
    category: "Estero",
    publishedAt: "2026-07-18",
    title: {
      it: "Lavorare in Spagna nel 2026: guida completa per trovare lavoro e trasferirsi",
      ka: "სამუშაოდ ესპანეთში 2026: სრული გზამკვლევი",
    },
    excerpt: {
      it: "La Spagna è una delle mete preferite per chi vuole lavorare in Europa. Ecco come trovare lavoro a Madrid, Barcellona e nelle coste turistiche, quanto si guadagna e come trasferirsi.",
      ka: "ესპანეთი ერთ-ერთი ყველაზე პოპულარული დანიშნულებაა ევროპაში სამუშაოდ.",
    },
    body: {
      it: `La Spagna ha una delle economie più dinamiche d'Europa e un mercato del lavoro in forte crescita, soprattutto nel turismo, nella tecnologia e nell'agricoltura. Ecco la guida completa per chi vuole lavorarci.

**Perché la Spagna?**

• Clima mediterraneo, qualità della vita alta
• Lingua più facile da imparare rispetto al tedesco o al francese
• Costo della vita inferiore a Germania, Francia, Svizzera
• Forte domanda in turismo, agricoltura e servizi
• Salario minimo 2026: 1.134€/mese (tra i più alti della storia spagnola)

**I settori più richiesti**

• **Turismo e hospitality**: la Spagna è la seconda destinazione turistica mondiale. Hotel, ristoranti, bar cercano sempre personale. Stagione: aprile-ottobre sulle coste.
• **Agricoltura**: fragole (Huelva, febbraio-maggio), uva (settembre-ottobre), agrumi (Valencia, inverno). Vitto e alloggio spesso inclusi.
• **Edilizia**: il boom immobiliare spagnolo continua, soprattutto a Madrid e nelle isole
• **Logistica e magazzino**: Amazon ha enormi hub a Madrid e Barcellona
• **Badanti e colf**: forte domanda, soprattutto per italofone o italiane con esperienza
• **Tech e startup**: Madrid e Barcellona sono hub tech europei (per chi ha competenze digitali)

**Stipendi in Spagna (2026)**

• Salario minimo: 1.134€/mese (14 mensilità)
• Cameriere/a: 1.200-1.600€/mese + mance
• Receptionist hotel: 1.300-1.700€/mese
• Cuoco: 1.400-2.200€/mese
• Operaio agricolo: 950-1.300€/mese (+ vitto+alloggio spesso)
• Magazziniere: 1.200-1.600€/mese
• Muratore: 1.600-2.200€/mese

Nota: la Spagna ha 14 mensilità di legge (2 mesi extra all'anno, in estate e a Natale) — è un vantaggio concreto.

**Documenti per lavorare**

Per i cittadini UE:
• Passaporto o carta d'identità
• NIE (Número de Identificación de Extranjero): obbligatorio per lavorare, aprire un conto, affittare casa. Si richiede alla Policía Nacional con il passaporto e un contratto di lavoro o la prova che cerchi lavoro.
• TIE (Tarjeta de Identidad de Extranjero): carta fisica per chi resta più di 3 mesi.

Per i cittadini non UE:
• Visto di lavoro (solo con offerta di lavoro)
• La Spagna ha il programma "Visto per i nomadi digitali" per lavoratori remoti

**Come trovare lavoro in Spagna**

• **InfoJobs.es**: il portale più grande in Spagna
• **Indeed.es**
• **LinkedIn**: molto usato in Spagna
• **Turijobs.com**: specializzato in turismo e hotel
• **Jooble.es** e **Jobrapido.es**: aggregatori
• SEPE (Servicio Público de Empleo Estatal): l'equivalente del CPI italiano, con offerte e formazione

Per il lavoro agricolo, i contatti si trovano spesso tramite cooperative locali o agenzie specializzate come Agrojobs.

**Le regioni con più opportunità**

• **Madrid**: tutti i settori, soprattutto tech, commercio, servizi
• **Barcellona**: turismo, tech, moda, manifattura
• **Comunità Valenciana** (Valencia, Alicante): agricoltura, turismo costiero
• **Andalusia** (Siviglia, Malaga, Huelva): turismo, agricoltura, fragole
• **Isole Baleari** (Maiorca, Ibiza, Minorca): turismo stagionale, stipendi più alti in estate
• **Isole Canarie** (Tenerife, Gran Canaria): turismo tutto l'anno, molto richiesto

**Imparare lo spagnolo**

Per chi parla italiano, lo spagnolo è la seconda lingua più facile da imparare (dopo il portoghese). Un italiano può capire il 70-80% dello spagnolo scritto senza studiarlo. Per il lavoro quotidiano, 2-3 mesi di studio intensivo portano a un livello base sufficiente.

Risorse gratuite:
• Duolingo (app)
• SpanishPod101 (YouTube)
• Instituto Cervantes: corsi ufficiali nelle principali città europee

**Costo della vita**

• Madrid: affitto stanza 500-800€, monolocale 800-1.200€
• Barcellona: affitto stanza 600-900€, monolocale 900-1.400€
• Valencia: stanza 350-550€, monolocale 550-900€
• Isole Baleari in stagione: stanza spesso fornita dall'hotel

Con uno stipendio di 1.400€ netti/mese a Valencia si vive bene e si riesce a risparmiare 300-500€/mese.`,
      ka: `ესპანეთი ევროპის ერთ-ერთი ყველაზე მოთხოვნადი სამუშაო ბაზარია.

**ყველაზე მოთხოვნადი სფეროები**
• ტურიზმი: ოტელები, რესტორნები — მთელ სანაპიროზე
• სოფლის მეურნეობა: მარწყვი (თებ-მაი), ყურძენი (სექ-ოქტ)
• ლოგისტიკა: Amazon Madrid, Barcellona
• მშენებლობა: 1,600-2,200€/თვე

**ხელფასები**
• მიმინიმუმი: 1,134€ × 14 თვე = 15,876€/წელი
• მიმტანი: 1,200-1,600€ + ჩაი
• მზარეული: 1,400-2,200€

**UE-ს მოქალაქეებისთვის**
NIE ნომერი საჭიროა (Número de Identificación de Extranjero) — სამუშაოს დასაწყებად.

**საუკეთესო რეგიონები**
• ბარსელონა/მადრიდი — ყველა სფერო
• ვალენსია — ტურიზმი, სოფლის მეურნეობა
• ბალეარის კუნძულები — ზაფხულის ტურიზმი`,
    },
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
