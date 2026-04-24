"use client";

import { useState } from "react";

type Style = "caps" | "mixed" | "leet";

const CONSONANTS = "BCDFGHJKLMNPQRSTVWXZ".split("");
const VOWELS = "AEIOUY".split("");

const leetMap: Record<string, string> = {
  A: "4",
  E: "3",
  I: "1",
  O: "0",
  S: "5",
  T: "7",
};

function leet(s: string) {
  return s
    .split("")
    .map((c) => leetMap[c.toUpperCase()] ?? c)
    .join("");
}

function randomCVC(length: number) {
  let out = "";
  for (let i = 0; i < length; i++) {
    // alternate consonant and vowel for pronounceability
    const useVowel = i % 2 === 1;
    out += useVowel
      ? VOWELS[Math.floor(Math.random() * VOWELS.length)]
      : CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
  }
  return out;
}

function applyStyle(raw: string, style: Style) {
  if (style === "caps") return raw.toUpperCase();
  if (style === "leet") return leet(raw.toUpperCase());
  // mixed: first char upper, rest random case
  return raw
    .split("")
    .map((c, i) =>
      i === 0 || Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase(),
    )
    .join("");
}

function fromSeed(phrase: string, length: number) {
  const words = phrase.split(/\s+/).filter(Boolean);
  let letters = words
    .map((w) => w.replace(/[^A-Za-z]/g, "").charAt(0))
    .filter(Boolean)
    .join("");
  if (letters.length >= length) return letters.slice(0, length);
  // pad with letters from the first word
  const first = (words[0] || "").replace(/[^A-Za-z]/g, "");
  let i = 1;
  while (letters.length < length && i < first.length) {
    letters += first[i];
    i++;
  }
  while (letters.length < length) {
    letters += CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
  }
  return letters;
}

export function ClanTagGenerator() {
  const [length, setLength] = useState<2 | 3 | 4>(3);
  const [style, setStyle] = useState<Style>("caps");
  const [seed, setSeed] = useState("");
  const [count, setCount] = useState(20);
  const [tags, setTags] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    const out: string[] = [];
    const n = Math.max(1, Math.min(50, count));
    for (let i = 0; i < n; i++) {
      const raw = seed.trim()
        ? fromSeed(seed, length)
        : randomCVC(length);
      out.push(applyStyle(raw, style));
    }
    setTags(out);
  };

  const regenerateOne = (idx: number) => {
    setTags((prev) => {
      const next = [...prev];
      const raw = seed.trim() ? fromSeed(seed, length) : randomCVC(length);
      next[idx] = applyStyle(raw, style);
      return next;
    });
  };

  const copy = async (t: string, i: number) => {
    try {
      await navigator.clipboard.writeText(t);
      setCopied(i);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-2 text-sm">
            <span className="w-24 text-slate-700">Length</span>
            <select
              value={length}
              onChange={(e) => setLength(Number(e.target.value) as 2 | 3 | 4)}
              className="flex-1 rounded-lg border border-slate-300 px-2 py-1 text-sm"
            >
              <option value={2}>2 chars</option>
              <option value={3}>3 chars</option>
              <option value={4}>4 chars</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="w-24 text-slate-700">Style</span>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as Style)}
              className="flex-1 rounded-lg border border-slate-300 px-2 py-1 text-sm"
            >
              <option value="caps">ALL CAPS</option>
              <option value="mixed">Mixed case</option>
              <option value="leet">Leet</option>
            </select>
          </label>
        </div>

        <label className="block text-sm">
          <span className="text-slate-700">
            Seed phrase (optional &mdash; uses first letters of each word)
          </span>
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="e.g. Rapid Knights of Fury"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="text-slate-700">Count</span>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 20)}
            className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-sm"
          />
        </label>

        <button
          onClick={generate}
          className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-dark"
        >
          Generate
        </button>
      </div>

      {tags.length > 0 && (
        <div className="rounded-xl bg-slate-50 p-4 font-mono">
          <div className="grid gap-2 sm:grid-cols-2">
            {tags.map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 text-sm"
              >
                <span className="text-base font-semibold">[{t}]</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => copy(t, i)}
                    className="text-xs text-brand hover:underline"
                  >
                    {copied === i ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={() => regenerateOne(i)}
                    className="text-xs text-slate-500 hover:underline"
                  >
                    Redo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
