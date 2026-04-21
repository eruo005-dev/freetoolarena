import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Tap-friendly card surface with consistent border, padding, and hover.
 * Wraps a Link when `href` is supplied; otherwise renders a plain block.
 */
export function Card({
  href,
  children,
  className = "",
  variant = "default",
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted";
}) {
  const surface =
    variant === "muted"
      ? "border border-slate-200 bg-slate-50"
      : "border border-slate-200 bg-white";
  const interactive = href
    ? "hover:border-brand hover:shadow-sm transition"
    : "";
  const cls = `block h-full rounded-xl ${surface} ${interactive} p-5 ${className}`.trim();
  return href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}

export function CardEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand">
      {children}
    </p>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <p className="mb-1 font-semibold text-slate-900">{children}</p>;
}

export function CardBody({ children }: { children: ReactNode }) {
  return <p className="line-clamp-2 text-sm text-slate-600">{children}</p>;
}
