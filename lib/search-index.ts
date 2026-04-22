import {
  getPublishedPages,
  getPublishedTools,
  getPublishedGuides,
  pageHref,
  CATEGORIES,
  type PageType,
  type Category,
} from "./pages";
import { HUBS, hubHref } from "./hubs";

export interface SearchEntry {
  slug: string;
  href: string;
  title: string;
  description: string;
  category: Category;
  categoryLabel: string;
  type: PageType;
  /** Concatenated lowercase haystack for cheap substring matching. */
  haystack: string;
}

/**
 * Build a flat search index from the manifest. Cheap enough to compute
 * once at module load and hand to the client component. Total weight for
 * 150 pages is well under 30 kB gzipped.
 */
export function buildSearchIndex(filter?: PageType): SearchEntry[] {
  return getPublishedPages()
    .filter((p) => !filter || p.type === filter)
    .map((p) => {
      const categoryLabel = CATEGORIES[p.category].label;
      const haystack = [
        p.h1,
        p.title,
        p.description,
        p.keyword,
        categoryLabel,
        p.slug.replace(/-/g, " "),
      ]
        .join(" ")
        .toLowerCase();
      return {
        slug: p.slug,
        href: pageHref(p),
        title: p.h1,
        description: p.description,
        category: p.category,
        categoryLabel,
        type: p.type,
        haystack,
      };
    });
}

// ---------- Universal Cmd+K palette index ----------

/**
 * Surface kind a global search result can be. Used for the little
 * right-aligned badge and for tie-break boosting in scoring.
 */
export type GlobalSearchKind = "tool" | "guide" | "hub" | "page";

export interface GlobalSearchEntry {
  /** Stable key, usually the URL path. */
  id: string;
  kind: GlobalSearchKind;
  title: string;
  /** Short supporting line shown under the title in the palette. */
  subtitle: string;
  href: string;
  /** Small label shown as a pill (e.g. category name). */
  badge: string;
  /** Space-separated lowercase haystack used for scoring. */
  haystack: string;
}

/**
 * Static "destinations" that don't appear in PAGES — site-wide landing
 * pages a user might jump to from anywhere via Cmd+K.
 */
const STATIC_GLOBAL_DESTINATIONS: Array<{
  href: string;
  title: string;
  subtitle: string;
  badge: string;
  aliases?: string[];
}> = [
  { href: "/", title: "Home", subtitle: "Front page", badge: "Page", aliases: ["homepage", "start"] },
  { href: "/tools", title: "All tools", subtitle: "Browse every calculator, converter, and utility", badge: "Page", aliases: ["browse tools", "tool list"] },
  { href: "/guides", title: "All guides", subtitle: "Browse every how-to and reference article", badge: "Page", aliases: ["articles", "blog"] },
  { href: "/best", title: "Curated lists", subtitle: "Best-of roundups by persona and intent", badge: "Page", aliases: ["best of", "roundups", "collections"] },
  { href: "/compare", title: "Compare", subtitle: "Side-by-side tool comparisons", badge: "Page", aliases: ["vs", "versus", "differences"] },
  { href: "/favorites", title: "Favorites", subtitle: "Your starred tools and guides", badge: "Page", aliases: ["starred", "saved", "bookmarks"] },
  { href: "/about", title: "About", subtitle: "Who builds this site and why", badge: "Page", aliases: ["story", "team"] },
  { href: "/how-it-works", title: "How our tools work", subtitle: "Transparency — what runs in your browser, what we do see", badge: "Page", aliases: ["privacy", "transparency", "trust"] },
  { href: "/trust", title: "Trust & safety", subtitle: "Security posture and data handling", badge: "Page", aliases: ["security"] },
  { href: "/methodology", title: "Methodology", subtitle: "How we test and verify each tool", badge: "Page", aliases: ["testing", "quality"] },
  { href: "/privacy", title: "Privacy policy", subtitle: "What we collect and how it's handled", badge: "Page" },
  { href: "/contact", title: "Contact", subtitle: "Get in touch with feedback or corrections", badge: "Page", aliases: ["email", "feedback"] },
];

function buildGlobalSearchIndex(): GlobalSearchEntry[] {
  const entries: GlobalSearchEntry[] = [];

  for (const p of getPublishedTools()) {
    const catLabel = CATEGORIES[p.category].label;
    const href = pageHref(p);
    entries.push({
      id: href,
      kind: "tool",
      title: p.h1,
      subtitle: p.description,
      href,
      badge: catLabel,
      haystack: [
        p.h1,
        p.title,
        p.description,
        p.keyword,
        p.slug.replace(/-/g, " "),
        catLabel,
        "tool",
      ]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const p of getPublishedGuides()) {
    const catLabel = CATEGORIES[p.category].label;
    const href = pageHref(p);
    entries.push({
      id: href,
      kind: "guide",
      title: p.h1,
      subtitle: p.description,
      href,
      badge: `Guide · ${catLabel}`,
      haystack: [
        p.h1,
        p.title,
        p.description,
        p.keyword,
        p.slug.replace(/-/g, " "),
        catLabel,
        "guide article",
      ]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const hub of HUBS) {
    const href = hubHref(hub);
    entries.push({
      id: href,
      kind: "hub",
      title: hub.h1,
      subtitle: hub.description,
      href,
      badge: "Curated list",
      haystack: [
        hub.h1,
        hub.title,
        hub.description,
        hub.keyword,
        hub.slug.replace(/-/g, " "),
        "best of list roundup collection",
      ]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const d of STATIC_GLOBAL_DESTINATIONS) {
    entries.push({
      id: d.href,
      kind: "page",
      title: d.title,
      subtitle: d.subtitle,
      href: d.href,
      badge: d.badge,
      haystack: [d.title, d.subtitle, ...(d.aliases ?? [])]
        .join(" ")
        .toLowerCase(),
    });
  }

  return entries;
}

let cachedGlobalIndex: GlobalSearchEntry[] | null = null;

export function getGlobalSearchIndex(): GlobalSearchEntry[] {
  if (cachedGlobalIndex) return cachedGlobalIndex;
  cachedGlobalIndex = buildGlobalSearchIndex();
  return cachedGlobalIndex;
}

/**
 * Score-and-rank entries against a query. Rewards exact/prefix title
 * matches, then per-token hits across title/subtitle/haystack, then
 * a small kind-based tie-breaker (tools > guides > hubs > pages).
 * Empty query returns []. Callers should show "suggested" content
 * when the palette first opens.
 */
export function searchGlobalEntries(
  index: GlobalSearchEntry[],
  rawQuery: string,
  limit = 12,
): GlobalSearchEntry[] {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const scored: Array<{ entry: GlobalSearchEntry; score: number }> = [];

  for (const entry of index) {
    const title = entry.title.toLowerCase();
    const subtitle = entry.subtitle.toLowerCase();
    let score = 0;
    let allTokensMatched = true;

    if (title === q) score += 1000;
    else if (title.startsWith(q)) score += 400;
    else if (title.includes(q)) score += 200;

    if (subtitle.includes(q)) score += 40;

    for (const token of tokens) {
      const inTitle = title.includes(token);
      const inSubtitle = subtitle.includes(token);
      const inHaystack = entry.haystack.includes(token);
      if (!inTitle && !inSubtitle && !inHaystack) {
        allTokensMatched = false;
        break;
      }
      if (inTitle) score += title.startsWith(token) ? 80 : 40;
      if (inSubtitle) score += 10;
      if (inHaystack) score += 3;
    }

    if (!allTokensMatched) continue;

    const kindBoost =
      entry.kind === "tool"
        ? 4
        : entry.kind === "guide"
          ? 2
          : entry.kind === "hub"
            ? 1
            : 0;
    score += kindBoost;

    if (score > 0) scored.push({ entry, score });
  }

  scored.sort(
    (a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title),
  );
  return scored.slice(0, limit).map((s) => s.entry);
}
