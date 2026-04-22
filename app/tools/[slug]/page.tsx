import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ToolShell } from "@/components/ToolShell";
import { TOOL_REGISTRY } from "@/components/tools/registry";
import { getPageBySlug, getPublishedTools } from "@/lib/pages";
import { metadataFor } from "@/lib/seo";

// Allow statically generated tools to also serve arbitrary query strings
// (e.g. /tools/loan-calculator?amount=200000). dynamicParams=false still
// blocks unknown slugs from rendering.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedTools().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return metadataFor(params.slug);
}

interface ToolPageProps {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function ToolPage({ params, searchParams }: ToolPageProps) {
  const page = getPageBySlug(params.slug);
  const entry = TOOL_REGISTRY[params.slug];
  if (!page || !page.published || page.type !== "tool" || !entry) {
    notFound();
  }
  return (
    <ToolShell
      slug={params.slug}
      explainer={entry.explainer}
      howToUse={entry.howToUse}
      useCases={entry.useCases}
      whenToUse={entry.whenToUse}
      whenNotToUse={entry.whenNotToUse}
      example={entry.example}
      howItWorks={entry.howItWorks}
      faq={entry.faq}
    >
      {entry.render(searchParams)}
    </ToolShell>
  );
}
