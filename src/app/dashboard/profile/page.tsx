"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { COUNTRY_CODES } from "@/constants/country-codes";

export default function ProfilePage() {
  const { user } = useAuth();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills: "",
    linkedin: "",
    twitter: "",
    github: "",
    calendly: "",
    whatsappCountryCode: "",
    whatsappNumber: "",
    discord: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      try {
        const { data, error: fetchError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (fetchError) {
          console.error("Error fetching profile:", fetchError);
          setError("Failed to load profile");
          return;
        }

        if (data) {
          setFormData({
            name: data.name || "",
            bio: data.bio || "",
            skills: data.skills?.join(", ") || "",
            linkedin: data.linkedin_url || "",
            twitter: data.twitter_url || "",
            github: data.github_url || "",
            calendly: data.calendly_url || "",
            whatsappCountryCode: data.whatsapp_country_code || "+91",
            whatsappNumber: data.whatsapp_number || "",
            discord: data.discord_username || "",
          });
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const skillsArray = formData.skills
        ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          name: formData.name,
          bio: formData.bio,
          skills: skillsArray,
          linkedin_url: formData.linkedin || null,
          twitter_url: formData.twitter || null,
          github_url: formData.github || null,
          calendly_url: formData.calendly || null,
          whatsapp_country_code: formData.whatsappCountryCode || null,
          whatsapp_number: formData.whatsappNumber || null,
          discord_username: formData.discord || null,
        })
        .eq("id", user.id);

      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile and preferences
        </p>
      </div>

      <Card className="rounded-2xl transition-smooth">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Edit Profile
          </CardTitle>
          <CardDescription>
            Update your information and showcase your skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Profile updated successfully!
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name *
              </label>
              <Input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={saving}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium">
                Bio *
              </label>
              <Textarea
                id="bio"
                name="bio"
                required
                value={formData.bio}
                onChange={handleChange}
                className="min-h-[100px]"
                disabled={saving}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="skills" className="text-sm font-medium">
                Skills (comma-separated)
              </label>
              <Input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, TypeScript, Design"
                disabled={saving}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="linkedin" className="text-sm font-medium">
                  LinkedIn
                </label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="twitter" className="text-sm font-medium">
                  Twitter/X
                </label>
                <Input
                  id="twitter"
                  name="twitter"
                  type="url"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/..."
                  disabled={saving}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="github" className="text-sm font-medium">
                GitHub
              </label>
              <Input
                id="github"
                name="github"
                type="url"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
                disabled={saving}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="calendly" className="text-sm font-medium">
                Calendly Link
              </label>
              <Input
                id="calendly"
                name="calendly"
                type="url"
                value={formData.calendly}
                onChange={handleChange}
                placeholder="https://calendly.com/..."
                disabled={saving}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="whatsappCountryCode" className="text-sm font-medium">
                  WhatsApp Country Code
                </label>
                <Select
                  value={formData.whatsappCountryCode}
                  onValueChange={(value) =>
                    setFormData({ ...formData, whatsappCountryCode: value })
                  }
                  disabled={saving}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select code" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_CODES.map((code) => (
                      <SelectItem key={code.value} value={code.value}>
                        {code.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="whatsappNumber" className="text-sm font-medium">
                  WhatsApp Number
                </label>
                <Input
                  id="whatsappNumber"
                  name="whatsappNumber"
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="1234567890"
                  disabled={saving}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="discord" className="text-sm font-medium">
                Discord Username
              </label>
              <Input
                id="discord"
                name="discord"
                type="text"
                value={formData.discord}
                onChange={handleChange}
                placeholder="username#1234"
                disabled={saving}
              />
            </div>

            <Button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

