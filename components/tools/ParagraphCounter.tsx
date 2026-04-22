"use client";

import { useState, useMemo } from "react";

type Props = {
  initialText?: string;
};

const SAMPLE = `Dr. Smith opened the meeting. He discussed Q3 results.

Revenue grew 12%. Margins held steady. The team celebrated.

Next quarter looks strong. We plan to ship 9 new tools!`;

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
      let j = i + 1;
      while (j < chars.length && /["')\]\u201D\u2019]/.test(chars[j])) {
        current += chars[j];
        j++;
      }
      const prev = chars[i - 1];
      const next = chars[j];
      if (c === "." && prev && /\d/.test(prev) && next && /\d/.test(next)) {
        i = j - 1;
        continue;
      }
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

export function ParagraphCounter({ initialText = SAMPLE }: Props = {}) {
  const [text, setText] = useState(initialText);

  const stats = useMemo(() => {
    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
    const perPara = paragraphs.map((p) => ({
      text: p,
      words: wordCount(p),
      sentences: splitSentences(p).length,
      chars: p.length,
    }));
    let longest = perPara[0];
    for (const p of perPara) {
      if (!longest || p.words > longest.words) longest = p;
    }
    const totalChars = text.length;
    return {
      count: paragraphs.length,
      perPara,
      longest,
      totalChars,
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
            Paragraphs
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.count}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            Total chars
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.totalChars}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            Longest para (words)
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {stats.longest?.words ?? 0}
          </div>
        </div>
      </div>

      {stats.perPara.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
            Per paragraph breakdown
          </div>
          <div className="space-y-2">
            {stats.perPara.map((p, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-200 p-3 text-sm"
              >
                <div className="flex flex-wrap gap-3 text-xs text-slate-600 mb-1">
                  <span>
                    <strong className="text-slate-800">#{i + 1}</strong>
                  </span>
                  <span>{p.words} words</span>
                  <span>{p.sentences} sentences</span>
                  <span>{p.chars} chars</span>
                </div>
                <p className="text-slate-800 line-clamp-3">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.longest && stats.count > 1 && (
        <div>
          <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
            Longest paragraph ({stats.longest.words} words, {stats.longest.sentences}{" "}
            sentences)
          </div>
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-800">
            {stats.longest.text}
          </p>
        </div>
      )}
    </div>
  );
}
