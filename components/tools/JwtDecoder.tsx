"use client";

import { useMemo, useState } from "react";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE3MDAwMDM2MDB9.XyZsignatureHerePlaceholderAbc";

function base64UrlDecode(input: string): string {
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4;
  if (pad === 2) s += "==";
  else if (pad === 3) s += "=";
  else if (pad === 1) throw new Error("Invalid base64url string");
  try {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(s), (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
  } catch {
    return atob(s);
  }
}

function formatDuration(seconds: number): string {
  const abs = Math.abs(seconds);
  const d = Math.floor(abs / 86400);
  const h = Math.floor((abs % 86400) / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = Math.floor(abs % 60);
  const parts: string[] = [];
  if (d) parts.push(`${d}d`);
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  if (!d && !h && !m) parts.push(`${s}s`);
  return parts.slice(0, 2).join(" ") || "0s";
}

type Decoded = {
  header: string;
  payload: string;
  signature: string;
  payloadObj: Record<string, unknown> | null;
};

export function JwtDecoder({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const result = useMemo((): { ok: true; data: Decoded } | { ok: false; error: string } => {
    const trimmed = input.trim();
    if (!trimmed) return { ok: false, error: "Paste a JWT to decode." };
    const parts = trimmed.split(".");
    if (parts.length !== 3) return { ok: false, error: "A JWT has 3 parts separated by dots." };
    try {
      const headerRaw = base64UrlDecode(parts[0]);
      const payloadRaw = base64UrlDecode(parts[1]);
      const headerObj = JSON.parse(headerRaw);
      const payloadObj = JSON.parse(payloadRaw);
      return {
        ok: true,
        data: {
          header: JSON.stringify(headerObj, null, 2),
          payload: JSON.stringify(payloadObj, null, 2),
          signature: parts[2],
          payloadObj,
        },
      };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Invalid JWT" };
    }
  }, [input]);

  function copy(key: string, value: string) {
    if (!value) return;
    navigator.clipboard?.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  }

  let expiryLine: string | null = null;
  let issuedLine: string | null = null;
  if (result.ok && result.data.payloadObj) {
    const p = result.data.payloadObj as { exp?: number; iat?: number };
    const now = Math.floor(Date.now() / 1000);
    if (typeof p.exp === "number") {
      const diff = p.exp - now;
      const when = new Date(p.exp * 1000).toISOString();
      expiryLine =
        diff >= 0
          ? `expires in ${formatDuration(diff)} (${when})`
          : `expired ${formatDuration(diff)} ago (${when})`;
    }
    if (typeof p.iat === "number") {
      issuedLine = `issued ${formatDuration(now - p.iat)} ago (${new Date(p.iat * 1000).toISOString()})`;
    }
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          JWT Token
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          spellCheck={false}
          placeholder="eyJhbGciOi..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      {!result.ok && <p className="text-sm text-rose-600">{result.error}</p>}

      {result.ok && (
        <>
          {(expiryLine || issuedLine) && (
            <div className="rounded-xl bg-slate-50 p-4 space-y-1 text-sm">
              {expiryLine && (
                <p>
                  <span className="font-semibold text-slate-900">Expiry:</span>{" "}
                  <span className="text-slate-700">{expiryLine}</span>
                </p>
              )}
              {issuedLine && (
                <p>
                  <span className="font-semibold text-slate-900">Issued:</span>{" "}
                  <span className="text-slate-700">{issuedLine}</span>
                </p>
              )}
            </div>
          )}

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">
                Header
              </span>
              <button
                type="button"
                onClick={() => copy("header", result.data.header)}
                className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
              >
                {copiedKey === "header" ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              readOnly
              value={result.data.header}
              rows={6}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">
                Payload
              </span>
              <button
                type="button"
                onClick={() => copy("payload", result.data.payload)}
                className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
              >
                {copiedKey === "payload" ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              readOnly
              value={result.data.payload}
              rows={8}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </div>

          <div>
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Signature (base64url, not verified)
            </span>
            <textarea
              readOnly
              value={result.data.signature}
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm break-all focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            <p className="text-xs text-slate-500 mt-1">
              This tool does not verify signatures. Never trust a JWT without server-side
              verification.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
