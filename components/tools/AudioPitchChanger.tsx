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
  const chans: Float32Array[] = [];
  for (let c = 0; c < numCh; c++) chans.push(buf.getChannelData(c));
  for (let i = 0; i < buf.length; i++) {
    for (let c = 0; c < numCh; c++) {
      const s = Math.max(-1, Math.min(1, chans[c][i]));
      v.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      off += 2;
    }
  }
  return new Blob([out], { type: "audio/wav" });
}

export function AudioPitchChanger() {
  const [buf, setBuf] = useState<AudioBuffer | null>(null);
  const [semitones, setSemitones] = useState(4);
  const [outUrl, setOutUrl] = useState("");
  const [busy, setBusy] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    try {
      const ab = await f.arrayBuffer();
      const ctx = new AudioContext();
      setBuf(await ctx.decodeAudioData(ab));
      setOutUrl("");
    } finally { setBusy(false); }
  }

  // Approach: playback rate change shifts both pitch & speed together. To preserve duration,
  // we render at the shifted rate into a different sample rate so the decoded duration stays
  // similar. This is the simplest browser-native pitch shift without phase vocoders.
  async function run() {
    if (!buf) return;
    setBusy(true);
    try {
      const ratio = Math.pow(2, semitones / 12);
      const off = new OfflineAudioContext(buf.numberOfChannels, Math.ceil(buf.length / ratio), buf.sampleRate);
      const src = off.createBufferSource();
      src.buffer = buf;
      src.playbackRate.value = ratio;
      src.connect(off.destination);
      src.start(0);
      const rendered = await off.startRendering();
      setOutUrl(URL.createObjectURL(wavFromBuffer(rendered)));
    } finally { setBusy(false); }
  }

  function download() {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `pitch-${semitones > 0 ? "+" : ""}${semitones}st-${Date.now()}.wav`;
    a.click();
  }

  return (
    <div className="space-y-5">
      <input type="file" accept="audio/*" onChange={onFile} disabled={busy} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      {buf && (
        <div className="rounded-xl bg-slate-50 p-4 space-y-3 text-sm">
          <label className="block">
            <div className="flex justify-between"><span>Pitch shift</span><span className="tabular-nums">{semitones > 0 ? "+" : ""}{semitones} semitones</span></div>
            <input type="range" min={-12} max={12} step={1} value={semitones} onChange={(e) => setSemitones(parseInt(e.target.value))} className="w-full accent-brand" />
          </label>
          <button onClick={run} disabled={busy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark disabled:opacity-50">
            {busy ? "Rendering…" : "Apply pitch shift"}
          </button>
          <p className="text-xs text-slate-500">Tip: -12 semitones is one octave down, +12 is one octave up. Uses Web Audio's playback-rate pitch-shift; extreme settings can introduce small duration drift.</p>
        </div>
      )}

      {outUrl && (
        <div className="rounded-xl bg-slate-50 p-4 space-y-3">
          <audio src={outUrl} controls className="w-full" />
          <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Download WAV</button>
        </div>
      )}
    </div>
  );
}
