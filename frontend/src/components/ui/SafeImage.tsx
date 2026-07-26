'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackClassName?: string;
  fallbackIcon?: React.ReactNode;
}

/**
 * SafeImage — wraps Next.js Image with automatic fallback gradient
 * when the image URL fails to load (404, blocked domain, etc.)
 */
export default function SafeImage({
  src,
  alt,
  fallbackClassName,
  fallbackIcon,
  className,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={
          fallbackClassName ||
          'absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400 border border-slate-200/60'
        }
      >
        {fallbackIcon ?? <Sparkles className="size-8 text-slate-400/60" />}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
