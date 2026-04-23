import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      URL encoding — percent-encoding — is one of those
      fundamentals that quietly breaks things when it&rsquo;s wrong.
      A space that should be %20 ends up as +; an ampersand in a
      query value splits the URL; a Unicode character comes through
      as mojibake. This guide covers what the encoding actually does,
      which characters need it, the critical difference between
      <code> encodeURI</code> and <code>encodeURIComponent</code>,
      path vs query encoding, double-encoding traps, form encoding,
      and the Unicode handling that catches people who only tested
      with ASCII.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What URL encoding is</h2>
    <p>
      URLs are limited to a specific set of ASCII characters by RFC
      3986. Anything outside that set — spaces, most punctuation,
      non-ASCII — must be represented as <code>%XX</code> where XX
      is the byte&rsquo;s hex value.
    </p>
    <p>
      Example: space (0x20) → %20. At sign (0x40) → %40. Non-ASCII
      characters are encoded as their UTF-8 byte sequence, one %XX
      per byte: é (U+00E9) → %C3%A9 (two bytes).
    </p>

    <h2>Reserved vs unreserved characters</h2>
    <p>
      RFC 3986 divides URL characters into categories:
    </p>
    <p>
      <strong>Unreserved:</strong> A-Z, a-z, 0-9, and
      <code> - _ . ~</code>. Never need encoding.
    </p>
    <p>
      <strong>Reserved (gen-delims):</strong> <code>: / ? # [ ] @</code>.
      Have structural meaning in URLs. Encode if they&rsquo;re part of
      data, not structure.
    </p>
    <p>
      <strong>Reserved (sub-delims):</strong> <code>! $ &amp; &apos;
      ( ) * + , ; =</code>. Encode when used as data within query
      values — they have meaning in forms and query syntax.
    </p>
    <p>
      <strong>Everything else:</strong> spaces, Unicode, unusual
      punctuation — always encode.
    </p>

    <h2>encodeURI vs encodeURIComponent — the JavaScript fork</h2>
    <p>
      JavaScript&rsquo;s two URL encoders have different purposes and
      mixing them up is the #1 URL bug.
    </p>
    <p>
      <strong>encodeURI:</strong> encodes a full URL. Preserves
      reserved structural characters (<code>: / ? # &amp; =</code>).
      Use when you have a complete URL that needs to be made safe
      for transmission.
    </p>
    <p>
      <code>encodeURI(&quot;https://x.com/a b?q=1&amp;r=2&quot;)</code>
      {" "}→ <code>https://x.com/a%20b?q=1&amp;r=2</code>. Notice
      the space got encoded but ? and &amp; did not.
    </p>
    <p>
      <strong>encodeURIComponent:</strong> encodes a value that will
      be placed inside a URL component (one segment of a path, one
      value in a query). Encodes reserved characters. Use when
      building URLs from parts.
    </p>
    <p>
      <code>encodeURIComponent(&quot;a&amp;b=c&quot;)</code> →
      <code> a%26b%3Dc</code>. Encodes both &amp; and = so they can
      safely appear as a value.
    </p>
    <p>
      <strong>Rule:</strong> use encodeURIComponent on each part
      when assembling, not encodeURI on the whole.
    </p>

    <h2>The URLSearchParams approach — safer, modern</h2>
    <p>
      Skip manual encoding entirely for query strings:
    </p>
    <p>
      <code>const params = new URLSearchParams(); params.append(
      &quot;q&quot;, &quot;hello world&quot;); params.append(
      &quot;tag&quot;, &quot;a&amp;b&quot;); url.search =
      params.toString();</code>
    </p>
    <p>
      Produces <code>q=hello+world&amp;tag=a%26b</code> with correct
      encoding and no off-by-one errors. Use this pattern whenever
      possible.
    </p>
    <p>
      Note: URLSearchParams uses <code>+</code> for spaces (legacy
      form encoding), while encodeURIComponent uses <code>%20</code>.
      Both decode correctly on the server; don&rsquo;t mix them in
      the same URL.
    </p>

    <h2>Path encoding vs query encoding</h2>
    <p>
      Subtle differences between segments of a URL.
    </p>
    <p>
      <strong>Path segments:</strong> encode <code>/</code> if it
      appears in data (otherwise it creates a new path segment).
      Space as %20.
    </p>
    <p>
      <strong>Query strings:</strong> <code>+</code> means space in
      traditional form encoding (application/x-www-form-urlencoded).
      In modern URL parsers, %20 works too and is unambiguous.
      <code> &amp;</code> and <code>=</code> have structural meaning
      and must be encoded in values.
    </p>
    <p>
      <strong>Fragments (#):</strong> similar rules to query; encode
      characters that break parsing.
    </p>

    <h2>Double-encoding — the classic trap</h2>
    <p>
      Encoding an already-encoded URL turns %20 into %2520 (because
      % becomes %25). The result looks URL-valid but the destination
      server gets the literal string &ldquo;%20&rdquo; instead of a
      space.
    </p>
    <p>
      Symptoms: product pages showing &ldquo;Item %26 Part&rdquo; in
      the title, search queries returning no results for simple
      terms, 404s on URLs with special characters.
    </p>
    <p>
      <strong>Fix:</strong> track whether a string is encoded or
      decoded as it flows through your code. Don&rsquo;t encode on
      the way in and again on the way out. Libraries that build URLs
      should always take decoded strings and encode once at the edge.
    </p>

    <h2>UTF-8 and non-ASCII characters</h2>
    <p>
      Modern URL encoding is defined on UTF-8 bytes, not Unicode
      code points directly. A character like é is first encoded as
      UTF-8 (two bytes: 0xC3 0xA9), then each byte becomes %XX
      (%C3%A9).
    </p>
    <p>
      <code>encodeURIComponent(&quot;café&quot;)</code> →
      <code> caf%C3%A9</code>.
    </p>
    <p>
      <strong>IDN domains</strong> (example: münchen.de): the
      domain portion uses Punycode (<code>xn--mnchen-3ya.de</code>),
      not percent-encoding. Percent-encoding is only for the
      path/query/fragment. Browsers handle the conversion; servers
      usually see Punycode.
    </p>
    <p>
      <strong>Old systems:</strong> some servers expect Windows-1252
      or ISO-8859-1 encoding of non-ASCII (so é would be %E9, not
      %C3%A9). Almost always wrong in 2026 but you&rsquo;ll still
      meet it when integrating with legacy systems. Always check
      what the receiver expects.
    </p>

    <h2>Form encoding — related but distinct</h2>
    <p>
      HTML forms submitted with <code>application/x-www-form-
      urlencoded</code> use a variant of URL encoding:
    </p>
    <p>
      Spaces become <code>+</code> (not %20).
    </p>
    <p>
      Line breaks in textareas become <code>%0D%0A</code> (CRLF).
    </p>
    <p>
      Everything else follows standard percent-encoding.
    </p>
    <p>
      <strong>multipart/form-data</strong> is different — used for
      file uploads, it wraps values in boundary-separated parts and
      doesn&rsquo;t need URL encoding at all.
    </p>

    <h2>Server-side decoding</h2>
    <p>
      Most web frameworks decode automatically — <code>req.query.q</code>
      in Express or <code>@QueryParam</code> in Java gives you the
      decoded string. You rarely call decoder functions yourself.
    </p>
    <p>
      <strong>Watch:</strong> if you need to re-emit a URL (in a
      redirect, or storing it in a database), re-encode it before
      output. Never store an encoded URL string then emit it as-is
      — you&rsquo;ll hit double-encoding when downstream code
      assumes decoded input.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using encodeURI when you needed
      encodeURIComponent.</strong> The most common bug: putting
      user input in a query value without encoding the &amp; or =.
    </p>
    <p>
      <strong>Encoding data before it becomes data.</strong> Encoding
      a database value when inserting it into storage, then again
      when emitting it in a URL — double-encoding.
    </p>
    <p>
      <strong>Concatenating URL pieces as strings.</strong>
      <code> const url = base + &quot;?q=&quot; + query;</code>. Use
      URL/URLSearchParams objects — they encode properly.
    </p>
    <p>
      <strong>Assuming UTF-8 everywhere.</strong> Very old endpoints
      may demand a different byte encoding. Read the API spec.
    </p>
    <p>
      <strong>Encoding slashes in paths without meaning to.</strong>
      If you have <code>a/b/c</code> and call encodeURIComponent, you
      get <code>a%2Fb%2Fc</code> — one path segment, not three.
      Split first, encode per segment, rejoin with /.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Encode and decode URLs instantly with the{" "}
      <a href="/tools/url-encoder-decoder">URL encoder/decoder</a>.
      Pair with the{" "}
      <a href="/tools/base64-encoder-decoder">Base64 encoder/decoder</a>
      {" "}when you need to embed binary payloads inside URL-safe
      text, and the{" "}
      <a href="/tools/slug-generator">slug generator</a> when turning
      titles into URL path segments.
    </p>
  </>
);
