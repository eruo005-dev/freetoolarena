import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Caffeine is the most-used psychoactive drug on the planet, and
      also the one most users manage by vibes. The actual rules for
      getting the benefits without the crash, the jitter, and the
      wrecked sleep are boring but concrete: stay under 400 mg/day,
      respect the 5&ndash;6 hour half-life when choosing a cutoff,
      recognize when tolerance has turned the morning dose into a
      withdrawal patch, and adjust for the populations and
      medications that change the math. This guide covers the
      current safe-intake ceilings, the half-life math that predicts
      sleep disruption, how tolerance builds and resets, the tapering
      plan that avoids the withdrawal week, and the groups that need
      a lower ceiling than everyone else.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Daily ceilings</h2>
    <p>
      The consensus upper limits for healthy adults:
    </p>
    <pre>{`FDA / EFSA adults:         400 mg/day (~4 cups of brewed coffee)
Single dose:               200 mg       (EFSA &quot;safe single dose&quot;)
Pregnancy:                 200 mg/day   (halved)
Adolescents (12-18):       100 mg/day
Children (under 12):       not recommended, if anything &lt;2.5 mg/kg`}</pre>
    <p>
      400 mg is a ceiling, not a target. Most people feel best in the
      150&ndash;300 mg range. Pushing consistently toward 400 builds
      tolerance fast and eats into the remaining margin when you
      actually need the extra boost.
    </p>

    <h2>Where the milligrams hide</h2>
    <pre>{`Drip coffee, 8oz:              80-120 mg
Espresso shot:                 60-75 mg
Cold brew, 16oz:               200-300 mg (can be higher)
Black tea, 8oz:                40-70 mg
Green tea, 8oz:                30-50 mg
Matcha, 1 tsp:                 60-80 mg
Yerba mate, 8oz:               40-90 mg
Energy drink, 16oz:            150-300 mg
Pre-workout scoop:              150-300 mg
Dark chocolate, 1oz:           12-25 mg
Coca-Cola, 12oz:                35 mg
Mountain Dew, 12oz:             55 mg
Excedrin, 1 tablet:             65 mg
Caffeine pill (No-Doz):        200 mg`}</pre>
    <p>
      Cold brew and energy drinks are the usual sneaky over-shooters.
      A 20oz cold brew can be 400 mg by itself &mdash; your entire
      day&rsquo;s budget in one cup.
    </p>

    <h2>The 5&ndash;6 hour half-life</h2>
    <p>
      Caffeine clears on a predictable decay. Half-life in healthy
      adults averages about 5 hours (range 2&ndash;9 depending on
      liver enzymes, smoking, pregnancy, medications).
    </p>
    <pre>{`200 mg at noon, 5-hr half-life:
2 PM   150 mg
5 PM   100 mg
10 PM   50 mg   <-- still meaningfully stimulated
3 AM    25 mg   <-- fragments late-night sleep`}</pre>
    <p>
      This is why afternoon coffee wrecks sleep even when you can
      &ldquo;still fall asleep fine.&rdquo; You fall asleep; you just
      get worse sleep.
    </p>

    <h2>Cutoff before bed</h2>
    <p>
      Evidence-based cutoff: <strong>8&ndash;10 hours before intended
      sleep time</strong>, more if you&rsquo;re a slow metabolizer.
    </p>
    <pre>{`10 PM bedtime:    last caffeine at 12-2 PM
11 PM bedtime:    last caffeine at 1-3 PM
12 AM bedtime:    last caffeine at 2-4 PM`}</pre>
    <p>
      &ldquo;I can drink an espresso at 10 PM and sleep.&rdquo; You
      probably can fall asleep. Sleep studies show increased deep-sleep
      fragmentation even in habituated drinkers with late caffeine.
      The subjective feeling (&ldquo;I slept fine&rdquo;) lags the
      objective measurement.
    </p>

    <h2>Tolerance</h2>
    <p>
      Regular caffeine use downregulates adenosine receptors. Within
      7&ndash;14 days your &ldquo;normal alert&rdquo; becomes your
      &ldquo;caffeinated alert&rdquo; &mdash; the morning dose is now
      holding off withdrawal, not boosting baseline.
    </p>
    <p>
      Signs you&rsquo;re in tolerance territory:
    </p>
    <ul>
      <li>First cup feels like nothing; second cup feels like &ldquo;okay, awake&rdquo;</li>
      <li>Afternoon crash despite total intake of 300+ mg</li>
      <li>Weekends with a headache by 11 AM if you sleep in</li>
      <li>Doses keep creeping up</li>
    </ul>

    <h2>Tolerance reset</h2>
    <p>
      Full reset takes 7&ndash;14 days off. Shorter breaks (2&ndash;3
      days) partially reset but not fully. Options:
    </p>
    <p>
      <strong>Cold turkey.</strong> Works. First 2&ndash;4 days are
      rough (headache, fatigue, low mood). Day 5 onwards improves.
    </p>
    <p>
      <strong>Taper.</strong> Halve intake every 3 days until off.
      Milder withdrawal, slower reset.
    </p>
    <p>
      <strong>Targeted cycling.</strong> Heavy use weeks, then light
      use weeks. Some athletes use this to keep caffeine as an effective
      ergogenic aid rather than a baseline.
    </p>

    <h2>Withdrawal</h2>
    <pre>{`Onset:        12-24 hours after last dose
Peak:         24-48 hours
Duration:     2-9 days typical
Symptoms:     headache, fatigue, brain fog, irritability,
              low mood, reduced cognitive performance`}</pre>
    <p>
      Withdrawal is a legitimate reason caffeine is classified as a
      substance of dependence. It&rsquo;s real, predictable, and
      temporary. If you&rsquo;ve had the &ldquo;what happened to
      Monday&rdquo; experience after a coffee-free weekend,
      you&rsquo;ve had withdrawal.
    </p>

    <h2>Sensitive populations</h2>
    <p>
      Some groups metabolize caffeine slower or have lower safe
      ceilings:
    </p>
    <ul>
      <li>
        <strong>Pregnancy:</strong> half-life roughly doubles in the
        3rd trimester. 200 mg/day ceiling.
      </li>
      <li>
        <strong>Oral contraceptive users:</strong> half-life ~40%
        longer. Often surprises people.
      </li>
      <li>
        <strong>Liver disease:</strong> much slower clearance. Medical
        advice only.
      </li>
      <li>
        <strong>SSRIs / some antipsychotics / quinolone antibiotics:</strong>{" "}
        slower clearance or amplified jitter.
      </li>
      <li>
        <strong>Genetic slow metabolizers (CYP1A2 variants):</strong>{" "}
        ~10% of people clear caffeine much more slowly; afternoon
        coffee can genuinely keep them awake all night.
      </li>
      <li>
        <strong>Cardiac arrhythmias:</strong> consult clinician;
        caffeine can trigger episodes.
      </li>
    </ul>

    <h2>Caffeine before workouts</h2>
    <p>
      Evidence-based performance boost: 3&ndash;6 mg/kg body weight,
      30&ndash;60 minutes before exercise. For an 80kg person,
      that&rsquo;s 240&ndash;480 mg. Pre-workout scoops usually sit in
      this range intentionally.
    </p>
    <p>
      Effect: ~2&ndash;5% increase in endurance performance, improved
      power output, subjective reduction in perceived effort. Tolerance
      blunts the effect &mdash; athletes often cycle off for a week
      before competition to &ldquo;re-sensitize.&rdquo;
    </p>

    <h2>Interactions with hydration and sleep</h2>
    <p>
      Caffeine has a mild diuretic effect but is not net
      dehydrating for habitual drinkers. Don&rsquo;t worry about
      subtracting coffee from daily water intake at normal doses.
      Do worry about the second half of the day: even 100 mg after 3
      PM can fragment sleep for some people.
    </p>

    <h2>A sample schedule</h2>
    <pre>{`7:00 AM    wake
7:30 AM    first coffee (120 mg)
10:00 AM   second coffee or tea (80 mg)     -- daily total ~200 mg
12:00 PM   tea if wanted (50 mg)
2:00 PM    last caffeine, no more
10:00 PM   bedtime (8 hrs after cutoff)

Weekly total: ~1,400 mg  (well under ceiling, under-tolerance)`}</pre>

    <h2>Common mistakes</h2>
    <p>
      <strong>Counting only coffee.</strong> Tea, chocolate, pre-
      workout, energy drinks, medications all add up. A clean 200 mg
      from coffee plus a 300 mg pre-workout is 500, not 200.
    </p>
    <p>
      <strong>Assuming late caffeine is fine if you fall asleep.</strong>{" "}
      Sleep quality drops even without trouble falling asleep. Deep
      sleep specifically suffers.
    </p>
    <p>
      <strong>Trying to out-drink tolerance.</strong> Doubling dose
      rebuilds tolerance proportionally. The reset is the only route
      back to effectiveness.
    </p>
    <p>
      <strong>Cold turkey during a hard week.</strong> Three
      productive days gone. Taper, or time the quit for a low-stakes
      week.
    </p>
    <p>
      <strong>Ignoring cold brew concentration.</strong> Cold brew is
      often 2&ndash;3x the caffeine of regular drip. A 16oz cold brew
      is not a 16oz drip coffee.
    </p>
    <p>
      <strong>Energy drinks as hydration.</strong> They&rsquo;re a
      caffeine delivery system, not water. Drink water alongside.
    </p>
    <p>
      <strong>No cutoff time.</strong> Without a fixed
      &ldquo;last dose by&rdquo; rule, afternoon slumps pull you into
      caffeinating late, which ruins the next night&rsquo;s sleep,
      which causes the next afternoon slump.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Log the day&rsquo;s intake in the{" "}
      <a href="/tools/caffeine-intake-calculator">caffeine intake calculator</a>{" "}
      and it maps remaining blood levels against your bedtime. Watch
      total hydration in the{" "}
      <a href="/tools/water-intake-calculator">water intake calculator</a>{" "}
      alongside, and let the{" "}
      <a href="/tools/sleep-cycle-calculator">sleep cycle calculator</a>{" "}
      set the bedtime that your caffeine cutoff needs to respect.
    </p>
  </>
);
