"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

type Filing = "single" | "married" | "hoh";

// 2024 US federal brackets (approx). Each bracket = [upper bound, rate]. Last is Infinity.
const BRACKETS: Record<Filing, Array<[number, number]>> = {
  single: [
    [11600, 0.10],
    [47150, 0.12],
    [100525, 0.22],
    [191950, 0.24],
    [243725, 0.32],
    [609350, 0.35],
    [Infinity, 0.37],
  ],
  married: [
    [23200, 0.10],
    [94300, 0.12],
    [201050, 0.22],
    [383900, 0.24],
    [487450, 0.32],
    [731200, 0.35],
    [Infinity, 0.37],
  ],
  hoh: [
    [16550, 0.10],
    [63100, 0.12],
    [100500, 0.22],
    [191950, 0.24],
    [243700, 0.32],
    [609350, 0.35],
    [Infinity, 0.37],
  ],
};

function computeFederal(income: number, filing: Filing): number {
  const brackets = BRACKETS[filing];
  let tax = 0;
  let prev = 0;
  for (const [upper, rate] of brackets) {
    if (income <= upper) {
      tax += (income - prev) * rate;
      return tax;
    }
    tax += (upper - prev) * rate;
    prev = upper;
  }
  return tax;
}

export interface TaxCalculatorProps {
  /** Initial gross income ($). Overridable via ?income=75000. */
  initialIncome?: number;
  /** Filing status — single | married | hoh. */
  initialFiling?: Filing;
  /** Initial state tax rate (%). Overridable via ?state=5. */
  initialStateRate?: number;
}

export function TaxCalculator({
  initialIncome = 75000,
  initialFiling = "single",
  initialStateRate = 5,
}: TaxCalculatorProps = {}) {
  const [income, setIncome] = useState(initialIncome);
  const [filing, setFiling] = useState<Filing>(initialFiling);
  const [stateRate, setStateRate] = useState(initialStateRate);

  const { federal, state, total, effective, takeHome } = useMemo(() => {
    const inc = Math.max(0, income || 0);
    const fed = computeFederal(inc, filing);
    const st = inc * (Math.max(0, stateRate) / 100);
    const tot = fed + st;
    const eff = inc > 0 ? (tot / inc) * 100 : 0;
    return { federal: fed, state: st, total: tot, effective: eff, takeHome: inc - tot };
  }, [income, filing, stateRate]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Gross income ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={100}
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Filing status</span>
          <select
            value={filing}
            onChange={(e) => setFiling(e.target.value as Filing)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="single">Single</option>
            <option value="married">Married filing jointly</option>
            <option value="hoh">Head of household</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">State tax rate (%) — optional</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={20}
            step={0.1}
            value={stateRate}
            onChange={(e) => setStateRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <Stat label="Federal tax" value={money(federal)} />
        <Stat label="State tax" value={money(state)} />
        <Stat label="Total tax" value={money(total)} />
        <Stat label="Effective rate" value={`${effective.toFixed(2)}%`} />
        <div className="sm:col-span-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Take-home</p>
          <p className="text-3xl font-bold text-brand">{money(takeHome)}</p>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimate only using 2024 US federal brackets. Assumes standard deduction is not applied and no credits.
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">{label}</p>
      <p className="text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
