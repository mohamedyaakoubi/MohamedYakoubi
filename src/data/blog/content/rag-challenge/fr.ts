export const postContent = {
  title: "Comparaison Technique du RAG Challenge : Un Post-Mortem Reproductible",
  heroTitle: `Comparaison Technique du <span class="hero-accent">RAG Challenge</span>`,
  description: "Un post-mortem technique reproductible du RAG Challenge AINC'26 — comparaison des règles du concours, de la conformité du code, et des benchmarks de récupération entre ma solution (Noobmaster) et la solution gagnante.",
  heroTag: "AINC'26 · RAG Challenge · Post-Mortem Technique",
  tags: ["RAG", "PostgreSQL", "pgvector", "Recherche Sémantique", "Ingénierie des Données", "Benchmarking", "NLP", "Python"],
  content: `## 00 — À propos de cet article

J'ai participé à un RAG Challenge (Retrieval-Augmented Generation) organisé par ARSII en partenariat avec Rose Blanche Group. Le concours était assorti de règles écrites précisant des contraintes techniques exactes. La solution gagnante n'utilise pas PostgreSQL, que le PDF du concours désigne comme une exigence obligatoire. J'ai soulevé ce point auprès des organisateurs. Aucune réponse n'a été reçue à la date de publication.

Cet article présente les preuves — les règles du concours, le code source, et des résultats de benchmark reproductibles — afin que quiconque puisse vérifier les affirmations de manière indépendante.

Cette analyse porte exclusivement sur les artéfacts techniques — le code, les configurations et les sorties de récupération mesurables — et non sur un quelconque participant à titre individuel.

---

## 01 — Les règles du concours

Le challenge a été proposé par **Rose Blanche Group (STE AGRO MELANGE TECHNOLOGIE)**. Le prix : un bon d'achat de 1 000 DT.

### Description officielle du challenge

:::bq
Développer un module de recherche sémantique permettant d'interroger cette base vectorielle (RAG)
:::

:::bq
Dans un contexte où une base documentaire contient un grand volume d'informations [...] L'objectif est de développer un module intelligent capable d'assister l'utilisateur en retrouvant automatiquement les fragments les plus pertinents à partir d'une question formulée en langage naturel.
:::

### PDF technique officiel — Contraintes exactes

Le PDF du concours (*Développement d'un Module de Recherche Sémantique pour la Formulation en Boulangerie & Pâtisserie*) spécifie verbatim :

:::bq
**Contexte :** Ces fiches ont déjà été : Converties en texte, Découpées en fragments (chunks), Transformées en embeddings, **Stockées dans une base PostgreSQL**
:::

:::bq
**Ressources fournies :** Base de données PostgreSQL — Table : embeddings — Structure : **id** (Primary Key), **id_document** (int), **texte_fragment** (text), **vecteur** (VECTOR(384))
:::

:::bq
**Paramètres imposés :** Méthode de similarité : **Cosine Similarity** — Nombre de résultats à retourner : **Top K = 3** — Langage recommandé : **Python**
:::

:::bq
**Modèle d'embedding imposé :** Modèle imposé : **all-MiniLM-L6-v2** — Bibliothèque : sentence-transformers — Dimension : **384**
:::

:::bq
**Exemple de requête :** Améliorant de panification : quelles sont les quantités recommandées d'alpha-amylase, xylanase et d'Acide ascorbique ?
:::

La contrainte de base de données n'est pas une suggestion. Le PDF indique que les données sont *"Stockées dans une base PostgreSQL"* et fournit un schéma de table exact avec des colonnes typées, dont \`vecteur VECTOR(384)\` — un type de données qui n'existe dans PostgreSQL qu'à travers l'extension \`pgvector\`. L'ensemble du challenge est construit autour de l'interrogation de cette base de données vectorielle PostgreSQL.

### Ce que ce challenge cherche vraiment à mesurer

Ces contraintes ne sont pas arbitraires. Elles définissent un problème d'ingénierie très précis : **avec un petit modèle d'embedding (22 millions de paramètres, 384 dimensions), une profondeur de récupération fixe (K=3) et une base de données PostgreSQL locale — dans quelle mesure peut-on prétraiter, structurer et optimiser ses données pour produire les meilleurs résultats de récupération possible ?**

Il s'agit d'un challenge d'ingénierie et d'optimisation des données, et non d'un exercice d'intégration d'API. Le modèle fixe, le K fixe et l'exigence d'une base de données locale ont précisément pour but d'égaliser les conditions et de mesurer ce que chaque participant fait avec les données elles-mêmes — la qualité d'extraction des PDF, la stratégie de chunking, la façon dont les embeddings sont structurés et la gestion des requêtes.

Si le challenge consistait simplement à construire un système RAG, n'importe qui pourrait brancher LangChain sur une API LLM puissante et obtenir des réponses fluides en quelques minutes. Mais cette approche ne requiert aucune optimisation, engendre des coûts d'API élevés, transmet potentiellement des données d'entreprise sensibles à des fournisseurs externes, et ne démontre aucune compréhension des mécanismes sous-jacents de récupération. Le concours élimine délibérément ce raccourci en imposant un système local et autonome.

La vraie compétence testée est : **peut-on faire performer un modèle de 22 millions de paramètres bien au-delà de ses capacités apparentes grâce à un prétraitement intelligent des données et à de l'ingénierie de la recherche ?**

---

## 02 — La solution gagnante n'utilise pas PostgreSQL

Le code de l'équipe gagnante est disponible publiquement à l'adresse \`github.com/AyaZantour/RagProject\`. Voici ce que fait réellement leur couche de stockage.

### vector_store.py — Lignes 57–68 (méthode de sauvegarde)

\`\`\`python
def save(self, path: str) -> None:
    os.makedirs(os.path.dirname(path) if os.path.dirname(path) else ".", exist_ok=True)

    np.savez_compressed(f"{path}.npz", embeddings=self.embeddings)
    with open(f"{path}.json", "w", encoding="utf-8") as f:
        json.dump(self.metadata, f, ensure_ascii=False, indent=2)
\`\`\`

:::callout-warn Constat
Les vecteurs sont stockés dans un fichier NumPy \`.npz\`. Les métadonnées sont stockées dans un fichier JSON. Il n'y a pas de PostgreSQL, pas de \`psycopg2\`, pas de SQL, pas de \`pgvector\`.
:::

### vector_store.py — Lignes 94–119 (méthode de recherche)

\`\`\`python
def search(self, query: str, top_k: int = 3) -> list:
    # Vectoriser la requête
    query_embedding = self.model.encode(
        [query],
        convert_to_numpy=True,
        normalize_embeddings=True
    )

    # Cosine similarity (produit scalaire sur vecteurs normalisés)
    similarities = np.dot(self.embeddings, query_embedding.T).flatten()

    # Indices des top-k résultats
    top_indices = np.argsort(similarities)[::-1][:top_k]
\`\`\`

La recherche s'effectue par produit scalaire NumPy sur des tableaux en mémoire. Pas de requête de base de données. Pas de \`ORDER BY\` SQL. Pas d'opérateur pgvector \`<=>\`.

### requirements.txt

\`\`\`text
PyPDF2>=3.0.0
sentence-transformers>=2.2.0
numpy>=1.24.0
flask>=3.0.0
groq>=0.4.0
\`\`\`

:::callout-warn Constat
Pas de \`psycopg2\`. Aucun pilote de base de données de quelque nature que ce soit.
:::

### Schéma de table requis (extrait du PDF du concours)

\`\`\`sql
CREATE TABLE embeddings (
    id             SERIAL PRIMARY KEY,
    id_document    INT,
    texte_fragment TEXT,
    vecteur        VECTOR(384)
);
\`\`\`

Le type \`VECTOR(384)\` n'existe dans PostgreSQL qu'à travers l'extension \`pgvector\`. Le PDF ne nomme pas pgvector explicitement, mais le schéma l'implique nécessairement. Quoi qu'il en soit, il s'agit d'une table PostgreSQL — et non de fichiers NumPy.

---

## 03 — Ma solution — Conformité totale

Mon code est disponible publiquement à l'adresse \`github.com/mohamedyaakoubi/RBG-ARSII-RAG\`.

### docker-compose.yml — PostgreSQL avec pgvector

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

### Schéma de table exact (database/models.py)

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

:::callout-pass Conforme
Ce schéma correspond caractère pour caractère à la spécification du PDF du concours.
:::

### Recherche par similarité cosinus via pgvector (database/models.py)

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

L'opérateur \`<=>\` est l'opérateur de distance cosinus de pgvector — cohérent avec le type de colonne \`VECTOR(384)\` et l'exigence de similarité cosinus du concours.

---

## 04 — Récapitulatif de conformité

| Contrainte (PDF) | Ma solution | Solution gagnante |
|---|---|---|
| Base de données PostgreSQL | **✓** Docker PostgreSQL 16 + pgvector | **✗** Fichiers NumPy \`.npz\` + JSON |
| \`embeddings(id, id_document, texte_fragment, vecteur VECTOR(384))\` | **✓** Schéma exact | **✗** Aucune table SQL n'existe |
| all-MiniLM-L6-v2, 384d | **✓** | **✓** |
| Cosine Similarity | **✓** Opérateur pgvector \`<=>\` | **✓** \`np.dot()\` sur vecteurs normalisés |
| Top K = 3 | **✓** | **✓** |
| Python | **✓** | **✓** |
| Retourne texte du fragment + score de similarité | **✓** | **✓** (ajoute aussi des réponses générées par un LLM externe) |
| Aucune dépendance à une API externe | **✓** Entièrement hors ligne | **✗** Requiert l'API Groq + Llama 3.3 70B |

:::callout-warn Constat clé
La solution gagnante n'utilise pas PostgreSQL, que le PDF du concours désigne comme une exigence obligatoire. Il s'agit d'un fait binaire et vérifiable — n'importe qui peut consulter le code.
:::

---

## 05 — Qualité de récupération — Benchmark reproductible

Les deux solutions ont été testées avec les mêmes 16 requêtes, le même modèle d'embedding (\`all-MiniLM-L6-v2\`) et le même K=3. Score = similarité cosinus du chunk récupéré en position 1 (R1). Plus c'est élevé, mieux c'est.

### Comment reproduire

**Solution gagnante :**

1. Cloner \`github.com/AyaZantour/RagProject\`
2. \`pip install -r requirements.txt\`
3. Lancer \`python app.py\` — l'index se construit automatiquement au premier démarrage
4. Envoyer une requête POST à \`/search\` avec \`{"query": "votre question"}\` ou utiliser l'interface web

**Ma solution :**

1. Cloner \`github.com/mohamedyaakoubi/RBG-ARSII-RAG\`
2. \`docker-compose up -d\` pour démarrer PostgreSQL
3. \`pip install -r requirements.txt\`
4. \`python main.py\` (lance l'ingestion et démarre l'interface Streamlit)

### Résultats du benchmark

:::stats
0,7695|Mon score moyen (R1)
0,5480|Score moyen du gagnant
+40,4 %|Mon avantage
:::

| # | Requête | Mon score | Gagnant | Δ |
|---|---|---|---|---|
| 1 | **Requête exemple du concours** (alpha-amylase + xylanase + acide ascorbique) | **0,9330** | 0,5210 | +0,4120 |
| 2 | Dosage lipase (FR) | **0,7758** | 0,4912 | +0,2846 |
| 3 | Dosage xylanase (FR) | **0,8178** | 0,4980 | +0,3198 |
| 4 | Rôle de l'acide ascorbique (FR) | **0,7395** | 0,5949 | +0,1446 |
| 5 | Effet de la xylanase sur le volume (FR) | **0,6917** | 0,3494 | +0,3423 |
| 6 | Dosage alpha-amylase (EN) | **0,7786** | 0,5689 | +0,2097 |
| 7 | Conditions de stockage AF110 | **0,6818** | 0,4356 | +0,2462 |
| 8 | Dose de transglutaminase (FR) | **0,8209** | 0,4197 | +0,4012 |
| 9 | Allergènes | **0,7649** | 0,5399 | +0,2250 |
| 10 | pH optimal xylanase | **0,6188** | 0,5310 | +0,0878 |
| 11 | Amélioration de texture par la lipase | **0,6718** | 0,6049 | +0,0669 |
| 12 | Durée de conservation | **0,8143** | 0,6130 | +0,2013 |
| 13 | Activité enzymatique alpha-amylase (FR) | **0,7608** | 0,6067 | +0,1541 |
| 14 | Origine microbienne xylanase | **0,7917** | 0,7230 | +0,0687 |
| 15 | Combinaison amylase + xylanase (EN) | **0,9330** | 0,6472 | +0,2858 |
| 16 | Emballage | **0,7175** | 0,6232 | +0,0943 |

Ma solution surpasse la solution gagnante sur l'ensemble des 16 requêtes. L'écart est le plus important sur les requêtes en français et les requêtes multi-entités.

---

## 06 — Utilité des réponses — Ce que chaque système retourne réellement

Au-delà des scores de similarité, la question fondamentale est : **le fragment récupéré répond-il réellement à la question de l'utilisateur ?**

### 6.1 Requête exemple du concours

:::query Requête — exemple exact du PDF du concours
"Améliorant de panification : quelles sont les quantités recommandées d'alpha-amylase, xylanase et d'Acide ascorbique ?"
FR: Demande les dosages de trois enzymes spécifiques.
:::

| | Ma solution | Solution gagnante |
|---|---|---|
| **R1** | Dosage alpha-amylase (BVZyme AF330) boulangerie panification : 2–10 (0,9330) | Product Description Enzyme preparation based on Maltogenic Amylase… Improve freshness… (0,5210) |
| **R2** | Dosage xylanase (BVzyme HCF400) boulangerie panification : 15–35 (0,9185) | En-tête TDS xylanase (0,5075) |
| **R3** | Dosage acide ascorbique (vitamine C, E300) boulangerie panification : 50–75 ppm (0,8635) | En-tête TDS xylanase (0,5054) |
| Couvre l'alpha-amylase ? | **✓** avec la plage de dosage | **✗** retourne amylase maltogénique (enzyme différente) |
| Couvre la xylanase ? | **✓** avec la plage de dosage | Partiellement — en-tête uniquement, sans dosage |
| Couvre l'acide ascorbique ? | **✓** avec la plage de dosage | **✗** Absent |
| **Les 3 enzymes sont-elles couvertes ?** | **✓** | **✗** |

Ma solution retourne 3 réponses directes avec les plages de dosage exactes pour les 3 enzymes demandées. La solution gagnante retourne une description de produit à base d'amylase maltogénique (mauvaise enzyme) et deux en-têtes TDS de xylanase sans donnée de dosage.

### 6.2 Requêtes en français — Gestion de la langue

:::query Requête FR-1
"Quel dosage de lipase pour la panification ?"
:::

| | Ma solution | Solution gagnante |
|---|---|---|
| **R1** | Dosage lipase (L65pdf) boulangerie panification : 5–50 | Dosages Recommandés (ppm)… — *extrait du PDF acide ascorbique, pas lipase* |
| Enzyme correcte ? | **✓** lipase, 3 produits différents | **✗** retourne le tableau de dosage de l'acide ascorbique |

La solution gagnante a été interrogée sur la lipase et a retourné le document relatif à l'acide ascorbique. C'est une conséquence directe de \`all-MiniLM-L6-v2\` étant optimisé pour l'anglais — le mécanisme et son impact sur les requêtes françaises sont détaillés à la section 8.

:::query Requête FR-4
"Quel est l'effet de la xylanase sur le volume du pain ?"
FR: Score : 0,6917 vs 0,3494
:::

| | Ma solution | Solution gagnante |
|---|---|---|
| **R1** | BVzyme HCF MAX X (xylanase): Bread Improvement 1–15ppm | xyder si dosage excessif (mie collante, défauts) — *extrait de la section effets indésirables de l'acide ascorbique* |
| Répond à la question ? | **✓** données sur l'amélioration du pain par la xylanase | **✗** avertissements sur le surdosage d'acide ascorbique |

### 6.3 Requêtes sur des produits spécifiques

:::query Requête U-1
"What are the storage conditions for BVZyme AF110?"
:::

| | Ma solution | Solution gagnante |
|---|---|---|
| **R1** | BVZyme AF110 (alpha-amylase) storage conditions and shelf life: minimum durability: 24 months. Store in a cool, dry place (below 20°C). | BVZyme A FRESH 202 is an amylolytic enzyme… — *mauvais produit* |
| Produit correct ? | **✓** AF110 spécifiquement | **✗** retourne A FRESH 202 |

:::query Requête U-7
"Quelle est l'activité enzymatique de l'alpha-amylase ?"
:::

| | Ma solution | Solution gagnante |
|---|---|---|
| **R1** | BVZyme AF330 (alpha-amylase): Activity 11900 FAU/g | Enzyme preparation based on Maltogenic Amylase… — *mauvais type d'enzyme* |
| **R2** | BVZyme AF220 (alpha-amylase): Activity 11000 FAU/g | BVZyme AF110… alpha-amylase (0,5860) |
| **R3** | BVZyme AF110 (alpha-amylase): Activity 150000 SKB/g | BVZyme AF220… alpha-amylase (0,5837) |
| Répond avec des données ? | **✓** 3 produits avec valeurs d'activité | **✗** descriptions de produits, aucune valeur d'activité |

### 6.4 Synthèse de l'évaluation de l'utilité

| Critère | Ma solution | Solution gagnante |
|---|---|---|
| **Enzyme correcte dans les résultats** | 16/16 requêtes | ~11/16 requêtes |
| **Donnée exploitable en R1** | 14/16 (dosages, valeurs d'activité, conditions de stockage) | 4/16 (principalement des descriptions génériques) |
| **Produit correct lors d'une requête spécifique** | **✓** (AF110 → AF110) | **✗** (AF110 → A FRESH 202) |
| **Gestion des requêtes françaises** | Traduit en anglais, recherche bilingue | Français brut envoyé dans un modèle optimisé anglais |
| **Requêtes multi-entités** | Décomposition en sous-requêtes, 1 résultat par entité | Top-3 par similarité globale (souvent la même entité répétée) |

:::callout-note Note méthodologique
Les chiffres d'utilité ci-dessus ont d'abord été dérivés d'un script de vérification automatisé qui correspondait des mots-clés dans les fragments récupérés aux termes de réponse attendus. Ce passage automatisé a produit des résultats gonflés pour la solution gagnante — par exemple, en comptant "acid" dans "fatty acids" comme une correspondance pour l'acide ascorbique, ou en comptant une correspondance sur "xylanase" même lorsque le chunk ne contenait aucune donnée de dosage. Pour résoudre ces divergences, chacune des 52 paires requête-résultat (16 + 10 par solution) a été examinée manuellement : les trois fragments retournés (R1, R2, R3) ont été lus intégralement et évalués par rapport au contenu du PDF source. R1 détermine le verdict principal ; R2/R3 distinguent PARTIEL de ABSENT. L'évaluation manuelle complète est disponible dans \`results/manual_helpfulness_assessment.md\`.
:::

---

## 07 — Comparaison de la qualité des chunks

### Ma solution — Chunks centrés sur l'entité (extraction pdfplumber)

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

:::callout-pass Propre
Chaque chunk est concentré sémantiquement sur un seul type de question concernant un seul produit.
:::

### Solution gagnante — Fenêtre glissante à taille fixe (extraction PyPDF2)

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

:::callout-warn Corrompu
Espaces excessifs, en-têtes fusionnés, mots tronqués et artefacts d'encodage (\`£¿\`, \`«\`). La fenêtre de 500 caractères découpe arbitrairement les tableaux et les sections sans tenir compte de la structure du document.
:::

---

## 08 — Pourquoi cet écart technique existe

Il ne s'agit pas d'une équipe étant « meilleure » qu'une autre — il s'agit des choix architecturaux que le challenge était conçu pour évaluer.

### Extraction PDF

| | Ma solution | Solution gagnante |
|---|---|---|
| Bibliothèque | **pdfplumber** (préserve la mise en page et les tableaux) | **PyPDF2** (extraction texte brut) |
| Gestion des tableaux | Convertit les tableaux en texte structuré | Aucune |
| Suppression du bruit | Regex : supprime en-têtes, pieds de page, coordonnées | Aucune |

### Stratégie de chunking

| | Ma solution | Solution gagnante |
|---|---|---|
| Approche | **Centré sur l'entité** : 9 catégories structurées par produit (identité, dosage, fonction, stockage, emballage, allergènes, sécurité, propriétés physiques, réglementaire) | **Fenêtre glissante à taille fixe** : 500 caractères, chevauchement de 50 |
| Nombre total de chunks | **924 chunks structurés → 1 635 embeddings** (avec enrichissement) | **176 chunks** |
| Qualité des chunks | Chaque chunk est concentré sémantiquement sur un seul sujet | Découpage arbitraire qui coupe au milieu des sections |

### Stratégie d'embedding

| | Ma solution | Solution gagnante |
|---|---|---|
| Approche | **Embeddings doubles** : chunk original + variante enrichie (11 règles d'enrichissement). 924 chunks → 1 635 embeddings | Un embedding par chunk. 176 embeddings au total |
| Enrichissement | Des mots-clés issus du contenu du chunk sont ajoutés à l'entrée de l'embedding (jamais stockés ni retournés). Ex. : un chunk de dosage reçoit "dosage quantity ppm recommended amount" pour l'embedding uniquement | Aucun |

### Ingénierie de la recherche

| | Ma solution | Solution gagnante |
|---|---|---|
| Gestion de la langue | **86 règles de traduction français→anglais** + recherche bilingue (requêtes en FR et EN, fusion des meilleurs résultats) | Aucune — requête française brute envoyée dans un modèle optimisé anglais |
| Décomposition de requêtes | Détecte les requêtes multi-entités, les décompose en sous-requêtes, 1 résultat par entité | Aucune — requête unique, top-3 par similarité globale |
| API externe | Aucune — entièrement autonome | API Groq + Llama 3.3 70B pour la génération de réponses |

Le modèle \`all-MiniLM-L6-v2\` est optimisé pour l'anglais. Les requêtes françaises appliquées à des chunks en anglais produisent des scores de similarité nettement plus faibles (~0,40 vs ~0,70 pour la même requête en anglais). Ma solution compense cet écart par une traduction à la volée au moment de la requête. La solution gagnante envoie le français brut directement dans le modèle.

---

## 09 — Périmètre et approche

| Aspect | Ma solution | Solution gagnante |
|---|---|---|
| **Approche principale** | Ingénierie pure de la récupération — maximiser la qualité de ce que le modèle d'embedding peut trouver | Post-traitement LLM — utiliser l'API Groq + Llama 3.3 70B pour générer des réponses en langage naturel à partir des chunks récupérés |
| **Où réside l'intelligence** | Dans la stratégie de chunking, les règles d'enrichissement, la traduction des requêtes et leur décomposition | Dans le modèle Llama 3.3 70B via un appel API externe |
| **Présentation des réponses** | Fragments bruts avec scores (tel que spécifié par le concours) | Réponse générée par le LLM à partir des fragments récupérés |

**La couche LLM ne compense pas une récupération de faible précision.** Un LLM ne peut synthétiser une réponse qu'à partir des fragments qu'il reçoit. Lorsque la récupération de la solution gagnante retourne une enzyme non correspondante (ex. : chunks d'acide ascorbique pour une requête sur la lipase) ou un mauvais produit (ex. : A FRESH 202 pour une requête sur l'AF110), le LLM génère une réponse à partir de cette entrée incorrecte.

Le LLM n'a accès ni aux PDF originaux ni à aucune source de connaissance externe — il ne voit que les 3 chunks récupérés. Les erreurs de récupération documentées à la section 6 se propagent directement dans la réponse finale. Lorsque la récupération retourne un contenu incorrect, la réponse générée par le LLM hérite de ces erreurs, quelle que soit la fluidité apparente de la sortie.

---

## 10 — Scalabilité — Comment chaque système gère les nouveaux produits

La scalabilité n'était pas une exigence explicite du concours. Mais un système RAG qui ne fonctionne que sur les données pour lesquelles il a été conçu n'est pas un système RAG — c'est une table de correspondance. Tout l'intérêt de la génération augmentée par récupération est que de nouveaux documents peuvent être ajoutés et interrogés sans modifier le pipeline. Cette section teste la **généralisation de la récupération** : l'approche architecturale de chaque système est-elle véritablement robuste ou simplement ajustée aux 35 PDF d'origine ?

J'ai ajouté 6 nouveaux PDF de produits absents du jeu de données initial : GEbake Amyl, Domax SF Bingo Plus, Tigris Gold, O-TENTIC DURUM, une fiche technique d'acide ascorbique et un document d'autorisation d'additifs. 10 requêtes ont été exécutées sur ces nouveaux produits, évaluées selon l'utilité de la réponse : R1 provient-il du bon PDF produit et le fragment retourné contient-il réellement la réponse ? Les valeurs ont été contre-vérifiées dans les PDF sources avec pdfplumber.

| Requête | Réponse attendue | Ma solution | Solution gagnante |
|---|---|---|---|
| Dosage GEbake Amyl | 20–100 ppm | Partiel — bon produit | Partiel — bon produit, pas de dosage dans le chunk |
| pH GEbake Amyl | pH 5,5–6,5 | **Hit complet** | Partiel — pas de pH dans le chunk |
| Durée de conservation GEbake Amyl | 12 mois | Partiel — tronqué | Partiel — durée de conservation absente du chunk |
| Enzymes Domax SF Bingo Plus | Xylanase, Amylase Maltogénique | Partiel | Partiel — R1 mauvais produit, réponse en R3 |
| Dosage Domax SF Bingo Plus | 50–150 g/100kg | **Hit complet** | **Hit complet** |
| Dosage Tigris Gold | 0,5% sur la farine | Partiel | **✗** Absent — R1 est acide ascorbique |
| Acide ascorbique Tigris Gold | Dans la liste d'ingrédients | Partiel — tronqué | **✗** Absent — données sur les graisses nutritionnelles |
| Utilisation O-TENTIC DURUM | Levain, méditerranéen | **Hit complet** | Partiel — en-tête TDS, aucune description produit |
| Dosage O-TENTIC DURUM | 4% sur la farine | **Hit complet** | **✗** Absent — R1–R2 sont acide ascorbique |
| Dose acide ascorbique (FR) | 20–60 ppm | **Hit complet** | Partiel — résumé général, pas de valeur de dose |

:::stats
5 / 10|Mes hits complets
1 / 10|Hits complets du gagnant
0|Mes absences
:::

La stratégie de chunking centré sur l'entité préfixe chaque fragment avec le nom du produit, ce qui permet au modèle d'embedding de distinguer les produits par leur identité, même à mesure que le corpus grandit. Sans cet ancrage, les chunks à en-têtes génériques de la solution gagnante entrent en concurrence entre les PDF — retournant des fragments d'acide ascorbique pour les requêtes sur Tigris Gold et O-TENTIC DURUM.

---

## 11 — Stockage vs précision — Le compromis espace-calcul

Ma solution stocke 9,3 fois plus d'embeddings que la solution gagnante (1 635 vs 176). La question naturelle est : quel en est le coût, et qu'apporte-t-il ?

| | Ma solution | Solution gagnante |
|---|---|---|
| **Embeddings** | 1 635 | 176 |
| **Stockage vectoriel** | 1 635 × 384 × 4 octets = **2,51 Mo** | 176 × 384 × 4 octets = **0,27 Mo** |
| **Complexité de recherche** | O(1 635) produits scalaires par requête | O(176) produits scalaires par requête |
| **Latence de recherche** | < 5 ms (brute-force) | < 1 ms (brute-force) |
| **Coût API externe par requête** | **✓** Aucun | **✗** 1 appel API Groq (Llama 3.3 70B) |

L'intégralité de l'index vectoriel représente **2,51 Mo** — moins qu'une seule photo produit. Les 2,24 Mo supplémentaires par rapport à l'index de la solution gagnante constituent le coût total du chunking centré sur l'entité avec des embeddings doubles.

Le concours impose un modèle de 22 millions de paramètres avec 384 dimensions — délibérément petit et économique. Avec un modèle fixe, le seul levier d'optimisation est la façon dont on prépare les données pour ce modèle. Le chunking centré sur l'entité produit davantage de vecteurs, mais chacun est concentré sémantiquement : un sujet, un produit, une question à laquelle on peut répondre. Cela donne au petit modèle une probabilité bien plus élevée de produire une forte correspondance cosinus, car les 384 dimensions encodent un concept unique plutôt qu'un mélange de champs sans rapport.

La solution gagnante emprunte le chemin inverse : moins de chunks, plus larges, qui mélangent descriptions de produits, tableaux de dosage, propriétés physiques et coordonnées dans des fenêtres de 500 caractères. Cela économise un stockage négligeable mais force le modèle d'embedding à compresser plusieurs concepts sans rapport dans un seul vecteur de 384 dimensions — exactement le scénario où un petit modèle perd son pouvoir discriminant entre sujets.

En théorie de la recherche d'information, c'est le **compromis précision-rappel** : des chunks plus nombreux et plus petits augmentent le rappel (plus de correspondances potentielles) au prix d'un surcoût de stockage. Pour un corpus de 35 PDF, ce surcoût est de 2,24 Mo. L'appel à l'API LLM externe de la solution gagnante, par requête, introduit davantage de latence et de coût opérationnel que la totalité du stockage supplémentaire.

Le compromis est clair : dépenser 2,24 Mo d'espace disque et quelques millisecondes supplémentaires par requête, ou accepter une précision de récupération inférieure de 40,4 %. Les deux sont des choix architecturaux valides — mais dans un challenge conçu pour tester la qualité de la récupération dans des contraintes serrées, l'un est mieux aligné avec le problème.

### Comment le stockage évolue avec l'ajout de nouveaux produits

| Taille du corpus | Mes embeddings | Mon stockage | Embeddings du gagnant | Stockage du gagnant |
|---|---|---|---|---|
| **35 PDF** (actuel) | 1 635 | **2,51 Mo** | 176 | 0,27 Mo |
| **100 PDF** | ~4 670 | **~7,2 Mo** | ~500 | ~0,77 Mo |
| **1 000 PDF** | ~46 700 | **~71,7 Mo** | ~5 000 | ~7,7 Mo |
| **10 000 PDF** | ~467 000 | **~717 Mo** | ~50 000 | ~77 Mo |

À 10 000 PDF — bien au-delà du catalogue d'enzymes d'une entreprise — l'intégralité de l'index vectoriel tiendrait en moins d'1 Go. Un ordinateur portable grand public dispose de 16 Go de RAM ; une instance cloud de base offre des centaines de gigaoctets de disque. Le stockage n'est pas la contrainte à aucune échelle réaliste.

La latence de recherche révèle quelque chose de plus intéressant. Ma solution utilise PostgreSQL avec pgvector, qui prend en charge les **index HNSW et IVFFlat pour la recherche approximative des plus proches voisins**. Ces index réduisent la recherche de O(n) brute-force à O(log n) au moment de la requête, maintenant la latence sous les 10 ms même avec des centaines de milliers de vecteurs. La solution gagnante utilise le brute-force NumPy sans structure d'index — à 50 000 vecteurs cela reste rapide (~5 ms), mais l'architecture n'offre aucun chemin vers une scalabilité sous-linéaire sans une réécriture complète.

La vraie asymétrie de coût se situe ailleurs : l'appel API Groq de la solution gagnante par requête a une latence variable (dépendante du réseau), un coût monétaire par token, et une dépendance forte à la disponibilité d'un service externe. Le stockage supplémentaire de ma solution ne coûte rien à opérer une fois écrit sur disque.

---

## 12 — La réponse organisationnelle

Le 18 mars 2026, j'ai envoyé un e-mail formel à ARSII accompagné du rapport de comparaison technique complet, demandant une explication des critères d'évaluation utilisés.

La réponse d'ARSII a pris la forme d'un e-mail collectif adressé à tous les participants — et non d'une réponse directe :

:::bq
"We would like to clarify that ARSII does not interfere in the evaluation process of the challenges, except for those proposed by ARSII itself. Each challenge is assessed independently by the respective partner organization responsible for it."
FR: « Nous tenons à préciser que l’ARSII n’interfère pas dans le processus d’évaluation des challenges, à l’exception de ceux proposés par l’ARSII elle-même. Chaque challenge est évalué de manière indépendante par l’organisation partenaire responsable. »
:::

:::bq
"In case of any objections or concerns, you are absolutely welcome to submit a reclamation. We will ensure that you are put in direct contact with the responsible party of the challenge."
FR: « En cas d’objections ou de préoccupations, vous êtes tout à fait libre de soumettre une réclamation. Nous veillerons à vous mettre en contact direct avec le responsable du challenge. »
:::

Selon cette réponse, ARSII délègue l'évaluation du challenge à l'organisation partenaire concernée. Le recours proposé est un contact direct avec Rose Blanche Group.

Au 26 mars 2026, aucune réponse directe n'a été reçue et aucune reconnaissance de la divergence de contraintes documentée n'a été émise.

---

## 13 — Ce que cet article établit

Cet article est un enregistrement public de constats, non une demande. Les preuves présentées ici sont indépendamment vérifiables par quiconque ayant accès aux deux dépôts GitHub et au PDF du concours. Spécifiquement :

1. **La solution gagnante n'utilise pas PostgreSQL** — observable dans le code source (section 2).
2. **La qualité de récupération est mesurée comme inférieure** sur chaque métrique testée — similarité cosinus, utilité des réponses et précision sur les produits.
3. **Le processus d'évaluation n'a pas été expliqué.** Quels critères ont été utilisés ? Si l'exigence PostgreSQL a été levée, quand et comment les participants en ont-ils été informés ?

Ce sont des observations documentées. Le lecteur peut en tirer ses propres conclusions.

---

## 14 — Toutes les preuves — Vérifiez par vous-même

Tout ce qui est mentionné dans cet article est vérifiable publiquement :

| Ressource | Lien |
|---|---|
| Ma solution (Noobmaster) | github.com/mohamedyaakoubi/RBG-ARSII-RAG |
| Solution gagnante | github.com/AyaZantour/RagProject |
| Outils de benchmarking et de reporting | github.com/mohamedyaakoubi/noobmaster-vs-double_a--winner-- |
| PDF du concours | Inclus dans le dépôt de la solution gagnante |
| Rapport de comparaison technique complet | Inclus dans le dépôt de benchmarking |

Le dépôt de benchmarking contient tous les scripts, résultats et rapports utilisés dans cette analyse. Les dépôts des solutions originales restent intacts — aucun code de benchmark n'y a été ajouté.

Les données présentées dans cet article sont entièrement reproductibles. Quiconque peut cloner les deux dépôts, exécuter les mêmes requêtes et vérifier indépendamment chaque métrique reportée ici.

---

## Conclusion

Ma solution respecte toutes les contraintes du concours, atteint une précision de récupération supérieure de 40,4 %, retourne un contenu correct et exploitable pour 14 requêtes sur 16 (avec 0 absence), et ce entièrement hors ligne, sans dépendance à une API externe.

La récupération de la solution gagnante — tâche centrale du challenge — enregistre des scores inférieurs sur chaque métrique testée. Avec 176 chunks produits par une fenêtre glissante à taille fixe, aucune gestion du français, aucune décomposition de requêtes, aucun PostgreSQL (une exigence déclarée), seulement 4 requêtes sur 16 retournant une donnée exploitable et 5 absences complètes sur le benchmark de base, les sorties observées ne sont pas alignées avec les spécifications du concours.

À titre de contexte complémentaire (non noté — la scalabilité n'était pas une exigence déclarée) : noobmaster s'étend aux produits non vus sans retourner de mauvais produits (5/10 hits complets, 5/10 partiels, 0 absence), tandis que le gagnant récupère le mauvais produit pour 3 requêtes sur 10 sur les nouveaux produits, avec seulement 1 hit complet.

*Benchmark exécuté du 17 au 26 mars 2026. Les deux solutions testées avec les mêmes 16 requêtes + 10 requêtes de scalabilité, même modèle d'embedding (all-MiniLM-L6-v2), même K=3, sur la même machine. Les scores de récupération sont des valeurs de similarité cosinus reproductibles. L'utilité des réponses a été évaluée par une revue manuelle de chaque fragment R1 par rapport au contenu du PDF source — aucune correspondance automatique par mots-clés. L'utilité des réponses pour la scalabilité a été contre-vérifiée par rapport aux PDF sources avec pdfplumber.*

*Cet article ne contient que des informations publiquement disponibles et des faits techniques vérifiables. Toutes les affirmations peuvent être vérifiées indépendamment en clonant les dépôts référencés et en exécutant les benchmarks documentés.*`,
};
