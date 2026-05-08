// Engine Precision Analysis — i18n for EN / FR / AR

type EnginePrecisionI18n = {
  meta: { title: string; description: string }
  breadcrumb: { apiDocs: string; current: string }
  nav: {
    backToApiDocs: string
    onThisPage: string
    sectionsBtn: string
    sections: Array<{ id: string; title: string }>
    guidesLabel: string
    guides: Array<{ label: string; slug: string }>
  }
  hero: {
    title: string
    subtitle: string
    intro: string
    badge: string
  }
  approach: {
    title: string
    intro: string
    phases: Array<{ label: string; body: string }>
    params: string
    notNovel: string
  }
  scope: {
    title: string
    body: string
    headers: { dataset: string; orig: string; rewk: string; gtEvents: string; correct: string; accuracy: string }
    rows: Array<{ ds: string; orig: number; rewk: number; gt: number; correct: number; acc: string }>
    totalsLabel: string
    totals: { orig: number; rewk: number; gt: number; correct: number; acc: string }
  }
  classDist: {
    title: string
    body: string
    warning: string
    headers: { category: string; support: string; share: string }
    rows: Array<{ category: string; support: number; share: string }>
    imbalanceNote: string
  }
  perCategory: {
    title: string
    intro: string
    headers: { category: string; support: string; tp: string; fp: string; fn: string; precision: string; recall: string; f1: string }
    rows: Array<{ category: string; support: number; tp: number; fp: number; fn: number; precision: string; recall: string; f1: string }>
    microRow: { support: number; tp: number; fp: number; fn: number; precision: string; recall: string; f1: string }
    macroRow: { precision: string; recall: string; f1: string }
    microLabel: string
    macroLabel: string
    headline: string
  }
  confusionMatrix: {
    title: string
    intro: string
    unmatchedNote: string
  }
  rootCause: {
    title: string
    intro: string
    headers: { risk: string; freq: string; cause: string; tunable: string }
    rows: Array<{ risk: string; freq: string; cause: string; tunable: string }>
  }
  similarity: {
    title: string
    intro: string
    formula: string
    pairsTitle: string
    pairsHeaders: { metric: string; value: string }
    pairsRows: Array<{ metric: string; value: string }>
    confTitle: string
    confHeaders: { band: string; count: string; share: string }
    confRows: Array<{ band: string; count: number; share: string }>
    marginTitle: string
    marginHeaders: { metric: string; value: string }
    marginRows: Array<{ metric: string; value: string }>
  }
  limitations: {
    title: string
    items: string[]
  }
  footer: { info: string; privacy: string; terms: string; back: string }
}

// ─────────────────── ENGLISH ───────────────────
const en: EnginePrecisionI18n = {
  meta: {
    title: 'Engine Precision Analysis — SheetDiff Structural Diff',
    description:
      'Measured precision, recall, and F1 for the 8-pass structural diff engine across 14 datasets (185 GT events). Per-category metrics, confusion matrix, per-dataset accuracy, and similarity benchmarking.',
  },
  breadcrumb: { apiDocs: 'Structural Diff API', current: 'Engine Precision' },
  nav: {
    backToApiDocs: '← Structural Diff API',
    onThisPage: 'On this page',
    sectionsBtn: 'Sections',
    sections: [
      { id: 'approach',        title: 'GT derivation approach' },
      { id: 'scope',           title: 'Dataset scope' },
      { id: 'class-dist',      title: 'Class distribution' },
      { id: 'per-category',    title: 'Per-category metrics' },
      { id: 'confusion',       title: 'Confusion matrix' },
      { id: 'root-cause',      title: 'Root cause analysis' },
      { id: 'similarity',      title: 'Similarity benchmarking' },
      { id: 'limitations',     title: 'Limitations' },
    ],
    guidesLabel: 'Guides & Examples',
    guides: [
      { label: 'Config Parameters',  slug: 'parameters' },
      { label: 'Diff Statuses',      slug: 'diff-statuses' },
      { label: 'Demo Walkthrough',   slug: 'demo' },
      { label: 'Playground',         slug: 'playground' },
      { label: 'Engine Precision',   slug: 'engine-precision' },
    ],
  },
  hero: {
    title: 'Engine Precision Analysis',
    subtitle: 'Measured on 14 datasets · 185 GT events',
    intro:
      'This page documents the measured classification accuracy of the 8-pass structural diff engine. All numbers come from running the engine on transcript data and comparing its output against ground-truth labels derived from what human annotators actually did — not a synthetic benchmark.',
    badge: 'Micro-F1 · 76.1%',
  },
  approach: {
    title: 'How ground truth was derived',
    intro:
      'There is no pre-labeled test set for this task. Instead, ground truth is derived by structurally analyzing what the human annotator actually did when transforming original → reworked — a behavioral labeling approach. The idea of inferring labels from before/after pairs is related to weak supervision (programmatic labeling) in NLP literature; what is specific here is the ordered 4-phase reconstruction of split/merge/modify/add/delete events from timed transcript data.',
    phases: [
      {
        label: 'Phase 1 — MERGES first (N orig → 1 rewk)',
        body: 'For each reworked row, try combining a small window of contiguous original rows. If the combined text similarity exceeds the best single-row match by a required margin, the annotator merged those rows. MERGES are resolved first to avoid misclassifying merge sources as false DELETED.',
      },
      {
        label: 'Phase 2 — SPLITS (1 orig → N rewk)',
        body: 'Same logic in reverse: for each unused original row, try combining a small window of contiguous reworked rows. If the combined text similarity exceeds the best single match by a required margin, the annotator split that original row.',
      },
      {
        label: 'Phase 3 — 1:1 matching (greedy best-first by similarity)',
        body: 'Remaining rows are matched greedily by text similarity within a time window. UNCHANGED: transcript identical AND timestamps within tolerance AND same speaker. Otherwise: MODIFIED.',
      },
      {
        label: 'Phase 4 — Leftovers',
        body: 'Unmatched original rows → DELETED. Unmatched reworked rows → ADDED.',
      },
    ],
    params: '',
    notNovel: '',
  },
  scope: {
    title: 'Dataset scope',
    body: '14 datasets from transcription annotation jobs. All datasets include NSE (non-speech event) markers, overlap tags ([overlap]), timestamps, speaker labels, and metadata tags.',
    headers: { dataset: 'Dataset', orig: 'Orig', rewk: 'Rewk', gtEvents: 'GT events', correct: 'Correct', accuracy: 'Accuracy' },
    rows: [
      { ds: 'DS6',       orig: 14,  rewk: 19,  gt: 17,  correct: 16, acc: '94.1%'  },
      { ds: 'DS7',       orig: 22,  rewk: 13,  gt: 14,  correct: 14, acc: '100.0%' },
      { ds: 'DS8',       orig: 11,  rewk: 9,   gt: 9,   correct: 5,  acc: '55.6%'  },
      { ds: 'DS9',       orig: 11,  rewk: 9,   gt: 9,   correct: 9,  acc: '100.0%' },
      { ds: 'DS10',      orig: 24,  rewk: 22,  gt: 23,  correct: 15, acc: '65.2%'  },
      { ds: 'DS11',      orig: 28,  rewk: 17,  gt: 21,  correct: 17, acc: '81.0%'  },
      { ds: 'DS12',      orig: 1,   rewk: 15,  gt: 15,  correct: 8,  acc: '53.3%'  },
      { ds: 'DS13',      orig: 9,   rewk: 14,  gt: 11,  correct: 8,  acc: '72.7%'  },
      { ds: 'DS14',      orig: 10,  rewk: 10,  gt: 10,  correct: 9,  acc: '90.0%'  },
      { ds: 'DS15',      orig: 6,   rewk: 8,   gt: 8,   correct: 5,  acc: '62.5%'  },
      { ds: 'DS16',      orig: 3,   rewk: 5,   gt: 3,   correct: 2,  acc: '66.7%'  },
      { ds: 'DS17',      orig: 12,  rewk: 13,  gt: 14,  correct: 9,  acc: '64.3%'  },
      { ds: 'DS18',      orig: 21,  rewk: 17,  gt: 18,  correct: 12, acc: '66.7%'  },
      { ds: 'DS19',      orig: 9,   rewk: 11,  gt: 13,  correct: 5,  acc: '38.5%'  },
    ],
    totalsLabel: 'Total',
    totals: { orig: 181, rewk: 182, gt: 185, correct: 134, acc: '72.4% (recall)' },
  },
  classDist: {
    title: 'Class distribution',
    body: 'The dataset is heavily skewed toward MODIFIED, which makes up over half of all GT events. This is a natural property of transcript reworking — annotators correct rather than restructure the majority of segments.',
    warning: 'The micro-F1 of 76.1% is influenced by this skew: MODIFIED (the dominant class, F1=82.7%) contributes disproportionately to the micro-average. The macro-F1 (70.4%) treats all 6 categories equally and gives a more balanced view of overall performance. UNCHANGED and SPLIT each have only 6 GT events — their per-category P/R/F1 numbers carry wide uncertainty.',
    headers: { category: 'Category', support: 'GT events', share: 'Share of total' },
    rows: [
      { category: 'MODIFIED',  support: 94, share: '50.8%' },
      { category: 'ADDED',     support: 46, share: '24.9%' },
      { category: 'MERGED',    support: 22, share: '11.9%' },
      { category: 'DELETED',   support: 11, share:  '5.9%' },
      { category: 'UNCHANGED', support:  6, share:  '3.2%' },
      { category: 'SPLIT',     support:  6, share:  '3.2%' },
    ],
    imbalanceNote: 'The engine also shows a mild bias toward predicting MODIFIED: 3 GT-UNCHANGED rows are classified as MODIFIED (over-detecting changes), and several GT-ADDED rows are pulled into MODIFIED or SPLIT. This is partly by design — MODIFIED is the safest fallback when similarity is moderate — but it reduces recall for UNCHANGED and ADDED.',
  },
  perCategory: {
    title: 'Per-category precision / recall / F1',
    intro: 'Computed across 185 GT events from 14 datasets. TP = engine and GT agree. FP = engine predicted this category but GT says otherwise. FN = GT says this category but engine predicted something else.',
    headers: { category: 'Category', support: 'Support', tp: 'TP', fp: 'FP', fn: 'FN', precision: 'Precision', recall: 'Recall', f1: 'F1' },
    rows: [
      { category: 'MODIFIED',  support: 94, tp: 74, fp: 11, fn: 20, precision: '87.1%', recall: '78.7%', f1: '82.7%' },
      { category: 'ADDED',     support: 46, tp: 28, fp:  8, fn: 18, precision: '77.8%', recall: '60.9%', f1: '68.3%' },
      { category: 'MERGED',    support: 22, tp: 18, fp:  8, fn:  4, precision: '69.2%', recall: '81.8%', f1: '75.0%' },
      { category: 'DELETED',   support: 11, tp:  6, fp:  2, fn:  5, precision: '75.0%', recall: '54.5%', f1: '63.2%' },
      { category: 'UNCHANGED', support:  6, tp:  3, fp:  0, fn:  3, precision: '100.0%', recall: '50.0%', f1: '66.7%' },
      { category: 'SPLIT',     support:  6, tp:  5, fp:  4, fn:  1, precision: '55.6%', recall: '83.3%', f1: '66.7%' },
    ],
    microRow: { support: 185, tp: 134, fp: 33, fn: 51, precision: '80.2%', recall: '72.4%', f1: '76.1%' },
    macroRow: { precision: '77.4%', recall: '68.2%', f1: '70.4%' },
    microLabel: 'Micro avg',
    macroLabel: 'Macro avg',
    headline: 'Global engine micro-F1: 76.1% — 134 of 185 GT events correctly classified across 14 datasets.',
  },
  confusionMatrix: {
    title: 'Confusion matrix',
    intro: 'Rows = GT labels. Columns = engine predictions. · denotes zero. UNMATCHED = GT row had no engine output at that anchor (absorbed as merge source / split child, or fell below all similarity gates).',
    unmatchedNote: 'The UNMATCHED column accounts for 18 events (9.7%): 8 GT-MODIFIED, 10 GT-ADDED. These are cases where the engine produces fewer output rows than GT expects — the most common cause is DS12, which has 1 original row expanding to 15 reworked rows, and the engine simply cannot produce enough events.',
  },
  rootCause: {
    title: 'Root cause analysis',
    intro: 'Breakdown of the 51 misclassifications by failure pattern and the engine parameter that controls each risk.',
    headers: { risk: 'Risk', freq: 'Frequency', cause: 'Root cause', tunable: 'Tunable via' },
    rows: [
      { risk: 'MODIFIED → UNMATCHED',  freq: '8/94 = 9%',  cause: 'No engine match found at all',              tunable: '↑ residual match window' },
      { risk: 'MODIFIED → MERGED (over-merging)', freq: '6/94 = 6%', cause: 'Merge pass absorbs 1:1 matches',  tunable: '↑ merge similarity threshold' },
      { risk: 'ADDED → UNMATCHED',     freq: '10/46 = 22%', cause: 'Engine produces fewer rows than GT (DS12)', tunable: 'Event count mismatch' },
      { risk: 'ADDED → SPLIT',         freq: '3/46 = 7%',  cause: 'New rows misclassified as splits',          tunable: '↑ split similarity threshold' },
      { risk: 'UNCHANGED → MODIFIED',  freq: '3/6 = 50%',  cause: 'Minor timestamp / whitespace drift',        tunable: '↑ unchanged time tolerance' },
      { risk: 'DELETED → MODIFIED',    freq: '3/11 = 27%', cause: 'Engine finds weak match for deleted row',   tunable: '↑ text similarity floor' },
    ],
  },
  similarity: {
    title: 'Similarity metric benchmarking',
    intro: 'Computed against 6 datasets (DS6–DS11), 116 original rows, 1,754 total (original, reworked) pairs.',
    formula: 'matchScore = w_time × timeSim + w_text × txtSim\ntimeSim  = time-proximity score (saturates beyond a max time delta)\ntxtSim   = Jaccard bigram similarity after NFKC + diacritics normalization\n[blocked] if txtSim falls below a minimum text-floor threshold',
    pairsTitle: 'Pairwise score coverage',
    pairsHeaders: { metric: 'Metric', value: 'Value' },
    pairsRows: [
      { metric: 'Total (orig, reworked) pairs evaluated',         value: '1,754' },
      { metric: 'Pairs blocked by TEXT_SIM_FLOOR (txtSim < 0.10)', value: '1,459 (83.2%)' },
      { metric: 'Pairs with non-zero scores',                     value: '295 (16.8%)' },
      { metric: 'Mean score — all pairs',                         value: '0.065' },
      { metric: 'Mean score — non-zero pairs only',               value: '0.385' },
    ],
    confTitle: 'Accepted match confidence distribution (64 matches)',
    confHeaders: { band: 'Confidence band', count: 'Count', share: 'Share' },
    confRows: [
      { band: 'HIGH (score ≥ 0.70)', count: 38, share: '59.4%' },
      { band: 'MED  (0.40 – 0.70)',  count: 22, share: '34.4%' },
      { band: 'LOW  (0.20 – 0.40)',  count:  4, share:  '6.3%' },
    ],
    marginTitle: 'Decision margin above acceptance threshold',
    marginHeaders: { metric: 'Metric', value: 'Value' },
    marginRows: [
      { metric: 'Mean margin above acceptance threshold',          value: '0.522' },
      { metric: 'Borderline matches (margin < 0.05)',              value: '1 (1.6%)' },
      { metric: 'Flip risk: small score perturbation would reject', value: '1 (1.6%)' },
    ],
  },
  limitations: {
    title: 'Limitations',
    items: [
      '185 GT events is a small sample. Per-category numbers for UNCHANGED (6 events) and SPLIT (6 events) carry very wide confidence intervals — a single additional dataset could shift their F1 by 10+ points.',
      'Ground truth is derived, not hand-labeled. The derivation algorithm itself has tunable parameters that influence which events appear in GT. Different parameter choices would produce different GT labels and different precision numbers.',
    ],
  },
  footer: {
    info: 'Engine Precision · Structural Diff API · Built by',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    back: '← Back to Structural Diff API',
  },
}

// ─────────────────── FRENCH ───────────────────
const fr: EnginePrecisionI18n = {
  meta: {
    title: 'Analyse de précision du moteur — SheetDiff Structural Diff',
    description:
      'Précision, rappel et F1 mesurés pour le moteur de diff structurel à 8 passes sur 14 jeux de données (185 événements GT). Métriques par catégorie, matrice de confusion, précision par jeu de données et analyse de similarité.',
  },
  breadcrumb: { apiDocs: 'Structural Diff API', current: 'Précision du moteur' },
  nav: {
    backToApiDocs: '← Structural Diff API',
    onThisPage: 'Sur cette page',
    sectionsBtn: 'Sections',
    sections: [
      { id: 'approach',     title: 'Dérivation du GT' },
      { id: 'scope',        title: 'Jeux de données' },
      { id: 'class-dist',   title: 'Distribution des classes' },
      { id: 'per-category', title: 'Métriques par catégorie' },
      { id: 'confusion',    title: 'Matrice de confusion' },
      { id: 'root-cause',   title: 'Analyse des causes' },
      { id: 'similarity',   title: 'Similarité' },
      { id: 'limitations',  title: 'Limitations' },
    ],
    guidesLabel: 'Guides & Exemples',
    guides: [
      { label: 'Paramètres de configuration', slug: 'parameters' },
      { label: 'Statuts de diff',             slug: 'diff-statuses' },
      { label: 'Démonstration complète',       slug: 'demo' },
      { label: 'Playground',                  slug: 'playground' },
      { label: 'Précision du moteur',         slug: 'engine-precision' },
    ],
  },
  hero: {
    title: 'Analyse de précision du moteur',
    subtitle: 'Mesurée sur 14 jeux de données · 185 événements GT',
    intro:
      'Cette page documente la précision de classification mesurée du moteur de diff structurel à 8 passes. Tous les chiffres proviennent de l\'exécution du moteur sur des données de transcription, comparées à des étiquettes de vérité terrain dérivées de ce que les annotateurs humains ont réellement fait.',
    badge: 'Micro-F1 · 76,1 %',
  },
  approach: {
    title: 'Comment la vérité terrain a été dérivée',
    intro:
      'Il n\'existe pas d\'ensemble de test pré-étiqueté pour cette tâche. La vérité terrain est dérivée en analysant structurellement ce que l\'annotateur humain a réellement fait lors de la transformation original → reworked — une approche d\'étiquetage comportemental. L\'idée d\'inférer des étiquettes à partir de paires avant/après est liée à la supervision faible (étiquetage programmatique) dans la littérature NLP.',
    phases: [
      {
        label: 'Phase 1 — MERGES en premier (N orig → 1 rewk)',
        body: 'Pour chaque ligne retravillée, essayer de combiner une petite fenêtre de lignes originales contiguës. Si la similarité textuelle combinée dépasse la meilleure correspondance individuelle par une marge requise, l\'annotateur a fusionné ces lignes.',
      },
      {
        label: 'Phase 2 — SPLITS (1 orig → N rewk)',
        body: 'Même logique en sens inverse : pour chaque ligne originale non utilisée, essayer de combiner une petite fenêtre de lignes retravillées contiguës.',
      },
      {
        label: 'Phase 3 — Correspondance 1:1 (greedy par similarité)',
        body: 'Les lignes restantes sont appariées de manière greedy par similarité textuelle dans une fenêtre de temps. UNCHANGED : transcript identique ET timestamps dans la tolérance ET même locuteur. Sinon : MODIFIED.',
      },
      {
        label: 'Phase 4 — Restants',
        body: 'Lignes originales non appariées → DELETED. Lignes retravaillées non appariées → ADDED.',
      },
    ],
    params: '',
    notNovel: '',
  },
  scope: {
    title: 'Périmètre des jeux de données',
    body: '14 jeux de données issus de missions d\'annotation de transcription. Tous les jeux incluent des marqueurs NSE (événements non verbaux), des balises de chevauchement ([overlap]), des horodatages, des étiquettes de locuteur et de métadonnées.',
    headers: { dataset: 'Jeu de données', orig: 'Orig', rewk: 'Rewk', gtEvents: 'Événements GT', correct: 'Corrects', accuracy: 'Précision' },
    rows: [
      { ds: 'DS6',       orig: 14,  rewk: 19,  gt: 17,  correct: 16, acc: '94,1 %'  },
      { ds: 'DS7',       orig: 22,  rewk: 13,  gt: 14,  correct: 14, acc: '100,0 %' },
      { ds: 'DS8',       orig: 11,  rewk: 9,   gt: 9,   correct: 5,  acc: '55,6 %'  },
      { ds: 'DS9',       orig: 11,  rewk: 9,   gt: 9,   correct: 9,  acc: '100,0 %' },
      { ds: 'DS10',      orig: 24,  rewk: 22,  gt: 23,  correct: 15, acc: '65,2 %'  },
      { ds: 'DS11',      orig: 28,  rewk: 17,  gt: 21,  correct: 17, acc: '81,0 %'  },
      { ds: 'DS12',      orig: 1,   rewk: 15,  gt: 15,  correct: 8,  acc: '53,3 %'  },
      { ds: 'DS13',      orig: 9,   rewk: 14,  gt: 11,  correct: 8,  acc: '72,7 %'  },
      { ds: 'DS14',      orig: 10,  rewk: 10,  gt: 10,  correct: 9,  acc: '90,0 %'  },
      { ds: 'DS15',      orig: 6,   rewk: 8,   gt: 8,   correct: 5,  acc: '62,5 %'  },
      { ds: 'DS16',      orig: 3,   rewk: 5,   gt: 3,   correct: 2,  acc: '66,7 %'  },
      { ds: 'DS17',      orig: 12,  rewk: 13,  gt: 14,  correct: 9,  acc: '64,3 %'  },
      { ds: 'DS18',      orig: 21,  rewk: 17,  gt: 18,  correct: 12, acc: '66,7 %'  },
      { ds: 'DS19',      orig: 9,   rewk: 11,  gt: 13,  correct: 5,  acc: '38,5 %'  },
    ],
    totalsLabel: 'Total',
    totals: { orig: 181, rewk: 182, gt: 185, correct: 134, acc: '72,4 % (rappel)' },
  },
  classDist: {
    title: 'Distribution des classes',
    body: 'Le jeu de données est fortement biaisé vers MODIFIED, qui représente plus de la moitié de tous les événements GT. C\'est une propriété naturelle du reworking de transcription.',
    warning: 'Le micro-F1 de 76,1 % est influencé par ce déséquilibre : MODIFIED (classe dominante, F1=82,7 %) contribue de manière disproportionnée à la moyenne micro. Le macro-F1 (70,4 %) traite les 6 catégories de manière égale et donne une vue plus équilibrée. UNCHANGED et SPLIT n\'ont que 6 événements GT chacun — leurs métriques P/R/F1 portent une incertitude élevée.',
    headers: { category: 'Catégorie', support: 'Événements GT', share: 'Part du total' },
    rows: [
      { category: 'MODIFIED',  support: 94, share: '50,8 %' },
      { category: 'ADDED',     support: 46, share: '24,9 %' },
      { category: 'MERGED',    support: 22, share: '11,9 %' },
      { category: 'DELETED',   support: 11, share:  '5,9 %' },
      { category: 'UNCHANGED', support:  6, share:  '3,2 %' },
      { category: 'SPLIT',     support:  6, share:  '3,2 %' },
    ],
    imbalanceNote: 'Le moteur montre également un léger biais vers la prédiction MODIFIED : 3 lignes GT-UNCHANGED sont classées MODIFIED (sur-détection des changements), et plusieurs lignes GT-ADDED sont absorbées dans MODIFIED ou SPLIT.',
  },
  perCategory: {
    title: 'Précision / rappel / F1 par catégorie',
    intro: 'Calculé sur 185 événements GT issus de 14 jeux de données.',
    headers: { category: 'Catégorie', support: 'Support', tp: 'TP', fp: 'FP', fn: 'FN', precision: 'Précision', recall: 'Rappel', f1: 'F1' },
    rows: [
      { category: 'MODIFIED',  support: 94, tp: 74, fp: 11, fn: 20, precision: '87,1 %', recall: '78,7 %', f1: '82,7 %' },
      { category: 'ADDED',     support: 46, tp: 28, fp:  8, fn: 18, precision: '77,8 %', recall: '60,9 %', f1: '68,3 %' },
      { category: 'MERGED',    support: 22, tp: 18, fp:  8, fn:  4, precision: '69,2 %', recall: '81,8 %', f1: '75,0 %' },
      { category: 'DELETED',   support: 11, tp:  6, fp:  2, fn:  5, precision: '75,0 %', recall: '54,5 %', f1: '63,2 %' },
      { category: 'UNCHANGED', support:  6, tp:  3, fp:  0, fn:  3, precision: '100,0 %', recall: '50,0 %', f1: '66,7 %' },
      { category: 'SPLIT',     support:  6, tp:  5, fp:  4, fn:  1, precision: '55,6 %', recall: '83,3 %', f1: '66,7 %' },
    ],
    microRow: { support: 185, tp: 134, fp: 33, fn: 51, precision: '80,2 %', recall: '72,4 %', f1: '76,1 %' },
    macroRow: { precision: '77,4 %', recall: '68,2 %', f1: '70,4 %' },
    microLabel: 'Moy. micro',
    macroLabel: 'Moy. macro',
    headline: 'Micro-F1 global : 76,1 % — 134 sur 185 événements GT correctement classifiés.',
  },
  confusionMatrix: {
    title: 'Matrice de confusion',
    intro: 'Lignes = étiquettes GT. Colonnes = prédictions du moteur. · = zéro. UNMATCHED = aucune sortie moteur à cette ancre.',
    unmatchedNote: 'La colonne UNMATCHED représente 18 événements (9,7 %) : 8 GT-MODIFIED, 10 GT-ADDED. La cause principale est DS12 (1 ligne originale → 15 lignes retravaillées) où le moteur ne peut pas produire suffisamment d\'événements.',
  },
  rootCause: {
    title: 'Analyse des causes',
    intro: 'Décomposition des 51 erreurs de classification par type de défaut.',
    headers: { risk: 'Risque', freq: 'Fréquence', cause: 'Cause', tunable: 'Ajustable via' },
    rows: [
      { risk: 'MODIFIED → UNMATCHED',  freq: '8/94 = 9 %',  cause: 'Aucune correspondance trouvée',            tunable: '↑ fenêtre de correspondance résiduelle' },
      { risk: 'MODIFIED → MERGED (sur-fusion)', freq: '6/94 = 6 %', cause: 'La passe MERGE absorbe des correspondances 1:1', tunable: '↑ seuil similarité fusion' },
      { risk: 'ADDED → UNMATCHED',     freq: '10/46 = 22 %', cause: 'Moteur produit moins de lignes que GT',    tunable: 'Décalage de compte' },
      { risk: 'ADDED → SPLIT',         freq: '3/46 = 7 %',  cause: 'Nouvelles lignes classées SPLIT',           tunable: '↑ seuil similarité division' },
      { risk: 'UNCHANGED → MODIFIED',  freq: '3/6 = 50 %',  cause: 'Dérive timestamp / espaces mineurs',        tunable: '↑ tolérance temps inchangé' },
      { risk: 'DELETED → MODIFIED',    freq: '3/11 = 27 %', cause: 'Correspondance faible trouvée pour une ligne supprimée', tunable: '↑ seuil similarité textuelle' },
    ],
  },
  similarity: {
    title: 'Analyse de la métrique de similarité',
    intro: 'Calculée sur 6 jeux de données (DS6–DS11), 116 lignes originales, 1 754 paires total.',
    formula: 'matchScore = w_temps × timeSim + w_texte × txtSim\ntimeSim  = score de proximité temporelle (sature au-delà d\'un delta max)\ntxtSim   = similarité bigramme Jaccard après normalisation NFKC + diacritiques\n[bloqué] si txtSim est inférieur au seuil minimal de similarité textuelle',
    pairsTitle: 'Couverture des scores par paires',
    pairsHeaders: { metric: 'Métrique', value: 'Valeur' },
    pairsRows: [
      { metric: 'Total paires évaluées',                value: '1 754' },
      { metric: 'Paires bloquées (txtSim < 0,10)',      value: '1 459 (83,2 %)' },
      { metric: 'Paires avec score non nul',            value: '295 (16,8 %)' },
      { metric: 'Score moyen — toutes paires',          value: '0,065' },
      { metric: 'Score moyen — paires non nulles',      value: '0,385' },
    ],
    confTitle: 'Distribution de confiance des correspondances acceptées (64)',
    confHeaders: { band: 'Bande de confiance', count: 'Nb', share: 'Part' },
    confRows: [
      { band: 'HIGH (score ≥ 0,70)', count: 38, share: '59,4 %' },
      { band: 'MED  (0,40 – 0,70)',  count: 22, share: '34,4 %' },
      { band: 'LOW  (0,20 – 0,40)',  count:  4, share:  '6,3 %' },
    ],
    marginTitle: 'Marge de décision au-dessus du seuil d\'acceptation',
    marginHeaders: { metric: 'Métrique', value: 'Valeur' },
    marginRows: [
      { metric: 'Marge moyenne au-dessus du seuil d\'acceptation',  value: '0,522' },
      { metric: 'Correspondances limites (marge < 0,05)',           value: '1 (1,6 %)' },
      { metric: 'Risque d\'inversion : perturbation minimale rejetterait', value: '1 (1,6 %)' },
    ],
  },
  limitations: {
    title: 'Limitations',
    items: [
      '185 événements GT est un petit échantillon. Les chiffres par catégorie pour UNCHANGED (6 événements) et SPLIT (6 événements) portent une incertitude élevée.',
      'La vérité terrain est dérivée, non étiquetée manuellement. Les paramètres ajustables de l\'algorithme de dérivation influencent quels événements apparaissent dans GT.',
    ],
  },
  footer: {
    info: 'Précision du moteur · API Structural Diff · Développé par',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions d\'utilisation',
    back: '← Retour à l\'API Structural Diff',
  },
}

// ─────────────────── ARABIC ───────────────────
const ar: EnginePrecisionI18n = {
  meta: {
    title: 'تحليل دقة المحرك — SheetDiff Structural Diff',
    description:
      'الدقة والاسترجاع وF1 المقاسة لمحرك الـ diff الهيكلي ذي الـ 8 مراحل على 14 مجموعة بيانات (185 حدثاً GT). مقاييس لكل فئة، مصفوفة ارتباك، دقة لكل مجموعة بيانات، وتحليل التشابه.',
  },
  breadcrumb: { apiDocs: 'Structural Diff API', current: 'دقة المحرك' },
  nav: {
    backToApiDocs: '← Structural Diff API',
    onThisPage: 'في هذه الصفحة',
    sectionsBtn: 'الأقسام',
    sections: [
      { id: 'approach',     title: 'اشتقاق GT' },
      { id: 'scope',        title: 'نطاق البيانات' },
      { id: 'class-dist',   title: 'توزيع الفئات' },
      { id: 'per-category', title: 'مقاييس لكل فئة' },
      { id: 'confusion',    title: 'مصفوفة الارتباك' },
      { id: 'root-cause',   title: 'تحليل الأسباب' },
      { id: 'similarity',   title: 'التشابه' },
      { id: 'limitations',  title: 'القيود' },
    ],
    guidesLabel: 'الأدلة والأمثلة',
    guides: [
      { label: 'معاملات الإعداد',  slug: 'parameters' },
      { label: 'حالات الـ diff',   slug: 'diff-statuses' },
      { label: 'درس تطبيقي كامل', slug: 'demo' },
      { label: 'Playground',       slug: 'playground' },
      { label: 'دقة المحرك',       slug: 'engine-precision' },
    ],
  },
  hero: {
    title: 'تحليل دقة المحرك',
    subtitle: 'مُقاس على 14 مجموعة بيانات · 185 حدث GT',
    intro:
      'توثّق هذه الصفحة دقة التصنيف المقاسة لمحرك الـ diff الهيكلي ذي الـ 8 مراحل. جميع الأرقام مأخوذة من تشغيل المحرك على بيانات تفريغ ومقارنة مخرجاته بتسميات الحقيقة الأرضية المشتقة مما قام به المُدقّقون البشريون فعلياً.',
    badge: 'Micro-F1 · 76.1%',
  },
  approach: {
    title: 'كيف تم اشتقاق الحقيقة الأرضية',
    intro:
      'لا توجد مجموعة اختبار مُصنَّفة مسبقاً لهذه المهمة. تُشتَق الحقيقة الأرضية بتحليل هيكلي لما قام به المُدقِّق البشري فعلياً عند تحويل original → reworked — نهج تصنيف سلوكي. فكرة استنتاج التسميات من أزواج قبل/بعد مرتبطة بالإشراف الضعيف (التصنيف البرمجي) في أدبيات NLP.',
    phases: [
      {
        label: 'المرحلة 1 — الدمج أولاً (N orig → 1 rewk)',
        body: 'لكل صف مُعاد، جرّب دمج نافذة صغيرة من الصفوف الأصلية المتتالية. إذا تجاوز التشابه النصي المُدمَج أفضل تطابق فردي بهامش مطلوب، فقد دمج المُدقّق تلك الصفوف.',
      },
      {
        label: 'المرحلة 2 — التقسيمات (1 orig → N rewk)',
        body: 'نفس المنطق بشكل معكوس: لكل صف أصلي غير مستخدم، جرّب دمج نافذة صغيرة من الصفوف المُعادة المتتالية.',
      },
      {
        label: 'المرحلة 3 — مطابقة 1:1 (greedy بحسب التشابه)',
        body: 'تتطابق الصفوف المتبقية بشكل greedy بالتشابه النصي ضمن نافذة زمنية. UNCHANGED: نص متطابق وطوابع زمنية ضمن التسامح ونفس المتحدث. وإلا: MODIFIED.',
      },
      {
        label: 'المرحلة 4 — المتبقيات',
        body: 'الصفوف الأصلية غير المطابَقة → DELETED. الصفوف المُعادة غير المطابَقة → ADDED.',
      },
    ],
    params: '',
    notNovel: '',
  },
  scope: {
    title: 'نطاق مجموعات البيانات',
    body: '14 مجموعة بيانات من مهام تصنيف التفريغ. جميع المجموعات تحتوي على علامات NSE (الأحداث غير الكلامية) وعلامات التداخل ([overlap]) وطوابع زمنية وتسميات متحدث وعلامات بيانات وصفية.',
    headers: { dataset: 'المجموعة', orig: 'Orig', rewk: 'Rewk', gtEvents: 'أحداث GT', correct: 'صحيح', accuracy: 'الدقة' },
    rows: [
      { ds: 'DS6',       orig: 14,  rewk: 19,  gt: 17,  correct: 16, acc: '94.1%'  },
      { ds: 'DS7',       orig: 22,  rewk: 13,  gt: 14,  correct: 14, acc: '100.0%' },
      { ds: 'DS8',       orig: 11,  rewk: 9,   gt: 9,   correct: 5,  acc: '55.6%'  },
      { ds: 'DS9',       orig: 11,  rewk: 9,   gt: 9,   correct: 9,  acc: '100.0%' },
      { ds: 'DS10',      orig: 24,  rewk: 22,  gt: 23,  correct: 15, acc: '65.2%'  },
      { ds: 'DS11',      orig: 28,  rewk: 17,  gt: 21,  correct: 17, acc: '81.0%'  },
      { ds: 'DS12',      orig: 1,   rewk: 15,  gt: 15,  correct: 8,  acc: '53.3%'  },
      { ds: 'DS13',      orig: 9,   rewk: 14,  gt: 11,  correct: 8,  acc: '72.7%'  },
      { ds: 'DS14',      orig: 10,  rewk: 10,  gt: 10,  correct: 9,  acc: '90.0%'  },
      { ds: 'DS15',      orig: 6,   rewk: 8,   gt: 8,   correct: 5,  acc: '62.5%'  },
      { ds: 'DS16',      orig: 3,   rewk: 5,   gt: 3,   correct: 2,  acc: '66.7%'  },
      { ds: 'DS17',      orig: 12,  rewk: 13,  gt: 14,  correct: 9,  acc: '64.3%'  },
      { ds: 'DS18',      orig: 21,  rewk: 17,  gt: 18,  correct: 12, acc: '66.7%'  },
      { ds: 'DS19',      orig: 9,   rewk: 11,  gt: 13,  correct: 5,  acc: '38.5%'  },
    ],
    totalsLabel: 'الإجمالي',
    totals: { orig: 181, rewk: 182, gt: 185, correct: 134, acc: '72.4% (استرجاع)' },
  },
  classDist: {
    title: 'توزيع الفئات',
    body: 'البيانات مائلة بشدة نحو MODIFIED الذي يشكّل أكثر من نصف جميع أحداث GT. هذه خاصية طبيعية لإعادة صياغة التفريغ.',
    warning: 'يتأثر الـ micro-F1 البالغ 76.1% بهذا الاختلال: تُساهم MODIFIED (الفئة السائدة، F1=82.7%) بشكل غير متناسب في المتوسط الدقيق. الـ macro-F1 (70.4%) يعامل الفئات الست بالتساوي ويعطي صورة أكثر توازناً. UNCHANGED وSPLIT لديهما 6 أحداث GT فقط — مقاييسهما تحمل عدم يقين عالياً.',
    headers: { category: 'الفئة', support: 'أحداث GT', share: 'الحصة' },
    rows: [
      { category: 'MODIFIED',  support: 94, share: '50.8%' },
      { category: 'ADDED',     support: 46, share: '24.9%' },
      { category: 'MERGED',    support: 22, share: '11.9%' },
      { category: 'DELETED',   support: 11, share:  '5.9%' },
      { category: 'UNCHANGED', support:  6, share:  '3.2%' },
      { category: 'SPLIT',     support:  6, share:  '3.2%' },
    ],
    imbalanceNote: 'يُظهر المحرك أيضاً تحيزاً خفيفاً نحو التنبؤ بـ MODIFIED: 3 صفوف GT-UNCHANGED تُصنَّف كـ MODIFIED، وعدة صفوف GT-ADDED تُمتَص في MODIFIED أو SPLIT.',
  },
  perCategory: {
    title: 'الدقة / الاسترجاع / F1 لكل فئة',
    intro: 'مُحسَب على 185 حدث GT من 14 مجموعة بيانات.',
    headers: { category: 'الفئة', support: 'الدعم', tp: 'TP', fp: 'FP', fn: 'FN', precision: 'الدقة', recall: 'الاسترجاع', f1: 'F1' },
    rows: [
      { category: 'MODIFIED',  support: 94, tp: 74, fp: 11, fn: 20, precision: '87.1%', recall: '78.7%', f1: '82.7%' },
      { category: 'ADDED',     support: 46, tp: 28, fp:  8, fn: 18, precision: '77.8%', recall: '60.9%', f1: '68.3%' },
      { category: 'MERGED',    support: 22, tp: 18, fp:  8, fn:  4, precision: '69.2%', recall: '81.8%', f1: '75.0%' },
      { category: 'DELETED',   support: 11, tp:  6, fp:  2, fn:  5, precision: '75.0%', recall: '54.5%', f1: '63.2%' },
      { category: 'UNCHANGED', support:  6, tp:  3, fp:  0, fn:  3, precision: '100.0%', recall: '50.0%', f1: '66.7%' },
      { category: 'SPLIT',     support:  6, tp:  5, fp:  4, fn:  1, precision: '55.6%', recall: '83.3%', f1: '66.7%' },
    ],
    microRow: { support: 185, tp: 134, fp: 33, fn: 51, precision: '80.2%', recall: '72.4%', f1: '76.1%' },
    macroRow: { precision: '77.4%', recall: '68.2%', f1: '70.4%' },
    microLabel: 'المتوسط الدقيق',
    macroLabel: 'المتوسط الكلي',
    headline: 'الـ micro-F1 الكلي للمحرك: 76.1% — 134 من 185 حدث GT مُصنَّف بشكل صحيح.',
  },
  confusionMatrix: {
    title: 'مصفوفة الارتباك',
    intro: 'الصفوف = تسميات GT. الأعمدة = تنبؤات المحرك. · = صفر. UNMATCHED = لا مخرج للمحرك عند هذا الارتساء.',
    unmatchedNote: 'عمود UNMATCHED يمثّل 18 حدثاً (9.7%): 8 GT-MODIFIED و10 GT-ADDED. السبب الرئيسي هو DS12 (صف أصلي واحد → 15 صفاً مُعاداً) حيث لا يستطيع المحرك إنتاج عدد كافٍ من الأحداث.',
  },
  rootCause: {
    title: 'تحليل الأسباب الجذرية',
    intro: 'تفصيل الـ 51 تصنيفاً خاطئاً حسب نمط الفشل.',
    headers: { risk: 'الخطر', freq: 'التكرار', cause: 'السبب الجذري', tunable: 'قابل للضبط عبر' },
    rows: [
      { risk: 'MODIFIED → UNMATCHED',  freq: '8/94 = 9%',  cause: 'لم يُعثَر على تطابق',                    tunable: '↑ نافذة التطابق المتبقية' },
      { risk: 'MODIFIED → MERGED (دمج مفرط)', freq: '6/94 = 6%', cause: 'مرحلة MERGE تمتص تطابقات 1:1',   tunable: '↑ عتبة تشابه الدمج' },
      { risk: 'ADDED → UNMATCHED',     freq: '10/46 = 22%', cause: 'المحرك ينتج صفوفاً أقل من GT',          tunable: 'عدم تطابق في العدد' },
      { risk: 'ADDED → SPLIT',         freq: '3/46 = 7%',  cause: 'صفوف جديدة تُصنَّف كتقسيمات',           tunable: '↑ عتبة تشابه التقسيم' },
      { risk: 'UNCHANGED → MODIFIED',  freq: '3/6 = 50%',  cause: 'انزياح طفيف في الطوابع الزمنية',         tunable: '↑ تسامح الوقت للتطابق التام' },
      { risk: 'DELETED → MODIFIED',    freq: '3/11 = 27%', cause: 'تطابق ضعيف لصف محذوف',                  tunable: '↑ حد التشابه النصي الأدنى' },
    ],
  },
  similarity: {
    title: 'تحليل مقياس التشابه',
    intro: 'مُحسَب على 6 مجموعات بيانات (DS6–DS11)، 116 صفاً أصلياً، 1,754 زوجاً إجمالاً.',
    formula: 'matchScore = w_زمن × timeSim + w_نص × txtSim\ntimeSim  = درجة القرب الزمني (تشبع بعد حد زمني أقصى)\ntxtSim   = تشابه Jaccard ثنائي الأحرف بعد تطبيع NFKC + علامات التشكيل\n[محجوب] إذا كان txtSim أقل من الحد الأدنى للتشابه النصي',
    pairsTitle: 'تغطية الدرجات للأزواج',
    pairsHeaders: { metric: 'المقياس', value: 'القيمة' },
    pairsRows: [
      { metric: 'إجمالي الأزواج المُقيَّمة',             value: '1,754' },
      { metric: 'أزواج محجوبة (txtSim < 0.10)',          value: '1,459 (83.2%)' },
      { metric: 'أزواج بدرجات غير صفرية',               value: '295 (16.8%)' },
      { metric: 'متوسط الدرجة — جميع الأزواج',           value: '0.065' },
      { metric: 'متوسط الدرجة — الأزواج غير الصفرية',    value: '0.385' },
    ],
    confTitle: 'توزيع الثقة للتطابقات المقبولة (64 تطابقاً)',
    confHeaders: { band: 'نطاق الثقة', count: 'العدد', share: 'الحصة' },
    confRows: [
      { band: 'عالية (score ≥ 0.70)', count: 38, share: '59.4%' },
      { band: 'متوسطة (0.40 – 0.70)', count: 22, share: '34.4%' },
      { band: 'منخفضة (0.20 – 0.40)', count:  4, share:  '6.3%' },
    ],
    marginTitle: 'هامش القرار فوق عتبة القبول',
    marginHeaders: { metric: 'المقياس', value: 'القيمة' },
    marginRows: [
      { metric: 'متوسط الهامش فوق عتبة القبول',   value: '0.522' },
      { metric: 'تطابقات حدية (هامش < 0.05)',                value: '1 (1.6%)' },
      { metric: 'خطر الانعكاس: اضطراب بسيط سيرفض',     value: '1 (1.6%)' },
    ],
  },
  limitations: {
    title: 'القيود',
    items: [
      '185 حدث GT هو حجم عينة صغير. الأرقام لكل فئة لـ UNCHANGED (6 أحداث) وSPLIT (6 أحداث) تحمل عدم يقين عالياً.',
      'الحقيقة الأرضية مشتقة وليست مُصنَّفة يدوياً. المعاملات القابلة للضبط في خوارزمية الاشتقاق تؤثر على الأحداث التي تظهر في GT.',
    ],
  },
  footer: {
    info: 'دقة المحرك · Structural Diff API · بُني بواسطة',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الاستخدام',
    back: '← العودة إلى Structural Diff API',
  },
}

// ── Exports ──────────────────────────────────────────────────────────────────
export type { EnginePrecisionI18n }

export function getEnginePrecisionI18n(locale: string): EnginePrecisionI18n {
  if (locale === 'fr') return fr
  if (locale === 'ar') return ar
  return en
}
