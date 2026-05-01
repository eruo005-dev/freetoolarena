import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    A 24 GB RTX 4090 sitting idle in a desktop is wasted potential when there are three other
    machines on your LAN waiting on inference. Sharing GPUs across machines used to mean
    expensive InfiniBand fabric and DGX-class hardware. In 2026 the same outcome &mdash;
    multiple clients, one shared accelerator, sub-100 ms first-token latency &mdash; is a
    weekend project on commodity gear.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Three ways to share, ordered by what you&rsquo;re trying to do</h2>

    <h3>1. One GPU serves many clients (the 90% case)</h3>
    <p>
      You don&rsquo;t want to combine GPUs &mdash; you want one fast GPU to serve a whole
      household or team. The right pattern is a model-serving daemon on the GPU host that
      exposes an HTTP endpoint everyone else points their tools at. Pick one of:
    </p>
    <ul>
      <li><strong>Ollama (easiest):</strong> single binary, OpenAI-compatible endpoint, one-line
        model pulls. <code>OLLAMA_HOST=0.0.0.0:11434 ollama serve</code> exposes it on the LAN.
        See <a href="/guides/how-to-use-ollama">how to use Ollama</a> for setup.</li>
      <li><strong>vLLM (highest throughput):</strong> the right call for 5+ concurrent users.
        Continuous batching plus PagedAttention can serve 5&ndash;20&times; the tokens/sec of a
        naive single-stream server on the same hardware.</li>
      <li><strong>LM Studio server mode:</strong> if you want a GUI for the GPU host and an
        API for clients. Same OpenAI surface as Ollama.</li>
    </ul>
    <p>
      All three speak the OpenAI HTTP wire format, so clients (Cursor, Continue.dev, custom
      scripts, agents) need only a base URL change to start using the shared GPU.
    </p>

    <h3>2. One model split across multiple GPUs on the same machine</h3>
    <p>
      If you have two 24-GB cards in one box and want to run a 70B model in FP8 (~70 GB),
      that&rsquo;s tensor parallelism. Both vLLM and TGI handle it natively:
    </p>
    <pre className="overflow-x-auto rounded bg-slate-900 p-3 text-xs text-slate-100"><code>{`# vLLM: split the model across both cards on this host
vllm serve meta-llama/Llama-3.3-70B-Instruct \\
    --tensor-parallel-size 2 \\
    --gpu-memory-utilization 0.92 \\
    --max-model-len 32768`}</code></pre>
    <p>
      The two GPUs need to be in the same chassis with NVLink or at least PCIe 4.0 x16 each.
      Splitting one model across PCIe between machines is technically possible but
      latency-prohibitive &mdash; do that with pipeline parallelism (next section) instead of
      tensor parallelism.
    </p>

    <h3>3. One model split across multiple machines (pipeline parallelism)</h3>
    <p>
      Different machines on the same LAN can each hold a slice of a model and pipeline tokens
      through the resulting ring. This is what Hyperspace, exo, llama.cpp RPC, and Petals all
      do under different brand names. The deep dive lives in{" "}
      <a href="/guides/how-to-combine-laptops-to-run-large-llms">how to combine laptops to
      run large LLMs</a> &mdash; the GPU-specific concern here is matching <em>compute</em>
      to <em>memory</em> on each shard so no node becomes the bottleneck.
    </p>

    <h2>Throughput math you should run before buying anything</h2>
    <p>
      The output of a serving stack is tokens-per-second-per-user multiplied by concurrent
      users. Both numbers move with the model size and the request mix. Rough single-GPU
      ballpark on an RTX 4090 (24 GB), measured with vLLM:
    </p>
    <table className="my-3 w-full text-left text-sm">
      <thead className="text-xs uppercase tracking-wide text-slate-500">
        <tr>
          <th className="py-1">Model</th>
          <th className="py-1">1 user (tok/s)</th>
          <th className="py-1">4 users (tok/s each)</th>
          <th className="py-1">16 users (tok/s each)</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t border-slate-100"><td className="py-1">Qwen 2.5 7B Q5</td><td className="py-1">120</td><td className="py-1">~95</td><td className="py-1">~55</td></tr>
        <tr className="border-t border-slate-100"><td className="py-1">Llama 3.1 8B FP16</td><td className="py-1">90</td><td className="py-1">~70</td><td className="py-1">~30</td></tr>
        <tr className="border-t border-slate-100"><td className="py-1">Mixtral 8x7B Q4</td><td className="py-1">55</td><td className="py-1">~45</td><td className="py-1">~25</td></tr>
        <tr className="border-t border-slate-100"><td className="py-1">Llama 3.3 70B Q4 (offloaded)</td><td className="py-1">12</td><td className="py-1">~9</td><td className="py-1">stalls</td></tr>
      </tbody>
    </table>
    <p>
      The pattern: small models with continuous batching deliver near-linear scaling up to
      4&ndash;8 simultaneous users. Past that the math depends on cache pressure and prompt
      length.
    </p>

    <h2>Network requirements (less than you think for case 1)</h2>
    <p>
      For the &ldquo;one GPU, many clients&rdquo; pattern, the network sees compact request /
      response tokens &mdash; usually 1&ndash;10 KB per round trip. A standard 1 GbE LAN
      handles 50+ concurrent users without breaking a sweat. The sensitive number is
      latency, not bandwidth: ping the GPU host from each client; if it&rsquo;s under 5 ms,
      you&rsquo;re fine. Wi-Fi is usable but adds a noticeable first-token delay versus
      wired.
    </p>
    <p>
      For tensor-parallel splitting across machines (rare, hard, and slow over PCIe-class
      hardware), you&rsquo;re in 25 GbE+ territory. Skip it for home labs.
    </p>

    <h2>What about Apple Silicon, ROCm, and CPU-only hosts?</h2>
    <ul>
      <li><strong>Apple Silicon (M1&ndash;M4, M-Ultra):</strong> unified memory makes a Mac
        Studio with 192 GB the cheapest 70B host on the market. Ollama, LM Studio, and exo
        all use Metal natively &mdash; no CUDA, no ROCm, just works.</li>
      <li><strong>AMD ROCm (RX 7900 XTX, MI300X):</strong> 2026 ROCm support in vLLM and
        llama.cpp is solid. Performance is within 10&ndash;25% of CUDA on equivalent silicon
        for most workloads.</li>
      <li><strong>Intel Arc + iGPU:</strong> usable via SYCL backends in llama.cpp; performance
        depends heavily on memory bandwidth more than the GPU itself.</li>
      <li><strong>CPU-only:</strong> realistic for 8B-class models at Q4&ndash;Q5. AVX-512 and
        Apple AMX speed it up; commodity x86 without AVX-512 caps out at ~5 tokens/sec for 8B.</li>
    </ul>

    <h2>Auth and access control</h2>
    <p>
      Once a GPU is exposed on the LAN, you&rsquo;ve created an open AI endpoint. Anyone who
      can reach <code>192.168.1.10:11434</code> can query your models. Don&rsquo;t expose this
      to the public internet without a reverse proxy that does at least:
    </p>
    <ul>
      <li>API-key header check (<code>Authorization: Bearer ...</code>).</li>
      <li>Rate limiting per key (Caddy, Traefik, or nginx all handle this with one config block).</li>
      <li>HTTPS &mdash; modern OpenAI clients refuse plain HTTP for non-localhost endpoints.</li>
    </ul>
    <p>
      For team setups, a Hyperspace pod handles the auth and treasury layers natively &mdash;
      see <a href="/guides/how-to-set-up-a-hyperspace-pod">the pod guide</a>.
    </p>

    <h2>The 30-minute starter</h2>
    <ol>
      <li>Pick the GPU host. Plug it into wired ethernet.</li>
      <li>Install Ollama. Pull two models: a 7B for speed (<code>qwen2.5:7b</code>) and a 70B
        Q4 for quality (<code>llama3.3:70b-q4_K_M</code>).</li>
      <li><code>OLLAMA_HOST=0.0.0.0:11434 ollama serve</code></li>
      <li>On every client machine, point the OpenAI base URL at{" "}
        <code>http://&lt;gpu-host-ip&gt;:11434/v1</code>. Cursor, Continue.dev, your custom
        scripts &mdash; same code, different base URL.</li>
      <li>Use the <a href="/tools/ai-cost-estimator">AI cost estimator</a> to compare what
        you&rsquo;d save vs paid APIs at your usage level.</li>
    </ol>
    <p>
      That&rsquo;s the foundation. Add vLLM later if you outgrow Ollama&rsquo;s throughput,
      add a pod (Hyperspace / exo) when you outgrow a single GPU&rsquo;s memory budget.
    </p>
  </>
);
