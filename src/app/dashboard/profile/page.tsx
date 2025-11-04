"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from "lucide-react";

export default function ProfilePage() {
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
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              defaultValue="Your Name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              defaultValue="Tell us about yourself..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="skills" className="text-sm font-medium">
              Skills
            </label>
            <Input
              id="skills"
              defaultValue="React, TypeScript, Design"
            />
          </div>

          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

