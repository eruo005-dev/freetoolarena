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
import { COMPARISONS } from "@/lib/comparisons";
import { GLOSSARY } from "@/lib/glossary";
import { LOCALE_META, LOCALES } from "@/lib/i18n";
import { translatedSlugs } from "@/lib/translations";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/best`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/documents`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/favorites`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/trust`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/security`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/methodology`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/editorial`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/ai-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/disclaimers`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const hubRoutes: MetadataRoute.Sitemap = HUBS.map((h) => ({
    url: `${SITE_URL}/best/${h.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const compareRoutes: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: `${SITE_URL}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const learnRoutes: MetadataRoute.Sitemap = GLOSSARY.map((g) => ({
    url: `${SITE_URL}/learn/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
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

  // Localized routes. For every non-English locale that has published
  // translations, emit: /{prefix}/, /{prefix}/tools, /{prefix}/guides,
  // plus each translated tool and guide. Priorities are one notch lower
  // than English so Google treats English as the canonical hub while
  // still indexing the translations.
  const localizedRoutes: MetadataRoute.Sitemap = [];
  for (const loc of LOCALES) {
    if (loc === "en") continue;
    const prefix = LOCALE_META[loc].urlPrefix;
    const toolSlugs = translatedSlugs(loc, "tool");
    const guideSlugs = translatedSlugs(loc, "guide");
    if (toolSlugs.length === 0 && guideSlugs.length === 0) continue;
    localizedRoutes.push(
      {
        url: `${SITE_URL}${prefix}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${SITE_URL}${prefix}/tools`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      },
      {
        url: `${SITE_URL}${prefix}/guides`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      },
    );
    for (const slug of toolSlugs) {
      localizedRoutes.push({
        url: `${SITE_URL}${prefix}/tools/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const slug of guideSlugs) {
      localizedRoutes.push({
        url: `${SITE_URL}${prefix}/guides/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return [
    ...staticRoutes,
    ...hubRoutes,
    ...compareRoutes,
    ...learnRoutes,
    ...categoryRoutes,
    ...pageRoutes,
    ...localizedRoutes,
  ];
}
