"use client";

import { useEffect, useState } from "react";

type Parsed = {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  device: "Desktop" | "Mobile" | "Tablet";
  engine: string;
};

function parseUA(ua: string): Parsed {
  const result: Parsed = {
    browser: "Unknown",
    browserVersion: "",
    os: "Unknown",
    osVersion: "",
    device: "Desktop",
    engine: "Unknown",
  };

  // Browser (order matters)
  let m: RegExpMatchArray | null;
  if ((m = ua.match(/Edg(?:e|A|iOS)?\/([\d.]+)/))) {
    result.browser = "Edge";
    result.browserVersion = m[1];
  } else if ((m = ua.match(/OPR\/([\d.]+)/)) || (m = ua.match(/Opera\/([\d.]+)/))) {
    result.browser = "Opera";
    result.browserVersion = m[1];
  } else if ((m = ua.match(/Firefox\/([\d.]+)/))) {
    result.browser = "Firefox";
    result.browserVersion = m[1];
  } else if ((m = ua.match(/Chrome\/([\d.]+)/))) {
    result.browser = "Chrome";
    result.browserVersion = m[1];
  } else if ((m = ua.match(/Version\/([\d.]+).*Safari/))) {
    result.browser = "Safari";
    result.browserVersion = m[1];
  } else if (/Safari/.test(ua)) {
    result.browser = "Safari";
  }

  // OS
  if ((m = ua.match(/Windows NT ([\d.]+)/))) {
    result.os = "Windows";
    result.osVersion = m[1];
  } else if ((m = ua.match(/Mac OS X ([\d_.]+)/))) {
    result.os = "macOS";
    result.osVersion = m[1].replace(/_/g, ".");
  } else if ((m = ua.match(/Android ([\d.]+)/))) {
    result.os = "Android";
    result.osVersion = m[1];
  } else if ((m = ua.match(/(?:iPhone|iPad|iPod); CPU (?:iPhone )?OS ([\d_]+)/))) {
    result.os = "iOS";
    result.osVersion = m[1].replace(/_/g, ".");
  } else if (/Linux/.test(ua)) {
    result.os = "Linux";
  }

  // Device
  if (/iPad|Tablet/.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua))) {
    result.device = "Tablet";
  } else if (/Mobi|Android|iPhone|iPod|Windows Phone/.test(ua)) {
    result.device = "Mobile";
  }

  // Engine
  if (/Gecko\//.test(ua) && /Firefox/.test(ua)) result.engine = "Gecko";
  else if (/AppleWebKit/.test(ua)) {
    if (/Chrome|Chromium|Edg|OPR/.test(ua)) result.engine = "Blink";
    else result.engine = "WebKit";
  } else if (/Trident/.test(ua)) result.engine = "Trident";

  return result;
}

export function UserAgentParser() {
  const [ua, setUa] = useState("");
  const [parsed, setParsed] = useState<Parsed | null>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const cur = navigator.userAgent;
      setUa(cur);
      setParsed(parseUA(cur));
    }
  }, []);

  function onParse() {
    setParsed(parseUA(ua));
  }

  function copyJson() {
    if (parsed) navigator.clipboard?.writeText(JSON.stringify(parsed, null, 2));
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700 mb-1 block">
          User-Agent string
        </span>
        <textarea
          value={ua}
          onChange={(e) => setUa(e.target.value)}
          rows={4}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onParse}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
        >
          Parse
        </button>
        <button
          type="button"
          onClick={copyJson}
          disabled={!parsed}
          className="rounded-lg border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-50 disabled:opacity-50"
        >
          Copy JSON
        </button>
      </div>
      {parsed && (
        <div className="overflow-x-auto rounded-lg border border-slate-300">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(parsed).map(([k, v]) => (
                <tr key={k} className="border-t border-slate-200 first:border-t-0">
                  <td className="px-3 py-2 font-semibold text-slate-700 w-40 bg-slate-50">
                    {k}
                  </td>
                  <td className="px-3 py-2 font-mono">{String(v) || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
