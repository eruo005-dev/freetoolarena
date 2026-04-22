"use client";

import { useMemo, useState } from "react";

type Tier = "lite" | "pro" | "premium";

const PLATFORM_PCT: Record<Tier, number> = {
  lite: 0.05,
  pro: 0.08,
  premium: 0.12,
};

export function PatreonFeeCalculator() {
  const [pledge, setPledge] = useState("10");
  const [tier, setTier] = useState<Tier>("pro");
  const [includePayout, setIncludePayout] = useState(false);

  const { platformFee, processingFee, payoutFee, totalFees, net } = useMemo(() => {
    const a = Math.max(0, parseFloat(pledge) || 0);
    const plat = a * PLATFORM_PCT[tier];
    const proc = a >= 3 ? a * 0.029 + 0.30 : a > 0 ? a * 0.05 + 0.10 : 0;
    const payRaw = includePayout ? a * 0.01 : 0;
    const pay = Math.min(payRaw, 25);
    const total = plat + proc + pay;
    const n = Math.max(0, a - total);
    return {
      platformFee: plat,
      processingFee: proc,
      payoutFee: pay,
      totalFees: total,
      net: n,
    };
  }, [pledge, tier, includePayout]);

  const processingLabel = parseFloat(pledge) >= 3 ? "2.9% + $0.30" : "Micro: 5% + $0.10";

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Pledge amount ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={pledge}
            onChange={(e) => setPledge(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Creator tier</span>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
            className="w-full rounded-lg border border-slate-300 p-2 mt-1 bg-white"
          >
            <option value="lite">Lite (5% platform fee)</option>
            <option value="pro">Pro (8% platform fee)</option>
            <option value="premium">Premium (12% platform fee)</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={includePayout}
            onChange={(e) => setIncludePayout(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Include payout fee (1%, capped at $25)
        </label>

        <p className="text-xs text-slate-500">Processing rate: {processingLabel}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-700">Platform fee ({(PLATFORM_PCT[tier] * 100).toFixed(0)}%)</span>
          <span className="font-semibold text-slate-900">${platformFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Payment processing</span>
          <span className="font-semibold text-slate-900">${processingFee.toFixed(2)}</span>
        </div>
        {includePayout && (
          <div className="flex justify-between">
            <span className="text-slate-700">Payout fee (1%)</span>
            <span className="font-semibold text-slate-900">${payoutFee.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-slate-200">
          <span className="text-slate-700">Total fees (estimate)</span>
          <span className="font-semibold text-slate-900">${totalFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Creator take-home</span>
          <span className="font-semibold text-brand text-lg">${net.toFixed(2)}</span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimate — Patreon tiers, currency conversion, declined / retried payments, and regional
        processors can shift effective rates. Verify in your creator dashboard.
      </p>
    </div>
  );
}
