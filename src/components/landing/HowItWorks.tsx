"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FolderOpen, Phone } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Upload,
    title: "Sign Up",
    description: "Join using your email or NS credentials.",
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
    icon: Phone,
    title: "Connect & Collaborate",
    description: "Browse jobs, projects, and people to meet.",
    bgColor: "bg-[hsl(var(--blue-bg))]",
    iconColor: "text-[hsl(var(--blue-icon))]",
    numberBg: "bg-[hsl(var(--blue-icon))]",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Set Up in Minutes — No Installation Required</h2>
        <p className="text-lg text-gray-600">Get your profile live in three simple steps</p>
      </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full ${step.numberBg} text-white flex items-center justify-center font-bold text-lg shadow-lg z-10`}>
                  {step.number}
                </div>
                <Card className="text-center bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 pt-10">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                      index % 2 === 0
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 font-semibold">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600">{step.description}</CardDescription>
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

