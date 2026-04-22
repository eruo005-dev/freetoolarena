"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export function HourlyRateCalculator() {
  const [annual, setAnnual] = useState("85000");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeks, setWeeks] = useState("48");
  const [overhead, setOverhead] = useState("15");
  const [margin, setMargin] = useState("20");

  const {
    baseRate,
    billableRate,
    per15,
    per30,
    per60,
  } = useMemo(() => {
    const a = Math.max(0, parseFloat(annual) || 0);
    const hw = Math.max(0.01, parseFloat(hoursPerWeek) || 0.01);
    const w = Math.max(0.01, parseFloat(weeks) || 0.01);
    const oh = Math.max(0, parseFloat(overhead) || 0) / 100;
    const m = Math.max(0, parseFloat(margin) || 0) / 100;
    const base = a / (hw * w);
    const billable = base * (1 + oh) * (1 + m);
    return {
      baseRate: base,
      billableRate: billable,
      per15: billable * 0.25,
      per30: billable * 0.5,
      per60: billable,
    };
  }, [annual, hoursPerWeek, weeks, overhead, margin]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Desired annual income ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={1000}
            value={annual}
            onChange={(e) => setAnnual(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Hours per week</span>
          <input
            type="number"
            inputMode="decimal"
            min={1}
            step={1}
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Weeks worked per year</span>
          <input
            type="number"
            inputMode="decimal"
            min={1}
            max={52}
            step={1}
            value={weeks}
            onChange={(e) => setWeeks(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Overhead costs (%)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.5}
            value={overhead}
            onChange={(e) => setOverhead(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Target profit margin (%)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.5}
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Base hourly rate</p>
          <p className="text-2xl font-bold text-slate-900">{money(baseRate)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Billable hourly rate</p>
          <p className="text-3xl font-bold text-brand">{money(billableRate)}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 grid sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Per 15 min</p>
          <p className="text-xl font-bold text-slate-900">{money(per15)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Per 30 min</p>
          <p className="text-xl font-bold text-slate-900">{money(per30)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Per hour</p>
          <p className="text-xl font-bold text-slate-900">{money(per60)}</p>
        </div>
      </div>
    </div>
  );
}
