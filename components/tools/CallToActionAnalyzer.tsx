"use client";
import { useMemo, useState } from "react";

export function CallToActionAnalyzer() {
  const [cta, setCta] = useState("Start your free trial today");

  const result = useMemo(() => analyze(cta), [cta]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">CTA text</span>
        <input
          value={cta}
          onChange={(e) => setCta(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Words" value={String(result.words)} hint={result.lengthNote} />
        <Stat label="Action verb" value={result.verb ? result.verb : "None"} />
        <Stat label="Urgency" value={result.urgency ? "Yes" : "No"} />
        <Stat label="Clarity score" value={`${result.score}/100`} />
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Recommendations</div>
        <ul className="text-sm mt-1 list-disc pl-5 space-y-1">
          {result.tips.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">{label}</div>
      <div className="text-lg font-semibold text-slate-800">{value}</div>
      {hint && <div className="text-[11px] text-slate-500 mt-0.5">{hint}</div>}
    </div>
  );
}

type Result = {
  words: number;
  verb: string | null;
  urgency: boolean;
  score: number;
  lengthNote: string;
  tips: string[];
};

function analyze(s: string): Result {
  const trimmed = s.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const lower = trimmed.toLowerCase();

  const verbs = ["buy", "start", "get", "try", "join", "sign up", "learn", "download", "shop", "order", "book", "claim"];
  let verb: string | null = null;
  for (const v of verbs) {
    if (lower.startsWith(v + " ") || lower === v || lower.includes(" " + v + " ")) { verb = v; break; }
  }

  const urgencyWords = ["now", "today", "instantly", "immediately", "limited", "hurry"];
  const urgency = urgencyWords.some((w) => lower.includes(w));

  let score = 0;
  if (words >= 2 && words <= 5) score += 40;
  else if (words === 1 || words === 6) score += 25;
  else score += 10;
  if (verb) score += 30;
  if (urgency) score += 15;
  if (trimmed.length > 0 && trimmed.length <= 30) score += 15;
  score = Math.min(100, score);

  const tips: string[] = [];
  if (words < 2) tips.push("Add more context &mdash; 2-5 words works best.");
  if (words > 5) tips.push("Trim it down to 5 words or fewer.");
  if (!verb) tips.push("Start with an action verb (Start, Get, Try, Join).");
  if (!urgency) tips.push("Consider urgency cues like &ldquo;now&rdquo; or &ldquo;today&rdquo;.");
  if (tips.length === 0) tips.push("Strong CTA &mdash; ship it.");

  let lengthNote = "ideal 2-5";
  if (words < 2) lengthNote = "too short";
  else if (words > 5) lengthNote = "too long";

  return { words, verb, urgency, score, lengthNote, tips };
}
