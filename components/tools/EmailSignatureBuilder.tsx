"use client";

import { useMemo, useState } from "react";

export function EmailSignatureBuilder() {
  const [name, setName] = useState("Jane Doe");
  const [title, setTitle] = useState("Head of Product");
  const [company, setCompany] = useState("Acme Corp");
  const [email, setEmail] = useState("jane@acme.com");
  const [phone, setPhone] = useState("+1 555 123 4567");
  const [website, setWebsite] = useState("acme.com");
  const [accent, setAccent] = useState("#4f46e5");
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => `<table cellpadding="0" cellspacing="0" style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#111827;">
  <tr>
    <td style="padding-right:16px;border-right:3px solid ${accent};">
      <div style="font-weight:700;font-size:16px;">${name}</div>
      <div style="color:#6b7280;">${title}${company ? ` · ${company}` : ""}</div>
    </td>
    <td style="padding-left:16px;">
      ${email ? `<div><a href="mailto:${email}" style="color:${accent};text-decoration:none;">${email}</a></div>` : ""}
      ${phone ? `<div style="color:#374151;">${phone}</div>` : ""}
      ${website ? `<div><a href="https://${website.replace(/^https?:\/\//, "")}" style="color:${accent};text-decoration:none;">${website}</a></div>` : ""}
    </td>
  </tr>
</table>`, [name, title, company, email, phone, website, accent]);

  async function copyHtml() {
    try {
      await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([html], { type: "text/html" }), "text/plain": new Blob([html], { type: "text/plain" }) })]);
    } catch {
      await navigator.clipboard.writeText(html);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Name</span><input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Title</span><input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Company</span><input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Email</span><input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Phone</span><input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Website</span><input value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Accent color</span><input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="h-10 rounded-lg border border-slate-300" /></label>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 p-5">
        <div className="text-xs text-slate-500 mb-3 uppercase tracking-wide font-semibold">Preview</div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <details className="rounded-lg border border-slate-200">
        <summary className="px-3 py-2 cursor-pointer text-sm font-medium">Show HTML source</summary>
        <pre className="text-xs font-mono whitespace-pre-wrap p-3 bg-slate-50 overflow-auto">{html}</pre>
      </details>

      <button onClick={copyHtml} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
        {copied ? "Copied" : "Copy signature (rich HTML)"}
      </button>
      <p className="text-xs text-slate-500">Paste into Gmail / Outlook / Apple Mail signature settings.</p>
    </div>
  );
}
