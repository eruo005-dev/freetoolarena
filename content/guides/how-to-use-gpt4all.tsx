import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    GPT4All is a desktop client from Nomic AI for running open-source LLMs locally on commodity hardware. It bundles
    model discovery, chat, and a local document-retrieval feature called LocalDocs into a single free application.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What GPT4All is</h2>
    <p>
      GPT4All started in 2023 as one of the earliest easy-to-use local LLM apps and has since matured into a stable
      cross-platform client. It wraps llama.cpp for inference, maintains a curated catalog of GGUF models, and ships
      LocalDocs &mdash; a RAG feature that indexes folders of PDFs, markdown, code, and office docs into a local
      vector store. The project is MIT-licensed with commercial use allowed.
    </p>
    <p>
      Compared to LM Studio or Jan, GPT4All leans heavier into &ldquo;chat with your files&rdquo; as the default
      workflow rather than just raw chat.
    </p>

    <h2>Installing GPT4All</h2>
    <p>
      Grab the installer for macOS, Windows, or Ubuntu from nomic.ai/gpt4all. The installer is a straightforward
      wizard; on Linux you can also use the provided .run file. First launch prompts you to opt in or out of
      anonymous telemetry &mdash; decline if you want it fully offline.
    </p>
    <p>
      Models download into <code>~/Library/Application Support/nomic.ai/GPT4All/</code> on macOS and equivalent
      paths on Windows and Linux. Point that at an external drive via symlink if disk space is tight.
    </p>

    <h2>Picking and downloading a model</h2>
    <p>
      Open the Models tab. GPT4All surfaces a short list of battle-tested GGUF models with size and RAM requirements
      clearly labeled. Good starting picks:
    </p>
    <ul>
      <li><code>Llama 3.1 8B Instruct</code> &mdash; general-purpose, needs ~8GB RAM</li>
      <li><code>Qwen 2.5 Coder 7B</code> &mdash; code assistance, similar memory</li>
      <li><code>Phi-3 Mini 4K</code> &mdash; runs on 8GB machines with headroom</li>
      <li><code>Mistral 7B Instruct</code> &mdash; fast and reliable baseline</li>
    </ul>
    <p>
      Click Download and watch the progress bar. Switch to the Chats tab and pick the model from the top-right
      dropdown to start a session.
    </p>

    <h2>Using LocalDocs for private RAG</h2>
    <p>
      LocalDocs is the killer feature. In the LocalDocs tab, click <code>+ Add Collection</code>, name it, and point
      it at a folder of documents. GPT4All scans supported file types (PDF, DOCX, TXT, MD, source code), chunks
      them, and embeds them locally using a built-in Nomic Embed model.
    </p>
    <p>
      In a chat thread, toggle the collection on via the database icon. Queries now retrieve relevant chunks from
      your documents before generating. The sidebar shows citations so you can verify the model did not hallucinate.
      Nothing leaves your machine.
    </p>

    <h2>API access and configuration</h2>
    <p>
      Open Settings &rarr; Application &rarr; API Server and flip it on. GPT4All exposes an OpenAI-compatible
      endpoint at <code>http://localhost:4891/v1</code>:
    </p>
    <pre>{`curl http://localhost:4891/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "Llama 3.1 8B Instruct",
    "messages": [{"role": "user", "content": "ping"}]
  }'`}</pre>
    <p>
      Under Settings &rarr; Model, you can tune temperature, top-k, top-p, repeat penalty, and context length per
      model. If you have an NVIDIA GPU or Apple Silicon, enable GPU in Settings &rarr; Application &mdash; CPU-only
      is slow on 7B+ models.
    </p>

    <h2>When GPT4All is the wrong choice</h2>
    <p>
      GPT4All is great for privacy-focused desktop use and for non-technical teammates who need a no-config &ldquo;
      chat with my PDFs&rdquo; tool. It is not designed for production serving, multi-user deployment, or rapid
      model experimentation &mdash; its curated catalog is narrower than LM Studio&rsquo;s Hugging Face browser.
      For servers, reach for Ollama. For raw breadth of models, LM Studio. For a polished local RAG out of the box,
      GPT4All is hard to beat.
    </p>
  </>
);
