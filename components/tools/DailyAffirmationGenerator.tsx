"use client";
import { useMemo, useState } from "react";

type Theme = "confidence" | "calm" | "productivity" | "growth";

const AFFIRMATIONS: Record<Theme, string[]> = {
  confidence: [
    "I trust my ability to figure things out.",
    "I belong in every room I walk into.",
    "My voice adds value to the conversation.",
    "I stand tall in what I believe.",
    "I am my own strongest advocate.",
    "I deserve the seat I&rsquo;ve earned.",
    "I am allowed to take up space.",
    "Every challenge I meet strengthens me.",
    "I speak clearly and with purpose.",
    "I am capable of more than I realize.",
    "My ideas are worth sharing.",
    "I lead with quiet confidence.",
  ],
  calm: [
    "I am safe in this moment.",
    "My breath anchors me when thoughts drift.",
    "I let go of what I cannot control.",
    "Stillness is a skill, and I&rsquo;m practicing it.",
    "Worry does not define my day.",
    "I soften where I&rsquo;ve been clenching.",
    "Peace is already inside me.",
    "I choose rest without guilt.",
    "Each exhale releases what no longer serves me.",
    "I meet the day with an open, quiet mind.",
    "Calm is my baseline, not a reward.",
    "I trust the pace of my own life.",
  ],
  productivity: [
    "I start before I feel ready.",
    "Small steps compound into big wins.",
    "My focus is a resource I protect.",
    "Done is better than perfect today.",
    "I finish what I start whenever possible.",
    "I work with the time I have.",
    "One task at a time is enough.",
    "I ship &mdash; I don&rsquo;t stall.",
    "Deep work is my competitive edge.",
    "I say no to noise and yes to progress.",
    "I show up for the work, not the mood.",
    "Consistency is my superpower.",
  ],
  growth: [
    "I am always a beginner at something new.",
    "Feedback is a gift I can use.",
    "Failure teaches me what success cannot.",
    "I outgrow old versions of myself on purpose.",
    "Progress is proof I&rsquo;m moving.",
    "I choose curiosity over certainty.",
    "Discomfort is where my growth lives.",
    "Every day compounds my skills.",
    "I welcome the lessons hidden in hard days.",
    "I am becoming who I want to be.",
    "My effort matters more than my talent.",
    "I stay teachable, always.",
  ],
};

export function DailyAffirmationGenerator() {
  const [theme, setTheme] = useState<Theme>("confidence");
  const [seed, setSeed] = useState(0);

  const chosen = useMemo(() => {
    const list = AFFIRMATIONS[theme];
    const idx = seed % list.length;
    return list[idx];
  }, [theme, seed]);

  function generate() {
    const list = AFFIRMATIONS[theme];
    let next = Math.floor(Math.random() * list.length);
    if (list[next % list.length] === chosen && list.length > 1) next = (next + 1) % list.length;
    setSeed(next);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Theme</span>
          <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
            <option value="confidence">Confidence</option>
            <option value="calm">Calm</option>
            <option value="productivity">Productivity</option>
            <option value="growth">Growth</option>
          </select>
        </label>
        <div className="flex items-end">
          <button onClick={generate}
            className="w-full rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800">
            Generate
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-6 text-center">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Today&rsquo;s affirmation</div>
        <div className="text-lg md:text-xl font-semibold text-slate-800 mt-2" dangerouslySetInnerHTML={{ __html: chosen }} />
      </div>

      <div className="text-xs text-slate-500 text-center">
        {AFFIRMATIONS.confidence.length + AFFIRMATIONS.calm.length + AFFIRMATIONS.productivity.length + AFFIRMATIONS.growth.length} affirmations in library &mdash; no network, no tracking.
      </div>
    </div>
  );
}
