import Link from "next/link";
import { SITE_NAME } from "@/lib/pages";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
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
            <FooterLink href="/best">Curated lists</FooterLink>
            <FooterLink href="/documents">Document templates</FooterLink>
            <FooterLink href="/embed">Embed our tools</FooterLink>
            <FooterLink href="/compare">Comparisons</FooterLink>
            <FooterLink href="/learn">Glossary</FooterLink>
            <FooterLink href="/favorites">Favorites</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Curated lists">
            <FooterLink href="/best/free-tools-for-freelancers">
              For freelancers
            </FooterLink>
            <FooterLink href="/best/free-tools-for-students">
              For students
            </FooterLink>
            <FooterLink href="/best/free-dev-tools">For developers</FooterLink>
            <FooterLink href="/best/free-seo-tools">For SEO</FooterLink>
            <FooterLink href="/best/free-finance-calculators">
              Finance calculators
            </FooterLink>
          </FooterColumn>

          <FooterColumn title="Guide sections">
            <FooterLink href="/guides/category/ai">AI & LLMs</FooterLink>
            <FooterLink href="/guides/category/how-to">How-To & Life</FooterLink>
            <FooterLink href="/guides/category/business">Money & Business</FooterLink>
            <FooterLink href="/guides/category/technical">Developers</FooterLink>
            <FooterLink href="/guides/category/productivity">Productivity</FooterLink>
            <FooterLink href="/guides/category/design-media">Design & Media</FooterLink>
          </FooterColumn>

          <FooterColumn title="Safety & legal">
            <FooterLink href="/trust">Trust & safety</FooterLink>
            <FooterLink href="/how-it-works">How our tools work</FooterLink>
            <FooterLink href="/security">Security</FooterLink>
            <FooterLink href="/methodology">Tool methodology</FooterLink>
            <FooterLink href="/editorial">Editorial policy</FooterLink>
            <FooterLink href="/ai-policy">AI content policy</FooterLink>
            <FooterLink href="/privacy">Privacy policy</FooterLink>
            <FooterLink href="/disclaimers">Disclaimers</FooterLink>
            <FooterLink href="/terms">Terms of service</FooterLink>
            <FooterLink href="/accessibility">Accessibility</FooterLink>
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
