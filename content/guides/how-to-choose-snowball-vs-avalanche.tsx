import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      There are two mainstream strategies for paying off multiple debts at
      once — the <strong>snowball</strong> (smallest balance first) and
      the <strong>avalanche</strong> (highest interest rate first). The
      math favors avalanche, the psychology favors snowball, and choosing
      the wrong one for your brain often causes people to abandon the plan
      entirely. This guide walks through the math, the behavioral
      evidence, and the hybrid approach that usually wins in practice.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The two strategies in one sentence each</h2>
    <p>
      <strong>Snowball:</strong> List debts by balance, smallest first.
      Pay minimums on everything, throw every extra dollar at the
      smallest. When it&rsquo;s paid off, roll that payment into the next
      smallest. Repeat until you&rsquo;re debt-free.
    </p>
    <p>
      <strong>Avalanche:</strong> List debts by interest rate, highest
      first. Same minimums-everywhere rule, extra dollars go to highest
      rate. Roll payments as each is paid off. Mathematically optimal.
    </p>

    <h2>A worked comparison</h2>
    <p>
      Three debts, $800/month available:
    </p>
    <p>
      <strong>Credit card A:</strong> $2,500 @ 22%, min $75/mo.
    </p>
    <p>
      <strong>Credit card B:</strong> $6,000 @ 18%, min $150/mo.
    </p>
    <p>
      <strong>Auto loan:</strong> $12,000 @ 5.5%, min $280/mo.
    </p>
    <p>
      Total minimums: $505/mo. Extra: $295/mo.
    </p>
    <p>
      <strong>Snowball</strong> (smallest first = Card A): Card A paid
      off in ~7 months. Then roll $75 min + $295 extra = $370 into
      Card B on top of $150 min → $520/mo on Card B; paid off in ~12
      months from that point. Then all into auto loan.{" "}
      <strong>Total payoff: ~32 months. Total interest paid: ~$2,480.</strong>
    </p>
    <p>
      <strong>Avalanche</strong> (highest rate first = Card A — same in
      this case because it has highest rate AND smallest balance):
      identical to snowball for this example.{" "}
      <strong>Total payoff: 32 months. Total interest: $2,480.</strong>
    </p>
    <p>
      But if instead Card A were $8,000 @ 22% and Card B were $2,500 @
      18%:
    </p>
    <p>
      <strong>Snowball</strong> kills Card B first (smallest) and saves
      ~$200 less interest than avalanche over the life of the plan.
      <strong>Avalanche</strong> kills the 22% card first (highest
      rate). On identical total monthly payment, avalanche saves roughly
      <strong> 3–8% in total interest</strong> vs snowball — in this
      example, ~$300–800 depending on balances and term.
    </p>

    <h2>When avalanche wins big</h2>
    <p>
      Avalanche produces the biggest mathematical savings when:
    </p>
    <p>
      <strong>You have a high-rate debt with a big balance.</strong> A
      $20,000 credit card at 25% burns real money while you&rsquo;re
      paying off a $1,000 store card first.
    </p>
    <p>
      <strong>Interest rates span a wide range.</strong> 5% vs 28% creates
      much bigger optimality differences than 16% vs 18%.
    </p>
    <p>
      <strong>The debt horizon is long.</strong> The longer you&rsquo;ll be
      paying, the more interest-rate optimization compounds.
    </p>

    <h2>When snowball wins in practice</h2>
    <p>
      The avalanche-is-optimal math is undisputed. But a 2012 Kellogg
      School of Management study (Gal &amp; McShane) found that people
      executing the snowball method paid off <em>more</em> total debt
      than avalanche executors, because the early wins kept them
      motivated and prevented quitting. If you quit an avalanche plan
      at month 8 because you&rsquo;re demoralized, you&rsquo;ve saved
      zero dollars. If you finish a snowball plan, the mathematically
      &ldquo;suboptimal&rdquo; strategy beats the optimal one you
      abandoned.
    </p>
    <p>
      Snowball suits you if: you have 5+ debts (makes early wins
      frequent), you&rsquo;ve quit past plans, you&rsquo;re coming out of
      financial trauma and need wins to rebuild confidence, or the
      interest rates are clustered tight enough that the math difference
      is &lt; $500 total.
    </p>

    <h2>The hybrid most finance writers actually recommend</h2>
    <p>
      <strong>Pay off any debt smaller than $1,000 first</strong>
      (regardless of rate) to clear mental overhead and build momentum,
      then switch to avalanche for the remaining debts. You get one
      fast win, then you&rsquo;re on the optimal track.
    </p>
    <p>
      Another hybrid: <strong>tackle the one that&rsquo;s killing your
      credit score first.</strong> High utilization on a revolving account
      (above 30% of limit) is doing active damage to your credit; paying
      it down might unlock a balance transfer or refinance that dominates
      either pure strategy.
    </p>

    <h2>Always refinance or consolidate where possible</h2>
    <p>
      Before optimizing the order of payoff, check whether you can
      refinance the whole stack into a lower rate:
    </p>
    <p>
      <strong>0% balance transfer</strong> — credit cards with 12–21
      month intro periods. Transfer fee of 3–5%. Only works if you
      genuinely pay it off during the promo period; after that it resets
      to a regular APR and you&rsquo;re in a worse place.
    </p>
    <p>
      <strong>Personal loan for debt consolidation</strong> — fixed rate
      typically 7–20% depending on credit. Turns multiple revolving
      debts into one installment loan with a fixed payoff date.
    </p>
    <p>
      <strong>Home equity (HELOC or cash-out refi)</strong> — cheapest
      rate, but now your debt is secured by your house. Only for
      borrowers with stable income who won&rsquo;t rack the cards back
      up afterwards.
    </p>

    <h2>The tactical rules either strategy requires</h2>
    <p>
      <strong>(1) Stop adding to the pile.</strong> Freeze new credit card
      spending during payoff. The debt-paydown math fails immediately if
      balances keep growing.
    </p>
    <p>
      <strong>(2) Pay more than the minimum on the target debt.</strong>
      Whatever extra dollars you have each month go here. Minimum-only
      on cards can take 15+ years to pay off.
    </p>
    <p>
      <strong>(3) Auto-pay minimums everywhere</strong> so you don&rsquo;t
      damage credit with a missed payment on a non-target debt.
    </p>
    <p>
      <strong>(4) Keep a small emergency fund ($1k)</strong> during
      payoff. Without it, any car repair or medical bill goes back on
      a card and undoes progress.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Enter your debts, rates, and minimums into the{" "}
      <a href="/tools/debt-payoff-calculator">debt payoff calculator</a>{" "}
      — it shows total payoff time and interest paid under both strategies
      side by side, so you can see the exact dollar difference. Pair with
      the <a href="/tools/emergency-fund-calculator">emergency fund
      calculator</a> to size that $1k buffer, and see our{" "}
      <a href="/guides/how-to-pay-off-debt-fast">pay off debt fast guide</a>{" "}
      for the full approach.
    </p>
  </>
);
