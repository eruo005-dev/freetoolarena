import type { MetadataRoute } from "next";
import {
  getPublishedPages,
  pageHref,
  SITE_URL,
  GUIDE_CATEGORY_ORDER,
  GUIDE_CATEGORIES,
  guidesByGuideCategory,
} from "@/lib/pages";
import { HUBS } from "@/lib/hubs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/best`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/favorites`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/trust`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/security`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/methodology`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/editorial`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/ai-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const hubRoutes: MetadataRoute.Sitemap = HUBS.map((h) => ({
    url: `${SITE_URL}/best/${h.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const byCat = guidesByGuideCategory();
  const categoryRoutes: MetadataRoute.Sitemap = GUIDE_CATEGORY_ORDER
    .filter((gc) => (byCat[gc]?.length ?? 0) > 0)
    .map((gc) => ({
      url: `${SITE_URL}/guides/category/${GUIDE_CATEGORIES[gc].slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  const pageRoutes: MetadataRoute.Sitemap = getPublishedPages().map((p) => ({
    url: `${SITE_URL}${pageHref(p)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.type === "tool" ? 0.7 : 0.6,
  }));
  return [...staticRoutes, ...hubRoutes, ...categoryRoutes, ...pageRoutes];
}
