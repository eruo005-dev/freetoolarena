"use client";

import { useMemo, useState } from "react";

const SUPERSCRIPT: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

function sup(n: number): string {
  return String(n)
    .split("")
    .map((ch) => SUPERSCRIPT[ch] ?? ch)
    .join("");
}

function isPrime(n: number): boolean {
  if (!Number.isFinite(n)) return false;
  if (n < 2) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function factorize(n: number): Map<number, number> {
  const out = new Map<number, number>();
  if (n < 2) return out;
  let x = n;
  const add = (p: number) => out.set(p, (out.get(p) || 0) + 1);
  while (x % 2 === 0) {
    add(2);
    x /= 2;
  }
  while (x % 3 === 0) {
    add(3);
    x /= 3;
  }
  for (let i = 5; i * i <= x; i += 6) {
    while (x % i === 0) {
      add(i);
      x /= i;
    }
    while (x % (i + 2) === 0) {
      add(i + 2);
      x /= i + 2;
    }
  }
  if (x > 1) add(x);
  return out;
}

function divisors(n: number): number[] {
  if (n < 1) return [];
  const out: number[] = [];
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 1; i <= limit; i++) {
    if (n % i === 0) {
      out.push(i);
      if (i !== n / i) out.push(n / i);
    }
  }
  return out.sort((a, b) => a - b);
}

function nextPrime(n: number): number | null {
  let x = Math.floor(n) + 1;
  for (let i = 0; i < 10_000_000; i++) {
    if (isPrime(x)) return x;
    x++;
  }
  return null;
}

function prevPrime(n: number): number | null {
  let x = Math.floor(n) - 1;
  while (x >= 2) {
    if (isPrime(x)) return x;
    x--;
  }
  return null;
}

export interface PrimeNumberCheckerProps {
  initialNumber?: string;
}

const MAX_N = 1e12;

export function PrimeNumberChecker({ initialNumber = "60" }: PrimeNumberCheckerProps = {}) {
  const [input, setInput] = useState(initialNumber);

  const result = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return null;
    if (!/^-?\d+$/.test(trimmed)) return { error: "Enter a whole number (integer)." };
    const n = Number(trimmed);
    if (!Number.isFinite(n)) return { error: "Number is too large." };
    if (n < 0) return { error: "Enter a non-negative integer." };
    if (n > MAX_N) return { error: `Number too large (max ${MAX_N.toExponential()}).` };
    if (!Number.isInteger(n)) return { error: "Enter a whole number (integer)." };

    const prime = isPrime(n);
    const factors = factorize(n);
    const divs = n <= 1e7 ? divisors(n) : null; // avoid listing huge divisor arrays
    const np = n < MAX_N ? nextPrime(n) : null;
    const pp = n > 2 ? prevPrime(n) : null;

    const factorString =
      n < 2
        ? "—"
        : Array.from(factors.entries())
            .map(([p, k]) => (k === 1 ? `${p}` : `${p}${sup(k)}`))
            .join(" × ");

    return { n, prime, factorString, divs, np, pp };
  }, [input]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Number</span>
        <input
          type="text"
          inputMode="numeric"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 60"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      {!result ? (
        <p className="text-sm text-slate-500">Enter a positive integer.</p>
      ) : "error" in result ? (
        <p className="text-sm text-rose-600">{result.error}</p>
      ) : (
        <>
          <div className="rounded-xl bg-slate-50 p-5 text-center">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
              {result.n.toLocaleString()} is
            </p>
            <p className={`text-3xl font-bold ${result.prime ? "text-emerald-600" : "text-brand"}`}>
              {result.prime ? "Prime" : "Not prime"}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                Prime factorization
              </p>
              <p className="text-lg font-bold text-slate-900 break-words">
                {result.n < 2 ? "—" : `${result.n} = ${result.factorString}`}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Divisors</p>
              {result.divs ? (
                <p className="text-sm font-mono text-slate-900 break-words">
                  {result.divs.length ? result.divs.join(", ") : "—"}{" "}
                  <span className="text-slate-500">({result.divs.length} total)</span>
                </p>
              ) : (
                <p className="text-sm text-slate-500">
                  Too large to list — divisor count would require extensive computation.
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Stat label="Previous prime" value={result.pp !== null ? result.pp.toLocaleString() : "—"} />
            <Stat label="Next prime" value={result.np !== null ? result.np.toLocaleString() : "—"} />
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">{label}</p>
      <p className="text-lg font-bold text-slate-900 tabular-nums">{value}</p>
    </div>
  );
}
