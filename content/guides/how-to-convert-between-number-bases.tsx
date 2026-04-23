import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Binary, octal, decimal, hexadecimal — four number bases cover
      99% of what programmers run into. Converting between them is
      straightforward once you see the pattern, and essential for
      reading memory dumps, understanding flags, decoding Unicode,
      working with permissions, or debugging low-level systems. This
      guide covers the math (it&rsquo;s all just grouping bits
      differently), the shortcuts between binary and hex that make
      mental conversion fast, real uses of each base, and when you
      should reach for a tool instead of doing it by hand.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What a &ldquo;base&rdquo; actually is</h2>
    <p>
      A number base is the count of unique digits used to represent
      values. Decimal uses 10 (0-9); binary uses 2 (0-1);
      hexadecimal uses 16 (0-9, A-F).
    </p>
    <p>
      Each digit position represents a power of the base. In decimal,
      the number 345 means 3×100 + 4×10 + 5×1 — powers of 10 (10^2,
      10^1, 10^0).
    </p>
    <p>
      In binary, 101 means 1×4 + 0×2 + 1×1 = 5 — powers of 2.
    </p>
    <p>
      In hex, 2F means 2×16 + 15 = 47 — powers of 16.
    </p>

    <h2>The four bases you&rsquo;ll meet in practice</h2>
    <p>
      <strong>Binary (base 2):</strong> digits 0, 1. Native to
      digital logic and bits. Heavy bit manipulation, hardware, file
      format parsing.
    </p>
    <p>
      <strong>Octal (base 8):</strong> digits 0-7. Each digit maps
      to 3 bits. Historically used in older systems; now mostly
      seen in Unix file permissions (chmod 755 is octal).
    </p>
    <p>
      <strong>Decimal (base 10):</strong> digits 0-9. Human-facing
      numbers.
    </p>
    <p>
      <strong>Hexadecimal (base 16):</strong> digits 0-9, A-F. Each
      digit maps to 4 bits. Ubiquitous: memory addresses, color
      codes (#FF5733), HTTP hex, hashes, Unicode code points.
    </p>

    <h2>Decimal → binary</h2>
    <p>
      Repeatedly divide by 2 and record remainders; read remainders
      bottom-up.
    </p>
    <p>
      Example: 13 in binary.
    </p>
    <p>
      13 / 2 = 6 remainder 1
    </p>
    <p>
      6 / 2 = 3 remainder 0
    </p>
    <p>
      3 / 2 = 1 remainder 1
    </p>
    <p>
      1 / 2 = 0 remainder 1
    </p>
    <p>
      Read bottom-up: 1101. Verify: 8 + 4 + 0 + 1 = 13. ✓
    </p>

    <h2>Binary → decimal</h2>
    <p>
      Multiply each bit by its power of 2 and sum.
    </p>
    <p>
      Example: 10110 in decimal.
    </p>
    <p>
      1×16 + 0×8 + 1×4 + 1×2 + 0×1 = 22.
    </p>

    <h2>Binary ↔ hex — the shortcut</h2>
    <p>
      Each hex digit = 4 bits. This makes hex ↔ binary conversion
      group-by-group, no math required.
    </p>
    <p>
      Memorize the 16 nibbles (or look them up the first dozen
      times):
    </p>
    <p>
      0=0000, 1=0001, 2=0010, 3=0011, 4=0100, 5=0101, 6=0110,
      7=0111, 8=1000, 9=1001, A=1010, B=1011, C=1100, D=1101,
      E=1110, F=1111.
    </p>
    <p>
      Binary → hex: group binary into 4-bit chunks from the right,
      translate each chunk.
    </p>
    <p>
      11010110 → 1101 0110 → D6.
    </p>
    <p>
      Hex → binary: expand each hex digit to 4 bits.
    </p>
    <p>
      B3 → 1011 0011.
    </p>

    <h2>Binary ↔ octal — same idea, groups of 3</h2>
    <p>
      Each octal digit = 3 bits.
    </p>
    <p>
      110101 → 110 101 → 65 (octal). Verify: 6×8 + 5 = 53 in decimal;
      binary 110101 = 32+16+4+1 = 53. ✓
    </p>
    <p>
      Octal → binary: expand each digit to 3 bits.
    </p>
    <p>
      755 (octal) → 111 101 101 (binary). Useful for reading chmod
      permissions: rwx-r-x-r-x.
    </p>

    <h2>Decimal ↔ hex</h2>
    <p>
      Two approaches:
    </p>
    <p>
      <strong>Direct:</strong> repeatedly divide by 16 and record
      remainders (0-15, with 10-15 as A-F). Read bottom-up.
    </p>
    <p>
      <strong>Via binary:</strong> easier mentally for small numbers.
      Convert decimal → binary → group into 4s → hex.
    </p>
    <p>
      Example: 202 in hex.
    </p>
    <p>
      202 / 16 = 12 remainder 10 → A.
    </p>
    <p>
      12 / 16 = 0 remainder 12 → C.
    </p>
    <p>
      Read bottom-up: CA. Verify: 12×16 + 10 = 202. ✓
    </p>

    <h2>Reading code — base prefixes</h2>
    <p>
      Most languages use prefixes to disambiguate:
    </p>
    <p>
      <strong>0b</strong> or <strong>0B</strong>: binary. 0b1101.
    </p>
    <p>
      <strong>0o</strong> or leading <strong>0</strong> (older C/
      Python): octal. 0o755 or 0755.
    </p>
    <p>
      <strong>0x</strong> or <strong>0X</strong>: hex. 0xFF.
    </p>
    <p>
      No prefix: decimal.
    </p>
    <p>
      <strong>Trap:</strong> leading-zero octal in C is a footgun.
      075 is 61 decimal, not 75. Modern JavaScript threw this out:
      0o75 works; 075 is an error in strict mode.
    </p>

    <h2>Why hex for colors, memory, and hashes</h2>
    <p>
      <strong>Colors (#FF5733):</strong> 3 bytes of RGB, each byte
      0-255, compactly expressed as 2 hex digits. More readable than
      decimal (255, 87, 51) and trivially maps to underlying bytes.
    </p>
    <p>
      <strong>Memory addresses (0x7FFEDB5A):</strong> address space
      is naturally aligned with 4-byte or 8-byte boundaries. Hex
      makes alignment and masking visible.
    </p>
    <p>
      <strong>Hashes (MD5, SHA-256):</strong> binary data rendered
      as hex for readability. 32 hex chars = 16 bytes = 128 bits of
      MD5.
    </p>
    <p>
      <strong>Unicode code points (U+1F600):</strong> the Unicode
      table is effectively indexed in hex.
    </p>

    <h2>Octal for Unix permissions</h2>
    <p>
      Each permission triplet (read-write-execute) maps to 3 bits,
      which conveniently fits one octal digit.
    </p>
    <p>
      r = 4, w = 2, x = 1. Add to combine: rw = 6, rx = 5, rwx = 7.
    </p>
    <p>
      755 = owner rwx (7), group rx (5), other rx (5). Common for
      directories.
    </p>
    <p>
      644 = owner rw (6), group r (4), other r (4). Common for
      regular files.
    </p>
    <p>
      600 = owner rw, group and other nothing. For SSH keys.
    </p>

    <h2>Bitwise operations — when base matters</h2>
    <p>
      AND, OR, XOR, NOT, bit-shift. All operate on the binary
      representation regardless of how you wrote the number.
    </p>
    <p>
      <strong>Flag checking:</strong> <code>if (flags &amp;
      FLAG_ADMIN)</code>. Defined constants are usually single-bit
      (0x1, 0x2, 0x4...) and hex or binary makes the bit pattern
      visible.
    </p>
    <p>
      <strong>Bitmasks:</strong> <code>color &amp; 0xFF</code>
      extracts the last byte. The hex mask reads directly as &ldquo;
      keep these 8 bits&rdquo;.
    </p>
    <p>
      <strong>Shifts:</strong> <code>x &lt;&lt; 4</code> multiplies
      by 16; <code>x &gt;&gt; 4</code> divides by 16. Useful for
      packing 4-bit values into bytes.
    </p>

    <h2>Two&rsquo;s complement — negative binary</h2>
    <p>
      Computers represent signed integers using two&rsquo;s
      complement. To negate an n-bit binary number: invert all bits
      and add 1.
    </p>
    <p>
      -5 in 8-bit two&rsquo;s complement: 5 is 00000101 → invert →
      11111010 → add 1 → 11111011. Verify: 11111011 + 00000101 =
      00000000 (with overflow). ✓
    </p>
    <p>
      An 8-bit byte represents values -128 to 127; 16-bit int
      represents -32,768 to 32,767; 32-bit int represents
      approximately ±2.1 billion. A hex FF in signed byte = -1, not
      255.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Mixing signed and unsigned.</strong> FF is 255 (unsigned
      byte) or -1 (signed byte). Always know which.
    </p>
    <p>
      <strong>Off-by-one in bit positions.</strong> The rightmost bit
      is bit 0, not bit 1. Flag for bit 3 is 1 &lt;&lt; 3 = 8, not
      16.
    </p>
    <p>
      <strong>Reading binary right-to-left inconsistently.</strong>
      The least-significant bit (LSB) is the rightmost. Networks and
      file formats use big-endian OR little-endian byte ordering —
      always check the spec.
    </p>
    <p>
      <strong>Confusing base prefix.</strong> 010 is 10 in decimal
      but 8 in octal (in C-family languages).
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert any number between bases with the{" "}
      <a href="/tools/number-base-converter">number base converter</a>.
      Pair with the{" "}
      <a href="/tools/color-converter">color converter</a> when
      translating hex colors to RGB/HSL, and the{" "}
      <a href="/tools/base64-encoder-decoder">Base64 encoder/decoder</a>
      {" "}for the higher-base text encoding of arbitrary bytes.
    </p>
  </>
);
