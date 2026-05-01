"use client";

import { useMemo, useState } from "react";

type Risk = "high" | "medium" | "low" | "info";

interface Finding {
  pattern: string;
  risk: Risk;
  why: string;
  match?: string;
}

const PATTERNS: { re: RegExp; label: string; risk: Risk; why: string }[] = [
  { re: /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules)/i, label: "Override attempt", risk: "high", why: "Classic jailbreak: tells the model to discard the system prompt." },
  { re: /you\s+are\s+(now\s+)?(a\s+)?(different|new)\s+(ai|assistant|persona|character|model)/i, label: "Role hijack", risk: "high", why: "Attempts to redefine the assistant's persona mid-conversation." },
  { re: /system\s*(prompt|message|instruction)\s*:/i, label: "System-prompt forgery", risk: "high", why: "Attempts to pose as a system message inside user content." },
  { re: /developer\s+mode|admin\s+(mode|override)|debug\s+mode/i, label: "Fake privilege mode", risk: "high", why: "Claims to enable a higher-privilege mode that doesn't exist." },
  { re: /print\s+(your\s+)?(system\s+)?(prompt|instructions|rules)/i, label: "System-prompt extraction", risk: "high", why: "Tries to exfiltrate the hidden system prompt." },
  { re: /repeat\s+(the\s+)?(text|instructions|prompt)\s+above/i, label: "Prefix repetition probe", risk: "medium", why: "Common technique to dump prior context." },
  { re: /\<\s*(system|admin|root)\s*\>/i, label: "Pseudo-XML hijack", risk: "medium", why: "Fake structural tags trying to look authoritative." },
  { re: /from\s+now\s+on|going\s+forward,?\s+you/i, label: "Persistent reframing", risk: "medium", why: "Tries to lock in a new behavior for the rest of the session." },
  { re: /jailbreak|dan\s+(mode|prompt)|do\s+anything\s+now/i, label: "Known jailbreak phrase", risk: "high", why: "Matches a well-known jailbreak pattern (DAN, etc.)." },
  { re: /pretend\s+(you\s+are|to\s+be)/i, label: "Persona swap via 'pretend'", risk: "medium", why: "Soft persona-swap framing; often benign but worth flagging." },
  { re: /please\s+disregard|forget\s+(all|the)\s+/i, label: "Soft override", risk: "medium", why: "Polite version of an instruction-override attempt." },
  { re: /hypothetically|imagine\s+(if|that)|what\s+if\s+you\s+(could|were)/i, label: "Hypothetical framing", risk: "low", why: "Often used to coax around safety; usually benign in legitimate use." },
  { re: /BEGIN\s+(SYSTEM|PROMPT|INSTRUCTIONS?)/i, label: "Forged delimiter", risk: "high", why: "Attempts to inject a fake system block via uppercase delimiters." },
  { re: /[​-‍⁠﻿]/, label: "Hidden zero-width chars", risk: "high", why: "Invisible characters often used to smuggle prompts past humans reviewing the text." },
  { re: /[‪-‮⁦-⁩]/, label: "Bidi unicode override", risk: "high", why: "Right-to-left override characters that can hide text from humans." },
];

export function PromptInjectionDetector() {
  const [text, setText] = useState<string>("");

  const findings = useMemo<Finding[]>(() => {
    if (!text.trim()) return [];
    const out: Finding[] = [];
    for (const p of PATTERNS) {
      const m = text.match(p.re);
      if (m) out.push({ pattern: p.label, risk: p.risk, why: p.why, match: m[0] });
    }
    return out;
  }, [text]);

  const overall: Risk =
    findings.some((f) => f.risk === "high") ? "high" :
    findings.some((f) => f.risk === "medium") ? "medium" :
    findings.some((f) => f.risk === "low") ? "low" : "info";

  const overallLabel: Record<Risk, { text: string; cls: string }> = {
    high: { text: "High risk — likely injection attempt", cls: "border-rose-300 bg-rose-50 text-rose-900" },
    medium: { text: "Medium risk — review before passing to LLM", cls: "border-amber-300 bg-amber-50 text-amber-900" },
    low: { text: "Low risk — minor patterns flagged", cls: "border-amber-200 bg-amber-50 text-amber-900" },
    info: { text: "No injection patterns detected", cls: "border-emerald-300 bg-emerald-50 text-emerald-900" },
  };

  return (
    <div className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">Paste user input / web content / email / document text</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Anything you'd pass into an LLM as untrusted input — agent tool outputs, scraped web pages, user messages."
          className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-xs"
        />
      </label>

      {text.trim().length > 0 && (
        <>
          <div className={`rounded-lg border p-4 ${overallLabel[overall].cls}`}>
            <div className="text-xs uppercase tracking-wide opacity-70">Verdict</div>
            <div className="text-lg font-bold">{overallLabel[overall].text}</div>
          </div>

          {findings.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-slate-700">Findings</h4>
              <ul className="space-y-3">
                {findings.map((f, i) => (
                  <li key={i} className="border-l-2 pl-3" style={{ borderColor: f.risk === "high" ? "#fb7185" : f.risk === "medium" ? "#fbbf24" : "#94a3b8" }}>
                    <div className="text-sm font-medium text-slate-800">
                      {f.pattern} <span className={`ml-1 rounded px-1.5 py-0.5 text-xs ${f.risk === "high" ? "bg-rose-100 text-rose-700" : f.risk === "medium" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{f.risk}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-600">{f.why}</div>
                    {f.match && <div className="mt-1 font-mono text-xs text-slate-500">match: <span className="bg-slate-100 px-1">{f.match}</span></div>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            <strong>Important caveat:</strong> this is a fast pre-filter, not a complete defense. Real injection attacks
            evolve. Even text that passes can be malicious. Best practice: (1) never run untrusted text in the same context
            as your system prompt, (2) treat all tool outputs as untrusted, (3) require explicit human confirmation for any
            destructive action, (4) use Anthropic / OpenAI&rsquo;s structured tool-use schemas instead of free-form parsing.
          </div>
        </>
      )}
    </div>
  );
}
