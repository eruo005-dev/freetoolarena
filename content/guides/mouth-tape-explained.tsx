import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Mouth taping went mainstream in 2023-2024 via James Nestor&rsquo;s book &ldquo;Breath&rdquo; and Andrew Huberman.
    By 2026 it&rsquo;s common enough that pharmacies stock the tape. Here&rsquo;s the honest evidence + when it
    actually helps.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The claim</h2>
    <p>
      Sealing your lips at night forces nasal breathing, which (proponents argue) improves sleep quality, reduces
      snoring, raises blood oxygen.
    </p>
    <h2>The actual evidence</h2>
    <ul>
      <li><strong>Confirmed mouth-breathers:</strong> mild improvement in sleep efficiency, real reduction in dry mouth + sore throat.</li>
      <li><strong>Snoring reduction:</strong> moderate evidence in mild cases. NO substitute for CPAP if you have sleep apnea.</li>
      <li><strong>General population:</strong> placebo-level effects in most studies. Most healthy nasal breathers don&rsquo;t see meaningful gains.</li>
      <li><strong>Reduced sleep apnea events:</strong> NOT supported. Can be dangerous if you have undiagnosed obstructive sleep apnea.</li>
    </ul>
    <h2>Who should NOT mouth tape</h2>
    <ul>
      <li>Sleep apnea (diagnosed or suspected).</li>
      <li>Severely deviated septum / chronic congestion.</li>
      <li>Anyone with a recent cold / sinus infection.</li>
      <li>Children &mdash; inconclusive safety data.</li>
    </ul>
    <h2>If you try it</h2>
    <ul>
      <li>Use a tape designed for it (3M Microfoam, Hostage Tape, MyoTape) &mdash; not duct tape.</li>
      <li>Apply across the mouth, not sealing entirely; allow safety opening.</li>
      <li>Get a sleep study first if you snore loudly or feel exhausted at 7-8 hr sleep.</li>
    </ul>
  </>
);
