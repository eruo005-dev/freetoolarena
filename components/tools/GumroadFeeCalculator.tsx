"use client";

import { useMemo, useState } from "react";

export function GumroadFeeCalculator() {
  const [price, setPrice] = useState("25");
  const [method, setMethod] = useState<"card" | "paypal">("card");
  const [discover, setDiscover] = useState(false);

  const { platformFee, processingFee, discoverFee, totalFees, net } = useMemo(() => {
    const p = Math.max(0, parseFloat(price) || 0);
    const platform = p * 0.10;
    const processing = p > 0 ? p * 0.035 + 0.30 : 0;
    const disc = discover ? p * 0.10 : 0;
    const total = platform + processing + disc;
    const n = Math.max(0, p - total);
    return {
      platformFee: platform,
      processingFee: processing,
      discoverFee: disc,
      totalFees: total,
      net: n,
    };
  }, [price, discover]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Product price ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Payment method</span>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as "card" | "paypal")}
            className="w-full rounded-lg border border-slate-300 p-2 mt-1 bg-white"
          >
            <option value="card">Credit / Debit card</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={discover}
            onChange={(e) => setDiscover(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Sale came from Gumroad Discover (+10%)
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-700">Platform fee (10%)</span>
          <span className="font-semibold text-slate-900">${platformFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Payment processing (3.5% + $0.30)</span>
          <span className="font-semibold text-slate-900">${processingFee.toFixed(2)}</span>
        </div>
        {discover && (
          <div className="flex justify-between">
            <span className="text-slate-700">Discover network fee (10%)</span>
            <span className="font-semibold text-slate-900">${discoverFee.toFixed(2)}</span>
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
        Estimate — Gumroad&apos;s effective rates may vary with payout region, currency conversion,
        and promotional programs. Check Gumroad&apos;s current fee schedule for exact numbers.
      </p>
    </div>
  );
}
