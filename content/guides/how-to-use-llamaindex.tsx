import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>LlamaIndex is the data framework for LLMs, purpose-built for ingesting documents and powering RAG over your private knowledge.</p>
);

export const body: ReactElement = (
  <>
    <p>
      Where LangChain tries to be everything, LlamaIndex stays narrower and deeper: loaders for 150+ data sources,
      chunking and metadata extraction pipelines, a VectorStoreIndex abstraction over every vector DB that matters, and
      query engines that combine retrieval with re-ranking and response synthesis. A newer Workflows API adds
      event-driven orchestration for when you outgrow simple query pipelines.
    </p>

    <h2>What it is</h2>
    <p>
      LlamaIndex is MIT-licensed and maintained by LlamaIndex Inc. (Jerry Liu and team). The Python package
      llama-index-core is the base; integrations live in separate packages like llama-index-vector-stores-qdrant. A
      TypeScript port (llamaindex on npm) covers the essentials. LlamaParse, a paid managed service, handles complex
      PDFs and tables the OSS parser struggles with.
    </p>

    <h2>Install</h2>
    <pre>{`pip install llama-index
# or the modular install
pip install llama-index-core llama-index-llms-openai llama-index-embeddings-openai`}</pre>

    <h2>First run</h2>
    <p>Index a folder of documents and ask a question about them:</p>
    <pre>{`from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

docs = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(docs)
engine = index.as_query_engine()

print(engine.query("What is our refund policy?"))`}</pre>

    <h2>Everyday workflows</h2>
    <ul>
      <li>Build an IngestionPipeline with SentenceSplitter + TitleExtractor + embeddings and cache it to disk.</li>
      <li>Swap VectorStoreIndex&rsquo;s backend for Qdrant, Pinecone, or pgvector with a few lines of config.</li>
      <li>Use Workflows and AgentWorkflow to combine RAG with tool-using agents for multi-step answers.</li>
    </ul>

    <h2>Gotchas and tips</h2>
    <p>
      RAG quality lives and dies by chunking. Default settings are generic; tune chunk_size and chunk_overlap to your
      content &mdash; contracts, forum posts, and code all want different values. Measure recall with a small labeled
      set before declaring victory.
    </p>
    <p>
      Persistence is a common foot-gun. Calling from_documents every run re-embeds everything and bills you twice. Use
      StorageContext.persist() and load_index_from_storage, or push to a real vector DB that keeps state for you.
    </p>

    <h2>Who it&rsquo;s for</h2>
    <p>
      Teams whose product is basically &ldquo;chat with our documents&rdquo; &mdash; legal, support, internal search,
      research. Tip: reach for LlamaParse the first time a client-provided PDF has merged cells or scanned tables
      &mdash; hand-rolling a parser for those is a month you will not get back.
    </p>
  </>
);
