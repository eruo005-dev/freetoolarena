"use client";

import { useMemo, useState } from "react";
import { ExportData } from "@/components/ExportData";

function money(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export interface PaycheckCalculatorProps {
  /** Annual gross salary — ?gross=75000. */
  initialGross?: number;
  /** Federal tax rate % — ?rate=15. */
  initialRate?: number;
}

export function PaycheckCalculator({
  initialGross = 75000,
  initialRate = 15,
}: PaycheckCalculatorProps = {}) {
  const [salary, setSalary] = useState(initialGross);
  const [federalRate, setFederalRate] = useState(initialRate);
  const [stateRate, setStateRate] = useState(5);
  const [ficaRate] = useState(7.65);
  const [pretax, setPretax] = useState(5000);
  const [freq, setFreq] = useState<"weekly" | "biweekly" | "semimonthly" | "monthly">("biweekly");

  const r = useMemo(() => {
    const taxable = Math.max(0, salary - pretax);
    const fed = taxable * (federalRate / 100);
    const st = taxable * (stateRate / 100);
    const fica = salary * (ficaRate / 100);
    const takeHome = salary - pretax - fed - st - fica;
    const periods = freq === "weekly" ? 52 : freq === "biweekly" ? 26 : freq === "semimonthly" ? 24 : 12;
    return { fed, st, fica, takeHome, per: takeHome / periods, periods };
  }, [salary, federalRate, stateRate, ficaRate, pretax, freq]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Annual salary ($)</span>
          <input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Pre-tax deductions ($/yr)</span>
          <input type="number" value={pretax} onChange={(e) => setPretax(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Federal tax rate (%)</span>
          <input type="number" value={federalRate} onChange={(e) => setFederalRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">State tax rate (%)</span>
          <input type="number" value={stateRate} onChange={(e) => setStateRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Pay frequency</span>
          <select value={freq} onChange={(e) => setFreq(e.target.value as typeof freq)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            <option value="weekly">Weekly (52)</option>
            <option value="biweekly">Bi-weekly (26)</option>
            <option value="semimonthly">Semi-monthly (24)</option>
            <option value="monthly">Monthly (12)</option>
          </select>
        </label>
      </div>
      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">Per-paycheck take-home</p>
        <p className="text-3xl font-bold">{money(r.per)}</p>
        <p className="text-xs text-white/80 mt-1">{r.periods} paychecks/yr · Annual take-home: {money(r.takeHome)}</p>
      </div>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Federal</p>
          <p className="text-lg font-semibold text-rose-700">{money(r.fed)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">State</p>
          <p className="text-lg font-semibold text-rose-700">{money(r.st)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">FICA</p>
          <p className="text-lg font-semibold text-rose-700">{money(r.fica)}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500">Estimate only. Withholding depends on W-4 elections, credits, and local taxes.</p>

      <ExportData
        filename="paycheck-calculation"
        rows={[
          { metric: "Gross annual", value: salary.toFixed(2) },
          { metric: "Pre-tax deductions", value: pretax.toFixed(2) },
          { metric: "Federal tax", value: r.fed.toFixed(2) },
          { metric: "State tax", value: r.st.toFixed(2) },
          { metric: "FICA", value: r.fica.toFixed(2) },
          { metric: "Take-home annual", value: r.takeHome.toFixed(2) },
          { metric: "Per paycheck", value: r.per.toFixed(2) },
          { metric: "Pay periods/year", value: r.periods },
        ]}
      />
    </div>
  );
}
