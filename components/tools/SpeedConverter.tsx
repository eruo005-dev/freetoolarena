"use client";

import { useMemo, useState } from "react";

// Meters per second is the base unit
const UNITS: Record<string, number> = {
  "m/s": 1,
  "km/h": 1 / 3.6,
  mph: 0.44704,
  knot: 0.514444,
  "ft/s": 0.3048,
};

export function SpeedConverter() {
  const [value, setValue] = useState(60);
  const [from, setFrom] = useState("mph");
  const [to, setTo] = useState("km/h");

  const result = useMemo(() => {
    const mps = value * UNITS[from];
    return mps / UNITS[to];
  }, [value, from, to]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Value</span>
          <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">From</span>
          <select value={from} onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            {Object.keys(UNITS).map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">To</span>
          <select value={to} onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            {Object.keys(UNITS).map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>
      </div>
      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">Result</p>
        <p className="text-3xl font-bold">{result.toLocaleString("en-US", { maximumFractionDigits: 4 })} <span className="text-base font-normal text-white/80">{to}</span></p>
      </div>
    </div>
  );
}
