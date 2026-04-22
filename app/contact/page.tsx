import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FeedbackForm } from "@/components/FeedbackForm";
import { SITE_NAME, SITE_EMAIL } from "@/lib/pages";
import { buildStaticMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "Contact",
  description: `Get in touch with ${SITE_NAME}. Bug reports, tool requests, feedback — all welcome.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lede="Bug reports, tool requests, broken links, content feedback — all read."
      />

      <div className="mb-10">
        <FeedbackForm />
      </div>

      <Prose>
        <h2>Or email directly</h2>
        <p>
          If you&rsquo;d rather skip the form:{" "}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>. Real messages get
          a real reply, usually within a few business days.
        </p>
        <h2>What to include</h2>
        <ul>
          <li>
            <strong>Bug reports:</strong> the page URL, what you expected, what
            actually happened, and which browser/device you&rsquo;re on.
          </li>
          <li>
            <strong>Tool requests:</strong> what the tool should do, how
            you&rsquo;d use it, and where existing tools fall short.
          </li>
          <li>
            <strong>Content corrections:</strong> the URL and the specific
            sentence that&rsquo;s wrong — with the fix or a source if you have
            one.
          </li>
        </ul>
        <h2>What we don&rsquo;t do</h2>
        <p>
          No guest posts, no sponsored content, no paid links, no
          &ldquo;collaboration&rdquo; outreach. Anything that looks like
          link-building gets archived without a reply.
        </p>
      </Prose>
    </Container>
  );
}
