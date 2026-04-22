"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

type Cycle = "monthly" | "quarterly" | "yearly";

interface Sub {
  id: string;
  name: string;
  cost: string;
  cycle: Cycle;
}

const DEFAULT_SUBS: Sub[] = [
  { id: uid(), name: "Netflix", cost: "15.99", cycle: "monthly" },
  { id: uid(), name: "Spotify", cost: "11.99", cycle: "monthly" },
  { id: uid(), name: "iCloud", cost: "2.99", cycle: "monthly" },
  { id: uid(), name: "Adobe CC", cost: "599", cycle: "yearly" },
];

function monthlyEquivalent(sub: Sub): number {
  const c = Math.max(0, parseFloat(sub.cost) || 0);
  if (sub.cycle === "monthly") return c;
  if (sub.cycle === "quarterly") return c / 3;
  return c / 12;
}

export function SubscriptionCostCalculator() {
  const [subs, setSubs] = useState<Sub[]>(DEFAULT_SUBS);
  const [monthlyIncome, setMonthlyIncome] = useState("");

  const { totalMonthly, totalAnnual, top3, incomePct } = useMemo(() => {
    const withMonthly = subs.map((s) => ({ ...s, monthly: monthlyEquivalent(s) }));
    const tm = withMonthly.reduce((sum, s) => sum + s.monthly, 0);
    const sorted = [...withMonthly].sort((a, b) => b.monthly - a.monthly).slice(0, 3);
    const inc = Math.max(0, parseFloat(monthlyIncome) || 0);
    const pct = inc > 0 ? (tm / inc) * 100 : null;
    return { totalMonthly: tm, totalAnnual: tm * 12, top3: sorted, incomePct: pct };
  }, [subs, monthlyIncome]);

  function addSub() {
    setSubs((rows) => [...rows, { id: uid(), name: "", cost: "", cycle: "monthly" }]);
  }
  function updateSub(id: string, patch: Partial<Sub>) {
    setSubs((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function removeSub(id: string) {
    setSubs((rows) => rows.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-700">Your subscriptions</h3>
          <button
            type="button"
            onClick={addSub}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            + Add subscription
          </button>
        </div>
        <div className="space-y-2">
          {subs.map((sub) => (
            <div key={sub.id} className="grid grid-cols-[1fr_110px_130px_auto] gap-2">
              <input
                type="text"
                placeholder="Name"
                value={sub.name}
                onChange={(e) => updateSub(sub.id, { name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                placeholder="Cost"
                value={sub.cost}
                onChange={(e) => updateSub(sub.id, { cost: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
              <select
                value={sub.cycle}
                onChange={(e) => updateSub(sub.id, { cycle: e.target.value as Cycle })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <button
                type="button"
                onClick={() => removeSub(sub.id)}
                className="text-rose-600 hover:text-rose-700 text-sm px-2"
              >
                Remove
              </button>
            </div>
          ))}
          {subs.length === 0 && (
            <p className="text-sm text-slate-500">No subscriptions. Click "+ Add subscription" to start.</p>
          )}
        </div>
      </section>

      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Monthly income ($, optional)</span>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={100}
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total monthly</p>
          <p className="text-3xl font-bold text-brand">{money(totalMonthly)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total annual</p>
          <p className="text-2xl font-bold text-slate-900">{money(totalAnnual)}</p>
        </div>
        {incomePct !== null && (
          <div className="sm:col-span-2">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">% of income</p>
            <p className={`text-2xl font-bold ${incomePct > 15 ? "text-red-600" : "text-slate-900"}`}>
              {incomePct.toFixed(1)}%
            </p>
          </div>
        )}
      </div>

      {top3.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Top 3 most expensive (monthly equivalent)</h3>
          <ol className="space-y-2">
            {top3.map((s, i) => (
              <li key={s.id} className="flex items-center justify-between text-sm">
                <span>
                  <span className="font-semibold text-slate-900">{i + 1}. {s.name || "(unnamed)"}</span>
                  <span className="text-slate-500 ml-2">({s.cycle})</span>
                </span>
                <span className="font-bold text-slate-900">{money(s.monthly)}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
