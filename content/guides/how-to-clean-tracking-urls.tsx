import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Every link passed around the web today arrives pre-loaded with
      tracking cruft: <code>fbclid</code> from Facebook,
      <code> gclid</code> from Google Ads,
      <code> mc_cid</code> from Mailchimp,
      <code> _ga</code> from cross-domain Google Analytics, and the
      five <code>utm_*</code> parameters for good measure. None of
      these change what page you land on; all of them clutter the
      URL, leak marketing data to whoever you share the link with,
      and create duplicate-content headaches on your own analytics.
      Cleaning them up takes a small rule set and a little care &mdash;
      some parameters are data you control, others are added by
      third parties downstream. This guide covers the most common
      tracking parameters and who attaches them, the difference
      between cleaning URLs you share and canonicalizing URLs on your
      own site, a safe allow-list vs block-list approach, the
      privacy case for stripping them, and the corners where
      cleaning breaks things.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The usual suspects</h2>
    <p>
      A non-exhaustive tour of the parameters that accumulate on
      real-world URLs.
    </p>
    <p>
      <strong>utm_source, utm_medium, utm_campaign, utm_term,
      utm_content</strong> &mdash; the Urchin/Google Analytics
      parameters you or your marketing team attached. Safe to strip
      after analytics have fired.
    </p>
    <p>
      <strong>gclid, gclsrc, dclid, wbraid, gbraid</strong> &mdash;
      Google Ads click IDs. Auto-appended by Google Ads when
      auto-tagging is on. Needed by GA4 to stitch clicks to Ads, but
      only on arrival &mdash; once captured server-side they are
      dead weight.
    </p>
    <p>
      <strong>fbclid</strong> &mdash; Facebook click ID, added by
      Facebook to any outbound link when the user clicks. Used for
      attribution back to Facebook Ads.
    </p>
    <p>
      <strong>msclkid</strong> &mdash; Microsoft/Bing Ads click ID.
    </p>
    <p>
      <strong>ttclid</strong> &mdash; TikTok click ID.
    </p>
    <p>
      <strong>li_fat_id</strong> &mdash; LinkedIn click ID.
    </p>
    <p>
      <strong>twclid</strong> &mdash; X/Twitter click ID.
    </p>
    <p>
      <strong>mc_cid, mc_eid</strong> &mdash; Mailchimp campaign ID
      and encoded subscriber ID. The second can identify a
      real person back to their list record.
    </p>
    <p>
      <strong>_ga, _gl</strong> &mdash; Google Analytics cross-domain
      linker parameters. Attached when a user clicks a link decorated
      by the GA linker across your properties.
    </p>
    <p>
      <strong>yclid</strong> &mdash; Yandex click ID.
    </p>
    <p>
      <strong>oly_anon_id, oly_enc_id</strong> &mdash; Omeda
      identifiers common on publishing sites.
    </p>

    <h2>Clean URLs you share vs URLs on your site</h2>
    <p>
      Two very different problems sit under the same
      &ldquo;cleaning&rdquo; umbrella.
    </p>
    <p>
      <strong>Shareable URLs.</strong> When a user goes to copy the
      link from their address bar to send to a friend, they should
      not carry the referring campaign tags or the click ID the ad
      network added. The fix is client-side: after analytics fires
      on page load, rewrite the URL with
      <code> history.replaceState</code> to a clean version.
    </p>
    <p>
      <strong>Canonical URLs on your site.</strong> Your pages
      should have one and only one canonical URL, regardless of
      which tracking variant brought the user in. Set a
      <code> &lt;link rel=&quot;canonical&quot;&gt;</code> that
      points at the clean URL and make sure your sitemap, internal
      links, and OG tags use the same form. This prevents tracking
      variants from indexing as separate pages.
    </p>

    <h2>Strip-after-capture pattern</h2>
    <p>
      Let the tracking tools see the parameters exactly once, then
      remove them.
    </p>
    <pre>{`// Runs after analytics has read location.search
const TRACKING = new Set([
  'utm_source','utm_medium','utm_campaign','utm_term','utm_content',
  'gclid','gclsrc','dclid','wbraid','gbraid',
  'fbclid','msclkid','ttclid','li_fat_id','twclid','yclid',
  'mc_cid','mc_eid','_ga','_gl'
]);

const url = new URL(location.href);
const keep = new URLSearchParams();
for (const [k, v] of url.searchParams) {
  if (!TRACKING.has(k)) keep.append(k, v);
}
url.search = keep.toString();
history.replaceState(null, '', url.toString());`}</pre>
    <p>
      Runs once on load; does not trigger a navigation or break
      analytics. The address bar now shows the clean URL ready to
      copy.
    </p>

    <h2>Allow-list vs block-list</h2>
    <p>
      A block-list (remove these known-bad keys) is what most sites
      ship. It is forgiving &mdash; unknown parameters survive &mdash;
      but it needs maintenance as new platforms invent new click IDs.
    </p>
    <p>
      An allow-list (keep only these keys) is stricter and
      self-maintaining. Any parameter not in the allowed set is
      stripped. Best for sites where the URL carries a small, fixed
      set of meaningful parameters (search, pagination, a filter or
      two) and everything else is tracking.
    </p>
    <p>
      Large content sites tend to use block-lists; focused apps and
      e-commerce tend to use allow-lists.
    </p>

    <h2>Canonical tags do the SEO side</h2>
    <p>
      Even if you do not rewrite URLs client-side, a correct
      <code> &lt;link rel=&quot;canonical&quot;&gt;</code> solves
      most search-engine-side duplication.
    </p>
    <pre>{`<link rel="canonical" href="https://example.com/pricing" />`}</pre>
    <p>
      With this in the head, Google understands that
      <code> /pricing?utm_source=newsletter</code> and
      <code> /pricing?fbclid=abc123</code> are the same page as
      <code> /pricing</code>, and consolidates ranking signals onto
      the clean URL.
    </p>

    <h2>Referral spam and junk parameters</h2>
    <p>
      Beyond legitimate tracking, URLs pick up junk:
    </p>
    <p>
      <strong>Referral spam</strong> &mdash; bots injecting fake
      campaigns to appear in your analytics. Symptoms: a UTM source
      you never set up (&ldquo;semalt.com&rdquo;,
      &ldquo;buttons-for-website.com&rdquo;), suddenly driving
      traffic. Filter at the analytics level, not the URL level.
    </p>
    <p>
      <strong>Copy-paste accidents</strong> &mdash;
      <code> &amp;amp;</code> where <code>&amp;</code> should be,
      extra question marks, trailing fragments from a doc paste.
      A strip-and-rebuild via URL() fixes most of it.
    </p>

    <h2>Bookmarking and archival</h2>
    <p>
      A URL a user bookmarks today might be reopened in six months.
      If the bookmark includes a one-time <code>gclid</code>, the
      ad network may reject it as expired or replay-attack-flag it.
      Rewriting to a clean URL ensures bookmarks stay valid
      long-term.
    </p>

    <h2>Do not strip everything blindly</h2>
    <p>
      Some query parameters carry real application state, and
      stripping them breaks the page.
    </p>
    <p>
      <strong>Pagination</strong>:
      <code> ?page=3</code>. Needed for the content.
    </p>
    <p>
      <strong>Search queries</strong>:
      <code> ?q=keyboard</code>. The whole point of the URL.
    </p>
    <p>
      <strong>Filters and sort order</strong>:
      <code> ?sort=price_asc&amp;in_stock=1</code>.
    </p>
    <p>
      <strong>Auth/session tokens</strong> passed via URL (rare but
      happens with magic-link flows). Never strip before the
      receiving code has consumed them.
    </p>

    <h2>Privacy case for stripping</h2>
    <p>
      Tracking parameters leak across every system that touches
      the URL: browser history, proxy logs, referer headers,
      screenshots, shared clipboards. A <code>mc_eid</code>
      {" "}can identify an individual subscriber; an
      <code> fbclid</code> can be rejoined to a Facebook ad
      audience. Stripping them once they have served analytics
      is basic hygiene &mdash; Safari, Brave, and Firefox already
      strip known tracking parameters from outbound links by
      default, so cleaning proactively puts your URLs in line with
      where browsers are heading.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Stripping before analytics fires.</strong> Your rewrite
      runs at page load, but GA4&rsquo;s pageview hit may still be in
      flight. Run the strip after a
      <code> gtag(&apos;event&apos;)</code> acknowledgement, or with
      a short <code>setTimeout</code>, or via
      <code> requestIdleCallback</code>.
    </p>
    <p>
      <strong>Forgetting canonical.</strong> Rewriting the address
      bar only helps humans. Search engines and social crawlers do
      not run your JavaScript before reading OG tags. Set a
      canonical link.
    </p>
    <p>
      <strong>Stripping parameters you did not add.</strong> If a
      third-party embed relies on a query parameter your site does
      not know about, a strict allow-list will break it. Audit
      embeds before deploying an allow-list.
    </p>
    <p>
      <strong>Breaking deep links.</strong> Mobile app deep-link
      schemes sometimes pass app-specific parameters through the
      web. An overzealous cleaner can strip the payload the app
      needs after it launches.
    </p>
    <p>
      <strong>Stripping on every navigation.</strong> Run the clean
      on first load of the page, not on every SPA route change.
      Internal state you set via router (<code>?tab=billing</code>)
      is not tracking.
    </p>
    <p>
      <strong>Doing it server-side with a 301.</strong> 301-ing
      <code> ?utm_source=newsletter</code> to the clean URL works
      but breaks the analytics hit entirely &mdash; the redirect
      happens before the JS that reads UTMs runs. Strip
      client-side after capture.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Strip tracking parameters from any URL instantly with the{" "}
      <a href="/tools/url-cleaner">URL cleaner</a>. Pair with the{" "}
      <a href="/tools/query-string-parser">query string parser</a>
      {" "}when you want to see every parameter before deciding which
      to keep, and the{" "}
      <a href="/tools/url-parser">URL parser</a> for a full
      protocol/host/path breakdown alongside the query.
    </p>
  </>
);
