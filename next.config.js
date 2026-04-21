/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  compress: true,
  productionBrowserSourceMaps: false,

  // We serve no <Image /> remote sources right now — tighten the allowlist.
  // Revisit if/when we embed remote images in guides.
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },

  // Keep response surface small.
  eslint: {
    // CI covers linting; the Vercel build should not block on warnings.
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  webpack: (config, { isServer }) => {
    // pdfjs-dist references the Node-only `canvas` package. We only load it
    // via dynamic import on the client, so stub it out everywhere.
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      canvas: false,
    };
    // heic2any pulls in `fs` when bundled server-side. It's a client-only
    // dynamic import, but the bundler analysis still walks the graph.
    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
