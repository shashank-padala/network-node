import { createClient } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Skip middleware for auth callback to avoid cookie header size issues
  // The callback route handles its own cookie setting via exchangeCodeForSession
  if (request.nextUrl.pathname === "/auth/callback") {
    return NextResponse.next();
  }

  const { supabase, response } = createClient(request);

  // Refresh session if expired - this will update the response cookies
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!user) {
      // Redirect to home page - user can click login/join buttons
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Return response with updated cookies
  return response;
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

