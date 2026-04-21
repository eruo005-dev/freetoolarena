"use client";

import { useMemo, useState } from "react";

function fmt(sec: number): string {
  if (!Number.isFinite(sec) || sec <= 0) return "—";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.round(sec % 60);
  return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
                : `${m}:${s.toString().padStart(2, "0")}`;
}

export function RunningPaceCalculator() {
  const [distance, setDistance] = useState(5);
  const [unit, setUnit] = useState<"km" | "mi">("km");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const r = useMemo(() => {
    const totalSec = hours * 3600 + minutes * 60 + seconds;
    const pace = distance > 0 ? totalSec / distance : 0; // seconds per unit
    const kmSec = unit === "km" ? pace : pace / 1.609344;
    const miSec = unit === "mi" ? pace : pace * 1.609344;
    const kmh = distance > 0 ? (unit === "km" ? distance : distance * 1.609344) / (totalSec / 3600) : 0;
    const mph = kmh / 1.609344;
    return { kmSec, miSec, kmh, mph };
  }, [distance, unit, hours, minutes, seconds]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Distance</span>
          <input type="number" value={distance} step={0.1} onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Unit</span>
          <select value={unit} onChange={(e) => setUnit(e.target.value as "km" | "mi")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            <option value="km">km</option>
            <option value="mi">mi</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Hours</span>
          <input type="number" min={0} value={hours} onChange={(e) => setHours(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Minutes</span>
          <input type="number" min={0} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Seconds</span>
          <input type="number" min={0} max={59} value={seconds} onChange={(e) => setSeconds(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-brand-dark text-white p-4">
          <p className="text-xs uppercase tracking-wide text-white/70">Pace (per km)</p>
          <p className="text-xl font-bold">{fmt(r.kmSec)} /km</p>
        </div>
        <div className="rounded-lg bg-brand-dark text-white p-4">
          <p className="text-xs uppercase tracking-wide text-white/70">Pace (per mile)</p>
          <p className="text-xl font-bold">{fmt(r.miSec)} /mi</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Speed</p>
          <p className="font-semibold">{r.kmh.toFixed(2)} km/h · {r.mph.toFixed(2)} mph</p>
        </div>
      </div>
    </div>
  );
}
