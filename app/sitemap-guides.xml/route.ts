import {
  SITE_URL,
  getPublishedPages,
  pageHref,
  GUIDE_CATEGORIES,
  GUIDE_CATEGORY_ORDER,
  guidesByGuideCategory,
} from "@/lib/pages";

/** Per-section sitemap for guides + guide category pages. */
export function GET() {
  const now = new Date().toISOString();
  const guides = getPublishedPages().filter((p) => p.type === "article");
  const byCat = guidesByGuideCategory();

  const guideEntries = guides
    .map(
      (p) =>
        `  <url>\n    <loc>${SITE_URL}${pageHref(
          p,
        )}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
    )
    .join("\n");

  const categoryEntries = GUIDE_CATEGORY_ORDER.filter(
    (gc) => (byCat[gc]?.length ?? 0) > 0,
  )
    .map(
      (gc) =>
        `  <url>\n    <loc>${SITE_URL}/guides/category/${
          GUIDE_CATEGORIES[gc].slug
        }</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${categoryEntries}\n${guideEntries}\n</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
