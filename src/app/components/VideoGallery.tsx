type Video = {
  title: string;
  src: string;
  description?: string;
};

interface VideoGalleryProps {
  videos: Video[];
}

const VideoGallery = ({ videos }: VideoGalleryProps) => {
  // `videos` is an array of objects: { id, title, src }
  return (
    <section className="rounded-2xl bg-gray-900 py-10 text-gray-100">
      <h2 className="mb-8 text-center text-3xl font-bold">Project videos</h2>
      <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3">
        {videos.map((video, index) => (
          <div key={index} className="overflow-hidden rounded-lg bg-gray-800 shadow-lg">
            <video src={video.src} loop muted className="h-64 w-full object-cover" controls />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{video.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoGallery;
