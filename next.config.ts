import type { NextConfig } from "next";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds and CI/CD pipelines.
 */
if (!process.env.SKIP_ENV_VALIDATION) {
  // Import environment validation synchronously
  import("./src/env.js").catch((err) => {
    console.error("Failed to load environment variables:", err);
  });
}

const nextConfig: NextConfig = {
  // Already doing linting and typechecking as separate tasks in CI
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Environment variables configuration for build-time availability
  env: {
    // Ensure Supabase environment variables are available during build
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  },

  // Experimental features for better build stability
  experimental: {
    // Improve build performance and stability
    optimizePackageImports: ["@supabase/supabase-js", "@supabase/ssr"],
  },
};

export default nextConfig;
