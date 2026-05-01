import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Running Llama 3.3 or Llama 4 locally costs $0 in marginal cost, gives you full privacy,
    and works offline. The path is simpler in 2026 than it sounds &mdash; here&rsquo;s the 30-minute setup.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Step 1: install Ollama</h2>
    <pre className="rounded bg-slate-900 p-3 text-xs text-slate-100"><code>{`# macOS / Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows: download installer at ollama.com`}</code></pre>

    <h2>Step 2: pull a Llama model that fits your machine</h2>
    <ul>
      <li><strong>16 GB RAM:</strong> <code>ollama run llama3.2:3b</code> &mdash; fast, useful, surprisingly capable.</li>
      <li><strong>32 GB RAM:</strong> <code>ollama run llama3.3:8b</code> or <code>llama4:scout</code>.</li>
      <li><strong>64 GB RAM:</strong> <code>ollama run llama3.3:70b-q4_K_M</code> &mdash; the flagship, slow but excellent.</li>
      <li><strong>192 GB unified (Mac Studio Ultra):</strong> <code>llama4:maverick</code> &mdash; full MoE flagship.</li>
    </ul>

    <h2>Step 3: chat or expose API</h2>
    <p>
      Type at the <code>&gt;&gt;&gt;</code> prompt for chat. To expose an OpenAI-compatible API on your LAN:
      <code>OLLAMA_HOST=0.0.0.0:11434 ollama serve</code>. Point Cursor / Continue.dev at <code>http://your-ip:11434/v1</code>.
    </p>

    <h2>Speed expectations</h2>
    <ul>
      <li>Llama 3.3 8B on a 4090 / M-series Mac: 60-90 tokens/sec.</li>
      <li>Llama 3.3 70B Q4 on Mac Studio M2 Ultra: 12-16 tokens/sec.</li>
      <li>Llama 3.3 70B Q4 on RTX 4090 + 64 GB DDR5 (offload): 8-12 tokens/sec.</li>
    </ul>

    <p>
      For multi-machine pooling, see <a href="/guides/how-to-set-up-a-hyperspace-pod">how to set up a hyperspace pod</a>. Open
      weight tracker at <a href="/tools/open-source-llm-tracker">open-source LLM tracker</a>.
    </p>
  </>
);
