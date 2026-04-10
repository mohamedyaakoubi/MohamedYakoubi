// Demo Walkthrough i18n — EN / FR / AR

type DemoWalkthroughI18n = {
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
  scenario: {
    title: string
    body: string
    layers: Array<{ label: string; desc: string }>
    thisDemo: string
  }
  data: {
    title: string
    body: string
    columnMapNote: string
    adapterTitle: string
    adapterBody: string
  }
  request: {
    title: string
    preNote: string
    postNote: string
  }
  response: {
    title: string
    walkthrough: string
    rows: Array<{ status: string; rowRef: string; explanation: string }>
  }
  scores: {
    title: string
    intro: string
    cerExplained: string
    werExplained: string
    segerExplained: string
    serExplained: string
    gradeExplained: string
    gradeContext: string
  }
  footer: { info: string; back: string }
}

// ─────────────────── ENGLISH ───────────────────
const en: DemoWalkthroughI18n = {
  meta: {
    title: 'Demo Walkthrough — Structural Diff API',
    description:
      'End-to-end example using a real podcast transcript. Covers column name adaptation, a full POST /v1/diff request, and interpreting CER/WER/SegER/SER/SACR scores in the context of annotation QA.',
  },
  breadcrumb: { apiDocs: 'Structural Diff API', current: 'Demo Walkthrough' },
  nav: {
    backToApiDocs: '← Structural Diff API',
    onThisPage: 'On this page',
    sectionsBtn: 'Sections',
    sections: [
      { id: 'scenario',          title: 'The scenario' },
      { id: 'data',              title: 'The data' },
      { id: 'adapting-columns',  title: 'Adapting column names' },
      { id: 'the-request',       title: 'The request' },
      { id: 'the-response',      title: 'Walking through the response' },
      { id: 'reading-scores',    title: 'Reading the scores' },
    ],
    guidesLabel: 'Guides & Examples',
    guides: [
      { label: 'Config Parameters', slug: 'parameters' },
      { label: 'Diff Statuses',     slug: 'diff-statuses' },
      { label: 'Demo Walkthrough',  slug: 'demo' },
      { label: 'Playground',         slug: 'playground' },
    ],
  },
  hero: {
    title: 'Demo Walkthrough',
    subtitle: 'A real transcript. A real post-edit. A real diff.',
    intro:
      'This walkthrough uses an actual podcast transcript with non-standard column names to demonstrate the full integration loop: adapting your data format, calling the API, and interpreting every field in the response. The use case is a QA coordinator auditing an annotator\'s post-edit work before accepting a batch.',
  },
  scenario: {
    title: 'The scenario',
    body:
      'AI annotation projects for transcription and translation typically have multiple QA layers. Each layer is a handover point where a human reviews or edits the previous layer\'s output. The coordinator needs an objective record of what changed at each handover.',
    layers: [
      { label: 'Layer 0 — AI output',      desc: 'The platform exports an AI-generated transcript. This is your original array.' },
      { label: 'Layer 1 — Annotator edit',  desc: 'An annotator post-edits the transcript per the project\'s style guide (punctuation, numeral formatting, verbatim corrections, speaker IDs, timestamps). This is your reworked array.' },
      { label: 'Layer 2 — QA coordinator', desc: 'The coordinator calls POST /v1/diff with the two arrays. The diff report is attached to the batch before handoff to the client.' },
    ],
    thisDemo:
      'In this demo, the original is a 9-row podcast transcript about machine translation (EP101). The reworked version reflects typical annotator corrections: punctuation standardisation, numeral formatting, and one structural split (a too-long segment), plus one structural merge (two short consecutive statements by the same speaker).',
  },
  data: {
    title: 'The data',
    body:
      'The demo transcript uses the column names exported by a typical annotation platform. These do not match the API\'s standard field names (transcript, speaker, start_time, end_time, etc.):',
    columnMapNote:
      'The API needs transcript and optionally speaker, start_time, end_time to drive its alignment algorithm. Unknown fields (Show, Subject) are passed through unchanged and appear in snapData / currData.',
    adapterTitle: 'Adapting column names',
    adapterBody:
      'One-time key remapping before the API call. You only need to map fields the engine uses; the rest pass through automatically.',
  },
  request: {
    title: 'The request',
    preNote: 'After adapting column names, the full POST request body looks like this (truncated for readability):',
    postNote:
      'For the full demo dataset (9 original rows, 9 reworked rows after the split and merge), the body is about 8 KB — well within the 5 MB limit. Include x-request-id to correlate this call with the batch ID in your system.',
  },
  response: {
    title: 'Walking through the response',
    walkthrough:
      'The results array has one entry per original row, plus source rows for any merges. Here is what each row returns and why:',
    rows: [
      { status: 'UNCHANGED', rowRef: 'Row 0 — Sarah\'s intro line',        explanation: 'Exact match. The annotator did not touch this line.' },
      { status: 'MODIFIED',  rowRef: 'Row 1 — "Today we have..."',         explanation: 'Annotator added a comma after "Today". transcriptDiff highlights the insertion: [equal "Today"] [insert ","] [equal " we have two..."].' },
      { status: 'MODIFIED',  rowRef: 'Row 2 — James\'s thanks',            explanation: 'Multiple punctuation corrections. Full sentence structure edited for verbatim style. transcriptDiff shows several delete/insert pairs.' },
      { status: 'MODIFIED',  rowRef: 'Row 3 — Elena\'s "Same here"',       explanation: 'Annotator added a period after "Same here" and a comma before "especially". Classic verbatim punctuation norm.' },
      { status: 'MODIFIED',  rowRef: 'Row 4 — Sarah\'s question',          explanation: 'Comma added after "James", apostrophe correction in "let\'s", hyphen added in "low-resource". Three distinct corrections in one row.' },
      { status: 'SPLIT',     rowRef: 'Row 5 — James\'s long finding',      explanation: 'Original: one 46-word run-on sentence. Reworked: split at a natural clause boundary into two segments (25 + 11 words). "twelve" → "12" also corrected in part 1. SER incremented.' },
      { status: 'UNCHANGED', rowRef: 'Row 6 — James\'s "The trick..."',    explanation: 'Already well-formed. Annotator left it untouched.' },
      { status: 'MERGED',    rowRef: 'Rows 7+8 — Elena\'s two statements', explanation: 'Annotator merged two consecutive Elena lines into one segment with an em-dash. Both original rows are absorbed; a source row entry also appears in results for each.' },
    ],
  },
  scores: {
    title: 'Reading the scores',
    intro:
      'The scores object gives you a quantitative summary of the entire batch. Here is how to interpret the numbers in this demo context:',
    cerExplained:
      'CER ≈ 0.09 — About 9% of characters across all columns changed. This is low and expected: the annotator made punctuation and numeral corrections, which are short character-level changes in long segments.',
    werExplained:
      'WER ≈ 0.14 — About 14% of words changed. Higher than CER because one word swap ("twelve" → "12") counts as a full-word change, and the split/merge structural changes each touch a segment boundary.',
    segerExplained:
      'SegER ≈ 0.22 — About 22% of original rows had boundary-changing structural events (1 split + 1 merge out of 9 rows = 2/9). This is typical for a first annotation pass on AI output where the AI over- or under-segmented in a few places.',
    serExplained:
      'SER ≈ 0.67 — About 67% of comparable rows (UNCHANGED + MODIFIED) contain at least one edit: 4 MODIFIED out of 6 comparable rows. This measures per-sentence edit frequency, independent of structural events.',
    gradeExplained:
      'Composite grade B / "Good" (score ≈ 3.9) — The weighted formula rewards a low edit rate and penalises structural changes. A B grade tells the coordinator: the annotator made real corrections (not a rubber-stamp), but the overall volume of change is controlled.',
    gradeContext:
      'Grade interpretation in annotation QA context: A = near-perfect AI output, minimal corrections. B = solid QA pass, expected corrections. C = significant post-editing required, AI quality needs investigation. D/F = the batch may need a full re-annotation or a reject/send-back decision.',
  },
  footer: {
    info: 'Demo Walkthrough · Structural Diff API · Built by',
    back: '← Back to Structural Diff API',
  },
}

// ─────────────────── FRENCH ───────────────────
const fr: DemoWalkthroughI18n = {
  meta: {
    title: 'Démonstration complète — API Structural Diff',
    description:
      'Exemple de bout en bout avec une vraie transcription de podcast. Couvre l\'adaptation des noms de colonnes, une requête POST /v1/diff complète et l\'interprétation des scores CER/WER/SegER/SER/SACR dans le contexte du QA d\'annotation.',
  },
  breadcrumb: { apiDocs: 'API Structural Diff', current: 'Démonstration complète' },
  nav: {
    backToApiDocs: '← API Structural Diff',
    onThisPage: 'Sur cette page',
    sectionsBtn: 'Sections',
    sections: [
      { id: 'scenario',         title: 'Le scénario' },
      { id: 'data',             title: 'Les données' },
      { id: 'adapting-columns', title: 'Adapter les colonnes' },
      { id: 'the-request',      title: 'La requête' },
      { id: 'the-response',     title: 'Parcourir la réponse' },
      { id: 'reading-scores',   title: 'Lire les scores' },
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
    title: 'Démonstration complète',
    subtitle: 'Une vraie transcription. Une vraie post-édition. Un vrai diff.',
    intro:
      'Cette démonstration utilise une véritable transcription de podcast avec des noms de colonnes non standard pour illustrer la boucle d\'intégration complète : adaptation du format de données, appel de l\'API et interprétation de chaque champ de la réponse. Le cas d\'utilisation est un coordinateur QA auditant le travail de post-édition d\'un annotateur avant d\'accepter un lot.',
  },
  scenario: {
    title: 'Le scénario',
    body:
      'Les projets d\'annotation IA pour la transcription et la traduction ont typiquement plusieurs couches QA. Chaque couche est un point de transfert où un humain révise ou édite la sortie de la couche précédente. Le coordinateur a besoin d\'un enregistrement objectif de ce qui a changé à chaque transfert.',
    layers: [
      { label: 'Couche 0 — Sortie IA',          desc: 'La plateforme exporte une transcription générée par IA. C\'est votre tableau original.' },
      { label: 'Couche 1 — Édition annotateur',  desc: 'Un annotateur post-édite la transcription selon le guide de style du projet (ponctuation, formatage des chiffres, corrections verbatim, IDs de locuteurs, timestamps). C\'est votre tableau reworked.' },
      { label: 'Couche 2 — Coordinateur QA',    desc: 'Le coordinateur appelle POST /v1/diff avec les deux tableaux. Le rapport diff est joint au lot avant la remise au client.' },
    ],
    thisDemo:
      'Dans cette démonstration, l\'original est une transcription de podcast de 9 lignes sur la traduction automatique (EP101). La version retravaillée reflète des corrections typiques d\'annotateur : standardisation de la ponctuation, formatage des chiffres, une division structurelle et une fusion structurelle.',
  },
  data: {
    title: 'Les données',
    body:
      'La transcription de démonstration utilise les noms de colonnes exportés par une plateforme d\'annotation typique. Ceux-ci ne correspondent pas aux noms de champs standard de l\'API :',
    columnMapNote:
      'L\'API a besoin de transcript et optionnellement speaker, start_time, end_time pour son algorithme d\'alignement. Les champs inconnus (Show, Subject) sont transmis sans modification.',
    adapterTitle: 'Adapter les noms de colonnes',
    adapterBody:
      'Remappage de clés unique avant l\'appel API. Vous devez seulement mapper les champs utilisés par le moteur ; les autres passent automatiquement.',
  },
  request: {
    title: 'La requête',
    preNote: 'Après adaptation des noms de colonnes, le corps complet de la requête POST ressemble à ceci (tronqué pour la lisibilité) :',
    postNote:
      'Pour le jeu de données complet (9 lignes originales, 9 lignes retravaillées après division et fusion), le corps fait environ 8 Ko — bien en dessous de la limite de 5 Mo. Incluez x-request-id pour corréler cet appel avec l\'ID du lot dans votre système.',
  },
  response: {
    title: 'Parcourir la réponse',
    walkthrough:
      'Le tableau results a une entrée par ligne originale, plus des lignes source pour tout merge. Voici ce que retourne chaque ligne et pourquoi :',
    rows: [
      { status: 'UNCHANGED', rowRef: 'Ligne 0 — Intro de Sarah',           explanation: 'Correspondance exacte. L\'annotateur n\'a pas touché cette ligne.' },
      { status: 'MODIFIED',  rowRef: 'Ligne 1 — "Today we have..."',        explanation: 'Annotateur a ajouté une virgule après "Today". transcriptDiff met en évidence l\'insertion.' },
      { status: 'MODIFIED',  rowRef: 'Ligne 2 — Remerciements de James',    explanation: 'Multiples corrections de ponctuation. Structure de phrase entière éditée pour le style verbatim.' },
      { status: 'MODIFIED',  rowRef: 'Ligne 3 — "Same here" d\'Elena',      explanation: 'Ajout d\'un point après "Same here" et d\'une virgule avant "especially". Norme de ponctuation verbatim classique.' },
      { status: 'MODIFIED',  rowRef: 'Ligne 4 — Question de Sarah',         explanation: 'Virgule après "James", correction d\'apostrophe dans "let\'s", trait d\'union dans "low-resource". Trois corrections distinctes.' },
      { status: 'SPLIT',     rowRef: 'Ligne 5 — Long résultat de James',    explanation: 'Original : 46 mots en une seule phrase. Retravaillé : divisé en deux segments à une frontière naturelle. "twelve" → "12" corrigé aussi. SER incrémenté.' },
      { status: 'UNCHANGED', rowRef: 'Ligne 6 — "The trick" de James',      explanation: 'Déjà bien formé. Annotateur l\'a laissé intact.' },
      { status: 'MERGED',    rowRef: 'Lignes 7+8 — Deux déclarations d\'Elena', explanation: 'Annotateur a fusionné deux lignes Elena consécutives en un segment avec un em-dash. Les deux lignes originales sont absorbées.' },
    ],
  },
  scores: {
    title: 'Lire les scores',
    intro:
      'L\'objet scores donne un résumé quantitatif du lot. Voici comment interpréter les chiffres dans ce contexte de démonstration :',
    cerExplained:
      'CER ≈ 0.09 — Environ 9% des caractères ont changé. C\'est faible et attendu : corrections de ponctuation et de chiffres dans de longs segments.',
    werExplained:
      'WER ≈ 0.14 — Environ 14% des mots ont changé. Plus élevé que CER car un échange ("twelve" → "12") compte comme un changement de mot entier.',
    segerExplained:
      'SegER ≈ 0.22 — Environ 22% des lignes originales ont eu des événements structurels (1 split + 1 merge sur 9 = 2/9). Typique pour un premier passage d\'annotation.',
    serExplained:
      'SER ≈ 0.67 — Environ 67% des lignes comparables (UNCHANGED + MODIFIED) contiennent au moins une modification : 4 MODIFIED sur 6 lignes comparables. Mesure la fréquence d\'édition par ligne, indépendamment des événements structurels.',
    gradeExplained:
      'Note composite B / "Good" (score ≈ 3.9) — La formule pondérée récompense un faible taux d\'édition et pénalise les changements structurels. Une note B indique que l\'annotateur a fait de vraies corrections, mais le volume global est contrôlé.',
    gradeContext:
      'Interprétation des notes en contexte QA : A = sortie IA quasi-parfaite. B = bon passage QA, corrections attendues. C = post-édition significative requise. D/F = le lot peut nécessiter une ré-annotation complète.',
  },
  footer: {
    info: 'Démonstration complète · API Structural Diff · Développé par',
    back: '← Retour à l\'API Structural Diff',
  },
}

// ─────────────────── ARABIC ───────────────────
const ar: DemoWalkthroughI18n = {
  meta: {
    title: 'درس تطبيقي كامل — Structural Diff API',
    description:
      'مثال شامل من البداية إلى النهاية باستخدام نص بودكاست حقيقي. يغطي تكييف أسماء الأعمدة، وطلب POST /v1/diff كاملاً، وتفسير درجات CER/WER/SegER/SER/SACR في سياق QA التدقيق.',
  },
  breadcrumb: { apiDocs: 'Structural Diff API', current: 'درس تطبيقي كامل' },
  nav: {
    backToApiDocs: '← Structural Diff API',
    onThisPage: 'في هذه الصفحة',
    sectionsBtn: 'الأقسام',
    sections: [
      { id: 'scenario',         title: 'السيناريو' },
      { id: 'data',             title: 'البيانات' },
      { id: 'adapting-columns', title: 'تكييف الأعمدة' },
      { id: 'the-request',      title: 'الطلب' },
      { id: 'the-response',     title: 'استعراض الاستجابة' },
      { id: 'reading-scores',   title: 'قراءة الدرجات' },
    ],
    guidesLabel: 'الأدلة والأمثلة',
    guides: [
      { label: 'معاملات الإعداد',  slug: 'parameters' },
      { label: 'حالات الـ diff',   slug: 'diff-statuses' },
      { label: 'درس تطبيقي كامل', slug: 'demo' },
      { label: 'Playground',      slug: 'playground' },
    ],
  },
  hero: {
    title: 'درس تطبيقي كامل',
    subtitle: 'نص حقيقي. تحرير حقيقي. diff حقيقي.',
    intro:
      'يستخدم هذا الدرس نصاً حقيقياً لبودكاست بأسماء أعمدة غير قياسية لعرض حلقة التكامل الكاملة: تكييف تنسيق البيانات، استدعاء الـ API، وتفسير كل حقل في الاستجابة. حالة الاستخدام هي منسق QA يراجع عمل تحرير المُدقِّق قبل قبول دفعة.',
  },
  scenario: {
    title: 'السيناريو',
    body:
      'مشاريع تدقيق الذكاء الاصطناعي للنسخ النصي والترجمة لها عادةً طبقات QA متعددة. كل طبقة نقطة تسليم حيث يراجع إنسان أو يُحرِّر مخرجات الطبقة السابقة. يحتاج المنسق إلى سجل موضوعي لما تغيّر في كل تسليم.',
    layers: [
      { label: 'الطبقة 0 — مخرج الذكاء الاصطناعي', desc: 'تُصدِّر المنصة نصاً مُولَّداً بالذكاء الاصطناعي. هذا هو المصفوفة الأصلية.' },
      { label: 'الطبقة 1 — تحرير المُدقِّق',         desc: 'يُحرِّر مُدقِّق النص فق أسلوب المشروع (الترقيم، تنسيق الأرقام، التصحيحات الحرفية، معرّفات المتحدثين، الطوابع الزمنية). هذه المصفوفة المُعادة.' },
      { label: 'الطبقة 2 — منسق QA',                desc: 'يستدعي المنسق POST /v1/diff بالمصفوفتين. يُرفق تقرير الـ diff بالدفعة قبل التسليم للعميل.' },
    ],
    thisDemo:
      'في هذا الدرس، الأصل نص بودكاست من 9 صفوف حول الترجمة الآلية (EP101). النسخة المُعادة تعكس تصحيحات تدقيق نموذجية: توحيد الترقيم، تنسيق الأرقام، تقسيم هيكلي واحد، ودمج هيكلي واحد.',
  },
  data: {
    title: 'البيانات',
    body:
      'يستخدم النص التجريبي أسماء الأعمدة المُصدَّرة من منصة تدقيق نموذجية. هذه لا تتطابق مع أسماء الحقول القياسية للـ API:',
    columnMapNote:
      'يحتاج الـ API إلى transcript واختيارياً speaker وstart_time وend_time لتشغيل خوارزمية المحاذاة. الحقول المجهولة (Show، Subject) تُمرَّر دون تغيير.',
    adapterTitle: 'تكييف أسماء الأعمدة',
    adapterBody:
      'إعادة تعيين المفاتيح مرة واحدة قبل استدعاء الـ API. تحتاج فقط لتعيين الحقول التي يستخدمها المحرك؛ الباقي يمر تلقائياً.',
  },
  request: {
    title: 'الطلب',
    preNote: 'بعد تكييف أسماء الأعمدة، يبدو جسم طلب POST الكامل هكذا (مختصر للقراءة):',
    postNote:
      'للمجموعة الكاملة (9 صفوف أصلية، 9 صفوف مُعادة بعد التقسيم والدمج)، الجسم حوالي 8 كيلوبايت — أقل بكثير من الحد الأقصى 5 ميجابايت. أضِف x-request-id لربط هذا الاستدعاء بمعرّف الدفعة في نظامك.',
  },
  response: {
    title: 'استعراض الاستجابة',
    walkthrough:
      'مصفوفة results تحتوي على إدخال لكل صف أصلي، بالإضافة إلى الصفوف المصدرية لأي دمج. إليك ما يُعيده كل صف ولماذا:',
    rows: [
      { status: 'UNCHANGED', rowRef: 'الصف 0 — مقدمة سارة',             explanation: 'تطابق دقيق. لم يلمس المُدقِّق هذا الصف.' },
      { status: 'MODIFIED',  rowRef: 'الصف 1 — "Today we have..."',      explanation: 'أضاف المُدقِّق فاصلة بعد "Today". transcriptDiff يُبرز الإدراج.' },
      { status: 'MODIFIED',  rowRef: 'الصف 2 — شكر جيمس',               explanation: 'تصحيحات ترقيم متعددة. هيكل الجملة بأكمله حُرِّر لأسلوب حرفي.' },
      { status: 'MODIFIED',  rowRef: 'الصف 3 — "Same here" لإيلينا',    explanation: 'أضاف المُدقِّق نقطة بعد "Same here" وفاصلة قبل "especially". معيار ترقيم حرفي كلاسيكي.' },
      { status: 'MODIFIED',  rowRef: 'الصف 4 — سؤال سارة',              explanation: 'فاصلة بعد "James"، تصحيح apostrophe في "let\'s"، شرطة في "low-resource". ثلاثة تصحيحات مميزة في صف واحد.' },
      { status: 'SPLIT',     rowRef: 'الصف 5 — نتيجة جيمس الطويلة',     explanation: 'الأصل: 46 كلمة في جملة واحدة. المُعاد: مقسَّم إلى مقطعين عند حد طبيعي. "twelve" → "12" أيضاً. يزيد SER.' },
      { status: 'UNCHANGED', rowRef: 'الصف 6 — "The trick" لجيمس',      explanation: 'كان مُشكَّلاً جيداً بالفعل. تركه المُدقِّق دون تغيير.' },
      { status: 'MERGED',    rowRef: 'الصفوف 7+8 — تصريحان لإيلينا',    explanation: 'دمج المُدقِّق سطرَي إيلينا المتتاليين في مقطع واحد بشرطة em. الصفّان الأصليان ممتصان.' },
    ],
  },
  scores: {
    title: 'قراءة الدرجات',
    intro:
      'يُعطيك كائن scores ملخصاً كمياً للدفعة كاملة. إليك كيفية تفسير الأرقام في سياق هذا الدرس:',
    cerExplained:
      'CER ≈ 0.09 — حوالي 9% من الحروف تغيرت. منخفض ومتوقع: تصحيحات الترقيم والأرقام هي تغييرات قصيرة على مستوى الحروف في مقاطع طويلة.',
    werExplained:
      'WER ≈ 0.14 — حوالي 14% من الكلمات تغيرت. أعلى من CER لأن استبدال كلمة ("twelve" → "12") يُعدّ تغيير كلمة كامل، والتغييرات الهيكلية تمس كل حدود المقطع.',
    segerExplained:
      'SegER ≈ 0.22 — حوالي 22% من الصفوف الأصلية تغيرت هيكلياً (1 split + 1 merge من 9 = 2/9). نموذجي لأول مرور تدقيق على مخرج ذكاء اصطناعي.',
    serExplained:
      'SER ≈ 0.67 — حوالي 67% من الصفوف القابلة للمقارنة (UNCHANGED + MODIFIED) تحتوي على تعديل واحد على الأقل: 4 MODIFIED من 6 صفوف قابلة. يقيس تكرار التحرير باستقلالية عن الأحداث الهيكلية.',
    gradeExplained:
      'الدرجة المركّبة B / "Good" (درجة ≈ 3.9) — المعادلة الموزونة تُكافئ معدل تحرير منخفض وتُعاقب التغييرات الهيكلية. الدرجة B تُخبر المنسق: قام المُدقِّق بتصحيحات حقيقية (لم يوافق فقط)، لكن الحجم الإجمالي مضبوط.',
    gradeContext:
      'تفسير الدرجات في سياق QA التدقيق: A = مخرج ذكاء اصطناعي شبه مثالي. B = مرور QA سليم، تصحيحات متوقعة. C = مطلوب تحرير كبير. D/F = الدفعة قد تحتاج إعادة تدقيق كاملة.',
  },
  footer: {
    info: 'درس تطبيقي كامل · Structural Diff API · تطوير',
    back: '← العودة إلى Structural Diff API',
  },
}

const translations: Record<string, DemoWalkthroughI18n> = { en, fr, ar }

export function getDemoWalkthroughI18n(locale: string): DemoWalkthroughI18n {
  return translations[locale] ?? en
}

export type { DemoWalkthroughI18n }
