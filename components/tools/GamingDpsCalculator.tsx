"use client";

import { useMemo, useState } from "react";

export function GamingDpsCalculator() {
  const [damage, setDamage] = useState("35");
  const [rpm, setRpm] = useState("600");
  const [mag, setMag] = useState("30");
  const [reload, setReload] = useState("2.5");
  const [critChance, setCritChance] = useState("20");
  const [critMult, setCritMult] = useState("2.0");

  const stats = useMemo(() => {
    const d = Number(damage);
    const r = Number(rpm);
    const m = Number(mag);
    const rl = Number(reload);
    const cc = Number(critChance);
    const cm = Number(critMult);

    if (
      !Number.isFinite(d) ||
      !Number.isFinite(r) ||
      !Number.isFinite(m) ||
      !Number.isFinite(rl) ||
      !Number.isFinite(cc) ||
      !Number.isFinite(cm) ||
      d <= 0 ||
      r <= 0 ||
      m <= 0 ||
      rl < 0
    ) {
      return null;
    }

    const rps = r / 60;
    const rawDps = d * rps;
    const timeToEmpty = m / rps; // seconds
    const sustainedDps = (m * d) / (timeToEmpty + rl);
    const critPct = Math.max(0, Math.min(100, cc)) / 100;
    const effectiveDps = rawDps * (1 + critPct * (cm - 1));

    return {
      rawDps,
      sustainedDps,
      effectiveDps,
      timeToEmptyMs: timeToEmpty * 1000,
    };
  }, [damage, rpm, mag, reload, critChance, critMult]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Damage per shot</span>
          <input
            type="number"
            value={damage}
            onChange={(e) => setDamage(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Fire rate (RPM)</span>
          <input
            type="number"
            value={rpm}
            onChange={(e) => setRpm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Magazine size</span>
          <input
            type="number"
            value={mag}
            onChange={(e) => setMag(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Reload time (s)</span>
          <input
            type="number"
            step="0.1"
            value={reload}
            onChange={(e) => setReload(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Crit chance %</span>
          <input
            type="number"
            value={critChance}
            onChange={(e) => setCritChance(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Crit multiplier</span>
          <input
            type="number"
            step="0.1"
            value={critMult}
            onChange={(e) => setCritMult(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {stats ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Raw DPS</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {stats.rawDps.toFixed(1)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Sustained DPS</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {stats.sustainedDps.toFixed(1)}
            </div>
            <div className="mt-1 text-xs text-slate-500">with reload</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Effective DPS</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {stats.effectiveDps.toFixed(1)}
            </div>
            <div className="mt-1 text-xs text-slate-500">with crits</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Time to empty mag</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {stats.timeToEmptyMs.toFixed(0)} ms
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Enter positive weapon stats to see DPS.
        </div>
      )}

      <p className="text-xs text-slate-500">
        Raw DPS = damage &times; RPM / 60. Sustained DPS accounts for reload. Effective DPS adds
        average crit damage. Works for any shooter where weapon stats are published.
      </p>
    </div>
  );
}
