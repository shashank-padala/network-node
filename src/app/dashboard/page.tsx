"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Briefcase, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const feedItems = [
    {
      type: "startup",
      user: "Aisha",
      title: "posted a new startup idea in Healthcare AI",
      description: "Building an AI-powered diagnostic tool for early disease detection.",
      time: "2 hours ago",
      icon: Rocket,
    },
    {
      type: "job",
      user: "Kevin",
      title: "is hiring for a Web3 Growth role",
      description: "Looking for a growth marketer with DeFi experience. 15-min call available.",
      time: "5 hours ago",
      icon: Briefcase,
    },
    {
      type: "startup",
      user: "Marcus",
      title: "is looking for a co-founder",
      description: "EdTech platform seeking a technical co-founder. Equity split negotiable.",
      time: "1 day ago",
      icon: Rocket,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Feed</h1>
        <p className="text-muted-foreground">
          Latest updates from the Network School community
        </p>
      </div>

      <div className="space-y-6">
        {feedItems.map((item, index) => (
          <Card
            key={index}
            className="rounded-2xl transition-smooth"
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <item.icon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">
                    <span className="font-semibold">{item.user}</span> {item.title}
                  </CardTitle>
                  <CardDescription className="mb-2">
                    {item.description}
                  </CardDescription>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {item.type === "job" && (
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Request Call
                  </Button>
                )}
                {item.type === "startup" && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link href="/dashboard/startups">
                      View Details <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">Ready to post something?</p>
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            asChild
          >
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
    </div>
  );
}

