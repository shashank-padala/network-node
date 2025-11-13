"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Loader2, 
  CheckCircle2, 
  Mail, 
  FileText, 
  Code, 
  Calendar,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Save,
  Handshake,
  Briefcase,
  Users,
  Phone
} from "lucide-react";
import { FaWhatsapp, FaDiscord } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { COUNTRY_CODES } from "@/constants/country-codes";
import { SkillsInput } from "@/components/ui/skills-input";
import { CountryCodeSelect } from "@/components/ui/country-code-select";
import { checkProfileCompletion } from "@/lib/profile-utils";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);
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
    openToCollaborate: true,
    openToJobs: false,
    hiringTalent: false,
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!user || hasLoadedInitialData) return;

      const supabase = createClient();

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
            openToCollaborate: data.open_to_collaborate !== undefined ? data.open_to_collaborate : true,
            openToJobs: data.open_to_jobs !== undefined ? data.open_to_jobs : false,
            hiringTalent: data.hiring_talent !== undefined ? data.hiring_talent : false,
          });
          setHasLoadedInitialData(true);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user, hasLoadedInitialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    const supabase = createClient();

    try {
      // Validate required fields (only WhatsApp and Discord)
      if (!formData.whatsappNumber.trim()) {
        setError("WhatsApp number is required");
        setSaving(false);
        return;
      }
      if (!formData.discord.trim()) {
        setError("Discord username is required");
        setSaving(false);
        return;
      }

      // Profile should always exist due to database trigger on signup
      // If it doesn't exist, something went wrong - try to create it as fallback
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      const profileData: any = {
        name: formData.name,
        bio: formData.bio || null,
        skills: formData.skills,
        linkedin_url: formData.linkedin || null,
        twitter_url: formData.twitter || null,
        github_url: formData.github || null,
        calendly_url: formData.calendly || null,
        whatsapp_country_code: formData.whatsappCountryCode || null,
        whatsapp_number: formData.whatsappNumber || null,
        discord_username: formData.discord || null,
        open_to_collaborate: formData.openToCollaborate,
        open_to_jobs: formData.openToJobs,
        hiring_talent: formData.hiringTalent,
      };

      let error;
      if (existingProfile) {
        // Update existing profile (normal case)
        const { error: updateError } = await supabase
          .from("profiles")
          .update(profileData)
          .eq("id", user.id);
        error = updateError;
      } else {
        // Fallback: Create profile if trigger somehow failed
        // This should rarely happen, but handle it gracefully
        console.warn("Profile not found - creating fallback profile");
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            name: formData.name,
            email: user.email || "",
            photo_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
            ...profileData,
          });
        error = insertError;
      }

      if (error) {
        setError(error.message);
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
    <div className="max-w-4xl mx-auto w-full px-3 sm:px-4">
      {/* Header */}
      <div className="mb-4 sm:mb-6 md:mb-8 text-center space-y-2 sm:space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full mb-2 sm:mb-4">
          <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
          Manage your profile and showcase your skills
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
            Profile updated successfully!
          </div>
        )}

        {/* Basic Information Section */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
              <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>
              Basic Information (Optional)
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Add details to help others discover you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="Enter your full name"
                  className="h-10 sm:h-11 text-sm sm:text-base border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="h-10 sm:h-11 text-sm sm:text-base border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* WhatsApp and Discord Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaWhatsapp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                  WhatsApp Number *
                </label>
                <div className="flex gap-2 sm:gap-3 items-center">
                  <CountryCodeSelect
                    value={formData.whatsappCountryCode}
                    onValueChange={(value) =>
                      setFormData({ ...formData, whatsappCountryCode: value })
                    }
                    disabled={saving}
                  />
                  <Input
                    id="whatsappNumber"
                    name="whatsappNumber"
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="Phone number"
                    disabled={saving}
                    required
                    className="flex-1 h-10 sm:h-11 text-sm sm:text-base border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="discord" className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaDiscord className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600" />
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
                  className="h-10 sm:h-11 text-sm sm:text-base border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <label htmlFor="skills" className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Code className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Skills
              </label>
              <SkillsInput
                skills={formData.skills}
                onChange={(skills) => setFormData({ ...formData, skills })}
                disabled={saving}
                placeholder="Add your skills"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label htmlFor="bio" className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Bio
              </label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Share a brief introduction about yourself.
For example: 'I'm a full-stack developer passionate about building scalable web applications. Currently working on a SaaS platform and always open to collaborating on innovative projects.'"
                disabled={saving}
              />
              <p className="text-[10px] sm:text-xs text-gray-500">
                Optional: Share what you're building, your interests, or what you're looking for
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Availability & Interests Section */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
              <div className="p-1.5 sm:p-2 bg-orange-100 rounded-lg">
                <Handshake className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
              </div>
              Availability & Interests (Optional)
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Let others know what you're open to
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {/* Open to Collaborate */}
            <div className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg flex-shrink-0">
                  <Handshake className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 cursor-pointer block">
                    Open to collaborate on new projects or startup ideas
                  </label>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Interested in partnering on innovative projects
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, openToCollaborate: !formData.openToCollaborate })}
                disabled={saving}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  formData.openToCollaborate ? "bg-blue-600" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={formData.openToCollaborate}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.openToCollaborate ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Open to Jobs */}
            <div className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 cursor-pointer block">
                    Open to new job opportunities
                  </label>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Actively looking for new employment opportunities
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, openToJobs: !formData.openToJobs })}
                disabled={saving}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  formData.openToJobs ? "bg-blue-600" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={formData.openToJobs}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.openToJobs ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Hiring Talent */}
            <div className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg flex-shrink-0">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 cursor-pointer block">
                    Hiring talent
                  </label>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Looking to recruit skilled professionals
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, hiringTalent: !formData.hiringTalent })}
                disabled={saving}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  formData.hiringTalent ? "bg-blue-600" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={formData.hiringTalent}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.hiringTalent ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Professional Links Section */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
              <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              </div>
              Professional Links (Optional)
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Connect your professional profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label htmlFor="linkedin" className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
                  className="h-10 sm:h-11 text-sm sm:text-base border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="twitter" className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Twitter/X
                </label>
                <Input
                  id="twitter"
                  name="twitter"
                  type="url"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="https://x.com/..."
                  disabled={saving}
                  className="h-10 sm:h-11 text-sm sm:text-base border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="github" className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
                  className="h-10 sm:h-11 text-sm sm:text-base border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information Section */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
              <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              </div>
              Contact Information (Optional)
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              How others can reach you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label htmlFor="calendly" className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Meeting Link
              </label>
              <Input
                id="calendly"
                name="calendly"
                type="url"
                value={formData.calendly}
                onChange={handleChange}
                placeholder="https://calendly.com/... or https://cal.com/..."
                disabled={saving}
                className="h-10 sm:h-11 text-sm sm:text-base border-gray-200 focus:ring-2 focus:ring-blue-500/20"
              />
              <p className="text-[10px] sm:text-xs text-gray-500">
                Share your Calendly, Cal.com, or any other meeting scheduling link
              </p>
            </div>

          </CardContent>
        </Card>

        <Separator className="my-4 sm:my-6 md:my-8" />

        {/* Submit Button */}
        <div className="flex justify-center pb-4 sm:pb-6">
          <Button
            type="submit"
            disabled={saving}
            size="lg"
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

