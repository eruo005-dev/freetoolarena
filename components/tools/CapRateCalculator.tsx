"use client";

import { useMemo, useState } from "react";

export function CapRateCalculator() {
  const [price, setPrice] = useState(300000);
  const [monthlyRent, setMonthlyRent] = useState(2400);
  const [annualExpenses, setAnnualExpenses] = useState(7200);
  const [vacancyRate, setVacancyRate] = useState(5);

  const result = useMemo(() => {
    if (!Number.isFinite(price) || price <= 0) return null;

    const annualRent = monthlyRent * 12;
    const effectiveRent = annualRent * (1 - vacancyRate / 100);
    const noi = effectiveRent - annualExpenses;
    const capRate = (noi / price) * 100;

    let tier = "low / expensive market";
    let tierTone = "text-sky-600";
    if (capRate >= 10) {
      tier = "likely distressed or high-risk";
      tierTone = "text-rose-600";
    } else if (capRate >= 7) {
      tier = "strong cash flow";
      tierTone = "text-emerald-600";
    } else if (capRate >= 4) {
      tier = "healthy";
      tierTone = "text-emerald-600";
    }

    return { annualRent, effectiveRent, noi, capRate, tier, tierTone };
  }, [price, monthlyRent, annualExpenses, vacancyRate]);

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
            Monthly rent
          </span>
          <input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Annual operating expenses
          </span>
          <input
            type="number"
            value={annualExpenses}
            onChange={(e) => setAnnualExpenses(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Vacancy rate (%)
          </span>
          <input
            type="number"
            value={vacancyRate}
            onChange={(e) => setVacancyRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Net operating income (NOI)
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {money(result.noi)}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Effective rent {money(result.effectiveRent)} &minus; expenses{" "}
              {money(annualExpenses)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Cap rate
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.capRate.toFixed(2) + "%"}
            </div>
            <div className={`mt-1 text-xs font-medium ${result.tierTone}`}>
              Tier: {result.tier}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Cap rate doesn&rsquo;t include mortgage; it&rsquo;s a property-only return.
        Use cash-on-cash for leveraged returns.
      </p>
    </div>
  );
}
