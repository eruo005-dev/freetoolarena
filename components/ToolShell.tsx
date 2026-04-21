import type { ReactNode } from "react";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { getPageBySlug, CATEGORIES, pageHref } from "@/lib/pages";
import { jsonLdFor, SITE_UPDATED } from "@/lib/seo";

interface ToolShellProps {
  slug: string;
  children: ReactNode; // interactive tool UI
  explainer: ReactNode; // 150-300 word "what it is / why it matters"
  howToUse: string[]; // numbered steps
}

/**
 * Page chrome shared by every tool: breadcrumbs, H1, interactive surface,
 * explainer, how-to-use steps, related links, and JSON-LD.
 */
export function ToolShell({ slug, children, explainer, howToUse }: ToolShellProps) {
  const page = getPageBySlug(slug);
  if (!page) return <p>Page not found.</p>;
  const category = CATEGORIES[page.category];

  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: page.h1, href: pageHref(page) },
        ]}
      />

      <PageHeader
        eyebrow={`${category.label} · Free tool`}
        title={page.h1}
        lede={page.description}
        meta={<>Updated {formatDate(SITE_UPDATED)}</>}
      />

      <section
        aria-label={`${page.h1} interactive tool`}
        className="mb-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
      >
        {children}
      </section>

      <Prose className="mb-10">
        <h2>What it does</h2>
        {explainer}
      </Prose>

      <Prose className="mb-4">
        <h2>How to use it</h2>
        <ol>
          {howToUse.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </Prose>

      <RelatedLinks slug={slug} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdFor(page) }}
      />
    </Container>
  );
}

function formatDate(iso: string): string {
  // "2026-04-21" -> "April 2026". Avoid timezone drift by parsing as UTC.
  const [y, m] = iso.split("-").map(Number);
  const d = new Date(Date.UTC(y, (m ?? 1) - 1, 1));
  return d.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
