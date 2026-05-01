import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    The return-to-office (RTO) push from 2023-2025 stabilized in 2026 around hybrid 3-2 (three days office, two
    home) for most knowledge work. Here&rsquo;s the actual state of play and what it means if you&rsquo;re
    negotiating.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Where each company landed</h2>
    <ul>
      <li><strong>Fully remote:</strong> ~15-20% of large companies kept it (GitLab, Automattic, some startups).</li>
      <li><strong>Hybrid 3-2:</strong> the dominant 2026 model (~50%).</li>
      <li><strong>Hybrid 4-1:</strong> ~20%.</li>
      <li><strong>Fully in-office:</strong> ~10-15%, weighted toward financial services + younger startups.</li>
    </ul>
    <h2>What the data actually shows</h2>
    <ul>
      <li>Productivity differences between fully remote + hybrid + in-office are SMALL across most knowledge roles.</li>
      <li>Junior employees benefit more from in-person time (mentoring, observation).</li>
      <li>Senior employees show productivity gains in remote/hybrid (focus time matters more than collaboration).</li>
      <li>Retention is consistently better in companies that offer flexibility.</li>
    </ul>
    <h2>Negotiating leverage in 2026</h2>
    <ul>
      <li>If your role is hard to fill: full-remote is still a real ask.</li>
      <li>Hybrid 2-3 (more remote) often available if not advertised.</li>
      <li>Compressed schedules (10-hr days, 4-day workweek) are increasingly normalized.</li>
      <li>If they push 5-day, ask for travel allowance / commute compensation.</li>
    </ul>
    <h2>If you&rsquo;re returning</h2>
    <ul>
      <li>Treat the office days as different work: synchronous + meetings + relationships.</li>
      <li>Block deep-work days at home; don&rsquo;t default-meet on remote days.</li>
      <li>Negotiate which days you go in &mdash; Tuesday/Wednesday/Thursday is most productive.</li>
    </ul>
    <p>
      Related: <a href="/guides/four-day-work-week-evidence">4-day work week evidence</a>,{" "}
      <a href="/guides/how-to-work-from-home-productively">how to work from home productively</a>.
    </p>
  </>
);
