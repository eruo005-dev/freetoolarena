"use client";

import { useMemo, useState } from "react";

function currency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function RoadTripFuelStops() {
  const [tripMiles, setTripMiles] = useState("1200");
  const [tank, setTank] = useState("14");
  const [mpg, setMpg] = useState("32");
  const [buffer, setBuffer] = useState("20");
  const [startPct, setStartPct] = useState("100");
  const [gasPrice, setGasPrice] = useState("3.50");

  const result = useMemo(() => {
    const trip = parseFloat(tripMiles);
    const cap = parseFloat(tank);
    const m = parseFloat(mpg);
    const buf = parseFloat(buffer);
    const start = parseFloat(startPct);
    const price = parseFloat(gasPrice);

    if (![trip, cap, m, buf, start, price].every(Number.isFinite)) return null;
    if (trip <= 0 || cap <= 0 || m <= 0 || buf < 0 || buf >= 100 || start <= 0 || start > 100 || price < 0) return null;

    const usableFraction = 1 - buf / 100;
    const fullRange = cap * m * usableFraction;
    const startRange = cap * (start / 100) * m * usableFraction + (cap * (start / 100) * m) * (1 - usableFraction) * 0;
    // startRange = usable miles from starting tank to buffer threshold
    const startRangeAdj = Math.max(0, cap * m * (start / 100) - cap * m * (buf / 100));

    let stops = 0;
    const stopMiles: number[] = [];
    let cumulative = startRangeAdj;

    if (cumulative < trip) {
      while (cumulative < trip) {
        stops++;
        stopMiles.push(Math.round(cumulative));
        cumulative += fullRange;
        if (stops > 200) break;
      }
    }

    const totalGallonsBurned = trip / m;
    const totalCost = totalGallonsBurned * price;
    const milesBetween = Math.round(fullRange);

    return {
      stops,
      stopMiles,
      startRange: Math.round(startRangeAdj),
      fullRange: Math.round(fullRange),
      milesBetween,
      totalGallons: totalGallonsBurned,
      totalCost,
    };
  }, [tripMiles, tank, mpg, buffer, startPct, gasPrice]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Total trip miles</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={10}
            value={tripMiles}
            onChange={(e) => setTripMiles(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Tank capacity (gallons)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.5}
            value={tank}
            onChange={(e) => setTank(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">MPG</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.1}
            value={mpg}
            onChange={(e) => setMpg(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Reserve buffer %</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={60}
            step={1}
            value={buffer}
            onChange={(e) => setBuffer(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Starting tank %</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={100}
            step={1}
            value={startPct}
            onChange={(e) => setStartPct(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Gas price ($/gal)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={gasPrice}
            onChange={(e) => setGasPrice(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      {result ? (
        <>
          <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Fuel stops needed</p>
              <p className="text-3xl font-bold text-brand">{result.stops}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Miles between stops</p>
              <p className="text-3xl font-bold text-slate-900">{result.milesBetween}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Starting usable range</p>
              <p className="text-3xl font-bold text-slate-900">{result.startRange} mi</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total gallons</p>
              <p className="text-xl font-bold text-slate-900">{result.totalGallons.toFixed(1)} gal</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Estimated fuel cost</p>
              <p className="text-xl font-bold text-slate-900">{currency(result.totalCost)}</p>
            </div>
          </div>

          {result.stops > 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2">
              <p className="text-sm font-semibold text-slate-800">Your fuel-stop mile markers</p>
              <ul className="text-sm text-slate-700 space-y-1">
                {result.stopMiles.map((m, i) => (
                  <li key={i} className="flex items-center justify-between border-b border-slate-100 last:border-0 py-1.5">
                    <span>Fuel stop {i + 1}</span>
                    <span className="font-mono font-semibold text-brand">mile {m.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500">Plan your actual stops a few miles before each marker &mdash; exit availability beats precision.</p>
            </div>
          ) : (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
              You can make this trip on the starting tank with buffer to spare. No refuel needed.
            </div>
          )}
        </>
      ) : (
        <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">Enter positive values for trip miles, tank, MPG, and a buffer under 100%.</div>
      )}

      <p className="text-xs text-slate-500">
        Range math assumes steady highway MPG and a flat buffer. Real trips vary with headwind, elevation, AC load, and cargo &mdash; keep the 20% reserve, especially in remote stretches where the next station could be 100+ miles away.
      </p>
    </div>
  );
}
