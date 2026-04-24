"use client";

import { useMemo, useState } from "react";

export function CollegeAffordabilityCalculator() {
  const [cost, setCost] = useState(35000);
  const [contribution, setContribution] = useState(15000);
  const [scholarships, setScholarships] = useState(8000);
  const [years, setYears] = useState(4);
  const [startingSalary, setStartingSalary] = useState(55000);

  const result = useMemo(() => {
    if (![cost, contribution, scholarships, years, startingSalary].every((n) => Number.isFinite(n) && n >= 0)) {
      return null;
    }
    const annualGap = Math.max(0, cost - contribution - scholarships);
    const totalGap = annualGap * years;
    const rate = 0.06 / 12;
    const months = 120;
    const monthlyPayment =
      totalGap > 0 ? (totalGap * rate) / (1 - Math.pow(1 + rate, -months)) : 0;
    const totalDebt = monthlyPayment * months;
    const monthlySalary = startingSalary / 12;
    const paymentPct = monthlySalary > 0 ? (monthlyPayment / monthlySalary) * 100 : 0;

    let tier: { label: string; color: string };
    if (paymentPct < 8) tier = { label: "Affordable", color: "text-emerald-600" };
    else if (paymentPct < 15) tier = { label: "Stretch", color: "text-amber-600" };
    else if (paymentPct < 25) tier = { label: "Danger", color: "text-orange-600" };
    else tier = { label: "Impossible", color: "text-red-600" };

    return { annualGap, totalGap, monthlyPayment, totalDebt, paymentPct, tier };
  }, [cost, contribution, scholarships, years, startingSalary]);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Annual cost of attendance ($)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Family contribution + loans ($/yr)</label>
          <input
            type="number"
            value={contribution}
            onChange={(e) => setContribution(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Scholarships/grants ($/yr)</label>
          <input
            type="number"
            value={scholarships}
            onChange={(e) => setScholarships(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Years at school</label>
          <input
            type="number"
            min={1}
            max={8}
            value={years}
            onChange={(e) => setYears(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Expected entry-level salary ($/yr)</label>
          <input
            type="number"
            value={startingSalary}
            onChange={(e) => setStartingSalary(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
      </div>

      {result && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-3">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-xs text-slate-500 uppercase font-semibold">Affordability</span>
            <span className={`text-2xl font-bold ${result.tier.color}`}>{result.tier.label}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 text-sm">
            <div>
              <p className="text-xs text-slate-500">Annual funding gap</p>
              <p className="text-lg font-semibold text-brand">${Math.round(result.annualGap).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">{years}-year total gap</p>
              <p className="text-lg font-semibold text-brand">${Math.round(result.totalGap).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Monthly loan payment (10-yr @ 6%)</p>
              <p className="text-lg font-semibold text-brand">${Math.round(result.monthlyPayment).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Total repaid over 10 years</p>
              <p className="text-lg font-semibold text-brand">${Math.round(result.totalDebt).toLocaleString()}</p>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-200 text-sm text-slate-700">
            Payment consumes&nbsp;
            <span className="font-semibold text-brand">{result.paymentPct.toFixed(1)}%</span>
            &nbsp;of entry-level monthly salary. Keep below 10% for comfort&rsquo;s sake.
          </div>
        </div>
      )}
    </div>
  );
}
