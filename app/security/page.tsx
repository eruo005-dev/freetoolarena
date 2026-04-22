import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_NAME, SITE_EMAIL } from "@/lib/pages";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "Security",
  description: `How ${SITE_NAME} is architected for safety — static hosting, in-browser tools, no user uploads, no login surface, no database. Plus how to report an issue.`,
  path: "/security",
});

export default function SecurityPage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Security", href: "/security" },
        ]}
      />
      <PageHeader
        eyebrow="Architecture"
        title="Security"
        lede="How the site is built so common web attack surfaces simply don't exist — and how to tell us if you find one we missed."
      />
      <Prose>
        <h2>Architecture at a glance</h2>
        <p>
          {SITE_NAME} is a static Next.js site deployed on Vercel&rsquo;s edge
          network. Every page is prerendered at build time and served as
          static HTML + JavaScript bundles. There is no application server, no
          database, no login system, and no user-generated content pipeline.
        </p>
        <p>
          That means most of the usual attack surfaces that plague content
          sites — SQL injection, server-side code execution, authentication
          bypass, session hijacking — don&rsquo;t apply. There&rsquo;s nothing
          to inject into and nothing to authenticate against.
        </p>

        <h2>What runs where</h2>
        <p>
          <strong>On your device:</strong> every tool&rsquo;s interactive logic —
          calculators, converters, formatters, encoders, the lot. Inputs stay
          in your browser. Outputs stay in your browser. Closing the tab wipes
          state; a couple of tools (favorites, recently used) persist in{" "}
          <code>localStorage</code> which you control.
        </p>
        <p>
          <strong>On our servers (Vercel):</strong> static HTML/CSS/JS, the
          sitemap, the Open Graph image endpoint. Request-path code exists only
          for <code>/og</code> (dynamic social image rendering) and internal
          health checks.
        </p>
        <p>
          <strong>Third parties we call:</strong> Vercel Web Analytics and
          Vercel Speed Insights (anonymous, cookieless, GDPR-aware). Google
          AdSense (a third-party ad provider that sets its own cookies — see{" "}
          <Link href="/privacy">privacy policy</Link>). A small number of
          tools hit public APIs where it&rsquo;s core to the tool (IP Lookup,
          Public Holidays, Password Breach Checker via HIBP k-anonymity).
          Everything else is in-browser.
        </p>

        <h2>Transport &amp; headers</h2>
        <p>
          HTTPS-only across the site with HSTS enabled by default at the edge.
          Standard hardening headers are set via <code>vercel.json</code>:
          X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and
          Permissions-Policy. If one of these ever misbehaves with a legitimate
          browser feature, please send the exact error.
        </p>

        <h2>No user uploads, no public write paths</h2>
        <p>
          No tool on this site uploads your files to our servers. Tools that
          accept files (PDF, image, audio) process them in your browser only.
          Nothing you do on a tool page produces a write to a database, a
          queue, or a remote storage bucket owned by us.
        </p>
        <p>
          There is no public comment form, no registration, and no API
          endpoint that accepts authenticated input. The entire surface is
          read-only.
        </p>

        <h2>Browser storage</h2>
        <p>
          Two small <code>localStorage</code> keys are used:
          <code>fta.favorites.v1</code> (tool slugs you&rsquo;ve starred) and{" "}
          <code>fta.recent.v1</code> (tool slugs you&rsquo;ve recently opened).
          Both are readable only by this domain and can be cleared from your
          browser&rsquo;s site-data settings. Nothing else is stored.
        </p>

        <h2>Reporting a vulnerability</h2>
        <p>
          If you believe you&rsquo;ve found a security issue — a misconfiguration,
          a header weakness, a supply-chain problem in a dependency, anything
          that could harm a user — please email{" "}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> with the subject
          line <code>Security</code>. Include the URL, the steps to reproduce,
          and any proof-of-concept you&rsquo;re comfortable sharing.
        </p>
        <p>
          We don&rsquo;t run a paid bounty program (the site is small), but we
          respond quickly, credit the reporter if they want credit, and fix
          the issue as fast as we can.
        </p>

        <h2>Dependencies</h2>
        <p>
          The tooling is an ordinary Next.js + React + Tailwind stack. We keep
          dependencies lean, pin versions, and upgrade when there&rsquo;s a
          reason. We don&rsquo;t install packages from obscure sources.
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
