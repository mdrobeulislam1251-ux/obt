/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.GEMINI_API_KEY,
  },
  async rewrites() {
    const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    return [
      {
        source: '/api/customers/:path*',
        destination: `${backendBase.replace(/\/$/, '')}/api/customers/:path*`,
      },
    ];
  },
};
export default nextConfig;