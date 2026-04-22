"use client";

import { useState } from "react";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const AMBIGUOUS = new Set(["O", "0", "I", "1", "l"]);

type Mode = "upper" | "lower" | "mixed";

function buildPool(mode: Mode, avoidAmbig: boolean): string {
  let pool = "";
  if (mode === "upper") pool = UPPER;
  else if (mode === "lower") pool = LOWER;
  else pool = UPPER + LOWER;
  if (avoidAmbig) {
    pool = [...pool].filter((c) => !AMBIGUOUS.has(c)).join("");
  }
  return pool;
}

export function RandomLetterGenerator() {
  const [count, setCount] = useState(20);
  const [mode, setMode] = useState<Mode>("mixed");
  const [avoidAmbig, setAvoidAmbig] = useState(false);
  const [result, setResult] = useState("");

  const generate = () => {
    const pool = buildPool(mode, avoidAmbig);
    if (!pool) {
      setResult("");
      return;
    }
    const n = Math.max(1, Math.min(200, Math.floor(count)));
    let out = "";
    for (let i = 0; i < n; i++) {
      out += pool[Math.floor(Math.random() * pool.length)];
    }
    setResult(out);
  };

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 mb-1 block">Count (1-200)</span>
          <input
            type="number"
            min={1}
            max={200}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 mb-1 block">Case</span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="upper">Uppercase</option>
            <option value="lower">Lowercase</option>
            <option value="mixed">Mixed</option>
          </select>
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={avoidAmbig}
          onChange={(e) => setAvoidAmbig(e.target.checked)}
        />
        Avoid ambiguous characters (O, 0, I, 1, l)
      </label>

      <button
        type="button"
        onClick={generate}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
      >
        Generate
      </button>

      {result && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <p className="font-mono text-lg break-all">{result}</p>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(result)}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark text-sm"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
