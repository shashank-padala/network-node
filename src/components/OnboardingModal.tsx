"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { FaWhatsapp, FaDiscord } from "react-icons/fa";
import { CountryCodeSelect } from "@/components/ui/country-code-select";
import { checkProfileCompletion } from "@/lib/profile-utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
};

export default function OnboardingModal({ open, onOpenChange, userId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappCountryCode, setWhatsappCountryCode] = useState("+91");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [discord, setDiscord] = useState("");
  const supabase = createClient();

  useEffect(() => {
    if (open) {
      // Load existing data if available
      async function loadProfile() {
        const { data } = await supabase
          .from("profiles")
          .select("whatsapp_country_code, whatsapp_number, discord_username")
          .eq("id", userId)
          .single();

        if (data) {
          setWhatsappCountryCode(data.whatsapp_country_code || "+91");
          setWhatsappNumber(data.whatsapp_number || "");
          setDiscord(data.discord_username || "");
        }
      }
      loadProfile();
    }
  }, [open, userId, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate
    if (!whatsappNumber.trim()) {
      setError("WhatsApp number is required");
      setLoading(false);
      return;
    }
    if (!discord.trim()) {
      setError("Discord username is required");
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          whatsapp_country_code: whatsappCountryCode,
          whatsapp_number: whatsappNumber.trim(),
          discord_username: discord.trim(),
        })
        .eq("id", userId);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      // Verify completion and close modal
      const completionStatus = await checkProfileCompletion(userId);
      if (completionStatus.isComplete) {
        onOpenChange(false);
        // Refresh the page to update UI
        window.location.reload();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md">
        <DialogHeader className="text-center pb-0">
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Complete Your Profile
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Just two quick fields to get started. You can add more details later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm">
              {error}
            </div>
          )}

          {/* WhatsApp */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaWhatsapp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
              WhatsApp Number *
            </label>
            <div className="flex gap-2 sm:gap-3 items-center">
              <CountryCodeSelect
                value={whatsappCountryCode}
                onValueChange={setWhatsappCountryCode}
                disabled={loading}
              />
              <Input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="Phone number"
                disabled={loading}
                required
                className="flex-1 h-10 sm:h-11 text-sm sm:text-base border-gray-200 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Discord */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FaDiscord className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600" />
              Discord Username *
            </label>
            <Input
              type="text"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              placeholder="username#1234"
              disabled={loading}
              required
              className="h-10 sm:h-11 text-sm sm:text-base border-gray-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-10 sm:h-11 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-sm sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Continue"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            You can update your profile anytime from the Profile settings
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

