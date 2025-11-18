"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Plus, Users, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  tags: string[];
  looking_for_cofounder: boolean;
  created_at: string;
  profiles: {
    name: string;
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("startups")
          .select(`
            *,
            profiles:user_id (
              name
            )
          `)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching projects:", error);
          return;
        }

        setProjects(data as Project[]);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Project Board</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Share your project, find collaborators, and build together
          </p>
        </div>
        <Button
          className="cursor-pointer w-full sm:w-auto text-sm sm:text-base h-9 sm:h-10"
          asChild
        >
          <Link href="/dashboard/projects/new">
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            <span className="hidden sm:inline">Share Project</span>
            <span className="sm:hidden">Share</span>
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p className="text-sm sm:text-base text-muted-foreground mb-4">No projects posted yet.</p>
          <Button asChild className="text-sm sm:text-base h-9 sm:h-10">
            <Link href="/dashboard/projects/new">
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Share Project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="rounded-xl sm:rounded-2xl">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl mb-2">{project.title}</CardTitle>
                    <CardDescription className="mb-3 sm:mb-4 text-sm sm:text-base">
                      {project.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.looking_for_cofounder && (
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mt-2">
                        <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Looking for co-founder
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Posted by{" "}
                    <span className="text-blue-500">
                      {project.profiles?.name || "Unknown"}
                    </span>{" "}
                    • {formatTimeAgo(project.created_at)}
                  </p>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm h-8 sm:h-9 w-full sm:w-auto">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

