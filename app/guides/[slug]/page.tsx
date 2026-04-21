import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleShell } from "@/components/ArticleShell";
import { GUIDE_REGISTRY } from "@/content/guides/registry";
import { getPageBySlug, getPublishedGuides } from "@/lib/pages";
import { metadataFor } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedGuides().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return metadataFor(params.slug);
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const page = getPageBySlug(params.slug);
  const entry = GUIDE_REGISTRY[params.slug];
  if (!page || !page.published || page.type !== "article" || !entry) {
    notFound();
  }
  return (
    <ArticleShell
      slug={params.slug}
      intro={entry.intro}
      cta={entry.cta}
      faq={entry.faq}
      toc={entry.toc}
    >
      {entry.body}
    </ArticleShell>
  );
}
