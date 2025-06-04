import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Initialize the response
  const res = NextResponse.next();

  // Get environment variables with fallbacks
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During build time or when env vars are missing, skip Supabase middleware
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase environment variables not available in middleware, skipping auth checks");
    return res;
  }

  try {
    // Create Supabase client for middleware
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({ name, value, ...options });
        },
        remove: (name, options) => {
          res.cookies.set({ name, value: "", ...options });
        },
      },
    });

    // Check if we have a session (with error handling)
    let session = null;
    try {
      const { data } = await supabase.auth.getSession();
      session = data.session;
    } catch (error) {
      console.warn("Failed to get session in middleware:", error);
      // Continue without session
    }

    // Define protected routes that require authentication
    const protectedRoutes: string[] = [
      // Add your protected routes here
      // Example: '/admin',
      // Example: '/dashboard',
    ];

    // Check if the path is a protected route
    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    );

    // If accessing a protected route without a session, redirect to login
    if (isProtectedRoute && !session) {
      // You can create a login page and redirect there
      // const redirectUrl = new URL('/login', request.url);
      // return NextResponse.redirect(redirectUrl);

      // For now, we'll just proceed as normal since we don't have a dedicated login page
      return res;
    }

    return res;
  } catch (error) {
    // If any error occurs in middleware, log it and continue
    console.warn("Error in Supabase middleware:", error);
    return res;
  }
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    "/((?!_next/static|_next/image|favicon.ico|site.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
