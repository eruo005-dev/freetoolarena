"use client";

import { useMemo, useState } from "react";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Parsed = {
  minute: number[];
  hour: number[];
  dom: number[];
  month: number[];
  dow: number[];
};

export function CronExpressionExplainer() {
  const [input, setInput] = useState("0 9 * * 1-5");

  const result = useMemo(() => explain(input), [input]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Cron expression (5 fields: min hour dom month dow)
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono"
        />
      </label>

      {result.error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
          <span className="text-xs uppercase tracking-wide font-semibold mb-1 block">
            Error
          </span>
          <p>{result.error}</p>
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Explanation
            </span>
            <p className="text-slate-900">{result.description}</p>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2 block">
              Next 5 firing times
            </span>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <tbody>
                  {result.nextRuns.map((t, i) => (
                    <tr key={i} className="even:bg-white odd:bg-slate-50">
                      <td className="px-3 py-2 text-slate-500 w-12">#{i + 1}</td>
                      <td className="px-3 py-2 font-mono text-slate-900">{t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function parseField(field: string, min: number, max: number): number[] {
  const out = new Set<number>();
  const parts = field.split(",");
  for (const part of parts) {
    const [rangePart, stepPart] = part.split("/");
    const step = stepPart ? parseInt(stepPart, 10) : 1;
    if (stepPart && (isNaN(step) || step < 1)) throw new Error(`Invalid step: ${part}`);

    let start: number, end: number;
    if (rangePart === "*") {
      start = min;
      end = max;
    } else if (rangePart.includes("-")) {
      const [a, b] = rangePart.split("-").map((s) => parseInt(s, 10));
      if (isNaN(a) || isNaN(b)) throw new Error(`Invalid range: ${rangePart}`);
      start = a;
      end = b;
    } else {
      const n = parseInt(rangePart, 10);
      if (isNaN(n)) throw new Error(`Invalid number: ${rangePart}`);
      start = n;
      end = stepPart ? max : n;
    }
    if (start < min || end > max || start > end) {
      throw new Error(`Value out of range ${min}-${max}: ${part}`);
    }
    for (let i = start; i <= end; i += step) out.add(i);
  }
  return Array.from(out).sort((a, b) => a - b);
}

function parseCron(input: string): Parsed {
  const trimmed = input.trim();
  const fields = trimmed.split(/\s+/);
  if (fields.length !== 5) throw new Error(`Expected 5 fields, got ${fields.length}`);
  return {
    minute: parseField(fields[0], 0, 59),
    hour: parseField(fields[1], 0, 23),
    dom: parseField(fields[2], 1, 31),
    month: parseField(fields[3], 1, 12),
    dow: parseField(fields[4].replace("7", "0"), 0, 6),
  };
}

function describeList(values: number[], full: number, names?: string[]): string {
  if (values.length === full) return "every";
  if (names) {
    const parts = values.map((v) => names[v]);
    return joinList(parts);
  }
  return joinList(values.map(String));
}

function joinList(arr: string[]): string {
  if (arr.length <= 1) return arr.join("");
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  return `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
}

function describeParsed(p: Parsed): string {
  const parts: string[] = [];
  const minAll = p.minute.length === 60;
  const hourAll = p.hour.length === 24;

  if (minAll && hourAll) {
    parts.push("Every minute");
  } else if (p.minute.length === 1 && !hourAll) {
    const times = p.hour.map((h) => `${String(h).padStart(2, "0")}:${String(p.minute[0]).padStart(2, "0")}`);
    parts.push(`At ${joinList(times)}`);
  } else if (minAll) {
    parts.push(`Every minute past ${describeList(p.hour, 24)} hours`);
  } else if (hourAll) {
    parts.push(`At minute ${describeList(p.minute, 60)} of every hour`);
  } else {
    parts.push(`At minute ${describeList(p.minute, 60)} past hour ${describeList(p.hour, 24)}`);
  }

  if (p.dow.length !== 7) {
    parts.push(`on ${describeList(p.dow, 7, DOW_NAMES)}`);
  }
  if (p.dom.length !== 31) {
    parts.push(`on day ${describeList(p.dom, 31)} of the month`);
  }
  if (p.month.length !== 12) {
    parts.push(`in ${describeList(p.month, 12, MONTH_NAMES)}`);
  }
  return parts.join(" ") + ".";
}

function matches(p: Parsed, d: Date): boolean {
  return (
    p.minute.includes(d.getMinutes()) &&
    p.hour.includes(d.getHours()) &&
    p.dom.includes(d.getDate()) &&
    p.month.includes(d.getMonth() + 1) &&
    p.dow.includes(d.getDay())
  );
}

function nextRuns(p: Parsed, count: number): string[] {
  const results: string[] = [];
  const d = new Date();
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);
  let safety = 0;
  const maxIter = 60 * 24 * 366 * 4;
  while (results.length < count && safety < maxIter) {
    if (matches(p, d)) {
      results.push(d.toLocaleString());
    }
    d.setMinutes(d.getMinutes() + 1);
    safety++;
  }
  return results;
}

function explain(input: string): { description: string; nextRuns: string[]; error?: string } {
  try {
    const p = parseCron(input);
    return {
      description: describeParsed(p),
      nextRuns: nextRuns(p, 5),
    };
  } catch (e) {
    return { description: "", nextRuns: [], error: (e as Error).message };
  }
}
