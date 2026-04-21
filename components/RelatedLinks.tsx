import { getRelated, pageHref, CATEGORIES, type Page } from "@/lib/pages";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/Card";

/**
 * Renders 2-3 related published pages so we never link to an unfinished
 * page. Picks tier-1 (manifest-declared) before falling back to same-category
 * and finally site-wide. Surfaces the category in each card so users
 * understand the context, not just the title.
 */
export function RelatedLinks({
  slug,
  heading,
  limit = 3,
}: {
  slug: string;
  heading?: string;
  limit?: number;
}) {
  const related = getRelated(slug, limit);
  if (related.length === 0) return null;
  const headingText =
    heading ?? (allTools(related) ? "Related tools" : "Keep reading");
  return (
    <aside className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6">
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
