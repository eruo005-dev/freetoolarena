"use client";

import { useState } from "react";

export function DecisionMaker() {
  const [text, setText] = useState("Pizza\nSushi\nTacos\nSalad\nBurger");
  const [pick, setPick] = useState<string | null>(null);

  const decide = () => {
    const opts = text.split("\n").map((s) => s.trim()).filter(Boolean);
    if (opts.length === 0) return;
    setPick(opts[Math.floor(Math.random() * opts.length)]);
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Options (one per line)</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <button type="button" onClick={decide}
        className="rounded-lg bg-brand-dark text-white px-4 py-2 text-sm font-semibold hover:bg-brand">
        Decide for me
      </button>
      {pick && (
        <div className="rounded-lg bg-brand-dark text-white p-6 text-center">
          <p className="text-xs uppercase tracking-wide text-white/70 mb-1">The decision</p>
          <p className="text-2xl font-bold">{pick}</p>
        </div>
      )}
    </div>
  );
}
