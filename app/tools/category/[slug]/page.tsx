import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CATEGORIES,
  getPublishedByCategory,
  pageHref,
  SITE_NAME,
  SITE_URL,
  type Category,
  type Page,
} from "@/lib/pages";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardTitle, CardBody, CardEyebrow } from "@/components/ui/Card";
import { TrustBar } from "@/components/TrustBar";
import { buildStaticMetadata } from "@/lib/seo";

/**
 * /tools/category/[slug] — per-category landing page for every tool
 * Category enum value. Each category gets a dedicated URL with its
 * own title, description, OG image theme, and ItemList JSON-LD.
 *
 * SEO angle: searches like "automotive calculator" or "cooking tools"
 * land on a tight page listing only those tools, rather than the
 * generic /tools hub with 500+ tools. Internal PageRank from /tools
 * naturally funnels here.
 *
 * Slugs are the Category enum keys themselves (money, automotive, etc.)
 * since they're already URL-safe and semantic.
 */

export const dynamicParams = false;

// All Category values for static generation.
const CATEGORY_SLUGS = Object.keys(CATEGORIES) as Category[];

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

function isValidCategory(slug: string): slug is Category {
  return (CATEGORY_SLUGS as string[]).includes(slug);
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  if (!isValidCategory(params.slug)) return {};
  const cat = CATEGORIES[params.slug];
  return buildStaticMetadata({
    title: `${cat.label} Tools`,
    description: cat.blurb,
    path: `/tools/category/${params.slug}`,
    eyebrow: `${cat.label} · ${SITE_NAME} Tools`,
  });
}

export default function ToolCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!isValidCategory(params.slug)) notFound();

  const cat = CATEGORIES[params.slug];
  const tools = getPublishedByCategory(params.slug).filter(
    (p: Page) => p.type === "tool",
  );

  // Other categories to surface as sibling nav.
  const siblings = CATEGORY_SLUGS.filter((s) => s !== params.slug);

  // First 6 as "featured" / "start here", rest in a flat grid below.
  const featured = tools.slice(0, 6);
  const rest = tools.slice(6);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.label} tools`,
    url: `${SITE_URL}/tools/category/${params.slug}`,
    description: cat.blurb,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((p: Page, i: number) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${pageHref(p)}`,
        name: p.h1 ?? p.title,
      })),
    },
  };

  return (
    <Container className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          {
            label: cat.label,
            href: `/tools/category/${params.slug}`,
          },
        ]}
      />

      <PageHeader
        eyebrow={`${tools.length} tool${tools.length === 1 ? "" : "s"} · ${cat.label}`}
        title={`${cat.label} tools`}
        lede={cat.blurb}
      />

      <TrustBar className="mb-10" />

      {tools.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-sm text-slate-600">
            Tools in this section are being built. In the meantime, browse
            the full collection.
          </p>
          <Link
            href="/tools"
            className="mt-4 inline-flex items-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            All tools &rarr;
          </Link>
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                Popular in {cat.label.toLowerCase()}
              </h2>
              <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {featured.map((p) => (
                  <li key={p.slug}>
                    <Card href={pageHref(p)} className="h-full p-5">
                      <CardEyebrow>{cat.label}</CardEyebrow>
                      <CardTitle>{p.h1 ?? p.title}</CardTitle>
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
                More {cat.label.toLowerCase()} tools
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={pageHref(p)}
                      className="block rounded-lg border border-slate-200 bg-white p-4 text-sm hover:border-brand hover:shadow-sm"
                    >
                      <span className="block font-medium text-slate-900">
                        {p.h1 ?? p.title}
                      </span>
                      <span className="mt-1 block text-xs text-slate-500 line-clamp-2">
                        {p.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      <section className="mt-16 rounded-2xl bg-slate-50 p-6 sm:p-8">
        <h2 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
          Other categories
        </h2>
        <ul className="flex flex-wrap gap-2">
          {siblings.map((s) => (
            <li key={s}>
              <Link
                href={`/tools/category/${s}`}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-brand hover:text-brand"
              >
                {CATEGORIES[s].label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </Container>
  );
}
