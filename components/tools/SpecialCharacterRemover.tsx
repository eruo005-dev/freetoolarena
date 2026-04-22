"use client";

import { useMemo, useState } from "react";

const SAMPLE = `Hello, World! This is a test — with "special" chars: @#$%^&*()+=[]{}|\\:;<>?/~\`
It also has digits 123 and hyphens/underscores like foo_bar and nice-name.`;

export function SpecialCharacterRemover({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [keepLetters, setKeepLetters] = useState(true);
  const [keepDigits, setKeepDigits] = useState(true);
  const [keepSpaces, setKeepSpaces] = useState(true);
  const [keepDashes, setKeepDashes] = useState(false);
  const [keepPunct, setKeepPunct] = useState(false);
  const [customKeep, setCustomKeep] = useState("");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const punct = new Set([",", ".", "!", "?"]);
    const dashes = new Set(["-", "_"]);
    const customSet = new Set(customKeep.split(""));
    let out = "";
    for (const ch of input) {
      const isLetter = /\p{L}/u.test(ch);
      const isDigit = /\p{N}/u.test(ch);
      const isSpace = /\s/.test(ch);
      if (customSet.has(ch)) {
        out += ch;
        continue;
      }
      if (keepLetters && isLetter) {
        out += ch;
        continue;
      }
      if (keepDigits && isDigit) {
        out += ch;
        continue;
      }
      if (keepSpaces && isSpace) {
        out += ch;
        continue;
      }
      if (keepDashes && dashes.has(ch)) {
        out += ch;
        continue;
      }
      if (keepPunct && punct.has(ch)) {
        out += ch;
        continue;
      }
    }
    return out;
  }, [input, keepLetters, keepDigits, keepSpaces, keepDashes, keepPunct, customKeep]);

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Input Text
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          { v: keepLetters, s: setKeepLetters, l: "Keep letters (a-z, Unicode)" },
          { v: keepDigits, s: setKeepDigits, l: "Keep digits (0-9)" },
          { v: keepSpaces, s: setKeepSpaces, l: "Keep whitespace" },
          { v: keepDashes, s: setKeepDashes, l: "Keep hyphens and underscores" },
          { v: keepPunct, s: setKeepPunct, l: "Keep common punctuation ( , . ! ? )" },
        ].map((opt, i) => (
          <label
            key={i}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={opt.v}
              onChange={(e) => opt.s(e.target.checked)}
              className="h-4 w-4 accent-brand"
            />
            <span className="text-sm text-slate-700">{opt.l}</span>
          </label>
        ))}
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Keep these specific chars (raw list)
        </span>
        <input
          type="text"
          value={customKeep}
          onChange={(e) => setCustomKeep(e.target.value)}
          placeholder="e.g. @#$"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Before</p>
          <p className="text-2xl font-bold text-slate-900">{input.length}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">After</p>
          <p className="text-2xl font-bold text-slate-900">{output.length}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Stripped</p>
          <p className="text-2xl font-bold text-slate-900">{input.length - output.length}</p>
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">
            Output
          </span>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          rows={8}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </div>
    </div>
  );
}
