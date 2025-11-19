"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Mail,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  Phone,
} from "lucide-react";
import {
  FaWhatsapp,
  FaDiscord,
  FaLinkedin,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

interface Profile {
  id: string;
  name: string;
  email: string;
  photo_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  github_url: string | null;
  calendly_url: string | null;
  whatsapp_country_code: string | null;
  whatsapp_number: string | null;
  discord_username: string | null;
}

interface ContactDialogProps {
  profile: Profile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDialog({ profile, open, onOpenChange }: ContactDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!profile) return null;

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleWhatsAppClick = () => {
    if (profile.whatsapp_country_code && profile.whatsapp_number) {
      const cleanNumber = profile.whatsapp_number.replace(/\D/g, "");
      const whatsappUrl = `https://wa.me/${profile.whatsapp_country_code.replace(/\D/g, "")}${cleanNumber}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const hasAnyContact = 
    profile.email ||
    profile.calendly_url ||
    profile.linkedin_url ||
    profile.twitter_url ||
    profile.github_url ||
    (profile.whatsapp_country_code && profile.whatsapp_number) ||
    profile.discord_username;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Contact {profile.name}
          </DialogTitle>
          <DialogDescription>
            Choose how you'd like to reach out
          </DialogDescription>
        </DialogHeader>

        {!hasAnyContact ? (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">
              No contact information available
            </p>
          </div>
        ) : (
          <div className="space-y-2 py-2">
            {/* Email */}
            {profile.email && (
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3 px-4 hover:bg-blue-50 hover:border-blue-200"
                asChild
              >
                <a href={`mailto:${profile.email}`}>
                  <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-medium text-sm">Email</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {profile.email}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </a>
              </Button>
            )}

            {/* Calendly */}
            {profile.calendly_url && (
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3 px-4 hover:bg-purple-50 hover:border-purple-200"
                onClick={() => window.open(profile.calendly_url!, "_blank")}
              >
                <Calendar className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">Book a Meeting</div>
                  <div className="text-xs text-muted-foreground">
                    Schedule time via Calendly
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </Button>
            )}

            {/* WhatsApp */}
            {profile.whatsapp_country_code && profile.whatsapp_number && (
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3 px-4 hover:bg-green-50 hover:border-green-200"
                onClick={handleWhatsAppClick}
              >
                <FaWhatsapp className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">WhatsApp</div>
                  <div className="text-xs text-muted-foreground">
                    Send a message
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </Button>
            )}

            {/* Discord */}
            {profile.discord_username && (
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3 px-4 hover:bg-indigo-50 hover:border-indigo-200"
                onClick={() => handleCopy(profile.discord_username!, "discord")}
              >
                <FaDiscord className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">Discord</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {profile.discord_username}
                  </div>
                </div>
                {copiedField === "discord" ? (
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </Button>
            )}

            {/* LinkedIn */}
            {profile.linkedin_url && (
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3 px-4 hover:bg-blue-50 hover:border-blue-200"
                asChild
              >
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">LinkedIn</div>
                    <div className="text-xs text-muted-foreground">
                      View profile
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </a>
              </Button>
            )}

            {/* Twitter/X */}
            {profile.twitter_url && (
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3 px-4 hover:bg-sky-50 hover:border-sky-200"
                asChild
              >
                <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="h-5 w-5 text-sky-500 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">Twitter / X</div>
                    <div className="text-xs text-muted-foreground">
                      View profile
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </a>
              </Button>
            )}

            {/* GitHub */}
            {profile.github_url && (
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3 px-4 hover:bg-gray-50 hover:border-gray-200"
                asChild
              >
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="h-5 w-5 text-gray-900 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">GitHub</div>
                    <div className="text-xs text-muted-foreground">
                      View profile
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </a>
              </Button>
            )}
          </div>
        )}

        {copiedField && (
          <div className="mt-2 text-xs text-green-600 text-center animate-in fade-in">
            Copied to clipboard!
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

