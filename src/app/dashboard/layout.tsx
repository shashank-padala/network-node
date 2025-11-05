"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Users,
  Briefcase,
  Rocket,
  User,
  LogOut,
  Network,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { ProfileBlockingDialog } from "@/components/ProfileBlockingDialog";
import { checkProfileCompletion } from "@/lib/profile-utils";

const navigation = [
  { name: "Members", href: "/dashboard/members", icon: Users },
  { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
  { name: "Startups", href: "/dashboard/startups", icon: Rocket },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const supabase = createClient();
  const router = useRouter();
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [showBlockingDialog, setShowBlockingDialog] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    async function checkProfile() {
      if (!user) {
        setCheckingProfile(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .single();

        if (error || !data) {
          // Profile should always exist due to database trigger, but if it doesn't,
          // something went wrong - refresh to retry
          console.error("Profile not found - trigger may have failed:", error);
          router.refresh();
          setCheckingProfile(false);
          return;
        }

        // Check if profile is complete
        const completionStatus = await checkProfileCompletion(user.id);
        setProfileComplete(completionStatus.isComplete);

        // If profile is incomplete and user is not on profile page, show blocking dialog
        if (!completionStatus.isComplete && pathname !== "/dashboard/profile") {
          setShowBlockingDialog(true);
        } else if (pathname === "/dashboard/profile") {
          // Close dialog if user is on profile page
          setShowBlockingDialog(false);
        }
      } catch (err) {
        console.error("Error checking profile:", err);
      } finally {
        setCheckingProfile(false);
      }
    }

    // Only check profile once when user is available
    if (user) {
      checkProfile();
    } else {
      setCheckingProfile(false);
    }
  }, [user, supabase, pathname]);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex-col transition-all duration-300 z-50 w-64">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <Link href="/dashboard/members" className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg shadow-sm">
                <Network className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-base font-bold text-blue-600">Network</span>
                  <span className="text-base font-bold text-green-600">Node</span>
                </div>
                <div className="text-[9px] text-gray-500 font-medium tracking-wide leading-none">
                  Connect & Build
                </div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const isProfilePage = item.href === "/dashboard/profile";
              const canNavigate = profileComplete || isProfilePage;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  onClick={(e) => {
                    if (!canNavigate && !isProfilePage) {
                      e.preventDefault();
                      setShowBlockingDialog(true);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 w-full cursor-pointer",
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    !canNavigate && !isProfilePage ? "opacity-60" : ""
                  )}
                >
                  <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-blue-600" : "")} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={handleLogout}
              className="w-full text-sm cursor-pointer hover:bg-red-50 hover:text-red-600 transition-all duration-200 flex items-center px-3 py-2.5 rounded-lg text-gray-600 justify-start"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="ml-2">Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <Link href="/dashboard/members" className="flex items-center gap-1.5 cursor-pointer" onClick={() => setSidebarOpen(false)}>
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg shadow-sm">
                    <Network className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-base font-bold text-blue-600">Network</span>
                      <span className="text-base font-bold text-green-600">Node</span>
                    </div>
                    <div className="text-[9px] text-gray-500 font-medium tracking-wide leading-none">
                      Connect & Build
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  const isProfilePage = item.href === "/dashboard/profile";
                  const canNavigate = profileComplete || isProfilePage;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      onClick={(e) => {
                        if (!canNavigate && !isProfilePage) {
                          e.preventDefault();
                          setSidebarOpen(false);
                          setShowBlockingDialog(true);
                        } else {
                          setSidebarOpen(false);
                        }
                      }}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors duration-150 w-full cursor-pointer",
                        isActive
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        !canNavigate && !isProfilePage ? "opacity-60" : ""
                      )}
                    >
                      <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-blue-600" : "")} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-base cursor-pointer justify-start hover:bg-red-50 hover:text-red-600 transition-all duration-200 flex items-center px-3 py-3 rounded-lg text-gray-600"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span className="ml-3">Log Out</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300 md:ml-64">
        <main className="flex-1 p-3 sm:p-4 md:p-6 pb-20 md:pb-6 md:pt-6">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg safe-area-inset-bottom">
        <div className="grid grid-cols-4 h-16">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const isProfilePage = item.href === "/dashboard/profile";
            const canNavigate = profileComplete || isProfilePage;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                onClick={(e) => {
                  if (!canNavigate && !isProfilePage) {
                    e.preventDefault();
                    setShowBlockingDialog(true);
                  }
                }}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5 transition-colors duration-150 active:bg-gray-50",
                  isActive
                    ? "text-blue-600"
                    : canNavigate
                    ? "text-gray-600"
                    : "text-gray-400 opacity-50"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-blue-600")} />
                <span className={cn(
                  "text-[10px] font-medium leading-tight",
                  isActive && "text-blue-600 font-semibold"
                )}>
                  {item.name}
                </span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-blue-600 rounded-b-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {!checkingProfile && (
        <ProfileBlockingDialog 
          open={showBlockingDialog} 
          onClose={() => setShowBlockingDialog(false)}
        />
      )}
    </div>
  );
}

