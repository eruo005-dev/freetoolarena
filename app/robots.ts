import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/pages";

/**
 * Allow all well-behaved crawlers; explicitly disallow the API and private
 * state paths. Sitemap index lives at /sitemap.xml and fans out into
 * per-section sitemaps (tools, guides, hubs, static).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/favorites?*"],
      },
      // Known SEO-hostile scrapers are politely blocked. Not enforceable,
      // but it keeps our sitemap clean and helps with bandwidth if a
      // crawler honors the hint.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-tools.xml`,
      `${SITE_URL}/sitemap-guides.xml`,
      `${SITE_URL}/sitemap-hubs.xml`,
      `${SITE_URL}/sitemap-compare.xml`,
      `${SITE_URL}/sitemap-learn.xml`,
    ],
    host: SITE_URL,
  };
}
