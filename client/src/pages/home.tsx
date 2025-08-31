import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { 
  Zap, 
  Shield, 
  Code, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Github,
  BookOpen,
  Rocket
} from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-primary rounded-xl flex items-center justify-center mb-8">
              <svg className="h-10 w-10 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.5 5.5L7.5 21.5L12 18.5L16.5 21.5L18.5 5.5L12 8.5L5.5 5.5Z"/>
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Firebase Authentication
              <span className="block text-primary">Demo & Template</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              A complete, production-ready Firebase authentication system with Google OAuth. 
              Open source template for developers and AI agents to implement secure authentication quickly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="text-lg px-8 py-3">
                    <Users className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button size="lg" className="text-lg px-8 py-3">
                    <Shield className="mr-2 h-5 w-5" />
                    Try Demo Login
                  </Button>
                </Link>
              )}
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need for Firebase Auth
            </h2>
            <p className="text-xl text-muted-foreground">
              Production-ready authentication with modern React and TypeScript
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Instant Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ready-to-use Firebase configuration with Google OAuth. 
                  Just add your Firebase credentials and you're ready to go.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Secure Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Google OAuth integration with popup and redirect fallbacks. 
                  Handles authentication state, protected routes, and user sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <Code className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Modern Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built with React 18, TypeScript, Vite, Tailwind CSS, and shadcn/ui components. 
                  Clean, maintainable code structure.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete user information display, authentication status, 
                  and proper sign-out functionality.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <Rocket className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Deploy Anywhere</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Works on Replit, Vercel, Netlify, and any hosting platform. 
                  Environment-aware authentication flow.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI Agent Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive documentation and clear code structure 
                  makes it easy for AI agents to understand and implement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What's Included
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to implement Firebase authentication
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Frontend Components
              </h3>
              <div className="space-y-4">
                {[
                  "Clean login page with Google OAuth",
                  "Protected route wrapper component",
                  "User dashboard with authentication details",
                  "Loading states and error handling",
                  "Responsive design for mobile and desktop",
                  "Light/dark theme support"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Backend & Configuration
              </h3>
              <div className="space-y-4">
                {[
                  "Firebase configuration with environment variables",
                  "Google OAuth provider setup",
                  "Authentication state management",
                  "Popup and redirect authentication flows",
                  "User session persistence",
                  "Express.js server with Vite integration"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Follow the setup guide to configure Firebase and deploy your own authentication system
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              <BookOpen className="mr-2 h-5 w-5" />
              Setup Guide
            </Button>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Try Live Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.5 5.5L7.5 21.5L12 18.5L16.5 21.5L18.5 5.5L12 8.5L5.5 5.5Z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-foreground">Firebase Auth Demo</span>
            </div>
            <p className="text-muted-foreground">
              Open source template for implementing Firebase authentication with React and TypeScript
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}