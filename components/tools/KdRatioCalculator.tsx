"use client";

import { useMemo, useState } from "react";

function tierLabel(kd: number): string {
  if (kd < 0.8) return "Beginner";
  if (kd < 1.2) return "Average";
  if (kd < 2.0) return "Good";
  if (kd < 3.0) return "Elite";
  return "Unreal";
}

export function KdRatioCalculator() {
  const [kills, setKills] = useState("150");
  const [deaths, setDeaths] = useState("120");
  const [assists, setAssists] = useState("60");
  const [targetKd, setTargetKd] = useState("2.0");

  const current = useMemo(() => {
    const k = Number(kills);
    const d = Number(deaths);
    const a = Number(assists);
    if (!Number.isFinite(k) || !Number.isFinite(d) || k < 0 || d < 0) return null;
    const kd = k / Math.max(1, d);
    const kda = Number.isFinite(a) && a >= 0 ? (k + a) / Math.max(1, d) : null;
    return { kd, kda, tier: tierLabel(kd) };
  }, [kills, deaths, assists]);

  const projection = useMemo(() => {
    if (!current) return null;
    const t = Number(targetKd);
    const k = Number(kills);
    const d = Number(deaths);
    if (!Number.isFinite(t) || t <= 0 || !Number.isFinite(k) || !Number.isFinite(d)) return null;

    if (current.kd >= t) {
      return { alreadyHit: true, killsNeeded: 0, deathsToCut: 0 };
    }

    // kills needed with deaths fixed: (k + x) / d = t  =>  x = t*d - k
    const killsNeeded = Math.max(0, Math.ceil(t * Math.max(1, d) - k));
    // deaths to cut with kills fixed: k / (d - y) = t  =>  y = d - k/t
    const deathsToCut = Math.max(0, Math.ceil(d - k / t));

    return { alreadyHit: false, killsNeeded, deathsToCut };
  }, [current, targetKd, kills, deaths]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Kills</span>
          <input
            type="number"
            value={kills}
            onChange={(e) => setKills(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Deaths</span>
          <input
            type="number"
            value={deaths}
            onChange={(e) => setDeaths(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Assists <span className="text-slate-400">(optional)</span>
          </span>
          <input
            type="number"
            value={assists}
            onChange={(e) => setAssists(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {current ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">K/D Ratio</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {current.kd.toFixed(2)}
            </div>
            <div className="mt-1 text-sm text-slate-600">Tier: {current.tier}</div>
          </div>
          {current.kda !== null ? (
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">KDA</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {current.kda.toFixed(2)}
              </div>
              <div className="mt-1 text-sm text-slate-600">(kills + assists) / deaths</div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Enter non-negative kills and deaths.
        </div>
      )}

      <div className="rounded-xl border border-slate-200 p-4">
        <div className="mb-3 text-sm font-semibold text-slate-700">Project to target K/D</div>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Target K/D</span>
          <input
            type="number"
            step="0.1"
            value={targetKd}
            onChange={(e) => setTargetKd(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        {projection ? (
          projection.alreadyHit ? (
            <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
              You&rsquo;ve already hit that target &mdash; keep it up.
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Kills needed (deaths fixed)
                </div>
                <div className="text-xl font-semibold tabular-nums text-brand">
                  +{projection.killsNeeded}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Deaths to avoid (kills fixed)
                </div>
                <div className="text-xl font-semibold tabular-nums text-brand">
                  &minus;{projection.deathsToCut}
                </div>
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
