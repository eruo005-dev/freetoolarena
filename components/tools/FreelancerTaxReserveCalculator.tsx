"use client";

import { useMemo, useState } from "react";

type Filing = "single" | "married" | "hoh";

const BRACKETS_2026: Record<Filing, Array<{ rate: number; upTo: number }>> = {
  single: [
    { rate: 0.1, upTo: 11925 },
    { rate: 0.12, upTo: 48475 },
    { rate: 0.22, upTo: 103350 },
    { rate: 0.24, upTo: 197300 },
    { rate: 0.32, upTo: 250525 },
    { rate: 0.35, upTo: 626350 },
    { rate: 0.37, upTo: Infinity },
  ],
  married: [
    { rate: 0.1, upTo: 23850 },
    { rate: 0.12, upTo: 96950 },
    { rate: 0.22, upTo: 206700 },
    { rate: 0.24, upTo: 394600 },
    { rate: 0.32, upTo: 501050 },
    { rate: 0.35, upTo: 751600 },
    { rate: 0.37, upTo: Infinity },
  ],
  hoh: [
    { rate: 0.1, upTo: 17000 },
    { rate: 0.12, upTo: 64850 },
    { rate: 0.22, upTo: 103350 },
    { rate: 0.24, upTo: 197300 },
    { rate: 0.32, upTo: 250500 },
    { rate: 0.35, upTo: 626350 },
    { rate: 0.37, upTo: Infinity },
  ],
};

function federalTax(income: number, filing: Filing): number {
  let tax = 0;
  let prev = 0;
  for (const b of BRACKETS_2026[filing]) {
    if (income <= prev) break;
    const taxable = Math.min(income, b.upTo) - prev;
    tax += taxable * b.rate;
    prev = b.upTo;
  }
  return tax;
}

export function FreelancerTaxReserveCalculator() {
  const [gross, setGross] = useState("85000");
  const [filing, setFiling] = useState<Filing>("single");
  const [stateRate, setStateRate] = useState("5");

  const result = useMemo(() => {
    const g = Number(gross) || 0;
    const sr = (Number(stateRate) || 0) / 100;
    const seBase = g * 0.9235;
    const seTax = seBase * 0.153;
    const seDeduction = seTax / 2;
    const agi = Math.max(0, g - seDeduction);
    const fed = federalTax(agi, filing);
    const stateTax = agi * sr;
    const totalTax = seTax + fed + stateTax;
    const reservePct = g > 0 ? (totalTax / g) * 100 : 0;
    const quarterly = totalTax / 4;
    return { seTax, fed, stateTax, totalTax, reservePct, quarterly };
  }, [gross, filing, stateRate]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Gross income ($)</span>
          <input type="number" value={gross} onChange={(e) => setGross(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Filing status</span>
          <select value={filing} onChange={(e) => setFiling(e.target.value as Filing)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="single">Single</option>
            <option value="married">Married filing jointly</option>
            <option value="hoh">Head of household</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">State tax rate (%)</span>
          <input type="number" value={stateRate} onChange={(e) => setStateRate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Recommended reserve</div>
          <div className="text-3xl font-bold text-brand tabular-nums">{result.reservePct.toFixed(1)}%</div>
          <div className="text-xs text-slate-500 mt-1 tabular-nums">${result.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })} total tax</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Quarterly payment</div>
          <div className="text-3xl font-bold text-brand tabular-nums">${result.quarterly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          <div className="text-xs text-slate-500 mt-1">Due Apr/Jun/Sep/Jan</div>
        </div>
      </div>

      <table className="w-full text-sm">
        <tbody>
          <tr className="border-b border-slate-200">
            <td className="py-2 text-slate-600">Self-employment tax (15.3%)</td>
            <td className="py-2 text-right tabular-nums font-medium">${result.seTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
          </tr>
          <tr className="border-b border-slate-200">
            <td className="py-2 text-slate-600">Federal income tax</td>
            <td className="py-2 text-right tabular-nums font-medium">${result.fed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
          </tr>
          <tr className="border-b border-slate-200">
            <td className="py-2 text-slate-600">State income tax</td>
            <td className="py-2 text-right tabular-nums font-medium">${result.stateTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold">Total estimated tax</td>
            <td className="py-2 text-right tabular-nums font-bold">${result.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
