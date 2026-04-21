"use client";

import { useCallback, useEffect, useState } from "react";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>/?";
const LOOKALIKES = /[Il1O0o]/g;

export function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [avoidLookalikes, setAvoidLookalikes] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let charset = "";
    if (useLower) charset += LOWER;
    if (useUpper) charset += UPPER;
    if (useDigits) charset += DIGITS;
    if (useSymbols) charset += SYMBOLS;
    if (avoidLookalikes) charset = charset.replace(LOOKALIKES, "");
    if (!charset) {
      setPassword("");
      return;
    }
    const bytes = new Uint32Array(length);
    crypto.getRandomValues(bytes);
    let out = "";
    for (let i = 0; i < length; i++) {
      out += charset[bytes[i] % charset.length];
    }
    setPassword(out);
    setCopied(false);
  }, [length, useLower, useUpper, useDigits, useSymbols, avoidLookalikes]);

  useEffect(() => {
    generate();
  }, [generate]);

  function copy() {
    if (!password) return;
    navigator.clipboard?.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const strength = scoreStrength(password, {
    useLower,
    useUpper,
    useDigits,
    useSymbols,
  });

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <input
            readOnly
            value={password}
            spellCheck={false}
            className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-base focus:outline-none"
          />
          <button
            type="button"
            onClick={copy}
            className="bg-slate-900 text-white font-semibold rounded-lg px-4 py-3 text-sm hover:bg-slate-800 shrink-0"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={generate}
            className="bg-brand text-white font-semibold rounded-lg px-4 py-3 text-sm hover:bg-brand-dark shrink-0"
          >
            Regenerate
          </button>
        </div>
        <StrengthBar score={strength.score} label={strength.label} />
      </div>

      <div>
        <label className="block">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-sm font-medium text-slate-700">Length</span>
            <span className="text-sm font-semibold text-slate-900 tabular-nums">{length}</span>
          </div>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full accent-brand"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Toggle label="Lowercase (a–z)" checked={useLower} onChange={setUseLower} />
        <Toggle label="Uppercase (A–Z)" checked={useUpper} onChange={setUseUpper} />
        <Toggle label="Digits (0–9)" checked={useDigits} onChange={setUseDigits} />
        <Toggle label="Symbols (!@#…)" checked={useSymbols} onChange={setUseSymbols} />
        <Toggle
          label="Avoid lookalikes (I, l, 1, O, 0, o)"
          checked={avoidLookalikes}
          onChange={setAvoidLookalikes}
        />
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-brand"
      />
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}

function scoreStrength(
  pw: string,
  opts: { useLower: boolean; useUpper: boolean; useDigits: boolean; useSymbols: boolean },
) {
  if (!pw) return { score: 0, label: "Empty" };
  let pool = 0;
  if (opts.useLower) pool += 26;
  if (opts.useUpper) pool += 26;
  if (opts.useDigits) pool += 10;
  if (opts.useSymbols) pool += 26;
  const entropyBits = pool > 0 ? pw.length * Math.log2(pool) : 0;
  if (entropyBits < 40) return { score: 1, label: "Weak" };
  if (entropyBits < 60) return { score: 2, label: "Fair" };
  if (entropyBits < 80) return { score: 3, label: "Strong" };
  return { score: 4, label: "Excellent" };
}

function StrengthBar({ score, label }: { score: number; label: string }) {
  const colors = [
    "bg-slate-200",
    "bg-red-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-brand",
  ];
  return (
    <div>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= score ? colors[score] : "bg-slate-200"}`}
          />
        ))}
      </div>
      <p className="text-xs text-slate-600 mt-1">
        Strength: <span className="font-semibold text-slate-900">{label}</span>
      </p>
    </div>
  );
}
