import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Before you replace a phone, laptop, or desktop, run it through a simple cost-vs-age filter &mdash; you&rsquo;ll save hundreds and keep a working device out of the landfill.</p>);

export const body: ReactElement = (
  <>
    <p>Tech prices keep climbing while device quality plateaus, which makes &ldquo;repair or replace&rdquo; one of the most useful decisions a small-business owner or household can get right. Most people default to buying new because it feels safer, but a $90 battery swap can buy you two more years on a laptop you already know and like. This guide gives you a clear framework, age heuristics, and realistic DIY boundaries.</p>

    <h2>The 50/75% rule</h2>
    <p>The simplest rule in the industry: if the repair costs less than 50% of a comparable replacement, repair. Between 50&ndash;75%, it depends on device age and how much you like it. Above 75%, replace. A $120 battery on a $1,400 laptop? Easy repair. A $600 logic board on a 6-year-old laptop that sells for $500 used? Replace.</p>

    <h2>Device age heuristics</h2>
    <ul>
      <li>Smartphones: realistic life is 3&ndash;5 years. Past year 4, expect battery and OS-support issues.</li>
      <li>Laptops: 5&ndash;7 years. Thermal paste, battery, and SSD all become relevant mid-life.</li>
      <li>Desktops: 8&ndash;10 years with incremental upgrades (RAM, SSD, PSU, GPU). These age the best.</li>
      <li>Tablets: 4&ndash;6 years, usually battery-limited rather than performance-limited.</li>
    </ul>

    <h2>DIY-friendly vs pro-only repairs</h2>
    <p>Batteries, SSDs, RAM upgrades, and thermal paste re-application are genuinely beginner-friendly if you follow an iFixit guide and use the right tools. Fan replacements and keyboard swaps are intermediate. Motherboard repairs, display replacements on modern phones (especially Face ID / Touch ID modules), and anything involving micro-soldering should go to a pro &mdash; you&rsquo;ll save money but likely brick the device trying.</p>

    <h2>Where to source parts</h2>
    <p>iFixit is the gold standard for DIY &mdash; parts, tools, and guides written for actual humans. PartsConnect, RepairParts, and eBay work for out-of-warranty specifics but check seller reviews carefully. For Apple products, AppleCare+ or Apple&rsquo;s Self Service Repair program now sells genuine parts directly. Avoid the cheapest no-name batteries on Amazon &mdash; counterfeit cells are a fire risk that&rsquo;s not worth the $15 saved.</p>

    <h2>Refurbished as the middle ground</h2>
    <p>If repair economics don&rsquo;t work but a new device feels wasteful, certified refurbished is the sweet spot. Apple Certified Refurbished carries the same 1-year warranty as new and usually runs 15&ndash;20% off. Back Market grades devices A through C with a 1-year warranty and 30-day returns. Amazon Renewed is the most variable &mdash; stick to &ldquo;Premium&rdquo; tier only. Expect roughly 25&ndash;40% savings vs new.</p>

    <h2>Common mistakes</h2>
    <p>People skip repair because they assume it&rsquo;s a hassle, forget to back up before sending a phone to a repair shop, or buy a new flagship when a $200 battery service on their existing one would&rsquo;ve done the job. The other big one: buying cheap third-party screens on modern phones, which kill True Tone, auto-brightness, and sometimes Face ID. Pay for OEM or certified screens.</p>

    <h2>The environmental case</h2>
    <p>Manufacturing a new smartphone emits roughly 60&ndash;80 kg of CO2, mostly locked into the chips and display. Extending a device&rsquo;s life by two years cuts its lifetime footprint nearly in half. If you run a business buying tech for staff, a repair-first policy is one of the lowest-effort sustainability wins available.</p>

    <h2>Bottom line</h2>
    <p>Use the 50/75% rule, match it against the device&rsquo;s age bracket, DIY the easy stuff, pay a pro for the rest, and look at refurbished before new. You&rsquo;ll save money, keep devices out of the waste stream, and skip the dopamine trap of upgrading for upgrading&rsquo;s sake.</p>
  </>
);
