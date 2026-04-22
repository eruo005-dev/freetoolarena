"use client";

import { useMemo, useState } from "react";

const ZONES: { zone: number; low: number; high: number; label: string; purpose: string }[] = [
  { zone: 1, low: 0.5, high: 0.6, label: "Zone 1 · Very light", purpose: "Recovery, warm-up" },
  { zone: 2, low: 0.6, high: 0.7, label: "Zone 2 · Light", purpose: "Endurance, fat burn" },
  { zone: 3, low: 0.7, high: 0.8, label: "Zone 3 · Moderate", purpose: "Aerobic capacity" },
  { zone: 4, low: 0.8, high: 0.9, label: "Zone 4 · Hard", purpose: "Lactate threshold" },
  { zone: 5, low: 0.9, high: 1.0, label: "Zone 5 · Maximum", purpose: "VO2 max, sprint" },
];

export function HeartRateZoneCalculator() {
  const [age, setAge] = useState("30");
  const [restingHr, setRestingHr] = useState("");

  const { mhr, useKarvonen, mhrZones, karvonenZones } = useMemo(() => {
    const a = parseFloat(age) || 0;
    const rhr = parseFloat(restingHr);
    const mhr = a > 0 ? 220 - a : 0;
    const useKarvonen = Number.isFinite(rhr) && rhr > 0 && rhr < mhr;
    const mhrZones = ZONES.map((z) => ({
      ...z,
      low: Math.round(mhr * z.low),
      high: Math.round(mhr * z.high),
    }));
    const karvonenZones = useKarvonen
      ? ZONES.map((z) => ({
          ...z,
          low: Math.round((mhr - rhr) * z.low + rhr),
          high: Math.round((mhr - rhr) * z.high + rhr),
        }))
      : [];
    return { mhr, useKarvonen, mhrZones, karvonenZones };
  }, [age, restingHr]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Age</span>
          <input
            type="number"
            inputMode="decimal"
            min={1}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Resting HR (optional, for Karvonen)
          </span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            placeholder="e.g. 60"
            value={restingHr}
            onChange={(e) => setRestingHr(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Maximum HR</p>
            <p className="text-2xl font-bold text-brand">{mhr > 0 ? `${mhr} bpm` : "—"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Formula</p>
            <p className="text-sm font-semibold text-slate-900">220 − age</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
            Zones by % of MHR
          </p>
          <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
            {mhrZones.map((z) => (
              <li key={z.zone} className="flex items-center justify-between px-4 py-2.5 text-sm">
                <div>
                  <p className="font-semibold text-slate-800">{z.label}</p>
                  <p className="text-xs text-slate-500">{z.purpose}</p>
                </div>
                <p className="font-bold tabular-nums text-slate-900">
                  {z.low}–{z.high} <span className="text-xs font-medium text-slate-500">bpm</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        {useKarvonen && (
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
              Karvonen (heart-rate reserve)
            </p>
            <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
              {karvonenZones.map((z) => (
                <li key={z.zone} className="flex items-center justify-between px-4 py-2.5 text-sm">
                  <div>
                    <p className="font-semibold text-slate-800">{z.label}</p>
                    <p className="text-xs text-slate-500">{z.purpose}</p>
                  </div>
                  <p className="font-bold tabular-nums text-slate-900">
                    {z.low}–{z.high} <span className="text-xs font-medium text-slate-500">bpm</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-slate-500">
              Karvonen: Target = ((MHR − RHR) × %intensity) + RHR
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
