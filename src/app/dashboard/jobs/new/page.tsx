"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function NewJobPage() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    location: "",
    is_remote: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to post a job");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const tagsArray = formData.tags
        ? formData.tags.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      const { error: insertError } = await supabase.from("jobs").insert({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        tags: tagsArray,
        location: formData.location || null,
        is_remote: formData.is_remote,
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard/jobs");
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
        href="/dashboard/jobs"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Jobs
      </Link>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Post a Job</CardTitle>
          <CardDescription>
            Share a job opportunity with the Network School community
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
                Job Title *
              </label>
              <Input
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Web3 Growth Marketer"
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
                placeholder="Describe the role, requirements, and what you're looking for..."
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
                placeholder="Marketing, Web3, Growth, Remote"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., San Francisco, CA"
                  disabled={loading || formData.is_remote}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium block">Remote Work</label>
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="is_remote"
                    name="is_remote"
                    checked={formData.is_remote}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label htmlFor="is_remote" className="text-sm text-muted-foreground">
                    This is a remote position
                  </label>
                </div>
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
                "Post Job"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}






