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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation scrollToSection={scrollToSection} onJoinClick={() => setAuthModalOpen(true)} />
      <Hero onJoinClick={() => setAuthModalOpen(true)} />
      <Features onJoinClick={() => setAuthModalOpen(true)} />
      <HowItWorks />
      <CTA onJoinClick={() => setAuthModalOpen(true)} />
      <Footer onJoinClick={() => setAuthModalOpen(true)} />
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        onAuthSuccess={() => {
          // Redirect handled by callback route
        }}
      />
    </div>
  );
}
