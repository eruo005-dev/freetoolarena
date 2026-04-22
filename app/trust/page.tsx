import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrustBar } from "@/components/TrustBar";
import { SITE_NAME } from "@/lib/pages";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "Trust & Safety",
  description: `How ${SITE_NAME} stays safe to use — no downloads, no accounts, no malware, no file uploads. What runs in your browser vs. what touches our servers.`,
  path: "/trust",
});

export default function TrustPage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Trust & safety", href: "/trust" },
        ]}
      />
      <PageHeader
        eyebrow="Trust & safety"
        title="Safe by design, not by promise."
        lede={`${SITE_NAME} is built as a static site of small, single-file tools that run entirely in your browser. Nothing installs, nothing uploads, nothing tracks you across the web.`}
      />

      <TrustBar variant="stacked" className="mb-12" />

      <Prose>
        <h2>What we mean by “runs in your browser”</h2>
        <p>
          When you open a calculator, converter, or formatter on this site, the
          JavaScript for that tool downloads once and executes on your device.
          Your inputs (numbers, text, images, PDFs, audio) are processed locally.
          We don’t ship your data to a server, and there’s no backend queue, no
          file store, no “enterprise plan” where it starts going somewhere else.
        </p>
        <p>
          A handful of tools — and these are <em>clearly labeled</em> — do make
          an outbound request because they have to. Examples: the IP Lookup tool
          asks a public IP API what your public IP is (it has to); the Public
          Holidays lookup queries a holidays API. These are documented on each
          tool page. No tool on this site uploads your files.
        </p>

        <h2>No downloads needed</h2>
        <p>
          You never have to install anything. No desktop app, no browser
          extension, no “open this .exe” step. Some tools produce a file you can
          save (a PDF you compressed, an image you cropped), but that file is
          generated in your browser and handed to your device’s save dialog —
          it’s not an installer.
        </p>
        <p>
          If a download prompt ever appears that <em>you</em> didn’t trigger by
          clicking an explicit save button, that’s a bug — please{" "}
          <Link href="/contact">tell us</Link>.
        </p>

        <h2>No sign-up, no email capture, no paywall</h2>
        <p>
          Every page here is available without an account. We don’t collect
          your email, we don’t run newsletter pop-ups in front of the tool, and
          we don’t gate features behind a paid tier. The tools are free because
          they’re small and cheap to host — not because there’s a bait-and-switch
          coming later.
        </p>

        <h2>What data we see</h2>
        <p>
          We use two privacy-friendly services from Vercel — Web Analytics (page
          views, referrers, country-level location) and Speed Insights (page
          load performance). Neither one uses cookies, neither one identifies
          you, and both are designed to comply with GDPR. We use Google AdSense
          to show ads — that is a third party and they set their own cookies to
          serve ads. You can read the full breakdown in our{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
        <p>
          We do not sell data. We do not have a data broker partnership. We do
          not have a “data science team” running experiments on your behavior.
          It’s a small site.
        </p>

        <h2>Malware, viruses, and scanning</h2>
        <p>
          {SITE_NAME} is a static Next.js site deployed on Vercel. There’s no
          user-generated upload path, no executable distribution, no PHP stack —
          the most common vectors for drive-by malware simply don’t exist here.
          If your antivirus or browser ever flags a page, please send us the
          exact URL and the warning text so we can investigate.
        </p>

        <h2>Honest limits</h2>
        <p>
          Because processing happens in your browser, very large files can slow
          down your device. A 500MB PDF merged with a 500MB PDF is a lot to ask
          of a phone. If a tool feels slow, it’s almost always because your
          device is doing the work — not because we’re throttling you.
        </p>
        <p>
          Our guides are opinionated. They are <em>not</em> financial, legal,
          medical, or tax advice. We try to be accurate and we cite where it
          matters, but treat every how-to as a starting point, not a prescription.
        </p>

        <h2>Reporting an issue</h2>
        <p>
          Found a bug, a wrong number in a calculator, a broken link, a claim
          that doesn’t hold up? <Link href="/contact">Contact us</Link>. We read
          every message.
        </p>
      </Prose>

      <p className="mt-12 text-xs text-slate-500">
        Last reviewed {formatDate(SITE_UPDATED)}. Every claim on this page is
        reassessed when the site is reviewed end-to-end.
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
