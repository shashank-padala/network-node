"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Loader2, 
  User, 
  Calendar, 
  MessageCircle,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { MeetingRequestModal } from "@/components/MeetingRequestModal";

interface Profile {
  id: string;
  name: string;
  email: string;
  photo_url: string | null;
  bio: string | null;
  skills: string[];
  linkedin_url: string | null;
  twitter_url: string | null;
  github_url: string | null;
  calendly_url: string | null;
  whatsapp_country_code: string | null;
  whatsapp_number: string | null;
  discord_username: string | null;
}

export default function MembersPage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("name", { ascending: true });

        if (error) {
          console.error("Error fetching profiles:", error);
          return;
        }

        setProfiles(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, [supabase]);

  const filteredProfiles = useMemo(() => {
    if (!searchQuery.trim()) return profiles;

    const query = searchQuery.toLowerCase();
    return profiles.filter((profile) => {
      const nameMatch = profile.name.toLowerCase().includes(query);
      const bioMatch = profile.bio?.toLowerCase().includes(query);
      const skillsMatch = profile.skills.some((skill) =>
        skill.toLowerCase().includes(query)
      );
      return nameMatch || bioMatch || skillsMatch;
    });
  }, [profiles, searchQuery]);

  const handleDiscordClick = (username: string) => {
    // Copy Discord username to clipboard
    navigator.clipboard.writeText(username);
    // Show a simple notification (you could enhance this with a toast)
    alert(`Discord username "${username}" copied to clipboard!`);
  };

  const handleWhatsAppClick = (countryCode: string, number: string) => {
    const cleanNumber = number.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${countryCode.replace(/\D/g, "")}${cleanNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Member Directory</h1>
        <p className="text-muted-foreground">
          Discover who&apos;s building around you at Network School
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, skills, or interests..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredProfiles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery ? "No members found matching your search." : "No members found."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProfiles.map((profile) => (
            <Card key={profile.id} className="rounded-lg">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  {/* Profile Photo */}
                  <div className="flex-shrink-0">
                    {profile.photo_url ? (
                      <img
                        src={profile.photo_url}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shadow-sm">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {profile.name}
                        </h3>
                        {profile.bio && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {profile.bio}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Skills */}
                    {profile.skills && profile.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {profile.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Social Links */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {profile.linkedin_url && (
                        <a
                          href={profile.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {profile.twitter_url && (
                        <a
                          href={profile.twitter_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Twitter/X"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {profile.github_url && (
                        <a
                          href={profile.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                          title="GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {profile.email && (
                        <a
                          href={`mailto:${profile.email}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                      {profile.discord_username && (
                        <button
                          onClick={() => handleDiscordClick(profile.discord_username!)}
                          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title={`Discord: ${profile.discord_username}`}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      )}
                      {profile.whatsapp_country_code && profile.whatsapp_number && (
                        <button
                          onClick={() => handleWhatsAppClick(profile.whatsapp_country_code!, profile.whatsapp_number!)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="WhatsApp"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      {user && user.id !== profile.id ? (
                        <>
                          {profile.calendly_url && (
                            <MeetingRequestModal
                              recipientId={profile.id}
                              recipientName={profile.name}
                              recipientCalendly={profile.calendly_url}
                              trigger={
                                <Button variant="outline" size="sm" className="gap-2">
                                  <Calendar className="w-4 h-4" />
                                  Book Call
                                </Button>
                              }
                            />
                          )}
                        </>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          Your Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
