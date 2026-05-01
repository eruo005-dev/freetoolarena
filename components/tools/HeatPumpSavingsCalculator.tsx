"use client";

import { useMemo, useState } from "react";

type Climate = "mild" | "moderate" | "cold" | "veryCold";
type Source = "gas" | "oil" | "propane" | "electric_resistance";

const ANNUAL_BTU = { mild: 30000, moderate: 50000, cold: 80000, veryCold: 110000 };

const FUEL_PRICE_PER_MMBTU: Record<Source, number> = {
  gas: 14,
  oil: 28,
  propane: 32,
  electric_resistance: 35,
};

export function HeatPumpSavingsCalculator() {
  const [climate, setClimate] = useState<Climate>("moderate");
  const [source, setSource] = useState<Source>("gas");
  const [sqft, setSqft] = useState<number>(2000);
  const [installCost, setInstallCost] = useState<number>(14000);
  const [rebate, setRebate] = useState<number>(8000);
  const [elec, setElec] = useState<number>(0.18);

  const result = useMemo(() => {
    const annualBtu = ANNUAL_BTU[climate] * (sqft / 2000);
    const annualMmbtu = annualBtu * 12 / 1_000_000;
    const oldCost = annualMmbtu * FUEL_PRICE_PER_MMBTU[source];
    const cop = climate === "veryCold" ? 2.5 : climate === "cold" ? 3.0 : 3.5;
    const kwhNeeded = (annualMmbtu * 293.07) / cop;
    const heatPumpCost = kwhNeeded * elec;
    const annualSavings = oldCost - heatPumpCost;
    const netCost = installCost - rebate;
    const paybackYears = annualSavings > 0 ? netCost / annualSavings : Infinity;
    const co2Saved = source === "gas" ? annualMmbtu * 53 : source === "oil" ? annualMmbtu * 73 : source === "propane" ? annualMmbtu * 63 : 0; // kg CO2e
    return { oldCost, heatPumpCost, annualSavings, netCost, paybackYears, co2Saved, kwhNeeded };
  }, [climate, source, sqft, installCost, rebate, elec]);

  const fmt = (n: number) => "$" + Math.round(n).toLocaleString();

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Climate</span>
          <select value={climate} onChange={(e) => setClimate(e.target.value as Climate)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="mild">Mild (Atlanta, LA)</option>
            <option value="moderate">Moderate (DC, Chicago)</option>
            <option value="cold">Cold (Boston, Minneapolis)</option>
            <option value="veryCold">Very Cold (Maine, North Dakota)</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Current heating fuel</span>
          <select value={source} onChange={(e) => setSource(e.target.value as Source)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="gas">Natural gas</option>
            <option value="oil">Heating oil</option>
            <option value="propane">Propane</option>
            <option value="electric_resistance">Electric resistance / baseboard</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">House size (sq ft)</span>
          <input type="number" min={500} value={sqft} onChange={(e) => setSqft(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Electricity rate ($/kWh)</span>
          <input type="number" min={0.05} max={0.50} step={0.01} value={elec} onChange={(e) => setElec(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Install cost (before rebate)</span>
          <input type="number" min={0} value={installCost} onChange={(e) => setInstallCost(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Rebates + tax credits</span>
          <input type="number" min={0} value={rebate} onChange={(e) => setRebate(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-rose-300 bg-rose-50 p-4">
          <div className="text-xs uppercase tracking-wide text-rose-700">Current annual cost</div>
          <div className="text-2xl font-bold text-rose-900">{fmt(result.oldCost)}</div>
        </div>
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
          <div className="text-xs uppercase tracking-wide text-emerald-700">Heat pump annual cost</div>
          <div className="text-2xl font-bold text-emerald-900">{fmt(result.heatPumpCost)}</div>
        </div>
        <div className="rounded-lg border border-brand bg-blue-50 p-4">
          <div className="text-xs uppercase tracking-wide text-brand">Annual savings</div>
          <div className="text-2xl font-bold text-brand">{fmt(result.annualSavings)}</div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">Payback math</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li><strong>Net install cost (after rebates):</strong> {fmt(result.netCost)}</li>
          <li><strong>Payback period:</strong> {Number.isFinite(result.paybackYears) ? `${result.paybackYears.toFixed(1)} years` : "N/A"}</li>
          <li><strong>10-year savings (post-payback):</strong> {fmt(Math.max(0, result.annualSavings * 10 - result.netCost))}</li>
          <li><strong>CO&#8322; avoided:</strong> {Math.round(result.co2Saved)} kg/year (vs current fuel)</li>
        </ul>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        Federal Inflation Reduction Act offers up to $2,000 federal tax credit + state-level rebates often $4,000-8,000.
        Check <code>energy.gov</code> for your state. Cold-climate heat pumps (Mitsubishi Hyper-Heat, Bosch IDS) work
        reliably to -5&deg;F. Below that, dual-fuel hybrid setups bridge the gap.
      </div>
    </div>
  );
}
