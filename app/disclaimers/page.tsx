import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Prose } from "@/components/ui/Prose";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";
import { SITE_NAME } from "@/lib/pages";

export function generateMetadata(): Metadata {
  return buildStaticMetadata({
    title: "Disclaimers",
    description:
      "Full text of the financial, medical, legal, and estimate disclaimers applied to tools on Free Tool Arena.",
    path: "/disclaimers",
    eyebrow: `${SITE_NAME} · Disclaimers`,
  });
}

export default function DisclaimersPage() {
  return (
    <Container className="py-10 max-w-3xl">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Disclaimers", href: "/disclaimers" },
        ]}
      />

      <PageHeader
        eyebrow="Legal"
        title="Disclaimers"
        lede="Plain-English explanation of what our tools do, what they don't, and where professional advice is required."
        meta={<>Updated {formatDate(SITE_UPDATED)}</>}
      />

      <Prose className="mt-8">
        <h2 id="general">General disclaimer</h2>
        <p>
          Every tool and guide on {SITE_NAME} is provided &ldquo;as is&rdquo; for
          informational and educational purposes. Results are computed from the
          inputs you supply using published formulas. We make reasonable effort
          to keep formulas accurate, but do not warrant that results are free
          from error, nor that they will be suitable for any specific purpose
          or jurisdiction.
        </p>
        <p>
          You are solely responsible for decisions you make based on outputs
          from this site. Nothing on {SITE_NAME} creates a professional
          relationship of any kind between you and us.
        </p>

        <h2 id="financial">Financial, tax &amp; investment disclaimer</h2>
        <p>
          Money calculators — loan, mortgage, retirement, tax, investment, FIRE,
          business finance — return estimates based on the numbers you enter
          and simplified assumptions. They are{" "}
          <strong>not financial, tax, or investment advice</strong>. Interest
          rates, tax brackets, insurance costs, market returns, and personal
          circumstances all vary in ways a general calculator cannot capture.
        </p>
        <p>
          For any decision that meaningfully affects your finances — taking a
          loan, refinancing, structuring a retirement account, filing a tax
          return, making an investment, or running a business — consult a
          licensed financial advisor, CPA, or attorney in your jurisdiction
          before acting. We receive no compensation tied to the outputs you
          see, and we are not registered as an investment adviser.
        </p>

        <h2 id="medical">Medical &amp; health disclaimer</h2>
        <p>
          Health calculators — BMI, BMR, calorie, macronutrient, hydration,
          heart-rate zone, vitamin D, ovulation, electrolyte, sleep cycle, and
          related tools — are{" "}
          <strong>informational only and do not constitute medical advice</strong>.
          They are not a substitute for diagnosis, treatment, or the judgment
          of a qualified healthcare provider.
        </p>
        <p>
          Do not use these tools to self-diagnose, to replace prescribed care,
          or to make decisions about medication, fertility, pregnancy, or
          serious symptoms. If you think you might have a medical emergency,
          call your local emergency number or go to the nearest emergency
          department immediately.
        </p>

        <h2 id="legal">Legal disclaimer</h2>
        <p>
          Document templates — including but not limited to bill of sale, NDA,
          freelance contract, promissory note, rental application, photo
          release, liability waiver, and letter of intent —{" "}
          <strong>are provided as reference templates only and are not legal advice</strong>.
          Laws, required disclosures, and enforceability vary by state,
          country, industry, and transaction type.
        </p>
        <p>
          Before signing, serving, or relying on any document generated from
          this site, have a licensed attorney in your jurisdiction review it
          for completeness and compliance with applicable law. Using these
          templates does not create an attorney-client relationship with us or
          any contributor to the site.
        </p>

        <h2 id="estimate">Estimate disclaimer (home, gaming, misc)</h2>
        <p>
          Home-improvement calculators (paint, wallpaper, tile, fertilizer,
          furniture fit) and gaming calculators (sensitivity, FOV, DPS, loot
          drop, enchantment XP) return estimates based on standard formulas.
          Actual results depend on local conditions, product variance, game
          patches, and inputs outside the tool&rsquo;s model. Treat outputs as
          a starting point, not a guarantee.
        </p>

        <h2 id="data-accuracy">Data accuracy</h2>
        <p>
          Some tools reference published values — tax brackets, contribution
          limits, conversion constants, published drop rates, or game
          mechanics. Published values change. We update our data periodically
          but cannot guarantee that every table reflects current regulation or
          the latest game patch. Verify critical numbers against an official
          primary source before acting on them.
        </p>

        <h2 id="ai-content">AI-generated content</h2>
        <p>
          Guides and some explanatory content on {SITE_NAME} are drafted with
          the assistance of AI tools and reviewed by a human editor before
          publication. AI can be wrong. If a guide contradicts official
          documentation, follow the official documentation.
        </p>

        <h2 id="privacy">Privacy &amp; data handling</h2>
        <p>
          Unless specifically noted, tools run entirely in your browser: the
          values you enter are not transmitted to our servers. Exceptions
          (anonymous usage analytics, ad serving) are documented on the{" "}
          <Link href="/how-it-works">how it works</Link> page and the{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>

        <h2 id="changes">Changes to this page</h2>
        <p>
          We may update these disclaimers as tools, categories, or applicable
          law change. The &ldquo;Updated&rdquo; date at the top of this page
          reflects the most recent revision. Continued use of the site
          constitutes acceptance of the current version.
        </p>

        <h2 id="contact">Questions</h2>
        <p>
          If something on this page is unclear or you believe a tool produced
          an incorrect result, please reach out through the{" "}
          <Link href="/contact">contact page</Link>. Corrections are prioritized
          over new features.
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
