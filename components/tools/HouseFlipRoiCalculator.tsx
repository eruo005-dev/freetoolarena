"use client";

import { useMemo, useState } from "react";

export function HouseFlipRoiCalculator() {
  const [price, setPrice] = useState(180000);
  const [rehab, setRehab] = useState(35000);
  const [holdingPerMonth, setHoldingPerMonth] = useState(1200);
  const [months, setMonths] = useState(4);
  const [sellingPct, setSellingPct] = useState(8);
  const [arv, setArv] = useState(290000);

  const result = useMemo(() => {
    if (!Number.isFinite(price) || !Number.isFinite(arv)) return null;

    const totalHolding = holdingPerMonth * months;
    const totalInvestment = price + rehab + totalHolding;
    const sellingCosts = arv * (sellingPct / 100);
    const netSale = arv - sellingCosts;
    const profit = netSale - totalInvestment;
    const roi =
      totalInvestment > 0 ? (profit / totalInvestment) * 100 : 0;
    const annualizedRoi = months > 0 ? roi * (12 / months) : 0;

    const maxOffer70 = 0.7 * arv - rehab;
    const passes70Rule = price <= maxOffer70;

    return {
      totalHolding,
      totalInvestment,
      sellingCosts,
      netSale,
      profit,
      roi,
      annualizedRoi,
      maxOffer70,
      passes70Rule,
    };
  }, [price, rehab, holdingPerMonth, months, sellingPct, arv]);

  const money = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Purchase price
          </span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Rehab budget
          </span>
          <input
            type="number"
            value={rehab}
            onChange={(e) => setRehab(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Holding costs ($ / month)
          </span>
          <input
            type="number"
            value={holdingPerMonth}
            onChange={(e) => setHoldingPerMonth(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Holding period (months)
          </span>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Selling costs (%)
          </span>
          <input
            type="number"
            value={sellingPct}
            onChange={(e) => setSellingPct(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            After-repair value (ARV)
          </span>
          <input
            type="number"
            value={arv}
            onChange={(e) => setArv(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Projected profit
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {money(result.profit)}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Net sale {money(result.netSale)} &minus; total invested{" "}
              {money(result.totalInvestment)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              ROI
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.roi.toFixed(2) + "%"}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Annualized {result.annualizedRoi.toFixed(2) + "%"}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Total investment
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {money(result.totalInvestment)}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Holding {money(result.totalHolding)} &middot; selling{" "}
              {money(result.sellingCosts)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              70% rule max offer
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {money(result.maxOffer70)}
            </div>
            <div
              className={`mt-1 text-xs font-medium ${
                result.passes70Rule ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {result.passes70Rule
                ? "Purchase price passes the 70% rule"
                : "Purchase price fails the 70% rule"}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500">
        70% rule &mdash; max offer = 0.70 &times; ARV &minus; rehab. A common
        guardrail to leave room for profit and surprises.
      </p>
    </div>
  );
}
