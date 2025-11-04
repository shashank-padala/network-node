"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, Calendar } from "lucide-react";

export default function MembersPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Member Directory</h1>
        <p className="text-muted-foreground">
          Discover who&apos;s building around you at Network School
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, skills, or interests..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card
            key={i}
            className="rounded-2xl transition-smooth"
          >
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
                  {String.fromCharCode(64 + i)}
                </div>
                <div>
                  <CardTitle className="text-lg">Member {i}</CardTitle>
                  <CardDescription>
                    Builder & Founder
                  </CardDescription>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Building AI-powered solutions for healthcare. Looking to connect with designers and marketers.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm">
                  React
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm">
                  AI
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm">
                  Healthcare
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Request Meeting
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

