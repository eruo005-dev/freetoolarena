"use client";

import { useMemo, useState } from "react";

type StateRow = { code: string; name: string; rate: number };

// 2024 effective property tax rates (approx, as % of home value)
const STATES: StateRow[] = [
  { code: "NJ", name: "New Jersey", rate: 2.21 },
  { code: "IL", name: "Illinois", rate: 2.05 },
  { code: "NH", name: "New Hampshire", rate: 1.96 },
  { code: "CT", name: "Connecticut", rate: 1.79 },
  { code: "VT", name: "Vermont", rate: 1.71 },
  { code: "TX", name: "Texas", rate: 1.63 },
  { code: "NE", name: "Nebraska", rate: 1.54 },
  { code: "WI", name: "Wisconsin", rate: 1.53 },
  { code: "OH", name: "Ohio", rate: 1.36 },
  { code: "PA", name: "Pennsylvania", rate: 1.35 },
  { code: "NY", name: "New York", rate: 1.3 },
  { code: "MI", name: "Michigan", rate: 1.24 },
  { code: "MA", name: "Massachusetts", rate: 1.04 },
  { code: "FL", name: "Florida", rate: 0.86 },
  { code: "NC", name: "North Carolina", rate: 0.7 },
  { code: "VA", name: "Virginia", rate: 0.75 },
  { code: "CA", name: "California", rate: 0.71 },
  { code: "AZ", name: "Arizona", rate: 0.51 },
  { code: "NV", name: "Nevada", rate: 0.48 },
  { code: "AL", name: "Alabama", rate: 0.4 },
  { code: "HI", name: "Hawaii", rate: 0.28 },
  { code: "OTHER", name: "Other / custom rate", rate: 1.1 },
];

const US_AVG = 1.1;

const money = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : "—";

const moneyExact = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : "—";

export function PropertyTaxCalculator() {
  const [value, setValue] = useState(425000);
  const [stateCode, setStateCode] = useState("TX");
  const [customRate, setCustomRate] = useState(1.1);

  const selected = STATES.find((s) => s.code === stateCode) ?? STATES[STATES.length - 1];
  const effectiveRate = stateCode === "OTHER" ? customRate : selected.rate;

  const result = useMemo(() => {
    const v = Number.isFinite(value) ? value : 0;
    const r = Number.isFinite(effectiveRate) ? effectiveRate : 0;
    const annual = v * (r / 100);
    const monthly = annual / 12;
    const vsNatl = r - US_AVG;

    // rank among the fixed-rate states
    const ranked = [...STATES.filter((s) => s.code !== "OTHER")].sort((a, b) => b.rate - a.rate);
    const rank = ranked.findIndex((s) => s.code === selected.code) + 1;

    return { annual, monthly, vsNatl, rank, totalStates: ranked.length };
  }, [value, effectiveRate, selected]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Home value (assessed)</span>
          <input
            type="number"
            min={0}
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">State</span>
          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
                {s.code === "OTHER" ? "" : ` (${s.rate.toFixed(2)}%)`}
              </option>
            ))}
          </select>
        </label>
        {stateCode === "OTHER" && (
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block font-medium text-slate-700">Custom effective rate %</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={customRate}
              onChange={(e) => setCustomRate(parseFloat(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            />
          </label>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Annual property tax</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {money(result.annual)}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Monthly escrow portion</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {moneyExact(result.monthly)}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">% of home value</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {effectiveRate.toFixed(2)}%
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            {stateCode === "OTHER" ? "State rank" : "Rank of listed states"}
          </div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {stateCode === "OTHER" ? "—" : `#${result.rank} of ${result.totalStates}`}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
        <div className="mb-1 font-semibold text-slate-700">Property tax vs national average</div>
        <p className="text-slate-600">
          The U.S. average effective property tax rate is about <strong>{US_AVG.toFixed(2)}%</strong>.
          {" "}
          {result.vsNatl > 0
            ? `Your selected rate is ${result.vsNatl.toFixed(2)} pts above average — roughly ${money(
                value * (result.vsNatl / 100),
              )}/yr more tax than the typical U.S. home at the same value.`
            : result.vsNatl < 0
            ? `Your selected rate is ${Math.abs(result.vsNatl).toFixed(
                2,
              )} pts below average — roughly ${money(
                value * (Math.abs(result.vsNatl) / 100),
              )}/yr less tax than the typical U.S. home at the same value.`
            : "Your selected rate matches the national average."}
        </p>
      </div>

      <p className="text-xs text-slate-500">
        Effective rates are statewide averages &mdash; actual bills vary by county, city, and
        school district. Always confirm with the local assessor&rsquo;s office.
      </p>
    </div>
  );
}
