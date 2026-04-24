"use client";

import { useMemo, useState } from "react";

export function XpToLevelCalculator() {
  const [currentXp, setCurrentXp] = useState("42000");
  const [currentLevelXp, setCurrentLevelXp] = useState("50000");
  const [targetLevelXp, setTargetLevelXp] = useState("120000");
  const [xpPerHour, setXpPerHour] = useState("8000");

  const stats = useMemo(() => {
    const cur = Number(currentXp);
    const tgt = Number(targetLevelXp);
    const rate = Number(xpPerHour);
    if (
      !Number.isFinite(cur) ||
      !Number.isFinite(tgt) ||
      !Number.isFinite(rate) ||
      cur < 0 ||
      tgt <= 0 ||
      rate <= 0
    ) {
      return null;
    }
    const needed = Math.max(0, tgt - cur);
    const hours = needed / rate;
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return { needed, hours, h, m };
  }, [currentXp, targetLevelXp, xpPerHour]);

  const applyPreset = (levels: number) => {
    const cur = Number(currentLevelXp);
    const tgt = Number(targetLevelXp);
    if (!Number.isFinite(cur) || !Number.isFinite(tgt) || cur <= 0) return;
    // rough per-level delta = (target - current level XP) across however many levels user had in mind
    // Simpler: assume target already set relative to current level, bump target by "levels" times current level XP.
    const newTarget = Number(currentXp) + levels * cur;
    setTargetLevelXp(String(Math.round(newTarget)));
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Current XP</span>
          <input
            type="number"
            value={currentXp}
            onChange={(e) => setCurrentXp(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            XP needed per level (current)
          </span>
          <input
            type="number"
            value={currentLevelXp}
            onChange={(e) => setCurrentLevelXp(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Target total XP</span>
          <input
            type="number"
            value={targetLevelXp}
            onChange={(e) => setTargetLevelXp(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">XP per hour</span>
          <input
            type="number"
            value={xpPerHour}
            onChange={(e) => setXpPerHour(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => applyPreset(1)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          +1 level
        </button>
        <button
          type="button"
          onClick={() => applyPreset(5)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          +5 levels
        </button>
        <button
          type="button"
          onClick={() => applyPreset(10)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          +10 levels
        </button>
      </div>

      {stats ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">XP needed</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {stats.needed.toLocaleString()}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Hours to reach</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {stats.hours.toFixed(1)} h
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Time estimate</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {stats.h}h {stats.m}m
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Enter positive XP values and a non-zero XP/hour rate.
        </div>
      )}

      <p className="text-xs text-slate-500">
        Works for any RPG &mdash; grab the XP numbers from your game&rsquo;s character sheet and
        drop them in. Presets add multiples of your current level&rsquo;s XP requirement to the
        target.
      </p>
    </div>
  );
}
