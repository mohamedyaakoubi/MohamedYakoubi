// SheetDiff™ i18n — all translatable content for the 4 SheetDiff pages
// Keys: main (landing), pricing, privacy, terms

type SheetDiffI18n = {
  main: {
    badge: string
    heroTitle: string
    heroHighlight: string
    heroDesc: string
    installBtn: string
    viewPricing: string
    modesTitle: string
    structuralTitle: string
    structuralDesc: string
    cellTitle: string
    cellDesc: string
    dupTitle: string
    dupDesc: string
    howTitle: string
    steps: string[]
    diffTitle: string
    diffCats: { label: string; color: string }[]
    featuresTitle: string
    features: string[]
    pricingTitle: string
    pricingSub: string
    freeTier: string
    proMonthly: string
    proLifetime: string
    perMonth: string
    once: string
    comparePlans: string
    privacyTitle: string
    privacyText: string
    privacyLink: string
    termsLink: string
    getInTouch: string
    linkedinProfile: string
    trademark: string
  }
  pricing: {
    title: string
    subtitle: string
    monthlyBilling: string
    annualBilling: string
    save50: string
    freeTitle: string
    freeAfterTrial: string
    forever: string
    freeFeatures: string[]
    includedAfterTrial: string
    proTitle: string
    proSub: string
    mostPopular: string
    perYear: string
    perMonth: string
    savePct: string
    proFeatures: (string | { bold: string; rest: string })[]
    installAddon: string
    lifetimeTitle: string
    lifetimeSub: string
    lifetimePrice: string
    payOnce: string
    lifetimeFeatures: string[]
    faqTitle: string
    faqs: { q: string; a: string }[]
    backToOverview: string
    support: string
  }
  privacy: {
    title: string
    productLine: string
    lastUpdated: string
    sections: { heading: string; content: string }[]
    backTo: string
  }
  terms: {
    title: string
    productLine: string
    lastUpdated: string
    sections: { heading: string; content: string }[]
    pricingTable: {
      feature: string; trial: string; free: string; pro: string
      rows: { feature: string; trial: string; free: string; pro: string }[]
    }
    backTo: string
  }
}

// ────────────────────── ENGLISH ──────────────────────
const en: SheetDiffI18n = {
  main: {
    badge: 'Google Sheets™ Add-on by Mohamed Yaakoubi',
    heroTitle: 'SheetDiff™',
    heroHighlight: 'Compare, QA',
    heroDesc: 'SheetDiff™ is a schema-agnostic Google Sheets™ add-on built for spreadsheet comparison and quality assurance. It compares two versions of any structured data — the original and the reworked — and produces a detailed, row-level diff report.',
    installBtn: 'Install Add-on',
    viewPricing: 'View Pricing',
    modesTitle: 'Comparison Modes',
    structuralTitle: 'Structural Diff',
    structuralDesc: 'Row-level comparison with advanced algorithms to detect splits and merges across your data rows.',
    cellTitle: 'Cell-by-Cell',
    cellDesc: 'Column-aligned granular comparison for pinpointing exact character or formatting changes.',
    dupTitle: 'Duplicate Finder',
    dupDesc: 'Scan massive datasets instantly to detect and highlight duplicate rows within a single sheet.',
    howTitle: 'How It Works',
    steps: [
      'Open any spreadsheet in Google Sheets™',
      'The add-on auto-detects column roles (speaker, timestamps, transcript, sound events)',
      'Commit a snapshot of the original data',
      'Make edits or import the reworked version',
      'Run the diff — every row is categorized and color-coded',
    ],
    diffTitle: 'Diff Categories',
    diffCats: [
      { label: 'Unchanged — identical rows between versions', color: 'gray' },
      { label: 'Modified — rows with text or timing changes', color: 'yellow' },
      { label: 'Split — one original row split into multiple', color: 'purple' },
      { label: 'Merged — multiple original rows merged into one', color: 'indigo' },
      { label: 'Added — new rows in the reworked version', color: 'green' },
      { label: 'Deleted — rows removed from the original', color: 'red' },
    ],
    featuresTitle: 'Key Features',
    features: [
      'Schema-agnostic — works with any column layout',
      'Auto-detect column roles via flexible header pattern matching',
      'Color-coded Diff Viewer sheet',
      'Summary QA Report with per-category counts and WER/CER/SER metrics',
      'Configurable similarity threshold',
      'Multi-script normalization (Arabic, Cyrillic, CJK, Thai, Devanagari, Bengali)',
      'Optional reviewer and transcriptionist metadata',
      'Settings sidebar for full control',
    ],
    pricingTitle: 'Pricing',
    pricingSub: 'See full details on the Pricing page.',
    freeTier: 'Free Tier',
    proMonthly: 'Pro Monthly',
    proLifetime: 'Pro Lifetime',
    perMonth: '/mo',
    once: 'once',
    comparePlans: 'Compare Full Plans',
    privacyTitle: 'Privacy & Security',
    privacyText: 'Your spreadsheet data stays in Google Sheets™ — it is never transmitted to external servers. The only data sent to our license server is your Google account email, solely for license verification and usage tracking. Payments are handled by Dodo Payments (Merchant of Record). No cell content, row data, or file contents ever leave Google\u2019s infrastructure.',
    privacyLink: 'Privacy Policy',
    termsLink: 'Terms of Service',
    getInTouch: 'Get in Touch',
    linkedinProfile: 'LinkedIn Profile',
    trademark: 'Google Sheets™ and Google Drive™ are trademarks of Google LLC.',
  },
  pricing: {
    title: 'SheetDiff™ Pricing',
    subtitle: 'Start with a 7-day free trial — full access, no credit card required. After the trial, keep using SheetDiff™ for free or upgrade to Pro for unlimited access.',
    monthlyBilling: 'Monthly billing',
    annualBilling: 'Annual billing',
    save50: 'Save 50%',
    freeTitle: 'Free',
    freeAfterTrial: 'After 7-day trial',
    forever: '/forever',
    freeFeatures: [
      'All 3 comparison modes',
      'Up to 50 rows per comparison',
      '10 comparisons per month',
    ],
    includedAfterTrial: 'Included after trial',
    proTitle: 'Pro',
    proSub: 'Monthly or Annual',
    mostPopular: 'Most Popular',
    perYear: '/year',
    perMonth: '/month',
    savePct: '(save 50%)',
    proFeatures: [
      'All 3 comparison modes',
      { bold: 'Unlimited', rest: ' rows per comparison' },
      { bold: 'Unlimited', rest: ' comparisons per month' },
      'Color-coded Diff Viewer',
      'QA Report with WER/CER/SER metrics',
      'Priority email support',
    ],
    installAddon: 'Install the Add-on',
    lifetimeTitle: 'Pro Lifetime',
    lifetimeSub: 'One-time purchase',
    lifetimePrice: '$49.99',
    payOnce: 'Pay once, use forever',
    lifetimeFeatures: [
      'Everything in Pro',
      'Locks in today\u2019s price — no renewals ever',
      'No recurring payments',
      'Priority email support',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How does the 7-day trial work?', a: 'When you first install SheetDiff™, you get 7 days of full, unlimited access — no credit card required, no sign-up. After the trial, you can continue using SheetDiff™ for free (with limits) or upgrade to Pro.' },
      { q: 'What happens when the trial ends?', a: 'You automatically move to the Free tier: 50 rows per comparison and 10 comparisons per month. All features remain available — only the row count and comparison frequency are limited.' },
      { q: 'What payment methods do you accept?', a: 'Payments are processed by Dodo Payments, supporting credit/debit cards, PayPal, and local payment methods depending on your region. Dodo Payments handles all tax/VAT compliance automatically.' },
      { q: 'Can I cancel anytime?', a: 'Yes. Monthly and annual subscriptions can be cancelled at any time through Dodo Payments\u2019 customer portal. You keep access until the end of your current billing period.' },
      { q: 'What is the refund policy?', a: 'We offer a 14-day refund policy for all purchases. If SheetDiff™ doesn\u2019t meet your needs, contact us at amirrak8@gmail.com and we\u2019ll process your refund. See our Terms of Service for full details.' },
      { q: 'Is my data safe?', a: 'Yes. Your spreadsheet data never leaves Google Sheets™. The only data sent to our server is your email for license verification. See our Privacy Policy for complete details.' },
    ],
    backToOverview: 'Back to SheetDiff™ Overview',
    support: 'Support',
  },
  privacy: {
    title: 'Privacy Policy',
    productLine: 'SheetDiff™ \u00b7 Google Sheets™ Add-on',
    lastUpdated: 'Last updated: March 19, 2026',
    sections: [
      { heading: '1. Overview', content: 'SheetDiff™ (\u201cthe Add-on\u201d) is a Google Sheets™ add-on developed by Mohamed Yaakoubi that compares spreadsheet versions and generates quality assurance reports. This Privacy Policy explains how the Add-on collects, uses, and protects your data.' },
      { heading: '2. Data the Add-on Accesses', content: '<p>The Add-on requests the following Google OAuth scopes:</p><ul><li><strong>userinfo.email</strong> \u2014 Read your Google account email address. Used solely to identify you for license validation and usage tracking (see Section 5).</li><li><strong>spreadsheets.currentonly</strong> \u2014 Read and write access to the Google Sheets™ spreadsheet the Add-on is installed in. This is required to read data in your active spreadsheet, create snapshot sheets, generate the Diff Viewer, and produce the QA Report.</li><li><strong>drive.file</strong> \u2014 Access to individual Google Drive™ files that you explicitly select through the built-in Google Picker dialog. This is used solely for the Cross-Sheet Import feature.</li><li><strong>script.container.ui</strong> \u2014 Permission to display the Settings sidebar, dialogs, and custom menus within Google Sheets™.</li><li><strong>script.external_request</strong> \u2014 Permission to make network requests to our license verification server and to Google Analytics for anonymous usage analytics.</li></ul>' },
      { heading: '3. Data the Add-on Does NOT Access', content: '<ul><li>The Add-on does <strong>not</strong> browse, list, or scan your Google Drive™.</li><li>The Add-on does <strong>not</strong> access your Gmail, Calendar, Contacts, or any other Google service.</li><li>The Add-on does <strong>not</strong> read, store, or transmit the content of your spreadsheets to any external server.</li><li>The Add-on does <strong>not</strong> access your Google account password or authentication credentials.</li></ul>' },
      { heading: '4. Spreadsheet Data Storage', content: 'All spreadsheet data processed by the Add-on remains within your Google Sheets™ document. Comparison results, snapshots, diff reports, and user settings are stored in the spreadsheet\u2019s DocumentProperties using Google Apps Script\u2019s built-in Properties Service.' },
      { heading: '5. License Server & Data We Collect', content: '<p>To manage licensing, trial periods, and usage limits, the Add-on communicates with a license verification server hosted on Google Firebase. The following data is transmitted:</p><ul><li><strong>Google account email address</strong> \u2014 Used as a unique identifier for license records and usage tracking.</li><li><strong>License status</strong> \u2014 Whether you are on a trial, free tier, or paid plan.</li><li><strong>Usage count</strong> \u2014 The number of comparisons performed per calendar month. No spreadsheet content is transmitted.</li><li><strong>Payment metadata (via Dodo Payments webhook)</strong> \u2014 Billing email, customer ID, subscription ID, subscription status, and billing dates. No payment card details are included.</li></ul><p><strong>No spreadsheet content, cell values, row data, or file contents are ever transmitted to or stored on the license server.</strong></p>' },
      { heading: '6. Payment Processing', content: '<p>Paid subscriptions are processed by <strong>Dodo Payments (Dodo Payments Inc.)</strong>, which acts as the Merchant of Record.</p><ul><li>Payment information is collected and processed entirely by Dodo Payments. The developer never sees your payment details.</li><li>Dodo Payments sends a webhook notification confirming your purchase.</li><li>Dodo Payments\u2019 privacy policy: <a href="https://dodopayments.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">dodopayments.com/legal/privacy-policy</a>.</li></ul>' },
      { heading: '7. Data Security & Protection', content: '<ul><li>All spreadsheet data is protected by <strong>Google\u2019s encryption</strong> \u2014 in transit (TLS/HTTPS) and at rest (AES-256).</li><li>Communication between the Add-on and the license server uses HTTPS/TLS encryption.</li><li>The license server (Firebase) is protected by Google Cloud\u2019s infrastructure security.</li><li>Dodo Payments webhook signatures are cryptographically verified.</li><li>The Add-on does not store authentication tokens or credentials.</li><li>User preferences are stored in DocumentProperties, scoped to the individual spreadsheet.</li></ul>' },
      { heading: '8. Analytics', content: '<p>The Add-on collects anonymous usage analytics via Google Analytics 4 (GA4). Analytics data is collected in two ways:</p><ul><li><strong>Server-side events</strong> \u2014 Your email is hashed (SHA-256) before use as a client identifier.</li><li><strong>Client-side events</strong> \u2014 Dialogs and sidebars include the GA4 gtag.js snippet.</li></ul><p>Analytics data does <strong>not</strong> include your email, spreadsheet content, or IP addresses.</p>' },
      { heading: '9. No Sale or Transfer of Data', content: 'The Add-on does not sell, trade, rent, or transfer your data to any third party for advertising, data brokering, or any purpose unrelated to the Add-on\u2019s core functionality.' },
      { heading: '10. No AI/ML Model Training', content: 'Your data is <strong>never</strong> used for training artificial intelligence or machine learning models. The Add-on\u2019s comparison algorithms are rule-based and do not involve any form of model training.' },
      { heading: '11. Data Retention & Deletion', content: '<ul><li><strong>Spreadsheet data</strong> resides within your Google Sheets™ document and is deleted when you delete the spreadsheet or uninstall the Add-on.</li><li><strong>License records</strong> are stored on the Firebase server and removed within 30 days of a deletion request.</li><li>You may request deletion of all your data at any time by contacting the developer.</li></ul>' },
      { heading: '12. Children\u2019s Privacy', content: 'The Add-on is not directed at children under 13 and does not knowingly collect any information from children.' },
      { heading: '13. Changes to This Policy', content: 'This Privacy Policy may be updated from time to time. Changes will be reflected on this page with an updated \u201cLast updated\u201d date.' },
      { heading: '14. Contact', content: '<p>If you have any questions, please contact:</p><p><strong>Mohamed Yaakoubi</strong><br/>Email: <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a><br/>LinkedIn: <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a></p>' },
    ],
    backTo: 'Back to SheetDiff™',
  },
  terms: {
    title: 'Terms of Service',
    productLine: 'SheetDiff™ \u00b7 Google Sheets™ Add-on',
    lastUpdated: 'Last updated: March 19, 2026',
    pricingTable: {
      feature: 'Feature', trial: 'Trial (7 days)', free: 'Free Tier', pro: 'SheetDiff™ Pro',
      rows: [
        { feature: 'Row limit per comparison', trial: 'Unlimited', free: '50 rows', pro: 'Unlimited' },
        { feature: 'Comparisons per month', trial: 'Unlimited', free: '10', pro: 'Unlimited' },
        { feature: 'All comparison modes', trial: 'Yes', free: 'Yes', pro: 'Yes' },
        { feature: 'Price', trial: 'Free', free: 'Free', pro: '$4.99/mo \u00b7 $29.99/yr \u00b7 $49.99 lifetime' },
      ],
    },
    sections: [
      { heading: '1. Acceptance of Terms', content: 'By installing or using the SheetDiff™ add-on (\u201cthe Add-on\u201d), you agree to these Terms of Service. If you do not agree, please do not install or use the Add-on.' },
      { heading: '2. Description of the Add-on', content: 'The Add-on is a Google Sheets™ tool that compares two versions of a spreadsheet to detect changes such as modifications, splits, merges, additions, and deletions. It calculates accuracy metrics (WER, CER, SER) and generates a quality assurance report.' },
      { heading: '3. Plans & Pricing', content: 'The Add-on is offered under the following tiers:' },
      { heading: '', content: 'The trial period begins when you first use the Add-on and lasts 7 calendar days. After the trial expires, you are automatically moved to the Free Tier unless you upgrade. Pricing is in US dollars and may be updated with notice.' },
      { heading: '4. License', content: 'You are granted a non-exclusive, non-transferable, revocable license to use the Add-on for personal or commercial purposes within Google Sheets™, subject to the usage limits of your current plan.' },
      { heading: '5. Payment & Subscriptions', content: '<ul><li>All payments are processed by <strong>Dodo Payments</strong>, which acts as the Merchant of Record.</li><li>Subscriptions renew automatically unless cancelled before the renewal date.</li><li>Lifetime licenses are a one-time purchase granting perpetual access.</li><li>You may cancel at any time through the Dodo Payments customer portal.</li></ul>' },
      { heading: '6. Refund Policy', content: '<ul><li><strong>7-day free trial:</strong> Evaluate the full Add-on before purchasing.</li><li><strong>Subscriptions:</strong> Full refund within 14 days of purchase or renewal. Contact amirrak8@gmail.com.</li><li><strong>Lifetime licenses:</strong> Refund within 14 days if the Add-on does not function as described.</li><li>Refunds are processed through Dodo Payments within 5\u201310 business days.</li></ul>' },
      { heading: '7. Your Data', content: 'The Add-on processes spreadsheet data entirely within Google Sheets™. No spreadsheet content is ever transmitted externally. See our Privacy Policy for complete details.' },
      { heading: '8. Accuracy and Reliability', content: 'The Add-on uses text similarity algorithms and heuristic matching. Results are provided on an \u201cas is\u201d basis. You should review the generated report and use your professional judgment.' },
      { heading: '9. Disclaimer of Warranties', content: 'THE ADD-ON IS PROVIDED \u201cAS IS\u201d AND \u201cAS AVAILABLE\u201d WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.' },
      { heading: '10. Limitation of Liability', content: 'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE DEVELOPER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.' },
      { heading: '11. Modifications to the Add-on', content: 'The developer reserves the right to modify, suspend, or discontinue the Add-on at any time. Active paid subscribers will be notified in advance of material changes.' },
      { heading: '12. Modifications to These Terms', content: 'These Terms may be updated from time to time. Continued use after changes constitutes acceptance.' },
      { heading: '13. Termination', content: 'You may stop using the Add-on at any time by uninstalling it and cancelling any subscription. The developer may terminate access if these Terms are violated.' },
      { heading: '14. Governing Law', content: 'These Terms shall be governed by and construed in accordance with applicable laws.' },
      { heading: '15. Contact', content: '<p>If you have any questions, please contact:</p><p><strong>Mohamed Yaakoubi</strong><br/>Email: <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a><br/>LinkedIn: <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a></p>' },
    ],
    backTo: 'Back to SheetDiff™',
  },
}

// ────────────────────── FRENCH ──────────────────────
const fr: SheetDiffI18n = {
  main: {
    badge: 'Module Google Sheets™ par Mohamed Yaakoubi',
    heroTitle: 'SheetDiff™',
    heroHighlight: 'Comparer, QA',
    heroDesc: 'SheetDiff™ est un module Google Sheets™ indépendant du schéma, conçu pour la comparaison de feuilles de calcul et l\u2019assurance qualité. Il compare deux versions de données structurées — l\u2019original et la version révisée — et produit un rapport de différences détaillé, ligne par ligne.',
    installBtn: 'Installer le module',
    viewPricing: 'Voir les tarifs',
    modesTitle: 'Modes de comparaison',
    structuralTitle: 'Diff structurel',
    structuralDesc: 'Comparaison ligne par ligne avec des algorithmes avancés pour détecter les divisions et fusions dans vos données.',
    cellTitle: 'Cellule par cellule',
    cellDesc: 'Comparaison granulaire alignée par colonne pour repérer les modifications exactes de caractères ou de format.',
    dupTitle: 'Détecteur de doublons',
    dupDesc: 'Analysez instantanément des jeux de données volumineux pour détecter et mettre en évidence les lignes en double.',
    howTitle: 'Comment ça fonctionne',
    steps: [
      'Ouvrez n\u2019importe quelle feuille de calcul dans Google Sheets™',
      'Le module détecte automatiquement les rôles des colonnes (locuteur, horodatages, transcription, événements sonores)',
      'Enregistrez un instantané des données d\u2019origine',
      'Effectuez vos modifications ou importez la version révisée',
      'Lancez le diff — chaque ligne est catégorisée et colorée',
    ],
    diffTitle: 'Catégories de différences',
    diffCats: [
      { label: 'Inchangé — lignes identiques entre les versions', color: 'gray' },
      { label: 'Modifié — lignes avec des changements de texte ou de timing', color: 'yellow' },
      { label: 'Divisé — une ligne d\u2019origine divisée en plusieurs', color: 'purple' },
      { label: 'Fusionné — plusieurs lignes d\u2019origine fusionnées en une', color: 'indigo' },
      { label: 'Ajouté — nouvelles lignes dans la version révisée', color: 'green' },
      { label: 'Supprimé — lignes retirées de l\u2019original', color: 'red' },
    ],
    featuresTitle: 'Fonctionnalités clés',
    features: [
      'Indépendant du schéma — fonctionne avec n\u2019importe quelle disposition de colonnes',
      'Détection automatique des rôles de colonnes via correspondance flexible d\u2019en-têtes',
      'Feuille de visualisation des différences avec code couleur',
      'Rapport QA avec compteurs par catégorie et métriques WER/CER/SER',
      'Seuil de similarité configurable',
      'Normalisation multi-script (arabe, cyrillique, CJK, thaï, devanagari, bengali)',
      'Métadonnées optionnelles du réviseur et du transcripteur',
      'Barre latérale de paramètres pour un contrôle total',
    ],
    pricingTitle: 'Tarifs',
    pricingSub: 'Voir tous les détails sur la page Tarifs.',
    freeTier: 'Gratuit',
    proMonthly: 'Pro Mensuel',
    proLifetime: 'Pro à Vie',
    perMonth: '/mois',
    once: 'unique',
    comparePlans: 'Comparer les forfaits',
    privacyTitle: 'Confidentialité et sécurité',
    privacyText: 'Vos données restent dans Google Sheets™ — elles ne sont jamais transmises à des serveurs externes. Seule votre adresse e-mail Google est envoyée à notre serveur de licences pour la vérification et le suivi d\u2019utilisation. Les paiements sont gérés par Dodo Payments (Marchand de Référence). Aucun contenu de cellule, donnée de ligne ou fichier ne quitte l\u2019infrastructure de Google.',
    privacyLink: 'Politique de confidentialité',
    termsLink: 'Conditions d\u2019utilisation',
    getInTouch: 'Nous contacter',
    linkedinProfile: 'Profil LinkedIn',
    trademark: 'Google Sheets™ et Google Drive™ sont des marques de Google LLC.',
  },
  pricing: {
    title: 'Tarifs SheetDiff™',
    subtitle: 'Commencez avec un essai gratuit de 7 jours — accès complet, sans carte bancaire. Après l\u2019essai, continuez gratuitement ou passez à Pro pour un accès illimité.',
    monthlyBilling: 'Facturation mensuelle',
    annualBilling: 'Facturation annuelle',
    save50: '\u221250 %',
    freeTitle: 'Gratuit',
    freeAfterTrial: 'Après l\u2019essai de 7 jours',
    forever: '/à vie',
    freeFeatures: [
      'Les 3 modes de comparaison',
      'Jusqu\u2019à 50 lignes par comparaison',
      '10 comparaisons par mois',
    ],
    includedAfterTrial: 'Inclus après l\u2019essai',
    proTitle: 'Pro',
    proSub: 'Mensuel ou annuel',
    mostPopular: 'Le plus populaire',
    perYear: '/an',
    perMonth: '/mois',
    savePct: '(\u221250 %)',
    proFeatures: [
      'Les 3 modes de comparaison',
      { bold: 'Illimité', rest: ' — lignes par comparaison' },
      { bold: 'Illimité', rest: ' — comparaisons par mois' },
      'Visualisation des différences avec code couleur',
      'Rapport QA avec métriques WER/CER/SER',
      'Support e-mail prioritaire',
    ],
    installAddon: 'Installer le module',
    lifetimeTitle: 'Pro à Vie',
    lifetimeSub: 'Achat unique',
    lifetimePrice: '49,99 $',
    payOnce: 'Payez une fois, utilisez pour toujours',
    lifetimeFeatures: [
      'Tout ce qui est inclus dans Pro',
      'Verrouillez le prix actuel — aucun renouvellement',
      'Aucun paiement récurrent',
      'Support e-mail prioritaire',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment fonctionne l\u2019essai de 7 jours ?', a: 'Lorsque vous installez SheetDiff™ pour la première fois, vous bénéficiez de 7 jours d\u2019accès complet et illimité — sans carte bancaire ni inscription. Après l\u2019essai, vous pouvez continuer gratuitement (avec des limites) ou passer à Pro.' },
      { q: 'Que se passe-t-il à la fin de l\u2019essai ?', a: 'Vous passez automatiquement au forfait Gratuit : 50 lignes par comparaison et 10 comparaisons par mois. Toutes les fonctionnalités restent disponibles — seuls le nombre de lignes et la fréquence de comparaison sont limités.' },
      { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Les paiements sont traités par Dodo Payments, qui prend en charge les cartes de crédit/débit, PayPal et les méthodes de paiement locales selon votre région. Dodo Payments gère automatiquement la conformité TVA.' },
      { q: 'Puis-je annuler à tout moment ?', a: 'Oui. Les abonnements mensuels et annuels peuvent être annulés à tout moment via le portail client Dodo Payments. Vous conservez l\u2019accès jusqu\u2019à la fin de votre période de facturation en cours.' },
      { q: 'Quelle est la politique de remboursement ?', a: 'Nous offrons un remboursement dans les 14 jours suivant l\u2019achat. Si SheetDiff™ ne répond pas à vos attentes, contactez-nous à amirrak8@gmail.com et nous traiterons votre remboursement. Consultez nos Conditions d\u2019utilisation.' },
      { q: 'Mes données sont-elles en sécurité ?', a: 'Oui. Vos données ne quittent jamais Google Sheets™. Seule votre adresse e-mail est envoyée à notre serveur pour la vérification de licence. Consultez notre Politique de confidentialité.' },
    ],
    backToOverview: 'Retour à SheetDiff™',
    support: 'Assistance',
  },
  privacy: {
    title: 'Politique de confidentialité',
    productLine: 'SheetDiff™ \u00b7 Module Google Sheets™',
    lastUpdated: 'Dernière mise à jour : 19 mars 2026',
    sections: [
      { heading: '1. Présentation', content: 'SheetDiff™ (\u00ab le Module \u00bb) est un module Google Sheets™ développé par Mohamed Yaakoubi qui compare les versions de feuilles de calcul et génère des rapports d\u2019assurance qualité. Cette Politique de confidentialité explique comment le Module collecte, utilise et protège vos données.' },
      { heading: '2. Données auxquelles le Module accède', content: '<p>Le Module demande les autorisations OAuth Google suivantes :</p><ul><li><strong>userinfo.email</strong> — Lecture de votre adresse e-mail Google. Utilisée uniquement pour l\u2019identification aux fins de validation de licence et de suivi d\u2019utilisation.</li><li><strong>spreadsheets.currentonly</strong> — Accès en lecture/écriture à la feuille de calcul dans laquelle le Module est installé. Nécessaire pour lire les données, créer des instantanés, générer le visualiseur de différences et produire le rapport QA.</li><li><strong>drive.file</strong> — Accès aux fichiers Google Drive™ que vous sélectionnez explicitement via le sélecteur de fichiers Google intégré. Utilisé uniquement pour la fonctionnalité d\u2019importation inter-feuilles.</li><li><strong>script.container.ui</strong> — Autorisation d\u2019afficher la barre latérale des paramètres, les boîtes de dialogue et les menus personnalisés.</li><li><strong>script.external_request</strong> — Autorisation d\u2019effectuer des requêtes réseau vers notre serveur de licences et vers Google Analytics.</li></ul>' },
      { heading: '3. Données NON accessibles par le Module', content: '<ul><li>Le Module ne parcourt <strong>pas</strong> votre Google Drive™.</li><li>Le Module n\u2019accède <strong>pas</strong> à Gmail, Agenda, Contacts ou tout autre service Google.</li><li>Le Module ne lit, ne stocke et ne transmet <strong>pas</strong> le contenu de vos feuilles de calcul vers un serveur externe.</li><li>Le Module n\u2019accède <strong>pas</strong> à votre mot de passe ou vos identifiants Google.</li></ul>' },
      { heading: '4. Stockage des données des feuilles de calcul', content: 'Toutes les données traitées par le Module restent dans votre document Google Sheets™. Les résultats de comparaison, instantanés, rapports de différences et paramètres sont stockés dans les DocumentProperties du tableur via le service Properties de Google Apps Script.' },
      { heading: '5. Serveur de licences et données collectées', content: '<p>Pour gérer les licences, périodes d\u2019essai et limites d\u2019utilisation, le Module communique avec un serveur de vérification de licences hébergé sur Google Firebase. Les données suivantes sont transmises :</p><ul><li><strong>Adresse e-mail Google</strong> — Identifiant unique pour les enregistrements de licence et le suivi d\u2019utilisation.</li><li><strong>Statut de licence</strong> — Essai, forfait gratuit ou forfait payant.</li><li><strong>Compteur d\u2019utilisation</strong> — Nombre de comparaisons par mois calendaire. Aucun contenu de feuille de calcul n\u2019est transmis.</li><li><strong>Métadonnées de paiement (via webhook Dodo Payments)</strong> — E-mail de facturation, identifiant client, identifiant d\u2019abonnement, statut et dates de facturation. Aucun détail de carte bancaire n\u2019est inclus.</li></ul><p><strong>Aucun contenu de feuille de calcul, valeur de cellule, donnée de ligne ou contenu de fichier n\u2019est jamais transmis ni stocké sur le serveur de licences.</strong></p>' },
      { heading: '6. Traitement des paiements', content: '<p>Les abonnements payants sont traités par <strong>Dodo Payments (Dodo Payments Inc.)</strong>, qui agit en tant que Marchand de Référence.</p><ul><li>Les informations de paiement sont collectées et traitées exclusivement par Dodo Payments. Le développeur ne voit jamais vos détails de paiement.</li><li>Dodo Payments envoie une notification webhook confirmant votre achat.</li><li>Politique de confidentialité de Dodo Payments : <a href="https://dodopayments.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">dodopayments.com/legal/privacy-policy</a>.</li></ul>' },
      { heading: '7. Sécurité et protection des données', content: '<ul><li>Toutes les données sont protégées par le <strong>chiffrement de Google</strong> — en transit (TLS/HTTPS) et au repos (AES-256).</li><li>La communication avec le serveur de licences utilise le chiffrement HTTPS/TLS.</li><li>Le serveur de licences (Firebase) est protégé par l\u2019infrastructure de sécurité de Google Cloud.</li><li>Les signatures webhook de Dodo Payments sont vérifiées cryptographiquement.</li><li>Le Module ne stocke aucun jeton d\u2019authentification ni identifiant.</li><li>Les préférences utilisateur sont stockées dans les DocumentProperties, limitées à la feuille de calcul individuelle.</li></ul>' },
      { heading: '8. Analytique', content: '<p>Le Module collecte des analyses d\u2019utilisation anonymes via Google Analytics 4 (GA4) :</p><ul><li><strong>Événements côté serveur</strong> — Votre e-mail est haché (SHA-256) avant utilisation comme identifiant client.</li><li><strong>Événements côté client</strong> — Les boîtes de dialogue et barres latérales incluent le snippet GA4 gtag.js.</li></ul><p>Les données analytiques <strong>n\u2019incluent pas</strong> votre e-mail, le contenu des feuilles de calcul ou les adresses IP.</p>' },
      { heading: '9. Aucune vente ou transfert de données', content: 'Le Module ne vend, n\u2019échange, ne loue et ne transfère pas vos données à un tiers à des fins publicitaires, de courtage de données ou pour tout objectif non lié aux fonctionnalités essentielles du Module.' },
      { heading: '10. Aucun entraînement IA/ML', content: 'Vos données ne sont <strong>jamais</strong> utilisées pour l\u2019entraînement de modèles d\u2019intelligence artificielle ou d\u2019apprentissage automatique. Les algorithmes de comparaison du Module sont basés sur des règles et n\u2019impliquent aucune forme d\u2019entraînement de modèle.' },
      { heading: '11. Conservation et suppression des données', content: '<ul><li><strong>Données des feuilles de calcul</strong> — Elles restent dans votre document Google Sheets™ et sont supprimées lorsque vous supprimez le fichier ou désinstallez le Module.</li><li><strong>Enregistrements de licence</strong> — Stockés sur le serveur Firebase et supprimés dans les 30 jours suivant une demande de suppression.</li><li>Vous pouvez demander la suppression de toutes vos données à tout moment en contactant le développeur.</li></ul>' },
      { heading: '12. Protection des mineurs', content: 'Le Module ne s\u2019adresse pas aux enfants de moins de 13 ans et ne collecte sciemment aucune information les concernant.' },
      { heading: '13. Modifications de cette politique', content: 'Cette Politique de confidentialité peut être mise à jour périodiquement. Les modifications seront reflétées sur cette page avec une date \u00ab Dernière mise à jour \u00bb actualisée.' },
      { heading: '14. Contact', content: '<p>Pour toute question, veuillez contacter :</p><p><strong>Mohamed Yaakoubi</strong><br/>E-mail : <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a><br/>LinkedIn : <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a></p>' },
    ],
    backTo: 'Retour à SheetDiff™',
  },
  terms: {
    title: 'Conditions d\u2019utilisation',
    productLine: 'SheetDiff™ \u00b7 Module Google Sheets™',
    lastUpdated: 'Dernière mise à jour : 19 mars 2026',
    pricingTable: {
      feature: 'Fonctionnalité', trial: 'Essai (7 jours)', free: 'Forfait gratuit', pro: 'SheetDiff™ Pro',
      rows: [
        { feature: 'Limite de lignes par comparaison', trial: 'Illimité', free: '50 lignes', pro: 'Illimité' },
        { feature: 'Comparaisons par mois', trial: 'Illimité', free: '10', pro: 'Illimité' },
        { feature: 'Tous les modes de comparaison', trial: 'Oui', free: 'Oui', pro: 'Oui' },
        { feature: 'Prix', trial: 'Gratuit', free: 'Gratuit', pro: '4,99 $/mois \u00b7 29,99 $/an \u00b7 49,99 $ à vie' },
      ],
    },
    sections: [
      { heading: '1. Acceptation des conditions', content: 'En installant ou en utilisant le module SheetDiff™ (\u00ab le Module \u00bb), vous acceptez ces Conditions d\u2019utilisation. Si vous n\u2019êtes pas d\u2019accord, veuillez ne pas installer ni utiliser le Module.' },
      { heading: '2. Description du Module', content: 'Le Module est un outil Google Sheets™ qui compare deux versions d\u2019une feuille de calcul pour détecter les modifications, divisions, fusions, ajouts et suppressions. Il calcule des métriques de précision (WER, CER, SER) et génère un rapport d\u2019assurance qualité.' },
      { heading: '3. Forfaits et tarifs', content: 'Le Module est proposé selon les forfaits suivants :' },
      { heading: '', content: 'La période d\u2019essai commence dès la première utilisation du Module et dure 7 jours calendaires. Après expiration, vous passez automatiquement au forfait Gratuit sauf si vous passez à Pro. Les prix sont en dollars américains et peuvent être modifiés avec préavis.' },
      { heading: '4. Licence', content: 'Vous bénéficiez d\u2019une licence non exclusive, non transférable et révocable pour utiliser le Module à des fins personnelles ou commerciales dans Google Sheets™, selon les limites de votre forfait actuel.' },
      { heading: '5. Paiement et abonnements', content: '<ul><li>Tous les paiements sont traités par <strong>Dodo Payments</strong>, qui agit en tant que Marchand de Référence.</li><li>Les abonnements se renouvellent automatiquement sauf annulation avant la date de renouvellement.</li><li>Les licences à vie sont un achat unique accordant un accès perpétuel.</li><li>Vous pouvez annuler à tout moment via le portail client Dodo Payments.</li></ul>' },
      { heading: '6. Politique de remboursement', content: '<ul><li><strong>Essai gratuit de 7 jours :</strong> Évaluez le Module complet avant d\u2019acheter.</li><li><strong>Abonnements :</strong> Remboursement intégral dans les 14 jours suivant l\u2019achat ou le renouvellement. Contactez amirrak8@gmail.com.</li><li><strong>Licences à vie :</strong> Remboursement dans les 14 jours si le Module ne fonctionne pas comme décrit.</li><li>Les remboursements sont traités par Dodo Payments sous 5 à 10 jours ouvrables.</li></ul>' },
      { heading: '7. Vos données', content: 'Le Module traite les données entièrement dans Google Sheets™. Aucun contenu de feuille de calcul n\u2019est jamais transmis à l\u2019extérieur. Consultez notre Politique de confidentialité pour les détails complets.' },
      { heading: '8. Précision et fiabilité', content: 'Le Module utilise des algorithmes de similarité textuelle et de correspondance heuristique. Les résultats sont fournis \u00ab en l\u2019état \u00bb. Nous vous recommandons de vérifier le rapport généré et d\u2019exercer votre jugement professionnel.' },
      { heading: '9. Exclusion de garanties', content: 'LE MODULE EST FOURNI \u00ab EN L\u2019ÉTAT \u00bb ET \u00ab SELON DISPONIBILITÉ \u00bb SANS GARANTIE D\u2019AUCUNE SORTE, EXPRESSE OU IMPLICITE.' },
      { heading: '10. Limitation de responsabilité', content: 'DANS TOUTE LA MESURE PERMISE PAR LA LOI APPLICABLE, LE DÉVELOPPEUR NE SAURAIT ÊTRE TENU RESPONSABLE DE TOUT DOMMAGE INDIRECT, ACCESSOIRE, SPÉCIAL, CONSÉCUTIF OU PUNITIF.' },
      { heading: '11. Modifications du Module', content: 'Le développeur se réserve le droit de modifier, suspendre ou interrompre le Module à tout moment. Les abonnés payants actifs seront informés à l\u2019avance de tout changement substantiel.' },
      { heading: '12. Modifications de ces conditions', content: 'Ces Conditions peuvent être mises à jour périodiquement. L\u2019utilisation continue après les modifications vaut acceptation.' },
      { heading: '13. Résiliation', content: 'Vous pouvez cesser d\u2019utiliser le Module à tout moment en le désinstallant et en annulant tout abonnement. Le développeur peut résilier l\u2019accès en cas de violation de ces Conditions.' },
      { heading: '14. Droit applicable', content: 'Ces Conditions sont régies et interprétées conformément au droit applicable.' },
      { heading: '15. Contact', content: '<p>Pour toute question, veuillez contacter :</p><p><strong>Mohamed Yaakoubi</strong><br/>E-mail : <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a><br/>LinkedIn : <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a></p>' },
    ],
    backTo: 'Retour à SheetDiff™',
  },
}

// ────────────────────── ARABIC ──────────────────────
const ar: SheetDiffI18n = {
  main: {
    badge: 'إضافة Google Sheets™ من محمد يعقوبي',
    heroTitle: 'SheetDiff™',
    heroHighlight: 'مقارنة وفحص وضمان الجودة',
    heroDesc: 'SheetDiff™ هي إضافة Google Sheets™ مستقلة عن البنية، مصممة لمقارنة جداول البيانات وضمان الجودة. تقارن نسختين من أي بيانات منظمة — النسخة الأصلية والنسخة المعدّلة — وتنتج تقرير فروقات مفصّلاً على مستوى الصفوف.',
    installBtn: 'تثبيت الإضافة',
    viewPricing: 'عرض الأسعار',
    modesTitle: 'أوضاع المقارنة',
    structuralTitle: 'الفرق الهيكلي',
    structuralDesc: 'مقارنة على مستوى الصفوف بخوارزميات متقدمة لاكتشاف التقسيمات والدمج عبر بياناتك.',
    cellTitle: 'خلية بخلية',
    cellDesc: 'مقارنة دقيقة محاذية للأعمدة لتحديد التغييرات الدقيقة في الأحرف أو التنسيق.',
    dupTitle: 'كاشف التكرارات',
    dupDesc: 'افحص مجموعات البيانات الضخمة فورياً لاكتشاف الصفوف المكررة وتمييزها داخل ورقة واحدة.',
    howTitle: 'كيف تعمل',
    steps: [
      'افتح أي جدول بيانات في Google Sheets™',
      'تكتشف الإضافة تلقائياً أدوار الأعمدة (المتحدث، الطوابع الزمنية، النص، الأحداث الصوتية)',
      'احفظ لقطة من البيانات الأصلية',
      'أجرِ التعديلات أو استورد النسخة المعدّلة',
      'شغّل المقارنة — كل صف يُصنَّف ويُلوَّن',
    ],
    diffTitle: 'فئات الفروقات',
    diffCats: [
      { label: 'دون تغيير — صفوف متطابقة بين النسختين', color: 'gray' },
      { label: 'معدّل — صفوف بها تغييرات في النص أو التوقيت', color: 'yellow' },
      { label: 'مقسّم — صف أصلي واحد قُسّم إلى عدة صفوف', color: 'purple' },
      { label: 'مدمج — عدة صفوف أصلية دُمجت في صف واحد', color: 'indigo' },
      { label: 'مضاف — صفوف جديدة في النسخة المعدّلة', color: 'green' },
      { label: 'محذوف — صفوف أُزيلت من النسخة الأصلية', color: 'red' },
    ],
    featuresTitle: 'الميزات الرئيسية',
    features: [
      'مستقل عن البنية — يعمل مع أي تخطيط أعمدة',
      'اكتشاف تلقائي لأدوار الأعمدة عبر مطابقة مرنة للعناوين',
      'ورقة عرض الفروقات بالألوان',
      'تقرير ضمان الجودة مع عدّادات لكل فئة ومقاييس WER/CER/SER',
      'حد تشابه قابل للتعديل',
      'تطبيع متعدد الخطوط (العربية، السيريلية، CJK، التايلندية، الديفاناغري، البنغالية)',
      'بيانات وصفية اختيارية للمراجع والناسخ',
      'شريط جانبي للإعدادات للتحكم الكامل',
    ],
    pricingTitle: 'الأسعار',
    pricingSub: 'اطّلع على التفاصيل الكاملة في صفحة الأسعار.',
    freeTier: 'مجاني',
    proMonthly: 'Pro شهري',
    proLifetime: 'Pro مدى الحياة',
    perMonth: '/شهرياً',
    once: 'لمرة واحدة',
    comparePlans: 'مقارنة الباقات',
    privacyTitle: 'الخصوصية والأمان',
    privacyText: 'تبقى بيانات جداولك في Google Sheets™ — ولا تُرسَل أبداً إلى خوادم خارجية. البيانات الوحيدة المُرسلة إلى خادم التراخيص هي بريدك الإلكتروني في Google، لغرض التحقق من الترخيص وتتبع الاستخدام فقط. المدفوعات تُعالَج عبر Dodo Payments (التاجر المعتمد). لا يغادر أي محتوى خلايا أو بيانات صفوف أو ملفات بنية Google التحتية.',
    privacyLink: 'سياسة الخصوصية',
    termsLink: 'شروط الخدمة',
    getInTouch: 'تواصل معنا',
    linkedinProfile: 'حساب LinkedIn',
    trademark: 'Google Sheets™ و Google Drive™ هما علامتان تجاريتان لشركة Google LLC.',
  },
  pricing: {
    title: 'أسعار SheetDiff™',
    subtitle: 'ابدأ بتجربة مجانية لمدة 7 أيام — وصول كامل بدون بطاقة ائتمان. بعد التجربة، استمر مجاناً أو ترقَّ إلى Pro للوصول غير المحدود.',
    monthlyBilling: 'فوترة شهرية',
    annualBilling: 'فوترة سنوية',
    save50: 'وفّر 50%',
    freeTitle: 'مجاني',
    freeAfterTrial: 'بعد التجربة المجانية',
    forever: '/دائماً',
    freeFeatures: [
      'أوضاع المقارنة الثلاثة',
      'حتى 50 صفاً لكل مقارنة',
      '10 مقارنات شهرياً',
    ],
    includedAfterTrial: 'مُتضمَّن بعد التجربة',
    proTitle: 'Pro',
    proSub: 'شهري أو سنوي',
    mostPopular: 'الأكثر شعبية',
    perYear: '/سنوياً',
    perMonth: '/شهرياً',
    savePct: '(وفّر 50%)',
    proFeatures: [
      'أوضاع المقارنة الثلاثة',
      { bold: 'غير محدود', rest: ' — صفوف لكل مقارنة' },
      { bold: 'غير محدود', rest: ' — مقارنات شهرياً' },
      'عرض الفروقات بالألوان',
      'تقرير QA مع مقاييس WER/CER/SER',
      'دعم بريد إلكتروني ذو أولوية',
    ],
    installAddon: 'تثبيت الإضافة',
    lifetimeTitle: 'Pro مدى الحياة',
    lifetimeSub: 'شراء لمرة واحدة',
    lifetimePrice: '49.99$',
    payOnce: 'ادفع مرة واحدة، استخدم للأبد',
    lifetimeFeatures: [
      'كل ما في باقة Pro',
      'ثبّت السعر الحالي — بلا تجديد',
      'بلا مدفوعات متكررة',
      'دعم بريد إلكتروني ذو أولوية',
    ],
    faqTitle: 'الأسئلة الشائعة',
    faqs: [
      { q: 'كيف تعمل التجربة المجانية لمدة 7 أيام؟', a: 'عند تثبيت SheetDiff™ لأول مرة، تحصل على 7 أيام من الوصول الكامل غير المحدود — بدون بطاقة ائتمان ولا تسجيل. بعد التجربة، يمكنك الاستمرار مجاناً (مع قيود) أو الترقية إلى Pro.' },
      { q: 'ماذا يحدث عند انتهاء التجربة؟', a: 'تنتقل تلقائياً إلى الباقة المجانية: 50 صفاً لكل مقارنة و10 مقارنات شهرياً. جميع الميزات تبقى متاحة — فقط عدد الصفوف وتكرار المقارنات يُحدَّدان.' },
      { q: 'ما وسائل الدفع المقبولة؟', a: 'تُعالَج المدفوعات عبر Dodo Payments، وتشمل بطاقات الائتمان/الخصم وPayPal ووسائل الدفع المحلية حسب منطقتك. يتولى Dodo Payments الامتثال الضريبي تلقائياً.' },
      { q: 'هل يمكنني الإلغاء في أي وقت؟', a: 'نعم. يمكن إلغاء الاشتراكات الشهرية والسنوية في أي وقت عبر بوابة عملاء Dodo Payments. تحتفظ بالوصول حتى نهاية فترة الفوترة الحالية.' },
      { q: 'ما سياسة الاسترداد؟', a: 'نقدم استرداداً خلال 14 يوماً من الشراء. إذا لم يلبِّ SheetDiff™ توقعاتك، تواصل معنا على amirrak8@gmail.com وسنعالج استردادك. راجع شروط الخدمة للتفاصيل الكاملة.' },
      { q: 'هل بياناتي آمنة؟', a: 'نعم. بيانات جداولك لا تغادر Google Sheets™ أبداً. البيانات الوحيدة المُرسلة إلى خادمنا هي بريدك الإلكتروني للتحقق من الترخيص. راجع سياسة الخصوصية للتفاصيل الكاملة.' },
    ],
    backToOverview: 'العودة إلى SheetDiff™',
    support: 'الدعم',
  },
  privacy: {
    title: 'سياسة الخصوصية',
    productLine: 'SheetDiff™ \u00b7 إضافة Google Sheets™',
    lastUpdated: 'آخر تحديث: 19 مارس 2026',
    sections: [
      { heading: '1. نظرة عامة', content: 'SheetDiff™ (\u00ab الإضافة \u00bb) هي إضافة Google Sheets™ طوّرها محمد يعقوبي لمقارنة نسخ جداول البيانات وإنتاج تقارير ضمان الجودة. توضح سياسة الخصوصية هذه كيف تجمع الإضافة بياناتك وتستخدمها وتحميها.' },
      { heading: '2. البيانات التي تصل إليها الإضافة', content: '<p>تطلب الإضافة أذونات OAuth التالية من Google:</p><ul><li><strong>userinfo.email</strong> — قراءة عنوان بريدك الإلكتروني في Google. يُستخدم فقط لتحديد هويتك لأغراض التحقق من الترخيص وتتبع الاستخدام.</li><li><strong>spreadsheets.currentonly</strong> — صلاحية القراءة والكتابة في جدول البيانات المثبّتة فيه الإضافة. ضروري لقراءة البيانات وإنشاء اللقطات وتوليد عارض الفروقات وإنتاج تقرير الجودة.</li><li><strong>drive.file</strong> — الوصول إلى ملفات Google Drive™ التي تختارها صراحةً عبر أداة اختيار الملفات المدمجة. يُستخدم فقط لميزة الاستيراد بين الجداول.</li><li><strong>script.container.ui</strong> — إذن لعرض شريط الإعدادات الجانبي ومربعات الحوار والقوائم المخصصة.</li><li><strong>script.external_request</strong> — إذن لإجراء طلبات شبكة إلى خادم التراخيص وإلى Google Analytics.</li></ul>' },
      { heading: '3. بيانات لا تصل إليها الإضافة', content: '<ul><li>الإضافة <strong>لا</strong> تتصفح Google Drive™ الخاص بك.</li><li>الإضافة <strong>لا</strong> تصل إلى Gmail أو التقويم أو جهات الاتصال أو أي خدمة Google أخرى.</li><li>الإضافة <strong>لا</strong> تقرأ أو تخزّن أو ترسل محتوى جداول بياناتك إلى أي خادم خارجي.</li><li>الإضافة <strong>لا</strong> تصل إلى كلمة مرور حسابك أو بيانات اعتمادك في Google.</li></ul>' },
      { heading: '4. تخزين بيانات جداول البيانات', content: 'جميع البيانات التي تعالجها الإضافة تبقى في مستند Google Sheets™ الخاص بك. نتائج المقارنة واللقطات وتقارير الفروقات والإعدادات تُخزَّن في خصائص المستند (DocumentProperties) عبر خدمة Properties في Google Apps Script.' },
      { heading: '5. خادم التراخيص والبيانات المُجمّعة', content: '<p>لإدارة التراخيص وفترات التجربة وحدود الاستخدام، تتواصل الإضافة مع خادم تحقق من التراخيص مستضاف على Google Firebase. البيانات التالية تُرسَل:</p><ul><li><strong>عنوان البريد الإلكتروني في Google</strong> — يُستخدم كمعرّف فريد لسجلات الترخيص وتتبع الاستخدام.</li><li><strong>حالة الترخيص</strong> — تجربة مجانية أو باقة مجانية أو باقة مدفوعة.</li><li><strong>عدّاد الاستخدام</strong> — عدد المقارنات شهرياً. لا يُرسَل أي محتوى من جداول البيانات.</li><li><strong>بيانات وصفية للدفع (عبر webhook من Dodo Payments)</strong> — البريد الإلكتروني للفوترة ومعرّف العميل ومعرّف الاشتراك وحالته وتواريخ الفوترة. لا تتضمن تفاصيل البطاقة المصرفية.</li></ul><p><strong>لا يُرسَل أو يُخزَّن أبداً أي محتوى خلايا أو قيم بيانات أو محتوى ملفات على خادم التراخيص.</strong></p>' },
      { heading: '6. معالجة المدفوعات', content: '<p>تُعالَج الاشتراكات المدفوعة عبر <strong>Dodo Payments (Dodo Payments Inc.)</strong> بصفتها التاجر المعتمد.</p><ul><li>تُجمع معلومات الدفع وتُعالَج بالكامل من قِبل Dodo Payments. لا يطّلع المطوّر على تفاصيل الدفع مطلقاً.</li><li>يرسل Dodo Payments إشعار webhook يؤكد عملية الشراء.</li><li>سياسة خصوصية Dodo Payments: <a href="https://dodopayments.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">dodopayments.com/legal/privacy-policy</a>.</li></ul>' },
      { heading: '7. أمان البيانات وحمايتها', content: '<ul><li>جميع البيانات محمية <strong>بتشفير Google</strong> — أثناء النقل (TLS/HTTPS) وأثناء التخزين (AES-256).</li><li>الاتصال بخادم التراخيص يستخدم تشفير HTTPS/TLS.</li><li>خادم التراخيص (Firebase) محمي ببنية Google Cloud الأمنية.</li><li>توقيعات webhook من Dodo Payments تُتحقّق تشفيرياً.</li><li>الإضافة لا تخزّن رموز مصادقة أو بيانات اعتماد.</li><li>تفضيلات المستخدم تُخزَّن في DocumentProperties المقتصرة على جدول البيانات الفردي.</li></ul>' },
      { heading: '8. التحليلات', content: '<p>تجمع الإضافة تحليلات استخدام مجهولة الهوية عبر Google Analytics 4 (GA4):</p><ul><li><strong>أحداث من جانب الخادم</strong> — يُجزّأ بريدك الإلكتروني (SHA-256) قبل استخدامه كمعرّف عميل.</li><li><strong>أحداث من جانب العميل</strong> — تتضمن مربعات الحوار والأشرطة الجانبية مقتطف GA4 gtag.js.</li></ul><p>بيانات التحليلات <strong>لا تتضمن</strong> بريدك الإلكتروني أو محتوى جداول البيانات أو عناوين IP.</p>' },
      { heading: '9. عدم بيع البيانات أو نقلها', content: 'الإضافة لا تبيع أو تتاجر أو تؤجّر أو تنقل بياناتك إلى أي طرف ثالث لأغراض إعلانية أو سمسرة بيانات أو أي غرض غير متعلق بالوظائف الأساسية للإضافة.' },
      { heading: '10. عدم استخدام البيانات لتدريب الذكاء الاصطناعي', content: 'بياناتك <strong>لا تُستخدَم أبداً</strong> لتدريب نماذج الذكاء الاصطناعي أو التعلم الآلي. خوارزميات المقارنة في الإضافة قائمة على القواعد ولا تتضمن أي شكل من أشكال تدريب النماذج.' },
      { heading: '11. الاحتفاظ بالبيانات وحذفها', content: '<ul><li><strong>بيانات جداول البيانات</strong> — تبقى في مستند Google Sheets™ الخاص بك وتُحذف عند حذف الملف أو إلغاء تثبيت الإضافة.</li><li><strong>سجلات التراخيص</strong> — تُخزَّن على خادم Firebase وتُحذف خلال 30 يوماً من طلب الحذف.</li><li>يمكنك طلب حذف جميع بياناتك في أي وقت عبر التواصل مع المطوّر.</li></ul>' },
      { heading: '12. خصوصية الأطفال', content: 'الإضافة غير موجّهة للأطفال دون 13 عاماً ولا تجمع عن علم أي معلومات منهم.' },
      { heading: '13. تعديلات على هذه السياسة', content: 'قد تُحدَّث سياسة الخصوصية هذه من وقت لآخر. ستنعكس التعديلات على هذه الصفحة بتاريخ \u00ab آخر تحديث \u00bb محدَّث.' },
      { heading: '14. التواصل', content: '<p>لأي استفسار، يُرجى التواصل مع:</p><p><strong>محمد يعقوبي</strong><br/>البريد الإلكتروني: <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a><br/>LinkedIn: <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a></p>' },
    ],
    backTo: 'العودة إلى SheetDiff™',
  },
  terms: {
    title: 'شروط الخدمة',
    productLine: 'SheetDiff™ \u00b7 إضافة Google Sheets™',
    lastUpdated: 'آخر تحديث: 19 مارس 2026',
    pricingTable: {
      feature: 'الميزة', trial: 'التجربة (7 أيام)', free: 'الباقة المجانية', pro: 'SheetDiff™ Pro',
      rows: [
        { feature: 'حد الصفوف لكل مقارنة', trial: 'غير محدود', free: '50 صفاً', pro: 'غير محدود' },
        { feature: 'المقارنات شهرياً', trial: 'غير محدود', free: '10', pro: 'غير محدود' },
        { feature: 'جميع أوضاع المقارنة', trial: 'نعم', free: 'نعم', pro: 'نعم' },
        { feature: 'السعر', trial: 'مجاني', free: 'مجاني', pro: '4.99$/شهرياً \u00b7 29.99$/سنوياً \u00b7 49.99$ مدى الحياة' },
      ],
    },
    sections: [
      { heading: '1. قبول الشروط', content: 'بتثبيت أو استخدام إضافة SheetDiff™ (\u00ab الإضافة \u00bb)، فإنك توافق على شروط الخدمة هذه. إذا لم توافق، يُرجى عدم تثبيت الإضافة أو استخدامها.' },
      { heading: '2. وصف الإضافة', content: 'الإضافة هي أداة Google Sheets™ تقارن نسختين من جدول بيانات لاكتشاف التغييرات مثل التعديلات والتقسيمات والدمج والإضافات والحذف. تحسب مقاييس الدقة (WER, CER, SER) وتولّد تقرير ضمان الجودة.' },
      { heading: '3. الباقات والأسعار', content: 'تُقدَّم الإضافة ضمن الباقات التالية:' },
      { heading: '', content: 'تبدأ فترة التجربة عند أول استخدام للإضافة وتستمر 7 أيام تقويمية. بعد انتهائها، تنتقل تلقائياً إلى الباقة المجانية ما لم تترقَّ. الأسعار بالدولار الأمريكي وقد تُعدَّل بإشعار مسبق.' },
      { heading: '4. الترخيص', content: 'يُمنح لك ترخيص غير حصري وغير قابل للتحويل وقابل للإلغاء لاستخدام الإضافة لأغراض شخصية أو تجارية ضمن Google Sheets™، وفقاً لحدود استخدام باقتك الحالية.' },
      { heading: '5. الدفع والاشتراكات', content: '<ul><li>تُعالَج جميع المدفوعات عبر <strong>Dodo Payments</strong> بصفتها التاجر المعتمد.</li><li>تُجدَّد الاشتراكات تلقائياً ما لم تُلغَ قبل تاريخ التجديد.</li><li>تراخيص مدى الحياة هي شراء لمرة واحدة يمنح وصولاً دائماً.</li><li>يمكنك الإلغاء في أي وقت عبر بوابة عملاء Dodo Payments.</li></ul>' },
      { heading: '6. سياسة الاسترداد', content: '<ul><li><strong>تجربة مجانية 7 أيام:</strong> قيّم الإضافة الكاملة قبل الشراء.</li><li><strong>الاشتراكات:</strong> استرداد كامل خلال 14 يوماً من الشراء أو التجديد. تواصل عبر amirrak8@gmail.com.</li><li><strong>تراخيص مدى الحياة:</strong> استرداد خلال 14 يوماً إذا لم تعمل الإضافة كما هو موصوف.</li><li>تُعالَج المبالغ المُستردة عبر Dodo Payments خلال 5-10 أيام عمل.</li></ul>' },
      { heading: '7. بياناتك', content: 'تعالج الإضافة البيانات بالكامل داخل Google Sheets™. لا يُرسَل أي محتوى من جداول البيانات خارجياً. راجع سياسة الخصوصية للتفاصيل الكاملة.' },
      { heading: '8. الدقة والموثوقية', content: 'تستخدم الإضافة خوارزميات تشابه نصي ومطابقة استدلالية. تُقدَّم النتائج \u00ab كما هي \u00bb. نوصيك بمراجعة التقرير المُولَّد واستخدام حكمك المهني.' },
      { heading: '9. إخلاء المسؤولية عن الضمانات', content: 'تُقدَّم الإضافة \u00ab كما هي \u00bb و\u00ab حسب التوفر \u00bb دون أي ضمانات من أي نوع، صريحة أو ضمنية.' },
      { heading: '10. تحديد المسؤولية', content: 'إلى أقصى حد يسمح به القانون المعمول به، لا يتحمل المطوّر المسؤولية عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية.' },
      { heading: '11. تعديلات على الإضافة', content: 'يحتفظ المطوّر بحق تعديل الإضافة أو تعليقها أو إيقافها في أي وقت. سيُبلَّغ المشتركون المدفوعون مسبقاً بأي تغييرات جوهرية.' },
      { heading: '12. تعديلات على هذه الشروط', content: 'قد تُحدَّث هذه الشروط من وقت لآخر. يُعدّ الاستمرار في الاستخدام بعد التعديلات قبولاً لها.' },
      { heading: '13. الإنهاء', content: 'يمكنك التوقف عن استخدام الإضافة في أي وقت بإلغاء تثبيتها وإلغاء أي اشتراك. يحق للمطوّر إنهاء الوصول في حال انتهاك هذه الشروط.' },
      { heading: '14. القانون الحاكم', content: 'تخضع هذه الشروط وتُفسَّر وفقاً للقوانين المعمول بها.' },
      { heading: '15. التواصل', content: '<p>لأي استفسار، يُرجى التواصل مع:</p><p><strong>محمد يعقوبي</strong><br/>البريد الإلكتروني: <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a><br/>LinkedIn: <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a></p>' },
    ],
    backTo: 'العودة إلى SheetDiff™',
  },
}

const translations: Record<string, SheetDiffI18n> = { en, fr, ar }

export function getSheetDiffI18n(locale: string): SheetDiffI18n {
  return translations[locale] || en
}
