"use client";

import { useMemo, useState } from "react";

const ADJ = ["swift", "silent", "bold", "cosmic", "neon", "quiet", "fuzzy", "mighty", "velvet", "amber", "violet", "rapid", "brave", "curious", "electric", "frosty", "golden", "humble", "indigo", "jolly", "keen", "lucky", "moss", "nimble", "opal", "pixel", "quartz", "rustic", "stellar", "tidy", "urban", "vivid", "witty", "zesty"];
const NOUN = ["falcon", "otter", "phoenix", "panda", "ember", "comet", "pixel", "moth", "saber", "lily", "tiger", "koala", "drift", "beacon", "spark", "mosaic", "willow", "arrow", "canyon", "delta", "echo", "forge", "glade", "harbor", "island", "juniper", "kestrel", "lagoon", "maple", "nimbus", "orchid", "prairie", "quill", "ranger"];

function rng(seed: number) {
  let s = seed || 1;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
const pick = <T,>(a: T[], r: () => number) => a[Math.floor(r() * a.length)];
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

type Style = "lowercase" | "camelCase" | "Pascal" | "snake_case" | "kebab-case";

function format(a: string, n: string, style: Style, digits: number, rnd: () => number) {
  const num = digits > 0 ? String(Math.floor(rnd() * Math.pow(10, digits))).padStart(digits, "0") : "";
  if (style === "lowercase") return `${a}${n}${num}`;
  if (style === "camelCase") return `${a}${cap(n)}${num}`;
  if (style === "Pascal") return `${cap(a)}${cap(n)}${num}`;
  if (style === "snake_case") return [a, n, num].filter(Boolean).join("_");
  return [a, n, num].filter(Boolean).join("-");
}

export function UsernameGenerator() {
  const [count, setCount] = useState(12);
  const [seed, setSeed] = useState(Date.now() % 10000);
  const [style, setStyle] = useState<Style>("camelCase");
  const [digits, setDigits] = useState(2);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const names = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: count }, () => format(pick(ADJ, r), pick(NOUN, r), style, digits, r));
  }, [count, seed, style, digits]);

  function copy(i: number) {
    navigator.clipboard?.writeText(names[i]);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1000);
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-4 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Count</span>
          <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Style</span>
          <select value={style} onChange={(e) => setStyle(e.target.value as Style)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="lowercase">lowercase</option>
            <option value="camelCase">camelCase</option>
            <option value="Pascal">Pascal</option>
            <option value="snake_case">snake_case</option>
            <option value="kebab-case">kebab-case</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Digits</span>
          <select value={digits} onChange={(e) => setDigits(parseInt(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value={0}>None</option><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option>
          </select>
        </label>
        <div className="flex items-end">
          <button onClick={() => setSeed(Math.floor(Math.random() * 1e6))} className="w-full bg-brand text-white font-semibold rounded-lg px-3 py-2 text-sm hover:bg-brand-dark">Regenerate</button>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {names.map((n, i) => (
          <button key={i} onClick={() => copy(i)} className="text-left text-sm font-mono rounded-lg border border-slate-200 bg-white px-3 py-2 hover:border-brand hover:bg-brand/5 transition">
            {copiedIdx === i ? "✓ Copied" : n}
          </button>
        ))}
      </div>
    </div>
  );
}
