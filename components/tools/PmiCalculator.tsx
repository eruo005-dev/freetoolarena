"use client";

import { useMemo, useState } from "react";

type ScoreBand = "760+" | "720-759" | "680-719" | "640-679";

// Annual PMI rates as % of loan, by credit band + LTV band
// Rough industry matrix
const PMI_MATRIX: Record<ScoreBand, { ltv95: number; ltv90: number; ltv85: number; ltv80: number }> = {
  "760+": { ltv95: 0.3, ltv90: 0.2, ltv85: 0.17, ltv80: 0.15 },
  "720-759": { ltv95: 0.55, ltv90: 0.35, ltv85: 0.25, ltv80: 0.2 },
  "680-719": { ltv95: 0.95, ltv90: 0.65, ltv85: 0.45, ltv80: 0.3 },
  "640-679": { ltv95: 1.45, ltv90: 1.1, ltv85: 0.85, ltv80: 0.55 },
};

const money = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : "—";

const moneyExact = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : "—";

function rateFor(score: ScoreBand, ltv: number): number {
  const m = PMI_MATRIX[score];
  if (ltv > 95) return m.ltv95 + 0.3;
  if (ltv > 90) return m.ltv95;
  if (ltv > 85) return m.ltv90;
  if (ltv > 80) return m.ltv85;
  return m.ltv80;
}

export function PmiCalculator() {
  const [price, setPrice] = useState(425000);
  const [downPct, setDownPct] = useState(10);
  const [score, setScore] = useState<ScoreBand>("720-759");

  const result = useMemo(() => {
    const p = Number.isFinite(price) ? price : 0;
    const dp = Number.isFinite(downPct) ? Math.min(Math.max(downPct, 0), 100) : 0;
    const loan = p * (1 - dp / 100);
    const ltv = p > 0 ? (loan / p) * 100 : 0;
    const required = dp < 20;

    const annualRate = rateFor(score, ltv);
    const annualPmi = required ? loan * (annualRate / 100) : 0;
    const monthlyPmi = annualPmi / 12;

    // Years of PMI: until LTV hits 78% via principal paydown, capped at 11 yrs.
    // Approximation using a 30-year, 7% rate amortization schedule.
    const r = 0.07 / 12;
    const n = 360;
    const monthlyPi = loan > 0 ? (loan * r) / (1 - Math.pow(1 + r, -n)) : 0;
    let balance = loan;
    const targetBalance = p * 0.78;
    let months = 0;
    for (let i = 1; i <= 132; i++) {
      if (balance <= targetBalance) break;
      const interest = balance * r;
      const principal = monthlyPi - interest;
      balance -= principal;
      months = i;
    }
    if (balance > targetBalance) months = 132; // 11 yr cap
    const years = months / 12;
    const totalPaid = monthlyPmi * months;

    return {
      loan,
      ltv,
      required,
      annualRate,
      monthlyPmi,
      annualPmi,
      months,
      years,
      totalPaid,
    };
  }, [price, downPct, score]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Home price</span>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Down payment %</span>
          <input
            type="number"
            min={0}
            max={100}
            step={0.5}
            value={downPct}
            onChange={(e) => setDownPct(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-slate-700">Credit score</span>
          <select
            value={score}
            onChange={(e) => setScore(e.target.value as ScoreBand)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value="760+">760 and above (excellent)</option>
            <option value="720-759">720&ndash;759 (very good)</option>
            <option value="680-719">680&ndash;719 (good)</option>
            <option value="640-679">640&ndash;679 (fair)</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">Loan amount &middot; LTV</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">
          {money(result.loan)} <span className="text-base text-slate-500">&middot; {result.ltv.toFixed(1)}%</span>
        </div>
      </div>

      {!result.required ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm">
          <div className="text-base font-semibold text-emerald-700">No PMI required &check;</div>
          <p className="mt-1 text-emerald-800">
            Down payment is 20% or more, so lenders won&rsquo;t require private mortgage insurance
            on a conventional loan.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Monthly PMI</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {moneyExact(result.monthlyPmi)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Annual PMI</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {money(result.annualPmi)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">PMI rate</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.annualRate.toFixed(2)}%/yr
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Duration</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.years.toFixed(1)} yrs
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
              <div className="text-xs uppercase tracking-wide text-slate-500">Total PMI paid</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {money(result.totalPaid)}
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            PMI typically drops off automatically once the loan balance reaches 78% of the
            original home value, or after 11 years &mdash; whichever comes first. Borrowers can
            request cancellation at 80% LTV.
          </p>
        </>
      )}
    </div>
  );
}
