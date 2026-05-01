import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    A &ldquo;home AI cluster&rdquo; in 2026 isn&rsquo;t a server rack &mdash; it&rsquo;s
    three to five everyday machines wired well, running a coordinator daemon, and serving
    a 70B model that none of them could host alone. The hardware decisions are mostly about
    network, cooling, and how loud you&rsquo;re willing to live with. The software is solved.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What a home cluster is for (and isn&rsquo;t)</h2>
    <p>
      Build one if you want any of: code-completion that&rsquo;s genuinely faster than typing,
      multi-agent workflows running 24/7, on-call summarization of large documents, your own
      RAG over private data, or a way to share a single GPU across the household&rsquo;s
      laptops. Don&rsquo;t build one if your needs are casual chat &mdash; you&rsquo;re paying
      a hardware tax for capacity you won&rsquo;t use, and a $20/month cloud subscription will
      feel faster.
    </p>

    <h2>Topology: pick one of four shapes</h2>

    <h3>1. The single-host (1 machine)</h3>
    <p>
      One Mac Studio M2/M3/M4 Ultra (64&ndash;192 GB) or one PC with a 4090/5090 + 64&ndash;128 GB
      RAM. Cheapest, quietest, easiest to keep running, no networking concerns. Caps out
      at one model loaded at a time and one or two concurrent serious users. The right
      starting point for most households.
    </p>

    <h3>2. The hub-and-spoke (1 GPU host + N clients)</h3>
    <p>
      A serious GPU host runs Ollama, vLLM, or LM Studio in server mode; every laptop and
      desktop on the LAN points its OpenAI-compatible client at the host. Serves a
      household of 5&ndash;10 people without breaking a sweat. Doesn&rsquo;t require any
      pooling magic &mdash; the GPU host carries the entire model. See{" "}
      <a href="/guides/how-to-share-a-gpu-across-machines">how to share a GPU across
      machines</a> for the setup.
    </p>

    <h3>3. The pod (3&ndash;6 peers, no fixed leader)</h3>
    <p>
      Hyperspace, exo, or llama.cpp RPC across 3&ndash;6 reasonably-specced machines. No
      machine has to hold the whole model; layers are sharded by available memory. Resilient
      to any one member sleeping. The right call when you have several existing machines and
      don&rsquo;t want to buy a dedicated GPU host. See{" "}
      <a href="/guides/how-to-combine-laptops-to-run-large-llms">how to combine laptops to
      run large LLMs</a> and the deeper{" "}
      <a href="/guides/how-to-set-up-a-hyperspace-pod">hyperspace pod walkthrough</a>.
    </p>

    <h3>4. The hybrid (1 GPU host + pod for overflow)</h3>
    <p>
      Mac Studio runs the everyday 70B; pod members carry sharded copies of larger or
      specialized models that the hub doesn&rsquo;t fit. The serving daemon load-balances
      based on which model the request needs. Worth doing only after the simpler shapes feel
      saturated.
    </p>

    <h2>Hardware shopping list, ordered by impact</h2>

    <h3>Memory beats clock speed</h3>
    <p>
      For inference, available unified memory or VRAM is the single most predictive number.
      A 64 GB M2 Max running 70B Q4 is more useful than a 32 GB M3 Max at higher per-core
      speed: the larger machine actually fits the model. Ranking the options at typical 2026
      retail:
    </p>
    <ul>
      <li><strong>$1,800&ndash;2,500:</strong> used Mac Studio M2 Max 64 GB or Mac Mini M4 Pro 64 GB.</li>
      <li><strong>$2,800&ndash;3,800:</strong> Mac Studio M2/M3 Ultra 128 GB. The sweet spot.</li>
      <li><strong>$4,500+:</strong> Mac Studio M3/M4 Ultra 192 GB. Hosts 70B FP8 or any current Mixtral.</li>
      <li><strong>$2,000&ndash;3,500 PC:</strong> 4090 or 5090 + 64&ndash;128 GB DDR5. Faster on
        small models, slower than the bigger Mac on 70B+ via offload.</li>
      <li><strong>$8,000+:</strong> dual 4090 / 5090 in a single chassis with NVLink. Tensor
        parallel for 70B at 25+ tokens/sec.</li>
    </ul>

    <h3>Network is non-negotiable for pods</h3>
    <p>
      Wi-Fi 6 works for casual pod use; serious pods want at least 2.5 GbE wired between every
      member. Components that pay for themselves quickly:
    </p>
    <ul>
      <li><strong>2.5 GbE / 10 GbE switch ($120&ndash;300):</strong> the difference between
        &ldquo;tokens stutter when someone joins a Zoom&rdquo; and &ldquo;cluster behaves like
        one machine.&rdquo;</li>
      <li><strong>USB-C/Thunderbolt ethernet adapters ($30&ndash;60):</strong> for laptops
        without built-in 2.5 GbE.</li>
      <li><strong>Cat 6 cable runs:</strong> avoid Cat 5e in 2026; the price is the same and
        the headroom matters.</li>
    </ul>

    <h3>Power, cooling, and noise</h3>
    <ul>
      <li><strong>Plan for 200&ndash;500 W of sustained draw</strong> per active host during
        inference. A 4090 host pegs at ~450 W, a Mac Studio Ultra at ~150 W, a laptop in a pod
        at ~40&ndash;80 W.</li>
      <li><strong>UPS ($150&ndash;300):</strong> a brownout in the middle of a long generation
        wastes the whole context. A small CyberPower or APC unit covers the GPU host and
        switch.</li>
      <li><strong>Closed-room thermal headroom:</strong> running 70B for hours raises room
        temperature noticeably. A small portable AC or just a doorway open is the cheapest
        fix.</li>
      <li><strong>Acoustics:</strong> a desktop GPU at full tilt is ~50 dBA, which is
        distracting in the same room. Either move the host (a closet with vented door is the
        classic answer) or pick Mac Silicon, which stays under 35 dBA at full inference.</li>
    </ul>

    <h2>The software stack to install once</h2>
    <ol>
      <li><strong>Ollama</strong> on the GPU host: easiest model fetch and OpenAI-compatible
        endpoint. <a href="/guides/how-to-use-ollama">Setup guide</a>.</li>
      <li><strong>llama.cpp</strong> as backup: more control, better offload tuning, used when
        Ollama&rsquo;s defaults aren&rsquo;t cutting it. <a href="/guides/how-to-use-llama-cpp">Setup guide</a>.</li>
      <li><strong>vLLM</strong> when you need throughput for 5+ concurrent users.</li>
      <li><strong>Hyperspace</strong> when you outgrow the single host and want
        OpenAI-compatible pod surface with auto-sharding. <a href="/guides/how-to-set-up-a-hyperspace-pod">Setup guide</a>.</li>
      <li><strong>A reverse proxy</strong> (Caddy or Traefik) if any endpoint needs HTTPS or
        public exposure.</li>
    </ol>

    <h2>Models worth keeping local in 2026</h2>
    <p>
      Curate a small library &mdash; running every benchmark winner is a recipe for filling a
      drive with stuff you never use. A useful three-model lineup:
    </p>
    <ul>
      <li><strong>Qwen 2.5 / Qwen 3.5 32B Q4:</strong> code, refactors, long-form reasoning. Best
        open-weight code model below 70B.</li>
      <li><strong>Llama 3.3 70B Q4:</strong> general-purpose flagship. Slow on smaller setups, but
        the quality bar for everything else.</li>
      <li><strong>Gemma 2 9B FP16:</strong> the &ldquo;answer in 200 ms&rdquo; model for
        autocomplete and small classifications.</li>
    </ul>
    <p>
      The <a href="/tools/ai-model-compare">AI model compare tool</a> tracks current
      benchmarks if you want to swap one out.
    </p>

    <h2>Realistic timeline and budget</h2>
    <ul>
      <li><strong>Weekend 1, $0&ndash;3,500:</strong> single host with Ollama running 8B + 32B
        models. Most of your value-from-AI need will already be covered.</li>
      <li><strong>Weekend 2, +$200&ndash;500:</strong> wired networking upgrade, expose endpoint
        to the rest of the household, install on every client. You now have a household AI
        utility.</li>
      <li><strong>Weekend 3 (only if needed), +$0:</strong> turn it into a Hyperspace pod or add
        a second machine. Now you can host 70B without buying a $4,500 box.</li>
    </ul>

    <h2>Cost vs cloud, run honestly</h2>
    <p>
      Plug actual numbers into the <a href="/tools/ai-cost-estimator">AI cost estimator</a>.
      The break-even for an individual heavy user against API pricing is roughly:
    </p>
    <ul>
      <li>$60/month API spend &approx; payback on a $1,800 used Mac Studio in 2.5 years.</li>
      <li>$200/month team API spend &approx; payback on a $3,500 Mac Studio Ultra in 18 months.</li>
      <li>$500/month team API spend &approx; payback on a multi-machine pod within 6 months,
        with no hardware purchase.</li>
    </ul>
    <p>
      The non-financial wins are usually bigger than the dollar math: privacy on sensitive
      code or documents, no rate limits, no quota anxiety, and a quiet hum in the closet
      that just keeps working.
    </p>
  </>
);
