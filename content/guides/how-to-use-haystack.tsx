import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Haystack is deepset&rsquo;s open-source Python framework for building production-grade LLM pipelines &mdash; RAG, agents, and search &mdash; with a clear component model.</p>);

export const body: ReactElement = (
  <>
    <p>Haystack has been around since before the ChatGPT era, when it focused on neural search. Haystack 2.0 (released 2024) modernised the API around typed components and pipelines, and it&rsquo;s now one of the most production-focused alternatives to LangChain or LlamaIndex.</p>
    <h2>What it is</h2>
    <p>Pipelines are directed graphs of Components (retrievers, generators, rankers, converters) with typed input/output sockets. Document Stores (Elasticsearch, Weaviate, Qdrant, pgvector, OpenSearch, in-memory) hold the indexed content. Haystack ships first-party integrations for every major model provider and vector DB, plus a serverless option via deepset Cloud.</p>
    <h2>Install / sign up</h2>
    <pre>{`# Core
pip install haystack-ai

# Integrations are separate packages
pip install qdrant-haystack anthropic-haystack

# Optional managed UI
# https://cloud.deepset.ai`}</pre>
    <h2>First session</h2>
    <p>A minimal RAG pipeline has three components: an embedding retriever, a prompt builder, and a generator. Wire them together and call run().</p>
    <pre>{`$ python
from haystack import Pipeline
from haystack.components.retrievers import InMemoryEmbeddingRetriever
from haystack.components.builders import PromptBuilder
from haystack.components.generators import OpenAIGenerator

p = Pipeline()
p.add_component("retriever", InMemoryEmbeddingRetriever(store))
p.add_component("prompt", PromptBuilder(template=tmpl))
p.add_component("llm", OpenAIGenerator(model="gpt-4o"))
p.connect("retriever", "prompt.documents")
p.connect("prompt", "llm")
print(p.run({"retriever": {"query_embedding": emb}}))`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>1. Build a document-grounded Q&amp;A service over your company&rsquo;s wiki and Confluence exports.</li>
      <li>2. Add a Ranker component after retrieval to boost precision before hitting the LLM.</li>
      <li>3. Deploy pipelines behind Hayhooks (FastAPI wrapper) for a REST endpoint you can scale with Kubernetes.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>Haystack&rsquo;s strength is that pipelines are serialisable YAML, which makes diffs and CI review easy. Keep prompts in templates, not hard-coded strings, so you can iterate without redeploying. Evaluation components (AnswerExactMatch, SASEvaluator) slot into the same pipeline graph so you can test in CI.</p>
    <p>For very large corpora, favour Elasticsearch or OpenSearch document stores over in-memory &mdash; the InMemoryDocumentStore is great for tutorials but not production. Streaming responses require the streaming_callback parameter on generators; it&rsquo;s easy to miss and it changes how you consume output.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Teams shipping RAG or search-centric LLM products who want a typed, observable, deployable framework rather than a notebook-style toolkit.</p>
  </>
);
