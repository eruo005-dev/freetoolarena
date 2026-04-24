"use client";

import { useMemo, useState } from "react";

function letterFor(pct: number): string {
  if (pct >= 93) return "A";
  if (pct >= 90) return "A-";
  if (pct >= 87) return "B+";
  if (pct >= 83) return "B";
  if (pct >= 80) return "B-";
  if (pct >= 77) return "C+";
  if (pct >= 73) return "C";
  if (pct >= 70) return "C-";
  if (pct >= 67) return "D+";
  if (pct >= 60) return "D";
  return "F";
}

export interface FinalExamGradeNeededProps {
  initialCurrent?: number;
  initialWeight?: number;
  initialTarget?: number;
}

export function FinalExamGradeNeeded({
  initialCurrent = 82,
  initialWeight = 25,
  initialTarget = 90,
}: FinalExamGradeNeededProps = {}) {
  const [currentAvg, setCurrentAvg] = useState(String(initialCurrent));
  const [weight, setWeight] = useState(String(initialWeight));
  const [target, setTarget] = useState(String(initialTarget));

  const result = useMemo(() => {
    const ca = Number(currentAvg);
    const w = Number(weight);
    const t = Number(target);
    if (![ca, w, t].every(Number.isFinite)) return null;
    if (w <= 0 || w > 100 || ca < 0 || ca > 120 || t < 0 || t > 120) return null;

    const wDec = w / 100;
    const needed = (t - ca * (1 - wDec)) / wDec;

    let tier: string;
    let tierColor: string;
    if (needed > 100) {
      tier = "Impossible (needs > 100%)";
      tierColor = "text-red-600";
    } else if (needed > 95) {
      tier = "Very hard";
      tierColor = "text-orange-600";
    } else if (needed > 85) {
      tier = "Hard";
      tierColor = "text-amber-600";
    } else if (needed > 70) {
      tier = "Possible";
      tierColor = "text-emerald-600";
    } else if (needed > 0) {
      tier = "Easy";
      tierColor = "text-emerald-600";
    } else {
      tier = "Already guaranteed";
      tierColor = "text-emerald-600";
    }

    // Alt targets table
    const altTargets = [95, 90, 85, 80, 75, 70, 65, 60].map((tg) => ({
      target: tg,
      needed: (tg - ca * (1 - wDec)) / wDec,
    }));

    // Max achievable = if you score 100 on final
    const maxAchievable = ca * (1 - wDec) + 100 * wDec;
    // Min guaranteed = if you score 0
    const minGuaranteed = ca * (1 - wDec);

    return { needed, tier, tierColor, altTargets, maxAchievable, minGuaranteed };
  }, [currentAvg, weight, target]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Current course average (%)</span>
          <input
            type="number"
            step="0.1"
            value={currentAvg}
            onChange={(e) => setCurrentAvg(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Final exam weight (%)</span>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Target course grade (%)</span>
          <input
            type="number"
            step="0.1"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      {result ? (
        <>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
              Final exam grade needed
            </p>
            <p className="text-4xl font-bold text-brand tabular-nums">{result.needed.toFixed(1)}%</p>
            <p className={`mt-2 text-sm font-semibold ${result.tierColor}`}>{result.tier}</p>
            <p className="mt-1 text-xs text-slate-500">
              Range of possible course grades: {result.minGuaranteed.toFixed(1)}% (score 0) &mdash;{" "}
              {result.maxAchievable.toFixed(1)}% (score 100)
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <p className="px-4 py-2 text-xs uppercase tracking-wide font-semibold text-slate-500 bg-slate-50 border-b border-slate-200">
              Alternative targets &mdash; if your current target isn&rsquo;t feasible
            </p>
            <table className="w-full text-sm">
              <thead className="bg-white text-slate-600">
                <tr>
                  <th className="text-left px-4 py-2">Target</th>
                  <th className="text-left px-4 py-2">Letter</th>
                  <th className="text-left px-4 py-2">Need on final</th>
                  <th className="text-left px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {result.altTargets.map((r) => {
                  const achievable = r.needed <= 100 && r.needed >= 0;
                  const already = r.needed <= 0;
                  return (
                    <tr key={r.target} className="border-t border-slate-100">
                      <td className="px-4 py-2 font-semibold text-slate-900">{r.target}%</td>
                      <td className="px-4 py-2 text-slate-700">{letterFor(r.target)}</td>
                      <td className="px-4 py-2 text-slate-700 tabular-nums">
                        {already ? "Locked in" : `${r.needed.toFixed(1)}%`}
                      </td>
                      <td className="px-4 py-2">
                        {already ? (
                          <span className="text-emerald-600 font-semibold">Guaranteed</span>
                        ) : achievable ? (
                          <span className="text-emerald-600">Achievable</span>
                        ) : (
                          <span className="text-red-600">Impossible</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-sm text-red-600">
          Enter a valid course average, a final-exam weight between 0&ndash;100%, and a target grade.
        </p>
      )}
    </div>
  );
}
