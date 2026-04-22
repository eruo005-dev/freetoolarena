import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Most first-time racers go out too fast, blow up at the halfway
      mark, and finish far slower than their fitness suggests they
      should. The fix isn&rsquo;t more training — it&rsquo;s a pacing
      plan that matches your actual aerobic capacity, the course
      profile, and race-day conditions. This guide walks through how
      to set a realistic goal pace, how to split it across the race,
      and the tactical rules that prevent bonking.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Step 1 — find your realistic goal pace</h2>
    <p>
      Pace should come from <strong>recent race data or a threshold
      test</strong>, not hope. Three ways to find yours:
    </p>
    <p>
      <strong>(1) Recent race conversion.</strong> A recent 5K time
      predicts longer distances reasonably well. Rough multipliers:
    </p>
    <p>
      <strong>10K time ≈ 5K time × 2.10</strong> (so 22:00 5K →
      46:12 10K).
    </p>
    <p>
      <strong>Half marathon ≈ 5K × 4.67</strong> (22:00 5K →
      1:42:45).
    </p>
    <p>
      <strong>Full marathon ≈ 5K × 9.80</strong> (22:00 5K → 3:35:36).
    </p>
    <p>
      These assume similar training volume for the longer distance.
      If you trained for 5K and jump to a marathon cold, the marathon
      will be much slower than the formula predicts.
    </p>
    <p>
      <strong>(2) VDOT tables.</strong> Jack Daniels&rsquo; VDOT system
      (from <em>Daniels&rsquo; Running Formula</em>) converts any recent
      race into an equivalent across all distances. Free online
      calculators use this.
    </p>
    <p>
      <strong>(3) Lactate threshold pace.</strong> The pace you can
      sustain for ~1 hour all-out is your lactate threshold. Half
      marathon pace is close to threshold; marathon pace is about
      15–30 sec/mile slower than threshold.
    </p>

    <h2>Step 2 — decide your pacing strategy</h2>
    <p>
      <strong>Even split (identical pace throughout):</strong> most
      efficient pacing in terms of physics. Hard to execute because
      you usually feel fresh early and want to go faster.
    </p>
    <p>
      <strong>Negative split (second half faster):</strong> the
      gold-standard strategy for most distances. World records in
      marathons are almost always run with negative splits. Start 5–10
      sec/mile slower than goal, finish 5–15 sec/mile faster than
      goal. Requires discipline the first 5K.
    </p>
    <p>
      <strong>Positive split (first half faster):</strong> what
      happens by default if you don&rsquo;t plan. Usually leads to
      blowup. Not a strategy, just a failure mode.
    </p>
    <p>
      <strong>Strategy for race day:</strong> pick negative-split
      target. First 5–10% of race at +10 sec/mile slower than goal
      pace, middle at goal pace, final 20% at goal pace or faster if
      you have it.
    </p>

    <h2>Step 3 — split the race into chunks</h2>
    <p>
      Don&rsquo;t think about the full distance. Break it into
      segments you&rsquo;ve already run in training.
    </p>
    <p>
      <strong>Marathon:</strong> 4 × 10K + 2.2K. Hit planned splits at
      each 10K mark. If 15 sec slow through 10K, don&rsquo;t try to
      make it up; hold goal pace. If 30 sec fast, slow down
      immediately — you&rsquo;re cashing a check that will bounce
      later.
    </p>
    <p>
      <strong>Half marathon:</strong> 3 × 7K approx. First 7K:
      controlled, slight restraint. Middle 7K: goal pace. Final 7K:
      goal pace or faster if legs allow.
    </p>
    <p>
      <strong>10K:</strong> 3 × 5-min efforts (rough). First 5 min:
      don&rsquo;t get swept up by the start. Middle: find rhythm.
      Final: empty the tank last 1-2K.
    </p>
    <p>
      <strong>5K:</strong> Slight negative split works but mainly: hold
      threshold pace from km 1 onward. It will feel hard; that&rsquo;s
      the point.
    </p>

    <h2>Course and weather adjustments</h2>
    <p>
      <strong>Hills.</strong> Go by effort, not pace. On uphills, pace
      slows 15–30 sec/mile; on downhills, pace speeds 10–20 sec/mile.
      Don&rsquo;t fight to hold pace up hills — you&rsquo;ll blow up.
      Run uphill steady, let downhills come to you.
    </p>
    <p>
      <strong>Heat.</strong> Over 60°F / 15°C, expect 5–10 sec/mile
      slower per 10°F rise. A 75°F marathon is typically 2–4 min
      slower than the same fitness at 55°F.
    </p>
    <p>
      <strong>Humidity.</strong> High humidity (&gt;70%) effectively adds
      to heat penalty. Your body can&rsquo;t cool as efficiently.
    </p>
    <p>
      <strong>Wind.</strong> Headwinds cost about 5 sec/mile per 10
      mph of wind. Tailwinds give back about half that.
    </p>
    <p>
      <strong>Altitude.</strong> Above 4,000 feet, reduce pace
      expectation 5–10 sec/mile per 2,000 feet above your home
      elevation, more for races above 6,000 feet.
    </p>

    <h2>Fueling and hydration pace</h2>
    <p>
      Pacing isn&rsquo;t just running speed — it&rsquo;s caloric and
      fluid intake over time:
    </p>
    <p>
      <strong>Marathon and longer:</strong> 30–60g carbs per hour
      starting at minute 30–45. Skip the first aid station, take every
      one after that.
    </p>
    <p>
      <strong>Half marathon:</strong> one gel at 45 min if practiced;
      otherwise just hydrate.
    </p>
    <p>
      <strong>10K and shorter:</strong> no fueling needed; don&rsquo;t
      drink more than a sip (stomach sloshing will slow you more than
      hydration helps).
    </p>
    <p>
      <strong>Hydration:</strong> in a cool race, drink when thirsty
      at aid stations. In heat, drink at every station regardless of
      thirst.
    </p>

    <h2>The taper — the forgotten pacing factor</h2>
    <p>
      Your race-day pace depends on race-day legs, which depend on the
      taper. Common taper guidance:
    </p>
    <p>
      <strong>Marathon:</strong> 3-week taper. Week 3 out: 80% volume,
      full intensity. Week 2: 60% volume. Week 1: 40% volume, very
      short race-pace work.
    </p>
    <p>
      <strong>Half marathon:</strong> 10–14 days. Reduce volume 30–40%
      but keep some race-pace running.
    </p>
    <p>
      <strong>10K:</strong> 7–10 days light taper. Last hard workout
      4–5 days out.
    </p>
    <p>
      <strong>5K:</strong> 5 days very light taper. Last intensity 3
      days out.
    </p>
    <p>
      The worst pacing plan can&rsquo;t rescue bad taper legs; the
      best training can&rsquo;t rescue bad pacing. Both matter.
    </p>

    <h2>The mental-checkpoint trick</h2>
    <p>
      Most runners have one spot in every race where things get hard
      and the mind starts bargaining for a slower pace. For marathons,
      it&rsquo;s usually miles 18–22. For halfs, miles 9–11. For 10K,
      the 4th kilometer. Plan for it in advance: a specific mantra, a
      song, a memory, a cue to just hold pace for the next mile.
    </p>
    <p>
      Pacing discipline at the checkpoint is the difference between a
      PR and a blowup. The fitness is already there; the question is
      whether you execute.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Enter your target time or pace into the{" "}
      <a href="/tools/running-pace-calculator">running pace
      calculator</a> to see splits for every km or mile. Use the{" "}
      <a href="/tools/calorie-calculator">calorie calculator</a> to
      estimate your race-day fuel needs, and the{" "}
      <a href="/tools/stopwatch">stopwatch</a> for interval workouts
      leading into the race.
    </p>
  </>
);
