import fs from "fs";
import path from "path";
import { COUNTRY_SLUGS, getAllComboSlugs, CITY_LANDING_PAGES } from "../src/lib/seo-slugs";
import { BLOG_POSTS } from "../src/lib/blog-posts";

const SITE_URL = "https://lavoro8.com";

type SitemapEntry = { loc: string; priority: string };

export function buildSitemapXml(): string {
  const entries: SitemapEntry[] = [
    { loc: "/", priority: "1.0" },
    { loc: "/jobs", priority: "0.9" },
    { loc: "/blog", priority: "0.7" },
    { loc: "/about", priority: "0.5" },
    { loc: "/contact", priority: "0.5" },
    { loc: "/pricing", priority: "0.5" },
    { loc: "/pubblica", priority: "0.6" },
    { loc: "/aziende", priority: "0.7" },
    { loc: "/privacy", priority: "0.3" },
    { loc: "/termini", priority: "0.3" },
  ];

  for (const countrySlug of Object.keys(COUNTRY_SLUGS)) {
    entries.push({ loc: `/jobs/${countrySlug}`, priority: "0.8" });
  }

  for (const combo of getAllComboSlugs()) {
    entries.push({ loc: `/jobs/${combo.slug}`, priority: "0.7" });
  }

  for (const city of CITY_LANDING_PAGES) {
    entries.push({ loc: `/jobs/${city.countrySlug}/${city.citySlug}`, priority: "0.6" });
  }

  for (const post of BLOG_POSTS) {
    entries.push({ loc: `/blog/${post.slug}`, priority: "0.6" });
  }

  const urls = entries
    .map((e) => `  <url><loc>${SITE_URL}${e.loc}</loc><priority>${e.priority}</priority></url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function writeSitemapFile() {
  const outPath = path.resolve(import.meta.dirname, "..", "public", "sitemap.xml");
  fs.writeFileSync(outPath, buildSitemapXml(), "utf-8");
  return outPath;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const outPath = writeSitemapFile();
  console.log(`Sitemap written to ${outPath}`);
}
