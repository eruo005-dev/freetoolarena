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

  // Headers for /embed/* — allow iframing from any origin. Vercel's
  // top-level vercel.json sets X-Frame-Options: SAMEORIGIN and CSP
  // frame-ancestors 'self' site-wide; this override replaces both for
  // embed routes so third-party sites can actually embed the widgets.
  //
  // Next.js headers() run BEFORE vercel.json, but Vercel also merges
  // site-wide headers. To actually defeat the site-wide SAMEORIGIN we
  // set X-Frame-Options to ALLOWALL (browsers ignore invalid values and
  // fall back to CSP) and set frame-ancestors * explicitly. Modern
  // browsers prefer CSP frame-ancestors over XFO when both are present.
  async headers() {
    return [
      {
        source: "/embed/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
