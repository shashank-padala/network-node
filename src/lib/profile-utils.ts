import { createClient } from "@/lib/supabase/client";

export interface ProfileCompletionStatus {
  isComplete: boolean;
  missingFields: string[];
}

/**
 * Check if a user's profile is complete
 * Required fields: name, skills, discord_username, open_to_collaborate, open_to_jobs, hiring_talent
 */
export async function checkProfileCompletion(userId: string): Promise<ProfileCompletionStatus> {
  const supabase = createClient();
  
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("name, skills, discord_username, open_to_collaborate, open_to_jobs, hiring_talent")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    return {
      isComplete: false,
      missingFields: ["name", "skills", "discord_username", "open_to_collaborate", "open_to_jobs", "hiring_talent"],
    };
  }

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
  // These fields are boolean, so we just check they're not null
  if (profile.open_to_collaborate === null || profile.open_to_collaborate === undefined) {
    missingFields.push("open_to_collaborate");
  }
  if (profile.open_to_jobs === null || profile.open_to_jobs === undefined) {
    missingFields.push("open_to_jobs");
  }
  if (profile.hiring_talent === null || profile.hiring_talent === undefined) {
    missingFields.push("hiring_talent");
  }

  return {
    isComplete: missingFields.length === 0,
    missingFields,
  };
}

