"use client";

import { useMemo, useState } from "react";

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function addDays(date: string, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export interface DateDifferenceCalculatorProps {
  initialStart?: string;
  initialEnd?: string;
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function DateDifferenceCalculator({
  initialStart,
  initialEnd,
}: DateDifferenceCalculatorProps = {}) {
  const [startDate, setStartDate] = useState(initialStart ?? addDays(today(), -30));
  const [endDate, setEndDate] = useState(initialEnd ?? today());

  const result = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;

    const forward = e >= s;
    const a = forward ? s : e;
    const b = forward ? e : s;

    let years = b.getFullYear() - a.getFullYear();
    let months = b.getMonth() - a.getMonth();
    let days = b.getDate() - a.getDate();
    if (days < 0) {
      months -= 1;
      const prev = new Date(b.getFullYear(), b.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalMs = b.getTime() - a.getTime();
    const totalDays = Math.round(totalMs / 86_400_000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.round(totalMs / 3_600_000);
    const totalMinutes = Math.round(totalMs / 60_000);

    // Weekday breakdown — count days from a (inclusive) to b (exclusive)
    // That way a week contains exactly one of each weekday.
    const weekdayCounts = [0, 0, 0, 0, 0, 0, 0];
    const fullWeeks = Math.floor(totalDays / 7);
    for (let i = 0; i < 7; i++) weekdayCounts[i] = fullWeeks;
    const remainder = totalDays - fullWeeks * 7;
    const startDow = a.getDay();
    for (let i = 0; i < remainder; i++) {
      weekdayCounts[(startDow + i) % 7] += 1;
    }

    return {
      forward,
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      weekdayCounts,
    };
  }, [startDate, endDate]);

  const humanReadable = (r: NonNullable<typeof result>) => {
    const parts: string[] = [];
    if (r.years) parts.push(`${r.years} year${r.years === 1 ? "" : "s"}`);
    if (r.months) parts.push(`${r.months} month${r.months === 1 ? "" : "s"}`);
    parts.push(`${r.days} day${r.days === 1 ? "" : "s"}`);
    return parts.join(", ");
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Start date</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">End date</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      {!result ? (
        <p className="text-sm text-rose-600">Enter valid dates.</p>
      ) : (
        <>
          <div className="rounded-xl bg-slate-50 p-5 text-center">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Difference</p>
            <p className="text-3xl font-bold text-brand tabular-nums">{humanReadable(result)}</p>
            {!result.forward && (
              <p className="text-xs text-slate-500 mt-1">(end date is before start date)</p>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Total days" value={result.totalDays.toLocaleString()} />
            <Stat label="Total weeks" value={result.totalWeeks.toLocaleString()} />
            <Stat label="Total hours" value={result.totalHours.toLocaleString()} />
            <Stat label="Total minutes" value={result.totalMinutes.toLocaleString()} />
          </div>
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3 text-center">
              Weekday breakdown
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {WEEKDAYS.map((name, i) => (
                <div key={name} className="rounded-lg bg-white border border-slate-200 px-3 py-2 text-center">
                  <p className="text-xs font-semibold text-slate-500">{name}</p>
                  <p className="text-lg font-bold text-slate-900 tabular-nums">{result.weekdayCounts[i]}</p>
                </div>
              ))}
            </div>
          </div>
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
