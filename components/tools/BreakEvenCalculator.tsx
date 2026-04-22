"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function units(n: number): string {
  if (!Number.isFinite(n)) return "0";
  return Math.ceil(n).toLocaleString("en-US");
}

export interface BreakEvenCalculatorProps {
  /** Fixed costs ($). Overridable via ?fixed=10000. */
  initialFixedCosts?: number;
  /** Variable cost per unit ($). Overridable via ?variable=5. */
  initialVariableCost?: number;
  /** Price per unit ($). Overridable via ?price=20. */
  initialPrice?: number;
  /** Expected sales in units (optional, for margin of safety). */
  initialExpectedSales?: number;
}

export function BreakEvenCalculator({
  initialFixedCosts = 10000,
  initialVariableCost = 5,
  initialPrice = 20,
  initialExpectedSales = 1000,
}: BreakEvenCalculatorProps = {}) {
  const [fixedCosts, setFixedCosts] = useState(initialFixedCosts);
  const [variableCost, setVariableCost] = useState(initialVariableCost);
  const [price, setPrice] = useState(initialPrice);
  const [expected, setExpected] = useState(initialExpectedSales);

  const r = useMemo(() => {
    const f = Math.max(0, fixedCosts || 0);
    const v = Math.max(0, variableCost || 0);
    const p = Math.max(0, price || 0);
    const contribution = p - v;
    const beUnits = contribution > 0 ? f / contribution : Infinity;
    const beRevenue = Number.isFinite(beUnits) ? beUnits * p : Infinity;
    const exp = Math.max(0, expected || 0);
    const mosUnits = Number.isFinite(beUnits) ? Math.max(0, exp - beUnits) : 0;
    const mosPct = exp > 0 && Number.isFinite(beUnits) ? (mosUnits / exp) * 100 : 0;
    return { contribution, beUnits, beRevenue, mosUnits, mosPct, viable: contribution > 0 };
  }, [fixedCosts, variableCost, price, expected]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Fixed costs ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={1}
            value={fixedCosts}
            onChange={(e) => setFixedCosts(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Variable cost / unit ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={variableCost}
            onChange={(e) => setVariableCost(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Price / unit ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block sm:col-span-3">
          <span className="block text-sm font-medium text-slate-700 mb-1">Expected sales (units) — optional</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={1}
            value={expected}
            onChange={(e) => setExpected(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      {!r.viable ? (
        <div className="rounded-xl bg-red-50 border border-red-200 p-5">
          <p className="text-sm font-medium text-red-800">
            Price must exceed variable cost per unit. Current contribution margin is {money(r.contribution)}.
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Break-even units</p>
            <p className="text-3xl font-bold text-brand">{units(r.beUnits)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Break-even revenue</p>
            <p className="text-3xl font-bold text-brand">{money(r.beRevenue)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Contribution / unit</p>
            <p className="text-xl font-bold text-slate-900">{money(r.contribution)}</p>
          </div>
          {expected > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Margin of safety</p>
              <p className="text-xl font-bold text-slate-900">
                {units(r.mosUnits)} units <span className="text-sm text-slate-500">({r.mosPct.toFixed(1)}%)</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
