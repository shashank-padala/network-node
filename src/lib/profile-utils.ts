import { createClient } from "@/lib/supabase/client";

export interface ProfileCompletionStatus {
  isComplete: boolean;
  missingFields: string[];
}

/**
 * Check if a user's profile is complete
 * Required fields: name, bio, skills, discord_username
 */
export async function checkProfileCompletion(userId: string): Promise<ProfileCompletionStatus> {
  const supabase = createClient();
  
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("name, bio, skills, discord_username")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    return {
      isComplete: false,
      missingFields: ["name", "bio", "skills", "discord_username"],
    };
  }

  const missingFields: string[] = [];
  if (!profile.name || profile.name.trim() === "") {
    missingFields.push("name");
  }
  if (!profile.bio || profile.bio.trim() === "") {
    missingFields.push("bio");
  }
  if (!profile.skills || profile.skills.length === 0) {
    missingFields.push("skills");
  }
  if (!profile.discord_username || profile.discord_username.trim() === "") {
    missingFields.push("discord_username");
  }

  return {
    isComplete: missingFields.length === 0,
    missingFields,
  };
}

