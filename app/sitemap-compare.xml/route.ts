import { SITE_URL } from "@/lib/pages";
import { COMPARISONS } from "@/lib/comparisons";

/** Per-section sitemap for head-to-head comparison pages + the /compare index. */
export function GET() {
  const now = new Date().toISOString();
  const entries = [
    `  <url>\n    <loc>${SITE_URL}/compare</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    ...COMPARISONS.map(
      (c) =>
        `  <url>\n    <loc>${SITE_URL}/compare/${c.slug}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n  </url>`,
    ),
  ].join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
