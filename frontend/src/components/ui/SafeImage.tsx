'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackClassName?: string;
  fallbackIcon?: React.ReactNode;
}

/**
 * SafeImage — wraps Next.js Image with automatic fallback image
 * when the primary image URL fails to load (404, blocked domain, empty, etc.)
 */
export default function SafeImage({
  src,
  alt,
  fallbackSrc = '/blogs/blog-1.png',
  fallbackClassName,
  fallbackIcon,
  className,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string | any>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (currentSrc !== fallbackSrc && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div
        className={
          fallbackClassName ||
          'absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#006672]/10 to-[#006672]/20 text-[#006672] border border-[#006672]/20'
        }
      >
        <Image
          src="/logo-kabo.jpg"
          alt="KABO Agency"
          fill
          className="object-cover opacity-80"
        />
      </div>
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt || 'KABO Agency Image'}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}
