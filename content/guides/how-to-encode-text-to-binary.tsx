import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Converting text to binary is the most direct way to show what
      a computer actually sees when you type a character. Every
      letter becomes a sequence of bits, either 7 or 8 per character
      for ASCII, or up to 32 bits for a UTF-8 Unicode character. The
      conversion sounds mechanical, but three decisions shape the
      output: ASCII vs UTF-8, 7-bit vs 8-bit framing, and big-endian
      vs little-endian byte order. Getting any of the three wrong
      turns &ldquo;Hello&rdquo; into unreadable garbage on the other
      side. This guide covers what a byte actually encodes, how
      ASCII and UTF-8 differ in the encoding of the same character,
      the role of endianness, the legitimate modern uses (retro
      hardware, teaching, debugging binary protocols), and the
      common conversion mistakes to avoid.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What a byte holds</h2>
    <p>
      A byte is 8 bits. Each bit is 0 or 1. 8 bits give 256
      possible values (<code>00000000</code> through
      <code> 11111111</code>), typically written as 0 to 255
      decimal or 00 to FF hex. Text encodings map each character to
      one or more bytes; binary conversion shows those bytes as
      explicit sequences of 0s and 1s.
    </p>

    <h2>ASCII &mdash; 7 bits per character</h2>
    <p>
      ASCII (1963, standardized in ANSI X3.4-1968) defines 128
      characters in 7 bits. Letters, digits, punctuation, and
      control codes.
    </p>
    <pre>{`A = 65  = 01000001
a = 97  = 01100001
0 = 48  = 00110000
space = 32 = 00100000
newline = 10 = 00001010`}</pre>
    <p>
      The 8th bit is zero in pure ASCII. Many systems historically
      used the extra bit for extended character sets
      (&ldquo;high ASCII&rdquo; for accented letters,
      box-drawing), with every vendor picking a different mapping
      &mdash; the mess that Unicode was invented to end.
    </p>

    <h2>UTF-8 &mdash; Unicode in 1 to 4 bytes</h2>
    <p>
      UTF-8 (RFC 3629) is the dominant encoding on the modern web.
      It encodes every Unicode code point using 1 to 4 bytes:
    </p>
    <p>
      <strong>1 byte</strong> (code points 0&ndash;127): identical to
      ASCII. <code>0xxxxxxx</code>. Leading bit 0.
    </p>
    <p>
      <strong>2 bytes</strong> (128&ndash;2047):
      <code> 110xxxxx 10xxxxxx</code>. Covers Latin extended, Greek,
      Cyrillic, Hebrew, Arabic.
    </p>
    <p>
      <strong>3 bytes</strong> (2048&ndash;65535):
      <code> 1110xxxx 10xxxxxx 10xxxxxx</code>. Covers most CJK
      ideographs, Devanagari, and the BMP.
    </p>
    <p>
      <strong>4 bytes</strong> (65536&ndash;1114111):
      <code> 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx</code>. Covers
      emoji, rarer CJK, historic scripts.
    </p>
    <p>
      Example: &ldquo;&eacute;&rdquo; (U+00E9) in UTF-8 is
      <code> 11000011 10101001</code> (0xC3 0xA9 &mdash; two bytes).
      The emoji &ldquo;&#128512;&rdquo; (U+1F600) is four UTF-8
      bytes.
    </p>

    <h2>UTF-16 and UTF-32</h2>
    <p>
      <strong>UTF-16</strong>: 2 bytes for Basic Multilingual Plane,
      4 bytes for supplementary planes via surrogate pairs. Default
      in-memory encoding for JavaScript strings, Java strings, and
      Windows APIs. Uses a byte-order mark (BOM) to signal
      endianness.
    </p>
    <p>
      <strong>UTF-32</strong>: always 4 bytes per code point. Rare
      outside internal representations where random access to code
      points matters.
    </p>

    <h2>Endianness</h2>
    <p>
      For encodings wider than 1 byte (UTF-16, UTF-32, binary
      numbers), the order of bytes matters.
    </p>
    <p>
      <strong>Big-endian</strong> (network byte order, Motorola
      68k): most significant byte first. The 16-bit value
      <code> 0x1234</code> is stored as <code>12 34</code>.
    </p>
    <p>
      <strong>Little-endian</strong> (Intel x86, ARM default,
      modern CPUs): least significant byte first.
      <code> 0x1234</code> stored as <code>34 12</code>.
    </p>
    <p>
      UTF-16 files start with a byte-order mark
      (<code>FE FF</code> for BE, <code>FF FE</code> for LE) so
      readers know. UTF-8 has no endianness (single byte units) but
      some systems still prepend a BOM (<code>EF BB BF</code>) as
      an encoding marker; it breaks many parsers and is best
      avoided.
    </p>

    <h2>Converting step by step</h2>
    <p>
      To encode &ldquo;Hi&rdquo; to ASCII binary:
    </p>
    <pre>{`H -> 72  -> 01001000
i -> 105 -> 01101001

Full: 01001000 01101001`}</pre>
    <p>
      In JavaScript:
    </p>
    <pre>{`function textToBinary(str) {
  return [...str].map(ch =>
    ch.codePointAt(0).toString(2).padStart(8, '0')
  ).join(' ');
}

textToBinary('Hi');  // '01001000 01101001'`}</pre>
    <p>
      Note: <code>codePointAt(0)</code> returns a single Unicode
      code point, but that is not the same as a UTF-8 byte. For
      proper UTF-8 byte-level output:
    </p>
    <pre>{`function utf8Binary(str) {
  const bytes = new TextEncoder().encode(str);
  return [...bytes].map(b =>
    b.toString(2).padStart(8, '0')
  ).join(' ');
}

utf8Binary('caf\u00e9');
// '01100011 01100001 01100110 11000011 10101001'`}</pre>

    <h2>7-bit framing</h2>
    <p>
      Pure ASCII output is sometimes written with 7 bits per
      character, dropping the leading zero:
    </p>
    <pre>{`H = 1001000 (7 bits)
i = 1101001 (7 bits)`}</pre>
    <p>
      Used historically in 7-bit serial protocols and email
      transports before 8-bit MIME became universal. In 2026 this
      is primarily a puzzle-design choice or a bandwidth trick on
      constrained radio links.
    </p>

    <h2>Base-N conversions</h2>
    <p>
      Binary is base-2. Related encodings use more compact bases:
    </p>
    <p>
      <strong>Hexadecimal</strong> (base-16): 4 bits per digit.
      <code> H</code> becomes <code>48</code>.
    </p>
    <p>
      <strong>Octal</strong> (base-8): 3 bits per digit.
      <code> H</code> becomes <code>110</code>.
    </p>
    <p>
      <strong>Base64</strong>: groups of 6 bits expressed as one
      of 64 printable ASCII characters. Common for embedding
      binary in text where binary is unsafe (email, JSON, URLs).
    </p>

    <h2>Real uses today</h2>
    <p>
      <strong>Teaching</strong> how computers store text. Clearer
      than any metaphor.
    </p>
    <p>
      <strong>Debugging</strong> binary protocols at the byte level.
      When a custom protocol says &ldquo;3 bytes header, magic
      value 0x4A6F,&rdquo; reading the binary or hex dump is how
      you confirm.
    </p>
    <p>
      <strong>Retro computing</strong>: punch cards, paper tape,
      6502 assembly, Z80. Everything is bits down there.
    </p>
    <p>
      <strong>Encoding layers in CTF or puzzle hunts</strong>:
      ciphertext wrapped in Base64 wrapped in hex wrapped in
      binary. Recognize each layer and unwrap.
    </p>
    <p>
      <strong>Signage and novelty</strong>: T-shirts, tattoos, and
      the occasional physical plaque. Convert and proofread &mdash;
      a flipped bit is permanent.
    </p>

    <h2>Character encoding detection</h2>
    <p>
      Given a binary blob, is it ASCII, Latin-1, UTF-8, or
      something else? Heuristics:
    </p>
    <p>
      All bytes under 0x80 &rarr; safe to interpret as ASCII or
      UTF-8.
    </p>
    <p>
      Bytes 0x80&ndash;0xBF never appear first in UTF-8 &mdash; if
      one starts a &ldquo;character,&rdquo; it is not valid UTF-8.
    </p>
    <p>
      Presence of the UTF-8 BOM (0xEF 0xBB 0xBF) at the start is a
      strong signal of UTF-8.
    </p>
    <p>
      Failure to decode as UTF-8 usually means Latin-1, Windows-1252,
      or a legacy Asian encoding (Shift JIS, GB18030). Modern
      libraries (<code>chardet</code>, <code>uchardet</code>) get
      it right most of the time but are not magic.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Forgetting that one character is not always one
      byte.</strong> In UTF-8, &ldquo;caf&eacute;&rdquo; is 5
      characters but 5&ndash;6 bytes (depending on composed vs
      decomposed form). Always distinguish character length from
      byte length.
    </p>
    <p>
      <strong>Using <code>charCodeAt</code> for non-BMP
      characters.</strong>
      Returns a UTF-16 code unit, not a full code point. For
      emoji and rarer CJK, use <code>codePointAt</code>.
    </p>
    <p>
      <strong>Omitting leading zeros.</strong>
      <code> A</code> is binary <code>01000001</code> (8 bits);
      writing <code>1000001</code> looks tidy but confuses
      fixed-width parsers. Always pad.
    </p>
    <p>
      <strong>Mixing endianness halfway through a file.</strong>
      Output UTF-16-BE for headers and UTF-16-LE for the body,
      and the reader gets garbage. Pick one and stick with it; BOM
      announces the choice.
    </p>
    <p>
      <strong>Adding a UTF-8 BOM by accident.</strong> Windows
      Notepad famously prepends one. Many parsers (older PHP, some
      JSON libraries) choke. If you must have a marker, use
      <code> Content-Type: ...; charset=utf-8</code> at the protocol
      level.
    </p>
    <p>
      <strong>Treating binary output as a string to concatenate.</strong>
      Adding the string &ldquo;01000001&rdquo; to another is fine;
      adding <code>0x41</code> as a number is different. Keep the
      type consistent.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert text to and from binary with the{" "}
      <a href="/tools/binary-text-encoder">binary text encoder</a>.
      Pair with the{" "}
      <a href="/tools/base64-encoder-decoder">Base64 encoder/decoder</a>
      {" "}when you need compact binary-in-text representation, and
      the{" "}
      <a href="/tools/caesar-cipher">Caesar cipher tool</a> for
      layered puzzles that mix base conversion with simple
      encryption.
    </p>
  </>
);
