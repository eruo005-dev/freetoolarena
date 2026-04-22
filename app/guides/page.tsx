import Link from "next/link";
import type { Metadata } from "next";
import {
  getPublishedGuides,
  pageHref,
  GUIDE_CATEGORIES,
  GUIDE_CATEGORY_ORDER,
  guidesByGuideCategory,
  SITE_NAME,
} from "@/lib/pages";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardTitle, CardBody, CardEyebrow } from "@/components/ui/Card";
import { SiteSearch } from "@/components/SiteSearch";
import { TrustBar } from "@/components/TrustBar";
import { buildSearchIndex } from "@/lib/search-index";
import { buildStaticMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "Guides",
  description: `Short, opinionated guides from ${SITE_NAME}. AI how-tos, money, tech, productivity, design — useful in five minutes, no 2,000-word intros.`,
  path: "/guides",
});

const FEATURED_SLUGS = [
  "how-to-save-money-fast",
  "how-to-use-pomodoro-technique",
  "how-to-format-json-properly",
  "how-to-write-a-resume",
  "how-to-compress-images-without-losing-quality",
  "deep-work-strategies",
];

export default function GuidesIndexPage() {
  const guides = getPublishedGuides();
  const byCat = guidesByGuideCategory();
  const featured = FEATURED_SLUGS.map((slug) =>
    guides.find((g) => g.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => !!p);

  const liveCategories = GUIDE_CATEGORY_ORDER.filter(
    (gc) => (byCat[gc]?.length ?? 0) > 0,
  );

  return (
    <Container className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
        ]}
      />
      <PageHeader
        eyebrow={`${guides.length} guides · 7 sections`}
        title="A working library of short, honest guides."
        lede="Browse by section, search the whole library, or start with the six guides most people come back to."
      />

      <TrustBar className="mb-10" />

      {/* Category tiles */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Browse by section
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveCategories.map((gc) => {
            const cat = GUIDE_CATEGORIES[gc];
            const count = byCat[gc]?.length ?? 0;
            const preview = (byCat[gc] ?? []).slice(0, 3);
            return (
              <li key={gc}>
                <Link
                  href={`/guides/category/${cat.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand hover:shadow-sm"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                    {cat.label}
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    {count} guide{count === 1 ? "" : "s"}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {cat.tagline}
                  </p>
                  {preview.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-sm">
                      {preview.map((p) => (
                        <li
                          key={p.slug}
                          className="truncate text-slate-600 group-hover:text-slate-900"
                        >
                          · {p.h1}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand">
                    Browse {cat.label.toLowerCase()} →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-14">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Most-read guides
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {featured.map((p) => (
              <li key={p.slug}>
                <Card href={pageHref(p)} className="h-full p-5">
                  <CardEyebrow>
                    {GUIDE_CATEGORIES[p.guideCategory ?? "how-to"].label}
                  </CardEyebrow>
                  <CardTitle>{p.h1}</CardTitle>
                  <CardBody>{p.description}</CardBody>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Search */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Search all {guides.length} guides
        </h2>
        <SiteSearch
          index={buildSearchIndex("article")}
          placeholder={`Search ${guides.length} guides…`}
          resultsLabel="Matching guides"
        />
      </section>

      {/* Editorial note */}
      <section className="mt-16 rounded-2xl bg-slate-50 p-6 sm:p-8">
        <h2 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
          Written to be useful, not long.
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Every guide here aims for under six minutes of reading and skips the
          generic AI intro. Where a calculator, converter, or other in-browser
          tool can help, we link directly to it — not to a paywall. If we get
          something wrong,{" "}
          <Link href="/contact" className="font-medium text-brand hover:underline">
            tell us
          </Link>
          .
        </p>
      </section>
    </Container>
  );
}
