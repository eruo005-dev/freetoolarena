"use client";

import { useMemo, useState } from "react";

// Official ACT/SAT concordance (2018+)
const CONCORDANCE: { act: number; satLow: number; satHigh: number; satMid: number; actPct: number; satPct: number }[] = [
  { act: 36, satLow: 1570, satHigh: 1600, satMid: 1590, actPct: 99, satPct: 99 },
  { act: 35, satLow: 1530, satHigh: 1560, satMid: 1540, actPct: 99, satPct: 99 },
  { act: 34, satLow: 1490, satHigh: 1520, satMid: 1500, actPct: 99, satPct: 98 },
  { act: 33, satLow: 1450, satHigh: 1480, satMid: 1470, actPct: 98, satPct: 97 },
  { act: 32, satLow: 1420, satHigh: 1440, satMid: 1430, actPct: 97, satPct: 96 },
  { act: 31, satLow: 1390, satHigh: 1410, satMid: 1400, actPct: 95, satPct: 94 },
  { act: 30, satLow: 1360, satHigh: 1380, satMid: 1370, actPct: 93, satPct: 92 },
  { act: 29, satLow: 1330, satHigh: 1350, satMid: 1340, actPct: 90, satPct: 89 },
  { act: 28, satLow: 1300, satHigh: 1320, satMid: 1310, actPct: 88, satPct: 86 },
  { act: 27, satLow: 1260, satHigh: 1290, satMid: 1280, actPct: 85, satPct: 83 },
  { act: 26, satLow: 1230, satHigh: 1250, satMid: 1240, actPct: 82, satPct: 80 },
  { act: 25, satLow: 1200, satHigh: 1220, satMid: 1210, actPct: 78, satPct: 75 },
  { act: 24, satLow: 1160, satHigh: 1190, satMid: 1180, actPct: 74, satPct: 71 },
  { act: 23, satLow: 1130, satHigh: 1150, satMid: 1140, actPct: 68, satPct: 65 },
  { act: 22, satLow: 1100, satHigh: 1120, satMid: 1110, actPct: 63, satPct: 59 },
  { act: 21, satLow: 1060, satHigh: 1090, satMid: 1080, actPct: 56, satPct: 53 },
  { act: 20, satLow: 1030, satHigh: 1050, satMid: 1040, actPct: 50, satPct: 46 },
  { act: 19, satLow: 990, satHigh: 1020, satMid: 1010, actPct: 43, satPct: 40 },
  { act: 18, satLow: 960, satHigh: 980, satMid: 970, actPct: 37, satPct: 34 },
];

type Test = "act" | "sat";

export interface ActToSatConverterProps {
  initialScore?: number;
  initialTest?: Test;
}

export function ActToSatConverter({ initialScore = 28, initialTest = "act" }: ActToSatConverterProps = {}) {
  const [test, setTest] = useState<Test>(initialTest);
  const [score, setScore] = useState(String(initialScore));

  const result = useMemo(() => {
    const n = Number(score);
    if (!Number.isFinite(n)) return null;
    if (test === "act") {
      if (n < 1 || n > 36) return null;
      const rounded = Math.round(n);
      const row = CONCORDANCE.find((r) => r.act === rounded);
      if (!row) {
        if (rounded < 18) return { actRange: `${rounded}`, satRange: "Below 960", actPct: "<37", satPct: "<34" };
        return null;
      }
      return {
        actRange: `${row.act}`,
        satRange: `${row.satLow}&ndash;${row.satHigh}`,
        actPct: `${row.actPct}`,
        satPct: `${row.satPct}`,
      };
    } else {
      if (n < 400 || n > 1600) return null;
      let row = CONCORDANCE.find((r) => n >= r.satLow && n <= r.satHigh);
      if (!row) {
        let best = CONCORDANCE[CONCORDANCE.length - 1];
        let bestDist = Math.abs(best.satMid - n);
        for (const r of CONCORDANCE) {
          const d = Math.abs(r.satMid - n);
          if (d < bestDist) {
            best = r;
            bestDist = d;
          }
        }
        row = best;
      }
      return {
        actRange: `${row.act}`,
        satRange: `${n}`,
        actPct: `${row.actPct}`,
        satPct: `${row.satPct}`,
      };
    }
  }, [score, test]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Test taken</span>
          <select
            value={test}
            onChange={(e) => {
              const t = e.target.value as Test;
              setTest(t);
              setScore(t === "act" ? "28" : "1310");
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="act">ACT composite (1&ndash;36)</option>
            <option value="sat">SAT total (400&ndash;1600)</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Your score</span>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            min={test === "act" ? 1 : 400}
            max={test === "act" ? 36 : 1600}
          />
        </label>
      </div>

      {result ? (
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Equivalent score</p>
          <p className="text-3xl font-bold text-brand tabular-nums">
            ACT {result.actRange} <span className="text-slate-400">&equiv;</span> SAT{" "}
            <span dangerouslySetInnerHTML={{ __html: result.satRange }} />
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-white border border-slate-200 px-3 py-2">
              <span className="text-slate-500">ACT percentile:</span>{" "}
              <span className="font-semibold text-slate-900">{result.actPct}th</span>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 px-3 py-2">
              <span className="text-slate-500">SAT percentile:</span>{" "}
              <span className="font-semibold text-slate-900">{result.satPct}th</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-red-600">Enter a valid score within the test&rsquo;s range.</p>
      )}

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <p className="px-4 py-2 text-xs uppercase tracking-wide font-semibold text-slate-500 bg-slate-50 border-b border-slate-200">
          Full concordance (ACT 18&ndash;36)
        </p>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-4 py-2">ACT</th>
              <th className="text-left px-4 py-2">SAT range</th>
              <th className="text-left px-4 py-2">ACT %ile</th>
              <th className="text-left px-4 py-2">SAT %ile</th>
            </tr>
          </thead>
          <tbody>
            {CONCORDANCE.map((r) => (
              <tr key={r.act} className="border-t border-slate-100">
                <td className="px-4 py-2 font-semibold text-slate-900">{r.act}</td>
                <td className="px-4 py-2 text-slate-700">
                  {r.satLow}&ndash;{r.satHigh}
                </td>
                <td className="px-4 py-2 text-slate-600">{r.actPct}</td>
                <td className="px-4 py-2 text-slate-600">{r.satPct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
