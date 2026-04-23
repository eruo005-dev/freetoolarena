import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Tabby is a self-hosted, open-source alternative to GitHub Copilot &mdash; you run the inference server on your own GPU and get private code completions across every editor.</p>);

export const body: ReactElement = (
  <>
    <p>Built by TabbyML, Tabby packages a Rust server, a curated set of small code models, and IDE extensions into a single Docker image. It&rsquo;s popular with teams that can&rsquo;t send source to third-party clouds but still want inline AI completions and repo-aware chat.</p>
    <h2>What it is</h2>
    <p>Tabby ships three things: an inference server (Rust, llama.cpp backend) that serves models like StarCoder2 or DeepSeek-Coder; editor plugins for VS Code, JetBrains, Vim, and Emacs; and a web Code Browser that indexes your Git repos for RAG-style chat. It runs on CPU, CUDA, ROCm, or Apple Metal.</p>
    <h2>Install / sign up</h2>
    <pre>{`# Docker with NVIDIA GPU
docker run -it --gpus all \\
  -p 8080:8080 -v $HOME/.tabby:/data \\
  tabbyml/tabby \\
  serve --model StarCoder2-3B --device cuda

# Visit http://localhost:8080 and create the admin account`}</pre>
    <h2>First session</h2>
    <p>Once the server is up, install the VS Code extension, point it at http://localhost:8080, and paste the token from the admin UI. Start typing &mdash; grey completions appear within a few hundred milliseconds on a mid-range GPU.</p>
    <pre>{`$ code --install-extension TabbyML.vscode-tabby
# In settings, set tabby.endpoint = http://localhost:8080
# Start typing a function signature, completions stream in`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>1. Connect a GitHub/GitLab repo in the admin UI so chat answers cite your own code.</li>
      <li>2. Swap models from the Models tab &mdash; bigger models for servers, Qwen2.5-Coder-1.5B for laptops.</li>
      <li>3. Use the Answer Engine tab for repo-wide questions like &ldquo;where do we hash passwords&rdquo; with file citations.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>VRAM is the binding constraint: a 3B model fits in 6GB, 7B models want 12GB+, and anything larger benefits from int4 quantisation. Set TABBY_MODEL_CACHE_ROOT to a fast SSD to avoid re-downloading weights on every container restart.</p>
    <p>Tabby&rsquo;s default telemetry is anonymous and easy to disable with --no-usage-tracking. For a team deployment, put it behind an OAuth proxy &mdash; the built-in auth is token-based and not meant for internet exposure.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Security-conscious teams, regulated industries, air-gapped shops, and hobbyists who want Copilot-style completions without a SaaS subscription.</p>
  </>
);
