"use client";

import { useMemo, useState } from "react";

type AgeGroup = "under2" | "2to5" | "6to12" | "teen";

const AGE_LABELS: Record<AgeGroup, string> = {
  under2: "Under 2 years",
  "2to5": "2 to 5 years",
  "6to12": "6 to 12 years",
  teen: "Teen (13+)",
};

const TARGET_MIN: Record<AgeGroup, number> = {
  under2: 0,
  "2to5": 60,
  "6to12": 120,
  teen: 150,
};

const TIPS: Record<AgeGroup, string[]> = {
  under2: [
    "Skip screens except video chats with family.",
    "Talk, sing, and read together instead.",
    "Use tummy time and floor play to build motor skills.",
  ],
  "2to5": [
    "Cap high-quality content at 1 hour per day.",
    "Watch with your child and discuss what you see.",
    "Avoid screens during meals and the hour before bed.",
  ],
  "6to12": [
    "Set consistent daily limits and stick to them.",
    "Keep screens out of bedrooms and off at dinner.",
    "Balance with outdoor play, reading, and hobbies.",
  ],
  teen: [
    "Protect 8 to 10 hours of sleep &mdash; no phones at night.",
    "Talk openly about social media, privacy, and mood.",
    "Encourage in-person friendships and physical activity.",
  ],
};

const SWAP_ACTIVITIES = [
  "Play a board game",
  "Go outside for 30 minutes",
  "Read a book together",
  "Kick a ball or shoot hoops",
  "Build with blocks or LEGO",
  "Cook or bake something simple",
];

function tierOf(actual: number, target: number): {
  label: string;
  color: string;
} {
  if (target === 0) {
    if (actual === 0) return { label: "Excellent", color: "text-emerald-600" };
    if (actual <= 15) return { label: "OK", color: "text-amber-600" };
    if (actual <= 45) return { label: "Concerning", color: "text-orange-600" };
    return { label: "High", color: "text-red-600" };
  }
  if (actual <= target) return { label: "Excellent", color: "text-emerald-600" };
  if (actual <= target * 1.5) return { label: "OK", color: "text-amber-600" };
  if (actual <= target * 2.5) return { label: "Concerning", color: "text-orange-600" };
  return { label: "High", color: "text-red-600" };
}

export function ChildScreenTimeTracker() {
  const [age, setAge] = useState<AgeGroup>("2to5");
  const [minutes, setMinutes] = useState<string>("90");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const result = useMemo(() => {
    const actual = Number(minutes);
    if (!Number.isFinite(actual) || actual < 0) return null;
    const target = TARGET_MIN[age];
    const gap = actual - target;
    const t = tierOf(actual, target);
    return { actual, target, gap, tier: t.label, color: t.color };
  }, [age, minutes]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Child&rsquo;s age</span>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value as AgeGroup)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {(Object.keys(AGE_LABELS) as AgeGroup[]).map((k) => (
              <option key={k} value={k}>
                {AGE_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Daily screen time (minutes)</span>
          <input
            type="number"
            min={0}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
      </div>

      {result && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Tier</div>
              <div className={`text-2xl font-bold ${result.color}`}>{result.tier}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">AAP target</div>
              <div className="text-lg font-semibold text-slate-800">
                {result.target === 0 ? "No screens" : `${result.target} min/day`}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Gap to target</div>
              <div className="text-lg font-semibold text-slate-800">
                {result.gap <= 0 ? "On target" : `+${result.gap} min over`}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-slate-200 p-4">
        <h3 className="mb-2 font-semibold text-slate-800">Tips for {AGE_LABELS[age]}</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {TIPS[age].map((tip, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: tip }} />
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-slate-200 p-4">
        <h3 className="mb-2 font-semibold text-slate-800">Swap-activity checklist</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {SWAP_ACTIVITIES.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={!!checked[a]}
                onChange={(e) => setChecked({ ...checked, [a]: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand/30"
              />
              <span>{a}</span>
            </label>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Guidance based on American Academy of Pediatrics media use recommendations. Quality of content
        and co-viewing matter more than raw minutes.
      </p>
    </div>
  );
}
