import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Base64 is the Swiss Army knife of &ldquo;I need to stuff
      arbitrary bytes into a text-only channel.&rdquo; Email
      attachments, JWT tokens, data URIs in CSS, API auth headers —
      all lean on it. This guide walks through what Base64 actually
      does (spoiler: not encryption), when to use it, the variants
      you&rsquo;ll run into (standard, URL-safe, MIME), the 33%
      size overhead, and the common mistakes — using it for security,
      forgetting to handle padding, and confusing encoding
      directions.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What Base64 is — and isn&rsquo;t</h2>
    <p>
      Base64 is a binary-to-text encoding. It represents binary data
      using 64 ASCII characters (A-Z, a-z, 0-9, +, /) plus = for
      padding. Every 3 bytes of input become 4 characters of output.
    </p>
    <p>
      <strong>It is NOT encryption.</strong> Anyone can decode
      Base64 instantly with any decoder. Treating
      &ldquo;base64-encoded&rdquo; as &ldquo;obfuscated&rdquo; or
      &ldquo;secure&rdquo; is a classic mistake in audits and
      security reviews.
    </p>
    <p>
      <strong>It is NOT compression.</strong> Base64 <em>expands</em>
      data by ~33%. Encoding compressed data (like a zip file) in
      Base64 makes it larger, not smaller.
    </p>
    <p>
      The entire purpose of Base64 is to let binary data travel
      through systems that assume text — HTTP headers, JSON values,
      email bodies, URL parameters, XML.
    </p>

    <h2>The encoding mechanics — how 3 → 4</h2>
    <p>
      Input: 3 bytes (24 bits).
    </p>
    <p>
      Split those 24 bits into 4 groups of 6 bits each.
    </p>
    <p>
      Each 6-bit group maps to one of 64 characters (hence
      &ldquo;Base 64&rdquo;).
    </p>
    <p>
      Output: 4 characters, all printable ASCII, safe to transmit
      anywhere.
    </p>
    <p>
      If input isn&rsquo;t a multiple of 3 bytes, pad with zero bits
      and indicate with =:
    </p>
    <p>
      <strong>1 byte of input:</strong> 2 chars of output + &ldquo;==&rdquo;.
    </p>
    <p>
      <strong>2 bytes of input:</strong> 3 chars of output + &ldquo;=&rdquo;.
    </p>
    <p>
      <strong>3 bytes of input:</strong> 4 chars, no padding.
    </p>
    <p>
      This is why Base64 strings always end with 0, 1, or 2 equals
      signs. Length is always a multiple of 4.
    </p>

    <h2>Base64 variants</h2>
    <p>
      <strong>Standard Base64 (RFC 4648):</strong> uses + and / as
      the 63rd and 64th characters. Padding with =. Works for most
      contexts.
    </p>
    <p>
      <strong>URL-safe Base64 (RFC 4648 §5):</strong> uses - (minus)
      instead of + and _ (underscore) instead of /. Padding optional.
      Used in JWT tokens, URL path parameters, anywhere + and / would
      be URL-encoded or confused with query separators.
    </p>
    <p>
      <strong>MIME Base64 (RFC 2045):</strong> standard Base64 with
      line breaks every 76 characters. Used in email attachments.
    </p>
    <p>
      <strong>Base64 without padding:</strong> some formats (JWT)
      strip trailing = for compactness. Decoders must handle both
      padded and unpadded input.
    </p>
    <p>
      Mixing variants is a common bug source: a decoder expecting
      standard Base64 chokes on URL-safe input containing - or _.
      Know which variant you&rsquo;re in.
    </p>

    <h2>The 33% size overhead</h2>
    <p>
      Output size = ⌈input_bytes / 3⌉ × 4.
    </p>
    <p>
      100 bytes of input → 136 bytes of output (36% larger when
      padding counts).
    </p>
    <p>
      1 KB → ~1.33 KB.
    </p>
    <p>
      1 MB → ~1.33 MB.
    </p>
    <p>
      Implication: inlining images as data URIs (&ldquo;data:image/
      png;base64,...&rdquo;) adds 33%. For a 1 MB hero image,
      that&rsquo;s 333 KB extra payload the browser has to parse
      before it can display anything. Small icons: fine. Large
      images: bad tradeoff.
    </p>

    <h2>When to use Base64</h2>
    <p>
      <strong>Email attachments.</strong> SMTP historically
      supported only 7-bit ASCII. MIME Base64 remains the standard.
    </p>
    <p>
      <strong>HTTP Basic Auth headers.</strong>
      &ldquo;Authorization: Basic &lt;base64(user:password)&gt;&rdquo;.
      Remember — this is encoding, not security. Basic Auth without
      TLS is plaintext.
    </p>
    <p>
      <strong>JWT tokens.</strong> JSON Web Tokens are three
      URL-safe-Base64 segments separated by dots: header.payload.signature.
    </p>
    <p>
      <strong>Data URIs.</strong> &ldquo;data:image/png;base64,...&rdquo;
      embeds binary assets inline in HTML/CSS. Use for small icons,
      SVG fallbacks.
    </p>
    <p>
      <strong>API responses with binary data.</strong> When JSON
      needs to contain an image, file, or cryptographic key, Base64
      it.
    </p>
    <p>
      <strong>Storing binary in databases with text-only columns.</strong>
      Better practice is to use a binary column (BLOB, BYTEA), but
      Base64 in a VARCHAR works when you can&rsquo;t.
    </p>

    <h2>When NOT to use Base64</h2>
    <p>
      <strong>Hiding sensitive data.</strong> It&rsquo;s trivially
      reversible. Use real encryption (AES, RSA, etc.), not Base64.
    </p>
    <p>
      <strong>Large file transfer.</strong> The 33% overhead and
      text-parsing cost make it wasteful compared to binary
      protocols. Stream the binary directly.
    </p>
    <p>
      <strong>Database primary keys.</strong> Sort order is funky,
      prefix indexing is weird. Use binary columns or hex encoding
      instead.
    </p>
    <p>
      <strong>Large inline images.</strong> As above — 33% size
      penalty is real. Use a regular image file or a CDN.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>1. Treating Base64 as security.</strong> &ldquo;We
      obfuscated the API key with Base64&rdquo; is a red flag. It
      takes 1 second to decode.
    </p>
    <p>
      <strong>2. URL-breaking with + and /.</strong> Passing
      standard Base64 in a URL query parameter: + becomes space,
      / can confuse path parsers. Use URL-safe Base64 or URL-encode
      the whole string.
    </p>
    <p>
      <strong>3. Assuming Base64 is the input.</strong> Double-
      encoding happens when a pipeline encodes already-encoded
      data. The result decodes to a Base64 string, not the original.
    </p>
    <p>
      <strong>4. Stripping padding then feeding to strict
      decoder.</strong> A decoder without tolerant mode needs the
      = back. Add padding: string + &ldquo;=&rdquo; × ((4 − length
      mod 4) mod 4).
    </p>
    <p>
      <strong>5. Encoding text with the wrong charset.</strong>
      Base64 encodes bytes, not characters. If the string is UTF-8,
      encode the UTF-8 byte representation, not the code points.
      Different languages handle this differently; test with
      non-ASCII data.
    </p>

    <h2>Encoding and decoding in different languages</h2>
    <p>
      <strong>JavaScript (browser):</strong> btoa() for encode,
      atob() for decode. Gotcha: these only work for Latin-1 strings
      — for UTF-8, wrap with encodeURIComponent/decodeURIComponent
      dance, or use TextEncoder + Uint8Array.
    </p>
    <p>
      <strong>Node.js:</strong> Buffer.from(s, &lsquo;utf8&rsquo;).toString(&lsquo;base64&rsquo;)
      to encode; Buffer.from(s, &lsquo;base64&rsquo;).toString(&lsquo;utf8&rsquo;)
      to decode.
    </p>
    <p>
      <strong>Python:</strong> base64.b64encode(bytes) and
      base64.b64decode(string). Use base64.urlsafe_b64encode for
      URL-safe variant.
    </p>
    <p>
      <strong>CLI (Linux / macOS):</strong> echo &ldquo;hello&rdquo;
      | base64 to encode; echo &ldquo;aGVsbG8K&rdquo; | base64 -d to
      decode.
    </p>

    <h2>JWT — the example everyone sees</h2>
    <p>
      A JWT looks like xxxxx.yyyyy.zzzzz. Each segment is URL-safe
      Base64 without padding.
    </p>
    <p>
      Decode any segment with a Base64 decoder and you&rsquo;ll see
      the JSON. The payload is readable by anyone — never put
      secrets in a JWT payload. The signature (third segment)
      authenticates the token; anyone can read the contents, but
      only the holder of the signing key can forge one.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Encode or decode Base64 with the{" "}
      <a href="/tools/base64-encoder-decoder">Base64 encoder/decoder</a>.
      Pair with the{" "}
      <a href="/tools/jwt-decoder">JWT decoder</a> when inspecting
      tokens (which are URL-safe Base64 under the hood), and the{" "}
      <a href="/tools/url-encoder-decoder">URL encoder/decoder</a> for
      the next-layer URL-percent-encoding you often need alongside
      Base64.
    </p>
  </>
);
