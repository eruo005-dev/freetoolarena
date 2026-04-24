"use client";

import { useMemo, useState } from "react";

interface ClassRow {
  id: number;
  name: string;
  credits: string;
}

const GRADE_SCALE: { letter: string; points: number }[] = [
  { letter: "A", points: 4.0 },
  { letter: "A-", points: 3.7 },
  { letter: "B+", points: 3.3 },
  { letter: "B", points: 3.0 },
  { letter: "B-", points: 2.7 },
  { letter: "C+", points: 2.3 },
  { letter: "C", points: 2.0 },
  { letter: "C-", points: 1.7 },
  { letter: "D+", points: 1.3 },
  { letter: "D", points: 1.0 },
  { letter: "F", points: 0.0 },
];

function pointsToLetter(p: number): string {
  if (p > 4.0) return `A+ (${p.toFixed(2)})`;
  let best = GRADE_SCALE[GRADE_SCALE.length - 1];
  let bestDist = Infinity;
  for (const g of GRADE_SCALE) {
    const d = Math.abs(g.points - p);
    if (d < bestDist) {
      bestDist = d;
      best = g;
    }
  }
  return `${best.letter} (${p.toFixed(2)})`;
}

export interface SemesterGpaTargetCalculatorProps {
  initialTarget?: number;
}

export function SemesterGpaTargetCalculator({ initialTarget = 3.5 }: SemesterGpaTargetCalculatorProps = {}) {
  const [target, setTarget] = useState(String(initialTarget));
  const [classes, setClasses] = useState<ClassRow[]>([
    { id: 1, name: "Calculus II", credits: "4" },
    { id: 2, name: "English Literature", credits: "3" },
    { id: 3, name: "Intro Psychology", credits: "3" },
    { id: 4, name: "General Chemistry", credits: "4" },
  ]);

  const result = useMemo(() => {
    const t = Number(target);
    if (!Number.isFinite(t) || t < 0 || t > 4) return null;
    const parsed = classes.map((c) => ({ name: c.name, credits: Number(c.credits) }));
    if (!parsed.every((p) => Number.isFinite(p.credits) && p.credits > 0)) return null;
    const totalCredits = parsed.reduce((s, c) => s + c.credits, 0);
    if (totalCredits <= 0) return null;
    const totalPointsNeeded = t * totalCredits;

    // Strategy 1: uniform
    const uniform = t;

    // Strategy 2: top-heavy (A in highest-credit, compensate rest)
    const sorted = [...parsed].sort((a, b) => b.credits - a.credits);
    const topHeavy: { name: string; credits: number; points: number }[] = [];
    let rem = totalPointsNeeded;
    let remCredits = totalCredits;
    for (let i = 0; i < sorted.length; i++) {
      const c = sorted[i];
      if (i < Math.ceil(sorted.length / 2)) {
        topHeavy.push({ ...c, points: 4.0 });
        rem -= 4.0 * c.credits;
        remCredits -= c.credits;
      } else {
        const pts = remCredits > 0 ? rem / remCredits : t;
        topHeavy.push({ ...c, points: Math.max(0, Math.min(4, pts)) });
      }
    }

    // Strategy 3: one A, one lower to compensate
    const mixed: { name: string; credits: number; points: number }[] = parsed.map((c, i) => {
      if (i === 0) return { ...c, points: 4.0 };
      if (i === parsed.length - 1) {
        let used = 4.0 * parsed[0].credits;
        let usedCredits = parsed[0].credits;
        for (let j = 1; j < parsed.length - 1; j++) {
          used += t * parsed[j].credits;
          usedCredits += parsed[j].credits;
        }
        const remPts = totalPointsNeeded - used;
        const remCr = totalCredits - usedCredits;
        const pts = remCr > 0 ? remPts / remCr : t;
        return { ...c, points: Math.max(0, Math.min(4, pts)) };
      }
      return { ...c, points: t };
    });

    return { uniform, topHeavy, mixed, totalCredits, parsed };
  }, [target, classes]);

  const addClass = () => {
    const nextId = Math.max(0, ...classes.map((c) => c.id)) + 1;
    setClasses([...classes, { id: nextId, name: `Class ${nextId}`, credits: "3" }]);
  };

  const updateClass = (id: number, key: keyof ClassRow, val: string) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, [key]: val } : c)));
  };

  const removeClass = (id: number) => {
    if (classes.length > 1) setClasses(classes.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Target semester GPA</span>
        <input
          type="number"
          step="0.01"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </label>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">Classes this semester</p>
        {classes.map((c) => (
          <div key={c.id} className="grid grid-cols-12 gap-2 items-center">
            <input
              value={c.name}
              onChange={(e) => updateClass(c.id, "name", e.target.value)}
              className="col-span-7 rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Class name"
            />
            <input
              type="number"
              value={c.credits}
              onChange={(e) => updateClass(c.id, "credits", e.target.value)}
              className="col-span-3 rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Credits"
            />
            <button
              type="button"
              onClick={() => removeClass(c.id)}
              className="col-span-2 rounded-lg border border-slate-300 px-2 py-2 text-sm text-slate-600 hover:bg-slate-50"
              disabled={classes.length <= 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addClass}
          className="text-sm font-semibold text-brand hover:underline"
        >
          + Add class
        </button>
      </div>

      {result ? (
        <>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Uniform strategy</p>
            <p className="text-2xl font-bold text-brand">Every class: {pointsToLetter(result.uniform)}</p>
            <p className="mt-1 text-sm text-slate-600">
              Total {result.totalCredits} credits &mdash; earn this grade in every class to hit your target.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <p className="px-4 py-2 text-xs uppercase tracking-wide font-semibold text-slate-500 bg-slate-50 border-b border-slate-200">
              Top-heavy strategy (aim high in bigger classes)
            </p>
            <table className="w-full text-sm">
              <thead className="bg-white text-slate-600">
                <tr>
                  <th className="text-left px-4 py-2">Class</th>
                  <th className="text-left px-4 py-2">Credits</th>
                  <th className="text-left px-4 py-2">Target grade</th>
                </tr>
              </thead>
              <tbody>
                {result.topHeavy.map((c, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="px-4 py-2 text-slate-900">{c.name}</td>
                    <td className="px-4 py-2 text-slate-600">{c.credits}</td>
                    <td className="px-4 py-2 font-semibold text-brand">{pointsToLetter(c.points)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <p className="px-4 py-2 text-xs uppercase tracking-wide font-semibold text-slate-500 bg-slate-50 border-b border-slate-200">
              Mixed strategy (one A offsets one lower grade)
            </p>
            <table className="w-full text-sm">
              <thead className="bg-white text-slate-600">
                <tr>
                  <th className="text-left px-4 py-2">Class</th>
                  <th className="text-left px-4 py-2">Credits</th>
                  <th className="text-left px-4 py-2">Target grade</th>
                </tr>
              </thead>
              <tbody>
                {result.mixed.map((c, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="px-4 py-2 text-slate-900">{c.name}</td>
                    <td className="px-4 py-2 text-slate-600">{c.credits}</td>
                    <td className="px-4 py-2 font-semibold text-brand">{pointsToLetter(c.points)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-sm text-red-600">
          Enter a target GPA between 0 and 4 and valid credit values for every class.
        </p>
      )}
    </div>
  );
}
