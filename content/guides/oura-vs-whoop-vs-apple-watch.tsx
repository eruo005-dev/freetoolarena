import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Three categories of wearables matter in 2026: Oura Ring (sleep + recovery), Whoop 5.0 (performance recovery),
    Apple Watch / Garmin (multi-sport + always-on health). Pick by what you&rsquo;ll actually look at.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Oura Ring 4</h2>
    <ul>
      <li><strong>Best for:</strong> sleep tracking, daily readiness, period tracking, stress.</li>
      <li><strong>Cost:</strong> $349 ring + $5.99/mo Oura membership.</li>
      <li><strong>Strengths:</strong> wear-and-forget form factor, best HRV/sleep accuracy of consumer wearables.</li>
      <li><strong>Weaknesses:</strong> no real-time workout HR, no GPS, swappable battery is a pain.</li>
    </ul>
    <h2>Whoop 5.0</h2>
    <ul>
      <li><strong>Best for:</strong> athletes optimizing strain/recovery cycles.</li>
      <li><strong>Cost:</strong> $239+/year (subscription includes hardware).</li>
      <li><strong>Strengths:</strong> daily strain target + recovery score is the most actionable feedback loop.</li>
      <li><strong>Weaknesses:</strong> screenless wrist band; can feel gimmicky if you&rsquo;re not training hard.</li>
    </ul>
    <h2>Apple Watch Ultra 3 / Series 10</h2>
    <ul>
      <li><strong>Best for:</strong> general everyday health + fitness + ecosystem integration.</li>
      <li><strong>Cost:</strong> $399 (Series) - $799 (Ultra), no subscription.</li>
      <li><strong>Strengths:</strong> ECG, AFib detection, fall detection, blood oxygen, GPS, third-party apps.</li>
      <li><strong>Weaknesses:</strong> nightly charging if you want sleep tracking; battery on Series 10 is the limit.</li>
    </ul>
    <h2>Garmin (Fenix / Forerunner / Venu)</h2>
    <ul>
      <li><strong>Best for:</strong> serious endurance athletes (running, cycling, triathlon).</li>
      <li><strong>Cost:</strong> $200-1,000+ depending on tier.</li>
      <li><strong>Strengths:</strong> 2-3 weeks battery, advanced training metrics, military-grade GPS.</li>
      <li><strong>Weaknesses:</strong> UX is a step behind Apple, worse third-party app ecosystem.</li>
    </ul>
    <h2>Decision shortcut</h2>
    <ul>
      <li>You optimize sleep + recovery: <strong>Oura</strong>.</li>
      <li>You train hard 4+ days/week: <strong>Whoop or Garmin</strong>.</li>
      <li>You want one wearable for everything: <strong>Apple Watch</strong>.</li>
      <li>You want all of it and the budget allows: <strong>Oura + Apple Watch</strong>.</li>
    </ul>
  </>
);
