"use client";

import { useMemo, useState } from "react";

type Activity = "low" | "moderate" | "active";

const ACTIVITY_MULT: Record<Activity, number> = {
  low: 1.2,
  moderate: 1.6,
  active: 1.8,
};

type Treat = { name: string; kcal: number; size: string };

const TREATS: Treat[] = [
  { name: "Plain training treat (small)", kcal: 3, size: "1 piece" },
  { name: "Milkbone Mini", kcal: 5, size: "1 biscuit" },
  { name: "Greenies Petite", kcal: 54, size: "1 chew" },
  { name: "Carrot baby (medium)", kcal: 4, size: "1 piece" },
  { name: "Blueberry", kcal: 1, size: "1 berry" },
  { name: "Plain rice cake quarter", kcal: 9, size: "1/4" },
  { name: "Cooked chicken (no salt)", kcal: 25, size: "1 oz" },
  { name: "Peanut butter (xylitol-free)", kcal: 95, size: "1 tbsp" },
  { name: "Cheese cube", kcal: 110, size: "1 oz" },
  { name: "Bully stick (medium)", kcal: 110, size: "1 stick" },
  { name: "Pumpkin (canned plain)", kcal: 40, size: "1/4 cup" },
  { name: "Apple slice (no seeds)", kcal: 11, size: "1 thin slice" },
];

export function DogTreatCalorieBudget() {
  const [weight, setWeight] = useState<number>(40);
  const [activity, setActivity] = useState<Activity>("moderate");

  const result = useMemo(() => {
    if (!Number.isFinite(weight) || weight <= 0) return null;
    const kg = weight / 2.20462;
    const rer = 70 * Math.pow(kg, 0.75);
    const der = rer * ACTIVITY_MULT[activity];
    const treatBudget = der * 0.10;
    return { rer: Math.round(rer), der: Math.round(der), treatBudget: Math.round(treatBudget) };
  }, [weight, activity]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Dog weight (lbs)</span>
          <input
            type="number"
            min={1}
            max={250}
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Activity level</span>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as Activity)}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            <option value="low">Low (couch dog, senior, neutered)</option>
            <option value="moderate">Moderate (daily walks)</option>
            <option value="active">Active (working, sporting, puppy)</option>
          </select>
        </label>
      </div>

      {result && (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Daily calorie need</div>
              <div className="text-2xl font-bold text-slate-800">{result.der} kcal</div>
              <div className="mt-1 text-xs text-slate-500">All meals + treats combined</div>
            </div>
            <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
              <div className="text-xs uppercase tracking-wide text-emerald-700">Treat budget (10%)</div>
              <div className="text-2xl font-bold text-emerald-900">{result.treatBudget} kcal</div>
              <div className="mt-1 text-xs text-emerald-800">The vet-recommended cap</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Resting need (RER)</div>
              <div className="text-2xl font-bold text-slate-800">{result.rer} kcal</div>
              <div className="mt-1 text-xs text-slate-500">Pre-activity baseline</div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">
              How many treats fit under {result.treatBudget} kcal/day
            </h4>
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="py-1">Treat</th>
                  <th className="py-1">Per piece</th>
                  <th className="py-1 text-right">Pieces / day</th>
                </tr>
              </thead>
              <tbody>
                {TREATS.map((t) => {
                  const max = Math.floor(result.treatBudget / t.kcal);
                  return (
                    <tr key={t.name} className="border-t border-slate-100">
                      <td className="py-1 text-slate-700">{t.name} <span className="text-xs text-slate-500">({t.size})</span></td>
                      <td className="py-1 text-slate-600">{t.kcal} kcal</td>
                      <td className="py-1 text-right font-medium text-slate-800">
                        {max >= 1 ? max : "<1"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="rounded border border-rose-200 bg-rose-50 p-3 text-xs text-rose-900">
            <strong>Never feed:</strong> chocolate, grapes, raisins, onions, garlic, xylitol-sweetened
            anything, macadamia nuts, raw bread dough, cooked bones. When in doubt, skip it &mdash; the
            10% rule applies only to <em>safe</em> treats added to a balanced diet.
          </div>

          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            <strong>Math:</strong> RER = 70 &times; kg<sup>0.75</sup>; DER = RER &times; activity factor;
            treat cap = DER &times; 0.10. AAFCO and AAHA both recommend 10% as the safe ceiling for
            treats so the daily food still delivers complete nutrition.
          </div>
        </>
      )}
    </div>
  );
}
