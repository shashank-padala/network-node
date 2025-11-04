"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Common country codes for WhatsApp
const COUNTRY_CODES = [
  { value: "+1", label: "+1 (US/Canada)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+91", label: "+91 (India)" },
  { value: "+86", label: "+86 (China)" },
  { value: "+81", label: "+81 (Japan)" },
  { value: "+49", label: "+49 (Germany)" },
  { value: "+33", label: "+33 (France)" },
  { value: "+61", label: "+61 (Australia)" },
  { value: "+55", label: "+55 (Brazil)" },
  { value: "+52", label: "+52 (Mexico)" },
];

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError("Failed to create account. Please try again.");
        setLoading(false);
        return;
      }

      // Parse skills array
      const skillsArray = formData.skills
        ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      // Create profile in profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id,
          name: formData.name,
          email: formData.email,
          photo_url: formData.photo || null,
          bio: formData.bio,
          skills: skillsArray,
          linkedin_url: formData.linkedin || null,
          twitter_url: formData.twitter || null,
          github_url: formData.github || null,
          calendly_url: formData.calendly || null,
          whatsapp_country_code: formData.whatsappCountryCode || null,
          whatsapp_number: formData.whatsappNumber || null,
          discord_username: formData.discord || null,
        });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }

      // Redirect to dashboard
      router.push("/dashboard");
      router.refresh();
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="flex items-center gap-2 mb-8">
          <Network className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold">Join NetworkNode</span>
        </div>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Create Your Profile</CardTitle>
            <CardDescription>
              Tell us about yourself and start connecting with the Network School community.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label htmlFor="email" className="text-sm font-medium">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password *
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={loading}
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="photo" className="text-sm font-medium">
                  Photo URL
                </label>
                <Input
                  id="photo"
                  name="photo"
                  type="url"
                  value={formData.photo}
                  onChange={handleChange}
                  placeholder="https://..."
                  disabled={loading}
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
                  placeholder="Tell us about yourself, what you're building, and what you're looking for..."
                  disabled={loading}
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
                  placeholder="React, TypeScript, Design, Marketing..."
                  disabled={loading}
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
                    placeholder="https://twitter.com/..."
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
                  Calendly Link
                </label>
                <Input
                  id="calendly"
                  name="calendly"
                  type="url"
                  value={formData.calendly}
                  onChange={handleChange}
                  placeholder="https://calendly.com/..."
                  disabled={loading}
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
                  Discord Username
                </label>
                <Input
                  id="discord"
                  name="discord"
                  type="text"
                  value={formData.discord}
                  onChange={handleChange}
                  placeholder="username#1234"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full py-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Profile & Join Network"
                )}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground text-center mt-6">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:text-primary/80">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

