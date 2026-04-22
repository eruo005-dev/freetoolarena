"use client";

import { useMemo, useState } from "react";

export function LineCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    if (text.length === 0) {
      return {
        total: 0,
        empty: 0,
        nonEmpty: 0,
        withContent: 0,
        shortest: 0,
        longest: 0,
        average: 0,
      };
    }
    const lines = text.split("\n");
    const total = lines.length;
    let empty = 0;
    let withContent = 0;
    let shortest = Infinity;
    let longest = 0;
    let sumLen = 0;
    for (const line of lines) {
      if (line.length === 0) {
        empty++;
      }
      if (line.trim().length > 0) {
        withContent++;
      }
      const len = line.length;
      if (len < shortest) shortest = len;
      if (len > longest) longest = len;
      sumLen += len;
    }
    const nonEmpty = total - empty;
    return {
      total,
      empty,
      nonEmpty,
      withContent,
      shortest: shortest === Infinity ? 0 : shortest,
      longest,
      average: total > 0 ? sumLen / total : 0,
    };
  }, [text]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Your text</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder="Paste or type text here…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="rounded-xl bg-slate-50 p-5">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3">
          Line statistics
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Total lines</p>
            <p className="text-2xl text-brand font-bold tabular-nums">{stats.total}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Lines with content</p>
            <p className="text-2xl text-brand font-bold tabular-nums">{stats.withContent}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Non-empty lines</p>
            <p className="text-xl font-bold text-slate-900 tabular-nums">{stats.nonEmpty}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Empty lines</p>
            <p className="text-xl font-bold text-slate-900 tabular-nums">{stats.empty}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Shortest line</p>
            <p className="text-xl font-bold text-slate-900 tabular-nums">{stats.shortest} chars</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Longest line</p>
            <p className="text-xl font-bold text-slate-900 tabular-nums">{stats.longest} chars</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Average length</p>
            <p className="text-xl font-bold text-slate-900 tabular-nums">
              {stats.average.toFixed(1)} chars
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
