"use client";

import { useMemo, useState } from "react";

export function ResumeSkeletonBuilder() {
  const [name, setName] = useState("Jane Doe");
  const [role, setRole] = useState("Senior Product Designer");
  const [email, setEmail] = useState("jane@example.com");
  const [phone, setPhone] = useState("+1 555 000 1234");
  const [location, setLocation] = useState("Lisbon, Portugal");
  const [links, setLinks] = useState("linkedin.com/in/jane · janedoe.design");
  const [summary, setSummary] = useState("Designer with 8+ years shipping B2B SaaS. Led the redesign of X that raised activation 32%.");
  const [experience, setExperience] = useState(
    `Senior Product Designer — Acme Corp (2023–Present)\n• Owned the redesign of core billing flow, lifting trial → paid by 18%.\n• Built and documented a 400-component design system used across 6 squads.\n\nProduct Designer — Beta Inc (2020–2023)\n• Shipped mobile onboarding that cut drop-off from 44% to 21%.\n• Partnered with research on 12 quarterly studies.`,
  );
  const [skills, setSkills] = useState("Figma, Design Systems, User Research, Prototyping, HTML/CSS, Accessibility");
  const [education, setEducation] = useState("BA Design — University of Porto (2016)");
  const [copied, setCopied] = useState(false);

  const md = useMemo(() => `# ${name}\n**${role}**\n\n${email} · ${phone} · ${location}\n${links}\n\n## Summary\n${summary}\n\n## Experience\n${experience}\n\n## Skills\n${skills}\n\n## Education\n${education}\n`, [name, role, email, phone, location, links, summary, experience, skills, education]);

  function copy() {
    navigator.clipboard?.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function download() {
    const blob = new Blob([md], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name.replace(/\s+/g, "-").toLowerCase()}-resume.md`;
    a.click();
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Name</span><input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Role</span><input value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Email</span><input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Phone</span><input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Location</span><input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Links (dot-separated)</span><input value={links} onChange={(e) => setLinks(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Summary (1–2 sentences)</span><textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" /></label>
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Experience (one block per role)</span><textarea value={experience} onChange={(e) => setExperience(e.target.value)} rows={8} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" /></label>
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Skills (comma-separated)</span><input value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Education</span><textarea value={education} onChange={(e) => setEducation(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" /></label>
      </div>

      <pre className="rounded-xl bg-slate-50 p-4 text-sm whitespace-pre-wrap max-h-96 overflow-auto">{md}</pre>

      <div className="flex gap-2">
        <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">{copied ? "Copied" : "Copy Markdown"}</button>
        <button onClick={download} className="bg-slate-900 text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-800">Download .md</button>
      </div>
      <p className="text-xs text-slate-500">Skeleton-only. Fill in the blanks with real accomplishments and quantified impact.</p>
    </div>
  );
}
