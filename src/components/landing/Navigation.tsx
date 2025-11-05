"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Network } from "lucide-react";

interface NavigationProps {
  scrollToSection: (id: string) => void;
  onJoinClick?: () => void;
  onLoginClick?: () => void;
}

export function Navigation({ scrollToSection, onJoinClick, onLoginClick }: NavigationProps) {
  return (
    <nav className="border-b border-gray-200/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg shadow-sm">
            <Network className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-blue-600">Network</span>
              <span className="text-base sm:text-lg lg:text-xl font-bold text-green-600">Node</span>
            </div>
            <div className="text-[9px] sm:text-xs text-gray-500 font-medium tracking-wide leading-none">
              Connect & Build
            </div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
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
        <div className="flex items-center gap-2 sm:gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="cursor-pointer text-xs sm:text-sm hidden sm:block"
            onClick={onLoginClick}
          >
            Login
          </Button>
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer text-xs sm:text-sm px-3 sm:px-4"
            onClick={onJoinClick}
          >
            <span className="hidden sm:inline">Join Now</span>
            <span className="sm:hidden">Join</span>
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

