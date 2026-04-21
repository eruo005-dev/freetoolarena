"use client";

import { useState } from "react";

/**
 * HaveIBeenPwned "Pwned Passwords" v3, k-anonymity mode.
 *
 * How the privacy model works:
 *   1. We SHA-1 the password locally using Web Crypto.
 *   2. We send only the first 5 hex chars of the hash to the HIBP range API.
 *   3. HIBP responds with every suffix that starts with those 5 chars, each
 *      paired with a breach count.
 *   4. We check for OUR suffix client-side. The full hash (or password)
 *      never leaves the browser.
 *
 * The password input has autocomplete off, is never logged, and is dropped
 * the instant you change it. This is literally the same API password
 * managers like 1Password use for their breach warnings.
 */

type Status = "idle" | "checking" | "safe" | "pwned" | "error";

interface Result {
  status: Status;
  count?: number;
  message?: string;
}

export function PasswordBreachChecker() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [result, setResult] = useState<Result>({ status: "idle" });

  async function check(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setResult({ status: "checking" });
    try {
      const hash = await sha1Hex(password);
      const prefix = hash.slice(0, 5).toUpperCase();
      const suffix = hash.slice(5).toUpperCase();
      const res = await fetch(
        `https://api.pwnedpasswords.com/range/${prefix}`,
        { cache: "no-store", headers: { "Add-Padding": "true" } },
      );
      if (!res.ok) throw new Error("network");
      const body = await res.text();
      const hit = body
        .split(/\r?\n/)
        .map((line) => line.trim())
        .find((line) => line.startsWith(`${suffix}:`));
      if (!hit) {
        setResult({ status: "safe" });
        return;
      }
      const count = Number(hit.split(":")[1] ?? 0);
      // HIBP pads responses with count=0 entries to defeat traffic analysis;
      // treat 0 as "not found".
      if (!count) {
        setResult({ status: "safe" });
        return;
      }
      setResult({ status: "pwned", count });
    } catch {
      setResult({
        status: "error",
        message:
          "Couldn't reach the breach database. Check your connection and try again.",
      });
    }
  }

  function clear() {
    setPassword("");
    setResult({ status: "idle" });
  }

  return (
    <div className="space-y-5">
      <form onSubmit={check} className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Password to check
          </span>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (result.status !== "idle")
                  setResult({ status: "idle" });
              }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="Type or paste a password…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-20 font-mono text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={!password || result.status === "checking"}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {result.status === "checking" ? "Checking…" : "Check password"}
          </button>
          {password && (
            <button
              type="button"
              onClick={clear}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      <ResultCard result={result} />

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
        <p className="mb-1 font-semibold text-slate-900">
          Your password never leaves this page
        </p>
        <p>
          We SHA-1 the password in your browser, then send only the{" "}
          <strong>first 5 characters of the hash</strong> to{" "}
          <a
            href="https://haveibeenpwned.com/Passwords"
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-dotted underline-offset-2 hover:text-slate-800"
          >
            Have I Been Pwned
          </a>
          . The server replies with ~800 hash suffixes, and the actual
          comparison happens here. This is called{" "}
          <a
            href="https://en.wikipedia.org/wiki/K-anonymity"
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-dotted underline-offset-2 hover:text-slate-800"
          >
            k-anonymity
          </a>{" "}
          — it&rsquo;s the same approach 1Password and Chrome use.
        </p>
      </div>
    </div>
  );
}

function ResultCard({ result }: { result: Result }) {
  if (result.status === "idle") return null;
  if (result.status === "checking") {
    return (
      <div className="h-20 animate-pulse rounded-xl bg-slate-100" aria-live="polite" />
    );
  }
  if (result.status === "error") {
    return (
      <div
        role="alert"
        className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900"
      >
        {result.message}
      </div>
    );
  }
  if (result.status === "safe") {
    return (
      <div
        role="status"
        className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"
      >
        <p className="text-sm font-semibold text-emerald-900">
          Not found in any known breach.
        </p>
        <p className="mt-1 text-sm text-emerald-800">
          This password hasn&rsquo;t appeared in HIBP&rsquo;s collection of
          leaked credentials. That&rsquo;s good — but it doesn&rsquo;t mean
          the password itself is strong. Make sure it&rsquo;s long, unique to
          this account, and ideally stored in a password manager.
        </p>
      </div>
    );
  }
  const count = result.count ?? 0;
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-5"
    >
      <p className="text-sm font-semibold text-red-900">
        Seen in data breaches{" "}
        <span className="tabular-nums">{count.toLocaleString("en-US")}</span>{" "}
        time{count === 1 ? "" : "s"}.
      </p>
      <p className="mt-1 text-sm text-red-800">
        This password is part of publicly known breach corpora, which means
        credential-stuffing bots will try it. <strong>Change it</strong> on
        every account where you use it, and switch to a unique password per
        site — a password manager makes this painless.
      </p>
    </div>
  );
}

async function sha1Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-1", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
