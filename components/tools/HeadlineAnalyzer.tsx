"use client";

import { useMemo, useState } from "react";

const EMOTIONAL = [
  "amazing", "incredible", "shocking", "urgent", "secret", "proven",
  "insane", "stunning", "unbelievable", "jaw-dropping", "heartbreaking",
  "miracle", "breathtaking", "essential", "critical",
];

const POWER = [
  "you", "new", "free", "now", "best", "how", "why", "top", "easy", "fast",
  "guide", "ultimate", "complete", "simple", "quick", "save", "boost",
];

const COMMON = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "of", "to", "for",
  "with", "as", "by", "at", "is", "are", "was", "were", "be", "been",
  "this", "that", "it",
]);

const QUESTION_WORDS = new Set(["who", "what", "when", "where", "why", "how", "which", "can", "should", "will", "does", "is"]);

const POSITIVE = new Set(["best", "great", "amazing", "love", "win", "boost", "save", "easy", "free", "ultimate", "proven", "new", "fast"]);
const NEGATIVE = new Set(["worst", "hate", "avoid", "never", "bad", "fail", "risk", "problem", "broken", "dangerous"]);

type Analysis = {
  score: number;
  wordCount: number;
  common: string[];
  uncommon: string[];
  emotional: string[];
  power: string[];
  startsWithNumber: boolean;
  hasQuestion: boolean;
  sentiment: "positive" | "negative" | "neutral";
  suggestions: string[];
  breakdown: { label: string; points: number; max: number }[];
};

export function HeadlineAnalyzer() {
  const [headline, setHeadline] = useState("7 Proven SEO Tips You Can Use Today for Free");

  const result = useMemo<Analysis>(() => {
    const words = headline
      .trim()
      .split(/\s+/)
      .map((w) => w.toLowerCase().replace(/[^\p{L}\p{N}'-]/gu, ""))
      .filter(Boolean);

    const wordCount = words.length;

    const common: string[] = [];
    const uncommon: string[] = [];
    const emotional: string[] = [];
    const power: string[] = [];

    for (const w of words) {
      if (EMOTIONAL.includes(w)) emotional.push(w);
      if (POWER.includes(w)) power.push(w);
      if (COMMON.has(w)) common.push(w);
      else uncommon.push(w);
    }

    const startsWithNumber = /^\d/.test(headline.trim());
    const firstWord = words[0] ?? "";
    const hasQuestion = QUESTION_WORDS.has(firstWord) || headline.trim().endsWith("?");

    let positiveHits = 0;
    let negativeHits = 0;
    for (const w of words) {
      if (POSITIVE.has(w)) positiveHits++;
      if (NEGATIVE.has(w)) negativeHits++;
    }
    const sentiment: Analysis["sentiment"] =
      positiveHits > negativeHits ? "positive" : negativeHits > positiveHits ? "negative" : "neutral";

    // Scoring
    let lengthPts = 0;
    if (wordCount >= 6 && wordCount <= 12) lengthPts = 25;
    else if (wordCount >= 4 && wordCount <= 14) lengthPts = 18;
    else if (wordCount > 0) lengthPts = 10;

    const balance =
      wordCount > 0
        ? Math.min(1, (emotional.length + power.length) / Math.max(2, wordCount / 3))
        : 0;
    const balancePts = Math.round(balance * 25);

    const emotionalPts = Math.min(15, emotional.length * 8);
    const powerPts = Math.min(15, power.length * 5);
    const numberPts = startsWithNumber ? 10 : 0;
    const questionPts = hasQuestion ? 5 : 0;
    const sentimentPts = sentiment === "positive" ? 5 : sentiment === "negative" ? 3 : 0;

    const score = Math.min(
      100,
      lengthPts + balancePts + emotionalPts + powerPts + numberPts + questionPts + sentimentPts,
    );

    const suggestions: string[] = [];
    if (wordCount < 6) suggestions.push("Add more detail — 6–12 words performs best.");
    if (wordCount > 12) suggestions.push("Trim it down — headlines over 12 words lose scanability.");
    if (emotional.length === 0) suggestions.push('Add an emotional word (e.g., "proven", "shocking").');
    if (power.length === 0) suggestions.push('Add a power word (e.g., "you", "free", "new").');
    if (!startsWithNumber && !hasQuestion)
      suggestions.push("Try leading with a number or a question.");
    if (sentiment === "neutral") suggestions.push("Inject a positive or negative tone for impact.");

    return {
      score,
      wordCount,
      common,
      uncommon,
      emotional,
      power,
      startsWithNumber,
      hasQuestion,
      sentiment,
      suggestions,
      breakdown: [
        { label: "Length (6–12 words)", points: lengthPts, max: 25 },
        { label: "Word balance", points: balancePts, max: 25 },
        { label: "Emotional words", points: emotionalPts, max: 15 },
        { label: "Power words", points: powerPts, max: 15 },
        { label: "Starts with number", points: numberPts, max: 10 },
        { label: "Question word", points: questionPts, max: 5 },
        { label: "Sentiment", points: sentimentPts, max: 5 },
      ],
    };
  }, [headline]);

  const scoreColor =
    result.score >= 75 ? "text-emerald-600" : result.score >= 50 ? "text-amber-600" : "text-rose-600";
  const scoreBar =
    result.score >= 75 ? "bg-emerald-500" : result.score >= 50 ? "bg-amber-500" : "bg-rose-500";

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Your headline
        </span>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <div className="flex items-baseline justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Overall score
          </p>
          <p className={`text-4xl font-bold tabular-nums ${scoreColor}`}>
            {result.score}
            <span className="text-lg text-slate-500 font-medium">/100</span>
          </p>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
          <div className={`h-full ${scoreBar} transition-all`} style={{ width: `${result.score}%` }} />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          Breakdown
        </p>
        <div className="space-y-2">
          {result.breakdown.map((b) => (
            <div key={b.label}>
              <div className="flex justify-between text-sm">
                <span className="text-slate-700">{b.label}</span>
                <span className="tabular-nums text-slate-500">
                  {b.points}/{b.max}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full ${
                    b.points / b.max >= 0.7
                      ? "bg-emerald-500"
                      : b.points / b.max >= 0.4
                        ? "bg-amber-500"
                        : "bg-rose-500"
                  }`}
                  style={{ width: `${(b.points / b.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Word stats
          </p>
          <Row label="Word count" value={String(result.wordCount)} />
          <Row label="Common" value={String(result.common.length)} />
          <Row label="Uncommon" value={String(result.uncommon.length)} />
          <Row label="Starts with number" value={result.startsWithNumber ? "Yes" : "No"} />
          <Row label="Question" value={result.hasQuestion ? "Yes" : "No"} />
          <Row label="Sentiment" value={result.sentiment} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Flagged words
          </p>
          <Pills label="Emotional" items={result.emotional} tone="amber" />
          <Pills label="Power" items={result.power} tone="emerald" />
        </div>
      </div>

      {result.suggestions.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Suggestions
          </p>
          <ul className="text-sm text-slate-700 space-y-1 list-disc pl-5">
            {result.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="text-slate-900 font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function Pills({ label, items, tone }: { label: string; items: string[]; tone: "amber" | "emerald" }) {
  const cls =
    tone === "amber"
      ? "bg-amber-100 text-amber-800 border-amber-200"
      : "bg-emerald-100 text-emerald-800 border-emerald-200";
  return (
    <div>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      {items.length === 0 ? (
        <p className="text-sm text-slate-400">none</p>
      ) : (
        <div className="flex flex-wrap gap-1">
          {items.map((w, i) => (
            <span
              key={`${w}-${i}`}
              className={`text-xs px-2 py-0.5 rounded-full border ${cls} font-mono`}
            >
              {w}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
