"use client";

import { useMemo, useState } from "react";

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "of", "to", "in", "on", "at", "for",
  "with", "by", "is", "are", "was", "were", "be", "been", "this", "that", "it",
  "as", "from",
]);

const VOWELS = "AEIOU";
const CONSONANT_VOWELS = ["A", "E", "I", "O", "U"];

function isConsonant(ch: string): boolean {
  return /[A-Z]/.test(ch) && !VOWELS.includes(ch);
}

function buildAcronym(phrase: string, skipStop: boolean): string {
  return phrase
    .split(/\s+/)
    .filter((w) => {
      if (!w) return false;
      if (!skipStop) return true;
      return !STOP_WORDS.has(w.toLowerCase());
    })
    .map((w) => {
      const m = w.match(/[a-zA-Z]/);
      return m ? m[0].toUpperCase() : "";
    })
    .filter(Boolean)
    .join("");
}

function pronounceable(raw: string): string {
  if (!raw) return "";
  const allConsonants = [...raw].every((c) => isConsonant(c));
  if (!allConsonants) return raw;
  const out: string[] = [];
  for (let i = 0; i < raw.length; i++) {
    out.push(raw[i]);
    if (i < raw.length - 1) {
      const vowel = CONSONANT_VOWELS[i % CONSONANT_VOWELS.length].toLowerCase();
      out.push(vowel);
    }
  }
  return out.join("");
}

export function AcronymGenerator() {
  const [phrase, setPhrase] = useState("National Aeronautics and Space Administration");
  const [skipStop, setSkipStop] = useState(true);

  const acronym = useMemo(() => buildAcronym(phrase, skipStop), [phrase, skipStop]);
  const pron = useMemo(() => pronounceable(acronym), [acronym]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700 mb-1 block">Phrase</span>
        <textarea
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          rows={3}
          placeholder="Enter a phrase…"
          className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={skipStop}
          onChange={(e) => setSkipStop(e.target.checked)}
        />
        Skip stop-words (the, of, and, etc.)
      </label>

      <ResultBox label="Acronym" value={acronym} />
      <ResultBox label="Pronounceable" value={pron} />
    </div>
  );
}

function ResultBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(value)}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark text-sm"
        >
          Copy
        </button>
      </div>
      <p className="text-brand font-bold text-2xl tracking-wide break-words">{value || "—"}</p>
    </div>
  );
}
