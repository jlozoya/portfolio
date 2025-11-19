import VideoGallery from '../components/VideoGallery';
import Link from 'next/link';

type Project = {
  id: string | number;
  title: string;
  company?: string;
  description: string;
  tags?: string[];
  image?: string;
  url?: string;
  details?: string;
};

const project: Project = {
  id: 2,
  title: 'Architect — Interaction Recorder',
  company: 'Functionize',
  description:
    'Chrome extension that records user interactions (clicks, typing, drags, navigation, downloads, uploads, custom js injections, etc...) into a structured list for automation.',
  tags: ['Chrome Extension', 'JavaScript', 'Redux', 'Automation', 'Tailwind'],
  image: '/assets/img/projects/architect-simple-loop.png',
  details: '/architect',
  url: 'https://chromewebstore.google.com/detail/functionize-architect/iojgmnipokofkeihgnlhmmmchpfchonk?hl=en',
};

export default function Architect() {
  const videos = [
    {
      title: 'Simple Loop',
      src: '/assets/videos/projects/architect-simple-loop.webm',
      description: 'Recording a simple example, performing a Google search and adding a loop.',
    },
    {
      title: 'Code Injection',
      src: '/assets/videos/projects/architect-code-injection.webm',
      description: 'Providing a simple walkthrough where I perform a few actions inside an iframe.',
    },
    {
      title: 'Iframe Interaction',
      src: '/assets/videos/projects/architect-iframe-actions.webm',
      description: 'Showing a simple example of injecting and executing code.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black font-sans text-gray-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-4 flex justify-end">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-500"
          >
            Back
          </Link>
        </div>
        <article
          key={project.id || project.title}
          className="group mb-8 transform-gpu rounded-2xl bg-gray-800/40 p-5 shadow-sm transition-shadow duration-200"
        >
          {/* Image / placeholder */}
          <div className="mb-4 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-700">
            {project.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
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
          </div>
        </article>

        <VideoGallery videos={videos} />
      </div>
    </div>
  );
}
