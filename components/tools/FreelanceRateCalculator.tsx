"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export function FreelanceRateCalculator() {
  const [takeHome, setTakeHome] = useState("75000");
  const [taxRate, setTaxRate] = useState("28");
  const [expenses, setExpenses] = useState("8000");
  const [unpaidPct, setUnpaidPct] = useState("25");
  const [billableHoursWeek, setBillableHoursWeek] = useState("25");

  const { annualBillings, hourlyRate, dayRate, projectMin } = useMemo(() => {
    const th = Math.max(0, parseFloat(takeHome) || 0);
    const tax = Math.min(0.95, Math.max(0, parseFloat(taxRate) || 0) / 100);
    const exp = Math.max(0, parseFloat(expenses) || 0);
    const unpaid = Math.min(0.9, Math.max(0, parseFloat(unpaidPct) || 0) / 100);
    const bhw = Math.max(0.01, parseFloat(billableHoursWeek) || 0.01);
    // Required gross before tax: (takehome + expenses) / (1 - tax)
    const grossRequired = (th + exp) / (1 - tax);
    // Billable weeks in year accounting for unpaid time
    const billableWeeks = 52 * (1 - unpaid);
    const billableHours = billableWeeks * bhw;
    const rate = billableHours > 0 ? grossRequired / billableHours : 0;
    return {
      annualBillings: grossRequired,
      hourlyRate: rate,
      dayRate: rate * 8,
      projectMin: rate * 40, // 1-week project minimum
    };
  }, [takeHome, taxRate, expenses, unpaidPct, billableHoursWeek]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Desired take-home (annual $)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={1000}
            value={takeHome}
            onChange={(e) => setTakeHome(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Effective tax rate (%)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={95}
            step={0.5}
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Business expenses (annual $)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={100}
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Unpaid time (% of year)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={90}
            step={1}
            value={unpaidPct}
            onChange={(e) => setUnpaidPct(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Billable hours per week</span>
          <input
            type="number"
            inputMode="decimal"
            min={1}
            step={1}
            value={billableHoursWeek}
            onChange={(e) => setBillableHoursWeek(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Required annual billings</p>
          <p className="text-2xl font-bold text-slate-900">{money(annualBillings)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Required hourly rate</p>
          <p className="text-3xl font-bold text-brand">{money(hourlyRate)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Day rate (8 hours)</p>
          <p className="text-2xl font-bold text-slate-900">{money(dayRate)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Project minimum (1 week)</p>
          <p className="text-2xl font-bold text-slate-900">{money(projectMin)}</p>
        </div>
      </div>
    </div>
  );
}
