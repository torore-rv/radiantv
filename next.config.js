/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  exportPathMap: async function () {
    return {
      '/': { page: '/' }
    }
  },  // 여기 콤마 추가
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig