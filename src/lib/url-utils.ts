/**
 * Utility functions for safe URL handling to prevent build errors
 */

/**
 * Creates a URL safely with fallbacks to prevent Invalid URL errors during build
 *
 * @param path The path or full URL
 * @param base Optional base URL to use if path is relative
 * @returns A valid URL object or null if creation fails
 */
export function createSafeUrl(path: string, base?: string): URL | null {
  try {
    // If path is already a valid absolute URL, use it directly
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return new URL(path);
    }

    // If we have a base, try to combine with path
    if (base) {
      // Ensure base is a valid URL with http/https
      const safeBase = base.startsWith("http") ? base : `https://${base}`;

      return new URL(path, safeBase);
    }

    // For relative URLs without a base, use a default base
    const defaultBase =
      process.env.NEXT_PUBLIC_SITE_URL || "https://tablecn.com";
    return new URL(path, defaultBase);
  } catch (e) {
    console.warn(`Invalid URL creation attempt: ${path}`, e);
    return null;
  }
}

/**
 * Gets a URL string safely, with fallback value if creation fails
 *
 * @param path The path or full URL
 * @param base Optional base URL to use if path is relative
 * @param fallback Fallback value to use if URL creation fails
 * @returns A valid URL string or the fallback
 */
export function getSafeUrlString(
  path: string,
  base?: string,
  fallback = "https://tablecn.com",
): string {
  const url = createSafeUrl(path, base);
  return url?.toString() || fallback;
}
