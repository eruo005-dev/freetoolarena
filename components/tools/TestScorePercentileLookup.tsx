"use client";

import { useMemo, useState } from "react";

type Test = "SAT" | "ACT" | "GRE" | "GMAT" | "LSAT" | "MCAT" | "IELTS" | "TOEFL";

type Row = { score: number; percentile: number };

const TABLES: Record<Test, { range: [number, number]; rows: Row[]; top10: number }> = {
  SAT: {
    range: [400, 1600],
    top10: 1350,
    rows: [
      { score: 1600, percentile: 99 },
      { score: 1550, percentile: 99 },
      { score: 1500, percentile: 98 },
      { score: 1400, percentile: 94 },
      { score: 1300, percentile: 86 },
      { score: 1200, percentile: 74 },
      { score: 1100, percentile: 58 },
      { score: 1000, percentile: 42 },
      { score: 900, percentile: 26 },
      { score: 800, percentile: 12 },
    ],
  },
  ACT: {
    range: [1, 36],
    top10: 29,
    rows: [
      { score: 36, percentile: 99 },
      { score: 34, percentile: 99 },
      { score: 32, percentile: 97 },
      { score: 30, percentile: 93 },
      { score: 28, percentile: 88 },
      { score: 25, percentile: 78 },
      { score: 22, percentile: 61 },
      { score: 20, percentile: 48 },
      { score: 17, percentile: 28 },
      { score: 14, percentile: 10 },
    ],
  },
  GRE: {
    range: [260, 340],
    top10: 324,
    rows: [
      { score: 340, percentile: 99 },
      { score: 330, percentile: 98 },
      { score: 325, percentile: 94 },
      { score: 320, percentile: 85 },
      { score: 315, percentile: 72 },
      { score: 310, percentile: 54 },
      { score: 305, percentile: 36 },
      { score: 300, percentile: 22 },
      { score: 290, percentile: 7 },
    ],
  },
  GMAT: {
    range: [200, 800],
    top10: 710,
    rows: [
      { score: 760, percentile: 99 },
      { score: 720, percentile: 94 },
      { score: 700, percentile: 88 },
      { score: 680, percentile: 81 },
      { score: 650, percentile: 73 },
      { score: 600, percentile: 55 },
      { score: 550, percentile: 38 },
      { score: 500, percentile: 27 },
      { score: 450, percentile: 17 },
    ],
  },
  LSAT: {
    range: [120, 180],
    top10: 164,
    rows: [
      { score: 180, percentile: 99.9 },
      { score: 175, percentile: 99 },
      { score: 170, percentile: 97 },
      { score: 165, percentile: 90 },
      { score: 160, percentile: 80 },
      { score: 155, percentile: 63 },
      { score: 150, percentile: 43 },
      { score: 145, percentile: 24 },
      { score: 140, percentile: 12 },
    ],
  },
  MCAT: {
    range: [472, 528],
    top10: 514,
    rows: [
      { score: 528, percentile: 100 },
      { score: 522, percentile: 99 },
      { score: 518, percentile: 96 },
      { score: 514, percentile: 90 },
      { score: 510, percentile: 81 },
      { score: 506, percentile: 69 },
      { score: 500, percentile: 49 },
      { score: 494, percentile: 27 },
      { score: 488, percentile: 12 },
    ],
  },
  IELTS: {
    range: [0, 9],
    top10: 7.5,
    rows: [
      { score: 9, percentile: 99 },
      { score: 8.5, percentile: 97 },
      { score: 8, percentile: 92 },
      { score: 7.5, percentile: 83 },
      { score: 7, percentile: 70 },
      { score: 6.5, percentile: 55 },
      { score: 6, percentile: 38 },
      { score: 5.5, percentile: 22 },
      { score: 5, percentile: 11 },
    ],
  },
  TOEFL: {
    range: [0, 120],
    top10: 105,
    rows: [
      { score: 120, percentile: 99 },
      { score: 115, percentile: 97 },
      { score: 110, percentile: 91 },
      { score: 105, percentile: 83 },
      { score: 100, percentile: 72 },
      { score: 90, percentile: 52 },
      { score: 80, percentile: 34 },
      { score: 70, percentile: 19 },
      { score: 60, percentile: 9 },
    ],
  },
};

function interpolatePercentile(score: number, rows: Row[]): number {
  const sorted = [...rows].sort((a, b) => a.score - b.score);
  if (score <= sorted[0].score) return sorted[0].percentile;
  if (score >= sorted[sorted.length - 1].score) return sorted[sorted.length - 1].percentile;
  for (let i = 0; i < sorted.length - 1; i++) {
    const lo = sorted[i];
    const hi = sorted[i + 1];
    if (score >= lo.score && score <= hi.score) {
      const t = (score - lo.score) / (hi.score - lo.score);
      return lo.percentile + t * (hi.percentile - lo.percentile);
    }
  }
  return 50;
}

function tierFor(p: number): { label: string; color: string } {
  if (p >= 95) return { label: "Elite", color: "text-emerald-600" };
  if (p >= 75) return { label: "Competitive", color: "text-brand" };
  if (p >= 50) return { label: "Above average", color: "text-amber-600" };
  return { label: "Average / below", color: "text-slate-600" };
}

export function TestScorePercentileLookup() {
  const [test, setTest] = useState<Test>("SAT");
  const [score, setScore] = useState(1300);

  const result = useMemo(() => {
    const table = TABLES[test];
    if (!Number.isFinite(score)) return null;
    const clamped = Math.max(table.range[0], Math.min(table.range[1], score));
    const percentile = interpolatePercentile(clamped, table.rows);
    const tier = tierFor(percentile);
    return { percentile, tier, top10: table.top10, range: table.range };
  }, [test, score]);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Test</label>
          <select
            value={test}
            onChange={(e) => {
              const t = e.target.value as Test;
              setTest(t);
              const mid = (TABLES[t].range[0] + TABLES[t].range[1]) / 2;
              setScore(Math.round(mid));
            }}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          >
            {(Object.keys(TABLES) as Test[]).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Your score ({TABLES[test].range[0]}&ndash;{TABLES[test].range[1]})
          </label>
          <input
            type="number"
            step={test === "IELTS" ? 0.5 : 1}
            min={TABLES[test].range[0]}
            max={TABLES[test].range[1]}
            value={score}
            onChange={(e) => setScore(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
      </div>

      {result && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-3">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-xs text-slate-500 uppercase font-semibold">Percentile rank</span>
            <span className="text-4xl font-bold text-brand">{result.percentile.toFixed(0)}</span>
            <span className="text-sm text-slate-600">out of 100</span>
            <span className={`ml-auto text-lg font-semibold ${result.tier.color}`}>{result.tier.label}</span>
          </div>
          <p className="text-sm text-slate-700">
            Scored higher than roughly{" "}
            <span className="font-semibold">{result.percentile.toFixed(0)}%</span> of recent {test} test-takers.
          </p>
          <div className="pt-3 border-t border-slate-200 text-sm text-slate-700">
            Score needed for top 10%&nbsp;&mdash;&nbsp;
            <span className="font-semibold text-brand">{result.top10}+</span>
          </div>
          <p className="text-xs text-slate-500">
            Percentiles based on 2023 published score reports. Your exact percentile may vary slightly year to year.
          </p>
        </div>
      )}
    </div>
  );
}
