import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Jan is an open-source desktop app that runs LLMs locally with a ChatGPT-style interface &mdash; no account, no
    cloud, no data leaving your machine. This guide covers installing it, loading a model, and wiring it into your
    existing tooling.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Jan is</h2>
    <p>
      Jan is an Electron app developed by Homebrew Computer Company (the Jan team). It wraps llama.cpp plus an
      extension system, ships a polished chat UI, and can either run models locally or proxy to remote providers
      like OpenAI, Anthropic, Groq, and Mistral behind one interface. The whole thing is AGPL-licensed and available
      on GitHub.
    </p>
    <p>
      It targets users who want &ldquo;ChatGPT on my laptop&rdquo; without learning CLI tools or touching Python.
      Under the hood, it is a thin client over the same GGUF/llama.cpp stack that powers Ollama and LM Studio.
    </p>

    <h2>Installing Jan</h2>
    <p>
      Download the installer for macOS, Windows, or Linux from jan.ai. On Linux, an AppImage and .deb are both
      published. First launch drops your data in <code>~/jan</code> (or <code>%APPDATA%\jan</code> on Windows),
      which you can back up or symlink to another disk if your home partition is small.
    </p>
    <p>
      Jan does not phone home by default. You can verify by checking the telemetry toggle under Settings &rarr;
      Advanced and watching network traffic with your favorite tool.
    </p>

    <h2>Loading your first model</h2>
    <p>
      Open the Hub tab. Jan shows a curated list of models (Llama 3.1, Mistral, Qwen, Phi, Gemma, DeepSeek) with
      recommended quantizations tagged as &ldquo;Recommended for your device&rdquo; based on your RAM. Click
      Download on one that fits &mdash; for a 16GB machine, Llama 3.1 8B Q4 or Qwen 2.5 7B Q4 are solid picks.
    </p>
    <p>
      Once downloaded, start a new thread and pick the model from the top-right dropdown. You can tune temperature,
      top-p, and max tokens per-thread in the right-hand panel without changing global defaults.
    </p>

    <h2>Using the local API server</h2>
    <p>
      Jan exposes an OpenAI-compatible server out of the box. Open Settings &rarr; Local API Server and flip it on;
      default port is <code>1337</code>. Once running, point any OpenAI-compatible client at it:
    </p>
    <pre>{`curl http://localhost:1337/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama3.1-8b-instruct",
    "messages": [{"role": "user", "content": "hello"}]
  }'`}</pre>
    <p>
      This is how you bolt Jan onto tools like Continue.dev, Aider, or your own scripts &mdash; the chat UI becomes
      a debug surface for the same model your code is hitting.
    </p>

    <h2>Adding remote providers and extensions</h2>
    <p>
      Under Settings &rarr; Model Providers you can paste an OpenAI, Anthropic, Groq, Mistral, or OpenRouter API key
      and Jan will start surfacing those models alongside your local ones. Each thread can target any provider, so
      you can quickly compare Claude vs. a local Llama on the same prompt.
    </p>
    <p>
      The Extensions page lets you enable retrieval, function calling, and other add-ons. Treat these as
      experimental &mdash; the stable surface is chat + the local API.
    </p>

    <h2>When Jan is the wrong choice</h2>
    <p>
      Jan is ideal for desktop power users who want a ChatGPT replacement and occasional API access. It is not a
      production inference server, and its model catalog lags behind raw Hugging Face by a week or two on new
      releases. If you need bleeding-edge weights the day they drop, use llama.cpp directly. If you want a
      lightweight background server with no UI, use Ollama. Jan&rsquo;s sweet spot is &ldquo;I want to chat with
      local models and I like a real app window.&rdquo;
    </p>
  </>
);
