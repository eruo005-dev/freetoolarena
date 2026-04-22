import Link from "next/link";
import { RelatedLinks } from "@/components/RelatedLinks";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  getPageBySlug,
  pageHref,
  CATEGORIES,
  GUIDE_CATEGORIES,
  guideCategoryFor,
} from "@/lib/pages";
import { faqJsonLd, jsonLdFor, SITE_UPDATED } from "@/lib/seo";
import { LOCALE_META, type Locale, type GuideTranslation, type CommonStrings } from "@/lib/i18n";
import { localesFor } from "@/lib/translations";

interface LocalizedArticleShellProps {
  slug: string;
  locale: Locale;
  translation: GuideTranslation;
  common: CommonStrings;
  /** Approx reading time in minutes. */
  readingMinutes?: number;
}

/**
 * Localized counterpart to ArticleShell. Renders breadcrumbs, H1, intro,
 * body sections, in-article ad slots, optional FAQ (+ JSON-LD), optional
 * CTA card pointing at a tool, and related links. Guide body is sourced
 * entirely from the translation bundle so there's no English leaking
 * into the page body.
 */
export function LocalizedArticleShell({
  slug,
  locale,
  translation,
  common,
  readingMinutes = 6,
}: LocalizedArticleShellProps) {
  const page = getPageBySlug(slug);
  if (!page) return <p>Page not found.</p>;
  const category = CATEGORIES[page.category];
  const guideCat =
    page.type === "article" ? GUIDE_CATEGORIES[guideCategoryFor(page)] : null;
  // CTA target slug is English; we look it up in the English manifest.
  // If the target is unpublished the CTA simply doesn't render (mirrors
  // the English shell).
  const ctaTarget = translation.cta
    ? getPageBySlug(translation.cta.targetSlug)
    : undefined;
  const basePath = pageHref(page);
  const available = localesFor(slug, "guide");

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
          { label: common.breadcrumb.guides, href: `${LOCALE_META[locale].urlPrefix}/guides` },
          { label: translation.h1, href: `${LOCALE_META[locale].urlPrefix}${basePath}` },
        ]}
      />

      <PageHeader
        eyebrow={
          // Keep the eyebrow pragmatic — category names stay English in V1
          // so we don't need to translate every category label. Readers
          // still get the point.
          guideCat ? `${guideCat.label} · Guide · ${category.label}` : `${category.label} · Guide`
        }
        title={translation.h1}
        lede={translation.description}
        meta={
          <>
            {common.updatedOn(formatDate(SITE_UPDATED, locale))} · {readingMinutes} min
          </>
        }
      />

      <Prose>
        {translation.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Prose>

      <AdSlot layout="in-article" className="my-8" label={common.advertisement} />

      <Prose>
        {translation.sections.map((section, si) => (
          <section key={si}>
            <h2>{section.heading}</h2>
            {section.body.map((p, pi) => (
              <p key={pi}>{p}</p>
            ))}
          </section>
        ))}
      </Prose>

      {translation.faq && translation.faq.length > 0 && (
        <section aria-labelledby="faq-heading" className="mt-14">
          <h2
            id="faq-heading"
            className="mb-6 text-2xl font-bold tracking-tight text-slate-900"
          >
            {common.toolShell.faq}
          </h2>
          <div className="space-y-4">
            {translation.faq.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-200 bg-white p-5 open:border-brand/40"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-900">
                  <span>{item.q}</span>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-slate-400 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-700 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: faqJsonLd(translation.faq) }}
          />
        </section>
      )}

      <AdSlot layout="in-article" className="mt-12" label={common.advertisement} />

      {translation.cta && ctaTarget && ctaTarget.published && (
        <aside className="mt-12 flex flex-col gap-4 rounded-2xl bg-brand p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-7">
          <p className="font-medium leading-snug sm:text-lg">
            {translation.cta.label}
          </p>
          <Link
            // If the target has a translation in this locale, link to the
            // localized URL; otherwise fall through to the English one so
            // readers still get the tool.
            href={
              hasToolTranslation(translation.cta.targetSlug, locale)
                ? `${LOCALE_META[locale].urlPrefix}${pageHref(ctaTarget)}`
                : pageHref(ctaTarget)
            }
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-4 py-2.5 font-semibold text-brand transition hover:bg-slate-100"
          >
            {ctaTarget.h1} →
          </Link>
        </aside>
      )}

      <RelatedLinks slug={slug} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdFor(page) }}
      />
    </Container>
  );
}

function hasToolTranslation(targetSlug: string, locale: Locale): boolean {
  return localesFor(targetSlug, "tool").includes(locale);
}

function formatDate(iso: string, locale: Locale): string {
  const [y, m] = iso.split("-").map(Number);
  const d = new Date(Date.UTC(y, (m ?? 1) - 1, 1));
  return d.toLocaleDateString(LOCALE_META[locale].bcp47, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
