import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LocalizedToolShell } from "@/components/LocalizedToolShell";
import { TOOL_REGISTRY } from "@/components/tools/registry";
import { getPageBySlug } from "@/lib/pages";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getCommon, getToolTranslation, translatedSlugs } from "@/lib/translations";

const LOCALE = "es" as const;

// Only the Spanish-translated slugs are generated. Unknown slugs get a
// 404 instead of an empty shell (dynamicParams=false).
export const dynamicParams = false;

export function generateStaticParams() {
  return translatedSlugs(LOCALE, "tool").map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const tr = getToolTranslation(LOCALE, params.slug);
  if (!tr) return { title: "Not found" };
  return buildLocalizedMetadata({
    slug: params.slug,
    locale: LOCALE,
    type: "tool",
    title: tr.title,
    description: tr.description,
  });
}

interface PageProps {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function EsToolPage({ params, searchParams }: PageProps) {
  const page = getPageBySlug(params.slug);
  const entry = TOOL_REGISTRY[params.slug];
  const translation = getToolTranslation(LOCALE, params.slug);
  // Guard on English manifest AND having a published English tool AND an
  // actual Spanish translation bundle. Any missing piece = 404, since we
  // never want a half-translated page live.
  if (
    !page ||
    !page.published ||
    page.type !== "tool" ||
    !entry ||
    !translation
  ) {
    notFound();
  }
  const common = getCommon(LOCALE);
  return (
    <LocalizedToolShell
      slug={params.slug}
      locale={LOCALE}
      translation={translation}
      common={common}
    >
      {entry.render(searchParams)}
    </LocalizedToolShell>
  );
}
