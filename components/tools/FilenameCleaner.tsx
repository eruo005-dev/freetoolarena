"use client";

import { useMemo, useState } from "react";

export function FilenameCleaner() {
  const [input, setInput] = useState(
    "My Vacation Photo (2024).JPG\nRésumé — Final Draft.pdf\nProduct@Spec#1.docx",
  );
  const [lowercase, setLowercase] = useState(true);
  const [spaceToDash, setSpaceToDash] = useState(true);
  const [removeSpecial, setRemoveSpecial] = useState(true);
  const [removeDiacritics, setRemoveDiacritics] = useState(true);
  const [maxLen, setMaxLen] = useState(60);
  const [preserveExt, setPreserveExt] = useState(true);
  const [copied, setCopied] = useState(false);

  const rows = useMemo(() => {
    const lines = input.split("\n").map((l) => l.trim()).filter(Boolean);
    return lines.map((original) => ({
      original,
      cleaned: clean(original, {
        lowercase,
        spaceToDash,
        removeSpecial,
        removeDiacritics,
        maxLen,
        preserveExt,
      }),
    }));
  }, [input, lowercase, spaceToDash, removeSpecial, removeDiacritics, maxLen, preserveExt]);

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(rows.map((r) => r.cleaned).join("\n"));
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
          Filenames (one per line)
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
        />
      </label>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Options</p>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <Toggle label="Lowercase" value={lowercase} onChange={setLowercase} />
          <Toggle label="Replace spaces with -" value={spaceToDash} onChange={setSpaceToDash} />
          <Toggle label="Remove special characters" value={removeSpecial} onChange={setRemoveSpecial} />
          <Toggle label="Remove diacritics (é → e)" value={removeDiacritics} onChange={setRemoveDiacritics} />
          <Toggle label="Preserve extension" value={preserveExt} onChange={setPreserveExt} />
          <label className="flex items-center gap-2">
            <span className="text-slate-700 w-40">Max length</span>
            <input
              type="number"
              min={10}
              max={255}
              value={maxLen}
              onChange={(e) => setMaxLen(Number(e.target.value))}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>
      </div>

      {rows.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
              Results ({rows.length})
            </p>
            <button
              type="button"
              onClick={copyAll}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {copied ? "Copied!" : "Copy all"}
            </button>
          </div>
          <div className="rounded-xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="py-2 px-3 text-left font-semibold">Before</th>
                  <th className="py-2 px-3 text-left font-semibold">After</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="even:bg-white odd:bg-slate-50">
                    <td className="py-2 px-3 font-mono text-slate-600 break-all">{r.original}</td>
                    <td className="py-2 px-3 font-mono text-slate-900 break-all">{r.cleaned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
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

type Opts = {
  lowercase: boolean;
  spaceToDash: boolean;
  removeSpecial: boolean;
  removeDiacritics: boolean;
  maxLen: number;
  preserveExt: boolean;
};

function clean(name: string, o: Opts): string {
  let base = name;
  let ext = "";
  if (o.preserveExt) {
    const m = base.match(/^(.*)(\.[^.]+)$/);
    if (m) {
      base = m[1];
      ext = m[2];
    }
  }
  if (o.removeDiacritics) {
    base = base.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    ext = ext.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  if (o.lowercase) {
    base = base.toLowerCase();
    ext = ext.toLowerCase();
  }
  if (o.removeSpecial) {
    base = base.replace(/[^a-zA-Z0-9 \-_]/g, "");
  }
  if (o.spaceToDash) {
    base = base.replace(/\s+/g, "-");
  }
  // Collapse repeats and trim dashes
  base = base.replace(/-+/g, "-").replace(/^[-_]+|[-_]+$/g, "");
  // Max length applies to the whole filename
  const total = base + ext;
  if (total.length > o.maxLen) {
    const keep = Math.max(1, o.maxLen - ext.length);
    base = base.slice(0, keep).replace(/[-_]+$/g, "");
  }
  return base + ext;
}
