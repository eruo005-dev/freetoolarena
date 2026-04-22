"use client";

import { useMemo, useState } from "react";

function parseHM(s: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  if (h < 0 || h > 23 || mm < 0 || mm > 59) return null;
  return h * 60 + mm;
}

function parseDurationHM(s: string): number | null {
  const m = /^(-?)(\d{1,6}):(\d{1,2})$/.exec(s.trim());
  if (!m) return null;
  const sign = m[1] === "-" ? -1 : 1;
  const h = parseInt(m[2], 10);
  const mm = parseInt(m[3], 10);
  if (mm < 0 || mm > 59) return null;
  return sign * (h * 60 + mm);
}

function fmtHM(totalMin: number): string {
  const sign = totalMin < 0 ? "-" : "";
  const abs = Math.abs(totalMin);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `${sign}${h}:${String(m).padStart(2, "0")}`;
}

function fmtClock(totalMin: number): string {
  const n = ((totalMin % 1440) + 1440) % 1440;
  const h = Math.floor(n / 60);
  const m = n % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export interface TimeDurationCalculatorProps {
  initialStart?: string;
  initialEnd?: string;
  initialOvernight?: boolean;
  initialMode?: "duration" | "add";
  initialBaseTime?: string;
  initialDelta?: string;
  initialAddSub?: "add" | "sub";
}

export function TimeDurationCalculator({
  initialStart = "09:00",
  initialEnd = "17:30",
  initialOvernight = false,
  initialMode = "duration",
  initialBaseTime = "09:00",
  initialDelta = "1:30",
  initialAddSub = "add",
}: TimeDurationCalculatorProps = {}) {
  const [mode, setMode] = useState<"duration" | "add">(initialMode);

  // Duration mode
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  const [overnight, setOvernight] = useState(initialOvernight);

  // Add/subtract mode
  const [baseTime, setBaseTime] = useState(initialBaseTime);
  const [delta, setDelta] = useState(initialDelta);
  const [addSub, setAddSub] = useState<"add" | "sub">(initialAddSub);

  const durationResult = useMemo(() => {
    const s = parseHM(start);
    const e = parseHM(end);
    if (s === null || e === null) return null;
    let total = e - s;
    if (total < 0 || (overnight && total <= 0)) {
      if (overnight) total += 1440;
      else return { error: "End time is before start time. Enable overnight to wrap." };
    } else if (overnight && total >= 0) {
      // If overnight toggle is on and end > start, still treat as same-day? We'll just treat normally.
    }
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    const decimal = total / 60;
    return { hours, minutes, totalMinutes: total, decimal };
  }, [start, end, overnight]);

  const addResult = useMemo(() => {
    const b = parseHM(baseTime);
    const d = parseDurationHM(delta);
    if (b === null || d === null) return null;
    const signed = addSub === "add" ? d : -d;
    const total = b + signed;
    const dayShift = Math.floor(total / 1440);
    const clock = fmtClock(total);
    return { clock, dayShift, totalMinutes: total };
  }, [baseTime, delta, addSub]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("duration")}
          className={`flex-1 rounded-lg px-3 py-2 font-semibold border ${
            mode === "duration"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          Duration between times
        </button>
        <button
          type="button"
          onClick={() => setMode("add")}
          className={`flex-1 rounded-lg px-3 py-2 font-semibold border ${
            mode === "add"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          Add / subtract duration
        </button>
      </div>

      {mode === "duration" ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Start time</span>
              <input
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">End time</span>
              <input
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={overnight}
              onChange={(e) => setOvernight(e.target.checked)}
              className="rounded border-slate-300 text-brand focus:ring-brand"
            />
            Allow overnight (wrap past midnight)
          </label>

          {!durationResult ? (
            <p className="text-sm text-rose-600">Enter times in HH:MM format.</p>
          ) : "error" in durationResult ? (
            <p className="text-sm text-rose-600">{durationResult.error}</p>
          ) : (
            <>
              <div className="rounded-xl bg-slate-50 p-5 text-center">
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Duration</p>
                <p className="text-3xl font-bold text-brand tabular-nums">
                  {durationResult.hours}h {durationResult.minutes}m
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Stat label="Total minutes" value={durationResult.totalMinutes.toLocaleString()} />
                <Stat
                  label="Decimal hours"
                  value={parseFloat(durationResult.decimal.toFixed(4)).toString()}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Start time</span>
              <input
                type="time"
                value={baseTime}
                onChange={(e) => setBaseTime(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Operation</span>
              <div className="flex gap-1">
                {(["add", "sub"] as const).map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setAddSub(o)}
                    className={`flex-1 rounded-lg px-3 py-2 font-semibold border ${
                      addSub === o
                        ? "bg-brand text-white border-brand"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {o === "add" ? "+ Add" : "− Subtract"}
                  </button>
                ))}
              </div>
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Duration (H:M)</span>
              <input
                type="text"
                value={delta}
                onChange={(e) => setDelta(e.target.value)}
                placeholder="e.g. 1:30"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
          </div>

          {!addResult ? (
            <p className="text-sm text-rose-600">Enter a valid time and duration (H:M).</p>
          ) : (
            <div className="rounded-xl bg-slate-50 p-5 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Result</p>
              <p className="text-3xl font-bold text-brand tabular-nums">{addResult.clock}</p>
              {addResult.dayShift !== 0 && (
                <p className="text-sm text-slate-600 mt-1">
                  {addResult.dayShift > 0
                    ? `+${addResult.dayShift} day${addResult.dayShift === 1 ? "" : "s"}`
                    : `${addResult.dayShift} day${addResult.dayShift === -1 ? "" : "s"}`}
                </p>
              )}
              <p className="text-xs text-slate-500 mt-2">Total offset: {fmtHM(addResult.totalMinutes)}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">{label}</p>
      <p className="text-lg font-bold text-slate-900 tabular-nums">{value}</p>
    </div>
  );
}
