"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, Calendar, Loader2 } from "lucide-react";
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <Card key={profile.id} className="rounded-2xl transition-smooth">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  {profile.photo_url ? (
                    <img
                      src={profile.photo_url}
                      alt={profile.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
                      {getInitials(profile.name)}
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg">{profile.name}</CardTitle>
                    <CardDescription>Builder</CardDescription>
                  </div>
                </div>
                {profile.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {profile.bio}
                  </p>
                )}
                {profile.skills && profile.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {profile.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {profile.skills.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-500/10 text-gray-500 border border-gray-500/20 shadow-sm">
                        +{profile.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {user && user.id !== profile.id ? (
                  <MeetingRequestModal
                    recipientId={profile.id}
                    recipientName={profile.name}
                    recipientCalendly={profile.calendly_url}
                  />
                ) : (
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Your Profile
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

