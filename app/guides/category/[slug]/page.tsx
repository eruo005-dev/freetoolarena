import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  GUIDE_CATEGORIES,
  GUIDE_CATEGORY_ORDER,
  getGuidesByGuideCategory,
  guidesByGuideCategory,
  pageHref,
  SITE_NAME,
  type GuideCategory,
  type Page,
} from "@/lib/pages";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardTitle, CardBody, CardEyebrow } from "@/components/ui/Card";
import { TrustBar } from "@/components/TrustBar";
import { buildStaticMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_CATEGORY_ORDER.map((gc) => ({
    slug: GUIDE_CATEGORIES[gc].slug,
  }));
}

function getCategoryBySlug(slug: string): GuideCategory | undefined {
  return GUIDE_CATEGORY_ORDER.find((gc) => GUIDE_CATEGORIES[gc].slug === slug);
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const gc = getCategoryBySlug(params.slug);
  if (!gc) return {};
  const cat = GUIDE_CATEGORIES[gc];
  return buildStaticMetadata({
    title: `${cat.label} Guides`,
    description: cat.blurb,
    path: `/guides/category/${cat.slug}`,
    eyebrow: `${cat.label} · ${SITE_NAME} Guides`,
  });
}

export default function GuideCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const gc = getCategoryBySlug(params.slug);
  if (!gc) notFound();

  const cat = GUIDE_CATEGORIES[gc];
  const guides = getGuidesByGuideCategory(gc);
  const byCat = guidesByGuideCategory();
  const siblings = GUIDE_CATEGORY_ORDER.filter((other) => other !== gc);

  const featured = guides.slice(0, 3);
  const rest = guides.slice(3);

  return (
    <Container className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: cat.label, href: `/guides/category/${cat.slug}` },
        ]}
      />

      <PageHeader
        eyebrow={`${guides.length} guide${guides.length === 1 ? "" : "s"} · ${cat.label}`}
        title={`${cat.label} guides`}
        lede={cat.blurb}
      />

      <TrustBar className="mb-10" />

      {guides.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-sm text-slate-600">
            Guides in this section are being written. In the meantime, browse the
            full collection.
          </p>
          <Link
            href="/guides"
            className="mt-4 inline-flex items-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            All guides →
          </Link>
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                Start here
              </h2>
              <ul className="grid gap-4 md:grid-cols-3">
                {featured.map((p) => (
                  <li key={p.slug}>
                    <Card href={pageHref(p)} className="h-full p-5">
                      <CardEyebrow>{cat.label}</CardEyebrow>
                      <CardTitle>{p.h1}</CardTitle>
                      <CardBody>{p.description}</CardBody>
                    </Card>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {rest.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                More {cat.label.toLowerCase()} guides
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <Card href={pageHref(p)} className="p-4">
                      <CardTitle>{p.h1}</CardTitle>
                      <CardBody>{p.description}</CardBody>
                    </Card>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      <section className="mt-16 rounded-2xl bg-slate-50 p-6 sm:p-8">
        <h2 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
          Explore other guide sections
        </h2>
        <p className="mb-5 text-sm text-slate-600">
          Cross-linked, lightly opinionated, and all written to be useful in five
          minutes.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {siblings.map((other) => {
            const o = GUIDE_CATEGORIES[other];
            const count = byCat[other]?.length ?? 0;
            if (count === 0) return null;
            return (
              <li key={other}>
                <Link
                  href={`/guides/category/${o.slug}`}
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand hover:shadow-sm"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                    {o.label}
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    {count} guide{count === 1 ? "" : "s"}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-slate-600">
                    {o.tagline}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}
