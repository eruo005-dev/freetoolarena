import type { Metadata } from "next";
import {
  getPageBySlug,
  pageHref,
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  type Page,
} from "./pages";

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
 */
export function metadataFor(slug: string): Metadata {
  const page = getPageBySlug(slug);
  if (!page) return { title: SITE_NAME, description: SITE_TAGLINE };
  return buildMetadata(page);
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
  return {
    title: page.title,
    description: page.description,
    keywords: [page.keyword],
    alternates: { canonical: url },
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
