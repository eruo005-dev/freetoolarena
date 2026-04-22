"use client";

import { useMemo, useState } from "react";

type Unit = "lb" | "kg";
type Activity = "low" | "moderate" | "high";
type Climate = "temperate" | "hot";

const ACTIVITY_ADJ: Record<Activity, number> = {
  low: 0.1,
  moderate: 0.2,
  high: 0.3,
};

const CLIMATE_ADJ: Record<Climate, number> = {
  temperate: 0,
  hot: 0.1,
};

export function WaterFromWeightCalculator() {
  const [weight, setWeight] = useState("160");
  const [unit, setUnit] = useState<Unit>("lb");
  const [activity, setActivity] = useState<Activity>("moderate");
  const [climate, setClimate] = useState<Climate>("temperate");

  const { oz, ml, cups, baseOz, totalMultiplier } = useMemo(() => {
    const raw = Math.max(0, parseFloat(weight) || 0);
    // Base calc
    let baseOzVal: number;
    let baseMlVal: number;
    if (unit === "lb") {
      baseOzVal = raw * 0.5;
      baseMlVal = baseOzVal * 29.5735;
    } else {
      baseMlVal = raw * 33;
      baseOzVal = baseMlVal / 29.5735;
    }
    const mult = 1 + ACTIVITY_ADJ[activity] + CLIMATE_ADJ[climate];
    const ozVal = baseOzVal * mult;
    const mlVal = baseMlVal * mult;
    return {
      oz: ozVal,
      ml: mlVal,
      cups: ozVal / 8,
      baseOz: baseOzVal,
      totalMultiplier: mult,
    };
  }, [weight, unit, activity, climate]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-slate-200 bg-white">
        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Body weight</span>
          <div className="flex gap-2">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            <div className="flex rounded-lg border border-slate-300 overflow-hidden">
              {(["lb", "kg"] as Unit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={`px-3 text-sm font-medium ${
                    unit === u ? "bg-brand text-white" : "bg-white text-slate-700"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Activity</span>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as Activity)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            <option value="low">Low (+10%)</option>
            <option value="moderate">Moderate (+20%)</option>
            <option value="high">High (+30%)</option>
          </select>
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Climate</span>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value as Climate)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            <option value="temperate">Temperate</option>
            <option value="hot">Hot (+10%)</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="text-2xl font-bold text-brand">
          {oz.toFixed(0)} oz / day
        </div>
        <div className="text-sm text-slate-600 mt-1">
          Base {baseOz.toFixed(0)} oz x {totalMultiplier.toFixed(2)} (activity + climate)
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
            <div className="text-xs uppercase tracking-wide text-slate-500">Ounces</div>
            <div className="text-lg font-semibold text-slate-900">{oz.toFixed(0)} oz</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
            <div className="text-xs uppercase tracking-wide text-slate-500">Milliliters</div>
            <div className="text-lg font-semibold text-slate-900">{ml.toFixed(0)} ml</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
            <div className="text-xs uppercase tracking-wide text-slate-500">Cups (8 oz)</div>
            <div className="text-lg font-semibold text-slate-900">{cups.toFixed(1)}</div>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimate only — consult a doctor or RD for medical advice.
      </p>
    </div>
  );
}
