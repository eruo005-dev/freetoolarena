"use client";

import { useMemo, useState } from "react";

type Mode = "parse" | "build";

type Pair = { key: string; value: string };

export function QueryStringParser() {
  const [mode, setMode] = useState<Mode>("parse");
  const [input, setInput] = useState("?name=Jay&tag=dev&tag=ts&empty=");
  const [decode, setDecode] = useState(true);
  const [pairs, setPairs] = useState<Pair[]>([
    { key: "q", value: "hello world" },
    { key: "page", value: "1" },
  ]);
  const [encode, setEncode] = useState(true);
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => {
    const raw = input.trim().replace(/^\?/, "");
    if (!raw) return [] as Pair[];
    const map = new Map<string, string[]>();
    for (const part of raw.split("&")) {
      if (!part) continue;
      const eq = part.indexOf("=");
      let k = eq === -1 ? part : part.slice(0, eq);
      let v = eq === -1 ? "" : part.slice(eq + 1);
      if (decode) {
        try { k = decodeURIComponent(k.replace(/\+/g, " ")); } catch {}
        try { v = decodeURIComponent(v.replace(/\+/g, " ")); } catch {}
      }
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(v);
    }
    const out: Pair[] = [];
    map.forEach((vals, k) => {
      if (vals.length === 1) out.push({ key: k, value: vals[0] });
      else out.push({ key: k, value: JSON.stringify(vals) });
    });
    return out;
  }, [input, decode]);

  const built = useMemo(() => {
    const parts: string[] = [];
    for (const p of pairs) {
      if (!p.key) continue;
      const k = encode ? encodeURIComponent(p.key) : p.key;
      const v = encode ? encodeURIComponent(p.value) : p.value;
      parts.push(`${k}=${v}`);
    }
    return parts.length ? `?${parts.join("&")}` : "";
  }, [pairs, encode]);

  function updatePair(i: number, patch: Partial<Pair>) {
    setPairs(pairs.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  }
  function addPair() { setPairs([...pairs, { key: "", value: "" }]); }
  function removePair(i: number) { setPairs(pairs.filter((_, idx) => idx !== i)); }

  async function copyBuilt() {
    try {
      await navigator.clipboard.writeText(built);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["parse", "build"] as Mode[]).map((m) => {
          const active = mode === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition capitalize ${
                active
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-slate-700 border-slate-300 hover:border-brand"
              }`}
            >
              {m === "parse" ? "Parse" : "Build"}
            </button>
          );
        })}
      </div>

      {mode === "parse" ? (
        <>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Query String
            </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={decode}
              onChange={(e) => setDecode(e.target.checked)}
              className="accent-brand"
            />
            Decode URL-encoded values
          </label>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold">Key</th>
                  <th className="text-left px-3 py-2 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {parsed.length === 0 ? (
                  <tr><td colSpan={2} className="px-3 py-4 text-slate-600">No pairs.</td></tr>
                ) : parsed.map((p, i) => (
                  <tr key={i} className="even:bg-white odd:bg-slate-50">
                    <td className="px-3 py-2 font-mono text-slate-900">{p.key}</td>
                    <td className="px-3 py-2 font-mono text-slate-700 break-all">{p.value || <span className="text-slate-400">(empty)</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                Key-Value Pairs
              </span>
              <button
                type="button"
                onClick={addPair}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border transition bg-white text-slate-700 border-slate-300 hover:border-brand"
              >
                + Add
              </button>
            </div>
            {pairs.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={p.key}
                  onChange={(e) => updatePair(i, { key: e.target.value })}
                  placeholder="key"
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
                />
                <input
                  type="text"
                  value={p.value}
                  onChange={(e) => updatePair(i, { value: e.target.value })}
                  placeholder="value"
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => removePair(i)}
                  className="px-3 py-2 rounded-lg text-sm font-medium border bg-white text-slate-700 border-slate-300 hover:border-brand"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={encode}
              onChange={(e) => setEncode(e.target.checked)}
              className="accent-brand"
            />
            URL-encode values
          </label>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                Output
              </span>
              <button
                type="button"
                onClick={copyBuilt}
                className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">{built || "(empty)"}</pre>
          </div>
        </>
      )}
    </div>
  );
}
