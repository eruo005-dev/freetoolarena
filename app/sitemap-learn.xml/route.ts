import { SITE_URL } from "@/lib/pages";
import { GLOSSARY } from "@/lib/glossary";

/** Per-section sitemap for glossary pages + the /learn index. */
export function GET() {
  const now = new Date().toISOString();
  const entries = [
    `  <url>\n    <loc>${SITE_URL}/learn</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
    ...GLOSSARY.map(
      (g) =>
        `  <url>\n    <loc>${SITE_URL}/learn/${g.slug}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.65</priority>\n  </url>`,
    ),
  ].join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
