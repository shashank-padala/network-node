"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Network, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Right Visual - Show first on mobile */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 bg-gradient-to-br from-green-50 to-blue-50">
              <Image
                src="/ns.jpg"
                alt="NetworkNode - Builders connecting and collaborating"
                className="w-full h-auto"
                width={800}
                height={600}
                priority
              />
            </div>
          </div>

          {/* Left Content - Show second on mobile */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-semibold">
              <Network className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Find people, build startups, land jobs & more.
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Every builder is a <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">node</span> in the <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">network</span>.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Discover brilliant minds, collaborate on projects, and build the future — all in one powerful network. Connect with builders, find co-founders, and launch together.
            </p>

            {/* CTA */}
            <div className="pt-2 sm:pt-4">
              <Link href="/signup" className="cursor-pointer">
                <button
                  className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg lg:text-xl transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer w-full sm:w-auto"
                >
                  Join the Network
                  <ArrowRight
                    className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 pt-2 sm:pt-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="whitespace-nowrap">Network with Leaders</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="whitespace-nowrap">Build Startups</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="whitespace-nowrap">Land Dream Jobs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

