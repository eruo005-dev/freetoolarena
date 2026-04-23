"use client";

import { useMemo, useState } from "react";

type Issue = { line: number; severity: "warn" | "error" | "info"; message: string };

const SAMPLE = `FROM node:latest
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install -y curl
RUN npm install
CMD ["node", "index.js"]`;

export function DockerfileLintHelper() {
  const [text, setText] = useState(SAMPLE);

  const issues = useMemo<Issue[]>(() => {
    const out: Issue[] = [];
    const lines = text.split("\n");
    let hasHealthcheck = false;
    let hasUser = false;
    let sawDepsInstall = false;
    let copyDotBeforeDeps = -1;
    const runLines: number[] = [];

    lines.forEach((raw, i) => {
      const line = raw.trim();
      const lineNum = i + 1;
      if (!line || line.startsWith("#")) return;
      const upper = line.toUpperCase();

      if (upper.startsWith("FROM ") && /:latest\b/i.test(line)) {
        out.push({ line: lineNum, severity: "warn", message: "Avoid 'latest' tag — pin an explicit version for reproducible builds." });
      }
      if (upper.startsWith("FROM ") && !/:/.test(line.split(" ")[1] || "")) {
        out.push({ line: lineNum, severity: "warn", message: "No tag specified on FROM — defaults to 'latest' implicitly." });
      }
      if (upper.startsWith("HEALTHCHECK")) hasHealthcheck = true;
      if (upper.startsWith("USER ") && !/root/i.test(line)) hasUser = true;
      if (upper.startsWith("RUN ")) {
        runLines.push(lineNum);
        if (/apt-get\s+install/i.test(line) && !/--no-install-recommends/i.test(line)) {
          out.push({ line: lineNum, severity: "warn", message: "apt-get install should use --no-install-recommends to reduce image size." });
        }
        if (/apt-get\s+update/i.test(line) && !/apt-get\s+install/i.test(line)) {
          out.push({ line: lineNum, severity: "warn", message: "apt-get update in separate RUN — combine with install to avoid cached stale indexes." });
        }
        if (/(npm\s+install|yarn\s+install|pip\s+install|bundle\s+install)/i.test(line)) {
          sawDepsInstall = true;
        }
      }
      if (upper.startsWith("COPY ") && /COPY\s+\.\s/i.test(line + " ") && !sawDepsInstall) {
        if (copyDotBeforeDeps === -1) copyDotBeforeDeps = lineNum;
      }
      if (upper.startsWith("ADD ") && /^ADD\s+\S+:\S+/i.test(line) === false && !/\.tar/i.test(line)) {
        out.push({ line: lineNum, severity: "info", message: "Prefer COPY over ADD unless you need tarball auto-extract or remote URLs." });
      }
    });

    if (!hasHealthcheck) out.push({ line: 0, severity: "info", message: "No HEALTHCHECK instruction — container orchestrators can't verify readiness." });
    if (!hasUser) out.push({ line: 0, severity: "error", message: "No non-root USER declared — container will run as root." });
    if (runLines.length >= 3) out.push({ line: runLines[0], severity: "warn", message: `${runLines.length} separate RUN layers — consider combining with && to reduce image layers.` });
    if (copyDotBeforeDeps > 0) out.push({ line: copyDotBeforeDeps, severity: "warn", message: "COPY . before dependency install breaks cache — copy package files first, install, then copy rest." });

    return out.sort((a, b) => a.line - b.line);
  }, [text]);

  const badgeCls = (s: Issue["severity"]) =>
    s === "error" ? "bg-rose-100 text-rose-700" : s === "warn" ? "bg-amber-100 text-amber-700" : "bg-sky-100 text-sky-700";

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Dockerfile</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs font-mono"
          spellCheck={false}
        />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-semibold text-slate-700 mb-3">{issues.length} issue{issues.length === 1 ? "" : "s"} found</div>
        {issues.length === 0 ? (
          <p className="text-sm text-slate-500">No common issues detected.</p>
        ) : (
          <ul className="space-y-2">
            {issues.map((issue, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold uppercase ${badgeCls(issue.severity)}`}>{issue.severity}</span>
                <span className="text-slate-500 font-mono w-10 shrink-0">{issue.line ? `L${issue.line}` : "—"}</span>
                <span className="text-slate-700">{issue.message}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
