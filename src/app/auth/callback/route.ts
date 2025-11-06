import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (!code) {
    // No code provided, redirect to home
    return NextResponse.redirect(`${origin}/`);
  }

  const supabase = await createClient();
  const { error, data } = await supabase.auth.exchangeCodeForSession(code);
  
  if (error) {
    console.error("Error exchanging code for session:", error);
    return NextResponse.redirect(`${origin}/?error=auth_failed`);
  }

  // Check if profile is complete
  const userId = data.user?.id;
  if (userId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("name, skills, discord_username, open_to_collaborate, open_to_jobs, hiring_talent")
      .eq("id", userId)
      .single();

    if (profile) {
      const missingFields: string[] = [];
      if (!profile.name || profile.name.trim() === "") {
        missingFields.push("name");
      }
      if (!profile.skills || profile.skills.length === 0) {
        missingFields.push("skills");
      }
      if (!profile.discord_username || profile.discord_username.trim() === "") {
        missingFields.push("discord_username");
      }
      if (profile.open_to_collaborate === null || profile.open_to_collaborate === undefined) {
        missingFields.push("open_to_collaborate");
      }
      if (profile.open_to_jobs === null || profile.open_to_jobs === undefined) {
        missingFields.push("open_to_jobs");
      }
      if (profile.hiring_talent === null || profile.hiring_talent === undefined) {
        missingFields.push("hiring_talent");
      }

      // If profile is complete, redirect to members page
      if (missingFields.length === 0) {
        return NextResponse.redirect(`${origin}/dashboard/members`, {
          status: 303,
        });
      }
    }
  }

  // Redirect to profile page for onboarding - cookies are already set by exchangeCodeForSession
  // Middleware is excluded from this route to prevent cookie header size issues
  return NextResponse.redirect(`${origin}/dashboard/profile`, {
    status: 303, // Use 303 See Other for redirects after POST-like operations
  });
}

