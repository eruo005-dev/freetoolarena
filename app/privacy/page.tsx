import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_NAME, SITE_EMAIL } from "@/lib/pages";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles data. Short version: we don't collect much, and tools run in your browser.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Privacy", href: "/privacy" },
        ]}
      />
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lede="The honest version, in plain English."
        meta={<>Last updated {SITE_UPDATED}</>}
      />
      <Prose>
        <h2>The short version</h2>
        <p>
          Tools on {SITE_NAME} run entirely in your browser. We don&rsquo;t
          collect the numbers, text, or other inputs you enter into them. We
          don&rsquo;t require accounts. We don&rsquo;t sell anything to data
          brokers.
        </p>

        <h2>What we collect</h2>
        <p>
          Like most websites, our hosting provider records standard server
          logs: IP address, browser user agent, the page requested, and the
          timestamp. These are kept for a short period to monitor abuse and
          performance, and they are not used to build profiles of individual
          visitors.
        </p>
        <p>
          We may use a privacy-respecting analytics tool (such as Plausible or
          a similar cookieless service) to understand which pages are useful.
          This collects aggregate page-view counts and approximate country —
          not individual behavior.
        </p>

        <h2>Cookies</h2>
        <p>
          We don&rsquo;t set advertising or tracking cookies. If a tool needs
          to remember a setting between visits (for example, a saved currency
          pair), it uses your browser&rsquo;s local storage on your device
          only.
        </p>

        <h2>Third parties</h2>
        <p>
          A handful of tools need live data, so they call a public API
          directly from your browser — the request never touches our servers.
          The services currently used are the European Central Bank via{" "}
          <a href="https://www.frankfurter.app/" target="_blank" rel="noreferrer noopener">
            Frankfurter
          </a>{" "}
          (currency converter),{" "}
          <a href="https://www.ipify.org/" target="_blank" rel="noreferrer noopener">
            ipify
          </a>{" "}
          and{" "}
          <a href="https://ipapi.co/" target="_blank" rel="noreferrer noopener">
            ipapi.co
          </a>{" "}
          (IP lookup),{" "}
          <a href="https://date.nager.at/" target="_blank" rel="noreferrer noopener">
            Nager.Date
          </a>{" "}
          (public holidays), and{" "}
          <a href="https://haveibeenpwned.com/API/v3" target="_blank" rel="noreferrer noopener">
            Have I Been Pwned
          </a>{" "}
          (password breach checker — uses k-anonymity, so only the first 5
          characters of a SHA-1 hash are sent). Each has its own privacy
          policy. If a guide links to an outside site, that site has its own
          policy too.
        </p>

        <h2>Children</h2>
        <p>
          The site is not directed at children under 13. We don&rsquo;t
          knowingly collect personal information from anyone in that age
          group.
        </p>

        <h2>Your rights</h2>
        <p>
          If you&rsquo;re in a region with privacy laws (GDPR, CCPA, etc.) and
          want to know what we have on you — almost certainly nothing, but
          you&rsquo;re welcome to ask — email{" "}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes meaningfully, we&rsquo;ll update the
          &ldquo;last updated&rdquo; date at the top. Continued use of the
          site after a change means you accept the updated policy.
        </p>
      </Prose>
    </Container>
  );
}
