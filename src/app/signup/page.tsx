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
import { Network, ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    bio: "",
    skills: "",
    linkedin: "",
    twitter: "",
    github: "",
    calendly: "",
    meetingSpot: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Supabase
    console.log("Form submitted:", formData);
    // On success, redirect to dashboard
    router.push("/dashboard");
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
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="meetingSpot" className="text-sm font-medium">
                  Preferred Meeting Spot
                </label>
                <Select
                  value={formData.meetingSpot}
                  onValueChange={(value) =>
                    setFormData({ ...formData, meetingSpot: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ns-cafe">NS Café</SelectItem>
                    <SelectItem value="lounge-13f">Lounge 13F</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full py-6"
              >
                Create Profile & Join Network
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

