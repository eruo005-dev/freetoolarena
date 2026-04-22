import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_NAME } from "@/lib/pages";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "Editorial policy",
  description: `How ${SITE_NAME} writes, edits, and corrects its guides. What we'll publish, what we won't, and how to tell us we got something wrong.`,
  path: "/editorial",
});

export default function EditorialPage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Editorial policy", href: "/editorial" },
        ]}
      />
      <PageHeader
        eyebrow="Editorial"
        title="Editorial policy"
        lede="How our guides get written, what bar we hold them to, and how we correct mistakes."
      />
      <Prose>
        <h2>What a {SITE_NAME} guide is</h2>
        <p>
          Our guides are short, specific, and opinionated. They answer one
          question each and leave. A guide is good if a reader can finish it in
          three minutes, walk away with a clear next step, and not feel like
          they were tricked into reading a sales page along the way.
        </p>
        <p>
          That means we cut things other sites pad with: dictionary-style
          definitions everyone already knows, 500-word history lessons nobody
          asked for, and bullet lists of &ldquo;benefits&rdquo; before the
          actual how-to. If you see any of that on one of our guides, something
          went wrong.
        </p>

        <h2>What we won&rsquo;t publish</h2>
        <p>
          No affiliate-driven &ldquo;best of&rdquo; listicles where the ranking
          is secretly a payout ladder. No &ldquo;ultimate guides&rdquo; written
          to bait search engines with 5,000 words of filler. No advice on topics
          where we don&rsquo;t have a real opinion — silence beats noise.
        </p>
        <p>
          We won&rsquo;t present financial, legal, or medical advice as
          prescriptive. When a topic is in that territory, the guide is framed
          as information you&rsquo;d take to a professional, not as a substitute
          for one.
        </p>

        <h2>How we fact-check</h2>
        <p>
          Claims that can be checked get checked. Numbers come with a source,
          either linked in the guide or verifiable in a canonical document
          (HMRC, IRS, CDC, peer-reviewed paper, official documentation). If a
          claim is our opinion, we&rsquo;ll say it&rsquo;s our opinion. If it&rsquo;s
          a rule of thumb, we&rsquo;ll say so. We try to be honest about the
          difference.
        </p>

        <h2>Corrections</h2>
        <p>
          When a guide is wrong, we fix it. No silent edits on material claims
          — if we change a factual statement that readers may have relied on,
          the page picks up a &ldquo;last reviewed&rdquo; stamp and, where
          warranted, a short note about what changed.
        </p>
        <p>
          Found an error? <Link href="/contact">Tell us</Link>. The fastest way
          to improve this site is readers catching things we missed.
        </p>

        <h2>Conflicts of interest</h2>
        <p>
          When a guide names a specific product or service, the link is a plain
          link — not a paid placement. If that ever changes (we add an affiliate
          program, for example), it will be disclosed on the page and on this
          policy before any content goes out.
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
