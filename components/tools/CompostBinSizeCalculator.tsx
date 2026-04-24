"use client";

import { useMemo, useState } from "react";

type YardLevel = "none" | "small" | "large";

export function CompostBinSizeCalculator() {
  const [household, setHousehold] = useState(3);
  const [cookNights, setCookNights] = useState(5);
  const [yard, setYard] = useState<YardLevel>("small");
  const [method, setMethod] = useState<"pile" | "tumbler">("pile");

  const result = useMemo(() => {
    const hh = Number.isFinite(household) && household > 0 ? household : 1;
    const cn = Number.isFinite(cookNights) ? Math.min(7, Math.max(0, cookNights)) : 0;

    // Scale kitchen scraps from 1 lb/person/wk baseline by cooking frequency (baseline = 4 nights/wk)
    const kitchenLbs = hh * 1 * (0.6 + (cn / 7) * 0.8);
    const yardLbs = yard === "none" ? 0 : yard === "small" ? 2.5 : 5;
    const totalLbs = kitchenLbs + yardLbs;

    // ~1 lb of organic waste ~ 0.02 cu ft fresh; pile needs 3-5x buffer volume
    const freshVolCuFt = totalLbs * 0.02;
    const binVolCuFt = freshVolCuFt * 4;
    const binVolGallons = binVolCuFt * 7.48;

    let recommendation: string;
    let recVolCuFt: number;
    if (hh <= 2 && yard === "none") {
      recommendation = "18-gallon countertop/outdoor bin or 3x3x3 ft pile (~27 cu ft)";
      recVolCuFt = 27;
    } else if (hh <= 4 && yard !== "large") {
      recommendation = "4x4x4 ft pile/bin (~64 cu ft) or dual-chamber tumbler (~10 cu ft)";
      recVolCuFt = 64;
    } else {
      recommendation = "5x5x5 ft pile (~125 cu ft) plus a tumbler for finishing";
      recVolCuFt = 125;
    }

    const tumblerBetter = yard === "none" && hh <= 3;
    const firstCompostWeeks = method === "tumbler" ? "4-8 weeks" : "3-6 months";

    return {
      totalLbs,
      kitchenLbs,
      yardLbs,
      binVolCuFt,
      binVolGallons,
      recommendation,
      recVolCuFt,
      tumblerBetter,
      firstCompostWeeks,
    };
  }, [household, cookNights, yard, method]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Household size</span>
          <input
            type="number"
            value={household}
            onChange={(e) => setHousehold(parseInt(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Home-cooked dinners per week</span>
          <input
            type="number"
            value={cookNights}
            onChange={(e) => setCookNights(parseInt(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Yard waste level</span>
          <select
            value={yard}
            onChange={(e) => setYard(e.target.value as YardLevel)}
            className="rounded border border-slate-300 px-3 py-2"
          >
            <option value="none">No yard (apartment)</option>
            <option value="small">Small yard</option>
            <option value="large">Large yard</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Composting method</span>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as "pile" | "tumbler")}
            className="rounded border border-slate-300 px-3 py-2"
          >
            <option value="pile">Open pile / bin</option>
            <option value="tumbler">Tumbler</option>
          </select>
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Weekly waste (lbs)</div>
          <div className="text-2xl font-bold text-brand">{result.totalLbs.toFixed(1)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Weekly volume</div>
          <div className="text-2xl font-bold text-brand">
            {result.binVolGallons.toFixed(0)} gal
          </div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Recommended size</div>
          <div className="text-lg font-semibold text-brand">~{result.recVolCuFt} cu ft</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">First compost in</div>
          <div className="text-2xl font-bold text-brand">{result.firstCompostWeeks}</div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 p-4 text-sm">
        <p>
          Recommendation: <strong>{result.recommendation}</strong>.
        </p>
        <p className="mt-2">
          Tumbler vs pile:{" "}
          {result.tumblerBetter ? (
            <span>
              a dual-chamber tumbler will fit your footprint and finish faster&mdash;less mess on a balcony.
            </span>
          ) : (
            <span>
              an open pile or large bin handles higher yard-waste volume better; a tumbler can still help
              finish batches in 4&ndash;8 weeks.
            </span>
          )}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Kitchen scraps contribute {result.kitchenLbs.toFixed(1)} lb/wk; yard waste adds{" "}
          {result.yardLbs.toFixed(1)} lb/wk. Material compresses roughly 4:1 as it breaks down.
        </p>
      </div>
    </div>
  );
}
