"use client";

import { useState } from "react";

type RollDetail = {
  expression: string;
  rolls: number[];
  kept: number[];
  dropped: number[];
  exploded: number[];
  modifier: number;
  total: number;
  mean: number;
  variance: number;
  notes: string[];
};

function rollDie(sides: number) {
  return Math.floor(Math.random() * sides) + 1;
}

function parseAndRoll(expr: string): RollDetail | { error: string; expression: string } {
  const raw = expr.trim();
  // Match: NdS optionally followed by kh1/kl1, !S, then +K or -K
  // Allow an optional modifier at end
  const m = raw.match(
    /^(\d+)d(\d+)(kh(\d+)|kl(\d+))?(!)?\s*([+-]\s*\d+)?$/i,
  );
  if (!m) return { error: `Unrecognized expression: ${raw}`, expression: raw };

  const count = parseInt(m[1], 10);
  const sides = parseInt(m[2], 10);
  const kh = m[4] ? parseInt(m[4], 10) : 0;
  const kl = m[5] ? parseInt(m[5], 10) : 0;
  const explode = Boolean(m[6]);
  const modifier = m[7] ? parseInt(m[7].replace(/\s+/g, ""), 10) : 0;

  if (count <= 0 || count > 200) {
    return { error: "Dice count must be 1-200", expression: raw };
  }
  if (sides < 2 || sides > 1000) {
    return { error: "Die must have 2-1000 sides", expression: raw };
  }

  const rolls: number[] = [];
  const exploded: number[] = [];

  for (let i = 0; i < count; i++) {
    const r = rollDie(sides);
    rolls.push(r);
    if (explode && r === sides) {
      let next = rollDie(sides);
      let safety = 0;
      while (true) {
        exploded.push(next);
        if (next !== sides || safety > 50) break;
        next = rollDie(sides);
        safety++;
      }
    }
  }

  const all = [...rolls, ...exploded];
  let kept = [...all];
  let dropped: number[] = [];

  if (kh > 0) {
    const sorted = [...all].map((v, i) => ({ v, i })).sort((a, b) => b.v - a.v);
    const keepIdx = new Set(sorted.slice(0, kh).map((x) => x.i));
    kept = [];
    dropped = [];
    all.forEach((v, i) => {
      if (keepIdx.has(i)) kept.push(v);
      else dropped.push(v);
    });
  } else if (kl > 0) {
    const sorted = [...all].map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v);
    const keepIdx = new Set(sorted.slice(0, kl).map((x) => x.i));
    kept = [];
    dropped = [];
    all.forEach((v, i) => {
      if (keepIdx.has(i)) kept.push(v);
      else dropped.push(v);
    });
  }

  const sum = kept.reduce((a, b) => a + b, 0);
  const total = sum + modifier;

  // Expected value of a single die = (sides+1)/2
  // Variance = (sides^2 - 1)/12
  const effectiveCount = kh > 0 ? kh : kl > 0 ? kl : count;
  const dieMean = (sides + 1) / 2;
  const dieVar = (sides * sides - 1) / 12;
  const mean = effectiveCount * dieMean + modifier;
  const variance = effectiveCount * dieVar;

  const notes: string[] = [];
  if (kh > 0) notes.push(`keep highest ${kh}`);
  if (kl > 0) notes.push(`keep lowest ${kl}`);
  if (explode) notes.push(`exploding on ${sides}`);
  if (modifier !== 0) notes.push(`modifier ${modifier > 0 ? "+" : ""}${modifier}`);

  return {
    expression: raw,
    rolls,
    kept,
    dropped,
    exploded,
    modifier,
    total,
    mean,
    variance,
    notes,
  };
}

export function DiceNotationRoller() {
  const [input, setInput] = useState("4d6+2, 2d20kh1, 3d6!");
  const [results, setResults] = useState<Array<RollDetail | { error: string; expression: string }>>(
    [],
  );
  const [history, setHistory] = useState<string[]>([]);

  const roll = () => {
    const parts = input
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    const out = parts.map(parseAndRoll);
    setResults(out);
    const summary = out
      .map((r) =>
        "error" in r ? `${r.expression}: error` : `${r.expression} = ${r.total}`,
      )
      .join("; ");
    setHistory((prev) => [summary, ...prev].slice(0, 5));
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="block text-sm">
          <span className="text-slate-700">
            Dice notation (comma-separate multiple)
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 4d6+2, 2d20kh1, 3d6!"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-brand focus:outline-none"
          />
        </label>
        <p className="text-xs text-slate-500">
          Supports <code>NdS</code>, <code>+K</code>/<code>-K</code>,{" "}
          <code>kh1</code>/<code>kl1</code> (advantage/disadvantage),{" "}
          <code>!</code> (explode on max).
        </p>

        <div className="flex gap-2">
          <button
            onClick={roll}
            className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-dark"
          >
            Generate
          </button>
          <button
            onClick={roll}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Roll again
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((r, i) =>
            "error" in r ? (
              <div
                key={i}
                className="rounded-xl bg-rose-50 p-4 font-mono text-sm text-rose-700"
              >
                <div className="font-semibold">{r.expression}</div>
                <div>{r.error}</div>
              </div>
            ) : (
              <div key={i} className="rounded-xl bg-slate-50 p-4 font-mono">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-800">
                    {r.expression}
                  </span>
                  <span className="text-2xl font-bold text-brand">
                    {r.total}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-500">Rolls:</span>{" "}
                    [{r.rolls.join(", ")}]
                  </div>
                  {r.exploded.length > 0 && (
                    <div>
                      <span className="text-slate-500">Exploded:</span>{" "}
                      [{r.exploded.join(", ")}]
                    </div>
                  )}
                  {r.dropped.length > 0 && (
                    <div>
                      <span className="text-slate-500">Dropped:</span>{" "}
                      [{r.dropped.join(", ")}]
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500">Kept:</span>{" "}
                    [{r.kept.join(", ")}]
                  </div>
                  {r.notes.length > 0 && (
                    <div>
                      <span className="text-slate-500">Ops:</span>{" "}
                      {r.notes.join(", ")}
                    </div>
                  )}
                  <div className="pt-1 text-slate-500">
                    Expected {r.mean.toFixed(2)} &middot; variance{" "}
                    {r.variance.toFixed(2)} &middot; sd{" "}
                    {Math.sqrt(r.variance).toFixed(2)}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      )}

      {history.length > 0 && (
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Last 5 rolls
          </p>
          <ul className="space-y-1 text-xs font-mono text-slate-600">
            {history.map((h, i) => (
              <li key={i} className="truncate">
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
