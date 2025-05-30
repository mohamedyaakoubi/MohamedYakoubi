export function StaticHome() {
  return (
    <div className="sr-only" aria-hidden="false">
      {/* This is THE ONLY h1 on the homepage */}
      <h1>Mohamed Yaakoubi | Emerging AI and Technology Specialist</h1>
      <p>Expert in AI/ML, web development, and localization services with extensive experience at DeepL, RWS (Meta AI), Uber, and Volga Partners.</p>
      
      <section aria-labelledby="about-heading">
        <h2 id="about-heading">About Me</h2>
        <p>Driven, adaptable, and passionate about advancing technology, I am a fast learner who thrives on tackling complex challenges and acquiring new skills quickly. With hands-on experience in AI, web development, and localization, I seek opportunities that foster innovation and personal growth.</p>
      </section>
      
      <section aria-labelledby="experience-heading">
        <h2 id="experience-heading">Professional Experience</h2>
        <ul>
          <li>
            <h3>Video Metadata Writer | Wirestock</h3>
            <p>Apr 2025 - Present | Sfax (Remote) | Full-Time</p>
            <p>Writing detailed metadata for edited videos, segment descriptions, and evaluating content quality.</p>
          </li>
          <li>
            <h3>Technical Content Writer | UbiAi</h3>
            <p>Mar 2025 - Present | Sfax (Remote)</p>
            <p>Creating technical blog content on LLM fine-tuning and NLP topics, performing website audits.</p>
          </li>
          <li>
            <h3>Linguistic Editor | DeepL</h3>
            <p>Feb 2025 - Present | Sfax (Remote)</p>
            <p>Evaluating AI-generated Arabic-English translations for accuracy and fluency.</p>
          </li>
          <li>
            <h3>Linguistic AI Evaluator | RWS (Meta AI)</h3>
            <p>Nov 2024 - Present | Sfax (Remote)</p>
            <p>Evaluating multilingual prompts and AI-generated responses in Arabic to refine LLMs like Llama 4.</p>
          </li>
          <li>
            <h3>Localization Vendor Coordinator | Uber (via Volga Partners)</h3>
            <p>Jul 2024 - Present | Sfax (Remote)</p>
            <p>Evaluating AI-generated content and coordinating localization efforts.</p>
          </li>
          <li>
            <h3>Freelance Editor | Unbabel</h3>
            <p>Mar 2020 - Present | Sfax (Remote)</p>
            <p>Reviewing Arabic-English translations for accuracy, clarity, and style.</p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="companies-heading">
        <h2 id="companies-heading">Companies & Organizations</h2>
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
        <h2 id="skills-heading">Skills</h2>
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
        <h2 id="languages-heading">Languages</h2>
        <ul>
          <li>Arabic: Native</li>
          <li>English: Professional</li>
          <li>French: Limited Working</li>
          <li>German: Elementary</li>
        </ul>
      </section>

      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <ul>
          <li>
            <h3>Potential (AI Hackathon | Abu Dhabi Spark Data)</h3>
            <p>AI-powered search engine for the Abu Dhabi Open Data Platform using Next.js and NLP.</p>
          </li>
          <li>
            <h3>NotYet (AI Hackathon | UVT)</h3>
            <p>Web application for Tunisian students and job seekers with CV analysis using React and Azure AI.</p>
          </li>
          <li>
            <h3>DocuMed (Bootcamp | MentorNations)</h3>
            <p>Healthcare management application built with React and Firebase.</p>
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
        <h2 id="contact-heading">Contact</h2>
        <p>Email: amirrak8@gmail.com</p>
        <p>Phone: +216 54711524</p>
        <p>Location: Sfax, Tunisia</p>
        <p>LinkedIn: https://www.linkedin.com/in/yaakoubi-mohamed/</p>
        <p>GitHub: https://github.com/mohamedyaakoubi</p>
      </section>
      
      <nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/projects">Projects</a>
        <a href="/services">Services</a>
        <a href="/experience">Experience</a>
        <a href="/contact">Contact</a>
        <a href="/sitemap">Site Map</a>
      </nav>
    </div>
  );
}