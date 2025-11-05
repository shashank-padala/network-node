"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
import { Loader2, Network, Handshake, Briefcase, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { COUNTRY_CODES } from "@/constants/country-codes";
import { SkillsInput } from "@/components/ui/skills-input";

interface ProfileCompletionModalProps {
  open: boolean;
  onClose: (profileCreated?: boolean) => void;
}

export default function ProfileCompletionModal({ open, onClose }: ProfileCompletionModalProps) {
  const { user } = useAuth();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills: [] as string[],
    linkedin: "",
    twitter: "",
    github: "",
    calendly: "",
    whatsappCountryCode: "+91",
    whatsappNumber: "",
    discord: "",
    openToCollaborate: true,
    openToJobs: false,
    hiringTalent: false,
  });

  useEffect(() => {
    if (open && user) {
      // Pre-fill name from Google auth if available
      const userName = user.user_metadata?.full_name || user.user_metadata?.name || "";
      setFormData(prev => ({ ...prev, name: userName }));
    }
  }, [open, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name.trim()) {
        setError("Name is required");
        setLoading(false);
        return;
      }
      if (formData.skills.length === 0) {
        setError("At least one skill is required");
        setLoading(false);
        return;
      }
      if (!formData.discord.trim()) {
        setError("Discord username is required");
        setLoading(false);
        return;
      }

      // Get user's photo from Google if available
      const photoUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null;

      // Create profile in profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          name: formData.name,
          email: user.email || "",
          photo_url: photoUrl,
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
        });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }

      // Close modal - parent will handle refresh
      onClose(true);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Network className="h-6 w-6 text-blue-500" />
            <DialogTitle className="text-2xl">Complete Your Profile</DialogTitle>
          </div>
          <DialogDescription>
            Tell us about yourself and start connecting with the NetworkNode community.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
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
              placeholder="Your full name"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="min-h-[100px]"
              placeholder="Share a brief introduction about yourself.
For example: 'I'm a full-stack developer passionate about building scalable web applications. Currently working on a SaaS platform and always open to collaborating on innovative projects.'"
              disabled={loading}
            />
            <p className="text-xs text-gray-500">
              Optional: Share what you're building, your interests, or what you're looking for
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="skills" className="text-sm font-medium">
              Skills *
            </label>
            <SkillsInput
              skills={formData.skills}
              onChange={(skills) => setFormData({ ...formData, skills })}
              disabled={loading}
              placeholder="Add at least one skill to continue"
              required
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
                disabled={loading}
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
                placeholder="https://x.com/..."
                disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="calendly" className="text-sm font-medium">
              Meeting Link
            </label>
            <Input
              id="calendly"
              name="calendly"
              type="url"
              value={formData.calendly}
              onChange={handleChange}
              placeholder="https://calendly.com/... or https://cal.com/..."
              disabled={loading}
            />
            <p className="text-xs text-gray-500">
              Share your Calendly, Cal.com, or any other meeting scheduling link
            </p>
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="discord" className="text-sm font-medium">
              Discord Username *
            </label>
            <Input
              id="discord"
              name="discord"
              type="text"
              value={formData.discord}
              onChange={handleChange}
              placeholder="username#1234"
              disabled={loading}
              required
            />
          </div>

          {/* Availability & Interests Section */}
          <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Handshake className="h-5 w-5 text-orange-600" />
              <label className="text-sm font-semibold text-gray-700">
                Availability & Interests *
              </label>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Let others know what you're open to
            </p>

            {/* Open to Collaborate */}
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
              <div className="flex items-center gap-3">
                <Handshake className="h-4 w-4 text-blue-600" />
                <label className="text-sm font-medium text-gray-700 cursor-pointer">
                  Open to collaborate on new projects or startup ideas
                </label>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, openToCollaborate: !formData.openToCollaborate })}
                disabled={loading}
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
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 text-green-600" />
                <label className="text-sm font-medium text-gray-700 cursor-pointer">
                  Open to new job opportunities
                </label>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, openToJobs: !formData.openToJobs })}
                disabled={loading}
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
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-purple-600" />
                <label className="text-sm font-medium text-gray-700 cursor-pointer">
                  Hiring talent
                </label>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, hiringTalent: !formData.hiringTalent })}
                disabled={loading}
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
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-xl py-6"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating profile...
              </>
            ) : (
              "Complete Profile & Join Network"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

