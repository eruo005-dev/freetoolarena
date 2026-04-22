import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LocalizedArticleShell } from "@/components/LocalizedArticleShell";
import { getPageBySlug } from "@/lib/pages";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getCommon, getGuideTranslation, translatedSlugs } from "@/lib/translations";

const LOCALE = "es" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return translatedSlugs(LOCALE, "guide").map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const tr = getGuideTranslation(LOCALE, params.slug);
  if (!tr) return { title: "Not found" };
  return buildLocalizedMetadata({
    slug: params.slug,
    locale: LOCALE,
    type: "guide",
    title: tr.title,
    description: tr.description,
  });
}

export default function EsGuidePage({ params }: { params: { slug: string } }) {
  const page = getPageBySlug(params.slug);
  const translation = getGuideTranslation(LOCALE, params.slug);
  if (!page || !page.published || page.type !== "article" || !translation) {
    notFound();
  }
  return (
    <LocalizedArticleShell
      slug={params.slug}
      locale={LOCALE}
      translation={translation}
      common={getCommon(LOCALE)}
    />
  );
}
