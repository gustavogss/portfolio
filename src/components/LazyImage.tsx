import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export function LazyImage({ src, alt, className, ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, load the image immediately
    if (!window.IntersectionObserver) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before the image enters the viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden w-full h-full bg-slate-800/50 ${className || ''}`}
    >
      {/* Loading indicator / Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 animate-pulse">
          <div className="w-8 h-8 rounded-full border-2 border-brand-primary/20 border-t-brand-primary animate-spin" />
        </div>
      )}

      {/* Actual Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
            isLoaded 
              ? 'opacity-100 scale-100 blur-0' 
              : 'opacity-0 scale-105 blur-md'
          }`}
          {...props}
        />
      )}
    </div>
  );
}
