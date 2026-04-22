"use client";

import { useMemo, useState } from "react";

type Plan = "basic" | "shopify" | "advanced";
type Gateway = "shopifyPayments" | "external";

const PAYMENTS_RATES: Record<Plan, { pct: number; fixed: number }> = {
  basic: { pct: 0.029, fixed: 0.30 },
  shopify: { pct: 0.026, fixed: 0.30 },
  advanced: { pct: 0.024, fixed: 0.30 },
};

const EXTERNAL_TX_RATE: Record<Plan, number> = {
  basic: 0.02,
  shopify: 0.01,
  advanced: 0.005,
};

export function ShopifyFeeCalculator() {
  const [amount, setAmount] = useState("100");
  const [plan, setPlan] = useState<Plan>("basic");
  const [gateway, setGateway] = useState<Gateway>("shopifyPayments");

  const { fee, net, label } = useMemo(() => {
    const a = Math.max(0, parseFloat(amount) || 0);
    if (gateway === "shopifyPayments") {
      const { pct, fixed } = PAYMENTS_RATES[plan];
      const f = a > 0 ? a * pct + fixed : 0;
      return {
        fee: f,
        net: Math.max(0, a - f),
        label: `Shopify Payments ${(pct * 100).toFixed(1)}% + $${fixed.toFixed(2)}`,
      };
    }
    const pct = EXTERNAL_TX_RATE[plan];
    const f = a * pct;
    return {
      fee: f,
      net: Math.max(0, a - f),
      label: `Shopify transaction fee ${(pct * 100).toFixed(1)}% (external gateway)`,
    };
  }, [amount, plan, gateway]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Order amount ($)</span>
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
            <span className="text-sm font-medium text-slate-700">Shopify plan</span>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value as Plan)}
              className="w-full rounded-lg border border-slate-300 p-2 mt-1 bg-white"
            >
              <option value="basic">Basic</option>
              <option value="shopify">Shopify</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Payment gateway</span>
            <select
              value={gateway}
              onChange={(e) => setGateway(e.target.value as Gateway)}
              className="w-full rounded-lg border border-slate-300 p-2 mt-1 bg-white"
            >
              <option value="shopifyPayments">Shopify Payments (online)</option>
              <option value="external">External gateway</option>
            </select>
          </label>
        </div>

        <p className="text-xs text-slate-500">{label}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-700">Shopify fee (estimate)</span>
          <span className="font-semibold text-slate-900">${fee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Net (before external gateway fee)</span>
          <span className="font-semibold text-brand text-lg">${net.toFixed(2)}</span>
        </div>
        {gateway === "external" && (
          <p className="text-xs text-slate-500 pt-1 border-t border-slate-200">
            Note: your external gateway (PayPal, Stripe, etc.) will also charge its own processing fee
            on top — estimate that separately.
          </p>
        )}
      </div>

      <p className="text-xs text-slate-500">
        Estimate — Shopify fees vary by country, plan, and gateway. International / AmEx rates differ.
        Check your admin dashboard for your exact schedule.
      </p>
    </div>
  );
}
