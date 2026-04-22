"use client";

import { useMemo, useState } from "react";

type Parsed =
  | { ok: true; url: URL; params: [string, string][] }
  | { ok: false; error: string };

export function UrlParser() {
  const [input, setInput] = useState("https://user:pass@example.com:8080/path/to/page?q=search&lang=en#section");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parsed: Parsed = useMemo(() => {
    try {
      const u = new URL(input.trim());
      const params: [string, string][] = [];
      u.searchParams.forEach((v, k) => params.push([k, v]));
      return { ok: true, url: u, params };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  }, [input]);

  async function copy(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      setCopiedKey(null);
    }
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          URL
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono"
        />
      </label>

      {!parsed.ok ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
          <span className="text-xs uppercase tracking-wide font-semibold mb-1 block">Invalid URL</span>
          <p>{parsed.error}</p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["protocol", parsed.url.protocol],
                  ["origin", parsed.url.origin],
                  ["host", parsed.url.host],
                  ["hostname", parsed.url.hostname],
                  ["port", parsed.url.port || "(default)"],
                  ["pathname", parsed.url.pathname],
                  ["search", parsed.url.search],
                  ["hash", parsed.url.hash],
                  ["username", parsed.url.username],
                  ["password", parsed.url.password],
                ].map(([k, v]) => (
                  <tr key={k} className="even:bg-white odd:bg-slate-50">
                    <td className="px-3 py-2 font-semibold text-slate-700 w-32">{k}</td>
                    <td className="px-3 py-2 font-mono text-slate-900 break-all">{v || <span className="text-slate-400">(empty)</span>}</td>
                    <td className="px-3 py-2 w-20 text-right">
                      {v && (
                        <button
                          type="button"
                          onClick={() => copy(k, v)}
                          className="text-xs text-brand hover:underline"
                        >
                          {copiedKey === k ? "Copied" : "Copy"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {parsed.params.length > 0 && (
            <div>
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2 block">
                Query Parameters
              </span>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="text-left px-3 py-2 font-semibold">Key</th>
                      <th className="text-left px-3 py-2 font-semibold">Value</th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsed.params.map(([k, v], i) => (
                      <tr key={`${k}-${i}`} className="even:bg-white odd:bg-slate-50">
                        <td className="px-3 py-2 font-mono text-slate-900">{k}</td>
                        <td className="px-3 py-2 font-mono text-slate-700 break-all">{v}</td>
                        <td className="px-3 py-2 w-20 text-right">
                          <button
                            type="button"
                            onClick={() => copy(`param-${i}`, v)}
                            className="text-xs text-brand hover:underline"
                          >
                            {copiedKey === `param-${i}` ? "Copied" : "Copy"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
