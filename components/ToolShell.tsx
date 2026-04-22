import type { ReactNode } from "react";
import { RelatedLinks } from "@/components/RelatedLinks";
import { FavoriteButton } from "@/components/FavoriteButton";
import { TrackRecentTool } from "@/components/TrackRecentTool";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { getPageBySlug, CATEGORIES, pageHref } from "@/lib/pages";
import { jsonLdFor, faqJsonLd, howToJsonLd, SITE_UPDATED } from "@/lib/seo";

export interface ToolShellProps {
  slug: string;
  children: ReactNode; // interactive tool UI
  explainer: ReactNode; // 150-300 word "what it is / why it matters"
  howToUse: string[]; // numbered steps

  // Optional enrichments — render only when supplied. Every section
  // below is opt-in so small tools stay uncluttered and top tools can
  // feel premium.
  useCases?: string[];
  whenToUse?: string[];
  whenNotToUse?: string[];
  example?: { input: string; output: string; note?: string };
  howItWorks?: ReactNode;
  faq?: { q: string; a: string }[];
}

/**
 * Page chrome shared by every tool: breadcrumbs, H1, interactive surface,
 * explainer, how-to-use steps, optional premium sections, related links,
 * and JSON-LD.
 */
export function ToolShell({
  slug,
  children,
  explainer,
  howToUse,
  useCases,
  whenToUse,
  whenNotToUse,
  example,
  howItWorks,
  faq,
}: ToolShellProps) {
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

      <div className="relative">
        <PageHeader
          eyebrow={`${category.label} · Free tool`}
          title={page.h1}
          lede={page.description}
          meta={<>Updated {formatDate(SITE_UPDATED)}</>}
        />
        <div className="absolute right-0 top-0 mt-1">
          <FavoriteButton slug={slug} />
        </div>
      </div>

      <TrackRecentTool slug={slug} />

      <section
        aria-label={`${page.h1} interactive tool`}
        className="mb-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
      >
        {children}
      </section>

      {/* Manual above-fold-adjacent slot. Auto ads still run sitewide, but
          manually placing a slot directly under the tool maximizes RPM —
          highest-intent eyeballs, best scroll position. Graceful degrade
          on ad-block (component collapses). */}
      <AdSlot className="mb-10" label="Advertisement" />

      <Prose className="mb-10">
        <h2>What it does</h2>
        {explainer}
      </Prose>

      {example && (
        <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Example input &amp; output
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Input
              </p>
              <pre className="overflow-x-auto rounded-lg bg-white p-3 text-sm ring-1 ring-slate-200">
                <code>{example.input}</code>
              </pre>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Output
              </p>
              <pre className="overflow-x-auto rounded-lg bg-white p-3 text-sm ring-1 ring-slate-200">
                <code>{example.output}</code>
              </pre>
            </div>
          </div>
          {example.note && (
            <p className="mt-4 text-sm text-slate-600">{example.note}</p>
          )}
        </section>
      )}

      <Prose className="mb-10">
        <h2>How to use it</h2>
        <ol>
          {howToUse.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </Prose>

      {howItWorks && (
        <Prose className="mb-10">
          <h2>How it works</h2>
          {howItWorks}
        </Prose>
      )}

      {whenToUse && whenToUse.length > 0 && (
        <Prose className="mb-10">
          <h2>When to use this tool</h2>
          <ul>
            {whenToUse.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </Prose>
      )}

      {whenNotToUse && whenNotToUse.length > 0 && (
        <Prose className="mb-10">
          <h2>When <em>not</em> to use it</h2>
          <ul>
            {whenNotToUse.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </Prose>
      )}

      {useCases && useCases.length > 0 && (
        <Prose className="mb-10">
          <h2>Common use cases</h2>
          <ul>
            {useCases.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </Prose>
      )}

      {faq && faq.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Frequently asked questions
          </h2>
          <dl className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {faq.map((q, i) => (
              <div key={i} className="p-5">
                <dt className="font-semibold text-slate-900">{q.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-700">{q.a}</dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: faqJsonLd(faq) }}
          />
        </section>
      )}

      <RelatedLinks slug={slug} filter="tool" heading="Related tools" />
      <RelatedLinks slug={slug} filter="article" heading="Supporting guides" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdFor(page) }}
      />
      {howToUse && howToUse.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: howToJsonLd({
              name: page.h1,
              description: page.description,
              steps: howToUse,
            }),
          }}
        />
      )}
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
