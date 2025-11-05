"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";
import { Network, Loader2, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAuthSuccess?: () => void;
  initialTab?: "signup" | "login";
};

export default function AuthModal({ open, onOpenChange, onAuthSuccess, initialTab = "signup" }: Props) {
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (!open) {
      setError(null);
      setSignupData({ name: "", email: "", password: "" });
      setLoginData({ email: "", password: "" });
      return;
    }

    // Set the active tab when modal opens
    setActiveTab(initialTab);

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        onAuthSuccess?.();
        onOpenChange(false);
      } else {
        setChecking(false);
      }
    });
  }, [open, initialTab, onAuthSuccess, onOpenChange, supabase]);

  async function handleGoogleLogin() {
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

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            name: signupData.name,
            full_name: signupData.name,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError("Failed to create account. Please try again.");
        setLoading(false);
        return;
      }

      // Check if email confirmation is required
      if (authData.user && !authData.session) {
        // Email confirmation required
        setSignupEmail(signupData.email);
        setShowEmailConfirmation(true);
        setLoading(false);
        return;
      }

      // Success - redirect to profile page for onboarding
      onOpenChange(false);
      router.push("/dashboard/profile");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Success - redirect to profile page for onboarding
        onOpenChange(false);
        router.push("/dashboard/profile");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-0">
          <div className="flex flex-col items-center mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Network className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Network
                  </span>
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Node
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide">
                  Connect & Build
                </div>
              </div>
            </div>
          </div>
          <DialogTitle className="sr-only">Sign in to NetworkNode</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 pt-1">
          {checking ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "signup" | "login")} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="login">Log In</TabsTrigger>
                </TabsList>

                <TabsContent value="signup" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                  <form onSubmit={handleSignup} className="space-y-3 sm:space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm">
                        {error}
                      </div>
                    )}

                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="signup-name" className="text-xs sm:text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="signup-name"
                        type="text"
                        required
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        placeholder="John Doe"
                        disabled={loading}
                        className="h-10 sm:h-11 text-sm sm:text-base"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="signup-email" className="text-xs sm:text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="signup-email"
                        type="email"
                        required
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        placeholder="your@email.com"
                        disabled={loading}
                        className="h-10 sm:h-11 text-sm sm:text-base"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="signup-password" className="text-xs sm:text-sm font-medium">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showSignupPassword ? "text" : "password"}
                          required
                          minLength={6}
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          placeholder="••••••••"
                          disabled={loading}
                          className="pr-10 h-10 sm:h-11 text-sm sm:text-base"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          disabled={loading}
                        >
                          {showSignupPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-10 sm:h-11 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-sm sm:text-base"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold bg-black hover:bg-gray-800 transition-colors text-white relative h-10 sm:h-11"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    <FcGoogle size={18} className="sm:w-5 sm:h-5" /> 
                    <span>Continue with Google</span>
                    <span className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 bg-green-600 text-white text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </Button>
                </TabsContent>

                <TabsContent value="login" className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                  <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm">
                        {error}
                      </div>
                    )}

                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="login-email" className="text-xs sm:text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="login-email"
                        type="email"
                        required
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        placeholder="your@email.com"
                        disabled={loading}
                        className="h-10 sm:h-11 text-sm sm:text-base"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="login-password" className="text-xs sm:text-sm font-medium">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showLoginPassword ? "text" : "password"}
                          required
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          placeholder="••••••••"
                          disabled={loading}
                          className="pr-10 h-10 sm:h-11 text-sm sm:text-base"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          disabled={loading}
                        >
                          {showLoginPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-10 sm:h-11 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-sm sm:text-base"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold bg-black hover:bg-gray-800 transition-colors text-white relative h-10 sm:h-11"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    <FcGoogle size={18} className="sm:w-5 sm:h-5" /> 
                    <span>Continue with Google</span>
                    <span className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 bg-green-600 text-white text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="text-center pt-2">
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  Join the Network & Start Building 🚀 
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                  Connect with builders, find co-founders, or land your next job
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>

      {/* Email Confirmation Dialog */}
      <Dialog open={showEmailConfirmation} onOpenChange={setShowEmailConfirmation}>
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-base sm:text-lg">Check Your Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                We've sent a confirmation email
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 px-2">
                Please check your email at <span className="font-semibold break-all">{signupEmail}</span> and click the confirmation link to verify your account.
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500">
                After confirming your email, you can sign in to continue.
              </p>
            </div>
            <Button
              onClick={() => {
                setShowEmailConfirmation(false);
                onOpenChange(false);
                setActiveTab("login");
                setSignupData({ name: "", email: "", password: "" });
              }}
              className="w-full h-10 sm:h-11 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-sm sm:text-base"
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
