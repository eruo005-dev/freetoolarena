import { type ReactElement } from "react";

export const intro: ReactElement = (<p>The hardest part of drone photography isn&rsquo;t the flying &mdash; it&rsquo;s knowing where, when, and whether you&rsquo;re legally allowed to take off.</p>);

export const body: ReactElement = (
  <>
    <p>Drones have become astonishingly capable and relatively cheap, but the gap between &ldquo;bought a drone&rdquo; and &ldquo;taking photos worth sharing&rdquo; is wider than most beginners expect. The rules are real, the weather is always worse than you think, and the battery always dies ten minutes before the perfect light. Get the legal piece sorted first, pick a drone that matches your actual use case, and learn the fundamentals before chasing cinematic 4K reels.</p>

    <h2>FAA rules come first</h2>
    <p>In the US, every drone between 250 g and 55 lb must be registered with the FAA ($5, good for three years). Recreational flyers must pass the free TRUST test online and follow the community-based rules. If you&rsquo;re flying for any commercial purpose &mdash; including monetized YouTube, client photography, or real-estate listings &mdash; you need a Part 107 certificate, which is a written knowledge test at an FAA testing center. Remote ID broadcasting is required on nearly all registered drones. Other countries have their own regimes; check before you travel.</p>

    <h2>Pick the drone for the job</h2>
    <ul>
      <li>DJI Mini 4 Pro &mdash; under 250 g, travel-friendly, capable sensor. Best first drone for most people.</li>
      <li>DJI Air 3 &mdash; dual-camera, longer range, the sweet spot for mid-level creators.</li>
      <li>DJI Mavic 3 Pro &mdash; Hasselblad sensor, professional color, the pick for paid work.</li>
      <li>Autel EVO Lite+ &mdash; strong non-DJI alternative with good low-light performance.</li>
      <li>Skydio X series &mdash; best-in-class obstacle avoidance and autonomy, US-made.</li>
    </ul>

    <h2>Knowing where you can&rsquo;t fly</h2>
    <p>No-fly zones are broader than most beginners realize: controlled airspace around airports, most national parks, stadiums during events, military bases, and temporary flight restrictions (TFRs) over wildfires, VIP movements, and major events. Use the FAA&rsquo;s B4UFLY app or Aloft before every flight &mdash; airspace classifications change, and a sectional chart from last month isn&rsquo;t enough. LAANC authorization can unlock controlled airspace near many airports in seconds, but you still need to request it.</p>

    <h2>Accessories that earn their spot</h2>
    <p>ND filters are the single biggest image-quality upgrade for video &mdash; they let you keep a cinematic 1/50s shutter at 25 fps in bright light instead of a choppy 1/2000s. A polarizer (CPL) cuts glare off water and windows. Extra batteries are non-negotiable; figure on three total so you can rotate through a shoot. A landing pad keeps dust and grass out of your motors on takeoff. A good case or backpack protects the gimbal &mdash; the most fragile part of any drone.</p>

    <h2>Flying fundamentals</h2>
    <p>Wait for GPS lock before takeoff; without it, the drone won&rsquo;t hold position. Check the wind &mdash; your drone&rsquo;s max wind resistance is a spec, not a suggestion, and sustained winds over 20 mph are hard on sub-250 g drones. Keep return-to-home altitude set above the tallest obstacle on your route. Land at 20&ndash;25% battery, not at the low-battery warning; wind and cold both eat reserve faster than the meter suggests. Calibrate the compass when the app asks, especially near rebar, metal roofs, or after a long flight.</p>

    <h2>Shooting, not just flying</h2>
    <p>The composition rules that work on the ground still apply: leading lines, rule of thirds, foreground interest. Top-down shots of patterns (roads, fields, coastlines) are overused but still effective. Shoot in RAW for photos and in D-Log or similar flat profiles for video if you plan to color-grade. Golden hour and blue hour are flattering; midday sun is usually brutal.</p>

    <h2>Common mistakes</h2>
    <p>Flying over people or moving vehicles (both prohibited under most rules), launching in winds you can&rsquo;t handle, ignoring &ldquo;low battery&rdquo; warnings, losing visual line of sight, filming in 4K when you&rsquo;ll post at 1080p anyway, and forgetting to update firmware &mdash; which can ground the drone or disable features mid-trip.</p>

    <h2>Bottom line</h2>
    <p>Register, test, check the airspace, buy the smallest drone that fits your work, and put in reps in empty fields before you chase the shot.</p>
  </>
);
