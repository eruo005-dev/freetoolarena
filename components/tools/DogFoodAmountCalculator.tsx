"use client";

import { useMemo, useState } from "react";

type AgeGroup = "puppyYoung" | "puppyOlder" | "adult" | "senior";
type Activity = "low" | "moderate" | "high";
type Body = "under" | "ideal" | "over";

export function DogFoodAmountCalculator() {
  const [weightLbs, setWeightLbs] = useState("40");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("adult");
  const [activity, setActivity] = useState<Activity>("moderate");
  const [body, setBody] = useState<Body>("ideal");
  const [kcalPerCup, setKcalPerCup] = useState("400");

  const result = useMemo(() => {
    const lbs = Number(weightLbs);
    const kcalCup = Number(kcalPerCup);
    if (!Number.isFinite(lbs) || lbs <= 0) return null;
    if (!Number.isFinite(kcalCup) || kcalCup <= 0) return null;

    const kg = lbs / 2.20462;
    const rer = 70 * Math.pow(kg, 0.75);

    // Base multiplier
    let multiplier = 1.8;
    if (body === "over") multiplier = 1.0;
    else if (ageGroup === "puppyYoung") multiplier = 3.0;
    else if (ageGroup === "puppyOlder") multiplier = 2.0;
    else if (ageGroup === "senior") multiplier = 1.4;
    else if (ageGroup === "adult") {
      if (activity === "low") multiplier = 1.6;
      else if (activity === "moderate") multiplier = 1.8;
      else multiplier = 3.0;
    }

    // Underweight gets a small bump
    if (body === "under" && ageGroup !== "puppyYoung" && ageGroup !== "puppyOlder") {
      multiplier *= 1.15;
    }

    const dailyKcal = rer * multiplier;
    const cups = dailyKcal / kcalCup;
    const cupsLow = dailyKcal / (kcalCup * 1.15);
    const cupsHigh = dailyKcal / (kcalCup * 0.85);

    // Meals per day
    let meals = 2;
    if (ageGroup === "puppyYoung") meals = 4;
    else if (ageGroup === "puppyOlder") meals = 3;

    return {
      rer: Math.round(rer),
      dailyKcal: Math.round(dailyKcal),
      cups: Math.round(cups * 10) / 10,
      cupsLow: Math.round(cupsLow * 10) / 10,
      cupsHigh: Math.round(cupsHigh * 10) / 10,
      perMeal: Math.round((cups / meals) * 100) / 100,
      meals,
    };
  }, [weightLbs, ageGroup, activity, body, kcalPerCup]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Dog weight (lbs)</span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={weightLbs}
            onChange={(e) => setWeightLbs(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Age / life stage</span>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="puppyYoung">Puppy (under 4 months)</option>
            <option value="puppyOlder">Puppy (4 months&ndash;1 year)</option>
            <option value="adult">Adult (1&ndash;7 years)</option>
            <option value="senior">Senior (7+ years)</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Activity level</span>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as Activity)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="low">Low / neutered couch dog</option>
            <option value="moderate">Moderate / daily walks</option>
            <option value="high">High / working or sport dog</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Body condition</span>
          <select
            value={body}
            onChange={(e) => setBody(e.target.value as Body)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="under">Underweight</option>
            <option value="ideal">Ideal</option>
            <option value="over">Overweight (weight loss)</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm sm:col-span-2">
          <span className="font-medium">Kcal per cup of your kibble</span>
          <input
            type="number"
            min={0}
            step={10}
            value={kcalPerCup}
            onChange={(e) => setKcalPerCup(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          <span className="text-xs text-slate-500">
            Check your bag&rsquo;s label &mdash; most dry kibble ranges 340&ndash;450 kcal/cup.
          </span>
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
            <div className="text-xs text-slate-500">
              Resting energy (RER): {result.rer} kcal &mdash; full requirement shown above.
            </div>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-md bg-white p-3 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Cups of kibble / day
              </div>
              <div className="text-lg font-semibold">
                {result.cups} cups
              </div>
              <div className="text-xs text-slate-500">
                Range: {result.cupsLow}&ndash;{result.cupsHigh} cups depending on density.
              </div>
            </div>
            <div className="rounded-md bg-white p-3 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Meals per day
              </div>
              <div className="text-lg font-semibold">
                {result.meals} meals &times; ~{result.perMeal} cups
              </div>
              <div className="text-xs text-slate-500">
                Split evenly. Puppies need more frequent, smaller meals.
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Always check your specific kibble&rsquo;s calorie density &mdash; numbers vary
            by 20%+ brand to brand. Weigh your dog monthly and adjust if body condition
            drifts.
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter a valid weight and kibble density.</p>
      )}
    </div>
  );
}
