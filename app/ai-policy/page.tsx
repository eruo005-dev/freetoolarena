import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_NAME } from "@/lib/pages";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "AI content policy",
  description: `How ${SITE_NAME} uses (and doesn't use) AI in its content. Honest disclosure — no AI-spam, no fake authors, no hallucinated numbers.`,
  path: "/ai-policy",
});

export default function AiPolicyPage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "AI content policy", href: "/ai-policy" },
        ]}
      />
      <PageHeader
        eyebrow="Transparency"
        title="AI content policy"
        lede="Where AI helps us and where it doesn't. The rules we hold ourselves to so this site doesn't become another AI-spam farm."
      />
      <Prose>
        <h2>The short version</h2>
        <p>
          We use AI as a writing assistant the way a programmer uses an IDE.
          It speeds up drafting, it flags awkward phrasing, it catches typos.
          It does not get to ship content to readers unreviewed, and it is
          never presented as a human author.
        </p>

        <h2>Where AI is used</h2>
        <p>
          Drafting help — structure, first-draft prose, alternate phrasing
          suggestions. A guide may start as an AI draft; it never finishes as
          one. Every guide is reviewed, rewritten, and fact-checked by a human
          editor before it goes live. The structure, claims, and recommendations
          are ours.
        </p>
        <p>
          Tool building — we use AI assistance while writing the JavaScript for
          calculators and converters. The code runs locally in your browser;
          the formula correctness is validated against canonical sources (see
          the <Link href="/methodology">methodology page</Link>).
        </p>

        <h2>Where AI is not used</h2>
        <p>
          Numbers, formulas, and factual claims are not trusted to a language
          model. If a calculator computes a figure, it does so with real math
          in browser JavaScript, not by asking an LLM. If a guide claims a
          specific number (a tax bracket, a dose, a benchmark), that number is
          sourced from a canonical reference and cited where possible, not
          lifted from a model&rsquo;s training data.
        </p>
        <p>
          We do not run AI-generated &ldquo;author&rdquo; bylines. We do not
          fake testimonials. We do not generate reviews of products we
          haven&rsquo;t actually looked at.
        </p>

        <h2>What we won&rsquo;t do</h2>
        <p>
          No auto-publishing. Nothing goes live without a human looking at it.
          No AI-generated thin pages to farm long-tail keywords. No
          auto-translated content dumped into other-language silos without a
          real editor reviewing it. No &ldquo;5,000-word ultimate guide&rdquo;
          that exists only to rank.
        </p>

        <h2>Reader-facing AI tools</h2>
        <p>
          Some tools on this site are <em>for</em> AI users — prompt builders,
          token counters, model comparison tables. None of them send your
          content to an AI model on our end. They compute locally. If a tool
          ever changes to do otherwise, we&rsquo;ll say so on the tool page
          before shipping the change.
        </p>

        <h2>Disagree? Tell us.</h2>
        <p>
          If a guide reads as AI-generated spam, we want to know. That&rsquo;s a
          failure of our review process, not of the model.{" "}
          <Link href="/contact">Send us the URL</Link>, we&rsquo;ll take
          another pass.
        </p>
      </Prose>
      <p className="mt-12 text-xs text-slate-500">
        Last reviewed {formatDate(SITE_UPDATED)}.
      </p>
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
