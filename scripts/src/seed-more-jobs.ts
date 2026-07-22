import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobsTable } from "../../lib/db/src/schema/jobs.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const MORE_JOBS = [
  // ─── LOGISTICA ───
  {
    title: "Addetto/a alla Logistica di Magazzino",
    company: "DHL Supply Chain",
    city: "Bologna",
    country: "IT",
    category: "Logistica",
    salaryMin: 1400,
    salaryMax: 1700,
    contractType: "Tempo determinato",
    description: `DHL Supply Chain cerca addetti alla logistica per il centro di distribuzione di Bologna Interporto.

Mansioni:
• Gestione flussi merce in entrata e uscita
• Controllo qualità e conformità spedizioni
• Utilizzo sistemi WMS per tracciamento
• Coordinamento con i corrieri

Requisiti:
• Esperienza in ambito logistico preferibile
• Conoscenza base informatica
• Disponibilità a turni

Offriamo:
• Contratto con possibilità di stabilizzazione
• Buoni pasto
• Formazione professionale continua`,
  },
  {
    title: "Lagerlogistiker (m/w/d)",
    company: "DB Schenker",
    city: "Hamburg",
    country: "DE",
    category: "Logistica",
    salaryMin: 2400,
    salaryMax: 2900,
    contractType: "Unbefristet",
    description: `DB Schenker sucht Lagerlogistiker für den Standort Hamburg.

Aufgaben:
• Warenannahme und -kontrolle
• Kommissionierung und Verpackung
• Nutzung von Lagerverwaltungssystemen
• Ladungssicherung

Anforderungen:
• Abgeschlossene Ausbildung im Logistikbereich (von Vorteil)
• Staplerschein wünschenswert
• Teamfähigkeit

Wir bieten:
• Unbefristeter Vertrag
• Tarifliche Bezahlung
• Weiterbildungsmöglichkeiten`,
  },
  {
    title: "Operator Logistyczny",
    company: "Raben Group",
    city: "Poznań",
    country: "PL",
    category: "Logistica",
    salaryMin: 4200,
    salaryMax: 5200,
    contractType: "Umowa o pracę",
    description: `Raben Group szuka operatorów logistycznych do centrum dystrybucyjnego w Poznaniu.

Zadania:
• Przyjmowanie i wydawanie towaru
• Obsługa systemu WMS
• Kompletacja zamówień
• Kontrola jakości przesyłek

Wymagania:
• Doświadczenie w logistyce mile widziane
• Prawo jazdy na wózek widłowy (plus)
• Dokładność i odpowiedzialność

Oferujemy:
• Umowę o pracę od pierwszego dnia
• Premie za wyniki
• Pakiet socjalny`,
  },

  // ─── RIDER ───
  {
    title: "Rider Consegne a Domicilio",
    company: "Glovo",
    city: "Torino",
    country: "IT",
    category: "Rider",
    salaryMin: 1000,
    salaryMax: 1500,
    contractType: "Collaborazione",
    description: `Glovo cerca rider per consegne a domicilio nella città di Torino.

Attività:
• Ritiro ordini da ristoranti e negozi partner
• Consegna al cliente tramite app
• Gestione del proprio orario di lavoro

Requisiti:
• Bicicletta, scooter o monopattino elettrico
• Smartphone con connessione dati
• Maggiore età

Offriamo:
• Guadagno a consegna, pagamento settimanale
• Massima flessibilità di orario
• Bonus per zone e orari di punta`,
  },
  {
    title: "Coursier Livreur à Vélo",
    company: "Uber Eats",
    city: "Marseille",
    country: "FR",
    category: "Rider",
    salaryMin: 900,
    salaryMax: 1400,
    contractType: "Indépendant",
    description: `Uber Eats recherche des coursiers pour les livraisons à Marseille.

Missions:
• Récupération des commandes chez les partenaires
• Livraison au client via l'application
• Gestion autonome de son emploi du temps

Profil recherché:
• Vélo, scooter ou voiture
• Smartphone récent
• Majorité requise

Nous offrons:
• Paiement hebdomadaire
• Liberté totale des horaires
• Primes lors des heures de pointe`,
  },

  // ─── RISTORANTE ───
  {
    title: "Cameriere/a di Sala",
    company: "Ristorante Da Vittorio",
    city: "Firenze",
    country: "IT",
    category: "Ristorante",
    salaryMin: 1300,
    salaryMax: 1600,
    contractType: "Tempo determinato",
    description: `Ristorante nel centro di Firenze cerca camerieri/e di sala per la stagione estiva.

Mansioni:
• Accoglienza e servizio ai tavoli
• Presa ordini e consigli sul menu
• Gestione pagamenti

Requisiti:
• Esperienza pregressa nel settore ristorazione
• Conoscenza dell'inglese (livello base)
• Disponibilità serale e nei weekend

Offriamo:
• Contratto stagionale con possibilità di rinnovo
• Mance
• Vitto durante il turno`,
  },
  {
    title: "Koch/Köchin",
    company: "Gasthaus Alpenrose",
    city: "Innsbruck",
    country: "AT",
    category: "Ristorante",
    salaryMin: 2200,
    salaryMax: 2700,
    contractType: "Vollzeit",
    description: `Gasthaus Alpenrose sucht einen Koch/eine Köchin für die Küche in Innsbruck.

Aufgaben:
• Zubereitung von österreichischen und internationalen Gerichten
• Organisation der Küchenstation
• Einhaltung der Hygienestandards

Anforderungen:
• Abgeschlossene Kochausbildung
• Erfahrung in der Gastronomie
• Teamfähigkeit unter Zeitdruck

Wir bieten:
• Festanstellung mit geregeltem Gehalt
• Unterkunft möglich
• Trinkgeld zusätzlich`,
  },

  // ─── HOTEL ───
  {
    title: "Receptionist d'Hôtel",
    company: "Hôtel Le Marais",
    city: "Paris",
    country: "FR",
    category: "Hotel",
    salaryMin: 1700,
    salaryMax: 2100,
    contractType: "CDI",
    description: `Hôtel Le Marais recherche un(e) réceptionniste pour son établissement 4 étoiles à Paris.

Missions:
• Accueil et enregistrement des clients
• Gestion des réservations
• Réponse aux demandes des clients

Profil recherché:
• Expérience en hôtellerie appréciée
• Anglais courant, autres langues un plus
• Présentation soignée

Nous offrons:
• CDI avec salaire fixe
• Mutuelle d'entreprise
• Réductions dans le groupe hôtelier`,
  },
  {
    title: "Camerista/o d'Albergo",
    company: "Grand Hotel Miramare",
    city: "Rimini",
    country: "IT",
    category: "Hotel",
    salaryMin: 1250,
    salaryMax: 1500,
    contractType: "Tempo determinato",
    description: `Grand Hotel Miramare cerca camerieri/e ai piani per la stagione estiva a Rimini.

Mansioni:
• Pulizia e riassetto delle camere
• Cambio biancheria e asciugamani
• Rifornimento minibar e set di cortesia

Requisiti:
• Esperienza in ambito hotel preferibile
• Precisione e rapidità
• Disponibilità per l'intera stagione

Offriamo:
• Contratto stagionale
• Vitto e alloggio disponibili
• Mance del personale`,
  },

  // ─── EDILIZIA ───
  {
    title: "Operaio Edile",
    company: "Impresa Costruzioni Bianchi",
    city: "Milano",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1500,
    salaryMax: 1900,
    contractType: "Tempo determinato",
    description: `Impresa di costruzioni cerca operai edili per cantieri residenziali nella zona di Milano.

Mansioni:
• Lavori di muratura e finitura
• Movimentazione materiali da costruzione
• Supporto a capomastri e squadre specializzate

Requisiti:
• Esperienza pregressa in cantiere
• Idoneità al lavoro in altezza (preferibile)
• Documenti regolari e patente B

Offriamo:
• Contratto CCNL edile
• Cassa edile e ferie retribuite
• Possibilità di lavoro continuativo`,
  },
  {
    title: "Bauhelfer (m/w/d)",
    company: "Bauunternehmen Schmidt GmbH",
    city: "Stuttgart",
    country: "DE",
    category: "Edilizia",
    salaryMin: 2300,
    salaryMax: 2800,
    contractType: "Befristet",
    description: `Bauunternehmen Schmidt sucht Bauhelfer für Baustellen im Raum Stuttgart.

Aufgaben:
• Unterstützung bei Maurer- und Betonarbeiten
• Materialtransport auf der Baustelle
• Baustelle sauber und sicher halten

Anforderungen:
• Erfahrung auf Baustellen von Vorteil
• Körperliche Belastbarkeit
• Gültige Arbeitserlaubnis

Wir bieten:
• Tarifliche Bezahlung nach Bau-Tarifvertrag
• Fahrtkostenzuschuss
• Übernahmemöglichkeit`,
  },

  // ─── AGRICOLTURA ───
  {
    title: "Operaio Agricolo Stagionale",
    company: "Azienda Agricola Valle Verde",
    city: "Cuneo",
    country: "IT",
    category: "Agricoltura",
    salaryMin: 1200,
    salaryMax: 1450,
    contractType: "Tempo determinato",
    description: `Azienda agricola cerca operai per la raccolta stagionale di frutta e verdura in provincia di Cuneo.

Mansioni:
• Raccolta manuale di prodotti ortofrutticoli
• Selezione e imballaggio
• Manutenzione di base dei terreni

Requisiti:
• Nessuna esperienza richiesta
• Disponibilità a lavorare all'aperto
• Documenti di lavoro regolari

Offriamo:
• Retribuzione secondo CCNL agricoltura
• Alloggio disponibile per lavoratori fuori sede
• Trasporto giornaliero da/per i campi`,
  },
  {
    title: "Trabajador Agrícola Temporal",
    company: "Fincas del Sur",
    city: "Almería",
    country: "ES",
    category: "Agricoltura",
    salaryMin: 1100,
    salaryMax: 1350,
    contractType: "Temporal",
    description: `Fincas del Sur busca trabajadores agrícolas para la recogida de frutas y hortalizas en invernaderos de Almería.

Funciones:
• Recolección manual de productos
• Clasificación y empaquetado
• Mantenimiento básico de los cultivos

Requisitos:
• No se requiere experiencia previa
• Disponibilidad para trabajar al aire libre/invernadero
• Permiso de trabajo en regla

Ofrecemos:
• Salario según convenio agrícola
• Alojamiento disponible para trabajadores desplazados
• Contrato de temporada con posibilidad de renovación`,
  },

  // ─── EXTRA MAGAZZINO (fill more countries) ───
  {
    title: "Warehouse Operative",
    company: "Ocado",
    city: "Manchester",
    country: "GB",
    category: "Magazzino",
    salaryMin: 1900,
    salaryMax: 2300,
    contractType: "Permanent",
    description: `Ocado is hiring Warehouse Operatives for its automated fulfillment centre in Manchester.

What you'll do:
• Pick and pack customer grocery orders
• Operate warehouse machinery (training provided)
• Maintain hygiene and safety standards

Requirements:
• No experience necessary
• Ability to work in a fast-paced environment
• Right to work in the UK

We offer:
• £11.50-£13/hr
• Pension scheme
• Staff discount on groceries`,
  },
  {
    title: "Magazijnmedewerker",
    company: "Bol.com",
    city: "Waalwijk",
    country: "NL",
    category: "Magazzino",
    salaryMin: 2100,
    salaryMax: 2500,
    contractType: "Fulltime",
    description: `Bol.com zoekt magazijnmedewerkers voor het distributiecentrum in Waalwijk.

Taken:
• Orders picken en inpakken
• Goederen ontvangen en opslaan
• Werken met scanapparatuur

Vereisten:
• Geen ervaring nodig, training aanwezig
• Flexibiliteit in werktijden
• Werkvergunning voor Nederland

Wij bieden:
• €13-€15 per uur
• Reiskostenvergoeding
• Doorgroeimogelijkheden`,
  },
];

async function seedMoreJobs() {
  try {
    console.log(`📥 Inserting ${MORE_JOBS.length} new job listings...`);
    for (const job of MORE_JOBS) {
      await db.insert(jobsTable).values(job as any);
      console.log(`  ✓ ${job.title} — ${job.company} (${job.city}, ${job.country})`);
    }
    console.log(`\n✅ Inserted ${MORE_JOBS.length} new listings without touching existing data.`);
    process.exit(0);
  } catch (err: any) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

seedMoreJobs();
