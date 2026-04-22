"use client";

import { useState } from "react";

function wavFromBuffer(buf: AudioBuffer): Blob {
  const numCh = buf.numberOfChannels;
  const sr = buf.sampleRate;
  const length = buf.length * numCh * 2 + 44;
  const out = new ArrayBuffer(length);
  const v = new DataView(out);
  let off = 0;
  const ws = (s: string) => { for (let i = 0; i < s.length; i++) v.setUint8(off++, s.charCodeAt(i)); };
  const u32 = (n: number) => { v.setUint32(off, n, true); off += 4; };
  const u16 = (n: number) => { v.setUint16(off, n, true); off += 2; };
  ws("RIFF"); u32(length - 8); ws("WAVE"); ws("fmt ");
  u32(16); u16(1); u16(numCh); u32(sr); u32(sr * numCh * 2); u16(numCh * 2); u16(16);
  ws("data"); u32(buf.length * numCh * 2);
  const channels: Float32Array[] = [];
  for (let c = 0; c < numCh; c++) channels.push(buf.getChannelData(c));
  for (let i = 0; i < buf.length; i++) {
    for (let c = 0; c < numCh; c++) {
      const s = Math.max(-1, Math.min(1, channels[c][i]));
      v.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      off += 2;
    }
  }
  return new Blob([out], { type: "audio/wav" });
}

function removeSilence(buf: AudioBuffer, threshold: number, minMs: number): { out: AudioBuffer; removedMs: number } {
  const sr = buf.sampleRate;
  const minSamples = Math.floor((minMs / 1000) * sr);
  const frame = Math.max(1, Math.floor(sr * 0.02)); // 20ms
  const ch = buf.getChannelData(0);
  const keep: Array<[number, number]> = [];

  let segStart = 0;
  let silent = true;
  let silentRun = 0;

  for (let i = 0; i < ch.length; i += frame) {
    let peak = 0;
    for (let j = i; j < Math.min(i + frame, ch.length); j++) {
      const v = Math.abs(ch[j]);
      if (v > peak) peak = v;
    }
    const isSilent = peak < threshold;
    if (isSilent) {
      silentRun += frame;
      if (!silent && silentRun > minSamples) {
        keep.push([segStart, i - silentRun + frame]);
        silent = true;
      }
    } else {
      if (silent) {
        segStart = i;
        silent = false;
      }
      silentRun = 0;
    }
  }
  if (!silent) keep.push([segStart, ch.length]);

  const kept = keep.reduce((a, [s, e]) => a + (e - s), 0);
  const removedMs = Math.round(((ch.length - kept) / sr) * 1000);

  const out = new AudioBuffer({ length: kept, sampleRate: sr, numberOfChannels: buf.numberOfChannels });
  for (let c = 0; c < buf.numberOfChannels; c++) {
    const src = buf.getChannelData(c);
    const dst = out.getChannelData(c);
    let off = 0;
    for (const [s, e] of keep) {
      dst.set(src.subarray(s, e), off);
      off += e - s;
    }
  }
  return { out, removedMs };
}

export function AudioSilenceRemover() {
  const [buf, setBuf] = useState<AudioBuffer | null>(null);
  const [threshold, setThreshold] = useState(0.02);
  const [minMs, setMinMs] = useState(300);
  const [outUrl, setOutUrl] = useState("");
  const [stats, setStats] = useState<{ before: number; after: number; removed: number } | null>(null);
  const [busy, setBusy] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    try {
      const ab = await f.arrayBuffer();
      const ctx = new AudioContext();
      const b = await ctx.decodeAudioData(ab);
      setBuf(b);
      setOutUrl("");
      setStats(null);
    } finally {
      setBusy(false);
    }
  }

  function run() {
    if (!buf) return;
    const { out, removedMs } = removeSilence(buf, threshold, minMs);
    const blob = wavFromBuffer(out);
    setOutUrl(URL.createObjectURL(blob));
    setStats({ before: Math.round(buf.duration * 1000), after: Math.round((out.length / out.sampleRate) * 1000), removed: removedMs });
  }

  function download() {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `desilenced-${Date.now()}.wav`;
    a.click();
  }

  return (
    <div className="space-y-5">
      <input type="file" accept="audio/*" onChange={onFile} disabled={busy} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      {buf && (
        <div className="rounded-xl bg-slate-50 p-4 space-y-3 text-sm">
          <label className="block">
            <div className="flex justify-between"><span>Silence threshold</span><span className="tabular-nums">{threshold.toFixed(3)}</span></div>
            <input type="range" min={0.001} max={0.1} step={0.001} value={threshold} onChange={(e) => setThreshold(parseFloat(e.target.value))} className="w-full accent-brand" />
          </label>
          <label className="block">
            <div className="flex justify-between"><span>Min silence length (ms)</span><span className="tabular-nums">{minMs}</span></div>
            <input type="range" min={50} max={2000} step={10} value={minMs} onChange={(e) => setMinMs(parseInt(e.target.value))} className="w-full accent-brand" />
          </label>
          <button onClick={run} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Remove silence</button>
        </div>
      )}

      {outUrl && stats && (
        <div className="rounded-xl bg-slate-50 p-4 space-y-3">
          <div className="text-sm">Before: {(stats.before / 1000).toFixed(1)}s → After: {(stats.after / 1000).toFixed(1)}s · Saved {(stats.removed / 1000).toFixed(1)}s</div>
          <audio src={outUrl} controls className="w-full" />
          <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Download WAV</button>
        </div>
      )}
    </div>
  );
}
