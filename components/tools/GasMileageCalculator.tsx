"use client";

import { useMemo, useState } from "react";

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function fmt0(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function GasMileageCalculator() {
  const [miles, setMiles] = useState(340);
  const [gallons, setGallons] = useState(12.5);
  const [pricePerGal, setPricePerGal] = useState(3.45);
  const [monthlyMiles, setMonthlyMiles] = useState(1200);
  const [annualMiles, setAnnualMiles] = useState(14000);

  const result = useMemo(() => {
    const m = Math.max(0, miles);
    const g = Math.max(0, gallons);
    const price = Math.max(0, pricePerGal);

    const mpg = g > 0 ? m / g : 0;
    const costPerMile = mpg > 0 ? price / mpg : 0;
    const monthlyCost = Math.max(0, monthlyMiles) * costPerMile;
    const annualCost = Math.max(0, annualMiles) * costPerMile;

    return { mpg, costPerMile, monthlyCost, annualCost };
  }, [miles, gallons, pricePerGal, monthlyMiles, annualMiles]);

  const comparisonRows = useMemo(() => {
    const rows = [15, 20, 25, 30, 35, 40, 50];
    return rows.map((rowMpg) => {
      const perMile = pricePerGal / rowMpg;
      const yearCost = perMile * Math.max(0, annualMiles);
      return { mpg: rowMpg, perMile, yearCost };
    });
  }, [pricePerGal, annualMiles]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Miles driven
          </span>
          <input
            type="number"
            value={miles}
            min={0}
            step={1}
            onChange={(e) => setMiles(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Gallons used
          </span>
          <input
            type="number"
            value={gallons}
            min={0}
            step={0.1}
            onChange={(e) => setGallons(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Gas price ($/gal)
          </span>
          <input
            type="number"
            value={pricePerGal}
            min={0}
            step={0.01}
            onChange={(e) => setPricePerGal(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Monthly miles (for cost est.)
          </span>
          <input
            type="number"
            value={monthlyMiles}
            min={0}
            step={50}
            onChange={(e) => setMonthlyMiles(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Annual miles (for MPG table)
          </span>
          <input
            type="number"
            value={annualMiles}
            min={0}
            step={500}
            onChange={(e) => setAnnualMiles(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">MPG</p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {result.mpg.toFixed(1)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Cost per mile
          </p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {fmt(result.costPerMile)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Monthly fuel cost
          </p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {fmt0(result.monthlyCost)}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Annual fuel cost by MPG &mdash; at {fmt(pricePerGal)}/gal &amp;{" "}
          {Math.max(0, annualMiles).toLocaleString("en-US")} mi/yr
        </div>
        <table className="w-full min-w-[420px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">MPG</th>
              <th className="px-3 py-2 text-right">Cost per mile</th>
              <th className="px-3 py-2 text-right">Cost per year</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {comparisonRows.map((row) => {
              const isClosest =
                Math.abs(row.mpg - result.mpg) < 2.5 && result.mpg > 0;
              return (
                <tr
                  key={row.mpg}
                  className={isClosest ? "bg-brand/5" : "hover:bg-slate-50"}
                >
                  <td className="px-3 py-2 font-medium text-slate-700">
                    {row.mpg} MPG {isClosest && <span className="text-brand">&larr; yours</span>}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {fmt(row.perMile)}
                  </td>
                  <td className="px-3 py-2 text-right font-medium tabular-nums">
                    {fmt0(row.yearCost)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
