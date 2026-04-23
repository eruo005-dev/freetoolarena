import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      HTTP status codes are the three-digit numbers every request
      comes back with. The first digit groups them into five
      classes, and once you know the class you know roughly what
      happened: 1xx still working, 2xx all good, 3xx look elsewhere,
      4xx you asked wrong, 5xx we blew up. Underneath the simple
      framing lies RFC 9110 (the current HTTP semantics spec,
      published June 2022) plus about a dozen auxiliary RFCs that
      add codes for WebDAV, rate limiting, and legal constraints.
      Picking the right code matters: it drives cache behavior,
      retries, search-engine indexing, and browser UI like the
      default error page. This guide covers all five classes with
      the codes that actually get used in production, the common
      retry and indexing implications, the difference between 301
      and 302, when 503 is correct and when it is lazy, and the
      codes people reach for that they should not.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The five classes</h2>
    <p>
      The first digit of the status code determines the class:
    </p>
    <p>
      <strong>1xx informational</strong> &mdash; request received,
      continuing to process. Rare to see in application code.
    </p>
    <p>
      <strong>2xx success</strong> &mdash; the request worked.
    </p>
    <p>
      <strong>3xx redirection</strong> &mdash; further action needed
      (usually a different URL).
    </p>
    <p>
      <strong>4xx client error</strong> &mdash; the client sent a
      bad request.
    </p>
    <p>
      <strong>5xx server error</strong> &mdash; the server failed to
      handle a valid request.
    </p>

    <h2>1xx informational</h2>
    <p>
      <strong>100 Continue</strong> &mdash; server has received the
      request headers and the client may send the body. Used with
      <code> Expect: 100-continue</code> for large uploads so the
      client can abandon early if the server is going to reject.
    </p>
    <p>
      <strong>101 Switching Protocols</strong> &mdash; sent in
      response to an <code>Upgrade</code> header, most commonly
      switching HTTP to WebSocket.
    </p>
    <p>
      <strong>103 Early Hints</strong> &mdash; lets the server hint
      at resources the client should preload while the real
      response is still being generated. Supported in Chrome 103+
      and increasingly used by CDNs.
    </p>

    <h2>2xx success</h2>
    <p>
      <strong>200 OK</strong> &mdash; the default success. The
      response body contains whatever was asked for.
    </p>
    <p>
      <strong>201 Created</strong> &mdash; a new resource was
      created. Include a <code>Location</code> header pointing at
      the new resource. REST convention for POSTs that create.
    </p>
    <p>
      <strong>202 Accepted</strong> &mdash; the request has been
      queued but not yet processed. Used for async jobs.
    </p>
    <p>
      <strong>204 No Content</strong> &mdash; success, and there is
      intentionally no body. DELETE typically returns 204.
    </p>
    <p>
      <strong>206 Partial Content</strong> &mdash; response to a
      <code> Range</code> request. Used for resumable downloads and
      video streaming.
    </p>

    <h2>3xx redirection</h2>
    <p>
      <strong>301 Moved Permanently</strong> &mdash; the resource
      has a new canonical URL and will not move back. Search engines
      transfer link equity to the new URL. Browsers cache 301s
      aggressively; a wrong 301 is painful to reverse. Use when
      you mean it forever.
    </p>
    <p>
      <strong>302 Found</strong> &mdash; temporary redirect. Browsers
      follow it but do not cache the redirect itself. Historical
      note: RFC 2616 allowed clients to change POST to GET on 302;
      RFC 9110 says they should not, but many do anyway, which is
      why 307 and 308 exist.
    </p>
    <p>
      <strong>303 See Other</strong> &mdash; explicitly changes the
      method to GET. Classic use: after a POST that creates a
      resource, respond with 303 pointing at the created
      resource&rsquo;s URL, so a browser refresh does not re-submit.
    </p>
    <p>
      <strong>304 Not Modified</strong> &mdash; response to a
      conditional GET (<code>If-Modified-Since</code> or
      <code> If-None-Match</code>) when the resource has not
      changed. No body. The browser uses its cached copy.
    </p>
    <p>
      <strong>307 Temporary Redirect</strong> &mdash; like 302 but
      the method must not change. POST stays POST.
    </p>
    <p>
      <strong>308 Permanent Redirect</strong> &mdash; like 301 but
      the method must not change. Useful for permanently redirecting
      API endpoints.
    </p>

    <h2>4xx client errors</h2>
    <p>
      <strong>400 Bad Request</strong> &mdash; the request is
      malformed (bad JSON, missing required field). Generic.
    </p>
    <p>
      <strong>401 Unauthorized</strong> &mdash; authentication is
      required and was not provided or is invalid. Misleadingly
      named &mdash; this is really &ldquo;unauthenticated.&rdquo;
      Include a <code>WWW-Authenticate</code> header.
    </p>
    <p>
      <strong>403 Forbidden</strong> &mdash; authenticated, but the
      credentials do not permit this action. Use for authorization
      failures.
    </p>
    <p>
      <strong>404 Not Found</strong> &mdash; the resource does not
      exist. Search engines will eventually deindex 404 URLs.
    </p>
    <p>
      <strong>405 Method Not Allowed</strong> &mdash; the URL exists
      but does not handle this HTTP method. Include an
      <code> Allow</code> header listing the valid methods.
    </p>
    <p>
      <strong>408 Request Timeout</strong> &mdash; the client took
      too long to send the request. Some CDNs use 408 where they
      should use 504.
    </p>
    <p>
      <strong>409 Conflict</strong> &mdash; the request would
      create a conflict (duplicate key, edit conflict in a wiki).
      Client can usually fix and retry.
    </p>
    <p>
      <strong>410 Gone</strong> &mdash; the resource used to exist
      and has been permanently removed. Stronger than 404 for SEO;
      tells Google to deindex faster.
    </p>
    <p>
      <strong>413 Payload Too Large</strong> &mdash; body exceeds
      server limits.
    </p>
    <p>
      <strong>418 I&apos;m a teapot</strong> &mdash; from RFC 2324,
      the HTCPCP April Fools&rsquo; spec. Some teams use it as a
      joke health-check response.
    </p>
    <p>
      <strong>422 Unprocessable Content</strong> &mdash; syntactically
      valid but semantically invalid (e.g., JSON parsed but fields
      failed validation). Preferred by APIs over plain 400 for
      validation errors.
    </p>
    <p>
      <strong>429 Too Many Requests</strong> &mdash; rate limit
      exceeded. Include a <code>Retry-After</code> header with
      seconds to wait.
    </p>
    <p>
      <strong>451 Unavailable For Legal Reasons</strong> &mdash;
      the resource is blocked by a court or government order. The
      number is a Fahrenheit 451 reference.
    </p>

    <h2>5xx server errors</h2>
    <p>
      <strong>500 Internal Server Error</strong> &mdash; generic
      server-side failure. Usually means an unhandled exception.
    </p>
    <p>
      <strong>501 Not Implemented</strong> &mdash; the server does
      not support the method. Different from 405 (method not allowed
      for <em>this</em> URL).
    </p>
    <p>
      <strong>502 Bad Gateway</strong> &mdash; an upstream server
      gave a bad response. Usually means the reverse proxy (Nginx,
      CDN) could not reach or parse the origin.
    </p>
    <p>
      <strong>503 Service Unavailable</strong> &mdash; the server is
      temporarily unable to handle the request. Use for planned
      maintenance or overload. Include <code>Retry-After</code>.
      Search engines treat brief 503s as transient; prolonged 503s
      start to hurt rankings.
    </p>
    <p>
      <strong>504 Gateway Timeout</strong> &mdash; upstream server
      did not respond in time.
    </p>
    <p>
      <strong>511 Network Authentication Required</strong> &mdash;
      captive portals use this to tell clients the network requires
      login.
    </p>

    <h2>Caching implications</h2>
    <p>
      Proxies and browsers cache certain codes by default even
      without explicit headers: 200, 203, 204, 206, 300, 301, 308,
      404, 405, 410, 414, 501. Everything else requires explicit
      <code> Cache-Control</code>. A 301 you serve today may be
      cached for a year &mdash; if you change your mind, the cache
      is the enemy.
    </p>

    <h2>Retry behavior</h2>
    <p>
      Well-behaved clients retry automatically on certain codes.
      <strong> 408, 425, 429, 500, 502, 503, 504</strong> are
      generally retriable with exponential backoff. <strong>4xx
      other than those</strong> are not &mdash; retrying a 400 or
      404 gives you the same result.
    </p>
    <p>
      Idempotent methods (GET, PUT, DELETE, HEAD, OPTIONS) are safe
      to retry. POST generally is not &mdash; retrying after a
      network failure might create the resource twice. Use an
      idempotency key header on write endpoints for safe retries.
    </p>

    <h2>Status codes and search engines</h2>
    <p>
      Googlebot and other crawlers key heavily off status codes.
    </p>
    <p>
      <strong>200</strong>: crawl and index.
    </p>
    <p>
      <strong>301, 308</strong>: transfer signals to the new URL,
      update the index.
    </p>
    <p>
      <strong>302, 307</strong>: follow, but do not transfer
      signals. Prolonged 302s eventually get treated as 301.
    </p>
    <p>
      <strong>404, 410</strong>: drop from index. 410 is faster.
    </p>
    <p>
      <strong>503</strong>: come back later. A site returning 503s
      for a week starts losing rankings.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Returning 200 with an error body.</strong> &ldquo;HTTP
      200, JSON says success: false.&rdquo; Breaks every retry
      policy, every monitoring alert, every CDN stat. Use the right
      status code.
    </p>
    <p>
      <strong>Using 401 for authorization failures.</strong> 401
      means &ldquo;authenticate, please;&rdquo; 403 means
      &ldquo;authenticated but forbidden.&rdquo; Mixing them up
      breaks OAuth flows.
    </p>
    <p>
      <strong>301 when you mean 302.</strong> A permanent redirect
      caches in browsers and search engines long after you change
      your mind. Use 302 for anything you might reverse.
    </p>
    <p>
      <strong>500 for every error.</strong> A 500 is &ldquo;we
      crashed.&rdquo; Validation failures are 400 or 422. Not-found
      is 404. Use the specific code so monitoring can triage.
    </p>
    <p>
      <strong>Missing <code>Retry-After</code> on 429 and 503.</strong>
      {" "}Clients have no idea how long to wait. Libraries often
      default to aggressive retries that amplify the problem.
    </p>
    <p>
      <strong>Using 404 for access-control hiding.</strong> Some
      sites return 404 when a resource exists but the user cannot
      see it (to avoid leaking existence). Valid privacy technique
      but breaks clients expecting 403.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Look up any status code with expected behavior and caching
      rules via the{" "}
      <a href="/tools/http-status-code-lookup">HTTP status code lookup</a>.
      Pair with the{" "}
      <a href="/tools/mime-type-lookup">MIME type lookup</a> when
      both Content-Type and status are in play, and the{" "}
      <a href="/tools/user-agent-parser">user agent parser</a> for
      debugging bot-specific status behavior.
    </p>
  </>
);
