"use client";

import { useState } from "react";
import { Navigation } from "@/components/landing/Navigation";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signup" | "login">("signup");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoginClick = () => {
    setAuthModalTab("login");
    setAuthModalOpen(true);
  };

  const handleJoinClick = () => {
    setAuthModalTab("signup");
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        scrollToSection={scrollToSection} 
        onJoinClick={handleJoinClick}
        onLoginClick={handleLoginClick}
      />
      <Hero onJoinClick={handleJoinClick} />
      <Features onJoinClick={handleJoinClick} />
      <HowItWorks />
      <CTA onJoinClick={handleJoinClick} />
      <Footer onJoinClick={handleJoinClick} />
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        initialTab={authModalTab}
        onAuthSuccess={() => {
          // Redirect handled by callback route
        }}
      />
    </div>
  );
}
