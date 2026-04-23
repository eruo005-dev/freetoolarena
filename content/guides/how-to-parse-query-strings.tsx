import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Query strings are the piece of a URL after the
      <code> ?</code> &mdash; a
      <code> &amp;</code>-separated list of key-value pairs that
      carries search terms, filters, pagination, campaign tags, and
      session hints. The syntax looks like a one-week project
      someone never finished: no standard for repeated keys, no
      official way to express arrays or nested objects, and three
      subtly different encoding rules between URLs, HTML forms, and
      application/x-www-form-urlencoded. This guide covers the
      modern <code>URLSearchParams</code> API, the encoding rules
      that actually apply, how repeated keys and bracket notation
      handle arrays, the PHP-style nested-key hack, URL length
      limits across servers and CDNs, and how Unicode and emoji flow
      through the whole pipeline.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Anatomy of a query string</h2>
    <p>
      In the URL
      <code> https://example.com/search?q=hello&amp;page=2</code>, the
      query string is <code>q=hello&amp;page=2</code> &mdash;
      everything after <code>?</code> and before <code>#</code>.
      Pairs are joined with <code>&amp;</code>; keys and values are
      separated by <code>=</code>.
    </p>
    <p>
      The spec that defines how URLs work is RFC 3986. How query
      strings are <strong>used</strong> for data &mdash; repeated
      keys, brackets, booleans &mdash; is convention, not
      standardization.
    </p>

    <h2>URLSearchParams &mdash; the modern API</h2>
    <p>
      Every evergreen browser and Node 10+ has
      <code> URLSearchParams</code> for parsing and building.
    </p>
    <pre>{`const params = new URLSearchParams('q=hello&page=2&tag=red&tag=blue');

params.get('q');        // 'hello'
params.get('tag');      // 'red'  (first match)
params.getAll('tag');   // ['red', 'blue']
params.has('page');     // true
params.keys();          // iterator
[...params.entries()];  // [['q','hello'],['page','2'],['tag','red'],['tag','blue']]`}</pre>
    <p>
      The constructor accepts a string, an object, or an array of
      pairs. It automatically URL-decodes values, so
      <code> ?q=hello%20world</code> gives you the string
      <code> &ldquo;hello world&rdquo;</code>.
    </p>

    <h2>Encoding rules in query strings</h2>
    <p>
      Three character classes need encoding in query values:
    </p>
    <p>
      <strong>Reserved sub-delims</strong>:
      <code> ! $ &amp; &apos; ( ) * + , ; =</code>. Most importantly,
      <code> &amp;</code> and <code>=</code> are the structural
      separators &mdash; a literal <code>&amp;</code> in a value
      must be <code>%26</code>, a literal <code>=</code> must be
      <code> %3D</code>.
    </p>
    <p>
      <strong>Space</strong>: encoded as <code>+</code> in the
      <code> application/x-www-form-urlencoded</code> variant (used
      by HTML form submissions and URLSearchParams output), or as
      <code> %20</code> in strict RFC 3986 encoding. Both decode
      back to space in every major parser, but mixing them in one
      URL looks sloppy.
    </p>
    <p>
      <strong>Non-ASCII</strong>: encoded as UTF-8 bytes, each byte
      as <code>%XX</code>. Emoji &ldquo;&#128512;&rdquo; (U+1F600) is
      four UTF-8 bytes (<code>F0 9F 98 80</code>) and encodes as
      <code> %F0%9F%98%80</code>.
    </p>

    <h2>Repeated keys &mdash; the array convention</h2>
    <p>
      The spec says nothing about repeating a key. In practice,
      three conventions are common:
    </p>
    <p>
      <strong>Plain repetition</strong>:
      <code> ?tag=red&amp;tag=blue&amp;tag=green</code>. Read with
      <code> getAll(&apos;tag&apos;)</code>. This is the approach
      <code> URLSearchParams</code> expects and most modern servers
      handle natively.
    </p>
    <p>
      <strong>Bracket notation</strong> (PHP, Rails):
      <code> ?tag[]=red&amp;tag[]=blue</code>. Bracket characters
      themselves need encoding: <code>tag%5B%5D=red</code>. PHP
      parses this into the array
      <code> $_GET[&apos;tag&apos;]</code>. Not understood by
      <code> URLSearchParams</code> &mdash; it returns the raw key
      <code> &ldquo;tag[]&rdquo;</code>.
    </p>
    <p>
      <strong>Comma-separated</strong>:
      <code> ?tag=red,blue,green</code>. Simplest for logs, needs
      manual splitting, breaks if a value contains a comma.
    </p>
    <p>
      Pick one convention per API and document it. Mixing
      <code> tag</code> and <code>tag[]</code> is the kind of bug
      that gets found during a midnight deploy.
    </p>

    <h2>Nested keys &mdash; PHP-style</h2>
    <p>
      Bracket notation also expresses nested objects:
    </p>
    <pre>{`?user[name]=jay&user[role]=admin&user[prefs][theme]=dark

// Decodes (in PHP / qs library) to:
// { user: { name: 'jay', role: 'admin', prefs: { theme: 'dark' } } }`}</pre>
    <p>
      The <code>qs</code> npm library is the most common
      implementation outside PHP. It supports nesting, arrays, and
      various array-format options. Express uses it for
      <code> req.query</code> by default.
    </p>
    <p>
      <code>URLSearchParams</code> does not understand nesting at
      all; it sees the whole bracket-y string as a flat key. If you
      are on a modern API, strongly consider pushing complex
      structures to the request body as JSON instead of serializing
      them into the query string.
    </p>

    <h2>URL length limits</h2>
    <p>
      There is no official URL length limit in the HTTP spec, but
      practical ceilings matter.
    </p>
    <p>
      <strong>Browsers</strong>: Chrome, Firefox, Safari all handle
      URLs up to around 32,000 characters reliably; older IE capped
      at 2,083.
    </p>
    <p>
      <strong>Web servers</strong>: Apache 8 KiB by default
      (<code>LimitRequestLine</code>), Nginx 8 KiB
      (<code>large_client_header_buffers</code>), IIS 16 KiB.
    </p>
    <p>
      <strong>CDNs and load balancers</strong>: Cloudflare 16 KiB,
      AWS ALB 16 KiB headers (including request line).
    </p>
    <p>
      Keep query strings under 2 KiB to be safe across all
      infrastructure. If you are anywhere close, move the data to
      a POST body.
    </p>

    <h2>Boolean conventions</h2>
    <p>
      Booleans in URLs are entirely convention. Pick a pattern:
    </p>
    <p>
      <strong>Presence only</strong>:
      <code> ?includeArchived</code> means true, absence means
      false. Compact, but easy to confuse with a key that has an
      empty value.
    </p>
    <p>
      <strong>Explicit value</strong>:
      <code> ?includeArchived=true</code>. Requires server to
      coerce the string &ldquo;true&rdquo; &mdash; and remember
      that &ldquo;false&rdquo;, &ldquo;no&rdquo;, and
      &ldquo;0&rdquo; are all truthy strings in most languages.
    </p>
    <p>
      <strong>0/1</strong>:
      <code> ?archived=1</code>. Unambiguous, concise, common in
      older APIs.
    </p>

    <h2>Building query strings safely</h2>
    <p>
      Never concatenate strings with <code>&amp;</code> and
      <code> =</code>. Always use <code>URLSearchParams</code> or a
      URL-building library.
    </p>
    <pre>{`const url = new URL('https://example.com/search');
url.searchParams.set('q', 'hello & goodbye');
url.searchParams.append('tag', 'red');
url.searchParams.append('tag', 'blue');
console.log(url.toString());
// https://example.com/search?q=hello+%26+goodbye&tag=red&tag=blue`}</pre>
    <p>
      Notice the <code>&amp;</code> inside the value was correctly
      encoded to <code>%26</code>, and the space became
      <code> +</code>. Trying to do this by hand is where bugs live.
    </p>

    <h2>Unicode, normalization, and collation</h2>
    <p>
      Two equal-looking strings can have different byte sequences.
      &ldquo;caf&eacute;&rdquo; can be one composed character
      (U+00E9) or &ldquo;e&rdquo; + combining acute (U+0065 U+0301).
      Both encode to valid but different query strings. Normalize
      input with <code>string.normalize(&apos;NFC&apos;)</code>
      before comparing or using as a database key.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Splitting by <code>&amp;</code> and <code>=</code> manually.</strong>
      {" "}It works until a value contains the literal character.
      Use <code>URLSearchParams</code>.
    </p>
    <p>
      <strong>Double encoding.</strong> Running
      <code> encodeURIComponent</code> over a string that is already
      encoded turns <code>%20</code> into <code>%2520</code>. Track
      encoded-vs-decoded state carefully through your code.
    </p>
    <p>
      <strong>Assuming key order is significant.</strong> Order is
      preserved by most parsers but not guaranteed by any spec. Do
      not rely on it for caching keys, signatures, or equality
      checks &mdash; sort keys first.
    </p>
    <p>
      <strong>Using <code>.get()</code> when there might be multiple values.</strong>
      {" "}<code>get()</code> returns only the first occurrence.
      <code> getAll()</code> returns every one. Use whichever
      matches your convention.
    </p>
    <p>
      <strong>Mixing <code>+</code> and <code>%20</code>.</strong>
      They both decode to space but look inconsistent. Pick one
      (URLSearchParams always emits <code>+</code>; strict encoders
      emit <code>%20</code>) and stick with it.
    </p>
    <p>
      <strong>Putting sensitive data in query strings.</strong>
      Query strings are logged by servers, proxies, and browser
      history. Tokens, passwords, and PII should go in headers or
      POST bodies, never in URLs.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Break any URL into its parameters with the{" "}
      <a href="/tools/query-string-parser">query string parser</a>.
      Pair with the{" "}
      <a href="/tools/url-parser">URL parser</a> for the full
      protocol/host/path breakdown around it, and the{" "}
      <a href="/tools/url-encoder-decoder">URL encoder/decoder</a>
      {" "}when a single value is misbehaving and you need to see
      exactly what got encoded.
    </p>
  </>
);
