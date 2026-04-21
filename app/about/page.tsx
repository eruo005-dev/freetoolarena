import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  getPublishedTools,
  getPublishedGuides,
  SITE_NAME,
} from "@/lib/pages";
import { buildStaticMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "About",
  description: `${SITE_NAME} is a growing home for free online tools and plain-English guides. Here's who builds it and why.`,
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
        lede={`${tools} tools and ${guides} guides, all free. One page per thing, nothing between you and the answer.`}
      />
      <Prose>
        <h2>Why this exists</h2>
        <p>
          Most &ldquo;free calculator&rdquo; and &ldquo;how to&rdquo; pages are
          built for ad revenue, not for you. Popups, cookie walls, 1,200 words
          of SEO preamble, and then a thin tool at the bottom. {SITE_NAME} is
          the opposite: open the page, use the tool, leave.
        </p>
        <h2>What&rsquo;s here</h2>
        <p>
          Tools are small utilities that run entirely in your browser — tip
          calculators, pomodoro timers, JSON formatters, unit and file
          converters, habit trackers. Nothing you type leaves your device.
          Guides are short and opinionated — written like a friend who&rsquo;s
          already done the thing would explain it.
        </p>
        <h2>How it&rsquo;s made</h2>
        <p>
          Every tool is built and tested on real inputs. Every guide is
          reviewed before publishing and dated so you can tell if it&rsquo;s
          stale. The bar is fewer pages that are actually useful, not more
          pages that exist.
        </p>
        <h2>How the site stays free</h2>
        <p>
          No accounts, no paywall, no intrusive ads. Internal links go between
          related tools and guides on the site. If affiliate links are ever
          added to outside products, they&rsquo;ll be labeled.
        </p>
        <h2>Get in touch</h2>
        <p>
          Spot something wrong? Want to suggest a tool? Head to the{" "}
          <Link href="/contact">contact page</Link> — feedback shapes what gets
          built next.
        </p>
      </Prose>
    </Container>
  );
}
