"use client";

import { useMemo, useState } from "react";

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fmt(d: Date): string {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function fmtRange(a: Date, b: Date): string {
  return `${a.toLocaleDateString(undefined, { month: "short", day: "numeric" })} – ${b.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`;
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

export interface OvulationCalculatorProps {
  /** ISO YYYY-MM-DD */
  initialLastPeriod?: string;
  initialCycleLength?: number;
}

export function OvulationCalculator({
  initialLastPeriod,
  initialCycleLength,
}: OvulationCalculatorProps = {}) {
  const [lastPeriod, setLastPeriod] = useState(initialLastPeriod ?? todayISO());
  const [cycle, setCycle] = useState(
    initialCycleLength != null ? String(initialCycleLength) : "28",
  );

  const cycles = useMemo(() => {
    if (!lastPeriod) return [];
    const base = new Date(lastPeriod + "T00:00:00");
    if (isNaN(base.getTime())) return [];
    const len = Math.max(20, Math.min(45, parseInt(cycle) || 28));
    const out: {
      periodStart: Date;
      ovulation: Date;
      fertileStart: Date;
      fertileEnd: Date;
      nextPeriod: Date;
    }[] = [];
    for (let i = 0; i < 3; i++) {
      const periodStart = addDays(base, len * i);
      const ovulation = addDays(periodStart, len - 14);
      const fertileStart = addDays(ovulation, -5);
      const fertileEnd = ovulation;
      const nextPeriod = addDays(periodStart, len);
      out.push({ periodStart, ovulation, fertileStart, fertileEnd, nextPeriod });
    }
    return out;
  }, [lastPeriod, cycle]);

  const first = cycles[0];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">First day of last period</span>
          <input
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Cycle length (days)</span>
          <input
            type="number"
            inputMode="numeric"
            min={20}
            max={45}
            value={cycle}
            onChange={(e) => setCycle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Ovulation day</p>
          <p className="text-2xl font-bold text-brand">{first ? fmt(first.ovulation) : "—"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Fertile window</p>
          <p className="text-xl font-bold text-slate-900">
            {first ? fmtRange(first.fertileStart, first.fertileEnd) : "—"}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Next period</p>
          <p className="text-xl font-bold text-slate-900">{first ? fmt(first.nextPeriod) : "—"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Cycle length</p>
          <p className="text-xl font-bold text-slate-900">{cycle || "—"} days</p>
        </div>
      </div>

      {cycles.length > 0 && (
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="text-left px-3 py-2 font-semibold">Cycle</th>
                <th className="text-left px-3 py-2 font-semibold">Fertile window</th>
                <th className="text-left px-3 py-2 font-semibold">Ovulation</th>
                <th className="text-left px-3 py-2 font-semibold">Next period</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((c, i) => (
                <tr key={i} className="border-t border-slate-200">
                  <td className="px-3 py-2 font-medium text-slate-700">#{i + 1}</td>
                  <td className="px-3 py-2 text-slate-700">{fmtRange(c.fertileStart, c.fertileEnd)}</td>
                  <td className="px-3 py-2 text-slate-700">{fmt(c.ovulation)}</td>
                  <td className="px-3 py-2 text-slate-700">{fmt(c.nextPeriod)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-sm text-slate-600">
        <p className="font-semibold text-slate-700 mb-1">How it works</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>Ovulation is estimated at (cycle length − 14) days after the first day of your period.</li>
          <li>The fertile window covers the 5 days before ovulation plus ovulation day itself.</li>
          <li>Estimates only — track basal temp or use LH tests for accuracy.</li>
        </ul>
      </div>
    </div>
  );
}
