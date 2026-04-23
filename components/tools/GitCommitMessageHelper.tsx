"use client";

import { useMemo, useState } from "react";

const TYPES = ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"] as const;
type CommitType = (typeof TYPES)[number];

export function GitCommitMessageHelper() {
  const [type, setType] = useState<CommitType>("feat");
  const [scope, setScope] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [breaking, setBreaking] = useState(false);
  const [breakingDesc, setBreakingDesc] = useState("");
  const [issueRef, setIssueRef] = useState("");
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    const scopePart = scope.trim() ? `(${scope.trim()})` : "";
    const bang = breaking ? "!" : "";
    const subject = `${type}${scopePart}${bang}: ${summary.trim() || "short description"}`;
    const parts: string[] = [subject];
    if (body.trim()) {
      parts.push("");
      parts.push(body.trim());
    }
    const footers: string[] = [];
    if (breaking && breakingDesc.trim()) footers.push(`BREAKING CHANGE: ${breakingDesc.trim()}`);
    if (issueRef.trim()) footers.push(`Refs: ${issueRef.trim()}`);
    if (footers.length) {
      parts.push("");
      parts.push(footers.join("\n"));
    }
    return parts.join("\n");
  }, [type, scope, summary, body, breaking, breakingDesc, issueRef]);

  const onCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const subjectLen = message.split("\n")[0].length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as CommitType)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Scope (optional)</label>
          <input value={scope} onChange={(e) => setScope(e.target.value)} placeholder="api, ui, auth..." className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Summary</label>
        <input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="add login rate-limit" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
        <p className={`mt-1 text-xs ${subjectLen > 72 ? "text-rose-600" : "text-slate-500"}`}>{subjectLen} chars (keep subject under 72)</p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Body (optional)</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="Explain what and why, not how." className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
      </div>
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={breaking} onChange={(e) => setBreaking(e.target.checked)} />
          Breaking change
        </label>
        {breaking && (
          <input value={breakingDesc} onChange={(e) => setBreakingDesc(e.target.value)} placeholder="describe what breaks and migration path" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
        )}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Issue reference (optional)</label>
          <input value={issueRef} onChange={(e) => setIssueRef(e.target.value)} placeholder="#123, JIRA-456" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
        </div>
      </div>
      <pre className="rounded-lg bg-slate-900 text-slate-100 p-3 text-xs overflow-auto whitespace-pre-wrap">{message}</pre>
      <button onClick={onCopy} className="rounded-lg bg-brand text-white px-4 py-2 text-sm font-semibold">
        {copied ? "Copied" : "Copy commit message"}
      </button>
    </div>
  );
}
