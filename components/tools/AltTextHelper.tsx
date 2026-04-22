"use client";

import { useMemo, useState } from "react";

export function AltTextHelper() {
  const [alt, setAlt] = useState("");
  const [context, setContext] = useState("");
  const [keyword, setKeyword] = useState("");

  const checks = useMemo(() => {
    const trimmed = alt.trim();
    const lower = trimmed.toLowerCase();
    const len = trimmed.length;
    const badPrefixes = [
      "image of",
      "picture of",
      "photo of",
      "graphic of",
      "screenshot of",
    ];
    const startsWithBad = badPrefixes.some((p) => lower.startsWith(p));
    const hasKeyword =
      !keyword.trim() || lower.includes(keyword.trim().toLowerCase());
    const words = trimmed.split(/\s+/).filter(Boolean);
    const hasVerb = /\b(is|are|was|were|has|have|had|walks?|runs?|jumps?|sits?|stands?|holds?|plays?|shows?|looks?|smiles?|reads?|writes?|makes?|takes?|flies|flew|grows?|cooks?|dances?|sings?|works?|eats?|drinks?|ing|ed)\b/i.test(
      trimmed,
    );
    const hasNoun = words.length >= 2;
    const descriptive = hasVerb && hasNoun;

    return {
      notEmpty: len > 0,
      lengthOk: len >= 5 && len <= 125,
      lengthWarn: len > 125,
      noBadPrefix: !startsWithBad,
      hasKeyword,
      descriptive,
    };
  }, [alt, keyword]);

  const score = Object.values(checks).filter((v) => v === true).length;
  const maxScore = 5; // notEmpty, lengthOk, noBadPrefix, hasKeyword, descriptive

  const warn = checks.lengthWarn;
  const under = alt.trim().length > 0 && alt.trim().length < 5;

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Alt text
        </span>
        <textarea
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          rows={3}
          placeholder="Describe what's in the image..."
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        <div className="flex justify-between mt-1 text-xs">
          <span
            className={
              warn
                ? "text-rose-600 font-semibold"
                : under
                ? "text-amber-600 font-semibold"
                : "text-slate-500"
            }
          >
            {alt.trim().length} / 125 chars
            {warn && " — too long"}
            {under && " — too short"}
          </span>
        </div>
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Image context (optional)
          </span>
          <input
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="What is the image showing?"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Target keyword (optional)
          </span>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. running shoes"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-slate-900 tabular-nums">
            {score}/{maxScore}
          </span>
          <span className="text-sm text-slate-500">quality score</span>
        </div>
        <ul className="space-y-2 text-sm">
          <Check ok={checks.notEmpty} label="Alt text provided" />
          <Check
            ok={checks.lengthOk}
            label={`Length between 5 and 125 characters (${alt.trim().length})`}
          />
          <Check
            ok={checks.noBadPrefix}
            label={'Does not start with "image of" / "picture of" / "photo of"'}
          />
          <Check
            ok={checks.hasKeyword}
            label={
              keyword.trim()
                ? `Includes target keyword "${keyword.trim()}"`
                : "No target keyword provided (optional)"
            }
          />
          <Check ok={checks.descriptive} label="Reads as a descriptive sentence (nouns + action)" />
        </ul>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
          Improvement tips
        </p>
        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
          {!checks.notEmpty && <li>Write something — empty alt is only OK for decorative images.</li>}
          {checks.lengthWarn && <li>Trim to under 125 characters. Screen readers truncate long alts.</li>}
          {under && <li>Add more detail — 5 chars is too thin to be useful.</li>}
          {!checks.noBadPrefix && (
            <li>Drop filler like "image of" — screen readers already announce it as an image.</li>
          )}
          {!checks.hasKeyword && keyword.trim() && (
            <li>Work your target keyword in naturally, without stuffing.</li>
          )}
          {!checks.descriptive && checks.notEmpty && (
            <li>Describe the subject and what's happening — who, what, where.</li>
          )}
          {context.trim() && (
            <li>
              Context: <em>{context.trim()}</em> — align your alt with how the image supports the
              surrounding copy.
            </li>
          )}
          {score === maxScore && <li>Looks solid. Ship it.</li>}
        </ul>
      </div>
    </div>
  );
}

function Check({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-start gap-2">
      <span
        className={`px-2 py-0.5 rounded text-xs font-semibold shrink-0 ${
          ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
        }`}
      >
        {ok ? "Pass" : "Fail"}
      </span>
      <span className="text-slate-700">{label}</span>
    </li>
  );
}
