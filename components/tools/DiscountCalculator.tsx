"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

type Mode = "forward" | "reverse";

export interface DiscountCalculatorProps {
  /** Initial original price ($). Overridable via ?price=100. */
  initialPrice?: number;
  /** Initial discount (%). Overridable via ?discount=20. */
  initialDiscount?: number;
  /** Initial sale price ($) — used for reverse mode. */
  initialSalePrice?: number;
  /** "forward" (price + %) or "reverse" (price + sale price). */
  initialMode?: Mode;
}

export function DiscountCalculator({
  initialPrice = 100,
  initialDiscount = 20,
  initialSalePrice = 75,
  initialMode = "forward",
}: DiscountCalculatorProps = {}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [price, setPrice] = useState(initialPrice);
  const [discount, setDiscount] = useState(initialDiscount);
  const [salePrice, setSalePrice] = useState(initialSalePrice);

  const r = useMemo(() => {
    const p = Math.max(0, price || 0);
    if (mode === "forward") {
      const d = Math.max(0, Math.min(100, discount || 0));
      const amt = p * (d / 100);
      return { discountAmount: amt, finalPrice: p - amt, saved: amt, pct: d };
    }
    const s = Math.max(0, salePrice || 0);
    const amt = Math.max(0, p - s);
    const pct = p > 0 ? (amt / p) * 100 : 0;
    return { discountAmount: amt, finalPrice: s, saved: amt, pct };
  }, [mode, price, discount, salePrice]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("forward")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
            mode === "forward"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Price + discount %
        </button>
        <button
          type="button"
          onClick={() => setMode("reverse")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
            mode === "reverse"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Price + sale price → %
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Original price ($)</span>
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
        {mode === "forward" ? (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Discount (%)</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              step={1}
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        ) : (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Sale price ($)</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={0.01}
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        )}
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Discount amount</p>
          <p className="text-xl font-bold text-slate-900">{money(r.discountAmount)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">You save</p>
          <p className="text-xl font-bold text-slate-900">
            {money(r.saved)} <span className="text-sm text-slate-500">({r.pct.toFixed(1)}%)</span>
          </p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Final price</p>
          <p className="text-3xl font-bold text-brand">{money(r.finalPrice)}</p>
        </div>
      </div>
    </div>
  );
}
