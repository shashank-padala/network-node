"use client";

import Link from "next/link";
import { Network } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Network className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    Network
                  </span>
                  <span className="text-lg font-semibold text-white">
                    Node
                  </span>
                </div>
                <div className="text-xs text-gray-400 font-medium tracking-wide">
                  Connect & Build
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              The Builder Graph — Your Network, Your Way. Connect with builders, find co-founders, 
              and launch your next project together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
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
                <Link href="/signup" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                  Join the Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-3">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {year} NetworkNode — Built for builders, by builders.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>Made with ❤️ for builders</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

