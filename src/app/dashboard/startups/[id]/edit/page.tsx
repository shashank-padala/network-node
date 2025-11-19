"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function EditStartupPage() {
  const router = useRouter();
  const params = useParams();
  const startupId = params.id as string;
  const { user } = useAuth();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    website_url: "",
    pitch_deck_url: "",
    hiring_status: "not_hiring" as "not_hiring" | "hiring" | "actively_hiring",
    raising_funds: false,
    looking_for_cofounder: false,
  });

  useEffect(() => {
    async function fetchStartup() {
      if (!user || !startupId) return;

      try {
        const { data, error: fetchError } = await supabase
          .from("startups")
          .select("*")
          .eq("id", startupId)
          .eq("user_id", user.id)
          .single();

        if (fetchError) {
          setError("Startup not found or you don't have permission to edit it");
          setLoading(false);
          return;
        }

        if (data) {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            tags: data.tags?.join(", ") || "",
            website_url: data.website_url || "",
            pitch_deck_url: data.pitch_deck_url || "",
            hiring_status: data.hiring_status || "not_hiring",
            raising_funds: data.raising_funds || false,
            looking_for_cofounder: data.looking_for_cofounder || false,
          });
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchStartup();
  }, [user, startupId, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to edit a startup");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Validate word count
      const wordCount = getWordCount(formData.description);
      if (wordCount > 35) {
        setError("Description must be 35 words or less");
        setSaving(false);
        return;
      }

      const tagsArray = formData.tags
        ? formData.tags.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      // Validate and format website URL
      let websiteUrl = formData.website_url.trim();
      if (websiteUrl && !websiteUrl.match(/^https?:\/\//)) {
        websiteUrl = `https://${websiteUrl}`;
      }

      // Validate and format pitch deck URL
      let pitchDeckUrl = formData.pitch_deck_url.trim();
      if (pitchDeckUrl && !pitchDeckUrl.match(/^https?:\/\//)) {
        pitchDeckUrl = `https://${pitchDeckUrl}`;
      }

      const { error: updateError } = await supabase
        .from("startups")
        .update({
          title: formData.title,
          description: formData.description,
          tags: tagsArray,
          website_url: websiteUrl || null,
          pitch_deck_url: pitchDeckUrl || null,
          hiring_status: formData.hiring_status,
          raising_funds: formData.raising_funds,
          looking_for_cofounder: formData.looking_for_cofounder,
        })
        .eq("id", startupId)
        .eq("user_id", user.id);

      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }

      router.push("/dashboard/startups");
    } catch (err) {
      setError("An unexpected error occurred");
      setSaving(false);
    }
  };

  const getWordCount = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Enforce 35 word limit for description
    if (name === "description" && type === "textarea") {
      const wordCount = getWordCount(value);
      if (wordCount > 35) {
        // Don't update if over limit
        return;
      }
    }
    
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
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
      <Link
        href="/dashboard/startups"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Startup Directory
      </Link>

      <Card className="rounded-2xl border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Edit Your Startup
          </CardTitle>
          <CardDescription className="text-base">
            Update your startup information and keep it current for the Network Society community.
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
                Startup Name *
              </label>
              <Input
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., HealthAI, FinTech Solutions, EcoMarket"
                disabled={saving}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="description" className="text-sm font-medium">
                  Description *
                </label>
                <span className={`text-xs ${getWordCount(formData.description) > 35 ? 'text-red-600' : 'text-muted-foreground'}`}>
                  {getWordCount(formData.description)} / 35 words
                </span>
              </div>
              <Textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="min-h-[150px] text-base"
                placeholder="Tell us about your startup: What problem are you solving? What makes your product unique? What stage are you at? Share your story and vision..."
                disabled={saving}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">
                Keep it concise! Maximum 35 words to help others quickly understand your startup.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="website_url" className="text-sm font-medium">
                Website URL
              </label>
              <Input
                id="website_url"
                name="website_url"
                type="url"
                value={formData.website_url}
                onChange={handleChange}
                placeholder="https://yourstartup.com or yourstartup.com"
                disabled={saving}
                className="text-base"
              />
              <p className="text-xs text-muted-foreground">
                Share your website, landing page, or product link. We'll automatically add https:// if needed.
              </p>
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
                placeholder="Healthcare, AI, SaaS, FinTech, B2B"
                disabled={saving}
                className="text-base"
              />
              <p className="text-xs text-muted-foreground">
                Add relevant tags to help others discover your startup. Separate multiple tags with commas.
              </p>
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-6">
              <h3 className="text-base font-semibold text-gray-900">Additional Information</h3>
              
              <div className="space-y-2">
                <label htmlFor="hiring_status" className="text-sm font-medium">
                  Hiring Status
                </label>
                <Select
                  value={formData.hiring_status}
                  onValueChange={(value) => handleSelectChange("hiring_status", value)}
                  disabled={saving}
                >
                  <SelectTrigger className="text-base h-11">
                    <SelectValue placeholder="Select hiring status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not_hiring">Not Hiring</SelectItem>
                    <SelectItem value="hiring">Hiring</SelectItem>
                    <SelectItem value="actively_hiring">Actively Hiring</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Let others know if you're looking to hire talent for your startup.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="pitch_deck_url" className="text-sm font-medium">
                  Pitch Deck URL
                </label>
                <Input
                  id="pitch_deck_url"
                  name="pitch_deck_url"
                  type="url"
                  value={formData.pitch_deck_url}
                  onChange={handleChange}
                  placeholder="https://docs.google.com/presentation/... or yourdeck.com"
                  disabled={saving}
                  className="text-base"
                />
                <p className="text-xs text-muted-foreground">
                  Share a link to your pitch deck, investor deck, or company presentation.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="raising_funds"
                    name="raising_funds"
                    checked={formData.raising_funds}
                    onChange={handleChange}
                    disabled={saving}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="raising_funds" className="text-sm font-medium cursor-pointer">
                    Currently raising funds
                  </label>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  Check this if you're actively seeking investment or fundraising.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="looking_for_cofounder"
                    name="looking_for_cofounder"
                    checked={formData.looking_for_cofounder}
                    onChange={handleChange}
                    disabled={saving}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="looking_for_cofounder" className="text-sm font-medium cursor-pointer">
                    Looking for co-founder
                  </label>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  Check this if you're seeking a co-founder to join your startup.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-base h-11"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
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

