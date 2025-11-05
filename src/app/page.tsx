"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/landing/Navigation";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
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

  // Redirect to members page if user is logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard/profile");
    }
  }, [user, loading, router]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render homepage if user is logged in (will redirect)
  if (user) {
    return null;
  }

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
