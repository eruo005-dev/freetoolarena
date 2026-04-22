"use client";

import { useState, useMemo } from "react";

type Props = {
  initialText?: string;
};

type Form = "NFC" | "NFD" | "NFKC" | "NFKD";

const SAMPLE = `Café résumé — "smart quotes" 'too' – em-dash\nＦｕｌｌｗｉｄｔｈ ＡＢＣ`;

function fullwidthToHalfwidth(s: string): string {
  let out = "";
  for (const ch of s) {
    const code = ch.codePointAt(0)!;
    if (code >= 0xff01 && code <= 0xff5e) {
      out += String.fromCodePoint(code - 0xfee0);
    } else if (code === 0x3000) {
      out += " ";
    } else {
      out += ch;
    }
  }
  return out;
}

function smartQuotesToAscii(s: string): string {
  return s
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"');
}

function emDashToHyphens(s: string): string {
  return s.replace(/\u2014/g, "--").replace(/\u2013/g, "-");
}

function stripDiacritics(s: string): string {
  return s.normalize("NFD").replace(/\p{M}/gu, "");
}

export function UnicodeTextNormalizer({ initialText = SAMPLE }: Props = {}) {
  const [input, setInput] = useState(initialText);
  const [form, setForm] = useState<Form>("NFC");
  const [stripMarks, setStripMarks] = useState(false);
  const [fwToHw, setFwToHw] = useState(false);
  const [smartToAscii, setSmartToAscii] = useState(false);
  const [emDashHyphens, setEmDashHyphens] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    let s = input.normalize(form);
    if (stripMarks) s = stripDiacritics(s);
    if (fwToHw) s = fullwidthToHalfwidth(s);
    if (smartToAscii) s = smartQuotesToAscii(s);
    if (emDashHyphens) s = emDashToHyphens(s);
    return s;
  }, [input, form, stripMarks, fwToHw, smartToAscii, emDashHyphens]);

  const changes = useMemo(() => {
    const map = new Map<string, { to: string; count: number }>();
    const inArr = Array.from(input);
    const outArr = Array.from(output);
    const len = Math.min(inArr.length, outArr.length);
    for (let i = 0; i < len; i++) {
      if (inArr[i] !== outArr[i]) {
        const key = inArr[i];
        const existing = map.get(key);
        if (existing) existing.count++;
        else map.set(key, { to: outArr[i], count: 1 });
      }
    }
    return Array.from(map.entries()).slice(0, 40);
  }, [input, output]);

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const pill = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm font-medium ${
      active
        ? "bg-brand text-white border-brand"
        : "bg-white text-slate-700 border-slate-300 hover:border-brand"
    }`;

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Input text
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div>
        <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
          Normalization form
        </div>
        <div className="flex flex-wrap gap-2">
          {(["NFC", "NFD", "NFKC", "NFKD"] as Form[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setForm(f)}
              className={pill(form === f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
          Transforms
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setStripMarks((v) => !v)}
            className={pill(stripMarks)}
          >
            Strip diacritics
          </button>
          <button
            type="button"
            onClick={() => setFwToHw((v) => !v)}
            className={pill(fwToHw)}
          >
            Fullwidth to halfwidth
          </button>
          <button
            type="button"
            onClick={() => setSmartToAscii((v) => !v)}
            className={pill(smartToAscii)}
          >
            Smart quotes to ASCII
          </button>
          <button
            type="button"
            onClick={() => setEmDashHyphens((v) => !v)}
            className={pill(emDashHyphens)}
          >
            Em-dash to --
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            Input chars
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {Array.from(input).length}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            Output chars
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {Array.from(output).length}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            Changed
          </div>
          <div className="text-2xl font-bold text-slate-800">{changes.length}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copy}
          disabled={!output}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy output"}
        </button>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Output
        </span>
        <textarea
          value={output}
          readOnly
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      {changes.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
            Changed characters
          </div>
          <div className="flex flex-wrap gap-2">
            {changes.map(([from, info], i) => (
              <span
                key={i}
                className="rounded-md bg-amber-50 text-amber-800 px-2 py-1 text-xs font-mono"
              >
                {JSON.stringify(from)} → {JSON.stringify(info.to)} ({info.count}×)
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
