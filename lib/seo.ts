import type { Metadata } from "next";
import {
  getPageBySlug,
  pageHref,
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  type Page,
} from "./pages";
import { LOCALE_META, LOCALES, type Locale } from "./i18n";
import { localesFor } from "./translations";

/**
 * Date the current content set was last reviewed end-to-end. Surfaced on
 * articles as "Last updated" and used as the OG/article modifiedTime. Bump
 * this ISO date whenever the content passes editorial review again.
 */
export const SITE_UPDATED = "2026-04-21";
/** Year content was first published (for OG article.publishedTime). */
export const SITE_PUBLISHED = "2026-04-01";

/** 1200x630 OG image URL for a manifest page (uses /og dynamic endpoint). */
function ogImageForPage(page: Page) {
  return {
    url: `${SITE_URL}/og?slug=${encodeURIComponent(page.slug)}`,
    width: 1200,
    height: 630,
    alt: page.h1,
  };
}

/** 1200x630 OG image URL for an ad-hoc (non-manifest) page. */
function ogImageForStatic(title: string, eyebrow: string) {
  const qs = new URLSearchParams({ title, eyebrow }).toString();
  return {
    url: `${SITE_URL}/og?${qs}`,
    width: 1200,
    height: 630,
    alt: title,
  };
}

/**
 * Build Next.js Metadata for any page in the manifest.
 * Every page gets: title, description, canonical, OG, Twitter, robots.
 * If the slug has translated versions, hreflang alternates are emitted
 * automatically so the English original and all translations link bi-
 * directionally.
 */
export function metadataFor(slug: string): Metadata {
  const page = getPageBySlug(slug);
  if (!page) return { title: SITE_NAME, description: SITE_TAGLINE };
  return buildMetadata(page);
}

/**
 * Build hreflang alternates map for a given slug + type. Includes
 * self-referencing tag for every locale that has a translation, plus
 * x-default pointing to the English version. Only called when the slug
 * actually has at least one non-English translation — English-only
 * pages skip hreflang entirely (Google treats no-hreflang as
 * unambiguous English).
 */
export function hreflangFor(slug: string, type: "tool" | "guide"): Record<string, string> | undefined {
  const locales = localesFor(slug, type);
  if (locales.length < 2) return undefined; // English only
  const base = type === "tool" ? "/tools" : "/guides";
  const out: Record<string, string> = {};
  for (const loc of locales) {
    const prefix = LOCALE_META[loc].urlPrefix;
    const bcp = LOCALE_META[loc].bcp47;
    out[bcp] = `${SITE_URL}${prefix}${base}/${slug}`;
  }
  // x-default = English version per Google best practice.
  out["x-default"] = `${SITE_URL}${base}/${slug}`;
  return out;
}

/**
 * Build Metadata for a localized page (non-English). Mirrors
 * buildMetadata but sourced from a translation bundle and emitting the
 * full hreflang set. Canonical points to THIS locale's URL, never to
 * English — that's a common SEO mistake that causes the translated
 * page to deindex.
 */
export function buildLocalizedMetadata({
  slug,
  locale,
  type,
  title,
  description,
  pathOverride,
}: {
  slug: string;
  locale: Locale;
  type: "tool" | "guide";
  title: string;
  description: string;
  /** Optional override — defaults to /{prefix}/{tools|guides}/{slug}. */
  pathOverride?: string;
}): Metadata {
  const prefix = LOCALE_META[locale].urlPrefix;
  const base = type === "tool" ? "/tools" : "/guides";
  const path = pathOverride ?? `${prefix}${base}/${slug}`;
  const url = `${SITE_URL}${path}`;
  const ogTitle = `${title} | ${SITE_NAME}`;
  const image = {
    url: `${SITE_URL}/og?slug=${encodeURIComponent(slug)}&lang=${locale}`,
    width: 1200,
    height: 630,
    alt: title,
  };
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: hreflangFor(slug, type),
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: type === "guide" ? "article" : "website",
      locale: LOCALE_META[locale].bcp47.replace("-", "_"),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image.url],
    },
    robots: { index: true, follow: true },
  };
}

export function buildMetadata(page: Page): Metadata {
  const url = `${SITE_URL}${pageHref(page)}`;
  // Root layout's `template: "%s | SITE_NAME"` appends the site name;
  // don't append it here or it'll double up.
  const ogTitle = `${page.title} | ${SITE_NAME}`;
  const image = ogImageForPage(page);
  const og =
    page.type === "article"
      ? {
          title: ogTitle,
          description: page.description,
          url,
          siteName: SITE_NAME,
          type: "article" as const,
          publishedTime: SITE_PUBLISHED,
          modifiedTime: SITE_UPDATED,
          images: [image],
        }
      : {
          title: ogTitle,
          description: page.description,
          url,
          siteName: SITE_NAME,
          type: "website" as const,
          images: [image],
        };
  // If the slug has translations, expose them as hreflang alternates so
  // Google knows the English page is one of a family. Skipped when the
  // slug is English-only — unnecessary hreflang tags can cause Google
  // to treat the page as having broken alternates.
  const type = page.type === "tool" ? "tool" : "guide";
  const languages = hreflangFor(page.slug, type);
  return {
    title: page.title,
    description: page.description,
    keywords: [page.keyword],
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: og,
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: page.description,
      images: [image.url],
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Metadata for static marketing/legal routes (about, privacy, terms, etc.).
 * Mirrors `buildMetadata` structure so the site is uniform.
 */
export function buildStaticMetadata({
  title,
  description,
  path,
  index = true,
  eyebrow,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  /** Eyebrow rendered in the OG image. Defaults to the site tagline. */
  eyebrow?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogTitle = `${title} | ${SITE_NAME}`;
  const image = ogImageForStatic(title, eyebrow ?? SITE_TAGLINE);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image.url],
    },
    robots: { index, follow: true },
  };
}

/**
 * JSON-LD structured data. Articles get Article schema, tools get
 * SoftwareApplication — both boost rich-result eligibility.
 */
export function jsonLdFor(page: Page): string {
  const url = `${SITE_URL}${pageHref(page)}`;
  const imageUrl = `${SITE_URL}/og?slug=${encodeURIComponent(page.slug)}`;
  if (page.type === "article") {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.h1,
      description: page.description,
      image: [imageUrl],
      mainEntityOfPage: url,
      datePublished: SITE_PUBLISHED,
      dateModified: SITE_UPDATED,
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    });
  }
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.h1,
    description: page.description,
    image: [imageUrl],
    url,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  });
}

/**
 * FAQPage JSON-LD — emit on any page that renders a visible FAQ block.
 * Google uses this for the "People also ask" style rich result.
 */
export function faqJsonLd(faq: { q: string; a: string }[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  });
}

/**
 * HowTo JSON-LD — emit on any tool that has ordered "how to use" steps.
 * Google treats HowTo as a standalone rich-result type so this is pure
 * upside for calculator-style tools.
 */
export function howToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: string[];
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${name}`,
    description,
    step: steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: `Step ${i + 1}`,
      text,
    })),
  });
}

/**
 * Organization-level JSON-LD injected once at the root layout so the whole
 * site claims a single publisher identity.
 */
export function organizationJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    logo: `${SITE_URL}/icon.png`,
  });
}

/**
 * WebSite JSON-LD with SearchAction so Google can surface a sitelinks
 * searchbox. Safe to emit even without a server-side search endpoint — the
 * target URL pattern simply falls back to our index pages.
 */
export function websiteJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
  });
}
