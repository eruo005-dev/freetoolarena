"use client";

import { useMemo, useState } from "react";

type Issue = { label: string; weight: number; tip: string };

function evaluate(text: string): { score: number; issues: Issue[]; wins: string[] } {
  const t = text.trim();
  const lower = t.toLowerCase();
  const words = t.split(/\s+/).filter(Boolean);
  const sentences = t.split(/[.!?]+\s+/).filter(Boolean);
  const issues: Issue[] = [];
  const wins: string[] = [];
  let score = 100;

  if (t.length === 0) return { score: 0, issues: [], wins: [] };

  if (words.length < 20) {
    issues.push({
      label: "Too short",
      weight: 25,
      tip: "Aim for 60-150 words. Right now there's nothing for someone to react to or open with.",
    });
    score -= 25;
  } else if (words.length > 220) {
    issues.push({
      label: "Too long",
      weight: 12,
      tip: "Trim to 150 words max. Long bios read as resumes, not invitations.",
    });
    score -= 12;
  } else if (words.length >= 60 && words.length <= 150) {
    wins.push("Good length (60-150 words)");
  }

  const cliches = [
    "fluent in sarcasm",
    "partner in crime",
    "live laugh love",
    "love to laugh",
    "looking for someone",
    "down to earth",
    "love to travel",
    "the office",
    "ask me anything",
    "ask me about",
    "fluent in movie quotes",
    "i don't bite",
    "good vibes only",
  ];
  const hits = cliches.filter((c) => lower.includes(c));
  if (hits.length > 0) {
    issues.push({
      label: `Cliche phrases (${hits.length})`,
      weight: 8 * Math.min(hits.length, 3),
      tip: `Replace generic lines like "${hits[0]}" with one specific story or detail. Specificity is what gets opened.`,
    });
    score -= 8 * Math.min(hits.length, 3);
  } else {
    wins.push("No major cliches detected");
  }

  const askWords = ["dm me", "message me", "ask me", "swipe right if", "swipe left if"];
  const hasHook = askWords.some((w) => lower.includes(w)) || /\?/.test(t);
  if (!hasHook) {
    issues.push({
      label: "No conversation hook",
      weight: 10,
      tip: 'End with a question or invite ("argue with me about pineapple pizza"). Gives people an opening line.',
    });
    score -= 10;
  } else {
    wins.push("Includes a conversation hook");
  }

  const concreteHints = [
    /\b\d+\s*(years?|yrs?|months?)\b/,
    /\b(at|in)\s+[A-Z][a-z]+/, // proper noun place
    /\b(book|movie|show|album|game|podcast)s?\b/,
    /\b(ramen|pasta|coffee|sushi|pizza|tacos?)\b/,
    /\b(climbing|running|hiking|surfing|painting|cooking|brewing|fishing)\b/,
  ];
  const concreteHits = concreteHints.filter((re) => re.test(lower)).length;
  if (concreteHits >= 2) {
    wins.push("Specific hooks present (places, hobbies, or items)");
  } else {
    issues.push({
      label: "Too generic",
      weight: 14,
      tip: "Add 2-3 specific hooks: a city, a hobby, a food, a book. Vague enthusiasm doesn't convert.",
    });
    score -= 14;
  }

  const negatives = ["no drama", "don't message me if", "if you can't", "tired of", "hate when"];
  const negHits = negatives.filter((n) => lower.includes(n));
  if (negHits.length > 0) {
    issues.push({
      label: "Negative framing",
      weight: 10,
      tip: "Lead with what you want, not what you don't. Negative bios filter you out faster than they filter others.",
    });
    score -= 10;
  } else {
    wins.push("Positive framing");
  }

  const exclamations = (t.match(/!/g) || []).length;
  if (exclamations > 4) {
    issues.push({
      label: "Too many exclamation marks",
      weight: 6,
      tip: "Cap at 1-2 exclamations. More reads as performative.",
    });
    score -= 6;
  }

  const emoji = (t.match(/[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{2600}-\u{26FF}]/gu) || []).length;
  if (emoji > 8) {
    issues.push({
      label: "Emoji overload",
      weight: 5,
      tip: "Keep it to 2-4 emojis max. Past that they replace personality, not add to it.",
    });
    score -= 5;
  }

  if (sentences.length === 1 && words.length > 40) {
    issues.push({
      label: "Wall of text",
      weight: 8,
      tip: "Break into 2-4 short sentences or lines. Walls of text read as effortful, not casual.",
    });
    score -= 8;
  }

  return {
    score: Math.max(0, score),
    issues,
    wins,
  };
}

export function DatingAppBioRater() {
  const [bio, setBio] = useState<string>("");
  const result = useMemo(() => evaluate(bio), [bio]);

  const verdict =
    result.score >= 80
      ? { label: "Strong", color: "border-emerald-300 bg-emerald-50 text-emerald-900" }
      : result.score >= 60
        ? { label: "Decent — fixable", color: "border-amber-300 bg-amber-50 text-amber-900" }
        : { label: "Needs work", color: "border-rose-300 bg-rose-50 text-rose-900" };

  const wordCount = bio.trim() ? bio.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">Paste your bio</span>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={6}
          placeholder="Hinge / Bumble / Tinder / Feeld / Raya — paste the whole thing. We score it on length, hooks, cliches, framing, and specificity."
          className="w-full rounded border border-slate-300 px-3 py-2 font-sans text-sm"
        />
      </label>

      {bio.trim().length > 0 && (
        <>
          <div className={`rounded-lg border p-4 ${verdict.color}`}>
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-xs uppercase tracking-wide opacity-70">Score</div>
                <div className="text-3xl font-bold">{result.score}/100</div>
              </div>
              <div className="text-sm font-semibold">{verdict.label}</div>
            </div>
            <div className="mt-1 text-xs opacity-80">
              {wordCount} word{wordCount === 1 ? "" : "s"} &middot; sweet spot: 60&ndash;150
            </div>
          </div>

          {result.issues.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h4 className="mb-2 text-sm font-semibold text-slate-700">What to fix</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                {result.issues.map((i) => (
                  <li key={i.label} className="border-l-2 border-rose-300 pl-3">
                    <div className="font-medium text-slate-800">
                      {i.label} <span className="text-xs font-normal text-slate-500">(-{i.weight})</span>
                    </div>
                    <div className="text-xs text-slate-600">{i.tip}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.wins.length > 0 && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <h4 className="mb-2 text-sm font-semibold text-emerald-900">What&rsquo;s working</h4>
              <ul className="list-disc space-y-1 pl-5 text-sm text-emerald-900">
                {result.wins.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            <strong className="text-slate-800">Note:</strong> the rubric is calibrated against
            common dating-coach feedback patterns &mdash; specificity over enthusiasm, hooks over
            statements, length in the 60&ndash;150 word zone. It&rsquo;s a pass on your draft, not
            a verdict on you.
          </div>
        </>
      )}
    </div>
  );
}
