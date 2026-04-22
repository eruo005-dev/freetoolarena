"use client";

import { useMemo, useState } from "react";

type Style = "caps" | "mocking" | "strike" | "spaced" | "reverse" | "upsideDown";

const UPSIDE_DOWN: Record<string, string> = {
  a: "\u0250",
  b: "q",
  c: "\u0254",
  d: "p",
  e: "\u01DD",
  f: "\u025F",
  g: "\u0183",
  h: "\u0265",
  i: "\u0131",
  j: "\u027E",
  k: "\u029E",
  l: "\u05DF",
  m: "\u026F",
  n: "u",
  o: "o",
  p: "d",
  q: "b",
  r: "\u0279",
  s: "s",
  t: "\u0287",
  u: "n",
  v: "\u028C",
  w: "\u028D",
  x: "x",
  y: "\u028E",
  z: "z",
  "0": "0",
  "1": "\u0196",
  "2": "\u1105",
  "3": "\u0190",
  "4": "\u3123",
  "5": "\u03DB",
  "6": "9",
  "7": "\u3125",
  "8": "8",
  "9": "6",
  ".": "\u02D9",
  ",": "'",
  "?": "\u00BF",
  "!": "\u00A1",
  '"': "\u201E",
  "'": ",",
  "(": ")",
  ")": "(",
  "[": "]",
  "]": "[",
  "{": "}",
  "}": "{",
  "<": ">",
  ">": "<",
  "&": "\u214B",
  "_": "\u203E",
};

export function MemeTextFormatter() {
  const [input, setInput] = useState("one does not simply format meme text");
  const [caps, setCaps] = useState(true);
  const [mocking, setMocking] = useState(false);
  const [strike, setStrike] = useState(false);
  const [spaced, setSpaced] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [upsideDown, setUpsideDown] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    let out = input;
    if (caps) out = out.toUpperCase();
    if (mocking) out = toMocking(out);
    if (upsideDown) out = toUpsideDown(out);
    if (reverse) out = [...out].reverse().join("");
    if (spaced) out = [...out].join(" ");
    if (strike) out = [...out].map((c) => c + "\u0336").join("");
    return out;
  }, [input, caps, mocking, strike, spaced, reverse, upsideDown]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Input
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Style</p>
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          <Toggle label="ALL CAPS" value={caps} onChange={setCaps} />
          <Toggle label="MoCkInG sPoNgEbOb" value={mocking} onChange={setMocking} />
          <Toggle label="S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶" value={strike} onChange={setStrike} />
          <Toggle label="s p a c e d" value={spaced} onChange={setSpaced} />
          <Toggle label="desreveR" value={reverse} onChange={setReverse} />
          <Toggle label="uʍop ǝpısdՈ" value={upsideDown} onChange={setUpsideDown} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Output</p>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          rows={4}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-mono text-sm"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 min-h-[200px] flex items-center justify-center">
        <p className="text-2xl font-bold text-slate-900 text-center break-words max-w-full">
          {output}
        </p>
      </div>
    </div>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand accent-brand"
      />
      <span className="text-slate-700">{label}</span>
    </label>
  );
}

function toMocking(s: string): string {
  let out = "";
  let i = 0;
  for (const ch of s) {
    if (/[a-zA-Z]/.test(ch)) {
      out += i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase();
      i++;
    } else {
      out += ch;
    }
  }
  return out;
}

function toUpsideDown(s: string): string {
  const reversed = [...s.toLowerCase()].reverse();
  return reversed.map((c) => UPSIDE_DOWN[c] ?? c).join("");
}
