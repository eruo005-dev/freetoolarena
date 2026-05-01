import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The average US household has 12 paid subscriptions and uses 6. Most of the rest renew
    quietly because nobody set up the calendar reminder to cancel. Here&rsquo;s a 30-minute
    sweep that tends to free up $400&ndash;1,200 a year &mdash; without giving up anything
    you actually use.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      Subscription bloat sneaks in because each individual sign-up is small &mdash; $5 here,
      $14 there. The cost only becomes visible when you list everything in one place. Audit
      once, automate the rest.
    </p>

    <h2>Step 1: pull the receipts (15 minutes)</h2>
    <p>
      Don&rsquo;t try to remember. Open your statements and search for recurring charges:
    </p>
    <ul>
      <li><strong>Bank/credit-card app</strong> &rarr; search the last 90 days for monthly or
        yearly recurring debits. Most apps now flag &ldquo;subscriptions&rdquo; automatically.</li>
      <li><strong>Apple ID</strong> &rarr; Settings &gt; your name &gt; Subscriptions. Lists every
        App Store subscription you&rsquo;ve ever started.</li>
      <li><strong>Google Play</strong> &rarr; play.google.com/store/account/subscriptions.</li>
      <li><strong>PayPal</strong> &rarr; Settings &gt; Payments &gt; Manage automatic payments.
        Often hides old recurring charges that bypass your card statements.</li>
      <li><strong>Amazon</strong> &rarr; Your Account &gt; Memberships &amp; Subscriptions. Easy
        to miss the Audible, Kindle Unlimited, and Channels add-ons.</li>
    </ul>

    <h2>Step 2: rate each by use, not feeling</h2>
    <p>
      For each subscription, write down two numbers: the monthly cost, and how many times
      you used it in the last 30 days. Don&rsquo;t round up out of guilt or fondness. The
      moment you have <em>cost per use</em>, the keep/cancel calls become obvious:
    </p>
    <ul>
      <li><strong>$/use under $2:</strong> keep, generally good value.</li>
      <li><strong>$/use $2&ndash;5:</strong> review &mdash; might be worth keeping if it&rsquo;s irreplaceable.</li>
      <li><strong>$/use over $5 with under 4 uses/month:</strong> almost always cancel.</li>
      <li><strong>Zero uses in the last 30 days:</strong> cancel today. You can re-subscribe in 5 minutes if you miss it.</li>
    </ul>

    <h2>Step 3: cancel without losing what matters</h2>
    <p>
      Two mistakes here. First, cancelling a service that&rsquo;s still inside its prepaid
      annual period (you keep access until the renewal date). Second, deleting an account
      when you only meant to cancel the recurring charge &mdash; for media services with
      saved playlists, watchlists, or workout history, hit &ldquo;cancel renewal&rdquo; and let
      the account go dormant.
    </p>
    <ul>
      <li>For Apple/Google subscriptions, cancellation always takes effect at the end of the
        current period. Toggle once, done.</li>
      <li>For services with retention queues (Adobe, ClassPass, Hulu, NYT), expect a discount
        offer when you cancel. The 30&ndash;50% off offer is a real signal that you were
        overpaying.</li>
      <li>If a service hides the cancel button behind a phone call, screenshot the date and
        cost, set a calendar reminder for the day before renewal, and call once. Some states
        (CA, NY) require a click-to-cancel option for online sign-ups &mdash; you can ask for
        it.</li>
    </ul>

    <h2>Step 4: replace the autopilot</h2>
    <p>
      The reason subscription costs balloon is that the default is &ldquo;keep paying.&rdquo;
      Flip the default. After your sweep:
    </p>
    <ul>
      <li>Add every renewal date to your calendar with a reminder 3 days before. Ask &ldquo;am
        I still using this?&rdquo; before each one renews.</li>
      <li>Pay annually only for things you&rsquo;ve used for 6+ consecutive months. Annual
        plans are a 10&ndash;20% discount in exchange for a lock-in &mdash; only useful if
        the relationship is real.</li>
      <li>Use a single virtual card or Privacy.com for every new subscription. One click to
        kill if you change your mind.</li>
    </ul>

    <h2>The un-bundle and bundle moves</h2>
    <p>
      Bundles are usually math worth running. Disney+/Hulu/ESPN+, Apple One, Verizon plans
      with Netflix included, Costco memberships with included streaming &mdash; the standalone
      total is almost always higher. Conversely, &ldquo;the bundle&rdquo; is also a common
      way to keep paying for two services you don&rsquo;t use because one inside it is
      essential. Audit by service, then re-audit by bundle.
    </p>

    <h2>Habits that prevent the rebound</h2>
    <ul>
      <li><strong>One-month free trial rule:</strong> set a calendar event for the day <em>before</em> the trial converts.</li>
      <li><strong>30-day rule:</strong> when you discover a new service, wait 30 days before subscribing. Most cravings die in a week.</li>
      <li><strong>Yearly re-audit:</strong> January 1 or your birthday &mdash; same drill. Takes 20 minutes once a year.</li>
    </ul>

    <h2>Run the audit in one tab</h2>
    <p>
      Our <a href="/tools/subscription-fatigue-auditor">subscription fatigue auditor</a> takes
      your list of services and surfaces a kill list ranked by annual savings. It auto-flags
      anything with a $/use ratio that fails the $5/4-uses test, totals the monthly and yearly
      drag, and shows you what you&rsquo;d save if you actually cut the marginal ones too. Five
      minutes of clicking, often more than $500/year back.
    </p>
  </>
);
