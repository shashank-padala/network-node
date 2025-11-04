"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Rocket } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Member Directory",
    description: "Discover who's building around you. Filter by skills, interests, or location.",
    bgColor: "bg-[hsl(var(--blue-bg))]",
    iconColor: "text-[hsl(var(--blue-icon))]",
  },
  {
    icon: Briefcase,
    title: "Job Board",
    description: "Hire or get hired within the community. Request 15-min calls and collaborate.",
    bgColor: "bg-[hsl(var(--green-bg))]",
    iconColor: "text-[hsl(var(--green-icon))]",
  },
  {
    icon: Rocket,
    title: "Startup Board",
    description: "Post your idea, find co-founders, and start something meaningful together.",
    bgColor: "bg-[hsl(var(--purple-bg))]",
    iconColor: "text-[hsl(var(--purple-icon))]",
  },
];

interface FeaturesProps {
  onJoinClick?: () => void;
}

export function Features({ onJoinClick }: FeaturesProps) {
  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Why Builders Love NetworkNode
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Everything you need to connect, collaborate, and build the future — all in one powerful platform.
          </p>
      </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
              <div
                key={index}
                className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${
                  index % 2 === 0
                    ? "from-blue-500 to-indigo-600"
                    : "from-green-500 to-emerald-600"
                } rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
          );
        })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Join the Network?</h3>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">
              Connect with builders, find co-founders, and launch your next project together.
            </p>
            <button 
              onClick={onJoinClick}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg cursor-pointer w-full sm:w-auto"
            >
              Join the Network
            </button>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm mt-4 sm:mt-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Network with Leaders
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Build Startups
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Land Dream Jobs
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

