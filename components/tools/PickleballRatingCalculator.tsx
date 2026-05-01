"use client";

import { useMemo, useState } from "react";

export function PickleballRatingCalculator() {
  const [winsAtSameRating, setWinsAtSameRating] = useState<number>(7);
  const [lossesAtSameRating, setLossesAtSameRating] = useState<number>(3);
  const [winsVsHigher, setWinsVsHigher] = useState<number>(2);
  const [lossesVsLower, setLossesVsLower] = useState<number>(1);
  const [currentRating, setCurrentRating] = useState<number>(3.5);

  const result = useMemo(() => {
    const total = winsAtSameRating + lossesAtSameRating + winsVsHigher + lossesVsLower;
    if (total === 0) return null;

    const winRateSame = winsAtSameRating / Math.max(1, winsAtSameRating + lossesAtSameRating);
    const upset = winsVsHigher * 0.05 - lossesVsLower * 0.03;
    const adjustment = (winRateSame - 0.5) * 0.4 + upset;
    const newRating = Math.max(2.0, Math.min(7.0, currentRating + adjustment));

    let level = "";
    if (newRating < 2.5) level = "Beginner — learning serve and basic kitchen rules";
    else if (newRating < 3.0) level = "Advanced beginner — sustaining short rallies, working on third-shot drops";
    else if (newRating < 3.5) level = "Intermediate — consistent dinks, basic stacking, court positioning";
    else if (newRating < 4.0) level = "Strong intermediate — stacking, attacking high balls, holding the kitchen";
    else if (newRating < 4.5) level = "Advanced — quick hands at the net, varied serves, partner-aware play";
    else if (newRating < 5.0) level = "Tournament-level — strategic shot selection, tactical patience";
    else level = "Pro / open — what the top 1% of rec players look like";

    return { newRating: Math.round(newRating * 100) / 100, level, adjustment };
  }, [winsAtSameRating, lossesAtSameRating, winsVsHigher, lossesVsLower, currentRating]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Current self-assessed rating</span>
          <input type="number" min={2.0} max={7.0} step={0.5} value={currentRating} onChange={(e) => setCurrentRating(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
          <span className="mt-1 block text-xs text-slate-500">DUPR-style 2.0&ndash;7.0 scale</span>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Wins vs same-rated</span>
          <input type="number" min={0} value={winsAtSameRating} onChange={(e) => setWinsAtSameRating(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Losses vs same-rated</span>
          <input type="number" min={0} value={lossesAtSameRating} onChange={(e) => setLossesAtSameRating(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Wins vs higher-rated</span>
          <input type="number" min={0} value={winsVsHigher} onChange={(e) => setWinsVsHigher(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium text-slate-700">Losses vs lower-rated</span>
          <input type="number" min={0} value={lossesVsLower} onChange={(e) => setLossesVsLower(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-5">
            <div className="text-xs uppercase tracking-wide text-emerald-700">Estimated rating</div>
            <div className="text-3xl font-bold text-emerald-900">{result.newRating.toFixed(2)}</div>
            <div className="mt-1 text-sm text-emerald-800">
              {result.adjustment > 0 ? "+" : ""}{result.adjustment.toFixed(2)} from your stated rating
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <h4 className="mb-2 font-semibold">Level expectations</h4>
            <p>{result.level}</p>
          </div>

          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            For an official rating, register with DUPR (Dynamic Universal Pickleball Rating) &mdash; the global standard. This
            calculator gives you a fast self-check based on recent results. Most rec players overrate themselves by 0.5
            points; if your DUPR comes back lower than your self-rating, that&rsquo;s normal.
          </div>
        </>
      )}
    </div>
  );
}
