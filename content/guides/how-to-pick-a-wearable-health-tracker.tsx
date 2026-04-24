import { type ReactElement } from "react";

export const intro: ReactElement = (<p>The right wearable is the one that matches your metrics, your battery tolerance, and your willingness to pay a monthly subscription for your own heart data.</p>);

export const body: ReactElement = (
  <>
    <p>Wearables have quietly become a $50-to-$800 category with wildly different value propositions. Marketing blurs the lines: an Apple Watch, a Garmin, a Fitbit, and a Whoop look similar but solve very different problems. This guide helps busy owners, founders, and anyone who just wants a tracker that actually sticks on their wrist for more than a month figure out what they&rsquo;re really buying.</p>

    <h2>Decide what you actually want tracked</h2>
    <p>Start with the metrics, not the brand. Almost every device handles steps, heart rate, and sleep. Past that, choices narrow: SpO2 (blood oxygen), ECG (heart rhythm), skin temperature, stress/HRV, menstrual cycle tracking, and GPS for outdoor sports. Pay for the sensors you&rsquo;ll look at weekly &mdash; skip the ones you won&rsquo;t.</p>

    <h2>The four main positions</h2>
    <ul>
      <li>Apple Watch: best smartwatch + notifications + Apple ecosystem; ECG, fall detection, crash detection; 18-36 hour battery.</li>
      <li>Garmin: best for athletes and outdoor users; deep training metrics, built-in GPS, 7-14 day battery on most models.</li>
      <li>Fitbit (now Google): friendliest UI for casual users, strong sleep tracking, subscription for advanced insights.</li>
      <li>Whoop / Oura: no screen (Whoop) or ring form factor (Oura); focus on recovery, strain, and sleep; subscription-required business model.</li>
    </ul>

    <h2>Battery life matters more than people admit</h2>
    <p>A tracker that&rsquo;s off your wrist charging is a tracker that isn&rsquo;t tracking. Apple Watch users lose roughly one night of sleep data per week to charging cycles. Garmin users charge once a week or less. Oura rings last about a week, Whoop about 4&ndash;5 days. If consistent sleep or recovery data matters to you, multi-day battery isn&rsquo;t a luxury &mdash; it&rsquo;s the feature.</p>

    <h2>Subscription traps</h2>
    <p>Whoop has no upfront hardware cost but requires a membership ($20&ndash;30/month, billed annually). Oura sells the ring outright but gates most insights behind Oura Membership ($5.99/month). Fitbit Premium ($9.99/month) unlocks the good sleep and stress content. Over three years, a &ldquo;free&rdquo; Whoop costs about $720 and an Oura about $520 in subscription alone &mdash; often more than an Apple Watch bought outright.</p>

    <h2>Medical-grade vs consumer-grade accuracy</h2>
    <p>No consumer wearable is a medical device, even the ones with FDA clearance for specific features (like Apple Watch ECG for atrial fibrillation). Heart-rate readings during high-intensity interval workouts drift 5&ndash;15% on most wrist sensors. SpO2 readings are directional, not diagnostic. Sleep staging is an educated estimate. Use trends, not single data points, and never replace a doctor&rsquo;s test.</p>

    <h2>Who owns your heart data?</h2>
    <p>Read the privacy policy &mdash; seriously. Apple and Garmin store most health data on-device or encrypted such that they can&rsquo;t read it. Fitbit data now flows into Google&rsquo;s broader account ecosystem. Whoop and Oura retain aggregated data for research and product improvement. If you&rsquo;d be uncomfortable with your employer&rsquo;s insurance company knowing your resting heart rate trend, pick a vendor whose business model isn&rsquo;t data.</p>

    <h2>$50 vs $500 &mdash; what actually changes</h2>
    <p>At $50 (Xiaomi Mi Band, basic Amazfit) you get steps, heart rate, basic sleep, and a 2-week battery &mdash; surprisingly solid for most users. At $150&ndash;250 you add real GPS, SpO2, and a better screen. At $400&ndash;500 you get ECG, premium sensors, stronger build quality, and the ecosystem play. The accuracy jump from $50 to $500 is real but smaller than the price gap suggests.</p>

    <h2>Common mistakes</h2>
    <p>Buying on hype (latest Apple Watch for someone who sleeps with it and charges it at 3pm daily), ignoring subscription cost, or picking a device with sensors you don&rsquo;t use. The other one: obsessing over the data. Wearables work when they quietly nudge behavior over months &mdash; not when you&rsquo;re refreshing HRV at 7am.</p>

    <h2>Bottom line</h2>
    <p>Start with the metrics you&rsquo;ll actually act on, weigh battery against features honestly, include three years of subscription in the price, and remember no wrist is a cardiologist. The best tracker is the one still on your wrist six months from now.</p>
  </>
);
