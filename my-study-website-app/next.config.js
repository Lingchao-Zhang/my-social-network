/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com','t4.ftcdn.net'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 't4.ftcdn.net'
          }
        ]
      },
    experimental: {
      serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
    }
}

module.exports = nextConfig
