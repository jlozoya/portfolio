"use client";

import React from "react";

import { ReactNode } from "react";
import ProjectsSection from "./ProjectsSection";
import OvalCarousel from "./OvalCarousel";
import ContactForm from "./ContactForm";

type ContactItemProps = {
  title?: ReactNode;
  children: ReactNode;
};

const ContactItem = ({ children }: ContactItemProps) => (
  <li className="text-sm text-gray-300 dark:text-gray-200">{children}</li>
);

const sampleProjects = [
  {
    title: "AI Test Platform UI",
    company: "Functionize",
    description: "Frontend for an AI-driven test automation platform, focusing on performance and large datasets.",
    image: "/assets/img/projects/functionize-landing.png",
    tags: ["React", "Next.js", "Redux", "Node.js", "Tailwind", "Python", "PHP", "Docker", "Performance", "AWS", "GCloud"],
    details: "/functionize",
    url: "https://www.functionize.com/",
  },
  {
    title: "Architect",
    company: "Functionize",
    description: "Chrome extension that records user interactions (clicks, typing, drags, navigation, downloads, uploads, custom js injections, etc...) into a structured list for automation.",
    tags: ["Chrome Extension", "JavaScript", "Redux", "Automation", "Tailwind"],
    image: "/assets/img/projects/architect-simple-loop.png",
    details: "/architect",
    url: "https://chromewebstore.google.com/detail/functionize-architect/iojgmnipokofkeihgnlhmmmchpfchonk?hl=en",
  },
  {
    title: "Rave",
    company: "Personal Project",
    description: "This application is an evolving social network featuring integrated payment gateways, infinite scrolling, role-based user access, user analytics, and a dedicated blog page.",
    tags: ["Ionic", "MySQL", "RESTful API", "Hibrid", "Laravel", "OAuth2", "Online Payments"],
    image: "/assets/img/projects/rave-landing.png",
    url: "https://github.com/jlozoya/rave",
  },
  {
    title: "Chat",
    company: "Personal Project",
    description: "This project is a CI/CD pipeline automation exercise for a React-based chat application and an Nginx reverse proxy. Both the client and server applications are automatically deployed and updated through the pipeline.",
    tags: ["React", "Socket.io", "Node.js", "Docker", "CI/CD"],
    image: "/assets/img/projects/chat.png",
    url: "https://github.com/jlozoya/chat",
  },
  {
    title: "This Portfolio",
    company: "Personal Project",
    description: "It is built with React, Next.js, and TypeScript, with a CI/CD pipeline for integration into AWS.",
    tags: ["React", "Next.js", "TypeScript", "CI/CD", "AWS"],
    image: "/assets/img/projects/portfolio.png",
    url: "https://github.com/jlozoya/portfolio",
  },
  {
    title: "Field Sampling App",
    company: "CIMAV",
    description: "Cross-platform React Native app to record environmental pollutant samples and sync to server.",
    tags: ["React Native", "TypeScript", "SQLite", "RESTful API", "Mobile"],
    image: "/assets/img/projects/field-sampling-app.png",
  },
];

const logos = [
  { name: 'React', src: '/assets/img/brands/react.png',},
  { name: 'Angular', src: '/assets/img/brands/angular.png',},
  { name: 'Vue.js', src: '/assets/img/brands/vue.png',},
  { name: 'Node.js', src: '/assets/img/brands/nodejs.png',},
  { name: 'TypeScript', src: '/assets/img/brands/typescript.png',},
  { name: 'JavaScript', src: '/assets/img/brands/javascript.png',},
  { name: 'Python', src: '/assets/img/brands/python.png',},
  { name: 'HTML5', src: '/assets/img/brands/html5.png',},
  { name: 'CSS3', src: '/assets/img/brands/css3.png',},
  { name: 'MySQL', src: '/assets/img/brands/mysql.png',},
  { name: 'Docker', src: '/assets/img/brands/docker.png',},
  { name: 'Git', src: '/assets/img/brands/git.png',},
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-100 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Juan Fernando Lozoya Valdez
            </h1>
            <p className="mt-1 text-indigo-300/90 font-medium">Full Stack Developer</p>
            <p className="mt-3 text-sm text-gray-300 max-w-xl">
              Computer Systems Engineer experienced in building scalable web solutions (React & Node.js). Passionate about automation, performant UIs, and user-friendly tools.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/FernandoLozoya.pdf"
              download
              className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-semibold transition"
            >
              Download CV
            </a>
          </div>
        </header>

        <OvalCarousel logos={logos} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-4">
          {/* Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 bg-gray-900/40 border border-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-3">
              Languages
            </h2>
            <ul className="space-y-1 mb-6">
              <ContactItem>English (C1)</ContactItem>
              <ContactItem>Spanish (Native)</ContactItem>
            </ul>

            <h2 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-3">
              Skills
            </h2>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-gray-100">Frontend</span>
                <span>React, React Native, JavaScript, TypeScript, HTML5, CSS3, Tailwind, Bootstrap</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium text-gray-100">Backend</span>
                <span>Node.js, Python (Flask, Django), MySQL, RESTful APIs, microservices</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium text-gray-100">Tools & Processes</span>
                <span>Git, Docker, Webpack, Jira, CI/CD, Redux, Context API, Figma, Agile (Scrum/Kanban)</span>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-8 xl:col-span-9">
            {/* Profile */}
            <section className="mb-8 bg-gray-800/30 border border-gray-700 rounded-xl p-5">
              <h3 className="text-xl font-semibold mb-3">Profile</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Computer Systems Engineer with 7+ years of experience delivering scalable web
                solutions for Silicon Valley companies. Specialized in fullstack JavaScript (React,
                Node.js) with a proven record of improving product performance, usability and
                reliability. Experienced leading distributed teams and driving innovation in test
                automation and user interaction technologies.
              </p>
            </section>

            {/* Experience */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Experience</h3>

              <article className="mb-5 bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                <header className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold">Functionize</h4>
                    <div className="text-sm text-gray-300">Full Stack Developer · SEP 2019 - JUL 2025</div>
                  </div>
                </header>
                <ul className="list-disc ml-5 mt-3 text-sm text-gray-300 space-y-1">
                  <li>Built and maintained core features of an AI-driven testing platform using React.</li>
                  <li>Improved frontend performance and responsive behavior across devices.</li>
                  <li>Maintained backend services primarily in Node.js and built test automation tooling.</li>
                  <li>Built Architect a Chrome extension to record user interactions for automation.</li>
                </ul>
              </article>

              <article className="mb-5 bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                <h4 className="font-bold">Ventus Technology</h4>
                <div className="text-sm text-gray-300">Tech Lead · DEC 2018 - SEP 2019</div>
                <ul className="list-disc ml-5 mt-3 text-sm text-gray-300 space-y-1">
                  <li>Led a team of 4 developers building cross-platform apps with React Native.</li>
                  <li>Responsible for technical decisions and solution design.</li>
                </ul>
              </article>

              <article className="mb-5 bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                <h4 className="font-bold">CIMAV</h4>
                <div className="text-sm text-gray-300">Resident Engineer · JUN 2017 - DEC 2017</div>
                <ul className="list-disc ml-5 mt-3 text-sm text-gray-300 space-y-1">
                  <li>Developed a cross-platform app for field sampling of environmental pollutants (React Native).</li>
                </ul>
              </article>
            </section>

            {/* Education */}
            <section className="mb-4">
              <h3 className="text-xl font-semibold mb-3">Education</h3>
              <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 text-sm text-gray-300">
                <div>2013 - 2017 · Computer Systems Engineering (mobile specialization)</div>
                <div>ITD | Durango Institute of Technology — B.E. (GPA: 9.5 / 10.0)</div>
              </div>
            </section>
          </main>
          
        </div>

        <ProjectsSection projects={sampleProjects} />

        <ContactForm />
      </div>
    </div>
  );
};

export default Portfolio;
