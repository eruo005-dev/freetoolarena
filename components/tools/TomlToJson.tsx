"use client";

import { useState } from "react";

const SAMPLE = `title = "TOML Example"

[owner]
name = "Ada Lovelace"
dob = 1815-12-10

[database]
enabled = true
ports = [8000, 8001, 8002]

[[servers]]
ip = "10.0.0.1"
role = "frontend"

[[servers]]
ip = "10.0.0.2"
role = "backend"`;

type Value = string | number | boolean | null | Value[] | { [key: string]: Value };

class TomlError extends Error {
  line: number;
  constructor(message: string, line: number) {
    super(message);
    this.line = line;
  }
}

function parseValue(raw: string, line: number): Value {
  const s = raw.trim();
  if (s === "") throw new TomlError("Empty value", line);
  // String
  if (s.startsWith('"') && s.endsWith('"') && s.length >= 2) {
    return s
      .slice(1, -1)
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
  if (s.startsWith("'") && s.endsWith("'") && s.length >= 2) {
    return s.slice(1, -1);
  }
  // Boolean
  if (s === "true") return true;
  if (s === "false") return false;
  // Array
  if (s.startsWith("[") && s.endsWith("]")) {
    return parseArray(s, line);
  }
  // Number
  if (/^[-+]?\d+$/.test(s)) return parseInt(s, 10);
  if (/^[-+]?\d*\.\d+([eE][-+]?\d+)?$/.test(s) || /^[-+]?\d+[eE][-+]?\d+$/.test(s))
    return parseFloat(s);
  // Datetime (keep as ISO string)
  if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[-+]\d{2}:\d{2})?)?$/.test(s)) {
    return s;
  }
  throw new TomlError(`Cannot parse value: ${raw}`, line);
}

function parseArray(raw: string, line: number): Value[] {
  const s = raw.trim().slice(1, -1).trim();
  if (s === "") return [];
  const items: string[] = [];
  let depth = 0;
  let inStr: '"' | "'" | null = null;
  let buf = "";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      buf += c;
      if (c === "\\" && i + 1 < s.length) {
        buf += s[++i];
        continue;
      }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'") {
      inStr = c;
      buf += c;
      continue;
    }
    if (c === "[") {
      depth++;
      buf += c;
      continue;
    }
    if (c === "]") {
      depth--;
      buf += c;
      continue;
    }
    if (c === "," && depth === 0) {
      items.push(buf);
      buf = "";
      continue;
    }
    buf += c;
  }
  if (buf.trim() !== "") items.push(buf);
  return items.map((it) => parseValue(it.trim(), line));
}

function setPath(
  root: { [key: string]: Value },
  path: string[],
  arrayTable: boolean
): { [key: string]: Value } {
  let obj: { [key: string]: Value } = root;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    const next = obj[key];
    if (Array.isArray(next)) {
      const last = next[next.length - 1];
      if (last && typeof last === "object" && !Array.isArray(last)) {
        obj = last as { [key: string]: Value };
      } else {
        throw new Error(`Path conflict at ${key}`);
      }
    } else if (next && typeof next === "object") {
      obj = next as { [key: string]: Value };
    } else {
      throw new Error(`Path conflict at ${key}`);
    }
  }
  const last = path[path.length - 1];
  if (arrayTable) {
    if (!(last in obj)) obj[last] = [];
    const arr = obj[last];
    if (!Array.isArray(arr)) throw new Error(`Conflict: ${last} is not array`);
    const newTable: { [key: string]: Value } = {};
    arr.push(newTable);
    return newTable;
  } else {
    if (!(last in obj)) obj[last] = {};
    const t = obj[last];
    if (typeof t !== "object" || Array.isArray(t) || t === null) {
      throw new Error(`Conflict: ${last} is not table`);
    }
    return t as { [key: string]: Value };
  }
}

function parseToml(input: string): { [key: string]: Value } {
  const root: { [key: string]: Value } = {};
  let current: { [key: string]: Value } = root;
  const lines = input.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.replace(/(^|\s)#.*$/, "").trim();
    if (line === "") continue;
    // Array of tables [[a.b]]
    let m = line.match(/^\[\[([^\]]+)\]\]$/);
    if (m) {
      const path = m[1].split(".").map((p) => p.trim());
      current = setPath(root, path, true);
      continue;
    }
    // Table [a.b]
    m = line.match(/^\[([^\]]+)\]$/);
    if (m) {
      const path = m[1].split(".").map((p) => p.trim());
      current = setPath(root, path, false);
      continue;
    }
    // key = value
    const eq = line.indexOf("=");
    if (eq === -1) {
      throw new TomlError(`Invalid line: ${line}`, i + 1);
    }
    const key = line.slice(0, eq).trim().replace(/^"(.*)"$/, "$1");
    const val = line.slice(eq + 1).trim();
    try {
      current[key] = parseValue(val, i + 1);
    } catch (e) {
      if (e instanceof TomlError) throw e;
      throw new TomlError(
        e instanceof Error ? e.message : "Parse error",
        i + 1
      );
    }
  }
  return root;
}

export function TomlToJson() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function convert() {
    try {
      const parsed = parseToml(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      if (e instanceof TomlError) {
        setError(`Line ${e.line}: ${e.message}`);
      } else {
        setError(e instanceof Error ? e.message : "Parse error");
      }
      setOutput("");
    }
  }

  function copy() {
    if (output) navigator.clipboard?.writeText(output);
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700 mb-1 block">
          TOML input
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={12}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <button
        type="button"
        onClick={convert}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
      >
        Convert to JSON
      </button>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      {output && (
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <p className="text-sm font-medium text-slate-700">JSON output</p>
            <button
              type="button"
              onClick={copy}
              className="text-xs font-semibold text-brand hover:text-brand-dark"
            >
              Copy
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={12}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
