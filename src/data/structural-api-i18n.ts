// Structural Diff API docs — i18n for EN / FR / AR

type LinkedDesc = { pre: string; linkLabel: string; post: string }
type DescItem = string | LinkedDesc

type StructuralApiI18n = {
  meta: {
    title: string
    description: string
  }
  nav: {
    groups: Array<{ label: string; items: string[] }>
    backToAddon: string
    sectionsBtn: string
    onThisPage: string
    guidesLabel: string
    guides: Array<{ label: string; slug: string }>
  }
  breadcrumb: {
    parent: string
    current: string
  }
  hero: {
    title: string
    desc: string
    features: Array<{ label: string; sub: string }>
  }
  quickStart: {
    title: string
    desc: string
    step1: string
    step2: string
  }
  baseUrl: {
    title: string
    desc: string
  }
  auth: {
    title: string
    desc: string
    callout: string
  }
  rateLimits: {
    title: string
    desc: string
    headers: { tier: string; limit: string; responseHeader: string }
    rows: Array<{ tier: string; limit: string }>
  }
  endpoints: {
    title: string
    getHealthDesc: string
    noAuth: string
    postDiffDesc: string
    authRequired: string
  }
  request: {
    title: string
    params: DescItem[]
    rowFieldsTitle: string
    rowFieldsNote: string
    rowFields: string[]
  }
  response: {
    title: string
    desc: string
    diffStatusesTitle: string
    headers: { status: string; meaning: string }
    statuses: {
      UNCHANGED: string
      MODIFIED: string
      ADDED: string
      DELETED: string
      SPLIT: string
      MERGED: string
    }
    scoresTitle: string
    scores: string[]
    compositeTitle: string
    composite: string[]
    metaTitle: string
    meta: string[]
  }
  config: {
    title: string
    desc: string
    params: string[]
    expertTitle: string
    expertDesc: string
    expertParams: string[]
  }
  columnMapping: {
    title: string
    desc: string
    params: string[]
  }
  errors: {
    title: string
    desc: string
    headers: { http: string; code: string; cause: string }
    causes: string[]
  }
  tracing: {
    title: string
    desc: string
  }
  access: {
    title: string
    desc: string
    requestBtn: string
    viewAddonBtn: string
  }
  footer: {
    info: string
    back: string
    privacy: string
    terms: string
  }
  privacy: {
    title: string
    productLine: string
    lastUpdated: string
    backTo: string
    sections: { heading: string; content: string }[]
  }
  terms: {
    title: string
    productLine: string
    lastUpdated: string
    backTo: string
    sections: { heading: string; content: string }[]
  }
}

// ────────────────────── ENGLISH ──────────────────────
const en: StructuralApiI18n = {
  meta: {
    title: 'Structural Diff API Docs — SheetDiff™',
    description:
      'REST API for structural diff comparison of transcript rows. Detects modified, split, merged, added, and deleted rows with CER/WER/SegER/SER/SACR quality scoring. Built for localization and transcription agencies.',
  },
  nav: {
    groups: [
      { label: 'Getting Started',          items: ['Overview', 'Quick Start', 'Base URL'] },
      { label: 'Authentication & Limits',  items: ['Authentication', 'Rate Limits'] },
      { label: 'API Reference',            items: ['Endpoints', 'Request Body', 'Response Shape', 'Config Options', 'Column Mapping'] },
      { label: 'Errors & Tracing',         items: ['Error Reference', 'Request Tracing'] },
      { label: 'Access',                   items: ['Get API Access'] },
    ],
    backToAddon: '← Google Sheets Add-on',
    sectionsBtn: 'Sections',
    onThisPage: 'On this page',
    guidesLabel: 'Guides & Examples',
    guides: [
      { label: 'Config Parameters', slug: 'parameters' },
      { label: 'Diff Statuses',     slug: 'diff-statuses' },
      { label: 'Demo Walkthrough',  slug: 'demo' },
      { label: 'Playground',         slug: 'playground' },
    ],
  },
  breadcrumb: {
    parent: 'SheetDiff™',
    current: 'Structural Diff API',
  },
  hero: {
    title: 'Structural Diff API',
    desc: 'A REST API that compares an AI-generated transcript against its annotator post-edit — detecting row-level structural changes (splits, merges, modifications, additions, deletions), with per-column diff detail, CER/WER/SegER/SER/SACR scoring, and a composite quality grade per batch.',
    features: [
      { label: 'API Key Auth',   sub: 'x-api-key header' },
      { label: 'Rate Limited',   sub: '10/min · 60/15min' },
      { label: 'JSON REST',      sub: 'application/json' },
      { label: '8-Pass Engine',  sub: 'split + merge detection' },
    ],
  },
  quickStart: {
    title: 'Quick Start',
    desc: 'No SDK needed. Send a POST request with your two arrays of transcript rows and receive a full diff in JSON. The API is in tasting phase — request an API key to get started.',
    step1: '1. Verify the service is live:',
    step2: '2. Run a comparison:',
  },
  baseUrl: {
    title: 'Base URL',
    desc: 'All endpoints are prefixed with /v1.',
  },
  auth: {
    title: 'Authentication',
    desc: 'Include your API key in the x-api-key request header on every call to /v1/diff.',
    callout: 'Keys are provisioned individually per agency. A missing or invalid key returns 401 Unauthorized.',
  },
  rateLimits: {
    title: 'Rate Limits',
    desc: 'Two independent tiers are enforced per API key, falling back to IP when no key is present. Exceeding either tier returns 429 Too Many Requests.',
    headers: { tier: 'Tier', limit: 'Limit', responseHeader: 'Response header' },
    rows: [
      { tier: 'Burst',  limit: '10 requests / minute' },
      { tier: 'Window', limit: '60 requests / 15 minutes' },
    ],
  },
  endpoints: {
    title: 'Endpoints',
    getHealthDesc: 'Lightweight liveness probe. No authentication required. Returns service version and uptime.',
    noAuth: '· No auth',
    postDiffDesc: 'Compare two arrays of transcript rows. Returns row-level results with quality scores. Max payload: 5 MB · Max rows: 30,000.',
    authRequired: 'Auth required',
  },
  request: {
    title: 'Request Body',
    params: [
      'Row objects from the baseline / original version.',
      'Row objects to compare against.',
      { pre: 'Optional algorithm overrides. See', linkLabel: 'Config Options', post: '.' },
      'Column names — required when using 2-D array input.',
      { pre: 'Column index map for 2-D array input. See', linkLabel: 'Column Mapping', post: '.' },
    ],
    rowFieldsTitle: 'Row object fields',
    rowFieldsNote: 'All fields are optional except transcript. Unknown fields are passed through unchanged.',
    rowFields: [
      'The text content of the row.',
      'Speaker name or ID.',
      'Segment start time in seconds.',
      'Segment end time in seconds.',
      'Annotations such as [music], [laughter].',
      'Emotion label.',
      'Language code (e.g. "en", "ar").',
      'Locale code (e.g. "en-US").',
      'Accent tag.',
      'Source file name. Pass-through only — not used by the diff algorithm.',
    ],
  },
  response: {
    title: 'Response Shape',
    desc: 'All successful responses use this envelope:',
    diffStatusesTitle: 'Diff statuses',
    headers: { status: 'Status', meaning: 'Meaning' },
    statuses: {
      UNCHANGED: 'Row is identical in both versions.',
      MODIFIED:  'Row exists in both versions but content changed.',
      ADDED:     'Row is only present in the reworked version.',
      DELETED:   'Row is only present in the original version.',
      SPLIT:     'One original row was divided into two or more reworked rows.',
      MERGED:    'Two or more original rows were combined into one reworked row.',
    },
    scoresTitle: 'Scores',
    scores: [
      'Character Error Rate across all columns (0–1, lower is better).',
      'Word Error Rate across all columns (0–1).',
      'Segmentation Error Rate — boundary events (splits, merges, added and deleted rows) / expected segment count (0–1, lower is better).',
      'CER computed on the transcript column only.',
      'WER computed on the transcript column only.',
      'Sentence Error Rate — MODIFIED rows / (UNCHANGED + MODIFIED). Fraction of comparable rows with any edit (0–1).',
      'SER computed on sentences within the transcript column text.',
      'Speaker Attribution Change Rate — speaker-changed rows / MODIFIED rows. null when no speaker column is detected.',
    ],
    compositeTitle: 'Composite grade',
    composite: [
      'Numeric score (1.0–5.0, higher is better) averaged across enabled metrics.',
      'Human-readable label — one of: "Excellent", "Good", "Acceptable", "Below Average", "Poor", "Unacceptable".',
      'Average error percentage across the enabled scoring metrics.',
      'Array of metric names that contributed to this composite (e.g. ["CER", "WER", "SegER", "SER"]). Empty when all metrics are disabled.',
    ],
    metaTitle: 'Response meta',
    meta: [
      'Number of rows in the original array.',
      'Number of rows in the reworked array.',
      'Column header names used for this diff.',
    ],
  },
  config: {
    title: 'Config Options',
    desc: 'Pass a config object in the request body to override algorithm defaults. All fields are optional.',
    params: [
      'Disable split and merge detection. Pure row-by-row diff.',
      'Enable split row detection.',
      'Enable merge row detection.',
      'Compute Character Error Rate.',
      'Compute Word Error Rate.',
      'Compute Segmentation Error Rate (splits, merges, boundary events).',
      'Compute Sentence Error Rate.',
      'Normalise Arabic/accented characters before comparison.',
      'Compare rows strictly by position, skipping alignment.',
      'Column names excluded from MODIFIED detection.',
      'Include transcriptDiff on MODIFIED rows. Set false to skip char-level diff and reduce response size.',
      'Pre-comparison find/replace rules applied to both sides before similarity scoring (max 20 rules).',
      'Compute CER restricted to the transcript column only. Independent of enableCER.',
      'Compute WER restricted to the transcript column only. Independent of enableWER.',
      'Transcript-column sentence-level SER — counts changed sentences across MODIFIED, SPLIT, and MERGED rows.',
      'Compute Speaker Attribution Change Rate (speaker-changed MODIFIED rows / total MODIFIED rows). Auto-detects speaker column; returns null when none found.',
      'Override auto-detection of the speaker column. Case-insensitive match. (e.g. "spk_id").',
      'Compute composite quality grade (1–5 average across enabled metrics).',
      'Include overallCER in composite grade. CER is still computed and returned when false.',
      'Include overallWER in composite grade. WER is still computed and returned when false.',
      'Include SegER in composite grade. SegER is still computed and returned when false.',
      'Include SER in composite grade. SER is still computed and returned when false.',
    ],
    expertTitle: 'Expert threshold overrides',
    expertDesc: 'Use only if you understand the matching algorithm. These control similarity and timing thresholds.',
    expertParams: [
      'Similarity threshold for a confident match.',
      'Similarity threshold for a moderate match.',
      'Similarity threshold for a weak match.',
      'Tolerance in seconds for an exact time match.',
      'Tolerance in seconds for a fuzzy time match.',
      'Minimum combined score to accept a split detection.',
      'Minimum combined score to accept a merge detection.',
      'Max combined character length before char-level diff falls back to word-level. Range 100–50 000.',
    ],
  },
  columnMapping: {
    title: 'Column Mapping',
    desc: 'When original / reworked are 2-D arrays (arrays of arrays) instead of objects, supply headers and/or columnMapping to tell the engine which index carries each field.',
    params: [
      '0-based column index of the transcript field.',
      '0-based column index of the speaker field.',
      '0-based column index of start time.',
      '0-based column index of end time.',
      '0-based column index of non-speech events.',
      'Additional column indices to include (max 20).',
    ],
  },
  errors: {
    title: 'Error Reference',
    desc: 'All errors use a uniform envelope:',
    headers: { http: 'HTTP', code: 'Code', cause: 'Cause' },
    causes: [
      'Malformed JSON body',
      'Missing or invalid x-api-key header',
      'Unknown endpoint',
      'Request body exceeds 5 MB',
      'Body failed schema validation (see details array)',
      'Burst or window rate limit hit',
      'Unexpected server or engine error',
    ],
  },
  tracing: {
    title: 'Request Tracing',
    desc: 'Provide an x-request-id header to correlate requests across your system. Alphanumeric characters, hyphens, and underscores only, max 64 characters. The value is echoed back in the response headers.',
  },
  access: {
    title: 'Get API Access',
    desc: 'The API is available to agencies and teams in tasting phase. Keys are provisioned individually. Reach out to receive your key and start integrating.',
    requestBtn: 'Request API Access',
    viewAddonBtn: 'View Google Sheets Add-on',
  },
  footer: {
    info: 'Structural Diff API · v1.0 · Built by',
    back: '← Back to SheetDiff™',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
  privacy: {
    title: 'Privacy Policy',
    productLine: 'Structural Diff API',
    lastUpdated: 'Last updated: April 10, 2026',
    backTo: '← Back to API Docs',
    sections: [],
  },
  terms: {
    title: 'Terms of Service',
    productLine: 'Structural Diff API',
    lastUpdated: 'Last updated: April 11, 2026',
    backTo: '\u2190 Back to API Docs',
    sections: [],
  },
}

// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 FRENCH \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const fr: StructuralApiI18n = {
  meta: {
    title: 'Documentation API Structural Diff — SheetDiff™',
    description:
      'API REST pour la comparaison différentielle structurelle de lignes de transcription. Détecte les lignes modifiées, divisées, fusionnées, ajoutées et supprimées avec scores CER/WER/SegER/SER/SACR. Conçue pour les agences de localisation et de transcription.',
  },
  nav: {
    groups: [
      { label: 'Premiers pas',             items: ['Vue d\'ensemble', 'Démarrage rapide', 'URL de base'] },
      { label: 'Authentification & Limites', items: ['Authentification', 'Limites de débit'] },
      { label: 'Référence API',            items: ['Points de terminaison', 'Corps de la requête', 'Structure de la réponse', 'Options de configuration', 'Mappage des colonnes'] },
      { label: 'Erreurs & Traçage',        items: ['Référence des erreurs', 'Traçage des requêtes'] },
      { label: 'Accès',                    items: ['Obtenir un accès API'] },
    ],
    backToAddon: '← Module Google Sheets',
    sectionsBtn: 'Sections',
    onThisPage: 'Sur cette page',
    guidesLabel: 'Guides & Exemples',
    guides: [
      { label: 'Paramètres de configuration', slug: 'parameters' },
      { label: 'Statuts de diff',             slug: 'diff-statuses' },
      { label: 'Démonstration complète',       slug: 'demo' },
      { label: 'Playground',                  slug: 'playground' },
    ],
  },
  breadcrumb: {
    parent: 'SheetDiff™',
    current: 'API Structural Diff',
  },
  hero: {
    title: 'API Structural Diff',
    desc: 'Une API REST qui compare une transcription générée par IA avec la version post-éditée par l\'annotateur — détectant les changements structurels au niveau des lignes (divisions, fusions, modifications, ajouts, suppressions), avec détail des différences par colonne, scores CER/WER/SegER/SER/SACR et une note de qualité composite par lot.',
    features: [
      { label: 'Auth par clé API',  sub: 'en-tête x-api-key' },
      { label: 'Débit limité',      sub: '10/min · 60/15min' },
      { label: 'REST JSON',         sub: 'application/json' },
      { label: 'Moteur 8 passes',   sub: 'détection divisions + fusions' },
    ],
  },
  quickStart: {
    title: 'Démarrage rapide',
    desc: 'Aucun SDK nécessaire. Envoyez une requête POST avec vos deux tableaux de lignes de transcription et recevez un diff complet en JSON. L\'API est en phase de dégustation — demandez une clé API pour commencer.',
    step1: '1. Vérifiez que le service est actif :',
    step2: '2. Lancez une comparaison :',
  },
  baseUrl: {
    title: 'URL de base',
    desc: 'Tous les points de terminaison sont préfixés par /v1.',
  },
  auth: {
    title: 'Authentification',
    desc: 'Incluez votre clé API dans l\'en-tête de requête x-api-key à chaque appel vers /v1/diff.',
    callout: 'Les clés sont provisionnées individuellement par agence. Une clé absente ou invalide renvoie 401 Unauthorized.',
  },
  rateLimits: {
    title: 'Limites de débit',
    desc: 'Deux niveaux indépendants sont appliqués par clé API, avec repli sur l\'IP en l\'absence de clé. Dépasser l\'un ou l\'autre renvoie 429 Too Many Requests.',
    headers: { tier: 'Niveau', limit: 'Limite', responseHeader: 'En-tête de réponse' },
    rows: [
      { tier: 'Rafale',  limit: '10 requêtes / minute' },
      { tier: 'Fenêtre', limit: '60 requêtes / 15 minutes' },
    ],
  },
  endpoints: {
    title: 'Points de terminaison',
    getHealthDesc: 'Sonde de disponibilité légère. Aucune authentification requise. Renvoie la version du service et le temps de fonctionnement.',
    noAuth: '· Sans auth',
    postDiffDesc: 'Comparez deux tableaux de lignes de transcription. Renvoie des résultats au niveau des lignes avec des scores de qualité. Charge utile max : 5 Mo · Lignes max : 30 000.',
    authRequired: 'Auth requise',
  },
  request: {
    title: 'Corps de la requête',
    params: [
      'Objets de ligne de la version de référence / originale.',
      'Objets de ligne à comparer.',
      { pre: 'Surcharges optionnelles de l\'algorithme. Voir', linkLabel: 'Options de configuration', post: '.' },
      'Noms de colonnes — requis lors de l\'utilisation d\'un tableau 2D.',
      { pre: 'Carte d\'index de colonnes pour l\'entrée en tableau 2D. Voir', linkLabel: 'Mappage des colonnes', post: '.' },
    ],
    rowFieldsTitle: 'Champs de l\'objet ligne',
    rowFieldsNote: 'Tous les champs sont optionnels sauf transcript. Les champs inconnus sont transmis sans modification.',
    rowFields: [
      'Le contenu textuel de la ligne.',
      'Nom ou identifiant du locuteur.',
      'Heure de début du segment en secondes.',
      'Heure de fin du segment en secondes.',
      'Annotations telles que [musique], [rires].',
      'Étiquette d\'émotion.',
      'Code de langue (ex. "fr", "ar").',
      'Code de locale (ex. "fr-FR").',
      'Étiquette d\'accent.',
      'Nom du fichier source. Champ de passage uniquement — non utilisé par l\'algorithme de diff.',
    ],
  },
  response: {
    title: 'Structure de la réponse',
    desc: 'Toutes les réponses réussies utilisent cette enveloppe :',
    diffStatusesTitle: 'Statuts de diff',
    headers: { status: 'Statut', meaning: 'Signification' },
    statuses: {
      UNCHANGED: 'La ligne est identique dans les deux versions.',
      MODIFIED:  'La ligne existe dans les deux versions mais le contenu a changé.',
      ADDED:     'La ligne est uniquement présente dans la version révisée.',
      DELETED:   'La ligne est uniquement présente dans la version originale.',
      SPLIT:     'Une ligne originale a été divisée en deux lignes révisées ou plus.',
      MERGED:    'Deux lignes originales ou plus ont été combinées en une ligne révisée.',
    },
    scoresTitle: 'Scores',
    scores: [
      'Taux d\'erreur de caractères dans toutes les colonnes (0–1, plus bas = meilleur).',
      'Taux d\'erreur de mots dans toutes les colonnes (0–1).',
      'Taux d\'erreur de segmentation — événements de frontière (divisions, fusions, lignes ajoutées et supprimées) / segments attendus (0–1, inférieur = meilleur).',
      'CER calculé uniquement sur la colonne de transcription.',
      'WER calculé uniquement sur la colonne de transcription.',
      'Taux d\'erreur de phrase — lignes MODIFIED / (UNCHANGED + MODIFIED). Fraction des lignes comparables avec au moins une modification (0–1).',
      'SER calculé sur les phrases du texte dans la colonne de transcription.',
      'Taux de changement d\'attribution du locuteur — lignes où le locuteur a changé / lignes MODIFIED. null si aucune colonne de locuteur n\'est détectée.',
    ],
    compositeTitle: 'Note composite',
    composite: [
      'Score numérique (1,0–5,0, plus élevé = meilleur) calculé en moyenne sur les métriques activées.',
      'Étiquette lisible — parmi : "Excellent", "Good", "Acceptable", "Below Average", "Poor", "Unacceptable".',
      'Pourcentage d\'erreur moyen sur les métriques de notation activées.',      'Tableau des noms de métriques ayant contribué à ce composite (ex. : ["CER", "WER", "SegER", "SER"]). Vide si toutes les métriques sont désactivées.',    ],
    metaTitle: 'Méta de la réponse',
    meta: [
      'Nombre de lignes dans le tableau original.',
      'Nombre de lignes dans le tableau reworked.',
      'Noms des colonnes utilisés pour ce diff.',
    ],
  },
  config: {
    title: 'Options de configuration',
    desc: 'Passez un objet config dans le corps de la requête pour remplacer les valeurs par défaut de l\'algorithme. Tous les champs sont optionnels.',
    params: [
      'Désactiver la détection des divisions et fusions. Diff ligne par ligne pur.',
      'Activer la détection des lignes divisées.',
      'Activer la détection des lignes fusionnées.',
      'Calculer le taux d\'erreur de caractères.',
      'Calculer le taux d\'erreur de mots.',      'Calculer le taux d\'erreur de segmentation (divisions, fusions, événements de frontière).',      'Calculer le taux d\'erreur de phrases.',
      'Normaliser les caractères arabes/accentués avant la comparaison.',
      'Comparer les lignes strictement par position, sans alignement.',
      'Noms de colonnes exclus de la détection MODIFIED.',
      'Inclure transcriptDiff dans les lignes MODIFIED. Mettre false pour ignorer le diff caractère par caractère et réduire la taille de réponse.',
      'Règles find/replace appliquées aux deux côtés avant la comparaison par similarité (max 20 règles).',
      'Calculer le CER restreint à la colonne transcript uniquement. Indépendant de enableCER.',
      'Calculer le WER restreint à la colonne transcript uniquement. Indépendant de enableWER.',
      'SER au niveau des phrases dans la colonne transcript — compte les phrases modifiées dans les lignes MODIFIED, SPLIT et MERGED.',
      'Calculer le taux de changement d\'attribution du locuteur (lignes MODIFIED avec locuteur changé / total MODIFIED). Détection auto de la colonne locuteur ; renvoie null si absente.',
      'Remplacer la détection automatique de la colonne locuteur. Correspondance insensible à la casse (ex. "spk_id").',
      'Calculer la note composite de qualité (moyenne 1–5 des métriques activées).',
      'Inclure overallCER dans la note composite. Le CER est toujours calculé quand false.',
      'Inclure overallWER dans la note composite. Le WER est toujours calculé quand false.',
      'Inclure SegER dans la note composite. SegER est toujours calculé quand false.',
      'Inclure SER dans la note composite. SER est toujours calculé quand false.',
    ],
    expertTitle: 'Réglages avancés des seuils',
    expertDesc: 'À utiliser uniquement si vous comprenez l\'algorithme de correspondance. Ces paramètres contrôlent les seuils de similarité et de timing.',
    expertParams: [
      'Seuil de similarité pour une correspondance confiante.',
      'Seuil de similarité pour une correspondance modérée.',
      'Seuil de similarité pour une correspondance faible.',
      'Tolérance en secondes pour une correspondance exacte de l\'heure.',
      'Tolérance en secondes pour une correspondance approximative de l\'heure.',
      'Score combiné minimum pour accepter une détection de division.',
      'Score combiné minimum pour accepter une détection de fusion.',
      'Longueur maximale combinée en caractères avant repli du diff caractère par caractère vers diff par mots. Plage 100–50 000.',
    ],
  },
  columnMapping: {
    title: 'Mappage des colonnes',
    desc: 'Lorsque original / reworked sont des tableaux 2D (tableaux de tableaux) plutôt que des objets, fournissez headers et/ou columnMapping pour indiquer au moteur quel index correspond à chaque champ.',
    params: [
      'Index de colonne base 0 pour le champ de transcription.',
      'Index de colonne base 0 pour le champ du locuteur.',
      'Index de colonne base 0 pour l\'heure de début.',
      'Index de colonne base 0 pour l\'heure de fin.',
      'Index de colonne base 0 pour les événements non-vocaux.',
      'Index de colonnes supplémentaires à inclure (max 20).',
    ],
  },
  errors: {
    title: 'Référence des erreurs',
    desc: 'Toutes les erreurs utilisent une enveloppe uniforme :',
    headers: { http: 'HTTP', code: 'Code', cause: 'Cause' },
    causes: [
      'Corps JSON malformé',
      'En-tête x-api-key manquant ou invalide',
      'Point de terminaison inconnu',
      'Corps de requête dépasse 5 Mo',
      'Échec de la validation du schéma (voir tableau details)',
      'Limite de débit par rafale ou par fenêtre atteinte',
      'Erreur serveur ou moteur inattendue',
    ],
  },
  tracing: {
    title: 'Traçage des requêtes',
    desc: 'Fournissez un en-tête x-request-id pour corréler les requêtes dans votre système. Caractères alphanumériques, tirets et traits de soulignement uniquement, max 64 caractères. La valeur est renvoyée dans les en-têtes de réponse.',
  },
  access: {
    title: 'Obtenir un accès API',
    desc: 'L\'API est disponible pour les agences et équipes en phase de dégustation. Les clés sont provisionnées individuellement. Contactez-nous pour recevoir votre clé et commencer l\'intégration.',
    requestBtn: 'Demander un accès API',
    viewAddonBtn: 'Voir le module Google Sheets',
  },
  footer: {
    info: 'API Structural Diff · v1.0 · Développé par',
    back: '← Retour à SheetDiff™',
    privacy: 'Politique de confidentialité',
    terms: "Conditions d'utilisation",
  },
  privacy: {
    title: 'Politique de Confidentialité',
    productLine: 'API Structural Diff',
    lastUpdated: 'Dernière mise à jour : 10 avril 2026',
    backTo: '← Retour à la documentation API',
    sections: [
      { heading: '1. Présentation', content: "L'API Structural Diff est un service REST développé par Mohamed Yaakoubi permettant de comparer des lignes de transcription et de tableur, et de générer des rapports de diff détaillés. Cette politique explique comment l'API traite et protège vos données." },
      { heading: '2. Données que vous soumettez', content: "<p>Pour utiliser l'API, vous envoyez des contenus JSON contenant des lignes, des options de configuration et un en-tête d'authentification. Ces données sont :</p><ul><li><strong>Traitées uniquement en mémoire</strong> — les lignes sont comparées puis immédiatement ignorées. Aucun contenu n'est écrit dans une base de données persistante.</li><li><strong>Non partagées</strong> — le contenu de vos requêtes n'est jamais vendu ni partagé avec des tiers.</li><li><strong>Non liées à des identités</strong> — l'API n'exige aucune information personnelle dans les lignes elles-mêmes.</li></ul>" },
      { heading: '3. Clés API et authentification', content: "<p>L'accès requiert un en-tête <code>x-api-key</code> valide. Les clés sont provisonnées individuellement et stockées dans la variable d'environnement <code>API_KEYS</code> du serveur. La comparaison est effectuée en temps constant via <code>crypto.timingSafeEqual</code> pour prévenir les attaques temporelles. Aucune clé n'est enregistrée dans les journaux. Gardez votre clé confidentielle et signalez toute compromission immédiatement.</p>" },
      { heading: '4. Journaux serveur', content: "<p>L'infrastructure enregistre automatiquement :</p><ul><li>L'adresse IP entrante (pour la limitation de débit).</li><li>L'identifiant de requête (<code>x-request-id</code>) pour le débogage.</li><li>L'horodatage, le code HTTP et la latence.</li></ul><p>Les journaux sont écrits <strong>sur stdout uniquement</strong> via Winston. Aucune donnée n'est écrite dans une base de données. La durée de conservation dépend de la politique de la plateforme de déploiement.</p>" },
      { heading: '5. Services tiers', content: "L'API n'utilise aucun service tiers de stockage. Dépendances de production : <code>express</code>, <code>helmet</code>, <code>cors</code>, <code>winston</code>, <code>morgan</code>, <code>joi</code>. Tout le traitement a lieu sur le serveur de Mohamed Yaakoubi." },
      { heading: '6. Sécurité', content: "Toutes les communications se font via HTTPS/TLS. L'en-tête <code>x-api-key</code> est obligatoire pour les endpoints qui retournent des données. Les clés sont comparées en temps constant, jamais enregistrées. <code>helmet</code> applique des en-têtes de sécurité HTTP standard." },
      { heading: '7. Modifications', content: 'Nous pouvons mettre à jour cette politique si nos pratiques changent. La date \u00ab Dernière mise à jour \u00bb sera révisée.' },
      { heading: '8. Contact', content: "Pour toute question, contactez-nous via <a href='https://www.mohamedyaakoubi.com/contact'>mohamedyaakoubi.com/contact</a>." },
    ],
  },
  terms: {
    title: "Conditions d'utilisation",
    productLine: 'API Structural Diff',
    lastUpdated: 'Dernière mise à jour : 11 avril 2026',
    backTo: '← Retour à la documentation API',
    sections: [
      { heading: '1. Acceptation', content: "En accédant à l'API ou en l'utilisant, vous acceptez ces conditions. Si vous l'utilisez au nom d'une organisation, vous déclarez avoir l'autorité pour la lier." },
      { heading: '2. Accès et licence', content: "L'utilisation requiert une clé valide. Vous bénéficiez d'une licence limitée, non exclusive et non transférable pour utiliser l'API dans vos propres systèmes." },
      { heading: '3. Utilisations autorisées', content: '<ul><li>Comparer des transcriptions, sous-titres ou lignes de tableur dans vos propres flux de travail.</li><li>Assurance qualité de la localisation, QA de la transcription et annotation de données.</li><li>Intégration dans vos outils internes, à condition de ne pas redistribuer les droits d’accès et de ne pas intégrer ou exploiter l’API depuis Google Sheets, Google Apps Script ou des automatisations liées à des feuilles de calcul.</li><li>Pour un usage dans Google Sheets, vous devez utiliser le module officiel SheetDiff disponible sur Google Workspace Marketplace, et non un accès direct à l’API.</li></ul>' },
      { heading: '4. Utilisations interdites', content: "<ul><li>Revendre, sous-licencier ou redistribuer l'accès à des tiers.</li><li>Construire un service concurrent aux fonctionnalités similaires.</li><li>Utiliser l’API directement depuis Google Sheets, Google Apps Script, ou des modules/connecteurs personnalisés liés à des feuilles de calcul.</li><li>Partager votre clé avec des personnes non autorisées.</li><li>Contourner les mécanismes d'authentification ou de limitation de débit.</li><li>Faire de l'ingénierie inverse sur le moteur.</li><li>Effectuer des tests de charge non autorisés ou des attaques de service.</li></ul>" },
      { heading: '5. Clés API', content: "Chaque clé est provisonnée pour un seul utilisateur ou une seule organisation. Ne partagez pas votre clé. Signalez toute compromission immédiatement. Une seule clé par entité sans accord écrit préalable." },
      { heading: '6. Limites de débit', content: 'Le niveau d’essai est limité à <strong>10 requêtes / minute</strong> (fenêtre de 1 minute) et <strong>60 requêtes / 15 minutes</strong>. Des niveaux supérieurs peuvent être provisonnés individuellement. Le dépassement répété peut entraîner la suspension de la clé.' },
      { heading: '7. Disponibilité', content: "L'API est fournie \u00ab en l'état \u00bb sans garantie de disponibilité. Nous pouvons modifier, suspendre ou interrompre le service à tout moment." },
      { heading: '8. Propriété intellectuelle', content: "Le moteur de diff, la conception de l'API, la documentation et tous les composants associés sont la propriété intellectuelle de Mohamed Yaakoubi." },
      { heading: '9. Exclusion de garanties', content: "L'API EST FOURNIE \u00ab EN L'ÉTAT \u00bb SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE." },
      { heading: '10. Limitation de responsabilité', content: "Dans toute la mesure permise par la loi, Mohamed Yaakoubi ne saurait être tenu responsable de dommages indirects ou consécutifs découlant de l'utilisation ou de l'impossibilité d'utiliser l'API." },
      { heading: '11. Résiliation', content: "Nous nous réservons le droit de révoquer votre clé et de résilier votre accès à tout moment en cas de violation ou d'abus." },
      { heading: '12. Droit applicable', content: 'Ces conditions sont régies par les lois applicables en République de Tunisie.' },
      { heading: '13. Contact', content: "Pour toute question, contactez-nous via <a href='https://www.mohamedyaakoubi.com/contact'>mohamedyaakoubi.com/contact</a>." },
    ],
  },
}

// ────────────────────── ARABIC ──────────────────────
const ar: StructuralApiI18n = {
  meta: {
    title: 'توثيق Structural Diff API — SheetDiff™',
    description:
      'واجهة برمجة تطبيقات REST لمقارنة الفروقات الهيكلية في صفوف النصوص المكتوبة. تكشف عن الصفوف المعدّلة والمقسّمة والمدمجة والمضافة والمحذوفة مع درجات CER/WER/SegER/SER/SACR. مصممة لوكالات الترجمة والتدقيق اللغوي.',
  },
  nav: {
    groups: [
      { label: 'البدء',             items: ['نظرة عامة', 'البدء السريع', 'عنوان URL الأساسي'] },
      { label: 'المصادقة والحدود', items: ['المصادقة', 'حدود الاستخدام'] },
      { label: 'مرجع API',          items: ['نقاط الاتصال', 'جسم الطلب', 'شكل الاستجابة', 'خيارات الإعداد', 'تعيين الأعمدة'] },
      { label: 'الأخطاء والتتبع',  items: ['مرجع الأخطاء', 'تتبع الطلبات'] },
      { label: 'الوصول',            items: ['الحصول على وصول API'] },
    ],
    backToAddon: 'العودة إلى إضافة Google Sheets',
    sectionsBtn: 'الأقسام',
    onThisPage: 'في هذه الصفحة',
    guidesLabel: 'الأدلة والأمثلة',
    guides: [
      { label: 'معاملات الإعداد',  slug: 'parameters' },
      { label: 'حالات الـ diff',   slug: 'diff-statuses' },
      { label: 'درس تطبيقي كامل', slug: 'demo' },
      { label: 'Playground',       slug: 'playground' },
    ],
  },
  breadcrumb: {
    parent: 'SheetDiff™',
    current: 'Structural Diff API',
  },
  hero: {
    title: 'Structural Diff API',
    desc: 'واجهة REST API تقارن النص المُنشأ بالذكاء الاصطناعي بالنسخة المُحرَّرة من قِبل المُعلِّم — تكشف التغييرات الهيكلية على مستوى الصفوف (تقسيم، دمج، تعديل، إضافة، حذف)، مع تفاصيل الفروق لكل عمود، ودرجات CER/WER/SegER/SER/SACR، ودرجة جودة مركّبة لكل دُفعة.',
    features: [
      { label: 'مصادقة بمفتاح API', sub: 'رأس x-api-key' },
      { label: 'حدود الاستخدام',    sub: '10/دقيقة · 60/15دقيقة' },
      { label: 'REST JSON',          sub: 'application/json' },
      { label: 'محرك 8 مراحل',      sub: 'كشف التقسيم والدمج' },
    ],
  },
  quickStart: {
    title: 'البدء السريع',
    desc: 'لا حاجة إلى SDK. أرسل طلب POST مع مصفوفتين من صفوف النص المكتوب وستتلقى diff كاملاً بصيغة JSON. الـ API في مرحلة الاختبار — اطلب مفتاح API للبدء.',
    step1: '١. تحقق من أن الخدمة تعمل:',
    step2: '٢. شغّل مقارنة:',
  },
  baseUrl: {
    title: 'عنوان URL الأساسي',
    desc: 'جميع نقاط الاتصال مسبوقة بـ /v1.',
  },
  auth: {
    title: 'المصادقة',
    desc: 'أضف مفتاح API في رأس الطلب x-api-key عند كل استدعاء لـ /v1/diff.',
    callout: 'تُخصَّص المفاتيح بشكل فردي لكل وكالة. مفتاح مفقود أو غير صالح يُعيد 401 Unauthorized.',
  },
  rateLimits: {
    title: 'حدود الاستخدام',
    desc: 'يُطبَّق مستويان مستقلان لكل مفتاح API، مع الرجوع إلى IP عند غيابه. تجاوز أي مستوى يُعيد 429 Too Many Requests.',
    headers: { tier: 'المستوى', limit: 'الحد', responseHeader: 'رأس الاستجابة' },
    rows: [
      { tier: 'دفعي',  limit: '10 طلبات / دقيقة' },
      { tier: 'نافذة', limit: '60 طلباً / 15 دقيقة' },
    ],
  },
  endpoints: {
    title: 'نقاط الاتصال',
    getHealthDesc: 'فحص خفيف للتوفر. لا تتطلب مصادقة. تُعيد إصدار الخدمة ومدة التشغيل.',
    noAuth: '· بدون مصادقة',
    postDiffDesc: 'قارن مصفوفتين من صفوف النص المكتوب. تُعيد النتائج على مستوى الصفوف مع درجات الجودة. الحجم الأقصى: 5 ميجابايت · الصفوف القصوى: 30,000.',
    authRequired: 'مصادقة مطلوبة',
  },
  request: {
    title: 'جسم الطلب',
    params: [
      'كائنات الصفوف من النسخة الأصلية / الأساسية.',
      'كائنات الصفوف للمقارنة.',
      { pre: 'تجاوزات اختيارية للخوارزمية. انظر', linkLabel: 'خيارات الإعداد', post: '.' },
      'أسماء الأعمدة — مطلوبة عند استخدام إدخال مصفوفة ثنائية الأبعاد.',
      { pre: 'خريطة فهارس الأعمدة لإدخال المصفوفة ثنائية الأبعاد. انظر', linkLabel: 'تعيين الأعمدة', post: '.' },
    ],
    rowFieldsTitle: 'حقول كائن الصف',
    rowFieldsNote: 'جميع الحقول اختيارية باستثناء transcript. تُمرَّر الحقول غير المعروفة دون تغيير.',
    rowFields: [
      'المحتوى النصي للصف.',
      'اسم المتحدث أو معرّفه.',
      'وقت بدء المقطع بالثواني.',
      'وقت انتهاء المقطع بالثواني.',
      'تعليقات توضيحية مثل [موسيقى]، [ضحك].',
      'وسم العاطفة.',
      'رمز اللغة (مثال: "ar"، "en").',
      'رمز اللهجة الإقليمية (مثال: "ar-MA").',
      'وسم اللكنة.',
      'اسم الملف المصدر. حقل تمرير فقط — لا يستخدمه خوارزمية المقارنة.',
    ],
  },
  response: {
    title: 'شكل الاستجابة',
    desc: 'جميع الاستجابات الناجحة تستخدم هذا الغلاف:',
    diffStatusesTitle: 'حالات الـ diff',
    headers: { status: 'الحالة', meaning: 'المعنى' },
    statuses: {
      UNCHANGED: 'الصف متطابق في كلا النسختين.',
      MODIFIED:  'الصف موجود في كلا النسختين لكن المحتوى تغيّر.',
      ADDED:     'الصف موجود فقط في النسخة المُعادة صياغتها.',
      DELETED:   'الصف موجود فقط في النسخة الأصلية.',
      SPLIT:     'صف أصلي واحد قُسِّم إلى صفين أو أكثر في النسخة المُعادة.',
      MERGED:    'صفّان أصليان أو أكثر اندمجا في صف واحد في النسخة المُعادة.',
    },
    scoresTitle: 'الدرجات',
    scores: [
      'معدل خطأ الأحرف في جميع الأعمدة (0–1، الأقل كلما كان أفضل).',
      'معدل خطأ الكلمات في جميع الأعمدة (0–1).',
      'معدل خطأ التجزئة — أحداث حدود (تقسيمات ودمجات وصفوف مضافة ومحذوفة) / المقاطع المتوقعة (0–1، الأقل كلما كان أفضل).',
      'CER محسوب فقط على عمود النص المكتوب.',
      'WER محسوب فقط على عمود النص المكتوب.',
      'معدل خطأ الجمل — صفوف MODIFIED / (UNCHANGED + MODIFIED). نسبة الصفوف القابلة للمقارنة التي تحتوي على أي تعديل (0–1).',
      'SER محسوب على الجمل داخل نص عمود النص المكتوب.',
      'معدل تغيير تنسيب المتحدث — الصفوف التي تغيّر فيها المتحدث / صفوف MODIFIED. قيمة null إذا لم يُكتشف عمود متحدث.',
    ],
    compositeTitle: 'الدرجة المركّبة',
    composite: [
      'درجة رقمية (1.0–5.0، الأعلى كلما كان أفضل) تُحسب بمعدل المقاييس الممكّنة.',
      'وسم قابل للقراءة — أحد: "Excellent"، "Good"، "Acceptable"، "Below Average"، "Poor"، "Unacceptable".',
      'متوسط نسبة الخطأ عبر مقاييس التقييم الممكّنة.',      'مصفوفة أسماء المقاييس التي ساهمت في هذا المركّب (مثال: ["CER"، "WER"، "SegER"، "SER"]). فارغة عند تعطيل جميع المقاييس.',    ],
    metaTitle: 'بيانات الاستجابة',
    meta: [
      'عدد الصفوف في المصفوفة الأصلية.',
      'عدد الصفوف في المصفوفة المُعادة.',
      'أسماء أعمدة الرؤوس المستخدمة في هذا الـ diff.',
    ],
  },
  config: {
    title: 'خيارات الإعداد',
    desc: 'مرّر كائن config في جسم الطلب لتجاوز القيم الافتراضية للخوارزمية. جميع الحقول اختيارية.',
    params: [
      'تعطيل كشف التقسيم والدمج. مقارنة صف بصف فقط.',
      'تفعيل كشف الصفوف المقسّمة.',
      'تفعيل كشف الصفوف المدمجة.',
      'حساب معدل خطأ الأحرف.',
      'حساب معدل خطأ الكلمات.',
      'حساب معدل خطأ التجزئة (تقسيم، دمج، أحداث الحدود الهيكلية).',
      'حساب معدل خطأ الجمل.',
      'توحيد الأحرف العربية/المعلَّمة قبل المقارنة.',
      'مقارنة الصفوف بالترتيب الحرفي مع تخطي المحاذاة.',
      'أسماء الأعمدة المستبعدة من كشف MODIFIED.',
      'تضمين transcriptDiff في صفوف MODIFIED. ضبطه false لتخطي حساب الفروق حرفاً بحرف وتقليل حجم الاستجابة.',
      'قواعد find/replace تُطبَّق على الجانبين قبل حساب التشابه (حد أقصى 20 قاعدة).',
      'حساب CER مقيّد بعمود transcript فقط. مستقل عن enableCER.',
      'حساب WER مقيّد بعمود transcript فقط. مستقل عن enableWER.',
      'SER على مستوى الجمل في عمود transcript — يحسب الجمل المتغيّرة في صفوف MODIFIED وSPLIT وMERGED.',
      'حساب معدل تغيير تنسيب المتحدث (صفوف MODIFIED التي تغيّر فيها المتحدث / إجمالي MODIFIED). يكشف عمود المتحدث تلقائياً؛ يُعيد null إذا لم يُعثر عليه.',
      'تجاوز الكشف التلقائي لعمود المتحدث. مطابقة غير حساسة للحالة (مثال: "spk_id").',
      'حساب الدرجة المركّبة للجودة (متوسط 1–5 عبر المقاييس الممكّنة).',
      'تضمين overallCER في الدرجة المركّبة. يُحسَب CER ويُعاد حتى عند false.',
      'تضمين overallWER في الدرجة المركّبة. يُحسَب WER ويُعاد حتى عند false.',
      'تضمين SegER في الدرجة المركّبة. يُحسَب SegER ويُعاد حتى عند false.',
      'تضمين SER في الدرجة المركّبة. يُحسَب SER ويُعاد حتى عند false.',    ],
    expertTitle: 'تجاوزات عتبات الخبراء',
    expertDesc: 'استخدم فقط إذا كنت تفهم خوارزمية المطابقة. هذه المعاملات تتحكم في عتبات التشابه والتوقيت.',
    expertParams: [
      'عتبة التشابه للمطابقة الواثقة.',
      'عتبة التشابه للمطابقة المتوسطة.',
      'عتبة التشابه للمطابقة الضعيفة.',
      'التسامح بالثواني للمطابقة الدقيقة للوقت.',
      'التسامح بالثواني للمطابقة التقريبية للوقت.',
      'الحد الأدنى للدرجة المشتركة لقبول كشف التقسيم.',
      'الحد الأدنى للدرجة المشتركة لقبول كشف الدمج.',
      'الحد الأقصى للطول المجموع للنص بالأحرف قبل التحوّل من فرق حرف-بحرف إلى فرق كلمة-بكلمة. النطاق 100–50 000.',
    ],
  },
  columnMapping: {
    title: 'تعيين الأعمدة',
    desc: 'عندما تكون original / reworked مصفوفات ثنائية الأبعاد (مصفوفات من مصفوفات) بدلاً من كائنات، امدد headers و/أو columnMapping لإخبار المحرك بأي فهرس يحمل كل حقل.',
    params: [
      'فهرس عمود base-0 لحقل النص المكتوب.',
      'فهرس عمود base-0 لحقل المتحدث.',
      'فهرس عمود base-0 لوقت البداية.',
      'فهرس عمود base-0 لوقت النهاية.',
      'فهرس عمود base-0 للأحداث غير الكلامية.',
      'فهارس أعمدة إضافية للتضمين (بحد أقصى 20).',
    ],
  },
  errors: {
    title: 'مرجع الأخطاء',
    desc: 'جميع الأخطاء تستخدم غلافاً موحداً:',
    headers: { http: 'HTTP', code: 'الرمز', cause: 'السبب' },
    causes: [
      'جسم JSON ذو تنسيق خاطئ',
      'رأس x-api-key مفقود أو غير صالح',
      'نقطة اتصال غير معروفة',
      'جسم الطلب يتجاوز 5 ميجابايت',
      'فشل التحقق من صحة الجسم (انظر مصفوفة details)',
      'تجاوز حد الدفعة أو حد النافذة',
      'خطأ غير متوقع في الخادم أو المحرك',
    ],
  },
  tracing: {
    title: 'تتبع الطلبات',
    desc: 'قدّم رأس x-request-id لربط الطلبات عبر نظامك. أحرف أبجدية رقمية وشرطات وشرحطات سفلية فقط، بحد أقصى 64 حرفاً. تُعاد القيمة في رؤوس الاستجابة.',
  },
  access: {
    title: 'الحصول على وصول API',
    desc: 'الـ API متاحة للوكالات والفرق في مرحلة الاختبار. تُخصَّص المفاتيح بشكل فردي. تواصل معنا لتلقي مفتاحك والبدء في التكامل.',
    requestBtn: 'طلب وصول API',
    viewAddonBtn: 'عرض إضافة Google Sheets',
  },
  footer: {
    info: 'Structural Diff API · v1.0 · تطوير',
    back: 'العودة إلى SheetDiff™',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
  },
  privacy: {
    title: 'سياسة الخصوصية',
    productLine: 'Structural Diff API',
    lastUpdated: 'آخر تحديث: 10 أبريل 2026',
    backTo: '→ العودة إلى وثائق API',
    sections: [
      { heading: '١. نظرة عامة', content: 'Structural Diff API خدمة REST طوّرها محمد يعقوبي، تقارن صفوف النصوص والجداول وتولّد تقارير diff تفصيلية. تشرح سياسة الخصوصية هذه كيفية معالجة الـ API لبياناتك وحمايتها.' },
      { heading: '٢. البيانات التي تُرسَل', content: '<p>لاستخدام الـ API، تُرسَل حمولات JSON تحتوي على صفوف نصية، خيارات تهيئة، ورأس مصادقة. هذه البيانات:</p><ul><li><strong>تُعالَج في الذاكرة فقط</strong> — الصفوف تُقارَن ثم تُتجاهَل فوراً. لا تُكتَب بيانات في قاعدة دائمة.</li><li><strong>غير مشتركة</strong> — لا يُباع محتوى طلباتك أو يُشارَك مع أطراف ثالثة.</li><li><strong>غير مرتبطة بهويات</strong> — لا تتطلب الـ API أي معلومات تعريف شخصية في الصفوف ذاتها.</li></ul>' },
      { heading: '٣. مفاتيح API والمصادقة', content: '<p>يتطلب الوصول رأس <code>x-api-key</code> صالحًا. تُخصّص المفاتيح بشكل فردي وتُخزّن كنص عادي في متغيّر البيئة <code>API_KEYS</code> على الخادم (يصل إليه المشغّل فقط). تُجرى المقارنة عبر <code>crypto.timingSafeEqual</code>. لا تُسجّل أي مفتاح. احتفظ بمفتاحك سريًا.</p>' },
      { heading: '٤. سجلات الخادم', content: '<p>تُسجّل البنية التحتية تلقائيًا:</p><ul><li>عنوان IP (لتحديد المعدل).</li><li>معرّف الطلب (<code>x-request-id</code>) للتصحيح.</li><li>الطابع الزمني ورمز HTTP وطول الاستجابة.</li></ul><p>تُكتَب السجلات <strong>على stdout فقط</strong> عبر Winston. لا تُخزّن بيانات في قاعدة بيانات. مدة الاحتفاظ تتوقف على سياسة بيئة النشر.</p>' },
      { heading: '٥. خدمات الطرف الثالث', content: 'لا تستخدم الـ API أي خدمة تخزين خارجية (لا Firebase، لا قاعدة بيانات، لا analytics). تبعيات الإنتاج: <code>express</code>، <code>helmet</code>، <code>cors</code>، <code>winston</code>، <code>morgan</code>، <code>joi</code>.' },
      { heading: '٦. الأمان', content: 'جميع الاتصالات عبر HTTPS/TLS. رأس <code>x-api-key</code> إلزامي. تستخدم الـ API مكتبة <code>helmet</code> لتطبيق رؤوس أمان HTTP قياسية.' },
      { heading: '٧. التغييرات', content: 'قد نحدّث هذه السياسة إذا تغيّرت ممارساتنا. سيُراجع تاريخ «آخر تحديث» وفقًا لذلك.' },
      { heading: '٨. التواصل', content: "لأي استفسارات، تواصل عبر <a href='https://www.mohamedyaakoubi.com/contact'>mohamedyaakoubi.com/contact</a>." },
    ],
  },
  terms: {
    title: 'شروط الخدمة',
    productLine: 'Structural Diff API',
    lastUpdated: 'آخر تحديث: 11 أبريل 2026',
    backTo: '→ العودة إلى وثائق API',
    sections: [
      { heading: '١. القبول', content: 'بالوصول إلى Structural Diff API أو استخدامها، توافق على الالتزام بهذه الشروط.' },
      { heading: '٢. الوصول والترخيص', content: 'يتطلب استخدام الـ API مفتاحًا صالحًا. يُمنح لك حق وصول محدود وغير حصري وغير قابل للنقل لاستخدام الـ API ضمن أنظمتك الخاصة.' },
      { heading: '٣. الاستخدامات المسموح بها', content: '<ul><li>مقارنة النصوص أو صفوف الجداول ضمن سير عملك الخاص.</li><li>ضمان جودة الترجمة والتعليق على البيانات.</li><li>التكامل في أدواتك الداخلية دون إعادة توزيع حقوق الوصول، ودون تضمين الـ API أو تشغيلها من داخل Google Sheets أو Google Apps Script أو أي أتمتة مرتبطة بجداول البيانات.</li><li>إذا كنت تريد استخدام الخدمة داخل Google Sheets، فيجب استخدام إضافة SheetDiff الرسمية على Google Workspace Marketplace وليس الوصول المباشر إلى الـ API.</li></ul>' },
      { heading: '٤. الاستخدامات المحظورة', content: '<ul><li>إعادة بيع أو ترخيص أو إعادة توزيع الوصول لأطراف ثالثة.</li><li>بناء خدمة منافسة.</li><li>استخدام الـ API مباشرةً من داخل Google Sheets أو Google Apps Script أو إضافات/موصلات مخصّصة مرتبطة بجداول البيانات.</li><li>مشاركة مفتاحك مع غير مصرح لهم.</li><li>تجاوز آليات المصادقة أو تحديد المعدل.</li><li>الهندسة العكسية على المحرك.</li><li>اختبار تحمل غير مصرح به أو الهجوم على الخدمة.</li></ul>' },
      { heading: '٥. مفاتيح API', content: 'يُخصّص كل مفتاح لمستخدم أو منظمة واحدة. لا تشارك مفتاحك. مفتاح واحد لكل جهة دون اتفاقية مكتوبة مسبقة.' },
      { heading: '٦. حدود المعدل', content: 'المستوى التجريبي محدّد بـ <strong>10 طلبات / دقيقة</strong> (نافذة 1 دقيقة) و <strong>60 طلبًا / 15 دقيقة</strong>. يُمكن تخصيص مستويات أعلى بشكل فردي.' },
      { heading: '٧. توفّر الخدمة', content: 'تُقدّم الـ API «كما هي» دون ضمان التوفُر. يحق لنا تعديل أو تعليق أو إيقاف الخدمة في أي وقت.' },
      { heading: '٨. الملكية الفكرية', content: 'محرك diff وتصميم الـ API والوثائق وجميع المكونات هي ملكية فكرية لمحمد يعقوبي.' },
      { heading: '٩. إخلاء المسؤولية عن الضمانات', content: 'تُقدّم الـ API «كما هي» دون أي ضمان من أي نوع.' },
      { heading: '٪٠. تحديد المسؤولية', content: 'لن يكون محمد يعقوبي مسؤولاً عن أي أضرار غير مباشرة ناجمة عن استخدام الـ API أو عدم تمكُنك من استخدامها.' },
      { heading: '٪١. الإنهاء', content: 'نحتفظ بالحق في إلغاء مفتاحك وإنهاء وصولك في أي وقت لانتهاك هذه الشروط أو إساءة الاستخدام.' },
      { heading: '٪٢. القانون المعمول به', content: 'تخضع هذه الشروط للقوانين السارية في الجمهورية التونسية.' },
      { heading: '٪٣. التواصل', content: "لأي استفسارات، تواصل عبر <a href='https://www.mohamedyaakoubi.com/contact'>mohamedyaakoubi.com/contact</a>." },
    ],
  },
}

const translations: Record<string, StructuralApiI18n> = { en, fr, ar }

export function getStructuralApiI18n(locale: string): StructuralApiI18n {
  return translations[locale] ?? en
}

export type { StructuralApiI18n, DescItem, LinkedDesc }
