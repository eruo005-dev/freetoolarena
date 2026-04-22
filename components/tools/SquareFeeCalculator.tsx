"use client";

import { useMemo, useState } from "react";

type TxType = "inPerson" | "online" | "keyed" | "invoice";

const RATES: Record<TxType, { pct: number; fixed: number; label: string }> = {
  inPerson: { pct: 0.026, fixed: 0.10, label: "In-person (2.6% + $0.10)" },
  online: { pct: 0.029, fixed: 0.30, label: "Online (2.9% + $0.30)" },
  keyed: { pct: 0.035, fixed: 0.15, label: "Manually keyed (3.5% + $0.15)" },
  invoice: { pct: 0.033, fixed: 0.30, label: "Invoice (3.3% + $0.30)" },
};

export function SquareFeeCalculator() {
  const [amount, setAmount] = useState("100");
  const [type, setType] = useState<TxType>("inPerson");

  const { fee, net } = useMemo(() => {
    const a = Math.max(0, parseFloat(amount) || 0);
    const { pct, fixed } = RATES[type];
    const f = a > 0 ? a * pct + fixed : 0;
    const n = Math.max(0, a - f);
    return { fee: f, net: n };
  }, [amount, type]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Transaction amount ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Transaction type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TxType)}
            className="w-full rounded-lg border border-slate-300 p-2 mt-1 bg-white"
          >
            <option value="inPerson">In-person (swipe / tap / dip)</option>
            <option value="online">Online / e-commerce</option>
            <option value="keyed">Manually keyed</option>
            <option value="invoice">Invoice</option>
          </select>
        </label>

        <p className="text-xs text-slate-500">Rate applied: {RATES[type].label}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-700">Square fee (estimate)</span>
          <span className="font-semibold text-slate-900">${fee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Payout to you</span>
          <span className="font-semibold text-brand text-lg">${net.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs text-slate-500 pt-1 border-t border-slate-200">
          <span>Effective fee rate</span>
          <span>{amount && parseFloat(amount) > 0 ? ((fee / parseFloat(amount)) * 100).toFixed(2) : "0.00"}%</span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimate — Square may charge different rates for custom plans, chargebacks, or instant
        transfers. Check your current Square fee schedule for exact numbers.
      </p>
    </div>
  );
}
