"use client";

import { useMemo, useState } from "react";

export function PaypalFeeCalculator() {
  const [amount, setAmount] = useState("100");
  const [region, setRegion] = useState<"domestic" | "international">("domestic");

  const { fee, net, rateLabel } = useMemo(() => {
    const a = Math.max(0, parseFloat(amount) || 0);
    const pct = region === "domestic" ? 0.0299 : 0.0499;
    const fixed = 0.49;
    const f = a > 0 ? a * pct + fixed : 0;
    const n = Math.max(0, a - f);
    const label =
      region === "domestic"
        ? "2.99% + $0.49 (US goods & services)"
        : "4.99% + $0.49 (international)";
    return { fee: f, net: n, rateLabel: label };
  }, [amount, region]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Payment amount ($)</span>
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
          <span className="text-sm font-medium text-slate-700">Sender region</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as "domestic" | "international")}
            className="w-full rounded-lg border border-slate-300 p-2 mt-1 bg-white"
          >
            <option value="domestic">Domestic (US)</option>
            <option value="international">International</option>
          </select>
        </label>

        <p className="text-xs text-slate-500">Rate applied: {rateLabel}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-700">PayPal fee (estimate)</span>
          <span className="font-semibold text-slate-900">${fee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Net received</span>
          <span className="font-semibold text-brand text-lg">${net.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs text-slate-500 pt-1 border-t border-slate-200">
          <span>Effective fee rate</span>
          <span>{amount && parseFloat(amount) > 0 ? ((fee / parseFloat(amount)) * 100).toFixed(2) : "0.00"}%</span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimate only — actual PayPal fees vary by product type, currency conversion, and account status.
        Check PayPal&apos;s current fee schedule for exact numbers.
      </p>
    </div>
  );
}
