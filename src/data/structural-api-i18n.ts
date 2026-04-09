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
  }
}

// ────────────────────── ENGLISH ──────────────────────
const en: StructuralApiI18n = {
  meta: {
    title: 'Structural Diff API Docs — SheetDiff™',
    description:
      'REST API for structural diff comparison of transcript rows. Detects modified, split, merged, added, and deleted rows with CER/WER/SER quality scoring. Built for localization and transcription agencies.',
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
    desc: 'A REST API that compares an AI-generated transcript against its annotator post-edit — detecting row-level structural changes (splits, merges, modifications, additions, deletions), with per-column diff detail, CER/WER/SER scoring, and a composite quality grade per batch.',
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
      'Segmentation Error Rate — proportion of rows that were split or merged.',
      'CER computed on the transcript column only.',
      'WER computed on the transcript column only.',
    ],
    compositeTitle: 'Composite grade',
    composite: [
      'Weighted quality score (1.0–5.0, higher is better).',
      'Letter grade: A, B, C, D, or F.',
      'Human-readable label — e.g. "Excellent", "Good", "Needs Work".',
    ],
  },
  config: {
    title: 'Config Options',
    desc: 'Pass a config object in the request body to override algorithm defaults. All fields are optional.',
    params: [
      'Disable split and merge detection. Pure row-by-row diff. Default: false.',
      'Enable split row detection. Default: true.',
      'Enable merge row detection. Default: true.',
      'Compute Character Error Rate. Default: true.',
      'Compute Word Error Rate. Default: true.',
      'Compute Segmentation Error Rate. Default: true.',
      'Normalise Arabic/accented characters before comparison. Default: true.',
      'Compare rows strictly by position, skipping alignment. Default: false.',
      'Column names excluded from MODIFIED detection. Default: [].',
      'Include transcriptDiff on MODIFIED rows. Set false to skip char-level diff and reduce response size. Default: true.',
      'Pre-comparison find/replace rules applied to both sides before similarity scoring (max 20 rules). Default: [].',
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
      'Max combined character length before char-level diff falls back to word-level. Range 100–50 000. Default: 1500.',
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
  },
}

// ────────────────────── FRENCH ──────────────────────
const fr: StructuralApiI18n = {
  meta: {
    title: 'Documentation API Structural Diff — SheetDiff™',
    description:
      'API REST pour la comparaison différentielle structurelle de lignes de transcription. Détecte les lignes modifiées, divisées, fusionnées, ajoutées et supprimées avec scores CER/WER/SER. Conçue pour les agences de localisation et de transcription.',
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
    desc: 'Une API REST qui compare une transcription générée par IA avec la version post-éditée par l\'annotateur — détectant les changements structurels au niveau des lignes (divisions, fusions, modifications, ajouts, suppressions), avec détail des différences par colonne, scores CER/WER/SER et une note de qualité composite par lot.',
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
      'Taux d\'erreur de segmentation — proportion de lignes divisées ou fusionnées.',
      'CER calculé uniquement sur la colonne de transcription.',
      'WER calculé uniquement sur la colonne de transcription.',
    ],
    compositeTitle: 'Note composite',
    composite: [
      'Score de qualité pondéré (1,0–5,0, plus élevé = meilleur).',
      'Note alphabétique : A, B, C, D ou F.',
      'Étiquette lisible — ex. "Excellent", "Bon", "À améliorer".',
    ],
  },
  config: {
    title: 'Options de configuration',
    desc: 'Passez un objet config dans le corps de la requête pour remplacer les valeurs par défaut de l\'algorithme. Tous les champs sont optionnels.',
    params: [
      'Désactiver la détection des divisions et fusions. Diff ligne par ligne pur. Défaut : false.',
      'Activer la détection des lignes divisées. Défaut : true.',
      'Activer la détection des lignes fusionnées. Défaut : true.',
      'Calculer le taux d\'erreur de caractères. Défaut : true.',
      'Calculer le taux d\'erreur de mots. Défaut : true.',
      'Calculer le taux d\'erreur de segmentation. Défaut : true.',
      'Normaliser les caractères arabes/accentués avant la comparaison. Défaut : true.',
      'Comparer les lignes strictement par position, sans alignement. Défaut : false.',
      'Noms de colonnes exclus de la détection MODIFIED. Défaut : [].',
      'Inclure transcriptDiff dans les lignes MODIFIED. Mettre false pour ignorer le diff caractère par caractère et réduire la taille de réponse. Défaut : true.',
      'Règles find/replace appliquées aux deux côtés avant la comparaison par similarité (max 20 règles). Défaut : [].',
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
      'Longueur maximale combinée en caractères avant repli du diff caractère par caractère vers diff par mots. Plage 100–50 000. Défaut : 1500.',
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
  },
}

// ────────────────────── ARABIC ──────────────────────
const ar: StructuralApiI18n = {
  meta: {
    title: 'توثيق Structural Diff API — SheetDiff™',
    description:
      'واجهة برمجة تطبيقات REST لمقارنة الفروقات الهيكلية في صفوف النصوص المكتوبة. تكشف عن الصفوف المعدّلة والمقسّمة والمدمجة والمضافة والمحذوفة مع درجات CER/WER/SER. مصممة لوكالات الترجمة والتدقيق اللغوي.',
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
    desc: 'واجهة REST API تقارن النص المُنشأ بالذكاء الاصطناعي بالنسخة المُحرَّرة من قِبل المُعلِّم — تكشف التغييرات الهيكلية على مستوى الصفوف (تقسيم، دمج، تعديل، إضافة، حذف)، مع تفاصيل الفروق لكل عمود، ودرجات CER/WER/SER، ودرجة جودة مركّبة لكل دُفعة.',
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
      'معدل خطأ التجزئة — نسبة الصفوف المقسّمة أو المدمجة.',
      'CER محسوب فقط على عمود النص المكتوب.',
      'WER محسوب فقط على عمود النص المكتوب.',
    ],
    compositeTitle: 'الدرجة المركّبة',
    composite: [
      'درجة الجودة الموزونة (1.0–5.0، الأعلى كلما كان أفضل).',
      'الدرجة الحرفية: A، B، C، D، أو F.',
      'وسم قابل للقراءة — مثال: "ممتاز"، "جيد"، "يحتاج تحسين".',
    ],
  },
  config: {
    title: 'خيارات الإعداد',
    desc: 'مرّر كائن config في جسم الطلب لتجاوز القيم الافتراضية للخوارزمية. جميع الحقول اختيارية.',
    params: [
      'تعطيل كشف التقسيم والدمج. مقارنة صف بصف فقط. الافتراضي: false.',
      'تفعيل كشف الصفوف المقسّمة. الافتراضي: true.',
      'تفعيل كشف الصفوف المدمجة. الافتراضي: true.',
      'حساب معدل خطأ الأحرف. الافتراضي: true.',
      'حساب معدل خطأ الكلمات. الافتراضي: true.',
      'حساب معدل خطأ التجزئة. الافتراضي: true.',
      'توحيد الأحرف العربية/المعلَّمة قبل المقارنة. الافتراضي: true.',
      'مقارنة الصفوف بالترتيب الحرفي مع تخطي المحاذاة. الافتراضي: false.',
      'أسماء الأعمدة المستبعدة من كشف MODIFIED. الافتراضي: [].',
      'تضمين transcriptDiff في صفوف MODIFIED. ضبطه false لتخطي حساب الفروق حرفاً بحرف وتقليل حجم الاستجابة. الافتراضي: true.',
      'قواعد find/replace تُطبَّق على الجانبين قبل حساب التشابه (حد أقصى 20 قاعدة). الافتراضي: [].',
    ],
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
      'الحد الأقصى للطول المجموع للنص بالأحرف قبل التحوّل من فرق حرف-بحرف إلى فرق كلمة-بكلمة. النطاق 100–50 000. الافتراضي: 1500.',
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
  },
}

const translations: Record<string, StructuralApiI18n> = { en, fr, ar }

export function getStructuralApiI18n(locale: string): StructuralApiI18n {
  return translations[locale] ?? en
}

export type { StructuralApiI18n, DescItem, LinkedDesc }
