"use client";

import { useMemo, useState } from "react";

export function SolarPanelPaybackCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(180);
  const [sizeKw, setSizeKw] = useState(6);
  const [costPerWatt, setCostPerWatt] = useState(3);
  const [creditPct, setCreditPct] = useState(30);
  const [stateRebate, setStateRebate] = useState(0);
  const [rate, setRate] = useState(0.15);
  const [inflation, setInflation] = useState(3);
  const [years, setYears] = useState(25);

  const result = useMemo(() => {
    const size = Number.isFinite(sizeKw) ? sizeKw : 0;
    const cpw = Number.isFinite(costPerWatt) ? costPerWatt : 0;
    const credit = Number.isFinite(creditPct) ? creditPct : 0;
    const rebate = Number.isFinite(stateRebate) ? stateRebate : 0;
    const r = Number.isFinite(rate) ? rate : 0;
    const inf = Number.isFinite(inflation) ? inflation : 0;
    const yrs = Number.isFinite(years) && years > 0 ? Math.round(years) : 25;

    const installCost = size * cpw * 1000;
    const netCost = Math.max(0, installCost * (1 - credit / 100) - rebate);
    const annualProduction = size * 1400;

    let cumulative = 0;
    let paybackYear: number | null = null;
    const rows: { year: number; savings: number; cumulative: number }[] = [];
    for (let y = 1; y <= yrs; y++) {
      const savings = annualProduction * r * Math.pow(1 + inf / 100, y - 1);
      cumulative += savings;
      if (paybackYear === null && cumulative >= netCost) paybackYear = y;
      rows.push({ year: y, savings, cumulative });
    }

    const totalSavings = cumulative;
    const afterPayback = paybackYear ? totalSavings - netCost : 0;

    return {
      installCost,
      netCost,
      annualProduction,
      paybackYear,
      totalSavings,
      afterPayback,
      rows,
    };
  }, [sizeKw, costPerWatt, creditPct, stateRebate, rate, inflation, years]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Current monthly electric bill ($)</span>
          <input
            type="number"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">System size (kW)</span>
          <input
            type="number"
            step="0.1"
            value={sizeKw}
            onChange={(e) => setSizeKw(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Cost per watt installed ($)</span>
          <input
            type="number"
            step="0.1"
            value={costPerWatt}
            onChange={(e) => setCostPerWatt(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Federal tax credit (%)</span>
          <input
            type="number"
            value={creditPct}
            onChange={(e) => setCreditPct(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">State/utility rebate ($)</span>
          <input
            type="number"
            value={stateRebate}
            onChange={(e) => setStateRebate(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Electricity price ($/kWh)</span>
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Price inflation (%/yr)</span>
          <input
            type="number"
            step="0.1"
            value={inflation}
            onChange={(e) => setInflation(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Years of analysis</span>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Gross install cost</div>
          <div className="text-2xl font-bold text-brand">{fmt(result.installCost)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Net cost after incentives</div>
          <div className="text-2xl font-bold text-brand">{fmt(result.netCost)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Payback period</div>
          <div className="text-2xl font-bold text-brand">
            {result.paybackYear ? `${result.paybackYear} yrs` : "> analysis"}
          </div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">{years}-year total savings</div>
          <div className="text-2xl font-bold text-brand">{fmt(result.totalSavings)}</div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 p-4 text-sm">
        <p>
          Estimated annual production: <strong>{result.annualProduction.toLocaleString()} kWh</strong>. Net
          savings after payback through year {years}: <strong>{fmt(result.afterPayback)}</strong>.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Uses the 1,400 kWh/kW/yr US average&mdash;actual production varies with latitude, shading, and roof
          orientation.
        </p>
      </div>
    </div>
  );
}
