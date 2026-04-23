import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      The User-Agent header is a 30-year-old game of telephone. What
      started as a short self-identification from Mosaic
      (<code>NCSA_Mosaic/2.0</code>) turned into today&rsquo;s
      unreadable Mozilla-compatible mess because every browser wanted
      to be served content meant for the browser that came before
      it. Parsing UA strings reliably is still useful for logging
      and feature compatibility, but the landscape has shifted under
      it: Chrome and Edge have frozen most of the UA string behind
      User-Agent Client Hints, Safari sends a deliberately reduced
      UA on iOS, and privacy browsers lie on purpose. This guide
      covers the anatomy of a UA string, why almost every browser
      pretends to be Mozilla, how to extract browser/OS/device
      cleanly, how spoofed and randomized UAs change the game, and
      the Client Hints API that is quietly replacing UA parsing
      entirely.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Anatomy of a UA string</h2>
    <p>
      A representative modern UA string:
    </p>
    <pre>{`Mozilla/5.0 (Windows NT 10.0; Win64; x64)
AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/125.0.0.0 Safari/537.36`}</pre>
    <p>
      The grammar is loosely
      <code> product/version (comment) product/version ...</code>.
      Tokens separated by spaces; parenthetical comments carry
      platform details. Order is partially standardized by RFC 9110
      section 10.1.5, but every browser has historical baggage.
    </p>

    <h2>Why everyone claims to be Mozilla</h2>
    <p>
      In 1993, Netscape Navigator identified as
      <code> Mozilla/1.0</code>. Sites checked for
      &ldquo;Mozilla&rdquo; to serve enhanced content &mdash; frames,
      images, later JavaScript. When Internet Explorer launched in
      1995, Microsoft copied the Mozilla identifier
      (<code>Mozilla/1.22 (compatible; MSIE 2.0; ...)</code>) so
      sites would serve IE the same content. Every browser since has
      played the same trick: Safari&rsquo;s WebKit claims
      compatibility with KHTML; Chrome claims compatibility with
      Safari; Opera claimed compatibility with everything.
    </p>
    <p>
      The upshot: the leading <code>Mozilla/5.0</code> token
      identifies nothing. Skip it and read the tokens further right.
    </p>

    <h2>Extracting browser, OS, and device</h2>
    <p>
      The modern breakdown of the Chrome UA above:
    </p>
    <p>
      <strong>Browser</strong>: the last meaningful product/version
      token that is not <code>AppleWebKit</code>,
      <code> KHTML</code>, or <code>Safari</code>. For Chrome:
      <code> Chrome/125.0.0.0</code>.
    </p>
    <p>
      <strong>Engine</strong>:
      <code> AppleWebKit/537.36</code> in the middle.
    </p>
    <p>
      <strong>OS</strong>: inside the first parenthetical.
      <code> Windows NT 10.0</code> maps to Windows 10/11 (both use
      the same NT version).
    </p>
    <p>
      <strong>Device</strong>: in the comment on mobile UAs:
      <code> iPhone</code>,
      <code> SM-G991B</code> (a Samsung model),
      <code> Pixel 8</code>.
    </p>
    <p>
      Common parsing libraries &mdash; <code>ua-parser-js</code>,
      Python&rsquo;s <code>user_agents</code>,
      Java&rsquo;s <code>uap-core</code> &mdash; handle the
      edge cases with regex sets updated regularly. Roll your own
      only for logging, never for feature detection.
    </p>

    <h2>Frozen UAs and UA reduction</h2>
    <p>
      In 2021, Google announced and then started shipping
      <strong> User-Agent reduction</strong>: Chrome pins most UA
      fields to static values. As of 2024, the reduced Chrome UA on
      desktop looks like:
    </p>
    <pre>{`Mozilla/5.0 (Windows NT 10.0; Win64; x64)
AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/125.0.0.0 Safari/537.36`}</pre>
    <p>
      Every Chrome user on Windows 10 <em>and</em> Windows 11
      <em>and</em> Windows 8.1 now sends the same
      <code> Windows NT 10.0</code> string. The device information is
      gone, the minor version is frozen at
      <code> .0.0.0</code>, and the real values are only available
      via User-Agent Client Hints.
    </p>
    <p>
      Safari on iOS has always under-reported: iPad Safari sends a
      desktop UA by default. Firefox on Linux randomizes a few bits
      in private browsing. Treat UA strings as rough approximation,
      not identification.
    </p>

    <h2>User-Agent Client Hints</h2>
    <p>
      Client Hints split the UA into many small HTTP headers, each
      of which the site must opt into requesting.
    </p>
    <pre>{`Sec-CH-UA: "Chromium";v="125", "Not.A/Brand";v="24"
Sec-CH-UA-Mobile: ?0
Sec-CH-UA-Platform: "Windows"`}</pre>
    <p>
      These three are sent on every request by default. Higher-entropy
      hints (full browser version, model, architecture, platform
      version) require the site to send
      <code> Accept-CH: Sec-CH-UA-Platform-Version, Sec-CH-UA-Model</code>
      {" "}in an earlier response. On the next request the browser
      includes them.
    </p>
    <p>
      Client-side, read them via the <code>navigator.userAgentData</code>
      {" "}API. <code>navigator.userAgentData.getHighEntropyValues</code>
      {" "}returns a promise resolving to an object with the requested
      fields.
    </p>

    <h2>Spoofed UAs</h2>
    <p>
      Three populations lie in their UA:
    </p>
    <p>
      <strong>Privacy browsers</strong>: Brave, Tor Browser, and
      privacy add-ons deliberately randomize or generalize the UA to
      resist fingerprinting.
    </p>
    <p>
      <strong>Power users</strong>: Chrome, Edge, and Firefox all
      have dev-tools options to send a custom UA, commonly used for
      testing mobile sites or bypassing UA-gated paywalls.
    </p>
    <p>
      <strong>Bots and scrapers</strong>: good ones identify
      honestly (<code>Googlebot/2.1</code>,
      <code> bingbot/2.0</code>). Bad ones mimic Chrome or Safari
      exactly to blend in.
    </p>
    <p>
      Never use UA parsing for security decisions. Rate limiting,
      CAPTCHA, and behavioral analysis are the right tools.
    </p>

    <h2>Bot identification patterns</h2>
    <p>
      Legitimate crawlers follow a predictable pattern:
      <code> Name/Version (+URL)</code>.
    </p>
    <pre>{`Googlebot/2.1 (+http://www.google.com/bot.html)
bingbot/2.0 (+http://www.bing.com/bingbot.htm)
DuckDuckBot/1.1; (+http://duckduckgo.com/duckduckbot.html)
facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)
Slackbot 1.0 (+https://api.slack.com/robots)`}</pre>
    <p>
      The <code>+URL</code> convention is a strong hint a UA is a
      bot. Verify a claim of being Googlebot by reverse-DNS: the
      request&rsquo;s IP should resolve to
      <code> *.googlebot.com</code> or <code>*.google.com</code>,
      and forward-resolving that hostname should return the same IP.
    </p>

    <h2>UA on mobile</h2>
    <p>
      iPhone (iOS 17, Safari):
    </p>
    <pre>{`Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X)
AppleWebKit/605.1.15 (KHTML, like Gecko)
Version/17.5 Mobile/15E148 Safari/604.1`}</pre>
    <p>
      Android Chrome:
    </p>
    <pre>{`Mozilla/5.0 (Linux; Android 14; Pixel 8 Build/UQ1A.240205.004)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0
Mobile Safari/537.36`}</pre>
    <p>
      The model (<code>Pixel 8</code>) appears on Android but not on
      reduced-UA Chrome for desktop. iPad Safari sends a desktop UA
      indistinguishable from macOS Safari &mdash; detect iPad via
      <code> navigator.maxTouchPoints &gt; 1</code> and
      <code> Mac</code> in UA.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Feature-detecting via UA string.</strong> Use
      <code> if (&apos;IntersectionObserver&apos; in window)</code>,
      not <code>if (chromeVersion &gt; 50)</code>. The former survives
      the next UA reduction; the latter breaks every release.
    </p>
    <p>
      <strong>Matching on &ldquo;Chrome&rdquo; to identify Chrome.</strong>
      {" "}Edge, Opera, Brave, Arc, and Samsung Internet all include
      the Chrome token. Check for Edge, Opera, etc. first and
      short-circuit.
    </p>
    <p>
      <strong>Matching on &ldquo;Safari&rdquo; to identify Safari.</strong>
      {" "}Chrome includes <code>Safari/537.36</code> for historical
      compatibility. Check for <code>Chrome</code> or
      <code> CriOS</code> first.
    </p>
    <p>
      <strong>Treating Windows NT 10.0 as Windows 10.</strong>
      Windows 11 still reports <code>Windows NT 10.0</code>. The
      platform version in Client Hints
      (<code>Sec-CH-UA-Platform-Version</code>) distinguishes them.
    </p>
    <p>
      <strong>Storing parsed UA strings without re-parsing.</strong>
      {" "}Parser libraries update monthly to handle new browsers. A
      string classified as unknown in 2023 might parse cleanly today.
      Parse on read, not on write.
    </p>
    <p>
      <strong>Building security gates on UA.</strong> Trivial to
      spoof, unreliable to detect. Use real signals.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Break down any UA string into browser, OS, device, and engine
      with the{" "}
      <a href="/tools/user-agent-parser">user agent parser</a>. Pair
      with the{" "}
      <a href="/tools/http-status-code-lookup">HTTP status code lookup</a>
      {" "}when debugging server-side UA-gated responses, and the{" "}
      <a href="/tools/mime-type-lookup">MIME type lookup</a> for the
      Accept-header side of content negotiation.
    </p>
  </>
);
