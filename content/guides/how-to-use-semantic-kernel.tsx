import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Semantic Kernel is Microsoft&rsquo;s open-source SDK for orchestrating LLMs, plugins, and planners in C#, Python, or Java.</p>);

export const body: ReactElement = (
  <>
    <p>Where LangChain optimises for breadth and experimentation, Semantic Kernel targets enterprise apps: strong typing, dependency injection, telemetry, and first-class support for Azure OpenAI. It&rsquo;s the framework powering much of Microsoft&rsquo;s own Copilot surface.</p>
    <h2>What it is</h2>
    <p>Semantic Kernel exposes a Kernel object that wires together AI services (chat, embeddings, image), plugins (callable functions the model can invoke), memory (vector stores), and planners that turn a goal into a sequence of function calls. It&rsquo;s available as NuGet, PyPI, and Maven packages with near-parity across languages.</p>
    <h2>Install / sign up</h2>
    <pre>{`# Python
pip install semantic-kernel

# .NET
dotnet add package Microsoft.SemanticKernel

# Java
# Add to pom.xml:
# <dependency>com.microsoft.semantic-kernel:semantickernel-api</dependency>

# Need an OpenAI or Azure OpenAI key`}</pre>
    <h2>First session</h2>
    <p>Create a Kernel, register a chat service, and add a plugin. The model can then call your plugin functions automatically when it decides they&rsquo;re relevant.</p>
    <pre>{`$ python
import semantic_kernel as sk
from semantic_kernel.connectors.ai.open_ai import OpenAIChatCompletion

kernel = sk.Kernel()
kernel.add_service(OpenAIChatCompletion("gpt-4o", api_key))
kernel.add_plugin(parent_directory="./plugins", plugin_name="Weather")

reply = await kernel.invoke_prompt("What's the weather in Oslo?")
print(reply)`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>1. Wrap existing REST APIs as plugins &mdash; the model will call them via function calling when appropriate.</li>
      <li>2. Use the Handlebars or Stepwise planner to decompose complex goals into ordered plugin calls.</li>
      <li>3. Plug in a memory store (Azure AI Search, Qdrant, Redis) for retrieval-augmented chat.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>Semantic Kernel leans heavily on dependency injection; in .NET especially, register services on the host builder rather than newing up a Kernel manually &mdash; you&rsquo;ll get proper logging and configuration. Use the OpenTelemetry integration early so you can debug long plugin chains.</p>
    <p>Planners can burn tokens quickly; prefer explicit function composition when the workflow is known and reserve planners for open-ended goals. The Python and .NET SDKs occasionally drift &mdash; pin versions in production and check release notes for breaking changes in the preview packages.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Enterprise teams building Copilot-style features, especially on Azure, who want a supported SDK with strong typing and observability instead of a research-grade framework.</p>
  </>
);
