"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

type Mode = "add" | "remove";

export interface VatCalculatorProps {
  /** Initial amount. Overridable via ?amount=100. */
  initialAmount?: number;
  /** Initial VAT rate (%). Overridable via ?rate=20. */
  initialRate?: number;
  /** "add" (net -> gross) or "remove" (gross -> net). */
  initialMode?: Mode;
}

export function VatCalculator({
  initialAmount = 100,
  initialRate = 20,
  initialMode = "add",
}: VatCalculatorProps = {}) {
  const [amount, setAmount] = useState(initialAmount);
  const [rate, setRate] = useState(initialRate);
  const [mode, setMode] = useState<Mode>(initialMode);

  const { net, vat, gross } = useMemo(() => {
    const a = Math.max(0, amount || 0);
    const r = Math.max(0, rate || 0) / 100;
    if (mode === "add") {
      const v = a * r;
      return { net: a, vat: v, gross: a + v };
    }
    // remove: amount is gross, back out net
    const n = r === -1 ? 0 : a / (1 + r);
    return { net: n, vat: a - n, gross: a };
  }, [amount, rate, mode]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">VAT / GST rate (%)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={100}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("add")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
            mode === "add"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Add to price (net → gross)
        </button>
        <button
          type="button"
          onClick={() => setMode("remove")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
            mode === "remove"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Remove from price (gross → net)
        </button>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Net amount</p>
          <p className="text-xl font-bold text-slate-900">{money(net)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">VAT amount</p>
          <p className="text-xl font-bold text-slate-900">{money(vat)}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Gross amount</p>
          <p className="text-3xl font-bold text-brand">{money(gross)}</p>
        </div>
      </div>
    </div>
  );
}
