import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/lib/pages";
import { buildStaticMetadata, SITE_UPDATED } from "@/lib/seo";

export const metadata: Metadata = buildStaticMetadata({
  title: "Public API",
  description: `${SITE_NAME} public JSON API — call calculator logic directly. Free, no key required, CORS-enabled. Mortgage, compound interest, tip, BMI endpoints documented.`,
  path: "/api",
});

const ENDPOINTS: { name: string; path: string; example: string; result: string }[] = [
  {
    name: "Mortgage payment",
    path: "/api/tools/mortgage",
    example: `${SITE_URL}/api/tools/mortgage?principal=400000&annualRate=6.5&years=30`,
    result: `{
  "monthlyPayment": 2528.27,
  "totalInterest": 510178.46,
  "totalPaid": 910178.46,
  "payments": 360,
  "input": { "principal": 400000, "annualRate": 6.5, "years": 30 },
  "_meta": {
    "tool": "mortgage-calculator",
    "lastVerified": "2026-04-30",
    "formula": "M = P × [r(1+r)^n] / [(1+r)^n − 1]",
    "sources": [...]
  }
}`,
  },
  {
    name: "Compound interest",
    path: "/api/tools/compound-interest",
    example: `${SITE_URL}/api/tools/compound-interest?principal=10000&annualRate=7&years=30&monthlyContribution=500`,
    result: `{
  "futureValue": 685693.82,
  "totalContributed": 190000,
  "totalInterest": 495693.82,
  "input": { "principal": 10000, "annualRate": 7, "years": 30, "monthlyContribution": 500, "compoundingPerYear": 12 },
  "_meta": { ... }
}`,
  },
  {
    name: "Tip calculator",
    path: "/api/tools/tip",
    example: `${SITE_URL}/api/tools/tip?bill=84.50&tipPercent=18&people=3`,
    result: `{
  "tipAmount": 15.21,
  "total": 99.71,
  "perPerson": 33.24,
  "input": { "bill": 84.50, "tipPercent": 18, "people": 3 },
  "_meta": { ... }
}`,
  },
  {
    name: "BMI calculator",
    path: "/api/tools/bmi",
    example: `${SITE_URL}/api/tools/bmi?weightKg=72&heightM=1.78`,
    result: `{
  "bmi": 22.72,
  "category": "healthy",
  "input": { "weightKg": 72, "heightM": 1.78 },
  "_meta": { ... }
}`,
  },
];

export default function ApiPage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "API", href: "/api" }]} />
      <PageHeader
        eyebrow="Developer API"
        title="Public JSON API for our calculators."
        lede={`Call ${SITE_NAME}'s calculation logic directly from your code. Free, no API key required, CORS-enabled, edge-cached. Same math as the web tools, with primary-source citations in every response.`}
      />

      <Prose>
        <h2>Why this exists</h2>
        <p>
          Most free-tool sites lock their math behind a UI. Build a finance dashboard, a Slack bot, a
          script — and you&rsquo;re re-implementing mortgage formulas yourself, hoping you got the
          rate-conversion right. We thought that was silly. Here&rsquo;s a stable, cited, free public
          API for the calculators we already publish.
        </p>

        <h2>Conventions</h2>
        <ul>
          <li><strong>HTTP GET</strong> with query parameters. No body. No POST.</li>
          <li><strong>JSON in / JSON out.</strong> All numbers; no strings unless documented.</li>
          <li>
            <strong>CORS open</strong> (<code>Access-Control-Allow-Origin: *</code>). Call from any
            domain, browser or server.
          </li>
          <li><strong>Edge-cached at 24h.</strong> Same params return cached responses; you don&rsquo;t pay our compute on repeat calls.</li>
          <li>
            <strong>Every response includes <code>_meta</code></strong> with the formula, sources, and{" "}
            <code>lastVerified</code> date. No black boxes.
          </li>
          <li><strong>No API key, no auth, no rate limits documented.</strong> Be reasonable.</li>
        </ul>

        <h2>Endpoints</h2>
        {ENDPOINTS.map((e) => (
          <div key={e.path} className="my-7 rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mt-0">{e.name}</h3>
            <p className="text-sm">
              <code>GET {e.path}</code>
            </p>
            <p className="mt-2 text-xs text-slate-500">Example:</p>
            <pre className="overflow-x-auto rounded bg-slate-900 p-3 text-xs text-slate-100">
              <code>{e.example}</code>
            </pre>
            <p className="mt-2 text-xs text-slate-500">Sample response:</p>
            <pre className="overflow-x-auto rounded bg-slate-50 p-3 text-xs text-slate-700">
              <code>{e.result}</code>
            </pre>
          </div>
        ))}

        <h2>Errors</h2>
        <p>
          Invalid or missing inputs return <code>HTTP 400</code> with a helpful{" "}
          <code>{"{ error, message, example }"}</code> body. Server errors return <code>500</code>.
          Successful calls always return <code>200</code>.
        </p>

        <h2>Roadmap</h2>
        <p>
          More endpoints are coming for: paycheck, ROI, retirement, macros, BMR/TDEE, currency
          conversion, password strength, embeddings cost, AI agent loop cost, and document tooling
          where it makes sense (mail-merge, address-format).
        </p>
        <p>
          Want a specific tool exposed on the API? <a href="/contact">Contact us</a> with the use
          case — we&rsquo;ll prioritize.
        </p>

        <h2>Stability</h2>
        <p>
          Endpoints documented here are <strong>v1 stable</strong>. We&rsquo;ll only break them with
          a deprecation window and a versioned URL. Methodology changes (e.g. updated tax brackets)
          happen in place but are reflected in <code>_meta.lastVerified</code>.
        </p>

        <p className="mt-10 text-sm text-slate-500">
          Last reviewed {SITE_UPDATED}. See also: <a href="/source">source &amp; transparency</a>,{" "}
          <a href="/methodology">tool methodology</a>.
        </p>
      </Prose>
    </Container>
  );
}
