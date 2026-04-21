import Link from "next/link";
import { SITE_URL } from "@/lib/pages";

export interface Crumb {
  label: string;
  href: string; // site-relative, e.g. "/tools"
}

/**
 * Renders visible breadcrumbs and emits matching BreadcrumbList JSON-LD so
 * search engines can render the trail in SERPs.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  if (trail.length === 0) return null;
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href}`,
    })),
  };
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-slate-500"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {trail.map((c, i) => {
            const isLast = i === trail.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {isLast ? (
                  <span
                    className="text-slate-700"
                    aria-current="page"
                  >
                    {c.label}
                  </span>
                ) : (
                  <Link
                    href={c.href}
                    className="hover:text-brand hover:underline underline-offset-2"
                  >
                    {c.label}
                  </Link>
                )}
                {!isLast && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
