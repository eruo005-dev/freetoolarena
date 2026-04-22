"use client";

import { useMemo, useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function addDays(iso: string, n: number): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export function WeeklyPlanner() {
  const today = new Date();
  const dow = today.getDay();
  const mondayOffset = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  const defaultStart = monday.toISOString().slice(0, 10);

  const [start, setStart] = useState(defaultStart);
  const [entries, setEntries] = useState<string[]>(["", "", "", "", "", "", ""]);
  const [goals, setGoals] = useState("");

  const dates = useMemo(() => DAYS.map((_, i) => addDays(start, i)), [start]);

  const setEntry = (i: number, v: string) => setEntries((arr) => arr.map((x, idx) => (idx === i ? v : x)));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end gap-3 print:hidden">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Week starting</span>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <button type="button" onClick={() => window.print()}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark">
          Print
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 print:border-0 print:shadow-none space-y-5">
        <div className="flex items-baseline justify-between border-b border-slate-200 pb-2">
          <h2 className="text-2xl font-bold text-slate-800">Weekly Plan</h2>
          <span className="text-slate-600">{start} — {dates[6]}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DAYS.map((day, i) => (
            <div key={day} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-semibold text-slate-800">{day}</span>
                <span className="text-xs text-slate-500">{dates[i]}</span>
              </div>
              <textarea value={entries[i]} onChange={(e) => setEntry(i, e.target.value)} rows={4}
                placeholder="Tasks, meetings, events…"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
            </div>
          ))}
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-700 mb-2">Monthly goals</div>
          <textarea value={goals} onChange={(e) => setGoals(e.target.value)} rows={4}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </div>
      </div>
    </div>
  );
}
