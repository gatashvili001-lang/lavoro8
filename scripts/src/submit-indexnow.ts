const INDEXNOW_KEY = "1f90e3a8d88c7ca356c5c993c314ace6";
const HOST = "lavoro8.com";
const SITE = `https://${HOST}`;
const KEY_LOCATION = `${SITE}/${INDEXNOW_KEY}.txt`;

async function main() {
  const keyRes = await fetch(KEY_LOCATION);
  if (!keyRes.ok) {
    throw new Error(
      `Key file not reachable at ${KEY_LOCATION} (status ${keyRes.status}). Publish the site first, then re-run.`,
    );
  }
  const keyBody = (await keyRes.text()).trim();
  if (keyBody !== INDEXNOW_KEY) {
    throw new Error(`Key file content mismatch: got "${keyBody}"`);
  }
  console.log("Key file verified on production.");

  const urls = new Set<string>();

  const sitemapRes = await fetch(`${SITE}/sitemap.xml`);
  if (sitemapRes.ok) {
    const xml = await sitemapRes.text();
    for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
      urls.add(m[1]);
    }
    console.log(`Sitemap URLs: ${urls.size}`);
  } else {
    console.warn(`Could not fetch sitemap: ${sitemapRes.status}`);
  }

  const jobsRes = await fetch(`${SITE}/api/jobs`);
  if (jobsRes.ok) {
    const jobs = (await jobsRes.json()) as { id: number }[];
    for (const j of jobs) urls.add(`${SITE}/jobs/${j.id}`);
    console.log(`Total URLs after adding jobs: ${urls.size}`);
  } else {
    console.warn(`Could not fetch jobs: ${jobsRes.status}`);
  }

  if (urls.size === 0) throw new Error("No URLs collected, aborting.");

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: [...urls].slice(0, 10000),
    }),
  });
  console.log(`IndexNow response: ${res.status} ${res.statusText}`);
  const text = await res.text();
  if (text) console.log(text);
  if (res.status !== 200 && res.status !== 202) {
    throw new Error("IndexNow submission was not accepted.");
  }
  console.log(`Submitted ${urls.size} URL(s) to IndexNow (Bing, Yandex, Seznam, Naver).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
