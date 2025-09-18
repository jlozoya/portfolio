const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-8">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Juan Fernando Lozoya Valdez</h1>
        <p className="text-xl mt-2">FULL STACK DEVELOPER</p>
      </header>

      {/* Contact & Languages */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-2xl font-semibold mb-2">LANGUAGES</h2>
          <ul className="space-y-1">
            <li>English (C1)</li>
            <li>Spanish (Native)</li>
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">SKILLS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-bold">Frontend</h3>
            <p>React, React Native, JavaScript, TypeScript, HTML5, CSS3, Tailwind, Bootstrap</p>
          </div>
          <div>
            <h3 className="font-bold">Backend</h3>
            <p>Node.js, Python (Flask, Django), MySQL, RESTful APIs</p>
          </div>
          <div>
            <h3 className="font-bold">Tools & Other</h3>
            <p>Git, Docker, Webpack, Jira, CI/CD pipelines, Redux, Context API, Figma</p>
            <p>Agile development, Scrum, Kanban, Cross-functional collaboration</p>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">PROFILE</h2>
        <p>
          Computer Systems Engineer with 7+ years of experience delivering scalable web solutions for Silicon Valley companies.
          Specialized in fullstack JavaScript (React, Node.js), with a proven record of improving product performance, usability, and reliability.
          Experienced in leading distributed teams and driving innovation in test automation and user interaction technologies.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">EXPERIENCE</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-bold">Functionize | SEP 2019 - JUL 2025</h3>
            <p>Full Stack Developer</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Developed and maintained core features of the AI-driven testing platform using React.</li>
              <li>Collaborated with globally distributed teams to enhance UI/UX and frontend responsiveness.</li>
              <li>Maintained and enhanced the backend architecture, primarily with Node.js.</li>
              <li>Built Architect, a Chrome extension that automatically records user interactions for test automation.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold">Ventus Technology | DEC 2018 - SEP 2019</h3>
            <p>Tech Lead</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Led a team of 4 developers delivering custom web applications using React Native.</li>
              <li>Served as the primary contact for technical decision-making and solution design.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold">CIMAV | JUN 2017 - DEC 2017</h3>
            <p>Resident Engineer</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Developed a cross-platform application for field sampling of environmental pollutants using React Native.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">EDUCATION</h2>
        <p>
          2013 - 2017 | Computer Systems Engineering with mobile specialization<br/>
          ITD | Durango Institute of Technology<br/>
          Bachelor of Engineering (B.E.), GPA: 9.5 / 10.0
        </p>
      </section>
    </div>
  );
};

export default Portfolio;
