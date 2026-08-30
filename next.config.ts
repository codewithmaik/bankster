import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root — there is an unrelated lockfile in a parent dir.
  turbopack: { root: __dirname },
  async redirects() {
    // Keep the old static-site URLs working.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/pricing.html", destination: "/pricing", permanent: true },
      { source: "/signup.html", destination: "/signup", permanent: true },
      { source: "/impressum.html", destination: "/impressum", permanent: true },
    ];
  },
};

export default nextConfig;
