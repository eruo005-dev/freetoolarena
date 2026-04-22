"use client";

import { useMemo, useState } from "react";

const TEMPLATES: Record<string, string> = {
  node: "node_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\n.pnpm-store/\n.npm\n",
  next: ".next/\nout/\nnext-env.d.ts\n.vercel\n",
  react: "build/\ndist/\n.vite/\n",
  vite: ".vite/\ndist/\nstats.html\n",
  typescript: "*.tsbuildinfo\n",
  python: "__pycache__/\n*.py[cod]\n*$py.class\n*.egg-info/\n.venv/\nvenv/\nenv/\n.pytest_cache/\n.mypy_cache/\n.ruff_cache/\ndist/\nbuild/\n",
  django: "*.log\nlocal_settings.py\ndb.sqlite3\nmedia/\nstaticfiles/\n",
  rails: "/log/*\n/tmp/*\n/db/*.sqlite3\n/public/system\n/coverage/\n",
  java: "*.class\n*.jar\n*.war\n*.ear\ntarget/\n.gradle/\nbuild/\n",
  go: "/bin/\n/pkg/\nvendor/\n*.test\n*.out\n",
  rust: "target/\nCargo.lock\n**/*.rs.bk\n",
  macos: ".DS_Store\n.AppleDouble\n.LSOverride\n",
  windows: "Thumbs.db\nehthumbs.db\nDesktop.ini\n$RECYCLE.BIN/\n",
  linux: "*~\n.fuse_hidden*\n.Trash-*\n",
  vscode: ".vscode/*\n!.vscode/settings.json\n!.vscode/extensions.json\n",
  jetbrains: ".idea/\n*.iml\n*.iws\n",
  env: ".env\n.env.local\n.env.*.local\n",
  logs: "logs/\n*.log\n",
  tests: "coverage/\n.nyc_output/\n",
};

export function GitignoreGenerator() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["node", "next", "env", "macos", "vscode"]));
  const [copied, setCopied] = useState(false);

  function toggle(k: string) {
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k); else n.add(k);
      return n;
    });
  }

  const out = useMemo(() => {
    const parts: string[] = [];
    for (const k of Object.keys(TEMPLATES)) {
      if (!selected.has(k)) continue;
      parts.push(`# ${k}\n${TEMPLATES[k]}`);
    }
    return parts.join("\n");
  }, [selected]);

  function copy() {
    navigator.clipboard?.writeText(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function download() {
    const blob = new Blob([out], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = ".gitignore";
    a.click();
  }

  return (
    <div className="space-y-5">
      <div>
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2 block">Stacks & platforms</span>
        <div className="flex flex-wrap gap-2">
          {Object.keys(TEMPLATES).map((k) => (
            <button key={k} onClick={() => toggle(k)} className={`text-xs px-3 py-1 rounded-full border ${selected.has(k) ? "bg-brand text-white border-brand" : "bg-white text-slate-700 border-slate-300"}`}>
              {k}
            </button>
          ))}
        </div>
      </div>
      <textarea readOnly value={out} rows={14} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs bg-slate-50" />
      <div className="flex gap-2">
        <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
          {copied ? "Copied" : "Copy"}
        </button>
        <button onClick={download} className="bg-slate-900 text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-800">
          Download .gitignore
        </button>
      </div>
    </div>
  );
}
