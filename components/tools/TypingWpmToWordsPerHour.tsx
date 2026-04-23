"use client";
import { useMemo, useState } from "react";

export function TypingWpmToWordsPerHour() {
  const [wpm, setWpm] = useState(45);
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [productivity, setProductivity] = useState(60);

  const out = useMemo(() => compute(wpm, hoursPerDay, productivity), [wpm, hoursPerDay, productivity]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">WPM</span>
          <input type="number" min={5} max={200} value={wpm} onChange={(e) => setWpm(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Hours per day</span>
          <input type="number" min={0.1} step={0.1} max={16} value={hoursPerDay} onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Productivity %</span>
          <input type="number" min={5} max={100} value={productivity} onChange={(e) => setProductivity(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Words/hour" value={out.wordsPerHour.toLocaleString()} />
        <Stat label="Words/day" value={out.wordsPerDay.toLocaleString()} />
        <Stat label="Pages/day" value={out.pagesPerDay.toFixed(1)} hint="250 words = 1 page" />
        <Stat label="Chapters/week" value={out.chaptersPerWeek.toFixed(1)} hint="3,000 words = 1 chapter" />
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Weekly &amp; monthly totals</div>
        <div className="text-sm mt-1">
          At {wpm} WPM &times; {hoursPerDay} hrs/day &times; {productivity}% productive time, you ship about {out.wordsPerWeek.toLocaleString()} words per week (5 working days) and {out.wordsPerMonth.toLocaleString()} per month (20 working days). That&rsquo;s roughly {out.booksPerYear.toFixed(1)} full-length books per year (80,000 words each).
        </div>
      </div>

      <div className="text-xs text-slate-500">
        Typing speed &ne; writing speed. The productivity % accounts for thinking, editing, and breaks.
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">{label}</div>
      <div className="text-lg font-semibold text-slate-800">{value}</div>
      {hint && <div className="text-[11px] text-slate-500 mt-0.5">{hint}</div>}
    </div>
  );
}

function compute(wpm: number, hrs: number, prod: number) {
  const w = Math.max(0, wpm);
  const h = Math.max(0, hrs);
  const p = Math.max(0, Math.min(100, prod)) / 100;
  const effectiveMinutes = h * 60 * p;
  const wordsPerDay = Math.round(w * effectiveMinutes);
  const wordsPerHour = Math.round(w * 60 * p);
  const pagesPerDay = wordsPerDay / 250;
  const wordsPerWeek = wordsPerDay * 5;
  const chaptersPerWeek = wordsPerWeek / 3000;
  const wordsPerMonth = wordsPerDay * 20;
  const booksPerYear = (wordsPerDay * 240) / 80000;
  return { wordsPerHour, wordsPerDay, pagesPerDay, chaptersPerWeek, wordsPerWeek, wordsPerMonth, booksPerYear };
}
