import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Subscription spend is the quiet assassin of personal budgets. A &ldquo;$9.99 a
      month&rdquo; service looks harmless until you stack twelve of them on top of
      streaming, cloud storage, fitness apps, newsletters, and the fantasy
      football league you forgot about. A quarterly audit drags every recurring
      charge into the light, forces you to annualize the real cost, and helps
      you kill anything you wouldn&rsquo;t buy fresh today. Most people shave
      20&ndash;40% off recurring spend the first time they run this exercise.
      This guide walks through the full workflow &mdash; from pulling
      statements to cancelling cleanly &mdash; without turning it into a
      weekend-long project.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Why a quarterly audit beats a yearly one</h2>
    <p>
      Annual reviews miss too much. A free trial signed up for in February
      becomes a paid subscription in March, and if you only audit in December
      you&rsquo;ve funded ten months of something you forgot existed. A
      90-day cadence catches trial-to-paid flips, rate hikes, and
      double-billing before they compound. Put the audit on a recurring
      calendar event &mdash; first Saturday of January, April, July, October
      &mdash; and treat it like a dentist appointment.
    </p>

    <h2>Step 1: Pull every recurring charge</h2>
    <p>
      Open your last 90 days of bank and credit card statements. Search for
      charges that look monthly or annual: streaming, SaaS, gym, cloud
      backup, insurance, memberships, news, domains, and app store bundles.
      Don&rsquo;t forget <strong>app-store subscriptions</strong> billed
      through Apple or Google &mdash; those hide inside a single line item
      and often contain four or five separate apps.
    </p>
    <ul>
      <li>Credit card portals &mdash; most now have a &ldquo;recurring charges&rdquo; filter</li>
      <li>Apple ID &rarr; Subscriptions</li>
      <li>Google Play &rarr; Payments &amp; subscriptions</li>
      <li>PayPal &rarr; Automatic payments</li>
      <li>Your email &mdash; search for &ldquo;receipt&rdquo; and &ldquo;renewal&rdquo;</li>
    </ul>

    <h2>Step 2: Annualize everything</h2>
    <p>
      Monthly pricing is psychological sleight-of-hand. A $14.99/month service
      is $179.88/year. Stack five of those and you&rsquo;re at $900 before
      you&rsquo;ve bought anything fun. Multiply every monthly charge by 12
      and every weekly charge by 52. Then sort the list descending by annual
      cost &mdash; the top third is usually where the surprises live.
    </p>
    <pre>{`monthly * 12 = annual
weekly  * 52 = annual
quarterly * 4 = annual
biennial / 2 = annual`}</pre>

    <h2>Step 3: Rate each one 0&ndash;10</h2>
    <p>
      Next to each subscription, write a gut score: how much value did this
      deliver in the last 90 days? Anything scoring <strong>4 or below</strong>
      is a cancel candidate. Anything 5&ndash;7 is a &ldquo;downgrade or pause&rdquo;
      candidate. Only 8+ earns the auto-renew.
    </p>

    <h2>Step 4: The forgotten-trial trap</h2>
    <p>
      Free trials are designed to convert via forgetfulness. The moment you
      start a trial, set a calendar reminder for <em>two days before</em> it
      ends. Better: use a virtual card number with a spending cap, so the
      renewal attempt simply fails. If you find a trial that already
      converted, check the terms &mdash; many providers will refund the most
      recent charge if you cancel within 7&ndash;14 days and ask politely.
    </p>

    <h2>Step 5: Consolidate with family and bundle plans</h2>
    <p>
      Family plans are the single highest-leverage move. A $17.99 family music
      plan split four ways is $4.50/person &mdash; less than half the solo
      rate. Do the same audit across your household and look for:
    </p>
    <ul>
      <li>Music &amp; video streaming family tiers</li>
      <li>Cloud storage family shares (iCloud, Google One)</li>
      <li>Password manager family plans (often cheaper than 2 solo)</li>
      <li>Warehouse-club memberships shared across generations</li>
      <li>Bundle deals (streaming + wireless, internet + TV)</li>
    </ul>

    <h2>Step 6: Run the cancellation workflow</h2>
    <p>
      Cancellation UX is adversarial by design. Block 30 minutes, make a list,
      and go in order. For each one:
    </p>
    <ul>
      <li>Screenshot the cancellation confirmation</li>
      <li>Save the confirmation email</li>
      <li>Remove the card on file if possible</li>
      <li>Note the next billing date &mdash; watch for a &ldquo;surprise&rdquo; final charge</li>
    </ul>
    <p>
      If a service hides its cancel button, searching <code>cancel [service name] subscription</code>
      usually surfaces the exact path. Under US federal rules, companies must
      honor cancellation requests &mdash; a &ldquo;save offer&rdquo; is not a
      requirement to answer.
    </p>

    <h2>Step 7: Negotiate the keepers</h2>
    <p>
      For the subscriptions that survive the audit, 10 minutes on chat can
      often shave 20&ndash;30% via retention offers. Key phrases:
      &ldquo;thinking of cancelling,&rdquo; &ldquo;I see a better deal at,&rdquo;
      &ldquo;what loyalty offers do you have.&rdquo; Insurance, wireless, and
      cable respond especially well.
    </p>

    <h2>Step 8: Build a subscription register</h2>
    <p>
      Keep a simple spreadsheet: service, category, monthly cost, annual cost,
      renewal date, rating, notes. Update it every quarter. Over a year
      you&rsquo;ll see patterns &mdash; which categories creep, which trials
      converted, which price hikes slipped past you. That register is the
      most valuable artifact of the whole audit.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Three patterns show up constantly. First, auditing only the big names
      while ignoring $3&ndash;5 charges &mdash; a dozen of those is $700 a year.
      Second, cancelling verbally and not getting written confirmation, then
      watching the charge recur. Third, signing up for an annual plan to
      &ldquo;save money&rdquo; on something you won&rsquo;t use past month
      three. Annual plans only save money if you&rsquo;d confidently re-buy
      them on day 180.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/subscription-cost-calculator">Subscription cost calculator</a>
      <a href="/tools/budget-calculator">Budget calculator</a>
      <a href="/tools/smoking-cost-calculator">Smoking cost calculator</a>
    </p>
  </>
);
