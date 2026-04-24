"use client";

import { useMemo, useState } from "react";

type Bracket = "low" | "mid" | "high";

const SHORT_RATE: Record<Bracket, number> = {
  low: 0.12,
  mid: 0.24,
  high: 0.32,
};

const LONG_RATE: Record<Bracket, number> = {
  low: 0.0,
  mid: 0.15,
  high: 0.20,
};

const currency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export function CryptoCapitalGainsCalculator() {
  const [amount, setAmount] = useState("1");
  const [buyPrice, setBuyPrice] = useState("30000");
  const [sellPrice, setSellPrice] = useState("65000");
  const [days, setDays] = useState("400");
  const [bracket, setBracket] = useState<Bracket>("mid");

  const result = useMemo(() => {
    const coins = Number(amount);
    const buy = Number(buyPrice);
    const sell = Number(sellPrice);
    const held = Number(days);
    if (
      !Number.isFinite(coins) ||
      !Number.isFinite(buy) ||
      !Number.isFinite(sell) ||
      !Number.isFinite(held) ||
      coins <= 0 ||
      buy < 0 ||
      sell < 0 ||
      held < 0
    ) {
      return null;
    }

    const costBasis = buy * coins;
    const proceeds = sell * coins;
    const gain = proceeds - costBasis;
    const isLongTerm = held > 365;

    const shortRate = SHORT_RATE[bracket];
    const longRate = LONG_RATE[bracket];

    const shortTax = gain > 0 ? gain * shortRate : 0;
    const longTax = gain > 0 ? gain * longRate : 0;
    const appliedTax = isLongTerm ? longTax : shortTax;
    const netAfterTax = proceeds - appliedTax;

    return {
      costBasis,
      proceeds,
      gain,
      isLongTerm,
      shortTax,
      longTax,
      appliedTax,
      netAfterTax,
      shortRate,
      longRate,
    };
  }, [amount, buyPrice, sellPrice, days, bracket]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Amount sold (coins)</span>
          <input
            type="number"
            value={amount}
            min={0}
            step="any"
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Holding period (days)</span>
          <input
            type="number"
            value={days}
            min={0}
            step={1}
            onChange={(e) => setDays(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Buy price per coin ($)</span>
          <input
            type="number"
            value={buyPrice}
            min={0}
            step="any"
            onChange={(e) => setBuyPrice(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Sell price per coin ($)</span>
          <input
            type="number"
            value={sellPrice}
            min={0}
            step="any"
            onChange={(e) => setSellPrice(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-slate-700">Income bracket</span>
          <select
            value={bracket}
            onChange={(e) => setBracket(e.target.value as Bracket)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value="low">Low (short 12% / long 0%)</option>
            <option value="mid">Mid (short 24% / long 15%)</option>
            <option value="high">High (short 32% / long 20%)</option>
          </select>
        </label>
      </div>

      {result ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Gross gain</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {currency(result.gain)}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Cost basis {currency(result.costBasis)} &rarr; proceeds {currency(result.proceeds)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Classification
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.isLongTerm ? "Long-term" : "Short-term"}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Held {Number(days)} days &mdash; long-term threshold is &gt;365 days
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Short-term tax ({(result.shortRate * 100).toFixed(0)}%)
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {currency(result.shortTax)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Long-term tax ({(result.longRate * 100).toFixed(0)}%)
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {currency(result.longTax)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Net proceeds after {result.isLongTerm ? "long-term" : "short-term"} tax
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {currency(result.netAfterTax)}
              </div>
            </div>
          </div>

          <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            Not tax advice. Estimates use simplified federal rates and ignore state tax, wash-sale
            rules, NIIT, AMT, and cost-basis method choices. Consult a CPA or use IRS-certified
            software for your actual return.
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter positive numeric values to estimate tax.</p>
      )}
    </div>
  );
}
