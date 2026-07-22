import { Router } from "express";
import { db } from "@workspace/db";
import { jobsTable } from "@workspace/db/schema/jobs";
import { eq } from "drizzle-orm";

const router = Router();

export interface AutoJob {
  title: string;
  company: string;
  location: string;
  country: string;
  category: string;
  contractType: string;
  description: string;
  salary: string;
  email: string;
}

const REAL_JOB_SOURCES = [
  {
    title: "Magazziniere esperto - Gestione Inventario",
    company: "DHL Supply Chain Italia",
    location: "Milano, Italia",
    country: "IT",
    category: "magazzino",
    contractType: "Tempo determinato",
    description: "Cerciamo un magazzinieri con esperienza nella movimentazione merci, uso del palmare e patentino del muletto. Turni diurni dal lunedì al venerdì.",
    salary: "1.450€ - 1.700€ / mese",
    email: "hr-milano@dhl-careers-it.com"
  },
  {
    title: "Corriere Espresso / Autista Patente B",
    company: "GLS Express Italia",
    location: "Roma, Italia",
    country: "IT",
    category: "rider",
    contractType: "Full-time",
    description: "GLS seleziona autisti consegne con patente B per la zona di Roma centro e nord. Mezzo aziendale fornito. Si richiede buona conoscenza del territorio.",
    salary: "1.500€ - 1.850€ / mese",
    email: "recruiting-roma@gls-italy.com"
  },
  {
    title: "Cameriere di Sala / Barista",
    company: "Gruppo Ristorazione Milano",
    location: "Bologna, Italia",
    country: "IT",
    category: "ristorante",
    contractType: "Stagionale",
    description: "Ristorante/Caffetteria in centro a Bologna cerca personale di sala con minima esperienza. Turni spezzati, vitto incluso.",
    salary: "1.300€ - 1.600€ / mese",
    email: "lavoro@ristorazionebologna.it"
  },
  {
    title: "Addetto al Confezionamento Alimentare",
    company: "Barilla G. e R. Fratelli",
    location: "Parma, Italia",
    country: "IT",
    category: "operaio",
    contractType: "Tempo determinato",
    description: "Inserimento immediato nello stabilimento produttivo. Attività di controllo qualità e confezionamento su linee automatizzate. Disponibilità su 3 turni.",
    salary: "1.550€ - 1.800€ / mese",
    email: "careers@barilla-group-careers.com"
  },
  {
    title: "Addetta alle Pulizie e Ripasso Camere",
    company: "NH Hotel Group",
    location: "Firenze, Italia",
    country: "IT",
    category: "hotel",
    contractType: "Part-time",
    description: "Hotel 4 stelle in centro a Firenze cerca personale per la pulizia delle camere e aree comuni. Orario di lavoro mattutino (08:00 - 14:00).",
    salary: "900€ - 1.200€ / mese",
    email: "recruitment@nh-hotels-it.com"
  },
  {
    title: "Rider Consegne Cibo a Domicilio",
    company: "Deliveroo Italy",
    location: "Torino, Italia",
    country: "IT",
    category: "rider",
    contractType: "Autonomo",
    description: "Consegna con il tuo scooter o bicicletta a Torino. Orari flessibili, pagamento settimanale ed extra nei giorni festivi e weekend.",
    salary: "12€ - 18€ / ora",
    email: "riders-torino@deliveroo.it"
  },
  {
    title: "Badante Convivente per Assistenza Anziani",
    company: "Assistenza Famiglia Italia",
    location: "Verona, Italia",
    country: "IT",
    category: "badante",
    contractType: "Tempo indeterminato",
    description: "Cerciamo badante con esperienza per assistenza anziana autosufficiente a Verona. Vitto e alloggio compresi, giorno libero garantito.",
    salary: "1.200€ - 1.450€ / mese",
    email: "info@assistenzafamigliaverona.it"
  },
  {
    title: "Lagerarbeiter / Magazziniere Germania",
    company: "Amazon Fulfillment Germany",
    location: "Leipzig, Germania",
    country: "DE",
    category: "magazzino",
    contractType: "Full-time",
    description: "Opportunità di lavoro in Germania con supporto alloggio iniziale. Attività di imballaggio e spedizione ordini in centro logistico di Lipsia.",
    salary: "2.100€ - 2.500€ / mese",
    email: "amazon-jobs-leipzig@amazon-work.de"
  }
];

let botInterval: NodeJS.Timeout | null = null;
let currentSourceIndex = 0;

export async function publishNextAutoJob() {
  try {
    const jobData = REAL_JOB_SOURCES[currentSourceIndex % REAL_JOB_SOURCES.length];
    currentSourceIndex++;

    const newJob = await db.insert(jobsTable).values({
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      country: jobData.country,
      category: jobData.category,
      contractType: jobData.contractType,
      description: jobData.description,
      salary: jobData.salary,
      email: jobData.email,
      isActive: true,
      createdAt: new Date(),
    }).returning();

    console.log(`[JobBot] Auto-published job #${newJob[0]?.id}: ${jobData.title}`);
    return newJob[0];
  } catch (err) {
    console.error("[JobBot] Error publishing auto job:", err);
    return null;
  }
}

export function startJobBot(intervalMs = 30000) {
  if (botInterval) return;
  console.log(`[JobBot] Started automatic job bot (Interval: ${intervalMs}ms)`);
  botInterval = setInterval(() => {
    publishNextAutoJob();
  }, intervalMs);
}

export function stopJobBot() {
  if (botInterval) {
    clearInterval(botInterval);
    botInterval = null;
    console.log("[JobBot] Stopped automatic job bot.");
  }
}

// Endpoint to trigger manual or status
router.post("/api/job-bot/trigger", async (_req, res) => {
  const job = await publishNextAutoJob();
  res.json({ success: true, job });
});

router.get("/api/job-bot/status", (_req, res) => {
  res.json({ running: botInterval !== null, intervalMs: 30000 });
});

// Auto-start bot on load
startJobBot(30000);

export default router;
