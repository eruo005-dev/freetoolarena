import Link from "next/link";
import { COMPARISONS, comparisonHref, type Comparison } from "@/lib/comparisons";
import { GLOSSARY, glossaryHref, type GlossaryEntry } from "@/lib/glossary";
import { getPageBySlug, type Page } from "@/lib/pages";

/**
 * Cross-section recommendations: shows comparison pages + glossary terms
 * relevant to the current tool or guide. Different from RelatedLinks (which
 * stays in the same section). Boosts internal-link density and pushes
 * users from a tool page to the comparison + definition pages that have
 * historically been orphaned.
 *
 * For tools: includes any /compare/ entry whose toolSlugs[] mentions this
 * slug, plus glossary entries whose relatedToolSlugs[] mentions this slug.
 *
 * For articles: surfaces comparisons that reference this article via
 * relatedSlugs[] + glossary entries linking to it.
 */
export function RelatedHeadToHead({ slug, limit = 3 }: { slug: string; limit?: number }) {
  const page = getPageBySlug(slug);
  if (!page) return null;

  const comparisons = findComparisonsFor(page).slice(0, limit);
  const terms = findGlossaryFor(page).slice(0, limit);

  if (comparisons.length === 0 && terms.length === 0) return null;

  return (
    <aside className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
      {comparisons.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Head-to-head comparisons
          </h2>
          <ul className="space-y-2 text-sm">
            {comparisons.map((c) => (
              <li key={c.slug}>
                <Link
                  href={comparisonHref(c)}
                  className="group flex items-baseline gap-2 text-slate-700 hover:text-brand"
                >
                  <span aria-hidden className="text-xs text-slate-400 group-hover:text-brand">⇄</span>
                  <span className="font-medium">{c.h1}</span>
                  <span className="hidden text-xs text-slate-500 sm:inline">{c.description.slice(0, 80)}…</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {terms.length > 0 && (
        <div className={comparisons.length > 0 ? "mt-5 border-t border-slate-100 pt-5" : ""}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Glossary terms
          </h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {terms.map((t) => (
              <li key={t.slug}>
                <Link
                  href={glossaryHref(t)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-brand hover:text-brand"
                >
                  {t.term}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

function findComparisonsFor(page: Page): Comparison[] {
  // For tools, look at toolSlugs. For articles, look at relatedSlugs.
  return COMPARISONS.filter((c) => {
    if (page.type === "tool") {
      return c.toolSlugs?.includes(page.slug);
    }
    return c.relatedSlugs?.includes(page.slug);
  });
}

function findGlossaryFor(page: Page): GlossaryEntry[] {
  return GLOSSARY.filter((g) => g.relatedToolSlugs?.includes(page.slug));
}
