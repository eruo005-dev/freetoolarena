"use client";
import { useMemo, useState } from "react";

const SAMPLE = `Cache-Control: public, max-age=3600
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=()
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax`;

type Info = { meaning: string; security: string };

const DB: Record<string, Info> = {
  "cache-control": {
    meaning: "Directives for caching in browsers and intermediate caches.",
    security: "private prevents shared caches from storing; no-store for sensitive responses.",
  },
  "content-security-policy": {
    meaning: "Whitelist of allowed sources for scripts, styles, images, etc.",
    security: "Strong defense against XSS. Avoid 'unsafe-inline' / 'unsafe-eval'.",
  },
  "strict-transport-security": {
    meaning: "Forces HTTPS for the given max-age.",
    security: "Use includeSubDomains + preload for maximum coverage once you&rsquo;re all-HTTPS.",
  },
  "x-frame-options": {
    meaning: "Legacy clickjacking control: DENY / SAMEORIGIN.",
    security: "Superseded by CSP frame-ancestors, but still respected by old browsers.",
  },
  "x-content-type-options": {
    meaning: "nosniff disables MIME-type sniffing.",
    security: "Prevents browsers from executing non-script files as scripts.",
  },
  "referrer-policy": {
    meaning: "Controls the Referer header sent on navigation.",
    security: "strict-origin-when-cross-origin is the modern default.",
  },
  "permissions-policy": {
    meaning: "Gates access to powerful browser APIs (camera, geolocation, etc).",
    security: "Disable features you don&rsquo;t use to shrink attack surface.",
  },
  "set-cookie": {
    meaning: "Sets a cookie on the client.",
    security: "Always set HttpOnly + Secure + SameSite on session cookies.",
  },
  "access-control-allow-origin": {
    meaning: "CORS: origins allowed to read the response.",
    security: "Never combine `*` with Allow-Credentials. Echo specific origins.",
  },
  "content-type": {
    meaning: "MIME type of the response body.",
    security: "Always declare charset for text types to prevent encoding attacks.",
  },
  "x-xss-protection": {
    meaning: "Legacy XSS filter toggle.",
    security: "Deprecated &mdash; set to 0 and rely on CSP.",
  },
  server: {
    meaning: "Server software identification.",
    security: "Consider removing or reducing detail to avoid version leakage.",
  },
};

type Parsed = { name: string; value: string; info?: Info };

export function HttpHeaderExplainer() {
  const [input, setInput] = useState(SAMPLE);
  const rows = useMemo(() => parse(input), [input]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Raw HTTP headers</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        />
      </label>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="rounded-xl bg-slate-50 p-4">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-sm font-mono font-semibold text-brand">{r.name}</span>
              <span className="text-xs font-mono text-slate-600 break-all">{r.value}</span>
            </div>
            {r.info ? (
              <div className="mt-2 text-sm text-slate-700 space-y-1">
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-wide font-semibold mr-2">Meaning</span>
                  <span dangerouslySetInnerHTML={{ __html: r.info.meaning }} />
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-wide font-semibold mr-2">Security</span>
                  <span dangerouslySetInnerHTML={{ __html: r.info.security }} />
                </div>
              </div>
            ) : (
              <div className="mt-2 text-xs text-slate-500">No explainer in reference set.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function parse(src: string): Parsed[] {
  return src
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx < 0) return { name: line, value: "" };
      const name = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      const key = name.toLowerCase();
      return { name, value, info: DB[key] };
    });
}
