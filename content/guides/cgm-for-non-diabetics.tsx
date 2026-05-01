import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Continuous glucose monitors (Dexcom Stelo, Abbott Lingo, Levels Health) are the wellness wearable story of
    2025-2026. Stelo became OTC for non-diabetics. Here&rsquo;s the honest take on whether they&rsquo;re worth the
    $89/mo.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What they actually measure</h2>
    <p>
      Interstitial glucose (with a 5-15 min lag from blood glucose) every 1-15 minutes. Sensor lasts 14-15 days,
      pairs with phone via NFC + Bluetooth.
    </p>
    <h2>What you actually learn</h2>
    <ul>
      <li>Your glucose response to specific foods (often surprising).</li>
      <li>Spikes from ostensibly &ldquo;healthy&rdquo; foods (oatmeal, smoothies, dates).</li>
      <li>How exercise blunts post-meal spikes.</li>
      <li>Stress and poor sleep raise baseline.</li>
    </ul>
    <h2>What you might not</h2>
    <ul>
      <li>Personalized insights aren&rsquo;t mostly news to anyone who&rsquo;s read about insulin sensitivity.</li>
      <li>Optimization can become anxious and disordered for some users.</li>
      <li>For metabolically healthy non-diabetics, the gap between &ldquo;average&rdquo; and &ldquo;optimal&rdquo; is small.</li>
    </ul>
    <h2>Best for</h2>
    <ul>
      <li><strong>Pre-diabetics</strong> &mdash; concrete feedback drives behavior change.</li>
      <li><strong>People with metabolic syndrome</strong> &mdash; reading food + behavior connection viscerally.</li>
      <li><strong>Athletes optimizing performance</strong> &mdash; fueling + recovery insights.</li>
    </ul>
    <h2>Worth skipping if</h2>
    <ul>
      <li>You&rsquo;re metabolically healthy and already eat well &mdash; minimal new info, $89/mo.</li>
      <li>You have any disordered-eating history &mdash; the data feedback can entrench restriction.</li>
    </ul>
  </>
);
