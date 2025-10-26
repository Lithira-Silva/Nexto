/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Performance optimizations for faster compilation
  swcMinify: true,
  productionBrowserSourceMaps: false,
  
  // Webpack optimizations
  webpack: (config, { dev }) => {
    if (dev) {
      // Faster development builds
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            email: {
              name: 'email',
              test: /[\\/]node_modules[\\/](resend|@react-email)[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }
    return config
  },
}

module.exports = nextConfig
