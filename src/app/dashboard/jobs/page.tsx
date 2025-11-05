"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { MeetingRequestModal } from "@/components/MeetingRequestModal";

interface Job {
  id: string;
  user_id: string;
  title: string;
  description: string;
  tags: string[];
  location: string | null;
  is_remote: boolean;
  created_at: string;
  profiles: {
    name: string;
    calendly_url: string | null;
  };
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

export default function JobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select(`
            *,
            profiles:user_id (
              name,
              calendly_url
            )
          `)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching jobs:", error);
          return;
        }

        setJobs(data as Job[]);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [supabase]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Board</h1>
          <p className="text-muted-foreground">
            Hire or get hired within the Network School community
          </p>
        </div>
        <Button
          className="cursor-pointer"
          asChild
        >
          <Link href="/dashboard/jobs/new">
            <Plus className="h-4 w-4 mr-2" />
            Post a Job
          </Link>
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No jobs posted yet.</p>
          <Button asChild>
            <Link href="/dashboard/jobs/new">
              <Plus className="h-4 w-4 mr-2" />
              Post the First Job
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.id} className="rounded-2xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <CardDescription className="mb-4">
                      {job.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {job.is_remote && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500 border border-green-500/20 shadow-sm">
                          Remote
                        </span>
                      )}
                      {job.location && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-500/10 text-gray-500 border border-gray-500/20 shadow-sm">
                          {job.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center ml-4 shadow-sm">
                    <Briefcase className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Posted by{" "}
                    <span className="text-blue-500">
                      {job.profiles?.name || "Unknown"}
                    </span>{" "}
                    • {formatTimeAgo(job.created_at)}
                  </p>
                  {user && user.id !== job.user_id && (
                    <MeetingRequestModal
                      recipientId={job.user_id}
                      recipientName={job.profiles?.name || "Unknown"}
                      recipientCalendly={job.profiles?.calendly_url || null}
                      jobId={job.id}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

