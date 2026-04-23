import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Base64 is the glue that lets binary data travel through text-only pipes. Email bodies,
      JSON payloads, URL parameters, HTML data attributes, and OAuth tokens were all designed
      for ASCII, which means a raw image or an encryption key can&rsquo;t be dropped in
      verbatim&mdash;the random bytes will collide with control characters, get mangled by
      character-set conversions, or confuse a parser expecting newlines. Base64 rewrites bytes
      using a 64-character alphabet that survives every reasonable text transport, at the cost
      of roughly 33% size inflation. It is an encoding, not encryption&mdash;anyone can decode
      it. This guide covers the alphabet, how the three-byte-to-four-character math works,
      padding rules, the URL-safe variant, data URLs, and the decisions you&rsquo;ll make around
      when the size tradeoff is worth it.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Why encode binary as text</h2>
    <p>
      Text-based protocols only reserve a safe subset of bytes for payload. SMTP was specified
      for 7-bit ASCII; any byte with the high bit set could be stripped or corrupted by a mail
      relay. HTTP headers cannot contain newlines. JSON strings cannot contain raw control
      characters. URL query strings have reserved characters like <code>?</code>, <code>&amp;</code>,
      and <code>=</code>. If you want to ship a PNG through any of these, you either escape
      every non-safe byte individually (ugly and verbose) or you re-encode the whole payload
      using an alphabet that&rsquo;s universally safe. Base64 picked 64 symbols that every
      text-handling system accepts.
    </p>

    <h2>The alphabet</h2>
    <p>
      Standard Base64 uses <code>A&ndash;Z</code>, <code>a&ndash;z</code>, <code>0&ndash;9</code>,
      plus <code>+</code> and <code>/</code>&mdash;sixty-four distinct symbols. The equals sign{" "}
      <code>=</code> is reserved as padding. Together that&rsquo;s 65 characters, all of which
      pass through ASCII, UTF-8, EBCDIC mail gateways, and printer drivers without change.
    </p>
    <pre>{`Index  Char      Index  Char      Index  Char      Index  Char
0      A         16     Q         32     g         48     w
1      B         17     R         33     h         49     x
...    ...       ...    ...       ...    ...       ...    ...
25     Z         41     p         57     5         (62    +)
26     a         42     q         58     6         (63    /)

Padding: =`}</pre>

    <h2>How the encoding math works</h2>
    <p>
      Base64 takes <strong>three bytes</strong> (24 bits) and splits them into <strong>four
      6-bit groups</strong>, then looks up each 6-bit value in the alphabet. Three bytes in,
      four characters out&mdash;always. That&rsquo;s where the 33% expansion comes from: 4 / 3
      = 1.333.
    </p>
    <pre>{`Input bytes:   M       a       n
ASCII:         77      97      110
Binary:        01001101 01100001 01101110
Split into 6:  010011 010110 000101 101110
Values:        19     22     5      46
Base64:        T      W      F      u

"Man" → "TWFu"`}</pre>

    <h2>Padding</h2>
    <p>
      When the input length isn&rsquo;t a multiple of three, you pad the output with{" "}
      <code>=</code> so the length is a multiple of four. One leftover byte produces two
      characters plus <code>==</code>; two leftover bytes produce three characters plus{" "}
      <code>=</code>. Padding lets decoders know where the data ends and distinguishes
      &ldquo;this is exactly three bytes&rdquo; from &ldquo;this is one byte.&rdquo;
    </p>
    <pre>{`"M"   → "TQ=="    (1 byte  → 2 chars + ==)
"Ma"  → "TWE="    (2 bytes → 3 chars + =)
"Man" → "TWFu"    (3 bytes → 4 chars, no pad)`}</pre>
    <p>
      Some parsers tolerate missing padding; others reject it. If you&rsquo;re producing Base64
      for a strict decoder (RFC 4648), always include the padding. If you&rsquo;re producing it
      for a URL query string where <code>=</code> has special meaning, you may strip padding
      and add it back during decode.
    </p>

    <h2>URL-safe Base64</h2>
    <p>
      The <code>+</code> and <code>/</code> characters collide with URL syntax&mdash;<code>+</code>
      means &ldquo;space&rdquo; in form-encoded data, and <code>/</code> is a path separator.
      RFC 4648 defines a URL-safe alternative that swaps them for <code>-</code> and{" "}
      <code>_</code>. Padding <code>=</code> is usually dropped because it&rsquo;s a reserved
      URL character too. JWTs use this variant exclusively.
    </p>
    <pre>{`Standard: SGVsbG8gd29ybGQ+
URL-safe: SGVsbG8gd29ybGQ-

Standard uses: + / =
URL-safe uses: - _ (no padding)`}</pre>

    <h2>Data URLs</h2>
    <p>
      A data URL embeds an entire file inside a URL, with the payload typically Base64-encoded.
      The format is <code>data:[mime];base64,[payload]</code>. This is why you sometimes see
      a 40KB blob of garbage in an HTML <code>src</code> attribute&mdash;it&rsquo;s an inline
      image, saving an HTTP round trip at the cost of page size and no browser cache reuse. Use
      data URLs for small icons and critical-path images; anything over ~10KB is usually better
      served as a real file.
    </p>
    <pre>{`<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..." />

data:text/plain;base64,SGVsbG8gd29ybGQh  → "Hello world!"`}</pre>

    <h2>The 33% tax is real</h2>
    <p>
      Base64 always inflates payloads by a factor of 4/3. A 1MB image becomes a 1.33MB string.
      Over the wire this is partially offset by gzip, which compresses Base64 text well, but
      the CPU cost of encoding, decoding, and decompressing adds up. For inline thumbnails and
      fonts, it&rsquo;s fine. For user-uploaded photos in a mobile app, it&rsquo;s wasteful
      compared to a multipart upload.
    </p>

    <h2>Base64 is not encryption</h2>
    <p>
      Anyone can decode Base64. It hides nothing&mdash;it is an encoding transformation, same
      category as hex. Storing a password &ldquo;encrypted&rdquo; in Base64 is equivalent to
      storing it in plain text. Use real cryptography (AES, libsodium, bcrypt for passwords).
      Base64 is only for moving bytes through text channels.
    </p>

    <h2>Common uses in practice</h2>
    <p>
      Basic HTTP auth sends <code>Authorization: Basic base64(user:pass)</code>. JWTs Base64-encode
      header, payload, and signature. Email attachments are Base64 in MIME bodies. Cryptographic
      key exports&mdash;SSH public keys, PEM certificates&mdash;wrap raw bytes in Base64 between
      BEGIN/END markers. Webhook signatures and HMAC results are often Base64-encoded. API
      responses sometimes Base64-encode binary blobs like PDFs or images to keep the response
      as a single JSON document.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Double-encoding.</strong> Encoding already-encoded Base64 produces a legal but
      longer string that decodes back to Base64, not your bytes. If your decoded output looks
      like more Base64, you ran the encoder twice.
    </p>
    <p>
      <strong>Missing padding.</strong> A stripped <code>=</code> in transit will cause strict
      decoders to throw &ldquo;invalid length&rdquo; errors. Either use a lenient decoder or
      re-add <code>=</code> so the length is a multiple of four.
    </p>
    <p>
      <strong>Mixing up URL-safe and standard alphabets.</strong> Feeding a URL-safe string into
      a standard decoder fails on <code>-</code> and <code>_</code>. Know which variant you
      produced and decode accordingly, or normalize before decoding.
    </p>
    <p>
      <strong>Treating Base64 as encryption.</strong> It isn&rsquo;t. If the goal is secrecy,
      you need real cryptography. Base64 only provides transport safety.
    </p>
    <p>
      <strong>Using Base64 for large binary payloads when multipart would work.</strong> The
      33% tax compounds with serialization and logging costs. If the transport supports binary
      (gRPC, raw HTTP bodies, multipart form uploads), skip Base64.
    </p>
    <p>
      <strong>Assuming the output is line-wrapped.</strong> RFC 2045 (MIME) wraps at 76
      characters; RFC 4648 does not. If you&rsquo;re comparing Base64 strings for equality,
      strip whitespace first.
    </p>
    <p>
      <strong>Encoding a UTF-8 string without specifying the character set.</strong> Base64
      operates on bytes, not characters. Encoding <code>&ldquo;caf&eacute;&rdquo;</code> as
      Latin-1 gives a different result than UTF-8. Always agree on the byte encoding before
      Base64&rsquo;ing.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Encode and decode instantly, with optional URL-safe mode, in our{" "}
      <a href="/tools/base64-encoder-decoder">Base64 encoder and decoder</a>. Pair it with the{" "}
      <a href="/tools/data-size-converter">data size converter</a> when you&rsquo;re sanity-checking
      the size inflation on an image or payload, and the{" "}
      <a href="/tools/regex-tester">regex tester</a> to validate the shape of a Base64 string
      before handing it to a decoder.
    </p>
  </>
);
