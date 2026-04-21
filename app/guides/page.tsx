import type { Metadata } from "next";
import {
  getPublishedGuides,
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
  title: "All Guides",
  description: `Short, opinionated how-to guides from ${SITE_NAME}. Practical, plain-English, useful in five minutes — no 2,000-word intros.`,
  path: "/guides",
});

const CATEGORY_ORDER: Category[] = [
  "money",
  "productivity",
  "coding",
  "career",
  "health",
  "writing",
  "home",
  "social",
];

export default function GuidesIndexPage() {
  const guides = getPublishedGuides();
  const byCategory = groupByCategory(guides);
  const liveCategories = CATEGORY_ORDER.filter((c) => byCategory[c]?.length);

  return (
    <Container className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
        ]}
      />
      <PageHeader
        eyebrow={`${guides.length} practical guides`}
        title="All guides"
        lede="Short, specific, opinionated — the way a friend who&rsquo;s done the thing would actually explain it."
      />

      <SiteSearch
        index={buildSearchIndex("article")}
        placeholder={`Search ${guides.length} guides…`}
        resultsLabel="Matching guides"
      />

      {guides.length === 0 && (
        <p className="text-slate-600">
          Guides are coming soon. Check back shortly.
        </p>
      )}

      {liveCategories.length > 1 && (
        <nav
          aria-label="Guide categories"
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
          <h2 className="mb-1 text-xl font-semibold text-slate-900">
            {CATEGORIES[cat].label}
          </h2>
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
