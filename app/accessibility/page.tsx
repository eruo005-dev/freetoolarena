import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_NAME } from "@/lib/pages";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "Accessibility statement",
  description: `${SITE_NAME} accessibility commitments, conformance status, known issues, and how to report problems. WCAG 2.1 Level AA target.`,
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Accessibility", href: "/accessibility" },
        ]}
      />
      <PageHeader
        eyebrow="Accessibility"
        title="Built to be usable by everyone."
        lede={`${SITE_NAME} commits to WCAG 2.1 Level AA conformance. Here's exactly what that means, what's already verified, what's still in progress, and how to tell us when something doesn't work.`}
      />

      <Prose>
        <h2>Our commitment</h2>
        <p>
          Every tool and guide on the site is designed to work for people who navigate by
          keyboard, use screen readers, magnify the screen, or rely on high-contrast modes.
          We target <strong>WCAG 2.1 Level AA</strong>, which is the standard cited by the EU
          Accessibility Act, US Section 508, and most regional accessibility laws.
        </p>

        <h2>Last audit</h2>
        <p>
          Last full internal audit: <strong>{SITE_UPDATED}</strong>. We re-audit on every
          major release of the shared shell components (header, footer, tool layout,
          article layout) and quarterly for the wider tool catalog.
        </p>

        <h2>What&rsquo;s verified</h2>
        <ul>
          <li>Visible focus indicator on every interactive element (2px brand outline + 2px offset).</li>
          <li>Keyboard-only operation supported across the site (Cmd/Ctrl-K command palette, Tab, Enter, Escape).</li>
          <li>Skip-to-content link on every page for screen-reader users.</li>
          <li>Semantic landmarks: <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;nav&gt;</code> — used consistently.</li>
          <li>Heading hierarchy: every page has one and only one <code>&lt;h1&gt;</code>; subheadings step down without skipping levels.</li>
          <li>Alternative text on all decorative icons (<code>aria-hidden=&quot;true&quot;</code>) and meaningful images (descriptive <code>alt</code>).</li>
          <li>Color contrast: body text and UI controls meet WCAG AA contrast ratios (4.5:1 normal, 3:1 large + UI).</li>
          <li>Forms: every input has a programmatically-associated <code>&lt;label&gt;</code>.</li>
          <li>Tables: <code>&lt;thead&gt;</code>/<code>&lt;th&gt;</code> with <code>scope</code> on data tables.</li>
          <li>Reduced-motion: animations respect <code>prefers-reduced-motion: reduce</code>.</li>
          <li>Print stylesheet: every tool and guide page is print-friendly with chrome stripped.</li>
          <li>Screen-reader tested: NVDA + VoiceOver on key flows (homepage, tool page, guide page, comparison page).</li>
        </ul>

        <h2>Known limitations</h2>
        <p>
          Honesty matters more than a perfect statement. Active issues we&rsquo;re working on:
        </p>
        <ul>
          <li>
            <strong>Some compact toggle-button groups</strong> on calculator tools have target
            sizes around 28×28px — meets WCAG AA (24×24px) but not AAA (44×44px). We&rsquo;re
            increasing target sizes incrementally.
          </li>
          <li>
            <strong>Embedded ad slots</strong> render third-party content we don&rsquo;t fully
            control. We mitigate by lazy-loading, sandboxing, and labeling each slot, but
            individual ads may not always meet our standards.
          </li>
          <li>
            <strong>Complex generated previews</strong> (envelope formatter, mailing-label
            sheet, fax cover sheet) use absolute positioning for print fidelity. We provide
            text alternatives below the visual preview, but layout itself is visual.
          </li>
          <li>
            <strong>Spanish-locale pages</strong> have full feature parity with English but
            not all third-party content (ads, etc.) is localized.
          </li>
        </ul>

        <h2>How to report a problem</h2>
        <p>
          If something on the site doesn&rsquo;t work for you — keyboard navigation,
          screen-reader announcements, contrast, target size, or anything else — please
          let us know:
        </p>
        <ul>
          <li>
            <a href="/contact">Contact form</a> — fastest. Include the URL of the page, what
            you were trying to do, what assistive tech you use, and what went wrong.
          </li>
          <li>
            Email the address listed at <a href="/about">/about</a> with &ldquo;Accessibility&rdquo;
            in the subject. We aim to acknowledge within 5 business days.
          </li>
        </ul>

        <h2>Standards we follow</h2>
        <ul>
          <li><a href="https://www.w3.org/TR/WCAG21/" rel="noreferrer noopener" target="_blank">WCAG 2.1 (Web Content Accessibility Guidelines)</a> — Level AA target.</li>
          <li><a href="https://www.w3.org/TR/wai-aria-1.2/" rel="noreferrer noopener" target="_blank">WAI-ARIA 1.2</a> for dynamic / interactive components.</li>
          <li><a href="https://www.section508.gov/" rel="noreferrer noopener" target="_blank">US Section 508</a> standards (which incorporate WCAG 2.0 AA).</li>
          <li><a href="https://accessibility-act.europa.eu/" rel="noreferrer noopener" target="_blank">EU Accessibility Act</a> requirements.</li>
        </ul>

        <h2>Why we publish this</h2>
        <p>
          Most free-tool sites either ignore accessibility entirely or hide behind a generic
          &ldquo;we strive to comply&rdquo; statement. We think you deserve a list of what&rsquo;s
          actually verified and what&rsquo;s still open — and a way to tell us when we get it
          wrong. That&rsquo;s how the site actually gets better.
        </p>

        <p className="mt-10 text-sm text-slate-500">
          This statement was last reviewed on {SITE_UPDATED}.
        </p>
      </Prose>
    </Container>
  );
}
