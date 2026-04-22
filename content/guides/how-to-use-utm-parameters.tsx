export const intro = (
  <>
    <p>
      UTM parameters are the five query-string tags you bolt onto a URL so your analytics tool
      knows where the traffic came from. Without them, everything from a newsletter, a podcast
      sponsorship, a tweet, and a friend&rsquo;s blog post shows up as &ldquo;direct&rdquo; or
      &ldquo;referral&rdquo; — you have no idea which campaign actually drove the signup.
    </p>
    <p>
      Used consistently, UTMs turn marketing from a guessing game into a measurable system.
      Used inconsistently, they create a data mess that takes weeks to clean up. This guide covers
      what each parameter does, how to name them so the data stays sane, and the mistakes that
      destroy reporting.
    </p>
  </>
);

export const body = (
  <>
    <h2>The five UTM parameters</h2>
    <p>
      Google Analytics reads five named query parameters: <strong>utm_source</strong>,{" "}
      <strong>utm_medium</strong>, <strong>utm_campaign</strong>,{" "}
      <strong>utm_term</strong>, and <strong>utm_content</strong>. The first three are required
      for any useful report. The last two are optional — term is for paid search keywords, content
      is for A/B testing link variants inside the same campaign.
    </p>

    <h2>What each parameter actually means</h2>
    <p>
      <strong>Source</strong> is the referrer: the platform or publication. Examples: newsletter,
      twitter, google, producthunt. <strong>Medium</strong> is the channel type: email, social,
      cpc (paid search), referral, affiliate. <strong>Campaign</strong> is the named effort:
      spring-launch-2026, black-friday-2026, feature-x-announcement. If you mix source and
      medium, the reports break — newsletter is a source, email is a medium; they are not
      interchangeable.
    </p>

    <h2>Build URLs with a consistent scheme</h2>
    <p>
      The fastest way to poison analytics is to let three teammates type UTMs by hand. One uses
      &ldquo;Facebook,&rdquo; another uses &ldquo;facebook,&rdquo; a third uses &ldquo;FB&rdquo; —
      now you have three separate rows in the source report for the same platform. Pick a
      convention (all lowercase, hyphens not underscores) and use our{" "}
      <a href="/tools/utm-builder">UTM builder</a> to generate every link the same way.
    </p>

    <h2>A naming convention that scales</h2>
    <p>
      Lowercase everything. Use hyphens between words (utm_campaign=spring-sale-2026, not
      Spring_Sale_2026). Keep the source short and human (twitter, not twitter-feed-link).
      Put the date or quarter in the campaign name if you run recurring campaigns — it lets you
      compare year-over-year without renaming everything. Document the scheme in a shared doc
      so new teammates don&rsquo;t invent their own format.
    </p>

    <h2>Where to put UTMs — and where not to</h2>
    <p>
      Tag every link you place outside your own site: social posts, email campaigns,
      partnerships, ads, sponsorships. Do <em>not</em> tag internal links between pages on your
      own site — it will overwrite session data and misattribute users to yourself. If you need
      to track internal clicks, use event tracking in your analytics tool, not UTMs.
    </p>

    <h2>Shorten UTM links before sharing</h2>
    <p>
      Long UTM-tagged URLs look like spam in a tweet or a newsletter. Run them through a URL
      shortener before you share. Just make sure the shortener preserves the query string on
      redirect (most do). If you ever inherit a pile of mystery UTM links, our{" "}
      <a href="/tools/utm-parser">UTM parser</a> breaks them back down into their source, medium,
      and campaign so you can audit what was running.
    </p>

    <h2>Track the destination, not the redirect</h2>
    <p>
      If your landing page redirects (301 or 302) to a different URL, some analytics setups lose
      the UTM parameters on the redirect. Test a tagged link yourself before you hit publish —
      click it, land on the page, and confirm the UTMs show up in your real-time analytics.
    </p>

    <h2>Campaign naming for multi-channel launches</h2>
    <p>
      When one campaign runs across email, social, and paid ads, keep the{" "}
      <strong>utm_campaign</strong> identical across all three but vary the{" "}
      <strong>utm_medium</strong> and <strong>utm_source</strong>. That way the campaign report
      rolls them up together, and the source/medium report breaks them down by channel. This is
      the pattern that lets you say &ldquo;the launch drove 4,200 signups, 60% from email, 25%
      from social, 15% from paid.&rdquo;
    </p>

    <h2>Using utm_content for A/B testing</h2>
    <p>
      Two versions of the same link — one with utm_content=button-top, the other
      button-bottom. Same campaign, same source, same medium. Now the content breakdown tells you
      which version drove more conversions. Use this for CTA copy tests, image tests, or subject
      line tests in email.
    </p>

    <h2>Common mistakes to avoid</h2>
    <p>
      Tagging your own internal links. Tagging links with PII (email addresses, user IDs) in the
      URL — this exposes user data in every analytics report. Letting spaces into UTM values
      (use <code>%20</code> or hyphens). Reusing the same campaign name for unrelated efforts.
      Forgetting that UTM values are case-sensitive in many analytics tools.
    </p>

    <h2>Putting it all together</h2>
    <p>
      Start with a naming doc. Run every shared link through the{" "}
      <a href="/tools/utm-builder">UTM builder</a>. Audit your analytics source/medium report
      monthly for typos or duplicates. Once the data is clean, you can actually compare channels
      — which is the entire point.
    </p>

    <p>
      Related: <a href="/guides/seo-basics-for-beginners">SEO basics for beginners</a>,{" "}
      <a href="/guides/how-to-start-a-blog">how to start a blog</a>, and{" "}
      <a href="/guides/how-to-write-a-meta-description">how to write a meta description</a> that
      earns the clicks you&rsquo;re now measuring.
    </p>
  </>
);
