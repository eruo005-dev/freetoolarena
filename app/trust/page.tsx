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
          Three third parties help this site run. Each one sees a limited
          slice of your visit; here&rsquo;s exactly what and how to opt out:
        </p>
      </Prose>

      <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[620px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">What it sees</th>
              <th className="px-4 py-3">Cookies?</th>
              <th className="px-4 py-3">How to opt out</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            <tr>
              <td className="px-4 py-3 align-top font-medium text-slate-900">
                Vercel Web Analytics
              </td>
              <td className="px-4 py-3 align-top text-slate-700">
                Page views, referrer, country, device type. No cross-site
                identity.
              </td>
              <td className="px-4 py-3 align-top text-slate-700">
                None
              </td>
              <td className="px-4 py-3 align-top text-slate-700">
                Browser privacy mode / DNT respected. See{" "}
                <a
                  href="https://vercel.com/docs/analytics/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand underline"
                >
                  Vercel privacy
                </a>
                .
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 align-top font-medium text-slate-900">
                Vercel Speed Insights
              </td>
              <td className="px-4 py-3 align-top text-slate-700">
                Anonymized page-load timings (TTFB, LCP, CLS). No user
                identity.
              </td>
              <td className="px-4 py-3 align-top text-slate-700">
                None
              </td>
              <td className="px-4 py-3 align-top text-slate-700">
                Browser privacy mode / DNT respected.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 align-top font-medium text-slate-900">
                Google AdSense
              </td>
              <td className="px-4 py-3 align-top text-slate-700">
                Ad impressions, clicks, and whatever targeting signals
                Google uses to personalize ads (IP, user agent, approximate
                location, Google account if signed in).
              </td>
              <td className="px-4 py-3 align-top text-slate-700">
                Yes
              </td>
              <td className="px-4 py-3 align-top text-slate-700">
                Manage at{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand underline"
                >
                  adssettings.google.com
                </a>
                , or use an ad-blocker (this site works without ads).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Prose>
        <p className="text-sm text-slate-600">
          The full legal breakdown, including data-retention periods and your
          rights under GDPR / CCPA, lives in our{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
        <p>
          We do not sell data. We do not have a data broker partnership. We do
          not have a &ldquo;data science team&rdquo; running experiments on
          your behavior. It&rsquo;s a small site.
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
