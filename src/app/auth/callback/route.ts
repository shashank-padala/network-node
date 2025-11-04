import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(`${origin}/?error=auth_failed`);
    }
  }

  // Redirect to dashboard - middleware will handle profile check
  return NextResponse.redirect(`${origin}/dashboard`, {
    status: 303, // Use 303 See Other for redirects after POST-like operations
  });
}

