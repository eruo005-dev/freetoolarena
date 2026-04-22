"use client";

import { useState } from "react";

const ALGS = ["HS256", "HS384", "HS512"] as const;
type Alg = (typeof ALGS)[number];

const ALG_TO_HASH: Record<Alg, string> = {
  HS256: "SHA-256",
  HS384: "SHA-384",
  HS512: "SHA-512",
};

function base64UrlEncode(data: ArrayBuffer | Uint8Array | string): string {
  let bytes: Uint8Array;
  if (typeof data === "string") {
    bytes = new TextEncoder().encode(data);
  } else if (data instanceof Uint8Array) {
    bytes = data;
  } else {
    bytes = new Uint8Array(data);
  }
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export function JwtGenerator() {
  const [alg, setAlg] = useState<Alg>("HS256");
  const [header, setHeader] = useState('{"alg":"HS256","typ":"JWT"}');
  const [payload, setPayload] = useState(
    '{"sub":"1234","name":"John","iat":1516239022}'
  );
  const [secret, setSecret] = useState("your-256-bit-secret");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  async function sign() {
    setError("");
    setToken("");
    try {
      const headerObj = JSON.parse(header);
      const payloadObj = JSON.parse(payload);
      headerObj.alg = alg;
      const encHeader = base64UrlEncode(JSON.stringify(headerObj));
      const encPayload = base64UrlEncode(JSON.stringify(payloadObj));
      const data = `${encHeader}.${encPayload}`;
      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: ALG_TO_HASH[alg] },
        false,
        ["sign"]
      );
      const sig = await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(data)
      );
      const encSig = base64UrlEncode(sig);
      setToken(`${data}.${encSig}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to sign");
    }
  }

  function copy() {
    if (token) navigator.clipboard?.writeText(token);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block">
            Algorithm
          </span>
          <select
            value={alg}
            onChange={(e) => setAlg(e.target.value as Alg)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {ALGS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block">
            Secret
          </span>
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-slate-700 mb-1 block">
          Header
        </span>
        <textarea
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          rows={4}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700 mb-1 block">
          Payload
        </span>
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          rows={6}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <button
        type="button"
        onClick={sign}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
      >
        Generate JWT
      </button>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      {token && (
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <p className="text-sm font-medium text-slate-700">Token</p>
            <button
              type="button"
              onClick={copy}
              className="text-xs font-semibold text-brand hover:text-brand-dark"
            >
              Copy
            </button>
          </div>
          <textarea
            value={token}
            readOnly
            rows={6}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-sm break-all"
          />
        </div>
      )}
    </div>
  );
}
