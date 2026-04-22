"use client";

import { useMemo, useState } from "react";

type Category = "general" | "jewelry" | "books" | "clothing" | "electronics";

const RATES: Record<Category, { pct: number; label: string }> = {
  general: { pct: 0.1325, label: "Most categories (13.25%)" },
  clothing: { pct: 0.1325, label: "Clothing & accessories (13.25%)" },
  electronics: { pct: 0.1325, label: "Consumer electronics (13.25%)" },
  jewelry: { pct: 0.1235, label: "Jewelry & watches (12.35%)" },
  books: { pct: 0.10, label: "Books & media (10%)" },
};

export function EbayFeeCalculator() {
  const [price, setPrice] = useState("100");
  const [shipping, setShipping] = useState("8");
  const [category, setCategory] = useState<Category>("general");

  const { finalValueFee, perOrderFee, totalFees, net, gross } = useMemo(() => {
    const p = Math.max(0, parseFloat(price) || 0);
    const s = Math.max(0, parseFloat(shipping) || 0);
    const g = p + s;
    const rate = RATES[category].pct;
    const fvf = g * rate;
    const perOrder = g > 0 ? 0.30 : 0;
    const total = fvf + perOrder;
    const n = Math.max(0, g - total);
    return {
      finalValueFee: fvf,
      perOrderFee: perOrder,
      totalFees: total,
      net: n,
      gross: g,
    };
  }, [price, shipping, category]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Sale price ($)</span>
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
            <span className="text-sm font-medium text-slate-700">Shipping charged ($)</span>
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
          <span className="text-sm font-medium text-slate-700">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-lg border border-slate-300 p-2 mt-1 bg-white"
          >
            <option value="general">Most categories</option>
            <option value="clothing">Clothing & accessories</option>
            <option value="electronics">Consumer electronics</option>
            <option value="jewelry">Jewelry & watches</option>
            <option value="books">Books, movies & music</option>
          </select>
        </label>

        <p className="text-xs text-slate-500">Rate: {RATES[category].label} + $0.30 per order</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-700">Gross (price + shipping)</span>
          <span className="font-semibold text-slate-900">${gross.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Final value fee</span>
          <span className="font-semibold text-slate-900">${finalValueFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Per-order fee</span>
          <span className="font-semibold text-slate-900">${perOrderFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-slate-200">
          <span className="text-slate-700">Total eBay fees (estimate)</span>
          <span className="font-semibold text-slate-900">${totalFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Net to seller</span>
          <span className="font-semibold text-brand text-lg">${net.toFixed(2)}</span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimate — eBay fees vary with category caps, store subscription, international sales,
        and promoted listings. Final value fee already bundles payment processing.
      </p>
    </div>
  );
}
