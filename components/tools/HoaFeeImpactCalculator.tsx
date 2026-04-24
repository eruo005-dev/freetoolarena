"use client";

import { useMemo, useState } from "react";

const money = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : "—";

// Present value of a monthly payment stream at monthly rate r over n months
function presentValue(pmt: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (!(pmt > 0) || !(n > 0)) return 0;
  if (r === 0) return pmt * n;
  return (pmt * (1 - Math.pow(1 + r, -n))) / r;
}

export function HoaFeeImpactCalculator() {
  const [hoa, setHoa] = useState(325);
  const [rate, setRate] = useState(7.0);
  const [term, setTerm] = useState(30);

  const result = useMemo(() => {
    const h = Number.isFinite(hoa) ? Math.max(hoa, 0) : 0;
    const r = Number.isFinite(rate) ? rate : 0;
    const t = Number.isFinite(term) ? term : 30;
    const loanReduction = presentValue(h, r, t);
    const annual = h * 12;
    const thirtyYear = h * 12 * 30;

    // Educational breakdown of where a typical HOA dollar goes (rough %)
    const buckets = [
      { label: "Landscaping & common grounds", pct: 0.22 },
      { label: "Reserve fund (future repairs)", pct: 0.2 },
      { label: "Trash, water, sewer, utilities", pct: 0.15 },
      { label: "Insurance (master policy)", pct: 0.12 },
      { label: "Management company fees", pct: 0.1 },
      { label: "Amenities (pool, gym, clubhouse)", pct: 0.11 },
      { label: "Security & pest control", pct: 0.06 },
      { label: "Admin, legal, accounting", pct: 0.04 },
    ];

    return { loanReduction, annual, thirtyYear, buckets };
  }, [hoa, rate, term]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Monthly HOA fee</span>
          <input
            type="number"
            min={0}
            step={5}
            value={hoa}
            onChange={(e) => setHoa(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Mortgage rate %</span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Loan term (years)</span>
          <select
            value={term}
            onChange={(e) => setTerm(parseInt(e.target.value, 10))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value={30}>30 years</option>
            <option value={20}>20 years</option>
            <option value={15}>15 years</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">
          Equivalent loan reduction (lost buying power)
        </div>
        <div className="text-2xl font-semibold tabular-nums text-brand">
          {money(result.loanReduction)}
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Lenders count HOA dues in your DTI, so a{" "}
          <strong>{money(hoa)}/mo</strong> HOA is roughly equivalent to giving up{" "}
          <strong>{money(result.loanReduction)}</strong> of mortgage you could otherwise qualify
          for at {rate.toFixed(2)}% over {term} years.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Annual HOA cost</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {money(result.annual)}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">30-year HOA cost</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {money(result.thirtyYear)}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 text-sm font-semibold text-slate-700">
          What {money(hoa)}/mo typically buys you
        </div>
        <ul className="divide-y divide-slate-100 text-sm">
          {result.buckets.map((b) => (
            <li key={b.label} className="flex items-center justify-between py-2">
              <span className="text-slate-600">{b.label}</span>
              <span className="font-mono tabular-nums text-slate-900">
                {money(hoa * b.pct)}/mo <span className="text-slate-400">({Math.round(b.pct * 100)}%)</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500">
          Allocations are rough industry averages &mdash; your HOA&rsquo;s audited budget is the
          only source of truth. High reserve contributions are usually a good sign.
        </p>
      </div>
    </div>
  );
}
