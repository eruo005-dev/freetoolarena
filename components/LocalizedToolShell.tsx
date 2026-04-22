import type { ReactNode } from "react";
import { RelatedLinks } from "@/components/RelatedLinks";
import { FavoriteButton } from "@/components/FavoriteButton";
import { TrackRecentTool } from "@/components/TrackRecentTool";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getPageBySlug, pageHref, CATEGORIES } from "@/lib/pages";
import { faqJsonLd, howToJsonLd, jsonLdFor, SITE_UPDATED } from "@/lib/seo";
import { LOCALE_META, type Locale, type ToolTranslation, type CommonStrings } from "@/lib/i18n";
import { localesFor } from "@/lib/translations";

interface LocalizedToolShellProps {
  slug: string;
  locale: Locale;
  translation: ToolTranslation;
  common: CommonStrings;
  /** The interactive tool component (English UI is fine — math is universal). */
  children: ReactNode;
}

/**
 * Mirrors ToolShell.tsx but sources copy from a translation bundle and
 * common-strings record. The interactive tool itself (the children) is
 * rendered untranslated — it's math/formatting/text manipulation that
 * doesn't need localization in V1.
 *
 * Emits:
 * - Breadcrumbs in the target language
 * - H1, eyebrow, description from translation
 * - Explainer, how-to-use, how-it-works, FAQ, use cases in target language
 * - FAQPage + SoftwareApplication JSON-LD (locale-neutral — schema.org
 *   doesn't require lang tags on these types)
 * - LanguageSwitcher if slug has multiple translations
 */
export function LocalizedToolShell({
  slug,
  locale,
  translation,
  common,
  children,
}: LocalizedToolShellProps) {
  const page = getPageBySlug(slug);
  if (!page) return <p>Page not found.</p>;
  const category = CATEGORIES[page.category];
  const basePath = pageHref(page); // e.g. /tools/mortgage-calculator
  const available = localesFor(slug, "tool");

  return (
    <Container size="narrow" className="py-10">
      <LanguageSwitcher
        available={available}
        currentLocale={locale}
        basePath={basePath}
        label={common.languageSwitcher.label}
      />

      <Breadcrumbs
        trail={[
          { label: common.breadcrumb.home, href: `${LOCALE_META[locale].urlPrefix}/` },
          { label: common.breadcrumb.tools, href: `${LOCALE_META[locale].urlPrefix}/tools` },
          { label: translation.h1, href: `${LOCALE_META[locale].urlPrefix}${basePath}` },
        ]}
      />

      <div className="relative">
        <PageHeader
          eyebrow={translation.eyebrow ?? `${category.label} · Free tool`}
          title={translation.h1}
          lede={translation.description}
          meta={<>{common.updatedOn(formatDate(SITE_UPDATED, locale))}</>}
        />
        <div className="absolute right-0 top-0 mt-1">
          <FavoriteButton slug={slug} />
        </div>
      </div>

      <TrackRecentTool slug={slug} />

      <section
        aria-label={`${translation.h1} interactive tool`}
        className="mb-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
      >
        {children}
      </section>

      <AdSlot className="mb-10" label={common.advertisement} />

      <Prose className="mb-10">
        <h2>{common.toolShell.whatItDoes}</h2>
        {translation.explainer.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Prose>

      <Prose className="mb-10">
        <h2>{common.toolShell.howToUseIt}</h2>
        <ol>
          {translation.howToUse.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </Prose>

      {translation.howItWorks && translation.howItWorks.length > 0 && (
        <Prose className="mb-10">
          <h2>{common.toolShell.howItWorks}</h2>
          {translation.howItWorks.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Prose>
      )}

      {translation.whenToUse && translation.whenToUse.length > 0 && (
        <Prose className="mb-10">
          <h2>{common.toolShell.whenToUse}</h2>
          <ul>
            {translation.whenToUse.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </Prose>
      )}

      {translation.useCases && translation.useCases.length > 0 && (
        <Prose className="mb-10">
          <h2>{common.toolShell.commonUseCases}</h2>
          <ul>
            {translation.useCases.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </Prose>
      )}

      {translation.faq && translation.faq.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            {common.toolShell.faq}
          </h2>
          <dl className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {translation.faq.map((q, i) => (
              <div key={i} className="p-5">
                <dt className="font-semibold text-slate-900">{q.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-700">{q.a}</dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: faqJsonLd(translation.faq) }}
          />
        </section>
      )}

      {/* Near-bottom ad — mirrors the English shell's second slot. */}
      <AdSlot className="mb-10" label={common.advertisement} />

      {/* Related links are sourced from the English manifest; the link
          text will be English for now. V2: map relations through the
          locale's translated title if available. */}
      <RelatedLinks slug={slug} filter="tool" heading={common.toolShell.relatedTools} />
      <RelatedLinks slug={slug} filter="article" heading={common.toolShell.supportingGuides} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdFor(page) }}
      />
      {translation.howToUse.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: howToJsonLd({
              name: translation.h1,
              description: translation.description,
              steps: translation.howToUse,
            }),
          }}
        />
      )}
    </Container>
  );
}

function formatDate(iso: string, locale: Locale): string {
  const [y, m] = iso.split("-").map(Number);
  const d = new Date(Date.UTC(y, (m ?? 1) - 1, 1));
  // toLocaleDateString understands "es", "pt-BR", "fr" natively.
  return d.toLocaleDateString(LOCALE_META[locale].bcp47, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
