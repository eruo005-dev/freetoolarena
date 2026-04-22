"use client";

import { useMemo, useState } from "react";

const COMMON = [
  "password",
  "123456",
  "qwerty",
  "abc123",
  "letmein",
  "welcome",
  "monkey",
  "dragon",
  "admin",
  "password1",
];

function estimatePool(pw: string): number {
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^A-Za-z0-9]/.test(pw)) pool += 32;
  return pool;
}

function formatSeconds(seconds: number): string {
  if (!isFinite(seconds)) return "centuries";
  if (seconds < 1) return "instant";
  const units: [number, string][] = [
    [60, "seconds"],
    [60, "minutes"],
    [24, "hours"],
    [365, "days"],
    [100, "years"],
    [Infinity, "centuries"],
  ];
  let value = seconds;
  const names = ["seconds", "minutes", "hours", "days", "years", "centuries"];
  let idx = 0;
  for (; idx < units.length - 1; idx++) {
    if (value < units[idx][0]) break;
    value /= units[idx][0];
  }
  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${names[idx]}`;
}

function scorePassword(pw: string) {
  const checks = {
    length: pw.length >= 12,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    digit: /[0-9]/.test(pw),
    symbol: /[^A-Za-z0-9]/.test(pw),
    uncommon: !COMMON.some((c) => pw.toLowerCase().includes(c)) && !/(.)\1{3,}/.test(pw),
  };
  const pool = estimatePool(pw);
  const entropy = pw.length > 0 && pool > 0 ? pw.length * Math.log2(pool) : 0;
  const crackSeconds = pw.length > 0 ? Math.pow(2, entropy) / 10_000_000_000 : 0;
  const passCount = Object.values(checks).filter(Boolean).length;
  let score: 0 | 1 | 2 | 3 | 4 = 0;
  if (!pw) score = 0;
  else if (!checks.uncommon || entropy < 28) score = 1;
  else if (entropy < 40 || passCount < 4) score = 2;
  else if (entropy < 60 || passCount < 5) score = 3;
  else score = 4;
  const labels = ["Weak", "Weak", "Fair", "Good", "Strong"];
  const labelsExcellent = ["Weak", "Weak", "Fair", "Good", "Strong"];
  let label = labelsExcellent[score];
  if (score === 4 && entropy >= 80 && passCount === 6) label = "Excellent";
  return { score, label, entropy, crackSeconds, checks, pool };
}

export function PasswordStrengthChecker({ initial = "" }: { initial?: string } = {}) {
  const [pw, setPw] = useState(initial);
  const [show, setShow] = useState(false);

  const result = useMemo(() => scorePassword(pw), [pw]);

  const barColors = ["bg-slate-200", "bg-rose-500", "bg-amber-500", "bg-yellow-500", "bg-emerald-500"];
  const fill =
    result.label === "Excellent" ? "bg-emerald-600" : barColors[result.score];

  const checks: [keyof typeof result.checks, string][] = [
    ["length", "At least 12 characters"],
    ["upper", "Contains uppercase letter"],
    ["lower", "Contains lowercase letter"],
    ["digit", "Contains digit"],
    ["symbol", "Contains symbol"],
    ["uncommon", "No common patterns (password, 12345…)"],
  ];

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Password
        </span>
        <div className="flex gap-2">
          <input
            type={show ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            placeholder="Type a password to test"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Your password stays in this browser. Nothing is uploaded.
        </p>
      </label>

      <div>
        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${i <= result.score ? fill : "bg-slate-200"}`}
            />
          ))}
        </div>
        <p className="text-sm text-slate-700">
          Strength:{" "}
          <span className="font-bold text-slate-900">{pw ? result.label : "—"}</span>
        </p>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Length</p>
          <p className="text-2xl font-bold text-slate-900">{pw.length}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Entropy</p>
          <p className="text-2xl font-bold text-slate-900">{Math.round(result.entropy)} bits</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Crack @10B/s</p>
          <p className="text-2xl font-bold text-slate-900">{formatSeconds(result.crackSeconds)}</p>
        </div>
      </div>

      <ul className="space-y-1">
        {checks.map(([key, label]) => {
          const ok = result.checks[key];
          return (
            <li key={key} className="flex items-center gap-2 text-sm">
              <span
                aria-hidden
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                  ok ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"
                }`}
              >
                {ok ? "\u2713" : "\u00B7"}
              </span>
              <span className={ok ? "text-slate-900" : "text-slate-500"}>{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
