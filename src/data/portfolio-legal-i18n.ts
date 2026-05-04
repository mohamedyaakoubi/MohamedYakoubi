// Portfolio-wide legal pages i18n — Privacy Policy & Terms of Service
// Used by PortfolioPrivacyClient.tsx and PortfolioTermsClient.tsx

export type LegalSection = { heading: string; content: string }

export type PortfolioLegalI18n = {
  privacy: {
    title: string
    subtitle: string
    lastUpdated: string
    sections: LegalSection[]
    backTo: string
  }
  terms: {
    title: string
    subtitle: string
    lastUpdated: string
    sections: LegalSection[]
    backTo: string
  }
}

// ─────────────────────────── ENGLISH ───────────────────────────
const en: PortfolioLegalI18n = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'mohamedyaakoubi.com',
    lastUpdated: 'Last updated: May 4, 2025',
    backTo: 'Back to Home',
    sections: [
      {
        heading: '1. Introduction',
        content: `<p>Welcome to <strong>mohamedyaakoubi.com</strong> (the "Website"), a personal portfolio operated by Mohamed Yaakoubi ("I", "me", or "my"), based in Sfax, Tunisia. This Privacy Policy describes how I collect, use, and protect information when you visit this Website.</p>
<p>By using this Website, you agree to the collection and use of information as described in this policy. If you disagree with any part of it, please discontinue your use of the Website.</p>`,
      },
      {
        heading: '2. Information I Collect',
        content: `<p>I collect the following categories of information:</p>
<ul>
  <li><strong>Contact form submissions</strong> — When you use the contact form, I receive your name, email address, and message. This information is used solely to respond to your enquiry.</li>
  <li><strong>AI Chat interactions</strong> — Messages sent to the portfolio AI chat assistant are processed by Mistral AI to generate responses. Chat content is not stored on my servers beyond the duration of your session.</li>
  <li><strong>Usage data</strong> — Analytics providers (see Section 4) automatically collect data such as your IP address (anonymised), browser type, operating system, referring URLs, pages visited, and time spent on the Website.</li>
</ul>`,
      },
      {
        heading: '3. Cookies',
        content: `<p>This Website uses cookies and similar tracking technologies to improve your experience and to analyse Website traffic.</p>
<ul>
  <li><strong>Essential cookies</strong> — Required for the Website to function correctly (e.g., language preferences, theme settings).</li>
  <li><strong>Analytics cookies</strong> — Used by Google Analytics 4 and Vercel Analytics to collect anonymous usage statistics. IP addresses are anonymised before processing.</li>
  <li><strong>Advertising cookies</strong> — This Website may display ads served by Google AdSense. See Section 4 for full details about advertising cookies.</li>
</ul>
<p>You can control and delete cookies through your browser settings at any time.</p>`,
      },
      {
        heading: '4. Google AdSense & Advertising Cookies',
        content: `<p>This Website uses <strong>Google AdSense</strong> to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to this Website and other websites across the Internet.</p>
<ul>
  <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this Website or other websites.</li>
  <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.</li>
  <li>You may opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
  <li>You may also opt out of third-party vendor cookies for personalised advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</li>
</ul>
<p>For more information on how Google uses data when you use sites or apps that use its services, visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google's Privacy &amp; Terms</a>.</p>`,
      },
      {
        heading: '5. Google Analytics & Vercel Analytics',
        content: `<p>This Website uses <strong>Google Analytics 4</strong> (property ID: G-0NVCDPTBCZ) and <strong>Vercel Analytics</strong> to understand how visitors interact with the Website. These services collect anonymised usage data including page views, session duration, and general geographic location (country level). IP addresses are anonymised before storage. No personally identifiable information is sent to these analytics providers.</p>
<p>You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>`,
      },
      {
        heading: '6. AI Chat Feature',
        content: `<p>The portfolio AI chat assistant is powered by <strong>Mistral AI</strong>. When you send a message, it is transmitted to the Mistral AI API to generate a response. Your messages are processed according to <a href="https://mistral.ai/terms/" target="_blank" rel="noopener noreferrer">Mistral AI's Terms of Service</a> and privacy practices. I do not store chat conversation history on my own servers.</p>`,
      },
      {
        heading: '7. Third-Party Services',
        content: `<p>This Website integrates with the following third-party services, each governed by their own privacy policies:</p>
<ul>
  <li><strong>Google AdSense</strong> — Advertising: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
  <li><strong>Google Analytics</strong> — Analytics: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
  <li><strong>Vercel Analytics</strong> — Hosting &amp; analytics: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a></li>
  <li><strong>Mistral AI</strong> — AI chat: <a href="https://mistral.ai/terms/" target="_blank" rel="noopener noreferrer">Mistral AI Terms</a></li>
</ul>
<p>I am not responsible for the privacy practices of these third-party services.</p>`,
      },
      {
        heading: '8. How I Use Your Information',
        content: `<ul>
  <li>To respond to enquiries submitted through the contact form</li>
  <li>To understand and improve Website performance and user experience</li>
  <li>To display relevant advertisements via Google AdSense</li>
  <li>To operate the portfolio AI chat assistant</li>
  <li>To comply with applicable legal obligations</li>
</ul>
<p>I do not sell, trade, or rent your personal information to third parties.</p>`,
      },
      {
        heading: '9. Data Retention',
        content: `<p>Contact form submissions are retained only as long as necessary to respond to your enquiry. Analytics data is retained according to the respective providers' standard retention policies (26 months for Google Analytics; as defined by Vercel for Vercel Analytics). Chat data is not retained beyond the active session.</p>`,
      },
      {
        heading: '10. Your Rights (GDPR / CCPA)',
        content: `<p>Depending on your location, you may have the following rights regarding your personal data:</p>
<ul>
  <li><strong>Right to access</strong> — Request a copy of the personal data I hold about you.</li>
  <li><strong>Right to rectification</strong> — Request correction of inaccurate data.</li>
  <li><strong>Right to erasure</strong> — Request deletion of your personal data.</li>
  <li><strong>Right to object</strong> — Object to the processing of your data for direct marketing or analytics purposes.</li>
  <li><strong>Right to opt out of advertising</strong> — As described in Section 4.</li>
</ul>
<p>To exercise any of these rights, please contact me at <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a>.</p>`,
      },
      {
        heading: '11. Children\'s Privacy',
        content: `<p>This Website is not directed to children under the age of 13. I do not knowingly collect personal information from children. If you believe a child has submitted personal information, please contact me immediately at <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a> and I will delete it promptly.</p>`,
      },
      {
        heading: '12. Changes to This Policy',
        content: `<p>I may update this Privacy Policy from time to time. When I do, I will update the "Last updated" date at the top of this page. Continued use of the Website after any changes constitutes your acceptance of the revised policy.</p>`,
      },
      {
        heading: '13. Contact',
        content: `<p>If you have any questions or concerns about this Privacy Policy, please contact me:</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a></li>
  <li><strong>Location:</strong> Sfax, Tunisia</li>
  <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a></li>
</ul>`,
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'mohamedyaakoubi.com',
    lastUpdated: 'Last updated: May 4, 2025',
    backTo: 'Back to Home',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        content: `<p>By accessing and using <strong>mohamedyaakoubi.com</strong> (the "Website"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Website.</p>
<p>These Terms apply to all visitors, users, and others who access or use the Website.</p>`,
      },
      {
        heading: '2. Use of the Website',
        content: `<p>You agree to use this Website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
<ul>
  <li>Use the Website in any way that violates applicable local, national, or international laws or regulations.</li>
  <li>Transmit any unsolicited or unauthorised advertising or promotional material.</li>
  <li>Attempt to gain unauthorised access to any part of the Website or its related systems.</li>
  <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Website.</li>
  <li>Use automated tools to scrape, crawl, or systematically extract data from the Website without prior written consent.</li>
</ul>`,
      },
      {
        heading: '3. Intellectual Property',
        content: `<p>The source code of this Website is open source and publicly available on <a href="https://github.com/mohamedyaakoubi/MohamedYakoubi" target="_blank" rel="noopener noreferrer">GitHub</a>. You are welcome to study and learn from the codebase in accordance with its licence.</p>
<p>However, all original <strong>content</strong> on this Website — including but not limited to written text, biographical information, project descriptions, blog posts, graphics, and logos — remains the intellectual property of <strong>Mohamed Yaakoubi</strong> and is protected by applicable copyright laws. You may not reproduce, distribute, or create derivative works from this content without prior written permission, except for personal, non-commercial use.</p>`,
      },
      {
        heading: '4. AI Chat Feature',
        content: `<p>The portfolio AI chat assistant is provided for informational purposes only. Responses are generated by an AI model and may not always be accurate, complete, or up to date. I am not liable for any decisions made based on information provided by the AI chat assistant. Do not submit sensitive personal data through the chat interface.</p>`,
      },
      {
        heading: '5. Advertising',
        content: `<p>This Website may display advertisements served by <strong>Google AdSense</strong>. Advertisements are provided by Google and its advertising partners. I am not responsible for the content of third-party advertisements. Clicking on advertisements may take you to third-party websites that are not under my control.</p>`,
      },
      {
        heading: '6. Third-Party Links',
        content: `<p>This Website may contain links to third-party websites or services that are not owned or controlled by me. I have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services. I encourage you to review the terms and privacy policies of any third-party sites you visit.</p>`,
      },
      {
        heading: '7. Disclaimer of Warranties',
        content: `<p>This Website is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
<p>I do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>`,
      },
      {
        heading: '8. Limitation of Liability',
        content: `<p>To the fullest extent permitted by applicable law, I shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of or inability to use this Website, even if I have been advised of the possibility of such damages.</p>`,
      },
      {
        heading: '9. Governing Law',
        content: `<p>These Terms shall be governed by and construed in accordance with the laws of the <strong>Republic of Tunisia</strong>, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Sfax, Tunisia.</p>`,
      },
      {
        heading: '10. Changes to These Terms',
        content: `<p>I reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Website, as indicated by the "Last updated" date. Your continued use of the Website after any changes constitutes your acceptance of the revised Terms.</p>`,
      },
      {
        heading: '11. Contact',
        content: `<p>If you have any questions about these Terms of Service, please contact me:</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a></li>
  <li><strong>Location:</strong> Sfax, Tunisia</li>
  <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a></li>
</ul>`,
      },
    ],
  },
}

// ─────────────────────────── FRENCH ───────────────────────────
const fr: PortfolioLegalI18n = {
  privacy: {
    title: 'Politique de Confidentialité',
    subtitle: 'mohamedyaakoubi.com',
    lastUpdated: 'Dernière mise à jour : 4 mai 2025',
    backTo: "Retour à l'accueil",
    sections: [
      {
        heading: '1. Introduction',
        content: `<p>Bienvenue sur <strong>mohamedyaakoubi.com</strong> (le « Site »), un portfolio personnel exploité par Mohamed Yaakoubi (« je », « moi » ou « mon »), basé à Sfax, Tunisie. Cette Politique de Confidentialité décrit comment je collecte, utilise et protège les informations lorsque vous visitez ce Site.</p>
<p>En utilisant ce Site, vous acceptez la collecte et l'utilisation des informations décrites dans cette politique. Si vous n'êtes pas d'accord, veuillez cesser d'utiliser le Site.</p>`,
      },
      {
        heading: '2. Informations collectées',
        content: `<p>Je collecte les catégories d'informations suivantes :</p>
<ul>
  <li><strong>Formulaire de contact</strong> — Votre nom, adresse e-mail et message. Ces informations sont utilisées uniquement pour répondre à votre demande.</li>
  <li><strong>Interactions avec le chat IA</strong> — Les messages envoyés au chatbot du portfolio sont traités par Mistral AI pour générer des réponses. Le contenu du chat n'est pas stocké sur mes serveurs au-delà de votre session.</li>
  <li><strong>Données d'utilisation</strong> — Les prestataires d'analyses collectent automatiquement des données telles que votre adresse IP (anonymisée), le type de navigateur, le système d'exploitation, les URL de référence, les pages visitées et le temps passé sur le Site.</li>
</ul>`,
      },
      {
        heading: '3. Cookies',
        content: `<p>Ce Site utilise des cookies et des technologies de suivi similaires pour améliorer votre expérience et analyser le trafic.</p>
<ul>
  <li><strong>Cookies essentiels</strong> — Nécessaires au bon fonctionnement du Site (par exemple, préférences de langue, paramètres de thème).</li>
  <li><strong>Cookies analytiques</strong> — Utilisés par Google Analytics 4 et Vercel Analytics pour collecter des statistiques d'utilisation anonymes. Les adresses IP sont anonymisées avant traitement.</li>
  <li><strong>Cookies publicitaires</strong> — Ce Site peut afficher des publicités servies par Google AdSense. Voir la Section 4 pour plus de détails.</li>
</ul>
<p>Vous pouvez contrôler et supprimer les cookies via les paramètres de votre navigateur à tout moment.</p>`,
      },
      {
        heading: '4. Google AdSense & Cookies publicitaires',
        content: `<p>Ce Site utilise <strong>Google AdSense</strong> pour afficher des publicités. Google AdSense utilise des cookies pour diffuser des annonces basées sur vos visites antérieures sur ce Site et d'autres sites Internet.</p>
<ul>
  <li>Des fournisseurs tiers, dont Google, utilisent des cookies pour diffuser des annonces basées sur les visites antérieures de l'utilisateur sur ce Site ou d'autres sites.</li>
  <li>L'utilisation de cookies publicitaires par Google lui permet, ainsi qu'à ses partenaires, de vous diffuser des annonces basées sur votre visite de ce site et/ou d'autres sites Internet.</li>
  <li>Vous pouvez désactiver la publicité personnalisée en visitant <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">les Paramètres des annonces Google</a>.</li>
  <li>Vous pouvez également désactiver les cookies tiers pour la publicité personnalisée en visitant <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</li>
</ul>
<p>Pour en savoir plus sur la façon dont Google utilise les données, visitez <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">la page Confidentialité &amp; Conditions de Google</a>.</p>`,
      },
      {
        heading: '5. Google Analytics & Vercel Analytics',
        content: `<p>Ce Site utilise <strong>Google Analytics 4</strong> (ID de propriété : G-0NVCDPTBCZ) et <strong>Vercel Analytics</strong> pour comprendre comment les visiteurs interagissent avec le Site. Ces services collectent des données d'utilisation anonymisées incluant les pages vues, la durée des sessions et la localisation géographique générale (niveau pays). Les adresses IP sont anonymisées avant stockage.</p>
<p>Vous pouvez désactiver Google Analytics en installant le <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">module complémentaire de navigateur de désactivation de Google Analytics</a>.</p>`,
      },
      {
        heading: '6. Fonctionnalité Chat IA',
        content: `<p>Le chatbot du portfolio est alimenté par <strong>Mistral AI</strong>. Lorsque vous envoyez un message, il est transmis à l'API Mistral AI pour générer une réponse. Vos messages sont traités conformément aux <a href="https://mistral.ai/terms/" target="_blank" rel="noopener noreferrer">Conditions d'utilisation de Mistral AI</a>. Je ne stocke pas l'historique des conversations sur mes propres serveurs.</p>`,
      },
      {
        heading: '7. Services tiers',
        content: `<p>Ce Site intègre les services tiers suivants, chacun régi par sa propre politique de confidentialité :</p>
<ul>
  <li><strong>Google AdSense</strong> — Publicité : <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Politique de confidentialité Google</a></li>
  <li><strong>Google Analytics</strong> — Analyses : <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Politique de confidentialité Google</a></li>
  <li><strong>Vercel Analytics</strong> — Hébergement &amp; analyses : <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Politique de confidentialité Vercel</a></li>
  <li><strong>Mistral AI</strong> — Chat IA : <a href="https://mistral.ai/terms/" target="_blank" rel="noopener noreferrer">Conditions Mistral AI</a></li>
</ul>`,
      },
      {
        heading: '8. Utilisation de vos informations',
        content: `<ul>
  <li>Répondre aux demandes soumises via le formulaire de contact</li>
  <li>Comprendre et améliorer les performances du Site</li>
  <li>Afficher des publicités pertinentes via Google AdSense</li>
  <li>Faire fonctionner le chat IA du portfolio</li>
  <li>Respecter les obligations légales applicables</li>
</ul>
<p>Je ne vends, n'échange ni ne loue vos informations personnelles à des tiers.</p>`,
      },
      {
        heading: '9. Conservation des données',
        content: `<p>Les soumissions du formulaire de contact sont conservées uniquement le temps nécessaire pour répondre à votre demande. Les données analytiques sont conservées selon les politiques de rétention standard des prestataires respectifs (26 mois pour Google Analytics). Les données de chat ne sont pas conservées au-delà de la session active.</p>`,
      },
      {
        heading: '10. Vos droits (RGPD / CCPA)',
        content: `<p>Selon votre localisation, vous pouvez disposer des droits suivants concernant vos données personnelles :</p>
<ul>
  <li><strong>Droit d'accès</strong> — Demander une copie des données personnelles que je détiens sur vous.</li>
  <li><strong>Droit de rectification</strong> — Demander la correction de données inexactes.</li>
  <li><strong>Droit à l'effacement</strong> — Demander la suppression de vos données personnelles.</li>
  <li><strong>Droit d'opposition</strong> — Vous opposer au traitement de vos données à des fins de marketing ou d'analyse.</li>
  <li><strong>Droit de désactivation publicitaire</strong> — Comme décrit à la Section 4.</li>
</ul>
<p>Pour exercer ces droits, contactez-moi à <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a>.</p>`,
      },
      {
        heading: '11. Protection des mineurs',
        content: `<p>Ce Site n'est pas destiné aux enfants de moins de 13 ans. Je ne collecte pas sciemment d'informations personnelles auprès d'enfants. Si vous pensez qu'un enfant a soumis des informations personnelles, contactez-moi immédiatement à <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a>.</p>`,
      },
      {
        heading: '12. Modifications de cette politique',
        content: `<p>Je me réserve le droit de modifier cette Politique de Confidentialité à tout moment. Les modifications seront effectives dès leur publication sur le Site, comme indiqué par la date de « Dernière mise à jour ». L'utilisation continue du Site après toute modification constitue votre acceptation de la politique révisée.</p>`,
      },
      {
        heading: '13. Contact',
        content: `<p>Pour toute question concernant cette Politique de Confidentialité, contactez-moi :</p>
<ul>
  <li><strong>E-mail :</strong> <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a></li>
  <li><strong>Lieu :</strong> Sfax, Tunisie</li>
  <li><strong>LinkedIn :</strong> <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a></li>
</ul>`,
      },
    ],
  },
  terms: {
    title: "Conditions d'utilisation",
    subtitle: 'mohamedyaakoubi.com',
    lastUpdated: 'Dernière mise à jour : 4 mai 2025',
    backTo: "Retour à l'accueil",
    sections: [
      {
        heading: "1. Acceptation des conditions",
        content: `<p>En accédant et en utilisant <strong>mohamedyaakoubi.com</strong> (le « Site »), vous acceptez d'être lié par ces Conditions d'utilisation (« Conditions »). Si vous n'acceptez pas ces Conditions, veuillez ne pas utiliser le Site.</p>`,
      },
      {
        heading: '2. Utilisation du Site',
        content: `<p>Vous acceptez d'utiliser ce Site uniquement à des fins légales et d'une manière qui ne porte pas atteinte aux droits d'autrui. Vous ne devez pas :</p>
<ul>
  <li>Utiliser le Site d'une manière qui viole les lois locales, nationales ou internationales applicables.</li>
  <li>Transmettre tout matériel publicitaire ou promotionnel non sollicité.</li>
  <li>Tenter d'obtenir un accès non autorisé à toute partie du Site ou à ses systèmes connexes.</li>
  <li>Adopter une conduite qui restreint ou empêche l'utilisation ou la jouissance du Site par quiconque.</li>
  <li>Utiliser des outils automatisés pour extraire des données du Site sans autorisation écrite préalable.</li>
</ul>`,
      },
      {
        heading: '3. Propriété intellectuelle',
        content: `<p>Le code source de ce Site est open source et disponible publiquement sur <a href="https://github.com/mohamedyaakoubi/MohamedYakoubi" target="_blank" rel="noopener noreferrer">GitHub</a>. Vous êtes libre de l'étudier et d'en tirer des enseignements conformément à sa licence.</p>
<p>En revanche, tout le <strong>contenu</strong> original de ce Site — y compris, sans s'y limiter, les textes rédigés, les informations biographiques, les descriptions de projets, les articles de blog, les graphiques et les logos — reste la propriété intellectuelle de <strong>Mohamed Yaakoubi</strong> et est protégé par les lois applicables sur le droit d'auteur. Vous ne pouvez pas reproduire, distribuer ou créer des œuvres dérivées de ce contenu sans autorisation écrite préalable, sauf pour un usage personnel et non commercial.</p>`,
      },
      {
        heading: '4. Fonctionnalité Chat IA',
        content: `<p>Le chatbot IA est fourni à titre informatif uniquement. Les réponses sont générées par un modèle d'IA et peuvent ne pas toujours être exactes, complètes ou à jour. Je ne suis pas responsable des décisions prises sur la base des informations fournies par le chatbot. Ne soumettez pas de données personnelles sensibles via l'interface de chat.</p>`,
      },
      {
        heading: '5. Publicité',
        content: `<p>Ce Site peut afficher des publicités diffusées par <strong>Google AdSense</strong>. Je ne suis pas responsable du contenu des publicités tierces. Cliquer sur des publicités peut vous rediriger vers des sites tiers qui ne sont pas sous mon contrôle.</p>`,
      },
      {
        heading: '6. Liens vers des tiers',
        content: `<p>Ce Site peut contenir des liens vers des sites ou services tiers. Je n'ai aucun contrôle sur le contenu, les politiques de confidentialité ou les pratiques de ces sites tiers, et n'assume aucune responsabilité à leur égard. Je vous encourage à consulter les conditions et politiques de confidentialité de tout site tiers que vous visitez.</p>`,
      },
      {
        heading: '7. Exclusion de garanties',
        content: `<p>Ce Site est fourni « tel quel » et « tel que disponible », sans aucune garantie d'aucune sorte, expresse ou implicite. Je ne garantis pas que le Site sera ininterrompu, sans erreur ou exempt de virus ou d'autres composants nuisibles.</p>`,
      },
      {
        heading: '8. Limitation de responsabilité',
        content: `<p>Dans toute la mesure permise par la loi applicable, je ne serai pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs découlant de votre utilisation ou de votre impossibilité d'utiliser ce Site.</p>`,
      },
      {
        heading: '9. Droit applicable',
        content: `<p>Ces Conditions sont régies par les lois de la <strong>République tunisienne</strong>. Tout litige découlant de ces Conditions sera soumis à la juridiction exclusive des tribunaux de Sfax, Tunisie.</p>`,
      },
      {
        heading: '10. Modifications des Conditions',
        content: `<p>Je me réserve le droit de modifier ces Conditions à tout moment. Les modifications sont effectives dès leur publication sur le Site. L'utilisation continue du Site après toute modification constitue votre acceptation des Conditions révisées.</p>`,
      },
      {
        heading: '11. Contact',
        content: `<p>Pour toute question concernant ces Conditions d'utilisation, contactez-moi :</p>
<ul>
  <li><strong>E-mail :</strong> <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a></li>
  <li><strong>Lieu :</strong> Sfax, Tunisie</li>
  <li><strong>LinkedIn :</strong> <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a></li>
</ul>`,
      },
    ],
  },
}

// ─────────────────────────── ARABIC ───────────────────────────
const ar: PortfolioLegalI18n = {
  privacy: {
    title: 'سياسة الخصوصية',
    subtitle: 'mohamedyaakoubi.com',
    lastUpdated: 'آخر تحديث: 4 مايو 2025',
    backTo: 'العودة إلى الرئيسية',
    sections: [
      {
        heading: '1. مقدمة',
        content: `<p>مرحبًا بكم في <strong>mohamedyaakoubi.com</strong> ("الموقع")، وهو موقع محفظة شخصية يديره محمد يعقوبي ("أنا")، مقيم في صفاقس، تونس. تصف سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات عند زيارتكم لهذا الموقع.</p>
<p>باستخدام هذا الموقع، فإنكم توافقون على جمع واستخدام المعلومات كما هو موضح في هذه السياسة.</p>`,
      },
      {
        heading: '2. المعلومات التي نجمعها',
        content: `<p>نجمع الفئات التالية من المعلومات:</p>
<ul>
  <li><strong>نماذج الاتصال</strong> — عند استخدام نموذج الاتصال، أتلقى اسمك وعنوان بريدك الإلكتروني ورسالتك، وتُستخدم هذه المعلومات فقط للرد على استفسارك.</li>
  <li><strong>تفاعلات الدردشة بالذكاء الاصطناعي</strong> — تُعالج الرسائل المرسلة إلى مساعد الدردشة بواسطة Mistral AI لإنشاء الردود. لا يتم تخزين محتوى الدردشة على خوادمي بعد انتهاء جلستك.</li>
  <li><strong>بيانات الاستخدام</strong> — تجمع مزودو التحليلات تلقائيًا بيانات مثل عنوان IP (مجهول)، ونوع المتصفح، ونظام التشغيل، والصفحات المُزارة، والوقت المُقضى على الموقع.</li>
</ul>`,
      },
      {
        heading: '3. ملفات تعريف الارتباط (الكوكيز)',
        content: `<p>يستخدم هذا الموقع ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتحسين تجربتكم وتحليل حركة المرور.</p>
<ul>
  <li><strong>الكوكيز الأساسية</strong> — ضرورية لعمل الموقع بشكل صحيح (تفضيلات اللغة، إعدادات السمة).</li>
  <li><strong>كوكيز التحليلات</strong> — تُستخدم من قِبل Google Analytics 4 وVercel Analytics لجمع إحصاءات استخدام مجهولة. يتم إخفاء هوية عناوين IP قبل المعالجة.</li>
  <li><strong>كوكيز الإعلانات</strong> — قد يعرض هذا الموقع إعلانات عبر Google AdSense. انظر القسم 4 للتفاصيل الكاملة.</li>
</ul>
<p>يمكنكم التحكم في ملفات تعريف الارتباط وحذفها من خلال إعدادات المتصفح في أي وقت.</p>`,
      },
      {
        heading: '4. Google AdSense وكوكيز الإعلانات',
        content: `<p>يستخدم هذا الموقع <strong>Google AdSense</strong> لعرض الإعلانات. يستخدم Google AdSense ملفات تعريف الارتباط لعرض الإعلانات بناءً على زياراتكم السابقة لهذا الموقع ومواقع أخرى عبر الإنترنت.</p>
<ul>
  <li>يستخدم موردو الطرف الثالث، بما في ذلك Google، ملفات تعريف الارتباط لعرض الإعلانات بناءً على الزيارات السابقة للمستخدم لهذا الموقع أو مواقع أخرى.</li>
  <li>يُمكّن استخدام Google لكوكيز الإعلانات شركة Google وشركاءها من عرض إعلانات بناءً على زيارتكم لهذا الموقع و/أو مواقع أخرى على الإنترنت.</li>
  <li>يمكنكم إلغاء الاشتراك في الإعلانات المخصصة بزيارة <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">إعدادات إعلانات Google</a>.</li>
  <li>يمكنكم أيضًا إلغاء استخدام كوكيز الطرف الثالث عبر <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</li>
</ul>
<p>لمزيد من المعلومات حول كيفية استخدام Google للبيانات، تفضلوا بزيارة <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">صفحة الخصوصية والشروط من Google</a>.</p>`,
      },
      {
        heading: '5. Google Analytics وVercel Analytics',
        content: `<p>يستخدم هذا الموقع <strong>Google Analytics 4</strong> (معرّف الخاصية: G-0NVCDPTBCZ) و<strong>Vercel Analytics</strong> لفهم كيفية تفاعل الزوار مع الموقع. تجمع هذه الخدمات بيانات استخدام مجهولة تشمل مشاهدات الصفحات ومدة الجلسة والموقع الجغرافي العام (على مستوى الدولة). يتم إخفاء هوية عناوين IP قبل التخزين.</p>
<p>يمكنكم إلغاء الاشتراك في Google Analytics عن طريق تثبيت <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">إضافة المتصفح لإلغاء الاشتراك في Google Analytics</a>.</p>`,
      },
      {
        heading: '6. ميزة الدردشة بالذكاء الاصطناعي',
        content: `<p>يعمل مساعد الدردشة بالذكاء الاصطناعي بتقنية <strong>Mistral AI</strong>. عند إرسال رسالة، يتم نقلها إلى واجهة برمجة تطبيقات Mistral AI لإنشاء الرد. تُعالج رسائلكم وفقًا لـ <a href="https://mistral.ai/terms/" target="_blank" rel="noopener noreferrer">شروط خدمة Mistral AI</a>. لا أقوم بتخزين سجل المحادثات على خوادمي الخاصة.</p>`,
      },
      {
        heading: '7. خدمات الطرف الثالث',
        content: `<p>يتكامل هذا الموقع مع خدمات الطرف الثالث التالية، كل منها خاضع لسياسة الخصوصية الخاصة به:</p>
<ul>
  <li><strong>Google AdSense</strong> — إعلانات: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">سياسة خصوصية Google</a></li>
  <li><strong>Google Analytics</strong> — تحليلات: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">سياسة خصوصية Google</a></li>
  <li><strong>Vercel Analytics</strong> — استضافة وتحليلات: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">سياسة خصوصية Vercel</a></li>
  <li><strong>Mistral AI</strong> — دردشة ذكاء اصطناعي: <a href="https://mistral.ai/terms/" target="_blank" rel="noopener noreferrer">شروط Mistral AI</a></li>
</ul>`,
      },
      {
        heading: '8. كيفية استخدام معلوماتكم',
        content: `<ul>
  <li>الرد على الاستفسارات المقدمة عبر نموذج الاتصال</li>
  <li>فهم وتحسين أداء الموقع وتجربة المستخدم</li>
  <li>عرض إعلانات ذات صلة عبر Google AdSense</li>
  <li>تشغيل مساعد الدردشة بالذكاء الاصطناعي</li>
  <li>الامتثال للالتزامات القانونية المعمول بها</li>
</ul>
<p>لا أبيع أو أتاجر أو أؤجر معلوماتكم الشخصية لأطراف ثالثة.</p>`,
      },
      {
        heading: '9. الاحتفاظ بالبيانات',
        content: `<p>يتم الاحتفاظ بطلبات نماذج الاتصال فقط للمدة اللازمة للرد على استفساركم. يتم الاحتفاظ ببيانات التحليلات وفقًا لسياسات الاحتفاظ القياسية لمزودي الخدمة المعنيين (26 شهرًا لـ Google Analytics). لا يتم الاحتفاظ ببيانات الدردشة بعد انتهاء الجلسة النشطة.</p>`,
      },
      {
        heading: '10. حقوقكم (GDPR / CCPA)',
        content: `<p>وفقًا لموقعكم، قد تتمتعون بالحقوق التالية فيما يتعلق ببياناتكم الشخصية:</p>
<ul>
  <li><strong>حق الوصول</strong> — طلب نسخة من البيانات الشخصية التي أحتفظ بها عنكم.</li>
  <li><strong>حق التصحيح</strong> — طلب تصحيح البيانات غير الدقيقة.</li>
  <li><strong>حق الحذف</strong> — طلب حذف بياناتكم الشخصية.</li>
  <li><strong>حق الاعتراض</strong> — الاعتراض على معالجة بياناتكم لأغراض التسويق أو التحليل.</li>
  <li><strong>حق إلغاء الإعلانات</strong> — كما هو موضح في القسم 4.</li>
</ul>
<p>لممارسة أي من هذه الحقوق، يرجى التواصل معي على <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a>.</p>`,
      },
      {
        heading: '11. خصوصية الأطفال',
        content: `<p>هذا الموقع غير موجه للأطفال دون سن 13 عامًا. لا أجمع عمدًا معلومات شخصية من الأطفال. إذا كنتم تعتقدون أن طفلاً قدّم معلومات شخصية، يرجى التواصل معي فورًا على <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a>.</p>`,
      },
      {
        heading: '12. التغييرات على هذه السياسة',
        content: `<p>أحتفظ بحق تعديل سياسة الخصوصية هذه في أي وقت. ستُشير تاريخ "آخر تحديث" إلى آخر مراجعة. استمراركم في استخدام الموقع بعد أي تغييرات يُعدّ قبولًا للسياسة المحدّثة.</p>`,
      },
      {
        heading: '13. التواصل',
        content: `<p>لأي استفسارات حول سياسة الخصوصية هذه، يرجى التواصل معي:</p>
<ul>
  <li><strong>البريد الإلكتروني:</strong> <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a></li>
  <li><strong>الموقع:</strong> صفاقس، تونس</li>
  <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a></li>
</ul>`,
      },
    ],
  },
  terms: {
    title: 'شروط الخدمة',
    subtitle: 'mohamedyaakoubi.com',
    lastUpdated: 'آخر تحديث: 4 مايو 2025',
    backTo: 'العودة إلى الرئيسية',
    sections: [
      {
        heading: '1. قبول الشروط',
        content: `<p>بالوصول إلى <strong>mohamedyaakoubi.com</strong> ("الموقع") واستخدامه، فإنكم توافقون على الالتزام بشروط الخدمة هذه ("الشروط"). إذا لم توافقوا على هذه الشروط، يرجى عدم استخدام الموقع.</p>`,
      },
      {
        heading: '2. استخدام الموقع',
        content: `<p>توافقون على استخدام هذا الموقع لأغراض قانونية فقط. لا يجوز لكم:</p>
<ul>
  <li>استخدام الموقع بأي طريقة تنتهك القوانين المحلية أو الوطنية أو الدولية المعمول بها.</li>
  <li>إرسال أي مواد دعائية أو ترويجية غير مرغوب فيها.</li>
  <li>محاولة الحصول على وصول غير مصرح به إلى أي جزء من الموقع.</li>
  <li>إجراء أي نشاط يُقيّد أو يمنع استخدام الآخرين للموقع أو تمتعهم به.</li>
  <li>استخدام أدوات آلية لاستخراج البيانات من الموقع دون إذن كتابي مسبق.</li>
</ul>`,
      },
      {
        heading: '3. الملكية الفكرية',
        content: `<p>الكود المصدري لهذا الموقع مفتوح المصدر ومتاح للعموم على <a href="https://github.com/mohamedyaakoubi/MohamedYakoubi" target="_blank" rel="noopener noreferrer">GitHub</a>. يمكنكم دراسته والتعلم منه وفقًا لرخصته المعمول بها.</p>
<p>غير أن جميع <strong>المحتوى</strong> الأصلي على هذا الموقع — بما في ذلك النصوص المكتوبة والمعلومات السيرة الذاتية وأوصاف المشاريع ومقالات المدونة والرسومات والشعارات — يظل ملكية فكرية لـ <strong>محمد يعقوبي</strong> وهو محمي بقوانين حقوق الملكية الفكرية المعمول بها. لا يجوز إعادة إنتاج أو توزيع هذا المحتوى أو إنشاء أعمال مشتقة منه دون إذن كتابي مسبق، باستثناء الاستخدام الشخصي غير التجاري.</p>`,
      },
      {
        heading: '4. ميزة الدردشة بالذكاء الاصطناعي',
        content: `<p>يُقدَّم مساعد الدردشة بالذكاء الاصطناعي لأغراض إعلامية فقط. قد لا تكون الردود دائمًا دقيقة أو كاملة أو محدّثة. لا أتحمل مسؤولية أي قرارات تُتخذ بناءً على المعلومات المقدمة من مساعد الدردشة. لا تُرسلوا بيانات شخصية حساسة عبر واجهة الدردشة.</p>`,
      },
      {
        heading: '5. الإعلانات',
        content: `<p>قد يعرض هذا الموقع إعلانات تُقدّمها <strong>Google AdSense</strong>. لا أتحمل مسؤولية محتوى إعلانات الطرف الثالث. النقر على الإعلانات قد ينقلكم إلى مواقع طرف ثالث ليست تحت سيطرتي.</p>`,
      },
      {
        heading: '6. روابط الطرف الثالث',
        content: `<p>قد يحتوي هذا الموقع على روابط لمواقع أو خدمات طرف ثالث. لا أملك أي سيطرة على محتوى هذه المواقع أو سياسات خصوصيتها ولا أتحمل أي مسؤولية عنها. أنصحكم بمراجعة الشروط والسياسات الخاصة بأي موقع طرف ثالث تزورونه.</p>`,
      },
      {
        heading: '7. إخلاء المسؤولية عن الضمانات',
        content: `<p>يُقدَّم هذا الموقع "كما هو" و"حسب الإتاحة" دون أي ضمانات من أي نوع، صريحة أو ضمنية. لا أضمن أن الموقع سيكون متواصلاً أو خالياً من الأخطاء أو الفيروسات أو المكونات الضارة الأخرى.</p>`,
      },
      {
        heading: '8. تحديد المسؤولية',
        content: `<p>بالقدر الذي يسمح به القانون المعمول به، لن أكون مسؤولاً عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية تنشأ عن استخدامكم لهذا الموقع أو عدم قدرتكم على استخدامه.</p>`,
      },
      {
        heading: '9. القانون الحاكم',
        content: `<p>تخضع هذه الشروط وتُفسَّر وفقًا لقوانين <strong>الجمهورية التونسية</strong>. أي نزاعات تنشأ بموجب هذه الشروط تخضع للاختصاص القضائي الحصري لمحاكم صفاقس، تونس.</p>`,
      },
      {
        heading: '10. التغييرات على الشروط',
        content: `<p>أحتفظ بحق تعديل هذه الشروط في أي وقت. ستسري التغييرات فور نشرها على الموقع. استمراركم في استخدام الموقع بعد أي تغييرات يُعدّ قبولاً للشروط المُعدَّلة.</p>`,
      },
      {
        heading: '11. التواصل',
        content: `<p>لأي استفسارات حول شروط الخدمة هذه، يرجى التواصل معي:</p>
<ul>
  <li><strong>البريد الإلكتروني:</strong> <a href="mailto:amirrak8@gmail.com">amirrak8@gmail.com</a></li>
  <li><strong>الموقع:</strong> صفاقس، تونس</li>
  <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yaakoubi-mohamed/" target="_blank" rel="noopener noreferrer">linkedin.com/in/yaakoubi-mohamed</a></li>
</ul>`,
      },
    ],
  },
}

const legalData: Record<string, PortfolioLegalI18n> = { en, fr, ar }

export function getPortfolioLegalI18n(locale: string): PortfolioLegalI18n {
  return legalData[locale] ?? en
}
