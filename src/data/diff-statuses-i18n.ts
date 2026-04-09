// Diff Statuses Deep Dive — i18n for EN / FR / AR

type DiffStatusesI18n = {
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
  pipelineNote: {
    title: string
    body: string
    filterHint: string
  }
  statuses: {
    UNCHANGED: StatusEntry
    MODIFIED:  StatusEntry
    ADDED:     StatusEntry
    DELETED:   StatusEntry
    SPLIT:     StatusEntry
    MERGED:    StatusEntry
  }
  transcriptDiff: {
    title: string
    body: string
    tokenTypes: string[]
  }
  sourceRows: {
    title: string
    body: string
    filterCode: string
  }
  countsTable: {
    title: string
    intro: string
    headers: { status: string; countStrategy: string; note: string }
    rows: Array<{ status: string; strategy: string; note: string }>
  }
  footer: { info: string; back: string }
}

type StatusEntry = {
  title: string
  definition: string
  whenYouSeeThis: string
  inputNote: string
  responseNote: string
  workflowContext: string
}

// ─────────────────── ENGLISH ───────────────────
const en: DiffStatusesI18n = {
  meta: {
    title: 'Diff Statuses Deep Dive — Structural Diff API',
    description:
      'Full reference for every diff status: UNCHANGED, MODIFIED, ADDED, DELETED, SPLIT, and MERGED. Includes input/output examples, workflow context, and notes on source row handling.',
  },
  breadcrumb: { apiDocs: 'API Reference', current: 'Diff Statuses' },
  nav: {
    backToApiDocs: '← API Reference',
    onThisPage: 'On this page',
    sectionsBtn: 'Sections',
    sections: [
      { id: 'engine-pipeline',  title: 'Engine pipeline note' },
      { id: 'UNCHANGED',        title: 'UNCHANGED' },
      { id: 'MODIFIED',         title: 'MODIFIED' },
      { id: 'ADDED',            title: 'ADDED' },
      { id: 'DELETED',          title: 'DELETED' },
      { id: 'SPLIT',            title: 'SPLIT' },
      { id: 'MERGED',           title: 'MERGED' },
      { id: 'transcriptDiff',   title: 'transcriptDiff field' },
      { id: 'source-rows',      title: 'Source rows (MERGED)' },
      { id: 'counts-table',     title: 'Counting statuses' },
    ],
    guidesLabel: 'Guides',
    guides: [
      { label: 'Config Parameters', slug: 'parameters' },
      { label: 'Diff Statuses',     slug: 'diff-statuses' },
      { label: 'Demo Walkthrough',  slug: 'demo' },
      { label: 'Live Simulator',    slug: 'live-demo' },
    ],
  },
  hero: {
    title: 'Diff Statuses',
    subtitle: 'One input/output example per status. No ambiguity.',
    intro:
      'The engine assigns exactly one status to each original row after the 8-pass alignment. SPLIT and MERGED are the only cases where one input row maps to multiple output rows (or vice versa). This page shows the minimal payload that reliably triggers each status, the expected response structure, and the workflow context where each status appears in real annotation pipelines.',
  },
  pipelineNote: {
    title: 'Engine pipeline note',
    body:
      'The 8-pass algorithm processes every original row against every reworked row and assigns the best status based on text similarity, timestamp proximity, and structural checks. The passes run in order: exact match → high-similarity → split detection → merge detection → weak matches → unmatched leftovers. This means a row can only get one status — the engine commits in pass order and skips already-matched rows.',
    filterHint:
      'When iterating results to build a summary count, skip rows where notes contains "Source row". These are MERGED artifacts (one per absorbed original) and should not be double-counted.',
  },
  statuses: {
    UNCHANGED: {
      title: 'UNCHANGED',
      definition:
        'Both the original and reworked arrays contain a row with identical content across all mapped columns (after whitespace normalization). The engine matched them in the first pass (exact match) or high-similarity pass.',
      whenYouSeeThis:
        'Every row that the annotator accepted without any change. In a typical annotation QA batch, UNCHANGED represents 20–60% of rows depending on how heavily the annotator edited.',
      inputNote:
        'The transcript text and all other mapped columns must be identical. Case and punctuation are significant.',
      responseNote:
        'The result row has status: "UNCHANGED". Both snapData (original cell values) and currData (reworked cell values) are present and identical. The notes field is "exact match" or "high similarity match".',
      workflowContext:
        'A very high UNCHANGED rate (>90%) may indicate the annotator did not fully review the transcript. A very low rate (<10%) may indicate the AI baseline was poor quality or the annotator over-edited.',
    },
    MODIFIED: {
      title: 'MODIFIED',
      definition:
        'The engine matched a row from original to a row in reworked (by similarity and/or position), but at least one column value changed. This is the most common status.',
      whenYouSeeThis:
        'Text corrections, punctuation edits, number formatting, speaker name corrections, timestamp edits, or emotion label changes. Anything short of adding/removing segments.',
      inputNote:
        'The row must exist in both versions. The engine needs sufficient similarity to make a confident match before it checks what changed.',
      responseNote:
        'When the transcript column changed, the response includes a transcriptDiff array with character-level diff tokens — each token has type: "EQUAL" | "DELETE" | "INSERT" (UPPERCASE) and a text field. Absent when enableInlineDiff: false is set in config.',
      workflowContext:
        'In AI annotation QA, MODIFIED rows are the primary review target. Each one represents a correction the annotator made. CER and WER in the scores object are computed from these changes.',
    },
    ADDED: {
      title: 'ADDED',
      definition:
        'A row in reworked has no match in original. The engine exhausted all matching passes and could not find a source row.',
      whenYouSeeThis:
        'The annotator added a segment that the AI missed. Common causes: AI failed to detect a quiet segment, cropped audio, code-switch not detected, or the annotator split an AI row (one of the split parts may surface as ADDED if the engine doesn\'t detect the split).',
      inputNote:
        'Set enableSplits: false if you want all splits to surface as MODIFIED + ADDED rather than the structural SPLIT label.',
      responseNote:
        'Only currData is present (no snapData because there is no original row). The notes field is "new row in reworked".',
      workflowContext:
        'The ADDED count in your results tells you how many segments the AI missed. Combined with the DELETED count, you get the baseline\'s segmentation quality.',
    },
    DELETED: {
      title: 'DELETED',
      definition:
        'A row in original has no match in reworked. The annotator removed it entirely.',
      whenYouSeeThis:
        'The AI transcribed noise or silence as speech, produced a false utterance, created a duplicate segment at a boundary, or the segment was genuinely empty.',
      inputNote:
        'A DELETED row means the annotator made an explicit removal decision — this differs from a MODIFIED row where only the content changed.',
      responseNote:
        'Only snapData is present (no currData). The notes field is "row removed from reworked".',
      workflowContext:
        'Unexpected DELETEDs in a review pass indicate the reviewer is more aggressively cleaning than expected, or the AI baseline has quality issues. Track the DELETED/original ratio across batches.',
    },
    SPLIT: {
      title: 'SPLIT',
      definition:
        'One original row maps to two or more consecutive reworked rows whose combined transcript reconstructs the original. The engine validates that the combined text similarity exceeds SPLIT_COMBINED_MIN.',
      whenYouSeeThis:
        'The annotator determined the AI segment was too long and contained two distinct utterances or speaker turns, and split it at a natural boundary. Per annotation guidelines, segments should be split whenever a long utterance contains a meaningful pause or a thought boundary.',
      inputNote:
        'The original row must be sufficiently similar to the combined text of the reworked rows. Timestamp plausibility is also checked if timestamps are present.',
      responseNote:
        'The original row entry has status: "SPLIT". The reworked rows it maps to are enumerated in the result. SER (Segmentation Error Rate) is incremented by this row.',
      workflowContext:
        'Splits are the most significant structural change between annotation layers. A high SPLIT count in Layer 1→Layer 2 indicates Layer 1 was under-segmenting. If this is expected, it\'s informational. If unexpected, it warrants review.',
    },
    MERGED: {
      title: 'MERGED',
      definition:
        'Two or more original rows map to one reworked row whose transcript is close to the combined text of the originals.',
      whenYouSeeThis:
        'The annotator determined consecutive AI segments should be joined into one. Common when the AI over-segmented at breath pauses or punctuation boundaries. Also occurs when two speakers\' short utterances are merged into one attributed segment.',
      inputNote:
        'The absorbed original rows must have sufficient combined text similarity to the merged reworked row. The absorbed rows are also present in the result as "Source row" entries with status MERGED.',
      responseNote:
        'The primary merged result row (the reworked row) has status: "MERGED". Each absorbed original row also appears in the results with notes: "Source row 1/N · merged into reworked row X". Filter these out when counting statuses.',
      workflowContext:
        'A high MERGED count indicates the AI over-segmented. Combined with SPLIT, the ratio tells you whether the AI tends toward over- or under-segmentation relative to your annotation standard.',
    },
  },
  transcriptDiff: {
    title: 'transcriptDiff: inline character-level diff',
    body:
      'For MODIFIED rows where the transcript column changed, the response includes a transcriptDiff array. Each token in the array has a type ("EQUAL", "DELETE", or "INSERT") and a text field (the characters). Tokens of the same type may be merged: a single-word swap appears as one "DELETE" + one "INSERT" token, not character by character. Note: types are UPPERCASE. This field is absent when enableInlineDiff: false is set.',
    tokenTypes: [
      '"EQUAL" — characters present in both versions (render as plain text)',
      '"DELETE" — characters present only in original (render with strikethrough or red highlight)',
      '"INSERT" — characters present only in reworked (render with green highlight)',
    ],
  },
  sourceRows: {
    title: 'Source rows (MERGED artifact)',
    body:
      'When a MERGE is detected, the results array includes both the merged result row and one "Source row" entry per absorbed original. Source rows have status: "MERGED" and notes starting with "Source row 1/N · merged into reworked row X". They exist so you can trace exactly which original rows contributed to the merge.',
    filterCode:
      '// Skip source rows when building a summary count\nconst primaryResults = results.filter(\n  r => !(r.status === "MERGED" && r.notes?.includes("Source row"))\n)',
  },
  countsTable: {
    title: 'Counting statuses correctly',
    intro:
      'The results array length equals originalRows + number-of-SPLIT-extra-reworked-rows + MERGED-source-rows. Use this table to build correct summary counts:',
    headers: { status: 'Status', countStrategy: 'Count strategy', note: 'Note' },
    rows: [
      { status: 'UNCHANGED', strategy: 'Count all', note: '' },
      { status: 'MODIFIED',  strategy: 'Count all', note: '' },
      { status: 'ADDED',     strategy: 'Count all', note: '' },
      { status: 'DELETED',   strategy: 'Count all', note: '' },
      { status: 'SPLIT',     strategy: 'Count all', note: 'One entry per original row that was split, regardless of how many reworked rows it produced' },
      { status: 'MERGED',    strategy: 'Count only rows where notes does NOT contain "Source row"', note: 'Source rows are trace entries for the absorbed originals — skip them in counts' },
    ],
  },
  footer: {
    info: 'Diff Statuses Guide · Structural Diff API · Built by',
    back: '← Back to API Reference',
  },
}

// ─────────────────── FRENCH ───────────────────
const fr: DiffStatusesI18n = {
  meta: {
    title: 'Guide des statuts de diff — API Structural Diff',
    description:
      'Référence complète pour chaque statut de diff : UNCHANGED, MODIFIED, ADDED, DELETED, SPLIT et MERGED. Inclut des exemples d\'entrée/sortie, le contexte de workflow et la gestion des lignes source.',
  },
  breadcrumb: { apiDocs: 'Référence API', current: 'Statuts de diff' },
  nav: {
    backToApiDocs: '← Référence API',
    onThisPage: 'Sur cette page',
    sectionsBtn: 'Sections',
    sections: [
      { id: 'engine-pipeline', title: 'Note sur le pipeline' },
      { id: 'UNCHANGED',       title: 'UNCHANGED' },
      { id: 'MODIFIED',        title: 'MODIFIED' },
      { id: 'ADDED',           title: 'ADDED' },
      { id: 'DELETED',         title: 'DELETED' },
      { id: 'SPLIT',           title: 'SPLIT' },
      { id: 'MERGED',          title: 'MERGED' },
      { id: 'transcriptDiff',  title: 'Champ transcriptDiff' },
      { id: 'source-rows',     title: 'Lignes source (MERGED)' },
      { id: 'counts-table',    title: 'Comptage des statuts' },
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
    title: 'Statuts de diff',
    subtitle: 'Un exemple d\'entrée/sortie par statut. Sans ambiguïté.',
    intro:
      'Le moteur assigne exactement un statut à chaque ligne originale après l\'alignement en 8 passes. SPLIT et MERGED sont les seuls cas où une ligne d\'entrée correspond à plusieurs lignes de sortie (ou vice versa). Cette page montre le payload minimal déclenchant chaque statut, la structure de réponse attendue et le contexte de workflow.',
  },
  pipelineNote: {
    title: 'Note sur le pipeline du moteur',
    body:
      'L\'algorithme en 8 passes traite chaque ligne originale contre toutes les lignes retravaillées et assigne le meilleur statut basé sur la similarité textuelle, la proximité temporelle et les vérifications structurelles. Les passes s\'exécutent en ordre : correspondance exacte → haute similarité → détection de division → détection de fusion → correspondances faibles → restes non appariés.',
    filterHint:
      'Pour construire un comptage résumé, ignorez les lignes où notes contient "Source row". Ce sont des artefacts MERGED qui ne doivent pas être comptés deux fois.',
  },
  statuses: {
    UNCHANGED: {
      title: 'UNCHANGED',
      definition: 'Les deux versions contiennent une ligne au contenu identique sur toutes les colonnes mappées (après normalisation des espaces).',
      whenYouSeeThis: 'Chaque ligne que l\'annotateur a acceptée sans modification. Représente typiquement 20–60% des lignes selon le niveau d\'édition.',
      inputNote: 'Le texte de transcription et toutes les colonnes mappées doivent être identiques. La casse et la ponctuation sont significatives.',
      responseNote: 'snapData et currData sont présents et identiques. Le champ notes vaut "exact match" ou "high similarity match".',
      workflowContext: 'Un taux UNCHANGED très élevé (>90%) peut indiquer que l\'annotateur n\'a pas examiné complètement la transcription. Un taux très bas (<10%) peut indiquer une mauvaise qualité de base AI ou une sur-édition.',
    },
    MODIFIED: {
      title: 'MODIFIED',
      definition: 'Le moteur a fait correspondre une ligne de l\'original à une ligne dans reworked, mais au moins une valeur de colonne a changé.',
      whenYouSeeThis: 'Corrections textuelles, modifications de ponctuation, formatage des chiffres, corrections de noms de locuteurs, modifications de timestamps ou d\'étiquettes d\'émotion.',
      inputNote: 'La ligne doit exister dans les deux versions avec une similarité suffisante pour que le moteur fasse une correspondance confiante.',
      responseNote: 'Quand la colonne transcript a changé, la réponse inclut un tableau transcriptDiff avec des tokens de diff au niveau caractère.',
      workflowContext: 'Les lignes MODIFIED sont la cible principale de révision. Chacune représente une correction faite par l\'annotateur. CER et WER sont calculés à partir de ces changements.',
    },
    ADDED: {
      title: 'ADDED',
      definition: 'Une ligne dans reworked n\'a pas de correspondance dans original. Le moteur a épuisé toutes les passes de correspondance sans trouver de source.',
      whenYouSeeThis: 'L\'annotateur a ajouté un segment manquant dans l\'IA. Causes courantes : segment silencieux non détecté, code-switching manqué, ou division surfacée en ADDED si la détection de split est désactivée.',
      inputNote: 'Activez enableSplits: false si vous voulez que toutes les divisions remontent comme MODIFIED + ADDED plutôt que le label structurel SPLIT.',
      responseNote: 'Seul currData est présent (pas de snapData). Le champ notes vaut "new row in reworked".',
      workflowContext: 'Le comptage ADDED indique combien de segments l\'IA a manqués. Combiné à DELETED, vous obtenez la qualité de segmentation de la base.',
    },
    DELETED: {
      title: 'DELETED',
      definition: 'Une ligne dans original n\'a pas de correspondance dans reworked. L\'annotateur l\'a supprimée entièrement.',
      whenYouSeeThis: 'L\'IA a transcrit du bruit comme de la parole, produit une fausse utterance, ou créé un segment dupliqué à une frontière.',
      inputNote: 'Une ligne DELETED signifie que l\'annotateur a pris une décision de suppression explicite — contrairement à MODIFIED où seul le contenu a changé.',
      responseNote: 'Seul snapData est présent (pas de currData). Le champ notes vaut "row removed from reworked".',
      workflowContext: 'Des DELETED inattendus dans une passe de révision indiquent un nettoyage plus agressif qu\'attendu ou des problèmes de qualité du modèle AI.',
    },
    SPLIT: {
      title: 'SPLIT',
      definition: 'Une ligne originale correspond à deux ou plusieurs lignes retravaillées consécutives dont la transcription combinée reconstruit l\'original.',
      whenYouSeeThis: 'L\'annotateur a déterminé que le segment IA était trop long et contenait deux utterances distinctes ou deux tours de parole, et l\'a divisé à une frontière naturelle.',
      inputNote: 'La ligne originale doit être suffisamment similaire au texte combiné des lignes retravaillées. La plausibilité temporelle est également vérifiée.',
      responseNote: 'L\'entrée de ligne originale a status: "SPLIT". Le SER (taux d\'erreur de segmentation) est incrémenté par cette ligne.',
      workflowContext: 'Les splits sont le changement structurel le plus significatif entre les couches d\'annotation. Un comptage élevé indique que la couche précédente sous-segmentait.',
    },
    MERGED: {
      title: 'MERGED',
      definition: 'Deux lignes originales ou plus correspondent à une ligne retravaillée dont la transcription est proche du texte combiné des originaux.',
      whenYouSeeThis: 'L\'annotateur a déterminé que des segments consécutifs devaient être joints. Courant quand l\'IA a sur-segmenté aux pauses respiratoires ou aux frontières de ponctuation.',
      inputNote: 'Les lignes originales absorbées doivent avoir une similarité textuelle combinée suffisante. Elles apparaissent aussi dans les résultats comme entrées "Source row".',
      responseNote: 'La ligne résultat fusionnée a status: "MERGED". Chaque ligne originale absorbée apparaît avec notes: "Source row N/M · merged into reworked row X". Filtrez-les dans les comptages.',
      workflowContext: 'Un comptage MERGED élevé indique que l\'IA sur-segmentait. Combiné avec SPLIT, le ratio indique si l\'IA tend vers la sur- ou sous-segmentation.',
    },
  },
  transcriptDiff: {
    title: 'transcriptDiff : diff au niveau caractère',
    body:
      'Pour les lignes MODIFIED où la colonne transcript a changé, la réponse inclut un tableau transcriptDiff. Chaque token a un type ("EQUAL", "DELETE", ou "INSERT") et un champ text (les caractères). Note : les types sont en MAJUSCULES. Ce champ est absent quand enableInlineDiff: false est défini.',
    tokenTypes: [
      '"EQUAL" — caractères présents dans les deux versions (afficher en texte normal)',
      '"DELETE" — caractères présents uniquement dans l\'original (barrer ou surligner en rouge)',
      '"INSERT" — caractères présents uniquement dans reworked (surligner en vert)',
    ],
  },
  sourceRows: {
    title: 'Lignes source (artefact MERGED)',
    body:
      'Quand un MERGE est détecté, le tableau de résultats inclut à la fois la ligne fusionnée et une entrée "Source row" par original absorbé. Les lignes source ont status: "MERGED" et des notes commençant par "Source row N/M · merged into reworked row X".',
    filterCode:
      '// Ignorer les lignes source dans le comptage résumé\nconst primaryResults = results.filter(\n  r => !(r.status === "MERGED" && r.notes?.includes("Source row"))\n)',
  },
  countsTable: {
    title: 'Comptage correct des statuts',
    intro: 'La longueur du tableau results égale originalRows + extra-lignes-SPLIT + lignes-source-MERGED. Utilisez ce tableau pour construire des comptages corrects :',
    headers: { status: 'Statut', countStrategy: 'Stratégie de comptage', note: 'Note' },
    rows: [
      { status: 'UNCHANGED', strategy: 'Compter toutes', note: '' },
      { status: 'MODIFIED',  strategy: 'Compter toutes', note: '' },
      { status: 'ADDED',     strategy: 'Compter toutes', note: '' },
      { status: 'DELETED',   strategy: 'Compter toutes', note: '' },
      { status: 'SPLIT',     strategy: 'Compter toutes', note: 'Une entrée par ligne originale divisée, quel que soit le nombre de lignes retravaillées produites' },
      { status: 'MERGED',    strategy: 'Compter uniquement les lignes où notes ne contient PAS "Source row"', note: 'Les lignes source sont des entrées de traçage pour les originaux absorbés' },
    ],
  },
  footer: {
    info: 'Guide des statuts · API Structural Diff · Développé par',
    back: '← Retour à la référence API',
  },
}

// ─────────────────── ARABIC ───────────────────
const ar: DiffStatusesI18n = {
  meta: {
    title: 'دليل حالات الـ diff — Structural Diff API',
    description:
      'مرجع كامل لكل حالة diff: UNCHANGED وMODIFIED وADDED وDELETED وSPLIT وMERGED. مع أمثلة إدخال/إخراج وسياق سير العمل وملاحظات حول الصفوف المصدرية.',
  },
  breadcrumb: { apiDocs: 'مرجع API', current: 'حالات الـ diff' },
  nav: {
    backToApiDocs: '← مرجع API',
    onThisPage: 'في هذه الصفحة',
    sectionsBtn: 'الأقسام',
    sections: [
      { id: 'engine-pipeline', title: 'ملاحظة على خط الأنابيب' },
      { id: 'UNCHANGED',       title: 'UNCHANGED' },
      { id: 'MODIFIED',        title: 'MODIFIED' },
      { id: 'ADDED',           title: 'ADDED' },
      { id: 'DELETED',         title: 'DELETED' },
      { id: 'SPLIT',           title: 'SPLIT' },
      { id: 'MERGED',          title: 'MERGED' },
      { id: 'transcriptDiff',  title: 'حقل transcriptDiff' },
      { id: 'source-rows',     title: 'الصفوف المصدرية (MERGED)' },
      { id: 'counts-table',    title: 'عدّ الحالات' },
    ],
    guidesLabel: 'الأدلة',
    guides: [
      { label: 'معاملات الإعداد',  slug: 'parameters' },
      { label: 'حالات الـ diff',   slug: 'diff-statuses' },
      { label: 'درس تطبيقي كامل', slug: 'demo' },
      { label: 'محاكي مباشر',    slug: 'live-demo' },
    ],
  },
  hero: {
    title: 'حالات الـ diff',
    subtitle: 'مثال إدخال/إخراج واحد لكل حالة. بدون غموض.',
    intro:
      'يُسنِد المحرك حالة واحدة بالضبط لكل صف أصلي بعد المحاذاة بـ 8 مراحل. SPLIT وMERGED هما الحالتان الوحيدتان اللتان تُعطيان صفاً واحداً يُقابل عدة صفوف مخرجة (أو العكس). تُظهر هذه الصفحة الحمولة الأدنى التي تُطلق كل حالة بشكل موثوق، وبنية الاستجابة المتوقعة، وسياق سير العمل.',
  },
  pipelineNote: {
    title: 'ملاحظة على خط أنابيب المحرك',
    body:
      'تعالج خوارزمية الـ 8 مراحل كل صف أصلي مقابل كل صف مُعاد وتُسنِد أفضل حالة بناءً على التشابه النصي وقرب الطوابع الزمنية والتحقق الهيكلي. تُشغَّل المراحل بالترتيب: تطابق دقيق → تشابه عالٍ → كشف تقسيم → كشف دمج → تطابقات ضعيفة → الصفوف الباقية.',
    filterHint:
      'عند تكرار النتائج لبناء ملخص عدد، تخطَّ الصفوف حيث يحتوي notes على "Source row". هذه عبوات MERGED (واحدة لكل أصل ممتص) ولا يجب عدّها مرتين.',
  },
  statuses: {
    UNCHANGED: {
      title: 'UNCHANGED',
      definition: 'تحتوي كلا النسختين على صف بمحتوى متطابق عبر جميع الأعمدة المُعيَّنة (بعد تطبيع المسافات).',
      whenYouSeeThis: 'كل صف قبله المُدقِّق دون أي تغيير. يمثل عادةً 20–60% من الصفوف حسب مستوى التحرير.',
      inputNote: 'النص ومحتوى جميع الأعمدة المُعيَّنة يجب أن يكون متطابقاً. الحالة والترقيم مهمان.',
      responseNote: 'كلٌّ من snapData وcurrData موجودان ومتطابقان. حقل notes يساوي "exact match" أو "high similarity match".',
      workflowContext: 'معدل UNCHANGED مرتفع جداً (>90%) قد يُشير إلى أن المُدقِّق لم يراجع النص بشكل كامل. معدل منخفض جداً (<10%) قد يُشير إلى جودة ضعيفة للنموذج أو تحرير مبالغ فيه.',
    },
    MODIFIED: {
      title: 'MODIFIED',
      definition: 'طابق المحرك صفاً من الأصل بصف في reworked، لكن قيمة عمود واحدة على الأقل تغيرت.',
      whenYouSeeThis: 'تصحيحات نصية، تعديلات الترقيم، تنسيق الأرقام، تصحيحات أسماء المتحدثين، تعديلات الطوابع الزمنية أو تسميات المشاعر.',
      inputNote: 'الصف يجب أن يوجد في كلتا النسختين بتشابه كافٍ لأن يقوم المحرك بمطابقة واثقة.',
      responseNote: 'عند تغير عمود transcript، تتضمن الاستجابة مصفوفة transcriptDiff مع رموز diff على مستوى الحروف.',
      workflowContext: 'صفوف MODIFIED هي هدف المراجعة الرئيسي. كل واحدة تمثل تصحيحاً أجراه المُدقِّق. CER وWER تُحسب من هذه التغييرات.',
    },
    ADDED: {
      title: 'ADDED',
      definition: 'لصف في reworked لا مطابق في original. استنفد المحرك جميع مراحل المطابقة دون إيجاد مصدر.',
      whenYouSeeThis: 'أضاف المُدقِّق مقطعاً غيَّبه الذكاء الاصطناعي. أسباب شائعة: مقطع هادئ لم يُكتشف، عدم اكتشاف تبديل رمز، أو تقسيم يظهر كـ ADDED إذا كان كشف التقسيم معطلاً.',
      inputNote: 'فعِّل enableSplits: false إذا أردت أن تظهر كل التقسيمات كـ MODIFIED + ADDED بدلاً من التسمية الهيكلية SPLIT.',
      responseNote: 'currData فقط موجود (لا snapData). حقل notes يساوي "new row in reworked".',
      workflowContext: 'يُخبرك عدد ADDED بكم مقطع فاته الذكاء الاصطناعي. مع DELETED يُعطيك جودة التجزئة.',
    },
    DELETED: {
      title: 'DELETED',
      definition: 'لصف في original لا مطابق في reworked. حذفه المُدقِّق كلياً.',
      whenYouSeeThis: 'نسخ الذكاء الاصطناعي ضجيجاً كنص منطوق، إنتاج تعبير خاطئ، أو إنشاء مقطع مكرر عند الحدود.',
      inputNote: 'صف DELETED يعني أن المُدقِّق اتخذ قرار حذف صريح — يختلف عن MODIFIED حيث تغير المحتوى فقط.',
      responseNote: 'snapData فقط موجود (لا currData). حقل notes يساوي "row removed from reworked".',
      workflowContext: 'دلالة DELETED غير المتوقعة في مرحلة مراجعة على تنظيف أكثر عدوانية من المتوقع أو مشاكل جودة في النموذج.',
    },
    SPLIT: {
      title: 'SPLIT',
      definition: 'يُقابل صف أصلي واحد صفّين أو أكثر من الصفوف المُعادة المتتالية التي تُعيد بناء النص الأصلي مجتمعةً.',
      whenYouSeeThis: 'قرر المُدقِّق أن مقطع الذكاء الاصطناعي كان طويلاً جداً ويحتوي على تعبيرين مختلفين أو التفافين للحديث، فقسّمه عند حد طبيعي.',
      inputNote: 'الصف الأصلي يجب أن يكون مشابهاً بما يكفي للنص المجمَّع للصفوف المُعادة. تُفحص أيضاً معقولية الطوابع الزمنية إن وُجدت.',
      responseNote: 'إدخال الصف الأصلي له status: "SPLIT". SER (معدل خطأ التجزئة) يُزاد بهذا الصف.',
      workflowContext: 'التقسيمات هي أكثر التغييرات الهيكلية أهمية بين طبقات التدقيق. عدد مرتفع يُشير إلى أن الطبقة السابقة كانت تُجزِّئ بشكل ناقص.',
    },
    MERGED: {
      title: 'MERGED',
      definition: 'تُقابل صفّان أصليان أو أكثر صفاً مُعاداً واحداً حيث نصّه قريب من النص المجمَّع للأصليات.',
      whenYouSeeThis: 'قرر المُدقِّق أن المقاطع المتتالية يجب أن تُدمج. شائع عند الإفراط في التجزئة عند توقفات التنفس أو حدود الترقيم.',
      inputNote: 'الصفوف الأصلية الممتصة يجب أن يكون لها تشابه نصي مجمَّع كافٍ. تظهر أيضاً في النتائج كإدخالات "Source row".',
      responseNote: 'صف النتيجة المدموجة الرئيسي له status: "MERGED". كل صف أصلي ممتص يظهر مع notes: "Source row N/M · merged into reworked row X". تصفيتها في العدود.',
      workflowContext: 'عدد MERGED مرتفع يُشير إلى الإفراط في تجزئة الذكاء الاصطناعي. مع SPLIT، يُخبرك نسبتهما ما إذا كان الذكاء الاصطناعي يميل نحو الإفراط أو التقصير في التجزئة.',
    },
  },
  transcriptDiff: {
    title: 'transcriptDiff: diff على مستوى الحروف',
    body:
      'لصفوف MODIFIED حيث تغير عمود transcript، تتضمن الاستجابة مصفوفة transcriptDiff. كل رمز يحمل type ("EQUAL" أو "DELETE" أو "INSERT") وحقل text (الحروف). ملاحظة: الأنواع بالأحرف الكبيرة. هذا الحقل غائب عند تعيين enableInlineDiff: false.',
    tokenTypes: [
      '"EQUAL" — حروف موجودة في كلتا النسختين (اعرضها كنص عادي)',
      '"DELETE" — حروف موجودة فقط في الأصل (اشطبها أو لوّن بالأحمر)',
      '"INSERT" — حروف موجودة فقط في reworked (لوّن بالأخضر)',
    ],
  },
  sourceRows: {
    title: 'الصفوف المصدرية (عبوة MERGED)',
    body:
      'عند كشف MERGE، تتضمن مصفوفة النتائج كلاً من صف النتيجة المدموجة وإدخال "Source row" لكل أصل ممتص. الصفوف المصدرية لها status: "MERGED" وnotes تبدأ بـ "Source row N/M · merged into reworked row X".',
    filterCode:
      '// تخطِّي الصفوف المصدرية عند بناء ملخص العدد\nconst primaryResults = results.filter(\n  r => !(r.status === "MERGED" && r.notes?.includes("Source row"))\n)',
  },
  countsTable: {
    title: 'العدّ الصحيح للحالات',
    intro: 'طول مصفوفة results = originalRows + الصفوف الزائدة من SPLIT + الصفوف المصدرية من MERGED. استخدم هذا الجدول لبناء عدود صحيحة:',
    headers: { status: 'الحالة', countStrategy: 'استراتيجية العدّ', note: 'ملاحظة' },
    rows: [
      { status: 'UNCHANGED', strategy: 'عُدَّ الكل',        note: '' },
      { status: 'MODIFIED',  strategy: 'عُدَّ الكل',        note: '' },
      { status: 'ADDED',     strategy: 'عُدَّ الكل',        note: '' },
      { status: 'DELETED',   strategy: 'عُدَّ الكل',        note: '' },
      { status: 'SPLIT',     strategy: 'عُدَّ الكل',        note: 'إدخال واحد لكل صف أصلي مقسَّم بصرف النظر عن عدد الصفوف المنتجة' },
      { status: 'MERGED',    strategy: 'عُدَّ فقط الصفوف حيث notes لا تحتوي على "Source row"', note: 'الصفوف المصدرية إدخالات تتبع للأصليات الممتصة — تخطَّها في العدود' },
    ],
  },
  footer: {
    info: 'دليل حالات الـ diff · Structural Diff API · تطوير',
    back: '← العودة إلى مرجع API',
  },
}

const translations: Record<string, DiffStatusesI18n> = { en, fr, ar }

export function getDiffStatusesI18n(locale: string): DiffStatusesI18n {
  return translations[locale] ?? en
}

export type { DiffStatusesI18n }
