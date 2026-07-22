import { Router } from "express";

const router = Router();

interface ArbeitnowJob {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: number;
  url: string;
  logo?: string;
}

export interface ExternalJob {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  category: string;
  contractType: string;
  url: string;
  logo?: string;
  source: string;
  sourceName: string;
  remote: boolean;
  tags: string[];
  postedAt: string;
  description?: string;
}

let cache: { jobs: ExternalJob[]; fetchedAt: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000;

function inferCountry(location: string): string {
  const loc = location.toLowerCase();
  if (loc.match(/germany|deutschland|berlin|munich|münchen|hamburg|frankfurt|cologne|köln|düsseldorf|stuttgart/)) return "DE";
  if (loc.match(/france|paris|lyon|marseille|toulouse|nice|nantes|bordeaux/)) return "FR";
  if (loc.match(/spain|españa|madrid|barcelona|valencia|sevilla|bilbao/)) return "ES";
  if (loc.match(/italy|italia|rome|milan|milano|napoli|torino|bologna|firenze/)) return "IT";
  if (loc.match(/netherlands|amsterdam|rotterdam|utrecht|eindhoven|den haag/)) return "NL";
  if (loc.match(/belgium|brussels|antwerp|bruxelles|belgique/)) return "BE";
  if (loc.match(/austria|wien|vienna|graz|salzburg/)) return "AT";
  if (loc.match(/switzerland|zürich|zurich|geneva|bern|basel/)) return "CH";
  if (loc.match(/poland|polska|warsaw|krakow|wroclaw|gdansk/)) return "PL";
  if (loc.match(/romania|bucharest|cluj|timisoara/)) return "RO";
  if (loc.match(/\buk\b|london|manchester|birmingham|edinburgh|united kingdom|england|scotland/)) return "GB";
  if (loc.match(/portugal|lisbon|porto|braga/)) return "PT";
  if (loc.match(/sweden|stockholm|göteborg|gothenburg|malmo/)) return "SE";
  if (loc.match(/czech|prague|brno|ostrava/)) return "CZ";
  if (loc.match(/hungary|budapest|debrecen/)) return "HU";
  if (loc.match(/greece|athens|thessaloniki/)) return "GR";
  if (loc.match(/ukraine|kyiv|kharkiv|odessa/)) return "UA";
  if (loc.match(/turkey|istanbul|ankara|izmir/)) return "TR";
  if (loc.match(/norway|oslo|bergen/)) return "NO";
  if (loc.match(/denmark|copenhagen|aarhus/)) return "DK";
  if (loc.match(/finland|helsinki|tampere/)) return "FI";
  if (loc.match(/ireland|dublin|cork/)) return "IE";
  if (loc.match(/luxembourg/)) return "LU";
  if (loc.match(/croatia|zagreb/)) return "HR";
  if (loc.match(/bulgaria|sofia/)) return "BG";
  if (loc.match(/serbia|belgrade|beograd/)) return "RS";
  if (loc.match(/albania|tirana/)) return "AL";
  if (loc.match(/georgia|tbilisi/)) return "GE";
  if (loc.includes("remote")) return "EU";
  return "EU";
}

function inferCategory(tags: string[], title: string, types: string[], desc: string): string {
  const text = [...tags, title, ...types, desc].join(" ").toLowerCase();
  if (text.match(/badante|caregiver|carer|pfleger|aide à domicile|auxiliary|home care|elder care|anziani|betreuer/)) return "Badante";
  if (text.match(/colf|housekeeper|housekeeping|cleaning|pulizie|reinigung|femme de ménage|domestic/)) return "Colf";
  if (text.match(/babysit|baby.sit|childcare|nanny|bambini|kinderpflege|garde.enfant/)) return "Baby-sitter";
  if (text.match(/warehouse|magazzin|lager|storekeeper|picking|packing|forklift|muletto/)) return "Magazzino";
  if (text.match(/logistic|trasport|driver|truck|fahr|chauffeur|spedition|delivery.*driver|consegna|camion/)) return "Logistica";
  if (text.match(/rider|courier|corriere|fahrrad|fahrradkurier|bote|food.*deliver|lieferbote/)) return "Rider";
  if (text.match(/restaurant|cook|chef|kitchen|cucin|food|gastro|ristorante|barista|kellner|waiter|waitress|camerier/)) return "Ristorante";
  if (text.match(/hotel|hospitality|reception|housekeep|albergo|zimmer|cleaning.*hotel|pulizie.*hotel/)) return "Hotel";
  if (text.match(/factory|produz|manufacturing|assembly|fabbric|operaio|production.*line|montag/)) return "Magazzino";
  if (text.match(/costruzion|edilizia|cantiere|muratore|idraulico|elettricista|plumber|electrician|construction/)) return "Edilizia";
  if (text.match(/agricol|harvest|raccolt|farm|seasonal.*work|stagionale|erntehelfer/)) return "Agricoltura";
  return "Altro";
}

function inferContract(types: string[]): string {
  const text = types.join(" ").toLowerCase();
  if (text.includes("part")) return "Part-time";
  if (text.includes("contract") || text.includes("freelan")) return "Contratto";
  if (text.includes("intern")) return "Stage";
  if (text.includes("temporary") || text.includes("seasonal")) return "Stagionale";
  return "Full-time";
}

async function fetchArbeitnow(): Promise<ExternalJob[]> {
  const res = await fetch("https://www.arbeitnow.com/api/job-board-api", {
    signal: AbortSignal.timeout(8000),
    headers: { "User-Agent": "lavoro.it aggregator" },
  });
  if (!res.ok) throw new Error(`Arbeitnow ${res.status}`);
  const data = (await res.json()) as { data: ArbeitnowJob[] };
  return data.data.slice(0, 100).map((j): ExternalJob => ({
    id: `arb-${j.slug}`,
    title: j.title,
    company: j.company_name,
    location: j.location,
    country: inferCountry(j.location),
    category: inferCategory(j.tags, j.title, j.job_types, j.description?.slice(0, 200) ?? ""),
    contractType: inferContract(j.job_types),
    url: j.url,
    logo: j.logo,
    source: j.url,
    sourceName: "Arbeitnow",
    remote: j.remote,
    tags: j.tags.slice(0, 5),
    postedAt: new Date(j.created_at * 1000).toISOString(),
    description: j.description,
  }));
}

async function fetchRemoteOK(): Promise<ExternalJob[]> {
  try {
    const res = await fetch("https://remoteok.com/api", {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "lavoro.it aggregator" },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as any[];
    return data
      .filter(j => j.company && j.position)
      .slice(0, 40)
      .map((j): ExternalJob => ({
        id: `rok-${j.id || j.slug}`,
        title: j.position,
        company: j.company,
        location: j.location || "Remote",
        country: "EU",
        category: inferCategory(j.tags || [], j.position, [], j.description?.slice(0, 200) ?? ""),
        contractType: "Full-time",
        url: j.url || `https://remoteok.com/remote-jobs/${j.id}`,
        logo: j.company_logo,
        source: j.url || "",
        sourceName: "RemoteOK",
        remote: true,
        tags: (j.tags || []).slice(0, 4),
        postedAt: j.date ? new Date(j.date).toISOString() : new Date().toISOString(),
        description: j.description,
      }));
  } catch {
    return [];
  }
}

async function getExternalJobs(): Promise<ExternalJob[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL) return cache.jobs;
  const [r1, r2] = await Promise.allSettled([fetchArbeitnow(), fetchRemoteOK()]);
  const jobs: ExternalJob[] = [
    ...(r1.status === "fulfilled" ? r1.value : []),
    ...(r2.status === "fulfilled" ? r2.value : []),
  ];
  cache = { jobs, fetchedAt: Date.now() };
  return jobs;
}

router.get("/external-jobs", async (req, res) => {
  try {
    const { search, country, category } = req.query as Record<string, string>;
    let jobs = await getExternalJobs();
    if (country && country !== "ALL") {
      jobs = jobs.filter(j => j.country === country || (country === "EU" && j.remote));
    }
    if (category && category !== "Tutte") {
      jobs = jobs.filter(j => j.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      jobs = jobs.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    res.json({ data: jobs, total: jobs.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message, data: [] });
  }
});

router.get("/external-jobs/:id", async (req, res) => {
  try {
    const jobs = await getExternalJobs();
    const job = jobs.find(j => j.id === req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
