import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_NAME } from "@/lib/pages";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "Source + transparency",
  description: `${SITE_NAME} source-code transparency: open-source libraries we build on, published methodologies, no telemetry, and how to verify what runs in your browser.`,
  path: "/source",
});

export default function SourcePage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Source", href: "/source" },
        ]}
      />
      <PageHeader
        eyebrow="Source + transparency"
        title="What runs in your browser, where the formulas come from."
        lede={`${SITE_NAME} is built on open-source libraries, ships every formula with primary-source citations, and runs entirely in your browser. Here's how to verify all of that yourself.`}
      />

      <Prose>
        <h2>Verify what runs in your browser</h2>
        <p>
          You don&rsquo;t have to trust our claim that tools are local-only. Open your browser&rsquo;s
          DevTools (Cmd/Ctrl + Option/Shift + I) → <strong>Network</strong> tab → run any tool. The only
          requests you&rsquo;ll see are the static HTML, our own JS chunks, Vercel Analytics
          (privacy-friendly), and Google AdSense if not blocked.
        </p>
        <p>
          <strong>No tool inputs leave your machine.</strong> No API call to compute your loan payment,
          tip split, or password strength. Disconnect from the internet after the page loads — every
          tool keeps working.
        </p>

        <h2>Open-source libraries we build on</h2>
        <ul>
          <li><a href="https://nextjs.org/" rel="noreferrer noopener" target="_blank">Next.js 14</a> + <a href="https://react.dev/" rel="noreferrer noopener" target="_blank">React 18</a> for the site framework</li>
          <li><a href="https://github.com/Hopding/pdf-lib" rel="noreferrer noopener" target="_blank">pdf-lib</a> for client-side PDF editing (merge, split, watermark, redaction)</li>
          <li><a href="https://github.com/mozilla/pdf.js" rel="noreferrer noopener" target="_blank">pdf.js</a> (Mozilla) for PDF reading + table extraction</li>
          <li><a href="https://github.com/naptha/tesseract.js" rel="noreferrer noopener" target="_blank">tesseract.js</a> for in-browser OCR</li>
          <li><a href="https://github.com/soldair/node-qrcode" rel="noreferrer noopener" target="_blank">qrcode</a> for QR generation</li>
          <li><a href="https://github.com/alexcorvi/heic2any" rel="noreferrer noopener" target="_blank">heic2any</a> for HEIC → JPG conversion</li>
          <li>Web Crypto API (built into your browser) for password generation, hashing, encryption</li>
        </ul>

        <h2>Published formulas + sources</h2>
        <p>
          Every calculator with meaningful math has a <strong>&ldquo;Show the math + sources&rdquo;</strong>{" "}
          panel below the inputs. The formula in plain text, what the tool assumes, authoritative source
          URLs (IRS, CDC, SEC, CFPB, peer-reviewed papers), and date of last verification.
        </p>
        <p>
          Examples: <Link href="/tools/mortgage-calculator">mortgage</Link>,{" "}
          <Link href="/tools/loan-calculator">loan</Link>,{" "}
          <Link href="/tools/compound-interest-calculator">compound interest</Link>,{" "}
          <Link href="/tools/bmi-calculator">BMI</Link>,{" "}
          <Link href="/tools/calorie-calculator">calorie</Link>,{" "}
          <Link href="/tools/paycheck-calculator">paycheck</Link>,{" "}
          <Link href="/tools/tax-calculator">tax</Link>,{" "}
          <Link href="/tools/macro-calculator">macros</Link>.
        </p>

        <h2>Site code</h2>
        <p>
          The full site repository is currently private while we polish for release. The per-tool
          methodology pages publish the actual logic — the formula, sources, and assumptions — which is
          what matters for verifying that a calculator gives correct answers.
        </p>
        <p>
          If you find a methodology error, please <Link href="/contact">contact us</Link> — we treat
          methodology bugs the way other sites treat security bugs: top priority.
        </p>

        <h2>What we don&rsquo;t do</h2>
        <ul>
          <li>No tracking pixels, no fingerprinting, no third-party trackers beyond AdSense</li>
          <li>No telemetry on tool inputs (we don&rsquo;t know what loan amounts you&rsquo;re calculating)</li>
          <li>No accounts, no email capture, no &ldquo;upgrade to remove watermark&rdquo;</li>
          <li>No file upload to a server — anything that processes a file does it locally</li>
        </ul>

        <p className="mt-10 text-sm text-slate-500">
          See also: <Link href="/trust">Trust &amp; safety</Link>,{" "}
          <Link href="/security">Security</Link>,{" "}
          <Link href="/methodology">Tool methodology</Link>,{" "}
          <Link href="/accessibility">Accessibility</Link>. Last reviewed {SITE_UPDATED}.
        </p>
      </Prose>
    </Container>
  );
}
