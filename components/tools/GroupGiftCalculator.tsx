"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

type Mode = "equal" | "weighted";

function splitCents(totalCents: number, weights: number[]): number[] {
  const wSum = weights.reduce((s, w) => s + w, 0);
  if (wSum <= 0 || weights.length === 0) return [];
  const raw = weights.map((w) => (totalCents * w) / wSum);
  const floors = raw.map((x) => Math.floor(x));
  let remainder = totalCents - floors.reduce((s, x) => s + x, 0);
  const fracs = raw.map((x, i) => ({ i, frac: x - floors[i] }));
  fracs.sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < fracs.length && remainder > 0; k++) {
    floors[fracs[k].i] += 1;
    remainder -= 1;
  }
  return floors;
}

export function GroupGiftCalculator() {
  const [mode, setMode] = useState<Mode>("equal");
  const [giftPrice, setGiftPrice] = useState("150");
  const [groupSize, setGroupSize] = useState("6");
  const [weightsCsv, setWeightsCsv] = useState("1,1,2,1,1,1");
  const [bufferPct, setBufferPct] = useState("10");

  const { totalWithBuffer, shares, perPersonEqual, roundedShares } = useMemo(() => {
    const price = Math.max(0, parseFloat(giftPrice) || 0);
    const buf = Math.max(0, Math.min(20, parseFloat(bufferPct) || 0));
    const total = price * (1 + buf / 100);
    const cents = Math.round(total * 100);
    let weights: number[];
    if (mode === "equal") {
      const n = Math.max(1, parseInt(groupSize) || 1);
      weights = new Array(n).fill(1);
    } else {
      weights = weightsCsv
        .split(",")
        .map((s) => parseFloat(s.trim()))
        .filter((x) => Number.isFinite(x) && x > 0);
      if (weights.length === 0) weights = [1];
    }
    const splitC = splitCents(cents, weights);
    const splitD = splitC.map((c) => c / 100);
    const perEq = weights.length > 0 ? total / weights.length : 0;
    const roundedD = splitD.map((d) => Math.ceil(d));
    return { totalWithBuffer: total, shares: splitD, perPersonEqual: perEq, roundedShares: roundedD };
  }, [mode, giftPrice, groupSize, weightsCsv, bufferPct]);

  const roundedTotal = roundedShares.reduce((s, n) => s + n, 0);

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
          Equal
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
          <span className="block text-sm font-medium text-slate-700 mb-1">Gift total price ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={giftPrice}
            onChange={(e) => setGiftPrice(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        {mode === "equal" ? (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Group size</span>
            <input
              type="number"
              inputMode="decimal"
              min={1}
              step={1}
              value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)}
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
              placeholder="1,1,2,1"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        )}
        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Buffer for card/wrap/tax: {bufferPct}%
          </span>
          <input
            type="range"
            min={0}
            max={20}
            step={1}
            value={bufferPct}
            onChange={(e) => setBufferPct(e.target.value)}
            className="w-full accent-brand"
          />
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between">
          <span>Total with buffer</span>
          <span className="font-semibold">{money(totalWithBuffer)}</span>
        </div>
        <div className="flex justify-between">
          <span>Per person (equal)</span>
          <span className="font-semibold">{money(perPersonEqual)}</span>
        </div>
        {shares.map((s, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-slate-600">Person {i + 1} — rounded up</span>
            <span className="font-semibold">
              {money(s)} <span className="text-slate-500">({money(roundedShares[i])})</span>
            </span>
          </div>
        ))}
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold">Rounded total (nearest $)</span>
          <span className="font-bold text-brand">{money(roundedTotal)}</span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimates only. Rounding up to the nearest dollar builds a small cushion for the organizer; adjust the
        buffer for tax, shipping, wrap, or a card.
      </p>
    </div>
  );
}
