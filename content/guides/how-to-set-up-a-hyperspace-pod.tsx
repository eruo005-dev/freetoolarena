/* eslint-disable react/no-unescaped-entities */
/**
 * Reusable, no-JS visuals for this guide. Pure inline SVG with CSS keyframes,
 * which means they animate on the static page without a client component.
 * Keeping them inline (rather than in /components) because they are extremely
 * specific to this guide and not reused elsewhere.
 */
import type { CSSProperties, ReactNode } from "react";

const PodMeshDemo = () => (
  <figure className="my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4">
    <style>{`
      @keyframes pod-pulse { 0%,100% { opacity:.25 } 50% { opacity:1 } }
      @keyframes pod-flow { 0% { offset-distance: 0% } 100% { offset-distance: 100% } }
      @keyframes pod-glow { 0%,100% { filter: drop-shadow(0 0 2px #3b82f6) } 50% { filter: drop-shadow(0 0 10px #3b82f6) } }
      .pod-edge { stroke:#94a3b8; stroke-width:1.5; stroke-dasharray:4 4; animation: pod-pulse 3s ease-in-out infinite; }
      .pod-edge.b { animation-delay:.5s } .pod-edge.c { animation-delay:1s } .pod-edge.d { animation-delay:1.5s } .pod-edge.e { animation-delay:2s }
      .pod-laptop { fill:#fff; stroke:#0f172a; stroke-width:1.5; }
      .pod-screen { fill:#0f172a; }
      .pod-shard { animation: pod-glow 2s ease-in-out infinite; }
      .pod-packet { offset-rotate:0deg; animation: pod-flow 4s linear infinite; }
    `}</style>
    <svg viewBox="0 0 520 320" role="img" aria-label="Five laptops arranged in a ring, connected by pulsing dashed lines, with colored shards representing model layers split across each machine." style={{ width: "100%", height: "auto" }}>
      {/* Edges between every pair of nodes (pentagon mesh) */}
      <g>
        <line className="pod-edge"   x1="260" y1="60"  x2="450" y2="170" />
        <line className="pod-edge b" x1="450" y1="170" x2="380" y2="290" />
        <line className="pod-edge c" x1="380" y1="290" x2="140" y2="290" />
        <line className="pod-edge d" x1="140" y1="290" x2="70"  y2="170" />
        <line className="pod-edge e" x1="70"  y1="170" x2="260" y2="60"  />
        <line className="pod-edge"   x1="260" y1="60"  x2="380" y2="290" />
        <line className="pod-edge b" x1="260" y1="60"  x2="140" y2="290" />
        <line className="pod-edge c" x1="70"  y1="170" x2="450" y2="170" />
      </g>

      {/* Laptops with model "shards" inside the screen */}
      {[
        { x: 260, y: 60,  shard: "#3b82f6", label: "Layers 1–7"   },
        { x: 450, y: 170, shard: "#22c55e", label: "Layers 8–14"  },
        { x: 380, y: 290, shard: "#f59e0b", label: "Layers 15–21" },
        { x: 140, y: 290, shard: "#a855f7", label: "Layers 22–28" },
        { x: 70,  y: 170, shard: "#ec4899", label: "Layers 29–32" },
      ].map((n) => (
        <g key={`${n.x}-${n.y}`} transform={`translate(${n.x - 38},${n.y - 24})`}>
          <rect className="pod-laptop" x="0"  y="0"  width="76" height="46" rx="4" />
          <rect className="pod-screen" x="6"  y="6"  width="64" height="34" rx="2" />
          <rect className="pod-shard"  x="10" y="14" width="56" height="6"  rx="2" fill={n.shard} />
          <rect x="10" y="24" width="38" height="3" rx="1" fill="#475569" opacity=".55" />
          <rect x="10" y="30" width="48" height="3" rx="1" fill="#475569" opacity=".35" />
          <rect x="-4" y="46" width="84" height="3" rx="1.5" fill="#0f172a" />
          <text x="38" y="64" textAnchor="middle" fontSize="9" fontFamily="ui-monospace,monospace" fill="#0f172a">{n.label}</text>
        </g>
      ))}

      {/* Prompt packet flowing around the ring */}
      <circle r="6" fill="#3b82f6" className="pod-packet"
        style={{ offsetPath: "path('M 260 60 L 450 170 L 380 290 L 140 290 L 70 170 Z')" } as CSSProperties} />
      <circle r="4" fill="#22c55e" className="pod-packet"
        style={{ offsetPath: "path('M 260 60 L 450 170 L 380 290 L 140 290 L 70 170 Z')", animationDelay: "-2s" } as CSSProperties} />
    </svg>
    <figcaption className="mt-2 text-center text-sm text-slate-500">
      Five laptops, one model. Layers split proportionally; the prompt pipelines through the ring and the response comes back.
    </figcaption>
  </figure>
);

const ShardingDemo = () => (
  <figure className="my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4">
    <style>{`
      @keyframes pod-fade { 0%,30% { opacity:0; transform: translateY(-6px) } 60%,100% { opacity:1; transform: translateY(0) } }
      .pod-bar { animation: pod-fade .8s ease-out both; }
    `}</style>
    <svg viewBox="0 0 520 220" role="img" aria-label="A 32-layer model bar splits into five colored segments, each routed to one of five laptops." style={{ width: "100%", height: "auto" }}>
      {/* The whole model */}
      <text x="20" y="32" fontSize="11" fontFamily="ui-monospace,monospace" fill="#0f172a">qwen-3.5-32b · 32 layers · ~64 GB</text>
      <rect x="20" y="40" width="480" height="28" rx="4" fill="#e2e8f0" />
      {[
        { x: 20,  w: 96, c: "#3b82f6" },
        { x: 116, w: 96, c: "#22c55e" },
        { x: 212, w: 96, c: "#f59e0b" },
        { x: 308, w: 96, c: "#a855f7" },
        { x: 404, w: 96, c: "#ec4899" },
      ].map((s, i) => (
        <rect key={i} className="pod-bar" style={{ animationDelay: `${i * 0.15}s` }}
              x={s.x} y="40" width={s.w} height="28" rx="4" fill={s.c} />
      ))}

      {/* Down arrows */}
      {[68, 164, 260, 356, 452].map((cx, i) => (
        <path key={i} className="pod-bar" style={{ animationDelay: `${i * 0.15 + 0.4}s` }}
              d={`M ${cx} 78 L ${cx} 110 M ${cx - 5} 102 L ${cx} 110 L ${cx + 5} 102`}
              stroke="#475569" strokeWidth="1.5" fill="none" />
      ))}

      {/* Five target machines */}
      {[
        { x: 28,  c: "#3b82f6", t: "M1 · 24 GB"  },
        { x: 124, c: "#22c55e", t: "M2 · 16 GB"  },
        { x: 220, c: "#f59e0b", t: "M3 · 16 GB"  },
        { x: 316, c: "#a855f7", t: "M4 · 8 GB"   },
        { x: 412, c: "#ec4899", t: "M5 · 8 GB"   },
      ].map((m, i) => (
        <g key={i} className="pod-bar" style={{ animationDelay: `${i * 0.15 + 0.7}s` }}>
          <rect x={m.x} y="120" width="80" height="56" rx="6" fill="#fff" stroke="#0f172a" strokeWidth="1.5" />
          <rect x={m.x + 6} y="128" width="68" height="6" rx="2" fill={m.c} />
          <rect x={m.x + 6} y="140" width="48" height="4" rx="1" fill="#cbd5e1" />
          <rect x={m.x + 6} y="148" width="58" height="4" rx="1" fill="#cbd5e1" />
          <text x={m.x + 40} y="194" textAnchor="middle" fontSize="10" fontFamily="ui-monospace,monospace" fill="#0f172a">{m.t}</text>
        </g>
      ))}
    </svg>
    <figcaption className="mt-2 text-center text-sm text-slate-500">
      Layer assignment is proportional to free VRAM. The 24 GB machine carries more layers than the 8 GB ones.
    </figcaption>
  </figure>
);

const CostCompareDemo = () => (
  <figure className="my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4">
    <style>{`
      @keyframes pod-grow { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
      .pod-grow { transform-origin: left center; animation: pod-grow 1.2s cubic-bezier(.2,.7,.2,1) both; }
    `}</style>
    <svg viewBox="0 0 520 200" role="img" aria-label="Bar chart comparing monthly AI cost: cloud at $1,400 versus a pod at about $14 in electricity." style={{ width: "100%", height: "auto" }}>
      <text x="20" y="22" fontSize="12" fontFamily="ui-sans-serif,system-ui" fill="#0f172a" fontWeight="600">Monthly cost · 5-person team · ~30M tokens</text>

      <text x="20" y="60" fontSize="11" fontFamily="ui-monospace,monospace" fill="#475569">Cloud API (frontier model)</text>
      <rect className="pod-grow" x="20"  y="68" width="460" height="22" rx="4" fill="#ef4444" />
      <text x="486" y="84" fontSize="11" fontFamily="ui-monospace,monospace" fill="#0f172a">$1,400</text>

      <text x="20" y="118" fontSize="11" fontFamily="ui-monospace,monospace" fill="#475569">Pod (electricity only)</text>
      <rect className="pod-grow" style={{ animationDelay: ".4s" }} x="20" y="126" width="14" height="22" rx="4" fill="#22c55e" />
      <text x="40" y="142" fontSize="11" fontFamily="ui-monospace,monospace" fill="#0f172a">~$14</text>

      <text x="20" y="180" fontSize="10" fontFamily="ui-sans-serif,system-ui" fill="#64748b">
        Cloud figure based on Sonnet-class pricing at ~$3 in / $15 out per million tokens. Pod figure assumes ~150 W average across active machines at $0.13 / kWh.
      </text>
    </svg>
  </figure>
);

const TerminalCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="my-6 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-sm">
    <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800 px-4 py-2 text-xs text-slate-300">
      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <span className="ml-2 font-mono">{title}</span>
    </div>
    <pre className="!my-0 overflow-x-auto bg-slate-900 px-4 py-3 text-sm leading-relaxed text-slate-100"><code>{children}</code></pre>
  </div>
);

export const intro = (
  <>
    <p>
      Hyperspace Pods lets a small group of people — a family, a startup, a
      few friends — pool the laptops and desktops they already own into one
      shared AI cluster. Everyone installs the CLI, someone creates a pod,
      shares an invite link, and the machines form a peer-to-peer mesh.
      Models that need more memory than any single laptop has — Qwen 3.5 32B,
      GLM-5 Turbo — get sharded across the group automatically.
    </p>
    <p>
      From the outside it looks like one OpenAI-compatible API endpoint with
      a <code>pk_*</code> key that drops straight into your IDE, your agent,
      or any tool that already speaks the OpenAI protocol. No configuration
      beyond pasting the key and changing the base URL. This guide walks you
      through what Pods are, how the sharding actually works, and the four
      commands to set one up. Pods ship today in Hyperspace v5.19.
    </p>
  </>
);

export const body = (
  <>
    <h2 id="what-it-is">What a Pod actually is</h2>
    <p>
      A pod is a group of machines running the Hyperspace CLI that have agreed
      to share inference work. Membership, API keys, and the shared treasury
      are replicated across every member using Raft consensus, so there's no
      central server to depend on. If your internet drops, the pod keeps
      running on your local network. If a member's laptop closes, the pod
      reshards around it.
    </p>

    {PodMeshDemo()}

    <p>
      The picture above is the part most people don't believe at first: there
      really is no middleman. A prompt leaves your machine, hops between your
      pod members' machines, and the response comes back the same way. The
      coordinator picks the routing, but the data plane is direct.
    </p>

    <h2 id="how-sharding-works">How automatic sharding works</h2>
    <p>
      You don't configure layer ranges or budget VRAM by hand. You tell the
      pod which model you want — say <code>qwen-3.5-32b</code> — and the
      coordinator inspects every member's free memory, splits the model's
      layers in proportion, and pipelines tokens through the resulting ring.
    </p>

    {ShardingDemo()}

    <p>
      Two things are worth noticing. First, machines with more VRAM carry
      more layers, so a beefy desktop and a thin laptop coexist gracefully —
      the desktop just pulls more weight. Second, because inference is
      pipelined, each machine is doing work on a different token at the same
      time; throughput rises with the slowest machine in the ring, not the
      fastest.
    </p>

    <h2 id="setup">Setting up a pod (4 commands)</h2>
    <p>
      The same install works on macOS, Linux, and Windows under WSL2. Bring a
      machine with at least 16 GB of unified memory or 8 GB of dedicated VRAM
      to the table; smaller machines can still join, they'll just get fewer
      layers.
    </p>

    <h3>Step 1 — Install the CLI</h3>
    <TerminalCard title="install.sh">{`# macOS / Linux
curl -fsSL https://hyperspace.ai/install | sh

# Windows (PowerShell, in WSL2)
irm https://hyperspace.ai/install.ps1 | iex`}</TerminalCard>

    <h3>Step 2 — Create the pod</h3>
    <p>
      The first member runs <code>pod create</code> on the machine that will
      host the initial Raft leader. Any member can take leader later; this is
      just where the pod is born.
    </p>
    <TerminalCard title="hyperspace pod create">{`$ hyperspace pod create --name "team-pod" --models qwen-3.5-32b,glm-5-turbo,gemma-4

  Pod created.
  Members:    1 (you)
  Treasury:   $0.00
  API base:   http://pod.local:5891/v1
  API key:    pk_live_4f9c…7a32   (shown once — copy it now)`}</TerminalCard>

    <h3>Step 3 — Invite the others</h3>
    <p>
      The invite link is short-lived and bound to the pod's identity, not to
      a public URL. Members behind home routers don't need port forwarding;
      the network handles NAT traversal automatically.
    </p>
    <TerminalCard title="hyperspace pod invite">{`$ hyperspace pod invite --uses 4 --expires 24h

  https://hyperspace.ai/i/k7Q8e3-r2tL  (4 uses · expires in 24h)

# On each invitee's machine:
$ hyperspace pod join https://hyperspace.ai/i/k7Q8e3-r2tL
  Joined "team-pod". Detected 24 GB free VRAM.
  Coordinator is resharding qwen-3.5-32b…  done.`}</TerminalCard>

    <h3>Step 4 — Point your tools at it</h3>
    <p>
      The pod exposes an OpenAI-compatible endpoint. Anything that speaks
      that protocol — the OpenAI Python SDK, your IDE, an{" "}
      <a href="/guides/how-to-build-an-agent-with-the-claude-agent-sdk">agent SDK</a>,
      a code-completion plugin, a custom script — works without a code change.
    </p>
    <TerminalCard title="python">{`from openai import OpenAI

client = OpenAI(
    base_url="http://pod.local:5891/v1",
    api_key="pk_live_4f9c…7a32",
)

resp = client.chat.completions.create(
    model="qwen-3.5-32b",
    messages=[{"role": "user", "content": "Refactor this function for clarity…"}],
)
print(resp.choices[0].message.content)`}</TerminalCard>

    <h2 id="cost">Why this changes the cost math</h2>
    <p>
      A team of five paying for cloud AI typically burns $500–$2,000 a month
      on API calls. The same team's existing machines can serve Qwen 3.5
      (competitive on SWE-bench) and GLM-5 Turbo (#1 on BrowseComp for
      tool-calling and web research) at the marginal cost of electricity. For
      day-to-day work — code review, refactors, research, drafting — local
      models handle it and nobody gets billed.
    </p>

    {CostCompareDemo()}

    <p>
      When a query genuinely needs a frontier model nobody has locally, the
      pod falls back to the cloud at wholesale rates from the shared
      treasury. So you don't have to choose between "all local" and "all
      cloud" — you get a sensible default of local, with a wholesale escape
      hatch for the 5% of queries that actually need it. If you want a
      reference point for which models punch above their weight, our{" "}
      <a href="/tools/ai-model-compare">AI model compare tool</a> lays out
      the current benchmarks side by side.
    </p>

    <h2 id="lineup">A practical three-model setup</h2>
    <p>
      Most pods we see in the wild settle on the same three models, each
      doing the job it's best at:
    </p>
    <ul>
      <li>
        <strong>Qwen 3.5 32B</strong> for code and reasoning — the workhorse
        for refactors, code review, and long-form thinking.
      </li>
      <li>
        <strong>GLM-5 Turbo</strong> for browsing and research — the current
        leader on BrowseComp for tool-calling and web research.
      </li>
      <li>
        <strong>Gemma 4</strong> for fast lightweight tasks — autocomplete,
        small classifications, anything you'd hate waiting two seconds for.
      </li>
    </ul>
    <p>
      All three load simultaneously on a five-machine pod with mixed
      hardware. The coordinator routes each request to the model the caller
      asked for; no juggling.
    </p>

    <h2 id="what-makes-this-different">What makes this different</h2>
    <ul>
      <li>
        <strong>No middleman.</strong> Prompts travel from your IDE to your
        pod members' hardware and back. There is no server in between
        reading your data.
      </li>
      <li>
        <strong>No vendor lock-in.</strong> Pod membership, API keys, and
        treasury are replicated across your own machines using Raft. If the
        internet goes down, the local network keeps working. There is no
        database in someone else's cloud that your pod depends on.
      </li>
      <li>
        <strong>Automatic sharding.</strong> You don't configure layer
        ranges or calculate VRAM budgets. Tell the pod which model you want;
        it figures out how to split it across whatever hardware is online.
      </li>
      <li>
        <strong>Real NAT traversal.</strong> Your friend behind a home
        router with a dynamic IP? Works. No VPN, no Tailscale, no port
        forwarding.
      </li>
      <li>
        <strong>Free when local.</strong> Cloud bills scale with usage. Pod
        inference on local hardware scales with nothing. The marginal cost
        of your 10,000th prompt is the electricity your laptop was already
        using.
      </li>
    </ul>

    <h2 id="treasury-marketplace">Treasury and the compute marketplace</h2>
    <p>
      The treasury is a shared balance that funds the rare cloud-fallback
      query when no local model is good enough. Any member can top it up;
      every spend is replicated to every member's ledger, so there are no
      surprise bills. When the pod is idle — overnight, weekends, while
      everyone's at lunch — you can rent its compute out on the Hyperspace
      marketplace and credit the treasury, with fine-grained permissions
      controlling who can use what.
    </p>

    <h2 id="common-mistakes">Common mistakes</h2>
    <ul>
      <li>
        <strong>Loading a model bigger than the pod's combined VRAM.</strong>
        The CLI will warn you, but if you bypass the warning the pod falls
        back to disk-swapped layers and throughput collapses. Pick a model
        that fits.
      </li>
      <li>
        <strong>Putting the leader on the laptop that closes most often.</strong>
        Raft re-elects fine, but you'll see a 2–3 second hiccup on every
        leader change. Promote the desktop that stays on.
      </li>
      <li>
        <strong>Forgetting the cloud fallback is opt-in per call.</strong>
        Pass <code>fallback="auto"</code> in your request only when you
        actually want it. Otherwise the pod returns the local model's answer
        and the treasury stays put.
      </li>
      <li>
        <strong>Counting tokens by eyeballing prompt length.</strong> Local
        is free but latency isn't — long prompts still slow the pipeline.
        Run your prompts through our{" "}
        <a href="/tools/ai-token-counter">AI token counter</a> first if
        you're tuning for speed.
      </li>
    </ul>

    <h2 id="when-not-to">When a Pod isn't the right answer</h2>
    <p>
      If you're a solo developer with one laptop and no friends to pool with,
      a single-node setup like{" "}
      <a href="/guides/how-to-use-ollama">Ollama</a> or{" "}
      <a href="/guides/how-to-use-lm-studio">LM Studio</a> is simpler and
      gives you the same local-first benefits without the coordination
      overhead. Pods earn their keep when there are at least three machines
      pooling — that's where automatic sharding and the shared treasury start
      paying for themselves.
    </p>
  </>
);

export const faq = [
  {
    q: "Does my prompt go through Hyperspace's servers?",
    a: "No. The data plane is fully peer-to-peer — your prompt travels directly from your machine to your pod members' machines and back. Hyperspace's infrastructure helps with NAT traversal and the initial handshake but never sees the prompt or response.",
  },
  {
    q: "What happens if a pod member's laptop goes to sleep mid-request?",
    a: "The coordinator detects the dropped node, reshards the model across the remaining members, and retries the in-flight request. You typically see a 1–3 second hiccup; the request completes successfully.",
  },
  {
    q: "Can I use a Hyperspace Pod with Cursor, Claude Code, or my OpenAI-SDK script?",
    a: "Yes. The pod exposes an OpenAI-compatible endpoint, so any tool that lets you set a base URL and API key works without modification — paste the pod's URL and pk_* key and you're done.",
  },
  {
    q: "How big a model can a pod actually run?",
    a: "Add up the free VRAM across your members. A pod of five mid-range machines can comfortably run 32B-parameter models like Qwen 3.5 32B; larger setups have run 70B-class models. The CLI tells you what fits before you load it.",
  },
  {
    q: "Is the pod actually free, or is there a Hyperspace subscription?",
    a: "Pods themselves are free — the CLI is open and the inference happens on hardware you already own. The shared treasury only spends money when you opt into a cloud-fallback call to a frontier model your pod can't run locally, and those are billed at wholesale rates.",
  },
];
billed at wholesale rates.",
  },
];
