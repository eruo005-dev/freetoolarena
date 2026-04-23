import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Hermes is Nous Research&rsquo;s family of open-weight fine-tunes built on top of Meta&rsquo;s Llama base models.
    This guide covers what Hermes 3 is actually good at, how to pick a size, and how to run it locally alongside
    your existing LLM stack.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Hermes models are</h2>
    <p>
      Hermes 3 is Nous Research&rsquo;s flagship fine-tune series, released in sizes matching the Llama 3.1 base
      (8B, 70B, 405B). Nous specializes in instruction-following, function calling, structured outputs, long-context
      reliability, and preserving steerability &mdash; Hermes models tend to refuse less than stock Llama-Instruct
      and follow system prompts more literally.
    </p>
    <p>
      The weights are Llama-3.1-licensed (inherited from Meta), so you can use them commercially under the usual
      Llama terms. They publish on Hugging Face under <code>NousResearch/Hermes-3-Llama-3.1-*</code>.
    </p>

    <h2>Picking the right size</h2>
    <p>Choose based on your hardware and task:</p>
    <ul>
      <li>
        <strong>Hermes 3 8B</strong> &mdash; runs on a 16GB laptop at Q4. Good agent/assistant quality, better
        function-calling than stock Llama 3.1 Instruct.
      </li>
      <li>
        <strong>Hermes 3 70B</strong> &mdash; needs serious hardware (48GB+ VRAM at Q4, or a Mac Studio with
        sufficient unified memory). Competitive with frontier open models on reasoning.
      </li>
      <li>
        <strong>Hermes 3 405B</strong> &mdash; datacenter-only. Multi-GPU or quantized heavily on an H100 cluster.
      </li>
    </ul>
    <p>
      For most local use cases, start with the 8B. It is the pragmatic sweet spot and ships with the same
      function-calling and structured-output training as its larger siblings.
    </p>

    <h2>Running Hermes locally</h2>
    <p>With Ollama, pull a community GGUF port (or roll your own via llama.cpp&rsquo;s converter):</p>
    <pre>{`ollama pull hermes3:8b
ollama run hermes3:8b "You are a terse code reviewer. Review this function: ..."`}</pre>
    <p>With llama.cpp directly, download a GGUF and serve it:</p>
    <pre>{`huggingface-cli download bartowski/Hermes-3-Llama-3.1-8B-GGUF \\
  Hermes-3-Llama-3.1-8B-Q4_K_M.gguf --local-dir ./models
./build/bin/llama-server -m ./models/Hermes-3-Llama-3.1-8B-Q4_K_M.gguf \\
  --host 0.0.0.0 --port 8080 -c 8192 -ngl 99`}</pre>

    <h2>Using function calling and structured outputs</h2>
    <p>
      Hermes 3 uses a specific tool-call format that it was trained on. It emits calls wrapped in{" "}
      <code>&lt;tool_call&gt;...&lt;/tool_call&gt;</code> XML tags with JSON payloads. The model card spells out the
      exact system prompt template &mdash; read it before building an agent on top.
    </p>
    <p>
      For strict JSON output, combine a clear system prompt with llama.cpp&rsquo;s <code>--grammar</code> flag or a
      GBNF grammar file to constrain decoding. You will get dramatically more reliable structured outputs than
      relying on the model alone:
    </p>
    <pre>{`./build/bin/llama-cli -m ./models/hermes-3-8b.gguf \\
  --grammar-file json.gbnf \\
  -p "Extract name and age as JSON from: 'Sam is 34.'"`}</pre>

    <h2>Sampling settings that matter</h2>
    <p>
      Hermes benefits from slightly lower temperatures than stock Llama for agentic work. Try{" "}
      <code>temperature=0.4</code>, <code>top_p=0.9</code>, and a mild repeat penalty of <code>1.05</code> as a
      starting point. For creative writing, push temperature up to 0.8&ndash;1.0. Context length is inherited from
      Llama 3.1, so 128k is supported on paper, but quality degrades past ~32k unless your hardware can fit the full
      KV cache.
    </p>

    <h2>When Hermes is the wrong choice</h2>
    <p>
      If you are doing code-specific work, Qwen 2.5 Coder or DeepSeek-Coder V2 usually beat Hermes at the same size.
      If you want the absolute most refusal-free chat model, there are more specialized fine-tunes &mdash; though
      they come with their own risks. For general-purpose assistants, agents, and function-calling workloads on open
      weights, Hermes 3 is a strong, well-supported default.
    </p>
  </>
);
