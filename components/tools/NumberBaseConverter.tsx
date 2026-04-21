"use client";

import { useState } from "react";

type Base = "bin" | "oct" | "dec" | "hex";

const BASES: { key: Base; label: string; radix: number; hint: string }[] = [
  { key: "bin", label: "Binary", radix: 2, hint: "0-1" },
  { key: "oct", label: "Octal", radix: 8, hint: "0-7" },
  { key: "dec", label: "Decimal", radix: 10, hint: "0-9" },
  { key: "hex", label: "Hex", radix: 16, hint: "0-9 a-f" },
];

export function NumberBaseConverter() {
  const [value, setValue] = useState<bigint>(255n);
  const [editing, setEditing] = useState<Base | null>(null);
  const [drafts, setDrafts] = useState<Record<Base, string>>({
    bin: "11111111",
    oct: "377",
    dec: "255",
    hex: "ff",
  });
  const [err, setErr] = useState<string | null>(null);

  function onFieldChange(base: Base, raw: string) {
    setEditing(base);
    setDrafts((d) => ({ ...d, [base]: raw }));
    if (raw.trim() === "") {
      setErr(null);
      return;
    }
    try {
      const radix = BASES.find((b) => b.key === base)!.radix;
      const n = parseBigInt(raw.trim(), radix);
      setValue(n);
      setErr(null);
    } catch (e: any) {
      setErr(e.message || "Invalid input for that base.");
    }
  }

  return (
    <div className="space-y-4">
      {BASES.map((b) => {
        const live = editing === b.key ? drafts[b.key] : value.toString(b.radix);
        return (
          <div key={b.key}>
            <div className="flex items-baseline justify-between mb-1">
              <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                {b.label} <span className="font-mono text-slate-400">({b.hint})</span>
              </label>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(live)}
                className="text-xs font-medium text-brand hover:underline"
              >
                Copy
              </button>
            </div>
            <input
              type="text"
              value={live}
              onChange={(e) => onFieldChange(b.key, e.target.value)}
              onBlur={() => setEditing(null)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder={b.label}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        );
      })}
      {err && <p className="text-sm text-rose-600">{err}</p>}
      <p className="text-sm text-slate-600">
        Type in any field — the others update live. Supports arbitrarily large
        numbers via <code>BigInt</code>.
      </p>
    </div>
  );
}

function parseBigInt(raw: string, radix: number): bigint {
  // Accept common prefixes (0x, 0b, 0o) matching the field's base.
  let s = raw;
  if (radix === 16 && /^0x/i.test(s)) s = s.slice(2);
  else if (radix === 2 && /^0b/i.test(s)) s = s.slice(2);
  else if (radix === 8 && /^0o/i.test(s)) s = s.slice(2);

  const neg = s.startsWith("-");
  if (neg) s = s.slice(1);
  if (!s) throw new Error("Empty number.");

  const pattern =
    radix === 2
      ? /^[01]+$/
      : radix === 8
      ? /^[0-7]+$/
      : radix === 10
      ? /^[0-9]+$/
      : /^[0-9a-fA-F]+$/;
  if (!pattern.test(s)) {
    throw new Error(`Not a valid base-${radix} number.`);
  }

  // BigInt only supports `0x`, `0o`, `0b` prefixes on string literals, so we
  // build manually by digit.
  let out = 0n;
  const br = BigInt(radix);
  for (const ch of s.toLowerCase()) {
    const d = ch >= "a" ? ch.charCodeAt(0) - 87 : ch.charCodeAt(0) - 48;
    out = out * br + BigInt(d);
  }
  return neg ? -out : out;
}
