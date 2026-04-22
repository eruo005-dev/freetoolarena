import { SITE_URL } from "@/lib/pages";
import { HUBS } from "@/lib/hubs";

/** Per-section sitemap for curated hub pages + the /best index. */
export function GET() {
  const now = new Date().toISOString();
  const entries = [
    `  <url>\n    <loc>${SITE_URL}/best</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    ...HUBS.map(
      (h) =>
        `  <url>\n    <loc>${SITE_URL}/best/${h.slug}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    ),
  ].join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
