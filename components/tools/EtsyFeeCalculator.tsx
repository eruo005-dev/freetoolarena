"use client";

import { useMemo, useState } from "react";

export function EtsyFeeCalculator() {
  const [price, setPrice] = useState("40");
  const [shipping, setShipping] = useState("5");
  const [country, setCountry] = useState<"US" | "UK" | "CA" | "EU" | "AU">("US");
  const [regulatory, setRegulatory] = useState(false);

  const { listingFee, txFee, processingFee, regFee, totalFees, net } = useMemo(() => {
    const p = Math.max(0, parseFloat(price) || 0);
    const s = Math.max(0, parseFloat(shipping) || 0);
    const gross = p + s;
    const listing = 0.20;
    const tx = gross * 0.065;
    const proc = gross > 0 ? gross * 0.03 + 0.25 : 0;
    const reg = regulatory ? gross * 0.0025 : 0;
    const total = listing + tx + proc + reg;
    const n = Math.max(0, gross - total);
    return {
      listingFee: listing,
      txFee: tx,
      processingFee: proc,
      regFee: reg,
      totalFees: total,
      net: n,
    };
  }, [price, shipping, regulatory]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Item price ($)</span>
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
            <span className="text-sm font-medium text-slate-700">Shipping price ($)</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={0.01}
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Seller country</span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value as "US" | "UK" | "CA" | "EU" | "AU")}
            className="w-full rounded-lg border border-slate-300 p-2 mt-1 bg-white"
          >
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="EU">European Union</option>
            <option value="AU">Australia</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={regulatory}
            onChange={(e) => setRegulatory(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Apply regulatory operating fee (0.25%) — enabled in UK, FR, IT, ES, TR, IN
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-700">Listing fee</span>
          <span className="font-semibold text-slate-900">${listingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Transaction fee (6.5%)</span>
          <span className="font-semibold text-slate-900">${txFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Payment processing (3% + $0.25)</span>
          <span className="font-semibold text-slate-900">${processingFee.toFixed(2)}</span>
        </div>
        {regulatory && (
          <div className="flex justify-between">
            <span className="text-slate-700">Regulatory operating fee (0.25%)</span>
            <span className="font-semibold text-slate-900">${regFee.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-slate-200">
          <span className="text-slate-700">Total fees (estimate)</span>
          <span className="font-semibold text-slate-900">${totalFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Net payout</span>
          <span className="font-semibold text-brand text-lg">${net.toFixed(2)}</span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimate — Etsy Ads, Offsite Ads (12–15%), VAT, and currency conversion add more costs.
        Country: {country}. Verify current rates in your Etsy shop dashboard.
      </p>
    </div>
  );
}
