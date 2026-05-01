import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Running a 70B-parameter model used to require a $30,000 server. In 2026 it runs on a
    $2,000 desktop, an $1,800 Mac Studio, or three laptops you already own. The key is
    knowing which compromise to make &mdash; quantization, offloading, or pooling &mdash; and
    when to stop chasing the next GB and just call the cloud for the prompts that need it.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What &ldquo;70B&rdquo; actually weighs</h2>
    <p>
      Parameter count is the headline number; on-disk size depends on quantization. The same
      Llama 3.3 70B weights ship in many flavors:
    </p>
    <table className="my-3 w-full text-left text-sm">
      <thead className="text-xs uppercase tracking-wide text-slate-500">
        <tr>
          <th className="py-1">Quantization</th>
          <th className="py-1">File size</th>
          <th className="py-1">Quality vs FP16</th>
          <th className="py-1">Min memory needed</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t border-slate-100"><td className="py-1">FP16 (full)</td><td className="py-1">~140 GB</td><td className="py-1">100%</td><td className="py-1">144 GB total</td></tr>
        <tr className="border-t border-slate-100"><td className="py-1">Q8_0 (8-bit)</td><td className="py-1">~70 GB</td><td className="py-1">~99.5%</td><td className="py-1">76 GB total</td></tr>
        <tr className="border-t border-slate-100"><td className="py-1">Q5_K_M (5-bit)</td><td className="py-1">~52 GB</td><td className="py-1">~98%</td><td className="py-1">58 GB total</td></tr>
        <tr className="border-t border-slate-100"><td className="py-1">Q4_K_M (4-bit)</td><td className="py-1">~42 GB</td><td className="py-1">~96%</td><td className="py-1">48 GB total</td></tr>
        <tr className="border-t border-slate-100"><td className="py-1">Q3_K_M (3-bit)</td><td className="py-1">~32 GB</td><td className="py-1">~93%</td><td className="py-1">38 GB total</td></tr>
        <tr className="border-t border-slate-100"><td className="py-1">IQ2_XS (2-bit)</td><td className="py-1">~22 GB</td><td className="py-1">~88%</td><td className="py-1">26 GB total</td></tr>
      </tbody>
    </table>
    <p>
      Q4_K_M is the sweet spot for almost everyone &mdash; ~4% quality loss for 3.3&times;
      less memory. Past Q3 the model starts producing visibly worse code and reasoning. The
      &ldquo;min memory needed&rdquo; column adds a 6&ndash;8 GB headroom for KV cache at
      typical context lengths.
    </p>

    <h2>Path 1: a single machine with enough unified memory</h2>
    <p>
      Apple Silicon&rsquo;s unified memory architecture makes Macs the cheapest single-box
      70B hosts. The relevant configurations:
    </p>
    <ul>
      <li><strong>M2 Max MacBook Pro 64 GB</strong> (~$2,800 used): runs 70B Q4 at 6&ndash;9
        tokens/sec. Battery-friendly. The cheapest portable option.</li>
      <li><strong>Mac Studio M2 Ultra 128 GB</strong> (~$3,500 refurb): runs 70B Q5 at
        12&ndash;16 tokens/sec. Sweet spot for serious solo use.</li>
      <li><strong>Mac Studio M3/M4 Ultra 192 GB</strong> ($4,000+): runs 70B FP8 or Mixtral
        8x22B at 18&ndash;22 tokens/sec.</li>
    </ul>
    <p>
      On the PC side, a single 24 GB RTX 4090 or RTX 5090 won&rsquo;t hold a 70B model in VRAM,
      but llama.cpp&rsquo;s GGUF offloading will run it by streaming layers between RAM and
      VRAM. Expect 8&ndash;14 tokens/sec on a 4090 + 64 GB DDR5 system. Worth the trade-off
      because 4090s are excellent at smaller models too.
    </p>

    <h2>Path 2: GPU offloading (the underused trick)</h2>
    <p>
      You don&rsquo;t need to fit the entire model in VRAM. llama.cpp&rsquo;s{" "}
      <code>--n-gpu-layers</code> flag lets you load N transformer layers onto the GPU and
      keep the rest in CPU RAM. The GPU does fast matrix math on its layers; the CPU does
      slower math on its layers; they trade activations through the system RAM bus.
    </p>
    <pre className="overflow-x-auto rounded bg-slate-900 p-3 text-xs text-slate-100"><code>{`# 70B Q4_K_M on a 24 GB GPU + 64 GB system RAM
# 80 layers total in Llama 3.3 70B; 32 fits in 24 GB VRAM
./llama-server \\
    -m models/llama-3.3-70b-instruct.Q4_K_M.gguf \\
    -ngl 32 \\
    -c 8192 \\
    --host 0.0.0.0 \\
    --port 8080`}</code></pre>
    <p>
      Speed scales roughly linearly with layers offloaded: 0 layers on GPU = ~3 tokens/sec
      pure CPU; 32 layers on a 4090 = ~10 tokens/sec; 80 layers (all on GPU, requires
      80+ GB VRAM) = ~25 tokens/sec. For most setups, 30&ndash;50% of layers on GPU is the
      knee of the curve.
    </p>

    <h2>Path 3: pooling machines you already own</h2>
    <p>
      Three 32 GB laptops can hold 70B Q4 between them &mdash; they each store ~26 layers and
      pipeline tokens through the ring. Two 64 GB Macs and one 32 GB Linux box do the same.
      A four-machine cluster of mixed hardware easily hosts 70B at Q5 with room for 32k
      context. The runtimes worth knowing live in{" "}
      <a href="/guides/how-to-combine-laptops-to-run-large-llms">how to combine laptops to
      run large LLMs</a>.
    </p>
    <p>
      The advantage of pooling versus buying: you keep the existing machines useful for
      everything else, and adding more capacity is one invite link, not a $4,000 hardware
      purchase. The disadvantage: tokens-per-second is bound by the slowest member, and
      anyone closing their laptop redistributes the model.
    </p>

    <h2>What the speeds actually feel like</h2>
    <ul>
      <li><strong>20+ tok/s:</strong> reads as fast as you can. Flagship-cloud-feel.</li>
      <li><strong>10&ndash;20 tok/s:</strong> totally usable for code and prose. The speed of
        thinking.</li>
      <li><strong>5&ndash;10 tok/s:</strong> background-task-OK. Fine for &ldquo;summarize
        this&rdquo; and async agents; mildly slow for chat.</li>
      <li><strong>2&ndash;5 tok/s:</strong> noticeable wait. Use it for batch jobs, not
        interactive sessions.</li>
      <li><strong>Under 2 tok/s:</strong> something is misconfigured. Almost always GPU
        offload disabled or swap thrashing.</li>
    </ul>

    <h2>Context window: the silent multiplier</h2>
    <p>
      Memory cost grows with the context window because the KV cache stores keys and values
      for every token in the prompt. Rough sizing:
    </p>
    <ul>
      <li>70B at 4k context: ~2 GB KV cache.</li>
      <li>70B at 32k context: ~16 GB KV cache.</li>
      <li>70B at 128k context: ~64 GB KV cache &mdash; bigger than the model.</li>
    </ul>
    <p>
      Halving context-window size sometimes lets you bump up one quantization tier. Use the{" "}
      <a href="/tools/llm-context-window-calculator">LLM context window calculator</a> to
      plan a configuration before you waste an evening on out-of-memory errors.
    </p>

    <h2>The power, heat, and noise reality</h2>
    <p>
      Running 70B at full tilt on a 4090 desktop draws ~450&ndash;550 W and pushes case
      temperatures hard. A Mac Studio M2 Ultra under the same load draws ~120&ndash;180 W
      and stays whisper-quiet. If you&rsquo;re running this in a home office with a partner
      who works on calls in the same room, the Mac is worth a meaningful premium.
    </p>
    <p>
      Pods spread the heat. Two laptops at 30% each are quieter than one desktop at 90%, and
      they keep their airflow happy because no single fan is pegged.
    </p>

    <h2>When 70B is the wrong answer</h2>
    <p>
      Run a 70B locally if your workloads include long-context reasoning, complex code
      review, or multi-step agents that need the quality. Don&rsquo;t bother for:
    </p>
    <ul>
      <li>Autocomplete, doc summaries, simple classification &mdash; an 8B model at 80 tok/s
        is a much better experience.</li>
      <li>One-off questions &mdash; the 5 cents you&rsquo;d pay a hosted frontier model is
        cheaper than your time waiting for a local 70B.</li>
      <li>Anything requiring fresh web data &mdash; pair a smaller local model with a search
        tool, or fall back to the cloud (a Hyperspace pod can route to either automatically).</li>
    </ul>

    <h2>Three reference builds</h2>
    <ul>
      <li><strong>$1,800 cheapest path:</strong> used Mac Studio M2 Max 64 GB + Ollama. Solo use,
        70B Q4, 6&ndash;8 tok/s.</li>
      <li><strong>$3,500 sweet spot:</strong> Mac Studio M2 Ultra 128 GB + Ollama or LM Studio.
        Team-of-3 use, 70B Q5, 12&ndash;16 tok/s.</li>
      <li><strong>$0 if you have it:</strong> existing 4&ndash;5 laptops on Wi-Fi 6, joined into
        a Hyperspace pod (<a href="/guides/how-to-set-up-a-hyperspace-pod">setup guide</a>).
        Team-of-5 use, 70B Q4, 8&ndash;12 tok/s, with a wholesale-priced cloud fallback for
        when you actually need a frontier model.</li>
    </ul>
    <p>
      To plug in your specific cost numbers and compare against cloud APIs, the{" "}
      <a href="/tools/ai-cost-estimator">AI cost estimator</a> handles the math. To compare
      open-weight models that fit in your memory budget, the{" "}
      <a href="/tools/ai-model-compare">AI model compare</a> tool tracks current benchmarks
      across reasoning, code, and multi-language work.
    </p>
  </>
);
