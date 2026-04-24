"use client";

import { useMemo, useState } from "react";

type Subject = "vocab" | "formulas" | "dates" | "concepts";
type Retention = "1wk" | "1mo" | "6mo";

const SUBJECT_LABELS: Record<Subject, string> = {
  vocab: "Vocabulary",
  formulas: "Formulas / equations",
  dates: "Dates / facts",
  concepts: "Concepts / theory",
};

const SUBJECT_MULTIPLIER: Record<Subject, number> = {
  vocab: 1.0,
  formulas: 1.3,
  dates: 0.9,
  concepts: 1.5,
};

const REVIEWS_NEEDED: Record<Retention, number> = {
  "1wk": 4,
  "1mo": 7,
  "6mo": 10,
};

const RETENTION_LABELS: Record<Retention, string> = {
  "1wk": "1 week",
  "1mo": "1 month",
  "6mo": "6 months",
};

const SCHEDULE_DAYS = [1, 3, 7, 14, 30, 90];

export function FlashcardStudyEstimator() {
  const [concepts, setConcepts] = useState(100);
  const [subject, setSubject] = useState<Subject>("vocab");
  const [retention, setRetention] = useState<Retention>("1mo");

  const result = useMemo(() => {
    if (!Number.isFinite(concepts) || concepts <= 0) return null;
    const mult = SUBJECT_MULTIPLIER[subject];
    const cards = Math.ceil(concepts * mult);
    const reviews = REVIEWS_NEEDED[retention];
    const minutesPerCard = 0.25 + 0.15 * reviews;
    const totalMinutes = cards * minutesPerCard;
    const totalHours = totalMinutes / 60;
    const schedule = SCHEDULE_DAYS.slice(0, reviews > 6 ? SCHEDULE_DAYS.length : reviews);
    return { cards, totalMinutes, totalHours, reviews, schedule };
  }, [concepts, subject, retention]);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-5 grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Concepts to memorize</label>
          <input
            type="number"
            min={1}
            value={concepts}
            onChange={(e) => setConcepts(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Subject type</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value as Subject)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          >
            {(Object.keys(SUBJECT_LABELS) as Subject[]).map((s) => (
              <option key={s} value={s}>
                {SUBJECT_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Target retention</label>
          <select
            value={retention}
            onChange={(e) => setRetention(e.target.value as Retention)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          >
            {(Object.keys(RETENTION_LABELS) as Retention[]).map((r) => (
              <option key={r} value={r}>
                {RETENTION_LABELS[r]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Cards needed</p>
              <p className="text-2xl font-bold text-brand">{result.cards}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Total study time</p>
              <p className="text-2xl font-bold text-brand">{result.totalHours.toFixed(1)} hrs</p>
              <p className="text-xs text-slate-500">~{Math.round(result.totalMinutes)} min</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Reviews per card</p>
              <p className="text-2xl font-bold text-brand">{result.reviews}</p>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-2">SM-2 style review schedule</p>
            <div className="flex flex-wrap gap-2">
              {result.schedule.map((d, i) => (
                <span
                  key={d}
                  className="text-xs bg-white border border-slate-300 text-slate-700 px-2.5 py-1 rounded"
                >
                  Day {d}
                  <span className="text-slate-400 ml-1">#{i + 1}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Tips for good cards</p>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              <li>One fact per card&nbsp;&mdash;&nbsp;atomic prompts beat compound ones.</li>
              <li>Use cloze deletion for definitions and dates.</li>
              <li>Add an image or mnemonic for abstract concepts.</li>
              <li>Rephrase in your own words; don&rsquo;t copy textbook sentences verbatim.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
