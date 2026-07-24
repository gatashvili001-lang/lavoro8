import { useState, useEffect } from "react";
import { INITIAL_REAL_JOBS, Job } from "./initial-jobs";

const STORAGE_KEY = "lavoro8_dynamic_jobs";

const CATEGORIES = [
  "Magazzino", "Logistica", "Rider", "Ristorante",
  "Hotel", "Badante", "Colf", "Baby-sitter", "Edilizia",
  "Agricoltura", "Altro"
];

const COUNTRY_DATA: Record<string, { name: string; cities: string[]; companies: string[]; flag: string }> = {
  IT: { name: "Italia", cities: ["Milano", "Roma", "Torino", "Bologna", "Firenze", "Napoli", "Verona", "Genova", "Bergamo", "Brescia"], companies: ["DHL Express", "GLS Logistics", "Eurospin", "Conad", "Deliveroo", "Italtrans", "Generali Care", "Hilton Hotels"], flag: "it" },
  DE: { name: "Germania", cities: ["Berlino", "Monaco", "Francoforte", "Amburgo", "Stoccarda", "Colonia"], companies: ["DHL Freight Germany", "Zalando Logistics", "REWE Group", "Lufthansa Cargo"], flag: "de" },
  FR: { name: "Francia", cities: ["Parigi", "Lione", "Marsiglia", "Tolosa", "Nizza", "Lilla"], companies: ["Carrefour Supply Chain", "La Poste France", "Sodexo Services"], flag: "fr" },
  ES: { name: "Spagna", cities: ["Madrid", "Barcellona", "Valencia", "Siviglia", "Bilbao"], companies: ["Mercadona Logística", "SEUR Envíos", "Grupo Eulen"], flag: "es" },
  PT: { name: "Portogallo", cities: ["Lisbona", "Porto", "Braga"], companies: ["CTT Correios", "Pingo Doce", "Sonae Group"], flag: "pt" },
  NL: { name: "Paesi Bassi", cities: ["Amsterdam", "Rotterdam", "Utrecht"], companies: ["PostNL Cargo", "AH Logistics", "ASML Facilities"], flag: "nl" },
  BE: { name: "Belgio", cities: ["Bruxelles", "Anversa", "Gand"], companies: ["bpost Group", "Colruyt Group", "DHL Brussels"], flag: "be" },
  AT: { name: "Austria", cities: ["Vienna", "Salisburgo", "Innsbruck"], companies: ["Österreichische Post", "SPAR Austria", "Gebrüder Weiss"], flag: "at" },
  CH: { name: "Svizzera", cities: ["Zurigo", "Ginevra", "Basilea", "Lugano"], companies: ["Swiss Post", "Migros Logistik", "Coop Genossenschaft"], flag: "ch" },
  GB: { name: "Regno Unito", cities: ["Londra", "Manchester", "Birmingham"], companies: ["Royal Mail Logistics", "Tesco Distribution", "DPD UK"], flag: "gb" },
  PL: { name: "Polonia", cities: ["Varsavia", "Cracovia", "Breslavia"], companies: ["InPost Logistics", "Biedronka Distribution"], flag: "pl" },
  RO: { name: "Romania", cities: ["Bucarest", "Cluj-Napoca", "Timișoara"], companies: ["eMAG Logistics", "FAN Courier"], flag: "ro" },
  CZ: { name: "Rep. Ceca", cities: ["Praga", "Brno"], companies: ["Zásilkovna CZ", "Rohlík Distribution"], flag: "cz" },
  SK: { name: "Slovacchia", cities: ["Bratislava", "Košice"], companies: ["Slovenská pošta", "Tesco SK"], flag: "sk" },
  HU: { name: "Ungheria", cities: ["Budapest", "Debrecen"], companies: ["Waberer's International", "Magyar Posta"], flag: "hu" },
  GR: { name: "Grecia", cities: ["Atene", "Salonicco"], companies: ["Hellenic Post", "Skroutz Last Mile"], flag: "gr" },
  HR: { name: "Croazia", cities: ["Zagabria", "Spalato"], companies: ["Hrvatska pošta", "Konzum Logistika"], flag: "hr" },
  BG: { name: "Bulgaria", cities: ["Sofia", "Plovdiv"], companies: ["Speedy Logistics", "Ekont Express"], flag: "bg" },
  RS: { name: "Serbia", cities: ["Belgrado", "Novi Sad"], companies: ["Pošta Srbije", "Delhaize Serbia"], flag: "rs" },
  UA: { name: "Ucraina", cities: ["Kyiv", "Lviv"], companies: ["Nova Poshta", "Meest Express"], flag: "ua" },
  GE: { name: "Georgia", cities: ["Tbilisi", "Batumi", "Kutaisi"], companies: ["Georgian Post", "Wolt Georgia", "Spar Georgia"], flag: "ge" },
  TR: { name: "Turchia", cities: ["Istanbul", "Ankara", "Izmir"], companies: ["Trendyol Express", "Getir Logistics"], flag: "tr" },
  AL: { name: "Albania", cities: ["Tirana", "Durazzo"], companies: ["Posta Shqiptare", "Big Market Albania"], flag: "al" },
};

const SAMPLE_JOB_TITLES: Record<string, string[]> = {
  Magazzino: [
    "Addetto al Carico e Scarico Merci",
    "Magazziniere mulettista esperto",
    "Operatore di Stoccaggio ed Etichettatura",
    "Addetto all'imballaggio e spedizioni"
  ],
  Logistica: [
    "Operatore di Smistamento pacchi express",
    "Gestore Logistica e Spedizioni",
    "Coordinatore di magazzino e bolle merci",
    "Planner consegne e parco automezzi"
  ],
  Rider: [
    "Rider consegne cibo e spesa express",
    "Fattorino consegne in scooter/bici",
    "Driver express consegne urbane"
  ],
  Ristorante: [
    "Cameriere / Camiera di Sala",
    "Aiuto Cuoco per Ristorante/Pizzeria",
    "Lavapiatti e Addetto Pulizie Cucina",
    "Barista ed Addetto Banco Bar"
  ],
  Hotel: [
    "Addetto alla Reception e Accoglienza",
    "Cameriera ai Piani / Housekeeping",
    "Facchino di Notte per Hotel 4 Stelle",
    "Manutentore strutture alberghiere"
  ],
  Badante: [
    "Assistente Familiare / Badante Convivente 24h",
    "Badante ad Ore per Assistenza Anziani",
    "Operatore Socio Assistenziale (OSA / OSS)"
  ],
  Colf: [
    "Collaboratrice domestica / Colf per casa privata",
    "Addetta stiro e pulizia appartamenti",
    "Governante per villa familiare"
  ],
  "Baby-sitter": [
    "Baby-Sitter e Supporto Compiti Scolastici",
    "Educatrice per l'infanzia a domicilio",
    "Baby-sitter qualificata per weekend"
  ],
  Edilizia: [
    "Muratore qualificato ed Addetto cantiere",
    "Pittore ed Imbianchino edile",
    "Elettricista per impianti civili",
    "Idraulico ed installatore sanitario"
  ],
  Agricoltura: [
    "Addetto alla Raccolta e Confezionamento ortofrutta",
    "Operatore Agricolo ed Uso Trattori",
    "Potatore e Manutentore del verde"
  ],
  Altro: [
    "Addetto alle Vendite e Cassa",
    "Scaffalista per Supermercato",
    "Operatore Call Center Inbound / Outbound",
    "Addetto alle Pulizie Uffici e Locali Commercali"
  ]
};

export function getDynamicJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Job[];
  } catch {
    return [];
  }
}

export function getAllJobs(): Job[] {
  const dynamic = getDynamicJobs();
  return [...dynamic, ...INITIAL_REAL_JOBS];
}

export function ensureSeededJobs() {
  // No-op: Only real job listings from database / local storage are displayed.
}

export function getJobById(id: number): Job | undefined {
  return getAllJobs().find(j => j.id === id);
}

export function generateRandomJob(): Job {
  // ~50% weight on Italy (IT), rest from other countries
  const countries = Object.keys(COUNTRY_DATA);
  const selectedCountry = Math.random() < 0.5 ? "IT" : countries[Math.floor(Math.random() * countries.length)];
  const countryInfo = COUNTRY_DATA[selectedCountry];

  const city = countryInfo.cities[Math.floor(Math.random() * countryInfo.cities.length)];
  const company = countryInfo.companies[Math.floor(Math.random() * countryInfo.companies.length)];

  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const titles = SAMPLE_JOB_TITLES[category] || SAMPLE_JOB_TITLES["Altro"];
  const title = titles[Math.floor(Math.random() * titles.length)];

  const salaryMin = Math.floor(Math.random() * 8 + 12) * 100; // e.g. 1200 - 2000
  const salaryMax = salaryMin + Math.floor(Math.random() * 4 + 2) * 100;

  const contractTypes = ["Tempo indeterminato", "Tempo determinato", "Full Time", "Part Time", "Turni"];
  const contractType = contractTypes[Math.floor(Math.random() * contractTypes.length)];

  const newId = 5000 + Date.now() + Math.floor(Math.random() * 1000);
  const now = new Date().toISOString();

  const description = `Offerta di lavoro pubblicata su Lavoro8.com per la posizione di "${title}" presso "${company}" a ${city} (${countryInfo.name}).

Chi siamo:
${company} è una primaria realtà operante nel settore ${category}. Cerchiamo personale motivato e puntuale per il potenziamento del nostro organico nella sede di ${city}.

Descrizione del ruolo:
• Gestione delle mansioni quotidiane relative a ${category.toLowerCase()}
• Rispetto degli standard di qualità e sicurezza aziendali
• Collaborazione con il team di lavoro per garantire massima efficienza
• Utilizzo degli strumenti operativi messi a disposizione dall'azienda

Requisiti richiesti:
• Serietà, precisione e massima affidabilità
• Disponibilità immediata ad iniziare la prestazione lavorativa
• Buona conoscenza della lingua locale / italiana
• Documenti in regola per l'assunzione immediata

Cosa offriamo:
• Contratto di lavoro: ${contractType}
• Retribuzione mensile indicativa: da €${salaryMin} a €${salaryMax} netti/mese
• Ambiente di lavoro moderno, sicuro e stimolante
• Supporto e formazione iniziale sul posto di lavoro

Come candidarsi:
Premi il pulsante "Invia Candidatura" in questa pagina ed inserisci i tuoi dati ed il tuo CV o la tua Foto per essere ricontattato direttamente dal responsabile delle selezioni.`;

  const newJob: Job = {
    id: newId,
    title: `${title} — ${city}`,
    company,
    city,
    country: selectedCountry,
    category,
    salaryMin,
    salaryMax,
    contractType,
    description,
    email: `hr.${selectedCountry.toLowerCase()}@${company.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
    isActive: true,
    createdAt: now,
  };

  const current = getDynamicJobs();
  const updated = [newJob, ...current].slice(0, 150); // keep up to 150 dynamic jobs
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("lavoro8_jobs_updated"));
  } catch (e) {
    console.error("Failed to save dynamic job", e);
  }

  return newJob;
}

export function useLiveJobs(): Job[] {
  const [jobs, setJobs] = useState<Job[]>(() => getAllJobs());

  useEffect(() => {
    const handleUpdate = () => {
      setJobs(getAllJobs());
    };
    window.addEventListener("lavoro8_jobs_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("lavoro8_jobs_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return jobs;
}
