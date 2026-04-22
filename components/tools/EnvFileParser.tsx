"use client";

import { useState } from "react";

const SAMPLE = `# App config
APP_NAME=FreeToolArea
APP_URL="https://freetoolarea.com"
API_KEY='secret-123'
DEBUG=true
EMPTY=
APP_NAME=duplicated
INVALID_LINE_NO_EQUALS`;

type Entry = { key: string; value: string; line: number };
type Warning = { line: number; message: string };

function parseEnv(input: string): { entries: Entry[]; warnings: Warning[] } {
  const entries: Entry[] = [];
  const warnings: Warning[] = [];
  const seen = new Map<string, number>();
  const lines = input.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();
    if (trimmed === "") continue;
    if (trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      warnings.push({ line: i + 1, message: `Invalid line (no '='): ${trimmed}` });
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (!key) {
      warnings.push({ line: i + 1, message: "Empty key" });
      continue;
    }
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
      (value.startsWith("'") && value.endsWith("'") && value.length >= 2)
    ) {
      value = value.slice(1, -1);
    }
    if (value === "") {
      warnings.push({ line: i + 1, message: `Empty value for '${key}'` });
    }
    if (seen.has(key)) {
      warnings.push({
        line: i + 1,
        message: `Duplicate key '${key}' (first seen on line ${seen.get(key)})`,
      });
    } else {
      seen.set(key, i + 1);
    }
    entries.push({ key, value, line: i + 1 });
  }
  return { entries, warnings };
}

export function EnvFileParser() {
  const [input, setInput] = useState(SAMPLE);
  const [result, setResult] = useState<ReturnType<typeof parseEnv> | null>(null);

  function parse() {
    setResult(parseEnv(input));
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700 mb-1 block">
          .env content
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <button
        type="button"
        onClick={parse}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
      >
        Parse
      </button>
      {result && (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-700 mb-1">
              Parsed entries ({result.entries.length})
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-300">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Line
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Key
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.entries.map((e, i) => (
                    <tr key={i} className="border-t border-slate-200">
                      <td className="px-3 py-2 text-slate-500 font-mono">
                        {e.line}
                      </td>
                      <td className="px-3 py-2 font-mono">{e.key}</td>
                      <td className="px-3 py-2 font-mono break-all">
                        {e.value || (
                          <span className="text-slate-400 italic">(empty)</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {result.entries.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-3 py-4 text-center text-slate-400"
                      >
                        No entries.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700 mb-1">
              Warnings ({result.warnings.length})
            </p>
            {result.warnings.length === 0 ? (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
                No warnings.
              </div>
            ) : (
              <ul className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800 space-y-1">
                {result.warnings.map((w, i) => (
                  <li key={i} className="font-mono">
                    Line {w.line}: {w.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
