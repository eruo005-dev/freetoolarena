"use client";

import { useMemo, useState } from "react";

type MileBand = "u10" | "10to15" | "15to20" | "over20";

function fmt0(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

/**
 * Depreciation rate for a given year of ownership (year 1 = first year).
 * Year 1: ~20%, years 2-5: ~15%, year 6+: ~8%.
 */
function baseDepRate(yearOfOwnership: number): number {
  if (yearOfOwnership <= 1) return 0.2;
  if (yearOfOwnership <= 5) return 0.15;
  return 0.08;
}

/**
 * Mileage multiplier: higher annual miles accelerate depreciation 5-10%.
 */
function mileMultiplier(band: MileBand): number {
  switch (band) {
    case "u10":
      return 0.95; // 5% slower
    case "10to15":
      return 1.0; // typical
    case "15to20":
      return 1.05; // 5% faster
    case "over20":
      return 1.1; // 10% faster
  }
}

interface YearRow {
  year: number;
  calendarYear: number;
  value: number;
  lossThisYear: number;
  totalLoss: number;
  pctOfOriginal: number;
}

export function CarDepreciationCalculator() {
  const [price, setPrice] = useState(32000);
  const [purchaseYear, setPurchaseYear] = useState(2024);
  const [currentYear, setCurrentYear] = useState(2026);
  const [mileBand, setMileBand] = useState<MileBand>("10to15");

  const { rows, currentValue, yearsHeld, totalPctLoss } = useMemo(() => {
    const p = Math.max(0, price);
    const mult = mileMultiplier(mileBand);
    const py = Math.max(1900, Math.round(purchaseYear));
    const cy = Math.max(py, Math.round(currentYear));
    const held = Math.max(0, cy - py);

    const years: YearRow[] = [];
    let value = p;
    for (let y = 1; y <= 10; y++) {
      const rate = Math.min(0.35, baseDepRate(y) * mult);
      const loss = value * rate;
      value = Math.max(0, value - loss);
      years.push({
        year: y,
        calendarYear: py + y,
        value,
        lossThisYear: loss,
        totalLoss: p - value,
        pctOfOriginal: p > 0 ? (value / p) * 100 : 0,
      });
    }

    let current = p;
    for (let y = 1; y <= held; y++) {
      const rate = Math.min(0.35, baseDepRate(y) * mult);
      current = Math.max(0, current - current * rate);
    }
    const pctLoss = p > 0 ? ((p - current) / p) * 100 : 0;

    return {
      rows: years,
      currentValue: current,
      yearsHeld: held,
      totalPctLoss: pctLoss,
    };
  }, [price, purchaseYear, currentYear, mileBand]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Purchase price ($)
          </span>
          <input
            type="number"
            value={price}
            min={0}
            step={500}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Annual miles
          </span>
          <select
            value={mileBand}
            onChange={(e) => setMileBand(e.target.value as MileBand)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value="u10">Under 10,000 mi/yr</option>
            <option value="10to15">10,000&ndash;15,000 mi/yr</option>
            <option value="15to20">15,000&ndash;20,000 mi/yr</option>
            <option value="over20">Over 20,000 mi/yr</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Purchase year
          </span>
          <input
            type="number"
            value={purchaseYear}
            min={1990}
            max={currentYear}
            step={1}
            onChange={(e) => setPurchaseYear(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Current year
          </span>
          <input
            type="number"
            value={currentYear}
            min={purchaseYear}
            max={2100}
            step={1}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Estimated current value
          </p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {fmt0(currentValue)}
          </p>
          <p className="mt-1 text-xs text-slate-600">
            After {yearsHeld} year{yearsHeld === 1 ? "" : "s"}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Total depreciation
          </p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {totalPctLoss.toFixed(1)}%
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Lost: {fmt0(Math.max(0, price - currentValue))}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Avg loss per year
          </p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {fmt0(
              yearsHeld > 0 ? (price - currentValue) / yearsHeld : 0,
            )}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Depreciation schedule (first 10 years)
        </div>
        <table className="w-full min-w-[520px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Year</th>
              <th className="px-3 py-2 text-right">Loss this year</th>
              <th className="px-3 py-2 text-right">Total lost</th>
              <th className="px-3 py-2 text-right">Value</th>
              <th className="px-3 py-2 text-right">% of original</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => {
              const isCurrent = r.year === yearsHeld && yearsHeld > 0;
              return (
                <tr
                  key={r.year}
                  className={isCurrent ? "bg-brand/5" : "hover:bg-slate-50"}
                >
                  <td className="px-3 py-2 font-medium text-slate-700">
                    Yr {r.year} ({r.calendarYear})
                    {isCurrent && (
                      <span className="ml-1 text-brand">&larr; now</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right text-rose-700 tabular-nums">
                    {fmt0(r.lossThisYear)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-slate-600">
                    {fmt0(r.totalLoss)}
                  </td>
                  <td className="px-3 py-2 text-right font-medium tabular-nums">
                    {fmt0(r.value)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-slate-600">
                    {r.pctOfOriginal.toFixed(0)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Note: actual resale value varies by make, model, condition, accident
        history, and region. Luxury brands and trucks hold value differently
        than economy sedans &mdash; this is a typical-case estimate.
      </p>
    </div>
  );
}
