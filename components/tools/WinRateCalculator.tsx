"use client";

import { useMemo, useState } from "react";

function tierLabel(rate: number): string {
  if (rate < 30) return "Struggling";
  if (rate < 45) return "Below average";
  if (rate < 55) return "Average";
  if (rate < 65) return "Strong";
  return "Dominant";
}

export function WinRateCalculator() {
  const [wins, setWins] = useState("42");
  const [losses, setLosses] = useState("38");
  const [target, setTarget] = useState("60");

  const current = useMemo(() => {
    const w = Number(wins);
    const l = Number(losses);
    if (!Number.isFinite(w) || !Number.isFinite(l) || w < 0 || l < 0) return null;
    const total = w + l;
    if (total === 0) return null;
    const rate = (w / total) * 100;
    return { rate, total, tier: tierLabel(rate) };
  }, [wins, losses]);

  const projection = useMemo(() => {
    if (!current) return null;
    const t = Number(target);
    const w = Number(wins);
    const l = Number(losses);
    if (!Number.isFinite(t) || t <= 0 || t >= 100) return null;
    const p = t / 100;

    if (current.rate >= t) {
      // losses you can absorb while staying at >= t
      // (w) / (w + l + x) >= p  =>  x <= w/p - w - l
      const canAbsorb = Math.max(0, Math.floor(w / p - w - l));
      return { alreadyHit: true, winsNeeded: 0, canAbsorb };
    }

    // wins in a row needed: (w + x) / (w + l + x) >= p
    // w + x >= p(w + l + x)  =>  x(1 - p) >= p(w+l) - w
    // x >= (p(w+l) - w) / (1 - p)
    const winsNeeded = Math.max(0, Math.ceil((p * (w + l) - w) / (1 - p)));
    return { alreadyHit: false, winsNeeded, canAbsorb: 0 };
  }, [current, target, wins, losses]);

  const tilt = current && current.rate < 30;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Wins</span>
          <input
            type="number"
            value={wins}
            onChange={(e) => setWins(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Losses</span>
          <input
            type="number"
            value={losses}
            onChange={(e) => setLosses(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {current ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Win rate</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {current.rate.toFixed(2)}%
            </div>
            <div className="mt-1 text-sm text-slate-600">Tier: {current.tier}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Total games</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">{current.total}</div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Enter wins and losses &mdash; at least one game.
        </div>
      )}

      {tilt ? (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
          Tilt warning: win rate under 30%. Consider breaking before the next queue.
        </div>
      ) : null}

      <div className="rounded-xl border border-slate-200 p-4">
        <div className="mb-3 text-sm font-semibold text-slate-700">Reach target win rate</div>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Target win rate %</span>
          <input
            type="number"
            step="1"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        {projection ? (
          projection.alreadyHit ? (
            <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
              You&rsquo;re already at or above that rate. You can absorb up to{" "}
              <span className="font-semibold">{projection.canAbsorb}</span> losses and stay above
              target.
            </div>
          ) : (
            <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
              Win <span className="font-semibold text-brand">{projection.winsNeeded}</span> games in
              a row to hit {Number(target).toFixed(0)}% win rate.
            </div>
          )
        ) : (
          <div className="mt-3 text-xs text-slate-500">Target must be between 1 and 99.</div>
        )}
      </div>
    </div>
  );
}
