"use client";

import { useMemo, useState } from "react";

const STOPWORDS = new Set(
  "a an the and or but if then than so of in on at to for from with by is are was were be been being have has had do does did not no i you we they he she it this that these those my our your their his her its as also can could should would will just only".split(" "),
);

function score(text: string, n: number): string[] {
  const sentences = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z])/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
  if (sentences.length <= n) return sentences;

  const freq: Record<string, number> = {};
  for (const s of sentences) {
    for (const w of s.toLowerCase().match(/[a-z']+/g) || []) {
      if (STOPWORDS.has(w) || w.length < 3) continue;
      freq[w] = (freq[w] || 0) + 1;
    }
  }
  const ranked = sentences
    .map((s, i) => {
      const words = s.toLowerCase().match(/[a-z']+/g) || [];
      const sc = words.reduce((a, w) => a + (freq[w] || 0), 0) / Math.max(1, words.length);
      return { s, sc, i };
    })
    .sort((a, b) => b.sc - a.sc)
    .slice(0, n)
    .sort((a, b) => a.i - b.i)
    .map((x) => x.s);
  return ranked;
}

export function TextSummarizer() {
  const [text, setText] = useState("");
  const [n, setN] = useState(3);
  const summary = useMemo(() => score(text, n), [text, n]);
  const words = text.match(/\S+/g)?.length ?? 0;

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Paste an article or long text</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder="Paste 3+ paragraphs here…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          Sentences:
          <select value={n} onChange={(e) => setN(parseInt(e.target.value))} className="rounded-lg border border-slate-300 px-2 py-1">
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={10}>10</option>
          </select>
        </label>
        <span className="text-sm text-slate-500">Source: {words} words</span>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 space-y-2 leading-relaxed text-sm">
        {summary.length === 0 ? (
          <p className="text-slate-400">Summary will appear here.</p>
        ) : (
          summary.map((s, i) => <p key={i}>{s}</p>)
        )}
      </div>
    </div>
  );
}
