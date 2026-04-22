#!/usr/bin/env node
/**
 * IndexNow ping — notify Bing, Yandex, Seznam, Naver that a batch of URLs has
 * changed. Google does not honor IndexNow, but submitting via Search Console
 * covers that side.
 *
 * Usage:
 *   node scripts/indexnow-ping.mjs                     # ping every URL in all sitemaps
 *   node scripts/indexnow-ping.mjs --recent            # only /compare + /learn + /best
 *   node scripts/indexnow-ping.mjs https://freetoolarea.com/tools/json-formatter [...]
 *
 * Reads the IndexNow key from public/<key>.txt at repo root. Fetches live
 * sitemaps for the URL list so this script has zero TS dependency — run it
 * from any Node 20+ environment.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const HOST = "freetoolarea.com";
const SITE_URL = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const SITEMAPS = [
  "/sitemap.xml",
  "/sitemap-tools.xml",
  "/sitemap-guides.xml",
  "/sitemap-hubs.xml",
  "/sitemap-compare.xml",
  "/sitemap-learn.xml",
];
const RECENT_SITEMAPS = ["/sitemap-compare.xml", "/sitemap-learn.xml", "/sitemap-hubs.xml"];

function findKey() {
  const files = fs.readdirSync(path.join(ROOT, "public"));
  for (const f of files) {
    if (!/^[a-f0-9]{8,128}\.txt$/i.test(f)) continue;
    const raw = fs.readFileSync(path.join(ROOT, "public", f), "utf8").trim();
    const expected = f.replace(/\.txt$/, "");
    if (raw === expected) return expected;
  }
  throw new Error("No IndexNow key file found in /public (expected <hex>.txt containing the same hex).");
}

async function fetchSitemapUrls(sitemapPaths) {
  const urls = new Set();
  for (const p of sitemapPaths) {
    const res = await fetch(`${SITE_URL}${p}`);
    if (!res.ok) {
      console.warn(`skip ${p}: HTTP ${res.status}`);
      continue;
    }
    const xml = await res.text();
    // Sitemap index vs urlset — handle both.
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const u = m[1].trim();
      if (u.endsWith(".xml")) continue; // skip nested sitemap index entries
      urls.add(u);
    }
  }
  return [...urls];
}

async function main() {
  const key = findKey();
  const args = process.argv.slice(2);
  let urls;
  if (args.length === 0) {
    urls = await fetchSitemapUrls(SITEMAPS);
  } else if (args[0] === "--recent") {
    urls = await fetchSitemapUrls(RECENT_SITEMAPS);
  } else {
    urls = args.map((u) => (u.startsWith("http") ? u : `${SITE_URL}${u.startsWith("/") ? u : `/${u}`}`));
  }
  if (urls.length === 0) {
    console.error("No URLs to submit.");
    process.exit(1);
  }
  // IndexNow accepts up to 10,000 URLs per POST. Batch defensively at 1000.
  const batches = [];
  for (let i = 0; i < urls.length; i += 1000) batches.push(urls.slice(i, i + 1000));

  for (const [i, batch] of batches.entries()) {
    const body = {
      host: HOST,
      key,
      keyLocation: `${SITE_URL}/${key}.txt`,
      urlList: batch,
    };
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    console.log(`Batch ${i + 1}/${batches.length} — ${batch.length} URLs — HTTP ${res.status}`);
    if (res.status !== 200 && res.status !== 202) {
      const text = await res.text();
      console.error(text);
    }
  }
  console.log(`Submitted ${urls.length} URLs to IndexNow.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
