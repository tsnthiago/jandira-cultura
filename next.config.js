// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Outras configurações podem ser adicionadas aqui
};

module.exports = nextConfig;
