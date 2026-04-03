// DocuMed project page — i18n for EN / FR / AR

type DocuMedI18n = {
  badge: string
  bootcampBadge: string
  heroTitle: string
  heroDesc: string
  demoBtn: string
  githubBtn: string
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

const en: DocuMedI18n = {
  badge: 'MentorNations Bootcamp',
  bootcampBadge: 'Team of 3 · 6-week build · Funded by Australian Embassy',
  heroTitle: 'DocuMed — Healthcare Management Platform',
  heroDesc:
    'A full-stack web application that streamlines interactions between doctors and patients. Dual dashboards, real-time appointment scheduling, and secure medical record management — all in one platform.',
  demoBtn: 'Live Demo',
  githubBtn: 'View Source',
  backToProjects: '← Back to Projects',
  featuresTitle: 'Core features',
  featuresSubtitle: 'Everything a modern healthcare workflow needs in one place',
  features: [
    {
      title: 'Dual Dashboard System',
      desc: 'Separate, role-specific dashboards for doctors and patients. Each interface surfaces only the tools and data relevant to that role.',
    },
    {
      title: 'Real-Time Appointments',
      desc: 'Patients book slots, doctors approve or reject requests, and status updates propagate instantly through Firebase — no page refresh needed.',
    },
    {
      title: 'Medical Records',
      desc: 'Structured patient history stored in Firestore. Doctors hold write access; patients read-only view their own records. Every update is timestamped.',
    },
    {
      title: 'Clinic Management',
      desc: 'Multi-clinic support with per-clinic specialties and doctor associations. Patients can browse clinics by location or specialty before booking.',
    },
  ],
  howTitle: 'How it works',
  howSubtitle: 'A role-aware flow covering the full appointment lifecycle',
  steps: [
    {
      title: 'Secure Sign-In',
      desc: 'Firebase Authentication handles registration and login. On first sign-up, users choose a role — Doctor or Patient. Protected routes enforce that choice throughout the session.',
    },
    {
      title: 'Book or Manage Appointments',
      desc: 'Patients browse available doctors by clinic or specialty, select a time slot, and submit a request. Doctors see a live queue and approve, reject, or mark slots as ongoing.',
    },
    {
      title: 'View & Update Records',
      desc: 'After a consultation, the attending doctor adds notes, prescriptions, and diagnoses to the patient record. The patient can view their full medical history at any time.',
    },
  ],
  techTitle: 'Tech stack',
  techStack: [
    { category: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui', 'Framer Motion'] },
    { category: 'Backend & Auth', items: ['Firebase Auth', 'Firestore', 'Firebase Storage'] },
    { category: 'Forms & Validation', items: ['React Hook Form', 'Zod'] },
    { category: 'Utilities', items: ['date-fns', 'React Context'] },
  ],
  securityTitle: 'Security & data protection',
  securityItems: [
    'Firestore Security Rules — patients can only read their own records; doctors limited to their assigned patients',
    'Role-based access control enforced on both client routes and server-side Firestore queries',
    'Secure API routes — no sensitive data exposed to unauthenticated requests',
    'Firebase Auth token validation on every protected action',
  ],
  contextTitle: 'Built during a bootcamp',
  contextText:
    'DocuMed was developed over six weeks as part of the MentorNations fullstack development bootcamp, funded by the Australian Embassy. A team of three built the application end-to-end — from authentication and Firestore schema design to UI polish and deployment. The goal was to ship a practical, production-ready tool that addressed a real friction point: the disconnect between patient records, appointment booking, and clinic administration in small-to-medium healthcare settings.',
  metaTitle: 'DocuMed — Healthcare Management Platform | Mohamed Yaakoubi',
  metaDesc:
    'DocuMed is a full-stack healthcare platform with dual dashboards for doctors and patients, real-time appointment scheduling, and secure medical records — built with Next.js and Firebase.',
}

const fr: DocuMedI18n = {
  badge: "Bootcamp MentorNations",
  bootcampBadge: "Équipe de 3 · Projet de 6 semaines · Financé par l'Ambassade d'Australie",
  heroTitle: "DocuMed — Plateforme de Gestion de Santé",
  heroDesc:
    "Une application web full-stack qui fluidifie les interactions entre médecins et patients. Tableaux de bord doubles, prise de rendez-vous en temps réel et gestion sécurisée des dossiers médicaux — tout en une seule plateforme.",
  demoBtn: "Démo en direct",
  githubBtn: "Voir le code",
  backToProjects: "← Retour aux projets",
  featuresTitle: "Fonctionnalités principales",
  featuresSubtitle: "Tout ce dont un flux de travail de santé moderne a besoin en un seul endroit",
  features: [
    {
      title: "Système de tableaux de bord doubles",
      desc: "Tableaux de bord distincts et adaptés aux rôles pour les médecins et les patients. Chaque interface n'affiche que les outils et données pertinents pour ce rôle.",
    },
    {
      title: "Rendez-vous en temps réel",
      desc: "Les patients réservent des créneaux, les médecins approuvent ou refusent les demandes, et les mises à jour de statut se propagent instantanément via Firebase — sans rechargement de page.",
    },
    {
      title: "Dossiers médicaux",
      desc: "Historique patient structuré stocké dans Firestore. Les médecins ont accès en écriture ; les patients ont une vue en lecture seule de leurs propres dossiers. Chaque mise à jour est horodatée.",
    },
    {
      title: "Gestion des cliniques",
      desc: "Support multi-cliniques avec spécialités et associations médecin par clinique. Les patients peuvent parcourir les cliniques par localisation ou spécialité avant de réserver.",
    },
  ],
  howTitle: "Comment ça marche",
  howSubtitle: "Un flux conscient des rôles couvrant tout le cycle de vie des rendez-vous",
  steps: [
    {
      title: "Connexion sécurisée",
      desc: "Firebase Authentication gère l'inscription et la connexion. Lors de la première inscription, les utilisateurs choisissent un rôle — Médecin ou Patient. Les routes protégées appliquent ce choix tout au long de la session.",
    },
    {
      title: "Réserver ou gérer les rendez-vous",
      desc: "Les patients parcourent les médecins disponibles par clinique ou spécialité, sélectionnent un créneau et soumettent une demande. Les médecins voient une file d'attente en direct et approuvent, refusent ou marquent les créneaux comme en cours.",
    },
    {
      title: "Consulter et mettre à jour les dossiers",
      desc: "Après une consultation, le médecin traitant ajoute des notes, ordonnances et diagnostics au dossier patient. Le patient peut consulter son historique médical complet à tout moment.",
    },
  ],
  techTitle: "Stack technique",
  techStack: [
    { category: "Frontend", items: ["Next.js 14", "TypeScript", "Tailwind CSS", "Shadcn/ui", "Framer Motion"] },
    { category: "Backend & Auth", items: ["Firebase Auth", "Firestore", "Firebase Storage"] },
    { category: "Formulaires & Validation", items: ["React Hook Form", "Zod"] },
    { category: "Utilitaires", items: ["date-fns", "React Context"] },
  ],
  securityTitle: "Sécurité & protection des données",
  securityItems: [
    "Règles de sécurité Firestore — les patients ne peuvent lire que leurs propres dossiers ; les médecins limités à leurs patients assignés",
    "Contrôle d'accès basé sur les rôles appliqué sur les routes client et les requêtes Firestore côté serveur",
    "Routes API sécurisées — aucune donnée sensible exposée aux requêtes non authentifiées",
    "Validation du token Firebase Auth sur chaque action protégée",
  ],
  contextTitle: "Construit pendant un bootcamp",
  contextText:
    "DocuMed a été développé sur six semaines dans le cadre du bootcamp de développement fullstack MentorNations, financé par l'Ambassade d'Australie. Une équipe de trois personnes a construit l'application de bout en bout — de l'authentification et la conception du schéma Firestore jusqu'au polish de l'interface et au déploiement. L'objectif était de livrer un outil pratique et prêt pour la production qui répondait à un vrai point de friction : le manque de connexion entre les dossiers patients, la prise de rendez-vous et l'administration des cliniques dans les structures de santé petites et moyennes.",
  metaTitle: "DocuMed — Plateforme de Gestion de Santé | Mohamed Yaakoubi",
  metaDesc:
    "DocuMed est une plateforme de santé full-stack avec des tableaux de bord doubles pour médecins et patients, une prise de rendez-vous en temps réel et des dossiers médicaux sécurisés — construite avec Next.js et Firebase.",
}

const ar: DocuMedI18n = {
  badge: 'بوتكامب MentorNations',
  bootcampBadge: 'فريق من 3 · مشروع 6 أسابيع · بتمويل من السفارة الأسترالية',
  heroTitle: 'DocuMed — منصة إدارة الرعاية الصحية',
  heroDesc:
    'تطبيق ويب متكامل يُبسّط التواصل بين الأطباء والمرضى. لوحات تحكم مزدوجة، وجدولة مواعيد في الوقت الفعلي، وإدارة آمنة للسجلات الطبية — كل ذلك في منصة واحدة.',
  demoBtn: 'عرض تجريبي',
  githubBtn: 'عرض الكود',
  backToProjects: '← العودة إلى المشاريع',
  featuresTitle: 'الميزات الأساسية',
  featuresSubtitle: 'كل ما يحتاجه سير عمل الرعاية الصحية الحديثة في مكان واحد',
  features: [
    {
      title: 'نظام لوحتَي تحكم',
      desc: 'لوحات تحكم منفصلة ومخصصة لكلٍّ من الأطباء والمرضى. تعرض كل واجهة الأدوات والبيانات ذات الصلة بذلك الدور فحسب.',
    },
    {
      title: 'مواعيد فورية',
      desc: 'يحجز المرضى مواعيدهم، يوافق الأطباء أو يرفضون الطلبات، وتنتشر التحديثات فورًا عبر Firebase — دون الحاجة إلى إعادة تحميل الصفحة.',
    },
    {
      title: 'السجلات الطبية',
      desc: 'تاريخ المريض المنظّم مخزّن في Firestore. للأطباء صلاحية الكتابة؛ وللمرضى عرض سجلاتهم الخاصة فقط. كل تحديث مؤرشف بتوقيت زمني.',
    },
    {
      title: 'إدارة العيادات',
      desc: 'دعم متعدد العيادات مع تخصصات ومرتبطات الأطباء لكل عيادة. يمكن للمرضى تصفح العيادات حسب الموقع أو التخصص قبل الحجز.',
    },
  ],
  howTitle: 'كيف يعمل',
  howSubtitle: 'تدفق واعٍ بالأدوار يغطي دورة حياة الموعد بالكامل',
  steps: [
    {
      title: 'تسجيل دخول آمن',
      desc: 'يتولى Firebase Authentication عمليتَي التسجيل وتسجيل الدخول. عند الاشتراك الأول، يختار المستخدم دوره — طبيب أم مريض. تُطبِّق المسارات المحمية هذا الاختيار طوال الجلسة.',
    },
    {
      title: 'الحجز أو إدارة المواعيد',
      desc: 'يتصفح المرضى الأطباء المتاحين حسب العيادة أو التخصص، يختارون موعدًا، ويرسلون الطلب. يرى الأطباء قائمة انتظار مباشرة ويوافقون أو يرفضون أو يُعلّمون الفترات على أنها جارية.',
    },
    {
      title: 'عرض السجلات وتحديثها',
      desc: 'بعد الاستشارة، يُضيف الطبيب المعالج ملاحظاته والوصفات والتشخيصات إلى ملف المريض. يمكن للمريض الاطلاع على تاريخه الطبي الكامل في أي وقت.',
    },
  ],
  techTitle: 'تقنيات المشروع',
  techStack: [
    { category: 'الواجهة الأمامية', items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui', 'Framer Motion'] },
    { category: 'الخلفية والمصادقة', items: ['Firebase Auth', 'Firestore', 'Firebase Storage'] },
    { category: 'النماذج والتحقق', items: ['React Hook Form', 'Zod'] },
    { category: 'أدوات مساعدة', items: ['date-fns', 'React Context'] },
  ],
  securityTitle: 'الأمان وحماية البيانات',
  securityItems: [
    'قواعد أمان Firestore — لا يمكن للمرضى قراءة سوى سجلاتهم الخاصة؛ الأطباء مقيّدون بمرضاهم المُسندين',
    'التحكم في الوصول على أساس الأدوار مُطبَّق على مسارات العميل واستعلامات Firestore من جهة الخادم',
    'مسارات API محمية — لا تتعرض بيانات حساسة للطلبات غير المصادَق عليها',
    'التحقق من رمز Firebase Auth عند كل إجراء محمي',
  ],
  contextTitle: 'بُني خلال بوتكامب',
  contextText:
    'طُوِّر DocuMed على مدى ستة أسابيع ضمن بوتكامب التطوير المتكامل التابع لـ MentorNations، بتمويل من السفارة الأسترالية. بنى فريق من ثلاثة أشخاص التطبيق بالكامل — من المصادقة وتصميم مخطط Firestore، وصولًا إلى صقل الواجهة والنشر. كان الهدف توصيل أداة عملية وجاهزة للإنتاج تعالج نقطة احتكاك حقيقية: الفصل بين سجلات المرضى وحجز المواعيد وإدارة العيادات في بيئات الرعاية الصحية الصغيرة والمتوسطة.',
  metaTitle: 'DocuMed — منصة إدارة الرعاية الصحية | محمد يعقوبي',
  metaDesc:
    'DocuMed منصة رعاية صحية متكاملة تضم لوحتَي تحكم للأطباء والمرضى، وجدولة مواعيد فورية، وسجلات طبية آمنة — مبنية بـ Next.js و Firebase.',
}

export function getDocuMedI18n(locale: string): DocuMedI18n {
  if (locale === 'fr') return fr
  if (locale === 'ar') return ar
  return en
}
