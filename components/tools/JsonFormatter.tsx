"use client";

import { useState } from "react";

const SAMPLE = `{"user":{"name":"Ada","roles":["admin","editor"],"active":true},"count":42}`;

type Status =
  | { kind: "idle" }
  | { kind: "ok"; message: string }
  | { kind: "error"; message: string };

export function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function format(indent: number) {
    try {
      const parsed = JSON.parse(input);
      const out = JSON.stringify(parsed, null, indent);
      setOutput(out);
      setStatus({
        kind: "ok",
        message:
          indent > 0
            ? `Valid JSON. Formatted with ${indent}-space indent.`
            : "Valid JSON. Minified.",
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setOutput("");
      setStatus({ kind: "error", message: msg });
    }
  }

  function validate() {
    try {
      JSON.parse(input);
      setStatus({ kind: "ok", message: "Valid JSON." });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setStatus({ kind: "error", message: msg });
    }
  }

  function copy() {
    if (output) navigator.clipboard?.writeText(output);
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700 mb-1 block">Input JSON</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"paste":"your JSON here"}'
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-y"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => format(2)}
          className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark"
        >
          Format (2 spaces)
        </button>
        <button
          type="button"
          onClick={() => format(4)}
          className="border border-slate-300 text-slate-900 font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-50"
        >
          Format (4 spaces)
        </button>
        <button
          type="button"
          onClick={() => format(0)}
          className="border border-slate-300 text-slate-900 font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-50"
        >
          Minify
        </button>
        <button
          type="button"
          onClick={validate}
          className="border border-slate-300 text-slate-900 font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-50"
        >
          Validate
        </button>
      </div>

      {status.kind !== "idle" && (
        <div
          role="status"
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            status.kind === "ok"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {status.message}
        </div>
      )}

      {output && (
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <p className="text-sm font-medium text-slate-700">Output</p>
            <button
              type="button"
              onClick={copy}
              className="text-xs font-semibold text-brand hover:text-brand-dark"
            >
              Copy
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={10}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm resize-y"
          />
        </div>
      )}
    </div>
  );
}
