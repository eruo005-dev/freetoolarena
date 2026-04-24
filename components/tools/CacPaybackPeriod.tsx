"use client";

import { useMemo, useState } from "react";

export function CacPaybackPeriod() {
  const [cac, setCac] = useState(1200);
  const [monthlyRevenue, setMonthlyRevenue] = useState(99);
  const [margin, setMargin] = useState(75);

  const result = useMemo(() => {
    if (
      !Number.isFinite(cac) ||
      !Number.isFinite(monthlyRevenue) ||
      !Number.isFinite(margin) ||
      cac <= 0 ||
      monthlyRevenue <= 0 ||
      margin <= 0 ||
      margin > 100
    ) {
      return null;
    }
    const marginFrac = margin / 100;
    const contributionPerMonth = monthlyRevenue * marginFrac;
    const paybackMonths = cac / contributionPerMonth;
    const paybackYears = paybackMonths / 12;

    let tier: string;
    let tone: string;
    let verdict: string;
    if (paybackMonths < 12) {
      tier = "Great — SMB SaaS standard";
      tone = "text-emerald-700 bg-emerald-50 border-emerald-200";
      verdict = "Fast capital recycling. You can reinvest in acquisition aggressively.";
    } else if (paybackMonths < 18) {
      tier = "Good — acceptable mid-market";
      tone = "text-emerald-700 bg-emerald-50 border-emerald-200";
      verdict = "Healthy for mid-market SaaS. Monitor churn closely.";
    } else if (paybackMonths < 24) {
      tier = "Concerning — cash-intensive";
      tone = "text-amber-700 bg-amber-50 border-amber-200";
      verdict =
        "You need deep capital reserves. Typical only if LTV is very high or expansion revenue is strong.";
    } else {
      tier = "Dangerous unless enterprise";
      tone = "text-rose-700 bg-rose-50 border-rose-200";
      verdict =
        "Only tolerable with multi-year enterprise contracts and low churn. Otherwise, revisit CAC or pricing.";
    }

    return { paybackMonths, paybackYears, contributionPerMonth, tier, tone, verdict };
  }, [cac, monthlyRevenue, margin]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">CAC ($)</span>
          <input
            type="number"
            min={0}
            value={cac}
            onChange={(e) => setCac(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Avg monthly revenue / customer ($)
          </span>
          <input
            type="number"
            min={0}
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Gross margin (%)</span>
          <input
            type="number"
            min={1}
            max={100}
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      {result ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                Payback period
              </p>
              <p className="text-4xl font-bold text-brand tabular-nums">
                {result.paybackMonths.toFixed(1)}
              </p>
              <p className="text-sm text-slate-600 mt-1">months</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                Full recovery
              </p>
              <p className="text-4xl font-bold text-slate-800 tabular-nums">
                {result.paybackYears.toFixed(2)}
              </p>
              <p className="text-sm text-slate-600 mt-1">years of gross profit</p>
            </div>
          </div>

          <div className={`rounded-xl border p-5 ${result.tone}`}>
            <p className="text-xs uppercase tracking-wide font-semibold mb-1">Tier</p>
            <p className="text-lg font-semibold mb-2">{result.tier}</p>
            <p className="text-sm">{result.verdict}</p>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-5">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3">
              How the math works
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">Monthly revenue / customer</dt>
                <dd className="font-semibold text-slate-900 tabular-nums">{fmt(monthlyRevenue)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">
                  Gross margin contribution ({margin.toFixed(1) + "%"})
                </dt>
                <dd className="font-semibold text-slate-900 tabular-nums">
                  {fmt(result.contributionPerMonth)} / mo
                </dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                <dt className="font-semibold text-slate-800">CAC / monthly contribution</dt>
                <dd className="font-bold text-brand tabular-nums">
                  {result.paybackMonths.toFixed(1)} months
                </dd>
              </div>
            </dl>
            <p className="text-xs text-slate-500 mt-3">
              Shorter payback = faster capital recycling for growth investment.
            </p>
          </div>
        </>
      ) : (
        <p className="text-sm text-rose-600">
          Enter positive CAC, monthly revenue, and margin (1&ndash;100%).
        </p>
      )}
    </div>
  );
}
