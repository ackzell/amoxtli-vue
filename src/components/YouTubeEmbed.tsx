interface VideoEmbedProps {
  /** Video ID for YouTube */
  id: string;
  /** Video title */
  title: string;
  /** Optional duration */
  duration?: string;
  /** Additional styling */
  className?: string;
  children?: React.ReactNode;
}
export default function YouTubeEmbed(props: VideoEmbedProps) {
  // YouTube embed URL
  const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${props.id}`;
  let canEmbed = false;

  if (typeof HTMLIFrameElement !== 'undefined') {
    canEmbed = 'credentialless' in HTMLIFrameElement.prototype;
  }
  if (canEmbed) {
    // Render embedded video
    return (
      <iframe
        width="560"
        height="315"
        src={youtubeEmbedUrl}
        title={props.title}
        allowFullScreen
        loading="lazy"
        // @ts-expect-error
        credentialless="true"
        style={{
          borderRadius: '8px',
          width: '100%',
          maxWidth: '560px',
          height: '315px',
        }}
      />
    );
  }

  // Fallback card
  const link = `https://www.youtube.com/watch?v=${props.id}`;

  return (
    <div
      className={`
      flex items-center gap-4
      bg-gray-100 dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      rounded-lg 
      p-6
      my-4 
      hover:shadow-md
      transition-all duration-200 
      max-w-2xl
      ${props.className}`}
    >
      <div className="text-2xl mr-3 flex-shrink-0">🎥</div>
      <div className="flex-1 min-w-0">
        <h4
          className="
          font-semibold 
          text-gray-900 dark:text-gray-100 
          text-sm 
          leading-tight mb-1"
        >
          {props.title}
        </h4>

        <p
          className="
          text-gray-600 dark:text-gray-400 text-xs 
          leading-snug mb-2 line-clamp-2
          "
        >
          {props.children || 'description goes here'}
        </p>
      </div>
      <div className="flex-2">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center
            bg-red-600 hover:bg-red-700
            text-white 
            font-medium
            text-xs
            px-3 py-1.5
            rounded
            no-underline
            transition-colors duration-200
            visited:text-red-300
            visited:bg-red-8
          "
        >
          <span className="text-white">Watch</span>
          {props.duration && (
            <span className="ml-1 text-red-200">({props.duration})</span>
          )}
        </a>
      </div>
    </div>
  );
}
