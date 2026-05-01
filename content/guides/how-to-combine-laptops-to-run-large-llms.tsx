import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    A single laptop with 16 GB of RAM can run a 7B model and feel snappy. It cannot run
    Llama 3.3 70B or Qwen 3.5 72B. The fix isn&rsquo;t a $5,000 GPU upgrade &mdash; it&rsquo;s
    pooling the machines you already own. With the right runtime, three or four laptops can
    cooperatively load a model that none of them could hold alone, and serve it at the speed
    of the slowest one in the ring.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What &ldquo;combine laptops&rdquo; actually means</h2>
    <p>
      Modern open-weight LLMs are stored as a stack of transformer layers. Most layers are
      independent &mdash; layer 12 doesn&rsquo;t need to be on the same machine as layer 11,
      it just needs to receive the activations and pass them on. Distributed inference
      runtimes exploit that: they slice the model into <em>shards</em>, hand each shard to a
      different machine, and pipeline tokens through the resulting ring. The technique is
      called <strong>pipeline parallelism</strong> and it works on any commodity network
      (Wi-Fi, gigabit Ethernet, Thunderbolt-bridge).
    </p>
    <p>
      You don&rsquo;t need identical machines. A 64-GB Mac Studio, a 32-GB ThinkPad, and a
      16-GB MacBook Air can all join the same pod &mdash; the bigger machines just carry
      more layers. Your bottleneck becomes the slowest member, not the smallest.
    </p>

    <h2>The four runtimes worth knowing in 2026</h2>

    <h3>1. Hyperspace pods (easiest, OpenAI-compatible)</h3>
    <p>
      Hyperspace is a peer-to-peer pod manager: one machine runs <code>pod create</code>,
      everyone else joins with an invite link, and the resulting cluster exposes an
      OpenAI-compatible HTTP endpoint. Tools that already speak the OpenAI protocol &mdash;
      Cursor, Continue.dev, the OpenAI Python SDK, custom agents &mdash; work without code
      changes. NAT traversal is automatic, so members behind home routers don&rsquo;t need
      port forwarding. See <a href="/guides/how-to-set-up-a-hyperspace-pod">how to set up a
      hyperspace pod</a> for the full walkthrough.
    </p>

    <h3>2. exo (terminal-first, Apple Silicon shines)</h3>
    <p>
      exo (from exo Labs) is an open-source distributed inference engine that auto-discovers
      machines on your local network and shards models across them by available memory. It
      runs on macOS, Linux, iPhone, iPad, and Android, and it&rsquo;s especially fast on
      unified-memory Apple Silicon because there&rsquo;s no copy across PCIe. Single command
      to start a node:
    </p>
    <pre className="overflow-x-auto rounded bg-slate-900 p-3 text-xs text-slate-100"><code>{`# install
pip install exo

# on every machine on the same wifi:
exo`}</code></pre>
    <p>
      The first node prints a localhost API endpoint that speaks OpenAI&rsquo;s wire format.
      Pull a model with <code>exo run llama-3.1-70b</code> and exo decides which layers go
      where based on the cluster topology it discovered.
    </p>

    <h3>3. llama.cpp RPC (most control, lowest dependencies)</h3>
    <p>
      llama.cpp ships a built-in <code>rpc-server</code> mode that turns any machine into a
      shard worker. The pattern is: start <code>rpc-server</code> on each helper machine,
      then start <code>llama-server</code> on the &ldquo;leader&rdquo; with{" "}
      <code>--rpc 192.168.1.10:50052,192.168.1.11:50052</code> pointing at the helpers. The
      leader stripes layers across helpers automatically. No central registry, no daemon to
      run &mdash; just two binaries and a list of IP addresses. Works on every platform
      llama.cpp supports. Worth reading{" "}
      <a href="/guides/how-to-use-llama-cpp">how to use llama.cpp</a> first if you haven&rsquo;t.
    </p>

    <h3>4. Petals (truly distributed across the internet)</h3>
    <p>
      Petals is a BitTorrent-style network for LLMs: anyone can contribute spare compute,
      anyone can join and run inference against a model that&rsquo;s currently loaded across
      the swarm. It&rsquo;s the right choice if you want to run a 405B model and you&rsquo;re
      OK with multi-second per-token latency from public-network hops. Not the right choice
      for low-latency local pods on the same LAN.
    </p>

    <h2>Choosing between them</h2>
    <table className="my-4 w-full text-left text-sm">
      <thead className="text-xs uppercase tracking-wide text-slate-500">
        <tr>
          <th className="py-1">Use case</th>
          <th className="py-1">Pick</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t border-slate-100"><td className="py-1">Team of 3-8 sharing a pod, needs OpenAI API surface</td><td className="py-1">Hyperspace</td></tr>
        <tr className="border-t border-slate-100"><td className="py-1">Apple-Silicon-heavy household, casual use</td><td className="py-1">exo</td></tr>
        <tr className="border-t border-slate-100"><td className="py-1">Maximum control, custom quantization, mixed Linux/Windows</td><td className="py-1">llama.cpp RPC</td></tr>
        <tr className="border-t border-slate-100"><td className="py-1">Run something larger than any private pool can hold</td><td className="py-1">Petals</td></tr>
        <tr className="border-t border-slate-100"><td className="py-1">Single machine with 64+ GB and good GPU</td><td className="py-1">No clustering &mdash; just use Ollama</td></tr>
      </tbody>
    </table>

    <h2>How big a model can you actually fit?</h2>
    <p>
      Total available memory across the cluster has to exceed the model&rsquo;s on-disk size
      at your chosen quantization, plus context-window overhead. Rough rules:
    </p>
    <ul>
      <li><strong>Q4_K_M (4-bit):</strong> model size in GB &asymp; parameters in billions &times; 0.6.
        Llama 3.3 70B at Q4 is ~40 GB.</li>
      <li><strong>Q5_K_M (5-bit):</strong> ~0.75&times; parameters. 70B is ~52 GB.</li>
      <li><strong>Q8_0 (8-bit):</strong> ~1&times; parameters. 70B is ~70 GB.</li>
      <li><strong>FP16 (16-bit):</strong> ~2&times; parameters. 70B is ~140 GB.</li>
      <li><strong>Context overhead:</strong> add ~0.5 GB per 1k tokens of context window for KV cache.</li>
    </ul>
    <p>
      Use the <a href="/tools/llm-context-window-calculator">LLM context window calculator</a>
      to size the KV cache for a specific config, and the{" "}
      <a href="/tools/ai-cost-estimator">AI cost estimator</a> to compare a self-hosted pod
      against equivalent cloud-API spend. A 5-person team with three 32-GB laptops and one
      64-GB desktop can comfortably host a 70B model at Q4 for the cost of electricity.
    </p>

    <h2>Network: the part most guides skip</h2>
    <p>
      Pipeline parallelism shuttles activations between layers across the network on every
      token. The tensor sizes are small (typically 4&ndash;16 KB per token at 8B&ndash;70B
      scales), so latency hurts more than bandwidth. In rough order of best-to-worst:
    </p>
    <ul>
      <li><strong>Thunderbolt 4 / USB-C bridge (40 Gbps):</strong> two laptops cabled directly
        feel like one machine. Best for two-node pods.</li>
      <li><strong>2.5 GbE / 10 GbE wired:</strong> ideal for 3-8 node home setups; zero token-rate hit.</li>
      <li><strong>1 GbE wired:</strong> fine for any current open-weight model up to 70B.</li>
      <li><strong>Wi-Fi 6 (5 GHz, line-of-sight):</strong> usable for 7B-13B models; 70B is
        slow but works.</li>
      <li><strong>Wi-Fi over multiple walls:</strong> expect 2&ndash;3 tokens/sec at best.</li>
    </ul>

    <h2>Quick troubleshooting</h2>
    <ul>
      <li><strong>One machine&rsquo;s fans scream.</strong> Layers are unevenly assigned. Most runtimes
        have a <code>--shard-mem</code> or <code>--max-vram</code> flag to bias the split.</li>
      <li><strong>Tokens stutter mid-generation.</strong> Usually network jitter on Wi-Fi or a
        background process pegging one node&rsquo;s CPU. Wire that node, kill the process.</li>
      <li><strong>Cluster forms but inference fails.</strong> Mixed-precision mismatch &mdash; not
        every machine supports the same quantization. Pull the same exact model file (same
        SHA) on every machine.</li>
      <li><strong>Mac mini is the bottleneck despite extra RAM.</strong> Power-cap kicks in on
        small enclosures during sustained load. Plug in to wall power, not battery; raise the
        machine for airflow.</li>
    </ul>

    <h2>What the workflow actually looks like</h2>
    <p>
      Once a pod is up, you stop thinking about it. Cursor, Continue.dev, your custom
      agent, or a script all point at <code>http://pod.local:5891/v1</code> with the same
      OpenAI client they&rsquo;d use against api.openai.com. The pod handles failover when a
      member sleeps, reshards on join/leave, and falls back to the cloud (at wholesale rates)
      for the 5% of requests that genuinely need a frontier model.
    </p>
    <p>
      For the deeper architecture &mdash; how Raft picks leaders, what the treasury does,
      how local-vs-cloud routing works &mdash; see the full{" "}
      <a href="/guides/how-to-set-up-a-hyperspace-pod">hyperspace pod guide</a>. To compare
      the open-weight options worth running on a pod, the{" "}
      <a href="/tools/ai-model-compare">AI model compare tool</a> tracks current benchmarks.
    </p>
  </>
);
