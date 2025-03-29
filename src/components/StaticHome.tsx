export function StaticHome() {
  return (
    <div className="sr-only" aria-hidden="false">
      {/* This is THE ONLY h1 on the homepage */}
      <h1>Mohamed Yaakoubi | Emerging AI and Technology Specialist</h1>
      <p>Expert in AI/ML, web development, and localization services. View my projects, services and experience in AI, React, Next.js and more.</p>
      
      <h2>Professional Summary</h2>
      <p>Driven, adaptable AI specialist with expertise in translations, localization, and technology solutions. Experience at DeepL, RWS (Meta AI), Uber, and Volga Partners.</p>
      
      <h2>Services</h2>
      <ul>
        <li>AI/ML Development and Data Annotation</li>
        <li>Web Development with React and Next.js</li>
        <li>Localization and Translation Services</li>
        <li>Technical Support and IT Consulting</li>
      </ul>
      
      <h2>Skills</h2>
      <ul>
        <li>Programming: Next.js, React, TypeScript, Python</li>
        <li>Languages: Arabic, English, French, German</li>
        <li>AI/ML: Data Annotation, Quality Evaluation</li>
        <li>Tools: Git, VS Code, Azure, Firebase</li>
      </ul>
      
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