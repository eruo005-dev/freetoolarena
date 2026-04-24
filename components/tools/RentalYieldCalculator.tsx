"use client";

import { useMemo, useState } from "react";

export function RentalYieldCalculator() {
  const [price, setPrice] = useState(250000);
  const [monthlyRent, setMonthlyRent] = useState(1800);
  const [vacancyRate, setVacancyRate] = useState(5);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [insurance, setInsurance] = useState(1200);
  const [maintenancePct, setMaintenancePct] = useState(1);
  const [hoa, setHoa] = useState(0);
  const [pmFeePct, setPmFeePct] = useState(8);

  const result = useMemo(() => {
    if (
      !Number.isFinite(price) ||
      !Number.isFinite(monthlyRent) ||
      price <= 0
    ) {
      return null;
    }

    const annualRent = monthlyRent * 12;
    const grossYield = (annualRent / price) * 100;

    const effectiveAnnualRent = annualRent * (1 - vacancyRate / 100);
    const effectiveGrossYield = (effectiveAnnualRent / price) * 100;

    const maintenance = (maintenancePct / 100) * price;
    const pmFee = (pmFeePct / 100) * effectiveAnnualRent;
    const totalAnnualExpenses =
      propertyTax + insurance + maintenance + hoa + pmFee;

    const netAnnualIncome = effectiveAnnualRent - totalAnnualExpenses;
    const netYield = (netAnnualIncome / price) * 100;
    const monthlyCashFlow = netAnnualIncome / 12;

    let tier = "weak";
    let tierTone = "text-rose-600";
    if (grossYield >= 12) {
      tier = "excellent";
      tierTone = "text-emerald-600";
    } else if (grossYield >= 8) {
      tier = "strong";
      tierTone = "text-emerald-600";
    } else if (grossYield >= 5) {
      tier = "average";
      tierTone = "text-amber-600";
    }

    return {
      grossYield,
      effectiveGrossYield,
      netYield,
      monthlyCashFlow,
      totalAnnualExpenses,
      effectiveAnnualRent,
      tier,
      tierTone,
    };
  }, [
    price,
    monthlyRent,
    vacancyRate,
    propertyTax,
    insurance,
    maintenancePct,
    hoa,
    pmFeePct,
  ]);

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
            Vacancy rate (%)
          </span>
          <input
            type="number"
            value={vacancyRate}
            onChange={(e) => setVacancyRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Annual property tax
          </span>
          <input
            type="number"
            value={propertyTax}
            onChange={(e) => setPropertyTax(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Annual insurance
          </span>
          <input
            type="number"
            value={insurance}
            onChange={(e) => setInsurance(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Maintenance (% of value / yr)
          </span>
          <input
            type="number"
            value={maintenancePct}
            onChange={(e) => setMaintenancePct(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Annual HOA
          </span>
          <input
            type="number"
            value={hoa}
            onChange={(e) => setHoa(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Property management fee (%)
          </span>
          <input
            type="number"
            value={pmFeePct}
            onChange={(e) => setPmFeePct(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Gross yield
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.grossYield.toFixed(2) + "%"}
            </div>
            <div className={`mt-1 text-xs font-medium ${result.tierTone}`}>
              Tier: {result.tier}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Effective gross (after vacancy)
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.effectiveGrossYield.toFixed(2) + "%"}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Net yield
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.netYield.toFixed(2) + "%"}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Monthly cash flow
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {money(result.monthlyCashFlow)}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Before mortgage payment
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Rule of thumb &mdash; gross yield under 5% is weak, 5&ndash;8% average,
        8&ndash;12% strong, 12%+ excellent (but verify it isn&rsquo;t a distressed
        market).
      </p>
    </div>
  );
}
