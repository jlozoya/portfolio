import React from "react";

/**
 * projects: [
 *  { id, title, description, tags?: [], image?: '/path-or-url', url?: 'https://...' }
 * ]
 */

type Project = {
  id: string | number;
  title: string;
  description: string;
  tags?: string[];
  image?: string;
  url?: string;
};

interface ProjectsSectionProps {
  projects?: Project[];
}

export default function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Projects</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <article
            key={p.id || p.title}
            className="group bg-gray-800/40 border border-gray-700 rounded-2xl p-5 hover:scale-[1.01] transform-gpu transition-shadow duration-200 shadow-sm"
          >
            {/* Image / placeholder */}
            <div className="h-40 w-full overflow-hidden rounded-lg mb-4 bg-gray-700 flex items-center justify-center">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={p.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="text-sm text-gray-300/80">No preview</div>
              )}
            </div>

            {/* Title & description */}
            <h4 className="text-lg font-semibold text-gray-100 mb-2">{p.title}</h4>
            <p className="text-sm text-gray-300 mb-3 leading-relaxed">
              {p.description}
            </p>

            {/* tags */}
            {p.tags && p.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-md bg-gray-700/60 border border-gray-600 text-gray-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* actions */}
            <div className="mt-auto flex items-center justify-between">
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-medium transition"
                >
                  View
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
