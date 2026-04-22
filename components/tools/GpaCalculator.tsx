"use client";

import { useMemo, useState } from "react";

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
  honors: boolean;
}

export function GpaCalculator() {
  const [weighted, setWeighted] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "English", grade: "A", credits: "3", honors: false },
    { id: 2, name: "Math", grade: "B+", credits: "4", honors: true },
    { id: 3, name: "History", grade: "A-", credits: "3", honors: false },
  ]);

  const update = (id: number, patch: Partial<Course>) =>
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const add = () =>
    setCourses((prev) => [
      ...prev,
      { id: Date.now(), name: "", grade: "A", credits: "3", honors: false },
    ]);
  const remove = (id: number) => setCourses((prev) => prev.filter((c) => c.id !== id));

  const { gpa, totalCredits } = useMemo(() => {
    let points = 0;
    let credits = 0;
    for (const c of courses) {
      const cr = parseFloat(c.credits);
      if (!Number.isFinite(cr) || cr <= 0) continue;
      const base = GRADE_POINTS[c.grade] ?? 0;
      const adj = weighted && c.honors && base > 0 ? Math.min(5, base + 1) : base;
      points += adj * cr;
      credits += cr;
    }
    return { gpa: credits > 0 ? points / credits : 0, totalCredits: credits };
  }, [courses, weighted]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {[
          { k: false, label: "Unweighted" },
          { k: true, label: "Weighted (AP/Honors +1)" },
        ].map((opt) => (
          <button
            key={String(opt.k)}
            type="button"
            onClick={() => setWeighted(opt.k)}
            className={`rounded-lg border px-4 py-1.5 text-sm font-semibold ${
              weighted === opt.k
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {courses.map((c) => (
          <div key={c.id} className="grid grid-cols-12 gap-2 items-center">
            <input
              value={c.name}
              onChange={(e) => update(c.id, { name: e.target.value })}
              placeholder="Course"
              className="col-span-4 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            <select
              value={c.grade}
              onChange={(e) => update(c.id, { grade: e.target.value })}
              className="col-span-3 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            >
              {Object.keys(GRADE_POINTS).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={c.credits}
              onChange={(e) => update(c.id, { credits: e.target.value })}
              placeholder="Credits"
              className="col-span-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            {weighted ? (
              <label className="col-span-2 flex items-center gap-1.5 text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={c.honors}
                  onChange={(e) => update(c.id, { honors: e.target.checked })}
                  className="accent-brand"
                />
                AP/Hon
              </label>
            ) : (
              <span className="col-span-2" />
            )}
            <button
              type="button"
              onClick={() => remove(c.id)}
              className="col-span-1 text-xs text-slate-400 hover:text-rose-600"
            >
              remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
      >
        + Add course
      </button>

      <div className="rounded-xl bg-slate-50 p-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">GPA</p>
            <p className="text-2xl text-brand font-bold">
              {totalCredits > 0 ? gpa.toFixed(2) : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Total credits</p>
            <p className="text-xl font-bold text-slate-900">{totalCredits || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
