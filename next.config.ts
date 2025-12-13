import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // STORE API KEY
    API_KEY: process.env.API_KEY,
    // SHIPPING FREE LIMIT
    MIN_AMOUNT_FOR_FREE_SHIPPING: process.env.MIN_AMOUNT_FOR_FREE_SHIPPING,
    // BACKEND URL
    BACKEND: process.env.BACKEND,
    // BACKBLAZE
    BACKBLAZE_URL: process.env.BACKBLAZE_URL,
    // FRONTEND URL
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    // AUTHENTICATION
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    // ELFSIGHT
    ELFSIGHT_WIDGET_ID: process.env.ELFSIGHT_WIDGET_ID,
    // COMPANY NAME
    STORE_NAME: process.env.STORE_NAME,
    // FIREBASE
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
    

  async headers() {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
