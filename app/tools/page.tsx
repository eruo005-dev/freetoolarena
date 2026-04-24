import type { Metadata } from "next";
import {
  getPublishedTools,
  pageHref,
  CATEGORIES,
  SITE_NAME,
  type Category,
  type Page,
} from "@/lib/pages";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardTitle, CardBody } from "@/components/ui/Card";
import { SiteSearch } from "@/components/SiteSearch";
import { buildSearchIndex } from "@/lib/search-index";
import { buildStaticMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "All Free Online Tools",
  description: `Calculators, converters, timers, and text utilities from ${SITE_NAME}. Every tool runs in your browser — no sign-up, no ads in the way.`,
  path: "/tools",
});

const CATEGORY_ORDER: Category[] = [
  "money",
  "automotive",
  "home",
  "productivity",
  "converters",
  "health",
  "parenting",
  "pets",
  "cooking",
  "dev",
  "ai",
  "gaming",
  "media",
  "text",
  "writing",
  "units",
  "random",
  "coding",
  "career",
  "social",
];

export default function ToolsIndexPage() {
  const tools = getPublishedTools();
  const byCategory = groupByCategory(tools);
  const liveCategories = CATEGORY_ORDER.filter((c) => byCategory[c]?.length);

  return (
    <Container className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
        ]}
      />
      <PageHeader
        eyebrow={`${tools.length} free tools`}
        title="All tools"
        lede="Small utilities that do one thing and do it fast. Everything runs locally — nothing you type leaves your device."
      />

      <SiteSearch
        index={buildSearchIndex("tool")}
        placeholder={`Search ${tools.length} free tools…`}
        resultsLabel="Matching tools"
      />

      {tools.length === 0 && (
        <p className="text-slate-600">
          Tools are coming soon. Check back shortly.
        </p>
      )}

      {liveCategories.length > 1 && (
        <nav
          aria-label="Tool categories"
          className="mb-10 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3"
        >
          {liveCategories.map((c) => (
            <a
              key={c}
              href={`#${c}`}
              className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:text-brand hover:ring-brand/40"
            >
              {CATEGORIES[c].label}{" "}
              <span className="text-slate-400">
                ({byCategory[c]?.length ?? 0})
              </span>
            </a>
          ))}
        </nav>
      )}

      {liveCategories.map((cat) => (
        <section key={cat} id={cat} className="mb-12 scroll-mt-20">
          <div className="mb-1 flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900">
              {CATEGORIES[cat].label}
            </h2>
            <a
              href={`/tools/category/${cat}`}
              className="text-xs font-medium text-slate-500 hover:text-brand"
            >
              View all {CATEGORIES[cat].label.toLowerCase()} &rarr;
            </a>
          </div>
          <p className="mb-5 text-sm text-slate-600">
            {CATEGORIES[cat].blurb}
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {byCategory[cat]!.map((p) => (
              <li key={p.slug}>
                <Card href={pageHref(p)} className="p-4">
                  <CardTitle>{p.h1}</CardTitle>
                  <CardBody>{p.description}</CardBody>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Container>
  );
}

function groupByCategory(pages: Page[]): Partial<Record<Category, Page[]>> {
  return pages.reduce<Partial<Record<Category, Page[]>>>((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});
}
