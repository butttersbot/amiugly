import type { NextConfig } from 'next'

const nextConfig: NextConfig = {

  // sharp has native bindings that Next.js can't bundle. nsfwjs ships a model
  // bundle that's pointless to webpack-process. Mark them external so they
  // load at runtime instead.
  serverExternalPackages: ['sharp', 'nsfwjs'],

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.amiugly.lol' }],
        destination: 'https://amiugly.lol/:path*',
        permanent: true,
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
