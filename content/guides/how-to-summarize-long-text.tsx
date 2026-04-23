import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Summarizing a long document sounds simple&mdash;keep the important parts, drop the rest&mdash;but
      the definition of &ldquo;important&rdquo; shifts wildly by audience, purpose, and length
      target. A legal summary of a contract keeps every obligation and deadline. A marketing
      summary of the same document keeps the value prop and drops the clauses. A TL;DR at the top
      of a blog post needs to fit in two sentences. The algorithmic side has evolved from simple
      frequency-count approaches in the 1950s through graph-based methods like TextRank in the
      2000s to modern LLM abstractive summarization that can rewrite content from scratch. Each
      approach has strengths and failure modes. This guide covers extractive versus abstractive
      methods, the TextRank algorithm, modern LLM summarization, reading-time targets, and how to
      check summary quality.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Extractive versus abstractive</h2>
    <p>
      Extractive summarization picks sentences directly from the source and strings them
      together. The output consists entirely of verbatim text from the original, which keeps
      attribution clean and prevents hallucination but sometimes produces awkward transitions
      and repetition. Abstractive summarization generates new sentences that capture the
      meaning, which reads more naturally but introduces the risk of paraphrasing inaccurately
      or inventing details. Most pre-LLM systems are extractive. Modern LLMs default to
      abstractive, which is why they sometimes confidently summarize a fact that was not in the
      source.
    </p>

    <h2>TextRank and graph-based methods</h2>
    <p>
      TextRank (Mihalcea and Tarau, 2004) applies the PageRank algorithm to a graph of
      sentences. Each sentence is a node, and edges are weighted by a similarity metric
      (typically cosine similarity of term vectors or simple word overlap normalized by length).
      Running PageRank over that graph ranks sentences by how &ldquo;central&rdquo; they are
      across the document, and the top-N highest-ranked sentences form the summary. TextRank is
      unsupervised, fast, and works without training data, which is why it was the dominant
      open-source summarization technique for roughly fifteen years. Its weakness: it cannot
      rewrite awkward sentences or combine ideas spread across the source.
    </p>
    <pre>{`# TextRank in pseudocode
sentences = split_into_sentences(text)
graph = build_similarity_graph(sentences)
scores = pagerank(graph)
summary = [s for s, _ in sorted_by_score(sentences, scores)[:N]]
return " ".join(in_document_order(summary))`}</pre>

    <h2>Frequency-based and TF-IDF approaches</h2>
    <p>
      Older summarizers rank sentences by the frequency of their terms: sentences containing the
      most common content words (minus stop words) are considered important. TF-IDF refines this
      by weighting rare terms higher, under the theory that a term unique to this document is
      more indicative of its topic than a term common across all documents. These approaches
      work passably for news articles but struggle with anything that uses a specialized
      vocabulary evenly throughout.
    </p>

    <h2>LLM-based abstractive summarization</h2>
    <p>
      A modern LLM prompted with &ldquo;Summarize the following text in three sentences&rdquo;
      produces far better output than TextRank in most subjective evaluations. The model can
      rewrite, combine ideas, match a requested tone, and produce output that reads as though
      written fresh. The trade-offs: computational cost, possible hallucination, and lack of
      transparent attribution. For high-stakes summaries (legal, medical, financial), pair
      LLM output with an extractive pass that surfaces the source sentences the claims are
      based on.
    </p>

    <h2>Length targets by context</h2>
    <p>
      Aim the length at how the summary will be consumed. A TL;DR at the top of a blog post is
      1 to 3 sentences, about 30 to 70 words. An executive summary at the top of a report is
      100 to 250 words. A meta description is 150 to 160 characters. A tweet or X post is 280
      characters. An abstract in an academic paper is 150 to 300 words. Summarizing to match the
      consumption format is half the job&mdash;a brilliant 500-word summary is useless if the
      reader will only see 160 characters.
    </p>
    <pre>{`TL;DR:              30-70 words
Executive summary:  100-250 words
Abstract:           150-300 words
Meta description:   150-160 characters
Social post:        50-280 characters
Elevator pitch:     30-60 words`}</pre>

    <h2>Reading time as a target</h2>
    <p>
      Average reading speed is 200 to 250 words per minute for general text, faster for
      recreational reading and slower for dense technical material. A reader will typically
      allocate 10 to 20 percent of the time it would take to read the original. For a 5,000-word
      article (20 minutes), that means a 200-word summary (1 minute). Aim the word count at the
      reader&rsquo;s likely time budget rather than a fixed ratio of the original length.
    </p>

    <h2>Preserving structure</h2>
    <p>
      A summary that collapses a multi-section document into one paragraph often loses the
      structural information readers need. For a report with distinct sections, preserve the
      section boundaries by summarizing each section into one or two sentences and keeping the
      section headings. This produces a scannable summary with the same top-level structure as
      the original, which readers can navigate like a table of contents. Abstractive summarizers
      tend to flatten structure by default; ask them explicitly to preserve it.
    </p>

    <h2>Quality checks</h2>
    <p>
      Read the summary without the source and ask: would someone who has not read the original
      understand the main points? Then read the source and ask: did the summary miss anything
      essential? Does it include anything not supported by the source? The first check catches
      summaries that are too abstract to be useful. The second catches hallucinations and
      distortions. For extractive methods, verify the sentences are in a sensible order. For
      abstractive methods, verify every claim traces back to the source.
    </p>

    <h2>Handling specialized content</h2>
    <p>
      Legal text, medical records, technical specifications, and code all have domain
      conventions that general summarizers miss. Legal text needs every obligation preserved.
      Medical records need units and dosages intact. Technical specs need numeric values exact.
      For these domains, general-purpose summarization is a starting point, not a
      production-ready output. Either use a domain-tuned model or apply a human review pass on
      anything consequential.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Trusting hallucination-prone output for facts.</strong> An abstractive LLM can
      produce fluent summaries that invent numbers, dates, or attributions. For fact-heavy
      content, verify every claim against the source or use extractive output.
    </p>
    <p>
      <strong>Fixed ratio summaries.</strong> &ldquo;Ten percent of the original&rdquo; is a bad
      target because a 50-word summary of a 500-word post is fine but a 5-word summary of a
      50-word post is absurd. Pick a length that matches how the summary will be consumed.
    </p>
    <p>
      <strong>Dropping the thesis.</strong> A summary that lists supporting points but omits the
      central argument is useless. Check that the summary&rsquo;s first sentence states the main
      point.
    </p>
    <p>
      <strong>Summarizing section-by-section when the document is argumentative.</strong>
      Section summaries work for reference documents but break arguments that build across
      sections. For long-form argument, summarize as a single narrative.
    </p>
    <p>
      <strong>Ignoring the audience.</strong> The same document summarized for an engineer, a
      manager, and a customer will read very differently. State the audience before choosing the
      summary style.
    </p>
    <p>
      <strong>Not checking readability.</strong> A dense, jargon-packed summary that scores at
      grade 16 for readability defeats its purpose. Target the reading level of the audience,
      usually grade 8 to 10 for general readers.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate first-pass summaries in the browser with the{" "}
      <a href="/tools/text-summarizer">text summarizer</a>. Pair with the{" "}
      <a href="/tools/readability-score-checker">readability score checker</a> to verify the
      summary lands at the right reading level for your audience, and the{" "}
      <a href="/tools/keyword-density-checker">keyword density checker</a> to confirm the
      summary still surfaces the terms your source treats as central.
    </p>
  </>
);
