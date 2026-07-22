import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobsTable } from "../../lib/db/src/schema/jobs.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20260711);
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(rnd() * arr.length)];
function sample<T>(arr: readonly T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  while (out.length < n && copy.length) {
    out.push(copy.splice(Math.floor(rnd() * copy.length), 1)[0]);
  }
  return out;
}
const roundTo = (v: number, step: number) => Math.round(v / step) * step;

type Lang = "it" | "en" | "de" | "fr" | "es";
type Cat =
  | "Magazzino" | "Logistica" | "Rider" | "Ristorante" | "Hotel"
  | "Badante" | "Colf" | "Baby-sitter" | "Edilizia" | "Agricoltura" | "Altro";

// Base monthly salary in EUR (min, max) per category
const BASE_SALARY: Record<Cat, [number, number]> = {
  Magazzino: [1250, 1650],
  Logistica: [1350, 1800],
  Rider: [1000, 1450],
  Ristorante: [1200, 1650],
  Hotel: [1200, 1700],
  Badante: [950, 1400],
  Colf: [900, 1300],
  "Baby-sitter": [900, 1350],
  Edilizia: [1450, 1950],
  Agricoltura: [1100, 1500],
  Altro: [1150, 1650],
};

interface Country {
  code: string;
  lang: Lang;
  factor: number; // multiplier on EUR base -> local currency monthly
  round: number;
  cities: string[];
  suffix: string[];
}

const COUNTRIES: Record<string, Country> = {
  IT: { code: "IT", lang: "it", factor: 1.0, round: 50, suffix: ["S.r.l.", "S.p.A.", ""], cities: ["Milano", "Roma", "Torino", "Bologna", "Napoli", "Firenze", "Verona", "Brescia", "Bergamo", "Padova", "Genova", "Bari", "Parma", "Modena"] },
  DE: { code: "DE", lang: "de", factor: 1.4, round: 50, suffix: ["GmbH", "AG", ""], cities: ["Berlin", "München", "Hamburg", "Frankfurt am Main", "Köln", "Stuttgart", "Düsseldorf", "Leipzig", "Nürnberg", "Hannover"] },
  AT: { code: "AT", lang: "de", factor: 1.35, round: 50, suffix: ["GmbH", ""], cities: ["Wien", "Graz", "Linz", "Salzburg", "Innsbruck"] },
  CH: { code: "CH", lang: "de", factor: 3.3, round: 100, suffix: ["AG", "GmbH", ""], cities: ["Zürich", "Basel", "Bern", "Luzern", "St. Gallen"] },
  FR: { code: "FR", lang: "fr", factor: 1.3, round: 50, suffix: ["SARL", "SAS", ""], cities: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Bordeaux", "Lille", "Strasbourg", "Nantes"] },
  BE: { code: "BE", lang: "fr", factor: 1.3, round: 50, suffix: ["SPRL", ""], cities: ["Bruxelles", "Liège", "Charleroi", "Namur"] },
  ES: { code: "ES", lang: "es", factor: 0.95, round: 50, suffix: ["S.L.", "S.A.", ""], cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Bilbao", "Alicante"] },
  NL: { code: "NL", lang: "en", factor: 1.35, round: 50, suffix: ["B.V.", ""], cities: ["Amsterdam", "Rotterdam", "Utrecht", "Eindhoven", "The Hague", "Tilburg"] },
  GB: { code: "GB", lang: "en", factor: 1.15, round: 50, suffix: ["Ltd", "Group", ""], cities: ["London", "Manchester", "Birmingham", "Leeds", "Liverpool", "Bristol", "Glasgow", "Sheffield"] },
  IE: { code: "IE", lang: "en", factor: 1.35, round: 50, suffix: ["Ltd", ""], cities: ["Dublin", "Cork", "Galway", "Limerick"] },
  US: { code: "US", lang: "en", factor: 2.3, round: 100, suffix: ["LLC", "Inc.", ""], cities: ["New York", "Chicago", "Los Angeles", "Houston", "Miami", "Newark", "Philadelphia", "Boston", "Atlanta", "Dallas"] },
  PT: { code: "PT", lang: "en", factor: 0.85, round: 50, suffix: ["Lda", ""], cities: ["Lisboa", "Porto", "Braga", "Faro"] },
  GR: { code: "GR", lang: "en", factor: 0.75, round: 50, suffix: ["S.A.", ""], cities: ["Athens", "Thessaloniki", "Patras"] },
  PL: { code: "PL", lang: "en", factor: 4.6, round: 100, suffix: ["Sp. z o.o.", ""], cities: ["Warszawa", "Kraków", "Wrocław", "Poznań", "Łódź", "Gdańsk"] },
  CZ: { code: "CZ", lang: "en", factor: 23, round: 500, suffix: ["s.r.o.", ""], cities: ["Praha", "Brno", "Ostrava", "Plzeň"] },
  SK: { code: "SK", lang: "en", factor: 0.85, round: 50, suffix: ["s.r.o.", ""], cities: ["Bratislava", "Košice"] },
  HU: { code: "HU", lang: "en", factor: 340, round: 5000, suffix: ["Kft.", ""], cities: ["Budapest", "Debrecen", "Győr"] },
  RO: { code: "RO", lang: "en", factor: 4.2, round: 100, suffix: ["S.R.L.", ""], cities: ["București", "Cluj-Napoca", "Timișoara", "Iași"] },
  BG: { code: "BG", lang: "en", factor: 1.8, round: 50, suffix: ["EOOD", ""], cities: ["Sofia", "Plovdiv", "Varna"] },
  HR: { code: "HR", lang: "en", factor: 0.9, round: 50, suffix: ["d.o.o.", ""], cities: ["Zagreb", "Split", "Rijeka"] },
  RS: { code: "RS", lang: "en", factor: 95, round: 1000, suffix: ["d.o.o.", ""], cities: ["Beograd", "Novi Sad", "Niš"] },
  AL: { code: "AL", lang: "en", factor: 95, round: 1000, suffix: ["Sh.p.k.", ""], cities: ["Tirana", "Durrës"] },
  TR: { code: "TR", lang: "en", factor: 30, round: 500, suffix: ["A.Ş.", ""], cities: ["Istanbul", "Ankara", "Izmir", "Antalya"] },
  UA: { code: "UA", lang: "en", factor: 38, round: 500, suffix: ["TOV", ""], cities: ["Kyiv", "Lviv", "Odesa", "Dnipro"] },
  GE: { code: "GE", lang: "en", factor: 2.4, round: 50, suffix: ["LLC", ""], cities: ["Tbilisi", "Batumi", "Kutaisi"] },
};

// ── Company name stems per category ──
const COMPANY_STEMS: Record<Cat, string[]> = {
  Magazzino: ["EuroStock Logistics", "PrimeWarehouse", "CentralDepot", "BoxLine Distribution", "RapidStock", "MegaHub Fulfillment", "StoreFlow", "NordCargo Warehousing", "PackPoint", "FlexiStock"],
  Logistica: ["TransEuropa Cargo", "SwiftLine Transport", "RoadStar Logistics", "InterFreight", "BlueArrow Shipping", "CargoNext", "VeloTrans", "UnionTrans", "GlobalWay Logistics", "ExpressRoute"],
  Rider: ["CityDish Delivery", "QuickBite Couriers", "UrbanEats Logistics", "VeloFood", "SpeedMeal Delivery", "MetroRider Services"],
  Ristorante: ["Trattoria La Piazza", "Osteria del Corso", "Ristorante Bella Vita", "Bistro Centrale", "Pizzeria Vesuvio", "Brasserie du Marché", "Casa Mediterránea", "The Corner Kitchen", "Gasthaus Zur Linde", "La Table Ronde"],
  Hotel: ["Grand Hotel Continental", "Hotel Astoria Palace", "Parkview Hotel & Spa", "Hotel Bellevue", "City Central Hotel", "Riviera Resort", "Alpenhof Hotel", "Hotel Le Jardin", "Marina Bay Suites", "Hotel Excelsior"],
  Badante: ["Famiglia privata", "Cooperativa Assistenza Domiciliare", "SeniorCare Services", "CasaSerena Assistenza", "HomeCare Plus", "Private family", "Familie (privat)", "Famille privée", "Familia privada"],
  Colf: ["Famiglia privata", "CleanHome Services", "Agenzia Domestica Fidata", "SparkleClean", "Private household", "Haushalt (privat)", "Famille privée", "Familia privada"],
  "Baby-sitter": ["Famiglia privata", "BabyCare Agency", "KidsFirst Services", "Private family", "Familie (privat)", "Famille privée", "Familia privada", "Tata & Co."],
  Edilizia: ["Impresa Edile Costruzioni Moderne", "BuildTech Construction", "EdilNova", "StrutturePro", "Bau & Werk", "Bâtir Ensemble", "Constructora Ibérica", "UrbanBuild Group", "SteelFrame Contractors"],
  Agricoltura: ["Azienda Agricola Terra Verde", "AgriFarm Cooperativa", "GreenFields Farming", "Finca del Sol", "Harvest Valley Farms", "BioCampo"],
  Altro: ["ServicePoint Group", "MultiWork Agency", "FlexJob Solutions", "TeamWork Staffing", "ProService International", "WorkBridge Agency"],
};

const CONTRACTS: Record<Lang, string[]> = {
  it: ["Tempo indeterminato", "Tempo determinato", "Part-time", "Stagionale", "Full-time"],
  en: ["Full-time", "Part-time", "Permanent", "Temporary", "Seasonal"],
  de: ["Vollzeit", "Teilzeit", "Unbefristet", "Befristet", "Saisonarbeit"],
  fr: ["CDI", "CDD", "Temps partiel", "Temps plein", "Saisonnier"],
  es: ["Indefinido", "Temporal", "Jornada completa", "Media jornada", "Fijo discontinuo"],
};

interface CatTemplate {
  titles: string[];
  intro: (company: string, city: string) => string;
  tasks: string[];
  reqs: string[];
  offers: string[];
}

const H: Record<Lang, { tasks: string; reqs: string; offers: string }> = {
  it: { tasks: "Mansioni:", reqs: "Requisiti:", offers: "Offriamo:" },
  en: { tasks: "Responsibilities:", reqs: "Requirements:", offers: "We offer:" },
  de: { tasks: "Aufgaben:", reqs: "Anforderungen:", offers: "Wir bieten:" },
  fr: { tasks: "Missions :", reqs: "Profil recherché :", offers: "Nous offrons :" },
  es: { tasks: "Funciones:", reqs: "Requisitos:", offers: "Ofrecemos:" },
};

const T: Record<Lang, Partial<Record<Cat, CatTemplate>>> = {
  // ───────────────────────── ITALIAN ─────────────────────────
  it: {
    Magazzino: {
      titles: ["Addetto/a al Magazzino", "Magazziniere con Esperienza", "Operatore di Magazzino su Turni", "Picker/Packer E-commerce", "Mulettista con Patentino", "Addetto/a Carico e Scarico"],
      intro: (c, ci) => `${c} ricerca personale di magazzino per il proprio polo logistico di ${ci}. Inserimento immediato previo colloquio conoscitivo.`,
      tasks: ["Prelievo e preparazione degli ordini (picking)", "Carico e scarico merci con transpallet", "Controllo qualità e quantità della merce in entrata", "Etichettatura, imballaggio e confezionamento", "Utilizzo di palmari e gestionale di magazzino", "Sistemazione della merce a scaffale", "Inventari periodici"],
      reqs: ["Esperienza pregressa in magazzino (anche breve)", "Disponibilità a lavorare su turni, anche notturni", "Buona resistenza fisica e precisione", "Patentino del muletto (titolo preferenziale)", "Documenti in regola per il lavoro", "Affidabilità e puntualità", "Conoscenza base dell'italiano"],
      offers: ["Contratto CCNL Logistica con tredicesima e quattordicesima", "Buoni pasto giornalieri", "Straordinari retribuiti", "Formazione iniziale retribuita", "Possibilità di stabilizzazione a tempo indeterminato", "Ambiente di lavoro strutturato e sicuro"],
    },
    Logistica: {
      titles: ["Autista Patente C/CQC", "Addetto/a Spedizioni", "Impiegato/a Ufficio Logistica", "Corriere Consegne Locali", "Coordinatore/trice di Deposito"],
      intro: (c, ci) => `${c}, realtà consolidata nel settore trasporti, cerca nuove risorse per la sede di ${ci}.`,
      tasks: ["Pianificazione e gestione delle spedizioni giornaliere", "Consegne su tratte locali e regionali", "Gestione documenti di trasporto (DDT)", "Contatto con clienti e corrieri", "Monitoraggio delle consegne tramite gestionale", "Ottimizzazione dei giri di consegna"],
      reqs: ["Patente B (C/CQC per ruoli di guida)", "Esperienza nel settore trasporti o logistica", "Buon uso del PC e dei principali gestionali", "Precisione e capacità organizzative", "Disponibilità immediata", "Flessibilità oraria"],
      offers: ["Retribuzione in linea con l'esperienza", "Mezzo aziendale per i ruoli di guida", "Contratto CCNL Trasporti", "Premi di produzione", "Percorso di crescita interna"],
    },
    Rider: {
      titles: ["Rider Consegne in Bici", "Rider Scooter — Zona Centro", "Fattorino/a Consegne Food"],
      intro: (c, ci) => `${c} amplia la squadra di rider a ${ci}. Cerchiamo persone puntuali e cordiali per le consegne a domicilio.`,
      tasks: ["Consegna di cibo e spesa a domicilio", "Ritiro ordini presso ristoranti partner", "Utilizzo dell'app aziendale per le consegne", "Cura del rapporto con i clienti alla consegna"],
      reqs: ["Bici o scooter proprio (con documenti in regola)", "Smartphone con connessione dati", "Disponibilità serale e nei weekend", "Conoscenza della città", "Maggiore età"],
      offers: ["Compenso orario garantito + incentivi a consegna", "Mance interamente al rider", "Assicurazione durante il servizio", "Kit consegna fornito dall'azienda", "Flessibilità totale dei turni"],
    },
    Ristorante: {
      titles: ["Cameriere/a di Sala", "Aiuto Cuoco", "Cuoco/a Capo Partita", "Pizzaiolo/a con Esperienza", "Lavapiatti", "Barista Turno Serale"],
      intro: (c, ci) => `${c} a ${ci} cerca personale per ampliamento organico. Locale avviato con clientela affezionata.`,
      tasks: ["Servizio ai tavoli e accoglienza clienti", "Preparazione della linea di cucina", "Supporto nella preparazione dei piatti", "Pulizia e riordino della postazione", "Gestione delle comande con palmare", "Preparazione di caffetteria e cocktail"],
      reqs: ["Esperienza nel ruolo di almeno 1 anno", "Attestato HACCP in corso di validità", "Predisposizione al contatto con il pubblico", "Disponibilità nei weekend e festivi", "Bella presenza e cura personale", "Capacità di lavorare sotto pressione"],
      offers: ["Contratto CCNL Turismo/Pubblici Esercizi", "Pasti inclusi durante il turno", "Mance condivise tra il personale", "Giorno di riposo fisso settimanale", "Possibilità di crescita nel ruolo"],
    },
    Hotel: {
      titles: ["Receptionist Front Office", "Cameriere/a ai Piani", "Facchino/Portiere Notturno", "Addetto/a Colazioni", "Governante di Piano"],
      intro: (c, ci) => `${c} di ${ci} seleziona personale per la stagione in corso. Struttura a 4 stelle con clientela internazionale.`,
      tasks: ["Check-in e check-out degli ospiti", "Pulizia e riassetto delle camere", "Gestione prenotazioni telefoniche e online", "Servizio colazioni a buffet", "Assistenza agli ospiti durante il soggiorno", "Coordinamento con gli altri reparti"],
      reqs: ["Esperienza in hotel o strutture ricettive", "Inglese fluente (seconda lingua gradita)", "Uso dei principali gestionali alberghieri", "Flessibilità su turni, weekend e festivi", "Precisione e attenzione al dettaglio", "Standing curato"],
      offers: ["Contratto CCNL Turismo", "Vitto durante il servizio", "Alloggio per candidati fuori sede", "Divisa fornita dalla struttura", "Contratto stagionale con possibilità di riconferma"],
    },
    Badante: {
      titles: ["Badante Convivente", "Badante a Ore — Zona Centro", "Assistente Familiare Notturna", "Badante per Coppia di Anziani"],
      intro: (c, ci) => `${c} a ${ci} cerca una persona seria e affidabile per assistenza a persona anziana.`,
      tasks: ["Assistenza nelle attività quotidiane e igiene personale", "Preparazione dei pasti secondo le indicazioni", "Somministrazione farmaci come da prescrizione", "Compagnia e stimolo cognitivo", "Accompagnamento a visite mediche e passeggiate", "Piccole faccende domestiche"],
      reqs: ["Esperienza documentata con persone anziane", "Referenze verificabili", "Documenti in regola (permesso di soggiorno se necessario)", "Buon italiano parlato", "Pazienza, empatia e affidabilità", "Disponibilità alla convivenza (per ruoli conviventi)"],
      offers: ["Contratto regolare CCNL Colf e Badanti", "Vitto e alloggio (per ruoli conviventi)", "Contributi INPS versati regolarmente", "Tredicesima e ferie retribuite", "Riposo settimanale garantito"],
    },
    Colf: {
      titles: ["Colf a Ore", "Collaboratrice Domestica Convivente", "Addetta/o alle Pulizie Domestiche"],
      intro: (c, ci) => `${c} a ${ci} cerca collaboratore/trice domestico/a per gestione della casa.`,
      tasks: ["Pulizie ordinarie e straordinarie della casa", "Stiratura e cura della biancheria", "Riordino e organizzazione degli ambienti", "Piccole commissioni e spesa", "Preparazione di pasti semplici (se richiesto)"],
      reqs: ["Esperienza nel ruolo con referenze", "Precisione e cura dei dettagli", "Affidabilità e riservatezza", "Documenti in regola", "Automunita/o (preferibile)"],
      offers: ["Contratto regolare con contributi", "Orario stabile e concordato", "Retribuzione puntuale", "Ambiente familiare rispettoso"],
    },
    "Baby-sitter": {
      titles: ["Baby-sitter Pomeridiana", "Tata a Tempo Pieno", "Baby-sitter con Inglese"],
      intro: (c, ci) => `${c} a ${ci} cerca baby-sitter per la cura dei propri bambini.`,
      tasks: ["Cura e sorveglianza dei bambini", "Ritiro da scuola e accompagnamento alle attività", "Preparazione di merende e pasti semplici", "Giochi educativi e aiuto compiti", "Routine della nanna (per i più piccoli)"],
      reqs: ["Esperienza comprovata con bambini", "Referenze verificabili", "Corso di primo soccorso pediatrico (preferibile)", "Puntualità e affidabilità", "Automunita/o (preferibile)"],
      offers: ["Retribuzione oraria puntuale", "Contratto regolare", "Orari concordati e stabili", "Clima familiare sereno"],
    },
    Edilizia: {
      titles: ["Muratore Qualificato", "Manovale Edile", "Carpentiere/a", "Piastrellista con Esperienza", "Operaio/a Edile Polivalente"],
      intro: (c, ci) => `${c} cerca personale per cantieri attivi nella zona di ${ci}. Lavoro continuativo tutto l'anno.`,
      tasks: ["Lavori di muratura e finitura", "Preparazione del cantiere e dei materiali", "Posa di pavimenti e rivestimenti", "Montaggio e smontaggio ponteggi", "Lettura del disegno tecnico", "Utilizzo di attrezzature di cantiere"],
      reqs: ["Esperienza in cantiere di almeno 2 anni", "Corso sicurezza 16 ore in corso di validità", "Patente B", "Serietà e costanza", "Disponibilità a trasferte giornaliere"],
      offers: ["Contratto CCNL Edilizia con busta paga regolare", "Straordinari sempre retribuiti", "DPI e attrezzatura forniti", "Cassa edile e contributi versati", "Lavoro continuativo, non a chiamata"],
    },
    Agricoltura: {
      titles: ["Operaio/a Agricolo Stagionale", "Addetto/a alla Raccolta", "Trattorista con Esperienza"],
      intro: (c, ci) => `${c} nei pressi di ${ci} cerca personale per la stagione agricola.`,
      tasks: ["Raccolta di frutta e verdura di stagione", "Potatura e cura delle colture", "Confezionamento del prodotto", "Conduzione mezzi agricoli (per trattoristi)", "Manutenzione ordinaria degli impianti"],
      reqs: ["Buona resistenza fisica al lavoro all'aperto", "Esperienza agricola (preferibile)", "Documenti in regola", "Disponibilità nei mesi di stagione", "Patente trattore (per ruoli di guida)"],
      offers: ["Retribuzione a giornata secondo contratto agricolo", "Possibilità di alloggio in azienda", "Contratto stagionale regolare", "Riconferma per le stagioni successive"],
    },
    Altro: {
      titles: ["Addetto/a alle Pulizie Uffici", "Operatore/trice Call Center", "Addetto/a Vendite in Negozio", "Guardia Giurata", "Addetto/a Mensa"],
      intro: (c, ci) => `${c} seleziona personale per attività presso clienti a ${ci}.`,
      tasks: ["Svolgimento delle attività assegnate secondo turni", "Rapporto diretto con clienti e pubblico", "Cura e ordine della postazione di lavoro", "Rispetto delle procedure aziendali", "Reportistica di base"],
      reqs: ["Anche prima esperienza", "Affidabilità e flessibilità", "Buona presenza e cordialità", "Disponibilità immediata", "Documenti in regola"],
      offers: ["Contratto regolare dal primo giorno", "Formazione iniziale a carico dell'azienda", "Orari programmati con anticipo", "Possibilità di proroga e stabilizzazione"],
    },
  },

  // ───────────────────────── ENGLISH ─────────────────────────
  en: {
    Magazzino: {
      titles: ["Warehouse Operative", "Forklift Driver (Certified)", "Picker/Packer — E-commerce", "Warehouse Associate (Shifts)", "Goods-In Operative", "Night Shift Warehouse Worker"],
      intro: (c, ci) => `${c} is hiring warehouse staff for our distribution centre in ${ci}. Immediate start available after a short interview.`,
      tasks: ["Picking and packing customer orders", "Loading and unloading delivery vehicles", "Scanning goods with handheld devices", "Quality-checking incoming stock", "Keeping work areas clean and safe", "Assisting with stock counts and inventory"],
      reqs: ["Previous warehouse experience preferred (not essential)", "Ability to work rotating shifts including nights", "Physically fit — role involves lifting", "Forklift licence an advantage", "Right to work documentation", "Reliable and punctual"],
      offers: ["Competitive hourly rate with paid overtime", "Weekly or monthly pay — your choice", "Full training provided", "Temp-to-perm opportunities", "On-site parking and canteen", "28 days holiday (pro rata)"],
    },
    Logistica: {
      titles: ["Delivery Driver (Van)", "HGV Class 2 Driver", "Logistics Coordinator", "Transport Planner", "Courier — Local Routes"],
      intro: (c, ci) => `${c} is expanding its transport team in ${ci}. Join a stable, growing logistics operation.`,
      tasks: ["Daily deliveries on local and regional routes", "Route planning and delivery scheduling", "Vehicle checks and paperwork", "Liaising with customers and depot staff", "Tracking shipments in our transport system"],
      reqs: ["Valid driving licence (HGV for driver roles)", "Clean driving record", "Experience in transport or logistics", "Good communication skills", "Flexibility with start times"],
      offers: ["Competitive salary plus performance bonus", "Company vehicle and fuel card for driver roles", "Paid overtime", "Pension scheme", "Clear progression path"],
    },
    Rider: {
      titles: ["Food Delivery Rider (Bike)", "Delivery Rider — Scooter", "Evening Delivery Courier"],
      intro: (c, ci) => `${c} is looking for reliable riders in ${ci}. Flexible hours — you choose when you work.`,
      tasks: ["Delivering food and groceries to customers", "Collecting orders from partner restaurants", "Using our delivery app to manage orders", "Providing friendly doorstep service"],
      reqs: ["Own bike or scooter with valid documents", "Smartphone with data plan", "Availability on evenings and weekends", "Good knowledge of the city", "18 years or older"],
      offers: ["Guaranteed hourly base plus per-drop fee", "Keep 100% of your tips", "Insurance while on delivery", "Free delivery kit", "Weekly payouts"],
    },
    Ristorante: {
      titles: ["Waiter/Waitress", "Line Cook", "Kitchen Porter", "Chef de Partie", "Barista — Full Time", "Restaurant Supervisor"],
      intro: (c, ci) => `${c} in ${ci} is growing its team. Busy venue with a loyal customer base and a friendly crew.`,
      tasks: ["Serving guests and taking orders", "Food preparation and plating", "Keeping kitchen and stations clean", "Handling POS and card payments", "Preparing coffee and drinks", "Supporting the team during peak service"],
      reqs: ["At least 1 year experience in a similar role", "Food hygiene certificate (we can help you get one)", "Great attitude with customers", "Weekend and evening availability", "Able to work under pressure"],
      offers: ["Competitive pay plus shared tips", "Free staff meals on shift", "One fixed day off per week", "Training and progression opportunities", "Staff discount"],
    },
    Hotel: {
      titles: ["Front Desk Receptionist", "Housekeeping Attendant", "Night Porter", "Breakfast Attendant", "Head Housekeeper"],
      intro: (c, ci) => `${c} in ${ci} is recruiting for the current season. A 4-star property with international guests.`,
      tasks: ["Guest check-in and check-out", "Cleaning and preparing guest rooms", "Managing phone and online reservations", "Serving the breakfast buffet", "Responding to guest requests", "Coordinating with other departments"],
      reqs: ["Hotel or hospitality experience", "Fluent English (second language a plus)", "Familiarity with hotel software", "Flexible with shifts, weekends and holidays", "Well presented and detail oriented"],
      offers: ["Competitive salary", "Meals on duty", "Staff accommodation available for relocators", "Uniform provided", "Seasonal contract with option to extend"],
    },
    Badante: {
      titles: ["Live-in Caregiver", "Elderly Care Assistant (Daily)", "Overnight Care Assistant", "Companion Caregiver"],
      intro: (c, ci) => `${c} in ${ci} is seeking a caring, dependable person to assist an elderly family member.`,
      tasks: ["Help with daily activities and personal care", "Preparing meals to dietary requirements", "Medication reminders as prescribed", "Companionship and light conversation", "Accompanying to medical appointments", "Light housekeeping"],
      reqs: ["Proven experience in elderly care", "Checkable references", "Legal right to work", "Good spoken English", "Patience, empathy and reliability", "Willing to live in (for live-in roles)"],
      offers: ["Registered contract with social contributions", "Room and board (live-in roles)", "Guaranteed weekly rest day", "Paid holidays", "Supportive family environment"],
    },
    Colf: {
      titles: ["Housekeeper (Part-time)", "Domestic Cleaner", "Live-in Housekeeper"],
      intro: (c, ci) => `${c} in ${ci} is looking for a trustworthy housekeeper for regular home upkeep.`,
      tasks: ["General and deep cleaning of the home", "Laundry and ironing", "Tidying and organising rooms", "Occasional errands and shopping", "Simple meal preparation if requested"],
      reqs: ["Experience with references", "Attention to detail", "Trustworthy and discreet", "Right to work documentation", "Driving licence a plus"],
      offers: ["Registered contract", "Stable agreed schedule", "Punctual payment", "Respectful household"],
    },
    "Baby-sitter": {
      titles: ["After-School Nanny", "Full-Time Nanny", "Weekend Babysitter"],
      intro: (c, ci) => `A family in ${ci} is looking for a babysitter to help care for their children.`,
      tasks: ["Childcare and supervision", "School pick-up and activity drop-offs", "Preparing snacks and simple meals", "Educational play and homework help", "Bedtime routine for younger children"],
      reqs: ["Proven childcare experience", "Checkable references", "Paediatric first aid (preferred)", "Punctual and dependable", "Driving licence a plus"],
      offers: ["Competitive hourly rate", "Registered contract", "Stable agreed hours", "Warm family environment"],
    },
    Edilizia: {
      titles: ["Skilled Bricklayer", "General Labourer", "Carpenter", "Tiler with Experience", "Multi-skilled Construction Worker"],
      intro: (c, ci) => `${c} needs workers for active sites around ${ci}. Year-round continuous work, not day hire.`,
      tasks: ["Bricklaying and finishing work", "Site preparation and material handling", "Floor and wall tiling", "Scaffolding assembly and dismantling", "Reading technical drawings", "Operating site equipment"],
      reqs: ["Minimum 2 years site experience", "Valid safety certification", "Driving licence", "Reliable and consistent", "Willing to travel to nearby sites"],
      offers: ["Registered contract with full payslip", "All overtime paid", "PPE and tools provided", "Social contributions paid", "Continuous work all year"],
    },
    Agricoltura: {
      titles: ["Seasonal Farm Worker", "Harvest Picker", "Tractor Operator"],
      intro: (c, ci) => `${c} near ${ci} is hiring for the agricultural season.`,
      tasks: ["Harvesting seasonal fruit and vegetables", "Pruning and crop care", "Packing produce for shipment", "Operating farm machinery (tractor roles)", "Basic equipment maintenance"],
      reqs: ["Fit for outdoor physical work", "Farm experience preferred", "Right to work documentation", "Available for the full season", "Tractor licence for operator roles"],
      offers: ["Daily rate per agricultural contract", "On-farm accommodation available", "Registered seasonal contract", "Priority rehire next season"],
    },
    Altro: {
      titles: ["Office Cleaner", "Call Centre Agent", "Retail Sales Assistant", "Security Guard", "Canteen Assistant"],
      intro: (c, ci) => `${c} is recruiting for client sites in ${ci}.`,
      tasks: ["Carrying out assigned duties per shift schedule", "Direct contact with customers and the public", "Keeping the workstation clean and organised", "Following company procedures", "Basic reporting"],
      reqs: ["No experience necessary — training given", "Reliable and flexible", "Friendly and presentable", "Available to start immediately", "Right to work documentation"],
      offers: ["Registered contract from day one", "Paid initial training", "Rotas published in advance", "Extension and permanent options"],
    },
  },

  // ───────────────────────── GERMAN ─────────────────────────
  de: {
    Magazzino: {
      titles: ["Lagermitarbeiter (m/w/d)", "Staplerfahrer (m/w/d)", "Kommissionierer (m/w/d)", "Lagerhelfer Schichtbetrieb (m/w/d)"],
      intro: (c, ci) => `${c} sucht Verstärkung für unser Logistikzentrum in ${ci}. Kurzfristiger Einstieg nach persönlichem Gespräch möglich.`,
      tasks: ["Kommissionierung von Kundenaufträgen", "Be- und Entladen von LKW", "Warenannahme und Qualitätskontrolle", "Scannen der Ware mit Handgeräten", "Verpackung und Etikettierung", "Mithilfe bei Inventuren"],
      reqs: ["Erste Lagererfahrung von Vorteil", "Bereitschaft zur Schichtarbeit (auch Nachtschicht)", "Körperliche Belastbarkeit", "Staplerschein von Vorteil", "Gültige Arbeitserlaubnis", "Zuverlässigkeit und Pünktlichkeit"],
      offers: ["Übertarifliche Bezahlung plus Schichtzulagen", "Unbefristeter Arbeitsvertrag möglich", "Bezahlte Einarbeitung", "Urlaubs- und Weihnachtsgeld", "Kostenlose Parkplätze und Kantine", "Übernahmeoption nach Probezeit"],
    },
    Logistica: {
      titles: ["Berufskraftfahrer CE (m/w/d)", "Auslieferungsfahrer (m/w/d)", "Disponent (m/w/d)", "Kurierfahrer Nahverkehr (m/w/d)"],
      intro: (c, ci) => `${c}, etabliertes Transportunternehmen, sucht neue Kolleginnen und Kollegen am Standort ${ci}.`,
      tasks: ["Auslieferung auf regionalen Touren", "Tourenplanung und Disposition", "Fahrzeugkontrolle und Ladungssicherung", "Kundenkontakt bei der Zustellung", "Bearbeitung der Lieferdokumente"],
      reqs: ["Führerschein Klasse B (CE für Fahrerpositionen)", "Erfahrung im Transportwesen von Vorteil", "Gute Deutschkenntnisse", "Selbstständige Arbeitsweise", "Flexibilität bei den Arbeitszeiten"],
      offers: ["Attraktive Vergütung plus Spesen", "Moderner Fuhrpark", "Geregelte Arbeitszeiten", "Unbefristete Festanstellung", "Weiterbildungsmöglichkeiten (z.B. Module)"],
    },
    Ristorante: {
      titles: ["Servicekraft (m/w/d)", "Koch/Köchin", "Küchenhilfe (m/w/d)", "Barista (m/w/d)"],
      intro: (c, ci) => `${c} in ${ci} sucht Verstärkung für das Team. Gut besuchtes Lokal mit Stammpublikum.`,
      tasks: ["Service am Gast und Bestellaufnahme", "Zubereitung von Speisen nach Rezeptur", "Vor- und Nachbereitung der Küche", "Einhaltung der Hygienevorschriften (HACCP)", "Kassieren und Abrechnung"],
      reqs: ["Erfahrung in Gastronomie oder Hotellerie", "Gesundheitszeugnis", "Freundliches, gepflegtes Auftreten", "Bereitschaft zu Wochenend- und Abenddiensten", "Teamfähigkeit und Belastbarkeit"],
      offers: ["Faire Bezahlung plus Trinkgeld", "Personalessen kostenlos", "Fester freier Tag pro Woche", "Langfristige Perspektive", "Betriebliche Weiterbildung"],
    },
    Hotel: {
      titles: ["Rezeptionist (m/w/d)", "Zimmermädchen/Roomboy (m/w/d)", "Nachtportier (m/w/d)", "Frühstückskraft (m/w/d)"],
      intro: (c, ci) => `${c} in ${ci} stellt für die laufende Saison ein. 4-Sterne-Haus mit internationalen Gästen.`,
      tasks: ["Check-in und Check-out der Gäste", "Reinigung und Aufbereitung der Zimmer", "Annahme von Reservierungen", "Betreuung des Frühstücksbuffets", "Gästebetreuung während des Aufenthalts"],
      reqs: ["Erfahrung in der Hotellerie", "Gute Englischkenntnisse", "Gepflegtes Erscheinungsbild", "Schicht-, Wochenend- und Feiertagsbereitschaft", "Sorgfalt und Serviceorientierung"],
      offers: ["Leistungsgerechte Vergütung", "Verpflegung im Dienst", "Personalunterkunft möglich", "Dienstkleidung wird gestellt", "Saisonvertrag mit Verlängerungsoption"],
    },
    Badante: {
      titles: ["Pflegehilfe für Senioren (m/w/d)", "24-Stunden-Betreuung (m/w/d)", "Alltagsbegleiter (m/w/d)"],
      intro: (c, ci) => `${c} in ${ci} sucht eine zuverlässige Betreuungskraft für ein älteres Familienmitglied.`,
      tasks: ["Unterstützung im Alltag und bei der Körperpflege", "Zubereitung der Mahlzeiten", "Erinnerung an die Medikamenteneinnahme", "Gesellschaft leisten und Aktivierung", "Begleitung zu Arztterminen", "Leichte Hausarbeiten"],
      reqs: ["Erfahrung in der Seniorenbetreuung", "Nachprüfbare Referenzen", "Gültige Arbeitserlaubnis", "Gute Deutschkenntnisse", "Geduld, Empathie und Zuverlässigkeit"],
      offers: ["Angemeldete Beschäftigung mit Sozialversicherung", "Kost und Logis (bei 24h-Betreuung)", "Fester freier Tag pro Woche", "Bezahlter Urlaub", "Wertschätzendes familiäres Umfeld"],
    },
    Edilizia: {
      titles: ["Maurer (m/w/d)", "Bauhelfer (m/w/d)", "Zimmerer (m/w/d)", "Fliesenleger (m/w/d)"],
      intro: (c, ci) => `${c} sucht Personal für laufende Baustellen im Raum ${ci}. Ganzjährige Beschäftigung.`,
      tasks: ["Maurer- und Ausbauarbeiten", "Baustelleneinrichtung und Materialtransport", "Verlegen von Fliesen und Böden", "Auf- und Abbau von Gerüsten", "Arbeiten nach Zeichnung"],
      reqs: ["Mindestens 2 Jahre Baustellenerfahrung", "Gültiger Sicherheitsnachweis", "Führerschein Klasse B", "Zuverlässige, saubere Arbeitsweise", "Bereitschaft zu Tagespendeln"],
      offers: ["Bezahlung nach Bautarif", "Überstunden werden voll vergütet", "Arbeitskleidung und PSA gestellt", "SOKA-Bau und Sozialabgaben", "Ganzjährige feste Anstellung"],
    },
  },

  // ───────────────────────── FRENCH ─────────────────────────
  fr: {
    Magazzino: {
      titles: ["Préparateur de Commandes (H/F)", "Cariste CACES (H/F)", "Agent Logistique (H/F)", "Manutentionnaire (H/F)"],
      intro: (c, ci) => `${c} recrute pour son entrepôt de ${ci}. Prise de poste rapide après entretien.`,
      tasks: ["Préparation des commandes (picking)", "Chargement et déchargement des camions", "Contrôle qualité des marchandises", "Utilisation de scanners et du logiciel d'entrepôt", "Emballage et étiquetage", "Participation aux inventaires"],
      reqs: ["Première expérience en entrepôt appréciée", "Disponibilité en horaires d'équipe (2x8 / 3x8)", "Bonne condition physique", "CACES 1-3-5 apprécié", "Autorisation de travail en règle", "Sérieux et ponctualité"],
      offers: ["Salaire attractif + primes d'équipe", "Panier repas et indemnité transport", "Heures supplémentaires majorées", "Formation assurée à l'arrivée", "Possibilité de CDI après période d'essai"],
    },
    Logistica: {
      titles: ["Chauffeur-Livreur (H/F)", "Conducteur SPL (H/F)", "Agent d'Exploitation Transport (H/F)"],
      intro: (c, ci) => `${c}, acteur reconnu du transport, renforce son équipe à ${ci}.`,
      tasks: ["Livraisons sur tournées locales et régionales", "Planification des tournées", "Contrôle du véhicule et arrimage", "Relation client lors des livraisons", "Gestion des documents de transport"],
      reqs: ["Permis B (SPL pour postes de conduite)", "Expérience en transport ou logistique", "Bon relationnel client", "Autonomie et rigueur", "Flexibilité horaire"],
      offers: ["Rémunération attractive + frais", "Véhicule récent et bien entretenu", "Mutuelle d'entreprise", "CDI après période d'essai", "Évolution possible"],
    },
    Ristorante: {
      titles: ["Serveur/Serveuse", "Commis de Cuisine (H/F)", "Chef de Partie (H/F)", "Plongeur (H/F)"],
      intro: (c, ci) => `${c} à ${ci} renforce son équipe. Établissement réputé avec une clientèle fidèle.`,
      tasks: ["Service en salle et accueil des clients", "Préparation des plats et mise en place", "Entretien du poste de travail", "Prise de commandes et encaissement", "Respect des normes HACCP"],
      reqs: ["Expérience d'au moins 1 an sur un poste similaire", "Sens du service et bonne présentation", "Disponibilité soirs et week-ends", "Résistance au rythme des services", "Esprit d'équipe"],
      offers: ["Salaire selon expérience + pourboires", "Repas pris en charge pendant le service", "Jour de repos fixe hebdomadaire", "Poste évolutif", "Ambiance de travail conviviale"],
    },
    Hotel: {
      titles: ["Réceptionniste (H/F)", "Femme/Valet de Chambre", "Veilleur de Nuit (H/F)", "Employé Petit-Déjeuner (H/F)"],
      intro: (c, ci) => `${c} à ${ci} recrute pour la saison. Établissement 4 étoiles à clientèle internationale.`,
      tasks: ["Check-in et check-out des clients", "Nettoyage et préparation des chambres", "Gestion des réservations", "Service du petit-déjeuner buffet", "Réponse aux demandes des clients"],
      reqs: ["Expérience en hôtellerie", "Anglais courant (autre langue appréciée)", "Maîtrise des logiciels hôteliers", "Disponibilité week-ends et jours fériés", "Excellente présentation"],
      offers: ["Salaire selon convention collective", "Repas pendant le service", "Logement possible pour les candidats mobiles", "Uniforme fourni", "Contrat saisonnier renouvelable"],
    },
    "Baby-sitter": {
      titles: ["Nounou à Domicile (H/F)", "Baby-sitter Sortie d'École", "Garde d'Enfants à Temps Plein"],
      intro: (c, ci) => `Famille à ${ci} recherche une personne de confiance pour la garde de ses enfants.`,
      tasks: ["Garde et surveillance des enfants", "Sortie d'école et accompagnement aux activités", "Préparation du goûter et de repas simples", "Jeux éducatifs et aide aux devoirs", "Routine du coucher pour les plus petits"],
      reqs: ["Expérience vérifiable avec les enfants", "Références demandées", "Formation premiers secours appréciée", "Ponctualité et fiabilité", "Permis B apprécié"],
      offers: ["Rémunération horaire attractive", "Contrat déclaré (CESU)", "Horaires stables convenus", "Cadre familial bienveillant"],
    },
    Badante: {
      titles: ["Auxiliaire de Vie (H/F)", "Aide à Domicile Personnes Âgées", "Garde de Nuit (H/F)"],
      intro: (c, ci) => `${c} à ${ci} recherche une personne sérieuse pour accompagner une personne âgée.`,
      tasks: ["Aide aux gestes du quotidien et à la toilette", "Préparation des repas", "Rappel de la prise des médicaments", "Compagnie et stimulation", "Accompagnement aux rendez-vous médicaux", "Petites tâches ménagères"],
      reqs: ["Expérience auprès de personnes âgées", "Références vérifiables", "Titre de séjour en règle si nécessaire", "Bon français parlé", "Patience et bienveillance"],
      offers: ["Contrat déclaré avec cotisations", "Logement possible (postes à demeure)", "Jour de repos hebdomadaire garanti", "Congés payés", "Famille respectueuse"],
    },
  },

  // ───────────────────────── SPANISH ─────────────────────────
  es: {
    Magazzino: {
      titles: ["Mozo/a de Almacén", "Carretillero/a con Carné", "Preparador/a de Pedidos", "Operario/a de Almacén (Turnos)"],
      intro: (c, ci) => `${c} busca personal de almacén para su centro logístico en ${ci}. Incorporación inmediata tras entrevista.`,
      tasks: ["Preparación de pedidos (picking)", "Carga y descarga de camiones", "Control de calidad de la mercancía", "Uso de PDA y programa de gestión", "Embalaje y etiquetado", "Apoyo en inventarios"],
      reqs: ["Experiencia previa en almacén valorada", "Disponibilidad para turnos rotativos", "Buena condición física", "Carné de carretillero valorado", "Documentación en regla", "Seriedad y puntualidad"],
      offers: ["Salario según convenio + pluses", "Horas extra remuneradas", "Formación inicial a cargo de la empresa", "Posibilidad de contrato indefinido", "Buen ambiente de trabajo"],
    },
    Ristorante: {
      titles: ["Camarero/a de Sala", "Ayudante de Cocina", "Cocinero/a", "Friegaplatos"],
      intro: (c, ci) => `${c} en ${ci} amplía su equipo. Local consolidado con clientela fija.`,
      tasks: ["Atención al cliente y servicio en mesa", "Preparación y emplatado", "Limpieza y orden de la estación", "Toma de comandas y cobro", "Cumplimiento de normas de higiene"],
      reqs: ["Experiencia mínima de 1 año", "Carné de manipulador de alimentos", "Don de gentes y buena presencia", "Disponibilidad fines de semana", "Capacidad de trabajo bajo presión"],
      offers: ["Salario según convenio + propinas", "Comida incluida en el turno", "Día de descanso fijo semanal", "Posibilidad de crecimiento", "Equipo agradable"],
    },
    Hotel: {
      titles: ["Recepcionista de Hotel", "Camarero/a de Pisos", "Portero de Noche", "Ayudante de Desayunos"],
      intro: (c, ci) => `${c} en ${ci} selecciona personal para la temporada. Establecimiento de 4 estrellas con clientela internacional.`,
      tasks: ["Check-in y check-out de huéspedes", "Limpieza y preparación de habitaciones", "Gestión de reservas", "Servicio de desayuno buffet", "Atención a las peticiones de los huéspedes"],
      reqs: ["Experiencia en hostelería", "Inglés fluido (otro idioma valorado)", "Manejo de programas de gestión hotelera", "Disponibilidad en fines de semana y festivos", "Buena presencia y atención al detalle"],
      offers: ["Salario según convenio", "Manutención durante el servicio", "Alojamiento para candidatos de fuera", "Uniforme a cargo del hotel", "Contrato de temporada renovable"],
    },
    Badante: {
      titles: ["Cuidador/a Interno/a", "Cuidador/a de Personas Mayores por Horas", "Cuidador/a Nocturno/a"],
      intro: (c, ci) => `${c} en ${ci} busca una persona seria y de confianza para cuidar a una persona mayor.`,
      tasks: ["Ayuda en las actividades diarias y aseo personal", "Preparación de comidas", "Control de la medicación según prescripción", "Compañía y estimulación", "Acompañamiento a citas médicas", "Pequeñas tareas del hogar"],
      reqs: ["Experiencia demostrable con personas mayores", "Referencias comprobables", "Documentación en regla", "Buen español hablado", "Paciencia, empatía y seriedad"],
      offers: ["Contrato con alta en la Seguridad Social", "Alojamiento y manutención (puestos internos)", "Día libre semanal garantizado", "Vacaciones pagadas", "Familia respetuosa"],
    },
    Agricoltura: {
      titles: ["Peón Agrícola de Temporada", "Recolector/a de Fruta", "Tractorista"],
      intro: (c, ci) => `${c} cerca de ${ci} contrata personal para la campaña agrícola.`,
      tasks: ["Recolección de fruta y verdura de temporada", "Poda y cuidado de los cultivos", "Envasado del producto", "Manejo de maquinaria agrícola (tractoristas)", "Mantenimiento básico"],
      reqs: ["Buena forma física para trabajo al aire libre", "Experiencia agrícola valorada", "Documentación en regla", "Disponibilidad durante toda la campaña", "Carné de tractor para puestos de manejo"],
      offers: ["Jornal según convenio del campo", "Posibilidad de alojamiento en la finca", "Contrato de temporada dado de alta", "Recontratación en próximas campañas"],
    },
  },
};

// Distribution: [country, category, count]
const PLAN: [string, Cat, number][] = [
  // Italy — main market, all categories
  ["IT", "Magazzino", 8], ["IT", "Logistica", 6], ["IT", "Rider", 5], ["IT", "Ristorante", 8],
  ["IT", "Hotel", 6], ["IT", "Badante", 6], ["IT", "Colf", 4], ["IT", "Baby-sitter", 4],
  ["IT", "Edilizia", 5], ["IT", "Agricoltura", 3], ["IT", "Altro", 3],
  // Germany / Austria / Switzerland
  ["DE", "Magazzino", 5], ["DE", "Logistica", 4], ["DE", "Ristorante", 3], ["DE", "Hotel", 3], ["DE", "Badante", 3], ["DE", "Edilizia", 3],
  ["AT", "Magazzino", 2], ["AT", "Hotel", 2], ["AT", "Ristorante", 1], ["AT", "Badante", 1],
  ["CH", "Hotel", 2], ["CH", "Ristorante", 2], ["CH", "Badante", 1], ["CH", "Magazzino", 1],
  // France / Belgium
  ["FR", "Magazzino", 4], ["FR", "Logistica", 3], ["FR", "Ristorante", 3], ["FR", "Hotel", 3], ["FR", "Baby-sitter", 2], ["FR", "Badante", 2],
  ["BE", "Magazzino", 2], ["BE", "Logistica", 1], ["BE", "Ristorante", 1],
  // Spain
  ["ES", "Magazzino", 4], ["ES", "Ristorante", 3], ["ES", "Hotel", 3], ["ES", "Badante", 2], ["ES", "Agricoltura", 2],
  // UK / Ireland / US
  ["GB", "Magazzino", 4], ["GB", "Logistica", 3], ["GB", "Ristorante", 2], ["GB", "Hotel", 2], ["GB", "Badante", 2], ["GB", "Edilizia", 1],
  ["IE", "Magazzino", 2], ["IE", "Hotel", 1], ["IE", "Ristorante", 1],
  ["US", "Magazzino", 3], ["US", "Logistica", 3], ["US", "Ristorante", 2], ["US", "Hotel", 2], ["US", "Edilizia", 2], ["US", "Baby-sitter", 1], ["US", "Rider", 1],
  // Netherlands / Portugal / Greece
  ["NL", "Magazzino", 3], ["NL", "Logistica", 2], ["NL", "Hotel", 1], ["NL", "Rider", 1],
  ["PT", "Hotel", 2], ["PT", "Ristorante", 1], ["PT", "Agricoltura", 1],
  ["GR", "Hotel", 2], ["GR", "Ristorante", 1],
  // Central / Eastern Europe
  ["PL", "Magazzino", 3], ["PL", "Logistica", 2], ["PL", "Edilizia", 1],
  ["CZ", "Magazzino", 2], ["CZ", "Logistica", 1],
  ["SK", "Magazzino", 1], ["SK", "Logistica", 1],
  ["HU", "Magazzino", 2], ["HU", "Ristorante", 1],
  ["RO", "Magazzino", 2], ["RO", "Edilizia", 1],
  ["BG", "Magazzino", 1], ["BG", "Agricoltura", 1],
  ["HR", "Hotel", 2], ["HR", "Ristorante", 1],
  ["RS", "Magazzino", 1], ["RS", "Edilizia", 1],
  ["AL", "Edilizia", 1], ["AL", "Ristorante", 1],
  ["TR", "Hotel", 2], ["TR", "Magazzino", 1],
  ["UA", "Magazzino", 2], ["UA", "Logistica", 1],
  ["GE", "Hotel", 2], ["GE", "Ristorante", 1], ["GE", "Magazzino", 1],
];

function companyFor(cat: Cat, country: Country, lang: Lang): string {
  const stems = COMPANY_STEMS[cat];
  // family/household categories: use language-appropriate family label
  if (cat === "Badante" || cat === "Colf" || cat === "Baby-sitter") {
    const familyLabels: Record<Lang, string> = {
      it: "Famiglia privata", en: "Private family", de: "Familie (privat)", fr: "Famille privée", es: "Familia privada",
    };
    if (rnd() < 0.6) return familyLabels[lang];
    const agency = stems.filter(s => !/famigl|family|familie|famille|familia|haushalt|household/i.test(s));
    return pick(agency);
  }
  const stem = pick(stems);
  const suffix = pick(country.suffix);
  return suffix ? `${stem} ${suffix}` : stem;
}

function buildDescription(tpl: CatTemplate, lang: Lang, company: string, city: string): string {
  const h = H[lang];
  const tasks = sample(tpl.tasks, Math.min(4 + Math.floor(rnd() * 2), tpl.tasks.length));
  const reqs = sample(tpl.reqs, Math.min(4 + Math.floor(rnd() * 2), tpl.reqs.length));
  const offers = sample(tpl.offers, Math.min(3 + Math.floor(rnd() * 2), tpl.offers.length));
  return [
    tpl.intro(company, city),
    "",
    h.tasks,
    ...tasks.map(t => `• ${t}`),
    "",
    h.reqs,
    ...reqs.map(r => `• ${r}`),
    "",
    h.offers,
    ...offers.map(o => `• ${o}`),
  ].join("\n");
}

async function main() {
  const jobs: any[] = [];
  const usedTitles = new Set<string>();
  // Idempotency guard: keys already in the DB. Jobs whose generated key exists in DB
  // are SKIPPED (not re-rolled), so rerunning with the same RNG seed inserts nothing new.
  const dbKeys = new Set<string>();
  const existing = await db.select({ title: jobsTable.title, city: jobsTable.city, country: jobsTable.country }).from(jobsTable);
  for (const row of existing) dbKeys.add(`${row.title}|${row.city}|${row.country}`);
  const now = Date.now();

  for (const [cc, cat, count] of PLAN) {
    const country = COUNTRIES[cc];
    if (!country) continue;
    const tpl = T[country.lang]?.[cat] ?? T.en[cat];
    if (!tpl) continue;
    const lang = T[country.lang]?.[cat] ? country.lang : "en";

    for (let i = 0; i < count; i++) {
      let city = pick(country.cities);
      let title = pick(tpl.titles);
      let key = `${title}|${city}|${cc}`;
      // Re-roll only for collisions WITHIN this run (keeps RNG deterministic across reruns)
      for (let attempt = 0; usedTitles.has(key) && attempt < 10; attempt++) {
        city = pick(country.cities);
        title = pick(tpl.titles);
        key = `${title}|${city}|${cc}`;
      }
      if (usedTitles.has(key)) continue; // still colliding in-run: skip
      usedTitles.add(key);

      const [baseMin, baseMax] = BASE_SALARY[cat];
      const jitter = 0.9 + rnd() * 0.2;
      const salaryMin = roundTo(baseMin * country.factor * jitter, country.round);
      const salaryMax = roundTo(baseMax * country.factor * (jitter + 0.05 + rnd() * 0.1), country.round);

      const company = companyFor(cat, country, lang as Lang);
      const description = buildDescription(tpl, lang as Lang, company, city);
      const createdAt = new Date(now - Math.floor(rnd() * 28) * 86400000 - Math.floor(rnd() * 86400000));

      const contractType = pick(CONTRACTS[lang as Lang]);
      const featured = rnd() < 0.04;

      // Idempotency: all RNG for this job has been consumed above, so the stream
      // stays identical across reruns; only the insert itself is skipped.
      if (dbKeys.has(key)) continue;

      jobs.push({
        title,
        company,
        city,
        country: cc,
        category: cat,
        salaryMin,
        salaryMax,
        contractType,
        description,
        featured,
        createdAt,
      });
    }
  }

  console.log(`📥 Inserting ${jobs.length} new job listings (additive, nothing deleted)...`);
  let inserted = 0;
  for (const job of jobs) {
    await db.insert(jobsTable).values(job);
    inserted++;
    if (inserted % 25 === 0) console.log(`  ... ${inserted}/${jobs.length}`);
  }
  console.log(`✅ Inserted ${inserted} jobs.`);
  process.exit(0);
}

main().catch((e) => { console.error("❌ Error:", e.message); process.exit(1); });
