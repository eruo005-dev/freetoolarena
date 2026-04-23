import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Speed conversions come up constantly — running pace, car
      speedometers, weather wind, aviation, boat knots, sports
      ball tracking. Each domain picks a different unit: mph in the
      US, km/h in most of the world, m/s in physics, knots at sea
      and in aviation, minutes-per-mile for runners. The conversions
      are mechanical, but the gotchas are in unit choice, significant
      figures, and the difference between instantaneous speed and
      pace. This guide covers the unit families, the conversion
      factors, when to use which, how to convert pace ↔ speed (not
      the same as unit conversion), and common pitfalls.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The common speed units</h2>
    <p>
      <strong>m/s (meters per second):</strong> SI base. Physics,
      engineering. 1 m/s = 3.6 km/h.
    </p>
    <p>
      <strong>km/h (kilometers per hour):</strong> most of the world
      for cars, bikes, everyday speed.
    </p>
    <p>
      <strong>mph (miles per hour):</strong> US and UK cars, weather,
      baseball pitches.
    </p>
    <p>
      <strong>knots (nautical miles per hour):</strong> marine,
      aviation, meteorology. 1 knot = 1.852 km/h ≈ 1.15 mph.
    </p>
    <p>
      <strong>ft/s (feet per second):</strong> US engineering,
      ballistics, old physics texts.
    </p>
    <p>
      <strong>Mach:</strong> multiple of speed of sound. Mach 1 ≈
      343 m/s ≈ 1236 km/h at sea level, but varies with altitude
      and temperature.
    </p>
    <p>
      <strong>Speed of light (c):</strong> 299,792,458 m/s.
      Relativity, particle physics.
    </p>

    <h2>The core conversion factors</h2>
    <p>
      Memorize one: <strong>1 m/s = 3.6 km/h</strong>. Everything
      else follows.
    </p>
    <pre>
{`km/h → m/s:  divide by 3.6
m/s → km/h:  multiply by 3.6

mph → km/h:  multiply by 1.609344
km/h → mph:  divide by 1.609344 (or × 0.6214)

m/s → mph:   multiply by 2.2369
ft/s → m/s:  multiply by 0.3048
knots → km/h: multiply by 1.852
knots → mph: multiply by 1.15078`}
    </pre>
    <p>
      The conversion factor between mph and km/h (1.609344) is
      exactly the definition of a mile in km. Keep all 6 decimals
      for scientific work; 1.609 is fine for everyday.
    </p>

    <h2>Pace vs speed — the runner&rsquo;s trap</h2>
    <p>
      Running, swimming, rowing use <strong>pace</strong> (time per
      distance) instead of speed (distance per time). They&rsquo;re
      reciprocals:
    </p>
    <pre>
{`pace = time / distance
speed = distance / time

Example: 6 mph running pace
  = 1 mile per 10 minutes
  = 10:00 min/mile pace

8 min/mile pace
  = 1 mile per 8 minutes
  = 7.5 mph
  = 12.07 km/h`}
    </pre>
    <p>
      <strong>The catch:</strong> you can&rsquo;t average paces by
      averaging minutes. Two miles at 8:00 and 10:00 averages{" "}
      <em>not</em> 9:00 — it&rsquo;s:
    </p>
    <pre>
{`Total time: 8 + 10 = 18 min
Total distance: 2 miles
Average pace: 18/2 = 9:00 min/mile  ← coincidence here
But for 8:00 + 12:00 over 2 miles:
  20/2 = 10:00 — correct
For splits of different distances, weight by distance, not time.`}
    </pre>
    <p>
      When in doubt, convert everything to seconds and meters, do
      the math, convert back.
    </p>

    <h2>Which unit in which context</h2>
    <p>
      <strong>Running, hiking:</strong> min/mile or min/km. Pace.
    </p>
    <p>
      <strong>Cycling:</strong> mph or km/h. Speed.
    </p>
    <p>
      <strong>Car driving:</strong> mph (US/UK) or km/h (everywhere
      else). Speedometers.
    </p>
    <p>
      <strong>Wind speed (weather):</strong> mph in US, km/h in
      Europe/Canada, m/s in meteorology. Marine uses knots.
    </p>
    <p>
      <strong>Aviation:</strong> knots for most speeds; Mach for
      high-speed. Ground speed in knots, indicated airspeed in
      knots (KIAS).
    </p>
    <p>
      <strong>Ball sports:</strong> mph for baseball pitches and
      tennis serves; km/h in the same sports outside North America.
    </p>
    <p>
      <strong>Physics / engineering:</strong> m/s almost always.
      Keeps equations simple (F=ma, KE=½mv² all in SI).
    </p>

    <h2>Significant figures</h2>
    <p>
      Converting 55 mph to km/h: 55 × 1.609344 = 88.51392 km/h. But
      your input was 2 sig figs, so the output should be too — 89
      km/h, not 88.51.
    </p>
    <p>
      Don&rsquo;t inflate precision through conversion. A 60 mph
      speed limit is &ldquo;about 97 km/h&rdquo;, not
      &ldquo;96.56 km/h&rdquo;.
    </p>

    <h2>Wind speed scales</h2>
    <p>
      Beaufort scale is not a unit — it&rsquo;s categorical (0-12)
      corresponding to specific speed ranges:
    </p>
    <pre>
{`Beaufort  Description  km/h
0         Calm         0-1
3         Gentle       12-19
6         Strong       39-49
10        Storm        89-102
12        Hurricane    117+`}
    </pre>
    <p>
      Converting a specific Beaufort to a precise speed is wrong —
      it&rsquo;s a range. Use the midpoint for rough estimates.
    </p>

    <h2>Time-speed-distance problems</h2>
    <p>
      The classic d = vt (distance = speed × time). Watch units:
    </p>
    <pre>
{`Example: How long to drive 300 miles at 55 mph?
  t = d / v = 300 / 55 = 5.45 hours
    = 5h 27m

Same in km:
  d = 300 × 1.609 = 482.7 km
  v = 55 × 1.609 = 88.5 km/h
  t = 482.7 / 88.5 = 5.45 hours  ← same answer`}
    </pre>
    <p>
      Convert units before dividing, and you&rsquo;ll get the right
      answer every time. Mixing units (km divided by mph) gives
      meaningless results.
    </p>

    <h2>Instantaneous vs average speed</h2>
    <p>
      Speedometers show instantaneous speed. Trip summaries show
      average. They&rsquo;re different:
    </p>
    <pre>
{`Drive: 60 miles in 1 hour including 20 min of traffic jam at 10 mph
  Average speed: 60 mph over the hour (but you spent portions at 80)
  Peak speed: maybe 80 mph

Runner: 10k in 50 min with a fast start and slow finish
  Average pace: 5:00/km
  But individual km splits might range 4:15 to 5:45`}
    </pre>
    <p>
      When comparing &ldquo;my run&rdquo; to &ldquo;marathon world
      record pace&rdquo;, the world record is average pace over the
      full distance. Your 10k PR isn&rsquo;t comparable to a
      marathon pace.
    </p>

    <h2>Non-SI hodgepodge to watch for</h2>
    <p>
      <strong>Furlongs per fortnight:</strong> joke unit, but
      occasionally appears. 1 furlong = 220 yards = 201.168 m. 1
      fortnight = 2 weeks = 1,209,600 s. 1 f/fn ≈ 0.000166 m/s.
    </p>
    <p>
      <strong>Knots vs statute miles per hour in wind:</strong>{" "}
      marine forecasts in knots (nautical miles), land forecasts in
      statute mph. Don&rsquo;t mix.
    </p>
    <p>
      <strong>Airspeed types in aviation:</strong> IAS (indicated),
      CAS (calibrated), TAS (true), GS (ground). All in knots but
      different meanings. A pilot&rsquo;s lookup.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Swapping numerator and denominator.</strong> Converting
      km/h to mph? Divide by 1.609, don&rsquo;t multiply. Sanity
      check: mph &lt; km/h for the same speed (mile &gt; km).
    </p>
    <p>
      <strong>Averaging paces by averaging time.</strong> Weight by
      distance if splits are unequal.
    </p>
    <p>
      <strong>Confusing knots and mph.</strong> 1 knot ≈ 1.15 mph.
      Close but not interchangeable — the difference matters in
      aviation and sailing.
    </p>
    <p>
      <strong>Using Mach 1 as a fixed number.</strong> It depends on
      temperature / altitude. At 35,000 ft, Mach 1 ≈ 295 m/s; at sea
      level ≈ 343 m/s.
    </p>
    <p>
      <strong>Over-precision in conversion.</strong> Your 55 mph
      speed limit is not &ldquo;88.51392 km/h&rdquo;. Round to
      input precision.
    </p>
    <p>
      <strong>Applying Beaufort scale as a number.</strong> It&rsquo;s
      a range; converting &ldquo;Beaufort 4&rdquo; to a single speed
      loses information.
    </p>
    <p>
      <strong>Mixing units within a calculation.</strong> Always
      convert to a common unit first, then compute.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert between speed units instantly with the{" "}
      <a href="/tools/speed-converter">speed converter</a>. Pair
      with the{" "}
      <a href="/tools/running-pace-calculator">running pace calculator</a>
      {" "}for running splits, and the{" "}
      <a href="/tools/unit-converter">unit converter</a> for
      everything else.
    </p>
  </>
);
