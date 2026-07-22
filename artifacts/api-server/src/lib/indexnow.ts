const INDEXNOW_KEY = "1f90e3a8d88c7ca356c5c993c314ace6";
const HOST = "lavoro8.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

export async function pingIndexNow(urls: string[]): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[indexnow] skipped (dev): ${urls.join(", ")}`);
    return;
  }
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls.slice(0, 10000),
      }),
    });
    console.log(`[indexnow] submitted ${urls.length} url(s), status ${res.status}`);
  } catch (err) {
    console.error("[indexnow] ping failed:", err);
  }
}
