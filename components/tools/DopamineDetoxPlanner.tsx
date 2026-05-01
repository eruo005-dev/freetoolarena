"use client";

import { useMemo, useState } from "react";

type Length = "weekend" | "week" | "month";
type Strict = "minimal" | "moderate" | "strict";

const RULES: Record<Strict, { allow: string[]; block: string[] }> = {
  minimal: {
    allow: ["Workouts", "Reading", "Long walks", "In-person hangs", "Cooking", "Calls with friends/family", "Music while working out"],
    block: ["Social media", "Short-form video (TikTok/Reels/Shorts)", "Gambling apps", "Dating apps"],
  },
  moderate: {
    allow: ["Workouts", "Reading paper books", "Walks (no podcast)", "In-person hangs", "Cooking", "Calls"],
    block: ["All social media", "Short-form video", "Streaming (Netflix/HBO/etc.)", "Recreational shopping", "Gaming", "Music in the car"],
  },
  strict: {
    allow: ["Workouts", "Reading paper books", "Silent walks", "In-person hangs only", "Cooking", "Sleep"],
    block: ["All screens beyond essentials (work email, navigation)", "All entertainment audio", "Gaming", "All shopping", "Caffeine"],
  },
};

export function DopamineDetoxPlanner() {
  const [length, setLength] = useState<Length>("weekend");
  const [strict, setStrict] = useState<Strict>("moderate");

  const days = length === "weekend" ? 2 : length === "week" ? 7 : 30;
  const rules = RULES[strict];

  const checklist = useMemo(() => {
    return [
      `Tell 1-2 close people you're doing this so they don't expect texts.`,
      `Set work email to a strict allowed list; auto-respond to anything else.`,
      `Delete or hide social media apps from your phone home screen.`,
      `Plan ${days * 2}+ activities from the allow list — boredom is the test.`,
      `Stash a paper notebook for any urge to "just check" something.`,
      `Pre-cook 2-3 meals so meal-decision fatigue doesn't trigger doomscrolling.`,
      `Write down what you'll feel relieved about on the other side.`,
    ];
  }, [days]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Detox length</span>
          <select value={length} onChange={(e) => setLength(e.target.value as Length)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="weekend">Weekend (2 days)</option>
            <option value="week">One week (7 days)</option>
            <option value="month">One month (30 days)</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Strictness</span>
          <select value={strict} onChange={(e) => setStrict(e.target.value as Strict)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="minimal">Minimal (just kill social media)</option>
            <option value="moderate">Moderate (most entertainment off)</option>
            <option value="strict">Strict (hard mode)</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <h4 className="mb-2 text-sm font-semibold text-emerald-900">Allowed</h4>
          <ul className="list-disc space-y-1 pl-5 text-sm text-emerald-900">
            {rules.allow.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
          <h4 className="mb-2 text-sm font-semibold text-rose-900">Blocked</h4>
          <ul className="list-disc space-y-1 pl-5 text-sm text-rose-900">
            {rules.block.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">Pre-detox checklist</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {checklist.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        <strong>Reality check:</strong> the term &ldquo;dopamine detox&rdquo; is medically inaccurate &mdash; you don&rsquo;t
        deplete dopamine and refill it. The intervention works because it removes high-frequency reward stimuli that crowd out
        slower rewards (exercise, reading, conversation). Three days is enough to feel a baseline reset.
      </div>
    </div>
  );
}
