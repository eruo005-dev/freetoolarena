"use client";

import { useMemo, useState } from "react";

type Goal = "longevity" | "recovery" | "social" | "sleep";
type Level = "beginner" | "intermediate" | "advanced";

export function SaunaProtocolCalculator() {
  const [goal, setGoal] = useState<Goal>("longevity");
  const [level, setLevel] = useState<Level>("beginner");
  const [tempF, setTempF] = useState<number>(170);

  const protocol = useMemo(() => {
    let durationMin = level === "beginner" ? 12 : level === "intermediate" ? 18 : 25;
    if (goal === "recovery") durationMin = Math.max(durationMin, 15);
    if (goal === "social") durationMin = Math.min(durationMin, 20);
    if (goal === "sleep") durationMin = Math.min(durationMin, 20);

    const sessionsPerWeek = goal === "longevity" ? "4-7 (the Finnish data is clearest at 4+/wk)" : goal === "recovery" ? "2-3 post-workout" : goal === "social" ? "1-2 with friends" : "2-3 timed 1-2h before bed";
    const rounds = level === "beginner" ? 1 : level === "intermediate" ? 2 : 3;
    const coolDownMin = 5;
    const totalMin = (durationMin + coolDownMin) * rounds;

    return { durationMin, sessionsPerWeek, rounds, totalMin };
  }, [goal, level]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Goal</span>
          <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="longevity">Longevity / cardio</option>
            <option value="recovery">Recovery</option>
            <option value="social">Social hang</option>
            <option value="sleep">Sleep prep</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Experience</span>
          <select value={level} onChange={(e) => setLevel(e.target.value as Level)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Sauna temp (°F)</span>
          <input type="number" min={140} max={200} value={tempF} onChange={(e) => setTempF(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-5">
        <h4 className="mb-3 text-sm font-semibold text-emerald-900">Your protocol</h4>
        <ul className="space-y-1 text-sm text-emerald-900">
          <li><strong>Round duration:</strong> {protocol.durationMin} min @ {tempF}°F</li>
          <li><strong>Rounds:</strong> {protocol.rounds} (with 5-min cool-down between)</li>
          <li><strong>Total session time:</strong> ~{protocol.totalMin} min</li>
          <li><strong>Frequency:</strong> {protocol.sessionsPerWeek}</li>
        </ul>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">Execution + safety</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>Hydrate before — 16-24 oz water 30 min ahead. Replace electrolytes after.</li>
          <li>Step out at the FIRST signs of dizziness or nausea. Don&rsquo;t tough it out.</li>
          <li>Skip if pregnant, on heavy blood-pressure meds, or with heart conditions (talk to doctor).</li>
          <li>Cold contrast (60-90 sec cold shower or plunge) between rounds amplifies cardiovascular adaptation.</li>
          <li>Sleep goal: finish 90-120 min before bed; the post-sauna body-temp drop is what signals sleepiness.</li>
        </ul>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>The Finnish longevity data:</strong> 4-7 sessions/week of 19+ minutes at 175°F+ correlates with 40% reduction
        in all-cause mortality vs 1 session/week (KIHD study, 2,300+ middle-aged Finnish men). Causation isn&rsquo;t
        guaranteed but the association is unusually strong.
      </div>
    </div>
  );
}
