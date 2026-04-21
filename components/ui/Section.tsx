import type { ReactNode } from "react";

/**
 * Vertical rhythm for top-level page blocks. Pairs with Container.
 * Use `tight` between related sections, `default` between distinct ones.
 */
export function Section({
  children,
  spacing = "default",
  className = "",
  as: Tag = "section",
}: {
  children: ReactNode;
  spacing?: "tight" | "default" | "loose";
  className?: string;
  as?: "section" | "div" | "header";
}) {
  const pad =
    spacing === "tight" ? "py-6" : spacing === "loose" ? "py-16" : "py-10";
  return <Tag className={`${pad} ${className}`}>{children}</Tag>;
}

/**
 * Visual heading row used at the top of homepage sections — title left,
 * "see all" link right.
 */
export function SectionHeading({
  title,
  href,
  hrefLabel = "View all",
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {href && (
        <a
          href={href}
          className="text-sm font-medium text-brand hover:text-brand-dark"
        >
          {hrefLabel} →
        </a>
      )}
    </div>
  );
}
