import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Waking up groggy isn&rsquo;t about how long you slept — it&rsquo;s
      about where in a sleep cycle your alarm went off. Sleep moves
      through 90-minute cycles of light, deep, and REM sleep. Waking
      mid-cycle (especially mid-deep-sleep) feels brutal; waking at
      the end of one feels clean. Timing your bedtime to a planned
      wake-up, or vice versa, is one of the cheapest sleep
      interventions available — no supplements, no gadgets, just
      arithmetic. This guide covers how sleep cycles actually work,
      the math behind cycle-based timing, practical usage (including
      nap timing), when the simple model breaks, and the real
      limits of what cycle timing can and can&rsquo;t fix.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Sleep cycle basics</h2>
    <p>
      A full sleep cycle runs roughly 90 minutes and moves through
      four stages:
    </p>
    <p>
      <strong>N1 (light sleep, ~5 min):</strong> transition from
      wake to sleep. Easy to be woken.
    </p>
    <p>
      <strong>N2 (light sleep, ~20 min):</strong> body temperature
      drops, heart rate slows. Most of total sleep time lives here.
    </p>
    <p>
      <strong>N3 (deep sleep, ~30 min):</strong> slow-wave sleep.
      Physical recovery, immune function, growth hormone. Hardest
      to wake from. Dominant in the first third of the night.
    </p>
    <p>
      <strong>REM (~20 min per cycle, longer later):</strong> dream
      sleep. Memory consolidation, learning. Dominant in the last
      third of the night. Eyes move rapidly under closed lids;
      muscles are paralyzed.
    </p>
    <p>
      The cycle is not identical across the night. Early cycles are
      deep-sleep-heavy; later cycles are REM-heavy.
    </p>

    <h2>Why waking at cycle end feels good</h2>
    <p>
      <strong>Sleep inertia</strong> is the grogginess after
      waking. It&rsquo;s severe when you&rsquo;re pulled from N3
      (deep sleep) — cortisol and adrenaline haven&rsquo;t caught
      up; your brain is still flushing adenosine.
    </p>
    <p>
      Wake at the end of a cycle (late REM or transition to light
      sleep) and you&rsquo;re closer to the natural wake state.
      Sleep inertia lasts a few minutes instead of an hour.
    </p>

    <h2>The math — backward planning</h2>
    <p>
      <strong>Need to wake at 6:30 AM?</strong>
    </p>
    <p>
      5 cycles (7.5 hours of sleep) + ~15 min to fall asleep →{" "}
      bedtime 10:45 PM.
    </p>
    <p>
      6 cycles (9 hours) + 15 min → bedtime 9:15 PM. Probably too
      much for most adults.
    </p>
    <p>
      4 cycles (6 hours) + 15 min → bedtime 12:15 AM. Short but
      you&rsquo;ll wake clean.
    </p>
    <p>
      <strong>Rule of thumb:</strong> 4, 5, or 6 cycles — never
      aim for something in between.
    </p>

    <h2>Forward planning — bedtime first</h2>
    <p>
      <strong>Going to bed at 11:00 PM?</strong>
    </p>
    <p>
      Assume 15 min to fall asleep. Cycles start ~11:15.
    </p>
    <p>
      Cycle 1 ends ~12:45 AM.
      <br />
      Cycle 2 ends ~2:15 AM.
      <br />
      Cycle 3 ends ~3:45 AM.
      <br />
      Cycle 4 ends ~5:15 AM (6 hrs sleep).
      <br />
      Cycle 5 ends ~6:45 AM (7.5 hrs sleep). Target.
      <br />
      Cycle 6 ends ~8:15 AM (9 hrs sleep).
    </p>
    <p>
      Set your alarm for one of the cycle-end times, not between
      them.
    </p>

    <h2>Sleep onset time matters</h2>
    <p>
      The 15-minute fall-asleep assumption is the weakest link in
      cycle math. Falling asleep can take 5 to 60+ minutes.
    </p>
    <p>
      <strong>If you fall asleep fast:</strong> shift cycle
      calculations earlier by 10-15 minutes.
    </p>
    <p>
      <strong>If it takes you 30+ minutes:</strong> plan backward
      from your typical sleep-onset time, not light-out time.
    </p>
    <p>
      <strong>Track for a week</strong> to learn your real
      sleep-onset. Most fitness trackers estimate this reasonably
      well (Apple Watch, Oura, Whoop).
    </p>

    <h2>Individual cycle variance</h2>
    <p>
      90 minutes is the population average. Individual cycles vary
      from 70 to 110 minutes. Cycle length also changes across the
      night — earlier cycles lean short, later cycles lean long.
    </p>
    <p>
      <strong>Practical implication:</strong> cycle timing is a
      rough guide, not a stopwatch. A 15-minute alarm wake window
      is usually within one person&rsquo;s cycle-end range.
    </p>
    <p>
      Sleep trackers with smart alarms (Oura, Apple Watch,
      Sleep Cycle app) detect actual cycle phase and wake you
      during the lightest sleep in a configurable window. Better
      than fixed-time alarms for most people.
    </p>

    <h2>Nap timing</h2>
    <p>
      Short naps and long naps work through different mechanisms:
    </p>
    <p>
      <strong>20-minute power nap:</strong> stays in N1/N2. Wakes
      easy, no grogginess, small cognitive bump. Ideal for
      afternoon energy without disrupting nighttime sleep.
    </p>
    <p>
      <strong>90-minute nap:</strong> complete sleep cycle. Includes
      REM. Works for sleep debt recovery. Wake at cycle end → feel
      refreshed.
    </p>
    <p>
      <strong>Avoid 30-60 min naps.</strong> You&rsquo;ll hit N3
      (deep sleep) but wake mid-cycle → severe sleep inertia. The
      classic &ldquo;nap that made me feel worse.&rdquo;
    </p>
    <p>
      <strong>Nap timing matters too:</strong> naps in the 1-3 PM
      window align with natural circadian dip. Naps after 4 PM
      start stealing from nighttime sleep pressure.
    </p>

    <h2>When cycle timing matters less</h2>
    <p>
      <strong>Severe sleep deprivation:</strong> if you&rsquo;re
      running on 4 hours total, a cycle-end wake is still better
      than mid-cycle, but you&rsquo;ll feel bad regardless. Fix the
      total amount.
    </p>
    <p>
      <strong>Shift workers with inverted schedules:</strong> cycle
      math applies but your circadian rhythm is fighting you.
      Timing matters less than consistency and darkness/light
      management.
    </p>
    <p>
      <strong>Medication-affected sleep:</strong> sleep aids,
      antihistamines, alcohol all distort cycle structure. Counts
      and timing break down.
    </p>
    <p>
      <strong>Sleep apnea:</strong> fragments cycles severely. Your
      tracker may say &ldquo;5 cycles&rdquo; but actual restorative
      sleep could be 30%. Treat the apnea, not the timing.
    </p>

    <h2>Total sleep still matters more</h2>
    <p>
      Cycle timing is a tuning layer on top of enough total sleep.
      If you&rsquo;re sleeping 5 hours a night, perfectly timed
      wakes won&rsquo;t compensate for accumulated sleep debt.
    </p>
    <p>
      Most adults need 7-9 hours (5-6 cycles). Teens need 8-10
      (5-7 cycles). Children need 9-12+. Elite athletes and rapid
      learners often need more.
    </p>
    <p>
      <strong>Sleep debt compounds.</strong> 6 hours nightly for a
      week ≈ sleeping drunk. No cycle magic fixes this; only extra
      sleep does.
    </p>

    <h2>Light and dark — the missing piece</h2>
    <p>
      Cycle timing assumes you fall asleep and wake at your
      planned times. That assumption breaks if your circadian
      rhythm is misaligned.
    </p>
    <p>
      <strong>Morning light</strong> (bright, within 30 min of
      waking) advances your circadian clock — makes you feel
      sleepy earlier.
    </p>
    <p>
      <strong>Evening darkness</strong> (dim light 2 hours before
      bed, no phone in bed) raises melatonin → faster sleep onset.
    </p>
    <p>
      <strong>Blue light at night</strong> suppresses melatonin.
      Screens are the biggest offender. Dim mode or glasses help;
      physical distance helps more.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Treating cycles as exact.</strong> 90 minutes is
      average, not prescribed. Use it as a rough guide, not a
      stopwatch.
    </p>
    <p>
      <strong>Ignoring sleep onset time.</strong> Planning from
      lights-out rather than estimated sleep-onset shifts every
      cycle by 15-45 minutes.
    </p>
    <p>
      <strong>Optimizing timing while underslept.</strong> If
      you&rsquo;re short 2 hours, the priority is more sleep, not
      better-timed sleep.
    </p>
    <p>
      <strong>Setting multiple alarms across cycles.</strong> The
      snooze habit pulls you into fragmented N1 sleep that feels
      worse than a single clean wake.
    </p>
    <p>
      <strong>Napping too long.</strong> 30-60 min is the worst
      window — hit N3 without completing a cycle.
    </p>
    <p>
      <strong>Ignoring sleep consistency.</strong> Same bedtime
      every night beats perfect cycle math on an inconsistent
      schedule. Your body clock locks in.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Plan backward from your wake time with the{" "}
      <a href="/tools/sleep-cycle-calculator">sleep cycle calculator</a>.
      Pair with the{" "}
      <a href="/tools/time-zone-converter">time zone converter</a>
      {" "}to handle jet lag, and the{" "}
      <a href="/tools/pomodoro-timer">pomodoro timer</a> for daytime
      energy management that complements good sleep.
    </p>
  </>
);
