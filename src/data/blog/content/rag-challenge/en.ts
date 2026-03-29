export const postContent = {
  title: "RAG Challenge Technical Comparison: A Reproducible Post-Mortem",
  heroTitle: `RAG Challenge Technical Comparison:<br><em class="hero-accent">A Reproducible Post-Mortem</em>`,
  description: "A detailed technical comparison of two RAG solutions from the AINC'26 challenge — documenting constraint compliance, retrieval benchmarks, and reproducible evidence.",
  heroTag: "AINC'26 · RAG Challenge · Technical Post-Mortem",
  tags: ["RAG", "PostgreSQL", "pgvector", "Semantic Search", "Data Engineering", "Benchmarking", "NLP", "Python"],
  content: `## 00 — What This Post Is About

I participated in a RAG (Retrieval-Augmented Generation) challenge organized by ARSII in partnership with Rose Blanche Group. The challenge had clear, written rules specifying exact technical constraints. The winning solution does not use PostgreSQL, which the competition PDF specifies as a mandatory requirement. I raised this with the organizers. No response has been received as of the publication date.

This post presents the evidence — the competition rules, the code, and reproducible benchmark results — so that anyone can verify the claims independently.

This analysis focuses on the technical artifacts — code, configurations, and measurable retrieval outputs — not on any individual participant.

---

## 01 — The Competition Rules

The challenge was proposed by **Rose Blanche Group (STE AGRO MELANGE TECHNOLOGIE)**. The prize: a 1000 DT gift voucher.

### Official Challenge Description

:::bq
Développer un module de recherche sémantique permettant d'interroger cette base vectorielle (RAG)
EN: Develop a semantic search module to query this vector database (RAG)
:::

:::bq
Dans un contexte où une base documentaire contient un grand volume d'informations [...] L'objectif est de développer un module intelligent capable d'assister l'utilisateur en retrouvant automatiquement les fragments les plus pertinents à partir d'une question formulée en langage naturel.
EN: In a context where a document base contains a large volume of information [...] The objective is to develop an intelligent module capable of assisting the user by automatically retrieving the most relevant fragments from a question formulated in natural language.
:::

### Official Technical PDF — Exact Constraints

The competition PDF (*Développement d'un Module de Recherche Sémantique pour la Formulation en Boulangerie & Pâtisserie*) specifies verbatim:

:::bq
**Context:** Ces fiches ont déjà été : Converties en texte, Découpées en fragments (chunks), Transformées en embeddings, **Stockées dans une base PostgreSQL**
EN: These data sheets have already been: Converted to text, Split into fragments (chunks), Transformed into embeddings, **Stored in a PostgreSQL database**
:::

:::bq
**Resources provided:** Base de données PostgreSQL — Table : embeddings — Structure : **id** (Primary Key), **id_document** (int), **texte_fragment** (text), **vecteur** (VECTOR(384))
EN: PostgreSQL database — Table: embeddings — id (Primary Key), id_document (int), texte_fragment (text), vecteur (VECTOR(384))
:::

:::bq
**Imposed parameters:** Méthode de similarité : **Cosine Similarity** — Nombre de résultats à retourner : **Top K = 3** — Langage recommandé : **Python**
:::

:::bq
**Required embedding model:** Modèle imposé : **all-MiniLM-L6-v2** — Bibliothèque : sentence-transformers — Dimension : **384**
:::

:::bq
**Example query:** Améliorant de panification : quelles sont les quantités recommandées d'alpha-amylase, xylanase et d'Acide ascorbique ?
EN: Bread improver: what are the recommended quantities of alpha-amylase, xylanase, and ascorbic acid?
:::

The database constraint is not a suggestion. The PDF says the data is *"Stockées dans une base PostgreSQL"* and provides an exact table schema with typed columns including \`vecteur VECTOR(384)\` — a data type that only exists in PostgreSQL via the \`pgvector\` extension. The entire challenge is framed around querying this PostgreSQL vector database.

### What This Challenge Is Really About

The constraints above are not arbitrary. They define a very specific engineering problem: **given a small embedding model (22M parameters, 384 dimensions), a fixed retrieval depth (K=3), and a local PostgreSQL database — how well can you preprocess, structure, and optimize your data to produce the best possible retrieval results?**

This is a data engineering and optimization challenge, not an API integration exercise. The fixed model, fixed K, and local database requirement exist precisely to level the playing field and measure what each participant does with the data itself — the PDF extraction quality, the chunking strategy, the way embeddings are structured, and how queries are handled.

If the challenge were simply about building a RAG system, anyone could plug in LangChain with a powerful LLM API and get fluent answers in minutes. But that approach requires no optimization, incurs high API costs, sends potentially sensitive enterprise data to external providers, and demonstrates no understanding of the underlying retrieval mechanics. The competition deliberately eliminates that shortcut by imposing a local, self-contained setup.

The real skill being tested is: **can you make a 22-million-parameter model punch above its weight through intelligent data preprocessing and search engineering?**

---

## 02 — The Winning Solution Does Not Use PostgreSQL

The winning team's code is publicly available at \`github.com/AyaZantour/RagProject\`. Here is what their storage layer actually does.

### vector_store.py — Lines 57–68 (Save method)

\`\`\`python
def save(self, path: str) -> None:
    os.makedirs(os.path.dirname(path) if os.path.dirname(path) else ".", exist_ok=True)

    np.savez_compressed(f"{path}.npz", embeddings=self.embeddings)
    with open(f"{path}.json", "w", encoding="utf-8") as f:
        json.dump(self.metadata, f, ensure_ascii=False, indent=2)
\`\`\`

:::callout-warn Finding
Vectors are stored in a NumPy \`.npz\` file. Metadata is stored in a JSON file. There is no PostgreSQL, no \`psycopg2\`, no SQL, no \`pgvector\`.
:::

### vector_store.py — Lines 94–119 (Search method)

\`\`\`python
def search(self, query: str, top_k: int = 3) -> list:
    # Embed the query
    query_embedding = self.model.encode(
        [query],
        convert_to_numpy=True,
        normalize_embeddings=True
    )

    # Cosine similarity (dot product since vectors are normalized)
    similarities = np.dot(self.embeddings, query_embedding.T).flatten()

    # Get top-k indices
    top_indices = np.argsort(similarities)[::-1][:top_k]
\`\`\`

Search is performed via NumPy dot product on in-memory arrays. No database query. No SQL \`ORDER BY\`. No \`<=>\` pgvector operator.

### requirements.txt

\`\`\`text
PyPDF2>=3.0.0
sentence-transformers>=2.2.0
numpy>=1.24.0
flask>=3.0.0
groq>=0.4.0
\`\`\`

:::callout-warn Finding
No \`psycopg2\`. No database driver of any kind.
:::

### Required table schema (from competition PDF)

\`\`\`sql
CREATE TABLE embeddings (
    id             SERIAL PRIMARY KEY,
    id_document    INT,
    texte_fragment TEXT,
    vecteur        VECTOR(384)
);
\`\`\`

The \`VECTOR(384)\` type only exists in PostgreSQL via the \`pgvector\` extension. The PDF does not name pgvector explicitly, but the schema necessarily implies it. Either way, this is a PostgreSQL table — not NumPy files.

---

## 03 — My Solution — Full Compliance

My code is publicly available at \`github.com/mohamedyaakoubi/RBG-ARSII-RAG\`.

### docker-compose.yml — PostgreSQL with pgvector

\`\`\`yaml
services:
  postgres-vector:
    build: .
    container_name: postgres-vector-db
    environment:
      POSTGRES_USER: rag
      POSTGRES_PASSWORD: ragpassword
      POSTGRES_DB: ragdb
    ports:
      - "5432:5432"
\`\`\`

### Dockerfile — PostgreSQL 16 + pgvector

\`\`\`dockerfile
FROM postgres:16

RUN apt-get update && apt-get install -y \\
    git build-essential postgresql-server-dev-16

RUN git clone https://github.com/pgvector/pgvector.git \\
    && cd pgvector && make && make install

COPY init.sql /docker-entrypoint-initdb.d/
\`\`\`

### init.sql

\`\`\`sql
CREATE EXTENSION IF NOT EXISTS vector;
\`\`\`

### Exact required table schema (database/models.py)

\`\`\`python
cursor.execute(f"""
    CREATE TABLE IF NOT EXISTS embeddings (
        id              SERIAL PRIMARY KEY,
        id_document     INT,
        texte_fragment  TEXT,
        vecteur         vector({config.EMBEDDING_DIMENSION})
    )
""")
\`\`\`

:::callout-pass Compliant
This matches the competition PDF specification character for character.
:::

### Cosine similarity search via pgvector (database/models.py)

\`\`\`python
cursor.execute("""
    SELECT
        id_document,
        texte_fragment,
        1 - (vecteur <=> %s::vector) AS score
    FROM embeddings
    ORDER BY vecteur <=> %s::vector
    LIMIT %s
""", (query_vector.tolist(), query_vector.tolist(), top_k))
\`\`\`

The \`<=>\` operator is the pgvector cosine distance operator — consistent with the challenge's \`VECTOR(384)\` column type and cosine similarity requirement.

---

## 04 — Constraint Compliance Summary

| Constraint (from PDF) | My Solution (Noobmaster) | Winning Solution |
|---|---|---|
| PostgreSQL database | **✓** Docker PostgreSQL 16 + pgvector | **✗** NumPy \`.npz\` + JSON files |
| \`embeddings(id, id_document, texte_fragment, vecteur VECTOR(384))\` | **✓** Exact schema | **✗** No SQL table exists |
| all-MiniLM-L6-v2, 384d | **✓** | **✓** |
| Cosine similarity | **✓** pgvector \`<=>\` operator | **✓** \`np.dot()\` on normalized vectors |
| Top K = 3 | **✓** | **✓** |
| Python | **✓** | **✓** |
| Returns fragment text + similarity score | **✓** | **✓** (also adds LLM-generated answers) |
| No external API dependency stated | **✓** Fully offline | **✗** Depends on Groq API + Llama 3.3 70B |

:::callout-warn Key finding
The winning solution does not use PostgreSQL, which the competition PDF specifies as a mandatory requirement. This is a binary, verifiable fact — anyone can check the code.
:::

---

## 05 — Retrieval Quality — Reproducible Benchmark

Beyond compliance, the core purpose of the challenge is retrieval quality. Both solutions were tested with the same 16 queries, same embedding model (\`all-MiniLM-L6-v2\`), same K=3.

### How to Reproduce

**Winning solution:**

1. Clone \`github.com/AyaZantour/RagProject\`
2. \`pip install -r requirements.txt\`
3. Run \`python app.py\` — the index auto-builds on first run
4. POST to \`/search\` with \`{"query": "your question"}\` or use the web UI

**My solution:**

1. Clone \`github.com/mohamedyaakoubi/RBG-ARSII-RAG\`
2. \`docker-compose up -d\` to start PostgreSQL
3. \`pip install -r requirements.txt\`
4. \`python main.py\` (runs ingestion + starts Streamlit UI)

### Benchmark Results

Score = cosine similarity of the top-1 retrieved chunk. Higher = better retrieval.

:::stats
0.7695|My avg top-1 score
0.5480|Winner avg score
+40.4%|My advantage
:::

| # | Query | My Score | Winning Score | Delta |
|---|---|---|---|---|
| 1 | **Competition example query** (alpha-amylase + xylanase + ascorbic acid dosages) | **0.9330** | 0.5210 | +0.4120 |
| 2 | Lipase dosage (FR) | **0.7758** | 0.4912 | +0.2846 |
| 3 | Xylanase dosage (FR) | **0.8178** | 0.4980 | +0.3198 |
| 4 | Ascorbic acid purpose (FR) | **0.7395** | 0.5949 | +0.1446 |
| 5 | Xylanase effect on volume (FR) | **0.6917** | 0.3494 | +0.3423 |
| 6 | Alpha-amylase dosage (EN) | **0.7786** | 0.5689 | +0.2097 |
| 7 | Storage conditions AF110 | **0.6818** | 0.4356 | +0.2462 |
| 8 | Transglutaminase dose (FR) | **0.8209** | 0.4197 | +0.4012 |
| 9 | Allergens | **0.7649** | 0.5399 | +0.2250 |
| 10 | Optimal pH xylanase | **0.6188** | 0.5310 | +0.0878 |
| 11 | Lipase texture improvement | **0.6718** | 0.6049 | +0.0669 |
| 12 | Shelf life | **0.8143** | 0.6130 | +0.2013 |
| 13 | Alpha-amylase activity (FR) | **0.7608** | 0.6067 | +0.1541 |
| 14 | Microbial source xylanase | **0.7917** | 0.7230 | +0.0687 |
| 15 | Combine amylase + xylanase (EN) | **0.9330** | 0.6472 | +0.2858 |
| 16 | Packaging | **0.7175** | 0.6232 | +0.0943 |

My solution outperforms on all 16 queries. The gap is largest on French-language queries and multi-entity queries.

---

## 06 — Answer Helpfulness — What Each System Actually Returns

Beyond similarity scores, the critical question is: **does the retrieved fragment actually answer the user's question?**

### 6.1 Competition Example Query

:::query Query — exact example from the competition PDF
"Améliorant de panification : quelles sont les quantités recommandées d'alpha-amylase, xylanase et d'Acide ascorbique ?"
EN: "Bread improver: what are the recommended quantities of alpha-amylase, xylanase, and ascorbic acid?" — asks for dosages of three specific enzymes.
:::

| | My Solution (Noobmaster) | Winning Solution |
|---|---|---|
| **R1** | Dosage alpha-amylase (BVZyme AF330) boulangerie panification : 2–10 (0.9330) | Product Description Enzyme preparation based on Maltogenic Amylase… Improve freshness… (0.5210) |
| **R2** | Dosage xylanase (BVzyme HCF400) boulangerie panification : 15–35 (0.9185) | Xylanase TDS header (0.5075) |
| **R3** | Dosage acide ascorbique (vitamine C, E300) boulangerie panification : 50–75 ppm (0.8635) | Xylanase TDS header (0.5054) |
| Covers alpha-amylase? | **✓** with dosage range | **✗** returns maltogenic amylase (different enzyme) |
| Covers xylanase? | **✓** with dosage range | Partially — just product header, no dosage |
| Covers ascorbic acid? | **✓** with dosage range | **✗** not present at all |
| **All 3 enzymes answered?** | **✓** | **✗** |

My solution returns **3 direct answers** with exact dosage ranges for all 3 enzymes requested. The winning solution returns a maltogenic amylase product description (wrong enzyme type) and two xylanase headers without dosage data.

### 6.2 French Queries — Language Handling

:::query Query FR-1
"Quel dosage de lipase pour la panification ?"
EN: "What lipase dosage for bread-making?"
:::

| | My Solution | Winning Solution |
|---|---|---|
| **R1** | Dosage lipase (L65pdf) boulangerie panification : 5–50 | Dosages Recommandés (ppm)… — *from ascorbic acid PDF, not lipase* |
| Correct enzyme? | **✓** lipase, 3 different products | **✗** returns ascorbic acid dosage table |

The winning solution was asked about lipase and returned the ascorbic acid document. This is a consequence of \`all-MiniLM-L6-v2\` being English-optimized — the mechanism and its impact on French queries are detailed in Section 8.

:::query Query FR-4
"Quel est l'effet de la xylanase sur le volume du pain ?"
EN: "What is the effect of xylanase on bread volume?" (Score: 0.6917 vs 0.3494)
:::

| | My Solution | Winning Solution |
|---|---|---|
| **R1** | BVzyme HCF MAX X (xylanase): Bread Improvement 1–15ppm | xyder si dosage excessif (mie collante, défauts) — *from ascorbic acid's side effects section* |
| Answers the question? | **✓** xylanase bread improvement data | **✗** ascorbic acid overdose warnings |

### 6.3 Specific Product Queries

:::query Query U-1
"What are the storage conditions for BVZyme AF110?"
:::

| | My Solution | Winning Solution |
|---|---|---|
| **R1** | BVZyme AF110 (alpha-amylase) storage conditions and shelf life: minimum durability: 24 months. Store in a cool, dry place (below 20°C). | BVZyme A FRESH 202 is an amylolytic enzyme… — *wrong product entirely* |
| Correct product? | **✓** AF110 specifically | **✗** returns A FRESH 202 |

:::query Query U-7
"Quelle est l'activité enzymatique de l'alpha-amylase ?"
EN: "What is the enzymatic activity of alpha-amylase?"
:::

| | My Solution | Winning Solution |
|---|---|---|
| **R1** | BVZyme AF330 (alpha-amylase): Activity 11900 FAU/g | Enzyme preparation based on Maltogenic Amylase… — *wrong enzyme type* |
| **R2** | BVZyme AF220 (alpha-amylase): Activity 11000 FAU/g | BVZyme AF110… alpha-amylase (0.5860) |
| **R3** | BVZyme AF110 (alpha-amylase): Activity 150000 SKB/g | BVZyme AF220… alpha-amylase (0.5837) |
| Answers with data? | **✓** 3 products with activity values | **✗** product descriptions, no activity numbers |

### 6.4 Helpfulness Assessment Summary

| Criterion | My Solution | Winning Solution |
|---|---|---|
| **Correct enzyme in results** | 16/16 queries | ~11/16 queries (5 return wrong enzyme or unrelated content) |
| **Actionable data in R1** | 14/16 (dosages, activity values, storage specs) | 4/16 (mostly generic product descriptions) |
| **Correct product when specific product asked** | **✓** (U-1: AF110 → AF110) | **✗** (U-1: AF110 → A FRESH 202) |
| **French query handling** | Translates to English, searches both | No handling — raw French embedded into English model |
| **Multi-entity queries** | Decomposes into sub-queries, 1 result per entity | Returns top-3 by global similarity (often same entity repeated) |

:::callout-note Note on methodology
The helpfulness numbers above were initially derived from an automated crosscheck script that matched keywords in retrieved fragments against expected answer terms. That automated pass produced inflated results for the winning solution — for example, matching "acid" in "fatty acids" as a hit for ascorbic acid, or counting a "xylanase" keyword match even when the chunk contained no dosage data. To resolve these discrepancies, every one of the 52 query–result pairs (16 + 10 per solution) was manually reviewed: all three returned fragments (R1, R2, R3) were read in full and judged against the source PDF content on whether they actually answer the question asked. R1 determines the primary verdict; R2/R3 distinguish PARTIAL from MISS. The full per-query manual assessment is in \`results/manual_helpfulness_assessment.md\`.
:::

---

## 07 — Chunk Quality Comparison

### My solution — Entity-centric chunks (pdfplumber extraction)

\`\`\`text
Dosage alpha-amylase (BVZyme AF330) boulangerie panification : 2-10.
\`\`\`

\`\`\`text
BVZyme HCB710 (xylanase): Product: Enzyme preparation based on endo-xylanase.
Source: Bacterial xylanase produced by fermenting a selected unique strain of
Bacillus subtilis. Activity: 583 XylH/g.
\`\`\`

\`\`\`text
BVZyme AF110 (alpha-amylase) storage conditions and shelf life: minimum
durability: 24 months. Store in a cool, dry place (below 20°C).
\`\`\`

:::callout-pass Clean
Each chunk is semantically focused on one type of question about one product.
:::

### Winning solution — Fixed-width sliding window (PyPDF2 extraction)

\`\`\`text
Product Description
Enzyme preparation based on Maltogenic Amylase


 Effective material




 Improve freshness, enhance softness, and extend shelf life.


 Dosage
Aspect: free flowing powder
Color: white -cream
 Physicochemical
Moisture: <15%
\`\`\`

\`\`\`text
ustries.TECH NICAL DATA SHEET   BVZyme TG MAX64 « Bakery Enzyme
Product Description     BVZyme  TG MAX64 « is used in bakery as a strong
protein cross-linking(connecting residues of the amino acid L-glutamine
to the amino acid £¿L-lysine)Application
\`\`\`

:::callout-warn Garbled
Excessive whitespace, merged headers, broken words, and encoding artifacts (\`£¿\`, \`«\`). The 500-character window slices through tables and sections without regard for document structure.
:::

---

## 08 — Why the Technical Gap Exists

This is not about one team being "better" — it is about the architectural choices that the challenge was designed to test.

### PDF Extraction

| | My Solution | Winning Solution |
|---|---|---|
| Library | **pdfplumber** (preserves layout, tables) | **PyPDF2** (plain text extraction) |
| Table handling | Converts tables to structured text | No table handling |
| Noise removal | Regex-based removal of headers, footers, contact info | None |

### Chunking Strategy

| | My Solution | Winning Solution |
|---|---|---|
| Approach | **Entity-centric**: 9 structured categories per product (identity, dosage, function, storage, packaging, allergen, safety, physical properties, regulatory) | **Fixed-size sliding window**: 500 characters, 50 overlap |
| Total chunks | **924 structured chunks → 1,635 embeddings** (with enrichment) | **176 chunks** |
| Chunk quality | Each chunk is semantically focused on one topic | Chunks cut arbitrarily across sections |

### Embedding Strategy

| | My Solution | Winning Solution |
|---|---|---|
| Approach | **Dual embeddings**: original chunk + enriched variant (11 content-based enrichment rules). 924 chunks → 1,635 embeddings | Single embedding per chunk. 176 embeddings total |
| Enrichment | Keywords derived from chunk content are appended to embedding input (never stored/returned). E.g., a dosage chunk gets "dosage quantity ppm recommended amount" appended for embedding only | None |

### Search Engineering

| | My Solution | Winning Solution |
|---|---|---|
| Language handling | **86 French→English translation rules** + bilingual search (queries in both FR and EN, merges best results) | None — raw French query into English-optimized model |
| Query decomposition | Detects multi-entity queries, splits into sub-queries, returns 1 result per entity | None — single query, top-3 by global similarity |
| External API | None — fully self-contained | Groq API + Llama 3.3 70B for answer generation |

The \`all-MiniLM-L6-v2\` model is English-optimized. French queries against English chunks produce significantly lower similarity scores (~0.40 vs ~0.70 for the same query in English). My solution bridges this gap with query-time translation. The winning solution sends raw French directly into the model.

---

## 09 — Scope and Approach — What Each Solution Prioritized

| Aspect | My Solution | Winning Solution |
|---|---|---|
| **Core approach** | **Pure retrieval engineering** — maximize the quality of what the embedding model can find | **LLM post-processing** — use Groq API + Llama 3.3 70B to generate natural language answers from retrieved chunks |
| **Where intelligence lives** | In chunking strategy, enrichment rules, query translation, and decomposition | In the Llama 3.3 70B model via external API call |
| **Answer presentation** | Raw fragments with scores (as specified by competition) | LLM-generated natural language answer from retrieved fragments |

**The LLM layer does not compensate for low-accuracy retrieval.** An LLM can only synthesize an answer from the fragments it receives. When the winning solution's retrieval returns a non-matching enzyme (e.g., ascorbic acid chunks for a lipase query) or a non-matching product (e.g., A FRESH 202 for an AF110 query), the LLM generates a response based on that incorrect input.

The LLM has no access to the original PDFs or any external knowledge source — it only sees the 3 retrieved chunks. This means the retrieval errors documented in Section 6 propagate directly into the final answer. When retrieval returns incorrect content, the LLM-generated answer inherits those errors regardless of how fluent the output appears.

---

## 10 — Scalability — How Each System Handles New Products

Scalability was not a stated competition requirement. But a RAG system that only works on the data it was built for is not a RAG system — it's a lookup table. The whole point of retrieval-augmented generation is that new documents can be added and queried without modifying the pipeline. This section tests **retrieval generalization**: whether each system's engineering approach is genuinely robust or merely fitted to the original 35 PDFs.

To test how each solution handles growth, I added 6 new product PDFs that were never in the original dataset: GEbake Amyl, Domax SF Bingo Plus, Tigris Gold, O-TENTIC DURUM, an ascorbic acid spec sheet, and an additives authorization document.

10 queries were run against these new products. Each result was evaluated not by cosine score alone, but by **answer helpfulness**: does R1 come from the correct product PDF, and does the returned fragment actually contain the answer? Specific values were cross-verified against the source PDFs using pdfplumber.

| Query | Expected Answer | My Solution | Winning Solution |
|---|---|---|---|
| GEbake Amyl dosage | 20–100 ppm | PARTIAL — correct product | PARTIAL — correct product, no dosage in chunk |
| GEbake Amyl pH | pH 5.5–6.5 | **Full hit** | PARTIAL — no pH in chunk |
| GEbake Amyl shelf life | 12 months | PARTIAL — truncated | PARTIAL — shelf life not in chunk |
| Domax SF Bingo Plus enzymes | Xylanase, Maltogenic Amylase | PARTIAL | PARTIAL — R1 is wrong product, but answer in R3 |
| Domax SF Bingo Plus dosage | 50–150 g/100kg | **Full hit** | **Full hit** |
| Tigris Gold dosage | 0.5% on flour | PARTIAL | **✗** MISS — R1 is acide ascorbique |
| Tigris Gold ascorbic acid | In ingredient list | PARTIAL — truncated | **✗** MISS — nutritional fat data, no ascorbic acid |
| O-TENTIC DURUM purpose | Sourdough, Mediterranean | **Full hit** | PARTIAL — TDS header, no product description |
| O-TENTIC DURUM dosage | 4% on flour | **Full hit** | **✗** MISS — R1-R2 are acide ascorbique |
| Acide ascorbique dose (FR) | 20–60 ppm | **Full hit** | PARTIAL — general summary, no dosage value |

:::stats
5 / 10|My full hits
1 / 10|Winner full hits
0|My misses
:::

The entity-centric chunking strategy described in Section 7 prefixes each fragment with the product name, allowing the embedding model to distinguish products by identity even as the corpus grows. Without that anchoring, the winning solution's generic-header chunks compete across PDFs — returning acide ascorbique fragments for Tigris Gold and O-TENTIC DURUM queries.

---

## 11 — Storage vs Accuracy — The Space-Compute Tradeoff

As noted in Section 10, scalability is not a scored metric. This section examines the storage and compute cost of each solution's architectural choices.

My solution stores 9.3× more embeddings than the winning solution (1,635 vs 176). The natural question is: what does that cost, and what does it buy?

| | My Solution | Winning Solution |
|---|---|---|
| **Embeddings** | 1,635 | 176 |
| **Vector storage** | 1,635 × 384 × 4 bytes = **2.51 MB** | 176 × 384 × 4 bytes = **0.27 MB** |
| **Search complexity** | O(1,635) dot products per query | O(176) dot products per query |
| **Search latency** | < 5 ms (brute-force) | < 1 ms (brute-force) |
| **External API cost per query** | **✓** None | **✗** 1 Groq API call (Llama 3.3 70B) |

The entire vector index is **2.51 MB** — smaller than a single product photo. The additional 2.24 MB over the winning solution's index is the total cost of entity-centric chunking with dual embeddings.

The competition imposes a **22-million-parameter model with 384 dimensions** — deliberately small and cheap. With a fixed model, the only optimization lever is how you prepare the data for it. Entity-centric chunking produces more vectors, but each one is semantically focused: one topic, one product, one answerable question. This gives the small model a much higher probability of producing a strong cosine match, because the 384 dimensions encode a single concept rather than a mixture of unrelated fields.

The winning solution takes the opposite path: fewer, larger chunks that mix product descriptions, dosage tables, physical properties, and contact information into single 500-character windows. This saves negligible storage but forces the embedding model to compress multiple unrelated concepts into a single 384-dimensional vector — exactly the scenario where a small model loses discriminative power between topics.

In information retrieval theory, this is the **precision-recall tradeoff**: more, smaller chunks increase recall (more potential matches) at the cost of storage overhead. For a corpus of 35 PDFs, that overhead is 2.24 MB. For context, the winning solution's per-query external LLM API call introduces more latency and operational cost than the entire additional storage.

The tradeoff is clear: spend 2.24 MB of disk space and a few extra milliseconds of compute per query, or accept 40.4% lower retrieval accuracy. Both are valid architectural choices — but in a challenge designed to test retrieval quality within tight constraints, one of them is better aligned with the problem.

### How Storage Scales With New Products

Rose Blanche Group's enzyme catalog will grow over time. How does each approach scale?

At 35 PDFs, noobmaster averages ~46.7 embeddings per PDF (entity-centric: 9 structured categories × ~5.2 products per PDF, plus enrichment variants). The winner averages ~5 chunks per PDF (500-char windows over short TDS documents).

| Corpus size | My embeddings | My storage | Winner embeddings | Winner storage |
|---|---|---|---|---|
| **35 PDFs** (current) | 1,635 | **2.51 MB** | 176 | 0.27 MB |
| **100 PDFs** | ~4,670 | **~7.2 MB** | ~500 | ~0.77 MB |
| **1,000 PDFs** | ~46,700 | **~71.7 MB** | ~5,000 | ~7.7 MB |
| **10,000 PDFs** | ~467,000 | **~717 MB** | ~50,000 | ~77 MB |

At 10,000 PDFs — far beyond any single company's enzyme catalog — the entire noobmaster vector index would be **under 1 GB**. A consumer laptop has 16 GB of RAM; a basic cloud instance has hundreds of gigabytes of disk. Storage is not the constraint at any realistic scale.

Search latency tells a more interesting story. noobmaster uses PostgreSQL with pgvector, which supports **HNSW and IVFFlat approximate nearest-neighbor indexes**. These reduce search from O(n) brute-force to O(log n) at query time, keeping latency sub-10ms even at hundreds of thousands of vectors. The winner uses NumPy brute-force (\`np.dot\` over the full array) with no indexing structure — at 50,000 vectors this remains fast (~5ms), but the architecture offers no path to sub-linear scaling without a fundamental rewrite.

The real cost asymmetry is elsewhere: the winner's Groq API call per query has variable latency (network-dependent), a per-token monetary cost, and a hard dependency on an external service being available. My solution's additional storage costs nothing to operate once written to disk.

---

## 12 — The Organizational Response

On March 18, 2026, I sent a formal email to ARSII with the full technical comparison report, requesting an explanation of the evaluation criteria used.

ARSII's response was a broadcast email to all participants (not a direct reply). The relevant points:

:::bq
"We would like to clarify that ARSII does not interfere in the evaluation process of the challenges, except for those proposed by ARSII itself. Each challenge is assessed independently by the respective partner organization responsible for it."
:::

:::bq
"In case of any objections or concerns, you are absolutely welcome to submit a reclamation. We will ensure that you are put in direct contact with the responsible party of the challenge."
:::

According to this response, ARSII delegates challenge evaluation to the respective partner organization. The recourse offered is direct contact with Rose Blanche Group.

As of March 26, 2026, no direct response has been received and no acknowledgment of the documented requirement discrepancy has been issued.

---

## 13 — What This Post Establishes

This post is a public record of findings, not a request. The evidence presented here is independently verifiable by anyone with access to the two GitHub repositories and the competition PDF. Specifically:

1. **The winning solution does not use PostgreSQL** — observable in the source code (Section 2).
2. **Retrieval quality is measurably lower** on every metric tested — cosine similarity, answer helpfulness, and product accuracy.
3. **The evaluation process has not been explained.** What criteria were used? If the PostgreSQL requirement was waived, when and how were participants informed?

These are documented observations. The reader can draw their own conclusions.

---

## 14 — All Evidence — Verify It Yourself

Everything mentioned in this post is publicly verifiable:

| Resource | Link |
|---|---|
| My solution (Noobmaster) | github.com/mohamedyaakoubi/RBG-ARSII-RAG |
| Winning solution | github.com/AyaZantour/RagProject |
| Benchmarking & reporting tools | github.com/mohamedyaakoubi/noobmaster-vs-double_a--winner-- |
| Competition PDF | Included in the winning solution's repository |
| Full technical comparison report | Included in the benchmarking repository |

The benchmarking repository contains all scripts, results, and reports used in this analysis. The original solution repositories remain untouched — no benchmark code was added to either.

The data presented in this post is fully reproducible. Anyone can clone both repositories, run the same queries, and independently verify every metric reported here.

---

## Conclusion

My solution complies with all competition constraints, achieves 40.4% higher retrieval accuracy, returns correct and actionable content for 14 of 16 queries (with 0 misses), and does so entirely offline without external API dependencies.

The winning solution's retrieval — the core task of the challenge — records lower scores on every tested metric. With 176 chunks produced by a fixed-width sliding window, no French handling, no query decomposition, no PostgreSQL (a stated requirement), only 4 of 16 queries returning actionable data, and 5 complete misses on the base benchmark, the observed outputs do not align with the competition specifications.

As additional context (not scored — scalability was not a stated requirement): noobmaster scales to unseen products without returning wrong-product results (5/10 full, 5/10 partial, 0 misses), while the winner retrieves the wrong product on 3 of 10 new-product queries with only 1 full hit.

*Benchmark executed March 17–26, 2026. Both solutions tested with the same 16 queries + 10 scalability queries, same embedding model (all-MiniLM-L6-v2), same K=3, on the same machine. Retrieval scores are reproducible cosine similarity values. Answer helpfulness was assessed by manual review of each R1 fragment against source PDF content — no automated keyword matching. Scalability answer-helpfulness was cross-verified against source PDFs using pdfplumber.*

*This post contains only publicly available information and verifiable technical facts. All claims can be independently verified by cloning the referenced repositories and running the documented benchmarks.*`,
};
