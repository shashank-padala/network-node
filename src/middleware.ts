import { createClient } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Skip middleware for auth callback to avoid cookie header size issues
  // The callback route handles its own cookie setting via exchangeCodeForSession
  if (request.nextUrl.pathname === "/auth/callback") {
    return NextResponse.next();
  }

  let user = null;
  let response: NextResponse | null = null;
  
  try {
    const { supabase, response: supabaseResponse } = createClient(request);
    response = supabaseResponse;

    // Refresh session if expired - this will update the response cookies
    // Wrap in try-catch to handle network errors gracefully
    const {
      data: { user: fetchedUser },
      error,
    } = await supabase.auth.getUser();

    // Only use user if fetch was successful
    if (!error && fetchedUser) {
      user = fetchedUser;
    }

    // Protect dashboard routes only if we successfully fetched user data
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (!user) {
        // Redirect to home page - user can click login/join buttons
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Return response with updated cookies
    return response || NextResponse.next();
  } catch (error) {
    // If there's a network error or fetch fails, handle gracefully
    console.warn("Middleware auth check failed:", error);
    
    // For dashboard routes, redirect to home if we can't verify auth
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
    // For other routes, allow them to proceed
    return response || NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/callback (handled separately to avoid cookie header size issues)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
  // Suppress Turbopack middleware deprecation warning
  unstable_allowDynamic: ["/lib/supabase/middleware"],
};

