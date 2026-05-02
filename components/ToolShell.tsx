import Link from "next/link";
import type { ReactNode } from "react";
import { RelatedLinks } from "@/components/RelatedLinks";
import { FavoriteButton } from "@/components/FavoriteButton";
import { TrackRecentTool } from "@/components/TrackRecentTool";
import { AdSlot } from "@/components/AdSlot";
import { ShareBar } from "@/components/ShareBar";
import { ShareCalculation } from "@/components/ShareCalculation";
import { BookmarkNudge } from "@/components/BookmarkNudge";
import { TrustBar } from "@/components/TrustBar";
import { MethodologyPanel, type Source } from "@/components/MethodologyPanel";
import { CategoryDisclaimer } from "@/components/CategoryDisclaimer";
import { EmbedButton } from "@/components/EmbedButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { getPageBySlug, CATEGORIES, pageHref, SITE_URL } from "@/lib/pages";
import {
  getComparisonsForTool,
  comparisonHref,
} from "@/lib/comparisons";
import { jsonLdFor, faqJsonLd, howToJsonLd, breadcrumbForPage, SITE_UPDATED } from "@/lib/seo";

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
  /**
   * Methodology + sources panel. When supplied, renders a collapsible
   * "Show the math + sources" section above the related-tools area.
   * Auditable transparency every competitor lacks.
   */
  methodology?: {
    formula: ReactNode;
    assumes: ReactNode;
    sources: Source[];
    lastVerified: string;
    dataUpdated?: string;
  };
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
  methodology,
}: ToolShellProps) {
  const page = getPageBySlug(slug);
  if (!page) return <p>Page not found.</p>;
  const category = CATEGORIES[page.category];
  const comparisons = getComparisonsForTool(slug);

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
        className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
      >
        {children}
      </section>

      {/* Share-this-calculation: copies the current URL (with whatever
          query params the tool synced) so users can send a friend their
          exact scenario. Tools that read defaults from searchParams
          (LoanCalculator, TipCalculator, etc.) make the link reproducible. */}
      <div className="mb-8 flex justify-end">
        <ShareCalculation />
      </div>

      {/* Share row. Sits directly under the tool so a useful result can
          be copy-linked to a friend / email / DM without scrolling. */}
      <ShareBar path={pageHref(page)} title={page.h1} origin={SITE_URL} />

      {/* Manual above-fold-adjacent slot. Auto ads still run sitewide, but
          manually placing a slot directly under the tool maximizes RPM —
          highest-intent eyeballs, best scroll position. Graceful degrade
          on ad-block (component collapses). */}
      <AdSlot className="mb-10" label="Advertisement" />

      <Prose className="mb-10">
        <h2>What it does</h2>
        {explainer}
      </Prose>

      <CategoryDisclaimer category={page.category} className="mb-10" />

      <div className="mb-10">
        <EmbedButton slug={page.slug} title={page.h1 ?? page.title} />
      </div>

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

      {/* Head-to-head cross-links. Distributes equity from high-traffic
          tool pages to the high-margin /compare pages and gives users a
          natural next click when they're weighing options. Hidden when
          no matching comparisons exist. */}
      {comparisons.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            See how this compares
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {comparisons.map((c) => (
              <li key={c.slug}>
                <Link
                  href={comparisonHref(c)}
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand hover:shadow-sm"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                    Head-to-head
                  </span>
                  <span className="mt-1 font-medium text-slate-900">
                    {c.h1}
                  </span>
                  <span className="mt-1 line-clamp-2 text-sm text-slate-600">
                    {c.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Near-bottom ad. Reader has engaged with the tool, scrolled past
          the explainer/FAQ, and is now in "what's next" mode — this is a
          high-RPM slot (CPM tends to rise deeper in the page because
          only committed readers make it here). Auto-ads still run
          sitewide, so this is additive. */}
      <AdSlot className="mb-10" label="Advertisement" />

      {methodology && (
        <MethodologyPanel
          formula={methodology.formula}
          assumes={methodology.assumes}
          sources={methodology.sources}
          lastVerified={methodology.lastVerified}
          dataUpdated={methodology.dataUpdated}
        />
      )}

      <RelatedLinks slug={slug} filter="tool" heading="Related tools" />
      <RelatedLinks slug={slug} filter="article" heading="Supporting guides" />

      <TrustBar className="mt-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdFor(page) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbForPage(page) }}
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

      <BookmarkNudge slug={slug} />
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
