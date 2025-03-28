export function StaticHome() {
  return (
    <div className="sr-only" aria-hidden="false">
      {/* This is THE ONLY h1 on the homepage */}
      <h1>Mohamed Yaakoubi | Emerging AI and Technology Specialist</h1>
      <p>Expert in AI/ML, web development, and localization services. View my projects, services and experience in AI, React, Next.js and more.</p>
      
      <h2>Services</h2>
      <ul>
        <li>AI/ML Development</li>
        <li>Web Development</li>
        <li>Localization Services</li>
      </ul>
      
      <h2>Skills</h2>
      <ul>
        <li>Next.js</li>
        <li>React</li>
        <li>Machine Learning</li>
        <li>TypeScript</li>
      </ul>
      
      <nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/projects">Projects</a>
        <a href="/services">Services</a>
        <a href="/experience">Experience</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  );
}