import fs from "fs";
import path from "path";
import { COUNTRY_SLUGS, CATEGORY_SLUGS, CITY_LANDING_PAGES, getAllComboSlugs } from "../src/lib/seo-slugs";
import { BLOG_POSTS } from "../src/lib/blog-posts";
import { LANGUAGES } from "../src/lib/i18n";

const SITE_URL = "https://lavoro8.com";
const OUT_DIR = path.resolve(import.meta.dirname, "..", "dist", "public");
const TEMPLATE_PATH = path.join(OUT_DIR, "index.html");

type RouteMeta = {
  route: string;
  title: string;
  description: string;
  noindex?: boolean;
  type?: string;
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderHtml(template: string, meta: RouteMeta): string {
  const fullTitle = meta.title.includes("lavoro8.com") ? meta.title : `${meta.title} — lavoro8.com`;
  const safeTitle = escapeHtml(fullTitle);
  const safeDesc = escapeHtml(meta.description);
  const url = `${SITE_URL}${meta.route === "/" ? "/" : meta.route}`;
  const robots = meta.noindex ? "noindex, follow" : "index, follow";
  const ogType = meta.type ?? "website";

  let html = template;
  html = html.replace(/<title>.*?<\/title>/s, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/s,
    `<meta name="description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta name="robots" content=".*?" \/>/s,
    `<meta name="robots" content="${robots}" />`
  );
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/s,
    `<link rel="canonical" href="${url}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/s,
    `<meta property="og:url" content="${url}" />`
  );
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/s,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta property="og:type" content=".*?" \/>/s,
    `<meta property="og:type" content="${ogType}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/s,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/s,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/s,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );

  if (!meta.noindex) {
    const separator = url.includes("?") ? "&" : "?";
    const hreflangTags = [
      `    <link rel="alternate" hreflang="x-default" href="${url}" />`,
      ...LANGUAGES.map(
        (l) => `    <link rel="alternate" hreflang="${l.code}" href="${url}${separator}lang=${l.code}" />`
      ),
    ].join("\n");
    html = html.replace("</head>", `${hreflangTags}\n  </head>`);
  }

  return html;
}

function buildRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [
    {
      route: "/jobs",
      title: "Offerte di lavoro in Italia e in Europa",
      description: "Cerca tra migliaia di offerte di lavoro in Italia e in Europa per magazzino, logistica, rider, ristorazione e hotel. Candidatura gratuita in 1 click.",
    },
    {
      route: "/pubblica",
      title: "Pubblica un annuncio di lavoro",
      description: "Pubblica gratuitamente un annuncio di lavoro su lavoro8.com e raggiungi migliaia di candidati in Italia e in Europa.",
    },
    {
      route: "/aziende",
      title: "Pubblica un'offerta di lavoro gratis — Lavoro8.com per le aziende",
      description: "Trova personale affidabile in Italia e in Europa. Pubblica offerte di lavoro gratis su Lavoro8.com: magazzino, logistica, rider, ristorazione, hotel. Candidature in 1 click.",
    },
    {
      route: "/blog",
      title: "Blog — Consigli per trovare lavoro in Italia e in Europa",
      description: "Guide e consigli per lavoratori stranieri: documenti, permessi di soggiorno, settori più richiesti e stipendi medi in Italia e in Europa.",
    },
    {
      route: "/grazie",
      title: "Candidatura inviata",
      description: "La tua candidatura è stata inviata con successo su lavoro8.com.",
      noindex: true,
    },
    {
      route: "/about",
      title: "Chi siamo",
      description: "Scopri la missione di lavoro8.com: aiutare chi cerca lavoro in Italia e in Europa a trovare offerte affidabili in magazzino, logistica, rider, ristorazione e hotel.",
    },
    {
      route: "/contact",
      title: "Contattaci",
      description: "Hai domande o bisogno di assistenza? Contatta il team di lavoro8.com: siamo qui per aiutarti a trovare lavoro o personale.",
    },
    {
      route: "/pricing",
      title: "Piani Premium",
      description: "Scopri i piani Premium di lavoro8.com: visibilità prioritaria per i tuoi annunci, statistiche dettagliate e candidature illimitate.",
    },
    {
      route: "/privacy",
      title: "Privacy Policy",
      description: "Informativa sulla privacy di lavoro8.com: come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.",
    },
    {
      route: "/termini",
      title: "Termini di Servizio",
      description: "Termini e condizioni di utilizzo della piattaforma lavoro8.com.",
    },
  ];

  for (const [countrySlug, country] of Object.entries(COUNTRY_SLUGS)) {
    routes.push({
      route: `/jobs/${countrySlug}`,
      title: `Lavoro in ${country.label}`,
      description: `Trova le migliori offerte di lavoro in ${country.label}: magazzino, logistica, rider, ristorazione, hotel e altro. Candidatura gratuita in 1 click.`,
    });
  }

  for (const combo of getAllComboSlugs()) {
    routes.push({
      route: `/jobs/${combo.slug}`,
      title: `Lavoro ${combo.category} in ${combo.countryLabel}`,
      description: `Offerte di lavoro come ${combo.category} in ${combo.countryLabel}. Candidati gratuitamente su lavoro8.com.`,
    });
  }

  for (const city of CITY_LANDING_PAGES) {
    const country = COUNTRY_SLUGS[city.countrySlug];
    routes.push({
      route: `/jobs/${city.countrySlug}/${city.citySlug}`,
      title: `Lavoro a ${city.cityLabel}, ${country?.label ?? ""}`,
      description: `Offerte di lavoro a ${city.cityLabel} (${country?.label ?? ""}): magazzino, logistica, rider, ristorazione, hotel. Candidatura gratuita in 1 click.`,
    });
  }

  for (const post of BLOG_POSTS) {
    routes.push({
      route: `/blog/${post.slug}`,
      title: post.title.it ?? "",
      description: post.excerpt.it ?? "",
      type: "article",
    });
  }

  return routes;
}

const API_BASE = process.env.PRERENDER_API_URL ?? "http://localhost:8080";

async function fetchJson(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function buildJobDetailRoutes(): Promise<RouteMeta[]> {
  const routes: RouteMeta[] = [];

  const jobs = await fetchJson(`${API_BASE}/api/jobs?limit=1000`);
  if (Array.isArray(jobs)) {
    for (const job of jobs) {
      if (!job?.id) continue;
      routes.push({
        route: `/jobs/${job.id}`,
        title: `${job.title} — ${job.city}`,
        description: `${job.title} presso ${job.company ?? "azienda"} a ${job.city}. ${(job.description ?? "").slice(0, 140)}`,
        type: "article",
      });
    }
  } else {
    console.warn(`[prerender] Could not reach ${API_BASE}/api/jobs — skipping job detail prerender.`);
  }

  const externalJobsResponse = await fetchJson(`${API_BASE}/api/external-jobs?limit=1000`);
  const externalJobs = Array.isArray(externalJobsResponse) ? externalJobsResponse : externalJobsResponse?.data;
  if (Array.isArray(externalJobs)) {
    for (const job of externalJobs) {
      if (!job?.id) continue;
      routes.push({
        route: `/jobs/ext/${job.id}`,
        title: `${job.title} — ${job.location}`,
        description: `${job.title} presso ${job.company} a ${job.location}. ${(job.description ?? "").replace(/<[^>]*>/g, "").slice(0, 140)}`,
        type: "article",
      });
    }
  } else {
    console.warn(`[prerender] Could not reach ${API_BASE}/api/external-jobs — skipping external job detail prerender.`);
  }

  return routes;
}

export async function prerenderRoutes() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.warn(`[prerender] Skipped: no build output found at ${TEMPLATE_PATH}`);
    return;
  }

  const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");
  const routes = buildRoutes();
  const jobRoutes = await buildJobDetailRoutes();
  const allRoutes = [...routes, ...jobRoutes];

  for (const meta of allRoutes) {
    const outDir = path.join(OUT_DIR, meta.route);
    fs.mkdirSync(outDir, { recursive: true });
    const html = renderHtml(template, meta);
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
  }

  console.log(
    `[prerender] Wrote ${allRoutes.length} static route(s) with route-specific metadata (${routes.length} static + ${jobRoutes.length} job detail).`
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  prerenderRoutes();
}
