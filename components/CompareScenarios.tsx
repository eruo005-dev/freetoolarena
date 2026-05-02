"use client";

import { useState, type ReactNode } from "react";

/**
 * A/B compare wrapper. Renders the same tool twice side-by-side so users
 * can run two scenarios at once: 15-yr vs 30-yr mortgage, $400 vs $500
 * monthly contribution, etc.
 *
 * Used as a wrapper around any tool component:
 *
 *   <CompareScenarios
 *     labels={["15-year", "30-year"]}
 *     render={(initialOverrides) => (
 *       <MortgageCalculator {...initialOverrides} />
 *     )}
 *     scenarioInitial={[
 *       { initialYears: 15, initialRate: 5.5 },
 *       { initialYears: 30, initialRate: 6.5 },
 *     ]}
 *   />
 *
 * The wrapper is opt-in per tool because each calculator needs to
 * accept initial-value props (most of our top calculators already do).
 */
export interface CompareScenariosProps<T> {
  /** Two short labels rendered above each scenario column. */
  labels: [string, string];
  /** Function that renders the tool given a scenario's initial props. */
  render: (initialOverrides: T) => ReactNode;
  /** Initial-prop overrides for each scenario, in order. */
  scenarioInitial: [T, T];
  /** Show or hide the comparison UI by default. */
  defaultOpen?: boolean;
}

export function CompareScenarios<T>({
  labels,
  render,
  scenarioInitial,
  defaultOpen = true,
}: CompareScenariosProps<T>) {
  const [open, setOpen] = useState(defaultOpen);

  if (!open) {
    return (
      <div className="my-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
        <p className="text-sm text-slate-600">
          Want to compare two scenarios at once? Try the A/B compare mode.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-dark"
        >
          Open compare mode
        </button>
      </div>
    );
  }

  return (
    <div className="my-6 rounded-2xl border-2 border-brand/20 bg-white p-1">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-700">A/B compare mode</h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-slate-500 hover:text-rose-600"
          aria-label="Close compare mode"
        >
          Close
        </button>
      </div>

      <div className="grid gap-1 p-1 lg:grid-cols-2">
        {scenarioInitial.map((initial, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              Scenario {String.fromCharCode(65 + i)} &middot; {labels[i]}
            </div>
            <div className="rounded-lg bg-white p-3">{render(initial)}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs text-slate-500">
        Each side runs independently &mdash; tweak inputs in either scenario and the other
        keeps its values. The share button captures only the most recent edit. To deep-link
        a comparison, take a screenshot or copy each scenario&rsquo;s URL separately.
      </div>
    </div>
  );
}
