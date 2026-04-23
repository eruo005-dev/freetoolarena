import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Heart-rate zones are the cleanest way to prescribe cardio intensity
      without relying on subjective effort. Knowing that Zone 2 is a
      different animal from Zone 4 lets you build a training week where
      easy days are actually easy and hard days are actually hard.
      Beginners usually push their easy runs too hard, which makes the
      hard days mediocre; using zones corrects that. The math is
      approximate &mdash; max heart rate varies by 10+ beats person to
      person &mdash; but even rough zones are better than running by feel
      alone. This guide covers the 220-age estimate, the more accurate
      Karvonen method, what happens physiologically in each zone, the
      lactate thresholds that anchor the system, and how to assign zones
      to your training days.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Max heart rate</h2>
    <p>
      Zones are all percentages of max HR (or HR reserve), so the first
      job is estimating max.
    </p>
    <pre>{`Fox & Haskell (1971):   HRmax = 220 - age
Tanaka et al (2001):    HRmax = 208 - 0.7 * age
Gellish et al (2007):   HRmax = 207 - 0.7 * age

For a 40-year-old:
220-age:  180 bpm
Tanaka:   180 bpm
Gellish:  179 bpm`}</pre>
    <p>
      The 220-age formula overestimates for younger adults and
      underestimates for older. Tanaka is slightly more accurate. All
      formulas have a standard error of ~10 bpm &mdash; your actual max
      could be anywhere in that range.
    </p>

    <h2>Measuring max for real</h2>
    <p>
      The most accurate approach is a field test. After a thorough
      warm-up:
    </p>
    <pre>{`Running:  4-min all-out effort, then 3-min easy, then 3-min all-out.
          Peak HR during the last minute of the second effort is close to max.

Cycling:  20-min all-out time trial. Peak HR at the end is often 5 bpm below max.

Treadmill ramp: increase gradient 1% per minute until failure. HR at failure = max.`}</pre>
    <p>
      These tests hurt. Don&rsquo;t do them cold, and don&rsquo;t do them
      if you have unscreened cardiovascular risk factors. An exercise
      stress test with a clinician is the safe version.
    </p>

    <h2>Resting heart rate</h2>
    <p>
      Measure first thing in the morning, before getting out of bed,
      before coffee. Average across 3&ndash;5 days.
    </p>
    <pre>{`Sedentary adult:     60-80 bpm
Recreational athlete: 55-65 bpm
Trained endurance:    40-55 bpm
Elite:               30-45 bpm`}</pre>
    <p>
      Resting HR is a rough measure of fitness. Dropping 5&ndash;10 bpm
      over months of training is a good sign. Suddenly higher resting
      HR (10+ bpm above baseline) suggests fatigue, illness, or
      overtraining.
    </p>

    <h2>Percentage of max (simple zones)</h2>
    <pre>{`Zone 1  50-60% HRmax   Active recovery, warmup
Zone 2  60-70% HRmax   Aerobic base, fat burning
Zone 3  70-80% HRmax   Tempo, aerobic power
Zone 4  80-90% HRmax   Threshold / lactate
Zone 5  90-100% HRmax  VO2max, short intervals`}</pre>
    <p>
      Example for HRmax 180:
    </p>
    <pre>{`Zone 1  90-108 bpm
Zone 2  108-126 bpm
Zone 3  126-144 bpm
Zone 4  144-162 bpm
Zone 5  162-180 bpm`}</pre>

    <h2>Karvonen method (HR reserve)</h2>
    <p>
      The percentage-of-max approach ignores your resting HR, which
      varies a lot across fitness levels. The Karvonen formula uses HR
      reserve (HRR), which is more personalized.
    </p>
    <pre>{`HRR = HRmax - HRrest
Target HR = (HRR * intensity%) + HRrest

For HRmax 180, HRrest 50, 70% intensity:
HRR = 130
Target = 130 * 0.70 + 50 = 141 bpm`}</pre>
    <p>
      Karvonen zones typically hit higher HR numbers than plain
      percentage-of-max for trained athletes, and they track effort
      more accurately.
    </p>

    <h2>What happens physiologically in each zone</h2>
    <p>
      <strong>Zone 1 (50&ndash;60% HRmax).</strong> Walking briskly,
      warming up. Blood is moving, joints are loosening. Sustainable
      indefinitely.
    </p>
    <p>
      <strong>Zone 2 (60&ndash;70%).</strong> Aerobic base. You can hold
      a full conversation. Primary fuel: fat. Builds mitochondria and
      capillary density. The zone endurance athletes spend 70&ndash;80%
      of their training in.
    </p>
    <p>
      <strong>Zone 3 (70&ndash;80%).</strong> Tempo. Conversation
      becomes short sentences. Fuel mix shifts toward carbs. The
      &ldquo;gray zone&rdquo; beginners usually run in and should avoid
      &mdash; too hard to recover, too easy to drive peak adaptations.
    </p>
    <p>
      <strong>Zone 4 (80&ndash;90%).</strong> Threshold. You can only
      say a couple of words. Lactate starts accumulating near your
      capacity to clear it. Threshold intervals improve sustainable
      race pace.
    </p>
    <p>
      <strong>Zone 5 (90&ndash;100%).</strong> VO2max. Full breathing,
      no talking. Intervals 1&ndash;5 minutes long. Builds peak oxygen
      delivery.
    </p>

    <h2>Lactate thresholds (LT1 and LT2)</h2>
    <p>
      More precise than HR zones. Zones are a proxy; thresholds are the
      underlying physiology.
    </p>
    <p>
      <strong>LT1</strong> (first lactate threshold, ~60&ndash;70%
      HRmax) is the border between pure aerobic and mixed metabolism.
      Easy-day pace should stay below LT1.
    </p>
    <p>
      <strong>LT2</strong> (second lactate threshold, ~85&ndash;92%
      HRmax) is the point where lactate accumulates faster than
      clearance. It&rsquo;s the fastest pace you can hold for roughly
      an hour. Threshold intervals live just above LT2.
    </p>
    <p>
      Lab testing measures these precisely. Field estimates: LT2 HR is
      usually within a few beats of your average HR for a 60-minute
      race effort.
    </p>

    <h2>Training prescriptions by zone</h2>
    <pre>{`Weekly distribution for a typical endurance athlete:
Zone 1-2  80%  (easy, long)
Zone 3    5%   (deliberately minimized)
Zone 4    10%  (threshold intervals)
Zone 5    5%   (VO2max intervals)`}</pre>
    <p>
      &ldquo;Polarized training&rdquo; &mdash; mostly very easy, a
      little very hard, almost nothing in between &mdash; outperforms
      &ldquo;threshold training&rdquo; (mostly Zone 3) in most
      endurance studies. Beginners tend to do the opposite and plateau.
    </p>

    <h2>Heart-rate drift</h2>
    <p>
      HR drifts up during long steady efforts even at constant pace.
      Causes: dehydration, heat, fatigue. A run that starts at 150 bpm
      and ends at 160 bpm at the same pace means your effort is
      actually climbing. In Zone 2 training, prioritize holding HR
      constant &mdash; that may mean slowing down in the second half.
    </p>

    <h2>Monitors and accuracy</h2>
    <p>
      <strong>Chest straps</strong> read the electrical signal and are
      the reference standard for accuracy.
    </p>
    <p>
      <strong>Wrist optical sensors</strong> use LEDs to detect blood
      flow &mdash; good at steady efforts, poor during intervals and
      weight training where the wrist moves or tenses. Can be off by
      20+ bpm during weightlifting.
    </p>
    <p>
      If zone training matters to you, wear a chest strap at least for
      interval and threshold work.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Trusting 220-age as gospel.</strong> Standard error ~10
      bpm. Plan to refine with a field test.
    </p>
    <p>
      <strong>Running all easy runs at Zone 3.</strong> Too hard to
      recover, not hard enough to trigger the peak adaptations. Keep
      Zone 2 boring.
    </p>
    <p>
      <strong>Using HRmax-based zones with a high resting HR.</strong>{" "}
      Switch to Karvonen; the numbers will actually match the effort.
    </p>
    <p>
      <strong>Ignoring HR drift on long runs.</strong> Constant pace
      with rising HR means rising effort. Let pace adjust.
    </p>
    <p>
      <strong>Wrist HR for intervals.</strong> Optical sensors lag and
      misread in hard efforts. Chest strap for intervals.
    </p>
    <p>
      <strong>Only training in Zone 4.</strong> Burns out quickly,
      skips the aerobic base. Most of your time should be easier, not
      harder.
    </p>
    <p>
      <strong>Using the same zones after gaining fitness.</strong>{" "}
      Resting HR drops and LT2 shifts. Reassess zones every 3&ndash;6
      months.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Plug in age and resting HR into the{" "}
      <a href="/tools/heart-rate-zone-calculator">heart rate zone calculator</a>{" "}
      for Karvonen zones in bpm. Convert pace at each zone with the{" "}
      <a href="/tools/running-pace-calculator">running pace calculator</a>,
      and check session caloric burn with the{" "}
      <a href="/tools/calorie-calculator">calorie calculator</a> when
      matching training load to nutrition.
    </p>
  </>
);
