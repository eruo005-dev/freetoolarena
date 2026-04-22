"use client";

import { useState } from "react";

const SAMPLE =
  "select u.id, u.name, count(o.id) as total from users u left join orders o on o.user_id = u.id where u.active = true and u.created_at > '2024-01-01' group by u.id, u.name having count(o.id) > 5 order by total desc limit 20";

const MULTI_WORD = [
  "LEFT JOIN",
  "RIGHT JOIN",
  "INNER JOIN",
  "OUTER JOIN",
  "GROUP BY",
  "ORDER BY",
  "INSERT INTO",
  "DELETE FROM",
];

const SINGLE_WORD = [
  "SELECT",
  "FROM",
  "WHERE",
  "AND",
  "OR",
  "JOIN",
  "ON",
  "HAVING",
  "LIMIT",
  "UNION",
  "VALUES",
  "UPDATE",
  "SET",
];

const LINE_BREAK_KEYWORDS = [...MULTI_WORD, ...SINGLE_WORD];

const INDENT_CHILDREN = new Set(["AND", "OR", "ON"]);

function normalize(sql: string): string {
  let out = sql.replace(/\s+/g, " ").trim();
  const all = [...MULTI_WORD, ...SINGLE_WORD].sort((a, b) => b.length - a.length);
  for (const kw of all) {
    const re = new RegExp(`\\b${kw.replace(/\s+/g, "\\s+")}\\b`, "gi");
    out = out.replace(re, kw);
  }
  return out;
}

function formatSql(sql: string): string {
  const normalized = normalize(sql);
  const pattern = new RegExp(
    `\\b(${LINE_BREAK_KEYWORDS.map((k) => k.replace(/\s+/g, "\\s+")).join("|")})\\b`,
    "g",
  );
  const segments: { kw: string | null; text: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(normalized)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ kw: null, text: normalized.slice(lastIndex, match.index).trim() });
    }
    const rest = normalized.slice(match.index + match[0].length);
    const next = pattern.exec(rest);
    pattern.lastIndex = match.index + match[0].length;
    const nextIdx = next ? match.index + match[0].length + next.index : normalized.length;
    segments.push({
      kw: match[1].toUpperCase(),
      text: normalized.slice(match.index + match[0].length, nextIdx).trim(),
    });
    lastIndex = nextIdx;
  }
  if (lastIndex < normalized.length && segments.length === 0) {
    return normalized;
  }
  const lines: string[] = [];
  for (const seg of segments) {
    if (seg.kw === null) {
      if (seg.text) lines.push(seg.text);
      continue;
    }
    const indent = INDENT_CHILDREN.has(seg.kw) ? "  " : "";
    lines.push(`${indent}${seg.kw}${seg.text ? " " + seg.text : ""}`);
  }
  return lines.join("\n");
}

function minifySql(sql: string): string {
  return normalize(sql);
}

export function SqlFormatter({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [mode, setMode] = useState<"format" | "minify">("format");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function run() {
    setOutput(mode === "format" ? formatSql(input) : minifySql(input));
  }

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const btn = (active: boolean) =>
    `rounded-md border px-3 py-2 text-sm font-semibold ${
      active
        ? "bg-brand text-white border-brand"
        : "bg-white text-slate-700 border-slate-300 hover:border-brand"
    }`;

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          SQL Query
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setMode("format")} className={btn(mode === "format")}>
          Format
        </button>
        <button type="button" onClick={() => setMode("minify")} className={btn(mode === "minify")}>
          Minify
        </button>
        <button
          type="button"
          onClick={run}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          Run
        </button>
      </div>

      {output && (
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">
              Output
            </span>
            <button
              type="button"
              onClick={copy}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={10}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </div>
      )}
    </div>
  );
}
