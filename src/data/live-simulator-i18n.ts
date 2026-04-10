// Live API Simulator i18n — EN / FR / AR

type LiveSimulatorI18n = {
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
  input: {
    title: string
    originalLabel: string
    reworkedLabel: string
    placeholder: string
    loadSample: string
    upload: string
    rows: string
    invalidJson: string
  }
  auth: {
    title: string
    apiKeyLabel: string
    apiKeyPlaceholder: string
    requestIdLabel: string
    requestIdPlaceholder: string
    note: string
  }
  mapping: {
    title: string
    body: string
    speakerField: string
    transcriptField: string
    transcriptFieldSimple: string
    startTimeField: string
    endTimeField: string
    nseField: string
    emotionField: string
    languageField: string
    localeField: string
    accentField: string
    fileNameField: string
    typeMismatch: string
    optional: string
    extraColsTitle: string
    extraColsBody: string
    allExtra: string
    noneExtra: string
  }
  config: {
    title: string
    body: string
    simpleMode: { label: string; desc: string }
    enableSplits: { label: string; desc: string }
    enableMerges: { label: string; desc: string }
    enableCER: { label: string; desc: string }
    enableTranscriptCER: { label: string; desc: string }
    enableWER: { label: string; desc: string }
    enableTranscriptWER: { label: string; desc: string }
    enableSER: { label: string; desc: string }
    enableComposite: { label: string; desc: string }
    stripDiacritics: { label: string; desc: string }
    positionalMode: { label: string; desc: string }
    enableInlineDiff: { label: string; desc: string }
    serHint: string
    ignoreColNames: { label: string; desc: string; placeholder: string }
    expertTitle: string
    expertBody: string
    SIM_CONFIDENT: { label: string; desc: string }
    SIM_MODERATE: { label: string; desc: string }
    SIM_WEAK: { label: string; desc: string }
    TIME_EXACT_TOL: { label: string; desc: string }
    TIME_FUZZY_TOL: { label: string; desc: string }
    SPLIT_COMBINED_MIN: { label: string; desc: string }
    MERGE_COMBINED_MIN: { label: string; desc: string }
    CHAR_DIFF_LIMIT: { label: string; desc: string }
    transformRules: {
      title: string
      desc: string
      findLabel: string
      findPlaceholder: string
      replaceLabel: string
      replacePlaceholder: string
      regexLabel: string
      addRule: string
      noRules: string
    }
  }
  run: {
    button: string
    running: string
    reset: string
    noOriginal: string
    noReworked: string
    noKey: string
  }
  results: {
    title: string
    summary: string
    traceNote: string
    transcriptDiff: string
    rawJson: string
    scores: string
    columnChanges: string
    column: string
    originalValue: string
    reworkedValue: string
    ignored: string
    spreadsheetNote: string
    rowStatus: string
    notes: string
    legend: string
    changedCell: string
    viewList: string
    viewSheet: string
    splitChildrenLabel: string
    mergedParentsLabel: string
  }
  errors: {
    fetchFailed: string
    parseOriginal: string
    parseReworked: string
  }
  scorePanel: {
    title: string
    composite: string
    overall: string
    transcriptOnly: string
    cer: string
    wer: string
    ser: string
    grade: string
    disabled: string
  }
}

// ──────────────────────── ENGLISH ────────────────────────────────
const en: LiveSimulatorI18n = {
  meta: {
    title: 'API Playground — Structural Diff API',
    description:
      'Interactively test the Structural Diff API. Paste or upload two JSON transcript arrays, configure all parameters, run a real diff, and inspect results row by row with inline diffs and quality scores.',
  },
  breadcrumb: { apiDocs: 'Structural Diff API', current: 'Playground' },
  nav: {
    backToApiDocs: 'Structural Diff API',
    onThisPage: 'On this page',
    sectionsBtn: 'Sections',
    sections: [
      { id: 'data-input',      title: 'Data Input' },
      { id: 'authentication',  title: 'Authentication' },
      { id: 'column-mapping',  title: 'Column Mapping' },
      { id: 'config',          title: 'Config Parameters' },
      { id: 'results',         title: 'Results' },
    ],
    guidesLabel: 'Guides & Examples',
    guides: [
      { label: 'Config Parameters', slug: 'parameters' },
      { label: 'Diff Statuses',     slug: 'diff-statuses' },
      { label: 'Demo Walkthrough',  slug: 'demo' },
      { label: 'Playground',          slug: 'playground' },
    ],
  },
  hero: {
    title: 'API Playground',
    subtitle: 'Run a real diff against the hosted API — no code required.',
    intro:
      'Paste or upload two JSON arrays of transcript rows, configure every parameter, and hit Run. The result is rendered row by row with status pills, inline character diffs, and quality scores — exactly what your internal tool would show after integrating the API.',
  },
  input: {
    title: 'Data Input',
    originalLabel: 'Original',
    reworkedLabel: 'Reworked',
    placeholder: '[ { "speaker": "...", "transcript": "..." }, ... ]',
    loadSample: 'Load sample',
    upload: 'Upload .json',
    rows: 'rows',
    invalidJson: 'invalid JSON',
  },
  auth: {
    title: 'Authentication',
    apiKeyLabel: 'API Key',
    apiKeyPlaceholder: 'Your x-api-key value',
    requestIdLabel: 'Request ID (optional)',
    requestIdPlaceholder: 'e.g. batch-ep12-layer1-layer2',
    note: 'Your key is stored in sessionStorage for this tab only and is never sent anywhere except the API.',
  },
  mapping: {
    title: 'Column Mapping',
    body: 'Each label below is a semantic role — not a required column name. Your column \"author\" can serve as Speaker; \"subtitle_text\" as Transcript. Select the column from your data that fills each role. If your data already uses the role name shown in the first dropdown option, leave the field unset.',
    speakerField: 'Speaker field',
    transcriptField: 'Transcript field',
    transcriptFieldSimple: 'Transcript / ID field',
    startTimeField: 'Start time field',
    endTimeField: 'End time field',
    nseField: 'Non-speech events field',
    emotionField: 'Emotion field',
    languageField: 'Language field',
    localeField: 'Locale field',
    accentField: 'Accent field',
    fileNameField: 'File name field',
    typeMismatch: 'Column values may not match the expected type for this role — double-check the mapping.',
    optional: '(optional)',
    extraColsTitle: 'Additional scored columns',
    extraColsBody: 'These columns are outside the standard schema. Check the ones you want included in the diff and column changes table.',
    allExtra: 'All',
    noneExtra: 'None',
  },
  config: {
    title: 'Config Parameters',
    body: 'All parameters are optional. Defaults work for most transcript QA pipelines.',
    simpleMode: {
      label: 'simpleMode',
      desc: 'Disable SPLIT/MERGE detection. Compare row N to row N strictly by position.',
    },
    enableSplits: {
      label: 'enableSplits',
      desc: 'Detect when one original row was split into multiple reworked rows.',
    },
    enableMerges: {
      label: 'enableMerges',
      desc: 'Detect when multiple original rows were merged into one reworked row.',
    },
    enableCER: {
      label: 'enableCER',
      desc: 'Compute Character Error Rate for MODIFIED rows.',
    },
    enableTranscriptCER: {
      label: 'enableTranscriptCER',
      desc: 'Compute CER on the transcript column only. Gives a more focused view of transcription quality.',
    },
    enableWER: {
      label: 'enableWER',
      desc: 'Compute Word Error Rate for MODIFIED rows.',
    },
    enableTranscriptWER: {
      label: 'enableTranscriptWER',
      desc: 'Compute WER on the transcript column only. Gives a more focused view of transcription quality.',
    },
    enableSER: {
      label: 'enableSER',
      desc: 'Compute Sentence Error Rate across the full comparison.',
    },
    enableComposite: {
      label: 'enableComposite',
      desc: 'Compute the composite quality score — a weighted average of the enabled CER, WER, and SER metrics.',
    },
    stripDiacritics: {
      label: 'stripDiacritics',
      desc: 'Normalize Arabic diacritics before comparison. Prevents inflated MODIFIED counts from harakat changes.',
    },
    positionalMode: {
      label: 'positionalMode',
      desc: 'Match rows by index only. Ignores similarity. Only use if no rows were reordered.',
    },
    enableInlineDiff: {
      label: 'enableInlineDiff',
      desc: 'Include character-level inline diffs for MODIFIED rows.',
    },
    serHint: '⚠ SER requires Split or Merge detection to be enabled.',
    ignoreColNames: {
      label: 'ignoreColNames',
      desc: 'Columns to exclude from MODIFIED detection (comma-separated). Useful for metadata columns like confidence scores.',
      placeholder: 'e.g. confidence, category, reviewer_id',
    },
    expertTitle: 'Expert thresholds',
    expertBody: 'Controls alignment sensitivity. Defaults are calibrated for 5–30 second segments. Only adjust after inspecting raw similarity scores.',
    SIM_CONFIDENT: {
      label: 'SIM_CONFIDENT (0–1)',
      desc: 'Min similarity for a certain match. Default 0.75.',
    },
    SIM_MODERATE: {
      label: 'SIM_MODERATE (0–1)',
      desc: 'Plausible match requiring time confirmation. Default 0.50.',
    },
    SIM_WEAK: {
      label: 'SIM_WEAK (0–1)',
      desc: 'Tentative match accepted with strong time signal. Default 0.30.',
    },
    TIME_EXACT_TOL: {
      label: 'TIME_EXACT_TOL (seconds)',
      desc: 'Timestamps ≤ this apart are treated as exact. Default 1.0.',
    },
    TIME_FUZZY_TOL: {
      label: 'TIME_FUZZY_TOL (seconds)',
      desc: 'Max timestamp gap to still consider a fuzzy time match. Default 2.5.',
    },
    SPLIT_COMBINED_MIN: {
      label: 'SPLIT_COMBINED_MIN (0–1)',
      desc: 'Min combined score to accept a SPLIT candidate. Default 0.35.',
    },
    MERGE_COMBINED_MIN: {
      label: 'MERGE_COMBINED_MIN (0–1)',
      desc: 'Min combined score to accept a MERGE candidate. Default 0.65.',
    },
    CHAR_DIFF_LIMIT: {
      label: 'CHAR_DIFF_LIMIT (chars)',
      desc: 'Max combined text length before char-level diff falls back to word-level. Raise for long paragraphs. Default 1500.',
    },
    transformRules: {
      title: 'Transform Rules',
      desc: 'Apply find/replace rules to both sides before comparison. Useful for stripping URL prefixes, normalising formatting, or removing filler words.',
      findLabel: 'Find',
      findPlaceholder: 'e.g. https://example.com/',
      replaceLabel: 'Replace',
      replacePlaceholder: '(leave blank to delete)',
      regexLabel: 'Regex',
      addRule: '+ Add rule',
      noRules: 'No rules yet.',
    },
  },
  run: {
    button: 'Run Diff →',
    running: 'Running…',
    reset: 'Reset',
    noOriginal: 'Paste or upload Original JSON first.',
    noReworked: 'Paste or upload Reworked JSON first.',
    noKey: 'Enter your API key to continue.',
  },
  results: {
    title: 'Results',
    summary: 'Summary',
    traceNote: 'SPLIT parent rows show their resulting child rows below. MERGED result rows show their absorbed parent rows below.',
    splitChildrenLabel: 'Resulting child rows',
    mergedParentsLabel: 'Original parent rows',
    transcriptDiff: 'Transcript diff',
    rawJson: 'Raw JSON',
    scores: 'Quality scores',
    columnChanges: 'Column changes',
    column: 'Column',
    originalValue: 'Original',
    reworkedValue: 'Reworked',
    ignored: 'ignored',
    spreadsheetNote: 'Cells highlighted in amber changed. SPLIT parent rows are replaced by ↳ child rows shown below. MERGED rows show ↑ absorbed parent rows below. DELETED rows are shown with strikethrough.',
    rowStatus: 'Row_Status',
    notes: 'Notes',
    legend: 'Legend',
    changedCell: 'Changed cell',
    viewList: 'List view',
    viewSheet: 'Spreadsheet view',
  },
  errors: {
    fetchFailed: 'API request failed. Check your key, service status, and try again.',
    parseOriginal: 'Original JSON is invalid. Must be a JSON array of objects.',
    parseReworked: 'Reworked JSON is invalid. Must be a JSON array of objects.',
  },
  scorePanel: {
    title: 'Quality Scores',
    composite: 'Composite Score',
    overall: 'Overall (all columns)',
    transcriptOnly: 'Transcript only',
    cer: 'CER',
    wer: 'WER',
    ser: 'SER',
    grade: 'Grade',
    disabled: '—',
  },
}

// ──────────────────────── FRENCH ─────────────────────────────────
const fr: LiveSimulatorI18n = {
  meta: {
    title: 'Playground API — Structural Diff API',
    description:
      'Testez interactivement l\'API Structural Diff. Collez ou importez deux tableaux JSON de transcriptions, configurez tous les paramètres, lancez un vrai diff et inspectez les résultats ligne par ligne.',
  },
  breadcrumb: { apiDocs: 'API Structural Diff', current: 'Playground' },
  nav: {
    backToApiDocs: 'API Structural Diff',
    onThisPage: 'Sur cette page',
    sectionsBtn: 'Sections',
    sections: [
      { id: 'data-input',      title: 'Données d\'entrée' },
      { id: 'authentication',  title: 'Authentification' },
      { id: 'column-mapping',  title: 'Mappage des colonnes' },
      { id: 'config',          title: 'Paramètres de config' },
      { id: 'results',         title: 'Résultats' },
    ],
    guidesLabel: 'Guides & Exemples',
    guides: [
      { label: 'Paramètres de configuration', slug: 'parameters' },
      { label: 'Statuts de diff',             slug: 'diff-statuses' },
      { label: 'Démonstration complète',       slug: 'demo' },
      { label: 'Playground',                  slug: 'playground' },
    ],
  },
  hero: {
    title: 'Playground API',
    subtitle: 'Exécutez un vrai diff contre l\'API hébergée — sans code.',
    intro:
      'Collez ou importez deux tableaux JSON de lignes de transcription, configurez chaque paramètre et cliquez sur Lancer. Le résultat est rendu ligne par ligne avec des indicateurs de statut, des diffs de caractères en ligne et des scores de qualité.',
  },
  input: {
    title: 'Données d\'entrée',
    originalLabel: 'Original',
    reworkedLabel: 'Retravaillé',
    placeholder: '[ { "speaker": "...", "transcript": "..." }, ... ]',
    loadSample: 'Charger un exemple',
    upload: 'Importer .json',
    rows: 'lignes',
    invalidJson: 'JSON invalide',
  },
  auth: {
    title: 'Authentification',
    apiKeyLabel: 'Clé API',
    apiKeyPlaceholder: 'Votre valeur x-api-key',
    requestIdLabel: 'ID de requête (facultatif)',
    requestIdPlaceholder: 'ex. batch-ep12-layer1-layer2',
    note: 'Votre clé est stockée dans sessionStorage pour cet onglet uniquement et n\'est jamais envoyée ailleurs qu\'à l\'API.',
  },
  mapping: {
    title: 'Mappage des colonnes',
    body: 'Chaque libellé ci-dessous est un rôle sémantique — pas un nom de colonne obligatoire. Votre colonne \"auteur\" peut remplir le rôle Speaker ; \"texte_sous-titre\" peut être Transcript. Sélectionnez la colonne correspondante dans vos données. Si vos données utilisent déjà le nom par défaut du rôle (affiché dans le menu), laissez le champ vide.',
    speakerField: 'Champ locuteur',
    transcriptField: 'Champ transcription',
    transcriptFieldSimple: 'Transcription / ID',
    startTimeField: 'Champ heure début',
    endTimeField: 'Champ heure fin',
    nseField: 'Champ \u00e9v\u00e9nements non verbaux',
    emotionField: 'Champ \u00e9motion',
    languageField: 'Champ langue',
    localeField: 'Champ locale',
    accentField: 'Champ accent',
    fileNameField: 'Champ nom de fichier',
    typeMismatch: 'Les valeurs de cette colonne peuvent ne pas correspondre au type attendu pour ce rôle — vérifiez le mappage.',
    optional: '(facultatif)',
    extraColsTitle: 'Colonnes suppl\u00e9mentaires scor\u00e9es',
    extraColsBody: 'Ces colonnes se trouvent hors du sch\u00e9ma standard. Cochez celles \u00e0 inclure dans le diff et le tableau des modifications.',
    allExtra: 'Tout',
    noneExtra: 'Aucun',
  },
  config: {
    title: 'Paramètres de configuration',
    body: 'Tous les paramètres sont facultatifs. Les valeurs par défaut conviennent à la plupart des pipelines QA de transcription.',
    simpleMode: {
      label: 'simpleMode',
      desc: 'Désactive la détection SPLIT/MERGE. Compare la ligne N à la ligne N strictement par position.',
    },
    enableSplits: {
      label: 'enableSplits',
      desc: 'Détecte quand une ligne originale a été divisée en plusieurs lignes retravaillées.',
    },
    enableMerges: {
      label: 'enableMerges',
      desc: 'Détecte quand plusieurs lignes originales ont été fusionnées en une seule ligne retravaillée.',
    },
    enableCER: { label: 'enableCER', desc: 'Calcule le taux d\'erreur par caractère (CER) pour les lignes MODIFIED.' },
    enableTranscriptCER: { label: 'enableTranscriptCER', desc: 'Calcule le CER sur la colonne de transcription uniquement. Donne une vue plus ciblée de la qualité de transcription.' },
    enableWER: { label: 'enableWER', desc: 'Calcule le taux d\'erreur par mot (WER) pour les lignes MODIFIED.' },
    enableTranscriptWER: { label: 'enableTranscriptWER', desc: 'Calcule le WER sur la colonne de transcription uniquement. Donne une vue plus ciblée de la qualité de transcription.' },
    enableSER: { label: 'enableSER', desc: 'Calcule le taux d\'erreur par phrase (SER) sur l\'ensemble de la comparaison.' },
    enableComposite: { label: 'enableComposite', desc: 'Calcule le score composite — une moyenne pondérée des métriques CER, WER et SER activées.' },
    stripDiacritics: {
      label: 'stripDiacritics',
      desc: 'Normalise les diacritiques arabes avant la comparaison. Évite les comptes MODIFIED gonflés par les harakat.',
    },
    positionalMode: {
      label: 'positionalMode',
      desc: 'Fait correspondre les lignes par index uniquement. Ignores la similarité. N\'utilisez que si aucune ligne n\'a été réordonnée.',
    },
    enableInlineDiff: {
      label: 'enableInlineDiff',
      desc: 'Inclure les diffs de caractères en ligne pour les lignes MODIFIED.',
    },
    serHint: '⚠ SER nécessite que Split ou Merge soit activé.',
    ignoreColNames: {
      label: 'ignoreColNames',
      desc: 'Colonnes à exclure de la détection MODIFIED (séparées par virgule). Utile pour les colonnes de métadonnées.',
      placeholder: 'ex. confidence, category, reviewer_id',
    },
    expertTitle: 'Seuils experts',
    expertBody: 'Contrôle la sensibilité de l\'alignement. Valeurs par défaut calibrées pour des segments de 5 à 30 secondes.',
    SIM_CONFIDENT: { label: 'SIM_CONFIDENT (0–1)', desc: 'Similarité min pour une correspondance certaine. Défaut : 0,75.' },
    SIM_MODERATE:  { label: 'SIM_MODERATE (0–1)',  desc: 'Correspondance plausible nécessitant la confirmation temporelle. Défaut : 0,50.' },
    SIM_WEAK:      { label: 'SIM_WEAK (0–1)',       desc: 'Correspondance tentative acceptée avec fort signal temporel. Défaut : 0,30.' },
    TIME_EXACT_TOL: { label: 'TIME_EXACT_TOL (s)',  desc: 'Timestamps ≤ cela apart = correspondance exacte. Défaut : 1,0.' },
    TIME_FUZZY_TOL: { label: 'TIME_FUZZY_TOL (s)',  desc: 'Écart max pour une correspondance temporelle floue. Défaut : 2,5.' },
    SPLIT_COMBINED_MIN: { label: 'SPLIT_COMBINED_MIN (0–1)', desc: 'Score combiné min pour accepter un candidat SPLIT. Défaut : 0,35.' },
    MERGE_COMBINED_MIN: { label: 'MERGE_COMBINED_MIN (0–1)', desc: 'Score combiné min pour accepter un candidat MERGE. Défaut : 0,65.' },    CHAR_DIFF_LIMIT: {
      label: 'CHAR_DIFF_LIMIT (car.)',
      desc: 'Longueur combinée max avant de passer du diff caractère au diff mot. Augmentez pour les longs paragraphes. Défaut : 1500.',
    },
    transformRules: {
      title: 'Règles de transformation',
      desc: 'Appliquez des règles find/replace sur les deux côtés avant la comparaison. Utile pour retirer des préfixes URL, normaliser la mise en forme ou supprimer des mots de remplissage.',
      findLabel: 'Chercher',
      findPlaceholder: 'ex. https://example.com/',
      replaceLabel: 'Remplacer',
      replacePlaceholder: '(laisser vide pour supprimer)',
      regexLabel: 'Regex',
      addRule: '+ Ajouter une règle',
      noRules: 'Aucune règle.',
    },  },
  run: {
    button: 'Lancer le Diff →',
    running: 'En cours…',
    reset: 'Réinitialiser',
    noOriginal: 'Collez ou importez d\'abord le JSON Original.',
    noReworked: 'Collez ou importez d\'abord le JSON Retravaillé.',
    noKey: 'Entrez votre clé API pour continuer.',
  },
  results: {
    title: 'Résultats',
    summary: 'Résumé',
    traceNote: 'Les lignes parentes SPLIT affichent leurs lignes enfants résultantes en dessous. Les lignes résultantes MERGED affichent leurs lignes parentes absorbées en dessous.',
    transcriptDiff: 'Diff de transcription',
    rawJson: 'JSON brut',
    scores: 'Scores de qualité',
    columnChanges: 'Modifications par colonne',
    column: 'Colonne',
    originalValue: 'Original',
    reworkedValue: 'Retravaillé',
    ignored: 'ignoré',
    spreadsheetNote: 'Cellules amberées = modifiées. Les lignes SPLIT sont remplacées par ↳ lignes enfants en dessous. Les lignes MERGED affichent ↑ les lignes parentes originales. Les lignes DELETED sont barrées.',
    rowStatus: 'Row_Status',
    notes: 'Notes',
    legend: 'Légende',
    changedCell: 'Cellule modifiée',
    viewList: 'Vue liste',
    viewSheet: 'Vue tableur',
    splitChildrenLabel: 'Lignes enfants résultantes',
    mergedParentsLabel: 'Lignes parentes originales',
  },
  errors: {
    fetchFailed: 'La requête API a échoué. Vérifiez votre clé, l\'état du service et réessayez.',
    parseOriginal: 'Le JSON Original est invalide. Doit être un tableau JSON d\'objets.',
    parseReworked: 'Le JSON Retravaillé est invalide. Doit être un tableau JSON d\'objets.',
  },
  scorePanel: {
    title: 'Scores de qualité',
    composite: 'Score composite',
    overall: 'Global (toutes colonnes)',
    transcriptOnly: 'Transcription uniquement',
    cer: 'CER',
    wer: 'WER',
    ser: 'SER',
    grade: 'Note',
    disabled: '—',
  },
}

// ──────────────────────── ARABIC ─────────────────────────────────
const ar: LiveSimulatorI18n = {
  meta: {
    title: 'Playground API — Structural Diff API',
    description:
      'اختبر Structural Diff API بشكل تفاعلي. الصق أو أرفع مصفوفتي JSON لنصوص مكتوبة، وضبط جميع المعاملات، وشغّل diff حقيقياً وافحص النتائج صفاً بصف.',
  },
  breadcrumb: { apiDocs: 'Structural Diff API', current: 'Playground' },
  nav: {
    backToApiDocs: 'Structural Diff API',
    onThisPage: 'في هذه الصفحة',
    sectionsBtn: 'الأقسام',
    sections: [
      { id: 'data-input',      title: 'البيانات المُدخَلة' },
      { id: 'authentication',  title: 'المصادقة' },
      { id: 'column-mapping',  title: 'ربط الأعمدة' },
      { id: 'config',          title: 'معاملات الإعداد' },
      { id: 'results',         title: 'النتائج' },
    ],
    guidesLabel: 'الأدلة والأمثلة',
    guides: [
      { label: 'معاملات الإعداد',  slug: 'parameters' },
      { label: 'حالات الـ diff',   slug: 'diff-statuses' },
      { label: 'درس تطبيقي كامل', slug: 'demo' },
      { label: 'Playground',        slug: 'playground' },
    ],
  },
  hero: {
    title: 'Playground API',
    subtitle: 'شغّل diff حقيقياً مع الـ API المستضاف — دون كتابة كود.',
    intro:
      'الصق أو أرفع مصفوفتي JSON لصفوف النص المكتوب، وضبط كل معامل، ثم اضغط تشغيل. تُعرض النتائج صفاً بصف مع حالات ملونة ودiffs للأحرف في السطر ودرجات الجودة — تماماً كما سيُظهر أداتك الداخلية بعد دمج الـ API.',
  },
  input: {
    title: 'البيانات المُدخَلة',
    originalLabel: 'الأصلي',
    reworkedLabel: 'المُعاد',
    placeholder: '[ { "speaker": "...", "transcript": "..." }, ... ]',
    loadSample: 'تحميل مثال',
    upload: 'رفع .json',
    rows: 'صفوف',
    invalidJson: 'JSON غير صالح',
  },
  auth: {
    title: 'المصادقة',
    apiKeyLabel: 'مفتاح API',
    apiKeyPlaceholder: 'قيمة x-api-key الخاصة بك',
    requestIdLabel: 'معرّف الطلب (اختياري)',
    requestIdPlaceholder: 'مثلاً: batch-ep12-layer1-layer2',
    note: 'يُخزَّن مفتاحك في sessionStorage لهذا التبويب فقط ولا يُرسَل إلى أي مكان غير الـ API.',
  },
  mapping: {
    title: 'ربط الأعمدة',
    body: 'كل تسمية أدناه تمثّل دوراً وظيفياً — وليست اسماً إلزامياً للعمود. عمودك المسمى "المؤلف" يمكن أن يؤدي دور Speaker، و"النص_الفرعي" يمكن أن يكون Transcript. اختر العمود المقابل من بياناتك. إن كانت بياناتك تستخدم اسم الدور الافتراضي الظاهر في أول خيار بالقائمة، فاتركه فارغاً.',
    speakerField: 'حقل المتحدث',
    transcriptField: 'حقل النص',
    transcriptFieldSimple: 'النص / المعرّف',
    startTimeField: 'حقل وقت البدء',
    endTimeField: 'حقل وقت الانتهاء',
    nseField: 'حقل الأحداث غير الكلامية',
    emotionField: 'حقل المشاعر',
    languageField: 'حقل اللغة',
    localeField: 'حقل اللهجة',
    accentField: 'حقل اللكنة',
    fileNameField: 'حقل اسم الملف',
    typeMismatch: 'قد لا تتطابق قيم هذا العمود مع النوع المتوقع لهذا الدور — راجع الربط.',
    optional: '(اختياري)',
    extraColsTitle: 'أعمدة إضافية مُسجَّلة',
    extraColsBody: 'هذه الأعمدة خارج المخطط القياسي. حدد ما تريد تضمينه في الـ diff وجدول التغييرات.',
    allExtra: 'الكل',
    noneExtra: 'لا شيء',
  },
  config: {
    title: 'معاملات الإعداد',
    body: 'جميع المعاملات اختيارية. الإعدادات الافتراضية مناسبة لمعظم خطوط QA.',
    simpleMode: {
      label: 'simpleMode',
      desc: 'تعطيل كشف SPLIT/MERGE. قارن الصف N بالصف N حسب الموضع فقط.',
    },
    enableSplits: {
      label: 'enableSplits',
      desc: 'اكتشف متى قُسِّم صف أصلي واحد إلى عدة صفوف مُعادة.',
    },
    enableMerges: {
      label: 'enableMerges',
      desc: 'اكتشف متى دُمِجت عدة صفوف أصلية في صف مُعاد واحد.',
    },
    enableCER: { label: 'enableCER', desc: 'احسب معدل خطأ الأحرف (CER) للصفوف MODIFIED.' },
    enableTranscriptCER: { label: 'enableTranscriptCER', desc: 'احسب CER على عمود النص فقط. يعطي رؤية أكثر تركيزاً لجودة النص.' },
    enableWER: { label: 'enableWER', desc: 'احسب معدل خطأ الكلمات (WER) للصفوف MODIFIED.' },
    enableTranscriptWER: { label: 'enableTranscriptWER', desc: 'احسب WER على عمود النص فقط. يعطي رؤية أكثر تركيزاً لجودة النص.' },
    enableSER: { label: 'enableSER', desc: 'احسب معدل خطأ الجمل (SER) عبر المقارنة الكاملة.' },
    enableComposite: { label: 'enableComposite', desc: 'احسب درجة الجودة المركّبة — متوسط موزّن من مقاييس CER وWER وSER المُفَعَّلة.' },
    stripDiacritics: {
      label: 'stripDiacritics',
      desc: 'تطبيع التشكيل العربي قبل المقارنة. يمنع تضخم عدد MODIFIED بسبب تغييرات الحركات.',
    },
    positionalMode: {
      label: 'positionalMode',
      desc: 'مطابقة الصفوف بالفهرس فقط. يتجاهل التشابه. استخدمه فقط إذا لم تُعاد ترتيب أي صفوف.',
    },
    enableInlineDiff: {
      label: 'enableInlineDiff',
      desc: 'تضمين diffs الأحرف المضمنة لصفوف MODIFIED.',
    },
    serHint: '⚠ يتطلب SER تفعيل كشف Split أو Merge.',
    ignoreColNames: {
      label: 'ignoreColNames',
      desc: 'أعمدة لاستبعادها من كشف MODIFIED (مفصولة بفواصل). مفيد لأعمدة بيانات التعريف.',
      placeholder: 'مثلاً: confidence, category, reviewer_id',
    },
    expertTitle: 'عتبات خبراء',
    expertBody: 'يتحكم في حساسية المحاذاة. القيم الافتراضية مُعايَرة لمقاطع من 5 إلى 30 ثانية.',
    SIM_CONFIDENT: { label: 'SIM_CONFIDENT (0–1)', desc: 'أدنى تشابه لمطابقة مؤكدة. الافتراضي: 0.75.' },
    SIM_MODERATE:  { label: 'SIM_MODERATE (0–1)',  desc: 'مطابقة محتملة تتطلب تأكيداً زمنياً. الافتراضي: 0.50.' },
    SIM_WEAK:      { label: 'SIM_WEAK (0–1)',       desc: 'مطابقة مؤقتة تُقبل مع إشارة زمنية قوية. الافتراضي: 0.30.' },
    TIME_EXACT_TOL: { label: 'TIME_EXACT_TOL (ثانية)', desc: 'الطوابع الزمنية التي تفصلها ≤ هذه = مطابقة دقيقة. الافتراضي: 1.0.' },
    TIME_FUZZY_TOL: { label: 'TIME_FUZZY_TOL (ثانية)', desc: 'أقصى فجوة زمنية لمطابقة زمنية تقريبية. الافتراضي: 2.5.' },
    SPLIT_COMBINED_MIN: { label: 'SPLIT_COMBINED_MIN (0–1)', desc: 'أدنى درجة مجمعة لقبول مرشح SPLIT. الافتراضي: 0.35.' },
    MERGE_COMBINED_MIN: { label: 'MERGE_COMBINED_MIN (0–1)', desc: 'أدنى درجة مجمعة لقبول مرشح MERGE. الافتراضي: 0.65.' },
    CHAR_DIFF_LIMIT: {
      label: 'CHAR_DIFF_LIMIT (حرف)',
      desc: 'أقصى طول نص مجمع قبل التحول من diff الأحرف إلى diff الكلمات. ارفعه للفقرات الطويلة. الافتراضي: 1500.',
    },
    transformRules: {
      title: 'قواعد التحويل',
      desc: 'طبّق قواعد بحث واستبدال على الجانبين قبل المقارنة. مفيد لإزالة بادئات URL أو توحيد التنسيق أو حذف كلمات الحشو.',
      findLabel: 'بحث',
      findPlaceholder: 'مثلاً: https://example.com/',
      replaceLabel: 'استبدال',
      replacePlaceholder: '(اتركه فارغاً للحذف)',
      regexLabel: 'Regex',
      addRule: '+ إضافة قاعدة',
      noRules: 'لا توجد قواعد بعد.',
    },
  },
  run: {
    button: 'تشغيل Diff ←',
    running: 'جارٍ التنفيذ…',
    reset: 'إعادة ضبط',
    noOriginal: 'الصق أو أرفع JSON الأصلي أولاً.',
    noReworked: 'الصق أو أرفع JSON المُعاد أولاً.',
    noKey: 'أدخل مفتاح API للمتابعة.',
  },
  results: {
    title: 'النتائج',
    summary: 'ملخص',
    traceNote: 'صفوف SPLIT تعرض صفوفها الفرعية الناتجة أسفلها. صفوف MERGED تعرض صفوفها الأصلية المدمجة أسفلها.',
    transcriptDiff: 'diff النص',
    rawJson: 'JSON الخام',
    scores: 'درجات الجودة',
    columnChanges: 'تغييرات الأعمدة',
    column: 'العمود',
    originalValue: 'الأصلي',
    reworkedValue: 'المُعاد',
    ignored: 'مُتجاهل',
    spreadsheetNote: 'الخلايا العنبرية = تغيّرت. صفوف SPLIT تظهر صفوفها الفرعية بالأسفل. صفوف MERGED تظهر الصفوف الأصلية المدمجة بالأسفل. صفوف DELETED تظهر بخط شطب.',
    rowStatus: 'حالة_الصف',
    notes: 'ملاحظات',
    legend: 'المفتاح',
    changedCell: 'خلية مُعدَّلة',
    viewList: 'عرض القائمة',
    viewSheet: 'عرض الجدول',
    splitChildrenLabel: 'الصفوف الفرعية الناتجة',
    mergedParentsLabel: 'الصفوف الأصلية المدمجة',
  },
  errors: {
    fetchFailed: 'فشل طلب API. تحقق من مفتاحك وحالة الخدمة وأعد المحاولة.',
    parseOriginal: 'JSON الأصلي غير صالح. يجب أن يكون مصفوفة JSON من الكائنات.',
    parseReworked: 'JSON المُعاد غير صالح. يجب أن يكون مصفوفة JSON من الكائنات.',
  },
  scorePanel: {
    title: 'درجات الجودة',
    composite: 'الدرجة المركّبة',
    overall: 'الكلي (جميع الأعمدة)',
    transcriptOnly: 'النص فقط',
    cer: 'CER',
    wer: 'WER',
    ser: 'SER',
    grade: 'التقييم',
    disabled: '—',
  },
}

// ── Export ────────────────────────────────────────────────
export function getLiveSimulatorI18n(locale: string): LiveSimulatorI18n {
  if (locale === 'fr') return fr
  if (locale === 'ar') return ar
  return en
}
