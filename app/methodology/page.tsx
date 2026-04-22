import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_NAME } from "@/lib/pages";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "Tool methodology",
  description: `How ${SITE_NAME} picks which tools to build, which formulas we use, and how we test. No affiliate quotas, no sponsor pressure.`,
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Tool methodology", href: "/methodology" },
        ]}
      />
      <PageHeader
        eyebrow="How we build"
        title="Tool methodology"
        lede="How we decide which tools to build, which formulas to use, and how we test them before shipping."
      />
      <Prose>
        <h2>What makes it onto the site</h2>
        <p>
          Every tool on {SITE_NAME} starts from a real search query — something a
          person actually types into Google. If nobody&rsquo;s looking for it,
          we don&rsquo;t build it. If there&rsquo;s a better free tool for it
          already, we either build a measurably better one (clearer UI, faster,
          more trustworthy) or we leave it alone.
        </p>
        <p>
          We do not take sponsorships to include a specific tool. We are not
          paid by the companies whose formats our converters support. There is
          no affiliate link quota that drives which tools get built.
        </p>

        <h2>Formulas and sources</h2>
        <p>
          Calculators use plain-math formulas — no secret sauce, no proprietary
          model. Where a formula has multiple accepted variants (ideal body
          weight, for example), we pick one by default and document it on the
          tool page. If the result depends on assumptions (standard US tax
          brackets, federal-only paycheck deductions), those assumptions are
          spelled out on the page so you know whether the number fits your
          situation.
        </p>
        <p>
          Any tool that pulls data from a third-party API (holidays, IP,
          currency rates) names that API on the page. You can check the source
          and swap to it directly if you prefer.
        </p>

        <h2>How we test</h2>
        <p>
          Before a calculator ships, we run 5–10 real scenarios through it by
          hand and check every number against a canonical source — HMRC for UK
          tax, IRS for US tax, the official body-mass-index tables, and so on.
          For converters, we round-trip the input and check that{" "}
          <code>decode(encode(x))</code> equals <code>x</code> on a representative
          sample. Every tool runs in the browser, so we test on Chrome, Firefox,
          Safari, and mobile Safari before publish.
        </p>

        <h2>Updates and deprecation</h2>
        <p>
          Calculators that depend on numbers that change (tax brackets, minimum
          wage, contribution limits) get an &ldquo;updated&rdquo; stamp on the
          page and a review cycle — we&rsquo;ll either update them in January
          of the relevant year or explicitly mark the page as using prior-year
          data. If a tool stops being useful, we redirect it to the closest
          replacement rather than leave a stale page up.
        </p>

        <h2>When we&rsquo;re wrong</h2>
        <p>
          If a calculator gives you a number you believe is wrong — or a
          converter loses precision, or a definition is misleading —{" "}
          <Link href="/contact">contact us</Link>. We read every message and
          fix what&rsquo;s broken. Reporting a real bug is the single highest-leverage
          way to improve the site, and we take it seriously.
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
