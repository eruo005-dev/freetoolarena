import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  GLOSSARY,
  getGlossaryEntryBySlug,
  glossaryHref,
} from "@/lib/glossary";
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
  return GLOSSARY.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const entry = getGlossaryEntryBySlug(params.slug);
  if (!entry) return {};
  return buildStaticMetadata({
    title: entry.title,
    description: entry.description,
    path: `/learn/${entry.slug}`,
    eyebrow: `${SITE_NAME} · Glossary`,
  });
}

export default function GlossaryPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = getGlossaryEntryBySlug(params.slug);
  if (!entry) notFound();

  const related = (entry.relatedTerms ?? [])
    .map(getGlossaryEntryBySlug)
    .filter((e): e is NonNullable<ReturnType<typeof getGlossaryEntryBySlug>> => !!e);

  const relatedTools = (entry.relatedToolSlugs ?? [])
    .map(getPageBySlug)
    .filter((p): p is NonNullable<ReturnType<typeof getPageBySlug>> => !!p);

  // DefinedTerm JSON-LD explicitly marks this as a dictionary entry.
  // Google uses DefinedTerm for AI Overviews and featured-snippet eligibility.
  const definedTermJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}/learn/${entry.slug}`,
    name: entry.term,
    description: entry.tldr,
    inDefinedTermSet: `${SITE_URL}/learn`,
    url: `${SITE_URL}/learn/${entry.slug}`,
  };

  // Article JSON-LD as a safety net — more widely consumed than DefinedTerm
  // and Google will pick whichever yields the best rich result.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.description,
    mainEntityOfPage: `${SITE_URL}/learn/${entry.slug}`,
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_UPDATED,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    about: entry.term,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE_URL}/learn` },
      {
        "@type": "ListItem",
        position: 3,
        name: entry.term,
        item: `${SITE_URL}/learn/${entry.slug}`,
      },
    ],
  };

  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Glossary", href: "/learn" },
          { label: entry.term, href: glossaryHref(entry) },
        ]}
      />

      <PageHeader
        eyebrow="Glossary · Definition"
        title={entry.term}
        lede={entry.tldr}
        meta={<>Updated {formatDate(SITE_UPDATED)} · 4 min read</>}
      />

      <TrustBar className="mb-10" />

      {/* TL;DR highlighted card. Google's featured-snippet extractor
          often picks the first bold/highlighted definition on a page. */}
      <section
        aria-label="Short definition"
        className="mb-10 rounded-2xl border-l-4 border-brand bg-brand/5 p-6"
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand">
          Definition
        </p>
        <p className="text-lg leading-relaxed text-slate-900">{entry.tldr}</p>
      </section>

      <Prose className="mb-10">
        <h2>What it means</h2>
        <p>{entry.longDefinition}</p>
      </Prose>

      <AdSlot layout="in-article" className="my-8" label="Advertisement" />

      {entry.formula && (
        <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-900 p-5 text-slate-100 sm:p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Formula
          </p>
          <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed">
            {entry.formula}
          </pre>
        </section>
      )}

      <Prose className="mb-10">
        <h2>Why it matters</h2>
        <p>{entry.whyItMatters}</p>
      </Prose>

      {entry.example && (
        <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Example
          </p>
          <p className="leading-relaxed text-slate-800 whitespace-pre-wrap break-words">
            {entry.example}
          </p>
        </section>
      )}

      {relatedTools.length > 0 && (
        <section aria-label="Related tools" className="mb-10">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">
            Related free tools
          </h2>
          <div className={`grid gap-4 ${relatedTools.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={pageHref(tool)}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand hover:shadow-sm"
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

      {entry.faq && entry.faq.length > 0 && (
        <section aria-labelledby="faq-heading" className="mb-10">
          <h2
            id="faq-heading"
            className="mb-6 text-2xl font-bold tracking-tight text-slate-900"
          >
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {entry.faq.map((q, i) => (
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
            dangerouslySetInnerHTML={{ __html: faqJsonLd(entry.faq) }}
          />
        </section>
      )}

      {related.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Related terms
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {related.map((other) => (
              <li key={other.slug}>
                <Link
                  href={glossaryHref(other)}
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand hover:shadow-sm"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                    Definition
                  </span>
                  <span className="mt-2 font-semibold text-slate-900">
                    {other.term}
                  </span>
                  <span className="mt-1 text-sm leading-relaxed text-slate-600">
                    {other.tldr}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />
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
