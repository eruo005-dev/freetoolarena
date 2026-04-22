"use client";

import { useMemo, useState } from "react";

type Category = "standard" | "apparel" | "electronics" | "books";
type SizeTier = "small" | "medium" | "large";

const REFERRAL: Record<Category, number> = {
  standard: 0.15,
  apparel: 0.17,
  electronics: 0.08,
  books: 0.15,
};

const FBA_FEE: Record<SizeTier, number> = {
  small: 3.75,
  medium: 5.80,
  large: 9.50,
};

export function AmazonFbaCalculator() {
  const [price, setPrice] = useState("30");
  const [cost, setCost] = useState("8");
  const [category, setCategory] = useState<Category>("standard");
  const [size, setSize] = useState<SizeTier>("small");
  const [storage, setStorage] = useState("0.75");

  const { referralFee, fbaFee, storageFee, totalFees, profit, margin } = useMemo(() => {
    const p = Math.max(0, parseFloat(price) || 0);
    const c = Math.max(0, parseFloat(cost) || 0);
    const st = Math.max(0, parseFloat(storage) || 0);
    const ref = p * REFERRAL[category];
    const fba = FBA_FEE[size];
    const total = ref + fba + st;
    const prof = p - c - total;
    const mar = p > 0 ? (prof / p) * 100 : 0;
    return {
      referralFee: ref,
      fbaFee: fba,
      storageFee: st,
      totalFees: total,
      profit: prof,
      margin: mar,
    };
  }, [price, cost, category, size, storage]);

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
            <span className="text-sm font-medium text-slate-700">Cost of goods ($)</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={0.01}
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full rounded-lg border border-slate-300 p-2 mt-1 bg-white"
            >
              <option value="standard">Standard (15%)</option>
              <option value="apparel">Apparel (17%)</option>
              <option value="electronics">Electronics (8%)</option>
              <option value="books">Books (15%)</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">FBA size tier</span>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as SizeTier)}
              className="w-full rounded-lg border border-slate-300 p-2 mt-1 bg-white"
            >
              <option value="small">Small standard ($3.75)</option>
              <option value="medium">Medium standard ($5.80)</option>
              <option value="large">Large standard ($9.50)</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Monthly storage per unit ($, optional)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={storage}
            onChange={(e) => setStorage(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-700">Referral fee</span>
          <span className="font-semibold text-slate-900">${referralFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">FBA fulfillment fee</span>
          <span className="font-semibold text-slate-900">${fbaFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Storage (per unit)</span>
          <span className="font-semibold text-slate-900">${storageFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-slate-200">
          <span className="text-slate-700">Total Amazon fees (estimate)</span>
          <span className="font-semibold text-slate-900">${totalFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-700">Net profit per unit</span>
          <span className={`font-semibold text-lg ${profit >= 0 ? "text-brand" : "text-red-600"}`}>
            ${profit.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-xs text-slate-500 pt-1 border-t border-slate-200">
          <span>Net margin</span>
          <span>{margin.toFixed(1)}%</span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimate — Amazon fees change often and depend on exact dimensions, weight, and season.
        Long-term storage and removal fees are excluded.
      </p>
    </div>
  );
}
