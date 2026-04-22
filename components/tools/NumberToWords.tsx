"use client";

import { useMemo, useState } from "react";

const ONES = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen",
];
const TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety",
];
const SCALES = ["", "thousand", "million", "billion", "trillion"];

function chunkToWords(n: number): string {
  const parts: string[] = [];
  const h = Math.floor(n / 100);
  const r = n % 100;
  if (h > 0) parts.push(`${ONES[h]} hundred`);
  if (r > 0) {
    if (r < 20) parts.push(ONES[r]);
    else {
      const t = Math.floor(r / 10);
      const o = r % 10;
      parts.push(o === 0 ? TENS[t] : `${TENS[t]}-${ONES[o]}`);
    }
  }
  return parts.join(" ");
}

function integerToWords(num: number): string {
  if (num === 0) return "zero";
  const negative = num < 0;
  let n = Math.abs(num);
  const chunks: string[] = [];
  let scaleIdx = 0;
  while (n > 0 && scaleIdx < SCALES.length) {
    const part = n % 1000;
    if (part > 0) {
      const words = chunkToWords(part);
      chunks.unshift(scaleIdx === 0 ? words : `${words} ${SCALES[scaleIdx]}`);
    }
    n = Math.floor(n / 1000);
    scaleIdx++;
  }
  const result = chunks.join(" ");
  return negative ? `negative ${result}` : result;
}

function decimalDigitsToWords(digits: string): string {
  return digits.split("").map((d) => ONES[parseInt(d, 10)]).join(" ");
}

function numberToWords(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  if (!/^-?\d+(\.\d+)?$/.test(trimmed)) return "Invalid number";
  const negative = trimmed.startsWith("-");
  const clean = negative ? trimmed.slice(1) : trimmed;
  const [intPart, decPart] = clean.split(".");
  const intNum = parseInt(intPart, 10);
  let words = integerToWords(negative ? -intNum : intNum);
  if (decPart && decPart.length > 0) {
    words += ` point ${decimalDigitsToWords(decPart)}`;
  }
  return words;
}

function currencyToWords(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  if (!/^-?\d+(\.\d+)?$/.test(trimmed)) return "Invalid number";
  const negative = trimmed.startsWith("-");
  const clean = negative ? trimmed.slice(1) : trimmed;
  const [intPart, decPartRaw = ""] = clean.split(".");
  const dollars = parseInt(intPart, 10);
  const centsStr = (decPartRaw + "00").slice(0, 2);
  const cents = parseInt(centsStr, 10) || 0;
  const dollarWords = integerToWords(dollars);
  const centWords = integerToWords(cents);
  const prefix = negative ? "negative " : "";
  return `${prefix}${dollarWords} dollar${dollars === 1 ? "" : "s"} and ${centWords} cent${cents === 1 ? "" : "s"}`;
}

export function NumberToWords() {
  const [value, setValue] = useState("1234.56");
  const [mode, setMode] = useState<"standard" | "currency">("standard");

  const output = useMemo(
    () => (mode === "currency" ? currencyToWords(value) : numberToWords(value)),
    [value, mode],
  );

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700 mb-1 block">Number</span>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. 1234.56"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </label>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            checked={mode === "standard"}
            onChange={() => setMode("standard")}
          />
          Standard
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            checked={mode === "currency"}
            onChange={() => setMode("currency")}
          />
          Currency (USD)
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Words</p>
        <p className="text-brand font-semibold text-lg break-words">{output || "—"}</p>
      </div>

      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(output)}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
      >
        Copy
      </button>
    </div>
  );
}
