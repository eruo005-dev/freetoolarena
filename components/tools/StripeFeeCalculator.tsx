"use client";

import { useMemo, useState } from "react";

export function StripeFeeCalculator() {
  const [amount, setAmount] = useState("100");
  const [currency, setCurrency] = useState("USD");
  const [cardType, setCardType] = useState<"domestic" | "international">("domestic");

  const { fee, net } = useMemo(() => {
    const a = Math.max(0, parseFloat(amount) || 0);
    const pct = cardType === "domestic" ? 0.029 : 0.039;
    const fixed = 0.3;
    const f = a > 0 ? a * pct + fixed : 0;
    const n = Math.max(0, a - f);
    return { fee: f, net: n };
  }, [amount, cardType]);

  const rateLabel =
    cardType === "domestic" ? "2.9% + $0.30 (US cards)" : "3.9% + $0.30 (international)";

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Charge amount</span>
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

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Currency</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2 mt-1 bg-white"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Card type</span>
            <select
              value={cardType}
              onChange={(e) => setCardType(e.target.value as "domestic" | "international")}
              className="w-full rounded-lg border border-slate-300 p-2 mt-1 bg-white"
            >
              <option value="domestic">Domestic (US)</option>
              <option value="international">International</option>
            </select>
          </label>
        </div>

        <p className="text-xs text-slate-500">Rate applied: {rateLabel}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-700">Stripe fee (estimate)</span>
          <span className="font-semibold text-slate-900">
            {currency} {fee.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Net deposited</span>
          <span className="font-semibold text-brand text-lg">
            {currency} {net.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-xs text-slate-500 pt-1 border-t border-slate-200">
          <span>Effective fee rate</span>
          <span>{amount && parseFloat(amount) > 0 ? ((fee / parseFloat(amount)) * 100).toFixed(2) : "0.00"}%</span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimate only — actual Stripe fees depend on country, product, and plan.
        Currency conversion, disputes, and additional services may add extra costs.
      </p>
    </div>
  );
}
