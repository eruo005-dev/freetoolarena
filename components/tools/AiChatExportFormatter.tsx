"use client";

import { useMemo, useState } from "react";

type Turn = { role: string; content: string };

function parseChatGptJson(raw: string): Turn[] | null {
  try {
    const data = JSON.parse(raw);
    if (Array.isArray(data?.mapping) || data?.mapping) {
      // ChatGPT conversations.json: mapping is an object of node ids
      const mapping = data.mapping || data;
      const turns: Turn[] = [];
      for (const id of Object.keys(mapping)) {
        const node = (mapping as any)[id];
        const msg = node?.message;
        if (!msg) continue;
        const role = msg.author?.role;
        const parts = msg.content?.parts;
        if (!role || !parts) continue;
        const body = parts.filter((p: any) => typeof p === "string").join("\n").trim();
        if (!body) continue;
        if (role === "system") continue;
        turns.push({ role, content: body });
      }
      return turns;
    }
    if (Array.isArray(data?.messages)) {
      return data.messages.map((m: any) => ({ role: m.role || "unknown", content: typeof m.content === "string" ? m.content : JSON.stringify(m.content) }));
    }
    if (Array.isArray(data)) {
      return data.map((m: any) => ({ role: m.role || m.author || "unknown", content: typeof m.content === "string" ? m.content : JSON.stringify(m.content) }));
    }
    return null;
  } catch {
    return null;
  }
}

function parseMarkdown(raw: string): Turn[] | null {
  const lines = raw.split("\n");
  const turns: Turn[] = [];
  let current: Turn | null = null;
  for (const line of lines) {
    const m = line.match(/^\s*(?:##?\s+)?(User|Human|Assistant|Claude|ChatGPT|AI|System)\s*:?\s*$/i);
    if (m) {
      if (current) turns.push(current);
      const role = m[1].toLowerCase();
      current = { role: role === "human" ? "user" : (role === "claude" || role === "chatgpt" || role === "ai") ? "assistant" : role, content: "" };
      continue;
    }
    if (current) current.content += (current.content ? "\n" : "") + line;
  }
  if (current) turns.push(current);
  return turns.length ? turns.map((t) => ({ ...t, content: t.content.trim() })).filter((t) => t.content) : null;
}

function parsePlain(raw: string): Turn[] {
  // Fallback: treat alternating paragraphs as user/assistant.
  const blocks = raw.split(/\n\s*\n+/).map((b) => b.trim()).filter(Boolean);
  return blocks.map((b, i) => ({ role: i % 2 === 0 ? "user" : "assistant", content: b }));
}

function parse(raw: string, mode: string): Turn[] {
  if (mode === "json" || raw.trim().startsWith("{") || raw.trim().startsWith("[")) {
    const t = parseChatGptJson(raw);
    if (t && t.length) return t;
  }
  if (mode === "markdown" || /^\s*##?\s+(User|Human|Assistant)/im.test(raw)) {
    const t = parseMarkdown(raw);
    if (t && t.length) return t;
  }
  return parsePlain(raw);
}

function toMarkdown(turns: Turn[]): string {
  return turns.map((t) => `## ${t.role[0].toUpperCase() + t.role.slice(1)}\n\n${t.content}`).join("\n\n");
}
function toHtml(turns: Turn[]): string {
  const style = `body{font-family:ui-sans-serif,system-ui,sans-serif;max-width:720px;margin:2rem auto;padding:0 1rem;color:#0f172a}.turn{margin:1rem 0;padding:.75rem 1rem;border-radius:.75rem}.user{background:#eef2ff}.assistant{background:#f1f5f9}.role{font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;font-weight:700;color:#64748b;margin-bottom:.25rem}pre{background:#0f172a;color:#f1f5f9;padding:.75rem;border-radius:.5rem;overflow:auto}`;
  const body = turns.map((t) => `<div class="turn ${t.role}"><div class="role">${t.role}</div><div>${escape(t.content).replace(/\n/g, "<br>")}</div></div>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><title>Chat export</title><style>${style}</style></head><body>${body}</body></html>`;
}
function escape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function toTxt(turns: Turn[]): string {
  return turns.map((t) => `[${t.role.toUpperCase()}]\n${t.content}`).join("\n\n---\n\n");
}

export function AiChatExportFormatter() {
  const [raw, setRaw] = useState(`## User

What's the capital of France?

## Assistant

Paris is the capital of France. It's located in the north-central part of the country on the Seine river.`);
  const [parseMode, setParseMode] = useState("auto");
  const [out, setOut] = useState<"markdown" | "html" | "txt" | "json">("markdown");
  const [copied, setCopied] = useState(false);

  const turns = useMemo(() => parse(raw, parseMode), [raw, parseMode]);
  const formatted = useMemo(() => {
    if (out === "markdown") return toMarkdown(turns);
    if (out === "html") return toHtml(turns);
    if (out === "txt") return toTxt(turns);
    return JSON.stringify(turns, null, 2);
  }, [turns, out]);

  function copy() {
    navigator.clipboard?.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function download() {
    const ext = out === "markdown" ? "md" : out;
    const blob = new Blob([formatted], { type: out === "html" ? "text/html" : "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `chat-export.${ext}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Paste chat export (ChatGPT JSON, Claude markdown, or plain text)</span>
        <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={10} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
      </label>

      <div className="flex gap-2 flex-wrap">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Input format</span>
          <select value={parseMode} onChange={(e) => setParseMode(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="auto">Auto-detect</option>
            <option value="json">ChatGPT JSON</option>
            <option value="markdown">Markdown</option>
            <option value="plain">Plain text</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Output format</span>
          <select value={out} onChange={(e) => setOut(e.target.value as any)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="markdown">Markdown</option>
            <option value="html">HTML page</option>
            <option value="txt">Plain text</option>
            <option value="json">JSON</option>
          </select>
        </label>
      </div>

      <div className="text-xs text-slate-500">Parsed {turns.length} turn{turns.length === 1 ? "" : "s"}</div>

      <pre className="rounded-xl bg-slate-50 p-4 text-xs font-mono whitespace-pre-wrap max-h-96 overflow-auto">{formatted}</pre>

      <div className="flex gap-2">
        <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">{copied ? "Copied" : "Copy"}</button>
        <button onClick={download} className="bg-slate-100 text-slate-800 font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-200">Download</button>
      </div>
    </div>
  );
}
