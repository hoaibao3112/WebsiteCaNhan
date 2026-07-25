/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Supabase storage
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      // Unsplash (stock photos for blog content)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      // Pexels
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      // Cloudinary (popular image CDN)
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
      // Imgur
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      // Google user content / workspace
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      // WordPress / common blog CDNs
      {
        protocol: 'https',
        hostname: '*.wp.com',
      },
      // Picsum (placeholder)
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      // GitHub raw content
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/du-an',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/dich-vu',
        permanent: true,
      },
      {
        source: '/process',
        destination: '/quy-trinh',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/quy-trinh#contact',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
