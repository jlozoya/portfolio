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
    'Architect is a production-grade Chrome extension designed to capture, interpret, and transform real user interactions into a structured, replayable automation script. It works across any web page regardless of DOM structure using a deep event-tracking system that supports complex workflows and captures clicks, typing, scrolls, drags, navigation, uploads, downloads, and more. Each interaction is normalized into high-level actions that can be replayed, edited, or consumed by an automation engine or AI system, making it easy to convert real user behavior into reliable end-to-end tests and reusable automation flows.',
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
    {
      title: 'Advanced Verification',
      src: '/assets/videos/projects/architect-advanced-verification.webm',
      description:
        'Architect can capture and verify all the properties of a selected element, or mark it for visual AI validation.',
    },
  ];

  const eventGroups = [
    {
      title: 'Mouse & Pointer',
      items: [
        'Click',
        'PointerDown',
        'PointerUp',
        'MouseDown',
        'MouseUp',
        'MouseOver',
        'MouseOut',
        'MouseEnter',
        'MouseMove',
        'PointerMove',
      ],
    },
    {
      title: 'Keyboard & Input',
      items: ['KeyDown', 'KeyUp', 'Input', 'Focus'],
    },
    {
      title: 'Touch & Gestures',
      items: ['TouchMove'],
    },
    {
      title: 'Drag & Drop',
      items: ['DragStart', 'DragOver', 'DragEnter', 'DragLeave', 'DragDrop', 'DragEnd'],
    },
    {
      title: 'Scroll & Navigation',
      items: ['Scroll', 'ContextMenu'],
    },
    {
      title: 'Browser / System',
      items: ['FullscreenChange', 'BeforePrint', 'AfterPrint', 'WindowResize', 'Message'],
    },
    {
      title: 'Window-level',
      items: ['Click (window)', 'MouseUp (window)', 'PointerUp (window)'],
    },
  ];

  const actionGroups = [
    {
      title: 'Flow Control & Navigation',
      items: ['Navigate', 'Scroll', 'Wait', 'Loops', 'Conditionals'],
    },
    {
      title: 'Page Modeling & Data',
      items: [
        'PageObjects',
        'PageVariables',
        'Variables',
        'TestVariable',
        'HTMLStorage',
        'CookiesStorage',
        'DB',
        'API Calls',
      ],
    },
    {
      title: 'Communication & Identity',
      items: ['Email', 'SMS', 'Signature'],
    },
    {
      title: 'Visual & Verification',
      items: ['FullPageCV', 'VisPageChk', 'MouseMove', 'Keypress'],
    },
    {
      title: 'Files & Advanced',
      items: ['CustomCode', 'FileViewer', 'Uploads', 'Downloads', 'AddNote', 'GenerateData'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black font-sans text-gray-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Back Button */}
        <div className="mb-4 flex justify-end">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-500"
          >
            Back
          </Link>
        </div>

        {/* Project Card */}
        <article className="group mb-8 transform-gpu rounded-2xl bg-gray-800/40 p-5 shadow-sm transition-shadow duration-200">
          {/* Image */}
          <div className="mb-4 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-700">
            {project.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            ) : (
              <div className="text-sm text-gray-300/80">No preview</div>
            )}
          </div>

          {/* Title */}
          <h4 className="mb-1 text-xl font-semibold text-gray-100">{project.title}</h4>

          {project.company && (
            <p className="mb-3 text-xs tracking-wide text-gray-400 uppercase">{project.company}</p>
          )}

          {/* Description */}
          <p className="mb-6 text-sm leading-relaxed text-gray-300">{project.description}</p>

          {/* Structured Sections */}
          <section className="mb-6 grid gap-6 md:grid-cols-2">
            {/* Event coverage */}
            <div>
              <h5 className="mb-2 text-sm font-semibold text-gray-100">Event Coverage</h5>
              <div className="space-y-2 text-xs text-gray-300">
                {eventGroups.map((group) => (
                  <div key={group.title}>
                    <p className="font-medium text-gray-200">{group.title}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-gray-600/70 bg-gray-800/60 px-2 py-0.5 text-[11px]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Automation actions */}
            <div>
              <h5 className="mb-2 text-sm font-semibold text-gray-100">Automation Actions</h5>
              <div className="space-y-2 text-xs text-gray-300">
                {actionGroups.map((group) => (
                  <div key={group.title}>
                    <p className="font-medium text-gray-200">{group.title}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-indigo-600/60 bg-indigo-900/20 px-2 py-0.5 text-[11px]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tags */}
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

          {/* Actions */}
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

        {/* Videos */}
        <VideoGallery videos={videos} />
      </div>
    </div>
  );
}
