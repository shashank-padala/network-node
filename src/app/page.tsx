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
import { SITE_CONFIG } from "@/constants/metadata";

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

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
      "description": SITE_CONFIG.description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_CONFIG.url}/dashboard/members?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
      "logo": `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      "description": SITE_CONFIG.description,
      "contactPoint": {
        "@type": "ContactPoint",
        "email": SITE_CONFIG.supportEmail,
        "contactType": "customer support"
      },
      "sameAs": []
    };

    // Add structured data scripts
    const script1 = document.createElement("script");
    script1.type = "application/ld+json";
    script1.text = JSON.stringify(structuredData);
    script1.id = "structured-data-website";

    const script2 = document.createElement("script");
    script2.type = "application/ld+json";
    script2.text = JSON.stringify(organizationData);
    script2.id = "structured-data-organization";

    // Remove existing scripts if they exist
    const existing1 = document.getElementById("structured-data-website");
    const existing2 = document.getElementById("structured-data-organization");
    if (existing1) existing1.remove();
    if (existing2) existing2.remove();

    // Append new scripts
    document.head.appendChild(script1);
    document.head.appendChild(script2);

    // Cleanup
    return () => {
      const script1Cleanup = document.getElementById("structured-data-website");
      const script2Cleanup = document.getElementById("structured-data-organization");
      if (script1Cleanup) script1Cleanup.remove();
      if (script2Cleanup) script2Cleanup.remove();
    };
  }, []);

  // Redirect to members page if user is logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard/members");
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
