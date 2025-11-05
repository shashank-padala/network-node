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
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Loader2, 
  CheckCircle2, 
  Mail, 
  FileText, 
  Code, 
  MessageCircle,
  Calendar,
  Phone,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Save
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { COUNTRY_CODES } from "@/constants/country-codes";
import { SkillsInput } from "@/components/ui/skills-input";

export default function ProfilePage() {
  const { user } = useAuth();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: [] as string[],
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
            email: data.email || "",
            bio: data.bio || "",
            skills: data.skills || [],
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
      // Validate required fields
      if (!formData.name.trim()) {
        setError("Name is required");
        setSaving(false);
        return;
      }
      if (!formData.bio.trim()) {
        setError("Bio is required");
        setSaving(false);
        return;
      }
      if (formData.skills.length === 0) {
        setError("At least one skill is required");
        setSaving(false);
        return;
      }
      if (!formData.discord.trim()) {
        setError("Discord username is required");
        setSaving(false);
        return;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          name: formData.name,
          bio: formData.bio,
          skills: formData.skills,
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
      
      // Redirect to members page after successful profile completion
      setTimeout(() => {
        window.location.href = "/dashboard/members";
      }, 1500);
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
      {/* Header */}
      <div className="mb-8 text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full mb-4">
          <User className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Manage your profile and showcase your skills
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error/Success Messages */}
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

        {/* Required Fields Section */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              Required Information
            </CardTitle>
            <CardDescription className="text-base">
              Complete these fields to activate your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="Enter your full name"
                  className="h-11 border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="h-11 border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">
                  Email is synced from your account
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Bio *
              </label>
              <Textarea
                id="bio"
                name="bio"
                required
                value={formData.bio}
                onChange={handleChange}
                className="min-h-[120px] border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Tell us about yourself, what you're building, and what you're looking for..."
                disabled={saving}
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <label htmlFor="skills" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Code className="h-4 w-4" />
                Skills *
              </label>
              <SkillsInput
                skills={formData.skills}
                onChange={(skills) => setFormData({ ...formData, skills })}
                disabled={saving}
                placeholder="Type a skill and press Enter"
                required
              />
            </div>

            {/* Discord */}
            <div className="space-y-2">
              <label htmlFor="discord" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Discord Username *
              </label>
              <Input
                id="discord"
                name="discord"
                type="text"
                value={formData.discord}
                onChange={handleChange}
                placeholder="username#1234"
                disabled={saving}
                required
                className="h-11 border-gray-200 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Links Section */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="h-5 w-5 text-green-600" />
              </div>
              Professional Links
            </CardTitle>
            <CardDescription className="text-base">
              Connect your professional profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="linkedin" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
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
                  className="h-11 border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="twitter" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
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
                  className="h-11 border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="github" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Github className="h-4 w-4" />
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
                  className="h-11 border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information Section */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Phone className="h-5 w-5 text-purple-600" />
              </div>
              Contact Information
            </CardTitle>
            <CardDescription className="text-base">
              How others can reach you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="calendly" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
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
                className="h-11 border-gray-200 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                WhatsApp Number
              </label>
              <div className="flex gap-3 items-center">
                <Select
                  value={formData.whatsappCountryCode}
                  onValueChange={(value) =>
                    setFormData({ ...formData, whatsappCountryCode: value })
                  }
                  disabled={saving}
                >
                  <SelectTrigger className="w-[140px] h-11 border-gray-200 focus:ring-2 focus:ring-blue-500/20">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_CODES.map((code) => (
                      <SelectItem key={code.value} value={code.value}>
                        {code.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="whatsappNumber"
                  name="whatsappNumber"
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="Phone number"
                  disabled={saving}
                  className="flex-1 h-11 border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Submit Button */}
        <div className="flex justify-center pb-6">
          <Button
            type="submit"
            disabled={saving}
            size="lg"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {saving ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

