"use client";

import { useMemo, useState } from "react";

type Goal = "muscle" | "toning" | "mobility" | "rehab" | "fatloss";
type Level = "beginner" | "intermediate" | "advanced";
type Days = 3 | 4 | 5;
type Length = 20 | 30 | 45 | 60;
type Part = "push" | "pull" | "legs" | "core" | "mobility";

type Exercise = {
  name: string;
  part: Part;
  band: string;
  difficulty: 1 | 2 | 3;
};

const LIBRARY: Exercise[] = [
  { name: "Band chest press", part: "push", band: "medium", difficulty: 2 },
  { name: "Band push-up (anchored)", part: "push", band: "light", difficulty: 2 },
  { name: "Band overhead press", part: "push", band: "medium", difficulty: 2 },
  { name: "Band lateral raise", part: "push", band: "light", difficulty: 1 },
  { name: "Band triceps pushdown", part: "push", band: "medium", difficulty: 1 },
  { name: "Band chest fly", part: "push", band: "medium", difficulty: 2 },
  { name: "Band front raise", part: "push", band: "light", difficulty: 1 },
  { name: "Band bent-over row", part: "pull", band: "heavy", difficulty: 2 },
  { name: "Band seated row", part: "pull", band: "medium", difficulty: 2 },
  { name: "Band lat pulldown", part: "pull", band: "heavy", difficulty: 2 },
  { name: "Band face pull", part: "pull", band: "light", difficulty: 1 },
  { name: "Band bicep curl", part: "pull", band: "medium", difficulty: 1 },
  { name: "Band reverse fly", part: "pull", band: "light", difficulty: 1 },
  { name: "Band pull-apart", part: "pull", band: "light", difficulty: 1 },
  { name: "Band squat", part: "legs", band: "heavy", difficulty: 2 },
  { name: "Band deadlift", part: "legs", band: "heavy", difficulty: 2 },
  { name: "Band lateral walk", part: "legs", band: "light loop", difficulty: 1 },
  { name: "Band glute bridge", part: "legs", band: "medium loop", difficulty: 1 },
  { name: "Band leg curl", part: "legs", band: "medium", difficulty: 2 },
  { name: "Band kickback", part: "legs", band: "light loop", difficulty: 1 },
  { name: "Band clamshell", part: "legs", band: "light loop", difficulty: 1 },
  { name: "Band split squat", part: "legs", band: "medium", difficulty: 3 },
  { name: "Band Pallof press", part: "core", band: "medium", difficulty: 2 },
  { name: "Band woodchop", part: "core", band: "medium", difficulty: 2 },
  { name: "Band dead bug", part: "core", band: "light", difficulty: 1 },
  { name: "Band russian twist", part: "core", band: "light", difficulty: 2 },
  { name: "Band shoulder dislocate", part: "mobility", band: "light", difficulty: 1 },
  { name: "Band hip opener", part: "mobility", band: "light loop", difficulty: 1 },
  { name: "Band hamstring stretch", part: "mobility", band: "light", difficulty: 1 },
  { name: "Band thoracic rotation", part: "mobility", band: "light", difficulty: 1 },
  { name: "Band ankle dorsiflexion", part: "mobility", band: "light loop", difficulty: 1 },
];

const GOAL_SETS: Record<Goal, { sets: number; reps: string; rest: string }> = {
  muscle: { sets: 4, reps: "8-12", rest: "60-90s" },
  toning: { sets: 3, reps: "12-15", rest: "45s" },
  mobility: { sets: 2, reps: "10 slow", rest: "30s" },
  rehab: { sets: 3, reps: "10-15 controlled", rest: "30-45s" },
  fatloss: { sets: 3, reps: "15-20 circuit", rest: "20-30s" },
};

function dayTemplate(goal: Goal, days: Days): Array<{ name: string; focus: Part[] }> {
  if (goal === "mobility" || goal === "rehab") {
    const base: Array<{ name: string; focus: Part[] }> = [
      { name: "Day 1 &ndash; Lower mobility", focus: ["mobility", "legs", "core"] },
      { name: "Day 2 &ndash; Upper mobility", focus: ["mobility", "pull", "push"] },
      { name: "Day 3 &ndash; Full-body flow", focus: ["mobility", "core", "legs"] },
    ];
    if (days >= 4) base.push({ name: "Day 4 &ndash; Active recovery", focus: ["mobility", "core"] });
    if (days >= 5) base.push({ name: "Day 5 &ndash; Stability", focus: ["core", "mobility", "legs"] });
    return base;
  }
  if (days === 3) {
    return [
      { name: "Day 1 &ndash; Full-body A", focus: ["push", "legs", "core"] },
      { name: "Day 2 &ndash; Full-body B", focus: ["pull", "legs", "core"] },
      { name: "Day 3 &ndash; Full-body C", focus: ["push", "pull", "core"] },
    ];
  }
  if (days === 4) {
    return [
      { name: "Day 1 &ndash; Upper push", focus: ["push", "core"] },
      { name: "Day 2 &ndash; Lower", focus: ["legs", "core"] },
      { name: "Day 3 &ndash; Upper pull", focus: ["pull", "core"] },
      { name: "Day 4 &ndash; Lower + mobility", focus: ["legs", "mobility"] },
    ];
  }
  return [
    { name: "Day 1 &ndash; Push", focus: ["push", "core"] },
    { name: "Day 2 &ndash; Pull", focus: ["pull", "core"] },
    { name: "Day 3 &ndash; Legs", focus: ["legs", "core"] },
    { name: "Day 4 &ndash; Upper accessory", focus: ["push", "pull"] },
    { name: "Day 5 &ndash; Lower + mobility", focus: ["legs", "mobility"] },
  ];
}

export function ResistanceBandWorkoutPlanner() {
  const [goal, setGoal] = useState<Goal>("muscle");
  const [days, setDays] = useState<Days>(4);
  const [length, setLength] = useState<Length>(45);
  const [level, setLevel] = useState<Level>("intermediate");

  const plan = useMemo(() => {
    const perDay = Math.max(3, Math.round(length / 8));
    const maxDiff: 1 | 2 | 3 = level === "beginner" ? 2 : level === "intermediate" ? 3 : 3;
    const template = dayTemplate(goal, days);
    const prescription = GOAL_SETS[goal];

    return template.map((day) => {
      const pool = LIBRARY.filter(
        (e) => day.focus.includes(e.part) && e.difficulty <= maxDiff,
      );
      const chosen: Exercise[] = [];
      const buckets = [...day.focus];
      for (let i = 0; i < perDay; i++) {
        const part = buckets[i % buckets.length];
        const candidates = pool.filter((e) => e.part === part && !chosen.includes(e));
        if (candidates.length > 0) chosen.push(candidates[i % candidates.length]);
      }
      while (chosen.length < perDay) {
        const extra = pool.find((e) => !chosen.includes(e));
        if (!extra) break;
        chosen.push(extra);
      }
      return { ...day, exercises: chosen, prescription };
    });
  }, [goal, days, length, level]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Goal</span>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            <option value="muscle">Muscle building</option>
            <option value="toning">Toning</option>
            <option value="mobility">Mobility</option>
            <option value="rehab">Rehab</option>
            <option value="fatloss">Fat loss</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Days / week</span>
          <select
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value, 10) as Days)}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Session length (min)</span>
          <select
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10) as Length)}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={45}>45</option>
            <option value={60}>60</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Level</span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as Level)}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {plan.map((day) => (
          <div key={day.name} className="rounded-lg border border-slate-200 bg-white p-4">
            <h4
              className="mb-2 text-sm font-semibold text-brand"
              dangerouslySetInnerHTML={{ __html: day.name }}
            />
            <div className="mb-2 text-xs text-slate-500">
              {day.prescription.sets} sets &times; {day.prescription.reps} &mdash; rest{" "}
              {day.prescription.rest}
            </div>
            <ol className="space-y-1 text-sm text-slate-700">
              {day.exercises.map((ex, idx) => (
                <li key={ex.name} className="flex justify-between border-b border-slate-100 py-1">
                  <span>
                    {idx + 1}. {ex.name}
                  </span>
                  <span className="text-xs text-slate-500">{ex.band}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong className="text-slate-800">Progressive overload with bands:</strong> shorten the band
        anchor, stack two bands, slow the eccentric to 3&ndash;4s, or add a pause at peak contraction.
        Jump to a heavier band only when you can hit the top of the rep range with clean form on every
        set. Re-assess every 3&ndash;4 weeks.
      </div>
    </div>
  );
}
