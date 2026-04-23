"use client";

import { useMemo, useState } from "react";

export function OneRepMaxCalculator() {
  const [weight, setWeight] = useState("225");
  const [reps, setReps] = useState("5");
  const [unit, setUnit] = useState<"lb" | "kg">("lb");

  const results = useMemo(() => {
    const w = Math.max(0, Number(weight) || 0);
    const r = Math.max(1, Math.min(12, Number(reps) || 1));
    const epley = w * (1 + r / 30);
    const brzycki = r < 37 ? (w * 36) / (37 - r) : 0;
    const lombardi = w * Math.pow(r, 0.1);
    const mayhew = (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r));
    const avg = (epley + brzycki + lombardi + mayhew) / 4;
    return { epley, brzycki, lombardi, mayhew, avg };
  }, [weight, reps]);

  const percents = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Weight lifted</span>
          <input
            type="number"
            min={0}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Reps completed</span>
          <input
            type="number"
            min={1}
            max={12}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Unit</span>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as "lb" | "kg")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="lb">Pounds (lb)</option>
            <option value="kg">Kilograms (kg)</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Estimated 1RM (average)</p>
        <p className="text-4xl font-bold text-brand tabular-nums">
          {results.avg.toFixed(0)} {unit}
        </p>
        <p className="text-xs text-slate-500 mt-1">Averaged across Epley, Brzycki, Lombardi, and Mayhew.</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-700 mb-2">By formula</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-2">Formula</th>
              <th className="py-2 text-right">1RM ({unit})</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-2">Epley</td>
              <td className="py-2 text-right tabular-nums">{results.epley.toFixed(0)}</td>
            </tr>
            <tr>
              <td className="py-2">Brzycki</td>
              <td className="py-2 text-right tabular-nums">{results.brzycki.toFixed(0)}</td>
            </tr>
            <tr>
              <td className="py-2">Lombardi</td>
              <td className="py-2 text-right tabular-nums">{results.lombardi.toFixed(0)}</td>
            </tr>
            <tr>
              <td className="py-2">Mayhew</td>
              <td className="py-2 text-right tabular-nums">{results.mayhew.toFixed(0)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-700 mb-2">Programming percentages</p>
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-slate-500">
                <th className="py-2 px-3">% of 1RM</th>
                <th className="py-2 px-3 text-right">Working weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {percents.map((p) => (
                <tr key={p}>
                  <td className="py-1.5 px-3">{p}%</td>
                  <td className="py-1.5 px-3 text-right tabular-nums">
                    {((results.avg * p) / 100).toFixed(0)} {unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Accuracy drops above ~10 reps. Always warm up and use a spotter for max attempts.
      </p>
    </div>
  );
}
