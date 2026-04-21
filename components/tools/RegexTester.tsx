"use client";

import { useMemo, useState } from "react";

export function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState(
    "Email me at hello@example.com or Support@Acme.io — we answer fast."
  );

  const { matches, err } = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const arr: { match: string; index: number }[] = [];
      if (flags.includes("g")) {
        let m;
        while ((m = re.exec(text)) !== null) {
          arr.push({ match: m[0], index: m.index });
          if (m.index === re.lastIndex) re.lastIndex++;
        }
      } else {
        const m = re.exec(text);
        if (m) arr.push({ match: m[0], index: m.index });
      }
      return { matches: arr, err: "" };
    } catch (e) {
      return { matches: [], err: e instanceof Error ? e.message : "Invalid regex" };
    }
  }, [pattern, flags, text]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <label className="block col-span-3">
          <span className="block text-sm font-medium text-slate-700 mb-1">Pattern</span>
          <input value={pattern} onChange={(e) => setPattern(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block col-span-1">
          <span className="block text-sm font-medium text-slate-700 mb-1">Flags</span>
          <input value={flags} onChange={(e) => setFlags(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
      </div>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Test text</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
      </label>
      {err && <p className="text-sm text-rose-700">Error: {err}</p>}
      {!err && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">{matches.length} match{matches.length === 1 ? "" : "es"}</p>
          {matches.length > 0 ? (
            <ul className="space-y-1 font-mono">
              {matches.map((m, i) => <li key={i}>@{m.index}: <span className="text-brand-dark font-semibold">{m.match}</span></li>)}
            </ul>
          ) : <p className="text-slate-500">No matches.</p>}
        </div>
      )}
    </div>
  );
}
