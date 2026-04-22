import Link from "next/link";
import {
  getPublishedTools,
  getPublishedGuides,
  pageHref,
  SITE_NAME,
  CATEGORIES,
  type Category,
  type Page,
} from "@/lib/pages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/Card";
import { TrustBar } from "@/components/TrustBar";
import { RecentlyUsed } from "@/components/RecentlyUsed";
import { SITE_UPDATED } from "@/lib/seo";

const HOMEPAGE_CATEGORY_ORDER: Category[] = [
  "money",
  "productivity",
  "converters",
  "coding",
  "career",
  "health",
  "writing",
  "home",
  "social",
  "dev",
  "text",
  "units",
  "random",
];

export default function HomePage() {
  const tools = getPublishedTools();
  const guides = getPublishedGuides();
  const all = [...tools, ...guides];
  const liveCategories = HOMEPAGE_CATEGORY_ORDER.filter((c) =>
    all.some((p) => p.category === c),
  );

  return (
    <Container className="space-y-20 pb-20 pt-14 sm:space-y-24 sm:pt-20">
      {/* Hero */}
      <section className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-brand">
          {tools.length} tools · {guides.length} guides · no sign-up
        </p>
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
          Small tools and clear guides, minus the fluff.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          {SITE_NAME} collects the calculators, converters, and how-tos you keep
          Googling — in one place, on one page each. Nothing runs behind the
          scenes. Nothing asks for your email.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <ButtonLink href="/tools" variant="primary" size="lg">
            Browse {tools.length} tools
          </ButtonLink>
          <ButtonLink href="/guides" variant="secondary" size="lg">
            Read the guides
          </ButtonLink>
        </div>
        <TrustBar className="mt-8" />
      </section>

      {/* Recently used (hydrates, renders only if user has history) */}
      <RecentlyUsed />

      {/* Popular tools */}
      {tools.length > 0 && (
        <section>
          <SectionHeading title="Popular tools" href="/tools" hrefLabel="All tools" />
          <CardGrid pages={tools.slice(0, 6)} />
        </section>
      )}

      {/* Popular guides */}
      {guides.length > 0 && (
        <section>
          <SectionHeading title="Popular guides" href="/guides" hrefLabel="All guides" />
          <CardGrid pages={guides.slice(0, 6)} />
        </section>
      )}

      {/* By category */}
      {liveCategories.length > 0 && (
        <section>
          <SectionHeading title="Browse by category" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {liveCategories.map((c) => {
              const inCat = all.filter((p) => p.category === c);
              const sampleTool = inCat.find((p) => p.type === "tool");
              const sampleGuide = inCat.find((p) => p.type === "article");
              const counts = {
                tools: inCat.filter((p) => p.type === "tool").length,
                guides: inCat.filter((p) => p.type === "article").length,
              };
              return (
                <li key={c}>
                  <CategoryCard
                    category={c}
                    sampleTool={sampleTool}
                    sampleGuide={sampleGuide}
                    counts={counts}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Trust strip */}
      <section>
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3 sm:p-8">
          <TrustItem
            title="Runs in your browser"
            body="Inputs never leave your device. No accounts, no tracking scripts, no cookie wall."
          />
          <TrustItem
            title="Written to be useful"
            body="Short, specific guides — the kind a friend would send you, not a 2,000-word intro."
          />
          <TrustItem
            title="Fast on any device"
            body="Static pages and tiny bundles. Works the same on a slow phone as a desktop."
          />
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">
          Last reviewed end-to-end {formatUpdated(SITE_UPDATED)}.
        </p>
      </section>
    </Container>
  );
}

function CardGrid({ pages }: { pages: Page[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {pages.map((p) => (
        <li key={p.slug}>
          <Card href={pageHref(p)}>
            <CardEyebrow>
              {p.type === "tool" ? "Tool" : "Guide"} ·{" "}
              {CATEGORIES[p.category].label}
            </CardEyebrow>
            <CardTitle>{p.h1}</CardTitle>
            <CardBody>{p.description}</CardBody>
          </Card>
        </li>
      ))}
    </ul>
  );
}

function CategoryCard({
  category,
  sampleTool,
  sampleGuide,
  counts,
}: {
  category: Category;
  sampleTool?: Page;
  sampleGuide?: Page;
  counts: { tools: number; guides: number };
}) {
  const c = CATEGORIES[category];
  const countBits: string[] = [];
  if (counts.tools) countBits.push(`${counts.tools} tool${counts.tools === 1 ? "" : "s"}`);
  if (counts.guides) countBits.push(`${counts.guides} guide${counts.guides === 1 ? "" : "s"}`);
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand hover:shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        {c.label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.blurb}</p>
      <p className="mt-3 text-xs text-slate-500">{countBits.join(" · ")}</p>
      <div className="mt-4 flex flex-col gap-1.5 text-sm">
        {sampleTool && (
          <Link
            href={pageHref(sampleTool)}
            className="font-medium text-brand hover:text-brand-dark"
          >
            {sampleTool.h1} →
          </Link>
        )}
        {sampleGuide && (
          <Link
            href={pageHref(sampleGuide)}
            className="font-medium text-slate-700 hover:text-brand"
          >
            {sampleGuide.h1} →
          </Link>
        )}
      </div>
    </div>
  );
}

function TrustItem({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}

function formatUpdated(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  const d = new Date(Date.UTC(y, (m ?? 1) - 1, 1));
  return d.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
