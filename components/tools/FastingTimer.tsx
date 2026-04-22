"use client";

import { useEffect, useMemo, useState } from "react";

type Schedule = "16:8" | "18:6" | "20:4" | "23:1" | "5:2";

const FAST_HOURS: Record<Schedule, number> = {
  "16:8": 16,
  "18:6": 18,
  "20:4": 20,
  "23:1": 23,
  "5:2": 24, // approximation for a "fast day" on 5:2
};

const LABEL: Record<Schedule, string> = {
  "16:8": "16:8 (16h fast / 8h eat)",
  "18:6": "18:6 (18h fast / 6h eat)",
  "20:4": "20:4 (20h fast / 4h eat)",
  "23:1": "23:1 OMAD (23h fast / 1h eat)",
  "5:2": "5:2 (24h fast day)",
};

function fmt(seconds: number): string {
  if (seconds < 0) seconds = 0;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export function FastingTimer() {
  const [schedule, setSchedule] = useState<Schedule>("16:8");
  const [startTs, setStartTs] = useState<number | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    if (startTs == null) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [startTs]);

  const { elapsedSec, targetSec, remainingSec, phase, progressPct } = useMemo(() => {
    const targetH = FAST_HOURS[schedule];
    const targetS = targetH * 3600;
    if (startTs == null) {
      return {
        elapsedSec: 0,
        targetSec: targetS,
        remainingSec: targetS,
        phase: "idle" as const,
        progressPct: 0,
      };
    }
    const elapsed = Math.max(0, Math.floor((now - startTs) / 1000));
    const remaining = targetS - elapsed;
    const p = elapsed >= targetS ? ("eating" as const) : ("fasting" as const);
    const pct = Math.max(0, Math.min(100, (elapsed / targetS) * 100));
    return {
      elapsedSec: elapsed,
      targetSec: targetS,
      remainingSec: remaining,
      phase: p,
      progressPct: pct,
    };
  }, [startTs, now, schedule]);

  const handleStart = () => {
    setStartTs(Date.now());
    setNow(Date.now());
  };
  const handleStop = () => setStartTs(null);

  const startedLabel =
    startTs != null
      ? new Date(startTs).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "—";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-slate-200 bg-white">
        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Fasting schedule</span>
          <select
            value={schedule}
            onChange={(e) => setSchedule(e.target.value as Schedule)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
            disabled={startTs != null}
          >
            {(Object.keys(LABEL) as Schedule[]).map((s) => (
              <option key={s} value={s}>
                {LABEL[s]}
              </option>
            ))}
          </select>
        </label>

        <div className="sm:col-span-2 flex gap-2">
          {startTs == null ? (
            <button
              type="button"
              onClick={handleStart}
              className="rounded-lg bg-brand text-white font-semibold px-5 py-2 hover:opacity-90"
            >
              Start fast
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStop}
              className="rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold px-5 py-2 hover:border-brand"
            >
              Stop / reset
            </button>
          )}
          <div className="text-sm text-slate-500 self-center">Started at {startedLabel}</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          {phase === "idle"
            ? "Not started"
            : phase === "fasting"
              ? "Fasting window"
              : "Eating window"}
        </div>
        <div className="text-3xl font-bold text-brand mt-1 tabular-nums">
          {fmt(elapsedSec)}
        </div>
        <div className="text-sm text-slate-600 mt-1">
          {phase === "eating"
            ? "Target reached — enjoy your eating window."
            : `${fmt(Math.max(0, remainingSec))} remaining to ${FAST_HOURS[schedule]}h target`}
        </div>
        <div className="mt-3 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-brand transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="text-xs text-slate-500 mt-2">
          Target: {fmt(targetSec)} ({FAST_HOURS[schedule]}h)
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimate only — consult a doctor or RD for medical advice.
      </p>
    </div>
  );
}
