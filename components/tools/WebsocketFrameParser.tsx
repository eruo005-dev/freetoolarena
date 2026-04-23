"use client";
import { useMemo, useState } from "react";

const OPCODES: Record<number, string> = {
  0x0: "continuation",
  0x1: "text",
  0x2: "binary",
  0x8: "close",
  0x9: "ping",
  0xa: "pong",
};

type Parsed =
  | { ok: true; fin: boolean; rsv: [boolean, boolean, boolean]; opcode: number; opName: string; mask: boolean; payloadLen: number; lenField: string; maskingKey?: string; payloadHex: string; payloadText?: string }
  | { ok: false; error: string };

export function WebsocketFrameParser() {
  const [input, setInput] = useState("81 85 37 fa 21 3d 7f 9f 4d 51 58");
  const parsed = useMemo(() => parse(input), [input]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Frame hex bytes</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        />
      </label>

      {parsed.ok ? (
        <div className="rounded-xl bg-slate-50 p-4 space-y-1.5 text-sm">
          <Row k="FIN" v={parsed.fin ? "1 (final fragment)" : "0 (more to come)"} />
          <Row k="RSV1 / RSV2 / RSV3" v={`${bit(parsed.rsv[0])} / ${bit(parsed.rsv[1])} / ${bit(parsed.rsv[2])}`} />
          <Row k="Opcode" v={`0x${parsed.opcode.toString(16)} (${parsed.opName})`} />
          <Row k="MASK" v={parsed.mask ? "1 (client&mdash;masked)" : "0 (server&mdash;unmasked)"} />
          <Row k="Payload length" v={`${parsed.payloadLen} bytes (${parsed.lenField})`} />
          {parsed.maskingKey && <Row k="Masking key" v={parsed.maskingKey} />}
          <Row k="Payload (hex)" v={parsed.payloadHex || "(empty)"} />
          {parsed.payloadText !== undefined && <Row k="Payload (text)" v={parsed.payloadText} />}
        </div>
      ) : (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700 font-mono">{parsed.error}</div>
      )}
    </div>
  );
}

function bit(b: boolean) {
  return b ? "1" : "0";
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-slate-500 w-44 shrink-0">{k}</span>
      <span className="font-mono text-slate-800 break-all" dangerouslySetInnerHTML={{ __html: v }} />
    </div>
  );
}

function parse(src: string): Parsed {
  const tokens = src.trim().split(/[\s,]+/).filter(Boolean);
  const bytes: number[] = [];
  for (const t of tokens) {
    const clean = t.startsWith("0x") ? t.slice(2) : t;
    if (!/^[0-9a-fA-F]{1,2}$/.test(clean)) return { ok: false, error: `Invalid hex token: ${t}` };
    bytes.push(parseInt(clean, 16));
  }
  if (bytes.length < 2) return { ok: false, error: "Need at least 2 bytes for a WS frame header." };

  const b0 = bytes[0];
  const b1 = bytes[1];
  const fin = (b0 & 0x80) !== 0;
  const rsv: [boolean, boolean, boolean] = [(b0 & 0x40) !== 0, (b0 & 0x20) !== 0, (b0 & 0x10) !== 0];
  const opcode = b0 & 0x0f;
  const opName = OPCODES[opcode] ?? "reserved";
  const mask = (b1 & 0x80) !== 0;
  const len7 = b1 & 0x7f;

  let cursor = 2;
  let payloadLen = len7;
  let lenField = "7-bit";
  if (len7 === 126) {
    if (bytes.length < 4) return { ok: false, error: "Extended 16-bit length missing." };
    payloadLen = (bytes[2] << 8) | bytes[3];
    cursor = 4;
    lenField = "16-bit extension";
  } else if (len7 === 127) {
    if (bytes.length < 10) return { ok: false, error: "Extended 64-bit length missing." };
    payloadLen = 0;
    for (let i = 2; i < 10; i++) payloadLen = payloadLen * 256 + bytes[i];
    cursor = 10;
    lenField = "64-bit extension";
  }

  let maskingKey: string | undefined;
  let maskBytes: number[] = [];
  if (mask) {
    if (bytes.length < cursor + 4) return { ok: false, error: "Masking key missing (need 4 bytes)." };
    maskBytes = bytes.slice(cursor, cursor + 4);
    maskingKey = maskBytes.map((b) => b.toString(16).padStart(2, "0")).join(" ");
    cursor += 4;
  }

  const payload = bytes.slice(cursor, cursor + payloadLen);
  const unmasked = mask ? payload.map((b, i) => b ^ maskBytes[i % 4]) : payload;
  const payloadHex = unmasked.map((b) => b.toString(16).padStart(2, "0")).join(" ");
  let payloadText: string | undefined;
  if (opcode === 0x1) {
    try {
      payloadText = new TextDecoder("utf-8", { fatal: false }).decode(new Uint8Array(unmasked));
    } catch {
      payloadText = undefined;
    }
  }

  return { ok: true, fin, rsv, opcode, opName, mask, payloadLen, lenField, maskingKey, payloadHex, payloadText };
}
