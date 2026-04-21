"use client";

import { useState } from "react";

interface Habit {
  id: number;
  name: string;
  days: boolean[];
}

const DAYS = 14;

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Workout", days: Array(DAYS).fill(false) },
    { id: 2, name: "Read 10 pages", days: Array(DAYS).fill(false) },
  ]);
  const [draft, setDraft] = useState("");

  const add = () => {
    const t = draft.trim();
    if (!t) return;
    setHabits((prev) => [...prev, { id: Date.now(), name: t, days: Array(DAYS).fill(false) }]);
    setDraft("");
  };
  const toggle = (id: number, day: number) =>
    setHabits((prev) => prev.map((h) => h.id === id ? { ...h, days: h.days.map((d, i) => i === day ? !d : d) } : h));
  const remove = (id: number) => setHabits((prev) => prev.filter((h) => h.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add a habit…"
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
        <button type="button" onClick={add}
          className="rounded-lg bg-brand-dark text-white px-4 py-2 text-sm font-semibold hover:bg-brand">
          Add
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-500">
              <th className="py-2 text-left">Habit</th>
              {Array.from({ length: DAYS }, (_, i) => <th key={i} className="px-1 text-center">D{i + 1}</th>)}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {habits.map((h) => {
              const streak = h.days.filter(Boolean).length;
              return (
                <tr key={h.id} className="border-t border-slate-200">
                  <td className="py-2 pr-2 font-medium text-slate-800">
                    {h.name}
                    <div className="text-xs text-slate-500">{streak}/{DAYS} days</div>
                  </td>
                  {h.days.map((d, i) => (
                    <td key={i} className="px-1 text-center">
                      <input type="checkbox" checked={d} onChange={() => toggle(h.id, i)} className="h-4 w-4 accent-brand" />
                    </td>
                  ))}
                  <td className="text-right">
                    <button type="button" onClick={() => remove(h.id)} className="text-xs text-slate-400 hover:text-rose-600">
                      remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
