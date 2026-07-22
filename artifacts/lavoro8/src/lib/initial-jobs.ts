export interface Job {
  id: number;
  title: string;
  company: string;
  city: string;
  country: string;
  category: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  contractType?: string | null;
  description: string;
  email?: string | null;
  isActive?: boolean | null;
  createdAt: string;
}

export const INITIAL_REAL_JOBS: Job[] = [
  // ─── LOGISTICA & MAGAZZINO ───
  {
    id: 1001,
    title: "Magazziniere con Patentino Muletto (Carrellista)",
    company: "DHL Express Italy — Piacenza Hub",
    city: "Piacenza",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1450,
    salaryMax: 1750,
    contractType: "Tempo indeterminato",
    description: `DHL Express cerca addetti al magazzino e carrellisti esperti con patentino muletto per l'hub logistico di Piacenza.

Mansioni:
• Carico/scarico merci da bilici e container
• Movimentazione bancali con carrello elevatore frontale/retrattile
• Spunta bolle di accompagnamento e inserimento dati a palmare
• Riordino stoccaggio corsie

Requisiti:
• Patentino carrello elevatore in corso di validità
• Disponibilità a turni anche notturni (22:00 - 06:00)
• Massima precisione e puntualità

Offriamo:
• Contratto CCNL Trasporti e Logistica Livello 4S
• Buoni pasto da 8€/giorno + indennità turno notturno
• Formazione continua e DPI aziendali inclusi`,
    email: "carriere@dhl.it",
    createdAt: new Date().toISOString(),
  },
  {
    id: 1002,
    title: "Addetto Picking e Imballaggio E-commerce",
    company: "GLS Logistics Italia",
    city: "Milano",
    country: "IT",
    category: "Logistica",
    salaryMin: 1350,
    salaryMax: 1600,
    contractType: "Tempo determinato",
    description: `GLS ricerca addetti al magazzino per la gestione degli ordini e-commerce nella sede di Milano Nord (Cinisello Balsamo).

Mansioni:
• Prelievo merce da scaffalatura tramite pistola barcode RF
• Confezionamento e etichettatura colli per spedizione express
• Controllo qualità visivo e conteggio giacenze

Requisiti:
• Conoscenza base italiano per lettura istruzioni a schermo
• Buona manualità e resistenza al lavoro in piedi
• Disponibilità immediata per turno diurno (08:00 - 17:00)

Offriamo:
• Contratto iniziale 6 mesi con possibilità di proroga a indeterminato
• Retribuzione lorda 1.580€/mese + premio presenza
• Ambiente dinamico e moderno`,
    email: "risorse.umane@gls-italy.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: 1003,
    title: "Lagermitarbeiter (Addetto Magazzino) con Vitto e Alloggio",
    company: "Amazon Distribution GmbH — Colonia",
    city: "Köln (Colonia)",
    country: "DE",
    category: "Magazzino",
    salaryMin: 1850,
    salaryMax: 2200,
    contractType: "Tempo indeterminato",
    description: `Opportunità per lavoratori italiani in Germania: Amazon Colonia offre posizioni da addetto magazzino con supporto alloggio.

Mansioni:
• Ricezione merce da fornitore e stoccaggio in scaffale
• Picking e sorter confezioni tramite carrello automatizzato
• Preparazione pallet per spedizioni internazionali

Requisiti:
• Nessun livello di tedesco richiesto (team internazionale con supporto italiano)
• Documenti comunitari UE in regola
• Massima serietà e disponibilità al trasferimento

Offriamo:
• Stipendio base 14,50€/ora lordi (~1.900€ netti con straordinari)
• Alloggio condiviso convenzionato a 250€/mese trattenuti in busta paga
• Contratto tedesco completo di assicurazione sanitaria (AOK)`,
    email: "colonia-jobs@amazon.de",
    createdAt: new Date().toISOString(),
  },

  // ─── RIDER & CONSEGNE ───
  {
    id: 1004,
    title: "Rider per Consegne Cibo con Scooter Aziendale Gratuito",
    company: "Deliveroo Italia — Milano Centro",
    city: "Milano",
    country: "IT",
    category: "Rider",
    salaryMin: 1200,
    salaryMax: 1650,
    contractType: "Part-time",
    description: `Deliveroo assume fattorini e rider per consegne nella zona centrale di Milano con scooter elettrico fornito dall'azienda.

Mansioni:
• Ritiro ordini dai ristoranti partner e consegna a domicilio
• Utilizzo app rider per navigazione e gestione consegne
• Garanzia di puntualità e cortesia verso i clienti

Requisiti:
• Patente B o A1 in corso di validità
• Smartphone Android/iOS con connessione dati
• Buona conoscenza delle vie principali di Milano

Offriamo:
• Scooter elettrico compreso di ricarica, casco e bauletto
• Retribuzione oraria garantita + bonus per consegna nelle ore di punta
• Orari flessibili personalizzabili settimana per settimana`,
    email: "rider-milano@deliveroo.it",
    createdAt: new Date().toISOString(),
  },

  // ─── BADANTE & CARE ───
  {
    id: 1005,
    title: "Badante Convivente 24/24 per Signora Anziana",
    company: "Famiglia Privata — Bologna Centro",
    city: "Bologna",
    country: "IT",
    category: "Badante",
    salaryMin: 1300,
    salaryMax: 1550,
    contractType: "Tempo indeterminato",
    description: `Famiglia a Bologna cerca badante convivente fissa per assistere signora di 83 anni parzialmente autosufficiente.

Mansioni:
• Igiene personale, vestizione e cura della persona
• Preparazione dei pasti (cucina italiana semplice)
• Igiene e pulizia dell'appartamento
• Compagnia, passeggiate e somministrazione farmaci prescritto

Requisiti:
• Esperienza pregressa di almeno 2 anni come badante convivente
• Referenze verificabili di precedenti famiglie
• Conoscenza buona della lingua italiana
• Documenti d'soggiorno/lavoro in regola

Offriamo:
• Camera privata con bagno dedicato e connessione Wi-Fi
• Contratto regolarizzato CCNL Colf e Badanti livello CS
• Vitto e alloggio inclusi + tredicesima e TFR`,
    email: "famiglia.bologna@lavoro8.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: 1006,
    title: "Collaboratrice Domestica (Colf) a Ore per Ville Privati",
    company: "Agenzia Assistenza Casa — Roma Nord",
    city: "Roma",
    country: "IT",
    category: "Colf",
    salaryMin: 900,
    salaryMax: 1300,
    contractType: "Part-time",
    description: `Agenzia specializzata seleziona colf ad ore per appartamenti e ville nella zona Roma Nord (Parioli, Cassia, Vigna Clara).

Mansioni:
• Pulizie approfondite dei locali, spolvero e lavaggio pavimenti
• Stiratura professionale camicie e biancheria
• Riordino e cura degli ambienti

Requisiti:
• Massima affidabilità e cura dei dettagli
• Esperienza in stiratura di alto livello
• Disponibilità 20-30 ore settimanali (lunedì-venerdì)

Offriamo:
• Paga oraria 10€ - 12€ netti/ora regolari con contributi INPS
• Contratto a tempo indeterminato dopo periodo di prova di 1 mese`,
    email: "assistenzacasa.roma@gmail.com",
    createdAt: new Date().toISOString(),
  },

  // ─── RISTORAZIONE & HOTEL ───
  {
    id: 1007,
    title: "Cameriere/a di Sala per Ristorante Storico",
    company: "Trattoria Dal Genovese — Firenze",
    city: "Firenze",
    country: "IT",
    category: "Ristorante",
    salaryMin: 1400,
    salaryMax: 1800,
    contractType: "Tempo indeterminato",
    description: `Ristorante storico nel centro di Firenze cerca cameriere/a di sala con esperienza.

Mansioni:
• Accoglienza clienti e accompagnamento al tavolo
• Presa comande con palmare touch
• Servizio ai tavoli e spiegazione menù dei vini toscani
• Pulizia e riordino della sala a fine servizio

Requisiti:
• Almeno 1 anno di esperienza nel settore ristorazione
• Buona presenza e attitudine al contatto con il pubblico
• Conoscenza base dell'inglese per turisti stranieri

Offriamo:
• Contratto full-time con riposo infrasettimanale
• Mance individuali elevate nei mesi turistici
• Ambiente di lavoro giovanile e stimolante`,
    email: "info@trattoriadalgenovese.it",
    createdAt: new Date().toISOString(),
  },
  {
    id: 1008,
    title: "Cameriera ai Piani con Alloggio Insieme",
    company: "NH Hotel Group — Torino",
    city: "Torino",
    country: "IT",
    category: "Hotel",
    salaryMin: 1350,
    salaryMax: 1650,
    contractType: "Tempo indeterminato",
    description: `Hotel 4 stelle del gruppo NH Hotels a Torino ricerca cameriere ai piani per la pulizia e il riassetto delle camere.

Mansioni:
• Pulizia giornaliera e cambio biancheria camere e suite
• Sanificazione bagni e rifornimento linea cortesia
• Controllo minibar e segnalazione guasti alla manutenzione

Requisiti:
• Esperienza in hotel 3 o 4 stelle
• Velocità, precisione e massima igiene
• Disponibilità a lavorare nei fine settimana e festivi

Offriamo:
• Contratto turismo full-time 40 ore/settimana
• Possibilità di camera in condivisione per lavoratori fuori sede
• Divisa aziendale lavata in struttura + mensa dipendenti gratuita`,
    email: "recruitment.torino@nh-hotels.com",
    createdAt: new Date().toISOString(),
  },

  // ─── EDILIZIA & OPERAIO ───
  {
    id: 1009,
    title: "Muratore Esperto e Manovale Edile per Cantiere",
    company: "Edilizia Generale SpA — Bergamo",
    city: "Bergamo",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1600,
    salaryMax: 2100,
    contractType: "Tempo indeterminato",
    description: `Impresa edile bergamasca cerca muratori finitori e manovali da inserire nei cantieri di ristrutturazione residenziale.

Mansioni:
• Posa mattoni, blocchi, tramezzi e intonaci
• Ristrutturazione bagni, pavimentazioni e massetti
• Assistenza agli impianti elettrici ed idraulici

Requisiti:
• Capacità di lettura del disegno tecnico per i muratori esperti
• Massima attenzione alle norme di sicurezza nei cantieri (attestato 16 ore prima ingresso)
• Patente B gradita per guidare furgone aziendale

Offriamo:
• Contratto CCNL Edilizia con cassa edile e indennità di trasferta
• Paga puntuale il 10 di ogni mese
• Attrezzature Hilti e DPI di prima qualità forniti dall'azienda`,
    email: "cantieri@ediliziagenerale.it",
    createdAt: new Date().toISOString(),
  },
];
