import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  User, 
  Mail, 
  Shield,
  Calendar,
  LogOut
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.5 5.5L7.5 21.5L12 18.5L16.5 21.5L18.5 5.5L12 8.5L5.5 5.5Z"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-foreground">FireAuthFlow</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full"
                    data-testid="avatar-user"
                  />
                ) : (
                  <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center" data-testid="avatar-user">
                    <span className="text-sm font-medium text-primary-foreground">
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-foreground hidden sm:block" data-testid="text-username">
                  {user?.displayName || user?.email?.split('@')[0] || "User"}
                </span>
                <Button 
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <h1 className="text-3xl font-bold text-foreground" data-testid="text-welcome">
              Authentication Successful!
            </h1>
          </div>
          <p className="text-muted-foreground">
            You have successfully signed in using Firebase Authentication with Google.
          </p>
        </div>

        {/* Firebase Authentication Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Information */}
          <Card className="bg-card border-border" data-testid="card-user-info">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground" data-testid="text-user-email">
                    {user?.email || "Not available"}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Display Name</p>
                  <p className="text-sm text-muted-foreground" data-testid="text-display-name">
                    {user?.displayName || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">User ID (UID)</p>
                  <p className="text-sm text-muted-foreground font-mono break-all" data-testid="text-user-uid">
                    {user?.uid || "Not available"}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email Verified</p>
                  <p className="text-sm text-muted-foreground" data-testid="text-email-verified">
                    {user?.emailVerified ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authentication Details */}
          <Card className="bg-card border-border" data-testid="card-auth-details">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Authentication Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Authentication Status</p>
                  <p className="text-sm text-green-600 font-medium" data-testid="text-auth-status">
                    Authenticated
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Authentication Provider</p>
                  <p className="text-sm text-muted-foreground" data-testid="text-auth-provider">
                    Google
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Account Creation</p>
                  <p className="text-sm text-muted-foreground" data-testid="text-creation-time">
                    {user?.metadata?.creationTime ? 
                      new Date(user.metadata.creationTime).toLocaleDateString() + ' at ' + 
                      new Date(user.metadata.creationTime).toLocaleTimeString() : 
                      "Not available"
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Last Sign In</p>
                  <p className="text-sm text-muted-foreground" data-testid="text-last-signin">
                    {user?.metadata?.lastSignInTime ? 
                      new Date(user.metadata.lastSignInTime).toLocaleDateString() + ' at ' + 
                      new Date(user.metadata.lastSignInTime).toLocaleTimeString() : 
                      "Not available"
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Anonymous User</p>
                  <p className="text-sm text-muted-foreground" data-testid="text-anonymous">
                    {user?.isAnonymous ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        <Card className="bg-green-50 border-green-200 mt-8" data-testid="card-success">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-green-800">
                  Firebase Authentication Working Successfully!
                </h3>
                <p className="text-green-700 mt-1">
                  Your Firebase authentication is properly configured and working. The user has been successfully authenticated using Google OAuth and all user information is being retrieved correctly from Firebase.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}