import Link from "next/link";
import type { ReactNode } from "react";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { getPageBySlug, pageHref, CATEGORIES } from "@/lib/pages";
import { jsonLdFor, faqJsonLd, SITE_UPDATED } from "@/lib/seo";

export interface FaqItem {
  q: string;
  a: string;
}

export interface TocItem {
  id: string;
  label: string;
}

interface ArticleShellProps {
  slug: string;
  intro: ReactNode; // 1-2 opening paragraphs
  children: ReactNode; // body (H2/H3 + paragraphs)
  cta?: { label: string; targetSlug: string };
  faq?: FaqItem[];
  /** Optional table of contents — rendered above the body. */
  toc?: TocItem[];
  /** Approx reading time in minutes. Rough is fine — 4/6/8 cover most. */
  readingMinutes?: number;
}

/**
 * Page chrome shared by every guide: breadcrumbs, H1, intro, TOC, body,
 * FAQ, CTA card, related links, JSON-LD. CTA is only rendered if the target
 * tool is live. FAQ block emits visible Q&A + FAQPage JSON-LD for rich results.
 */
export function ArticleShell({
  slug,
  intro,
  children,
  cta,
  faq,
  toc,
  readingMinutes = 6,
}: ArticleShellProps) {
  const page = getPageBySlug(slug);
  if (!page) return <p>Page not found.</p>;
  const category = CATEGORIES[page.category];
  const ctaTarget = cta ? getPageBySlug(cta.targetSlug) : undefined;

  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: page.h1, href: pageHref(page) },
        ]}
      />

      <PageHeader
        eyebrow={`${category.label} · Guide`}
        title={page.h1}
        lede={page.description}
        meta={<>Updated {formatDate(SITE_UPDATED)} · {readingMinutes} min read</>}
      />

      <Prose>{intro}</Prose>

      {toc && toc.length > 0 && (
        <nav
          aria-label="Table of contents"
          className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-5"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            On this page
          </p>
          <ol className="space-y-2 text-sm">
            {toc.map((item, i) => (
              <li key={item.id} className="flex gap-3">
                <span className="tabular-nums text-slate-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={`#${item.id}`}
                  className="text-slate-700 underline-offset-2 hover:text-brand hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <Prose>{children}</Prose>

      {faq && faq.length > 0 && (
        <section aria-labelledby="faq-heading" className="mt-14">
          <h2
            id="faq-heading"
            className="mb-6 text-2xl font-bold tracking-tight text-slate-900"
          >
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
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
            dangerouslySetInnerHTML={{ __html: faqJsonLd(faq) }}
          />
        </section>
      )}

      {cta && ctaTarget && ctaTarget.published && (
        <aside className="mt-12 flex flex-col gap-4 rounded-2xl bg-brand p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-7">
          <p className="font-medium leading-snug sm:text-lg">{cta.label}</p>
          <Link
            href={pageHref(ctaTarget)}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-4 py-2.5 font-semibold text-brand transition hover:bg-slate-100"
          >
            Open the {ctaTarget.h1} →
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

function formatDate(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  const d = new Date(Date.UTC(y, (m ?? 1) - 1, 1));
  return d.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
