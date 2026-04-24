"use client";

import { useMemo, useState } from "react";

type Freq = "daily" | "weekly";

type Entry = {
  name: string;
  dose: string;
  freqTimesPerWeek: number;
  pricePerDose: number;
  raw: string;
};

const STAPLES = [
  "creatine",
  "omega-3",
  "omega 3",
  "fish oil",
  "vitamin d",
  "magnesium",
  "b complex",
  "b-complex",
  "zinc",
  "nac",
  "ashwagandha",
  "rhodiola",
];

const CONTROVERSIAL: Array<{ keyword: string; warning: string }> = [
  {
    keyword: "melatonin",
    warning:
      "Chronic nightly use is debated &mdash; most sleep researchers recommend short-term only and low doses (0.3&ndash;1mg).",
  },
  {
    keyword: "nmn",
    warning:
      "NMN regulatory status changed in 2024 (FDA NDI ruling) &mdash; purity and legality vary by supplier.",
  },
];

const DEFAULT = [
  "Creatine 5g daily $0.25",
  "Omega-3 2g daily $0.35",
  "Vitamin D3 5000IU daily $0.10",
  "Magnesium glycinate 400mg daily $0.20",
  "B complex 1 cap 3x/week $0.15",
  "Ashwagandha 600mg daily $0.30",
  "Melatonin 0.5mg daily $0.05",
];

function parseLine(line: string): Entry | null {
  const raw = line.trim();
  if (!raw) return null;

  const priceMatch = raw.match(/\$\s*(\d+(?:\.\d+)?)/);
  const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

  let timesPerWeek = 7; // default daily
  const nxMatch = raw.match(/(\d+)\s*x\s*\/\s*(?:week|wk)/i);
  if (nxMatch) timesPerWeek = parseInt(nxMatch[1], 10);
  else if (/weekly/i.test(raw)) timesPerWeek = 1;
  else if (/every\s*other\s*day/i.test(raw)) timesPerWeek = 3.5;
  else if (/daily/i.test(raw)) timesPerWeek = 7;

  const doseMatch = raw.match(/\d+(?:\.\d+)?\s*(?:mg|g|mcg|iu|cap|caps|tabs?)/i);
  const dose = doseMatch ? doseMatch[0] : "";

  const nameRaw = raw
    .replace(/\$\s*\d+(?:\.\d+)?/, "")
    .replace(/\d+\s*x\s*\/\s*(?:week|wk)/i, "")
    .replace(/daily|weekly|every\s*other\s*day/gi, "")
    .replace(/\d+(?:\.\d+)?\s*(?:mg|g|mcg|iu|cap|caps|tabs?)/i, "")
    .trim();
  const name = nameRaw || "Unnamed";

  return { name, dose, freqTimesPerWeek: timesPerWeek, pricePerDose: price, raw };
}

export function BiohackingSupplementTracker() {
  const [text, setText] = useState<string>(DEFAULT.join("\n"));

  const result = useMemo(() => {
    const lines = text.split("\n");
    const entries = lines
      .map(parseLine)
      .filter((e): e is Entry => e !== null && Number.isFinite(e.pricePerDose));

    const withMonthly = entries.map((e) => {
      const dosesPerMonth = (e.freqTimesPerWeek * 52) / 12;
      const monthly = e.pricePerDose * dosesPerMonth;
      return { ...e, monthly };
    });

    const totalMonthly = withMonthly.reduce((s, e) => s + e.monthly, 0);
    const yearly = totalMonthly * 12;
    const sorted = [...withMonthly].sort((a, b) => b.monthly - a.monthly);

    const flags: string[] = [];
    if (entries.length > 8) {
      flags.push(
        `Stack size is ${entries.length}: consider reviewing overlaps &mdash; most biohackers who audit their stack cut 2&ndash;3 items without losing results.`,
      );
    }

    const haveB = entries.some((e) => /b[\s-]?complex|b6|b12/i.test(e.raw));
    const haveMg = entries.some((e) => /magnesium/i.test(e.raw));
    if (haveB && haveMg) {
      flags.push(
        "High-dose B6 + magnesium can sometimes be flagged at physicals (B6 neuropathy risk above 100mg/day chronic). Verify your B-complex B6 content.",
      );
    }

    const controversial = CONTROVERSIAL.flatMap((c) =>
      entries.some((e) => e.raw.toLowerCase().includes(c.keyword))
        ? [{ name: c.keyword, warning: c.warning }]
        : [],
    );

    const staples = entries.filter((e) =>
      STAPLES.some((s) => e.raw.toLowerCase().includes(s)),
    );

    return {
      entries: sorted,
      totalMonthly,
      yearly,
      complexity: entries.length,
      flags,
      controversial,
      staples,
    };
  }, [text]);

  const fmt = (n: number) =>
    "$" +
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">
          Your stack (one supplement per line)
        </span>
        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-xs"
          placeholder="Creatine 5g daily $0.25"
        />
        <span className="mt-1 block text-xs text-slate-500">
          Format: <code>Name dose frequency $price-per-dose</code> &mdash; e.g.{" "}
          <code>Vitamin D3 5000IU 3x/week $0.10</code>
        </span>
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Monthly cost</div>
          <div className="text-2xl font-bold text-brand">{fmt(result.totalMonthly)}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Yearly cost</div>
          <div className="text-2xl font-bold text-slate-800">{fmt(result.yearly)}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Stack complexity</div>
          <div className="text-2xl font-bold text-slate-800">{result.complexity}</div>
          <div className="text-xs text-slate-500">
            {result.complexity <= 4
              ? "Lean"
              : result.complexity <= 8
                ? "Moderate"
                : "Heavy &mdash; review"}
          </div>
        </div>
      </div>

      {result.entries.length > 0 && (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h4 className="mb-2 text-sm font-semibold text-slate-700">By monthly cost</h4>
          <ul className="divide-y divide-slate-100 text-sm text-slate-700">
            {result.entries.map((e, i) => (
              <li key={`${e.name}-${i}`} className="flex justify-between py-2">
                <span>
                  <span className="font-medium">{e.name}</span>
                  {e.dose && <span className="ml-1 text-xs text-slate-500">{e.dose}</span>}
                </span>
                <span className="font-medium">{fmt(e.monthly)}/mo</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.staples.length > 0 && (
        <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
          <strong>Evidence-backed staples detected:</strong>{" "}
          {result.staples.map((s) => s.name).join(", ")}. These have the strongest evidence for
          healthy adults.
        </div>
      )}

      {result.flags.map((f, i) => (
        <div
          key={i}
          className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900"
          dangerouslySetInnerHTML={{ __html: `<strong>Heads-up:</strong> ${f}` }}
        />
      ))}

      {result.controversial.map((c) => (
        <div
          key={c.name}
          className="rounded border border-rose-200 bg-rose-50 p-3 text-xs text-rose-900"
          dangerouslySetInnerHTML={{
            __html: `<strong>${c.name}:</strong> ${c.warning}`,
          }}
        />
      ))}
    </div>
  );
}
