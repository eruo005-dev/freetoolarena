import Link from "next/link";
import {
  SITE_NAME,
  CATEGORIES,
  getPublishedPages,
  pageHref,
  type Category,
  type Page,
} from "@/lib/pages";
import { Container } from "@/components/ui/Container";

/**
 * Picks one representative published page per category so the footer keeps
 * a fixed silhouette as content grows. Priority: highest-intent category
 * slugs first, then natural order.
 */
const FOOTER_CATEGORY_ORDER: Category[] = [
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

function pickCategoryLink(
  pages: Page[],
  category: Category,
): Page | undefined {
  return pages.find((p) => p.category === category);
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const published = getPublishedPages();
  const liveCategories = FOOTER_CATEGORY_ORDER.filter((c) =>
    published.some((p) => p.category === c),
  );

  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="grid h-7 w-7 place-items-center rounded-md bg-brand text-xs font-bold text-white"
              >
                FT
              </span>
              <span className="font-bold text-slate-900">{SITE_NAME}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Free tools and practical guides that solve real problems. No
              sign-up, no ads blocking the content, fast on mobile.
            </p>
          </div>

          <FooterColumn title="Browse">
            <FooterLink href="/tools">All tools</FooterLink>
            <FooterLink href="/guides">All guides</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Popular categories">
            {liveCategories.slice(0, 6).map((c) => {
              const rep = pickCategoryLink(published, c);
              if (!rep) return null;
              return (
                <FooterLink key={c} href={pageHref(rep)}>
                  {CATEGORIES[c].label}
                </FooterLink>
              );
            })}
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink href="/privacy">Privacy policy</FooterLink>
            <FooterLink href="/terms">Terms of service</FooterLink>
            <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}. Built for people who just need the thing to
            work.
          </p>
          <p>
            Nothing here is financial, legal, or medical advice. Use your head.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="text-slate-700 hover:text-brand">
        {children}
      </Link>
    </li>
  );
}
