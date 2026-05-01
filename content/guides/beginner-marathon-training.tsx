import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Marathon participation hit record numbers in 2025-2026 alongside the run-club explosion. If you&rsquo;ve
    never run a marathon, here&rsquo;s a realistic 16-20 week first-marathon plan that won&rsquo;t injure you.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Prerequisites</h2>
    <ul>
      <li>Currently running 15+ miles/week comfortably.</li>
      <li>Can run 6 miles continuously without stopping.</li>
      <li>3-6 months of consistent running base.</li>
      <li>If not, do a 10K first; build to that base before a marathon block.</li>
    </ul>
    <h2>The 18-week structure</h2>
    <ul>
      <li><strong>Weeks 1-4:</strong> base building. 20-25 mi/wk. Long run grows from 8 to 12 mi.</li>
      <li><strong>Weeks 5-8:</strong> 25-30 mi/wk. Long run 13-16 mi. One workout/week (tempo or intervals).</li>
      <li><strong>Weeks 9-12:</strong> 30-40 mi/wk. Long run 16-18 mi. Two workouts/week.</li>
      <li><strong>Weeks 13-15:</strong> peak. 40-50 mi/wk. Long run 18-22 mi (do at least one 20+).</li>
      <li><strong>Weeks 16-18:</strong> taper. 30 / 20 / 12 mi/wk. Race week is light.</li>
    </ul>
    <h2>The 80/20 rule</h2>
    <p>
      80% of your running should be easy (zone 2). 20% can be harder (tempo, intervals, strides). Most beginners
      run too much of the middle &mdash; not easy enough on easy days, not hard enough on hard days.
    </p>
    <h2>Race-week non-negotiables</h2>
    <ul>
      <li>Don&rsquo;t try anything new (food, shoes, gear).</li>
      <li>Hydrate aggressively 48 hours before, taper hydration on race morning.</li>
      <li>Carb-load 3 days out (not just race-eve pasta).</li>
      <li>Plan exactly when you&rsquo;ll fuel during the race &mdash; gels every 30-45 min.</li>
    </ul>
    <p>
      Build pace targets at <a href="/tools/running-pace-calculator">running pace calculator</a>. Long runs in
      zone 2: <a href="/tools/zone-2-heart-rate-calculator">zone 2 heart rate calculator</a>.
    </p>
  </>
);
