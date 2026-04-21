"use client";

import { useState } from "react";

const SIDES = [4, 6, 8, 10, 12, 20, 100];

export function DiceRoller() {
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(2);
  const [rolls, setRolls] = useState<number[]>([]);

  function roll() {
    const bytes = new Uint32Array(count);
    crypto.getRandomValues(bytes);
    const out = Array.from(bytes, (b) => (b % sides) + 1);
    setRolls(out);
  }

  const total = rolls.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Sides per die</p>
        <div className="flex flex-wrap gap-2">
          {SIDES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSides(s)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                sides === s ? "bg-brand text-white" : "border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              d{s}
            </button>
          ))}
        </div>
      </div>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Number of dice</span>
        <input
          type="number"
          min={1}
          max={20}
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 1)))}
          className="w-24 rounded-lg border border-slate-300 px-3 py-2"
        />
      </label>
      <button
        type="button"
        onClick={roll}
        className="bg-brand text-white font-semibold rounded-lg px-6 py-2 text-sm hover:bg-brand-dark"
      >
        Roll {count}d{sides}
      </button>
      {rolls.length > 0 && (
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Result</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {rolls.map((r, i) => (
              <span
                key={i}
                className="w-10 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center font-bold tabular-nums text-slate-900"
              >
                {r}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-700">
            Total: <span className="text-2xl font-bold text-brand">{total}</span>
            {rolls.length > 1 && (
              <span className="text-slate-500">
                {" "}
                · min {Math.min(...rolls)} · max {Math.max(...rolls)} · avg {(total / rolls.length).toFixed(1)}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
