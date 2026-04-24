import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { TOOL_REGISTRY } from "@/components/tools/registry";
import { CategoryDisclaimer } from "@/components/CategoryDisclaimer";
import {
  getPageBySlug,
  getPublishedTools,
  SITE_URL,
  SITE_NAME,
  pageHref,
} from "@/lib/pages";

/**
 * /embed/[slug] — bare tool renderer for iframe embedding on third-party
 * sites. No header, no footer, no ads. The embed exists to extend reach —
 * every third-party embed is a backlink and a brand impression.
 *
 * Frame-embedding is unblocked for /embed/* routes via vercel.json header
 * rules (X-Frame-Options stripped + CSP frame-ancestors relaxed). The
 * main site keeps SAMEORIGIN.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedTools().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getPageBySlug(params.slug);
  if (!page) return { title: "Embed" };
  return {
    title: `${page.h1 ?? page.title} — embeddable widget`,
    description: `Embeddable version of the ${page.h1 ?? page.title} from ${SITE_NAME}.`,
    robots: { index: false, follow: false }, // embed URLs don't need to rank
    alternates: { canonical: `${SITE_URL}${pageHref(page)}` },
  };
}

interface EmbedProps {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function EmbedPage({ params, searchParams }: EmbedProps) {
  const page = getPageBySlug(params.slug);
  const entry = TOOL_REGISTRY[params.slug];
  if (!page || !page.published || page.type !== "tool" || !entry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="mx-auto max-w-3xl">
        {/* Tool title — compact, no big hero */}
        <header className="mb-5 border-b border-slate-200 pb-3">
          <h1 className="text-lg font-bold text-slate-900">
            {page.h1 ?? page.title}
          </h1>
        </header>

        {/* The actual tool — unchanged */}
        <div className="mb-6">{entry.render(searchParams)}</div>

        {/* Disclaimer travels with the embed so risk categories don't
            lose their legal notice on third-party domains. */}
        <CategoryDisclaimer category={page.category} className="mb-5" />

        {/* Attribution — this is the whole distribution play. */}
        <footer className="border-t border-slate-200 pt-3 text-xs text-slate-500">
          <Link
            href={`${SITE_URL}${pageHref(page)}`}
            target="_blank"
            rel="noopener"
            className="hover:text-slate-700"
          >
            Powered by {SITE_NAME} &rarr; open full version
          </Link>
        </footer>
      </div>
    </div>
  );
}
