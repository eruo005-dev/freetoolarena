import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Prose } from "@/components/ui/Prose";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/pages";

export function generateMetadata(): Metadata {
  return buildStaticMetadata({
    title: "Embed Our Tools",
    description:
      "Embed any Free Tool Arena calculator, converter, or generator into your own site with a single iframe. Free, no API key, responsive.",
    path: "/embed",
    eyebrow: `${SITE_NAME} · Embed`,
  });
}

export default function EmbedDocs() {
  return (
    <Container className="py-10 max-w-3xl">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Embed", href: "/embed" },
        ]}
      />

      <PageHeader
        eyebrow="For developers"
        title="Embed our tools on your site"
        lede="Any calculator, converter, or generator can run inside an iframe on your own domain. Free, no API key, no signup, no outbound tracking scripts."
        meta={<>Updated {formatDate(SITE_UPDATED)}</>}
      />

      <Prose className="mt-8">
        <h2>Quick start</h2>
        <p>
          Copy the snippet below into any HTML page. Replace{" "}
          <code>trip-cost-calculator</code> with the slug of the tool you want.
          A tool&rsquo;s slug is the last segment of its URL — for example,
          https://freetoolarena.com/tools/<strong>mortgage-calculator</strong>.
        </p>
        <pre>{`<iframe
  src="${SITE_URL}/embed/trip-cost-calculator"
  width="100%"
  height="720"
  frameborder="0"
  loading="lazy"
  title="Trip cost calculator"
  style="border:1px solid #e2e8f0;border-radius:12px;max-width:720px;"
></iframe>`}</pre>

        <h2>Every tool page has a copy-ready snippet</h2>
        <p>
          Open any tool on this site, scroll past the &ldquo;How to use it&rdquo;
          section, and click <strong>&ldquo;Embed this tool on your site&rdquo;</strong>.
          You&rsquo;ll get a prefilled snippet that escapes the title correctly
          and sets a sane default height. Paste and ship.
        </p>

        <h2>What&rsquo;s inside the iframe</h2>
        <ul>
          <li>The tool&rsquo;s interactive UI and live results.</li>
          <li>
            For risk categories (finance, health, home) — the relevant
            disclaimer travels with the embed.
          </li>
          <li>
            A small footer link back to the full tool page on {SITE_NAME}.
          </li>
        </ul>

        <h2>What&rsquo;s not inside</h2>
        <ul>
          <li>
            No ads. AdSense policy prohibits serving ads in third-party
            iframes, so the embed view is fully ad-free.
          </li>
          <li>
            No header, no footer, no navigation — just the tool.
          </li>
          <li>
            No trackers beyond standard Vercel analytics on our domain.
            Embedding the iframe does not install cookies on your domain.
          </li>
        </ul>

        <h2>Sizing and responsiveness</h2>
        <p>
          The iframe content is fluid and honors the width you set. Height
          depends on the tool — most calculators fit comfortably in 600-800px.
          We recommend a conservative height with CSS{" "}
          <code>overflow: auto</code>, or increasing height to fit the tallest
          expected state. Some guidelines:
        </p>
        <ul>
          <li>
            Simple single-input tools (tip, BMI) &mdash; 500 px
          </li>
          <li>
            Multi-input calculators (mortgage, loan) &mdash; 720 px
          </li>
          <li>
            Tools with tables (amortization, bracket visualizer) &mdash; 900 px
          </li>
          <li>
            Document templates (receipts, letters) &mdash; 1200 px
          </li>
        </ul>

        <h2>Deep-linking with searchParams</h2>
        <p>
          Many of our calculators accept URL parameters as default values. For
          example, to pre-fill a mortgage embed with a $400,000 loan at 6.5%
          for 30 years:
        </p>
        <pre>{`<iframe src="${SITE_URL}/embed/mortgage-calculator?amount=400000&rate=6.5&term=30"
  width="100%" height="720"></iframe>`}</pre>
        <p>
          Supported parameters vary per tool. Inspect a tool page URL after
          using it; if it still works when you reload, the param is persistent
          and embeddable.
        </p>

        <h2>Rules &amp; attribution</h2>
        <p>
          We ask two things:
        </p>
        <ol>
          <li>
            Don&rsquo;t remove the &ldquo;Powered by {SITE_NAME}&rdquo; footer
            link inside the iframe — it&rsquo;s how we keep the tools free for
            everyone.
          </li>
          <li>
            Don&rsquo;t scrape the iframe to extract the tool and reskin it on
            your own domain. Embedding the iframe is welcome; copy-pasting the
            rendered output is not.
          </li>
        </ol>
        <p>
          Other than that, use them freely — commercial sites, personal blogs,
          internal dashboards, documentation, wherever it helps.
        </p>

        <h2>Something not working?</h2>
        <p>
          If a specific tool doesn&rsquo;t render in your iframe — most likely
          a Content-Security-Policy issue on your own site — reach out via the{" "}
          <Link href="/contact">contact page</Link>. If you need a tool
          we don&rsquo;t have yet, tell us what you&rsquo;d embed if it
          existed; we add tools based on requests.
        </p>
      </Prose>
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
