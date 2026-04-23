import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    LM Studio is a desktop GUI for running local LLMs &mdash; download weights from a built-in Hugging Face browser,
    chat with them in a clean UI, and expose an OpenAI-compatible server on localhost. This guide covers a working
    setup on a typical developer laptop.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What LM Studio is</h2>
    <p>
      LM Studio is an Electron app that wraps <code>llama.cpp</code> (and optionally MLX on Apple Silicon) with a
      polished UI. It handles model discovery, downloads, GPU offload config, chat templates, and serving through a
      single window. If Ollama is the CLI/server experience, LM Studio is the desktop-client experience &mdash; and
      the two coexist fine on the same machine.
    </p>
    <p>
      It is free for personal use. Commercial use requires filling out a form on their site; read the latest terms
      before shipping it to coworkers.
    </p>

    <h2>Install and first launch</h2>
    <p>
      Download the installer for macOS, Windows, or Linux from lmstudio.ai. On first launch it will ask which
      runtime to use &mdash; pick the CUDA build on NVIDIA, Metal on Apple Silicon, or the Vulkan/ROCm build on AMD.
      The app self-updates the runtime from within Settings.
    </p>
    <p>
      Check the Hardware tab under Settings. It should detect your GPU and show available VRAM. If it does not, your
      drivers are likely out of date &mdash; fix that before loading a model.
    </p>

    <h2>Downloading and loading a model</h2>
    <p>
      Hit the magnifying-glass icon to open the model search. Type something like <code>llama-3.1-8b-instruct</code>
      and LM Studio surfaces GGUF quantizations from Hugging Face. Each result shows download size and a green/yellow
      /red badge for whether it will fit in your RAM + VRAM.
    </p>
    <p>
      For a 16GB MacBook, <code>Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf</code> is a good first pick. Download it,
      then click the Chat tab and select it from the top dropdown. The first load takes a few seconds while weights
      stream into GPU memory.
    </p>

    <h2>Using the local server</h2>
    <p>
      Click the green Developer tab on the left sidebar and toggle <code>Status: Running</code>. LM Studio now
      exposes an OpenAI-compatible API at <code>http://localhost:1234/v1</code>:
    </p>
    <pre>{`curl http://localhost:1234/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "ping"}]
  }'`}</pre>
    <p>
      From Python, use the OpenAI SDK with <code>base_url=&quot;http://localhost:1234/v1&quot;</code> and any
      non-empty API key. Structured outputs and tool-calling work for models that were fine-tuned for them.
    </p>

    <h2>GPU offload and context length</h2>
    <p>
      In the right-side configuration panel, the <code>GPU Offload</code> slider controls how many transformer
      layers run on the GPU. Push it to max if VRAM allows; if you OOM at load time, back off a few layers. The
      <code>Context Length</code> field sets the KV-cache window &mdash; larger contexts eat memory quadratically
      in some kernels, so start at 4096 and raise only if you actually need it.
    </p>
    <p>
      Enable <code>Flash Attention</code> when available &mdash; it cuts memory and speeds up long contexts. On
      Apple Silicon, try the MLX runtime variants of models for measurably faster token throughput than GGUF.
    </p>

    <h2>When LM Studio is the wrong choice</h2>
    <p>
      LM Studio is great on a workstation but a bad fit for headless servers (it is a GUI app) and for automation
      pipelines where you want models defined in code. It is also closed-source, which matters if you need to audit
      the stack. For servers, use Ollama or llama.cpp directly. For desktop use and quickly A/B-testing models, LM
      Studio is the fastest path from zero to a running local LLM.
    </p>
  </>
);
