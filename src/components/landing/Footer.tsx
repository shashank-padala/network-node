"use client";

import Link from "next/link";
import { Network } from "lucide-react";

interface FooterProps {
  onJoinClick?: () => void;
}

export function Footer({ onJoinClick }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <Network className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    Network
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-white">
                    Node
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide">
                  Connect & Build
                </div>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 max-w-md leading-relaxed">
              A powerful network for builders to discover opportunities, connect with like-minded creators, 
              find co-founders, land dream jobs, and launch startups together. Every builder is a node — 
              together, we form the network.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Product</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#features" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                  How it Works
                </a>
              </li>
              <li>
                <button 
                  onClick={onJoinClick}
                  className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer"
                >
                  Join the Network
                </button>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Community</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/dashboard/members" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/dashboard/jobs" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/dashboard/startups" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                  Startups
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              &copy; {year} NetworkNode — Built by builders for builders.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

