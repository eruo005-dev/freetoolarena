import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_NAME, SITE_EMAIL } from "@/lib/pages";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "Terms of Service",
  description: `The short rules for using ${SITE_NAME}. Tools are informational, not professional advice.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Terms", href: "/terms" },
        ]}
      />
      <PageHeader
        eyebrow="Legal"
        title="Terms of service"
        lede="The short version: use the site in good faith, don't break things, and don't rely on us for professional advice."
        meta={<>Last updated {SITE_UPDATED}</>}
      />
      <Prose>
        <h2>Use of the site</h2>
        <p>
          You can use {SITE_NAME} for your own personal or business purposes,
          free of charge. You can link to any page here. Don&rsquo;t scrape
          the whole site at volume, don&rsquo;t embed the tools in products
          you&rsquo;re reselling, and don&rsquo;t try to break the site for
          everyone else.
        </p>

        <h2>Informational only</h2>
        <p>
          The calculators and guides here are informational. A tip calculator
          is not a CPA. A budget guide is not a financial planner. A fitness
          article is not a doctor. For important decisions — money, legal,
          medical, professional — talk to a qualified professional who knows
          your specific situation.
        </p>

        <h2>No warranty</h2>
        <p>
          The site is provided &ldquo;as is.&rdquo; We do our best to keep the
          tools accurate and the guides useful, but we make no guarantees
          that every calculation, rate, or recommendation is correct in every
          edge case. If you spot an error, let us know.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent allowed by law, we aren&rsquo;t liable for any
          loss — financial, reputational, or otherwise — arising from use of
          the site. Using the tools or guides is at your own discretion.
        </p>

        <h2>Content ownership</h2>
        <p>
          Original content on {SITE_NAME} (article text, tool code, site
          design) belongs to us. You&rsquo;re welcome to quote or reference
          short passages with attribution. Don&rsquo;t republish full articles
          or tools without written permission.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms occasionally. Material changes will be
          reflected in the &ldquo;last updated&rdquo; date above. If you keep
          using the site after a change, that counts as acceptance.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
        </p>
      </Prose>
    </Container>
  );
}
