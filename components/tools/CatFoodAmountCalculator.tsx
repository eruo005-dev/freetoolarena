"use client";

import { useMemo, useState } from "react";

type AgeGroup = "kitten" | "adult" | "senior";
type FoodType = "dry" | "wet" | "mixed";

export function CatFoodAmountCalculator() {
  const [weightLbs, setWeightLbs] = useState("10");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("adult");
  const [foodType, setFoodType] = useState<FoodType>("mixed");

  const result = useMemo(() => {
    const lbs = Number(weightLbs);
    if (!Number.isFinite(lbs) || lbs <= 0) return null;

    // kcal/lb/day
    let kcalPerLb = 25;
    if (ageGroup === "kitten") kcalPerLb = 50;
    else if (ageGroup === "senior") kcalPerLb = 22;

    const dailyKcal = lbs * kcalPerLb;

    // Dry kibble: ~400 kcal/cup
    const cupsDry = dailyKcal / 400;
    // Wet food: ~80 kcal per 3-oz pouch
    const pouchesWet = dailyKcal / 80;

    // Meals
    const meals = ageGroup === "kitten" ? 3 : 2;

    // Split based on food type
    let dryShare = 0;
    let wetShare = 0;
    if (foodType === "dry") {
      dryShare = cupsDry;
    } else if (foodType === "wet") {
      wetShare = pouchesWet;
    } else {
      dryShare = cupsDry * 0.5;
      wetShare = pouchesWet * 0.5;
    }

    return {
      dailyKcal: Math.round(dailyKcal),
      cupsDry: Math.round(cupsDry * 100) / 100,
      pouchesWet: Math.round(pouchesWet * 10) / 10,
      dryShare: Math.round(dryShare * 100) / 100,
      wetShare: Math.round(wetShare * 10) / 10,
      meals,
      foodType,
    };
  }, [weightLbs, ageGroup, foodType]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Cat weight (lbs)</span>
          <input
            type="number"
            min={0}
            step={0.1}
            value={weightLbs}
            onChange={(e) => setWeightLbs(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Life stage</span>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="kitten">Kitten (under 1 yr)</option>
            <option value="adult">Adult (1&ndash;10 yrs)</option>
            <option value="senior">Senior (10+ yrs)</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Food type</span>
          <select
            value={foodType}
            onChange={(e) => setFoodType(e.target.value as FoodType)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="dry">Dry kibble only</option>
            <option value="wet">Wet pouches only</option>
            <option value="mixed">Mixed (50/50)</option>
          </select>
        </label>
      </div>

      {result ? (
        <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Daily calories
            </div>
            <div className="text-3xl font-semibold text-brand">
              {result.dailyKcal} kcal/day
            </div>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            {(result.foodType === "dry" || result.foodType === "mixed") && (
              <div className="rounded-md bg-white p-3 shadow-sm">
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Dry kibble
                </div>
                <div className="text-lg font-semibold">
                  {result.dryShare} cups/day
                </div>
                <div className="text-xs text-slate-500">
                  Assumes ~400 kcal/cup. Check your bag.
                </div>
              </div>
            )}
            {(result.foodType === "wet" || result.foodType === "mixed") && (
              <div className="rounded-md bg-white p-3 shadow-sm">
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Wet pouches
                </div>
                <div className="text-lg font-semibold">
                  {result.wetShare} pouches/day
                </div>
                <div className="text-xs text-slate-500">
                  Assumes ~80 kcal per 3-oz pouch.
                </div>
              </div>
            )}
            <div className="rounded-md bg-white p-3 shadow-sm sm:col-span-2">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Meal schedule
              </div>
              <div className="text-lg font-semibold">{result.meals} meals per day</div>
              <div className="text-xs text-slate-500">
                Cats do best with smaller, more frequent meals. Wet food also boosts
                hydration &mdash; great for kidney health in seniors.
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Typical adult cats need ~20&ndash;30 kcal/lb/day; kittens roughly double.
            Check your cat&rsquo;s specific food label for accurate calorie density and
            weigh monthly.
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter a valid cat weight.</p>
      )}
    </div>
  );
}
