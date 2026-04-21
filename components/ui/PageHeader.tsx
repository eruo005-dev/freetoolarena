import type { ReactNode } from "react";

/**
 * Unified page title treatment. Eyebrow (category/type), H1, supporting copy,
 * optional right-side meta (e.g., last-updated). Use once per page.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow?: ReactNode;
  title: string;
  lede?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h1>
      {lede && (
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
          {lede}
        </p>
      )}
      {meta && <div className="mt-3 text-sm text-slate-500">{meta}</div>}
    </header>
  );
}
