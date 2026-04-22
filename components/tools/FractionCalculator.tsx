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

type Op = "+" | "−" | "×" | "÷";

export interface FractionCalculatorProps {
  initialN1?: string;
  initialD1?: string;
  initialN2?: string;
  initialD2?: string;
  initialOp?: Op;
}

export function FractionCalculator({
  initialN1 = "1",
  initialD1 = "2",
  initialN2 = "1",
  initialD2 = "3",
  initialOp = "+",
}: FractionCalculatorProps = {}) {
  const [n1, setN1] = useState(initialN1);
  const [d1, setD1] = useState(initialD1);
  const [op, setOp] = useState<Op>(initialOp);
  const [n2, setN2] = useState(initialN2);
  const [d2, setD2] = useState(initialD2);

  const result = useMemo(() => {
    const a = parseInt(n1, 10);
    const b = parseInt(d1, 10);
    const c = parseInt(n2, 10);
    const d = parseInt(d2, 10);
    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c) || !Number.isFinite(d)) return null;
    if (b === 0 || d === 0) return { error: "Denominator cannot be zero." };

    let num = 0;
    let den = 1;
    if (op === "+") {
      num = a * d + c * b;
      den = b * d;
    } else if (op === "−") {
      num = a * d - c * b;
      den = b * d;
    } else if (op === "×") {
      num = a * c;
      den = b * d;
    } else {
      if (c === 0) return { error: "Cannot divide by zero." };
      num = a * d;
      den = b * c;
    }

    if (den < 0) {
      num = -num;
      den = -den;
    }

    const g = gcd(num, den) || 1;
    const rn = num / g;
    const rd = den / g;
    const decimal = rd === 0 ? NaN : rn / rd;

    // Mixed number
    const absNum = Math.abs(rn);
    const whole = Math.floor(absNum / rd);
    const remainder = absNum - whole * rd;
    const sign = rn < 0 ? "-" : "";
    let mixed: string;
    if (rd === 1) {
      mixed = `${rn}`;
    } else if (whole === 0) {
      mixed = `${rn}/${rd}`;
    } else if (remainder === 0) {
      mixed = `${sign}${whole}`;
    } else {
      mixed = `${sign}${whole} ${remainder}/${rd}`;
    }

    return { rn, rd, decimal, mixed };
  }, [n1, d1, op, n2, d2]);

  const ops: Op[] = ["+", "−", "×", "÷"];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end gap-3 justify-center">
        <div className="flex flex-col items-center">
          <input
            type="number"
            value={n1}
            onChange={(e) => setN1(e.target.value)}
            className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            aria-label="Numerator 1"
          />
          <div className="w-20 border-t border-slate-400 my-1" />
          <input
            type="number"
            value={d1}
            onChange={(e) => setD1(e.target.value)}
            className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            aria-label="Denominator 1"
          />
        </div>

        <div className="flex gap-1 pb-1">
          {ops.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOp(o)}
              className={`rounded-lg px-3 py-2 font-semibold border ${
                op === o
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
              aria-pressed={op === o}
            >
              {o}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <input
            type="number"
            value={n2}
            onChange={(e) => setN2(e.target.value)}
            className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            aria-label="Numerator 2"
          />
          <div className="w-20 border-t border-slate-400 my-1" />
          <input
            type="number"
            value={d2}
            onChange={(e) => setD2(e.target.value)}
            className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            aria-label="Denominator 2"
          />
        </div>
      </div>

      {!result ? (
        <p className="text-sm text-rose-600">Enter valid integer values for all fields.</p>
      ) : "error" in result ? (
        <p className="text-sm text-rose-600">{result.error}</p>
      ) : (
        <div className="rounded-xl bg-slate-50 p-5 space-y-3">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Result (reduced)</p>
            <p className="text-3xl font-bold text-brand tabular-nums">
              {result.rd === 1 ? `${result.rn}` : `${result.rn} / ${result.rd}`}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-lg bg-white border border-slate-200 px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Mixed number</p>
              <p className="text-lg font-bold text-slate-900 tabular-nums">{result.mixed}</p>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Decimal</p>
              <p className="text-lg font-bold text-slate-900 tabular-nums">
                {Number.isFinite(result.decimal)
                  ? parseFloat(result.decimal.toFixed(10)).toString()
                  : "—"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
