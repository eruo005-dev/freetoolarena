"use client";

import { useMemo, useState } from "react";

export function RoasCalculator() {
  const [spend, setSpend] = useState(10000);
  const [revenue, setRevenue] = useState(42000);
  const [margin, setMargin] = useState(55);

  const result = useMemo(() => {
    if (
      !Number.isFinite(spend) ||
      !Number.isFinite(revenue) ||
      !Number.isFinite(margin) ||
      spend <= 0 ||
      margin <= 0 ||
      margin > 100
    ) {
      return null;
    }
    const roas = revenue / spend;
    const marginFrac = margin / 100;
    const breakEvenRoas = 1 / marginFrac;
    const profitBeforeMargin = revenue - spend;
    const actualProfit = revenue * marginFrac - spend;

    let tier: string;
    let tierTone: string;
    if (roas >= 4) {
      tier = "Strong — scale aggressively";
      tierTone = "text-emerald-700 bg-emerald-50 border-emerald-200";
    } else if (roas >= 3) {
      tier = "Good — healthy return";
      tierTone = "text-emerald-700 bg-emerald-50 border-emerald-200";
    } else if (roas >= 2) {
      tier = "Break-even zone — watch margins";
      tierTone = "text-amber-700 bg-amber-50 border-amber-200";
    } else {
      tier = "Losing money — pause or optimize";
      tierTone = "text-rose-700 bg-rose-50 border-rose-200";
    }

    return {
      roas,
      breakEvenRoas,
      profitBeforeMargin,
      actualProfit,
      tier,
      tierTone,
      profitable: actualProfit > 0,
    };
  }, [spend, revenue, margin]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Ad spend ($)</span>
          <input
            type="number"
            min={0}
            value={spend}
            onChange={(e) => setSpend(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Revenue from ads ($)</span>
          <input
            type="number"
            min={0}
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
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
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">ROAS</p>
              <p className="text-3xl font-bold text-brand tabular-nums">
                {result.roas.toFixed(2)}x
              </p>
              <p className="text-sm text-slate-600 mt-1">
                ${(result.roas).toFixed(2)} revenue per $1 spent
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                Break-even ROAS
              </p>
              <p className="text-3xl font-bold text-slate-800 tabular-nums">
                {result.breakEvenRoas.toFixed(2)}x
              </p>
              <p className="text-sm text-slate-600 mt-1">
                At {margin.toFixed(1)}% margin you need this ROAS to cover ad cost
              </p>
            </div>
          </div>

          <div className={`rounded-xl border p-5 ${result.tierTone}`}>
            <p className="text-xs uppercase tracking-wide font-semibold mb-1">Performance tier</p>
            <p className="text-lg font-semibold">{result.tier}</p>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-5">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3">
              Profit breakdown
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">Revenue</dt>
                <dd className="font-semibold text-slate-900 tabular-nums">{fmt(revenue)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Gross profit (revenue &times; margin)</dt>
                <dd className="font-semibold text-slate-900 tabular-nums">
                  {fmt(revenue * (margin / 100))}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Ad spend</dt>
                <dd className="font-semibold text-slate-900 tabular-nums">-{fmt(spend)}</dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                <dt className="font-semibold text-slate-800">Actual profit after ads</dt>
                <dd
                  className={`font-bold tabular-nums ${
                    result.profitable ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {fmt(result.actualProfit)}
                </dd>
              </div>
            </dl>
            <p className="text-xs text-slate-500 mt-3">
              A 2x ROAS looks fine on paper, but if your margin is 50% you only break even &mdash;
              there&rsquo;s no profit to reinvest or pay the team.
            </p>
          </div>
        </>
      ) : (
        <p className="text-sm text-rose-600">
          Enter positive spend, revenue, and a margin between 1 and 100%.
        </p>
      )}
    </div>
  );
}
