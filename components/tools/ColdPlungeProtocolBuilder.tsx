"use client";

import { useMemo, useState } from "react";

type Goal = "recovery" | "metabolic" | "mental" | "performance";
type Level = "beginner" | "intermediate" | "advanced";

export function ColdPlungeProtocolBuilder() {
  const [goal, setGoal] = useState<Goal>("recovery");
  const [level, setLevel] = useState<Level>("beginner");

  const protocol = useMemo(() => {
    const tempF = level === "beginner" ? "55-60°F" : level === "intermediate" ? "50-55°F" : "45-50°F";
    let durationSec = level === "beginner" ? 60 : level === "intermediate" ? 120 : 180;
    if (goal === "metabolic") durationSec = Math.max(120, durationSec);
    if (goal === "mental") durationSec = Math.min(180, durationSec);
    const sessionsPerWeek = goal === "performance" ? "1-2 (don't blunt strength gains)" : goal === "recovery" ? "3-4" : "2-3";
    const timing = goal === "performance" ? "After cardio sessions, NEVER within 4h of strength training" : goal === "metabolic" ? "Morning, fasted preferred" : "Anytime";
    return { tempF, durationSec, sessionsPerWeek, timing };
  }, [goal, level]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Goal</span>
          <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="recovery">Recovery (post-workout)</option>
            <option value="metabolic">Metabolic / brown fat</option>
            <option value="mental">Mental resilience / dopamine</option>
            <option value="performance">Performance (strength athlete)</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Experience level</span>
          <select value={level} onChange={(e) => setLevel(e.target.value as Level)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="beginner">Beginner (under 4 weeks)</option>
            <option value="intermediate">Intermediate (4-12 weeks)</option>
            <option value="advanced">Advanced (3+ months consistent)</option>
          </select>
        </label>
      </div>

      <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-5">
        <h4 className="mb-3 text-sm font-semibold text-emerald-900">Your protocol</h4>
        <ul className="space-y-1 text-sm text-emerald-900">
          <li><strong>Temperature:</strong> {protocol.tempF}</li>
          <li><strong>Duration per session:</strong> {protocol.durationSec} seconds</li>
          <li><strong>Frequency:</strong> {protocol.sessionsPerWeek} sessions per week</li>
          <li><strong>Timing:</strong> {protocol.timing}</li>
          <li><strong>Total weekly time:</strong> ~{Math.round((protocol.durationSec * (typeof protocol.sessionsPerWeek === "string" ? 3 : protocol.sessionsPerWeek)) / 60)} minutes</li>
        </ul>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">Safety + execution notes</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>Slow controlled breathing &mdash; 4 sec inhale, 6 sec exhale.</li>
          <li>Step out the moment you start shivering uncontrollably.</li>
          <li>Never alone. Have a phone within reach.</li>
          <li>Rewarm passively (shower, blanket). Avoid extreme heat right after.</li>
          <li>Skip if you have heart conditions, are pregnant, or are intoxicated.</li>
          <li>For performance athletes: cold plunges within 4h of strength training blunt protein synthesis. Schedule on rest days or after cardio only.</li>
        </ul>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        <strong>Reality check:</strong> the metabolic / brown-fat benefits are smaller than influencer marketing suggests &mdash;
        a few hundred extra calories per week, not a miracle. The mental + recovery benefits are real and well-documented. Don&rsquo;t
        rely on cold plunges as a weight-loss strategy.
      </div>
    </div>
  );
}
