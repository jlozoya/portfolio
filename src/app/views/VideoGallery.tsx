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
    <section className="py-10 bg-gray-900 text-gray-100 rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8">Project videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {videos.map((video, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <video
              src={video.src}
              loop
              muted
              className="w-full h-64 object-cover"
              controls
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoGallery;
