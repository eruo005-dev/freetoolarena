import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { TrustBar } from "@/components/TrustBar";
import { SITE_URL, SITE_NAME } from "@/lib/pages";
import { buildStaticMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  path: "/how-it-works",
  title: `How ${SITE_NAME} works — private, browser-only tools`,
  description:
    "Every tool here runs in your browser. No uploads, no accounts, no servers crunching your data. Here's exactly how that works — and where the limits are.",
});

export default function HowItWorksPage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "How it works", href: "/how-it-works" },
        ]}
      />

      <PageHeader
        eyebrow="Transparency"
        title="How our tools actually work"
        lede="Plain-English explanation of where your data goes, what stays on your device, and what never leaves it."
      />

      <TrustBar variant="stacked" className="mb-10" />

      <Prose className="mb-10">
        <h2>Everything runs in your browser</h2>
        <p>
          When you open a calculator, converter, or formatter on this site, the
          math and the file processing happen on your device — inside the tab
          you&apos;re looking at. Nothing about what you type is sent to our
          servers for computation. There are no background uploads and nothing
          is stored in a database under your name.
        </p>
        <p>
          That&apos;s not marketing copy — it&apos;s how the code is written. The
          tools are built as static JavaScript bundles that Next.js pre-renders
          at build time and delivers as plain HTML/JS. The &quot;server&quot;
          is just a CDN handing you files. Once the page loads, the tool works
          even if you lose internet.
        </p>

        <h2>What stays on your device</h2>
        <ul>
          <li>
            Everything you type into a calculator, form, or text box.
          </li>
          <li>
            Any file you drop into a converter or editor (images, PDFs, audio,
            video). Files are read directly from your disk via the browser&apos;s
            File API and processed in memory.
          </li>
          <li>
            Your favorites and recently-used tools. We store those in{" "}
            <code>localStorage</code> on this device only — they don&apos;t sync
            across devices and no server sees them.
          </li>
        </ul>

        <h2>What we do see</h2>
        <p>
          To run the site, a few things unavoidably touch a server:
        </p>
        <ul>
          <li>
            <strong>Page requests.</strong> Your browser asks our host (Vercel)
            for the HTML/JS of the page you&apos;re on. Standard web-server
            logs (IP, user agent, path) exist for ~30 days, like every site on
            the internet.
          </li>
          <li>
            <strong>Anonymous analytics.</strong> We use Vercel Analytics to
            count page views and get a rough idea of which tools people
            actually use. No cookies. No cross-site tracking. No identifying
            you as a person.
          </li>
          <li>
            <strong>Ads.</strong> Google AdSense serves the ads. AdSense sets
            its own cookies and may personalize ads if you&apos;ve consented
            with Google elsewhere. See our{" "}
            <Link href="/privacy">privacy page</Link> for the exact details.
          </li>
        </ul>

        <h2>What we never do</h2>
        <ul>
          <li>Ask you to sign up or create an account.</li>
          <li>Take payment information.</li>
          <li>Save your file uploads or your typed inputs to a database.</li>
          <li>Sell data about you to third parties.</li>
          <li>Email you for any reason — there&apos;s no mailing list.</li>
        </ul>

        <h2>Honest limits</h2>
        <p>
          Browser-only has real tradeoffs and we&apos;d rather tell you upfront
          than pretend otherwise:
        </p>
        <ul>
          <li>
            <strong>Very large files</strong> (hundreds of megabytes) can slow
            down or crash the tab — the browser doesn&apos;t have server-class
            RAM. Try smaller chunks or a desktop app for those.
          </li>
          <li>
            <strong>Closing the tab loses your work.</strong> We don&apos;t
            save drafts anywhere. Export or copy your result before you close.
          </li>
          <li>
            <strong>Math tools are informational.</strong> A mortgage or loan
            calculator gives you a reasonable estimate to plan with, not a
            binding quote. For big financial decisions, talk to a licensed
            professional.
          </li>
          <li>
            <strong>Third-party API tools</strong> (IP lookup, public holidays,
            password-breach check) send a single anonymous request to a
            documented public API. Those are called out individually on the
            tool page.
          </li>
        </ul>

        <h2>Want to verify any of this?</h2>
        <p>
          Open the browser devtools on any tool page, click the{" "}
          <strong>Network</strong> tab, and run the tool. You&apos;ll see the
          initial page/JS load, the Vercel Analytics beacon, and the AdSense
          requests — and not much else. No hidden POST to a backend API,
          because there isn&apos;t one.
        </p>
        <p>
          We also publish our{" "}
          <Link href="/methodology">calculation methodology</Link>,{" "}
          <Link href="/editorial">editorial policy</Link>,{" "}
          <Link href="/ai-policy">AI content policy</Link>, and{" "}
          <Link href="/security">security posture</Link> so you can see how
          results are produced and how the site is maintained.
        </p>

        <h2>Found something off?</h2>
        <p>
          Calculations that look wrong, a tool that breaks, a page that reads
          like marketing fluff — we want to hear about all of it.{" "}
          <Link href="/contact">Email us</Link> and we&apos;ll fix it.
        </p>
      </Prose>

      <aside className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
        <p className="text-base font-semibold text-slate-900">
          Keep reading
        </p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <Link
            href="/trust"
            className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 hover:border-brand/40 hover:text-brand"
          >
            Trust &amp; safety →
          </Link>
          <Link
            href="/privacy"
            className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 hover:border-brand/40 hover:text-brand"
          >
            Privacy policy →
          </Link>
          <Link
            href="/methodology"
            className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 hover:border-brand/40 hover:text-brand"
          >
            Tool methodology →
          </Link>
          <Link
            href="/security"
            className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 hover:border-brand/40 hover:text-brand"
          >
            Security posture →
          </Link>
        </div>
      </aside>
    </Container>
  );
}
