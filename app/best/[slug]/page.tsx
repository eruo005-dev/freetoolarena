import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { HUBS, getHubBySlug, hubHref } from "@/lib/hubs";
import { getPageBySlug, pageHref, SITE_URL, SITE_NAME } from "@/lib/pages";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardTitle, CardBody, CardEyebrow } from "@/components/ui/Card";
import { Prose } from "@/components/ui/Prose";
import { TrustBar } from "@/components/TrustBar";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return HUBS.map((h) => ({ slug: h.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const hub = getHubBySlug(params.slug);
  if (!hub) return {};
  return buildStaticMetadata({
    title: hub.title,
    description: hub.description,
    path: `/best/${hub.slug}`,
    eyebrow: `${SITE_NAME} · Curated list`,
  });
}

export default function HubPage({ params }: { params: { slug: string } }) {
  const hub = getHubBySlug(params.slug);
  if (!hub) notFound();

  const resolvedPicks = hub.picks
    .map((pick) => {
      const page = getPageBySlug(pick.slug);
      return page ? { page, pitch: pick.pitch } : null;
    })
    .filter((x): x is { page: NonNullable<ReturnType<typeof getPageBySlug>>; pitch: string } => !!x);

  const relatedHubs = (hub.relatedHubs ?? [])
    .map(getHubBySlug)
    .filter((h): h is NonNullable<ReturnType<typeof getHubBySlug>> => !!h);

  // ItemList JSON-LD gives Google a structured view of the curated set,
  // which can trigger list-style rich results and improves topical
  // authority signals.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: hub.h1,
    description: hub.description,
    url: `${SITE_URL}/best/${hub.slug}`,
    itemListElement: resolvedPicks.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}${pageHref(p.page)}`,
      name: p.page.h1,
    })),
  };

  // CollectionPage JSON-LD describes the hub itself as a curated
  // collection — another rich-result-eligible type Google supports.
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.h1,
    description: hub.description,
    url: `${SITE_URL}/best/${hub.slug}`,
    datePublished: "2026-04-01",
    dateModified: SITE_UPDATED,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <Container className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Best tools", href: "/best" },
          { label: hub.h1, href: hubHref(hub) },
        ]}
      />

      <PageHeader
        eyebrow={hub.eyebrow}
        title={hub.h1}
        lede={hub.description}
        meta={<>Curated {formatDate(SITE_UPDATED)}</>}
      />

      <TrustBar className="mb-10" />

      <Prose className="mb-10">
        <p>{hub.intro}</p>
      </Prose>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">
          The full list
        </h2>
        <ol className="grid list-none gap-4 p-0 sm:grid-cols-2">
          {resolvedPicks.map((p, i) => (
            <li key={p.page.slug} className="relative">
              <Card href={pageHref(p.page)} className="h-full">
                <CardEyebrow>
                  {String(i + 1).padStart(2, "0")} · {p.page.h1}
                </CardEyebrow>
                <CardTitle>{p.page.h1}</CardTitle>
                <CardBody>{p.pitch}</CardBody>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      {hub.sections && hub.sections.length > 0 && (
        <section className="mb-12">
          {hub.sections.map((sec, i) => (
            <Prose key={i} className="mb-8">
              <h2>{sec.heading}</h2>
              <p>{sec.body}</p>
            </Prose>
          ))}
        </section>
      )}

      <section className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
          Prefer a category, not a persona?
        </h2>
        <p className="mb-4 text-sm text-slate-600">
          Browse the full library grouped by what the tool does, not who it's
          for.
        </p>
        <div className="flex flex-wrap gap-2">
          <CategoryPill href="/tools">All tools</CategoryPill>
          <CategoryPill href="/guides">All guides</CategoryPill>
          <CategoryPill href="/best">All curated lists</CategoryPill>
        </div>
      </section>

      {relatedHubs.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Other curated lists
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {relatedHubs.map((other) => (
              <li key={other.slug}>
                <Link
                  href={hubHref(other)}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
    </Container>
  );
}

function CategoryPill({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:text-brand hover:ring-brand"
    >
      {children}
    </Link>
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
