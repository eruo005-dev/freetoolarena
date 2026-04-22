import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A cycle&rsquo;s fertile window is six days long — the five days
      before ovulation plus ovulation day itself — but pinpointing when
      that window opens takes more than counting days on a calendar.
      This guide covers the four tracking methods by accuracy (calendar,
      cervical mucus, basal body temperature, LH test strips), what each
      one actually tells you, and how to combine them for a picture
      that&rsquo;s reliable enough to plan around — whether you&rsquo;re
      trying to conceive or trying to avoid it.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Why the calendar method is a starting point, not an answer</h2>
    <p>
      Textbook cycles are 28 days long and ovulation happens on day 14.
      Real cycles vary — 21 to 35 days is considered normal, and the{" "}
      <em>same person&rsquo;s</em> cycles often vary 2–7 days month to
      month. If you predict your fertile window purely by &ldquo;cycle
      day 14,&rdquo; you&rsquo;ll miss it in any month where you
      ovulated on day 11 or day 18.
    </p>
    <p>
      The calendar method works for two things: (1) narrowing the window
      to a roughly ten-day range worth watching, and (2) a rough
      rhythm-method failure rate of 15–25% per year if used alone as
      contraception. Neither is good enough for precise conception
      planning. It&rsquo;s table-stakes — use it to know when to start
      looking, then switch to a body-signal method for the actual
      window.
    </p>

    <h2>Cervical mucus — free, underrated, reasonably accurate</h2>
    <p>
      Cervical mucus changes consistency across the cycle. Post-period,
      most people have little or none (&ldquo;dry days&rdquo;). As
      ovulation approaches, estrogen rises and mucus becomes stretchy,
      clear, and slippery — the &ldquo;egg-white cervical mucus&rdquo;
      (EWCM) described in fertility literature. After ovulation,
      progesterone thickens it again quickly.
    </p>
    <p>
      Peak EWCM is your strongest same-day ovulation signal that&rsquo;s
      free and requires no equipment. Most people find it reliable after
      2–3 cycles of deliberate tracking, though it takes practice to
      distinguish EWCM from normal discharge confidently. Perfect use
      alone as a contraceptive method (the Creighton or Billings systems)
      has a published failure rate around 1–3% per year — comparable to
      condoms — but real-world use drifts higher.
    </p>

    <h2>Basal body temperature (BBT) — confirmation, not prediction</h2>
    <p>
      Body temperature at rest rises by 0.3–0.6°F (0.2–0.3°C) <em>after</em>{" "}
      ovulation, due to progesterone. Track BBT every morning before
      getting out of bed using a dedicated BBT thermometer (more precise
      than a regular one), and plot it. Two consecutive days above the
      pre-ovulation baseline confirms ovulation happened.
    </p>
    <p>
      Key limitation: BBT confirms <em>after</em> ovulation, so by itself
      it&rsquo;s useless for timing intercourse for conception on the
      fertile day. Its real value is closing the loop — learning your own
      ovulation day pattern across months so your calendar predictions
      improve.
    </p>

    <h2>LH test strips — the most precise prediction</h2>
    <p>
      Luteinizing hormone (LH) surges 24–48 hours before ovulation.
      Over-the-counter LH test strips (also called OPKs — ovulation
      predictor kits) detect the surge in urine. A positive means
      ovulation is likely within the next 12–36 hours. Test daily,
      starting ~5 days before your expected ovulation day, through the
      day of the positive.
    </p>
    <p>
      Accuracy is high — the test itself is around 99% sensitive in
      clinical studies. The practical catch: some people have LH
      baseline variation, or PCOS-related elevated LH, that creates
      false positives. Pair with one other method (EWCM or BBT) for
      confirmation if you&rsquo;re getting confusing results across
      multiple cycles.
    </p>

    <h2>Combining methods — &ldquo;symptothermal&rdquo;</h2>
    <p>
      Using cervical mucus + BBT together (often called the
      symptothermal method) has one of the best efficacy profiles of any
      non-hormonal contraceptive method when used perfectly — under 1%
      failure per year. For conception planning, symptothermal plus LH
      strips closes every gap: LH strips predict the window opening, EWCM
      confirms the fertile day in real-time, and BBT confirms afterward
      that ovulation actually occurred.
    </p>

    <h2>The fertile window math</h2>
    <p>
      Sperm can live 3–5 days in fertile cervical mucus; the egg is viable
      for 12–24 hours after ovulation. So the fertile window is
      effectively the 5 days before ovulation plus ovulation day — 6 days
      total. Inside that window, conception probability per act of
      intercourse is highest the day before and day of ovulation
      (15–30%).
    </p>
    <p>
      For conception: intercourse every 1–2 days throughout the fertile
      window maximizes chances. Daily intercourse vs every-other-day
      doesn&rsquo;t meaningfully change outcomes. Stressing about perfect
      timing often causes more problems than the timing itself.
    </p>

    <h2>When to see a clinician</h2>
    <p>
      Under 35 and trying for 12 months without conception; 35 or over
      and trying for 6 months; cycles consistently shorter than 21 days
      or longer than 35 days; or any month without a detectable LH surge
      across 3+ consecutive tracked cycles. These are the flags for a
      reproductive-endocrinology or OB-GYN conversation about testing
      (hormone panels, AMH, semen analysis if applicable).
    </p>
    <p>
      For day-to-day tracking, use the{" "}
      <a href="/tools/ovulation-calculator">ovulation calculator</a> to
      predict your fertile window from cycle data, and the{" "}
      <a href="/tools/pregnancy-calculator">pregnancy calculator</a> once
      you&rsquo;re tracking a positive result. This guide is informational
      — always confirm health decisions with a qualified clinician.
    </p>
  </>
);
