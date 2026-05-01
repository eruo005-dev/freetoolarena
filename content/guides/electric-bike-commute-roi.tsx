import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    E-bike sales doubled in the US between 2022 and 2026. For city commuters they often beat cars on door-to-door
    time. Here&rsquo;s the ROI math + how to pick one.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The cost math</h2>
    <ul>
      <li><strong>Decent commuter e-bike:</strong> $1,500-3,000.</li>
      <li><strong>Operating cost:</strong> ~$0.05/mile electricity vs ~$0.65/mile car (gas + depreciation + insurance prorated).</li>
      <li><strong>Break-even vs car:</strong> typically 18-30 months at 10 mi/day commute.</li>
      <li><strong>Tax credits:</strong> many states + cities offer $500-1,500 incentives in 2026.</li>
    </ul>
    <h2>Faster than cars in cities</h2>
    <p>
      Door-to-door commute speed for trips 1-8 miles: e-bike often wins on dense city routes (no parking hunt,
      bypass traffic). Above 8 miles depends on bike infrastructure and rider tolerance.
    </p>
    <h2>How to pick</h2>
    <ul>
      <li><strong>Class 1</strong> (pedal-assist, max 20 mph): allowed on most bike paths.</li>
      <li><strong>Class 2</strong> (throttle + pedal-assist, max 20 mph): some path restrictions.</li>
      <li><strong>Class 3</strong> (pedal-assist, max 28 mph): often street-only, helmet required.</li>
      <li><strong>Battery range:</strong> assume 60-70% of advertised range in real-world use.</li>
      <li><strong>Brands worth knowing:</strong> Specialized, Trek, Tern, Lectric, Aventon, Rad Power.</li>
    </ul>
    <h2>Common mistakes</h2>
    <ul>
      <li>Buying for max range you&rsquo;ll never use &mdash; expensive battery weight.</li>
      <li>Skipping fenders, lights, lock for &ldquo;a clean look&rdquo; &mdash; you&rsquo;ll add them in 2 weeks.</li>
      <li>Not factoring in storage if you live in an apartment.</li>
      <li>Forgetting that e-bikes get stolen aggressively; budget $100-150 for a real lock.</li>
    </ul>
  </>
);
