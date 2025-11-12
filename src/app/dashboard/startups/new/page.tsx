"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function NewStartupPage() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    looking_for_cofounder: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to post a startup");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const tagsArray = formData.tags
        ? formData.tags.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      const { error: insertError } = await supabase.from("startups").insert({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        tags: tagsArray,
        looking_for_cofounder: formData.looking_for_cofounder,
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard/startups");
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/dashboard/startups"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Startups
      </Link>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Post a Startup</CardTitle>
          <CardDescription>
            Share your startup idea and find co-founders
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
              <label htmlFor="title" className="text-sm font-medium">
                Startup Title *
              </label>
              <Input
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Healthcare AI Diagnostic Tool"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description *
              </label>
              <Textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="min-h-[150px]"
                placeholder="Describe your startup idea, what problem it solves, and what you're looking for..."
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags (comma-separated) *
              </label>
              <Input
                id="tags"
                name="tags"
                required
                value={formData.tags}
                onChange={handleChange}
                placeholder="Healthcare, AI, ML, SaaS"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="looking_for_cofounder"
                  name="looking_for_cofounder"
                  checked={formData.looking_for_cofounder}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="looking_for_cofounder" className="text-sm font-medium">
                  Looking for co-founder
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Startup"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}






