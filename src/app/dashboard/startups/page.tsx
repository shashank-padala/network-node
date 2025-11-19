"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Plus, Users, Loader2, ExternalLink, Globe, Briefcase, DollarSign, FileText } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Startup {
  id: string;
  user_id: string;
  title: string;
  description: string;
  tags: string[];
  looking_for_cofounder: boolean;
  website_url: string | null;
  pitch_deck_url: string | null;
  hiring_status: "not_hiring" | "hiring" | "actively_hiring" | null;
  raising_funds: boolean;
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
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Startup Directory
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Discover startups founded by NS members. Explore their products, innovations, and connect with the builders behind them.
          </p>
        </div>
        <Button
          className="cursor-pointer w-full sm:w-auto text-sm sm:text-base h-9 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          asChild
        >
          <Link href="/dashboard/startups/new">
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            <span className="hidden sm:inline">Add Your Startup</span>
            <span className="sm:hidden">Add</span>
          </Link>
        </Button>
      </div>

      {startups.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Rocket className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">No startups yet</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto">
            Be the first to showcase your startup! Share what you're building with the Network Society community.
          </p>
          <Button asChild className="text-sm sm:text-base h-9 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Link href="/dashboard/startups/new">
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Add Your Startup
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {startups.map((startup) => (
            <Card key={startup.id} className="rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 group">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Rocket className="h-6 w-6 sm:h-7 sm:w-7 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-lg sm:text-xl font-bold leading-tight">{startup.title}</CardTitle>
                    </div>
                    <CardDescription className="mb-3 sm:mb-4 text-sm sm:text-base line-clamp-3">
                      {startup.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                      {startup.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[10px] sm:text-xs rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {startup.tags.length > 3 && (
                        <span className="px-2.5 py-1 text-[10px] sm:text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200 font-medium">
                          +{startup.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {startup.website_url && (
                        <a
                          href={startup.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium group/link"
                        >
                          <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="truncate max-w-[200px]">{startup.website_url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      )}
                      {startup.pitch_deck_url && (
                        <a
                          href={startup.pitch_deck_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium group/link"
                        >
                          <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span>Pitch Deck</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {startup.hiring_status && startup.hiring_status !== "not_hiring" && (
                        <div className={`flex items-center gap-1.5 text-xs sm:text-sm rounded-lg px-2.5 py-1.5 w-fit font-medium ${
                          startup.hiring_status === "actively_hiring" 
                            ? "text-green-700 bg-green-50 border border-green-200" 
                            : "text-blue-700 bg-blue-50 border border-blue-200"
                        }`}>
                          <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span>{startup.hiring_status === "actively_hiring" ? "Actively Hiring" : "Hiring"}</span>
                        </div>
                      )}
                      {startup.raising_funds && (
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 w-fit font-medium">
                          <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span>Raising Funds</span>
                        </div>
                      )}
                      {startup.looking_for_cofounder && (
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-purple-600 bg-purple-50 border border-purple-200 rounded-lg px-2.5 py-1.5 w-fit font-medium">
                          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span>Looking for co-founder</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 pt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                      {(startup.profiles?.name || "U")[0].toUpperCase()}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      <span className="font-medium text-gray-900">{startup.profiles?.name || "Unknown"}</span>
                      <span className="mx-1">•</span>
                      <span>{formatTimeAgo(startup.created_at)}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {startup.website_url && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs sm:text-sm h-8 sm:h-9 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                        asChild
                      >
                        <a href={startup.website_url} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-3 w-3 mr-1.5" />
                          Website
                          <ExternalLink className="h-3 w-3 ml-1.5" />
                        </a>
                      </Button>
                    )}
                    {startup.pitch_deck_url && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs sm:text-sm h-8 sm:h-9 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
                        asChild
                      >
                        <a href={startup.pitch_deck_url} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-3 w-3 mr-1.5" />
                          Pitch Deck
                          <ExternalLink className="h-3 w-3 ml-1.5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

