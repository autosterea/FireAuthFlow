import { useState } from "react";
import { Redirect, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { signInWithGoogle } from "@/lib/firebase";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    console.log("User signed in, redirecting to dashboard:", user);
    return <Redirect to="/dashboard" />;
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      console.log("Starting Google sign-in...");
      const result = await signInWithGoogle();
      console.log("Sign-in result:", result);
      
      // Show success toast with confetti
      toast({
        title: "🎉 Success!",
        description: "Welcome to FireAuthFlow! Redirecting to your dashboard...",
      });
      
    } catch (error: any) {
      console.error("Sign-in error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container min-h-screen flex items-center justify-center p-4 relative">
      {/* Back to Home Button */}
      <Link href="/">
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 hover:bg-background/80 backdrop-blur-sm"
          data-testid="button-back-home"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </Link>
      
      <div className="w-full max-w-md space-y-8 fade-in">
        {/* Firebase Logo and Branding */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary rounded-lg flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5.5 5.5L7.5 21.5L12 18.5L16.5 21.5L18.5 5.5L12 8.5L5.5 5.5Z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Welcome</h2>
          <p className="mt-2 text-muted-foreground">Sign in to your Firebase account</p>
        </div>

        {/* Login Card */}
        <Card className="bg-card shadow-lg border-border">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Google Sign In Button */}
              <Button 
                type="button" 
                className="w-full bg-white text-gray-700 border border-gray-300 py-4 font-medium hover:bg-gray-50 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shadow-md"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                data-testid="button-google-login"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground inline" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>

              {/* Info Text */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Secure authentication powered by Firebase
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  <a href="https://autosterea.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                    Powered by Autosterea
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}