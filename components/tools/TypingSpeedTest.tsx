"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const SAMPLE =
  "The quick brown fox jumps over the lazy dog while stars twinkle softly above a sleeping town. Every keystroke counts when you are racing against the clock to finish a passage cleanly. Focus on rhythm and breathing — speed follows accuracy, not the other way around.";

export function TypingSpeedTest() {
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (startedAt && !finished) {
      tick.current = setInterval(() => setElapsed((Date.now() - startedAt) / 1000), 200);
      return () => { if (tick.current) clearInterval(tick.current); };
    }
  }, [startedAt, finished]);

  const stats = useMemo(() => {
    const typed = input.length;
    const correct = [...input].reduce((n, ch, i) => n + (ch === SAMPLE[i] ? 1 : 0), 0);
    const acc = typed > 0 ? Math.round((correct / typed) * 100) : 100;
    const mins = elapsed / 60;
    const wpm = mins > 0 ? Math.round((correct / 5) / mins) : 0;
    return { typed, correct, acc, wpm };
  }, [input, elapsed]);

  const handleChange = (v: string) => {
    if (!startedAt) setStartedAt(Date.now());
    setInput(v);
    if (v.length >= SAMPLE.length) {
      setFinished(true);
      if (tick.current) clearInterval(tick.current);
    }
  };

  const reset = () => {
    setInput("");
    setStartedAt(null);
    setElapsed(0);
    setFinished(false);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-relaxed">
        {SAMPLE.split("").map((ch, i) => {
          const typed = input[i];
          const cls =
            typed == null ? "text-slate-400" :
            typed === ch ? "text-emerald-700" : "text-rose-700 underline";
          return <span key={i} className={cls}>{ch}</span>;
        })}
      </div>
      <textarea
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        disabled={finished}
        rows={4}
        placeholder="Start typing here…"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">WPM</p>
          <p className="text-lg font-semibold text-slate-900">{stats.wpm}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Accuracy</p>
          <p className="text-lg font-semibold text-slate-900">{stats.acc}%</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Time</p>
          <p className="text-lg font-semibold text-slate-900">{elapsed.toFixed(1)}s</p>
        </div>
      </div>
      <button type="button" onClick={reset}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        Reset
      </button>
    </div>
  );
}
