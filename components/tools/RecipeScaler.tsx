"use client";

import { useMemo, useState } from "react";

const UNICODE_FRACTIONS: Record<string, number> = {
  "½": 0.5,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
  "¼": 0.25,
  "¾": 0.75,
  "⅕": 0.2,
  "⅖": 0.4,
  "⅗": 0.6,
  "⅘": 0.8,
  "⅙": 1 / 6,
  "⅚": 5 / 6,
  "⅛": 0.125,
  "⅜": 0.375,
  "⅝": 0.625,
  "⅞": 0.875,
};

// Try to parse a leading amount: "1 1/2", "1/2", "2.5", "2", "1½", "½"
function parseAmount(raw: string): { amount: number; rest: string } | null {
  const s = raw.trim();
  if (!s) return null;

  // leading unicode fraction alone or combined
  const mixedUni = /^(\d+)\s*([½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])\s*(.*)$/.exec(s);
  if (mixedUni) {
    return { amount: parseInt(mixedUni[1], 10) + UNICODE_FRACTIONS[mixedUni[2]], rest: mixedUni[3] };
  }
  const uni = /^([½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])\s*(.*)$/.exec(s);
  if (uni) {
    return { amount: UNICODE_FRACTIONS[uni[1]], rest: uni[2] };
  }

  // "1 1/2 rest"
  const mixed = /^(\d+)\s+(\d+)\s*\/\s*(\d+)\s*(.*)$/.exec(s);
  if (mixed) {
    return {
      amount: parseInt(mixed[1], 10) + parseInt(mixed[2], 10) / parseInt(mixed[3], 10),
      rest: mixed[4],
    };
  }
  // "1/2 rest"
  const frac = /^(\d+)\s*\/\s*(\d+)\s*(.*)$/.exec(s);
  if (frac) {
    return { amount: parseInt(frac[1], 10) / parseInt(frac[2], 10), rest: frac[3] };
  }
  // "1.5 rest" or "2 rest"
  const num = /^(\d+(?:\.\d+)?)\s*(.*)$/.exec(s);
  if (num) {
    return { amount: parseFloat(num[1]), rest: num[2] };
  }
  return null;
}

function formatAmount(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "0";
  const whole = Math.floor(n);
  const frac = n - whole;
  if (frac < 0.02) return whole.toString();

  // nearest common fraction
  const commons: [number, string][] = [
    [1 / 8, "1/8"],
    [1 / 6, "1/6"],
    [1 / 4, "1/4"],
    [1 / 3, "1/3"],
    [3 / 8, "3/8"],
    [1 / 2, "1/2"],
    [5 / 8, "5/8"],
    [2 / 3, "2/3"],
    [3 / 4, "3/4"],
    [5 / 6, "5/6"],
    [7 / 8, "7/8"],
  ];
  let best = commons[0];
  let bestDiff = Math.abs(frac - best[0]);
  for (const c of commons) {
    const d = Math.abs(frac - c[0]);
    if (d < bestDiff) {
      bestDiff = d;
      best = c;
    }
  }
  if (bestDiff > 0.04) {
    // not close to a clean fraction → decimal
    return (Math.round(n * 100) / 100).toString();
  }
  if (whole === 0) return best[1];
  return `${whole} ${best[1]}`;
}

export function RecipeScaler() {
  const [raw, setRaw] = useState(
    "2 cups flour\n1 cup sugar\n1/2 tsp salt\n3 eggs\n1 1/2 cups milk",
  );
  const [origServings, setOrigServings] = useState("4");
  const [newServings, setNewServings] = useState("6");
  const [copied, setCopied] = useState(false);

  const scaled = useMemo(() => {
    const orig = parseFloat(origServings) || 0;
    const dest = parseFloat(newServings) || 0;
    if (orig <= 0 || dest <= 0) return [];
    const ratio = dest / orig;
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parsed = parseAmount(line);
        if (!parsed) return { line, scaled: line };
        const newAmount = parsed.amount * ratio;
        return { line, scaled: `${formatAmount(newAmount)} ${parsed.rest}`.trim() };
      });
  }, [raw, origServings, newServings]);

  const text = scaled.map((s) => s.scaled).join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Ingredients (one per line)</span>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={8}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Original servings</span>
          <input
            type="number"
            inputMode="decimal"
            min={1}
            value={origServings}
            onChange={(e) => setOrigServings(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Desired servings</span>
          <input
            type="number"
            inputMode="decimal"
            min={1}
            value={newServings}
            onChange={(e) => setNewServings(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>
      <div className="rounded-xl bg-slate-50 p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Scaled recipe
          </p>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {scaled.length === 0 ? (
          <p className="text-sm text-slate-500">Enter servings to scale.</p>
        ) : (
          <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
            {scaled.map((s, i) => (
              <li key={i} className="px-4 py-2 text-sm font-mono text-slate-800">
                {s.scaled}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
