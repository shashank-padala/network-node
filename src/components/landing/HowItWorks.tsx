"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FolderOpen, Users } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Upload,
    title: "Sign Up",
    description: "Join using your NS email",
    bgColor: "bg-[hsl(var(--blue-bg))]",
    iconColor: "text-[hsl(var(--blue-icon))]",
    numberBg: "bg-[hsl(var(--blue-icon))]",
  },
  {
    number: "2",
    icon: FolderOpen,
    title: "Create Profile",
    description: "Add photo, bio, skills, and social links.",
    bgColor: "bg-[hsl(var(--green-bg))]",
    iconColor: "text-[hsl(var(--green-icon))]",
    numberBg: "bg-[hsl(var(--green-icon))]",
  },
  {
    number: "3",
    icon: Users,
    title: "Connect & Collaborate",
    description: "Browse jobs, projects, and people to meet.",
    bgColor: "bg-[hsl(var(--blue-bg))]",
    iconColor: "text-[hsl(var(--blue-icon))]",
    numberBg: "bg-[hsl(var(--blue-icon))]",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 px-4">Set Up in Minutes — No Installation Required</h2>
        <p className="text-base sm:text-lg text-gray-600">Get your profile live in three simple steps</p>
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className={`absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full ${step.numberBg} text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-lg z-10`}>
                  {step.number}
                </div>
                <Card className="text-center bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 pt-8 sm:pt-10 h-full flex flex-col">
                  <CardHeader className="flex-1 flex flex-col items-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${
                      index % 2 === 0
                        ? "from-blue-500 to-indigo-600"
                        : "from-green-500 to-emerald-600"
                    } rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

