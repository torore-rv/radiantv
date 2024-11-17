/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // 추가
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig