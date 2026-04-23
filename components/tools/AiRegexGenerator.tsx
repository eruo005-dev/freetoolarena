"use client";

import { useMemo, useState } from "react";

const PATTERNS: { id: string; label: string; pattern: string; explain: string }[] = [
  { id: "email", label: "Email address", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", explain: "Local part, @, domain, TLD 2+ chars." },
  { id: "ipv4", label: "IPv4 address", pattern: "(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)", explain: "Four octets 0-255 separated by dots." },
  { id: "ipv6", label: "IPv6 address", pattern: "([a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}", explain: "8 groups of 1-4 hex digits, colon-separated." },
  { id: "us-phone", label: "US phone number", pattern: "\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}", explain: "Allows (xxx), spaces, dots, or dashes." },
  { id: "intl-phone", label: "International phone (E.164)", pattern: "\\+?[1-9]\\d{1,14}", explain: "Optional +, country code, up to 15 digits total." },
  { id: "url", label: "URL (http/https)", pattern: "https?://[^\\s]+", explain: "http:// or https:// plus non-space characters." },
  { id: "zip-us", label: "US ZIP code", pattern: "\\d{5}(-\\d{4})?", explain: "Five digits, optional 4-digit extension." },
  { id: "zip-ca", label: "Canadian postal code", pattern: "[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d", explain: "Letter-digit pattern like K1A 0B1." },
  { id: "uk-postcode", label: "UK postcode", pattern: "[A-Z]{1,2}\\d[A-Z\\d]? ?\\d[A-Z]{2}", explain: "Outcode + incode, e.g. SW1A 1AA." },
  { id: "credit-card", label: "Credit card (any)", pattern: "\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}", explain: "16 digits with optional separators." },
  { id: "ssn", label: "US SSN", pattern: "\\d{3}-\\d{2}-\\d{4}", explain: "3-2-4 digit groups separated by dashes." },
  { id: "date-iso", label: "ISO date YYYY-MM-DD", pattern: "\\d{4}-\\d{2}-\\d{2}", explain: "Year-month-day." },
  { id: "time-24h", label: "24-hour time", pattern: "([01]\\d|2[0-3]):[0-5]\\d", explain: "00:00 to 23:59." },
  { id: "hex-color", label: "Hex color code", pattern: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})", explain: "# plus 3 or 6 hex digits." },
  { id: "uuid", label: "UUID v4", pattern: "[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}", explain: "Standard UUIDv4 with version and variant bits." },
  { id: "slug", label: "URL slug", pattern: "[a-z0-9]+(?:-[a-z0-9]+)*", explain: "Lowercase and digits, dash-separated." },
  { id: "username", label: "Username (3-20 chars)", pattern: "[a-zA-Z0-9_]{3,20}", explain: "Letters, digits, underscore." },
  { id: "password-strong", label: "Strong password", pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}", explain: "Min 8 chars with lower, upper, digit, symbol." },
  { id: "html-tag", label: "HTML tag", pattern: "<\\/?[a-zA-Z][^>]*>", explain: "Opening or closing tag." },
  { id: "markdown-link", label: "Markdown link", pattern: "\\[([^\\]]+)\\]\\(([^)]+)\\)", explain: "Captures text and URL separately." },
  { id: "twitter-handle", label: "Twitter/X handle", pattern: "@[A-Za-z0-9_]{1,15}", explain: "@ + up to 15 word chars." },
  { id: "hashtag", label: "Hashtag", pattern: "#[\\w]+", explain: "# + word characters." },
  { id: "float", label: "Floating point number", pattern: "-?\\d+(\\.\\d+)?", explain: "Optional minus, digits, optional decimal." },
  { id: "integer", label: "Integer", pattern: "-?\\d+", explain: "Optional minus, one or more digits." },
  { id: "whitespace", label: "Leading/trailing whitespace", pattern: "^\\s+|\\s+$", explain: "Used with replace to trim." },
];

export function AiRegexGenerator() {
  const [selected, setSelected] = useState("email");
  const [test, setTest] = useState("Contact me at jay@freetoolarea.com or support@example.org.");

  const current = useMemo(() => PATTERNS.find((p) => p.id === selected)!, [selected]);

  const matches = useMemo(() => {
    try {
      const re = new RegExp(current.pattern, "g");
      const out: string[] = [];
      let m: RegExpExecArray | null;
      let guard = 0;
      while ((m = re.exec(test)) !== null && guard < 500) {
        out.push(m[0]);
        if (m.index === re.lastIndex) re.lastIndex++;
        guard++;
      }
      return out;
    } catch {
      return [];
    }
  }, [current, test]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">What do you want to match?</span>
        <select value={selected} onChange={(e) => setSelected(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          {PATTERNS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
        </select>
      </label>

      <div className="rounded-xl bg-slate-50 p-3 space-y-2">
        <div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Pattern</div>
          <code className="text-sm font-mono text-brand break-all">/{current.pattern}/</code>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Explanation</div>
          <div className="text-sm text-slate-700">{current.explain}</div>
        </div>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Test string</span>
        <textarea value={test} onChange={(e) => setTest(e.target.value)} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
      </label>

      <div className="rounded-xl bg-slate-50 p-3">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Matches ({matches.length})</div>
        {matches.length === 0
          ? <div className="text-sm text-slate-500">No matches in the test string.</div>
          : <ul className="text-sm font-mono space-y-1 mt-1">{matches.map((m, i) => <li key={i} className="text-brand">{m}</li>)}</ul>}
      </div>
      <p className="text-xs text-slate-500">These are common patterns, not strict validators. For email validation, rely on real send-verification — regex alone can accept or reject edge cases.</p>
    </div>
  );
}
