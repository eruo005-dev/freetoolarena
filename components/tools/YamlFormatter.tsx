"use client";

import { useState, useMemo } from "react";

type Props = {
  initialYaml?: string;
};

const SAMPLE = `# project config
name: freetoolarea
stack:
  - next.js
  - tailwind
pages: 258
published: true
author:
  name: Jay
  role: founder
`;

type Val = string | number | boolean | null | Val[] | { [k: string]: Val };

function stripComment(line: string): string {
  let inSingle = false,
    inDouble = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (
      c === "#" &&
      !inSingle &&
      !inDouble &&
      (i === 0 || /\s/.test(line[i - 1]))
    ) {
      return line.slice(0, i);
    }
  }
  return line;
}

function parseScalar(raw: string): Val {
  const t = raw.trim();
  if (t === "" || t === "~" || t.toLowerCase() === "null") return null;
  if (/^(true|True|TRUE)$/.test(t)) return true;
  if (/^(false|False|FALSE)$/.test(t)) return false;
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    try {
      return t.startsWith('"') ? JSON.parse(t) : t.slice(1, -1);
    } catch {
      return t.slice(1, -1);
    }
  }
  if (/^-?\d+$/.test(t)) return Number(t);
  if (/^-?\d*\.\d+$/.test(t)) return Number(t);
  return t;
}

function findMapColon(text: string): number {
  let inSingle = false,
    inDouble = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (!inSingle && !inDouble && c === ":") {
      if (i === text.length - 1 || /\s/.test(text[i + 1])) return i;
    }
  }
  return -1;
}

function parseYaml(src: string, stripComments = true): Val {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const cleaned: { indent: number; text: string }[] = [];
  for (const raw of lines) {
    if (raw.match(/^\s*\t/)) {
      throw new Error("Tabs are not valid indentation. Use spaces.");
    }
    const processed = stripComments ? stripComment(raw) : raw;
    const trimmed = processed.replace(/\s+$/, "");
    if (trimmed.trim() === "" || trimmed.trim() === "---") continue;
    const indent = processed.match(/^ */)![0].length;
    cleaned.push({ indent, text: trimmed.trim() });
  }
  if (cleaned.length === 0) return null;
  const [value] = readBlock(cleaned, 0, cleaned[0].indent);
  return value;
}

function readBlock(
  lines: { indent: number; text: string }[],
  start: number,
  indent: number,
): [Val, number] {
  if (start >= lines.length) return [null, start];
  const first = lines[start];
  if (first.text.startsWith("- ") || first.text === "-") {
    return readSeq(lines, start, indent);
  }
  return readMap(lines, start, indent);
}

function readSeq(
  lines: { indent: number; text: string }[],
  start: number,
  indent: number,
): [Val[], number] {
  const arr: Val[] = [];
  let i = start;
  while (i < lines.length && lines[i].indent === indent) {
    const ln = lines[i];
    if (!(ln.text === "-" || ln.text.startsWith("- "))) break;
    const rest = ln.text === "-" ? "" : ln.text.slice(2).trim();
    if (rest === "") {
      if (i + 1 < lines.length && lines[i + 1].indent > indent) {
        const [val, next] = readBlock(lines, i + 1, lines[i + 1].indent);
        arr.push(val);
        i = next;
      } else {
        arr.push(null);
        i++;
      }
    } else {
      arr.push(parseScalar(rest));
      i++;
    }
  }
  return [arr, i];
}

function readMap(
  lines: { indent: number; text: string }[],
  start: number,
  indent: number,
): [{ [k: string]: Val }, number] {
  const obj: { [k: string]: Val } = {};
  let i = start;
  while (i < lines.length && lines[i].indent === indent) {
    const ln = lines[i];
    if (ln.text.startsWith("- ") || ln.text === "-") break;
    const colonIdx = findMapColon(ln.text);
    if (colonIdx < 0) {
      throw new Error(`Expected "key: value" at: "${ln.text}"`);
    }
    const key = ln.text.slice(0, colonIdx).trim().replace(/^["']|["']$/g, "");
    const rest = ln.text.slice(colonIdx + 1).trim();
    if (rest === "") {
      if (i + 1 < lines.length && lines[i + 1].indent > indent) {
        const [val, next] = readBlock(lines, i + 1, lines[i + 1].indent);
        obj[key] = val;
        i = next;
      } else {
        obj[key] = null;
        i++;
      }
    } else {
      obj[key] = parseScalar(rest);
      i++;
    }
  }
  return [obj, i];
}

function yamlString(s: string): string {
  if (
    s === "" ||
    /[:#\n\r\t]/.test(s) ||
    /^[\-?!&*|>%@`]/.test(s) ||
    /^(true|false|null|yes|no)$/i.test(s) ||
    /^-?\d/.test(s) ||
    /^\s|\s$/.test(s)
  ) {
    return JSON.stringify(s);
  }
  return s;
}

function serialize(v: Val, indent = 0, minify = false): string {
  const pad = " ".repeat(indent);
  if (v === null) return "null\n";
  if (typeof v === "boolean" || typeof v === "number") return `${v}\n`;
  if (typeof v === "string") return `${yamlString(v)}\n`;
  if (Array.isArray(v)) {
    if (v.length === 0) return "[]\n";
    return v
      .map((item) => {
        if (item === null || typeof item !== "object") {
          return `${pad}- ${serialize(item).trimEnd()}\n`;
        }
        const body = serialize(item, indent + 2, minify);
        if (Array.isArray(item)) {
          return `${pad}-\n${body}`;
        }
        const keys = Object.keys(item as object);
        if (keys.length === 0) return `${pad}- {}\n`;
        const bodyLines = body.split("\n").filter((l) => l.length > 0);
        if (bodyLines.length > 0) {
          const firstStripped = bodyLines[0].replace(/^ +/, "");
          let out = `${pad}- ${firstStripped}\n`;
          for (const bl of bodyLines.slice(1)) {
            out += `${bl}\n`;
          }
          return out;
        }
        return `${pad}-\n${body}`;
      })
      .join("");
  }
  if (typeof v === "object") {
    const keys = Object.keys(v as object);
    if (keys.length === 0) return "{}\n";
    return keys
      .map((k) => {
        const val = (v as any)[k];
        const key = yamlString(k);
        if (val === null || typeof val !== "object") {
          return `${pad}${key}: ${serialize(val).trimEnd()}\n`;
        }
        if (Array.isArray(val) && val.length === 0) return `${pad}${key}: []\n`;
        if (
          typeof val === "object" &&
          !Array.isArray(val) &&
          Object.keys(val).length === 0
        )
          return `${pad}${key}: {}\n`;
        const body = serialize(val, indent + 2, minify);
        return `${pad}${key}:\n${body}`;
      })
      .join("");
  }
  return "\n";
}

export function YamlFormatter({ initialYaml = SAMPLE }: Props = {}) {
  const [input, setInput] = useState(initialYaml);
  const [mode, setMode] = useState<"pretty" | "minify">("pretty");
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    try {
      if (input.trim() === "") return { output: "", error: null };
      const data = parseYaml(input, mode === "minify");
      return {
        output: serialize(data, 0, mode === "minify").trimEnd(),
        error: null,
      };
    } catch (e: any) {
      return { output: "", error: e.message || "Parse error" };
    }
  }, [input, mode]);

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("pretty")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            mode === "pretty"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Pretty
        </button>
        <button
          type="button"
          onClick={() => setMode("minify")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            mode === "minify"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Minify
        </button>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Input YAML
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
        <button
          type="button"
          onClick={copy}
          disabled={!output}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          type="button"
          onClick={() => setInput("")}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      {output && !error && (
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono whitespace-pre-wrap">
          {output}
        </pre>
      )}
    </div>
  );
}
