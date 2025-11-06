"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

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
    <div className="max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Job Board</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Hire or get hired within the Network School community
          </p>
        </div>
        <Button
          className="cursor-pointer w-full sm:w-auto text-sm sm:text-base h-9 sm:h-10"
          asChild
        >
          <Link href="/dashboard/jobs/new">
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            <span className="hidden sm:inline">Post a Job</span>
            <span className="sm:hidden">Post Job</span>
          </Link>
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p className="text-sm sm:text-base text-muted-foreground mb-4">No jobs posted yet.</p>
          <Button asChild className="text-sm sm:text-base h-9 sm:h-10">
            <Link href="/dashboard/jobs/new">
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Post the First Job
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {jobs.map((job) => (
            <Card key={job.id} className="rounded-xl sm:rounded-2xl">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl mb-2">{job.title}</CardTitle>
                    <CardDescription className="mb-3 sm:mb-4 text-sm sm:text-base">
                      {job.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {job.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {job.is_remote && (
                        <span className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-green-500/10 text-green-500 border border-green-500/20 shadow-sm">
                          Remote
                        </span>
                      )}
                      {job.location && (
                        <span className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-gray-500/10 text-gray-500 border border-gray-500/20 shadow-sm">
                          {job.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Posted by{" "}
                    <span className="text-blue-500">
                      {job.profiles?.name || "Unknown"}
                    </span>{" "}
                    • {formatTimeAgo(job.created_at)}
                  </p>
                  {user && user.id !== job.user_id && job.profiles?.calendly_url && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1.5 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9 w-full sm:w-auto"
                      onClick={() => window.open(job.profiles!.calendly_url!, "_blank")}
                    >
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Book Meeting</span>
                    </Button>
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

