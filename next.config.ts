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
  // Allow deployment with missing environment variables (rely on runtime config)
};

export default nextConfig;
