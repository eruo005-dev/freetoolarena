import { type ReactElement } from "react";

export const intro: ReactElement = (<p>A smart home security system is only as good as the boring decisions &mdash; cloud vs local, DIY vs pro, and what happens when the power goes out.</p>);

export const body: ReactElement = (
  <>
    <p>Picking a smart home security system is one of those decisions people make in an afternoon and regret for years. The marketing hides the real tradeoffs &mdash; who owns your video, what your monthly bill actually looks like in year two, and whether anything works during a power cut. This guide is for homeowners, renters, and small-business owners who want a system that protects without leaking data or your wallet.</p>

    <h2>First decision: cloud vs local-only</h2>
    <p>Cloud systems (Ring, Nest, Arlo) stream video to the vendor&rsquo;s servers, give you easy mobile access, and make subscription revenue the core business model. Local-only systems (UniFi Protect, Synology Surveillance, Frigate on a home server) keep footage on your property &mdash; no monthly fee, no third party watching, but more setup. Most people land in cloud; privacy-sensitive users and small businesses handling customer data should seriously consider local.</p>

    <h2>DIY vs professional install</h2>
    <ul>
      <li>DIY: Ring Alarm, SimpliSafe, Abode, Eufy. Self-install in an afternoon, $200&ndash;500 hardware, optional monitoring.</li>
      <li>Pro-install: ADT, Vivint, Brinks. Contract-based ($30&ndash;70/month for 36 months), professional installation, more hand-holding but painful to leave.</li>
      <li>DIY fits renters, small businesses, and anyone who values flexibility. Pro-install fits larger properties, people who want someone else to handle everything, and those who care about insurance discount paperwork.</li>
    </ul>

    <h2>Monthly service costs</h2>
    <p>Expect $10&ndash;20/month for cloud video storage and basic self-monitoring. Professional 24/7 monitoring with police/fire dispatch runs $25&ndash;50/month. Always read the fine print &mdash; some cloud plans only cover one camera, and you&rsquo;ll pay again for each additional one. Over five years, the service fee usually costs more than the hardware did.</p>

    <h2>The essential layers</h2>
    <p>A real security system has more than cameras. Door and window sensors catch entry points, motion sensors cover interior transit, glass-break sensors handle the most common forced-entry method, and smoke/CO detectors wired into the same hub give you 24/7 life-safety monitoring. Cameras alone are reactive &mdash; sensors are what actually trigger the alarm in time.</p>

    <h2>Where cameras go (and where they shouldn&rsquo;t)</h2>
    <p>Yes: front door, back door, driveway, garage, and the interior common room that covers access. No: bathrooms, bedrooms, and pointed at the neighbor&rsquo;s windows or across the public street. In many US states and most of Europe, outdoor cameras pointed at public walkways generate legitimate privacy complaints and, increasingly, fines. Angle cameras down onto your own property, not outward.</p>

    <h2>Common mistakes</h2>
    <p>Four that show up over and over. No local backup &mdash; when the internet drops, so does your system. Default passwords on cameras, which end up on public Shodan searches within weeks. Outdoor cams framed on the street, causing neighbor disputes. And forgetting to change the admin email when selling the house, leaving the next owner permanently locked out.</p>

    <h2>Power and internet outage resilience</h2>
    <p>Any system worth buying has a backup battery (24&ndash;48 hours minimum) and a cellular fallback if your home internet dies. SimpliSafe, Ring Alarm Pro, and most pro systems include both. A 7-day outage plan looks like: hub on battery + cellular backup, at least one camera with local SD storage, and a solar or generator option if you live somewhere with real weather risk.</p>

    <h2>Bottom line</h2>
    <p>Pick cloud or local based on your privacy tolerance, layer sensors under your cameras, budget for the monthly fee honestly, and pressure-test the system against a power cut before you need it to work. Security is the boring, resilient setup &mdash; not the flashy one.</p>
  </>
);
