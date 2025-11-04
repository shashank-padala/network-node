"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Network } from "lucide-react";

interface NavigationProps {
  scrollToSection: (id: string) => void;
}

export function Navigation({ scrollToSection }: NavigationProps) {
  return (
    <nav className="border-b border-gray-200/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg shadow-sm">
            <Network className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center">
            <span className="text-lg sm:text-xl font-bold text-blue-600">Network</span>
            <span className="text-lg sm:text-xl font-bold text-green-600">Node</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          >
            How it Works
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/signin" className="cursor-pointer">
            <Button variant="ghost" size="sm" className="cursor-pointer">Sign in</Button>
          </Link>
          <Link href="/signup" className="cursor-pointer">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer">
              Join Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

