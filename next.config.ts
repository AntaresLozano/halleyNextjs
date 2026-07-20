import type { NextConfig } from "next";

function remotePatternsFromAssetsUrl(assetsUrl: string | undefined) {
  if (!assetsUrl) return [];

  try {
    const url = new URL(assetsUrl);
    return [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        ...(url.port ? { port: url.port } : {}),
        pathname: "/uploads/**" as const,
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cms.halleycinema.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.up.railway.app",
        pathname: "/uploads/**",
      },
      ...remotePatternsFromAssetsUrl(process.env.NEXT_PUBLIC_ASSETS),
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
