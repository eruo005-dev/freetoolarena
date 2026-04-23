import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Length conversion trips people because the metric system is decimal and the imperial
      system isn&rsquo;t&mdash;twelve inches to a foot, three feet to a yard, 1,760 yards to a
      mile, and a few legacy units like furlongs and chains that still appear on land surveys.
      Getting the conversion factor wrong by a decimal place is embarrassingly common: 1 meter
      is about 3.28 feet, but a memorized 3.3 drifts as the numbers grow. This guide covers
      the metric ladder from millimeter to kilometer, the imperial ladder from inch to mile,
      the exact conversion between meters and yards (by definition), when to use feet versus
      meters versus miles versus kilometers, precision choices for engineering versus everyday
      use, and the historical and technical reasons for sticking with whichever unit your
      industry demands.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The metric ladder</h2>
    <p>
      The meter is the SI base unit. Every other metric length is a power of ten away:
    </p>
    <pre>{`1 km   = 1,000 m
1 m    = 100 cm = 1,000 mm
1 cm   = 10 mm
1 mm   = 1,000 µm (micrometers)
1 µm   = 1,000 nm (nanometers)

1 m    = 10 dm   (decimeter, rarely used)
1 m    = 1,000,000 µm
1 m    = 1,000,000,000 nm`}</pre>
    <p>
      Engineering drawings usually give dimensions in millimeters; architectural drawings in
      meters; city distances in kilometers. Scientific work uses whichever power of ten makes
      the numbers human-sized.
    </p>

    <h2>The imperial ladder</h2>
    <pre>{`1 foot (ft) = 12 inches (in)
1 yard (yd) = 3 feet = 36 inches
1 mile (mi) = 1,760 yards = 5,280 feet = 63,360 inches

Less common:
1 chain     = 22 yards = 66 feet   (surveying)
1 furlong   = 10 chains = 220 yards
8 furlongs  = 1 mile`}</pre>
    <p>
      The US and UK use slightly different definitions for some imperial units, though for
      most practical purposes they match. The international yard and pound agreement of 1959
      fixed 1 yard = 0.9144 meters exactly, which makes all derived conversions exact.
    </p>

    <h2>Metric &harr; imperial: the key numbers</h2>
    <pre>{`1 inch   = 2.54 cm           (exact)
1 foot   = 30.48 cm           (exact)
1 yard   = 0.9144 m           (exact)
1 mile   = 1,609.344 m        (exact)
1 cm     ≈ 0.3937 inches
1 m      ≈ 3.2808 feet ≈ 1.0936 yards
1 km     ≈ 0.6214 miles

Memorable approximations:
  inch → cm: multiply by 2.5 (off by 2%)
  m → feet: multiply by 3.28
  km → miles: multiply by 0.62 (or divide by 1.6)
  miles → km: multiply by 1.6`}</pre>

    <h2>When each unit is the standard</h2>
    <p>
      <strong>Millimeters:</strong> machining, electronics, precision manufacturing,
      architectural details. <strong>Centimeters:</strong> textiles, human body measurements
      outside the US, stationery. <strong>Meters:</strong> room sizes, building heights,
      athletic fields, scientific experiments. <strong>Kilometers:</strong> road distances,
      running events, geography. <strong>Inches:</strong> US consumer products, screens, rain
      gauges, piping. <strong>Feet:</strong> US construction, building heights, aviation
      altitudes. <strong>Yards:</strong> US fabric, football, golf. <strong>Miles:</strong> US
      road distances, running events.
    </p>

    <h2>Precision and rounding</h2>
    <p>
      A 6-foot-tall person is 1.83 meters. That&rsquo;s enough precision for a driver&rsquo;s
      license. A machine part with a 0.25-inch hole is 6.35 mm&mdash;and if you round to 6 mm,
      the bolt doesn&rsquo;t fit. Match precision to context. For engineering, use the exact
      factor (2.54, 0.9144, 1.609344). For everyday conversation, rounded factors are fine.
    </p>

    <h2>Significant figures</h2>
    <p>
      If you measure 10 feet with a tape accurate to the nearest inch, that&rsquo;s four
      significant figures, not six. Converting to meters gives 3.048 m, which should be
      reported as 3.05 m or 3.1 m depending on your original precision. Writing 3.048000 m
      pretends to a precision your measurement never had.
    </p>

    <h2>Aviation uses feet</h2>
    <p>
      Aircraft altitudes worldwide are reported in feet, regardless of the country&rsquo;s
      preferred unit system&mdash;a quirk of aviation standardization that predates the metric
      push. Flight levels (FL) divide altitude by 100: FL350 = 35,000 feet. Runway lengths are
      similarly in feet. A few countries (Russia, China) use meters, which requires pilots to
      mentally convert constantly.
    </p>

    <h2>Nautical miles</h2>
    <p>
      1 nautical mile = 1,852 meters = 1.15078 statute miles. It&rsquo;s defined as one minute
      of arc along a meridian. Ship speed is measured in knots (nautical miles per hour).
      Aviation also uses nautical miles for distances and knots for airspeed. Don&rsquo;t mix
      them with statute miles&mdash;a 15% error at sea will put you in the wrong place.
    </p>

    <h2>Astronomical units and light-years</h2>
    <p>
      For distances inside the solar system, astronomers use the astronomical unit (AU):
      149,597,870.7 km, the mean Earth-Sun distance. Between stars, the parsec (3.26 light-years
      = 30.857 trillion km) and light-year (9.461 trillion km) take over. These aren&rsquo;t
      relevant to everyday conversion but show up enough in science journalism to know.
    </p>

    <h2>Fabric and sewing</h2>
    <p>
      US fabric is sold by the yard; most of the rest of the world by the meter. 1 yard =
      0.9144 m, so 10 yards of fabric is 9.14 meters. For rough estimation, yards and meters
      are within 10% of each other&mdash;a &ldquo;yard&rdquo; and a &ldquo;meter&rdquo; are
      close enough to be interchangeable in casual talk, but sewing patterns are unforgiving.
    </p>

    <h2>Running distances</h2>
    <pre>{`5K     = 5,000 m = 3.107 miles
10K    = 10,000 m = 6.214 miles
Half marathon = 21.0975 km = 13.1094 miles
Marathon = 42.195 km = 26.2188 miles
Mile    = 1.609 km`}</pre>
    <p>
      Track events use metric distances (100 m, 400 m, 1,500 m), but US road races mix metric
      (5K, 10K) and imperial (mile, marathon). The marathon distance is fixed by IAAF at
      42.195 km exactly.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Swapping the conversion factor.</strong> If you multiply by 2.54 when you should
      divide (or vice versa), your number goes the wrong way. Sanity check: a meter is larger
      than a foot, so a number in feet should be larger than the same length in meters.
    </p>
    <p>
      <strong>Using 2.5 as exact.</strong> The inch-to-centimeter factor is 2.54, not 2.5. The
      2% error doesn&rsquo;t matter for fabric but ruins machining tolerances.
    </p>
    <p>
      <strong>Confusing statute and nautical miles.</strong> 1 nm = 1.15 statute miles.
      Navigation calculations mixing the two produce 15% errors that get you lost.
    </p>
    <p>
      <strong>Rounding away significant digits.</strong> 5,280 feet in a mile is exact. If you
      use 5,000 for mental arithmetic, your answer is off by over 5%.
    </p>
    <p>
      <strong>Forgetting unit names shift meaning between US and UK.</strong> A UK mile is the
      same. A UK pint isn&rsquo;t a US pint. For length, the imperial-versus-US customary
      distinction is mostly invisible; for volume, it&rsquo;s painful.
    </p>
    <p>
      <strong>Converting square or cubic units by linear factors.</strong> 1 m = 3.28 ft, but 1
      m&sup2; = 10.76 ft&sup2; (not 3.28). Squaring the linear factor squares the conversion.
      This is a separate problem covered by area conversion, but the mistake is common when
      scaling between systems.
    </p>
    <p>
      <strong>Mixing units in a calculation.</strong> A length in feet minus a length in inches
      needs both converted to the same unit first. Unit mistakes compound quickly in spreadsheets
      where column headers aren&rsquo;t visible.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Stop multiplying by 2.54 in your head and use our{" "}
      <a href="/tools/length-converter">length converter</a> for all the metric and imperial
      pairs. Pair it with the <a href="/tools/area-converter">area converter</a> when you need
      to scale up to two dimensions, and the{" "}
      <a href="/tools/volume-converter">volume converter</a> for three-dimensional extensions
      of the same measurement problem.
    </p>
  </>
);
