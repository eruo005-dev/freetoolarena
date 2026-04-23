"use client";

import { useMemo, useState } from "react";

type Model = {
  id: string;
  label: string;
  pricePerMillion: number;
};

const MODELS: Model[] = [
  { id: "oai-small", label: "OpenAI text-embedding-3-small", pricePerMillion: 0.02 },
  { id: "oai-large", label: "OpenAI text-embedding-3-large", pricePerMillion: 0.13 },
  { id: "voyage-3", label: "Voyage-3", pricePerMillion: 0.06 },
  { id: "cohere-v3", label: "Cohere embed-v3", pricePerMillion: 0.1 },
];

export function EmbeddingCostEstimator() {
  const [docs, setDocs] = useState(100000);
  const [tokensPerDoc, setTokensPerDoc] = useState(500);
  const [modelId, setModelId] = useState<string>(MODELS[0].id);

  const model = useMemo(
    () => MODELS.find((m) => m.id === modelId) ?? MODELS[0],
    [modelId]
  );

  const { totalTokens, cost } = useMemo(() => {
    const total = Math.max(0, docs) * Math.max(0, tokensPerDoc);
    const c = (total / 1_000_000) * model.pricePerMillion;
    return { totalTokens: total, cost: c };
  }, [docs, tokensPerDoc, model]);

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600">
        Estimate how much it costs to embed a corpus into a vector database
        once. Re-embedding on every update multiplies the bill.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Number of documents
          </span>
          <input
            type="number"
            min={0}
            value={docs}
            onChange={(e) => setDocs(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Avg tokens per document
          </span>
          <input
            type="number"
            min={0}
            value={tokensPerDoc}
            onChange={(e) => setTokensPerDoc(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Embedding model
        </span>
        <select
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {MODELS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label} &mdash; ${m.pricePerMillion.toFixed(3)}/1M tokens
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
            Total tokens
          </div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {totalTokens.toLocaleString()}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
            One-off cost
          </div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            ${cost.toFixed(2)}
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Prices are list rates as published by each vendor; volume discounts may
        apply. Query-side embedding cost is separate and usually much smaller.
      </p>
    </div>
  );
}
