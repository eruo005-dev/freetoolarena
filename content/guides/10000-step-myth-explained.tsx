import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The 10,000-step number was a 1965 Yamasa pedometer marketing campaign in Japan, not a research finding. Modern
    data tells a more interesting story &mdash; here&rsquo;s what it actually says.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Where 10,000 came from</h2>
    <p>
      Yamasa launched the &ldquo;Manpo-kei&rdquo; (10,000-step meter) ahead of the 1964 Tokyo Olympics. The number
      was picked because the Japanese character for 10,000 looks like a person walking. That&rsquo;s the entire
      origin story.
    </p>
    <h2>What modern data says</h2>
    <ul>
      <li><strong>Mortality plateau around 7,500:</strong> Lee et al. (2019, JAMA Intern Med) on older women.</li>
      <li><strong>Ages 60+:</strong> benefits plateau as low as 6,000-7,000 steps.</li>
      <li><strong>Cadence matters more than total:</strong> 100+ steps/min for ~30 min/day correlates more with health than 12,000 slow steps.</li>
      <li><strong>Diminishing returns:</strong> beyond ~10,000 the marginal benefit shrinks; not zero, just smaller.</li>
    </ul>
    <h2>Personalized targets</h2>
    <ul>
      <li><strong>Under 60, sedentary baseline:</strong> 7,500-8,000 is the right target.</li>
      <li><strong>60+:</strong> 6,000-7,000.</li>
      <li><strong>Weight loss focus:</strong> 9,000-10,000+ to clear creep into your maintenance margin.</li>
      <li><strong>Athletes:</strong> step count isn&rsquo;t a useful metric; track training load.</li>
    </ul>
    <p>
      Find your personalized target with the <a href="/tools/step-count-target-calculator">step count target calculator</a>.
    </p>
  </>
);
