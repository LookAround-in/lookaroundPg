/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Enable standalone output for Docker optimization
  output: 'standalone',
}

export default nextConfig 