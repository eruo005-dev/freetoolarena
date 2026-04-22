"use client";

import { useEffect, useRef, useState } from "react";

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

export function AudioTrimmer() {
  const [buf, setBuf] = useState<AudioBuffer | null>(null);
  const [url, setUrl] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [busy, setBusy] = useState(false);
  const [outUrl, setOutUrl] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    try {
      const ab = await f.arrayBuffer();
      const ctx = new AudioContext();
      const b = await ctx.decodeAudioData(ab);
      setBuf(b);
      setUrl(URL.createObjectURL(f));
      setStart(0);
      setEnd(b.duration);
      setOutUrl("");
    } finally {
      setBusy(false);
    }
  }

  function trim() {
    if (!buf) return;
    const s = Math.max(0, Math.min(start, buf.duration));
    const e = Math.max(s, Math.min(end, buf.duration));
    const sampleStart = Math.floor(s * buf.sampleRate);
    const sampleEnd = Math.floor(e * buf.sampleRate);
    const len = sampleEnd - sampleStart;
    if (len <= 0) return;
    const ctx = new OfflineAudioContext(buf.numberOfChannels, len, buf.sampleRate);
    const out = ctx.createBuffer(buf.numberOfChannels, len, buf.sampleRate);
    for (let c = 0; c < buf.numberOfChannels; c++) {
      const src = buf.getChannelData(c).slice(sampleStart, sampleEnd);
      out.copyToChannel(src, c);
    }
    const blob = wavFromBuffer(out);
    setOutUrl(URL.createObjectURL(blob));
  }

  function download() {
    if (!outUrl) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = `trimmed-${Date.now()}.wav`;
    a.click();
  }

  const fmt = (n: number) => `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, "0")}`;

  return (
    <div className="space-y-5">
      <input type="file" accept="audio/*" onChange={onFile} disabled={busy} className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:text-white file:px-4 file:py-2 file:font-semibold hover:file:bg-brand-dark" />

      {busy && <p className="text-sm text-slate-500">Decoding…</p>}

      {buf && (
        <>
          <audio ref={audioRef} src={url} controls className="w-full" />
          <div className="rounded-xl bg-slate-50 p-4 space-y-3 text-sm">
            <div>Duration: <strong>{fmt(buf.duration)}</strong> · {buf.sampleRate} Hz · {buf.numberOfChannels} ch</div>
            <div>
              <label className="block">
                <div className="flex justify-between"><span>Start: {fmt(start)}</span></div>
                <input type="range" min={0} max={buf.duration} step={0.01} value={start} onChange={(ev) => setStart(parseFloat(ev.target.value))} className="w-full accent-brand" />
              </label>
              <label className="block">
                <div className="flex justify-between"><span>End: {fmt(end)}</span></div>
                <input type="range" min={0} max={buf.duration} step={0.01} value={end} onChange={(ev) => setEnd(parseFloat(ev.target.value))} className="w-full accent-brand" />
              </label>
            </div>
            <button onClick={trim} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Trim to selection</button>
          </div>
        </>
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
