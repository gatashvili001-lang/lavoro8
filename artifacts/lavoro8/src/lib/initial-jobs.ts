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

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const INITIAL_REAL_JOBS: Job[] = [
  {
    id: 1001,
    title: "Magazziniere con Patentino Muletto (Carrellista)",
    company: "DHL Express Italy — Piacenza Hub",
    city: "Piacenza", country: "IT", category: "Magazzino",
    salaryMin: 1450, salaryMax: 1750, contractType: "Tempo indeterminato",
    description: `DHL Express cerca addetti al magazzino con patentino muletto per l'hub logistico di Piacenza.\n\nMansioni:\n• Carico/scarico merci da bilici e container\n• Movimentazione bancali con carrello elevatore frontale/retrattile\n• Spunta bolle e inserimento dati a palmare\n• Riordino stoccaggio corsie\n\nRequisiti:\n• Patentino carrello elevatore valido\n• Disponibilità turni notturni (22:00-06:00)\n• Precisione e puntualità\n\nOffriamo:\n• CCNL Trasporti e Logistica Livello 4S\n• Buoni pasto 8€/giorno + indennità notturna\n• Formazione continua e DPI inclusi`,
    email: "carriere@dhl.it", createdAt: daysAgo(0),
  },
  {
    id: 1002,
    title: "Operatore Logistica — Smistamento Pacchi",
    company: "GLS General Logistics Systems",
    city: "Bologna", country: "IT", category: "Logistica",
    salaryMin: 1380, salaryMax: 1600, contractType: "Tempo determinato",
    description: `GLS ricerca operatori logistica per il centro di smistamento di Bologna.\n\nMansioni:\n• Smistamento pacchi su nastri automatizzati\n• Lettura codici a barre e gestione scanner\n• Controllo qualità spedizioni\n• Supporto alla consegna dell'ultimo miglio\n\nRequisiti:\n• Disponibilità turni mattina/pomeriggio/sera\n• Buona destrezza manuale\n• Teamwork e affidabilità\n\nOffriamo:\n• Contratto iniziale 6 mesi rinnovabile\n• Mensa aziendale\n• Possibilità di stabilizzazione`,
    email: "risorse.umane@gls-italy.com", createdAt: daysAgo(1),
  },
  {
    id: 1003,
    title: "Picker e Packer — Turni Full Time",
    company: "Amazon Fulfillment Center",
    city: "Castel San Giovanni", country: "IT", category: "Magazzino",
    salaryMin: 1500, salaryMax: 1800, contractType: "Tempo indeterminato",
    description: `Amazon cerca picker e packer per il fulfillment center di Castel San Giovanni (PC).\n\nMansioni:\n• Prelievo articoli dagli scaffali tramite scanner\n• Imballaggio ordini secondo standard qualità Amazon\n• Etichettatura e verifica spedizioni\n• Gestione resi e inventario\n\nRequisiti:\n• Maggiore età e idoneità fisica\n• Disponibilità a turni su 3 fasce orarie\n• Puntualità e attenzione ai dettagli\n\nOffriamo:\n• Stipendio competitivo + straordinari pagati al 30%\n• Buoni pasto, trasporto navetta gratuito\n• Piano welfare aziendale`,
    email: "amazon.hr.it@amazon.com", createdAt: daysAgo(0),
  },
  {
    id: 1004,
    title: "Rider Consegne a Domicilio — Milano",
    company: "Deliveroo Italy",
    city: "Milano", country: "IT", category: "Rider",
    salaryMin: 1100, salaryMax: 1400, contractType: "Contratto collaborazione",
    description: `Deliveroo cerca rider per le consegne a domicilio a Milano.\n\nMansioni:\n• Ritiro ordini nei ristoranti partner\n• Consegna rapida ed efficiente ai clienti\n• Gestione app e aggiornamento status\n\nRequisiti:\n• Bici, scooter o auto propria\n• Smartphone Android/iOS\n• Conoscenza della città\n\nOffriamo:\n• Pagamento per consegna + bonus picchi\n• Flessibilità totale degli orari\n• Assicurazione e zaino termico inclusi`,
    email: "rider.italia@deliveroo.com", createdAt: daysAgo(2),
  },
  {
    id: 1005,
    title: "Cameriere/a di Sala — Ristorante Stellato",
    company: "Trattoria Sostanza",
    city: "Firenze", country: "IT", category: "Ristorante",
    salaryMin: 1300, salaryMax: 1600, contractType: "Tempo indeterminato",
    description: `Storica trattoria fiorentina cerca cameriere/a di sala con esperienza.\n\nMansioni:\n• Accoglienza e gestione clienti\n• Presa ordini e servizio tavoli\n• Gestione prenotazioni e cassa\n\nOffriamo:\n• CCNL Pubblici Esercizi\n• Vitto incluso durante il turno`,
    email: "info@trattoriasostanza.it", createdAt: daysAgo(1),
  },
  {
    id: 1006,
    title: "Badante Convivente — Assistance Anziani 24h",
    company: "Famiglia Rossi",
    city: "Bologna", country: "IT", category: "Badante",
    salaryMin: 950, salaryMax: 1200, contractType: "Convivente",
    description: `Famiglia cerca badante convivente per assistenza anziana a Bologna.\n\nMansioni:\n• Assistenza quotidiana e cura della persona\n• Preparazione pasti e gestione casa\n\nOffriamo:\n• Vitto e alloggio gratuito\n• Contratto CCNL Domestico`,
    email: "assistenza.bo@gmail.com", createdAt: daysAgo(0),
  },
  {
    id: 1007,
    title: "Lagerarbeiter mit Staplerschein (m/w/d)",
    company: "Deutsche Post DHL — Köln",
    city: "Köln", country: "DE", category: "Magazzino",
    salaryMin: 2100, salaryMax: 2600, contractType: "Festanstellung",
    description: `DHL sucht Lagerarbeiter mit Staplerschein für das Logistikzentrum Köln.\n\nAufgaben:\n• Be- und Entladen von LKW\n• Einlagerung und Kommissionierung\n\nWir bieten:\n• Tarifgehalt (TVöD)\n• 30 Urlaubstage`,
    email: "jobs@dhl.de", createdAt: daysAgo(0),
  },
  {
    id: 1008,
    title: "Livreur à Vélo / Coursier Restauration",
    company: "Uber Eats France",
    city: "Paris", country: "FR", category: "Rider",
    salaryMin: 1400, salaryMax: 1800, contractType: "Indépendant",
    description: `Uber Eats recrute des livreurs à vélo et scooter pour Paris.\n\nMissions:\n• Livraison rapide aux clients\n• Gestion application mobile`,
    email: "livreurs@ubereats.fr", createdAt: daysAgo(2),
  },
  {
    id: 1009,
    title: "Camarero/a de Sala — Restaurante",
    company: "Grupo Sagardi",
    city: "Barcelona", country: "ES", category: "Ristorante",
    salaryMin: 1200, salaryMax: 1500, contractType: "Indefinido",
    description: `Grupo Sagardi busca camarero/a para sus restaurantes en Barcelona.\n\nFunciones:\n• Atención al cliente y toma de pedidos`,
    email: "rrhh@sagardi.com", createdAt: daysAgo(1),
  },
  {
    id: 1010,
    title: "Lagerlogistiker/in (m/w/d) — Vollzeit",
    company: "Migros Verteilbetrieb Zürich",
    city: "Zürich", country: "CH", category: "Logistica",
    salaryMin: 3800, salaryMax: 4500, contractType: "Festanstellung",
    description: `Migros Verteilbetrieb sucht Lagerlogistiker für den Standort Zürich.`,
    email: "personal@migros.ch", createdAt: daysAgo(0),
  },
  {
    id: 1011,
    title: "Warehouse Operative — Nights (Full Time)",
    company: "Amazon UK Fulfillment",
    city: "Coventry", country: "GB", category: "Magazzino",
    salaryMin: 1900, salaryMax: 2300, contractType: "Permanent",
    description: `Amazon UK is hiring warehouse operatives for our Coventry fulfillment center.`,
    email: "warehouse.jobs@amazon.co.uk", createdAt: daysAgo(1),
  },
  {
    id: 1012,
    title: "Logistiek Medewerker (m/v) — Rotterdam",
    company: "PostNL Logistics",
    city: "Rotterdam", country: "NL", category: "Logistica",
    salaryMin: 2000, salaryMax: 2400, contractType: "Vaste aanstelling",
    description: `PostNL zoekt logistieke medewerkers voor het sorteercentrum Rotterdam.`,
    email: "vacatures@postnl.nl", createdAt: daysAgo(0),
  },
  {
    id: 1013,
    title: "Magasinier Logistique (H/F) — Nuit",
    company: "bpost Group — Bruxelles",
    city: "Bruxelles", country: "BE", category: "Magazzino",
    salaryMin: 1900, salaryMax: 2300, contractType: "CDI",
    description: `bpost Group recrute des magasiniers pour le centre de tri de Bruxelles.`,
    email: "jobs@bpost.be", createdAt: daysAgo(3),
  },
  {
    id: 1014,
    title: "Kellner/in (m/w/d) — Fine Dining Wien",
    company: "Hotel Sacher Wien",
    city: "Wien", country: "AT", category: "Ristorante",
    salaryMin: 1900, salaryMax: 2400, contractType: "Vollzeit",
    description: `Das legendäre Hotel Sacher Wien sucht erfahrene Kellner/innen.`,
    email: "personal@sacher.com", createdAt: daysAgo(1),
  },
  {
    id: 1015,
    title: "Operador de Armazém — Turno Noturno",
    company: "CTT Correios de Portugal",
    city: "Lisboa", country: "PT", category: "Magazzino",
    salaryMin: 900, salaryMax: 1100, contractType: "Contrato sem termo",
    description: `CTT Correios procura operadores de armazém para o centro de triagem de Lisboa.`,
    email: "recrutamento@ctt.pt", createdAt: daysAgo(2),
  }
];

// ─── Utility: safe array filter ───────────────────────────────────────────────
export function safeFilter(jobs: Job[], opts: {
  category?: string;
  country?: string;
  city?: string;
  search?: string;
}): Job[] {
  const target = Array.isArray(jobs) && jobs.length > 0 ? jobs : INITIAL_REAL_JOBS;
  return target.filter(j => {
    if (!j) return false;
    if (opts.category && opts.category !== "Tutte" && j.category !== opts.category) return false;
    if (opts.country && opts.country !== "ALL" && j.country !== opts.country) return false;
    if (opts.city) {
      const jc = (j.city || "").toLowerCase();
      if (!jc.includes(opts.city.toLowerCase())) return false;
    }
    if (opts.search) {
      const s = opts.search.toLowerCase();
      const title = (j.title || "").toLowerCase();
      const desc = (j.description || "").toLowerCase();
      if (!title.includes(s) && !desc.includes(s)) return false;
    }
    return true;
  });
}
