"use client";

import { useMemo, useState } from "react";

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export interface AgeCalculatorProps {
  /** Initial DOB in YYYY-MM-DD. Overridable via ?dob=1995-06-15. */
  initialDob?: string;
}

export function AgeCalculator({ initialDob }: AgeCalculatorProps = {}) {
  const [birth, setBirth] = useState(initialDob ?? "1995-06-15");
  const [asOf, setAsOf] = useState(today());

  const result = useMemo(() => {
    const b = new Date(birth);
    const a = new Date(asOf);
    if (isNaN(b.getTime()) || isNaN(a.getTime()) || a < b) return null;

    let years = a.getFullYear() - b.getFullYear();
    let months = a.getMonth() - b.getMonth();
    let days = a.getDate() - b.getDate();
    if (days < 0) {
      months -= 1;
      const prev = new Date(a.getFullYear(), a.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalMs = a.getTime() - b.getTime();
    const totalDays = Math.floor(totalMs / 86_400_000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = Math.floor(totalMs / 3_600_000);

    // Next birthday
    const next = new Date(a.getFullYear(), b.getMonth(), b.getDate());
    if (next < a) next.setFullYear(a.getFullYear() + 1);
    const daysToNext = Math.ceil((next.getTime() - a.getTime()) / 86_400_000);

    return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToNext };
  }, [birth, asOf]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Birth date</span>
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">As of</span>
          <input
            type="date"
            value={asOf}
            onChange={(e) => setAsOf(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>
      {result ? (
        <>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Age</p>
            <p className="text-3xl font-bold text-brand tabular-nums">
              {result.years}<span className="text-lg text-slate-500 mx-1">years</span>
              {result.months}<span className="text-lg text-slate-500 mx-1">months</span>
              {result.days}<span className="text-lg text-slate-500 mx-1">days</span>
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {result.daysToNext === 0 ? "🎉 Happy birthday!" : `${result.daysToNext} days to next birthday`}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Months" value={result.totalMonths} />
            <Stat label="Weeks" value={result.totalWeeks} />
            <Stat label="Days" value={result.totalDays} />
            <Stat label="Hours" value={result.totalHours} />
          </div>
        </>
      ) : (
        <p className="text-sm text-red-600">Invalid dates — birth must be on or before the reference date.</p>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">{label}</p>
      <p className="text-xl font-bold text-slate-900 tabular-nums">{value.toLocaleString()}</p>
    </div>
  );
}
