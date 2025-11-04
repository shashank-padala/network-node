"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Briefcase, ArrowRight, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { MeetingRequestModal } from "@/components/MeetingRequestModal";

interface FeedItem {
  id: string;
  type: "job" | "startup";
  user_id: string;
  user_name: string;
  user_calendly?: string | null;
  title: string;
  description: string;
  tags: string[];
  created_at: string;
  looking_for_cofounder?: boolean;
  is_remote?: boolean;
  location?: string | null;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

export default function DashboardPage() {
  const { user } = useAuth();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [startups, setStartups] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFeed() {
      try {
        // Fetch jobs with profile data including calendly
        const { data: jobsData, error: jobsError } = await supabase
          .from("jobs")
          .select(`
            *,
            profiles:user_id (
              name,
              calendly_url
            )
          `)
          .order("created_at", { ascending: false })
          .limit(10);

        if (jobsError) {
          console.error("Error fetching jobs:", jobsError);
        }

        // Fetch startups
        const { data: startupsData, error: startupsError } = await supabase
          .from("startups")
          .select(`
            *,
            profiles:user_id (
              name
            )
          `)
          .order("created_at", { ascending: false })
          .limit(10);

        if (startupsError) {
          console.error("Error fetching startups:", startupsError);
        }

        setJobs(jobsData || []);
        setStartups(startupsData || []);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
  }, [supabase]);

  const feedItems: FeedItem[] = useMemo(() => {
    const items: FeedItem[] = [];

    jobs.forEach((job) => {
      items.push({
        id: job.id,
        type: "job",
        user_id: job.user_id,
        user_name: job.profiles?.name || "Unknown",
        user_calendly: job.profiles?.calendly_url || null,
        title: job.title,
        description: job.description,
        tags: job.tags || [],
        created_at: job.created_at,
        is_remote: job.is_remote,
        location: job.location,
      });
    });

    startups.forEach((startup) => {
      items.push({
        id: startup.id,
        type: "startup",
        user_id: startup.user_id,
        user_name: startup.profiles?.name || "Unknown",
        title: startup.title,
        description: startup.description,
        tags: startup.tags || [],
        created_at: startup.created_at,
        looking_for_cofounder: startup.looking_for_cofounder,
      });
    });

    // Sort by created_at descending
    return items.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [jobs, startups]);

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
        <h1 className="text-3xl font-bold mb-2">Feed</h1>
        <p className="text-muted-foreground">
          Latest updates from the Network School community
        </p>
      </div>

      {feedItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No activity yet. Be the first to post!
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/dashboard/jobs">
                <Briefcase className="h-4 w-4 mr-2" />
                Post a Job
              </Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              asChild
            >
              <Link href="/dashboard/startups">
                <Rocket className="h-4 w-4 mr-2" />
                Post a Startup
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {feedItems.map((item) => {
            const Icon = item.type === "job" ? Briefcase : Rocket;
            const actionText =
              item.type === "job"
                ? "is hiring for"
                : item.looking_for_cofounder
                ? "is looking for a co-founder for"
                : "posted a new startup idea";

            return (
              <Card key={`${item.type}-${item.id}`} className="rounded-2xl transition-smooth">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">
                        <span className="font-semibold">{item.user_name}</span>{" "}
                        {actionText} {item.title}
                      </CardTitle>
                      <CardDescription className="mb-2">
                        {item.description}
                      </CardDescription>
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {item.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatTimeAgo(item.created_at)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {item.type === "job" && user && user.id !== item.user_id && (
                      <MeetingRequestModal
                        recipientId={item.user_id}
                        recipientName={item.user_name}
                        recipientCalendly={item.user_calendly}
                        jobId={item.id}
                      />
                    )}
                    {item.type === "startup" && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/startups">
                          View Details <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {feedItems.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Ready to post something?</p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/dashboard/jobs">
                <Briefcase className="h-4 w-4 mr-2" />
                Post a Job
              </Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              asChild
            >
              <Link href="/dashboard/startups">
                <Rocket className="h-4 w-4 mr-2" />
                Post a Startup
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

