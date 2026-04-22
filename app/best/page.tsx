import type { Metadata } from "next";
import Link from "next/link";
import { HUBS, hubHref } from "@/lib/hubs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardTitle, CardBody, CardEyebrow } from "@/components/ui/Card";
import { TrustBar } from "@/components/TrustBar";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/pages";

export function generateMetadata(): Metadata {
  return buildStaticMetadata({
    title: "Best Free Tools — Curated Lists by Job, Role & Goal",
    description:
      "Curated lists of the best free tools for freelancers, students, developers, SEO, and finance. Hand-picked from 280+ in-browser tools. No signup.",
    path: "/best",
    eyebrow: `${SITE_NAME} · Curated hub`,
  });
}

export default function BestHubIndex() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Curated tool lists",
    url: `${SITE_URL}/best`,
    itemListElement: HUBS.map((h, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/best/${h.slug}`,
      name: h.h1,
    })),
  };

  return (
    <Container className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Best tools", href: "/best" },
        ]}
      />

      <PageHeader
        eyebrow={`${HUBS.length} curated lists`}
        title="Best free tools — by job, role, and goal"
        lede="Hand-picked shortlists from the full library. Each list groups tools around a real use case, with a one-sentence pitch per pick and a mini-guide on how to use the set together."
        meta={<>Updated {formatDate(SITE_UPDATED)}</>}
      />

      <TrustBar className="mb-10" />

      <ul className="grid gap-5 md:grid-cols-2">
        {HUBS.map((hub) => (
          <li key={hub.slug}>
            <Card href={hubHref(hub)} className="h-full">
              <CardEyebrow>{hub.eyebrow}</CardEyebrow>
              <CardTitle>{hub.h1}</CardTitle>
              <CardBody>{hub.description}</CardBody>
              <p className="mt-3 text-xs text-slate-500">
                {hub.picks.length} tools · {hub.sections?.length ?? 0}{" "}
                explainer sections
              </p>
            </Card>
          </li>
        ))}
      </ul>

      <section className="mt-16 rounded-2xl bg-slate-50 p-6 sm:p-8">
        <h2 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
          Didn't find your use case?
        </h2>
        <p className="mb-4 text-sm text-slate-600">
          The full library is browsable by category on the /tools index, and
          long-form how-tos live under /guides.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tools"
            className="inline-flex items-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Browse all tools →
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:text-brand hover:ring-brand"
          >
            Read the guides →
          </Link>
        </div>
      </section>

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
