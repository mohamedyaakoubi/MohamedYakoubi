interface StaticHomeProps {
  locale: string
  translations: any
}

export function StaticHome({ locale, translations }: StaticHomeProps) {
  const isRTL = locale === 'ar'
  
  return (
    <div className="sr-only" aria-hidden="false">
      {/* This is THE ONLY h1 on the homepage */}
      <h1>{translations.meta.title}</h1>
      <p>{translations.meta.description}</p>
      
      <section aria-labelledby="about-heading">
        <h2 id="about-heading">{translations.about.title}</h2>
        <p>{translations.about.description.first}</p>
        <p>{translations.about.description.second}</p>
      </section>
      
      <section aria-labelledby="experience-heading">
        <h2 id="experience-heading">{translations.experience?.title || 'Professional Experience'}</h2>
        <ul>
          <li>
            <h3>{translations.experience?.positions?.['Video Metadata Writer'] || 'Video Metadata Writer'} | Wirestock</h3>
            <p>{translations.experience?.periods?.['Apr 2025 - Present'] || 'Apr 2025 - Present'} | {translations.experience?.locations?.['Sfax (Remote)'] || 'Sfax (Remote)'} | Full-Time</p>
            <p>Writing detailed metadata for edited videos, segment descriptions, and evaluating content quality.</p>
          </li>
          <li>
            <h3>{translations.experience?.positions?.['Technical Content Writer & Web Operations Assistant'] || 'Technical Content Writer'} | UbiAi</h3>
            <p>{translations.experience?.periods?.['Mar 2025 - Present'] || 'Mar 2025 - Present'} | {translations.experience?.locations?.['Sfax (Remote)'] || 'Sfax (Remote)'}</p>
            <p>Creating technical blog content on LLM fine-tuning and NLP topics, performing website audits.</p>
          </li>
          <li>
            <h3>{translations.experience?.positions?.['Linguistic Editor'] || 'Linguistic Editor'} | DeepL</h3>
            <p>{translations.experience?.periods?.['Feb 2025 - Present'] || 'Feb 2025 - Present'} | {translations.experience?.locations?.['Sfax (Remote)'] || 'Sfax (Remote)'}</p>
            <p>Evaluating AI-generated Arabic-English translations for accuracy and fluency.</p>
          </li>
          <li>
            <h3>{translations.experience?.positions?.['Linguistic AI Evaluator - Arabic Maghrebi QA | Meta AI'] || 'Linguistic AI Evaluator'} | RWS (Meta AI)</h3>
            <p>{translations.experience?.periods?.['Nov 2024 - Present'] || 'Nov 2024 - Present'} | {translations.experience?.locations?.['Sfax (Remote)'] || 'Sfax (Remote)'}</p>
            <p>Evaluating multilingual prompts and AI-generated responses in Arabic to refine LLMs like Llama 4.</p>
          </li>
          <li>
            <h3>{translations.experience?.positions?.['Localization Vendor Coordinator'] || 'Localization Vendor Coordinator'} | Uber (via Volga Partners)</h3>
            <p>{translations.experience?.periods?.['Jul 2024 - Present'] || 'Jul 2024 - Present'} | {translations.experience?.locations?.['Sfax (Remote)'] || 'Sfax (Remote)'}</p>
            <p>Evaluating AI-generated content and coordinating localization efforts.</p>
          </li>
          <li>
            <h3>{translations.experience?.positions?.['Freelance Editor (Arabic to English & English to Arabic)'] || 'Freelance Editor'} | Unbabel</h3>
            <p>{translations.experience?.periods?.['Mar 2020 - Present'] || 'Mar 2020 - Present'} | {translations.experience?.locations?.['Sfax (Remote)'] || 'Sfax (Remote)'}</p>
            <p>Reviewing Arabic-English translations for accuracy, clarity, and style.</p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="companies-heading">
        <h2 id="companies-heading">{translations.companies?.workedwith || 'Companies & Organizations'}</h2>
        <h3>Other Companies I Worked With</h3>
        <p>Additional professional collaborations include:</p>
        <ul>
          <li>Premise - Crowdsourced data collection and surveys</li>
          <li>Toloka - AI training data annotation and labeling</li>
          <li>Translated - Language technology solutions</li>
          <li>Andovar - Localization and translation services</li>
          <li>Kudra AI - Document processing and data extraction</li>
          <li>Pi Network - KYC validation services</li>
          <li>TED Translators - Subtitle editing and translation</li>
          <li>Various freelance platforms (Fiverr, Upwork, Freelances.tn, Proz.com)</li>
        </ul>
      </section>
      
      <section aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        <ul>
          <li>
            <h3>Licentiate Degree in Computer Science</h3>
            <p>Faculty of Sciences in Sfax | 2024-2027</p>
          </li>
          <li>
            <h3>Integrated Preparatory Cycle in Computer Science</h3>
            <p>Faculty of Sciences in Sfax | 2021-2024</p>
          </li>
          <li>
            <h3>Baccalaureate in Experimental Sciences</h3>
            <p>Feriana Secondary High School | 2020-2021</p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading">{translations.skills?.title || 'Skills'}</h2>
        <ul>
          <li>Development & Scripting: HTML/CSS, Javascript</li>
          <li>Programming Languages: C, Python, Typescript</li>
          <li>Database: Firebase, SQL</li>
          <li>Version Control: Git, Github</li>
          <li>Front-end Libraries: React, Next.js</li>
          <li>Cloud Computing: Azure</li>
          <li>Tools: Visual Studio Code, CodeBlocks, Pyscripter</li>
          <li>CAT: Smartcat, Amara</li>
        </ul>
      </section>

      <section aria-labelledby="languages-heading">
        <h2 id="languages-heading">{translations.skills?.sections?.Languages || 'Languages'}</h2>
        <ul>
          <li>{translations.skills?.items?.Arabic || 'Arabic'}: {translations.skills?.proficiency?.Native || 'Native'}</li>
          <li>{translations.skills?.items?.English || 'English'}: {translations.skills?.proficiency?.Professional || 'Professional'}</li>
          <li>{translations.skills?.items?.French || 'French'}: Limited Working</li>
          <li>{translations.skills?.items?.German || 'German'}: Elementary</li>
        </ul>
      </section>

      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading">{translations.projects?.title || 'Projects'}</h2>
        <ul>
          <li>
            <h3>{translations.projects?.names?.Potential || 'Potential'} (AI Hackathon | Abu Dhabi Spark Data)</h3>
            <p>{translations.projects?.descriptions?.Potential || 'AI-powered search engine for the Abu Dhabi Open Data Platform using Next.js and NLP.'}</p>
          </li>
          <li>
            <h3>{translations.projects?.names?.NotYet || 'NotYet'} (AI Hackathon | UVT)</h3>
            <p>{translations.projects?.descriptions?.NotYet || 'Web application for Tunisian students and job seekers with CV analysis using React and Azure AI.'}</p>
          </li>
          <li>
            <h3>{translations.projects?.names?.DocuMed || 'DocuMed'} (Bootcamp | MentorNations)</h3>
            <p>{translations.projects?.descriptions?.DocuMed || 'Healthcare management application built with React and Firebase.'}</p>
          </li>
        </ul>
      </section>
      
      <section aria-labelledby="certifications-heading">
        <h2 id="certifications-heading">Certifications</h2>
        <ul>
          <li>IBM Artificial Intelligence Fundamentals</li>
          <li>Cisco Netcad Networking Basics</li>
          <li>Cisco Netcad Introduction to Cybersecurity</li>
          <li>3D Printing Training</li>
        </ul>
      </section>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading">{translations.contact?.title || 'Contact'}</h2>
        <p>{translations.contact?.info?.email || 'Email'}: amirrak8@gmail.com</p>
        <p>{translations.contact?.info?.phone || 'Phone'}: +216 54711524</p>
        <p>{translations.contact?.info?.location || 'Location'}: {translations.contact?.info?.locationValue || 'Sfax, Tunisia'}</p>
        <p>LinkedIn: https://www.linkedin.com/in/yaakoubi-mohamed/</p>
        <p>GitHub: https://github.com/mohamedyaakoubi</p>
      </section>
      
      <nav aria-label="Main navigation">
        <a href={`/${locale === 'en' ? '' : locale}`}>{translations.navigation?.links?.home || 'Home'}</a>
        <a href={`/${locale === 'en' ? '' : locale + '/'}projects`}>{translations.navigation?.links?.projects || 'Projects'}</a>
        <a href={`/${locale === 'en' ? '' : locale + '/'}services`}>{translations.navigation?.links?.services || 'Services'}</a>
        <a href={`/${locale === 'en' ? '' : locale + '/'}experience`}>{translations.navigation?.links?.experience || 'Experience'}</a>
        <a href={`/${locale === 'en' ? '' : locale + '/'}contact`}>{translations.navigation?.links?.contact || 'Contact'}</a>
        <a href={`/${locale === 'en' ? '' : locale + '/'}sitemap`}>Site Map</a>
      </nav>
    </div>
  );
}

