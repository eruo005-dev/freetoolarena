"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function MeetingCostCalculator() {
  const [attendees, setAttendees] = useState(8);
  const [avgSalary, setAvgSalary] = useState(120000);
  const [minutes, setMinutes] = useState(60);
  const [overhead, setOverhead] = useState(30);

  const r = useMemo(() => {
    const hourly = (avgSalary * (1 + overhead / 100)) / 2080;
    const cost = hourly * (minutes / 60) * attendees;
    return { hourly, cost };
  }, [attendees, avgSalary, minutes, overhead]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Attendees</span>
          <input type="number" value={attendees} min={1} onChange={(e) => setAttendees(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Avg annual salary ($)</span>
          <input type="number" value={avgSalary} onChange={(e) => setAvgSalary(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Duration (minutes)</span>
          <input type="number" value={minutes} min={5} step={5} onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Overhead / benefits (%)</span>
          <input type="number" value={overhead} onChange={(e) => setOverhead(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
      </div>
      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">Meeting cost</p>
        <p className="text-3xl font-bold">{money(r.cost)}</p>
        <p className="text-xs text-white/80 mt-1">Effective hourly: {money(r.hourly)} / person</p>
      </div>
    </div>
  );
}
