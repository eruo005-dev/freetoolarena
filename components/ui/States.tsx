import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Small, shared primitives for empty / error / loading states. Keep them
 * visually quiet so they compose inside any page without drawing eye
 * away from the primary CTA.
 */

interface BaseProps {
  title: string;
  body?: ReactNode;
  action?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  className?: string;
}

export function EmptyState({
  title,
  body,
  action,
  secondaryAction,
  className = "",
}: BaseProps) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center ${className}`}
    >
      <p className="text-base font-semibold text-slate-900">{title}</p>
      {body && <div className="mt-2 text-sm text-slate-600">{body}</div>}
      {(action || secondaryAction) && (
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {action && (
            <Link
              href={action.href}
              className="inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              {action.label}
            </Link>
          )}
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-brand"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  body,
  action,
  className = "",
}: Partial<BaseProps> & { title?: string }) {
  return (
    <div
      className={`rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-900 ${className}`}
      role="alert"
    >
      <p className="font-semibold">{title}</p>
      {body && <div className="mt-1.5 text-sm text-rose-900/80">{body}</div>}
      {action && (
        <Link
          href={action.href}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-rose-700 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-rose-800"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function LoadingState({
  label = "Loading…",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 rounded-xl bg-slate-50 p-6 text-sm text-slate-600 ${className}`}
      role="status"
      aria-live="polite"
    >
      <span
        aria-hidden
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700"
      />
      {label}
    </div>
  );
}
