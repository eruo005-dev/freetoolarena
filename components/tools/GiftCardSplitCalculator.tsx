"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

type Mode = "equal" | "weighted";

// Split dollar amount into N shares of cents that sum exactly.
function splitCents(totalCents: number, weights: number[]): number[] {
  const wSum = weights.reduce((s, w) => s + w, 0);
  if (wSum <= 0 || weights.length === 0) return [];
  // raw share in cents
  const raw = weights.map((w) => (totalCents * w) / wSum);
  const floors = raw.map((x) => Math.floor(x));
  let remainder = totalCents - floors.reduce((s, x) => s + x, 0);
  // distribute remainder to largest fractional parts
  const fracs = raw.map((x, i) => ({ i, frac: x - floors[i] }));
  fracs.sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < fracs.length && remainder > 0; k++) {
    floors[fracs[k].i] += 1;
    remainder -= 1;
  }
  return floors;
}

export function GiftCardSplitCalculator() {
  const [mode, setMode] = useState<Mode>("equal");
  const [balance, setBalance] = useState("50");
  const [people, setPeople] = useState("3");
  const [weightsCsv, setWeightsCsv] = useState("1,2,1");

  const { shares, sum } = useMemo(() => {
    const bal = Math.max(0, parseFloat(balance) || 0);
    const cents = Math.round(bal * 100);
    let weights: number[];
    if (mode === "equal") {
      const n = Math.max(1, parseInt(people) || 1);
      weights = new Array(n).fill(1);
    } else {
      weights = weightsCsv
        .split(",")
        .map((s) => parseFloat(s.trim()))
        .filter((x) => Number.isFinite(x) && x > 0);
      if (weights.length === 0) weights = [1];
    }
    const split = splitCents(cents, weights);
    const total = split.reduce((s, c) => s + c, 0) / 100;
    return { shares: split.map((c) => c / 100), sum: total };
  }, [mode, balance, people, weightsCsv]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("equal")}
          className={
            mode === "equal"
              ? "rounded-lg bg-brand text-white px-4 py-2 font-semibold"
              : "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          }
        >
          Equal split
        </button>
        <button
          type="button"
          onClick={() => setMode("weighted")}
          className={
            mode === "weighted"
              ? "rounded-lg bg-brand text-white px-4 py-2 font-semibold"
              : "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          }
        >
          Weighted
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-slate-200 bg-white">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Gift card balance ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        {mode === "equal" ? (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Number of people</span>
            <input
              type="number"
              inputMode="decimal"
              min={1}
              step={1}
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        ) : (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Weights (comma-separated)</span>
            <input
              type="text"
              value={weightsCsv}
              onChange={(e) => setWeightsCsv(e.target.value)}
              placeholder="1,2,1"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        {shares.map((s, i) => (
          <div key={i} className="flex justify-between">
            <span>Person {i + 1}</span>
            <span className="font-semibold">{money(s)}</span>
          </div>
        ))}
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold">Total allocated</span>
          <span className="font-bold text-brand">{money(sum)}</span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimates only. Remainder cents are allocated to the first few people so the total sums exactly to the
        gift card balance.
      </p>
    </div>
  );
}
