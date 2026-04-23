"use client";

import { useMemo, useState } from "react";

type UseCase =
  | "creative"
  | "code"
  | "reasoning"
  | "factual"
  | "roleplay";

const PRESETS: Record<
  UseCase,
  {
    label: string;
    temperature: number;
    top_p: number;
    top_k: number;
    presence_penalty: number;
    frequency_penalty: number;
    rationale: string;
  }
> = {
  creative: {
    label: "Creative writing",
    temperature: 0.9,
    top_p: 0.95,
    top_k: 80,
    presence_penalty: 0.6,
    frequency_penalty: 0.3,
    rationale:
      "High temperature and top_p encourage novel word choices; presence penalty pushes the model to explore new ideas.",
  },
  code: {
    label: "Code generation",
    temperature: 0.2,
    top_p: 0.9,
    top_k: 40,
    presence_penalty: 0,
    frequency_penalty: 0,
    rationale:
      "Low temperature keeps syntax predictable; penalties stay at 0 because repetition is often correct in code.",
  },
  reasoning: {
    label: "Step-by-step reasoning",
    temperature: 0.3,
    top_p: 0.9,
    top_k: 40,
    presence_penalty: 0,
    frequency_penalty: 0,
    rationale:
      "Slightly above zero temperature gives the model room to explore while keeping logical chains stable.",
  },
  factual: {
    label: "Factual Q&A",
    temperature: 0.1,
    top_p: 0.8,
    top_k: 20,
    presence_penalty: 0,
    frequency_penalty: 0,
    rationale:
      "Near-deterministic settings minimise hallucination when the user wants a single correct answer.",
  },
  roleplay: {
    label: "Roleplay / persona",
    temperature: 0.85,
    top_p: 0.95,
    top_k: 60,
    presence_penalty: 0.4,
    frequency_penalty: 0.4,
    rationale:
      "Higher diversity keeps dialogue fresh; frequency penalty stops the persona from looping catchphrases.",
  },
};

export function AiSamplingSettingsHelper() {
  const [useCase, setUseCase] = useState<UseCase>("creative");
  const preset = useMemo(() => PRESETS[useCase], [useCase]);

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600">
        Pick a use case and get a recommended sampling configuration for
        OpenAI-style APIs. Values are starting points&mdash;tune from here.
      </p>
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Use case
        </span>
        <select
          value={useCase}
          onChange={(e) => setUseCase(e.target.value as UseCase)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {(Object.keys(PRESETS) as UseCase[]).map((k) => (
            <option key={k} value={k}>
              {PRESETS[k].label}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Stat label="Temperature" value={preset.temperature.toFixed(2)} />
        <Stat label="top_p" value={preset.top_p.toFixed(2)} />
        <Stat label="top_k" value={String(preset.top_k)} />
        <Stat
          label="presence"
          value={preset.presence_penalty.toFixed(1)}
        />
        <Stat
          label="frequency"
          value={preset.frequency_penalty.toFixed(1)}
        />
      </div>
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
          Rationale
        </div>
        <div className="text-sm text-slate-700 mt-1">{preset.rationale}</div>
      </div>
      <div className="rounded-xl border border-slate-200 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
          JSON snippet
        </div>
        <pre className="text-xs font-mono text-slate-800 overflow-x-auto">{`{
  "temperature": ${preset.temperature},
  "top_p": ${preset.top_p},
  "top_k": ${preset.top_k},
  "presence_penalty": ${preset.presence_penalty},
  "frequency_penalty": ${preset.frequency_penalty}
}`}</pre>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
        {label}
      </div>
      <div className="text-xl font-semibold tabular-nums text-brand">
        {value}
      </div>
    </div>
  );
}
