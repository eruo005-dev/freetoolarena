"use client";

import { useMemo, useState } from "react";

type Frequency = "daily" | "weekly" | "biweekly" | "monthly";

const FREQ_PER_YEAR: Record<Frequency, number> = {
  daily: 365,
  weekly: 52,
  biweekly: 26,
  monthly: 12,
};

const currency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export function CryptoDcaCalculator() {
  const [amount, setAmount] = useState("100");
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [years, setYears] = useState("5");
  const [startPrice, setStartPrice] = useState("60000");
  const [growth, setGrowth] = useState("25");

  const result = useMemo(() => {
    const perBuy = Number(amount);
    const yrs = Number(years);
    const start = Number(startPrice);
    const g = Number(growth) / 100;
    if (
      !Number.isFinite(perBuy) ||
      !Number.isFinite(yrs) ||
      !Number.isFinite(start) ||
      !Number.isFinite(g) ||
      perBuy <= 0 ||
      yrs <= 0 ||
      start <= 0
    ) {
      return null;
    }

    const perYear = FREQ_PER_YEAR[frequency];
    const periods = Math.round(perYear * yrs);
    const perPeriod = g / perYear;
    const totalContributed = perBuy * periods;

    // FV of a series of equal contributions, assuming each buy buys crypto that then compounds
    // simplified: each buy grows at perPeriod compounded for remaining periods
    let endingValue = 0;
    let coinsHeld = 0;
    let priceNow = start;
    let costBasisTotal = 0;
    for (let i = 0; i < periods; i++) {
      const coinsBought = perBuy / priceNow;
      coinsHeld += coinsBought;
      costBasisTotal += perBuy;
      priceNow = priceNow * (1 + perPeriod);
    }
    endingValue = coinsHeld * priceNow;
    const avgCostBasis = costBasisTotal / coinsHeld;
    const netGain = endingValue - totalContributed;
    const gainPct = (netGain / totalContributed) * 100;

    // lump sum comparison
    const coinsLump = totalContributed / start;
    const lumpEnding = coinsLump * priceNow;
    const lumpGain = lumpEnding - totalContributed;

    return {
      totalContributed,
      endingValue,
      avgCostBasis,
      netGain,
      gainPct,
      lumpEnding,
      lumpGain,
      periods,
      coinsHeld,
      finalPrice: priceNow,
    };
  }, [amount, frequency, years, startPrice, growth]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Amount per purchase ($)</span>
          <input
            type="number"
            value={amount}
            min={1}
            step={10}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Frequency</span>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Frequency)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Years to DCA</span>
          <input
            type="number"
            value={years}
            min={1}
            step={1}
            onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Starting price ($)</span>
          <input
            type="number"
            value={startPrice}
            min={1}
            step={100}
            onChange={(e) => setStartPrice(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-slate-700">
            Projected annual growth % (default 25% &mdash; optimistic)
          </span>
          <input
            type="number"
            value={growth}
            step={1}
            onChange={(e) => setGrowth(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
        Warning: crypto is volatile and past returns don&rsquo;t predict future performance. Real outcomes can deviate sharply from any projection.
      </p>

      {result ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Ending value (DCA)</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {currency(result.endingValue)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Total contributed</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {currency(result.totalContributed)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Net gain</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {currency(result.netGain)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Gain %</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.gainPct.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <div className="font-medium text-slate-800">Lump-sum comparison</div>
            <p className="mt-1">
              If you invested {currency(result.totalContributed)} all up-front at{" "}
              {currency(Number(startPrice))}, it would end at{" "}
              <span className="font-semibold tabular-nums text-brand">
                {currency(result.lumpEnding)}
              </span>{" "}
              (gain {currency(result.lumpGain)}). Lump-sum typically wins when markets rise; DCA
              wins when prices are flat or volatile.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Avg cost basis: {currency(result.avgCostBasis)} &middot; Coins held:{" "}
              {result.coinsHeld.toFixed(6)} &middot; {result.periods} total buys
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter positive numeric values to project outcomes.</p>
      )}
    </div>
  );
}
