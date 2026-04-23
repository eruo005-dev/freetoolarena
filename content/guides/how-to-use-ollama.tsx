import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Ollama packages the heaviest part of running a local LLM &mdash; weights, runtime, quantization &mdash; into a
    single binary with a one-command install. This guide walks through installing it, pulling a model, and running
    real prompts against the local API.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Ollama actually is</h2>
    <p>
      Ollama is a local model server written in Go that wraps <code>llama.cpp</code> under the hood. It downloads
      quantized GGUF weights, spins up an HTTP server on <code>localhost:11434</code>, and exposes a CLI plus an
      OpenAI-compatible API. You talk to it the same way you talk to OpenAI &mdash; just point your client at the
      local endpoint instead of <code>api.openai.com</code>.
    </p>
    <p>
      The big win is that the model, runtime, template, and parameters are bundled into a single named artifact
      (similar to a Docker image). You pull <code>llama3.1:8b</code> and you get a working model, not a folder of
      files you have to stitch together.
    </p>

    <h2>Installing Ollama</h2>
    <p>On macOS or Linux, a single curl command gets you the binary:</p>
    <pre>{`curl -fsSL https://ollama.com/install.sh | sh`}</pre>
    <p>
      On Windows, grab the installer from ollama.com. On Linux servers, the install script also registers a systemd
      unit so the daemon survives reboots. Verify the install:
    </p>
    <pre>{`ollama --version
systemctl status ollama   # Linux only`}</pre>

    <h2>Pulling and running your first model</h2>
    <p>
      Pick a model based on your RAM. For a 16GB laptop, Llama 3.1 8B quantized to Q4 is the sweet spot. For 8GB
      machines, drop to Phi-3 Mini or Qwen 2.5 3B. For 32GB+, Mistral Small or Llama 3.1 70B (heavily quantized)
      become viable.
    </p>
    <pre>{`ollama pull llama3.1:8b
ollama run llama3.1:8b "Explain CRDTs in two sentences."`}</pre>
    <p>
      The first run streams tokens to your terminal. Subsequent runs reuse the loaded model from memory until it
      idles out (five minutes by default).
    </p>

    <h2>Using the HTTP API</h2>
    <p>
      Every model you pull is reachable over HTTP. The native endpoint is <code>/api/generate</code>, and there is
      also an OpenAI-compatible <code>/v1/chat/completions</code> for drop-in SDK usage:
    </p>
    <pre>{`curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1:8b",
  "prompt": "Summarize the CAP theorem.",
  "stream": false
}'`}</pre>
    <p>With the OpenAI SDK, just swap the base URL and use any string for the API key:</p>
    <pre>{`from openai import OpenAI
client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
r = client.chat.completions.create(
    model="llama3.1:8b",
    messages=[{"role": "user", "content": "hi"}],
)`}</pre>

    <h2>Picking the right quantization</h2>
    <p>
      GGUF models ship in multiple quantizations. <code>Q4_K_M</code> is a good default &mdash; roughly 4 bits per
      weight with minimal quality loss. <code>Q8_0</code> is near-lossless but doubles memory. <code>Q2_K</code> is
      aggressive and visibly degrades output on reasoning tasks. Ollama&rsquo;s default tags usually point at a sane
      Q4 variant, but you can pin explicitly:
    </p>
    <pre>{`ollama pull llama3.1:8b-instruct-q8_0`}</pre>
    <p>
      Also tune context size with <code>OLLAMA_CONTEXT_LENGTH</code> or a <code>Modelfile</code> &mdash; the default
      of 2048 tokens is small, and models like Llama 3.1 support 128k natively.
    </p>

    <h2>When Ollama is the wrong choice</h2>
    <p>
      If you need GPU-saturating throughput for a production inference workload, Ollama is fine for prototypes but
      you will outgrow it &mdash; move to vLLM, TGI, or SGLang for batched serving. Ollama also does not do
      multi-GPU tensor parallelism well. For personal daily use, offline coding assistance, privacy-first RAG
      prototypes, and CI-friendly test fixtures, Ollama is the path of least resistance.
    </p>
  </>
);
