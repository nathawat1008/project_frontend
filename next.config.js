/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['http://localhost:8000/'],
  },
  basePath: '/gh-pages-test',
}

module.exports = nextConfig
