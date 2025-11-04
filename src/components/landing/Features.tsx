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

export function Features() {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Why Builders Love NetworkNode
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to connect, collaborate, and build the future — all in one powerful platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${
                  index % 2 === 0
                    ? "from-blue-500 to-indigo-600"
                    : "from-green-500 to-emerald-600"
                } rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Join the Network?</h3>
            <p className="text-lg mb-6 opacity-90">
              Connect with builders, find co-founders, and launch your next project together.
            </p>
            <a href="/signup" className="cursor-pointer">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg cursor-pointer">
                Join the Network
              </button>
            </a>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm mt-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Free to join
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                No credit card required
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Instant access
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

