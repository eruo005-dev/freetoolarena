"use client";

import { useMemo, useState } from "react";

export interface CollegeGpaProjectorProps {
  initialCurrent?: number;
  initialCreditsDone?: number;
  initialTarget?: number;
  initialCreditsLeft?: number;
}

export function CollegeGpaProjector({
  initialCurrent = 3.2,
  initialCreditsDone = 60,
  initialTarget = 3.5,
  initialCreditsLeft = 60,
}: CollegeGpaProjectorProps = {}) {
  const [currentGpa, setCurrentGpa] = useState(String(initialCurrent));
  const [creditsDone, setCreditsDone] = useState(String(initialCreditsDone));
  const [targetGpa, setTargetGpa] = useState(String(initialTarget));
  const [creditsLeft, setCreditsLeft] = useState(String(initialCreditsLeft));

  const result = useMemo(() => {
    const cg = Number(currentGpa);
    const cd = Number(creditsDone);
    const tg = Number(targetGpa);
    const cl = Number(creditsLeft);
    if (![cg, cd, tg, cl].every(Number.isFinite)) return null;
    if (cg < 0 || cg > 4 || tg < 0 || tg > 4 || cd < 0 || cl <= 0) return null;
    const total = cd + cl;
    const needed = (tg * total - cg * cd) / cl;

    let tier: string;
    let tierColor: string;
    if (needed > 4) {
      tier = "Impossible with a 4.0 scale";
      tierColor = "text-red-600";
    } else if (needed > 3.8) {
      tier = "Very hard";
      tierColor = "text-orange-600";
    } else if (needed > 3.3) {
      tier = "Hard";
      tierColor = "text-amber-600";
    } else if (needed > 0) {
      tier = "Achievable";
      tierColor = "text-emerald-600";
    } else {
      tier = "Already on track";
      tierColor = "text-emerald-600";
    }

    const projections = [3.0, 3.3, 3.5, 3.7, 4.0].map((sem) => ({
      sem,
      finalGpa: (cg * cd + sem * cl) / total,
    }));

    return { needed, tier, tierColor, projections, total };
  }, [currentGpa, creditsDone, targetGpa, creditsLeft]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Current cumulative GPA</span>
          <input
            type="number"
            step="0.01"
            value={currentGpa}
            onChange={(e) => setCurrentGpa(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Credits completed</span>
          <input
            type="number"
            value={creditsDone}
            onChange={(e) => setCreditsDone(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Target GPA</span>
          <input
            type="number"
            step="0.01"
            value={targetGpa}
            onChange={(e) => setTargetGpa(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Credits remaining</span>
          <input
            type="number"
            value={creditsLeft}
            onChange={(e) => setCreditsLeft(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      {result ? (
        <>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
              Required GPA across remaining credits
            </p>
            <p className="text-4xl font-bold text-brand tabular-nums">{result.needed.toFixed(2)}</p>
            <p className={`mt-2 text-sm font-semibold ${result.tierColor}`}>{result.tier}</p>
            <p className="mt-1 text-xs text-slate-500">Total degree credits: {result.total}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <p className="px-4 py-2 text-xs uppercase tracking-wide font-semibold text-slate-500 bg-slate-50 border-b border-slate-200">
              Projected final GPA by remaining-credit GPA
            </p>
            <div className="p-4 space-y-2">
              {result.projections.map((p) => {
                const pct = Math.min(100, Math.max(0, (p.finalGpa / 4) * 100));
                return (
                  <div key={p.sem} className="flex items-center gap-3">
                    <div className="w-16 text-sm font-semibold text-slate-700 tabular-nums">
                      {p.sem.toFixed(1)}
                    </div>
                    <div className="flex-1 h-5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="w-20 text-right text-sm font-semibold text-slate-900 tabular-nums">
                      {p.finalGpa.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-red-600">Enter valid GPAs (0&ndash;4) and positive credit counts.</p>
      )}
    </div>
  );
}
