import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  COMPARISONS,
  getComparisonBySlug,
  comparisonHref,
} from "@/lib/comparisons";
import {
  getPageBySlug,
  pageHref,
  SITE_URL,
  SITE_NAME,
} from "@/lib/pages";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Prose } from "@/components/ui/Prose";
import { TrustBar } from "@/components/TrustBar";
import { AdSlot } from "@/components/AdSlot";
import {
  buildStaticMetadata,
  faqJsonLd,
  SITE_UPDATED,
  SITE_PUBLISHED,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const cmp = getComparisonBySlug(params.slug);
  if (!cmp) return {};
  return buildStaticMetadata({
    title: cmp.title,
    description: cmp.description,
    path: `/compare/${cmp.slug}`,
    eyebrow: `${SITE_NAME} · Head-to-head`,
  });
}

export default function ComparisonPage({
  params,
}: {
  params: { slug: string };
}) {
  const cmp = getComparisonBySlug(params.slug);
  if (!cmp) notFound();

  const tools = cmp.toolSlugs
    .map(getPageBySlug)
    .filter((p): p is NonNullable<ReturnType<typeof getPageBySlug>> => !!p);

  const related = (cmp.relatedSlugs ?? [])
    .map(getComparisonBySlug)
    .filter((c): c is NonNullable<ReturnType<typeof getComparisonBySlug>> => !!c);

  // Article JSON-LD — the comparison IS the content, so we emit Article
  // structured data rather than the underlying tool schemas (tools have
  // their own pages with their own SoftwareApplication schema).
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cmp.h1,
    description: cmp.description,
    mainEntityOfPage: `${SITE_URL}/compare/${cmp.slug}`,
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_UPDATED,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  // BreadcrumbList JSON-LD lets Google render the breadcrumb path in
  // SERP snippets — small visual upgrade that modestly lifts CTR.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Comparisons",
        item: `${SITE_URL}/compare`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cmp.h1,
        item: `${SITE_URL}/compare/${cmp.slug}`,
      },
    ],
  };

  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Compare", href: "/compare" },
          { label: cmp.h1, href: comparisonHref(cmp) },
        ]}
      />

      <PageHeader
        eyebrow={cmp.eyebrow}
        title={cmp.h1}
        lede={cmp.description}
        meta={<>Updated {formatDate(SITE_UPDATED)} · 7 min read</>}
      />

      <TrustBar className="mb-10" />

      <Prose className="mb-10">
        <p>{cmp.intro}</p>
      </Prose>

      <AdSlot layout="in-article" className="my-8" label="Advertisement" />

      {/* The two sides, rendered as side-by-side cards on desktop
          and stacked on mobile. This is the literal "head-to-head"
          visual — readers should be able to scan both options without
          scrolling back and forth. */}
      <section aria-label="Head to head" className="mb-12">
        <div className="grid gap-5 md:grid-cols-2">
          {cmp.sides.map((side, i) => (
            <article
              key={i}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand">
                Option {i + 1}
              </p>
              <h2 className="mb-2 text-xl font-bold text-slate-900">
                {side.label}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                {side.summary}
              </p>
              <div className="mb-5 rounded-lg bg-slate-50 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Best for
                </p>
                <p className="text-sm leading-relaxed text-slate-700">
                  {side.bestFor}
                </p>
              </div>
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Pros
                </p>
                <ul className="space-y-1.5 text-sm leading-relaxed text-slate-700">
                  {side.pros.map((pro, j) => (
                    <li key={j} className="flex gap-2">
                      <span aria-hidden className="text-emerald-600">
                        ✓
                      </span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-700">
                  Cons
                </p>
                <ul className="space-y-1.5 text-sm leading-relaxed text-slate-700">
                  {side.cons.map((con, j) => (
                    <li key={j} className="flex gap-2">
                      <span aria-hidden className="text-rose-600">
                        ✗
                      </span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12 rounded-2xl bg-brand p-6 text-white sm:p-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/80">
          The verdict
        </p>
        <p className="text-base leading-relaxed sm:text-lg">{cmp.verdict}</p>
      </section>

      {cmp.sections && cmp.sections.length > 0 && (
        <section className="mb-12">
          {cmp.sections.map((sec, i) => (
            <Prose key={i} className="mb-8">
              <h2>{sec.heading}</h2>
              <p>{sec.body}</p>
            </Prose>
          ))}
        </section>
      )}

      {/* Underlying tool CTA — the biggest SEO/UX benefit of a
          comparison page is funneling high-intent readers into the
          actual calculator. We surface up to two tools prominently. */}
      {tools.length > 0 && (
        <section aria-label="Run the numbers" className="mb-12">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">
            Run the numbers yourself
          </h2>
          <p className="mb-5 text-slate-600 leading-relaxed">
            Plug your own inputs into the free tool{tools.length > 1 ? "s" : ""} below
            — no signup, works in your browser, nothing sent to a server.
          </p>
          <div className={`grid gap-4 ${tools.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={pageHref(tool)}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand hover:shadow-sm"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                  Free tool
                </span>
                <span className="mt-2 font-semibold text-slate-900">
                  {tool.h1}
                </span>
                <span className="mt-1 text-sm leading-relaxed text-slate-600">
                  {tool.description}
                </span>
                <span className="mt-3 text-sm font-semibold text-brand">
                  Open tool →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {cmp.faq && cmp.faq.length > 0 && (
        <section aria-labelledby="faq-heading" className="mb-12">
          <h2
            id="faq-heading"
            className="mb-6 text-2xl font-bold tracking-tight text-slate-900"
          >
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {cmp.faq.map((q, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-200 bg-white p-5 open:border-brand/40"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-900">
                  <span>{q.q}</span>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-slate-400 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-slate-700">{q.a}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: faqJsonLd(cmp.faq) }}
          />
        </section>
      )}

      {related.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            More head-to-head comparisons
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {related.map((other) => (
              <li key={other.slug}>
                <Link
                  href={comparisonHref(other)}
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand hover:shadow-sm"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                    {other.eyebrow}
                  </span>
                  <span className="mt-2 font-semibold text-slate-900">
                    {other.h1}
                  </span>
                  <span className="mt-1 text-sm leading-relaxed text-slate-600">
                    {other.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </Container>
  );
}

function formatDate(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  const d = new Date(Date.UTC(y, (m ?? 1) - 1, 1));
  return d.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
