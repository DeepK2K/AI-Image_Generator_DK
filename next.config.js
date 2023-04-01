/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'links.papareact.com',
      "aiimagegeneratordk543894.blob.core.windows.net"
    ],
  },
}

module.exports = nextConfig
