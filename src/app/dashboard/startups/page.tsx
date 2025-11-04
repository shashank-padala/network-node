"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Plus, Users, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Startup {
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

export default function StartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStartups() {
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
          console.error("Error fetching startups:", error);
          return;
        }

        setStartups(data as Startup[]);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStartups();
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
          <h1 className="text-3xl font-bold mb-2">Startup Board</h1>
          <p className="text-muted-foreground">
            Post your idea, find co-founders, and launch together
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          asChild
        >
          <Link href="/dashboard/startups/new">
            <Plus className="h-4 w-4 mr-2" />
            Post a Startup
          </Link>
        </Button>
      </div>

      {startups.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No startups posted yet.</p>
          <Button asChild>
            <Link href="/dashboard/startups/new">
              <Plus className="h-4 w-4 mr-2" />
              Post the First Startup
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {startups.map((startup) => (
            <Card key={startup.id} className="rounded-2xl transition-smooth">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Rocket className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{startup.title}</CardTitle>
                    <CardDescription className="mb-4">
                      {startup.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {startup.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {startup.looking_for_cofounder && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                        <Users className="h-4 w-4" />
                        Looking for co-founder
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Posted by{" "}
                    <span className="text-blue-500">
                      {startup.profiles?.name || "Unknown"}
                    </span>{" "}
                    • {formatTimeAgo(startup.created_at)}
                  </p>
                  <Button variant="outline" size="sm">
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

