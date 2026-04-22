"use client";

import { useMemo, useState } from "react";

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "of", "to", "in", "on", "at", "for",
  "with", "by", "is", "are", "was", "were", "be", "been", "this", "that", "it",
  "as", "from", "i", "you", "he", "she", "we", "they", "my", "your", "his",
  "her", "our", "their",
]);

const SAMPLE =
  "The quick brown fox jumps over the lazy dog. The dog barks, and the fox runs away. The quick fox is smart.";

export function WordFrequencyCounter() {
  const [text, setText] = useState(SAMPLE);
  const [ignoreStop, setIgnoreStop] = useState(true);
  const [topN, setTopN] = useState(20);

  const rows = useMemo(() => {
    const tokens = text
      .toLowerCase()
      .replace(/[^a-z0-9\s']/g, " ")
      .split(/\s+/)
      .filter((w) => w && (!ignoreStop || !STOP_WORDS.has(w)));
    const total = tokens.length;
    const counts = new Map<string, number>();
    for (const t of tokens) counts.set(t, (counts.get(t) || 0) + 1);
    const arr = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, Math.max(1, topN))
      .map(([word, count]) => ({
        word,
        count,
        percent: total === 0 ? 0 : (count / total) * 100,
      }));
    return { list: arr, total };
  }, [text, ignoreStop, topN]);

  return (
    <div className="space-y-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Paste text here…"
        className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand"
      />

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={ignoreStop}
            onChange={(e) => setIgnoreStop(e.target.checked)}
          />
          Ignore stop-words
        </label>
        <label className="flex items-center gap-2 text-sm">
          Top N:
          <input
            type="number"
            min={1}
            max={200}
            value={topN}
            onChange={(e) => setTopN(Number(e.target.value) || 20)}
            className="w-20 rounded-lg border border-slate-300 px-2 py-1"
          />
        </label>
        <span className="text-sm text-slate-500">Total words: {rows.total}</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-2 font-semibold">#</th>
              <th className="px-4 py-2 font-semibold">Word</th>
              <th className="px-4 py-2 font-semibold">Count</th>
              <th className="px-4 py-2 font-semibold">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.list.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-slate-400" colSpan={4}>
                  No words yet.
                </td>
              </tr>
            ) : (
              rows.list.map((r, i) => (
                <tr key={r.word} className="border-t border-slate-200">
                  <td className="px-4 py-2 text-slate-500">{i + 1}</td>
                  <td className="px-4 py-2 font-mono">{r.word}</td>
                  <td className="px-4 py-2 tabular-nums">{r.count}</td>
                  <td className="px-4 py-2 tabular-nums">{r.percent.toFixed(1)}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={() => {
          const out = rows.list
            .map((r) => `${r.word}\t${r.count}\t${r.percent.toFixed(1)}%`)
            .join("\n");
          navigator.clipboard?.writeText(out);
        }}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
      >
        Copy table
      </button>
    </div>
  );
}
