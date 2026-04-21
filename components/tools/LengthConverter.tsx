"use client";

import { useMemo, useState } from "react";

// All factors relative to meters
const UNITS: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

export function LengthConverter() {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");

  const result = useMemo(() => {
    const meters = value * UNITS[from];
    return meters / UNITS[to];
  }, [value, from, to]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <label className="block col-span-1">
          <span className="block text-sm font-medium text-slate-700 mb-1">Value</span>
          <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block col-span-1">
          <span className="block text-sm font-medium text-slate-700 mb-1">From</span>
          <select value={from} onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            {Object.keys(UNITS).map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>
        <label className="block col-span-1">
          <span className="block text-sm font-medium text-slate-700 mb-1">To</span>
          <select value={to} onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            {Object.keys(UNITS).map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>
      </div>
      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">Result</p>
        <p className="text-3xl font-bold">{result.toLocaleString("en-US", { maximumFractionDigits: 6 })} <span className="text-base font-normal text-white/80">{to}</span></p>
      </div>
    </div>
  );
}
