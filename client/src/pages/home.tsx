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
  Rocket,
  Sparkles,
  Star
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Floating particles component (optimized for performance)
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-primary/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 12,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Animated card component
const AnimatedCard = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.8 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.3 }
      }}
      className={`${className} transform-gpu`}
      style={{
        transformStyle: "preserve-3d",
        cursor: 'default'
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { user } = useAuth();
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useSpring(useTransform(scrollY, [0, 1000], [0, -100]), { damping: 30, stiffness: 400 });
  const y2 = useSpring(useTransform(scrollY, [0, 1000], [0, -200]), { damping: 30, stiffness: 400 });
  const y3 = useSpring(useTransform(scrollY, [0, 1000], [0, -300]), { damping: 30, stiffness: 400 });
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);


  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradients */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: y1 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-blue-500/10 to-purple-500/20" />
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
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

      {/* Floating particles */}
      <FloatingParticles />


      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
          style={{ y: y2 }}
        >
          {/* Logo with amazing animations */}
          <motion.div
            initial={{ scale: 0, rotate: 180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center mb-12"
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="h-24 w-24 bg-gradient-to-br from-primary to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl"
                style={{ rotate, scale }}
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.svg 
                  className="h-12 w-12 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <path d="M5.5 5.5L7.5 21.5L12 18.5L16.5 21.5L18.5 5.5L12 8.5L5.5 5.5Z"/>
                </motion.svg>
              </motion.div>
              
              {/* Floating sparkles around logo */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full"
                  style={{
                    top: `${Math.sin(i * Math.PI / 3) * 60 + 50}%`,
                    left: `${Math.cos(i * Math.PI / 3) * 60 + 50}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Title with staggered animation */}
          <motion.div className="space-y-6 mb-12">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-foreground via-primary to-blue-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.span
                className="inline-block"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Fire
              </motion.span>
              <motion.span
                className="inline-block bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Auth
              </motion.span>
              <motion.span
                className="inline-block"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                Flow
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              The most beautiful Firebase authentication template that will{" "}
              <motion.span 
                className="text-primary font-semibold"
                animate={{ 
                  textShadow: ["0 0 0px #ef4444", "0 0 20px #ef4444", "0 0 0px #ef4444"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                blow your mind
              </motion.span>
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {!user ? (
              <Link href="/login">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ cursor: 'default' }}
                >
                  <Button 
                    size="lg" 
                    className="text-xl px-12 py-6 bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary text-white shadow-2xl hover:shadow-primary/25 transition-all duration-500 relative overflow-hidden group"
                    data-testid="button-try-demo"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                    <Sparkles className="mr-3 h-6 w-6" />
                    Try the Live Demo
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ cursor: 'default' }}
                >
                  <Button 
                    size="lg" 
                    className="text-xl px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white shadow-2xl"
                  >
                    <CheckCircle className="mr-3 h-6 w-6" />
                    Go to Dashboard
                  </Button>
                </motion.div>
              </Link>
            )}
            
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{ cursor: 'default' }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="text-xl px-12 py-6 border-2 hover:bg-primary/10 hover:border-primary transition-all duration-300 backdrop-blur-sm"
                asChild
              >
                <a href="https://github.com/autosterea/FireAuthFlow#readme" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-3 h-6 w-6" />
                  GitHub Documentation
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section with amazing cards */}
      <section className="relative py-32">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ y: y3 }}
        >
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Absolutely Stunning Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every detail crafted to perfection for the ultimate developer experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Bulletproof Security",
                description: "Enterprise-grade Firebase authentication with Google OAuth integration",
                color: "from-blue-500 to-cyan-500",
                delay: 0.1
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized performance with React 18, TypeScript, and modern tooling",
                color: "from-yellow-500 to-orange-500",
                delay: 0.2
              },
              {
                icon: Code,
                title: "Developer Friendly",
                description: "Clean code, comprehensive docs, and AI agent compatibility",
                color: "from-green-500 to-emerald-500",
                delay: 0.3
              },
              {
                icon: Rocket,
                title: "Production Ready",
                description: "Deploy anywhere with complete CI/CD and monitoring setup",
                color: "from-purple-500 to-pink-500",
                delay: 0.4
              },
              {
                icon: Users,
                title: "Open Source",
                description: "MIT licensed, community-driven, and completely free to use",
                color: "from-red-500 to-rose-500",
                delay: 0.5
              },
              {
                icon: Star,
                title: "Next-Level UX",
                description: "Stunning animations and interactions that wow your users",
                color: "from-indigo-500 to-blue-500",
                delay: 0.6
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedCard key={index} delay={feature.delay} className="h-full">
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 backdrop-blur-sm bg-card/80 border-border/50 group overflow-hidden">
                    <CardHeader className="text-center pb-4">
                      <motion.div 
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                    
                    {/* Hover overlay effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                  </Card>
                </AnimatedCard>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* What You Get Section - Comprehensive Benefits */}
      <section className="relative py-24 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              What You Get
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build amazing apps with world-class authentication
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Complete Firebase Setup",
                description: "Pre-configured Firebase authentication with Google OAuth, email verification, and user management. No complex setup required.",
                benefits: ["Google OAuth integration", "Email verification", "User profile management", "Session persistence"]
              },
              {
                title: "Production-Ready Code",
                description: "Clean, well-documented TypeScript code following best practices. Ready to deploy and scale with your business.",
                benefits: ["TypeScript throughout", "React 18 optimized", "Error boundaries", "Performance optimized"]
              },
              {
                title: "Beautiful UI Components",
                description: "Stunning shadcn/ui components with Tailwind CSS. Responsive design that works perfectly on all devices.",
                benefits: ["Responsive design", "Accessibility features", "Dark/light themes", "Mobile optimized"]
              },
              {
                title: "Developer Experience",
                description: "Hot reload, TypeScript intellisense, and comprehensive documentation. Start building immediately.",
                benefits: ["Hot reload setup", "VSCode ready", "Comprehensive docs", "AI agent compatible"]
              },
              {
                title: "Deployment Ready",
                description: "Deploy anywhere with included guides for Vercel, Netlify, and more. CI/CD configurations included.",
                benefits: ["Multiple deploy options", "Environment configs", "Build optimizations", "CDN ready"]
              },
              {
                title: "Open Source Freedom",
                description: "MIT licensed with no restrictions. Modify, extend, and use commercially without any limitations.",
                benefits: ["MIT license", "Commercial use", "No restrictions", "Community support"]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                style={{ cursor: 'default' }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
                  <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                  <ul className="space-y-2">
                    {item.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action in What You Get section */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Build Something Amazing?</h3>
              <p className="text-lg text-muted-foreground mb-6">Join thousands of developers who chose FireAuthFlow for their projects</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!user ? (
                  <motion.div whileHover={{ scale: 1.05 }} style={{ cursor: 'default' }}>
                    <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary" asChild>
                      <a href="https://github.com/autosterea/FireAuthFlow#readme" target="_blank" rel="noopener noreferrer">
                        <BookOpen className="mr-2 h-5 w-5" />
                        GitHub Documentation
                      </a>
                    </Button>
                  </motion.div>
                ) : (
                  <Link href="/dashboard">
                    <motion.div whileHover={{ scale: 1.05 }} style={{ cursor: 'default' }}>
                      <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        View Dashboard
                      </Button>
                    </motion.div>
                  </Link>
                )}
                <motion.div whileHover={{ scale: 1.05 }} style={{ cursor: 'default' }}>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2" asChild>
                    <a href="https://github.com/autosterea/FireAuthFlow#readme" target="_blank" rel="noopener noreferrer">
                      <BookOpen className="mr-2 h-5 w-5" />
                      GitHub Documentation
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Footer with final animations */}
      <motion.footer 
        className="py-8 border-t border-border/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div 
                className="h-10 w-10 bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center mr-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.5 5.5L7.5 21.5L12 18.5L16.5 21.5L18.5 5.5L12 8.5L5.5 5.5Z"/>
                </svg>
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                FireAuthFlow
              </span>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              Open source Firebase authentication template for React and TypeScript
            </p>
            
            <motion.div 
              className="text-sm text-muted-foreground space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p>
                Developed and open sourced by{" "}
                <motion.a 
                  href="https://autosterea.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Autosterea
                </motion.a>
              </p>
              <p>
                Created by{" "}
                <motion.a 
                  href="https://github.com/autosterea" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Ravi Dewangan
                </motion.a>
                {" "} • Available on{" "}
                <motion.a 
                  href="https://github.com/autosterea/FireAuthFlow" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  GitHub
                </motion.a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}