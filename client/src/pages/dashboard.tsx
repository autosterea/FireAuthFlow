import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Zap, 
  HardDrive, 
  CheckCircle, 
  Bell, 
  Database, 
  Shield, 
  Upload, 
  BarChart3 
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

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const getFirstName = (email: string) => {
    return email.split('@')[0];
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
              <span className="text-lg font-semibold text-foreground">Firebase Console</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="h-5 w-5" />
              </Button>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center" data-testid="avatar-user">
                  <span className="text-sm font-medium text-primary-foreground">
                    {user?.email ? getUserInitials(user.email) : "U"}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground hidden sm:block" data-testid="text-username">
                  {user?.displayName || user?.email?.split('@')[0] || "User"}
                </span>
                <Button 
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-logout"
                >
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
        <div className="mb-8 slide-up">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-welcome">
            Welcome back, {user?.email ? getFirstName(user.email) : "User"}!
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your Firebase projects today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border slide-up" data-testid="card-stats-users">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-foreground">1,234</p>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-chart-2 font-medium">+12%</span>
                <span className="text-muted-foreground ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border slide-up" data-testid="card-stats-requests">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">API Requests</p>
                  <p className="text-2xl font-bold text-foreground">45.2K</p>
                </div>
                <div className="h-10 w-10 bg-chart-1/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-chart-1" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-chart-2 font-medium">+8%</span>
                <span className="text-muted-foreground ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border slide-up" data-testid="card-stats-storage">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                  <p className="text-2xl font-bold text-foreground">2.4 GB</p>
                </div>
                <div className="h-10 w-10 bg-chart-3/10 rounded-lg flex items-center justify-center">
                  <HardDrive className="h-5 w-5 text-chart-3" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-chart-2 font-medium">+5%</span>
                <span className="text-muted-foreground ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border slide-up" data-testid="card-stats-errors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Error Rate</p>
                  <p className="text-2xl font-bold text-foreground">0.02%</p>
                </div>
                <div className="h-10 w-10 bg-chart-4/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-chart-4" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-destructive font-medium">-2%</span>
                <span className="text-muted-foreground ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="bg-card border-border slide-up" data-testid="card-activity">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3" data-testid="activity-item-1">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">New user registered</p>
                    <p className="text-xs text-muted-foreground">user@example.com joined 2 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3" data-testid="activity-item-2">
                  <div className="h-8 w-8 bg-chart-1/10 rounded-full flex items-center justify-center">
                    <Database className="h-4 w-4 text-chart-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">Database write operation</p>
                    <p className="text-xs text-muted-foreground">Updated user profile 5 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3" data-testid="activity-item-3">
                  <div className="h-8 w-8 bg-chart-3/10 rounded-full flex items-center justify-center">
                    <Upload className="h-4 w-4 text-chart-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">File uploaded to Storage</p>
                    <p className="text-xs text-muted-foreground">profile-image.jpg uploaded 8 minutes ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card border-border slide-up" data-testid="card-actions">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="ghost" 
                  className="p-4 h-auto bg-accent hover:bg-accent/80 transition-colors group text-left flex flex-col items-start"
                  data-testid="action-database"
                >
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Database className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Database</p>
                  <p className="text-xs text-muted-foreground">Manage collections</p>
                </Button>

                <Button 
                  variant="ghost" 
                  className="p-4 h-auto bg-accent hover:bg-accent/80 transition-colors group text-left flex flex-col items-start"
                  data-testid="action-auth"
                >
                  <div className="h-8 w-8 bg-chart-1/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-chart-1/20 transition-colors">
                    <Shield className="h-4 w-4 text-chart-1" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Authentication</p>
                  <p className="text-xs text-muted-foreground">Manage users</p>
                </Button>

                <Button 
                  variant="ghost" 
                  className="p-4 h-auto bg-accent hover:bg-accent/80 transition-colors group text-left flex flex-col items-start"
                  data-testid="action-storage"
                >
                  <div className="h-8 w-8 bg-chart-3/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-chart-3/20 transition-colors">
                    <Upload className="h-4 w-4 text-chart-3" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Storage</p>
                  <p className="text-xs text-muted-foreground">Upload files</p>
                </Button>

                <Button 
                  variant="ghost" 
                  className="p-4 h-auto bg-accent hover:bg-accent/80 transition-colors group text-left flex flex-col items-start"
                  data-testid="action-analytics"
                >
                  <div className="h-8 w-8 bg-chart-4/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-chart-4/20 transition-colors">
                    <BarChart3 className="h-4 w-4 text-chart-4" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Analytics</p>
                  <p className="text-xs text-muted-foreground">View reports</p>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
