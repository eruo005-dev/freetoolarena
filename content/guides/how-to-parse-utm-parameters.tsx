import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Reading UTM parameters off an incoming URL sounds like a
      one-liner &mdash;
      <code> new URLSearchParams(location.search).get(&apos;utm_source&apos;)</code>
      {" "}and you&rsquo;re done &mdash; but using UTMs well means
      deciding what to do with them: when to store, when to
      overwrite, when to expire, and how to build an attribution
      chain without leaking PII into your analytics. The five
      parameters arrive clean from the URL but they need to be
      promoted to first-party cookies or local storage for later
      conversions, and the choice between first-touch and last-touch
      attribution drives which campaigns get credit. This guide
      covers the parsing API, building an attribution chain, the
      first-touch vs last-touch decision, how GA4 handles the same
      problem under the hood, the common server-side parsing
      mistakes, and the privacy considerations when UTMs end up in
      logs.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Extracting UTMs from the URL</h2>
    <p>
      Modern browsers and Node give you
      <code> URLSearchParams</code> for free.
    </p>
    <pre>{`const params = new URLSearchParams(window.location.search);
const utms = {
  source:   params.get('utm_source'),
  medium:   params.get('utm_medium'),
  campaign: params.get('utm_campaign'),
  term:     params.get('utm_term'),
  content:  params.get('utm_content'),
};`}</pre>
    <p>
      <code>get()</code> returns <code>null</code> if the parameter
      is absent. URL decoding is automatic &mdash; a
      <code> utm_campaign=q1%20launch</code> comes back as
      <code> &quot;q1 launch&quot;</code>.
    </p>

    <h2>When to read, when to store</h2>
    <p>
      Read the UTMs on the first page load of a session. If any are
      present, stash them. If none are present, keep whatever was
      stored previously. Two stores you typically need:
    </p>
    <p>
      <strong>Session-scoped</strong> (current visit): the most
      recent UTM set the user arrived with. Used for immediate
      attribution on this visit&rsquo;s conversion.
    </p>
    <p>
      <strong>First-touch</strong> (ever): the very first UTM set
      this user ever arrived with, written once and never
      overwritten. Lives until the user clears cookies or your
      retention window expires (90 days is common).
    </p>
    <pre>{`function captureUtms() {
  const p = new URLSearchParams(location.search);
  const keys = ['utm_source','utm_medium','utm_campaign',
                'utm_term','utm_content'];
  const found = {};
  keys.forEach(k => {
    const v = p.get(k);
    if (v) found[k] = v;
  });
  if (Object.keys(found).length === 0) return;

  sessionStorage.setItem('last_touch', JSON.stringify(found));
  if (!localStorage.getItem('first_touch')) {
    localStorage.setItem('first_touch', JSON.stringify(found));
  }
}`}</pre>

    <h2>First-touch vs last-touch vs multi-touch</h2>
    <p>
      <strong>First-touch</strong> gives full credit to the campaign
      that first introduced the user. Great for top-of-funnel
      evaluation. Blind to nurture campaigns that actually drove
      the conversion.
    </p>
    <p>
      <strong>Last-touch</strong> gives credit to the final
      click before conversion. Easy to calculate, but tends to
      over-credit retargeting and branded search.
    </p>
    <p>
      <strong>Linear or position-based</strong> multi-touch spreads
      credit across all touches. Closer to reality, harder to
      implement, and needs a stitched user journey across sessions.
    </p>
    <p>
      For most SaaS: capture both first and last touch, report both,
      and let revenue ops argue about the ratio. Capturing both
      costs nothing extra at pageview time.
    </p>

    <h2>The attribution chain</h2>
    <p>
      A user might visit your site six times before converting, each
      visit with or without a UTM set. The sequence looks like:
    </p>
    <pre>{`visit 1: utm_source=reddit    medium=social     campaign=launch_post
visit 2: (direct, no UTMs)
visit 3: utm_source=newsletter medium=email      campaign=tip_tuesday
visit 4: (direct)
visit 5: utm_source=google     medium=cpc        campaign=brand
visit 6: (direct) -> conversion`}</pre>
    <p>
      First-touch credits <code>reddit / social</code>. Last-touch
      (of non-direct) credits <code>google / cpc</code>. Both can be
      valuable; neither is complete. To build the full chain, store
      an append-only array in local storage or on the server,
      capped at a reasonable length (10&ndash;20 touches) to avoid
      unbounded growth.
    </p>

    <h2>Server-side parsing</h2>
    <p>
      Server parsing follows the same URL rules but comes with two
      traps. First, frameworks like Express already decode query
      parameters &mdash; reading <code>req.query.utm_source</code>
      gives you a decoded string, so decoding again is
      double-decoding. Second, when your app sits behind a CDN,
      make sure the CDN forwards the query string intact; some
      caching rules strip parameters before origin sees them.
    </p>
    <pre>{`app.get('/landing', (req, res) => {
  const { utm_source, utm_medium, utm_campaign,
          utm_term, utm_content } = req.query;
  if (utm_source) {
    logTouch(req.cookies.anon_id, {
      source: utm_source,
      medium: utm_medium,
      campaign: utm_campaign,
      ts: Date.now()
    });
  }
  res.render('landing');
});`}</pre>

    <h2>Handing UTMs off to your analytics tool</h2>
    <p>
      If you run GA4, Amplitude, Mixpanel, or similar, they read
      UTMs from the URL automatically &mdash; you don&rsquo;t need
      to forward them. Your stored UTMs are extra, for internal
      dashboards, CRM enrichment, and server-side event logs that
      the client-side tag cannot reach.
    </p>
    <p>
      When sending to your CRM, map the five UTMs onto named fields
      (e.g., HubSpot&rsquo;s
      <code> hs_analytics_source</code>) on lead creation. Set them
      once; do not overwrite on subsequent visits unless your model
      is pure last-touch.
    </p>

    <h2>Cross-domain and subdomain stitching</h2>
    <p>
      Local storage is per-origin, so a user flowing from
      <code> www.example.com</code> to
      <code> app.example.com</code> loses their stored UTMs. Three
      options:
    </p>
    <p>
      <strong>Forward UTMs in the link</strong> between subdomains.
      Good for a narrow handoff (marketing site &rarr; signup form).
    </p>
    <p>
      <strong>Share a parent-domain cookie</strong>
      (<code>Domain=.example.com</code>). Works across subdomains
      but not across completely different domains.
    </p>
    <p>
      <strong>Send the user a stable ID</strong> that both sides
      share, and attribute server-side. The most reliable approach
      but the most work.
    </p>

    <h2>Privacy considerations</h2>
    <p>
      UTM parameters themselves are not personal data, but they sit
      on URLs that are logged, indexed, and shared. A UTM like
      <code> utm_content=abandoned_cart_24h_doug</code> leaks a user
      name into logs if the template is careless. Two rules:
    </p>
    <p>
      Never put PII &mdash; name, email, phone, account ID &mdash;
      into UTM values. The convenience is not worth the compliance
      risk (GDPR, CCPA).
    </p>
    <p>
      Do strip UTMs from the visible URL after capture, using
      <code> history.replaceState</code>, to prevent them from being
      copy-pasted onward and to keep the URL clean for canonical
      purposes.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Overwriting first-touch on every visit.</strong>
      Writing to the first-touch store unconditionally erases it.
      Check for existence before setting.
    </p>
    <p>
      <strong>Double decoding.</strong> Query parameters come out of
      <code> URLSearchParams</code> or <code>req.query</code> already
      decoded. Calling <code>decodeURIComponent</code> on
      <code> &quot;q1 launch&quot;</code> again is a no-op unless
      the value happened to contain a <code>%</code>.
    </p>
    <p>
      <strong>Tagging for campaigns that never launched.</strong>
      Old UTM links lie around forever. A well-meaning customer
      success rep links to a year-old landing URL and that campaign
      lights up in today&rsquo;s report. Expire old URLs, or
      version campaign names with the year.
    </p>
    <p>
      <strong>Stripping UTMs before reading them.</strong> Some
      security libraries canonicalize URLs on ingress; if they run
      before your capture code, the parameters are already gone.
      Order matters.
    </p>
    <p>
      <strong>Ignoring referrer for attribution gap-fill.</strong>
      When UTMs are missing, <code>document.referrer</code> often
      has useful signal (<code>facebook.com</code>,
      <code> t.co</code>, <code>google.com</code>). Pair the two
      sources.
    </p>
    <p>
      <strong>Logging full URLs with UTMs into error reports.</strong>
      UTM values leak campaign strategy and sometimes PII into
      third-party error tracking. Scrub URLs before sending them off.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Paste any URL into the{" "}
      <a href="/tools/utm-parser">UTM parser</a> to see exactly how
      your code will read it. Pair with the{" "}
      <a href="/tools/query-string-parser">query string parser</a>
      {" "}to decompose the full parameter set when a page has
      non-UTM tracking too, and the{" "}
      <a href="/tools/url-cleaner">URL cleaner</a> for producing the
      UTM-free version of the URL you want users to share.
    </p>
  </>
);
