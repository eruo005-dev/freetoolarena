import type { MetadataRoute } from "next";
import { getPublishedPages, pageHref, SITE_URL } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
  const pageRoutes: MetadataRoute.Sitemap = getPublishedPages().map((p) => ({
    url: `${SITE_URL}${pageHref(p)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.type === "tool" ? 0.7 : 0.6,
  }));
  return [...staticRoutes, ...pageRoutes];
}
