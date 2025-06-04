import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Singleton instance
let supabaseInstance: SupabaseClient | null = null;

// Safe environment variable access with fallbacks
function getSupabaseConfig() {
  // Try to get from process.env first (available during build)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // Fallback to empty strings for build time (prevents errors)
  return {
    url: url || "",
    anonKey: anonKey || "",
  };
}

// Lazy initialization function
function createSupabaseClient(): SupabaseClient {
  const { url, anonKey } = getSupabaseConfig();
  
  // During build time, return a mock client if env vars are missing
  if (!url || !anonKey) {
    console.warn("Supabase environment variables not available, using mock client");
    // Return a minimal mock client for build time
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        signUp: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        signOut: () => Promise.resolve({ error: null }),
      },
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
          download: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
          list: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
          remove: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        }),
      },
      channel: () => ({
        on: () => ({ subscribe: () => {} }),
      }),
      removeChannel: () => {},
    } as any;
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
