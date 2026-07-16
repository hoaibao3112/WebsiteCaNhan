/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
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
