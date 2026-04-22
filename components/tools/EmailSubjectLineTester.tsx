"use client";

import { useMemo, useState } from "react";

const SPAM_TRIGGERS = ["free", "guarantee", "act now", "urgent", "click here", "winner", "$$$", "100%"];
const POSITIVE_WORDS = ["love", "great", "awesome", "happy", "win", "exclusive", "new", "best", "thank", "welcome"];
const NEGATIVE_WORDS = ["problem", "warning", "fail", "lost", "hate", "worst", "never", "sorry", "bad"];

export function EmailSubjectLineTester() {
  const [subject, setSubject] = useState("Your weekly roundup is here");
  const [preheader, setPreheader] = useState("5 new articles, hand-picked for you.");
  const [sender, setSender] = useState("Acme Newsletter");

  const analysis = useMemo(() => {
    const chars = subject.length;
    const words = subject.trim().split(/\s+/).filter(Boolean).length;
    const lower = subject.toLowerCase();
    const hits = SPAM_TRIGGERS.filter((t) => lower.includes(t));
    const spamScore = Math.min(100, hits.length * 25 + (subject === subject.toUpperCase() && subject.length > 3 ? 20 : 0) + (/!{2,}/.test(subject) ? 15 : 0));
    const pos = POSITIVE_WORDS.reduce((acc, w) => acc + (lower.includes(w) ? 1 : 0), 0);
    const neg = NEGATIVE_WORDS.reduce((acc, w) => acc + (lower.includes(w) ? 1 : 0), 0);
    const sentiment = pos > neg ? "Positive" : neg > pos ? "Negative" : "Neutral";
    const desktopOk = chars >= 40 && chars <= 60;
    const mobileOk = chars >= 30 && chars <= 40;
    return { chars, words, hits, spamScore, sentiment, desktopOk, mobileOk };
  }, [subject]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Sender name</span>
        <input
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Subject line</span>
        <textarea
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Preheader (optional)</span>
        <textarea
          value={preheader}
          onChange={(e) => setPreheader(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="text-xs uppercase text-slate-500">Characters</div>
          <div className="text-2xl font-bold text-slate-800">{analysis.chars}</div>
          <div className="text-xs text-slate-500">Desktop {analysis.desktopOk ? "ok" : "off"} / Mobile {analysis.mobileOk ? "ok" : "off"}</div>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="text-xs uppercase text-slate-500">Words</div>
          <div className="text-2xl font-bold text-slate-800">{analysis.words}</div>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="text-xs uppercase text-slate-500">Spam score</div>
          <div className="text-2xl font-bold text-slate-800">{analysis.spamScore}%</div>
          {analysis.hits.length > 0 && <div className="text-xs text-rose-600">{analysis.hits.join(", ")}</div>}
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="text-xs uppercase text-slate-500">Sentiment</div>
          <div className="text-2xl font-bold text-slate-800">{analysis.sentiment}</div>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-slate-700 mb-2">Inbox preview</div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">
              {sender.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-800 truncate">{sender || "Sender"}</span>
                <span className="text-xs text-slate-500">now</span>
              </div>
              <div className="truncate text-slate-800">{subject || "(no subject)"}</div>
              <div className="truncate text-sm text-slate-500">{preheader}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
