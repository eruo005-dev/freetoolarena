"use client";

import { useMemo, useState } from "react";

export function Employer401kMatchOptimizer() {
  const [salary, setSalary] = useState("85000");
  const [contribPct, setContribPct] = useState("4");
  const [matchPct, setMatchPct] = useState("50");
  const [matchCap, setMatchCap] = useState("6");
  const [catchUp, setCatchUp] = useState(false);

  const result = useMemo(() => {
    const s = Number(salary) || 0;
    const cp = (Number(contribPct) || 0) / 100;
    const mp = (Number(matchPct) || 0) / 100;
    const mc = (Number(matchCap) || 0) / 100;

    const limit2026 = 24000 + (catchUp ? 8000 : 0);
    const yourContrib = Math.min(s * cp, limit2026);
    const matchedPortion = Math.min(cp, mc);
    const employerMatch = s * matchedPortion * mp;
    const maxEmployerMatch = s * mc * mp;
    const missed = Math.max(0, maxEmployerMatch - employerMatch);
    const missedPct = maxEmployerMatch > 0 ? (missed / maxEmployerMatch) * 100 : 0;
    const totalPerYear = yourContrib + employerMatch;

    const contribToMax = Math.max(0, s * mc - yourContrib);
    return { yourContrib, employerMatch, maxEmployerMatch, missed, missedPct, totalPerYear, contribToMax, limit2026 };
  }, [salary, contribPct, matchPct, matchCap, catchUp]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Annual salary ($)</span>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Your contribution (%)</span>
          <input type="number" value={contribPct} onChange={(e) => setContribPct(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Match rate (%)</span>
          <input type="number" value={matchPct} onChange={(e) => setMatchPct(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Match up to (% of salary)</span>
          <input type="number" value={matchCap} onChange={(e) => setMatchCap(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="flex items-center gap-2 mt-6">
          <input type="checkbox" checked={catchUp} onChange={(e) => setCatchUp(e.target.checked)} className="rounded" />
          <span className="text-sm text-slate-700">Catch-up eligible (50+)</span>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Total per year</div>
          <div className="text-3xl font-bold text-brand tabular-nums">${result.totalPerYear.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        </div>
        <div className={`rounded-xl p-4 ${result.missed > 0 ? "bg-amber-50" : "bg-emerald-50"}`}>
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Match left on table</div>
          <div className="text-3xl font-bold text-brand tabular-nums">${result.missed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          <div className="text-xs text-slate-500 mt-1 tabular-nums">{result.missedPct.toFixed(0)}% of max match missed</div>
        </div>
      </div>

      <table className="w-full text-sm">
        <tbody>
          <tr className="border-b border-slate-200">
            <td className="py-2 text-slate-600">Your contribution</td>
            <td className="py-2 text-right tabular-nums font-medium">${result.yourContrib.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
          </tr>
          <tr className="border-b border-slate-200">
            <td className="py-2 text-slate-600">Employer match</td>
            <td className="py-2 text-right tabular-nums font-medium">${result.employerMatch.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
          </tr>
          <tr className="border-b border-slate-200">
            <td className="py-2 text-slate-600">Max possible employer match</td>
            <td className="py-2 text-right tabular-nums font-medium">${result.maxEmployerMatch.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold">2026 contribution limit</td>
            <td className="py-2 text-right tabular-nums font-bold">${result.limit2026.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      {result.missed > 0 && (
        <p className="text-sm text-amber-800 bg-amber-50 rounded-lg p-3">
          Increase your contribution to at least {matchCap}% to capture the full employer match.
        </p>
      )}
    </div>
  );
}
