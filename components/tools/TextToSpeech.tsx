"use client";

import { useEffect, useRef, useState } from "react";

export function TextToSpeech() {
  const [text, setText] = useState("Hello! Type any text here, pick a voice, and click play to hear it read aloud. This tool uses your browser's built-in speech engine, so no audio ever leaves your device.");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const load = () => {
      const v = speechSynthesis.getVoices();
      setVoices(v);
      if (v.length && !voiceName) {
        const def = v.find((x) => x.default) ?? v[0];
        setVoiceName(def.name);
      }
    };
    load();
    speechSynthesis.onvoiceschanged = load;
    return () => { speechSynthesis.cancel(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function play() {
    if (!text.trim()) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = voices.find((x) => x.name === voiceName);
    if (v) u.voice = v;
    u.rate = rate;
    u.pitch = pitch;
    u.volume = volume;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    uttRef.current = u;
    speechSynthesis.speak(u);
    setSpeaking(true);
  }

  function stop() {
    speechSynthesis.cancel();
    setSpeaking(false);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Text</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </label>

      <div className="grid sm:grid-cols-4 gap-3">
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Voice</span>
          <select value={voiceName} onChange={(e) => setVoiceName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            {voices.map((v) => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
          </select>
        </label>
        <label className="block">
          <div className="flex justify-between"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500">Rate</span><span className="text-xs tabular-nums">{rate.toFixed(2)}</span></div>
          <input type="range" min={0.5} max={2} step={0.05} value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full accent-brand" />
        </label>
        <label className="block">
          <div className="flex justify-between"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500">Pitch</span><span className="text-xs tabular-nums">{pitch.toFixed(2)}</span></div>
          <input type="range" min={0} max={2} step={0.05} value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} className="w-full accent-brand" />
        </label>
      </div>

      <div className="flex gap-2">
        {!speaking ? (
          <button onClick={play} disabled={!text.trim()} className="bg-brand text-white font-semibold rounded-lg px-6 py-2 text-sm hover:bg-brand-dark disabled:opacity-50">Play</button>
        ) : (
          <button onClick={stop} className="bg-red-500 text-white font-semibold rounded-lg px-6 py-2 text-sm hover:bg-red-600">Stop</button>
        )}
      </div>
      <p className="text-xs text-slate-500">Voices available depend on your OS / browser. macOS + iOS have the richest library. Chrome on Windows usually offers Microsoft voices; Edge adds cloud-synthesized voices.</p>
    </div>
  );
}
