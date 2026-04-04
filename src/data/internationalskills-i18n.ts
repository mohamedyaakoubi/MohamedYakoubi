// InternationalSkills.fi project page — i18n for EN / FR / AR

type InternationalSkillsI18n = {
  badge: string
  heroBadge: string
  heroTitle: string
  heroDesc: string
  demoBtn: string
  backToProjects: string
  featuresTitle: string
  featuresSubtitle: string
  features: { title: string; desc: string }[]
  howTitle: string
  whyTitle: string
  whyDesc: string
  candidateTitle: string
  candidateSteps: { title: string; desc: string }[]
  hrTitle: string
  hrSteps: { title: string; desc: string }[]
  techTitle: string
  techStack: { category: string; items: string[] }[]
  securityTitle: string
  securityItems: string[]
  contextTitle: string
  contextText: string
  metaTitle: string
  metaDesc: string
}

const en: InternationalSkillsI18n = {
  badge: 'InternationalSkills.fi · Finland',
  heroBadge: 'AI-Powered · Firebase · Google Meet Integration',
  heroTitle: 'InternationalSkills.fi — Recruiting Management System',
  heroDesc:
    'A full-stack web application that simplifies the entire hiring process — from candidate registration and document uploads to AI-powered scoring, interview scheduling via Google Meet, and real-time status tracking through a dedicated admin dashboard.',
  demoBtn: 'Live Demo',
  backToProjects: '← Back to Projects',
  featuresTitle: 'Core features',
  featuresSubtitle: 'End-to-end recruitment tooling for candidates and administrators',
  features: [
    {
      title: 'Multi-Step Application Form',
      desc: 'Guided wizard collecting personal info, job preferences, and document uploads (CV, passport, photo) with real-time Zod validation and disposable-email detection.',
    },
    {
      title: 'Candidate Dashboard',
      desc: 'Track application status in real-time (Submitted → Interview Scheduled → Approved / Rejected), view your AI score breakdown, and access your Google Meet interview link.',
    },
    {
      title: 'AI Candidate Scoring',
      desc: 'Gemini 2.5 Pro evaluates CVs and online profiles across four weighted dimensions: Job Match (40 %), Experience (30 %), Skills (20 %), and Potential (10 %).',
    },
    {
      title: 'Smart Interview Scheduling',
      desc: 'Admins schedule interviews directly via Google Calendar. Automatic Google Meet links are generated and dispatched to candidates by email with calendar invitations.',
    },
    {
      title: 'Admin Dashboard',
      desc: 'Comprehensive view of all candidates with advanced multi-criteria filtering, sorting, pagination, bulk status updates, and one-click export to CSV, XLSX, or JSON.',
    },
    {
      title: 'Real-Time Analytics',
      desc: 'Live Recharts dashboards showing application-status distribution and AI-score histograms, giving hiring teams instant pipeline visibility.',
    },
  ],
  howTitle: 'How it works',
  whyTitle: 'Why this solution was built',
  whyDesc:
    'InternationalSkills.fi posts job openings across multiple recruiting platforms — LinkedIn, Indeed, Join, and others. Rather than collecting candidate applications in separate silos on every platform, each listing redirects applicants to this single portal URL. There is no multi-tenant architecture: the portal acts as a central intake point so the company maintains one unified, searchable, and AI-scored candidate database regardless of where someone first saw the job ad.',
  candidateTitle: 'For Candidates',
  candidateSteps: [
    {
      title: 'Register & Verify',
      desc: 'Create an account and pass email verification — disposable-address detection blocks throwaway inboxes. Your credentials are secured by Firebase Auth from the first step.',
    },
    {
      title: 'Fill the Application',
      desc: 'Complete the multi-step wizard: personal details, preferred job category, and document uploads (CV in PDF/DOC/DOCX, passport copy, profile photo). Zod validates every field in real time before you advance.',
    },
    {
      title: 'Track & Attend',
      desc: 'Log in anytime to see your live status (Submitted → Interview Scheduled → Approved / Rejected), read your AI score breakdown by dimension, and open the Google Meet link emailed at scheduling.',
    },
  ],
  hrTitle: 'For HR / Admins',
  hrSteps: [
    {
      title: 'Manage the Pipeline',
      desc: 'All candidates from every platform land in one admin dashboard. Filter by status, job category, AI score range, or date; sort and paginate across hundreds of profiles; bulk-update statuses in a single action.',
    },
    {
      title: 'Score with AI',
      desc: 'Trigger Gemini 2.5 Pro on any candidate. It reads their CV and linked portfolio then returns a weighted score — Job Match 40 %, Experience 30 %, Skills 20 %, Potential 10 % — with a recommendation level and written rationale.',
    },
    {
      title: 'Schedule & Notify',
      desc: 'Pick a slot directly in the built-in calendar view. A Google Meet link is generated automatically, a calendar invite goes to the candidate, and their dashboard status updates instantly — no manual follow-up needed.',
    },
  ],
  techTitle: 'Tech stack',
  techStack: [
    { category: 'Frontend', items: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Recharts', 'React Big Calendar', 'Headless UI'] },
    { category: 'Backend & Auth', items: ['Firebase Auth', 'Firestore', 'Firebase Storage', 'Nodemailer'] },
    { category: 'AI & Integrations', items: ['Gemini 2.5 Pro', 'Google Calendar API', 'Google Meet', '@google/generative-ai'] },
    { category: 'Security', items: ['Upstash Redis', 'CSRF Protection', 'DOMPurify', 'Zod'] },
    { category: 'Testing & Quality', items: ['Vitest', 'Playwright', 'React Testing Library', 'ESLint', 'Prettier'] },
  ],
  securityTitle: 'Security & data protection',
  securityItems: [
    'Distributed rate limiting via Upstash Redis — all API routes are protected against brute-force and abuse',
    'CSRF tokens on every form submission and mutation endpoint',
    'XSS sanitization with isomorphic-dompurify applied to all user-submitted text before storage',
    'Firebase Auth token validation — every protected action requires a valid server-side token check',
    'Firestore Security Rules — candidates can only read their own records; admin access is scoped and role-gated',
    'Disposable email detection at registration to prevent fake account creation',
  ],
  contextTitle: 'About the project',
  contextText:
    'InternationalSkills.fi is a Finnish-based labor recruitment service connecting skilled international workers with European employers. The company advertises on LinkedIn, Indeed, Join, and other job boards — but instead of managing separate applicant pools on each platform, every listing points candidates to this central portal. The portal collects all applications in one Firebase database, scores them with Gemini 2.5 Pro, and lets the HR team schedule Google Meet interviews without leaving the admin dashboard.',
  metaTitle: 'InternationalSkills.fi — Recruiting Management System | Mohamed Yaakoubi',
  metaDesc:
    'Full-stack recruiting platform for InternationalSkills.fi: multi-step candidate applications, AI scoring with Gemini 2.5 Pro, automated Google Meet scheduling, and a real-time admin dashboard — built with Next.js and Firebase.',
}

const fr: InternationalSkillsI18n = {
  badge: "InternationalSkills.fi · Finlande",
  heroBadge: "Propulsé par IA · Firebase · Intégration Google Meet",
  heroTitle: "InternationalSkills.fi — Système de Gestion du Recrutement",
  heroDesc:
    "Une application web full-stack qui simplifie l'ensemble du processus de recrutement — de l'inscription des candidats et du téléchargement des documents jusqu'à la notation par IA, la planification des entretiens via Google Meet et le suivi en temps réel via un tableau de bord administrateur dédié.",
  demoBtn: "Démo en direct",
  backToProjects: "← Retour aux projets",
  featuresTitle: "Fonctionnalités principales",
  featuresSubtitle: "Outils de recrutement de bout en bout pour les candidats et les administrateurs",
  features: [
    {
      title: "Formulaire de candidature multi-étapes",
      desc: "Assistant guidé collectant les informations personnelles, les préférences de poste et les documents (CV, passeport, photo) avec validation Zod en temps réel et détection des adresses e-mail jetables.",
    },
    {
      title: "Tableau de bord candidat",
      desc: "Suivez le statut de votre candidature en temps réel (Soumis → Entretien planifié → Approuvé / Refusé), consultez le détail de votre score IA et accédez à votre lien Google Meet.",
    },
    {
      title: "Notation IA des candidats",
      desc: "Gemini 2.5 Pro évalue les CV et profils en ligne selon quatre dimensions pondérées : Correspondance au poste (40 %), Expérience (30 %), Compétences (20 %) et Potentiel (10 %).",
    },
    {
      title: "Planification intelligente des entretiens",
      desc: "Les administrateurs planifient les entretiens directement via Google Calendar. Des liens Google Meet sont générés automatiquement et envoyés aux candidats par e-mail avec des invitations calendrier.",
    },
    {
      title: "Tableau de bord administrateur",
      desc: "Vue complète de tous les candidats avec filtrage multi-critères avancé, tri, pagination, mises à jour de statut en masse et export en un clic vers CSV, XLSX ou JSON.",
    },
    {
      title: "Analyses en temps réel",
      desc: "Tableaux de bord Recharts en direct affichant la distribution des statuts et les histogrammes de scores IA, offrant une visibilité instantanée sur le pipeline de recrutement.",
    },
  ],
  howTitle: "Comment ça marche",
  whyTitle: "Pourquoi cette solution a été créée",
  whyDesc:
    "InternationalSkills.fi publie ses offres sur plusieurs plateformes de recrutement — LinkedIn, Indeed, Join et d'autres. Plutôt que de gérer des candidatures dispersées sur chaque plateforme, chaque annonce redirige les candidats vers l'URL unique de ce portail. Il n'y a pas d'architecture multi-tenant : le portail joue le rôle d'un point d'entrée centralisé pour que l'entreprise dispose d'une base de données unifiée, consultable et scorée par IA, quelle que soit la plateforme d'origine du candidat.",
  candidateTitle: "Pour les candidats",
  candidateSteps: [
    {
      title: "S'inscrire et se vérifier",
      desc: "Créez un compte et passez la vérification par e-mail — la détection d'adresses jetables bloque les boîtes temporaires. Vos identifiants sont sécurisés par Firebase Auth dès la première étape.",
    },
    {
      title: "Remplir la candidature",
      desc: "Complétez l'assistant multi-étapes : informations personnelles, catégorie de poste souhaitée et téléchargement des documents (CV en PDF/DOC/DOCX, copie du passeport, photo de profil). Zod valide chaque champ en temps réel avant de vous laisser avancer.",
    },
    {
      title: "Suivre et passer l'entretien",
      desc: "Connectez-vous à tout moment pour voir votre statut en direct (Soumis → Entretien planifié → Approuvé / Refusé), lire le détail de votre score IA par dimension et accéder au lien Google Meet envoyé par e-mail lors de la planification.",
    },
  ],
  hrTitle: "Pour les RH / Administrateurs",
  hrSteps: [
    {
      title: "Gérer le pipeline",
      desc: "Tous les candidats de toutes les plateformes arrivent dans un seul tableau de bord administrateur. Filtrez par statut, catégorie de poste, plage de score IA ou date ; triez et paginez sur des centaines de profils ; mettez à jour les statuts en masse en une seule action.",
    },
    {
      title: "Scorer avec l'IA",
      desc: "Déclenchez Gemini 2.5 Pro sur n'importe quel candidat. Il lit le CV et le portfolio lié, puis retourne un score pondéré — Correspondance au poste 40 %, Expérience 30 %, Compétences 20 %, Potentiel 10 % — avec un niveau de recommandation et une justification rédigée.",
    },
    {
      title: "Planifier et notifier",
      desc: "Choisissez un créneau directement dans la vue calendrier intégrée. Un lien Google Meet est généré automatiquement, une invitation calendrier est envoyée au candidat, et son statut dans le tableau de bord se met à jour instantanément — sans suivi manuel.",
    },
  ],
  techTitle: "Stack technique",
  techStack: [
    { category: "Frontend", items: ["Next.js 15", "TypeScript", "Tailwind CSS", "Recharts", "React Big Calendar", "Headless UI"] },
    { category: "Backend & Auth", items: ["Firebase Auth", "Firestore", "Firebase Storage", "Nodemailer"] },
    { category: "IA & Intégrations", items: ["Gemini 2.5 Pro", "Google Calendar API", "Google Meet", "@google/generative-ai"] },
    { category: "Sécurité", items: ["Upstash Redis", "Protection CSRF", "DOMPurify", "Zod"] },
    { category: "Tests & Qualité", items: ["Vitest", "Playwright", "React Testing Library", "ESLint", "Prettier"] },
  ],
  securityTitle: "Sécurité & protection des données",
  securityItems: [
    "Limitation de débit distribuée via Upstash Redis — toutes les routes API sont protégées contre les attaques par force brute",
    "Tokens CSRF sur chaque soumission de formulaire et point de terminaison de mutation",
    "Assainissement XSS avec isomorphic-dompurify appliqué à tous les textes soumis par les utilisateurs avant stockage",
    "Validation du token Firebase Auth — chaque action protégée nécessite une vérification valide côté serveur",
    "Règles de sécurité Firestore — les candidats ne peuvent lire que leurs propres dossiers ; l'accès administrateur est délimité et soumis à contrôle de rôle",
    "Détection des e-mails jetables à l'inscription pour prévenir la création de faux comptes",
  ],
  contextTitle: "À propos du projet",
  contextText:
    "InternationalSkills.fi est un service finlandais de recrutement qui met en relation des travailleurs internationaux qualifiés avec des employeurs européens. La société publie ses offres sur LinkedIn, Indeed, Join et d'autres plateformes — mais au lieu de gérer des viviers de candidats séparés sur chacune d'elles, chaque annonce pointe vers ce portail central. Celui-ci centralise toutes les candidatures dans une base Firebase, les score avec Gemini 2.5 Pro et permet aux RH de planifier des entretiens Google Meet sans quitter le tableau de bord administrateur.",
  metaTitle: "InternationalSkills.fi — Système de Gestion du Recrutement | Mohamed Yaakoubi",
  metaDesc:
    "Plateforme de recrutement full-stack pour InternationalSkills.fi : candidatures multi-étapes, notation IA avec Gemini 2.5 Pro, planification automatisée Google Meet et tableau de bord administrateur en temps réel — construite avec Next.js et Firebase.",
}

const ar: InternationalSkillsI18n = {
  badge: 'InternationalSkills.fi · فنلندا',
  heroBadge: 'مدعوم بالذكاء الاصطناعي · Firebase · تكامل Google Meet',
  heroTitle: 'InternationalSkills.fi — نظام إدارة التوظيف',
  heroDesc:
    'تطبيق ويب متكامل يُبسّط عملية التوظيف من أولها إلى آخرها — من تسجيل المرشحين ورفع الوثائق إلى التقييم بالذكاء الاصطناعي وجدولة المقابلات عبر Google Meet وتتبع الحالة فوريًا من خلال لوحة تحكم إدارية متخصصة.',
  demoBtn: 'عرض تجريبي',
  backToProjects: '← العودة إلى المشاريع',
  featuresTitle: 'الميزات الأساسية',
  featuresSubtitle: 'أدوات توظيف متكاملة للمرشحين والمسؤولين',
  features: [
    {
      title: 'نموذج تقديم متعدد الخطوات',
      desc: 'معالج مُوجَّه يجمع المعلومات الشخصية وتفضيلات الوظيفة والمستندات (السيرة الذاتية، جواز السفر، الصورة) مع التحقق الفوري عبر Zod واكتشاف عناوين البريد الإلكتروني المؤقتة.',
    },
    {
      title: 'لوحة تحكم المرشح',
      desc: 'تابع حالة طلبك فوريًا (مُقدَّم → مُجدوَل مقابلته → مقبول / مرفوض)، واطّلع على تفاصيل نتيجتك من الذكاء الاصطناعي، وصِل إلى رابط Google Meet الخاص بك.',
    },
    {
      title: 'تقييم المرشحين بالذكاء الاصطناعي',
      desc: 'يُقيّم Gemini 2.5 Pro السير الذاتية والملفات الشخصية عبر أربعة محاور موزونة: توافق الوظيفة (40%)، الخبرة (30%)، المهارات (20%)، والإمكانات (10%).',
    },
    {
      title: 'جدولة ذكية للمقابلات',
      desc: 'يُجدوِل المسؤولون المقابلات مباشرةً عبر Google Calendar. تُنشأ روابط Google Meet تلقائيًا وتُرسَل إلى المرشحين بالبريد الإلكتروني مع دعوات التقويم.',
    },
    {
      title: 'لوحة تحكم المسؤول',
      desc: 'عرض شامل لجميع المرشحين مع تصفية متقدمة متعددة المعايير والفرز وترقيم الصفحات وتحديثات الحالة الجماعية وتصدير بنقرة واحدة إلى CSV أو XLSX أو JSON.',
    },
    {
      title: 'تحليلات في الوقت الفعلي',
      desc: 'لوحات Recharts المباشرة تعرض توزيع حالات الطلبات ومخططات نتائج الذكاء الاصطناعي، مما يمنح فرق التوظيف رؤية فورية على مسار المرشحين.',
    },
  ],
  howTitle: 'كيف يعمل',
  whyTitle: 'لماذا بُنيت هذه الحل',
  whyDesc:
    'تنشر InternationalSkills.fi وظائفها عبر منصات توظيف متعددة — LinkedIn وIndeed وJoin وغيرها. بدلًا من إدارة طلبات مشتتة على كل منصة، يُعيد كل إعلان توجيه المرشحين إلى رابط هذه البوابة المركزية. لا يوجد نظام متعدد المستأجرين: تعمل البوابة كنقطة استقبال مركزية واحدة تُخزِّن جميع المتقدمين في قاعدة بيانات Firebase موحدة وقابلة للبحث والتقييم بالذكاء الاصطناعي — بصرف النظر عن المنصة التي رأى فيها المرشح الإعلان.',
  candidateTitle: 'للمرشحين',
  candidateSteps: [
    {
      title: 'التسجيل والتحقق',
      desc: 'أنشئ حسابًا واجتز التحقق من البريد الإلكتروني — يكتشف النظام عناوين البريد المؤقتة ويمنعها. تُؤمَّن بياناتك عبر Firebase Auth منذ الخطوة الأولى.',
    },
    {
      title: 'ملء الطلب',
      desc: 'أكمل المعالج متعدد الخطوات: المعلومات الشخصية، فئة الوظيفة المفضلة، ورفع الوثائق (السيرة الذاتية PDF/DOC/DOCX، نسخة جواز السفر، صورة شخصية). يتحقق Zod من كل حقل فوريًا قبل أن تتقدم للمرحلة التالية.',
    },
    {
      title: 'المتابعة وحضور المقابلة',
      desc: 'سجّل دخولك في أي وقت لمتابعة حالتك الفورية (مُقدَّم → مُجدوَل مقابلته → مقبول / مرفوض)، واطّلع على تفصيل نتيجتك من الذكاء الاصطناعي لكل محور، وافتح رابط Google Meet الذي يصلك بالبريد عند الجدولة.',
    },
  ],
  hrTitle: 'لفريق التوظيف / المسؤولين',
  hrSteps: [
    {
      title: 'إدارة مسار المرشحين',
      desc: 'يصل جميع المرشحين من كل المنصات إلى لوحة تحكم إدارية واحدة. صفِّ وابحث حسب الحالة أو فئة الوظيفة أو نطاق النتيجة أو التاريخ؛ وحدِّث الحالات دفعةً واحدة بإجراء واحد.',
    },
    {
      title: 'التقييم بالذكاء الاصطناعي',
      desc: 'فعِّل Gemini 2.5 Pro على أي مرشح. يقرأ سيرته الذاتية وملفه الإلكتروني ثم يُعيد نتيجة موزونة — توافق الوظيفة 40% والخبرة 30% والمهارات 20% والإمكانات 10% — مع مستوى توصية ومبرر مكتوب.',
    },
    {
      title: 'الجدولة والإشعار',
      desc: 'اختر وقتًا مناسبًا مباشرةً في عرض التقويم المدمج. يُنشأ رابط Google Meet تلقائيًا، وتُرسَل دعوة تقويم إلى المرشح، وتتحدث حالته في لوحة التحكم فورًا — دون أي متابعة يدوية.',
    },
  ],
  techTitle: 'تقنيات المشروع',
  techStack: [
    { category: 'الواجهة الأمامية', items: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Recharts', 'React Big Calendar', 'Headless UI'] },
    { category: 'الخلفية والمصادقة', items: ['Firebase Auth', 'Firestore', 'Firebase Storage', 'Nodemailer'] },
    { category: 'الذكاء الاصطناعي والتكاملات', items: ['Gemini 2.5 Pro', 'Google Calendar API', 'Google Meet', '@google/generative-ai'] },
    { category: 'الأمان', items: ['Upstash Redis', 'حماية CSRF', 'DOMPurify', 'Zod'] },
    { category: 'الاختبار والجودة', items: ['Vitest', 'Playwright', 'React Testing Library', 'ESLint', 'Prettier'] },
  ],
  securityTitle: 'الأمان وحماية البيانات',
  securityItems: [
    'تحديد معدل الطلبات الموزّع عبر Upstash Redis — جميع مسارات API محمية من الهجمات',
    'رموز CSRF على كل إرسال نموذج ونقطة نهاية تعديل',
    'تعقيم XSS عبر isomorphic-dompurify يُطبَّق على جميع النصوص المُدخَلة قبل التخزين',
    'التحقق من رمز Firebase Auth — كل إجراء محمي يستلزم فحصًا صالحًا من جهة الخادم',
    'قواعد أمان Firestore — المرشحون لا يقرؤون سوى سجلاتهم الخاصة؛ وصول المسؤولين محدود النطاق',
    'اكتشاف البريد الإلكتروني المؤقت عند التسجيل للحدّ من إنشاء الحسابات الوهمية',
  ],
  contextTitle: 'عن المشروع',
  contextText:
    'InternationalSkills.fi خدمة فنلندية لتوظيف العمالة تربط العمال الدوليين المهرة بأصحاب العمل الأوروبيين. تُعلن الشركة عن وظائفها عبر LinkedIn وIndeed وJoin وغيرها من المنصات — لكن بدلًا من إدارة قوائم منفصلة للمتقدمين على كل منصة، يُوجَّه كل مرشح إلى هذه البوابة المركزية. تجمع البوابة جميع الطلبات في قاعدة بيانات Firebase واحدة، وتُقيِّمها بـ Gemini 2.5 Pro، وتتيح لفريق التوظيف جدولة مقابلات Google Meet دون مغادرة لوحة التحكم.',
  metaTitle: 'InternationalSkills.fi — نظام إدارة التوظيف | محمد يعقوبي',
  metaDesc:
    'منصة توظيف متكاملة لـ InternationalSkills.fi: طلبات متعددة الخطوات، تقييم ذكي بـ Gemini 2.5 Pro، جدولة تلقائية عبر Google Meet، ولوحة تحكم إدارية — مبنية بـ Next.js و Firebase.',
}

export function getInternationalSkillsI18n(locale: string): InternationalSkillsI18n {
  if (locale === 'fr') return fr
  if (locale === 'ar') return ar
  return en
}
