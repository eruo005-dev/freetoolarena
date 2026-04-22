"use client";

import { useMemo, useState } from "react";

function normalize(s: string): string {
  const t = s.trim();
  if (t.startsWith("data:")) return t;
  if (/^[A-Za-z0-9+/=\s]+$/.test(t)) {
    return `data:image/png;base64,${t.replace(/\s+/g, "")}`;
  }
  return t;
}

export function Base64ToImage() {
  const [input, setInput] = useState("");
  const url = useMemo(() => (input ? normalize(input) : ""), [input]);

  function download() {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = "decoded.png";
    a.click();
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Paste Base64 string or data URL
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder="data:image/png;base64,iVBORw0KGgoAAAAN…  or raw base64"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      {url && (
        <>
          <div className="rounded-xl bg-slate-50 p-4 flex items-center justify-center min-h-[150px]">
            <img
              src={url}
              alt="decoded"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              className="max-h-72 rounded-lg border border-slate-200"
            />
          </div>
          <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
            Download as PNG
          </button>
        </>
      )}
    </div>
  );
}
