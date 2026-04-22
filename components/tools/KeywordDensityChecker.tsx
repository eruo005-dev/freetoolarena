"use client";

import { useMemo, useState } from "react";

const STOPWORDS = new Set([
  "the", "is", "at", "of", "a", "an", "and", "or", "but", "in", "on", "for",
  "to", "with", "as", "by", "it", "that", "this", "these", "those", "be",
  "been", "being", "was", "were", "are", "have", "has", "had", "do", "does",
  "did", "will", "would", "can", "could", "should", "i", "you", "he", "she",
  "we", "they", "my", "your", "his", "her", "its", "our", "their", "am",
  "me", "us", "them", "him",
]);

type KeywordRow = { word: string; count: number; density: number };

export function KeywordDensityChecker({
  initialText = "",
}: { initialText?: string } = {}) {
  const [text, setText] = useState(initialText);
  const [target, setTarget] = useState("");
  const [excludeStop, setExcludeStop] = useState(true);

  const stats = useMemo(() => analyze(text, excludeStop), [text, excludeStop]);

  const targetStats = useMemo(() => {
    if (!target.trim()) return null;
    const t = target.trim().toLowerCase();
    const words = stats.allWords;
    let count = 0;
    // support multi-word target phrase
    const tokens = t.split(/\s+/).filter(Boolean);
    if (tokens.length === 1) {
      count = words.filter((w) => w === t).length;
    } else {
      for (let i = 0; i <= words.length - tokens.length; i++) {
        let match = true;
        for (let j = 0; j < tokens.length; j++) {
          if (words[i + j] !== tokens[j]) {
            match = false;
            break;
          }
        }
        if (match) count += 1;
      }
    }
    const density = words.length ? (count / words.length) * 100 : 0;
    let warning: string | null = null;
    if (words.length > 0) {
      if (density < 0.5) warning = "Low density (<0.5%) — consider using this keyword more.";
      else if (density > 3) warning = "High density (>3%) — may be seen as keyword stuffing.";
    }
    return { count, density, warning };
  }, [target, stats.allWords]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Article body
        </span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Paste your article here…"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
        />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Target keyword (optional)
          </span>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="e.g. free online tools"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 self-end mb-2">
          <input
            type="checkbox"
            checked={excludeStop}
            onChange={(e) => setExcludeStop(e.target.checked)}
          />
          Exclude common stopwords
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Total words" value={stats.totalWords.toLocaleString()} />
        <StatCard label="Unique words" value={stats.uniqueWords.toLocaleString()} />
        <StatCard label="Sentences" value={stats.sentences.toLocaleString()} />
        <StatCard label="Reading time" value={`${stats.readingMinutes} min`} />
      </div>

      {targetStats && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Target keyword: "{target}"
          </p>
          <div className="flex gap-6 flex-wrap text-sm">
            <span className="text-slate-700">
              Count: <strong>{targetStats.count}</strong>
            </span>
            <span className="text-slate-700">
              Density: <strong>{targetStats.density.toFixed(2)}%</strong>
            </span>
          </div>
          {targetStats.warning && (
            <p className="text-sm text-amber-700">{targetStats.warning}</p>
          )}
        </div>
      )}

      {stats.top.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Top 20 keywords
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="py-2 pr-4 font-semibold">#</th>
                  <th className="py-2 pr-4 font-semibold">Word</th>
                  <th className="py-2 pr-4 font-semibold text-right">Count</th>
                  <th className="py-2 font-semibold text-right">Density</th>
                </tr>
              </thead>
              <tbody>
                {stats.top.map((k, i) => (
                  <tr key={k.word} className="border-b border-slate-100 last:border-0">
                    <td className="py-1.5 pr-4 text-slate-500 tabular-nums">{i + 1}</td>
                    <td className="py-1.5 pr-4 text-slate-900 font-mono">{k.word}</td>
                    <td className="py-1.5 pr-4 text-right tabular-nums text-slate-700">
                      {k.count}
                    </td>
                    <td className="py-1.5 text-right tabular-nums text-slate-700">
                      {k.density.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
        {label}
      </p>
      <p className="text-2xl font-bold text-slate-900 tabular-nums">{value}</p>
    </div>
  );
}

function analyze(text: string, excludeStop: boolean) {
  const cleaned = text.toLowerCase();
  const allWords = cleaned.match(/\b[\p{L}\p{N}'-]+\b/gu) ?? [];
  const totalWords = allWords.length;
  const sentences = (text.match(/[^.!?]+[.!?]+/g) ?? []).length;
  const readingMinutes = Math.max(1, Math.round(totalWords / 200));

  const filtered = excludeStop
    ? allWords.filter((w) => !STOPWORDS.has(w) && w.length > 1)
    : allWords;

  const freq = new Map<string, number>();
  for (const w of filtered) {
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  const uniqueWords = new Set(allWords).size;
  const top: KeywordRow[] = Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word, count]) => ({
      word,
      count,
      density: totalWords ? (count / totalWords) * 100 : 0,
    }));

  return {
    totalWords,
    uniqueWords,
    sentences: sentences || (totalWords > 0 ? 1 : 0),
    readingMinutes,
    top,
    allWords,
  };
}
