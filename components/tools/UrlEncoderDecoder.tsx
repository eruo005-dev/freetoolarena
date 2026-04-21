"use client";

import { useState } from "react";

export function UrlEncoderDecoder() {
  const [input, setInput] = useState("hello world & stuff?");
  const [output, setOutput] = useState("");
  const [err, setErr] = useState("");

  const encode = () => {
    try {
      setOutput(encodeURIComponent(input));
      setErr("");
    } catch (e) {
      setErr(String(e));
    }
  };
  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setErr("");
    } catch {
      setErr("Invalid URL-encoded input");
    }
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Input</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <div className="flex gap-2">
        <button type="button" onClick={encode} className="rounded-lg bg-brand-dark text-white px-4 py-2 text-sm font-semibold hover:bg-brand">
          Encode
        </button>
        <button type="button" onClick={decode} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Decode
        </button>
      </div>
      {err && <p className="text-sm text-rose-700">{err}</p>}
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Output</span>
        <textarea
          readOnly
          value={output}
          rows={4}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm"
        />
      </label>
    </div>
  );
}
