"use client";

import { useMemo, useState } from "react";

type Mode = "chars" | "lines" | "separator";

const SAMPLE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
Duis aute irure dolor in reprehenderit in voluptate velit esse.
Excepteur sint occaecat cupidatat non proident, sunt in culpa.
Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.
At vero eos et accusamus et iusto odio dignissimos ducimus qui.
Quis autem vel eum iure reprehenderit qui in ea voluptate velit.`;

export function TxtSplitter({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [mode, setMode] = useState<Mode>("chars");
  const [charSize, setCharSize] = useState(120);
  const [lineSize, setLineSize] = useState(2);
  const [separator, setSeparator] = useState("---");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const chunks = useMemo<string[]>(() => {
    if (!input) return [];
    if (mode === "chars") {
      const n = Math.max(1, Math.floor(charSize));
      const out: string[] = [];
      for (let i = 0; i < input.length; i += n) out.push(input.slice(i, i + n));
      return out;
    }
    if (mode === "lines") {
      const n = Math.max(1, Math.floor(lineSize));
      const lines = input.split(/\r?\n/);
      const out: string[] = [];
      for (let i = 0; i < lines.length; i += n) out.push(lines.slice(i, i + n).join("\n"));
      return out;
    }
    if (!separator) return [input];
    return input.split(separator);
  }, [input, mode, charSize, lineSize, separator]);

  const avgSize = useMemo(() => {
    if (!chunks.length) return 0;
    const total = chunks.reduce((a, c) => a + c.length, 0);
    return Math.round(total / chunks.length);
  }, [chunks]);

  function copy(i: number, text: string) {
    navigator.clipboard?.writeText(text);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1500);
  }

  function download(i: number, text: string) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chunk-${i + 1}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const modeBtn = (m: Mode) =>
    `rounded-md border px-3 py-2 text-sm font-semibold ${
      mode === m
        ? "bg-brand text-white border-brand"
        : "bg-white text-slate-700 border-slate-300 hover:border-brand"
    }`;

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

      <div>
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Split Mode
        </span>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setMode("chars")} className={modeBtn("chars")}>
            By characters
          </button>
          <button type="button" onClick={() => setMode("lines")} className={modeBtn("lines")}>
            By lines
          </button>
          <button type="button" onClick={() => setMode("separator")} className={modeBtn("separator")}>
            By separator
          </button>
        </div>
      </div>

      {mode === "chars" && (
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Characters per chunk
          </span>
          <input
            type="number"
            min={1}
            value={charSize}
            onChange={(e) => setCharSize(Number(e.target.value) || 1)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      )}
      {mode === "lines" && (
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Lines per chunk
          </span>
          <input
            type="number"
            min={1}
            value={lineSize}
            onChange={(e) => setLineSize(Number(e.target.value) || 1)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      )}
      {mode === "separator" && (
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Separator
          </span>
          <input
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      )}

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Chunks</p>
          <p className="text-2xl font-bold text-slate-900">{chunks.length}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Total chars</p>
          <p className="text-2xl font-bold text-slate-900">{input.length}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Avg size</p>
          <p className="text-2xl font-bold text-slate-900">{avgSize}</p>
        </div>
      </div>

      <div className="space-y-3">
        {chunks.map((chunk, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                Chunk {i + 1} · {chunk.length} chars
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => copy(i, chunk)}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
                >
                  {copiedIdx === i ? "Copied!" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={() => download(i, chunk)}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
                >
                  Download
                </button>
              </div>
            </div>
            <pre className="whitespace-pre-wrap break-words font-mono text-xs text-slate-800 max-h-48 overflow-auto">
              {chunk}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
