import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  CheckCircle, 
  Sparkles,
  Star,
  Zap,
  Trophy,
  Gift,
  Crown
} from "lucide-react";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Floating celebration particles
const CelebrationParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    delay: Math.random() * 3,
    duration: Math.random() * 4 + 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -200, 0],
            rotate: [0, 360, 720],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles 
            className="text-primary" 
            size={particle.size}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Animated stat card
const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  color, 
  delay = 0 
}: {
  icon: any;
  title: string;
  value: string;
  subtitle: string;
  color: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 200 }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10,
        transition: { duration: 0.3 }
      }}
      className="transform-gpu"
    >
      <Card className="h-full hover:shadow-2xl transition-all duration-500 backdrop-blur-sm bg-card/90 border-border/50 group overflow-hidden relative">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />
        
        <CardHeader className="text-center pb-4">
          <motion.div 
            className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
            whileHover={{ 
              rotate: 360,
              scale: 1.2,
            }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="h-8 w-8 text-white" />
          </motion.div>
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center">
          <motion.div 
            className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {value}
          </motion.div>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showCelebration, setShowCelebration] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Hide celebration after 3 seconds
    const timer = setTimeout(() => setShowCelebration(false), 5000);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null;
  }

  const userInitials = user.displayName
    ?.split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase() || user.email?.[0]?.toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background animations */}
      <motion.div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Interactive cursor */}
      <motion.div
        className="fixed w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x * (window.innerWidth / 100) - 16,
          y: mousePosition.y * (window.innerHeight / 100) - 16,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />

      {/* Celebration particles */}
      <AnimatePresence>
        {showCelebration && <CelebrationParticles />}
      </AnimatePresence>

      {/* Header */}
      <motion.header 
        className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-40"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <motion.div 
              className="flex items-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="h-12 w-12 bg-gradient-to-br from-primary to-blue-500 rounded-xl flex items-center justify-center mr-3 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.5 5.5L7.5 21.5L12 18.5L16.5 21.5L18.5 5.5L12 8.5L5.5 5.5Z"/>
                </svg>
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                FireAuthFlow
              </span>
            </motion.div>

            {/* User Menu */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div 
                className="flex items-center space-x-3 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                    <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-blue-500 text-white font-bold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="hidden sm:block">
                  <p className="font-medium text-foreground">{user.displayName}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <Crown className="h-8 w-8 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-blue-500 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <Trophy className="h-8 w-8 text-primary" />
          </motion.div>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            You're successfully authenticated with Firebase! Your dashboard is ready with all the amazing features.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StatCard
            icon={CheckCircle}
            title="Auth Status"
            value="Active"
            subtitle="Securely authenticated"
            color="from-green-500 to-emerald-500"
            delay={0.2}
          />
          <StatCard
            icon={Shield}
            title="Security Level"
            value="100%"
            subtitle="Firebase protected"
            color="from-blue-500 to-cyan-500"
            delay={0.4}
          />
          <StatCard
            icon={Zap}
            title="Performance"
            value="⚡ Fast"
            subtitle="Optimized experience"
            color="from-yellow-500 to-orange-500"
            delay={0.6}
          />
          <StatCard
            icon={Star}
            title="Experience"
            value="★ 5/5"
            subtitle="Amazing animations"
            color="from-purple-500 to-pink-500"
            delay={0.8}
          />
        </div>

        {/* User Information Card */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* User Details */}
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full hover:shadow-2xl transition-all duration-500 backdrop-blur-sm bg-card/90 border-border/50 overflow-hidden relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <User className="h-6 w-6 text-primary" />
                  User Information
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <motion.div 
                  className="flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                    <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-blue-500 text-white text-2xl font-bold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                <div className="space-y-4">
                  <motion.div 
                    className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Display Name</p>
                      <p className="text-muted-foreground">{user.displayName || "Not provided"}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email Address</p>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Shield className="h-5 w-5 text-primary" />
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p className="font-medium">Email Verified</p>
                        <p className="text-muted-foreground">Security status</p>
                      </div>
                      <Badge variant={user.emailVerified ? "default" : "secondary"} className="ml-2">
                        {user.emailVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Account Created</p>
                      <p className="text-muted-foreground">
                        {user.metadata.creationTime 
                          ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : "Not available"
                        }
                      </p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Success Message */}
          <motion.div
            whileHover={{ scale: 1.02, rotateY: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full hover:shadow-2xl transition-all duration-500 backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 overflow-hidden relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-3 text-green-600">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <CheckCircle className="h-6 w-6" />
                  </motion.div>
                  Authentication Success!
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <motion.div 
                  className="text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Gift className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">Congratulations! 🎉</h3>
                  <p className="text-muted-foreground mb-6">
                    You've successfully experienced the most beautiful Firebase authentication flow!
                  </p>
                </motion.div>

                <div className="space-y-3">
                  {[
                    "✨ Stunning animations and transitions",
                    "🔒 Enterprise-grade security",
                    "⚡ Lightning-fast performance",
                    "🎨 Beautiful user interface",
                    "📱 Fully responsive design"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-2 rounded-lg bg-green-500/10"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                      whileHover={{ x: 10, scale: 1.05 }}
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="text-center pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  <p className="text-sm text-muted-foreground">
                    Ready to build amazing apps? Start with FireAuthFlow! 🚀
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}