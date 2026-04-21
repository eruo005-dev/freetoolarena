import {
  getPublishedPages,
  pageHref,
  CATEGORIES,
  type PageType,
  type Category,
} from "./pages";

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
