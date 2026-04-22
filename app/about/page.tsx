import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrustBar } from "@/components/TrustBar";
import {
  getPublishedTools,
  getPublishedGuides,
  SITE_NAME,
} from "@/lib/pages";
import { buildStaticMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: `About ${SITE_NAME}`,
  description: `${SITE_NAME} is a browser-only home for free, ad-light tools and plain-English guides. Here's who builds it, how it stays free, and the rules we hold ourselves to.`,
  path: "/about",
});

export default function AboutPage() {
  const tools = getPublishedTools().length;
  const guides = getPublishedGuides().length;
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />
      <PageHeader
        eyebrow="About"
        title={`About ${SITE_NAME}`}
        lede={`${tools} tools and ${guides} guides — all free, all browser-only. One page per thing, nothing between you and the answer.`}
      />

      <TrustBar variant="stacked" className="mb-10" />

      <Prose className="mb-10">
        <h2>Why this exists</h2>
        <p>
          Most &ldquo;free calculator&rdquo; and &ldquo;how-to&rdquo; pages on
          the internet aren&apos;t built for you. They&apos;re built for ad
          revenue — so you get popups, cookie walls, three autoplay videos, an
          1,800-word SEO preamble, and a thin tool at the bottom of the page
          that half-works. {SITE_NAME} is the opposite. Open the page, use the
          tool, leave. If we&apos;ve done our job, you&apos;re gone in under a
          minute — and you come back next time because it just worked.
        </p>

        <h2>What you&apos;ll find here</h2>
        <p>
          <strong>Tools</strong> are small utilities that run entirely inside
          your browser tab — calculators for money and math, timers and
          planners for focus, formatters and converters for files, generators
          for passwords and QR codes. Nothing you type leaves your device. No
          uploads sit on our servers. We literally don&apos;t have the
          infrastructure to store them.
        </p>
        <p>
          <strong>Guides</strong> are short, specific, and opinionated —
          written the way a friend who has already done the thing would explain
          it. We&apos;d rather be useful in 800 words than exhaustive in 4,000.
          Each guide is dated so you can tell if it&apos;s current, and revised
          when the underlying tool or practice changes.
        </p>

        <h2>The four commitments</h2>
        <ol>
          <li>
            <strong>No account, ever.</strong> Not for tools, not for
            favorites, not for &ldquo;unlocking&rdquo; anything. If a tool
            needs login-gated data, we just don&apos;t build that tool.
          </li>
          <li>
            <strong>Your inputs stay on your device.</strong> Math and file
            processing run client-side. See{" "}
            <Link href="/how-it-works">how it works</Link> if you want the
            technical version.
          </li>
          <li>
            <strong>Transparent methodology.</strong> Every calculator&apos;s
            formula is documented on{" "}
            <Link href="/methodology">the methodology page</Link> or on the
            tool page itself. No black boxes.
          </li>
          <li>
            <strong>Ads, not paywalls.</strong> A single AdSense block near
            each tool keeps the lights on. No interstitials, no
            &ldquo;upgrade&rdquo;, no nag-to-sign-up. If you run an ad
            blocker, nothing breaks.
          </li>
        </ol>

        <h2>Who builds it</h2>
        <p>
          {SITE_NAME} is built by a small independent team that uses these
          tools daily — which is the honest reason any of them exist. Every
          calculator was written because we needed it ourselves; every guide
          was written after answering the same question from a friend for the
          third time. We aren&apos;t VC-backed. There&apos;s no growth-hacking
          roadmap. We ship a new tool when a real use case shows up.
        </p>

        <h2>How we update things</h2>
        <p>
          Pages carry an &ldquo;Updated&rdquo; date at the top. Finance tools
          are reviewed quarterly to confirm the math still reflects current
          rates and tax assumptions. Guides that depend on external products
          (AI models, SaaS tools, APIs) are revised whenever a named product
          ships a meaningful change. If a guide is over 18 months old and we
          haven&apos;t revisited it, we&apos;d rather delete it than leave
          stale advice up.
        </p>

        <h2>How the site stays free</h2>
        <p>
          A single Google AdSense unit near each tool, plus sitewide auto-ads
          that Google places. That&apos;s the whole business model. No
          affiliate links are inserted without a label. No sponsored content
          masquerades as editorial.{" "}
          <Link href="/editorial">Editorial independence policy</Link> covers
          how we&apos;d handle a sponsored post if one ever appeared (answer:
          it would be clearly marked and separate from guides).
        </p>

        <h2>What we won&apos;t do</h2>
        <ul>
          <li>Email you. There&apos;s no mailing list and no popup asking for your address.</li>
          <li>Track you across other sites with third-party cookies of our own.</li>
          <li>Sell data about visitors.</li>
          <li>Accept sponsored calculations, sponsored definitions, or paid product placements in guide bodies.</li>
          <li>
            Publish AI-generated content without a human editor rewriting,
            fact-checking, and taking responsibility. See{" "}
            <Link href="/ai-policy">AI content policy</Link>.
          </li>
        </ul>

        <h2>Proof you can check yourself</h2>
        <ul>
          <li>
            Open any tool page, view source, or open devtools → Network.
            You&apos;ll see a static HTML/JS bundle and AdSense. No POST to a
            backend API.
          </li>
          <li>
            Our <Link href="/trust">trust page</Link> lists every third-party
            service that runs on the site and exactly what it sees.
          </li>
          <li>
            <Link href="/security">Security posture</Link> describes our HTTPS,
            CSP, and dependency-audit stance.
          </li>
          <li>
            <Link href="/methodology">Methodology</Link> shows the exact math
            behind every finance calculator.
          </li>
        </ul>

        <h2>Get in touch</h2>
        <p>
          Spot a bug, find a calculator that looks wrong, or want to suggest a
          tool? Head to the <Link href="/contact">contact page</Link> — every
          message is read. Feedback shapes what gets built next, and most of
          the tools on this site started as a request from a reader.
        </p>
      </Prose>

      <aside className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
        <p className="text-base font-semibold text-slate-900">
          Ready to try it?
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Jump straight into the tool or guide you need — no sign-up, no ads in
          the way of the answer.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Browse all {tools} tools →
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-brand"
          >
            Read the guides →
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-brand"
          >
            See how it works →
          </Link>
        </div>
      </aside>
    </Container>
  );
}
