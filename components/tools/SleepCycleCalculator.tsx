"use client";

import { useMemo, useState } from "react";

type Mode = "wake" | "bed";

const FALL_ASLEEP_MIN = 14;
const CYCLE_MIN = 90;

function parseTime(t: string): { h: number; m: number } | null {
  const match = /^([0-2]?\d):([0-5]\d)$/.exec(t.trim());
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (h > 23 || m > 59) return null;
  return { h, m };
}

function fmtTime(totalMin: number): string {
  const m = ((totalMin % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${h.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
}

function fmtDuration(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function SleepCycleCalculator() {
  const [mode, setMode] = useState<Mode>("wake");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [bedTime, setBedTime] = useState(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  });

  const results = useMemo(() => {
    if (mode === "wake") {
      const t = parseTime(wakeTime);
      if (!t) return [];
      const wakeMin = t.h * 60 + t.m;
      // 6, 5, 4, 3 cycles back (offer 4-6 bedtimes)
      return [6, 5, 4, 3].map((cycles) => {
        const sleepMin = cycles * CYCLE_MIN;
        const bed = wakeMin - sleepMin - FALL_ASLEEP_MIN;
        return { cycles, sleepMin, time: fmtTime(bed) };
      });
    } else {
      const t = parseTime(bedTime);
      if (!t) return [];
      const bedMin = t.h * 60 + t.m;
      return [4, 5, 6].map((cycles) => {
        const sleepMin = cycles * CYCLE_MIN;
        const wake = bedMin + FALL_ASLEEP_MIN + sleepMin;
        return { cycles, sleepMin, time: fmtTime(wake) };
      });
    }
  }, [mode, wakeTime, bedTime]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["wake", "bed"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-lg border px-4 py-1.5 text-sm font-semibold ${
              mode === m
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand"
            }`}
          >
            {m === "wake" ? "I need to wake at…" : "I'll go to bed now"}
          </button>
        ))}
      </div>

      {mode === "wake" ? (
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Wake-up time</span>
          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      ) : (
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Going to bed at</span>
          <input
            type="time"
            value={bedTime}
            onChange={(e) => setBedTime(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      )}

      <div className="rounded-xl bg-slate-50 p-5">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3">
          {mode === "wake" ? "Try going to bed at" : "Try waking up at"}
        </p>
        {results.length === 0 ? (
          <p className="text-sm text-slate-500">Enter a valid time.</p>
        ) : (
          <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
            {results.map((r) => (
              <li key={r.cycles} className="flex items-center justify-between px-4 py-3">
                <span className="text-2xl font-bold text-brand tabular-nums">{r.time}</span>
                <span className="text-right text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">{r.cycles} cycles</span>
                  <span className="text-slate-500"> · {fmtDuration(r.sleepMin)} sleep</span>
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-xs text-slate-500">
          Assumes ~{FALL_ASLEEP_MIN} min to fall asleep and 90-min sleep cycles. Waking at the end of a cycle feels more refreshing than waking mid-cycle.
        </p>
      </div>
    </div>
  );
}
