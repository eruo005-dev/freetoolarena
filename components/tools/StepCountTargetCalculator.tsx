"use client";

import { useMemo, useState } from "react";

type Goal = "longevity" | "weight_loss" | "general" | "athlete";
type Activity = "sedentary" | "lightly_active" | "moderate" | "active";

export function StepCountTargetCalculator() {
  const [age, setAge] = useState<number>(35);
  const [goal, setGoal] = useState<Goal>("longevity");
  const [activity, setActivity] = useState<Activity>("moderate");

  const result = useMemo(() => {
    let target = 7000;
    if (goal === "longevity") target = age >= 60 ? 6000 : age >= 50 ? 7500 : 8000;
    else if (goal === "weight_loss") target = 10000;
    else if (goal === "athlete") target = 12000;
    else target = 8000;
    if (activity === "sedentary") target -= 1500;
    if (activity === "active") target += 1500;
    target = Math.max(3000, Math.min(15000, target));

    const milesEquiv = (target * 0.0005).toFixed(1);
    const minActive = Math.round(target / 100);

    return { target, milesEquiv, minActive };
  }, [age, goal, activity]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Age</span>
          <input type="number" min={18} max={100} value={age} onChange={(e) => setAge(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Primary goal</span>
          <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="longevity">Longevity / health</option>
            <option value="weight_loss">Weight loss</option>
            <option value="general">General fitness</option>
            <option value="athlete">Athletic training base</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Activity level</span>
          <select value={activity} onChange={(e) => setActivity(e.target.value as Activity)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="sedentary">Sedentary (desk job, no workouts)</option>
            <option value="lightly_active">Lightly active</option>
            <option value="moderate">Moderate (3-5 workouts/wk)</option>
            <option value="active">Active (6+ workouts/wk)</option>
          </select>
        </label>
      </div>

      <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-5">
        <div className="text-xs uppercase tracking-wide text-emerald-700">Daily step target</div>
        <div className="text-3xl font-bold text-emerald-900">{result.target.toLocaleString()} steps</div>
        <div className="mt-1 text-sm text-emerald-800">
          ~{result.milesEquiv} miles &middot; ~{result.minActive} active minutes
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <h4 className="mb-2 font-semibold">The 10,000-step myth</h4>
        <p>
          The 10,000 number came from a 1965 Japanese pedometer marketing campaign, not from research. Modern data:
          all-cause mortality reduction starts plateauing around 7,500 for most adults. For those over 60, benefits plateau
          even earlier (~6,000). The honest answer: more is better than less up to ~8,000-10,000, then diminishing returns
          unless you have a specific weight or athletic goal.
        </p>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Cadence matters too:</strong> at least 2,000-3,000 of those steps should be at a brisk pace (100+ steps/min).
        Brisk-walk minutes correlate more strongly with health outcomes than total step count.
      </div>
    </div>
  );
}
