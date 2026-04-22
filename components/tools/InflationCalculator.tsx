"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

// Anchor CPI values (US CPI-U annual averages, approximate)
const ANCHORS: Array<[number, number]> = [
  [1914, 10.0],
  [1920, 20.0],
  [1930, 16.7],
  [1940, 14.0],
  [1950, 24.1],
  [1960, 29.6],
  [1970, 38.8],
  [1980, 82.4],
  [1990, 130.7],
  [2000, 172.2],
  [2010, 218.1],
  [2015, 237.0],
  [2020, 258.8],
  [2022, 292.7],
  [2023, 304.7],
  [2024, 314.4],
];

const MIN_YEAR = 1914;
const MAX_YEAR = 2024;

// Build a full CPI table 1914..2024 via linear interpolation between anchors.
function buildCpiTable(): Record<number, number> {
  const table: Record<number, number> = {};
  for (let i = 0; i < ANCHORS.length - 1; i++) {
    const [y0, v0] = ANCHORS[i];
    const [y1, v1] = ANCHORS[i + 1];
    for (let y = y0; y < y1; y++) {
      const t = (y - y0) / (y1 - y0);
      table[y] = v0 + (v1 - v0) * t;
    }
  }
  const [lastY, lastV] = ANCHORS[ANCHORS.length - 1];
  table[lastY] = lastV;
  return table;
}

const CPI = buildCpiTable();

function cpiFor(year: number): number {
  const y = Math.max(MIN_YEAR, Math.min(MAX_YEAR, Math.round(year)));
  return CPI[y] ?? ANCHORS[ANCHORS.length - 1][1];
}

export interface InflationCalculatorProps {
  /** Initial amount ($). Overridable via ?amount=100. */
  initialAmount?: number;
  /** Initial start year (1914-2024). Overridable via ?start=1980. */
  initialStartYear?: number;
  /** Initial end year (1914-2024). Overridable via ?end=2024. */
  initialEndYear?: number;
}

export function InflationCalculator({
  initialAmount = 100,
  initialStartYear = 1980,
  initialEndYear = 2024,
}: InflationCalculatorProps = {}) {
  const [amount, setAmount] = useState(initialAmount);
  const [startYear, setStartYear] = useState(initialStartYear);
  const [endYear, setEndYear] = useState(initialEndYear);

  const r = useMemo(() => {
    const a = Math.max(0, amount || 0);
    const s = Math.max(MIN_YEAR, Math.min(MAX_YEAR, Math.round(startYear || MIN_YEAR)));
    const e = Math.max(MIN_YEAR, Math.min(MAX_YEAR, Math.round(endYear || MAX_YEAR)));
    const cs = cpiFor(s);
    const ce = cpiFor(e);
    const equiv = cs > 0 ? a * (ce / cs) : 0;
    const totalPct = cs > 0 ? ((ce - cs) / cs) * 100 : 0;
    const years = Math.max(1, e - s);
    const annualized = cs > 0 && e !== s ? (Math.pow(ce / cs, 1 / years) - 1) * 100 : 0;
    return { equiv, totalPct, annualized, years: e - s };
  }, [amount, startYear, endYear]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Start year</span>
          <input
            type="number"
            inputMode="decimal"
            min={MIN_YEAR}
            max={MAX_YEAR}
            step={1}
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">End year</span>
          <input
            type="number"
            inputMode="decimal"
            min={MIN_YEAR}
            max={MAX_YEAR}
            step={1}
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Equivalent value</p>
          <p className="text-3xl font-bold text-brand">{money(r.equiv)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total inflation</p>
          <p className="text-xl font-bold text-slate-900">{r.totalPct.toFixed(2)}%</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Annualized rate</p>
          <p className="text-xl font-bold text-slate-900">{r.annualized.toFixed(2)}%</p>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Uses approximate US CPI-U annual averages (1914–2024) with linear interpolation between anchor years.
      </p>
    </div>
  );
}
