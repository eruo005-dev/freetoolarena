import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      URL parsing is one of those foundations that looks like a
      regex problem and is actually a specification problem. RFC
      3986 defines the generic URI grammar, the WHATWG URL Living
      Standard defines what browsers do (which is not quite
      3986), and the actual URL strings you meet in the wild
      contain backslashes, Unicode, and the occasional missing
      protocol. Writing your own parser is almost always a
      mistake. This guide covers the URL API built into every
      modern runtime, the eight components of a URL and how they
      map to the API&rsquo;s properties, IDN domains and Punycode,
      file URLs and relative URL resolution against a base, the
      difference between <code>URL</code> and
      <code> URLSearchParams</code>, and the common bugs that live
      in the seams between path, query, and fragment.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The URL API</h2>
    <p>
      Every evergreen browser, Node 10+, Deno, and Bun ship the
      WHATWG <code>URL</code> constructor. It parses a string into
      a structured object with live getters and setters.
    </p>
    <pre>{`const u = new URL('https://user:pass@api.example.com:8080/v1/items?q=k#top');

u.protocol;  // 'https:'
u.username;  // 'user'
u.password;  // 'pass'
u.host;      // 'api.example.com:8080'
u.hostname;  // 'api.example.com'
u.port;      // '8080'
u.pathname;  // '/v1/items'
u.search;    // '?q=k'
u.hash;      // '#top'
u.origin;    // 'https://api.example.com:8080'`}</pre>
    <p>
      If the input cannot be parsed &mdash; missing scheme, bad
      characters, invalid Unicode &mdash; the constructor throws a
      <code> TypeError</code>. Wrap in <code>try/catch</code> or use
      <code> URL.canParse()</code> (Node 19.9+, Chrome 120+) to
      check without throwing.
    </p>

    <h2>The eight components</h2>
    <p>
      Every URL is built from up to eight parts, separated by fixed
      delimiters. In the form
      <code> scheme://userinfo@host:port/path?query#fragment</code>:
    </p>
    <p>
      <strong>protocol / scheme</strong> &mdash; ends with a colon.
      The only part before <code>//</code>. Case-insensitive;
      lower-cased by the parser.
    </p>
    <p>
      <strong>userinfo</strong> &mdash; <code>user:pass</code>
      {" "}before <code>@</code>. Still valid syntactically but
      browsers have shown a security warning on navigation since
      2017 and Chrome blocks credentials in navigations entirely.
    </p>
    <p>
      <strong>host</strong> &mdash; domain name or IP. Case-insensitive;
      lower-cased.
    </p>
    <p>
      <strong>port</strong> &mdash; 1-65535. The <code>port</code>
      {" "}property is <code>&quot;&quot;</code> when the URL uses
      the default port for its scheme (443 for https, 80 for http).
    </p>
    <p>
      <strong>path</strong> &mdash; everything from the first
      <code> /</code> after the host up to <code>?</code> or
      <code> #</code>. The root is <code>&quot;/&quot;</code>, never
      the empty string.
    </p>
    <p>
      <strong>query</strong> &mdash; starts with <code>?</code>.
      Included in <code>search</code>; decomposed into
      <code> searchParams</code>.
    </p>
    <p>
      <strong>fragment</strong> &mdash; starts with <code>#</code>.
      Client-side only; never sent to the server.
    </p>

    <h2>IDN domains and Punycode</h2>
    <p>
      Internationalized domain names (IDNs) like
      <code> m&uuml;nchen.de</code> or
      <code> example.&#26085;&#26412;</code> are stored in DNS as
      ASCII using Punycode: <code>xn--mnchen-3ya.de</code>,
      <code> example.xn--wgv71a</code>. The URL constructor
      converts for you.
    </p>
    <pre>{`const u = new URL('https://m\u00fcnchen.de/info');
u.hostname;  // 'xn--mnchen-3ya.de'
u.href;      // 'https://xn--mnchen-3ya.de/info'`}</pre>
    <p>
      When serving user-visible content, convert back using a
      Punycode library or <code>new Intl.DisplayNames</code>. For
      network calls, use the ASCII form &mdash; every DNS resolver
      speaks it natively.
    </p>
    <p>
      Mixed-script IDN domains are the vector for homograph attacks:
      <code> xn--pple-43d.com</code> renders as
      <code> &#1072;pple.com</code> (Cyrillic a). Modern browsers
      show the Punycode form when scripts mix.
    </p>

    <h2>File URLs</h2>
    <p>
      <code>file:</code> URLs reference local filesystem paths.
      They look simple but pack surprises.
    </p>
    <pre>{`new URL('file:///Users/jay/notes.txt').pathname
// '/Users/jay/notes.txt'

new URL('file:///C:/Users/jay/notes.txt').pathname
// '/C:/Users/jay/notes.txt'   -- note the leading slash

new URL('file://server/share/file.txt').host
// 'server'`}</pre>
    <p>
      Three slashes (<code>file:///</code>) means localhost; two
      (<code>file://</code>) means the next segment is a host (UNC
      share on Windows). Convert
      <code> pathname</code> back to an OS path with
      <code> url.fileURLToPath(u)</code> in Node to handle Windows
      drive letters correctly.
    </p>

    <h2>Relative URLs and base resolution</h2>
    <p>
      The two-argument form resolves a relative URL against a base.
    </p>
    <pre>{`new URL('/help', 'https://example.com/blog/').href;
// 'https://example.com/help'

new URL('help', 'https://example.com/blog/').href;
// 'https://example.com/blog/help'

new URL('../site/', 'https://example.com/a/b/c').href;
// 'https://example.com/a/site/'

new URL('//cdn.example.com/js', 'https://example.com/').href;
// 'https://cdn.example.com/js'`}</pre>
    <p>
      The relative-resolution rules come from RFC 3986 section 5.
      Leading <code>/</code> resets path to root; no slash appends
      to the current directory; <code>..</code> walks up;
      <code> //</code> changes the host but keeps the scheme.
    </p>

    <h2>URL vs URLSearchParams</h2>
    <p>
      <code>URL</code> parses the whole thing.
      <code> URLSearchParams</code> parses just the query string.
      On a <code>URL</code> instance, <code>url.searchParams</code>
      {" "}gives you a live <code>URLSearchParams</code> &mdash;
      changes to it update <code>url.search</code> automatically.
    </p>
    <pre>{`const u = new URL('https://example.com/s?q=old');
u.searchParams.set('q', 'new');
u.searchParams.append('page', '2');
u.href;  // 'https://example.com/s?q=new&page=2'`}</pre>
    <p>
      Building URLs this way avoids every encoding mistake in the
      book. Manual string concatenation is where bugs live.
    </p>

    <h2>Normalization</h2>
    <p>
      The URL parser normalizes while it parses:
    </p>
    <p>
      Lowercases scheme and host.
      Resolves <code>..</code> and <code>.</code> segments in paths.
      Strips default ports.
      Decodes unreserved percent-encoded characters
      (<code>%41</code> &rarr; <code>A</code>).
      Converts backslashes to forward slashes in the path (special
      WHATWG behavior for HTTP URLs).
    </p>
    <p>
      Two input strings that normalize to the same
      <code> href</code> are semantically equivalent, which is what
      you compare on for canonicalization.
    </p>

    <h2>Data URLs and other schemes</h2>
    <p>
      Beyond <code>http:</code>, <code>https:</code>, and
      <code> file:</code>, the parser handles
      <code> data:</code>, <code>blob:</code>,
      <code> javascript:</code>,
      <code> mailto:</code>, and any scheme you invent.
      <strong> Non-special schemes</strong> have subtly different
      parsing &mdash; the host component is absent, and
      <code> pathname</code> gets the entire post-scheme content.
    </p>
    <pre>{`const d = new URL('data:text/plain;base64,SGVsbG8=');
d.pathname;  // 'text/plain;base64,SGVsbG8='
d.host;      // ''`}</pre>

    <h2>Common mistakes</h2>
    <p>
      <strong>Parsing with regex.</strong> &ldquo;Just grab
      everything after <code>://</code>&rdquo; works until you meet
      a URL with userinfo, an IPv6 host in brackets, or an IDN. Use
      the URL constructor.
    </p>
    <p>
      <strong>Assuming <code>host</code> equals <code>hostname</code>.</strong>
      {" "}<code>host</code> includes the port when present.
      <code> hostname</code> never does. The bug where a URL with
      explicit port <code>:443</code> does not match an allow-list
      usually traces back to this.
    </p>
    <p>
      <strong>Treating <code>search</code> and <code>searchParams</code> independently.</strong>
      {" "}Setting <code>u.search = &quot;?q=new&quot;</code>
      rebuilds the params. Mutating
      <code> u.searchParams</code> rewrites the search. Do not
      touch both in the same operation.
    </p>
    <p>
      <strong>Forgetting the trailing slash on base URLs.</strong>
      {" "}<code>new URL(&apos;help&apos;, &apos;https://x.com/blog&apos;)</code>
      resolves to <code>https://x.com/help</code>, not
      <code> /blog/help</code>, because <code>/blog</code> has no
      trailing slash &mdash; it is a file, not a directory.
    </p>
    <p>
      <strong>Not handling the constructor throwing.</strong> User
      input into URL parsers is a constant source of exceptions. Use
      <code> URL.canParse()</code> or wrap in try/catch.
    </p>
    <p>
      <strong>Trusting URLs from untrusted input.</strong> A valid
      URL object does not mean a safe destination. Check
      <code> protocol</code> (no <code>javascript:</code>!) and
      <code> origin</code> against your allow-list before using the
      URL in <code>window.location</code> or an
      <code> &lt;a href&gt;</code>.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Break any URL into its components with the{" "}
      <a href="/tools/url-parser">URL parser</a>. Pair with the{" "}
      <a href="/tools/query-string-parser">query string parser</a>
      {" "}when the query is the complicated part, and the{" "}
      <a href="/tools/url-encoder-decoder">URL encoder/decoder</a>
      {" "}to check how a specific string encodes before embedding it
      in a URL component.
    </p>
  </>
);
