"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Plus } from "lucide-react";
import Link from "next/link";

export default function JobsPage() {
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
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          asChild
        >
          <Link href="/dashboard/jobs/new">
            <Plus className="h-4 w-4 mr-2" />
            Post a Job
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="rounded-2xl transition-smooth"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">
                    Web3 Growth Marketer
                  </CardTitle>
                  <CardDescription className="mb-4">
                    Looking for a growth marketer with DeFi experience to join our team. Part-time or full-time, remote OK.
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm">
                      Marketing
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm">
                      Web3
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm">
                      Remote
                    </span>
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
                  Posted by <span className="text-blue-500">Kevin</span> • 5 hours ago
                </p>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Request 15-min Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

