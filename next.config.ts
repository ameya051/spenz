const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com', 'avatar.vercel.sh']
  },
  async rewrites() {
    console.log(BASE_API);
    return [
      {
        source: '/api/:path*',
        destination: `${BASE_API}/api/:path*`
      }
    ]
  }
};

export default nextConfig;
