import { type SupabaseClient, createClient } from "@supabase/supabase-js";

// Singleton instance
let supabaseInstance: SupabaseClient | null = null;

import { createSafeUrl } from "./url-utils";

// Safe environment variable access with fallbacks
function getSupabaseConfig() {
  // Try to get from process.env first (available during build)
  const urlStr = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Validate the URL to make sure it's a proper URL before using
  const isValidUrl = urlStr && createSafeUrl(urlStr) !== null;

  // Fallback to empty strings for build time (prevents errors)
  return {
    url: isValidUrl ? urlStr : "",
    anonKey: anonKey || "",
  };
}

// Lazy initialization function
function createSupabaseClient(): SupabaseClient {
  const { url, anonKey } = getSupabaseConfig();

  // During build time, return a mock client if env vars are missing
  if (!url || !anonKey) {
    console.warn(
      "Supabase environment variables not available, using mock client",
    );
    // Return a minimal mock client for build time
    return {
      auth: {
        getSession: () =>
          Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () =>
          Promise.resolve({
            data: null,
            error: null, // Return null for error as per feedback
          }),
        signUp: () =>
          Promise.resolve({
            data: null,
            error: null, // Return null for error as per feedback
          }),
        signOut: () => Promise.resolve({ error: null }),
      },
      storage: {
        from: () => ({
          upload: () =>
            Promise.resolve({
              data: null,
              error: null, // Return null for error as per feedback
            }),
          download: () =>
            Promise.resolve({
              data: null,
              error: null, // Return null for error as per feedback
            }),
          list: () =>
            Promise.resolve({
              data: null,
              error: null, // Return null for error as per feedback
            }),
          remove: () =>
            Promise.resolve({
              data: null,
              error: null, // Return null for error as per feedback
            }),
        }),
      },
      channel: () =>
        ({
          on: () => ({ subscribe: () => {} }),
          // biome-ignore lint/suspicious/noExplicitAny: Mock implementation
        }) as any,
      // biome-ignore lint/suspicious/noExplicitAny: Mock implementation
      removeChannel: (() => {}) as any,
    } as unknown as SupabaseClient; // Use unknown for a more explicit cast
  }

  return createClient(url, anonKey);
}

// Export getter function instead of direct instance
export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient();
  }
  return supabaseInstance;
}

// Export default instance for backward compatibility
export const supabase = getSupabase();
