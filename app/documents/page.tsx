import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardTitle, CardBody, CardEyebrow } from "@/components/ui/Card";
import { TrustBar } from "@/components/TrustBar";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";
import { SITE_NAME, SITE_URL, getPageBySlug } from "@/lib/pages";

/**
 * /documents — curated hub that groups every template-type tool into
 * sections. Each card links to an existing /tools/[slug] page; no new
 * routes or duplicate content. Internal linking lift for the 26 template
 * tools without creating orphan URLs.
 */

interface DocGroup {
  id: string;
  title: string;
  blurb: string;
  slugs: string[];
}

const GROUPS: DocGroup[] = [
  {
    id: "business",
    title: "Business & finance",
    blurb:
      "Receipts, quotes, purchase orders, and the paperwork that keeps small businesses invoice-ready.",
    slugs: [
      "invoice-generator",
      "receipt-generator",
      "quote-generator",
      "purchase-order-generator",
      "pay-stub-generator",
      "packing-slip-generator",
      "bill-of-sale-generator",
    ],
  },
  {
    id: "contracts",
    title: "Contracts & legal",
    blurb:
      "Standard-form contracts with in-preview disclaimers. Not legal advice — always get attorney review before signing.",
    slugs: [
      "nda-generator",
      "freelance-contract-generator",
      "promissory-note-generator",
      "liability-waiver-generator",
      "photo-release-generator",
      "rental-application-generator",
    ],
  },
  {
    id: "letters",
    title: "Letters",
    blurb:
      "Professional letters in strict block format — covering resignations, thank-yous, apologies, and more.",
    slugs: [
      "business-letter-generator",
      "letter-of-intent-generator",
      "cover-letter-builder",
      "resignation-letter-generator",
      "recommendation-letter-generator",
      "complaint-letter-generator",
      "thank-you-letter-generator",
      "apology-letter-generator",
    ],
  },
  {
    id: "admin",
    title: "Office & admin",
    blurb:
      "Memos, agendas, minutes, and project briefs — the short-form docs every meeting and handoff needs.",
    slugs: [
      "memo-generator",
      "meeting-agenda-builder",
      "meeting-minutes-template",
      "project-brief-template",
      "gift-certificate-maker",
      "certificate-generator",
    ],
  },
];

const ALL_SLUGS = GROUPS.flatMap((g) => g.slugs);

export function generateMetadata(): Metadata {
  return buildStaticMetadata({
    title: "Free Printable Document Templates",
    description:
      "Fill-in templates for invoices, receipts, contracts, NDAs, waivers, letters, and more. Print or save as PDF in one click — no signup, no watermark.",
    path: "/documents",
    eyebrow: `${SITE_NAME} · Document templates`,
  });
}

export default function DocumentsHub() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free document templates",
    url: `${SITE_URL}/documents`,
    description:
      "Printable, fill-in document templates across business, legal, letters, and office/admin categories.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: ALL_SLUGS.length,
      itemListElement: ALL_SLUGS.map((slug, i) => {
        const p = getPageBySlug(slug);
        return {
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/tools/${slug}`,
          name: p?.h1 ?? p?.title ?? slug,
        };
      }),
    },
  };

  return (
    <Container className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Document templates", href: "/documents" },
        ]}
      />

      <PageHeader
        eyebrow={`${ALL_SLUGS.length} templates`}
        title="Free printable document templates"
        lede="Fill the form, preview the document, print or save as PDF. Runs entirely in your browser — your details never leave your device."
        meta={<>Updated {formatDate(SITE_UPDATED)}</>}
      />

      <TrustBar className="mb-10" />

      <div className="mb-12 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <strong className="font-semibold">Not legal advice.</strong> Templates
        in the Contracts &amp; legal section are provided for reference only.
        Laws and required disclosures vary by state and country — have a
        licensed attorney review any contract before you sign it.
      </div>

      {GROUPS.map((group) => {
        const items = group.slugs
          .map((slug) => ({ slug, page: getPageBySlug(slug) }))
          .filter((x) => x.page?.published);

        if (items.length === 0) return null;

        return (
          <section key={group.id} id={group.id} className="mb-14">
            <div className="mb-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                {group.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{group.blurb}</p>
            </div>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map(({ slug, page }) => (
                <li key={slug}>
                  <Card href={`/tools/${slug}`} className="h-full">
                    <CardEyebrow>
                      {page!.category}
                    </CardEyebrow>
                    <CardTitle>{page!.h1 ?? page!.title}</CardTitle>
                    <CardBody>{page!.description}</CardBody>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="mt-16 rounded-2xl bg-slate-50 p-6 sm:p-8">
        <h2 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
          Don&rsquo;t see what you need?
        </h2>
        <p className="mb-4 text-sm text-slate-600">
          Browse the full tool library to find calculators, converters, and
          utilities outside the document category. Or read the long-form
          guides for workflows and best practices.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tools"
            className="inline-flex items-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Browse all tools &rarr;
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:text-brand hover:ring-brand"
          >
            Read the guides &rarr;
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
