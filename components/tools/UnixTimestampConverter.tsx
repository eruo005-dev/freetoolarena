"use client";

import { useState, useEffect, useMemo } from "react";

type Unit = "s" | "ms";

export function UnixTimestampConverter() {
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));
  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const [ts, setTs] = useState<string>(() => String(Math.floor(Date.now() / 1000)));
  const [unit, setUnit] = useState<Unit>("s");
  const [dt, setDt] = useState<string>(() => toLocalDatetimeInput(new Date()));

  const parsedDate = useMemo(() => {
    const n = Number(ts);
    if (!Number.isFinite(n)) return null;
    const ms = unit === "ms" ? n : n * 1000;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  }, [ts, unit]);

  const parsedFromDt = useMemo(() => {
    if (!dt) return null;
    const d = new Date(dt);
    return isNaN(d.getTime()) ? null : d;
  }, [dt]);

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Current Unix timestamp
          </p>
          <p className="text-2xl font-bold tabular-nums text-slate-900">{now}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setTs(String(now));
            setUnit("s");
          }}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Use now
        </button>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-800">
          Timestamp → Date
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            value={ts}
            onChange={(e) => setTs(e.target.value.trim())}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="1745000000"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
            className="rounded-lg border border-slate-300 px-3 py-2 w-32"
          >
            <option value="s">seconds</option>
            <option value="ms">milliseconds</option>
          </select>
        </div>
        {parsedDate ? (
          <div className="grid sm:grid-cols-2 gap-3">
            <ResultBox label="ISO 8601 (UTC)" value={parsedDate.toISOString()} />
            <ResultBox label="Local time" value={parsedDate.toLocaleString()} />
            <ResultBox label="UTC string" value={parsedDate.toUTCString()} />
            <ResultBox
              label="Relative"
              value={relative(parsedDate.getTime(), Date.now())}
            />
          </div>
        ) : (
          <p className="text-sm text-rose-600">Not a valid number.</p>
        )}
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-800">
          Date → Timestamp
        </h3>
        <input
          type="datetime-local"
          value={dt}
          onChange={(e) => setDt(e.target.value)}
          step="1"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
        />
        {parsedFromDt ? (
          <div className="grid sm:grid-cols-2 gap-3">
            <ResultBox
              label="Unix seconds"
              value={String(Math.floor(parsedFromDt.getTime() / 1000))}
            />
            <ResultBox
              label="Unix milliseconds"
              value={String(parsedFromDt.getTime())}
            />
          </div>
        ) : (
          <p className="text-sm text-rose-600">Pick a valid date and time.</p>
        )}
      </section>
    </div>
  );
}

function ResultBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          {label}
        </p>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(value)}
          className="text-xs font-medium text-brand hover:underline"
        >
          Copy
        </button>
      </div>
      <p className="mt-1 font-mono text-sm text-slate-900 break-all">{value}</p>
    </div>
  );
}

function toLocalDatetimeInput(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function relative(targetMs: number, nowMs: number): string {
  const diff = targetMs - nowMs;
  const abs = Math.abs(diff);
  const units: [number, string][] = [
    [1000 * 60 * 60 * 24 * 365, "year"],
    [1000 * 60 * 60 * 24 * 30, "month"],
    [1000 * 60 * 60 * 24 * 7, "week"],
    [1000 * 60 * 60 * 24, "day"],
    [1000 * 60 * 60, "hour"],
    [1000 * 60, "minute"],
    [1000, "second"],
  ];
  for (const [unit, name] of units) {
    if (abs >= unit) {
      const n = Math.round(abs / unit);
      return diff >= 0 ? `in ${n} ${name}${n === 1 ? "" : "s"}` : `${n} ${name}${n === 1 ? "" : "s"} ago`;
    }
  }
  return "just now";
}
