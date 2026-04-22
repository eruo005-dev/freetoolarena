"use client";

import { useMemo, useState } from "react";

function buildSlots(): string[] {
  const slots: string[] = [];
  for (let h = 6; h <= 22; h++) {
    for (const m of [0, 30]) {
      if (h === 22 && m === 30) break;
      slots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    }
  }
  return slots;
}

export function DailyPlanner() {
  const slots = useMemo(() => buildSlots(), []);
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [priorities, setPriorities] = useState<string[]>(["", "", ""]);
  const [schedule, setSchedule] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");

  const setPriority = (i: number, v: string) => setPriorities((p) => p.map((x, idx) => (idx === i ? v : x)));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end gap-3 print:hidden">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <button type="button" onClick={() => window.print()}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark">
          Print
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 print:border-0 print:shadow-none space-y-5">
        <div className="flex items-baseline justify-between border-b border-slate-200 pb-2">
          <h2 className="text-2xl font-bold text-slate-800">Daily Plan</h2>
          <span className="text-slate-600">{date}</span>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-700 mb-2">Top 3 priorities</div>
          <div className="space-y-2">
            {priorities.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-slate-500 w-6">{i + 1}.</span>
                <input value={p} onChange={(e) => setPriority(i, e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-700 mb-2">Schedule</div>
          <div className="grid grid-cols-[auto_1fr] gap-2">
            {slots.map((t) => (
              <div key={t} className="contents">
                <div className="text-sm text-slate-500 py-1 pr-2 w-16">{t}</div>
                <input value={schedule[t] || ""} onChange={(e) => setSchedule((s) => ({ ...s, [t]: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-700 mb-2">Notes</div>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </div>
      </div>
    </div>
  );
}
