import Link from "next/link";
import type { Metadata } from "next";
import { GLOSSARY, glossaryHref, type GlossaryEntry } from "@/lib/glossary";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrustBar } from "@/components/TrustBar";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/pages";

export const metadata: Metadata = buildStaticMetadata({
  title: "Free Glossary — Finance, SEO, Web Performance Terms Defined",
  description:
    "Plain-English definitions for finance (APR, APY, compound interest), SEO (canonical, schema, JSON-LD), and web performance (Core Web Vitals, LCP, CLS) terms.",
  path: "/learn",
  eyebrow: `${SITE_NAME} · Glossary`,
});

const TAG_LABELS: Record<GlossaryEntry["tags"][number], string> = {
  finance: "Finance",
  seo: "SEO",
  dev: "Developer",
  "web-perf": "Web performance",
};

export default function LearnIndex() {
  const byTag: Record<string, GlossaryEntry[]> = {};
  for (const entry of GLOSSARY) {
    // Put each entry under its primary (first) tag to avoid duplication.
    const primary = entry.tags[0];
    (byTag[primary] = byTag[primary] ?? []).push(entry);
  }

  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Free Tool Arena glossary",
    description:
      "Plain-English definitions of finance, SEO and web performance terms.",
    url: `${SITE_URL}/learn`,
    hasDefinedTerm: GLOSSARY.map((g) => ({
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}/learn/${g.slug}`,
      name: g.term,
      description: g.tldr,
      url: `${SITE_URL}/learn/${g.slug}`,
    })),
  };

  return (
    <Container className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Glossary", href: "/learn" },
        ]}
      />

      <PageHeader
        eyebrow={`${GLOSSARY.length} terms`}
        title="Free glossary"
        lede="Plain-English definitions of the finance, SEO and web-performance terms you run into most. No jargon towers, just what it means and why you'd care."
        meta={<>Updated {formatDate(SITE_UPDATED)}</>}
      />

      <TrustBar className="mb-10" />

      {Object.entries(byTag).map(([tag, entries]) => (
        <section key={tag} className="mb-10">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {TAG_LABELS[tag as keyof typeof TAG_LABELS] ?? tag}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={glossaryHref(entry)}
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand hover:shadow-sm"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                    Definition
                  </span>
                  <span className="mt-2 text-lg font-semibold text-slate-900">
                    {entry.term}
                  </span>
                  <span className="mt-1 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {entry.tldr}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
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
