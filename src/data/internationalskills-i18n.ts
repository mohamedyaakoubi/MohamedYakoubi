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
  howSubtitle: string
  steps: { title: string; desc: string }[]
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
  howSubtitle: 'Three stages covering the full recruitment lifecycle',
  steps: [
    {
      title: 'Apply & Get Verified',
      desc: 'Create an account, pass email verification (with disposable-address detection), and submit your complete application with supporting documents stored securely in Firebase Storage.',
    },
    {
      title: 'AI Evaluates Your Profile',
      desc: 'Gemini 2.5 Pro reads your CV and any linked online presence, then produces a scored recommendation — Highly Recommended, Recommended, Conditional, or Not Recommended — with a detailed breakdown.',
    },
    {
      title: 'Schedule & Interview',
      desc: 'Admins review AI scores, schedule interviews, and you automatically receive a Google Meet link. Every status change is reflected instantly in your candidate dashboard.',
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
    'This platform was built for International Skills Labor Company (InternationalSkills.fi), a Finnish-based labor recruitment service that connects skilled international workers with European employers. The project required a production-grade stack integrating Firebase, Google Workspace, and Gemini AI — handling everything from candidate onboarding and document storage through AI-powered scoring and fully automated interview scheduling via Google Meet.',
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
  howSubtitle: "Trois étapes couvrant l'ensemble du cycle de recrutement",
  steps: [
    {
      title: "Postuler et se vérifier",
      desc: "Créez un compte, passez la vérification par e-mail (avec détection des adresses jetables) et soumettez votre candidature complète avec les documents stockés de façon sécurisée dans Firebase Storage.",
    },
    {
      title: "L'IA évalue votre profil",
      desc: "Gemini 2.5 Pro analyse votre CV et votre présence en ligne, puis produit une recommandation scorée — Fortement recommandé, Recommandé, Conditionnel ou Non recommandé — avec un bilan détaillé.",
    },
    {
      title: "Planifier et passer l'entretien",
      desc: "Les administrateurs examinent les scores IA, planifient les entretiens et vous recevez automatiquement un lien Google Meet. Chaque changement de statut se reflète instantanément dans votre tableau de bord.",
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
    "Cette plateforme a été développée pour International Skills Labor Company (InternationalSkills.fi), un service finlandais de recrutement de main-d'oeuvre spécialisé dans la mise en relation de travailleurs internationaux qualifiés avec des employeurs européens. Le projet nécessitait une stack de qualité production intégrant Firebase, Google Workspace et Gemini AI — couvrant tout depuis l'intégration des candidats et le stockage des documents jusqu'à la notation par IA et la planification automatisée des entretiens via Google Meet.",
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
  howSubtitle: 'ثلاث مراحل تغطي دورة التوظيف بالكامل',
  steps: [
    {
      title: 'التقديم والتحقق',
      desc: 'أنشئ حسابًا، واجتز التحقق من البريد الإلكتروني (مع اكتشاف العناوين المؤقتة)، وقدِّم طلبك الكامل مع المستندات المخزّنة بأمان في Firebase Storage.',
    },
    {
      title: 'الذكاء الاصطناعي يُقيّم ملفك',
      desc: 'يقرأ Gemini 2.5 Pro سيرتك الذاتية وحضورك الإلكتروني، ثم يُنتج توصية مُنقَّطة — موصى به بشدة، موصى به، مشروط، أو غير موصى به — مع تقرير تفصيلي.',
    },
    {
      title: 'الجدولة وإجراء المقابلة',
      desc: 'يراجع المسؤولون النتائج ويُجدولون المقابلات، وتتلقى تلقائيًا رابط Google Meet. كل تغيير في الحالة ينعكس فورًا في لوحة تحكم المرشح الخاصة بك.',
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
    'بُنيت هذه المنصة لصالح International Skills Labor Company‏ ‏(InternationalSkills.fi)، خدمة فنلندية لتوظيف العمالة تتخصص في ربط العمال الدوليين المهرة بأصحاب العمل الأوروبيين. يستلزم المشروع بنيةً تقنية على مستوى الإنتاج تجمع بين Firebase وGoogle Workspace وGemini AI — تغطي كل شيء من إدماج المرشحين وتخزين الوثائق إلى التقييم بالذكاء الاصطناعي وجدولة المقابلات تلقائيًا عبر Google Meet.',
  metaTitle: 'InternationalSkills.fi — نظام إدارة التوظيف | محمد يعقوبي',
  metaDesc:
    'منصة توظيف متكاملة لـ InternationalSkills.fi: طلبات متعددة الخطوات، تقييم ذكي بـ Gemini 2.5 Pro، جدولة تلقائية عبر Google Meet، ولوحة تحكم إدارية — مبنية بـ Next.js و Firebase.',
}

export function getInternationalSkillsI18n(locale: string): InternationalSkillsI18n {
  if (locale === 'fr') return fr
  if (locale === 'ar') return ar
  return en
}
