import type { NextConfig } from 'next'

const nextConfig: NextConfig = {

  // tfjs-node has native bindings (node-pre-gyp) and transitive deps Next.js
  // can't bundle. Mark it external so it loads at runtime instead.
  serverExternalPackages: ['@tensorflow/tfjs-node', 'nsfwjs'],

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
