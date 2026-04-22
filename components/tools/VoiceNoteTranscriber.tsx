"use client";

import { useEffect, useRef, useState } from "react";

export function VoiceNoteTranscriber() {
  const [supported, setSupported] = useState(true);
  const [recording, setRecording] = useState(false);
  const [lang, setLang] = useState("en-US");
  const [audioUrl, setAudioUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [err, setErr] = useState("");
  const recRef = useRef<any>(null);
  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) setSupported(false);
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      recRef.current?.stop?.();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  async function start() {
    setErr("");
    setAudioUrl("");
    setTranscript("");
    setInterim("");
    setElapsed(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
      const mrec = new MediaRecorder(stream, { mimeType: mime });
      chunksRef.current = [];
      mrec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      mrec.onstop = () => {
        setAudioUrl(URL.createObjectURL(new Blob(chunksRef.current, { type: mime })));
        stream.getTracks().forEach((t) => t.stop());
      };
      mrec.start(250);
      mediaRecRef.current = mrec;

      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const r = new SR();
      r.lang = lang;
      r.interimResults = true;
      r.continuous = true;
      r.onresult = (e: any) => {
        let fin = "";
        let inter = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript;
          if (e.results[i].isFinal) fin += t + " "; else inter += t;
        }
        if (fin) setTranscript((p) => p + fin);
        setInterim(inter);
      };
      r.onerror = (e: any) => setErr(`Recognition: ${e.error}`);
      recRef.current = r;
      r.start();

      setRecording(true);
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } catch (e: any) {
      setErr(e?.message ?? "Microphone denied.");
    }
  }

  function stop() {
    mediaRecRef.current?.stop();
    recRef.current?.stop?.();
    clearInterval(timerRef.current);
    setRecording(false);
  }

  function downloadAudio() {
    if (!audioUrl) return;
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `note-${Date.now()}.webm`;
    a.click();
  }

  function downloadText() {
    const blob = new Blob([transcript], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `note-${Date.now()}.txt`;
    a.click();
  }

  if (!supported) {
    return <div className="rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm p-4">Your browser doesn't support Web Speech API. Use Chrome, Edge, or Safari.</div>;
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="space-y-5">
      {err && <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm p-3">{err}</div>}

      <label className="flex items-center gap-2 text-sm">
        Language
        <select value={lang} onChange={(e) => setLang(e.target.value)} disabled={recording} className="rounded-lg border border-slate-300 px-2 py-1">
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="es-ES">Spanish</option>
          <option value="fr-FR">French</option>
          <option value="de-DE">German</option>
          <option value="pt-BR">Portuguese (BR)</option>
          <option value="it-IT">Italian</option>
          <option value="ja-JP">Japanese</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="ko-KR">Korean</option>
          <option value="hi-IN">Hindi</option>
          <option value="ar-SA">Arabic</option>
        </select>
      </label>

      <div className="rounded-xl bg-slate-50 p-6 flex flex-col items-center gap-3">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ${recording ? "bg-red-500 animate-pulse" : "bg-slate-400"}`}>●</div>
        <div className="font-mono text-xl tabular-nums">{mm}:{ss}</div>
        {!recording ? (
          <button onClick={start} className="bg-brand text-white font-semibold rounded-lg px-6 py-2 hover:bg-brand-dark">Start note</button>
        ) : (
          <button onClick={stop} className="bg-red-500 text-white font-semibold rounded-lg px-6 py-2 hover:bg-red-600">Stop</button>
        )}
      </div>

      {(transcript || interim) && (
        <div className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed whitespace-pre-wrap">
          {transcript}<span className="text-slate-400">{interim}</span>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        <button onClick={downloadText} disabled={!transcript} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark disabled:opacity-50">Download transcript</button>
        <button onClick={downloadAudio} disabled={!audioUrl} className="bg-slate-900 text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-800 disabled:opacity-50">Download audio</button>
      </div>
      {audioUrl && <audio src={audioUrl} controls className="w-full" />}
    </div>
  );
}
