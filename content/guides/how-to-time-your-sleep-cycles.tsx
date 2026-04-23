import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      You don&rsquo;t sleep in one continuous block &mdash; you cycle through
      stages roughly every 90 minutes, and waking up in the middle of deep
      sleep is the difference between &ldquo;ugh&rdquo; and &ldquo;okay,
      let&rsquo;s go.&rdquo; Timing your alarm to coincide with the end of a
      cycle rather than the middle is the cheapest way to feel rested without
      sleeping more. The catch: cycle length is actually 85&ndash;110 minutes
      depending on the person and the night, so the math is approximate.
      This guide covers what happens inside a cycle, how to pick a wake time
      that lands on a cycle boundary, the role of REM and deep sleep, the
      limits of the 90-minute rule, and what sleep debt really costs.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The four stages of sleep</h2>
    <p>
      Each cycle moves through:
    </p>
    <ul>
      <li>
        <strong>N1</strong> &mdash; light drift-off, 1&ndash;5 minutes. Easy
        to wake from; you might not even notice you slept.
      </li>
      <li>
        <strong>N2</strong> &mdash; light sleep, heart rate drops, body
        temperature falls. ~45% of total sleep time.
      </li>
      <li>
        <strong>N3</strong> &mdash; deep (slow-wave) sleep. Physical repair,
        growth hormone, immune work. Hardest to wake from. ~15&ndash;20% of
        total sleep, concentrated in the first third of the night.
      </li>
      <li>
        <strong>REM</strong> &mdash; rapid eye movement, dreams, memory
        consolidation. ~20&ndash;25% of total sleep, concentrated in the
        last third of the night.
      </li>
    </ul>

    <h2>A typical night</h2>
    <pre>{`Bedtime  0 min  N1 -> N2 -> N3 -> N3 -> N2 -> REM    (cycle 1: ~90 min, deep-heavy)
        90 min  N2 -> N3 -> N2 -> REM                (cycle 2: ~90 min, slightly less deep)
       180 min  N2 -> N3 -> N2 -> REM                (cycle 3)
       270 min  N2 -> REM                            (cycle 4: REM-heavy)
       360 min  N2 -> REM                            (cycle 5: even more REM)
       450 min  WAKE`}</pre>
    <p>
      Early cycles are deep-sleep heavy. Late cycles are REM-heavy. Sleeping
      only four hours cuts your REM time in half; sleeping only two hours
      cuts REM to essentially zero.
    </p>

    <h2>The wake-at-cycle-end trick</h2>
    <p>
      If you wake at the end of a cycle (in N1 or late REM), you feel
      relatively alert. Wake in the middle of N3 and you get sleep inertia
      &mdash; 15&ndash;60 minutes of fog, grogginess, bad decisions. The
      &ldquo;sleep calculator&rdquo; approach: work backward from the time
      you want to wake up in 90-minute chunks, add ~14 minutes to fall
      asleep, pick a bedtime.
    </p>
    <pre>{`Wake at 6:30 AM? Count back 90-min cycles:
5 cycles = 7.5 hr  --> bedtime 10:45 PM  (plus 14 min to fall asleep = 10:31)
4 cycles = 6.0 hr  --> bedtime 12:15 AM
3 cycles = 4.5 hr  --> bedtime 1:45 AM   (emergency only)`}</pre>
    <p>
      Landing on 4.5 hr of well-timed sleep can feel better than 5 hr that
      ends mid-deep-sleep. Emphasis on <em>can</em> &mdash; chronic short
      sleep still racks up debt regardless of timing.
    </p>

    <h2>Why the 90-minute rule is approximate</h2>
    <p>
      Cycle length varies:
    </p>
    <ul>
      <li>Individuals: 85&ndash;110 minutes</li>
      <li>Within one night: early cycles shorter, late cycles longer</li>
      <li>After alcohol or late meals: disrupted, unpredictable</li>
      <li>After exercise or sleep deprivation: deep-sleep heavy, longer N3 chunks</li>
    </ul>
    <p>
      Your personal cycle is probably 90 plus-or-minus 15 minutes. If the
      85-minute rule of thumb doesn&rsquo;t help you, try 95 or 100.
    </p>

    <h2>Fall-asleep time matters too</h2>
    <p>
      Most people take 10&ndash;20 minutes to actually fall asleep. If
      you&rsquo;re in bed scrolling for 45 minutes first, your real cycle
      start is 45 minutes after bedtime, not at bedtime. Decide when
      you&rsquo;re actually sleeping, not when you got horizontal.
    </p>

    <h2>REM and cognitive performance</h2>
    <p>
      REM is when memory consolidation, emotional processing, and
      creative-leap insights happen. Skipping REM through late-night work
      or short sleeps has specific costs:
    </p>
    <ul>
      <li>Emotional reactivity spikes (amygdala +60%)</li>
      <li>Creative problem-solving drops</li>
      <li>Learning consolidation suffers</li>
      <li>Mood lability, lower frustration tolerance</li>
    </ul>
    <p>
      Since REM is concentrated in the last third of the night,
      shortchanging that third hurts disproportionately.
    </p>

    <h2>Deep sleep and physical recovery</h2>
    <p>
      N3 is where growth hormone is released, tissue repairs, and the
      glymphatic system clears metabolic waste from the brain. Cutting the
      first third of your night (late bedtime) hurts recovery even if you
      still sleep 8 hours total.
    </p>
    <p>
      Athletes: prioritize early bedtimes on hard training days. You
      can&rsquo;t make up missed N3 by sleeping later.
    </p>

    <h2>Sleep debt</h2>
    <p>
      Debt accumulates with any night under your personal need (typically
      7&ndash;9 hours for adults). You can&rsquo;t fully repay it with one
      weekend sleep-in.
    </p>
    <pre>{`Monday-Friday, 6 hr/night:   -10 hr debt by Friday
Saturday & Sunday, 10 hr:    +2 hr surplus each
Net:                          still -6 hr behind`}</pre>
    <p>
      Studies show reaction time deficits from a 5-day sleep restriction
      persist for at least a week, even with full nights in between.
    </p>

    <h2>Chronotype</h2>
    <p>
      Some people are genetically wired for earlier or later bedtimes. Rough
      categories:
    </p>
    <ul>
      <li>Larks (morning types): peak alertness 7&ndash;10 AM, tired by 10 PM</li>
      <li>
        Third-birds (most people): peak alertness 10 AM&ndash;2 PM, tired by
        11 PM&ndash;midnight
      </li>
      <li>
        Owls: peak alertness 6 PM&ndash;1 AM, not tired till 1&ndash;3 AM
      </li>
    </ul>
    <p>
      Fighting your chronotype with caffeine and willpower works short-term
      but raises cardiovascular risk. Align work schedule and bedtime with
      your type when you can.
    </p>

    <h2>Naps</h2>
    <p>
      Short naps (10&ndash;20 minutes) are N1/N2 only and leave you alert.
      Longer naps (60&ndash;90 minutes) include N3 and a bit of REM and
      deliver genuine recovery &mdash; but wake you groggy if the alarm
      interrupts N3.
    </p>
    <pre>{`Power nap:   10-20 min    (stay in light sleep)
Full cycle:  90 min       (wake at natural end)
Avoid:       30-60 min    (wake in deep sleep, groggy)`}</pre>

    <h2>Sleep trackers: helpful or not</h2>
    <p>
      Consumer sleep trackers are pretty good at bedtime, wake time, and
      total duration. They&rsquo;re mediocre at distinguishing sleep stages
      &mdash; the accuracy of the N3/REM classification is coin-flippy.
      Treat the stage breakdown as entertainment, not diagnosis. The useful
      signal is trend over weeks.
    </p>

    <h2>Caffeine and sleep timing</h2>
    <p>
      Caffeine has a half-life of 5&ndash;6 hours. A 3 PM coffee is still
      half there at 9 PM. It doesn&rsquo;t necessarily stop you falling
      asleep but suppresses deep sleep and fragments the night. Last-cup
      cutoff 8&ndash;10 hours before bed if you&rsquo;re sensitive.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Counting bedtime instead of sleep-time.</strong> Account for
      the 10&ndash;20 minutes it takes to actually fall asleep.
    </p>
    <p>
      <strong>Over-trusting the 90-minute rule.</strong> It&rsquo;s a
      heuristic. If it doesn&rsquo;t help you, try 100-minute spacing and
      see.
    </p>
    <p>
      <strong>Using naps to pay back debt.</strong> A 20-minute nap is not
      equivalent to an hour of missed sleep. Helpful for alertness, not
      for repair.
    </p>
    <p>
      <strong>Staying up late because REM is last.</strong> REM is in the
      last third of your <em>personal</em> night. Late bedtimes still cost
      you deep sleep.
    </p>
    <p>
      <strong>Fixating on timing and ignoring total duration.</strong> 6
      hours well-timed is still insufficient for most adults. Timing is a
      tiebreaker, not a substitute.
    </p>
    <p>
      <strong>Light and screens right before bed.</strong> Suppresses
      melatonin, pushes sleep onset later, messes with cycle timing.
    </p>
    <p>
      <strong>Alcohol as a sleep aid.</strong> Gets you to sleep faster,
      destroys REM in the second half of the night. Net negative for
      quality.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Pick a wake time or bedtime in the{" "}
      <a href="/tools/sleep-cycle-calculator">sleep cycle calculator</a>{" "}
      and it works out cycle-aligned alternatives. Pair with the{" "}
      <a href="/tools/pomodoro-timer">pomodoro timer</a> to structure the
      day so you actually get to bed on schedule, and the{" "}
      <a href="/tools/fasting-timer">fasting timer</a> if you&rsquo;re
      aligning eating windows with your chronotype too.
    </p>
  </>
);
