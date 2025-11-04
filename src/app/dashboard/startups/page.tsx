"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Plus, Users } from "lucide-react";
import Link from "next/link";

export default function StartupsPage() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="rounded-2xl transition-smooth"
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Rocket className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">
                    Healthcare AI Diagnostic Tool
                  </CardTitle>
                  <CardDescription className="mb-4">
                    Building an AI-powered diagnostic tool for early disease detection. Looking for a technical co-founder with ML experience.
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Looking for co-founder
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Posted by <span className="text-blue-500">Aisha</span> • 2 hours ago
                </p>
                <Button
                  variant="outline"
                  size="sm"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

