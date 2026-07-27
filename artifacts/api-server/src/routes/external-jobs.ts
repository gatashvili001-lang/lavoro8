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
const CACHE_TTL = 30 * 60 * 1000;

function inferCountry(location: string): string {
  const loc = location.toLowerCase();
  if (loc.match(/united states|usa|u\.s\.a|america|new york|los angeles|chicago|houston|phoenix|philadelphia|san antonio|san diego|dallas|san jose|austin|jacksonville|fort worth|columbus|charlotte|san francisco|indianapolis|seattle|denver|washington|boston|el paso|nashville|detroit|oklahoma|portland|las vegas|memphis|louisville|baltimore|milwaukee|albuquerque|tucson|fresno|sacramento|mesa|kansas|atlanta|omaha|colorado|raleigh|miami/)) return "US";
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
  if (loc.includes("remote") || loc.includes("europe") || loc.includes("anywhere")) return "IT";
  return "IT";
}

function inferCategory(tags: string[], title: string, types: string[], desc: string): string {
  const text = [...tags, title, ...types, desc].join(" ").toLowerCase();
  if (text.match(/badante|caregiver|carer|pfleger|aide à domicile|auxiliary|home care|elder care|anziani|betreuer/)) return "Badante";
  if (text.match(/colf|housekeeper|housekeeping|cleaning|pulizie|reinigung|femme de ménage|domestic/)) return "Colf";
  if (text.match(/babysit|baby.sit|childcare|nanny|bambini|kinderpflege|garde.enfant/)) return "Baby-sitter";
  if (text.match(/warehouse|magazzin|lager|storekeeper|picking|packing|forklift|muletto/)) return "Magazzino";
  if (text.match(/logistic|trasport|driver|truck|fahr|chauffeur|spedition|delivery.*driver|consegna|camion/)) return "Logistica";
  if (text.match(/rider|corriere|fahrrad|fahrradkurier|bote|food.*deliver|lieferbote/)) return "Rider";
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

function deduplicateJobs(jobs: ExternalJob[]): ExternalJob[] {
  const seen = new Set<string>();
  return jobs.filter(j => {
    const key = `${j.title.toLowerCase().trim()}_${j.company.toLowerCase().trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchArbeitnow(): Promise<ExternalJob[]> {
  const res = await fetch("https://www.arbeitnow.com/api/job-board-api", {
    signal: AbortSignal.timeout(8000),
    headers: { "User-Agent": "lavoro8.com aggregator" },
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
      headers: { "User-Agent": "lavoro8.com aggregator" },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as any[];
    return data
      .filter(j => j && j.company && j.position)
      .slice(0, 50)
      .map((j): ExternalJob => {
        const loc = j.location || "USA / Remote";
        return {
          id: `rok-${j.id || j.slug}`,
          title: j.position,
          company: j.company,
          location: loc,
          country: inferCountry(loc),
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
        };
      });
  } catch {
    return [];
  }
}

async function fetchJobicy(): Promise<ExternalJob[]> {
  try {
    const res = await fetch("https://jobicy.com/api/v2/remote-jobs?count=50", {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "lavoro8.com aggregator" },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as any;
    const jobsList = data.jobs || [];
    return jobsList.map((j: any): ExternalJob => {
      const loc = j.jobGeo || "USA / Europa";
      return {
        id: `jby-${j.id}`,
        title: j.jobTitle,
        company: j.companyName || "Azienda Verificata",
        location: loc,
        country: inferCountry(loc),
        category: inferCategory(j.jobCategory ? [j.jobCategory] : [], j.jobTitle, [j.jobType || ""], j.jobDescription?.slice(0, 200) ?? ""),
        contractType: inferContract([j.jobType || ""]),
        url: j.url,
        logo: j.companyLogo,
        source: j.url,
        sourceName: "Jobicy",
        remote: true,
        tags: [j.jobCategory, j.jobLevel].filter(Boolean),
        postedAt: j.pubDate ? new Date(j.pubDate).toISOString() : new Date().toISOString(),
        description: j.jobDescription,
      };
    });
  } catch {
    return [];
  }
}

async function fetchRemotive(): Promise<ExternalJob[]> {
  try {
    const res = await fetch("https://remotive.com/api/remote-jobs?limit=50", {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "lavoro8.com aggregator" },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as any;
    const jobsList = data.jobs || [];
    return jobsList.map((j: any): ExternalJob => {
      const loc = j.candidate_required_location || "USA / Europa";
      return {
        id: `rem-${j.id}`,
        title: j.title,
        company: j.company_name || "Azienda Verificata",
        location: loc,
        country: inferCountry(loc),
        category: inferCategory(j.tags || [], j.title, [j.job_type || ""], j.description?.slice(0, 200) ?? ""),
        contractType: inferContract([j.job_type || ""]),
        url: j.url,
        logo: j.company_logo,
        source: j.url,
        sourceName: "Remotive",
        remote: true,
        tags: (j.tags || []).slice(0, 4),
        postedAt: j.publication_date ? new Date(j.publication_date).toISOString() : new Date().toISOString(),
        description: j.description,
      };
    });
  } catch {
    return [];
  }
}

async function fetchHimalayas(): Promise<ExternalJob[]> {
  try {
    const res = await fetch("https://himalayas.app/jobs/api?limit=50", {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "lavoro8.com aggregator" },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as any;
    const jobsList = data.jobs || [];
    return jobsList.map((j: any): ExternalJob => {
      const loc = j.locationRestrictions?.join(", ") || j.country || "USA / Europa";
      return {
        id: `him-${j.id || j.slug}`,
        title: j.title,
        company: j.companyName || "Azienda Verificata",
        location: loc,
        country: inferCountry(loc),
        category: inferCategory(j.categories || [], j.title, [j.employmentType || ""], j.description?.slice(0, 200) ?? ""),
        contractType: inferContract([j.employmentType || ""]),
        url: j.applicationUrl || j.url,
        logo: j.companyLogo,
        source: j.applicationUrl || j.url,
        sourceName: "Himalayas",
        remote: true,
        tags: (j.categories || []).slice(0, 4),
        postedAt: j.pubDate ? new Date(j.pubDate).toISOString() : new Date().toISOString(),
        description: j.description,
      };
    });
  } catch {
    return [];
  }
}

async function getExternalJobs(forceRefresh = false): Promise<ExternalJob[]> {
  if (!forceRefresh && cache && Date.now() - cache.fetchedAt < CACHE_TTL) return cache.jobs;
  const [r1, r2, r3, r4, r5] = await Promise.allSettled([
    fetchArbeitnow(),
    fetchRemoteOK(),
    fetchJobicy(),
    fetchRemotive(),
    fetchHimalayas(),
  ]);
  const rawJobs: ExternalJob[] = [
    ...(r1.status === "fulfilled" ? r1.value : []),
    ...(r2.status === "fulfilled" ? r2.value : []),
    ...(r3.status === "fulfilled" ? r3.value : []),
    ...(r4.status === "fulfilled" ? r4.value : []),
    ...(r5.status === "fulfilled" ? r5.value : []),
  ];
  const jobs = deduplicateJobs(rawJobs);
  cache = { jobs, fetchedAt: Date.now() };
  return jobs;
}

// Cron route handler for automated background job ingestion
router.all(["/cron/fetch-jobs", "/api/cron/fetch-jobs"], async (req, res) => {
  try {
    const freshJobs = await getExternalJobs(true);
    res.json({
      success: true,
      message: "Automated cron High-Volume US & EU job ingestion executed successfully",
      count: freshJobs.length,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/external-jobs", async (req, res) => {
  try {
    const { search, country, category } = req.query as Record<string, string>;
    let jobs = await getExternalJobs();
    if (country && country !== "ALL") {
      if (country === "IT") {
        jobs = jobs.filter(j => j.country === "IT" || j.country === "EU" || j.remote);
      } else {
        jobs = jobs.filter(j => j.country === country || (country === "EU" && j.remote));
      }
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
