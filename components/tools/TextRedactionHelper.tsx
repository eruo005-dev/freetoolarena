"use client";

import { useMemo, useState } from "react";

type Pattern = { name: string; re: RegExp; replace: string; enabled: boolean };

const DEFAULTS: Pattern[] = [
  { name: "Email addresses",       re: /[\w.+-]+@[\w-]+\.[\w.-]+/g,                 replace: "[EMAIL]",       enabled: true },
  { name: "US Phone numbers",      re: /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, replace: "[PHONE]", enabled: true },
  { name: "SSN (US)",              re: /\b\d{3}[- ]\d{2}[- ]\d{4}\b/g,              replace: "[SSN]",         enabled: true },
  { name: "Credit cards (Visa/MC/Amex)", re: /\b(?:\d[ -]?){13,16}\b/g,             replace: "[CARD]",        enabled: true },
  { name: "IP addresses",          re: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g,   replace: "[IP]",          enabled: true },
  { name: "URLs",                  re: /https?:\/\/[\w./?=&%-]+/g,                  replace: "[URL]",         enabled: false },
  { name: "Dates (MM/DD/YYYY)",    re: /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g,            replace: "[DATE]",        enabled: false },
  { name: "Dates (ISO YYYY-MM-DD)",re: /\b\d{4}-\d{2}-\d{2}\b/g,                    replace: "[DATE]",        enabled: false },
  { name: "Dollar amounts",        re: /\$\s?\d+(?:[.,]\d+)?/g,                     replace: "[AMOUNT]",      enabled: false },
];

const SAMPLE = `Hi team,

Following up on our discussion. I sent the contract to john.doe@example.com on 03/15/2026.
Their phone is (555) 123-4567 and we'll be wiring $12,500.00 to confirm.

Auth code from the IT team: server 192.168.1.42, account 4111-1111-1111-1234.
Please don't share my SSN: 123-45-6789. Thanks.

— Jane`;

export function TextRedactionHelper() {
  const [text, setText] = useState<string>(SAMPLE);
  const [patterns, setPatterns] = useState<Pattern[]>(DEFAULTS);
  const [customRegex, setCustomRegex] = useState<string>("");
  const [customReplacement, setCustomReplacement] = useState<string>("[CUSTOM]");

  const redacted = useMemo(() => {
    let out = text;
    for (const p of patterns) {
      if (!p.enabled) continue;
      out = out.replace(p.re, p.replace);
    }
    if (customRegex.trim()) {
      try {
        const re = new RegExp(customRegex, "g");
        out = out.replace(re, customReplacement);
      } catch {
        // invalid regex; ignore
      }
    }
    return out;
  }, [text, patterns, customRegex, customReplacement]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of patterns) {
      const m = text.match(p.re);
      c[p.name] = m ? m.length : 0;
    }
    return c;
  }, [text, patterns]);

  const toggle = (i: number) => setPatterns((ps) => ps.map((p, idx) => idx === i ? { ...p, enabled: !p.enabled } : p));

  return (
    <div className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">Paste text to redact</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-xs" />
      </label>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">Patterns to redact</h4>
        <div className="grid gap-2 sm:grid-cols-3">
          {patterns.map((p, i) => (
            <label key={p.name} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={p.enabled} onChange={() => toggle(i)} />
              <span className="flex-1">{p.name}</span>
              <span className="text-xs text-slate-500">{counts[p.name] || 0}</span>
            </label>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
          <input value={customRegex} onChange={(e) => setCustomRegex(e.target.value)} placeholder="Custom regex (optional, no slashes)" className="rounded border border-slate-300 px-2 py-1" />
          <input value={customReplacement} onChange={(e) => setCustomReplacement(e.target.value)} placeholder="Replacement" className="rounded border border-slate-300 px-2 py-1" />
        </div>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <h4 className="text-sm font-semibold text-emerald-900">Redacted output</h4>
          <button onClick={() => navigator.clipboard?.writeText(redacted)} className="text-xs text-emerald-800 underline">Copy</button>
        </div>
        <pre className="whitespace-pre-wrap font-mono text-xs text-emerald-900">{redacted}</pre>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        <strong>Privacy:</strong> all processing happens in your browser — nothing is sent to a server. <strong>NOT a
        substitute for production redaction</strong> — for legal, medical, or compliance work use a vetted DLP tool.
        Always do a manual review pass; pattern-matching catches the obvious patterns but misses contextual PII (names,
        addresses, account references that don&rsquo;t match defaults).
      </div>
    </div>
  );
}
