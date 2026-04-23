"use client";

import { useMemo, useState } from "react";

type PromptType =
  | "summary"
  | "rewrite"
  | "translate"
  | "code"
  | "chat"
  | "essay";

const RATIOS: Record<
  PromptType,
  { label: string; ratio: number; note: string }
> = {
  summary: {
    label: "Summary",
    ratio: 0.25,
    note: "Summaries compress content to roughly a quarter of the input.",
  },
  rewrite: {
    label: "Rewrite / paraphrase",
    ratio: 1.0,
    note: "Rewrites preserve length, so output tracks input 1:1.",
  },
  translate: {
    label: "Translate",
    ratio: 1.15,
    note: "Translations tend to run 10-20% longer depending on language pair.",
  },
  code: {
    label: "Code generation",
    ratio: 3.0,
    note: "Code answers often expand 2-4x over the prompt with comments and boilerplate.",
  },
  chat: {
    label: "Chat reply",
    ratio: 0.8,
    note: "Chat replies match the user's message length on average.",
  },
  essay: {
    label: "Essay / long-form",
    ratio: 6.0,
    note: "Essays expand dramatically; 5-8x is typical for a 500-token brief.",
  },
};

export function AiOutputLengthEstimator() {
  const [promptType, setPromptType] = useState<PromptType>("summary");
  const [inputTokens, setInputTokens] = useState(1000);

  const preset = useMemo(() => RATIOS[promptType], [promptType]);
  const estimate = useMemo(
    () => Math.round(Math.max(0, inputTokens) * preset.ratio),
    [inputTokens, preset]
  );
  const words = Math.round(estimate * 0.75);

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600">
        Predict how many output tokens a prompt will likely produce so you can
        budget context window and cost.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Prompt type
          </span>
          <select
            value={promptType}
            onChange={(e) => setPromptType(e.target.value as PromptType)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {(Object.keys(RATIOS) as PromptType[]).map((k) => (
              <option key={k} value={k}>
                {RATIOS[k].label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Input tokens
          </span>
          <input
            type="number"
            min={0}
            value={inputTokens}
            onChange={(e) => setInputTokens(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
            Ratio
          </div>
          <div className="text-xl font-semibold tabular-nums text-brand">
            {preset.ratio.toFixed(2)}x
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
            Output tokens
          </div>
          <div className="text-xl font-semibold tabular-nums text-brand">
            {estimate.toLocaleString()}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
            ~ Words
          </div>
          <div className="text-xl font-semibold tabular-nums text-brand">
            {words.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
        {preset.note}
      </div>
      <p className="text-xs text-slate-500">
        Rough averages across popular models. Always set a hard
        <code className="mx-1 rounded bg-slate-100 px-1">max_tokens</code>
        cap in production.
      </p>
    </div>
  );
}
