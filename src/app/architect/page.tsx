import VideoGallery from "../views/VideoGallery";
import Link from "next/link";

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
  title: "Architect — Interaction Recorder",
  company: "Functionize",
  description: "Chrome extension that records user interactions (clicks, typing, drags, navigation, downloads, uploads, custom js injections, etc...) into a structured list for automation.",
  tags: ["Chrome Extension", "JavaScript", "Redux", "Automation", "Tailwind"],
  image: "/assets/img/projects/architect-simple-loop.png",
  details: "/architect",
  url: "https://chromewebstore.google.com/detail/functionize-architect/iojgmnipokofkeihgnlhmmmchpfchonk?hl=en",
};

export default function Architect() {
  const videos = [
    {
      title: "Simple Loop",
      src: "/assets/videos/projects/architect-simple-loop.webm",
      description: "Recording a simple example, performing a Google search and adding a loop.",
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-100 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-end mb-4">
          <Link href="/" className="text-sm inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-500 rounded-md text-white font-medium transition">
            Back
          </Link>
        </div>
        <article
          key={project.id || project.title}
          className="group bg-gray-800/40 rounded-2xl p-5 transform-gpu transition-shadow duration-200 shadow-sm mb-8"
        >
          {/* Image / placeholder */}
          <div className="w-full overflow-hidden rounded-lg mb-4 bg-gray-700 flex items-center justify-center">
            {project.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="text-sm text-gray-300/80">No preview</div>
            )}
          </div>

          {/* Title & description */}
          <h4 className="text-lg font-semibold text-gray-100 mb-2">{project.title}</h4>
          
          {project.company && (
            <p className="text-sm text-gray-300 mb-3 leading-relaxed">
              {project.company}
            </p>
          )}

          <p className="text-sm text-gray-300 mb-3 leading-relaxed">
            {project.description}
          </p>

          {/* tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-gray-700/60 border border-gray-600 text-gray-200"
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
                className="text-sm inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-medium transition"
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
