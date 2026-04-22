"use client";

import { useMemo, useState } from "react";

const MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  '"': ".-..-.", "$": "...-..-", "@": ".--.-.",
};

const REV: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE).map(([k, v]) => [v, k]),
);

function textToMorse(t: string): string {
  return t
    .toUpperCase()
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map((c) => MORSE[c] || "")
        .filter(Boolean)
        .join(" "),
    )
    .join(" / ");
}

function morseToText(m: string): string {
  return m
    .split("/")
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .map((code) => REV[code] || "")
        .join(""),
    )
    .join(" ");
}

export function MorseCodeTranslator() {
  const [text, setText] = useState("SOS SAVE ME");
  const [wpm, setWpm] = useState(15);
  const morse = useMemo(() => textToMorse(text), [text]);
  const backToText = useMemo(() => morseToText(morse), [morse]);

  async function playMorse() {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const dit = 1.2 / wpm;
    let t = ctx.currentTime + 0.1;
    for (const ch of morse) {
      if (ch === ".") {
        beep(ctx, t, dit); t += dit * 2;
      } else if (ch === "-") {
        beep(ctx, t, dit * 3); t += dit * 4;
      } else if (ch === " ") {
        t += dit * 2;
      } else if (ch === "/") {
        t += dit * 6;
      }
    }
    setTimeout(() => ctx.close(), (t - ctx.currentTime + 0.2) * 1000);
  }

  function beep(ctx: AudioContext, start: number, dur: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 650;
    osc.connect(gain).connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.3, start + 0.01);
    gain.gain.setValueAtTime(0.3, start + dur - 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.start(start);
    osc.stop(start + dur + 0.01);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Text input</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="rounded-xl bg-slate-50 p-4 space-y-3">
        <div>
          <span className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Morse</span>
          <p className="font-mono text-sm break-all mt-1">{morse}</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Round-trip decode</span>
          <p className="font-mono text-sm break-all mt-1">{backToText}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm">
          Speed (WPM):
          <input type="number" min={5} max={40} value={wpm} onChange={(e) => setWpm(Math.max(5, parseInt(e.target.value) || 15))}
            className="w-20 rounded-lg border border-slate-300 px-2 py-1" />
        </label>
        <button onClick={playMorse} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
          Play audio
        </button>
      </div>
    </div>
  );
}
