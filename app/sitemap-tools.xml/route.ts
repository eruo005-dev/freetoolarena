import { SITE_URL, getPublishedPages, pageHref } from "@/lib/pages";

/**
 * Per-section sitemap for tools only. Google and Bing can process a
 * sitemap index plus per-section sitemaps more efficiently than one
 * monolithic file, and it isolates crawl budget signals per section.
 */
export function GET() {
  const now = new Date().toISOString();
  const tools = getPublishedPages().filter((p) => p.type === "tool");
  const urls = tools
    .map(
      (p) =>
        `  <url>\n    <loc>${SITE_URL}${pageHref(
          p,
        )}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
    )
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
