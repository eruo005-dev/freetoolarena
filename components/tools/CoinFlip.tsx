"use client";

import { useState } from "react";

type Result = "Heads" | "Tails" | null;

export function CoinFlip() {
  const [result, setResult] = useState<Result>(null);
  const [flipping, setFlipping] = useState(false);
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);

  function flip() {
    setFlipping(true);
    setTimeout(() => {
      const r: Result = Math.random() < 0.5 ? "Heads" : "Tails";
      setResult(r);
      if (r === "Heads") setHeads((n) => n + 1);
      else setTails((n) => n + 1);
      setFlipping(false);
    }, 600);
  }

  function reset() {
    setHeads(0);
    setTails(0);
    setResult(null);
  }

  const total = heads + tails;
  const pctH = total ? Math.round((heads / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <div
          className={`h-40 w-40 rounded-full border-4 border-brand bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-3xl font-bold text-slate-900 transition-transform duration-500 ${
            flipping ? "animate-spin" : ""
          }`}
        >
          {flipping ? "…" : result ?? "?"}
        </div>
        <p className="mt-3 text-xs uppercase tracking-wide text-slate-500 font-semibold">
          {flipping ? "Flipping…" : result ? `You got ${result}` : "Tap to flip"}
        </p>
      </div>
      <div className="flex items-center gap-2 justify-center">
        <button
          type="button"
          onClick={flip}
          disabled={flipping}
          className="bg-brand text-white font-semibold rounded-lg px-6 py-2 text-sm hover:bg-brand-dark disabled:opacity-50"
        >
          Flip
        </button>
        <button
          type="button"
          onClick={reset}
          className="border border-slate-300 text-slate-700 rounded-lg px-4 py-2 text-sm hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Heads" value={heads} />
        <Stat label="Tails" value={tails} />
        <Stat label="Total" value={total} />
      </div>
      {total > 0 && (
        <div>
          <p className="text-sm text-slate-600 mb-1">
            Heads: <span className="font-semibold">{pctH}%</span> · Tails: <span className="font-semibold">{100 - pctH}%</span>
          </p>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-brand" style={{ width: `${pctH}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900 tabular-nums">{value}</p>
    </div>
  );
}
