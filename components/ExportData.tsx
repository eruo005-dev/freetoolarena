"use client";

import { useState } from "react";

/**
 * Universal export buttons. Drop into any calculator that produces a
 * structured result.
 *
 * Usage:
 *   <ExportData
 *     filename="loan-calculation"
 *     rows={[
 *       { metric: "Monthly payment", value: 2528 },
 *       { metric: "Total interest", value: 510_440 },
 *     ]}
 *   />
 *
 * Supports CSV and JSON. All processing in-browser; no upload, no server.
 *
 * Differentiator: most free-tool sites display a number and end. We let
 * the user export it for spreadsheets, scripts, or downstream tools.
 */
export interface ExportRow {
  [key: string]: string | number | boolean | null;
}

export function ExportData({
  filename,
  rows,
  className = "",
  formats = ["csv", "json"],
}: {
  /** Base filename — no extension, no special chars. */
  filename: string;
  /** Array of objects. CSV uses keys of the first row as headers. */
  rows: ExportRow[];
  className?: string;
  formats?: ("csv" | "json")[];
}) {
  const [status, setStatus] = useState<"idle" | "csv" | "json" | "error">("idle");

  const flash = (kind: "csv" | "json" | "error") => {
    setStatus(kind);
    setTimeout(() => setStatus("idle"), 1500);
  };

  const downloadCsv = () => {
    if (rows.length === 0) {
      flash("error");
      return;
    }
    try {
      const headers = Object.keys(rows[0]);
      const escape = (v: string | number | boolean | null): string => {
        if (v === null || v === undefined) return "";
        const s = String(v);
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
      };
      const lines = [
        headers.join(","),
        ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
      ];
      triggerDownload(lines.join("\n"), `${filename}.csv`, "text/csv;charset=utf-8");
      flash("csv");
    } catch {
      flash("error");
    }
  };

  const downloadJson = () => {
    if (rows.length === 0) {
      flash("error");
      return;
    }
    try {
      triggerDownload(
        JSON.stringify(rows, null, 2),
        `${filename}.json`,
        "application/json;charset=utf-8",
      );
      flash("json");
    } catch {
      flash("error");
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-xs font-medium text-slate-500">Export:</span>
      {formats.includes("csv") && (
        <button
          type="button"
          onClick={downloadCsv}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:border-brand hover:text-brand"
        >
          <DownloadIcon />
          {status === "csv" ? "Downloaded" : "CSV"}
        </button>
      )}
      {formats.includes("json") && (
        <button
          type="button"
          onClick={downloadJson}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:border-brand hover:text-brand"
        >
          <DownloadIcon />
          {status === "json" ? "Downloaded" : "JSON"}
        </button>
      )}
      {status === "error" && (
        <span className="text-xs text-rose-600">Export failed</span>
      )}
    </div>
  );
}

function triggerDownload(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Free the object URL on the next tick so the download starts cleanly.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 2v8m0 0 3-3m-3 3-3-3M3 12v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1"
      />
    </svg>
  );
}
