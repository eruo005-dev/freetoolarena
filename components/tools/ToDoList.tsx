"use client";

import { useState } from "react";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

export function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Ship the next feature", done: false },
    { id: 2, text: "Reply to design feedback", done: false },
    { id: 3, text: "Plan tomorrow", done: true },
  ]);
  const [draft, setDraft] = useState("");

  const add = () => {
    const t = draft.trim();
    if (!t) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: t, done: false }]);
    setDraft("");
  };

  const toggle = (id: number) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: number) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const clearDone = () => setTasks((prev) => prev.filter((t) => !t.done));

  const remaining = tasks.filter((t) => !t.done).length;
  const doneCount = tasks.length - remaining;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add a task…"
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-lg bg-brand-dark text-white px-4 py-2 text-sm font-semibold hover:bg-brand"
        >
          Add
        </button>
      </div>

      <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200">
        {tasks.length === 0 && (
          <li className="py-6 text-center text-sm text-slate-400">Nothing on the list.</li>
        )}
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center gap-3 px-4 py-3">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id)}
              className="accent-brand h-4 w-4"
            />
            <span className={`flex-1 text-sm ${t.done ? "line-through text-slate-400" : "text-slate-800"}`}>
              {t.text}
            </span>
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="text-xs text-slate-400 hover:text-rose-600"
            >
              remove
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          {remaining} remaining &middot; {doneCount} done
        </span>
        {doneCount > 0 && (
          <button
            type="button"
            onClick={clearDone}
            className="font-semibold text-brand hover:text-brand-dark"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}
