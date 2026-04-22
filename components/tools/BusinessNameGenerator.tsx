"use client";

import { useMemo, useState } from "react";

type Industry =
  | "tech"
  | "retail"
  | "food"
  | "health"
  | "creative"
  | "finance"
  | "generic";

const PREFIXES = [
  "Neo", "Get", "Try", "Hello", "Use", "Zap", "Flux", "Kai", "Rev", "Lux",
  "Nova", "Orbit", "Pulse",
];

const SUFFIXES = [
  "Hub", "Labs", "Works", "Studio", "Forge", "Spark", "Kit", "Stack", "Loop",
  "Flow", "Pixel", "Base", "Nest", "Point", "Space", "Craft",
];

const TLDS = ["io", "co", "app", "xyz"];

const INDUSTRY_EXTRAS: Record<Industry, { prefixes: string[]; suffixes: string[] }> = {
  tech: { prefixes: ["Byte", "Cloud", "Data"], suffixes: ["Stack", "Labs", "Engine"] },
  retail: { prefixes: ["Shop", "Buy", "Cart"], suffixes: ["Market", "Shop", "Goods"] },
  food: { prefixes: ["Fresh", "Taste", "Bite"], suffixes: ["Kitchen", "Eats", "Bites"] },
  health: { prefixes: ["Vita", "Well", "Pure"], suffixes: ["Care", "Health", "Life"] },
  creative: { prefixes: ["Ink", "Muse", "Loom"], suffixes: ["Studio", "Craft", "Atelier"] },
  finance: { prefixes: ["Fin", "Capital", "Ledger"], suffixes: ["Pay", "Vault", "Fund"] },
  generic: { prefixes: [], suffixes: [] },
};

export function BusinessNameGenerator({
  initialKeyword = "Pulse",
  initialIndustry = "tech",
}: { initialKeyword?: string; initialIndustry?: Industry } = {}) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [industry, setIndustry] = useState<Industry>(initialIndustry);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);

  const suggestions = useMemo(
    () => generate(keyword, industry, seed),
    [keyword, industry, seed],
  );

  async function copy(text: string, idx: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(idx);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Core keyword
          </span>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. Pulse"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Industry / vibe
          </span>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value as Industry)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="generic">Generic</option>
            <option value="tech">Tech</option>
            <option value="retail">Retail</option>
            <option value="food">Food</option>
            <option value="health">Health</option>
            <option value="creative">Creative</option>
            <option value="finance">Finance</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={() => setSeed((s) => s + 1)}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
      >
        Regenerate
      </button>

      {suggestions.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {suggestions.map((name, idx) => (
            <div
              key={`${name}-${idx}`}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between gap-2"
            >
              <span className="font-mono text-sm text-slate-900 truncate">{name}</span>
              <button
                type="button"
                onClick={() => copy(name, idx)}
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50 shrink-0"
              >
                {copied === idx ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function generate(keyword: string, industry: Industry, seed: number): string[] {
  const kw = (keyword || "brand").trim().replace(/\s+/g, "");
  if (!kw) return [];
  const kwCap = kw.charAt(0).toUpperCase() + kw.slice(1).toLowerCase();
  const kwLower = kw.toLowerCase();

  const extras = INDUSTRY_EXTRAS[industry];
  const allPrefixes = [...PREFIXES, ...extras.prefixes];
  const allSuffixes = [...SUFFIXES, ...extras.suffixes];

  const results: string[] = [];

  // Prefix + keyword (camelcase)
  for (const p of allPrefixes) {
    results.push(`${p}${kwCap}`);
  }
  // Keyword + suffix (camelcase)
  for (const s of allSuffixes) {
    results.push(`${kwCap}${s}`);
  }
  // Dot variants — keyword.tld
  for (const t of TLDS) {
    results.push(`${kwLower}.${t}`);
  }
  // Prefix + keyword lowercase
  for (const p of allPrefixes.slice(0, 6)) {
    results.push(`${p.toLowerCase()}${kwLower}`);
  }
  // Keyword + suffix dot variants
  for (const s of allSuffixes.slice(0, 4)) {
    results.push(`${kwLower}${s.toLowerCase()}.io`);
  }
  // lowercase compound
  for (const s of allSuffixes.slice(0, 6)) {
    results.push(`${kwLower}${s.toLowerCase()}`);
  }

  // dedupe
  const unique = Array.from(new Set(results));
  // shuffle using seed
  return shuffle(unique, seed).slice(0, Math.max(30, Math.min(42, unique.length)));
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = arr.slice();
  let s = seed * 9301 + 49297;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
