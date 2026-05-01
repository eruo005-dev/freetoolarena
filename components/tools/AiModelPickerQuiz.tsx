"use client";

import { useMemo, useState } from "react";

type Q1 = "code" | "research" | "write" | "agents" | "multimodal" | "chat";
type Q2 = "free" | "low" | "mid" | "high";
type Q3 = "speed" | "quality" | "privacy" | "context";
type Q4 = "occasional" | "daily" | "production";

interface Result {
  pick: string;
  cost: string;
  why: string[];
  alts: string[];
}

function recommend(q1: Q1, q2: Q2, q3: Q3, q4: Q4): Result {
  // Free tier override
  if (q2 === "free") {
    if (q1 === "code") return { pick: "Claude.ai free + GitHub Copilot Free", cost: "$0", why: ["Both have meaningful free tiers", "Copilot Free covers autocomplete in any IDE", "Claude.ai free has Sonnet 4.6 with daily caps"], alts: ["Continue.dev with free DeepSeek API"] };
    if (q1 === "research") return { pick: "Perplexity Free + NotebookLM", cost: "$0", why: ["Perplexity quick search is unlimited free", "NotebookLM is the best free synthesis tool", "Up to 50 sources with citations"], alts: ["Gemini Free 2.5 Flash"] };
    return { pick: "Claude.ai Free + ChatGPT Free + Gemini Free", cost: "$0", why: ["Different daily caps mean you rarely hit them all on the same day", "Claude best writing, ChatGPT broadest features, Gemini best long context"], alts: ["DeepSeek free chat for high-volume work"] };
  }

  if (q1 === "code") {
    if (q3 === "privacy" || q4 === "production") return { pick: "Claude Pro + Cursor Pro", cost: "$40/mo", why: ["Claude Code = best agentic refactor harness", "Cursor for inline edits + autocomplete", "Claude's privacy posture is industry-leading"], alts: ["Self-host DeepSeek V3.2 on a Hyperspace pod"] };
    if (q2 === "low") return { pick: "GitHub Copilot Pro", cost: "$10/mo", why: ["Cheapest premium AI coding plan", "Works in every IDE", "GPT-5 backbone with optional Claude"], alts: ["Continue.dev + DeepSeek API ($5-10/mo equivalent)"] };
    if (q3 === "speed") return { pick: "Cursor Pro + Claude Pro", cost: "$40/mo", why: ["Cursor Tab autocomplete is fastest", "Claude Code for the bigger jobs"], alts: ["GPT-5 mini in Cursor for fastest responses"] };
    return { pick: "Claude Max + Cursor Pro", cost: "$120/mo", why: ["Heavy agentic workloads need the Max cap", "Cursor in IDE for everyday flow"], alts: ["Cursor Ultra ($200) if you'd rather have one tool"] };
  }

  if (q1 === "research") {
    return { pick: "Perplexity Pro + Claude Pro", cost: "$40/mo", why: ["Perplexity for cited live-web research", "Claude for analysis + long-document reasoning", "1M context fits whole reports"], alts: ["NotebookLM (free) for source synthesis"] };
  }

  if (q1 === "write") {
    if (q2 === "low") return { pick: "Claude Pro", cost: "$20/mo", why: ["Best long-form prose quality", "Cleaner voice, less marketing fluff", "1M context fits a whole book"], alts: ["ChatGPT Plus if you also want image gen"] };
    return { pick: "Claude Pro + ChatGPT Plus", cost: "$40/mo", why: ["Claude for long-form, ChatGPT for stylistic range", "ChatGPT adds Sora/voice/images"], alts: ["Add Sudowrite ($10) for fiction"] };
  }

  if (q1 === "agents") {
    if (q2 === "high") return { pick: "Claude Max + Anthropic API", cost: "$100+/mo", why: ["Claude is most reliable on long-horizon agents", "Max plan handles heavy Claude Code use", "API for production deployment"], alts: ["Mix DeepSeek for cheap steps + Claude for hard ones"] };
    return { pick: "Claude Pro + Anthropic API", cost: "$20-50/mo", why: ["Pro plan covers daily agent dev", "API ($3/$15 per 1M) for production runs", "Use prompt caching for 90% savings"], alts: ["DeepSeek V3.2 API if cost dominates"] };
  }

  if (q1 === "multimodal") {
    return { pick: "Gemini Advanced + ChatGPT Plus", cost: "$40/mo", why: ["Gemini = native audio + video understanding", "ChatGPT = Sora video gen + voice mode", "Together they cover every modality"], alts: ["Add Midjourney $10 for hero images"] };
  }

  // chat
  if (q3 === "context") return { pick: "Gemini Advanced", cost: "$20/mo", why: ["2M context window — the longest", "Strong multimodal", "Tight Workspace integration"], alts: ["Claude Pro at 1M for cleaner long-form"] };
  return { pick: "ChatGPT Plus", cost: "$20/mo", why: ["Broadest feature set", "Voice mode, custom GPTs, image gen, search", "Largest third-party ecosystem"], alts: ["Claude Pro for cleaner output", "Gemini Advanced for Workspace users"] };
}

export function AiModelPickerQuiz() {
  const [q1, setQ1] = useState<Q1>("code");
  const [q2, setQ2] = useState<Q2>("mid");
  const [q3, setQ3] = useState<Q3>("quality");
  const [q4, setQ4] = useState<Q4>("daily");

  const result = useMemo(() => recommend(q1, q2, q3, q4), [q1, q2, q3, q4]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Q1: What&rsquo;s your main use?</span>
          <select value={q1} onChange={(e) => setQ1(e.target.value as Q1)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="code">Coding</option>
            <option value="research">Research / fact-finding</option>
            <option value="write">Writing / drafting</option>
            <option value="agents">Building agents</option>
            <option value="multimodal">Multimodal (audio / video / image)</option>
            <option value="chat">General chat / assistant</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Q2: Monthly budget</span>
          <select value={q2} onChange={(e) => setQ2(e.target.value as Q2)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="free">$0 (free tier only)</option>
            <option value="low">$10-20</option>
            <option value="mid">$20-60</option>
            <option value="high">$100+</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Q3: Top priority</span>
          <select value={q3} onChange={(e) => setQ3(e.target.value as Q3)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="quality">Output quality</option>
            <option value="speed">Speed / latency</option>
            <option value="privacy">Privacy / self-host</option>
            <option value="context">Long context (whole books / codebases)</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Q4: How heavy?</span>
          <select value={q4} onChange={(e) => setQ4(e.target.value as Q4)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="occasional">Occasional</option>
            <option value="daily">Daily</option>
            <option value="production">Production / customer-facing</option>
          </select>
        </label>
      </div>

      <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-5">
        <div className="text-xs uppercase tracking-wide text-emerald-700">Recommended pick</div>
        <div className="text-2xl font-bold text-emerald-900">{result.pick}</div>
        <div className="mt-1 text-sm text-emerald-800">~{result.cost}</div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">Why</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {result.why.map((w) => <li key={w}>{w}</li>)}
        </ul>
      </div>

      {result.alts.length > 0 && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h4 className="mb-2 text-sm font-semibold text-slate-700">Alternatives worth considering</h4>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            {result.alts.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
