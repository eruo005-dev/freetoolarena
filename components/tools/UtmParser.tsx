"use client";

import { useMemo, useState } from "react";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id"];

type Parsed = {
  error: string | null;
  rows: { key: string; value: string; isUtm: boolean }[];
  cleanUrl: string;
};

export function UtmParser() {
  const [input, setInput] = useState(
    "https://example.com/landing?utm_source=newsletter&utm_medium=email&utm_campaign=spring_sale&utm_content=hero_cta",
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedClean, setCopiedClean] = useState(false);

  const parsed = useMemo<Parsed>(() => {
    const t = input.trim();
    if (!t) {
      return { error: "Paste a URL above to parse it.", rows: [], cleanUrl: "" };
    }
    try {
      const u = new URL(t);
      const rows: Parsed["rows"] = [];
      u.searchParams.forEach((value, key) => {
        rows.push({ key, value, isUtm: UTM_KEYS.includes(key) });
      });
      rows.sort((a, b) => {
        if (a.isUtm && !b.isUtm) return -1;
        if (!a.isUtm && b.isUtm) return 1;
        return a.key.localeCompare(b.key);
      });
      const clean = new URL(u.toString());
      UTM_KEYS.forEach((k) => clean.searchParams.delete(k));
      return { error: null, rows, cleanUrl: clean.toString() };
    } catch {
      return {
        error: "Not a valid URL. Make sure it starts with https:// or http://.",
        rows: [],
        cleanUrl: "",
      };
    }
  }, [input]);

  async function copyValue(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      setCopiedKey(null);
    }
  }

  async function copyClean() {
    try {
      await navigator.clipboard.writeText(parsed.cleanUrl);
      setCopiedClean(true);
      setTimeout(() => setCopiedClean(false), 1500);
    } catch {
      setCopiedClean(false);
    }
  }

  const utmRows = parsed.rows.filter((r) => r.isUtm);
  const otherRows = parsed.rows.filter((r) => !r.isUtm);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          URL to parse
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="https://example.com/?utm_source=..."
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
        />
      </label>

      {parsed.error && <p className="text-sm text-rose-600">{parsed.error}</p>}

      {!parsed.error && (
        <>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
              UTM parameters
            </p>
            {utmRows.length === 0 ? (
              <p className="text-sm text-slate-600">No UTM parameters found in this URL.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200">
                    <th className="py-2 pr-4 font-semibold">Parameter</th>
                    <th className="py-2 pr-4 font-semibold">Value</th>
                    <th className="py-2 font-semibold text-right">Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {utmRows.map((r) => (
                    <tr key={r.key} className="border-b border-slate-100 last:border-0">
                      <td className="py-1.5 pr-4 text-slate-900 font-mono">{r.key}</td>
                      <td className="py-1.5 pr-4 text-slate-700 break-all">{r.value}</td>
                      <td className="py-1.5 text-right">
                        <button
                          type="button"
                          onClick={() => copyValue(r.key, r.value)}
                          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          {copiedKey === r.key ? "Copied!" : "Copy"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {otherRows.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                Other query parameters
              </p>
              <table className="w-full text-sm">
                <tbody>
                  {otherRows.map((r) => (
                    <tr key={r.key} className="border-b border-slate-100 last:border-0">
                      <td className="py-1.5 pr-4 text-slate-900 font-mono">{r.key}</td>
                      <td className="py-1.5 pr-4 text-slate-700 break-all">{r.value}</td>
                      <td className="py-1.5 text-right">
                        <button
                          type="button"
                          onClick={() => copyValue(r.key, r.value)}
                          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          {copiedKey === r.key ? "Copied!" : "Copy"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                Clean URL (UTM removed)
              </p>
              <button
                type="button"
                onClick={copyClean}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                {copiedClean ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono whitespace-pre-wrap break-all">
              {parsed.cleanUrl}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}
