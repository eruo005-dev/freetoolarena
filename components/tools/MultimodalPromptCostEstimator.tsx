"use client";

import { useMemo, useState } from "react";

const TEXT_RATE = { in: 3.00, out: 15.00 };
const IMAGE_TOKENS_PER_IMAGE = 1500;
const VIDEO_TOKENS_PER_SECOND = 250;
const AUDIO_TOKENS_PER_MIN = 1500;

export function MultimodalPromptCostEstimator() {
  const [textIn, setTextIn] = useState<number>(2);
  const [images, setImages] = useState<number>(3);
  const [videoSec, setVideoSec] = useState<number>(0);
  const [audioMin, setAudioMin] = useState<number>(0);
  const [outputK, setOutputK] = useState<number>(1);
  const [calls, setCalls] = useState<number>(500);

  const result = useMemo(() => {
    const imageTokens = images * IMAGE_TOKENS_PER_IMAGE / 1000;
    const videoTokens = videoSec * VIDEO_TOKENS_PER_SECOND / 1000;
    const audioTokens = audioMin * AUDIO_TOKENS_PER_MIN / 1000;
    const totalIn = textIn + imageTokens + videoTokens + audioTokens;

    const perCall = (totalIn * TEXT_RATE.in + outputK * TEXT_RATE.out) / 1000;
    const monthly = perCall * calls;
    return { totalIn, perCall, monthly, imageTokens, videoTokens, audioTokens };
  }, [textIn, images, videoSec, audioMin, outputK, calls]);

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 4 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Text input (k tokens)</span>
          <input type="number" min={0} value={textIn} onChange={(e) => setTextIn(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Output (k tokens)</span>
          <input type="number" min={0} value={outputK} onChange={(e) => setOutputK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Images / call</span>
          <input type="number" min={0} value={images} onChange={(e) => setImages(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
          <span className="mt-1 block text-xs text-slate-500">~1.5k tokens / image</span>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Video seconds / call</span>
          <input type="number" min={0} value={videoSec} onChange={(e) => setVideoSec(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
          <span className="mt-1 block text-xs text-slate-500">~250 tokens / second (Gemini)</span>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Audio minutes / call</span>
          <input type="number" min={0} value={audioMin} onChange={(e) => setAudioMin(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
          <span className="mt-1 block text-xs text-slate-500">~1500 tokens / minute</span>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Calls / month</span>
          <input type="number" min={0} value={calls} onChange={(e) => setCalls(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Total input</div>
          <div className="text-xl font-bold text-slate-800">{result.totalIn.toFixed(1)}k tokens</div>
          <div className="mt-1 text-xs text-slate-500">
            text + {result.imageTokens.toFixed(1)}k img + {result.videoTokens.toFixed(1)}k vid + {result.audioTokens.toFixed(1)}k aud
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Per call</div>
          <div className="text-xl font-bold text-slate-800">{fmt(result.perCall)}</div>
        </div>
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
          <div className="text-xs uppercase tracking-wide text-emerald-700">Monthly</div>
          <div className="text-xl font-bold text-emerald-900">{fmt(result.monthly)}</div>
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Numbers used:</strong> 1500 tokens per 1024&times;1024 image, 250 tokens/sec for 1fps video,
        1500 tokens/minute for audio &mdash; these are Gemini 2.5 / Claude 4.x defaults. GPT-5 vision uses
        a slightly different patch-based formula but the per-image cost lands within 10% of these numbers.
      </div>
    </div>
  );
}
