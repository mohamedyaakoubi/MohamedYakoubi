// Config Parameters Guide — i18n for EN / FR / AR

type ParamEntry = {
  name: string
  type: string
  default: string
  whenToUse: string
  effect: string
}

type ParametersGuideI18n = {
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
  }
  whenSection: {
    title: string
    body: string
    useCases: Array<{ flag: string; reason: string }>
  }
  simpleMode: {
    title: string
    what: string
    defaultBehavior: string
    withFlag: string
    whenToUse: string
    note: string
  }
  enableSplitsMerges: {
    title: string
    intro: string
    splits: string
    merges: string
    whenToUse: string
  }
  stripDiacritics: {
    title: string
    what: string
    defaultBehavior: string
    withFalse: string
    examples: string
    whenToUse: string
  }
  positionalMode: {
    title: string
    what: string
    defaultVsPositional: string
    riskNote: string
    whenToUse: string
  }
  ignoreColNames: {
    title: string
    what: string
    example: string
    whenToUse: string
  }
  enableInlineDiff: {
    title: string
    what: string
    whenFalse: string
    response: string
    whenToUse: string
    note: string
  }
  structuralTransforms: {
    title: string
    what: string
    schema: string
    caveat: string
    example: string
    whenToUse: string
  }
  expertThresholds: {
    title: string
    intro: string
    params: ParamEntry[]
    lowerSimWeak: string
    raiseSimConfident: string
    timeTol: string
    splitMergeTol: string
  }
  footer: { info: string; back: string }
}

// ─────────────────── ENGLISH ───────────────────
const en: ParametersGuideI18n = {
  meta: {
    title: 'Config Parameters Guide — Structural Diff API',
    description:
      'Detailed guide to every config option in the Structural Diff API: simpleMode, stripDiacritics, positionalMode, ignoreColNames, and expert similarity thresholds. Includes before/after examples.',
  },
  breadcrumb: { apiDocs: 'API Reference', current: 'Config Parameters' },
  nav: {
    backToApiDocs: '← API Reference',
    onThisPage: 'On this page',
    sectionsBtn: 'Sections',
    sections: [
      { id: 'when-to-customize', title: 'When to customize' },
      { id: 'simpleMode',        title: 'simpleMode' },
      { id: 'enableSplitsMerges', title: 'enableSplits / enableMerges' },
      { id: 'stripDiacritics',   title: 'stripDiacritics' },
      { id: 'positionalMode',    title: 'positionalMode' },
      { id: 'ignoreColNames',       title: 'ignoreColNames' },
      { id: 'enableInlineDiff',     title: 'enableInlineDiff' },
      { id: 'structuralTransforms', title: 'structuralTransforms' },
      { id: 'expert-thresholds',    title: 'Expert thresholds' },
    ],
    guidesLabel: 'Guides',
    guides: [
      { label: 'Config Parameters',  slug: 'parameters' },
      { label: 'Diff Statuses',      slug: 'diff-statuses' },
      { label: 'Demo Walkthrough',   slug: 'demo' },
      { label: 'Live Simulator',     slug: 'live-demo' },
    ],
  },
  hero: {
    title: 'Config Parameters',
    subtitle: 'Know exactly which flag to flip and why.',
    intro:
      'The default config works well for most transcripts. These parameters exist to handle specific annotation workflows: Arabic QA, positional-only comparison, metadata column exclusion, and structural detection control. Each section below shows the exact input/output difference a flag produces.',
  },
  whenSection: {
    title: 'When to customize the config',
    body: 'Start with no config. Run a diff and inspect the results. Only reach for a config flag when you see a specific problem:',
    useCases: [
      { flag: 'stripDiacritics',   reason: 'Arabic transcripts where diacritic additions inflate MODIFIED count' },
      { flag: 'simpleMode',        reason: 'Pure content QA — you know the annotator made no structural changes' },
      { flag: 'ignoreColNames',    reason: 'Metadata columns (confidence score, category) differ between QA layers but aren\'t the comparison target' },
      { flag: 'positionalMode',    reason: 'Debugging unexpected alignments, or processing very large uniform datasets' },
      { flag: 'enableSplits: false', reason: 'Project guidelines prohibit splits at this annotation layer' },
      { flag: 'enableInlineDiff: false', reason: 'Large batches where only statuses and scores are needed — suppress transcript diff computation for speed' },
      { flag: 'structuralTransforms', reason: 'Rows have ID prefixes, URLs, or phone formats that vary between layers but aren\'t part of the transcript content' },
    ],
  },
  simpleMode: {
    title: 'simpleMode',
    what:
      'By default the engine runs an 8-pass alignment algorithm that matches rows by similarity across the full transcript, even if they moved positions. simpleMode disables this: row 0 is compared to row 0, row 1 to row 1, strictly by position.',
    defaultBehavior:
      'Default (simpleMode: false): the engine detects that one long segment was split into two and labels it SPLIT.',
    withFlag:
      'With simpleMode: true: the engine compares row 0 to row 0 (finds a mismatch → MODIFIED) and sees an extra row in reworked (→ ADDED). The structural intent is lost, but every character change is visible.',
    whenToUse:
      'Use when you\'re confident the annotator made zero structural changes — only text corrections and punctuation. Also useful when you want raw character diffs without any structural interpretation.',
    note:
      'simpleMode is faster on very large datasets because it skips alignment. The trade-off is false MODIFIED/ADDED/DELETED counts where SPLIT/MERGED would be more accurate.',
  },
  enableSplitsMerges: {
    title: 'enableSplits / enableMerges',
    intro:
      'Finer-grained alternatives to simpleMode. Instead of disabling all structural detection, you can disable only one type.',
    splits:
      'enableSplits: false — SPLIT candidates are instead emitted as MODIFIED (truncated match) + ADDED (leftover rows). Use when your annotation guidelines at this layer prohibit splits, so surfacing them as individual changes is more actionable.',
    merges:
      'enableMerges: false — MERGE candidates become MODIFIED (first original row) + DELETED (absorbed originals). Use when merges are not permitted at this layer and you want each deleted row flagged explicitly.',
    whenToUse:
      'These flags are most useful in multi-layer QA pipelines where each layer has its own permitted operations. Disabling an operation you don\'t expect to see makes unexpected structural changes surface as distinct ADDED/DELETED flags instead of being silently grouped.',
  },
  stripDiacritics: {
    title: 'stripDiacritics',
    what:
      'Before comparison, the engine normalises Arabic and accented characters by stripping diacritical marks. For Arabic this includes harakat (short vowels: fathah, dammah, kasrah), tanwin, shadda, sukun, and hamza variants (U+064B–U+065F, U+0670). For Latin text it strips combining accent characters (U+0300–U+036F). This flag is ON by default.',
    defaultBehavior: 'Default behavior (stripDiacritics: true — no config needed): مرحبا → مرحباً is UNCHANGED because diacritical marks are stripped before comparison, making the stripped forms identical.',
    withFalse: 'With stripDiacritics: false (override): مرحبا → مرحباً is MODIFIED because the ً mark is no longer stripped — raw character differences are flagged.',
    examples:
      'Common Arabic QA scenario: an annotator normalises the text per written Arabic style guides (adding harakat, normalising hamza). With the default (stripDiacritics: true), only lexical and segmentation differences are counted. Override to false when diacritical accuracy is itself a QA criterion.',
    whenToUse:
      'The default (true) works for most Arabic transcript QA. Override with stripDiacritics: false only when you are explicitly verifying that an annotator correctly added or removed diacritical marks — i.e., when diacritical precision is a tracked quality criterion.',
  },
  positionalMode: {
    title: 'positionalMode',
    what:
      'Skips the similarity-based alignment algorithm entirely. Each original row at index N is compared to the reworked row at index N. If the arrays are different lengths, extra rows are ADDED or DELETED.',
    defaultVsPositional:
      'Default: if an annotator corrected a sentence and it moved from position 4 to position 6, the engine will still match them (MODIFIED). With positionalMode, row 4 in original is compared to row 4 in reworked — which may be a completely different sentence — producing a confusing MODIFIED with a large diff.',
    riskNote:
      'positionalMode produces misleading results when rows have been reordered. Only use it when you can guarantee the annotator did not add, remove, or reorder any rows.',
    whenToUse:
      'Use for debugging: run positionalMode and compare it to default results to understand which rows the alignment matched. Also useful for very uniform datasets (e.g., word-by-word alignment ground truth) where positional matching is the ground truth.',
  },
  ignoreColNames: {
    title: 'ignoreColNames',
    what:
      'An array of column names to exclude from MODIFIED detection. A row is only MODIFIED if a non-ignored column changed. The ignored columns are still included in the response (snapData / currData) but do not trigger MODIFIED status.',
    example:
      'Scenario: your data has a confidence column set by the annotation tool. QA Layer 1 might record confidence: 0.88 while QA Layer 2 records confidence: 0.91 for the same utterance. Without ignoreColNames, every such row is MODIFIED even if the transcript is identical. With ignoreColNames: ["confidence"], those rows are UNCHANGED as expected.',
    whenToUse:
      'Use whenever your schema includes metadata columns that change independently of transcript content: confidence scores, reviewer IDs, batch numbers, internal category tags, auto-generated timestamps.',
  },
  enableInlineDiff: {
    title: 'enableInlineDiff',
    what:
      'Controls whether the engine computes a character-level inline diff for MODIFIED rows. When enabled (default), each MODIFIED row in the response includes a transcriptDiff array that you can use to render highlighted changes in your review UI. Disabling it skips the diff computation entirely.',
    whenFalse:
      'With enableInlineDiff: false, MODIFIED rows still appear in results (status and notes are unchanged), but the transcriptDiff field is absent. Use this when you only need status counts and scores and want to reduce response payload size.',
    response:
      'Each transcriptDiff segment has the shape { type: "EQUAL" | "INSERT" | "DELETE", text: string }. Reconstruct the original by joining all non-INSERT spans; reconstruct the reworked by joining all non-DELETE spans. Note: type values are UPPERCASE.',
    whenToUse:
      'Disable (enableInlineDiff: false) when processing large batches where you only need CER/WER/SER scores and status counts, not the per-character diff. This reduces both server CPU and network payload. Re-enable for interactive review UIs where editors need to see exactly what changed.',
    note:
      'The diff uses LCS (Longest Common Subsequence). For very long segments (combined original + reworked length > CHAR_DIFF_LIMIT), it automatically falls back from character-level to word-level tokens — still returned as the same array format.',
  },
  structuralTransforms: {
    title: 'structuralTransforms',
    what:
      'An array of find/replace rules applied to the transcript text BEFORE the similarity scoring algorithm runs. This lets the engine align rows that differ only in predictable, non-content prefixes or formats (e.g., ID tags, URL prefixes, phone number formats).',
    schema:
      'Each rule: { find: string, replace: string, isRegex: boolean }. Plain string rules do a literal find-replace. Regex rules (isRegex: true) support standard JavaScript regex syntax (case-insensitive). Up to 20 rules per request.',
    caveat:
      'Transforms apply to SIMILARITY SCORING only — not to the cell data returned in snapData / currData. A row where only the ID prefix changed ("ID-001: Hello" vs "ID-002: Hello") will still show as MODIFIED because the raw transcript content differs. The transforms ensure the rows are correctly ALIGNED (not misidentified as ADDED+DELETED), but the column diff can still flag the prefix change.',
    example:
      'Strip ID prefixes so rows can align across batches: { "find": "^ID-\\d+:\\s*", "replace": "", "isRegex": true }. Strip URL domains: { "find": "https?://[^\\s]+", "replace": "[URL]", "isRegex": true }.',
    whenToUse:
      'Use when your original and reworked data share a common schema but rows include auto-generated IDs, batch prefixes, or formatting that the annotator changed as part of their work. Without transforms, the alignment algorithm treats rows with different prefixes as entirely different — potentially producing false ADDED/DELETED pairs instead of MODIFIED.',
  },
  expertThresholds: {
    title: 'Expert similarity & timing thresholds',
    intro:
      'These seven numbers control the matching algorithm\'s sensitivity. The defaults are tuned for standard-length transcription segments (5–30 seconds, 10–60 words). Adjust them only when you\'ve looked at the raw similarity scores and know the default thresholds produce wrong matches.',
    params: [
      { name: 'SIM_CONFIDENT', type: 'number (0–1)', default: '0.70', whenToUse: 'Two rows this similar or closer are a definite match — committed in the high-similarity pass.', effect: 'Raise to require very close text matches before committing. Lower if you have very short utterances that can\'t achieve high similarity.' },
      { name: 'SIM_MODERATE',  type: 'number (0–1)', default: '0.40', whenToUse: 'Plausible match — accepted when timing also confirms.', effect: 'Lower if annotators rewrite sentences significantly while keeping the same meaning.' },
      { name: 'SIM_WEAK',      type: 'number (0–1)', default: '0.20', whenToUse: 'Tentative match — only accepted with very strong timing evidence.', effect: 'Lower to 0.10–0.15 for very short segments (single words, disfluencies) that can\'t achieve 0.20 similarity.' },
      { name: 'TIME_EXACT_TOL',    type: 'number (s)', default: '0.05', whenToUse: 'Timestamps ≤ this apart count as exact match.',    effect: 'Increase to 0.5–1.0 if your annotation tool rounds timestamps to whole seconds.' },
      { name: 'TIME_FUZZY_TOL',    type: 'number (s)', default: '2.5',  whenToUse: 'Timestamps ≤ this apart count as fuzzy match.',    effect: 'Increase when annotators shift segment boundaries significantly.' },
      { name: 'SPLIT_COMBINED_MIN', type: 'number (0–1)', default: '0.35', whenToUse: 'Min combined text score to accept a SPLIT detection.', effect: 'Raise to reduce false splits. Lower if your content has very short target segments.' },
      { name: 'MERGE_COMBINED_MIN', type: 'number (0–1)', default: '0.65', whenToUse: 'Min combined text score to accept a MERGE detection.', effect: 'Raise to reduce false merges. Lower for datasets with many legitimate merges.' },
      { name: 'CHAR_DIFF_LIMIT', type: 'integer (100–50000)', default: '1500', whenToUse: 'Max combined character length before falling back to word-level diff.', effect: 'Increase for batches with very long segments (300-word utterances). Decrease to force word-level diffs for all segments and save CPU on massive batches.' },
    ],
    lowerSimWeak:
      'Common scenario: single-word utterances ("Um", "Yes") or disfluency fragments appear as ADDED/DELETED instead of MODIFIED because their similarity to adjacent rows is below SIM_WEAK. Lower SIM_WEAK to 0.1–0.2 to let the timing signal take over.',
    raiseSimConfident:
      'Raising SIM_CONFIDENT reduces false positives in noisy transcripts where many rows have moderate similarity. Useful when your content has recurring phrases ("thank you", "okay") that the engine might incorrectly match across unrelated segments.',
    timeTol:
      'Some annotation tools produce timestamps with platform-specific precision (e.g., always rounded to 0.1s, or always 1s-aligned). If your engine frequently mismatches rows that look visually identical, check whether a TIME_EXACT_TOL of 1.0 or 1.5 resolves it.',
    splitMergeTol:
      'SPLIT_COMBINED_MIN / MERGE_COMBINED_MIN apply after the text similarity and timing checks pass. If you\'re seeing false splits where two unrelated short rows happen to add up to a long original, try raising this to 0.75.',
  },
  footer: {
    info: 'Config Parameters Guide · Structural Diff API · Built by',
    back: '← Back to API Reference',
  },
}

// ─────────────────── FRENCH ───────────────────
const fr: ParametersGuideI18n = {
  meta: {
    title: 'Guide des paramètres de configuration — API Structural Diff',
    description:
      'Guide détaillé de chaque option de configuration de l\'API Structural Diff : simpleMode, stripDiacritics, positionalMode, ignoreColNames et seuils experts. Avec exemples avant/après.',
  },
  breadcrumb: { apiDocs: 'Référence API', current: 'Paramètres de configuration' },
  nav: {
    backToApiDocs: '← Référence API',
    onThisPage: 'Sur cette page',
    sectionsBtn: 'Sections',
    sections: [
      { id: 'when-to-customize',   title: 'Quand personnaliser' },
      { id: 'simpleMode',          title: 'simpleMode' },
      { id: 'enableSplitsMerges',  title: 'enableSplits / enableMerges' },
      { id: 'stripDiacritics',     title: 'stripDiacritics' },
      { id: 'positionalMode',      title: 'positionalMode' },
      { id: 'ignoreColNames',       title: 'ignoreColNames' },
      { id: 'enableInlineDiff',     title: 'enableInlineDiff' },
      { id: 'structuralTransforms', title: 'structuralTransforms' },
      { id: 'expert-thresholds',    title: 'Seuils experts' },
    ],
    guidesLabel: 'Guides',
    guides: [
      { label: 'Paramètres de configuration', slug: 'parameters' },
      { label: 'Statuts de diff',             slug: 'diff-statuses' },
      { label: 'Démonstration complète',       slug: 'demo' },
      { label: 'Simulateur en direct',         slug: 'live-demo' },
    ],
  },
  hero: {
    title: 'Paramètres de configuration',
    subtitle: 'Sachez exactement quel paramètre activer et pourquoi.',
    intro:
      'La configuration par défaut fonctionne bien pour la plupart des transcriptions. Ces paramètres existent pour gérer des workflows d\'annotation spécifiques : QA arabe, comparaison positionnelle, exclusion de colonnes de métadonnées et contrôle de la détection structurelle. Chaque section montre la différence exacte produite dans les résultats.',
  },
  whenSection: {
    title: 'Quand personnaliser la configuration',
    body: 'Commencez sans configuration. Lancez un diff et analysez les résultats. N\'utilisez un paramètre que lorsque vous identifiez un problème précis :',
    useCases: [
      { flag: 'stripDiacritics',   reason: 'Transcriptions arabes où les ajouts de diacritiques gonflent le nombre de MODIFIED' },
      { flag: 'simpleMode',        reason: 'QA purement de contenu — vous savez que l\'annotateur n\'a fait aucun changement structurel' },
      { flag: 'ignoreColNames',    reason: 'Colonnes de métadonnées (score de confiance, catégorie) qui diffèrent entre les couches QA mais ne sont pas la cible de comparaison' },
      { flag: 'positionalMode',    reason: 'Débogage d\'alignements inattendus, ou traitement de grands ensembles de données uniformes' },
      { flag: 'enableSplits: false', reason: 'Les directives du projet interdisent les divisions à cette couche d\'annotation' },
      { flag: 'enableInlineDiff: false', reason: 'Grands lots où seuls les statuts et scores sont nécessaires — supprimer le calcul du diff de transcription pour la vitesse' },
      { flag: 'structuralTransforms', reason: 'Les lignes ont des préfixes ID, URL ou formats téléphoniques qui varient entre les couches mais ne font pas partie du contenu de la transcription' },
    ],
  },
  simpleMode: {
    title: 'simpleMode',
    what:
      'Par défaut, le moteur exécute un algorithme d\'alignement en 8 passes qui fait correspondre les lignes par similarité sur l\'ensemble de la transcription, même si elles ont changé de position. simpleMode désactive ceci : la ligne 0 est comparée à la ligne 0, la ligne 1 à la ligne 1, strictement par position.',
    defaultBehavior:
      'Par défaut (simpleMode: false) : le moteur détecte qu\'un long segment a été divisé en deux et l\'étiquette SPLIT.',
    withFlag:
      'Avec simpleMode: true : le moteur compare la ligne 0 à la ligne 0 (trouve une différence → MODIFIED) et voit une ligne supplémentaire dans reworked (→ ADDED). L\'intention structurelle est perdue, mais chaque modification de caractère est visible.',
    whenToUse:
      'Utilisez quand vous êtes certain que l\'annotateur n\'a fait aucun changement structurel — seulement des corrections textuelles et de ponctuation. Également utile pour obtenir des diffs de caractères bruts sans interprétation structurelle.',
    note:
      'simpleMode est plus rapide sur les grands ensembles de données car il ignore l\'alignement. Le compromis est des faux comptes MODIFIED/ADDED/DELETED là où SPLIT/MERGED serait plus précis.',
  },
  enableSplitsMerges: {
    title: 'enableSplits / enableMerges',
    intro:
      'Alternatives plus granulaires à simpleMode. Au lieu de désactiver toute la détection structurelle, vous pouvez désactiver un seul type.',
    splits:
      'enableSplits: false — les candidats SPLIT sont émis comme MODIFIED (correspondance tronquée) + ADDED (lignes résiduelles). Utile quand vos directives interdisent les divisions à cette couche.',
    merges:
      'enableMerges: false — les candidats MERGE deviennent MODIFIED (première ligne originale) + DELETED (originaux absorbés). Utile quand les fusions ne sont pas permises à cette couche.',
    whenToUse:
      'Ces paramètres sont utiles dans les pipelines QA multi-couches où chaque couche a ses propres opérations autorisées. Désactiver une opération inattendue fait remonter les changements structurels non autorisés comme des ADDED/DELETED distincts.',
  },
  stripDiacritics: {
    title: 'stripDiacritics',
    what:
      'Avant la comparaison, le moteur normalise les caractères arabes et accentués en supprimant les marques diacritiques. Pour l\'arabe, cela inclut les harakat (voyelles courtes : fathah, dammah, kasrah), tanwin, shadda, sukun et variantes de hamza (U+064B–U+065F, U+0670). Ce paramètre est ACTIVÉ par défaut.',
    defaultBehavior: 'Comportement par défaut (stripDiacritics: true — aucune configuration nécessaire) : مرحبا → مرحباً est UNCHANGED car les marques diacritiques sont supprimées avant la comparaison, rendant les formes strippées identiques.',
    withFalse: 'Avec stripDiacritics: false (remplacement) : مرحبا → مرحباً est MODIFIED car le signe ً n\'est plus supprimé — les différences de caractères bruts sont signalées.',
    examples:
      'Scénario courant de QA arabe : un annotateur normalise le texte selon les guides de style de l\'arabe écrit (ajout de harakat, normalisation de hamza). Avec le comportement par défaut (stripDiacritics: true), seules les différences lexicales et de segmentation sont comptées.',
    whenToUse:
      'Le comportement par défaut (true) convient à la plupart des QA de transcriptions arabes. Remplacez par stripDiacritics: false uniquement quand vous vérifiez explicitement que l\'annotateur a correctement ajouté ou supprimé des marques diacritiques — c\'est-à-dire quand la précision diacritique est un critère QA suivi.',
  },
  positionalMode: {
    title: 'positionalMode',
    what:
      'Ignore complètement l\'algorithme d\'alignement par similarité. Chaque ligne originale à l\'indice N est comparée à la ligne retravaillée à l\'indice N. Si les tableaux ont des longueurs différentes, les lignes supplémentaires sont ADDED ou DELETED.',
    defaultVsPositional:
      'Par défaut : si un annotateur corrige une phrase et elle passe de la position 4 à la position 6, le moteur les fait quand même correspondre (MODIFIED). Avec positionalMode, la ligne 4 de l\'original est comparée à la ligne 4 du reworked — qui peut être une phrase complètement différente.',
    riskNote:
      'positionalMode produit des résultats trompeurs quand les lignes ont été réordonnées. N\'utilisez que si vous pouvez garantir qu\'aucune ligne n\'a été ajoutée, supprimée ou réordonnée.',
    whenToUse:
      'Utile pour le débogage et les ensembles de données très uniformes où la correspondance positionnelle est la vérité terrain.',
  },
  ignoreColNames: {
    title: 'ignoreColNames',
    what:
      'Un tableau de noms de colonnes à exclure de la détection MODIFIED. Une ligne n\'est MODIFIED que si une colonne non ignorée a changé. Les colonnes ignorées sont toujours incluses dans la réponse mais ne déclenchent pas MODIFIED.',
    example:
      'Scénario : vos données ont une colonne confidence définie par l\'outil d\'annotation. La couche QA 1 peut enregistrer confidence: 0.88 tandis que la couche QA 2 enregistre confidence: 0.91 pour la même utterance. Sans ignoreColNames, chaque ligne est MODIFIED même si la transcription est identique.',
    whenToUse:
      'Utilisez chaque fois que votre schéma inclut des colonnes de métadonnées qui changent indépendamment du contenu de la transcription : scores de confiance, IDs de réviseur, numéros de lot, étiquettes de catégorie, horodatages auto-générés.',
  },
  enableInlineDiff: {
    title: 'enableInlineDiff',
    what:
      'Contrôle si le moteur calcule un diff de caractères inline pour les lignes MODIFIED. Quand activé (défaut), chaque ligne MODIFIED inclut un tableau transcriptDiff pour afficher les changements en surbrillance. Le désactiver ignore entièrement le calcul du diff.',
    whenFalse:
      'Avec enableInlineDiff: false, les lignes MODIFIED apparaissent toujours dans les résultats (statut et notes inchangés), mais le champ transcriptDiff est absent. À utiliser quand vous avez seulement besoin de comptages de statuts et de scores pour réduire la taille du payload.',
    response:
      'Chaque segment transcriptDiff a la forme { type: "EQUAL" | "INSERT" | "DELETE", text: string }. Reconstruisez l\'original en joignant tous les spans non-INSERT ; le reworked en joignant tous les spans non-DELETE. Note : les valeurs de type sont en MAJUSCULES.',
    whenToUse:
      'Désactivez (enableInlineDiff: false) pour le traitement de grands lots où vous n\'avez besoin que de scores CER/WER/SER et de comptages de statuts. Cela réduit à la fois le CPU serveur et la taille du payload réseau. Réactivez pour les interfaces de révision interactives.',
    note:
      'Le diff utilise LCS (Plus Longue Sous-séquence Commune). Pour les très longs segments (longueur combinée > CHAR_DIFF_LIMIT), il bascule automatiquement du niveau caractère au niveau mot — retourné dans le même format de tableau.',
  },
  structuralTransforms: {
    title: 'structuralTransforms',
    what:
      'Un tableau de règles de recherche/remplacement appliquées au texte de la transcription AVANT que l\'algorithme de scoring de similarité s\'exécute. Cela permet au moteur d\'aligner des lignes qui diffèrent uniquement par des préfixes ou des formats prévisibles et non-contenu.',
    schema:
      'Chaque règle : { find: string, replace: string, isRegex: boolean }. Les règles de chaîne font un remplacement littéral. Les règles regex (isRegex: true) supportent la syntaxe regex JavaScript standard (insensible à la casse). Jusqu\'à 20 règles par requête.',
    caveat:
      'Les transformations s\'appliquent au SCORING DE SIMILARITÉ uniquement — pas aux données renvoyées dans snapData / currData. Une ligne où seul le préfixe ID a changé sera toujours MODIFIED car le contenu brut diffère. Les transformations assurent l\'ALIGNEMENT correct, pas l\'absence de modification.',
    example:
      'Supprimer les préfixes ID : { "find": "^ID-\\\\d+:\\\\s*", "replace": "", "isRegex": true }. Supprimer les domaines URL : { "find": "https?://[^\\\\s]+", "replace": "[URL]", "isRegex": true }.',
    whenToUse:
      'À utiliser quand vos données partagent un schéma commun mais les lignes incluent des IDs auto-générés, des préfixes de lot ou un formatage que l\'annotateur a modifié. Sans transformations, l\'algorithme traite les lignes avec des préfixes différents comme entièrement différentes — produisant de fausses paires ADDED/DELETED.',
  },
  expertThresholds: {
    title: 'Seuils de similarité et de timing experts',
    intro:
      'Ces sept nombres contrôlent la sensibilité de l\'algorithme de correspondance. Les valeurs par défaut sont calibrées pour des segments de transcription de longueur standard (5–30 secondes, 10–60 mots). Ne les ajustez qu\'après avoir analysé les scores de similarité bruts.',
    params: [
      { name: 'SIM_CONFIDENT',      type: 'nombre (0–1)', default: '0.70', whenToUse: 'Deux lignes aussi similaires ou plus sont une correspondance certaine — validée dans la passe haute similarité.', effect: 'Augmentez pour exiger des correspondances de texte très proches. Diminuez pour les courtes utterances.' },
      { name: 'SIM_MODERATE',       type: 'nombre (0–1)', default: '0.40', whenToUse: 'Correspondance plausible — acceptée quand le timing le confirme aussi.',       effect: 'Diminuez si les annotateurs réécrivent significativement les phrases tout en gardant le même sens.' },
      { name: 'SIM_WEAK',           type: 'nombre (0–1)', default: '0.20', whenToUse: 'Correspondance tentative — acceptée uniquement avec une forte preuve temporelle.',      effect: 'Diminuez à 0.10–0.15 pour les très courts segments (mots isolés, disfluences) qui ne peuvent atteindre 0.20.' },
      { name: 'TIME_EXACT_TOL',     type: 'nombre (s)',   default: '0.05', whenToUse: 'Timestamps ≤ cela apart = correspondance exacte.',  effect: 'Augmentez à 0.5–1.0 si l\'outil arrondit les timestamps à la seconde entière.' },
      { name: 'TIME_FUZZY_TOL',     type: 'nombre (s)',   default: '2.5',  whenToUse: 'Timestamps ≤ cela apart = correspondance floue.',  effect: 'Augmentez quand les annotateurs déplacent significativement les limites des segments.' },
      { name: 'SPLIT_COMBINED_MIN', type: 'nombre (0–1)', default: '0.35', whenToUse: 'Score de texte combiné min pour accepter un SPLIT.',  effect: 'Augmentez pour réduire les faux splits. Diminuez si votre contenu a de très courts segments cibles.' },
      { name: 'MERGE_COMBINED_MIN', type: 'nombre (0–1)', default: '0.65', whenToUse: 'Score de texte combiné min pour accepter un MERGE.',  effect: 'Augmentez pour réduire les faux merges. Diminuez pour les ensembles avec de nombreuses fusions légitimes.' },
      { name: 'CHAR_DIFF_LIMIT', type: 'entier (100–50000)', default: '1500', whenToUse: 'Longueur de caractères combinée max avant de basculer vers un diff au niveau mot.', effect: 'Augmentez pour les lots avec de très longs segments. Diminuez pour forcer les diffs au niveau mot sur tous les segments.' },
    ],
    lowerSimWeak:
      'Scénario courant : les utterances d\'un seul mot (\"Um\", \"Oui\") apparaissent comme ADDED/DELETED au lieu de MODIFIED car leur similarité est inférieure à SIM_WEAK. Diminuez à 0.1–0.2 pour laisser le signal temporel prendre le relais.',
    raiseSimConfident:
      'Augmenter SIM_CONFIDENT réduit les faux positifs dans les transcriptions avec des phrases récurrentes (\"merci\", \"d\'accord\") que le moteur pourrait incorrectement faire correspondre entre segments non liés.',
    timeTol:
      'Certains outils d\'annotation produisent des timestamps arrondis à 0.1s ou 1s. Si le moteur fait souvent des mauvaises correspondances sur des lignes visuellement identiques, essayez TIME_EXACT_TOL à 1.0.',
    splitMergeTol:
      'Ces seuils s\'appliquent après les vérifications de similarité. Si vous voyez de faux splits, essayez de les augmenter à 0.75.',
  },
  footer: {
    info: 'Guide des paramètres · API Structural Diff · Développé par',
    back: '← Retour à la référence API',
  },
}

// ─────────────────── ARABIC ───────────────────
const ar: ParametersGuideI18n = {
  meta: {
    title: 'دليل معاملات الإعداد — Structural Diff API',
    description:
      'دليل تفصيلي لكل خيار إعداد في Structural Diff API: simpleMode وstripDiacritics وpositionalMode وignoreColNames وعتبات الخبراء. مع أمثلة قبل/بعد.',
  },
  breadcrumb: { apiDocs: 'مرجع API', current: 'معاملات الإعداد' },
  nav: {
    backToApiDocs: '← مرجع API',
    onThisPage: 'في هذه الصفحة',
    sectionsBtn: 'الأقسام',
    sections: [
      { id: 'when-to-customize',  title: 'متى تُخصِّص الإعداد' },
      { id: 'simpleMode',         title: 'simpleMode' },
      { id: 'enableSplitsMerges', title: 'enableSplits / enableMerges' },
      { id: 'stripDiacritics',    title: 'stripDiacritics' },
      { id: 'positionalMode',     title: 'positionalMode' },
      { id: 'ignoreColNames',       title: 'ignoreColNames' },
      { id: 'enableInlineDiff',     title: 'enableInlineDiff' },
      { id: 'structuralTransforms', title: 'structuralTransforms' },
      { id: 'expert-thresholds',    title: 'عتبات الخبراء' },
    ],
    guidesLabel: 'الأدلة',
    guides: [
      { label: 'معاملات الإعداد',    slug: 'parameters' },
      { label: 'حالات الـ diff',     slug: 'diff-statuses' },
      { label: 'درس تطبيقي كامل',   slug: 'demo' },
      { label: 'محاكي مباشر',      slug: 'live-demo' },
    ],
  },
  hero: {
    title: 'معاملات الإعداد',
    subtitle: 'اعرف بالضبط أي معامل تُفعِّله ولماذا.',
    intro:
      'الإعداد الافتراضي يعمل جيداً مع معظم النصوص المكتوبة. هذه المعاملات موجودة للتعامل مع سير عمل التدقيق اللغوي المحددة: QA عربي، مقارنة موضعية، استبعاد أعمدة البيانات الوصفية، والتحكم في الكشف الهيكلي. يُظهر كل قسم الفرق الدقيق الذي ينتجه المعامل في النتائج.',
  },
  whenSection: {
    title: 'متى تُخصِّص الإعداد',
    body: 'ابدأ بدون إعداد. شغّل الـ diff وافحص النتائج. استخدم معامل الإعداد فقط عند رؤية مشكلة محددة:',
    useCases: [
      { flag: 'stripDiacritics',    reason: 'النصوص العربية حيث إضافات التشكيل تُضخِّم عدد MODIFIED' },
      { flag: 'simpleMode',         reason: 'QA محتوى فقط — أنت متأكد أن المُدقِّق لم يُجرِ أي تغييرات هيكلية' },
      { flag: 'ignoreColNames',     reason: 'أعمدة البيانات الوصفية (درجة الثقة، الفئة) تختلف بين طبقات QA لكنها ليست هدف المقارنة' },
      { flag: 'positionalMode',     reason: 'تحديد أخطاء المحاذاة غير المتوقعة، أو معالجة مجموعات بيانات كبيرة ومتجانسة' },
      { flag: 'enableSplits: false', reason: 'إرشادات المشروع تحظر التقسيمات في هذه الطبقة' },
      { flag: 'enableInlineDiff: false', reason: 'دفعات كبيرة حيث تكفي الحالات والدرجات فقط — تعطيل حساب diff النص لتحسين الأداء' },
      { flag: 'structuralTransforms', reason: 'الصفوف تحتوي على بادئات معرّف أو روابط أو تنسيقات تختلف بين الطبقات لكنها ليست محتوى النص' },
    ],
  },
  simpleMode: {
    title: 'simpleMode',
    what:
      'بشكل افتراضي، يُشغِّل المحرك خوارزمية محاذاة بـ 8 مراحل تُطابق الصفوف بالتشابه عبر النص الكامل، حتى لو تغيرت مواضعها. simpleMode يُعطِّل هذا: الصف 0 يُقارن بالصف 0، الصف 1 بالصف 1، بالموضع الحرفي.',
    defaultBehavior:
      'الافتراضي (simpleMode: false): يكشف المحرك أن مقطعاً طويلاً قُسِّم إلى مقطعين ويُصنِّفه SPLIT.',
    withFlag:
      'مع simpleMode: true: يقارن المحرك الصف 0 بالصف 0 (يجد تفاوتاً → MODIFIED) ويرى صفاً إضافياً في reworked (→ ADDED). تضيع النية الهيكلية، لكن كل تغيير في الحروف يكون مرئياً.',
    whenToUse:
      'استخدم عندما تكون متأكداً أن المُدقِّق لم يُجرِ أي تغييرات هيكلية — فقط تصحيحات نصية وإملائية. مفيد أيضاً للحصول على diffs حرفية خام بدون تفسير هيكلي.',
    note:
      'simpleMode أسرع على مجموعات البيانات الكبيرة جداً لتخطيه المحاذاة. المقايضة هي أعداد خاطئة من MODIFIED/ADDED/DELETED حيث سيكون SPLIT/MERGED أدق.',
  },
  enableSplitsMerges: {
    title: 'enableSplits / enableMerges',
    intro:
      'بدائل أكثر دقة من simpleMode. بدلاً من تعطيل كل الكشف الهيكلي، يمكنك تعطيل نوع واحد فقط.',
    splits:
      'enableSplits: false — يُعطي مرشحو SPLIT نتائج MODIFIED (تطابق مبتور) + ADDED (صفوف متبقية). مفيد عندما تحظر إرشاداتك التقسيمات.',
    merges:
      'enableMerges: false — يُصبح مرشحو MERGE: MODIFIED (أول صف أصلي) + DELETED (الأصلية الممتصة). مفيد عندما الدمج غير مسموح.',
    whenToUse:
      'هذه المعاملات مفيدة في خطوط QA متعددة الطبقات حيث لكل طبقة عملياتها المسموح بها. تعطيل عملية غير متوقعة يجعل التغييرات الهيكلية غير المصرح بها تظهر كـ ADDED/DELETED متميزة.',
  },
  stripDiacritics: {
    title: 'stripDiacritics',
    what:
      'قبل المقارنة، يُطبِّق المحرك تطبيعاً على الحروف العربية والمعلّمة بإزالة علامات التشكيل. للعربية يشمل هذا الحركات (الفتحة، الكسرة، الضمة، تنوينها)، الشدة، السكون، وأشكال الهمزة (U+064B–U+065F، U+0670). هذا المعامل مُفعَّل افتراضياً.',
    defaultBehavior: 'السلوك الافتراضي (stripDiacritics: true — لا حاجة للإعداد): مرحبا → مرحباً يكون UNCHANGED لأن علامات التشكيل تُحذف قبل المقارنة، مما يجعل الشكلين المجردين متطابقين.',
    withFalse: 'مع stripDiacritics: false (تجاوز): مرحبا → مرحباً يكون MODIFIED لأن علامة ً لم تعد تُحذف — يتم الإبلاغ عن الفروق الحرفية الخام.',
    examples:
      'سيناريو QA عربي شائع: يُطبِّق المُدقِّق التشكيل وفق أدلة الأسلوب للعربية الفصحى. مع السلوك الافتراضي (stripDiacritics: true)، تُحسب فقط الفروق المعجمية وفروق التجزئة.',
    whenToUse:
      'السلوك الافتراضي (true) مناسب لمعظم QA نصوص العربية. تجاوز بـ stripDiacritics: false فقط عند التحقق الصريح من أن المُدقِّق أضاف أو أزال علامات التشكيل بشكل صحيح — أي عندما تكون دقة التشكيل معياراً QA مُتتَّبعاً.',
  },
  positionalMode: {
    title: 'positionalMode',
    what:
      'يتخطى خوارزمية المحاذاة بالتشابه كلياً. كل صف أصلي في الموضع N يُقارن بالصف المُعاد في الموضع N. إذا كانت المصفوفتان بأطوال مختلفة، الصفوف الزائدة تكون ADDED أو DELETED.',
    defaultVsPositional:
      'الافتراضي: إذا صحَّح مُدقِّق جملة وانتقلت من الموضع 4 إلى 6، يُطابقها المحرك (MODIFIED). مع positionalMode، يُقارن الصف 4 من الأصل بالصف 4 من المُعاد — الذي قد يكون جملة مختلفة كلياً.',
    riskNote:
      'positionalMode ينتج نتائج مضللة عند إعادة ترتيب الصفوف. استخدمه فقط عند ضمان عدم إضافة أو حذف أو إعادة ترتيب أي صفوف.',
    whenToUse:
      'مفيد للتحقيق في الأخطاء وللمجموعات المتجانسة جداً حيث المطابقة الموضعية هي الحقيقة الأساسية.',
  },
  ignoreColNames: {
    title: 'ignoreColNames',
    what:
      'مصفوفة من أسماء الأعمدة يجب إقصاؤها من كشف MODIFIED. الصف يكون MODIFIED فقط إذا تغير عمود غير مُقصى. الأعمدة المُقصاة لا تزال في الاستجابة لكنها لا تُطلق MODIFIED.',
    example:
      'سيناريو: بياناتك تحتوي على عمود confidence يُعيِّنه أداة التدقيق. طبقة QA 1 تسجل confidence: 0.88 بينما طبقة QA 2 تسجل confidence: 0.91 لنفس الجملة. بدون ignoreColNames، كل صف كهذا يكون MODIFIED رغم أن النص متطابق.',
    whenToUse:
      'استخدم كلما احتوى مخططك على أعمدة بيانات وصفية تتغير بشكل مستقل عن محتوى النص: درجات الثقة، معرّفات المراجعين، أرقام الدفعات، علامات الفئات، الطوابع الزمنية التلقائية.',
  },
  enableInlineDiff: {
    title: 'enableInlineDiff',
    what:
      'يتحكم في ما إذا كان المحرك يحسب diff حرفياً inline للصفوف MODIFIED. عند التفعيل (افتراضي)، كل صف MODIFIED في الاستجابة يتضمن مصفوفة transcriptDiff يمكنك استخدامها لعرض التغييرات بالتظليل في واجهة المراجعة. تعطيله يتخطى حساب الـ diff كلياً.',
    whenFalse:
      'مع enableInlineDiff: false، صفوف MODIFIED لا تزال تظهر في النتائج (الحالة والملاحظات دون تغيير)، لكن حقل transcriptDiff غائب. استخدم هذا عندما تحتاج فقط إلى أعداد الحالات والدرجات لتقليل حجم الاستجابة.',
    response:
      'كل مقطع transcriptDiff له الشكل { type: "EQUAL" | "INSERT" | "DELETE", text: string }. أعد بناء الأصل بربط كل spans غير-INSERT؛ والمُعاد بربط كل spans غير-DELETE. ملاحظة: قيم type بالأحرف الكبيرة.',
    whenToUse:
      'عطِّل (enableInlineDiff: false) عند معالجة دفعات كبيرة حيث تحتاج فقط إلى درجات CER/WER/SER وأعداد الحالات. هذا يُقلِّل CPU الخادم وحجم payload الشبكة. أعد التفعيل لواجهات المراجعة التفاعلية.',
    note:
      'يستخدم الـ diff خوارزمية LCS (أطول تسلسل مشترك). للمقاطع الطويلة جداً (الطول المشترك الأصل + المُعاد > CHAR_DIFF_LIMIT)، يتحول تلقائياً من مستوى الحرف إلى مستوى الكلمة — مُعاد بنفس تنسيق المصفوفة.',
  },
  structuralTransforms: {
    title: 'structuralTransforms',
    what:
      'مصفوفة من قواعد البحث/الاستبدال تُطبَّق على نص النص قبل تشغيل خوارزمية حساب التشابه. يتيح هذا للمحرك محاذاة الصفوف التي تختلف فقط في بادئات أو تنسيقات متوقعة وغير محتوى (مثل: علامات ID، بادئات URL).',
    schema:
      'كل قاعدة: { find: string, replace: string, isRegex: boolean }. قواعد السلسلة: بحث واستبدال حرفي. قواعد regex (isRegex: true): تدعم بنية regex JavaScript القياسية (غير حساسة لحالة الأحرف). حتى 20 قاعدة لكل طلب.',
    caveat:
      'التحويلات تُطبَّق على حساب التشابه فقط — ليس على البيانات المُعادة في snapData / currData. الصف الذي تغيرت فيه بادئة ID فقط سيظل MODIFIED لأن المحتوى الخام مختلف. التحويلات تضمن المحاذاة الصحيحة، ليس غياب التعديل.',
    example:
      'إزالة بادئات ID: { "find": "^ID-\\\\d+:\\\\s*", "replace": "", "isRegex": true }. إزالة نطاقات URL: { "find": "https?://[^\\\\s]+", "replace": "[URL]", "isRegex": true }.',
    whenToUse:
      'استخدم عندما تتشارك بياناتك الأصلية والمُعادة مخططاً مشتركاً لكن الصفوف تتضمن معرّفات تلقائية أو بادئات دفعات أو تنسيقات غيّرها المُدقِّق. بدون تحويلات، تعامل خوارزمية المحاذاة الصفوف ذات البادئات المختلفة كصفوف مختلفة تماماً.',
  },
  expertThresholds: {
    title: 'عتبات التشابه والتوقيت للخبراء',
    intro:
      'هذه الأرقام السبعة تتحكم في حساسية خوارزمية المطابقة. القيم الافتراضية مُضبَّطة لمقاطع النصوص ذات الطول القياسي (5–30 ثانية، 10–60 كلمة). اضبطها فقط بعد فحص درجات التشابه الخام.',
    params: [
      { name: 'SIM_CONFIDENT',      type: 'رقم (0–1)', default: '0.70', whenToUse: 'صفّان بهذه الدرجة أو أعلى هما تطابق مؤكد — يُعتمد في مرحلة التشابه العالي.',    effect: 'ارفع لمطابقات نصية أكثر دقة. اخفض للمقاطع القصيرة جداً.' },
      { name: 'SIM_MODERATE',       type: 'رقم (0–1)', default: '0.40', whenToUse: 'تطابق محتمل — مقبول عندما يؤكده التوقيت أيضاً.',               effect: 'اخفض إذا كان المُدقِّقون يُعيدون صياغة الجمل بشكل كبير مع الحفاظ على المعنى.' },
      { name: 'SIM_WEAK',           type: 'رقم (0–1)', default: '0.20', whenToUse: 'تطابق تقريبي — مقبول فقط مع دليل زمني قوي جداً.',       effect: 'اخفض إلى 0.10–0.15 للمقاطع القصيرة جداً (كلمات مفردة، تعثرات) التي لا تستطيع بلوغ 0.20.' },
      { name: 'TIME_EXACT_TOL',     type: 'رقم (ث)',   default: '0.05', whenToUse: 'الطوابع الزمنية ≤ هذا الفارق = تطابق دقيق.', effect: 'ارفع إلى 0.5–1.0 إذا كانت الأداة تُقرِّب الطوابع للثانية.' },
      { name: 'TIME_FUZZY_TOL',     type: 'رقم (ث)',   default: '2.5',  whenToUse: 'الطوابع الزمنية ≤ هذا الفارق = تطابق تقريبي.', effect: 'ارفع عند تحريك المُدقِّقين حدود المقطع بشكل كبير.' },
      { name: 'SPLIT_COMBINED_MIN', type: 'رقم (0–1)', default: '0.35', whenToUse: 'الحد الأدنى لدرجة النص المشتركة لقبول SPLIT.',       effect: 'ارفع لتقليل التقسيمات الخاطئة. اخفض إذا كان محتواك يحتوي مقاطع هدف قصيرة جداً.' },
      { name: 'MERGE_COMBINED_MIN', type: 'رقم (0–1)', default: '0.65', whenToUse: 'الحد الأدنى لدرجة النص المشتركة لقبول MERGE.',       effect: 'ارفع لتقليل الدمجات الخاطئة. اخفض لمجموعات البيانات ذات الدمجات المشروعة الكثيرة.' },
      { name: 'CHAR_DIFF_LIMIT', type: 'عدد صحيح (100–50000)', default: '1500', whenToUse: 'أقصى طول حرفي مشترك قبل التحول إلى diff على مستوى الكلمة.', effect: 'ارفع للدفعات ذات المقاطع الطويلة جداً. اخفض لإجبار diffs على مستوى الكلمة لجميع المقاطع لتقليل وقت المعالجة.' },
    ],
    lowerSimWeak:
      'سيناريو شائع: تظهر تعبيرات كلمة واحدة ("آه"، "نعم") كـ ADDED/DELETED بدلاً من MODIFIED لأن تشابهها أقل من SIM_WEAK. اخفض إلى 0.1–0.2 لتُفعِّل الإشارة الزمنية.',
    raiseSimConfident:
      'رفع SIM_CONFIDENT يُقلِّل الإيجابيات الزائفة في النصوص ذات العبارات المتكررة ("شكراً"، "حسناً") التي قد يُطابقها المحرك خطأ بين مقاطع غير مرتبطة.',
    timeTol:
      'بعض أدوات التدقيق تُنتج طوابع زمنية مقرَّبة. إذا رأيت مطابقات خاطئة متكررة لصفوف تبدو متطابقة، جرِّب TIME_EXACT_TOL بقيمة 1.0.',
    splitMergeTol:
      'تنطبق هذه العتبات بعد التحقق من التشابه. إذا رأيت تقسيمات خاطئة حيث صفّان قصيران غير مرتبطين يُضافان إلى صف أصلي طويل، ارفع إلى 0.75.',
  },
  footer: {
    info: 'دليل معاملات الإعداد · Structural Diff API · تطوير',
    back: '← العودة إلى مرجع API',
  },
}

const translations: Record<string, ParametersGuideI18n> = { en, fr, ar }

export function getParametersGuideI18n(locale: string): ParametersGuideI18n {
  return translations[locale] ?? en
}

export type { ParametersGuideI18n }
