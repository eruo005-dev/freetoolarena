"use client";

import { useMemo, useState } from "react";

const SAMPLE = "Paste any text here to see word count, character count, sentence count, and reading time update live.";

export function WordCounter() {
  const [text, setText] = useState(SAMPLE);

  const stats = useMemo(() => analyze(text), [text]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="sr-only">Input text</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text here…"
          rows={10}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-y min-h-[160px]"
        />
      </label>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        <StatBox label="Words" value={stats.words} highlight />
        <StatBox label="Characters" value={stats.charsWithSpaces} />
        <StatBox label="Chars (no spaces)" value={stats.charsNoSpaces} />
        <StatBox label="Sentences" value={stats.sentences} />
        <StatBox label="Paragraphs" value={stats.paragraphs} />
        <StatBox label="Reading time" value={formatTime(stats.readingSeconds)} />
        <StatBox label="Speaking time" value={formatTime(stats.speakingSeconds)} />
        <StatBox label="Avg word length" value={stats.avgWordLength.toFixed(1)} />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setText("")}
          className="border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(text)}
          className="border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Copy text
        </button>
      </div>
    </div>
  );
}

function analyze(text: string) {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed
    ? (trimmed.match(/[^.!?\n]+[.!?]+/g) || [trimmed]).length
    : 0;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n+/).filter(Boolean).length : 0;
  const readingSeconds = Math.round((words / 230) * 60);
  const speakingSeconds = Math.round((words / 130) * 60);
  const avgWordLength = words > 0 ? charsNoSpaces / words : 0;
  return {
    words,
    charsWithSpaces,
    charsNoSpaces,
    sentences,
    paragraphs,
    readingSeconds,
    speakingSeconds,
    avgWordLength,
  };
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m}m` : `${m}m ${s}s`;
}

function StatBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-0.5">{label}</p>
      <p
        className={`font-bold tabular-nums ${
          highlight ? "text-2xl text-brand" : "text-xl text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
