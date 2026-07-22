import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobsTable } from "../../lib/db/src/schema/jobs.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 4294967296;
  };
}
const r = rng(20260722);
const pick = <T,>(arr: T[]): T => arr[Math.floor(r() * arr.length)];
const range = (min: number, max: number, step = 50) =>
  Math.round((min + Math.floor(r() * ((max - min) / step + 1)) * step));

// ── Italy ── (more categories, more cities, real emails)
const italyJobs = [
  // Magazzino / Logistica
  { title: "Operatore di Magazzino", city: "Milano", company: "DHL Supply Chain Italia S.r.l.", cat: "Magazzino", min: 1300, max: 1650, email: "lavoro@dhl-italia.it", contract: "Tempo determinato" },
  { title: "Addetto al Magazzino", city: "Bologna", company: "GLS Italy S.r.l.", cat: "Magazzino", min: 1250, max: 1550, email: "recruiting@gls-italy.com", contract: "Tempo determinato" },
  { title: "Carrellista Patentato", city: "Torino", company: "Geodis Logistics Italia", cat: "Magazzino", min: 1400, max: 1750, email: "selezione@geodis.it", contract: "Tempo indeterminato" },
  { title: "Picker / Packer Magazzino", city: "Verona", company: "Amazon Italia Logistica S.r.l.", cat: "Magazzino", min: 1350, max: 1600, email: "jobs.it@amazon.com", contract: "Tempo determinato" },
  { title: "Magazziniere Turno Notte", city: "Firenze", company: "Bartolini BRT S.p.A.", cat: "Magazzino", min: 1350, max: 1700, email: "hr@brt.it", contract: "Tempo determinato" },
  { title: "Addetto Ricevimento Merci", city: "Napoli", company: "SDA Express Courier S.p.A.", cat: "Magazzino", min: 1250, max: 1500, email: "personale@sda.it", contract: "Tempo determinato" },
  { title: "Operaio Magazzino Alimentare", city: "Parma", company: "Barilla G. e R. Fratelli S.p.A.", cat: "Magazzino", min: 1400, max: 1750, email: "lavoro@barilla.com", contract: "Tempo indeterminato" },
  { title: "Magazziniere con Muletto", city: "Brescia", company: "Fastweb Logistics", cat: "Magazzino", min: 1350, max: 1650, email: "hr.brescia@fastweb.it", contract: "Tempo determinato" },
  { title: "Addetto Spedizioni", city: "Padova", company: "FedEx Express Italia S.r.l.", cat: "Logistica", min: 1300, max: 1600, email: "recruiting.it@fedex.com", contract: "Tempo determinato" },
  { title: "Operatore Logistico", city: "Venezia", company: "Kuehne+Nagel S.p.A.", cat: "Logistica", min: 1400, max: 1800, email: "it.jobs@kuehne-nagel.com", contract: "Tempo indeterminato" },
  { title: "Autista Corriere", city: "Roma", company: "TNT Italia S.r.l.", cat: "Logistica", min: 1450, max: 1900, email: "selezione@tnt.it", contract: "Tempo determinato" },
  { title: "Addetto Picking Farmaceutico", city: "Milano", company: "McKesson Italia S.r.l.", cat: "Magazzino", min: 1500, max: 1850, email: "jobs@mckesson.it", contract: "Tempo indeterminato" },
  { title: "Responsabile Turno Magazzino", city: "Bergamo", company: "UPS Italia S.r.l.", cat: "Logistica", min: 1650, max: 2100, email: "jobs.it@ups.com", contract: "Tempo indeterminato" },
  { title: "Operatore Cross-Docking", city: "Piacenza", company: "DB Schenker Italia S.p.A.", cat: "Logistica", min: 1350, max: 1700, email: "jobs.italy@dbschenker.com", contract: "Tempo determinato" },
  { title: "Magazziniere Part-Time", city: "Catania", company: "Lidl Italia S.r.l.", cat: "Magazzino", min: 900, max: 1100, email: "lavoro@lidl.it", contract: "Part-time" },
  // Rider / Delivery
  { title: "Rider Consegne Alimentari", city: "Milano", company: "Glovo Italy S.r.l.", cat: "Rider", min: 1000, max: 1400, email: "riders.italy@glovoapp.com", contract: "Autonomo" },
  { title: "Fattorino in Bici", city: "Roma", company: "Just Eat Italy S.r.l.", cat: "Rider", min: 950, max: 1350, email: "riders@justeat.it", contract: "Autonomo" },
  { title: "Corriere Last-Mile", city: "Torino", company: "Milkman Technologies S.r.l.", cat: "Rider", min: 1100, max: 1450, email: "delivery@milkmantechnologies.com", contract: "Tempo determinato" },
  { title: "Rider Moto Consegne Farmaci", city: "Napoli", company: "Pharma Express S.r.l.", cat: "Rider", min: 1050, max: 1400, email: "lavoro@pharmaexpress.it", contract: "Tempo determinato" },
  // Ristorante
  { title: "Cuoco di Linea", city: "Milano", company: "Autogrill S.p.A.", cat: "Ristorante", min: 1300, max: 1700, email: "jobs@autogrill.com", contract: "Tempo determinato" },
  { title: "Cameriere / Cameriera", city: "Firenze", company: "Cipriani Food S.r.l.", cat: "Ristorante", min: 1250, max: 1600, email: "hr@cipriani.com", contract: "Stagionale" },
  { title: "Aiuto Cuoco Ristorante", city: "Venezia", company: "Bauer Palladio Hotel & Spa", cat: "Ristorante", min: 1200, max: 1550, email: "jobs@bauervenezia.com", contract: "Stagionale" },
  { title: "Lavapiatti / Addetto Cucina", city: "Roma", company: "McDonald's Italia S.r.l.", cat: "Ristorante", min: 1100, max: 1350, email: "lavoro@mcdonalds.it", contract: "Part-time" },
  { title: "Barista con Esperienza", city: "Bologna", company: "Camst Ristorazione S.c.a.r.l.", cat: "Ristorante", min: 1250, max: 1550, email: "selezione@camst.it", contract: "Tempo determinato" },
  { title: "Chef de Partie", city: "Milano", company: "Nobu Milano S.r.l.", cat: "Ristorante", min: 1600, max: 2200, email: "jobs.milan@noburestaurants.com", contract: "Tempo indeterminato" },
  { title: "Commis di Sala", city: "Napoli", company: "Ristorante Il Comandante S.r.l.", cat: "Ristorante", min: 1150, max: 1500, email: "info@ilcomandante.it", contract: "Tempo determinato" },
  // Hotel
  { title: "Receptionist Hotel 4 Stelle", city: "Roma", company: "Marriott International Hotels", cat: "Hotel", min: 1350, max: 1750, email: "jobs.rome@marriott.com", contract: "Tempo determinato" },
  { title: "Addetto ai Piani (Housekeeping)", city: "Milano", company: "Hilton Hotels Milano S.r.l.", cat: "Hotel", min: 1200, max: 1550, email: "hr.milan@hilton.com", contract: "Tempo determinato" },
  { title: "Portiere di Notte", city: "Venezia", company: "Hotel Danieli Venezia S.r.l.", cat: "Hotel", min: 1400, max: 1800, email: "jobs@hoteldanieli.com", contract: "Tempo indeterminato" },
  { title: "Addetto Room Service", city: "Firenze", company: "Four Seasons Firenze S.r.l.", cat: "Hotel", min: 1300, max: 1700, email: "hr.florence@fourseasons.com", contract: "Tempo determinato" },
  { title: "Receptionist Turno Mattina", city: "Palermo", company: "NH Hotels Italia S.r.l.", cat: "Hotel", min: 1250, max: 1600, email: "jobs.it@nh-hotels.com", contract: "Tempo determinato" },
  { title: "Addetto alla Spa Hotel", city: "Rimini", company: "Perla Resort S.r.l.", cat: "Hotel", min: 1200, max: 1550, email: "lavoro@perlaresort.it", contract: "Stagionale" },
  { title: "F&B Supervisor Hotel", city: "Milano", company: "Bulgari Hotels Italia S.r.l.", cat: "Hotel", min: 1800, max: 2400, email: "jobs@bulgarihotels.com", contract: "Tempo indeterminato" },
  // Badante / Colf / Baby-sitter
  { title: "Badante Convivente", city: "Milano", company: "Famiglie Cerca Assistenti S.r.l.", cat: "Badante", min: 950, max: 1350, email: "assistenti@famiglie-cura.it", contract: "Tempo indeterminato" },
  { title: "Assistente Anziani (H24)", city: "Torino", company: "Cooperativa Sociale Insieme", cat: "Badante", min: 1000, max: 1400, email: "lavoro@coopassistenza.it", contract: "Tempo indeterminato" },
  { title: "Assistente Familiare Diurna", city: "Roma", company: "ADG Group S.r.l.", cat: "Badante", min: 900, max: 1250, email: "selezione@adggroup.it", contract: "Tempo determinato" },
  { title: "Collaboratrice Familiare", city: "Genova", company: "Cooperativa Nuova Assistenza", cat: "Colf", min: 900, max: 1200, email: "colf@nuovaassistenza.it", contract: "Tempo indeterminato" },
  { title: "Baby-sitter Tempo Pieno", city: "Bologna", company: "SOS Tata S.r.l.", cat: "Baby-sitter", min: 900, max: 1300, email: "tate@sostata.it", contract: "Tempo indeterminato" },
  { title: "Au Pair / Baby-sitter Live-in", city: "Milano", company: "Family Home S.r.l.", cat: "Baby-sitter", min: 850, max: 1200, email: "aupair@familyhome.it", contract: "Tempo determinato" },
  // Edilizia
  { title: "Muratore Qualificato", city: "Milano", company: "Gruppo Ruffini Costruzioni S.r.l.", cat: "Edilizia", min: 1500, max: 2000, email: "lavoro@ruffinicostruzioni.it", contract: "Tempo indeterminato" },
  { title: "Operaio Edile Generico", city: "Roma", company: "Consorzio Stabile Italcos", cat: "Edilizia", min: 1350, max: 1750, email: "hr@italcos.it", contract: "Tempo determinato" },
  { title: "Carpentiere in Legno", city: "Treviso", company: "Nordwood S.r.l.", cat: "Edilizia", min: 1550, max: 2050, email: "jobs@nordwood.it", contract: "Tempo indeterminato" },
  { title: "Piastrellista Qualificato", city: "Modena", company: "Ceramiche Atlas Concorde S.p.A.", cat: "Edilizia", min: 1450, max: 1900, email: "lavoro@atlasconcorde.com", contract: "Tempo indeterminato" },
  { title: "Imbianchino / Decoratore", city: "Firenze", company: "Restauri Fiorentini S.r.l.", cat: "Edilizia", min: 1400, max: 1800, email: "info@restaurifiorentini.it", contract: "Tempo determinato" },
  { title: "Saldatore TIG/MIG", city: "Torino", company: "STM S.p.A. Metalmeccanica", cat: "Edilizia", min: 1600, max: 2100, email: "selezione@stm-torino.it", contract: "Tempo indeterminato" },
  // Agricoltura
  { title: "Raccoglitore Frutta Stagionale", city: "Cuneo", company: "Cooperativa Agricola Piemonte", cat: "Agricoltura", min: 1100, max: 1450, email: "stagionali@coopcuneo.it", contract: "Stagionale" },
  { title: "Operaio Agricolo Vitivinicolo", city: "Verona", company: "Cantina Valpolicella S.c.a.", cat: "Agricoltura", min: 1150, max: 1500, email: "lavoro@cantinavalpolicella.it", contract: "Stagionale" },
  { title: "Addetto Serra Florovivaistica", city: "Pescia", company: "Flover S.r.l.", cat: "Agricoltura", min: 1200, max: 1550, email: "jobs@flover.it", contract: "Tempo determinato" },
  { title: "Trattorista Azienda Agricola", city: "Bari", company: "Masseria Torre Coccaro", cat: "Agricoltura", min: 1150, max: 1500, email: "lavoro@masseriatorrecoccaro.it", contract: "Tempo determinato" },
  // Altro
  { title: "Operatore Call Center", city: "Palermo", company: "Comdata S.p.A.", cat: "Altro", min: 1100, max: 1450, email: "selezione@comdata.it", contract: "Tempo determinato" },
  { title: "Addetto Pulizie Industriali", city: "Milano", company: "ISS Facility Services S.p.A.", cat: "Altro", min: 1100, max: 1400, email: "lavoro@issworld.com", contract: "Part-time" },
  { title: "Guardia Giurata", city: "Roma", company: "Vigilanza Privata Securpol S.r.l.", cat: "Altro", min: 1350, max: 1750, email: "assunzioni@securpol.it", contract: "Tempo indeterminato" },
  { title: "Operatore Socio-Sanitario (OSS)", city: "Torino", company: "Cooperativa Sociale Orizzonte", cat: "Altro", min: 1300, max: 1700, email: "oss@coop-orizzonte.it", contract: "Tempo indeterminato" },
  { title: "Addetto Cassa Supermercato", city: "Milano", company: "Esselunga S.p.A.", cat: "Altro", min: 1200, max: 1500, email: "lavoro@esselunga.it", contract: "Part-time" },
  { title: "Agente di Distribuzione Stampa", city: "Napoli", company: "Distribuzione Campania S.r.l.", cat: "Logistica", min: 1200, max: 1550, email: "lavoro@distrcampania.it", contract: "Tempo determinato" },
];

// ── Germany ──
const germanyJobs = [
  { title: "Lagerarbeiter (m/w/d)", city: "München", company: "Amazon Logistik GmbH", cat: "Magazzino", min: 2000, max: 2600, email: "jobs.de@amazon.com", contract: "Vollzeit" },
  { title: "Paketzusteller", city: "Berlin", company: "DHL Paket GmbH", cat: "Rider", min: 1900, max: 2400, email: "jobs@dhl.de", contract: "Vollzeit" },
  { title: "Kommissionierer Nachtschicht", city: "Frankfurt am Main", company: "REWE Logistik GmbH", cat: "Magazzino", min: 2100, max: 2700, email: "bewerbung@rewe.de", contract: "Vollzeit" },
  { title: "Staplerfahrer", city: "Hamburg", company: "Rhenus Warehousing GmbH", cat: "Magazzino", min: 2200, max: 2800, email: "jobs@rhenus.de", contract: "Vollzeit" },
  { title: "Servicekraft Restaurant", city: "München", company: "Käfer Catering GmbH", cat: "Ristorante", min: 1800, max: 2400, email: "bewerbung@feinkost-kaefer.de", contract: "Teilzeit" },
  { title: "Hotelrezeptionist (m/w/d)", city: "Berlin", company: "Adlon Kempinski Berlin GmbH", cat: "Hotel", min: 2100, max: 2700, email: "jobs@kempinski.com", contract: "Vollzeit" },
  { title: "Pflegehilfskraft", city: "Köln", company: "Caritas Deutschland gGmbH", cat: "Badante", min: 1900, max: 2500, email: "stellen@caritas-koeln.de", contract: "Vollzeit" },
  { title: "Reinigungskraft Bürogebäude", city: "Stuttgart", company: "Wisag Facility GmbH", cat: "Altro", min: 1600, max: 2000, email: "jobs@wisag.de", contract: "Teilzeit" },
  { title: "Bauhelfer / Maurer", city: "Düsseldorf", company: "Hochtief AG", cat: "Edilizia", min: 2200, max: 2900, email: "bewerbung@hochtief.de", contract: "Vollzeit" },
  { title: "Erntehelfer Saisonarbeit", city: "Hannover", company: "Landwirtschaft Nord GmbH", cat: "Agricoltura", min: 1600, max: 2000, email: "saison@lwnord.de", contract: "Saison" },
  { title: "Küchenhilfe / Spüler", city: "Hamburg", company: "Vapiano Deutschland GmbH", cat: "Ristorante", min: 1700, max: 2100, email: "jobs@vapiano.de", contract: "Teilzeit" },
  { title: "Hausmeister", city: "Leipzig", company: "Vonovia SE", cat: "Altro", min: 2000, max: 2600, email: "jobs@vonovia.de", contract: "Vollzeit" },
  { title: "Fahrradkurier Stadt", city: "Berlin", company: "Lieferando GmbH", cat: "Rider", min: 1800, max: 2300, email: "riders@lieferando.de", contract: "Minijob" },
  { title: "Betreuer Senioren", city: "Nürnberg", company: "Alloheim Senioren-Residenzen", cat: "Badante", min: 2000, max: 2600, email: "jobs@alloheim.de", contract: "Vollzeit" },
  { title: "Lkw-Fahrer (C/CE)", city: "Dortmund", company: "DB Schenker Deutschland AG", cat: "Logistica", min: 2500, max: 3100, email: "jobs.de@dbschenker.com", contract: "Vollzeit" },
];

// ── France ──
const franceJobs = [
  { title: "Préparateur de commandes", city: "Lyon", company: "Chronopost France SAS", cat: "Magazzino", min: 1700, max: 2200, email: "emploi@chronopost.fr", contract: "CDI" },
  { title: "Livreur scooter", city: "Paris", company: "Uber Eats France SAS", cat: "Rider", min: 1500, max: 2000, email: "livreurs@uber.com", contract: "Autoentrepreneur" },
  { title: "Serveur / Serveuse", city: "Paris", company: "Groupe Flo S.A.", cat: "Ristorante", min: 1600, max: 2100, email: "recrutement@groupe-flo.fr", contract: "CDI" },
  { title: "Réceptionniste Hôtel", city: "Nice", company: "Accor Hotels France S.A.", cat: "Hotel", min: 1700, max: 2200, email: "jobs@accor.com", contract: "CDD" },
  { title: "Aide-soignant(e)", city: "Marseille", company: "KORIAN France S.A.", cat: "Badante", min: 1800, max: 2400, email: "recrutement@korian.fr", contract: "CDI" },
  { title: "Ouvrier agricole saisonnier", city: "Bordeaux", company: "Château Margaux SAS", cat: "Agricoltura", min: 1500, max: 1900, email: "emploi@chateau-margaux.com", contract: "Saisonnier" },
  { title: "Maçon qualifié", city: "Toulouse", company: "Vinci Construction France", cat: "Edilizia", min: 2100, max: 2700, email: "recrutement@vinci-construction.fr", contract: "CDI" },
  { title: "Agent d'entretien", city: "Lille", company: "Onet Services S.A.", cat: "Altro", min: 1500, max: 1900, email: "emploi@onet.fr", contract: "CDD" },
  { title: "Cuisinier / Commis", city: "Strasbourg", company: "Sodexo France S.A.", cat: "Ristorante", min: 1700, max: 2200, email: "jobs@sodexo.com", contract: "CDI" },
  { title: "Chauffeur-Livreur VL", city: "Nantes", company: "Colissimo La Poste", cat: "Logistica", min: 1800, max: 2300, email: "emploi@laposte.fr", contract: "CDI" },
  { title: "Baby-sitter à domicile", city: "Paris", company: "Yoopala SAS", cat: "Baby-sitter", min: 1400, max: 1900, email: "jobs@yoopala.com", contract: "CDD" },
  { title: "Cariste CACES 1/3/5", city: "Paris", company: "Geodis France S.A.S.", cat: "Logistica", min: 1900, max: 2450, email: "jobs@geodis.com", contract: "CDI" },
];

// ── Spain ──
const spainJobs = [
  { title: "Mozo de Almacén", city: "Madrid", company: "Inditex S.A. (Zara)", cat: "Magazzino", min: 1050, max: 1400, email: "empleo@inditex.com", contract: "Temporal" },
  { title: "Repartidor / Mensajero", city: "Barcelona", company: "Glovo Tech S.L.", cat: "Rider", min: 900, max: 1300, email: "repartidores@glovoapp.com", contract: "Autónomo" },
  { title: "Camarero/a Restaurante", city: "Sevilla", company: "Grupo Vips S.L.", cat: "Ristorante", min: 1000, max: 1400, email: "rrhh@grupovips.es", contract: "Temporal" },
  { title: "Recepcionista Hotel", city: "Málaga", company: "Meliá Hotels International S.A.", cat: "Hotel", min: 1100, max: 1500, email: "jobs@melia.com", contract: "Fijo Discontinuo" },
  { title: "Auxiliar de Ayuda a Domicilio", city: "Madrid", company: "DomusVi S.A.", cat: "Badante", min: 1000, max: 1350, email: "empleo@domusvi.com", contract: "Parcial" },
  { title: "Operario Construcción", city: "Valencia", company: "ACS Construcción S.A.", cat: "Edilizia", min: 1200, max: 1650, email: "seleccion@grupoacs.com", contract: "Obra y Servicio" },
  { title: "Trabajador Agrícola", city: "Almería", company: "Agroponiente S.A.", cat: "Agricoltura", min: 900, max: 1250, email: "jobs@agroponiente.com", contract: "Temporal" },
  { title: "Cocinero/a Colectividades", city: "Zaragoza", company: "Eurest España S.L.", cat: "Ristorante", min: 1100, max: 1500, email: "empleo@eurest.es", contract: "Indefinido" },
  { title: "Conductor Reparto (B)", city: "Bilbao", company: "MRW S.A.", cat: "Logistica", min: 1150, max: 1550, email: "rrhh@mrw.es", contract: "Indefinido" },
  { title: "Canguro / Cuidadora Niños", city: "Barcelona", company: "Sitter.es S.L.", cat: "Baby-sitter", min: 900, max: 1200, email: "trabajo@sitter.es", contract: "Parcial" },
];

// ── UK ──
const ukJobs = [
  { title: "Warehouse Operative", city: "London", company: "Ocado Group plc", cat: "Magazzino", min: 1700, max: 2200, email: "jobs@ocado.com", contract: "Full-time" },
  { title: "Food Delivery Rider", city: "Manchester", company: "Deliveroo UK Ltd", cat: "Rider", min: 1500, max: 2000, email: "riders@deliveroo.co.uk", contract: "Self-employed" },
  { title: "Restaurant Kitchen Porter", city: "London", company: "Wagamama Ltd", cat: "Ristorante", min: 1600, max: 2100, email: "jobs@wagamama.com", contract: "Part-time" },
  { title: "Hotel Housekeeper", city: "Edinburgh", company: "Radisson Hotel Group UK", cat: "Hotel", min: 1700, max: 2200, email: "jobs.uk@radissonhotels.com", contract: "Full-time" },
  { title: "Care Assistant (Residential)", city: "Birmingham", company: "Barchester Healthcare Ltd", cat: "Badante", min: 1800, max: 2400, email: "jobs@barchester.com", contract: "Full-time" },
  { title: "Labourer / Construction", city: "London", company: "Balfour Beatty plc", cat: "Edilizia", min: 2000, max: 2700, email: "jobs@balfourbeatty.com", contract: "Contract" },
  { title: "Seasonal Farm Worker", city: "Bristol", company: "Fresca Group Ltd", cat: "Agricoltura", min: 1500, max: 1950, email: "seasonal@fresacgroup.com", contract: "Seasonal" },
  { title: "Cleaner / Janitor", city: "Leeds", company: "Sodexo UK Ltd", cat: "Altro", min: 1400, max: 1800, email: "jobs.uk@sodexo.com", contract: "Part-time" },
  { title: "Van Driver (B Licence)", city: "London", company: "Hermes/Evri UK Ltd", cat: "Logistica", min: 1900, max: 2500, email: "drivers@evri.com", contract: "Full-time" },
  { title: "Barista / Cafe Staff", city: "Liverpool", company: "Costa Coffee (Whitbread)", cat: "Ristorante", min: 1500, max: 1950, email: "jobs@costa.co.uk", contract: "Part-time" },
];

// ── Netherlands ──
const nlJobs = [
  { title: "Magazijnmedewerker", city: "Amsterdam", company: "Bol.com B.V.", cat: "Magazzino", min: 1900, max: 2500, email: "jobs@bol.com", contract: "Fulltime" },
  { title: "Fietskoerier Bezorging", city: "Rotterdam", company: "Thuisbezorgd (JET) B.V.", cat: "Rider", min: 1700, max: 2200, email: "bezorgers@thuisbezorgd.nl", contract: "Flexibel" },
  { title: "Kok / Keukenmedewerker", city: "Utrecht", company: "De Foodhal B.V.", cat: "Ristorante", min: 1800, max: 2300, email: "jobs@defoodhal.nl", contract: "Parttime" },
  { title: "Receptioniste Hotel", city: "Amsterdam", company: "CitizenM Hotels B.V.", cat: "Hotel", min: 1900, max: 2500, email: "jobs@citizenm.com", contract: "Fulltime" },
  { title: "Verpleeghulp Thuiszorg", city: "The Hague", company: "Careyn B.V.", cat: "Badante", min: 2000, max: 2600, email: "vacatures@careyn.nl", contract: "Parttime" },
  { title: "Bouwvakker / Grondwerker", city: "Eindhoven", company: "BAM Bouw en Techniek", cat: "Edilizia", min: 2300, max: 3000, email: "jobs@bam.nl", contract: "Fulltime" },
  { title: "Chauffeur Pakketbezorging", city: "Tilburg", company: "DPD Nederland B.V.", cat: "Logistica", min: 2000, max: 2600, email: "jobs@dpd.nl", contract: "Fulltime" },
  { title: "Schoonmaker Kantoor", city: "Amsterdam", company: "ISS Nederland B.V.", cat: "Altro", min: 1700, max: 2200, email: "jobs@nl.issworld.com", contract: "Parttime" },
];

// ── Switzerland ──
const chJobs = [
  { title: "Lagermitarbeiter / Kommissionierer", city: "Zürich", company: "Coop Genossenschaft", cat: "Magazzino", min: 4200, max: 5200, email: "jobs@coop.ch", contract: "Vollzeit" },
  { title: "Serviceangestellte/r Restaurant", city: "Bern", company: "Mövenpick Restaurants AG", cat: "Ristorante", min: 4000, max: 5000, email: "jobs@moevenpick.com", contract: "Vollzeit" },
  { title: "Hotelfachmann/-frau", city: "Luzern", company: "Grand Hotel National Luzern AG", cat: "Hotel", min: 4200, max: 5400, email: "hr@grandhotel.ch", contract: "Vollzeit" },
  { title: "Pflegeassistenz", city: "Basel", company: "Spitex Zürich AG", cat: "Badante", min: 4500, max: 5600, email: "jobs@spitex.ch", contract: "Vollzeit" },
  { title: "Fahrer / Paketzusteller", city: "Zürich", company: "Schweizerische Post AG", cat: "Logistica", min: 4800, max: 5800, email: "jobs@post.ch", contract: "Vollzeit" },
  { title: "Baupolier / Maurer", city: "Bern", company: "Implenia AG", cat: "Edilizia", min: 5200, max: 6500, email: "jobs@implenia.com", contract: "Vollzeit" },
];

// ── Austria ──
const atJobs = [
  { title: "Lagermitarbeiter", city: "Wien", company: "Österreichische Post AG", cat: "Magazzino", min: 1800, max: 2400, email: "jobs@post.at", contract: "Vollzeit" },
  { title: "Kellner / Kellnerin", city: "Wien", company: "Do & Co Restaurants AG", cat: "Ristorante", min: 1750, max: 2300, email: "jobs@doco.com", contract: "Vollzeit" },
  { title: "Rezeptionist/in Hotel", city: "Salzburg", company: "Hotel Sacher AG", cat: "Hotel", min: 1900, max: 2500, email: "jobs@sacher.com", contract: "Vollzeit" },
  { title: "Pflegehilfe (m/w/d)", city: "Graz", company: "Volkshilfe Österreich", cat: "Badante", min: 1900, max: 2500, email: "jobs@volkshilfe.at", contract: "Teilzeit" },
  { title: "Bauarbeiter Tiefbau", city: "Linz", company: "Strabag AG Österreich", cat: "Edilizia", min: 2100, max: 2800, email: "jobs@strabag.com", contract: "Vollzeit" },
  { title: "Fahrradkurier Wien", city: "Wien", company: "Foodora Austria GmbH", cat: "Rider", min: 1600, max: 2100, email: "riders.at@foodora.com", contract: "Geringfügig" },
];

// ── Belgium ──
const beJobs = [
  { title: "Magazijnier Orderpicking", city: "Bruxelles", company: "Colruyt Group NV", cat: "Magazzino", min: 2000, max: 2600, email: "jobs@colruyt.be", contract: "Voltijds" },
  { title: "Serveur / Serveerder", city: "Bruxelles", company: "Lunch Garden S.A.", cat: "Ristorante", min: 1800, max: 2300, email: "jobs@lunchgarden.be", contract: "Deeltijds" },
  { title: "Aide-ménagère à domicile", city: "Liège", company: "ASD Group Belgium S.A.", cat: "Colf", min: 1700, max: 2200, email: "emploi@asd.be", contract: "CDI" },
  { title: "Bouwvakker", city: "Gent", company: "Jan De Nul Group", cat: "Edilizia", min: 2300, max: 3000, email: "jobs@jandenul.com", contract: "Voltijds" },
];

// ── Portugal ──
const ptJobs = [
  { title: "Operador de Armazém", city: "Lisboa", company: "CTT - Correios de Portugal S.A.", cat: "Magazzino", min: 950, max: 1300, email: "emprego@ctt.pt", contract: "Termo certo" },
  { title: "Empregado de Mesa", city: "Porto", company: "Grupo Pestana Hotels & Resorts", cat: "Ristorante", min: 900, max: 1250, email: "jobs@pestana.com", contract: "Contrato" },
  { title: "Assistente Hotelaria", city: "Faro", company: "Vila Galé Hotéis S.A.", cat: "Hotel", min: 950, max: 1300, email: "rh@vilagale.pt", contract: "Sazonal" },
  { title: "Auxiliar de Ação Médica", city: "Lisboa", company: "Lusíadas Saúde S.A.", cat: "Badante", min: 1000, max: 1350, email: "rh@lusiadas.pt", contract: "Sem termo" },
];

// ── Poland ──
const plJobs = [
  { title: "Pracownik magazynu", city: "Warszawa", company: "InPost S.A.", cat: "Magazzino", min: 5500, max: 7000, email: "praca@inpost.pl", contract: "Umowa o pracę" },
  { title: "Dostawca rowerowy", city: "Kraków", company: "Bolt Food Polska Sp. z o.o.", cat: "Rider", min: 4500, max: 6000, email: "couriers.pl@bolt.eu", contract: "B2B" },
  { title: "Kelner / Kelnerka", city: "Warszawa", company: "AmRest Sp. z o.o. (KFC)", cat: "Ristorante", min: 4500, max: 5800, email: "praca@amrest.eu", contract: "Umowa o pracę" },
  { title: "Pracownik budowlany", city: "Wrocław", company: "Skanska S.A. Polska", cat: "Edilizia", min: 6000, max: 8000, email: "jobs@skanska.pl", contract: "Umowa o pracę" },
  { title: "Opiekunka osób starszych", city: "Poznań", company: "Fundacja Opieki i Zdrowia", cat: "Badante", min: 4500, max: 6000, email: "praca@fundacja-opz.pl", contract: "Umowa zlecenie" },
];

// ── Romania ──
const roJobs = [
  { title: "Operator depozit", city: "București", company: "Fan Courier S.R.L.", cat: "Magazzino", min: 3200, max: 4200, email: "jobs@fancourier.ro", contract: "Pe durată nedeterminată" },
  { title: "Ospătar / Ospătăriță", city: "Cluj-Napoca", company: "McDonald's România S.R.L.", cat: "Ristorante", min: 2800, max: 3800, email: "jobs@mcdonalds.ro", contract: "Timp parțial" },
  { title: "Îngrijitor persoane vârstnice", city: "Timișoara", company: "Caritas România S.R.L.", cat: "Badante", min: 3000, max: 4000, email: "angajari@caritas-ro.org", contract: "Nedeterminat" },
];

// ── Greece ──
const grJobs = [
  { title: "Εργάτης Αποθήκης", city: "Athens", company: "ΕΛΤΑ Ταχυδρομεία S.A.", cat: "Magazzino", min: 900, max: 1200, email: "jobs@elta.gr", contract: "Αορίστου χρόνου" },
  { title: "Σερβιτόρος Εστιατόριο", city: "Thessaloniki", company: "Goody's Everest A.E.", cat: "Ristorante", min: 850, max: 1200, email: "hr@goodysburgershouse.gr", contract: "Μερικής απασχόλησης" },
  { title: "Οικιακή Βοηθός", city: "Athens", company: "Homecare Greece S.A.", cat: "Colf", min: 800, max: 1150, email: "jobs@homecare.gr", contract: "Μερικής" },
];

// ── Czech Republic ──
const czJobs = [
  { title: "Skladník / Skladnice", city: "Praha", company: "Zásilkovna s.r.o.", cat: "Magazzino", min: 28000, max: 36000, email: "jobs@zasilkovna.cz", contract: "Trvalý" },
  { title: "Číšník / Číšnice", city: "Brno", company: "Ambiente s.r.o.", cat: "Ristorante", min: 25000, max: 32000, email: "prace@ambi.cz", contract: "Trvalý" },
  { title: "Pracovník na stavbě", city: "Praha", company: "Metrostav a.s.", cat: "Edilizia", min: 30000, max: 42000, email: "jobs@metrostav.cz", contract: "Trvalý" },
];

// ── Croatia ──
const hrJobs = [
  { title: "Radnik skladišta", city: "Zagreb", company: "DPD Croatia d.o.o.", cat: "Magazzino", min: 900, max: 1250, email: "posao@dpd.hr", contract: "Na određeno" },
  { title: "Konobar / Konobarica", city: "Split", company: "Valamar Riviera d.d.", cat: "Ristorante", min: 950, max: 1300, email: "posao@valamar.com", contract: "Sezonski" },
  { title: "Njegovatelj / Njegovateljica", city: "Rijeka", company: "Dom Za Starije Osobe", cat: "Badante", min: 900, max: 1250, email: "posao@domstariji-ri.hr", contract: "Na neodređeno" },
];

// ── Serbia ──
const rsJobs = [
  { title: "Radnik magacina", city: "Beograd", company: "DHL Express Srbija d.o.o.", cat: "Magazzino", min: 85000, max: 110000, email: "jobs.rs@dhl.com", contract: "Na određeno" },
  { title: "Konobar", city: "Novi Sad", company: "McDonald's Srbija d.o.o.", cat: "Ristorante", min: 70000, max: 90000, email: "posao@mcdonalds.rs", contract: "Skraćeno radno vreme" },
];

// ── Hungary ──
const huJobs = [
  { title: "Raktáros / Raktármunkás", city: "Budapest", company: "Magyar Posta Zrt.", cat: "Magazzino", min: 380000, max: 490000, email: "allasok@posta.hu", contract: "Határozatlan" },
  { title: "Pincér / Felszolgáló", city: "Budapest", company: "Gundel Étterem Kft.", cat: "Ristorante", min: 340000, max: 450000, email: "jobs@gundel.hu", contract: "Részmunkaidős" },
];

// ── Bulgaria ──
const bgJobs = [
  { title: "Работник склад", city: "Sofia", company: "Speedy AD", cat: "Magazzino", min: 1400, max: 1850, email: "jobs@speedy.bg", contract: "Безсрочен" },
  { title: "Сервитьор / Сервитьорка", city: "Plovdiv", company: "Happy Bar & Grill AD", cat: "Ristorante", min: 1200, max: 1650, email: "jobs@happy.bg", contract: "Непълно работно" },
];

// ── Ireland ──
const ieJobs = [
  { title: "Warehouse Picker", city: "Dublin", company: "An Post (Irish Post)", cat: "Magazzino", min: 2000, max: 2600, email: "jobs@anpost.com", contract: "Full-time" },
  { title: "Restaurant Server", city: "Cork", company: "Aramark Ireland Ltd", cat: "Ristorante", min: 1800, max: 2400, email: "jobs.ie@aramark.com", contract: "Part-time" },
  { title: "Home Carer", city: "Dublin", company: "Comfort Keepers Ireland Ltd", cat: "Badante", min: 1900, max: 2500, email: "jobs@comfortkeepers.ie", contract: "Full-time" },
];

// ── Turkey ──
const trJobs = [
  { title: "Depo Çalışanı", city: "Istanbul", company: "Yurtiçi Kargo A.Ş.", cat: "Magazzino", min: 25000, max: 33000, email: "ik@yurticikargo.com", contract: "Tam zamanlı" },
  { title: "Garson / Garsoniyer", city: "Istanbul", company: "Mado Gıda A.Ş.", cat: "Ristorante", min: 22000, max: 29000, email: "ik@mado.com.tr", contract: "Yarı zamanlı" },
  { title: "İnşaat İşçisi", city: "Ankara", company: "Rönesans Holding A.Ş.", cat: "Edilizia", min: 28000, max: 38000, email: "ik@ronesans.com.tr", contract: "Belirli süreli" },
];

// ── Slovakia ──
const skJobs = [
  { title: "Skladník", city: "Bratislava", company: "Slovak Parcel Service s.r.o.", cat: "Magazzino", min: 1000, max: 1350, email: "jobs@sps-sro.sk", contract: "Trvalý" },
  { title: "Čašník / Čašníčka", city: "Košice", company: "McDonald's Slovakia s.r.o.", cat: "Ristorante", min: 900, max: 1200, email: "prace@mcdonalds.sk", contract: "Skrátený" },
];

// ── Albania ──
const alJobs = [
  { title: "Punonjës magazinë", city: "Tirana", company: "DHL Albania sh.p.k.", cat: "Magazzino", min: 60000, max: 80000, email: "jobs.al@dhl.com", contract: "Me afat të caktuar" },
  { title: "Kamarier / Kamariere", city: "Tirana", company: "Rogner Hotel Tirana sh.p.k.", cat: "Ristorante", min: 55000, max: 75000, email: "hr@rogner.al", contract: "Me kohë të plotë" },
];

// Build descriptions with direct email
function makeDesc(title: string, company: string, city: string, email: string, contract: string): string {
  return `${company} è alla ricerca di ${title} per la nostra sede di ${city}.\n\n` +
    `Contratto: ${contract}.\n\n` +
    `Requisiti: esperienza nel settore preferibile, motivazione e disponibilità immediata. ` +
    `Offriamo ambiente di lavoro professionale, formazione iniziale e possibilità di crescita.\n\n` +
    `📩 Invia il tuo CV direttamente a: ${email}`;
}

function makeDescEn(title: string, company: string, city: string, email: string, contract: string): string {
  return `${company} is looking for a ${title} at our ${city} location.\n\n` +
    `Contract: ${contract}.\n\n` +
    `Requirements: relevant experience preferred, motivation and immediate availability. ` +
    `We offer a professional environment, initial training, and growth opportunities.\n\n` +
    `📩 Send your CV directly to: ${email}`;
}

async function main() {
  console.log("🚀 Seeding batch7 jobs...\n");
  let count = 0;

  const insertBatch = async (jobs: any[], country: string, useLang: "it" | "en") => {
    for (const j of jobs) {
      const desc = useLang === "it"
        ? makeDesc(j.title, j.company, j.city, j.email, j.contract)
        : makeDescEn(j.title, j.company, j.city, j.email, j.contract);

      await db.insert(jobsTable).values({
        title: j.title,
        city: j.city,
        country,
        category: j.cat,
        salaryMin: j.min,
        salaryMax: j.max,
        description: desc,
        company: j.company,
        contractType: j.contract,
        featured: false,
      });
      count++;
    }
    console.log(`✓ ${country}: ${jobs.length} jobs inserted`);
  };

  await insertBatch(italyJobs, "IT", "it");
  await insertBatch(germanyJobs, "DE", "en");
  await insertBatch(franceJobs, "FR", "en");
  await insertBatch(spainJobs, "ES", "en");
  await insertBatch(ukJobs, "GB", "en");
  await insertBatch(nlJobs, "NL", "en");
  await insertBatch(chJobs, "CH", "en");
  await insertBatch(atJobs, "AT", "en");
  await insertBatch(beJobs, "BE", "en");
  await insertBatch(ptJobs, "PT", "en");
  await insertBatch(plJobs, "PL", "en");
  await insertBatch(roJobs, "RO", "en");
  await insertBatch(grJobs, "GR", "en");
  await insertBatch(czJobs, "CZ", "en");
  await insertBatch(hrJobs, "HR", "en");
  await insertBatch(rsJobs, "RS", "en");
  await insertBatch(huJobs, "HU", "en");
  await insertBatch(bgJobs, "BG", "en");
  await insertBatch(ieJobs, "IE", "en");
  await insertBatch(trJobs, "TR", "en");
  await insertBatch(skJobs, "SK", "en");
  await insertBatch(alJobs, "AL", "en");

  console.log(`\n✅ Total: ${count} new jobs added!`);
  await pool.end();
}

main().catch(e => { console.error("❌", e.message); process.exit(1); });
