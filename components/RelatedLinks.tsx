import {
  getRelated,
  pageHref,
  CATEGORIES,
  PAGES,
  type Page,
  type PageType,
} from "@/lib/pages";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/Card";

/**
 * Renders 2-3 related *published* pages, optionally filtered to one
 * PageType. Uses the same Tier 1 / Tier 2 / Tier 3 fallback as getRelated.
 *
 * Filtered mode applies the filter at every tier so the output is always
 * uniform (all tools, or all guides) — makes it safe to render side by side
 * on the same page without duplicates.
 */
export function RelatedLinks({
  slug,
  heading,
  limit = 3,
  filter,
}: {
  slug: string;
  heading?: string;
  limit?: number;
  filter?: PageType;
}) {
  const related = filter
    ? getRelatedByType(slug, filter, limit)
    : getRelated(slug, limit);
  if (related.length === 0) return null;
  const headingText =
    heading ??
    (filter === "tool"
      ? "Related tools"
      : filter === "article"
        ? "Related guides"
        : allTools(related)
          ? "Related tools"
          : "Keep reading");
  return (
    <aside className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        {headingText}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {related.map((p) => (
          <li key={p.slug}>
            <RelatedCard page={p} />
          </li>
        ))}
      </ul>
    </aside>
  );
}

function getRelatedByType(slug: string, type: PageType, limit: number): Page[] {
  const seed = PAGES.find((p) => p.slug === slug);
  if (!seed) return [];
  const seen = new Set<string>([slug]);
  const out: Page[] = [];
  const push = (p: Page) => {
    if (seen.has(p.slug)) return;
    if (!p.published) return;
    if (p.type !== type) return;
    seen.add(p.slug);
    out.push(p);
  };

  // Tier 1 — manifest-declared related.
  for (const s of seed.related || []) {
    const p = PAGES.find((x) => x.slug === s);
    if (p) push(p);
    if (out.length >= limit) return out;
  }
  // Tier 2 — same category.
  for (const p of PAGES) {
    if (p.category === seed.category) push(p);
    if (out.length >= limit) return out;
  }
  // Tier 3 — anything of the right type.
  for (const p of PAGES) {
    push(p);
    if (out.length >= limit) return out;
  }
  return out.slice(0, limit);
}

function allTools(pages: Page[]): boolean {
  return pages.every((p) => p.type === "tool");
}

function RelatedCard({ page }: { page: Page }) {
  return (
    <Card href={pageHref(page)} className="p-4">
      <CardEyebrow>
        {page.type === "tool" ? "Tool" : "Guide"} ·{" "}
        {CATEGORIES[page.category].label}
      </CardEyebrow>
      <CardTitle>{page.h1}</CardTitle>
    </Card>
  );
}
