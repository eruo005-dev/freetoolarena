import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    A DIY solar kit is cheaper than you think &mdash; and more work than the YouTube videos admit. Here&rsquo;s how to size, spec, and install one without wasting money on the wrong parts.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      Solar is no longer niche. A 400W kit that cost $2,000 in 2016 is $500 today, and lithium batteries have dropped 80% in a decade. The catch: most beginner kits are undersized, mismatched, or shipped with wire too thin for the run. Plan the system first, buy parts second.
    </p>

    <h2>Match the kit to your use case</h2>
    <p>
      Start with what you actually want to power. A 100W panel plus a small battery runs a laptop, phones, and LED lights &mdash; fine for weekend camping. A 400W kit with a 100Ah LiFePO4 battery covers a small RV or van build (fridge, lights, fans, device charging). A 1,000W array with 200&ndash;400Ah of storage runs a tiny cabin with a small fridge and water pump. For whole-house backup during outages, you&rsquo;re looking at 5,000W+ of panels and a 10&ndash;20kWh battery bank.
    </p>

    <h2>Core components, explained</h2>
    <ul>
      <li><strong>Panels:</strong> monocrystalline is the default &mdash; more efficient per square foot than polycrystalline and prices are nearly identical now.</li>
      <li><strong>Charge controller:</strong> MPPT (maximum power point tracking) extracts 15&ndash;30% more energy than cheaper PWM units. Worth the extra $50&ndash;150 on anything above 200W.</li>
      <li><strong>Battery bank:</strong> LiFePO4 is the clear winner &mdash; 10+ year lifespan, 80%+ usable depth of discharge, no venting needed. Lead-acid is cheaper upfront but costs more per usable kWh over time.</li>
      <li><strong>Inverter:</strong> pure sine wave only. Modified sine wave trashes sensitive electronics and makes some motors hum loudly.</li>
    </ul>

    <h2>Realistic cost ranges</h2>
    <p>
      A complete 400W kit with battery and inverter runs $400&ndash;800 if you shop smart. A 1,000W cabin setup lands around $1,000&ndash;2,000 including a decent LiFePO4 bank. A 5,000W whole-house backup system with 10kWh of storage is $5,000&ndash;15,000 depending on battery brand and inverter quality. Grid-tie systems add meter, interconnect, and usually a licensed installer &mdash; budget accordingly.
    </p>

    <h2>Installation complexity</h2>
    <p>
      Portable ground deployments are plug-and-play &mdash; unfold, connect, charge. Permanent roof mounts need flashing, sealing, and structural consideration. Ground mounts avoid roof penetration but eat yard space. Grid-tie almost always requires permits, an electrical inspection, and utility approval. Off-grid in a detached structure is usually unpermitted, but check your county code before assuming.
    </p>

    <h2>Wire sizing is where amateurs lose money</h2>
    <p>
      Long DC runs lose voltage fast. A 30-foot run at 12V carrying 30A needs 6 AWG cable minimum; push it further with 8 AWG and you&rsquo;ll dump 10&ndash;15% of your harvest as heat. Use a voltage drop calculator before buying wire, and buy tinned marine cable if the install is anywhere humid.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Undersizing the battery is the #1 regret &mdash; panels recharge the bank, but the bank is what actually runs your loads overnight. Reversing polarity on MC4 connectors fries charge controllers instantly. Running wire that&rsquo;s too thin for the distance silently kills performance. Skipping a proper fuse between battery and inverter is a fire waiting to happen.
    </p>

    <h2>Bottom line</h2>
    <p>
      Size for your actual loads plus 30% headroom, buy MPPT and LiFePO4 even if the PWM/lead-acid combo is cheaper, and fuse everything. Use our <a href="/tools/solar-panel-payback-calculator">solar panel payback calculator</a> to see how many years until your kit pays for itself.
    </p>
  </>
);
