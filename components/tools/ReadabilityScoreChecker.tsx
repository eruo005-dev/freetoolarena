"use client";

import { useMemo, useState } from "react";

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const matches = w.replace(/e$/, "").match(/[aeiouy]+/g);
  return matches ? matches.length : 1;
}

export function ReadabilityScoreChecker() {
  const [text, setText] = useState(
    "The quick brown fox jumps over the lazy dog. This sentence is a classic pangram used to test typefaces."
  );

  const stats = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
    const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
    const W = words.length || 1;
    const S = sentences.length || 1;
    const flesch = 206.835 - 1.015 * (W / S) - 84.6 * (syllables / W);
    const gradeLevel = 0.39 * (W / S) + 11.8 * (syllables / W) - 15.59;
    return {
      words: words.length,
      sentences: sentences.length,
      syllables,
      flesch: Math.round(flesch * 10) / 10,
      gradeLevel: Math.round(gradeLevel * 10) / 10,
    };
  }, [text]);

  const label =
    stats.flesch >= 90 ? "Very easy" :
    stats.flesch >= 80 ? "Easy" :
    stats.flesch >= 70 ? "Fairly easy" :
    stats.flesch >= 60 ? "Plain English" :
    stats.flesch >= 50 ? "Fairly difficult" :
    stats.flesch >= 30 ? "Difficult" :
    "Very difficult";

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Text</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">Flesch Reading Ease</p>
        <p className="text-3xl font-bold">{stats.flesch} <span className="text-base font-normal text-white/80">({label})</span></p>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Grade level</p>
          <p className="text-lg font-semibold text-slate-900">{stats.gradeLevel}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Words / Sentences</p>
          <p className="text-lg font-semibold text-slate-900">{stats.words} / {stats.sentences}</p>
        </div>
      </div>
    </div>
  );
}
