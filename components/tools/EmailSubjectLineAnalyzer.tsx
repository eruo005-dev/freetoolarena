"use client";
import { useMemo, useState } from "react";

export function EmailSubjectLineAnalyzer() {
  const [subject, setSubject] = useState("Don&rsquo;t miss our FREE winner giveaway!!!");

  const stats = useMemo(() => analyze(subject), [subject]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Subject line</span>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Characters" value={String(stats.chars)} />
        <Stat label="Words" value={String(stats.words)} />
        <Stat label="All-caps %" value={`${stats.capsPct}%`} />
        <Stat label="Sentiment" value={stats.sentiment} />
      </div>

      <div className="rounded-xl bg-slate-50 p-4 space-y-2">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Inbox preview cutoffs</div>
        <PreviewRow label="Mobile (40)" text={stats.cut40} full={stats.chars > 40} />
        <PreviewRow label="Gmail (50)" text={stats.cut50} full={stats.chars > 50} />
        <PreviewRow label="Desktop (60)" text={stats.cut60} full={stats.chars > 60} />
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Spam-word matches</div>
        <div className="text-sm mt-1">
          {stats.spamHits.length ? stats.spamHits.join(", ") : "None detected"}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">{label}</div>
      <div className="text-lg font-semibold text-slate-800">{value}</div>
    </div>
  );
}

function PreviewRow({ label, text, full }: { label: string; text: string; full: boolean }) {
  return (
    <div className="text-sm">
      <span className="text-xs text-slate-500 mr-2">{label}:</span>
      <span className="font-mono">{text}{full ? "&hellip;" : ""}</span>
    </div>
  );
}

type Analysis = {
  chars: number;
  words: number;
  capsPct: number;
  sentiment: string;
  cut40: string;
  cut50: string;
  cut60: string;
  spamHits: string[];
};

function analyze(s: string): Analysis {
  const chars = s.length;
  const words = s.trim() ? s.trim().split(/\s+/).length : 0;
  const letters = s.replace(/[^A-Za-z]/g, "");
  const caps = letters.replace(/[^A-Z]/g, "").length;
  const capsPct = letters.length ? Math.round((caps / letters.length) * 100) : 0;

  const spamWords = ["free", "winner", "act now", "!!!", "urgent", "guarantee", "cash", "prize"];
  const lower = s.toLowerCase();
  const spamHits = spamWords.filter((w) => lower.includes(w));

  const positive = ["love", "great", "amazing", "win", "save", "bonus", "new", "best"];
  const negative = ["lose", "miss", "expire", "fail", "last chance", "stop"];
  let score = 0;
  positive.forEach((w) => { if (lower.includes(w)) score += 1; });
  negative.forEach((w) => { if (lower.includes(w)) score -= 1; });
  const sentiment = score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";

  return {
    chars,
    words,
    capsPct,
    sentiment,
    cut40: s.slice(0, 40),
    cut50: s.slice(0, 50),
    cut60: s.slice(0, 60),
    spamHits,
  };
}
