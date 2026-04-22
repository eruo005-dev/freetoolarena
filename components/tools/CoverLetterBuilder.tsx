"use client";

import { useMemo, useState } from "react";

export function CoverLetterBuilder() {
  const [yourName, setYourName] = useState("Jane Doe");
  const [role, setRole] = useState("Senior Frontend Engineer");
  const [company, setCompany] = useState("Acme Corp");
  const [hiringManager, setHiringManager] = useState("the Hiring Team");
  const [hook, setHook] = useState("Your mission to make accessible tools felt familiar — I've spent the last four years doing the same at Beta Inc.");
  const [achievement, setAchievement] = useState("led a migration from class components to Next.js App Router that dropped TTI by 38% and freed two engineers from on-call");
  const [fit, setFit] = useState("TypeScript, React, Next.js, design systems, and partnering with designers on performance budgets");
  const [close, setClose] = useState("I'd love to walk you through a recent case study. Thanks for the time.");
  const [copied, setCopied] = useState(false);

  const letter = useMemo(() => {
    const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    return `${today}\n\nDear ${hiringManager},\n\nI'm writing to apply for the ${role} role at ${company}. ${hook}\n\nIn my current role I ${achievement}. That experience maps directly to what ${company} is building, and I'm most effective when I can pair that kind of delivery with mentorship and clear technical writing.\n\nI bring strong hands-on work in ${fit}. More than any single skill, though, I care about shipping tools people actually use — and I'd bring that same bias to ${company}.\n\n${close}\n\nBest regards,\n${yourName}`;
  }, [yourName, role, company, hiringManager, hook, achievement, fit, close]);

  function copy() {
    navigator.clipboard?.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function download() {
    const blob = new Blob([letter], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${yourName.replace(/\s+/g, "-").toLowerCase()}-cover-letter.txt`;
    a.click();
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Your name</span><input value={yourName} onChange={(e) => setYourName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Role</span><input value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Company</span><input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Hiring manager (or "the Hiring Team")</span><input value={hiringManager} onChange={(e) => setHiringManager(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Hook — why this company specifically</span><textarea value={hook} onChange={(e) => setHook(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" /></label>
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Star achievement (one quantified result)</span><textarea value={achievement} onChange={(e) => setAchievement(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" /></label>
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Fit — skills they're hiring for</span><input value={fit} onChange={(e) => setFit(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Close</span><textarea value={close} onChange={(e) => setClose(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" /></label>
      </div>

      <pre className="rounded-xl bg-slate-50 p-4 text-sm whitespace-pre-wrap leading-relaxed max-h-96 overflow-auto">{letter}</pre>

      <div className="flex gap-2">
        <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">{copied ? "Copied" : "Copy letter"}</button>
        <button onClick={download} className="bg-slate-900 text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-800">Download .txt</button>
      </div>
      <p className="text-xs text-slate-500">Structure: today's date → greeting → why this company → star achievement → fit → close. Keep it to one page.</p>
    </div>
  );
}
