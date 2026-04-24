"use client";

import { useMemo, useState } from "react";

type Subject = "stem" | "language" | "memorization" | "essay" | "mixed";

const SUBJECT_HOURS_PER_UNIT: Record<Subject, number> = {
  stem: 4,
  language: 2.5,
  memorization: 1.5,
  essay: 3,
  mixed: 3,
};

const SUBJECT_LABEL: Record<Subject, string> = {
  stem: "STEM heavy",
  language: "Language",
  memorization: "Memorization heavy",
  essay: "Essay based",
  mixed: "Mixed",
};

function daysUntil(dateStr: string): number {
  const exam = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((exam.getTime() - now.getTime()) / 86_400_000);
  return diff;
}

function inTwoWeeks(): string {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export interface StudyTimePlannerProps {
  initialSubject?: Subject;
  initialFamiliarity?: number;
  initialChapters?: number;
  initialHoursPerDay?: number;
}

export function StudyTimePlanner({
  initialSubject = "stem",
  initialFamiliarity = 5,
  initialChapters = 8,
  initialHoursPerDay = 3,
}: StudyTimePlannerProps = {}) {
  const [examDate, setExamDate] = useState(inTwoWeeks());
  const [subject, setSubject] = useState<Subject>(initialSubject);
  const [familiarity, setFamiliarity] = useState(String(initialFamiliarity));
  const [chapters, setChapters] = useState(String(initialChapters));
  const [hoursPerDay, setHoursPerDay] = useState(String(initialHoursPerDay));

  const result = useMemo(() => {
    const fam = Number(familiarity);
    const ch = Number(chapters);
    const hpd = Number(hoursPerDay);
    if (![fam, ch, hpd].every(Number.isFinite)) return null;
    if (fam < 1 || fam > 10 || ch <= 0 || hpd <= 0) return null;

    const days = daysUntil(examDate);
    if (!Number.isFinite(days)) return null;

    const base = SUBJECT_HOURS_PER_UNIT[subject] * ch;
    // Familiarity multiplier: 10 -> 0.5, 5 -> 1.0, 1 -> 1.5
    const famMult = 1 + (5 - fam) * 0.1;
    const total = base * famMult;

    const usableDays = Math.max(1, days);
    const dailySuggested = total / usableDays;

    // Pomodoro blocks (25 min + 5 min break = 30 min per block; 2 blocks/hour)
    const blocksPerDay = Math.ceil(dailySuggested * 2);
    const pomodoroHours = blocksPerDay * 0.5;

    let tier: string;
    let tierColor: string;
    let cram = false;
    if (days < 0) {
      tier = "Exam has passed";
      tierColor = "text-red-600";
    } else if (days < 3) {
      tier = "Emergency cram";
      tierColor = "text-red-600";
      cram = true;
    } else if (days < 7) {
      tier = "Heavy cram";
      tierColor = "text-orange-600";
      cram = true;
    } else if (dailySuggested > hpd) {
      tier = "Plan feasible only if you add hours";
      tierColor = "text-amber-600";
    } else if (dailySuggested > hpd * 0.75) {
      tier = "Tight but doable";
      tierColor = "text-amber-600";
    } else {
      tier = "Comfortable pace";
      tierColor = "text-emerald-600";
    }

    return {
      total,
      days,
      dailySuggested,
      hpd,
      blocksPerDay,
      pomodoroHours,
      tier,
      tierColor,
      cram,
      capacity: hpd * usableDays,
    };
  }, [examDate, subject, familiarity, chapters, hoursPerDay]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Exam date</span>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Subject type</span>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value as Subject)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            {Object.entries(SUBJECT_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Current familiarity (1 = new, 10 = expert)
          </span>
          <input
            type="number"
            min={1}
            max={10}
            value={familiarity}
            onChange={(e) => setFamiliarity(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Chapters / units to cover</span>
          <input
            type="number"
            value={chapters}
            onChange={(e) => setChapters(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Hours available per day</span>
          <input
            type="number"
            step="0.5"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      {result ? (
        <>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total study hours needed</p>
            <p className="text-4xl font-bold text-brand tabular-nums">{result.total.toFixed(1)}h</p>
            <p className={`mt-2 text-sm font-semibold ${result.tierColor}`}>{result.tier}</p>
            <p className="mt-1 text-xs text-slate-500">
              {result.days} days until exam &mdash; capacity at {result.hpd}h/day is {result.capacity.toFixed(1)}h
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Daily target</p>
              <p className="text-xl font-bold text-slate-900 tabular-nums">{result.dailySuggested.toFixed(1)}h</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Pomodoro blocks/day</p>
              <p className="text-xl font-bold text-slate-900 tabular-nums">{result.blocksPerDay}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Pomodoro time</p>
              <p className="text-xl font-bold text-slate-900 tabular-nums">{result.pomodoroHours.toFixed(1)}h</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
              Sample daily block schedule
            </p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                &bull; {result.blocksPerDay} &times; 25-min focused blocks with 5-min breaks between
              </li>
              <li>&bull; Every 4th block: take a 20&ndash;30 min break instead</li>
              <li>&bull; Front-load difficult chapters; review previous day&rsquo;s content in the last block</li>
            </ul>
          </div>

          {result.cram ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p className="font-semibold mb-1">Cramming warning</p>
              <p>
                Fewer than 7 days left. Retention will suffer &mdash; prioritize highest-weight topics, past exams, and
                active recall over re-reading.
              </p>
            </div>
          ) : null}
        </>
      ) : (
        <p className="text-sm text-red-600">Enter a valid future exam date and positive numeric values.</p>
      )}
    </div>
  );
}
