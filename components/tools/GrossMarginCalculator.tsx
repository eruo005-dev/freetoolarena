"use client";

import { useMemo, useState } from "react";

const BENCHMARKS: { name: string; range: string; low: number; high: number }[] = [
  { name: "SaaS / software", range: "75% – 85%", low: 75, high: 85 },
  { name: "Consumer hardware", range: "20% – 40%", low: 20, high: 40 },
  { name: "Marketplace", range: "15% – 25%", low: 15, high: 25 },
  { name: "Professional services", range: "40% – 60%", low: 40, high: 60 },
];

export function GrossMarginCalculator() {
  const [revenue, setRevenue] = useState(120000);
  const [cogs, setCogs] = useState(30000);
  const [showBreakdown, setShowBreakdown] = useState(true);
  const [hosting, setHosting] = useState(8000);
  const [payments, setPayments] = useState(4000);
  const [support, setSupport] = useState(12000);
  const [licensing, setLicensing] = useState(6000);

  const result = useMemo(() => {
    if (!Number.isFinite(revenue) || !Number.isFinite(cogs) || revenue <= 0 || cogs < 0) {
      return null;
    }
    const grossProfit = revenue - cogs;
    const marginPct = (grossProfit / revenue) * 100;

    let industry = "SaaS / software";
    let tone = "text-slate-700 bg-slate-50 border-slate-200";
    let note = "";
    if (marginPct >= 75) {
      industry = "SaaS / software range";
      tone = "text-emerald-700 bg-emerald-50 border-emerald-200";
      note = "Top-quartile software margin. Leaves plenty of room for R&D and S&M.";
    } else if (marginPct >= 40) {
      industry = "Professional services range";
      tone = "text-emerald-700 bg-emerald-50 border-emerald-200";
      note = "Healthy margin for services or mid-complexity SaaS.";
    } else if (marginPct >= 20) {
      industry = "Consumer hardware / marketplace range";
      tone = "text-amber-700 bg-amber-50 border-amber-200";
      note = "Thin margin &mdash; scale and operating efficiency do the heavy lifting.";
    } else {
      industry = "Below typical benchmarks";
      tone = "text-rose-700 bg-rose-50 border-rose-200";
      note = "Investigate pricing, COGS mix, and whether this is truly gross (not net) margin.";
    }

    const breakdownTotal = hosting + payments + support + licensing;

    return { grossProfit, marginPct, industry, tone, note, breakdownTotal };
  }, [revenue, cogs, hosting, payments, support, licensing]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Revenue ($)</span>
          <input
            type="number"
            min={0}
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">COGS ($)</span>
          <input
            type="number"
            min={0}
            value={cogs}
            onChange={(e) => setCogs(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={showBreakdown}
          onChange={(e) => setShowBreakdown(e.target.checked)}
          className="rounded border-slate-300"
        />
        <span>Show COGS breakdown (optional)</span>
      </label>

      {showBreakdown && (
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-3">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Optional COGS breakdown
          </p>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-xs font-medium text-slate-600 mb-1">Hosting ($)</span>
              <input
                type="number"
                min={0}
                value={hosting}
                onChange={(e) => setHosting(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-slate-600 mb-1">
                Payment processing ($)
              </span>
              <input
                type="number"
                min={0}
                value={payments}
                onChange={(e) => setPayments(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-slate-600 mb-1">Support ($)</span>
              <input
                type="number"
                min={0}
                value={support}
                onChange={(e) => setSupport(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-slate-600 mb-1">Licensing ($)</span>
              <input
                type="number"
                min={0}
                value={licensing}
                onChange={(e) => setLicensing(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </label>
          </div>
          {result && (
            <p className="text-xs text-slate-500">
              Breakdown total: <span className="font-semibold">{fmt(result.breakdownTotal)}</span>
              {result.breakdownTotal !== cogs &&
                ` (differs from the COGS field above by ${fmt(Math.abs(result.breakdownTotal - cogs))})`}
            </p>
          )}
        </div>
      )}

      {result ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                Gross margin
              </p>
              <p className="text-4xl font-bold text-brand tabular-nums">
                {result.marginPct.toFixed(1) + "%"}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                Gross profit
              </p>
              <p className="text-4xl font-bold text-slate-800 tabular-nums">
                {fmt(result.grossProfit)}
              </p>
              <p className="text-sm text-slate-600 mt-1">Revenue &minus; COGS</p>
            </div>
          </div>

          <div className={`rounded-xl border p-5 ${result.tone}`}>
            <p className="text-xs uppercase tracking-wide font-semibold mb-1">Industry fit</p>
            <p className="text-lg font-semibold mb-1">{result.industry}</p>
            <p className="text-sm">{result.note}</p>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-5">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3">
              Industry benchmark reference
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="pb-2 font-medium">Industry</th>
                  <th className="pb-2 font-medium">Typical range</th>
                  <th className="pb-2 font-medium text-right">You vs range</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARKS.map((b) => {
                  const within = result.marginPct >= b.low && result.marginPct <= b.high;
                  const above = result.marginPct > b.high;
                  const label = within ? "In range" : above ? "Above" : "Below";
                  const labelTone = within
                    ? "text-emerald-700"
                    : above
                      ? "text-slate-500"
                      : "text-rose-700";
                  return (
                    <tr key={b.name} className="border-t border-slate-100">
                      <td className="py-2 text-slate-800">{b.name}</td>
                      <td className="py-2 text-slate-600 tabular-nums">{b.range}</td>
                      <td className={`py-2 text-right font-semibold ${labelTone}`}>{label}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-sm text-rose-600">
          Enter positive revenue and non-negative COGS.
        </p>
      )}
    </div>
  );
}
