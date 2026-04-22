"use client";

import { useEffect, useRef, useState } from "react";

export function SpeechToText() {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("en-US");
  const [finalText, setFinalText] = useState("");
  const [interim, setInterim] = useState("");
  const [copied, setCopied] = useState(false);
  const recRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) setSupported(false);
  }, []);

  function start() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.lang = lang;
    r.interimResults = true;
    r.continuous = true;
    r.onresult = (e: any) => {
      let fin = "";
      let inter = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) fin += t + " ";
        else inter += t;
      }
      if (fin) setFinalText((p) => p + fin);
      setInterim(inter);
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recRef.current = r;
    r.start();
    setListening(true);
  }

  function stop() {
    recRef.current?.stop();
    setListening(false);
  }

  function clear() {
    setFinalText("");
    setInterim("");
  }

  function copy() {
    navigator.clipboard?.writeText((finalText + interim).trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (!supported) {
    return <div className="rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm p-4">Your browser doesn't support the Web Speech API. Use Chrome, Edge, or Safari on desktop.</div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-center">
        <label className="flex items-center gap-2 text-sm">
          Language
          <select value={lang} onChange={(e) => setLang(e.target.value)} disabled={listening} className="rounded-lg border border-slate-300 px-2 py-1">
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es-ES">Spanish (Spain)</option>
            <option value="es-MX">Spanish (Mexico)</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
            <option value="it-IT">Italian</option>
            <option value="pt-BR">Portuguese (Brazil)</option>
            <option value="pt-PT">Portuguese (Portugal)</option>
            <option value="nl-NL">Dutch</option>
            <option value="pl-PL">Polish</option>
            <option value="ru-RU">Russian</option>
            <option value="ja-JP">Japanese</option>
            <option value="zh-CN">Chinese (Simplified)</option>
            <option value="ko-KR">Korean</option>
            <option value="ar-SA">Arabic</option>
            <option value="hi-IN">Hindi</option>
          </select>
        </label>
        {!listening ? (
          <button onClick={start} className="ml-auto bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Start listening</button>
        ) : (
          <button onClick={stop} className="ml-auto bg-red-500 text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-red-600">Stop</button>
        )}
      </div>

      <div className="rounded-xl bg-slate-50 p-4 min-h-[200px] text-sm leading-relaxed whitespace-pre-wrap">
        {finalText}
        <span className="text-slate-400">{interim}</span>
        {listening && <span className="inline-block w-2 h-5 bg-red-500 animate-pulse ml-1 align-middle" />}
        {!finalText && !interim && !listening && <span className="text-slate-400">Click Start listening and speak.</span>}
      </div>

      <div className="flex gap-2">
        <button onClick={copy} disabled={!finalText} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark disabled:opacity-50">{copied ? "Copied" : "Copy transcript"}</button>
        <button onClick={clear} disabled={!finalText} className="bg-slate-200 text-slate-800 font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-300 disabled:opacity-50">Clear</button>
      </div>
    </div>
  );
}
