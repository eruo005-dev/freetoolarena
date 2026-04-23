import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    llama.cpp is the C++ inference engine that most of the local-LLM ecosystem &mdash; Ollama, LM Studio, Jan, GPT4All
    &mdash; is built on. Using it directly gives you the fastest path to running GGUF weights on CPUs, Apple Silicon,
    and GPUs with minimal overhead.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What llama.cpp is</h2>
    <p>
      llama.cpp is Georgi Gerganov&rsquo;s single-repo C/C++ implementation of Llama-family inference. It supports
      dozens of model architectures (Llama 2/3, Mistral, Qwen, Phi, Gemma, DeepSeek, and more), quantizes them to
      GGUF, and runs on CPU, CUDA, Metal, Vulkan, ROCm, and SYCL. The project ships a CLI (<code>llama-cli</code>),
      a server (<code>llama-server</code>), and bindings for Python, Go, Rust, and Node.
    </p>
    <p>
      Every other &ldquo;easy&rdquo; local-LLM tool eventually bottoms out here. Knowing llama.cpp directly means
      you can skip the wrappers when they get in your way.
    </p>

    <h2>Building from source</h2>
    <p>
      Clone the repo and build with CMake. The default build is CPU-only; pass flags for your accelerator:
    </p>
    <pre>{`git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
cmake -B build -DGGML_CUDA=ON    # NVIDIA
# cmake -B build -DGGML_METAL=ON   # Apple Silicon (on by default)
# cmake -B build -DGGML_VULKAN=ON  # AMD / Intel / cross-GPU
cmake --build build --config Release -j`}</pre>
    <p>
      The binaries land under <code>build/bin/</code>. On macOS you can also install via <code>brew install llama.cpp
      </code> for a Metal-enabled prebuilt.
    </p>

    <h2>Getting a GGUF model</h2>
    <p>
      Pull a pre-quantized GGUF from Hugging Face. The <code>bartowski</code> and <code>TheBloke</code> accounts
      publish high-quality conversions for most popular base models:
    </p>
    <pre>{`huggingface-cli download bartowski/Meta-Llama-3.1-8B-Instruct-GGUF \\
  Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf \\
  --local-dir ./models`}</pre>
    <p>
      If you have raw Hugging Face weights, convert them yourself with <code>convert_hf_to_gguf.py</code> and
      quantize with the <code>llama-quantize</code> binary.
    </p>

    <h2>Running inference</h2>
    <p>Single-shot prompt from the CLI:</p>
    <pre>{`./build/bin/llama-cli \\
  -m ./models/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf \\
  -p "Write a haiku about distributed systems." \\
  -n 128 -ngl 99`}</pre>
    <p>
      <code>-ngl 99</code> offloads all layers to the GPU. For an OpenAI-compatible server, use{" "}
      <code>llama-server</code>:
    </p>
    <pre>{`./build/bin/llama-server \\
  -m ./models/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf \\
  --host 0.0.0.0 --port 8080 -ngl 99 -c 8192`}</pre>
    <p>
      The server exposes <code>/v1/chat/completions</code>, <code>/v1/embeddings</code>, and a built-in web UI at
      the root URL.
    </p>

    <h2>Picking quantization and context</h2>
    <p>
      The standard quantization grid is <code>Q2_K</code> through <code>Q8_0</code>, with <code>K_M</code> and{" "}
      <code>K_S</code> variants. For most 7B&ndash;13B models, <code>Q4_K_M</code> is the right default. For code
      and reasoning, bump to <code>Q5_K_M</code> or <code>Q6_K</code> if memory allows &mdash; Q4 noticeably hurts
      math and code accuracy.
    </p>
    <p>
      The <code>-c</code> flag sets context size. Do not crank it past what you need &mdash; KV cache grows linearly
      with context and eats VRAM fast. Use <code>--flash-attn</code> to cut the overhead when supported.
    </p>

    <h2>When to reach past llama.cpp</h2>
    <p>
      llama.cpp is unbeatable for single-user inference on commodity hardware, and its server is fine for small
      internal tools. For high-concurrency production serving with continuous batching and paged attention, switch
      to vLLM or SGLang. For training or fine-tuning, use PyTorch + transformers or Unsloth &mdash; llama.cpp is an
      inference engine, not a trainer.
    </p>
  </>
);
