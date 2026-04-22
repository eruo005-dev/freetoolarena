"use client";

import { useMemo, useState } from "react";

function daysInMonth(year: number, month: number): number {
  // month 0-11
  return new Date(year, month + 1, 0).getDate();
}

function diffYMD(a: Date, b: Date): { years: number; months: number; days: number } {
  // Assumes a <= b
  let years = b.getFullYear() - a.getFullYear();
  let months = b.getMonth() - a.getMonth();
  let days = b.getDate() - a.getDate();

  if (days < 0) {
    months -= 1;
    // borrow days from the previous month relative to b
    const prevMonth = b.getMonth() - 1;
    const prevYear = prevMonth < 0 ? b.getFullYear() - 1 : b.getFullYear();
    const pm = (prevMonth + 12) % 12;
    days += daysInMonth(prevYear, pm);
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export function AgeGapCalculator() {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  const result = useMemo(() => {
    if (!p1 || !p2) return null;
    const d1 = new Date(p1 + "T00:00:00");
    const d2 = new Date(p2 + "T00:00:00");
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

    const [a, b] = d1 <= d2 ? [d1, d2] : [d2, d1];
    const ymd = diffYMD(a, b);
    const absDays = Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
    return { ...ymd, absDays };
  }, [p1, p2]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Person 1 birthday
          </span>
          <input
            type="date"
            value={p1}
            onChange={(e) => setP1(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Person 2 birthday
          </span>
          <input
            type="date"
            value={p2}
            onChange={(e) => setP2(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        {result ? (
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Age gap</p>
              <p className="text-2xl font-bold text-brand">
                {result.years} {result.years === 1 ? "year" : "years"}, {result.months}{" "}
                {result.months === 1 ? "month" : "months"}, {result.days} {result.days === 1 ? "day" : "days"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total days</p>
              <p className="text-lg font-semibold text-slate-900">{result.absDays.toLocaleString()} days</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Enter both birthdays to see the age gap.</p>
        )}
      </div>
    </div>
  );
}
