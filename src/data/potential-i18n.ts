// Potential project page — i18n for EN / FR / AR

type DiagramNode = {
  label: string   // short action label inside the box
  tool: string    // tool/service name below the box
}

type PotentialI18n = {
  badge: string
  hackathonBadge: string
  heroTitle: string
  heroDesc: string
  demoBtn: string
  githubBtn: string
  backToProjects: string
  videoTitle: string
  videoDesc: string
  diagramTitle: string
  diagramNodes: DiagramNode[]
  howTitle: string
  howSubtitle: string
  steps: { title: string; desc: string }[]
  capabilitiesTitle: string
  capabilities: { title: string; desc: string }[]
  techTitle: string
  techStack: { category: string; items: string[] }[]
  contextTitle: string
  contextText: string
  metaTitle: string
  metaDesc: string
}

const en: PotentialI18n = {
  badge: 'Abu Dhabi Spark AI Hackathon',
  hackathonBadge: 'Top 10 Finalist · 48-hour build',
  heroTitle: 'Potential',
  heroDesc:
    'A conversational search layer built on top of the Abu Dhabi Open Data Platform. Ask in plain language, get matched datasets, inspect the data — no domain vocabulary required.',
  demoBtn: 'Live Demo',
  githubBtn: 'View Source',
  backToProjects: '← Back to Projects',
  videoTitle: 'Watch it in action',
  videoDesc:
    'This demo walkthrough shows how a natural language question becomes a retrieved dataset and a chart — in a single conversation turn.',
  diagramTitle: 'The Potential Pipeline',
  diagramNodes: [
    { label: 'Natural language query', tool: 'User' },
    { label: 'Query extraction', tool: 'GPT — Pass 1' },
    { label: 'Dataset retrieval', tool: 'Azure AI Search' },
    { label: 'Answer synthesis', tool: 'GPT — Pass 2' },
    { label: 'Results & charts', tool: 'Interface' },
  ],
  howTitle: 'How it works',
  howSubtitle: 'A three-stage retrieval-augmented pipeline built on Azure',
  steps: [
    {
      title: 'Query → Keywords',
      desc: 'The user types a plain-language request. A first GPT call extracts the machine-readable search string, handling abbreviations, ambiguities, and cross-domain terminology.',
    },
    {
      title: 'Keywords → Datasets',
      desc: 'Azure AI Search runs full-text retrieval against the indexed Abu Dhabi Open Data catalog and returns the top-5 most relevant dataset records and their metadata.',
    },
    {
      title: 'Datasets → Answer',
      desc: 'A second GPT call synthesizes the retrieved metadata into a human-readable response and highlights the specific dataset identifiers ready for visualization or download.',
    },
  ],
  capabilitiesTitle: 'What it can do',
  capabilities: [
    {
      title: 'Plain-Language Discovery',
      desc: 'No need to know exact dataset names or tags. The system maps natural questions to the closest matching open datasets in the catalog.',
    },
    {
      title: 'Zero-Storage Indexing',
      desc: 'Datasets stay on the Abu Dhabi Open Data Platform. The system queries them live through the public API — nothing is copied or cached locally.',
    },
    {
      title: 'In-Browser Visualization',
      desc: 'Once a dataset is found, users can render it as a table, bar chart, or line chart directly in the interface without exporting to another tool.',
    },
    {
      title: 'Document-Driven Queries',
      desc: 'Upload a PDF or image. Azure Form Recognizer extracts its text and uses it as query context — useful for policy documents or reports.',
    },
    {
      title: 'Multi-Turn Context',
      desc: 'Up to six conversation turns are preserved, so follow-up refinements narrow results naturally without restarting from scratch.',
    },
    {
      title: 'Scalable API-First Design',
      desc: 'The architecture is not specific to Abu Dhabi. Any open-data platform with a public API can be indexed and queried with minimal reconfiguration.',
    },
  ],
  techTitle: 'Tech stack',
  techStack: [
    { category: 'Frontend', items: ['Next.js 15', 'Tailwind CSS', 'Framer Motion', 'TypeScript'] },
    { category: 'AI & NLP', items: ['Azure OpenAI (GPT)', 'Azure AI Search', 'Azure Form Recognizer'] },
    { category: 'Data Layer', items: ['Abu Dhabi Open Data API', 'Firebase Storage', 'PapaParse', 'SheetJS'] },
    { category: 'Charts', items: ['Chart.js', 'react-chartjs-2'] },
  ],
  contextTitle: 'Built under pressure',
  contextText:
    'Potential was conceived and shipped in 48 hours during the Abu Dhabi Spark AI Hackathon — a competition run in partnership with government entities. The team of four ranked in the top 10 among more than 26 competing teams. The challenge: make open government data genuinely accessible to non-technical users. The bet was that a thin AI layer on top of existing public APIs could eliminate the steep learning curve of structured data search.',
  metaTitle: 'Potential — AI-Powered Open Data Search | Mohamed Yaakoubi',
  metaDesc:
    'Potential is an AI-powered search engine built on the Abu Dhabi Open Data Platform. Natural language queries, real-time dataset retrieval, and in-browser visualization — built in 48 hours at a hackathon.',
}

const fr: PotentialI18n = {
  badge: "Hackathon Abu Dhabi Spark AI",
  hackathonBadge: "Top 10 finaliste \u00b7 Projet 48 h",
  heroTitle: "Potential",
  heroDesc:
    "Une couche de recherche conversationnelle construite sur la plateforme Open Data d\u2019Abu Dhabi. Posez vos questions en langage courant, obtenez les jeux de donn\u00e9es correspondants et explorez-les \u2014 sans vocabulaire technique requis.",
  demoBtn: "D\u00e9mo en direct",
  githubBtn: "Voir le code",
  backToProjects: "\u2190 Retour aux projets",
  videoTitle: "Voir la d\u00e9mo",
  videoDesc:
    "Cette d\u00e9monstration illustre comment une question en langage naturel devient un jeu de donn\u00e9es r\u00e9cup\u00e9r\u00e9 et un graphique \u2014 en un seul \u00e9change.",
  diagramTitle: "Le pipeline Potential",
  diagramNodes: [
    { label: "Requ\u00eate en langage naturel", tool: "Utilisateur" },
    { label: "Extraction de requ\u00eate", tool: "GPT \u2014 Passe 1" },
    { label: "R\u00e9cup\u00e9ration de donn\u00e9es", tool: "Azure AI Search" },
    { label: "Synth\u00e8se de r\u00e9ponse", tool: "GPT \u2014 Passe 2" },
    { label: "R\u00e9sultats & graphiques", tool: "Interface" },
  ],
  howTitle: "Comment \u00e7a marche",
  howSubtitle: "Un pipeline de r\u00e9cup\u00e9ration augment\u00e9e en trois \u00e9tapes, construit sur Azure",
  steps: [
    {
      title: "Requ\u00eate \u2192 Mots-cl\u00e9s",
      desc: "L\u2019utilisateur saisit une demande en langage courant. Un premier appel GPT en extrait une cha\u00eene de recherche lisible par la machine, g\u00e9rant abr\u00e9viations, ambigu\u00eft\u00e9s et terminologie trans-domaines.",
    },
    {
      title: "Mots-cl\u00e9s \u2192 Jeux de donn\u00e9es",
      desc: "Azure AI Search effectue une recherche en texte int\u00e9gral dans le catalogue Open Data d\u2019Abu Dhabi et renvoie les 5 enregistrements les plus pertinents avec leurs m\u00e9tadonn\u00e9es.",
    },
    {
      title: "Jeux de donn\u00e9es \u2192 R\u00e9ponse",
      desc: "Un second appel GPT synth\u00e9tise les m\u00e9tadonn\u00e9es r\u00e9cup\u00e9r\u00e9es en une r\u00e9ponse lisible, en mettant en \u00e9vidence les identifiants de jeux de donn\u00e9es pr\u00eats pour la visualisation ou le t\u00e9l\u00e9chargement.",
    },
  ],
  capabilitiesTitle: "Ce qu\u2019il sait faire",
  capabilities: [
    {
      title: "D\u00e9couverte en langage naturel",
      desc: "Inutile de conna\u00eetre les noms ou \u00e9tiquettes exacts des jeux de donn\u00e9es. Le syst\u00e8me fait correspondre les questions naturelles aux jeux de donn\u00e9es du catalogue.",
    },
    {
      title: "Indexation sans stockage",
      desc: "Les donn\u00e9es restent sur la plateforme Abu Dhabi Open Data. Le syst\u00e8me les interroge en temps r\u00e9el via l\u2019API publique \u2014 rien n\u2019est copi\u00e9 ni mis en cache localement.",
    },
    {
      title: "Visualisation dans le navigateur",
      desc: "Une fois un jeu de donn\u00e9es trouv\u00e9, il peut \u00eatre affich\u00e9 sous forme de tableau, histogramme ou courbe directement dans l\u2019interface, sans export vers un autre outil.",
    },
    {
      title: "Requ\u00eates guid\u00e9es par document",
      desc: "D\u00e9posez un PDF ou une image. Azure Form Recognizer en extrait le texte pour l\u2019utiliser comme contexte de recherche \u2014 id\u00e9al pour des documents de politique ou des rapports.",
    },
    {
      title: "Contexte multi-tours",
      desc: "Jusqu\u2019\u00e0 six tours de conversation sont conserv\u00e9s, permettant d\u2019affiner les r\u00e9sultats naturellement sans repartir de z\u00e9ro.",
    },
    {
      title: "Architecture API-first scalable",
      desc: "L\u2019architecture n\u2019est pas sp\u00e9cifique \u00e0 Abu Dhabi. Toute plateforme de donn\u00e9es ouvertes disposant d\u2019une API publique peut \u00eatre index\u00e9e avec un minimum de reconfiguration.",
    },
  ],
  techTitle: "Stack technique",
  techStack: [
    { category: "Frontend", items: ["Next.js 15", "Tailwind CSS", "Framer Motion", "TypeScript"] },
    { category: "IA & NLP", items: ["Azure OpenAI (GPT)", "Azure AI Search", "Azure Form Recognizer"] },
    { category: "Couche donn\u00e9es", items: ["API Open Data Abu Dhabi", "Firebase Storage", "PapaParse", "SheetJS"] },
    { category: "Graphiques", items: ["Chart.js", "react-chartjs-2"] },
  ],
  contextTitle: "Construit sous pression",
  contextText:
    "Potential a \u00e9t\u00e9 con\u00e7u et livr\u00e9 en 48 heures lors du Hackathon Abu Dhabi Spark AI \u2014 une comp\u00e9tition organis\u00e9e en partenariat avec des entit\u00e9s gouvernementales. L\u2019\u00e9quipe de quatre personnes s\u2019est class\u00e9e dans le top 10 parmi plus de 26 \u00e9quipes participantes. Le d\u00e9fi : rendre les donn\u00e9es gouvernementales ouvertes r\u00e9ellement accessibles aux utilisateurs non techniques. Le pari \u00e9tait qu\u2019une fine couche IA au-dessus des API publiques existantes pouvait \u00e9liminer la courbe d\u2019apprentissage abrupte de la recherche de donn\u00e9es structur\u00e9es.",
  metaTitle: "Potential \u2014 Recherche Open Data par IA | Mohamed Yaakoubi",
  metaDesc:
    "Potential est un moteur de recherche aliment\u00e9 par l\u2019IA construit sur la plateforme Open Data d\u2019Abu Dhabi. Requ\u00eates en langage naturel, r\u00e9cup\u00e9ration de jeux de donn\u00e9es en temps r\u00e9el et visualisation dans le navigateur \u2014 construit en 48 heures lors d\u2019un hackathon.",
}

const ar: PotentialI18n = {
  badge: 'هاكاثون أبوظبي سبارك للذكاء الاصطناعي',
  hackathonBadge: 'ضمن أفضل 10 · مشروع 48 ساعة',
  heroTitle: 'Potential',
  heroDesc:
    'طبقة بحث تحادثية مبنية فوق منصة بيانات أبوظبي المفتوحة. اطرح أسئلتك بلغتك الطبيعية، احصل على مجموعات البيانات المناسبة، واستكشفها — دون الحاجة إلى معرفة مصطلحات تقنية.',
  demoBtn: 'العرض التجريبي',
  githubBtn: 'عرض الكود',
  backToProjects: '← العودة إلى المشاريع',
  videoTitle: 'شاهد المشروع',
  videoDesc:
    'يوضح هذا العرض التجريبي كيف تتحول سؤالاً بلغة طبيعية إلى مجموعة بيانات مسترجعة ورسم بياني — في دورة محادثة واحدة.',
  diagramTitle: 'مسار Potential',
  diagramNodes: [
    { label: 'استعلام بلغة طبيعية', tool: 'المستخدم' },
    { label: 'استخراج الكلمات المفتاحية', tool: 'GPT — المرور 1' },
    { label: 'استرجاع مجموعات البيانات', tool: 'Azure AI Search' },
    { label: 'توليف الإجابة', tool: 'GPT — المرور 2' },
    { label: 'النتائج والرسوم البيانية', tool: 'الواجهة' },
  ],
  howTitle: 'كيف يعمل',
  howSubtitle: 'نظام استرجاع معزز بثلاث مراحل مبني على Azure',
  steps: [
    {
      title: 'الاستعلام ← الكلمات المفتاحية',
      desc: 'يكتب المستخدم طلبه بلغة طبيعية. يستخرج استدعاء GPT الأول سلسلة بحث قابلة للقراءة آلياً، مع معالجة الاختصارات والغموض والمصطلحات متعددة التخصصات.',
    },
    {
      title: 'الكلمات المفتاحية ← مجموعات البيانات',
      desc: 'يُجري Azure AI Search بحثاً نصياً شاملاً في فهرس كتالوج بيانات أبوظبي المفتوحة، ويُعيد أكثر 5 سجلات صلةً مع بياناتها الوصفية.',
    },
    {
      title: 'مجموعات البيانات ← الإجابة',
      desc: 'يُلخّص استدعاء GPT الثاني البيانات الوصفية المسترجعة في إجابة مقروءة، مع إبراز معرّفات مجموعات البيانات الجاهزة للتصور أو التنزيل.',
    },
  ],
  capabilitiesTitle: 'ما يستطيع فعله',
  capabilities: [
    {
      title: 'اكتشاف باللغة الطبيعية',
      desc: 'لا حاجة لمعرفة أسماء مجموعات البيانات أو علاماتها الدقيقة. يُرابط النظام الأسئلة الطبيعية بأقرب المجموعات المتاحة في الكتالوج.',
    },
    {
      title: 'فهرسة بدون تخزين محلي',
      desc: 'تبقى البيانات على منصة بيانات أبوظبي المفتوحة. يستعلم النظام عنها مباشرةً عبر الواجهة البرمجية العامة — لا يُنسخ شيء أو يُخزَّن محلياً.',
    },
    {
      title: 'تصور داخل المتصفح',
      desc: 'بمجرد العثور على مجموعة بيانات، يمكن عرضها كجدول أو رسم بياني شريطي أو خطي مباشرةً في الواجهة دون تصدير إلى أداة أخرى.',
    },
    {
      title: 'استعلامات مدفوعة بالمستندات',
      desc: 'ارفع ملف PDF أو صورة. يستخرج Azure Form Recognizer نصّها ويستخدمه سياقاً للبحث — مفيد لوثائق السياسات والتقارير.',
    },
    {
      title: 'سياق متعدد الأدوار',
      desc: 'يُحفظ ما يصل إلى ستة أدوار محادثة، مما يتيح تضييق النتائج تدريجياً دون البدء من الصفر.',
    },
    {
      title: 'تصميم قابل للتوسع أولاً بالواجهة البرمجية',
      desc: 'البنية ليست مقيدة بأبوظبي. أي منصة بيانات مفتوحة تمتلك واجهة برمجية عامة يمكن فهرستها باستخدام هذا النظام مع الحد الأدنى من إعادة التهيئة.',
    },
  ],
  techTitle: 'مكدس التقنيات',
  techStack: [
    { category: 'الواجهة الأمامية', items: ['Next.js 15', 'Tailwind CSS', 'Framer Motion', 'TypeScript'] },
    { category: 'الذكاء الاصطناعي ومعالجة اللغة', items: ['Azure OpenAI (GPT)', 'Azure AI Search', 'Azure Form Recognizer'] },
    { category: 'طبقة البيانات', items: ['واجهة بيانات أبوظبي المفتوحة', 'Firebase Storage', 'PapaParse', 'SheetJS'] },
    { category: 'الرسوم البيانية', items: ['Chart.js', 'react-chartjs-2'] },
  ],
  contextTitle: 'بُني تحت الضغط',
  contextText:
    'تم تصور Potential وتسليمه خلال 48 ساعة في هاكاثون أبوظبي سبارك للذكاء الاصطناعي — مسابقة نُظِّمت بالشراكة مع جهات حكومية. حقّق الفريق المؤلف من أربعة أعضاء المرتبة ضمن أفضل 10 من بين أكثر من 26 فريقاً متنافساً. التحدي: جعل البيانات الحكومية المفتوحة في متناول المستخدمين غير التقنيين فعلياً. كان الرهان أن طبقة ذكاء اصطناعي رفيعة فوق الواجهات البرمجية العامة الموجودة يمكن أن تُلغي منحنى التعلم الحاد في البحث عن البيانات المنظمة.',
  metaTitle: 'Potential — محرك بحث البيانات المفتوحة بالذكاء الاصطناعي | محمد يعقوبي',
  metaDesc:
    'Potential محرك بحث مدعوم بالذكاء الاصطناعي مبني على منصة بيانات أبوظبي المفتوحة. استعلامات بلغة طبيعية، استرجاع فوري لمجموعات البيانات، وتصور مباشر في المتصفح — بُني في 48 ساعة خلال هاكاثون.',
}

const translations: Record<string, PotentialI18n> = { en, fr, ar }

export function getPotentialI18n(lang: string): PotentialI18n {
  return translations[lang] ?? en
}
