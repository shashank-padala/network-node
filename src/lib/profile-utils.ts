import { createClient } from "@/lib/supabase/client";

export interface ProfileCompletionStatus {
  isComplete: boolean;
  missingFields: string[];
}

/**
 * Check if a user's profile is complete
 * Required fields: whatsapp_number, discord_username
 */
export async function checkProfileCompletion(userId: string): Promise<ProfileCompletionStatus> {
  const supabase = createClient();
  
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("whatsapp_country_code, whatsapp_number, discord_username")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    return {
      isComplete: false,
      missingFields: ["whatsapp_number", "discord_username"],
    };
  }

  const missingFields: string[] = [];
  if (!profile.whatsapp_number || profile.whatsapp_number.trim() === "") {
    missingFields.push("whatsapp_number");
  }
  if (!profile.discord_username || profile.discord_username.trim() === "") {
    missingFields.push("discord_username");
  }

  return {
    isComplete: missingFields.length === 0,
    missingFields,
  };
}

