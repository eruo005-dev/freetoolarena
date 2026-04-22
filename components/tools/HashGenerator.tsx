"use client";

import { useEffect, useState } from "react";

// --- Tiny public-domain MD5 implementation (adapted from Joseph Myers / RFC 1321) ---
function md5(str: string): string {
  function toBytes(s: string): number[] {
    // UTF-8 encode
    const bytes: number[] = [];
    for (let i = 0; i < s.length; i++) {
      let c = s.charCodeAt(i);
      if (c < 0x80) bytes.push(c);
      else if (c < 0x800) {
        bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
      } else if (c < 0xd800 || c >= 0xe000) {
        bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
      } else {
        i++;
        c = 0x10000 + (((c & 0x3ff) << 10) | (s.charCodeAt(i) & 0x3ff));
        bytes.push(
          0xf0 | (c >> 18),
          0x80 | ((c >> 12) & 0x3f),
          0x80 | ((c >> 6) & 0x3f),
          0x80 | (c & 0x3f),
        );
      }
    }
    return bytes;
  }

  function add32(a: number, b: number): number {
    return (a + b) & 0xffffffff;
  }
  function rol(x: number, n: number): number {
    return (x << n) | (x >>> (32 - n));
  }

  function cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    a = add32(add32(a, q), add32(x, t));
    return add32(rol(a, s), b);
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  const bytes = toBytes(str);
  const origLen = bytes.length;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  const bitLen = origLen * 8;
  // low 32 bits
  bytes.push(bitLen & 0xff, (bitLen >>> 8) & 0xff, (bitLen >>> 16) & 0xff, (bitLen >>> 24) & 0xff);
  // high 32 bits (always 0 for short input in JS number range)
  bytes.push(0, 0, 0, 0);

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  for (let i = 0; i < bytes.length; i += 64) {
    const x: number[] = new Array(16);
    for (let j = 0; j < 16; j++) {
      x[j] =
        bytes[i + j * 4] |
        (bytes[i + j * 4 + 1] << 8) |
        (bytes[i + j * 4 + 2] << 16) |
        (bytes[i + j * 4 + 3] << 24);
    }
    const aa = a, bb = b, cc = c, dd = d;

    a = ff(a, b, c, d, x[0], 7, -680876936);
    d = ff(d, a, b, c, x[1], 12, -389564586);
    c = ff(c, d, a, b, x[2], 17, 606105819);
    b = ff(b, c, d, a, x[3], 22, -1044525330);
    a = ff(a, b, c, d, x[4], 7, -176418897);
    d = ff(d, a, b, c, x[5], 12, 1200080426);
    c = ff(c, d, a, b, x[6], 17, -1473231341);
    b = ff(b, c, d, a, x[7], 22, -45705983);
    a = ff(a, b, c, d, x[8], 7, 1770035416);
    d = ff(d, a, b, c, x[9], 12, -1958414417);
    c = ff(c, d, a, b, x[10], 17, -42063);
    b = ff(b, c, d, a, x[11], 22, -1990404162);
    a = ff(a, b, c, d, x[12], 7, 1804603682);
    d = ff(d, a, b, c, x[13], 12, -40341101);
    c = ff(c, d, a, b, x[14], 17, -1502002290);
    b = ff(b, c, d, a, x[15], 22, 1236535329);

    a = gg(a, b, c, d, x[1], 5, -165796510);
    d = gg(d, a, b, c, x[6], 9, -1069501632);
    c = gg(c, d, a, b, x[11], 14, 643717713);
    b = gg(b, c, d, a, x[0], 20, -373897302);
    a = gg(a, b, c, d, x[5], 5, -701558691);
    d = gg(d, a, b, c, x[10], 9, 38016083);
    c = gg(c, d, a, b, x[15], 14, -660478335);
    b = gg(b, c, d, a, x[4], 20, -405537848);
    a = gg(a, b, c, d, x[9], 5, 568446438);
    d = gg(d, a, b, c, x[14], 9, -1019803690);
    c = gg(c, d, a, b, x[3], 14, -187363961);
    b = gg(b, c, d, a, x[8], 20, 1163531501);
    a = gg(a, b, c, d, x[13], 5, -1444681467);
    d = gg(d, a, b, c, x[2], 9, -51403784);
    c = gg(c, d, a, b, x[7], 14, 1735328473);
    b = gg(b, c, d, a, x[12], 20, -1926607734);

    a = hh(a, b, c, d, x[5], 4, -378558);
    d = hh(d, a, b, c, x[8], 11, -2022574463);
    c = hh(c, d, a, b, x[11], 16, 1839030562);
    b = hh(b, c, d, a, x[14], 23, -35309556);
    a = hh(a, b, c, d, x[1], 4, -1530992060);
    d = hh(d, a, b, c, x[4], 11, 1272893353);
    c = hh(c, d, a, b, x[7], 16, -155497632);
    b = hh(b, c, d, a, x[10], 23, -1094730640);
    a = hh(a, b, c, d, x[13], 4, 681279174);
    d = hh(d, a, b, c, x[0], 11, -358537222);
    c = hh(c, d, a, b, x[3], 16, -722521979);
    b = hh(b, c, d, a, x[6], 23, 76029189);
    a = hh(a, b, c, d, x[9], 4, -640364487);
    d = hh(d, a, b, c, x[12], 11, -421815835);
    c = hh(c, d, a, b, x[15], 16, 530742520);
    b = hh(b, c, d, a, x[2], 23, -995338651);

    a = ii(a, b, c, d, x[0], 6, -198630844);
    d = ii(d, a, b, c, x[7], 10, 1126891415);
    c = ii(c, d, a, b, x[14], 15, -1416354905);
    b = ii(b, c, d, a, x[5], 21, -57434055);
    a = ii(a, b, c, d, x[12], 6, 1700485571);
    d = ii(d, a, b, c, x[3], 10, -1894986606);
    c = ii(c, d, a, b, x[10], 15, -1051523);
    b = ii(b, c, d, a, x[1], 21, -2054922799);
    a = ii(a, b, c, d, x[8], 6, 1873313359);
    d = ii(d, a, b, c, x[15], 10, -30611744);
    c = ii(c, d, a, b, x[6], 15, -1560198380);
    b = ii(b, c, d, a, x[13], 21, 1309151649);
    a = ii(a, b, c, d, x[4], 6, -145523070);
    d = ii(d, a, b, c, x[11], 10, -1120210379);
    c = ii(c, d, a, b, x[2], 15, 718787259);
    b = ii(b, c, d, a, x[9], 21, -343485551);

    a = add32(a, aa);
    b = add32(b, bb);
    c = add32(c, cc);
    d = add32(d, dd);
  }

  function hex(n: number): string {
    let s = "";
    for (let i = 0; i < 4; i++) {
      const byte = (n >>> (i * 8)) & 0xff;
      s += byte.toString(16).padStart(2, "0");
    }
    return s;
  }
  return hex(a) + hex(b) + hex(c) + hex(d);
}

async function subtleHash(algo: "SHA-1" | "SHA-256" | "SHA-512", text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

interface Hashes {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Hashes>({ md5: "", sha1: "", sha256: "", sha512: "" });
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const id = setTimeout(async () => {
      if (!input) {
        setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
        return;
      }
      try {
        const [sha1, sha256, sha512] = await Promise.all([
          subtleHash("SHA-1", input),
          subtleHash("SHA-256", input),
          subtleHash("SHA-512", input),
        ]);
        setHashes({ md5: md5(input), sha1, sha256, sha512 });
      } catch {
        setHashes({ md5: md5(input), sha1: "", sha256: "", sha512: "" });
      }
    }, 200);
    return () => clearTimeout(id);
  }, [input]);

  function copy(label: string, value: string) {
    if (!value) return;
    navigator.clipboard?.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied((c) => (c === label ? null : c)), 1500);
  }

  const rows: { label: string; key: keyof Hashes }[] = [
    { label: "MD5", key: "md5" },
    { label: "SHA-1", key: "sha1" },
    { label: "SHA-256", key: "sha256" },
    { label: "SHA-512", key: "sha512" },
  ];

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Input text</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder="Type or paste text to hash…"
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-mono text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 resize-y"
        />
      </label>

      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.key} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">{r.label}</span>
              <button
                type="button"
                onClick={() => copy(r.label, hashes[r.key])}
                disabled={!hashes[r.key]}
                className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                {copied === r.label ? "Copied!" : "Copy"}
              </button>
            </div>
            <input
              type="text"
              readOnly
              value={hashes[r.key]}
              placeholder="—"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-mono text-xs break-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
