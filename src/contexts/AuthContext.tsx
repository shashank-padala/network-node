"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Get initial session with error handling
    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          console.warn("Failed to get session:", error);
        }
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.warn("Error getting session:", error);
        setUser(null);
        setLoading(false);
      });

    // Listen for auth changes with error handling
    let subscription: { unsubscribe: () => void } | null = null;
    
    try {
      const {
        data: { subscription: authSubscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
      subscription = authSubscription;
    } catch (error) {
      console.warn("Error setting up auth state listener:", error);
      setLoading(false);
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


