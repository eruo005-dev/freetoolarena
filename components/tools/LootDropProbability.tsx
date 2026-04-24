"use client";

import { useMemo, useState } from "react";

export function LootDropProbability() {
  const [dropRate, setDropRate] = useState("2.5");
  const [attempts, setAttempts] = useState("50");

  const stats = useMemo(() => {
    const r = Number(dropRate);
    const n = Number(attempts);
    if (
      !Number.isFinite(r) ||
      !Number.isFinite(n) ||
      r <= 0 ||
      r >= 100 ||
      n <= 0
    ) {
      return null;
    }
    const p = r / 100;
    const atLeastOne = (1 - Math.pow(1 - p, n)) * 100;
    const median = Math.log(0.5) / Math.log(1 - p);
    const near95 = Math.log(0.05) / Math.log(1 - p);
    const mean = 1 / p;
    return { atLeastOne, median, near95, mean };
  }, [dropRate, attempts]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Drop rate %</span>
          <input
            type="number"
            step="0.01"
            value={dropRate}
            onChange={(e) => setDropRate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Attempts</span>
          <input
            type="number"
            value={attempts}
            onChange={(e) => setAttempts(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {stats ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              &ge;1 drop in {attempts} tries
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {stats.atLeastOne.toFixed(2)}%
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              50% chance (median)
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {stats.median.toFixed(1)}
            </div>
            <div className="mt-1 text-xs text-slate-500">attempts</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              95% chance (near-guaranteed)
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {stats.near95.toFixed(1)}
            </div>
            <div className="mt-1 text-xs text-slate-500">attempts</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Average (mean)
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {stats.mean.toFixed(1)}
            </div>
            <div className="mt-1 text-xs text-slate-500">attempts</div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Drop rate must be between 0 and 100% and attempts must be positive.
        </div>
      )}

      <p className="text-xs text-slate-500">
        Assumes each attempt is independent. Median &mdash; you&rsquo;ll have the drop by this many
        tries half the time. Mean &mdash; long-run average. 95% &mdash; bring patience if you
        haven&rsquo;t seen it by then.
      </p>
    </div>
  );
}
