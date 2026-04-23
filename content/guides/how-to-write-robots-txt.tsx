import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A robots.txt file is a 1994-vintage plain-text protocol that
      still controls whether Googlebot, Bingbot, and a zoo of other
      crawlers touch your site. It lives at exactly one path &mdash;
      <code> /robots.txt</code> at your root domain &mdash; and a single
      typo can either leak your staging environment into search
      results or de-index your entire production site. The syntax
      looks trivial, but the rules around precedence, wildcards, and
      the difference between crawling and indexing trip up even
      experienced SEOs. This guide covers the full directive set
      (User-agent, Disallow, Allow, Sitemap, Crawl-delay), wildcard
      and anchor matching, why <code>Noindex</code> was moved out of
      robots.txt in 2019, and the common patterns that keep staging
      environments private without breaking production.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What robots.txt actually controls</h2>
    <p>
      Robots.txt tells well-behaved crawlers which URLs they may
      request. It does not enforce anything &mdash; malicious scrapers
      ignore it &mdash; and it does not directly stop a page from
      appearing in search results. A URL blocked in robots.txt can
      still be indexed if Google discovers it via external links; the
      search result simply has no snippet because the crawler never
      read the page body.
    </p>
    <p>
      If you need a page to stay out of the index, use an HTTP
      <code> X-Robots-Tag: noindex</code> header or a
      <code> &lt;meta name=&quot;robots&quot; content=&quot;noindex&quot;&gt;</code>
      tag &mdash; and crucially, leave the URL crawlable so Google can
      see the directive.
    </p>

    <h2>File location and format</h2>
    <p>
      The file must be at <code>https://example.com/robots.txt</code>.
      Subdomains need their own &mdash;
      <code> blog.example.com/robots.txt</code> is separate from
      <code> example.com/robots.txt</code>. The content type should be
      <code> text/plain</code> and encoding UTF-8. A BOM at the start
      is tolerated but avoid it.
    </p>
    <p>
      Maximum file size honored by Google is 500 KiB. Anything past
      that is truncated, and the truncation can land mid-rule. Keep
      real-world files well under 50 KiB.
    </p>

    <h2>User-agent: targeting specific crawlers</h2>
    <p>
      Every rule block starts with one or more <code>User-agent</code>
      {" "}lines. The value is a substring match against the crawler&rsquo;s
      product token, case-insensitive.
    </p>
    <pre>{`User-agent: Googlebot
Disallow: /admin/

User-agent: Bingbot
Disallow: /admin/
Crawl-delay: 10

User-agent: *
Disallow: /private/`}</pre>
    <p>
      The <code>*</code> wildcard matches every crawler that has no
      more specific block. A crawler picks the <strong>single most
      specific matching group</strong> and obeys only that one &mdash;
      rules do not merge across groups. If Googlebot matches both its
      own block and the <code>*</code> block, it follows only the
      Googlebot block.
    </p>

    <h2>Disallow and Allow</h2>
    <p>
      <code>Disallow</code> gives a path prefix the crawler must not
      request. <code>Allow</code> overrides a broader Disallow for a
      narrower path. Both are prefix matches starting from the root of
      the domain.
    </p>
    <pre>{`User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php`}</pre>
    <p>
      When rules conflict, Google uses the <strong>longest-matching
      path rule</strong>. Above, a request to
      <code> /wp-admin/admin-ajax.php</code> matches Allow (28
      characters) more specifically than Disallow (10 characters), so
      it is allowed.
    </p>
    <p>
      A bare <code>Disallow:</code> with no path means &ldquo;nothing
      is disallowed&rdquo; &mdash; it is the way to open a section
      back up. <code>Disallow: /</code> blocks the entire site.
    </p>

    <h2>Wildcards and end-of-URL anchor</h2>
    <p>
      Google, Bing, and most modern crawlers support two pattern
      characters beyond plain prefix matching:
    </p>
    <p>
      <code>*</code> matches any sequence of characters.
      <code> $</code> anchors the pattern to the end of the URL.
    </p>
    <pre>{`User-agent: *
Disallow: /*?sessionid=
Disallow: /*.pdf$
Allow:    /public/*.pdf$`}</pre>
    <p>
      The first line blocks any URL containing
      <code> ?sessionid=</code>. The second blocks URLs ending in
      <code> .pdf</code> &mdash; without <code>$</code>,
      <code> /file.pdf.html</code> would also match. The Allow line
      then re-opens PDFs under <code>/public/</code>.
    </p>

    <h2>Sitemap directive</h2>
    <p>
      Unlike the rule directives, <code>Sitemap</code> lines are
      global &mdash; they are not tied to any User-agent group and can
      appear anywhere in the file. Use absolute URLs.
    </p>
    <pre>{`Sitemap: https://example.com/sitemap.xml
Sitemap: https://example.com/sitemap-news.xml`}</pre>
    <p>
      You can list multiple sitemaps or point to a sitemap index. This
      is the only directive that actively tells crawlers where to find
      content &mdash; the rest only tell them where not to go.
    </p>

    <h2>Crawl-delay &mdash; limited support</h2>
    <p>
      <code>Crawl-delay: N</code> asks the crawler to wait N seconds
      between requests. Bing and Yandex honor it; Google ignores it
      entirely (use Search Console crawl rate settings instead).
      Baidu interprets it differently. In practice, scope it to the
      bots that respect it.
    </p>

    <h2>Noindex is no longer supported here</h2>
    <p>
      Google stopped obeying <code>Noindex:</code> directives in
      robots.txt on September 1, 2019. If you still have
      <code> Noindex: /thanks</code> lines, move that control to a
      <code> &lt;meta name=&quot;robots&quot; content=&quot;noindex&quot;&gt;</code>
      {" "}tag or an <code>X-Robots-Tag</code> header and make sure the
      URL is crawlable. A page that is both noindex and
      robots-disallowed is the worst of both worlds: Google cannot see
      the noindex tag, so it may leave the URL in the index as a
      snippetless link.
    </p>

    <h2>Patterns for staging and preview</h2>
    <p>
      For staging subdomains (<code>staging.example.com</code>), serve:
    </p>
    <pre>{`User-agent: *
Disallow: /`}</pre>
    <p>
      Combine with HTTP Basic Auth or IP allowlisting &mdash;
      robots.txt alone is a courtesy, not a gate. If a competitor or
      scraper finds the staging URL, they will ignore your robots.txt
      and crawl it anyway.
    </p>
    <p>
      For a production site with a private admin area and a search
      results page you do not want indexed:
    </p>
    <pre>{`User-agent: *
Disallow: /admin/
Disallow: /cart
Disallow: /search
Disallow: /*?utm_
Allow: /

Sitemap: https://example.com/sitemap.xml`}</pre>
    <p>
      The <code>/*?utm_</code> line blocks the duplicate-content URLs
      that UTM-tagged inbound links create.
    </p>

    <h2>Testing your file</h2>
    <p>
      Google Search Console has a robots.txt report under Settings
      that shows the last-fetched copy, any parse errors, and the
      timestamp. For live testing against specific URLs, use the URL
      Inspection tool &mdash; it reports whether a given URL is
      blocked and which rule blocked it.
    </p>
    <p>
      Before deploying, run the full file through a syntax checker
      that understands Google&rsquo;s precedence rules. A misplaced
      Allow/Disallow can look harmless but silently block a whole
      section.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Blocking CSS and JS.</strong> Google needs to render
      pages to evaluate them. Disallowing
      <code> /wp-content/</code> or <code>/static/</code> can hide
      the styles and scripts Googlebot uses for layout, which hurts
      rankings. Leave asset directories crawlable.
    </p>
    <p>
      <strong>Using robots.txt to hide sensitive URLs.</strong> The
      file is public. Listing <code>/admin-secret-backup/</code> in a
      Disallow line is like putting a giant arrow on it. Use auth, not
      robots.txt, for security.
    </p>
    <p>
      <strong>Expecting Disallow to remove pages from the index.</strong>
      Disallow stops crawling, not indexing. Already-indexed URLs can
      stay in search results for months as snippetless links. To
      remove, use noindex (and keep crawlable) until Google processes
      it, then block.
    </p>
    <p>
      <strong>Case-sensitive path mismatch.</strong> Paths are
      case-sensitive. <code>Disallow: /Admin/</code> does not block
      <code> /admin/</code>. Match your actual URL casing.
    </p>
    <p>
      <strong>Forgetting subdomain scope.</strong> Uploading
      <code> robots.txt</code> to the root does nothing for
      <code> cdn.example.com</code>. Each subdomain that serves HTTP
      needs its own file.
    </p>
    <p>
      <strong>Trailing-slash surprises.</strong>
      <code> Disallow: /foo</code> blocks
      <code> /foo</code>, <code>/foo/</code>,
      <code> /foobar</code>, and <code>/foo.html</code>. If you meant
      only the folder, write <code>Disallow: /foo/</code>.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Draft and validate a production-ready file with the{" "}
      <a href="/tools/robots-txt-generator">robots.txt generator</a>.
      Pair with the{" "}
      <a href="/tools/sitemap-url-generator">sitemap URL generator</a>
      {" "}so the <code>Sitemap:</code> line you add actually points at
      a well-formed file, and the{" "}
      <a href="/tools/url-parser">URL parser</a> to verify the exact
      path shape your rules will match against.
    </p>
  </>
);
