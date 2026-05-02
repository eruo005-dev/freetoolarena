import type { ReactNode } from "react";

export interface Source {
  /** Display label for the source (publisher or doc title). */
  label: string;
  /** Full URL to the canonical source. */
  url: string;
  /** Optional short note (e.g. "Section 5", "Page 12", "2024 update"). */
  note?: string;
}

export interface MethodologyPanelProps {
  /** Plain-text or short JSX description of the formula(s) used. */
  formula: ReactNode;
  /** What this tool ASSUMES — limits, scope, "not legal/medical/financial advice" caveats. */
  assumes: ReactNode;
  /** Authoritative primary sources for the formula or data. */
  sources: Source[];
  /** ISO date the methodology was last verified by us. */
  lastVerified: string;
  /** Optional: "this number was last updated" if data lives in the tool. */
  dataUpdated?: string;
}

/**
 * Drop-in panel for any tool to publish its methodology + sources.
 * Renders as a collapsible <details> so it doesn't steal vertical space
 * for users who don't care, but is one click away for users who do.
 *
 * The cumulative effect across the whole site: every calculator
 * becomes auditable. Most competitors hide the formula; we publish it.
 *
 * Usage in a tool's registry entry or directly in the tool component:
 *
 *   <MethodologyPanel
 *     formula="Mortgage payment = P × [r(1+r)^n] / [(1+r)^n − 1]"
 *     assumes="Fixed-rate, fully amortizing, no points or PMI."
 *     sources={[
 *       { label: "Consumer Financial Protection Bureau — Mortgage Calculator", url: "https://www.consumerfinance.gov/owning-a-home/loan-options/" },
 *     ]}
 *     lastVerified="2026-04-30"
 *   />
 */
export function MethodologyPanel({
  formula,
  assumes,
  sources,
  lastVerified,
  dataUpdated,
}: MethodologyPanelProps) {
  return (
    <details className="group mt-8 rounded-2xl border border-slate-200 bg-white">
      <summary className="flex cursor-pointer items-center justify-between rounded-2xl px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 group-open:rounded-b-none group-open:border-b group-open:border-slate-200">
        <span className="flex items-center gap-2">
          <ShowMathIcon />
          Show the math + sources
        </span>
        <span aria-hidden className="text-slate-400 transition group-open:rotate-180">
          ⌄
        </span>
      </summary>
      <div className="space-y-4 px-5 py-4 text-sm text-slate-700">
        <section>
          <h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
            Formula
          </h4>
          <div className="prose-body">{formula}</div>
        </section>

        <section>
          <h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
            What this assumes
          </h4>
          <div className="prose-body text-slate-600">{assumes}</div>
        </section>

        {sources.length > 0 && (
          <section>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              Sources
            </h4>
            <ol className="list-decimal space-y-1 pl-5 text-xs leading-relaxed text-slate-600">
              {sources.map((s, i) => (
                <li key={i}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-medium text-brand underline-offset-2 hover:underline"
                  >
                    {s.label}
                  </a>
                  {s.note ? <span className="text-slate-500"> &mdash; {s.note}</span> : null}
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="border-t border-slate-100 pt-3 text-xs text-slate-500">
          <span>
            Methodology last verified: <strong>{lastVerified}</strong>
          </span>
          {dataUpdated && (
            <span className="ml-3">
              Data: <strong>{dataUpdated}</strong>
            </span>
          )}
        </section>
      </div>
    </details>
  );
}

function ShowMathIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="h-4 w-4 text-brand"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 3h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2.5 4h5M7.5 10h5M7.5 13h3"
      />
    </svg>
  );
}
