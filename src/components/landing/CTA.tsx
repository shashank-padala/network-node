"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Network, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div className="text-center py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 text-white">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <Network className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              Ready to Plug Into<br className="hidden sm:block" /> the Network?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 lg:mb-10 opacity-95 max-w-2xl mx-auto leading-relaxed px-2">
              Join builders, find co-founders, and land your next job. Connect with brilliant minds and turn conversations into meaningful collaborations.
            </p>
            <div className="flex justify-center mb-6 sm:mb-8 lg:mb-10">
              <Link href="/signup" className="cursor-pointer">
                <button className="group inline-flex items-center justify-center bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer w-full sm:w-auto">
                  Join the Network
                  <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 justify-center text-xs sm:text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Network with Leaders</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Build Startups</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Land Dream Jobs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

