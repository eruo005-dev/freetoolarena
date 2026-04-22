"use client";

import { useMemo, useState } from "react";

type Mode = "forward" | "reverse";

const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseISO(s: string): Date | null {
  if (!s) return null;
  const d = new Date(s + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function isHoliday(d: Date, holidays: Set<string>) {
  const iso = d.toISOString().slice(0, 10);
  return holidays.has(iso);
}

function isBusinessDay(d: Date, includeSat: boolean, includeSun: boolean, holidays: Set<string>) {
  const day = d.getDay();
  if (day === 6 && !includeSat) return false;
  if (day === 0 && !includeSun) return false;
  if (isHoliday(d, holidays)) return false;
  return true;
}

export function DeadlineCalculator() {
  const [mode, setMode] = useState<Mode>("forward");
  const [startDate, setStartDate] = useState(todayISO());
  const [days, setDays] = useState("10");
  const [endDate, setEndDate] = useState(todayISO());
  const [includeSat, setIncludeSat] = useState(false);
  const [includeSun, setIncludeSun] = useState(false);
  const [holidaysText, setHolidaysText] = useState("");

  const holidays = useMemo(() => {
    const set = new Set<string>();
    holidaysText
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((s) => {
        const d = parseISO(s);
        if (d) set.add(d.toISOString().slice(0, 10));
      });
    return set;
  }, [holidaysText]);

  const forwardResult = useMemo(() => {
    const start = parseISO(startDate);
    const n = Math.max(0, parseInt(days) || 0);
    if (!start) return null;
    const d = new Date(start);
    let counted = 0;
    while (counted < n) {
      d.setDate(d.getDate() + 1);
      if (isBusinessDay(d, includeSat, includeSun, holidays)) counted++;
    }
    return d;
  }, [startDate, days, includeSat, includeSun, holidays]);

  const reverseResult = useMemo(() => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    if (!start || !end) return null;
    const [a, b] = start <= end ? [start, end] : [end, start];
    const d = new Date(a);
    let count = 0;
    while (d < b) {
      d.setDate(d.getDate() + 1);
      if (isBusinessDay(d, includeSat, includeSun, holidays)) count++;
    }
    return count;
  }, [startDate, endDate, includeSat, includeSun, holidays]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["forward", "reverse"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
              mode === m
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand"
            }`}
          >
            {m === "forward" ? "Start + days → deadline" : "Start + end → count"}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Start date</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        {mode === "forward" ? (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Business days</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        ) : (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">End date</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setIncludeSat((v) => !v)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
            includeSat
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Include Saturdays
        </button>
        <button
          type="button"
          onClick={() => setIncludeSun((v) => !v)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
            includeSun
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Include Sundays
        </button>
      </div>

      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Custom holidays (YYYY-MM-DD, one per line)</span>
        <textarea
          value={holidaysText}
          onChange={(e) => setHolidaysText(e.target.value)}
          rows={3}
          placeholder="2026-05-25&#10;2026-07-04"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        {mode === "forward" ? (
          forwardResult ? (
            <>
              <div>
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Deadline date</p>
                <p className="text-3xl font-bold text-brand">{formatDate(forwardResult)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Day of week</p>
                <p className="text-xl font-bold text-slate-900">{WEEKDAY_NAMES[forwardResult.getDay()]}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-500">Enter a valid start date.</p>
          )
        ) : reverseResult !== null ? (
          <div className="sm:col-span-2">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Business days between</p>
            <p className="text-3xl font-bold text-brand">{reverseResult} days</p>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Enter valid dates.</p>
        )}
      </div>
    </div>
  );
}
