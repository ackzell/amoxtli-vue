import React from 'react';

interface YouTubeLinkProps {
  /** YouTube video ID (e.g., 'p2P3z7p_zTI') */
  id: string;
  /** Video title */
  title: string;
  /** Video description (optional) */
  description?: string;
  /** Video duration (optional, e.g., '25 min') */
  duration?: string;
  /** Custom className for styling overrides */
  className?: string;
}

export default function YouTubeLink({ 
  id, 
  title, 
  description, 
  duration, 
  className = '' 
}: YouTubeLinkProps) {
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;
  
  return (
    <>
    <div className={`
      flex items-center gap-4
      bg-gray-100 dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      rounded-lg 
      p-6
      my-4 
      hover:shadow-md
      transition-all duration-200 
      max-w-2xl
      ${className}
    `}>
      <div className="text-2xl mr-3 flex-shrink-0">🎥</div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight mb-1">
          {title}
        </h4>
        
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-xs leading-snug mb-2 line-clamp-2" title={description}>
            {description}
          </p>
        )}
      </div>

     
       <div className="flex-2">
            <a 
          href={videoUrl}
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
            no-underline decoration-none!
            transition-colors duration-200
            visited:text-white
          "
        >
          Watch
          {duration && (
            <span className="ml-1 text-red-200">({duration})</span>
          )}
        </a>
        </div>
    </div>

   
        </>
  );
}