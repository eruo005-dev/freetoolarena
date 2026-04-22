"use client";

import { useMemo, useState } from "react";

interface Item {
  id: number;
  name: string;
  score: string;
  max: string;
  weight: string;
}

function letter(pct: number): string {
  if (!Number.isFinite(pct)) return "—";
  if (pct >= 93) return "A";
  if (pct >= 90) return "A-";
  if (pct >= 87) return "B+";
  if (pct >= 83) return "B";
  if (pct >= 80) return "B-";
  if (pct >= 77) return "C+";
  if (pct >= 73) return "C";
  if (pct >= 70) return "C-";
  if (pct >= 67) return "D+";
  if (pct >= 63) return "D";
  if (pct >= 60) return "D-";
  return "F";
}

export function GradeCalculator() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Homework", score: "90", max: "100", weight: "20" },
    { id: 2, name: "Midterm", score: "82", max: "100", weight: "30" },
    { id: 3, name: "Project", score: "88", max: "100", weight: "20" },
  ]);
  const [finalWeight, setFinalWeight] = useState("30");
  const [targetGrade, setTargetGrade] = useState("90");

  const update = (id: number, patch: Partial<Item>) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const add = () =>
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name: "", score: "", max: "100", weight: "" },
    ]);
  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  const stats = useMemo(() => {
    let weightedSum = 0;
    let totalWeight = 0;
    for (const i of items) {
      const s = parseFloat(i.score);
      const m = parseFloat(i.max);
      const w = parseFloat(i.weight);
      if (!Number.isFinite(s) || !Number.isFinite(m) || m <= 0 || !Number.isFinite(w) || w <= 0)
        continue;
      weightedSum += (s / m) * 100 * w;
      totalWeight += w;
    }
    const current = totalWeight > 0 ? weightedSum / totalWeight : 0;
    return { current, totalWeight, weightedSum };
  }, [items]);

  const needed = useMemo(() => {
    const fw = parseFloat(finalWeight);
    const target = parseFloat(targetGrade);
    if (!Number.isFinite(fw) || fw <= 0 || !Number.isFinite(target)) return null;
    // Current assignments make up (100 - fw)% of the grade.
    // Their contribution so far = (weightedSum / totalWeight) * (100 - fw) / 100
    // needed on final * fw/100 + current contribution = target
    const currentContribution = stats.totalWeight > 0
      ? (stats.weightedSum / stats.totalWeight) * ((100 - fw) / 100)
      : 0;
    const need = (target - currentContribution) * (100 / fw);
    return need;
  }, [finalWeight, targetGrade, stats]);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        {items.map((i) => (
          <div key={i.id} className="grid grid-cols-12 gap-2 items-center">
            <input
              value={i.name}
              onChange={(e) => update(i.id, { name: e.target.value })}
              placeholder="Assignment"
              className="col-span-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            <input
              type="number"
              inputMode="decimal"
              value={i.score}
              onChange={(e) => update(i.id, { score: e.target.value })}
              placeholder="Score"
              className="col-span-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            <input
              type="number"
              inputMode="decimal"
              value={i.max}
              onChange={(e) => update(i.id, { max: e.target.value })}
              placeholder="Max"
              className="col-span-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            <input
              type="number"
              inputMode="decimal"
              value={i.weight}
              onChange={(e) => update(i.id, { weight: e.target.value })}
              placeholder="Weight %"
              className="col-span-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            <button
              type="button"
              onClick={() => remove(i.id)}
              className="col-span-1 text-xs text-slate-400 hover:text-rose-600"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
      >
        + Add assignment
      </button>

      <div className="rounded-xl bg-slate-50 p-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Current %</p>
            <p className="text-2xl text-brand font-bold">
              {stats.totalWeight > 0 ? `${stats.current.toFixed(2)}%` : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Letter grade</p>
            <p className="text-xl font-bold text-slate-900">
              {stats.totalWeight > 0 ? letter(stats.current) : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Weight used</p>
            <p className="text-xl font-bold text-slate-900">{stats.totalWeight}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-700">What grade do I need on the final?</p>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
              Final weight %
            </span>
            <input
              type="number"
              inputMode="decimal"
              value={finalWeight}
              onChange={(e) => setFinalWeight(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
              Target overall %
            </span>
            <input
              type="number"
              inputMode="decimal"
              value={targetGrade}
              onChange={(e) => setTargetGrade(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>
        <div className="rounded-xl bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">You need on the final</p>
          {needed === null ? (
            <p className="text-slate-500 text-sm">Enter final weight and target.</p>
          ) : needed > 100 ? (
            <p className="text-xl font-bold text-rose-600">Not possible — need {needed.toFixed(1)}%</p>
          ) : needed < 0 ? (
            <p className="text-xl font-bold text-emerald-600">You already have it. 0% works.</p>
          ) : (
            <p className="text-2xl text-brand font-bold">{needed.toFixed(1)}%</p>
          )}
        </div>
      </div>
    </div>
  );
}
