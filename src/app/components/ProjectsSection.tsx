import React from 'react';
import Link from 'next/link';

/**
 * projects: [
 *  { id, title, description, tags?: [], image?: '/path-or-url', url?: 'https://...' }
 * ]
 */

type Project = {
  title: string;
  company?: string;
  description: string;
  tags?: string[];
  image?: string;
  url?: string;
  details?: string;
};

interface ProjectsSectionProps {
  id?: string;
  projects?: Project[];
}

export default function ProjectsSection({ id, projects = [] }: ProjectsSectionProps) {
  return (
    <section className="pt-12" id={id}>
      <h3 className="mb-4 text-xl font-semibold">Projects</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={index || project.title}
            className="group transform-gpu rounded-2xl border border-gray-700 bg-gray-800/40 p-5 shadow-sm transition-shadow duration-200 hover:scale-[1.01]"
          >
            {/* Image / placeholder */}
            <div className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-700">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-sm text-gray-300/80">No preview</div>
              )}
            </div>

            {/* Title & description */}
            <h4 className="mb-2 text-lg font-semibold text-gray-100">{project.title}</h4>

            {project.company && (
              <p className="mb-3 text-sm leading-relaxed text-gray-300">{project.company}</p>
            )}

            <p className="mb-3 text-sm leading-relaxed text-gray-300">{project.description}</p>

            {/* tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-gray-600 bg-gray-700/60 px-2 py-1 text-xs text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* actions */}
            <div className="mt-auto flex items-center justify-between">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500"
                >
                  View
                </a>
              )}
              {project.details && (
                <Link
                  href={project.details}
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500"
                >
                  Details
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
