"use client";

import { useMemo, useState } from "react";

export function ReadingTimeEstimator() {
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState(230);

  const r = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = wpm > 0 ? words / wpm : 0;
    const mm = Math.floor(minutes);
    const ss = Math.round((minutes - mm) * 60);
    return { words, minutes, label: words === 0 ? "0 sec" : `${mm} min ${ss.toString().padStart(2, "0")} sec` };
  }, [text, wpm]);

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Paste your text</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Reading speed (WPM)</span>
        <input type="number" value={wpm} onChange={(e) => setWpm(Number(e.target.value))} min={50} max={1000}
          className="w-32 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
      </label>
      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">Reading time</p>
        <p className="text-3xl font-bold">{r.label}</p>
        <p className="text-xs text-white/80 mt-1">{r.words} words at {wpm} WPM</p>
      </div>
    </div>
  );
}
