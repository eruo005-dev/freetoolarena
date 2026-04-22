"use client";

import { useState } from "react";

type Quadrant = 1 | 2 | 3 | 4;

interface Task {
  id: number;
  text: string;
  q: Quadrant;
}

const QUADRANTS: { q: Quadrant; title: string; action: string; cls: string; label: string }[] = [
  {
    q: 1,
    title: "Urgent & Important",
    action: "Do",
    cls: "bg-rose-50 border-rose-200",
    label: "Do now",
  },
  {
    q: 2,
    title: "Important · Not Urgent",
    action: "Schedule",
    cls: "bg-emerald-50 border-emerald-200",
    label: "Schedule",
  },
  {
    q: 3,
    title: "Urgent · Not Important",
    action: "Delegate",
    cls: "bg-amber-50 border-amber-200",
    label: "Delegate",
  },
  {
    q: 4,
    title: "Neither",
    action: "Delete",
    cls: "bg-slate-50 border-slate-200",
    label: "Delete",
  },
];

export function PriorityMatrix() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Client proposal due tomorrow", q: 1 },
    { id: 2, text: "Plan Q3 roadmap", q: 2 },
    { id: 3, text: "Answer non-urgent emails", q: 3 },
    { id: 4, text: "Browse news feed", q: 4 },
  ]);
  const [draft, setDraft] = useState("");

  const add = () => {
    const t = draft.trim();
    if (!t) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: t, q: 2 }]);
    setDraft("");
  };
  const move = (id: number, q: Quadrant) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, q } : t)));
  const remove = (id: number) => setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add a task…"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {QUADRANTS.map((Q) => {
          const items = tasks.filter((t) => t.q === Q.q);
          return (
            <div key={Q.q} className={`rounded-xl border p-4 min-h-[200px] ${Q.cls}`}>
              <div className="mb-3">
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                  Q{Q.q}
                </p>
                <p className="font-semibold text-slate-800">{Q.title}</p>
                <p className="text-xs text-slate-500">{Q.action}</p>
              </div>
              <ul className="space-y-2">
                {items.length === 0 && (
                  <li className="text-xs text-slate-400 italic">No tasks</li>
                )}
                {items.map((t) => (
                  <li
                    key={t.id}
                    className="rounded-md border border-white/60 bg-white/80 p-2 text-sm"
                  >
                    <p className="text-slate-800 mb-2">{t.text}</p>
                    <div className="flex flex-wrap gap-1">
                      {QUADRANTS.filter((q) => q.q !== t.q).map((q) => (
                        <button
                          key={q.q}
                          type="button"
                          onClick={() => move(t.id, q.q)}
                          className="rounded-md border border-slate-300 bg-white px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          → Q{q.q}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => remove(t.id)}
                        className="rounded-md border border-slate-300 bg-white px-2 py-0.5 text-xs text-slate-500 hover:text-rose-600"
                      >
                        remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-slate-50 p-5">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
          How to use
        </p>
        <ul className="list-disc ml-5 text-sm text-slate-600 space-y-1">
          <li><span className="font-semibold text-slate-800">Q1 Do:</span> crises, deadlines — handle today.</li>
          <li><span className="font-semibold text-slate-800">Q2 Schedule:</span> planning, growth — this is where leverage lives.</li>
          <li><span className="font-semibold text-slate-800">Q3 Delegate:</span> interruptions, other people's priorities.</li>
          <li><span className="font-semibold text-slate-800">Q4 Delete:</span> time-wasters — remove without guilt.</li>
        </ul>
      </div>
    </div>
  );
}
