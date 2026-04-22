"use client";

import { useMemo, useState } from "react";

type Rule = { pattern: RegExp; replacement: string | ((m: string) => string); label: string };

const RULES: Rule[] = [
  { pattern: /\bdelve into\b/gi, replacement: "look at", label: "‘delve into’ → ‘look at’" },
  { pattern: /\bdelving into\b/gi, replacement: "looking at", label: "‘delving into’ → ‘looking at’" },
  { pattern: /\bin the realm of\b/gi, replacement: "in", label: "‘in the realm of’ → ‘in’" },
  { pattern: /\bin today's (?:ever-(?:evolving|changing) )?(?:fast-paced )?(?:digital )?(?:world|landscape|era|age)\b/gi, replacement: "today", label: "‘in today’s ever-evolving landscape’ → ‘today’" },
  { pattern: /\btapestry\b/gi, replacement: "mix", label: "‘tapestry’ → ‘mix’" },
  { pattern: /\bembark on (?:a )?journey\b/gi, replacement: "start", label: "‘embark on a journey’ → ‘start’" },
  { pattern: /\bembarking on (?:a )?journey\b/gi, replacement: "starting", label: "‘embarking on a journey’ → ‘starting’" },
  { pattern: /\blandscape\b/gi, replacement: "scene", label: "‘landscape’ → ‘scene’ (when used figuratively)" },
  { pattern: /\b(?:it is important|it's important) to note that\b/gi, replacement: "note:", label: "‘it is important to note that’ → ‘note:’" },
  { pattern: /\b(?:it is worth|it's worth) (?:mentioning|noting) that\b/gi, replacement: "", label: "strip ‘it’s worth mentioning that’" },
  { pattern: /\b(?:furthermore|moreover|additionally),?\s*/gi, replacement: "Also, ", label: "‘furthermore/moreover’ → ‘also’" },
  { pattern: /\bin conclusion,?\s*/gi, replacement: "", label: "strip ‘in conclusion’" },
  { pattern: /\bto summarize,?\s*/gi, replacement: "", label: "strip ‘to summarize’" },
  { pattern: /\bin summary,?\s*/gi, replacement: "", label: "strip ‘in summary’" },
  { pattern: /\bultimately,?\s*/gi, replacement: "", label: "strip ‘ultimately’" },
  { pattern: /\bmultifaceted\b/gi, replacement: "complex", label: "‘multifaceted’ → ‘complex’" },
  { pattern: /\bgame[- ]chang(?:ing|er)\b/gi, replacement: "important", label: "‘game-changing/changer’ → ‘important’" },
  { pattern: /\bcutting[- ]edge\b/gi, replacement: "new", label: "‘cutting-edge’ → ‘new’" },
  { pattern: /\bstate[- ]of[- ]the[- ]art\b/gi, replacement: "modern", label: "‘state-of-the-art’ → ‘modern’" },
  { pattern: /\bseamless(?:ly)?\b/gi, replacement: "", label: "strip ‘seamless(ly)’" },
  { pattern: /\brobust\b/gi, replacement: "solid", label: "‘robust’ → ‘solid’" },
  { pattern: /\bleverage(d|s)?\b/gi, replacement: (m: string) => m.endsWith("d") ? "used" : m.endsWith("s") ? "uses" : "use", label: "‘leverage’ → ‘use’" },
  { pattern: /\butilize(d|s)?\b/gi, replacement: (m: string) => m.endsWith("d") ? "used" : m.endsWith("s") ? "uses" : "use", label: "‘utilize’ → ‘use’" },
  { pattern: /\bfoster(ed|s|ing)?\b/gi, replacement: (m: string) => {
    const lower = m.toLowerCase();
    if (lower.endsWith("ed")) return "built";
    if (lower.endsWith("ing")) return "building";
    if (lower.endsWith("s")) return "builds";
    return "build";
  }, label: "‘foster’ → ‘build’" },
  { pattern: /\bnavigate (?:the )?complexities of\b/gi, replacement: "handle", label: "‘navigate the complexities of’ → ‘handle’" },
  { pattern: /\bat the end of the day\b/gi, replacement: "overall", label: "‘at the end of the day’ → ‘overall’" },
  { pattern: /\b(?:a )?plethora of\b/gi, replacement: "many", label: "‘a plethora of’ → ‘many’" },
  { pattern: /\bmyriad (?:of )?\b/gi, replacement: "many ", label: "‘myriad of’ → ‘many’" },
  { pattern: /\bpivotal\b/gi, replacement: "key", label: "‘pivotal’ → ‘key’" },
  { pattern: /\bparadigm shift\b/gi, replacement: "big change", label: "‘paradigm shift’ → ‘big change’" },
  { pattern: /\bunlock (?:the )?(?:full )?potential\b/gi, replacement: "make the most", label: "‘unlock the full potential’ → ‘make the most’" },
  { pattern: /\bdeep dive (?:into )?\b/gi, replacement: "look at ", label: "‘deep dive into’ → ‘look at’" },
  { pattern: /\bsynergy\b/gi, replacement: "combined effect", label: "‘synergy’ → ‘combined effect’" },
  { pattern: /—/g, replacement: ", ", label: "em-dash → comma" },
  { pattern: /\b(?:i'd like to|i would like to)\b/gi, replacement: "I will", label: "‘I’d like to’ → ‘I will’" },
  { pattern: /\b(?:in order to)\b/gi, replacement: "to", label: "‘in order to’ → ‘to’" },
  { pattern: /\bdue to the fact that\b/gi, replacement: "because", label: "‘due to the fact that’ → ‘because’" },
];

export function AiWritingHumanizer() {
  const [text, setText] = useState("In today's ever-evolving digital landscape, it is important to note that we must delve into the multifaceted tapestry of cutting-edge AI solutions. Furthermore, by leveraging state-of-the-art tools — we can seamlessly unlock the full potential of this paradigm shift and foster a myriad of opportunities.");
  const [copied, setCopied] = useState(false);

  const { output, hits } = useMemo(() => {
    let out = text;
    const applied: string[] = [];
    for (const r of RULES) {
      const before = out;
      if (typeof r.replacement === "function") {
        out = out.replace(r.pattern, r.replacement as any);
      } else {
        out = out.replace(r.pattern, r.replacement as string);
      }
      if (out !== before) applied.push(r.label);
    }
    // Clean up double spaces / orphaned punctuation left behind by strips.
    out = out.replace(/\s{2,}/g, " ").replace(/\s+([.,;:!?])/g, "$1").trim();
    // Restore capitalization at sentence starts that got lowercased by strips.
    out = out.replace(/(^|[.!?]\s+)([a-z])/g, (_m, pre, c) => pre + c.toUpperCase());
    return { output: out, hits: applied };
  }, [text]);

  function copy() {
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Paste AI-generated writing</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </label>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs uppercase tracking-wide font-semibold text-slate-500">Humanized output</div>
          <button onClick={copy} className="text-xs bg-brand text-white rounded-lg px-3 py-1 hover:bg-brand-dark">{copied ? "Copied" : "Copy"}</button>
        </div>
        <div className="text-sm leading-relaxed whitespace-pre-wrap">{output}</div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Rules applied ({hits.length})</div>
        {hits.length === 0 ? (
          <div className="text-xs text-slate-500 italic">No giveaway phrases found. Either it’s already human-sounding or the tells are subtle.</div>
        ) : (
          <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
            {hits.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        )}
      </div>
      <p className="text-xs text-slate-500">This is a rule-based rewriter that strips the most common AI tells. Read the output and adjust — it can’t replace your own voice.</p>
    </div>
  );
}
