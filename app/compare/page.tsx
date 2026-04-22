import Link from "next/link";
import type { Metadata } from "next";
import { COMPARISONS, comparisonHref } from "@/lib/comparisons";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrustBar } from "@/components/TrustBar";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/pages";

export const metadata: Metadata = buildStaticMetadata({
  title: "Free Comparisons: Mortgages, Retirement, Debt, File Formats",
  description:
    "Clear, unbiased head-to-head comparisons: 15 vs 30 year mortgage, Roth vs Traditional IRA, FHA vs conventional, SVG vs PNG, JSON vs YAML and more. Free, no signup.",
  path: "/compare",
  eyebrow: `${SITE_NAME} · Head-to-head comparisons`,
});

export default function CompareIndex() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free head-to-head comparisons",
    url: `${SITE_URL}/compare`,
    itemListElement: COMPARISONS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/compare/${c.slug}`,
      name: c.h1,
    })),
  };

  return (
    <Container className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Compare", href: "/compare" },
        ]}
      />

      <PageHeader
        eyebrow={`${COMPARISONS.length} comparisons`}
        title="Head-to-head comparisons"
        lede="Clear, unbiased breakdowns of the decisions that matter — with the free tools to run the numbers yourself."
        meta={<>Updated {formatDate(SITE_UPDATED)}</>}
      />

      <TrustBar className="mb-10" />

      <ul className="grid gap-4 sm:grid-cols-2">
        {COMPARISONS.map((cmp) => (
          <li key={cmp.slug}>
            <Link
              href={comparisonHref(cmp)}
              className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand hover:shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                {cmp.eyebrow}
              </span>
              <span className="mt-2 text-lg font-semibold text-slate-900">
                {cmp.h1}
              </span>
              <span className="mt-1 text-sm leading-relaxed text-slate-600">
                {cmp.description}
              </span>
              <span className="mt-3 text-sm font-semibold text-brand">
                Read comparison →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
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
