"use client";

import { useState, useMemo } from "react";

type Props = {
  initialText?: string;
};

const SAMPLE = `Dr. Smith visited Mr. Jones at 3.14 p.m. The meeting was short! Did it go well? Yes, Inc. reported strong results. e.g., revenue grew 12%.`;

const ABBREVIATIONS = new Set([
  "mr",
  "mrs",
  "ms",
  "dr",
  "jr",
  "sr",
  "inc",
  "ltd",
  "co",
  "st",
  "vs",
  "etc",
  "eg",
  "ie",
  "prof",
  "rev",
  "hon",
]);

function splitSentences(text: string): string[] {
  const sentences: string[] = [];
  let current = "";
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    current += c;
    if (c === "." || c === "!" || c === "?") {
      // Skip trailing quotes/brackets
      let j = i + 1;
      while (j < chars.length && /["')\]\u201D\u2019]/.test(chars[j])) {
        current += chars[j];
        j++;
      }
      // Check if decimal number: prev char digit, next char digit
      const prev = chars[i - 1];
      const next = chars[j];
      if (c === "." && prev && /\d/.test(prev) && next && /\d/.test(next)) {
        i = j - 1;
        continue;
      }
      // Check abbreviation: look at the last word before the period
      if (c === ".") {
        const match = current.slice(0, current.length - 1).match(/([A-Za-z]+)$/);
        if (match) {
          const word = match[1].toLowerCase();
          if (ABBREVIATIONS.has(word)) {
            i = j - 1;
            continue;
          }
        }
      }
      // End sentence — consume trailing whitespace
      while (j < chars.length && /\s/.test(chars[j])) {
        current += chars[j];
        j++;
      }
      const trimmed = current.trim();
      if (trimmed) sentences.push(trimmed);
      current = "";
      i = j - 1;
    }
  }
  const leftover = current.trim();
  if (leftover) sentences.push(leftover);
  return sentences;
}

function wordCount(s: string): number {
  const m = s.match(/\b[\w'-]+\b/g);
  return m ? m.length : 0;
}

export function SentenceCounter({ initialText = SAMPLE }: Props = {}) {
  const [text, setText] = useState(initialText);

  const stats = useMemo(() => {
    const sentences = splitSentences(text);
    const wordsPer = sentences.map(wordCount);
    const totalWords = wordsPer.reduce((a, b) => a + b, 0);
    const avg =
      sentences.length > 0 ? totalWords / sentences.length : 0;
    let longest = "";
    let shortest = "";
    let longestW = -1;
    let shortestW = Infinity;
    sentences.forEach((s, i) => {
      const w = wordsPer[i];
      if (w > longestW) {
        longestW = w;
        longest = s;
      }
      if (w > 0 && w < shortestW) {
        shortestW = w;
        shortest = s;
      }
    });
    return {
      count: sentences.length,
      avg: avg.toFixed(1),
      longest,
      longestW: longestW < 0 ? 0 : longestW,
      shortest,
      shortestW: shortestW === Infinity ? 0 : shortestW,
    };
  }, [text]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Your text
        </span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            Sentences
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.count}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            Avg words / sentence
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.avg}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            Total sentences
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.count}</div>
        </div>
      </div>

      {stats.count > 0 && (
        <div className="space-y-3">
          <div>
            <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
              Longest sentence ({stats.longestW} words)
            </div>
            <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-800">
              {stats.longest}
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
              Shortest sentence ({stats.shortestW} words)
            </div>
            <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-800">
              {stats.shortest}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
