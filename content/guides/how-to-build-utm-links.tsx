import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      UTM parameters are the five query-string tags Google Analytics
      and every other major analytics platform read to attribute a
      visit to a specific marketing channel, campaign, and creative.
      The parameters themselves are trivial &mdash; five predictable
      keys appended to a URL &mdash; but the conventions around
      naming, casing, and taxonomy decide whether your reports are
      useful or a pile of near-duplicates that have to be cleaned
      every quarter. This guide covers each of the five parameters
      and when to use it, the naming rules that prevent
      <code> Facebook</code> and <code>facebook</code> from showing
      up as separate sources, the quirks of GA4 vs Universal
      Analytics, a taxonomy template you can adopt wholesale, and
      the common mistakes that make retroactive fixes necessary.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What UTMs are</h2>
    <p>
      UTM stands for &ldquo;Urchin Tracking Module&rdquo; &mdash;
      Urchin was the analytics company Google bought in 2005, the
      bones of which became Google Analytics. The parameters are
      just query-string keys; any analytics tool that reads URLs can
      pick them up.
    </p>
    <p>
      A tagged link looks like:
    </p>
    <pre>{`https://example.com/pricing
  ?utm_source=newsletter
  &utm_medium=email
  &utm_campaign=spring_2026_launch
  &utm_content=hero_button
  &utm_term=pricing`}</pre>

    <h2>The five parameters</h2>
    <p>
      <strong>utm_source</strong> &mdash; the platform or vendor
      (<code>google</code>, <code>facebook</code>,
      <code> newsletter</code>, <code>partner_acme</code>). Answers
      &ldquo;where did the click come from?&rdquo; Always required.
    </p>
    <p>
      <strong>utm_medium</strong> &mdash; the marketing channel type
      (<code>cpc</code>, <code>email</code>, <code>social</code>,
      <code> display</code>, <code>affiliate</code>, <code>organic</code>).
      Answers &ldquo;what kind of traffic?&rdquo; Always required.
    </p>
    <p>
      <strong>utm_campaign</strong> &mdash; the initiative the link
      is part of (<code>spring_2026_launch</code>,
      <code> black_friday</code>). Always required.
    </p>
    <p>
      <strong>utm_content</strong> &mdash; differentiates multiple
      links within the same campaign (<code>hero_button</code> vs
      <code> footer_link</code>, or A/B creative variants). Optional
      but strongly recommended when you have more than one link per
      campaign.
    </p>
    <p>
      <strong>utm_term</strong> &mdash; the paid keyword for search
      ads. Legacy use; auto-tagging with
      <code> {"{keyword}"}</code> in Google Ads fills it automatically.
      Rarely hand-set.
    </p>

    <h2>Naming rules that save hours later</h2>
    <p>
      Three rules prevent 90% of taxonomy drift.
    </p>
    <p>
      <strong>All lowercase.</strong> UTM values are case-sensitive.
      <code> Email</code> and <code>email</code> are two different
      sources in your report. Force lowercase at the point where the
      link is built.
    </p>
    <p>
      <strong>Underscores between words.</strong> Spaces get
      encoded as <code>%20</code> or <code>+</code>, which looks
      awful in reports and breaks some tools. Use
      <code> _</code> consistently.
    </p>
    <p>
      <strong>Controlled vocabulary.</strong> Write down the allowed
      values for each parameter. A medium of <code>e-mail</code>,
      <code> email</code>, <code>newsletter</code>, and
      <code> eblast</code> all mean the same thing &mdash; pick one
      and document it.
    </p>
    <p>
      A minimal taxonomy:
    </p>
    <pre>{`utm_medium allowed values:
  cpc            paid search
  display        banner ads
  paid_social    Facebook/Instagram/LinkedIn/TikTok paid
  email          transactional + newsletter
  affiliate      partner links
  referral       non-paid links from other sites
  organic_social unpaid social posts
  qr             printed QR codes`}</pre>

    <h2>Only tag external links</h2>
    <p>
      UTMs are for links that bring users <strong>to</strong> your
      site from outside. Tagging internal links breaks session
      attribution &mdash; GA4 resets the session when it sees a new
      campaign, so an internal link with UTMs creates a spurious
      &ldquo;new visit&rdquo; from the user clicking within your
      own site. Never UTM-tag a link on your own domain.
    </p>

    <h2>GA4 differences from Universal Analytics</h2>
    <p>
      GA4 reads the same five parameters, but it also understands
      two newer ones Google introduced in 2023:
    </p>
    <p>
      <strong>utm_source_platform</strong> &mdash; a higher-level
      grouping above source (e.g., Google Ads, Display &amp; Video
      360).
    </p>
    <p>
      <strong>utm_creative_format</strong> and
      <strong> utm_marketing_tactic</strong> &mdash; optional
      dimensions for paid media.
    </p>
    <p>
      GA4 also resets the session on new source/medium by default,
      where UA had a 30-minute window. If you need UA-style behavior,
      adjust the session timeout in Admin.
    </p>

    <h2>URL-encoding UTM values</h2>
    <p>
      If a value contains spaces, punctuation, or non-ASCII, it must
      be percent-encoded. The easiest way to avoid the problem is to
      forbid those characters in your taxonomy. If you must include
      them, encode the value: <code>utm_campaign=q1%20relaunch</code>
      {" "}for &ldquo;q1 relaunch&rdquo;.
    </p>

    <h2>UTMs and multi-touch attribution</h2>
    <p>
      Default GA4 attribution is data-driven or last-click. The UTMs
      on the <strong>last</strong> non-direct click before conversion
      win the credit. If you run retargeting heavily, your
      <code> utm_medium=display</code> will appear to drive most
      conversions simply because it fires late in the funnel. Use
      GA4&rsquo;s attribution reports or an external model to see
      first-touch and assisted contributions.
    </p>

    <h2>Shortening and redirects preserve UTMs</h2>
    <p>
      A 301 or 302 redirect preserves query parameters by default in
      every compliant server. Link shorteners (bit.ly, rebrand.ly)
      also pass UTMs through. The one place UTMs get stripped is
      aggressive privacy browsers and some email apps &mdash; but
      the parameters are passed along to the landing page in almost
      every real-world case.
    </p>

    <h2>Privacy and referral leaking</h2>
    <p>
      UTMs on a URL expose your marketing taxonomy publicly. If a
      user shares a UTM-tagged link on social media, anyone clicking
      sees your naming scheme and attributes themselves to the
      original campaign. Two mitigations: strip UTMs from the URL
      with <code>history.replaceState</code> once the analytics hit
      fires, or use a link shortener that rewrites to a clean
      destination.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Case drift.</strong>
      <code> utm_source=Facebook</code> one week,
      <code> utm_source=facebook</code> the next. Report splits them
      into two lines forever. Force lowercase in the tool that
      generates links.
    </p>
    <p>
      <strong>Tagging internal links.</strong> Breaks session
      continuity; inflates &ldquo;new visits&rdquo;; corrupts
      attribution. UTMs are external-only.
    </p>
    <p>
      <strong>Encoding spaces as <code>+</code> inconsistently.</strong>
      {" "}GA4 reads both <code>%20</code> and <code>+</code>, but
      reports display whichever was in the URL, so
      <code> spring+launch</code> and <code>spring%20launch</code>
      look like two campaigns. Just avoid spaces entirely.
    </p>
    <p>
      <strong>Missing medium.</strong> GA4 falls back to
      <code> (not set)</code> when medium is missing, which collapses
      into <code>(direct) / (none)</code> in channel grouping and
      disappears from paid-channel reports. Never leave medium empty.
    </p>
    <p>
      <strong>Reusing campaign names across years.</strong>
      <code> utm_campaign=spring_sale</code> in 2025 and again in 2026
      blurs year-over-year analysis. Always include the year:
      <code> utm_campaign=spring_sale_2026</code>.
    </p>
    <p>
      <strong>Free-text creative names.</strong>
      <code> utm_content=big_red_button</code> one time,
      <code> utm_content=cta1</code> the next. Fine for tiny teams;
      becomes a mess at scale. Document <code>utm_content</code>
      {" "}conventions in your taxonomy spec.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate properly-formatted, lowercased UTM links with the{" "}
      <a href="/tools/utm-builder">UTM builder</a>. Pair with the{" "}
      <a href="/tools/utm-parser">UTM parser</a> to audit links your
      team has already shipped, and the{" "}
      <a href="/tools/url-cleaner">URL cleaner</a> for stripping
      tracking parameters out of shareable or canonical URLs.
    </p>
  </>
);
