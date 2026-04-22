"use client";

import { useMemo, useState } from "react";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function parseNum(s: string): number | null {
  if (s.trim() === "") return null;
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : null;
}

function fmt(n: number, decimals = 6): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toFixed(decimals)).toString();
}

export interface RatioCalculatorProps {
  initialMode?: "simplify" | "proportion";
  initialA?: string;
  initialB?: string;
  initialC?: string;
  initialD?: string;
}

export function RatioCalculator({
  initialMode = "simplify",
  initialA = "12",
  initialB = "18",
  initialC = "",
  initialD = "",
}: RatioCalculatorProps = {}) {
  const [mode, setMode] = useState<"simplify" | "proportion">(initialMode);
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);
  const [c, setC] = useState(initialC);
  const [d, setD] = useState(initialD);

  const simplifyResult = useMemo(() => {
    const av = parseNum(a);
    const bv = parseNum(b);
    if (av === null || bv === null) return null;
    if (bv === 0) return { error: "Second term cannot be zero." };

    // Scale to integers if inputs are decimals
    const scale = (x: number) => {
      const s = x.toString();
      const dot = s.indexOf(".");
      return dot === -1 ? 0 : s.length - dot - 1;
    };
    const mul = Math.pow(10, Math.max(scale(av), scale(bv)));
    const ai = Math.round(av * mul);
    const bi = Math.round(bv * mul);
    const g = gcd(ai, bi) || 1;
    const ra = ai / g;
    const rb = bi / g;
    const decimal = av / bv;
    const percent = decimal * 100;

    return { ra, rb, decimal, percent };
  }, [a, b]);

  const proportionResult = useMemo(() => {
    const vals = [a, b, c, d];
    const blanks = vals.map((v) => v.trim() === "");
    const blankCount = blanks.filter(Boolean).length;
    if (blankCount !== 1) {
      return { error: "Leave exactly one field blank to solve." };
    }
    const nums = vals.map((v) => (v.trim() === "" ? null : parseNum(v)));
    if (nums.some((n, i) => !blanks[i] && n === null)) return { error: "Invalid number." };

    const [A, B, C, D] = nums;
    // A/B = C/D → A*D = B*C
    let unknown: "A" | "B" | "C" | "D";
    let value: number;
    if (A === null) {
      if (D === 0) return { error: "Cannot solve (division by zero)." };
      value = (B! * C!) / D!;
      unknown = "A";
    } else if (B === null) {
      if (C === 0) return { error: "Cannot solve (division by zero)." };
      value = (A * D!) / C!;
      unknown = "B";
    } else if (C === null) {
      if (B === 0) return { error: "Cannot solve (division by zero)." };
      value = (A * D!) / B;
      unknown = "C";
    } else {
      if (A === 0) return { error: "Cannot solve (division by zero)." };
      value = (B! * C!) / A;
      unknown = "D";
    }

    const fA = unknown === "A" ? value : A!;
    const fB = unknown === "B" ? value : B!;
    const fC = unknown === "C" ? value : C!;
    const fD = unknown === "D" ? value : D!;
    const decimal = fB !== 0 ? fA / fB : NaN;
    const percent = decimal * 100;

    return { unknown, value, fA, fB, fC, fD, decimal, percent };
  }, [a, b, c, d]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("simplify")}
          className={`flex-1 rounded-lg px-3 py-2 font-semibold border ${
            mode === "simplify"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          Simplify ratio
        </button>
        <button
          type="button"
          onClick={() => setMode("proportion")}
          className={`flex-1 rounded-lg px-3 py-2 font-semibold border ${
            mode === "proportion"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          Solve proportion
        </button>
      </div>

      {mode === "simplify" ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">A</span>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">B</span>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
          </div>

          {!simplifyResult ? (
            <p className="text-sm text-rose-600">Enter two numbers.</p>
          ) : "error" in simplifyResult ? (
            <p className="text-sm text-rose-600">{simplifyResult.error}</p>
          ) : (
            <div className="rounded-xl bg-slate-50 p-5 space-y-3">
              <div className="text-center">
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                  Simplified ratio
                </p>
                <p className="text-3xl font-bold text-brand tabular-nums">
                  {simplifyResult.ra} : {simplifyResult.rb}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Stat label="Decimal (A/B)" value={fmt(simplifyResult.decimal)} />
                <Stat label="Percentage" value={`${fmt(simplifyResult.percent, 4)}%`} />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="text-sm text-slate-600">
            Solve A : B = C : D — leave exactly one field blank.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">A</span>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="?"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">B</span>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="?"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">C</span>
              <input
                type="number"
                value={c}
                onChange={(e) => setC(e.target.value)}
                placeholder="?"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">D</span>
              <input
                type="number"
                value={d}
                onChange={(e) => setD(e.target.value)}
                placeholder="?"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
          </div>

          {"error" in proportionResult ? (
            <p className="text-sm text-rose-600">{proportionResult.error}</p>
          ) : (
            <div className="rounded-xl bg-slate-50 p-5 space-y-3">
              <div className="text-center">
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                  {proportionResult.unknown} =
                </p>
                <p className="text-3xl font-bold text-brand tabular-nums">
                  {fmt(proportionResult.value)}
                </p>
                <p className="text-sm text-slate-600 mt-2 tabular-nums">
                  {fmt(proportionResult.fA)} : {fmt(proportionResult.fB)} = {fmt(proportionResult.fC)} :{" "}
                  {fmt(proportionResult.fD)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Stat label="Decimal (A/B)" value={fmt(proportionResult.decimal)} />
                <Stat label="Percentage" value={`${fmt(proportionResult.percent, 4)}%`} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">{label}</p>
      <p className="text-lg font-bold text-slate-900 tabular-nums break-words">{value}</p>
    </div>
  );
}
