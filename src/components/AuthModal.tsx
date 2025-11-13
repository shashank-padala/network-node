"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAuthSuccess?: () => void;
};

export default function AuthModal({ open, onOpenChange, onAuthSuccess }: Props) {
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (!open) {
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        onAuthSuccess?.();
        onOpenChange(false);
      } else {
        setChecking(false);
      }
    });
  }, [open, onAuthSuccess, onOpenChange, supabase]);

  async function handleGoogleLogin() {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md">
        <DialogHeader className="text-center pb-0">
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Welcome to NetworkNode
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Discover people at NS, explore their current projects, collaborate on new ideas, and build together. Join a community of creators and builders.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {checking ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <>
              <Button
                type="button"
                className="w-full flex items-center justify-center gap-2.5 sm:gap-3 py-3 sm:py-4 text-sm sm:text-base font-bold bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-500 shadow-lg hover:shadow-xl transition-all text-gray-900 relative h-14 sm:h-16"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <FcGoogle size={28} className="sm:w-9 sm:h-9" /> 
                <span className="font-bold">Continue with Google</span>
                {loading && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
