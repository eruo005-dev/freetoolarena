"use client";

import { useMemo, useState } from "react";

const SAMPLE = "Type here to count characters. Great for Twitter (280), SMS (160), and meta descriptions (~160).";

interface Limit {
  label: string;
  max: number;
}

const LIMITS: Limit[] = [
  { label: "Tweet", max: 280 },
  { label: "SMS", max: 160 },
  { label: "Meta description", max: 160 },
  { label: "Meta title", max: 60 },
  { label: "LinkedIn post", max: 3000 },
  { label: "Instagram caption", max: 2200 },
];

export function CharacterCounter() {
  const [text, setText] = useState(SAMPLE);

  const stats = useMemo(() => {
    const withSpaces = text.length;
    const noSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    const lines = text ? text.split(/\n/).length : 0;
    return { withSpaces, noSpaces, words, lines };
  }, [text]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="sr-only">Input text</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text here…"
          rows={8}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-y min-h-[140px]"
        />
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatBox label="Characters" value={stats.withSpaces} highlight />
        <StatBox label="No spaces" value={stats.noSpaces} />
        <StatBox label="Words" value={stats.words} />
        <StatBox label="Lines" value={stats.lines} />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-700 mb-2">Platform limits</p>
        <div className="space-y-2">
          {LIMITS.map((limit) => (
            <LimitRow key={limit.label} limit={limit} used={stats.withSpaces} />
          ))}
        </div>
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

function LimitRow({ limit, used }: { limit: Limit; used: number }) {
  const pct = Math.min(100, (used / limit.max) * 100);
  const over = used > limit.max;
  const barColor = over ? "bg-red-500" : used > limit.max * 0.9 ? "bg-amber-500" : "bg-brand";
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium text-slate-700">{limit.label}</span>
        <span className={`tabular-nums ${over ? "text-red-600 font-semibold" : "text-slate-500"}`}>
          {used} / {limit.max}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
