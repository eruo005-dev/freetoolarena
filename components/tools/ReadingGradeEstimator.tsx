"use client";
import { useMemo, useState } from "react";

export function ReadingGradeEstimator() {
  const [text, setText] = useState(
    "Writing that lands is writing you can read aloud without losing breath. Short sentences do most of the work. Long ones only earn their keep when they say something the short ones can&rsquo;t."
  );

  const stats = useMemo(() => compute(text), [text]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Text</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Sentences" value={String(stats.sentences)} />
        <Stat label="Words" value={String(stats.words)} />
        <Stat label="Syllables" value={String(stats.syllables)} />
        <Stat label="Grade level" value={stats.gradeLabel} />
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Interpretation</div>
        <div className="text-sm mt-1">{stats.interpretation}</div>
      </div>

      <div className="text-xs text-slate-500">
        Formula: Flesch&mdash;Kincaid Grade = 0.39&middot;(words/sentences) + 11.8&middot;(syllables/words) &minus; 15.59
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">{label}</div>
      <div className="text-lg font-semibold text-slate-800">{value}</div>
    </div>
  );
}

function compute(text: string) {
  const trimmed = text.trim();
  const sentences = Math.max(1, (trimmed.match(/[.!?]+/g) || [""]).length);
  const wordList = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const words = Math.max(1, wordList.length);
  const syllables = wordList.reduce((sum, w) => sum + countSyllables(w), 0) || 1;

  const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
  const rounded = Math.max(0, Math.round(grade));

  let label = `${rounded}`;
  let interp = "";
  if (rounded <= 5) { label = `Grade ${rounded}`; interp = "Very easy &mdash; elementary school."; }
  else if (rounded <= 8) { label = `${rounded}th grade`; interp = "Easy &mdash; general audience, blog-friendly."; }
  else if (rounded <= 12) { label = `${rounded}th grade`; interp = "Average &mdash; high school reading level."; }
  else if (rounded <= 16) { label = `College`; interp = "Complex &mdash; college reading required."; }
  else { label = `Graduate+`; interp = "Dense &mdash; graduate / specialist audience."; }

  return { sentences, words: wordList.length, syllables, gradeLabel: label, interpretation: interp };
}

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const cleaned = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const matches = cleaned.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}
