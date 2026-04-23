"use client";
import { useMemo, useState } from "react";

const CMDS: Record<string, string> = {
  ls: "List directory entries.",
  cat: "Concatenate and print files to stdout.",
  grep: "Search input for lines matching a pattern.",
  awk: "Pattern-scanning / column-extraction language.",
  sed: "Stream editor &mdash; substitute or edit text.",
  xargs: "Build and execute command lines from stdin.",
  find: "Recursively search directory tree for files.",
  tar: "Archive files (create/extract .tar / .tar.gz).",
  curl: "Transfer URL data from/to a server.",
  wget: "Retrieve files over HTTP/FTP non-interactively.",
  jq: "Command-line JSON processor.",
  sort: "Sort lines of text.",
  uniq: "Filter adjacent duplicate lines.",
  wc: "Word, line, character, byte count.",
  head: "Output the first part of files.",
  tail: "Output the last part of files.",
  cut: "Extract selected fields from each line.",
  tr: "Translate / delete characters.",
  ssh: "OpenSSH remote login client.",
  scp: "Secure copy over SSH.",
  rsync: "Fast incremental file transfer.",
  echo: "Print arguments to stdout.",
  cd: "Change working directory.",
  cp: "Copy files / directories.",
  mv: "Move or rename files / directories.",
  rm: "Remove files or directories.",
  mkdir: "Create directory.",
};

const FLAGS: Record<string, string> = {
  "-r": "recursive",
  "-R": "recursive (alt)",
  "-i": "case-insensitive / interactive / in-place",
  "-v": "verbose OR invert match (grep)",
  "-n": "show line numbers / dry run",
  "-f": "force / follow / file",
  "-a": "all (show hidden)",
  "-l": "long list / files-with-matches",
  "-h": "human readable / help",
  "-e": "expression / enable interpretation",
  "-x": "trace / exclude",
  "-u": "unique / update",
  "-s": "silent / size",
  "-c": "count / command",
  "-d": "directory / delimiter",
  "-p": "parents / port",
  "-o": "output file / only-matching",
  "-z": "null-terminated / gzip",
};

type Segment = { cmd: string; raw: string; explain: string; flags: Array<{ f: string; m: string }> };

export function BashCommandExplainer() {
  const [input, setInput] = useState("find . -type f -name '*.log' | xargs grep -i error | sort -u | head -20");
  const segs = useMemo(() => parse(input), [input]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Bash command</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        />
      </label>
      <div className="space-y-3">
        {segs.map((s, i) => (
          <div key={i} className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold tabular-nums">Step {i + 1}</span>
              <span className="text-sm font-mono text-slate-800">{s.raw}</span>
            </div>
            <div className="text-sm text-slate-700 mb-2">
              <span className="font-semibold text-brand">{s.cmd}</span> &mdash; <span dangerouslySetInnerHTML={{ __html: s.explain }} />
            </div>
            {s.flags.length > 0 && (
              <ul className="text-xs font-mono space-y-0.5">
                {s.flags.map((fl, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-slate-500 w-8">{fl.f}</span>
                    <span className="text-slate-700">{fl.m}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function parse(src: string): Segment[] {
  const parts = src.split("|").map((p) => p.trim()).filter(Boolean);
  return parts.map((raw) => {
    const tokens = raw.split(/\s+/);
    const cmd = tokens[0] || "";
    const explain = CMDS[cmd] ?? "Command not in reference set &mdash; check `man " + cmd + "`.";
    const flags: Array<{ f: string; m: string }> = [];
    for (const t of tokens.slice(1)) {
      if (t.startsWith("-") && !t.startsWith("--")) {
        for (let k = 1; k < t.length; k++) {
          const key = "-" + t[k];
          if (FLAGS[key] && !flags.find((x) => x.f === key)) flags.push({ f: key, m: FLAGS[key] });
        }
      }
    }
    return { cmd, raw, explain, flags };
  });
}
