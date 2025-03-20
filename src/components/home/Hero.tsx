
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Hero = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl animate-blob" />
        <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-100/20 dark:bg-blue-900/20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] left-[5%] w-[40%] h-[40%] rounded-full bg-purple-100/20 dark:bg-purple-900/20 blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-background/50 backdrop-blur-sm">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                <Sparkles size={14} className="text-primary" />
                <span className="text-muted-foreground">Powered by Google Gemini AI</span>
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Your Virtual <span className="text-primary">AI Teacher</span> for Academic Success
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed">
              Complete your homework, rewrite articles, solve equations, and get academic assistance with our AI-powered educational platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
                >
                  Explore Dashboard <ArrowRight size={18} className="ml-2" />
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
                >
                  Get Started <ArrowRight size={18} className="ml-2" />
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-primary/30 to-secondary/30" />
                  </div>
                ))}
              </div>
              <span>Join 10,000+ students worldwide</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative lg:ml-auto"
          >
            <div className="relative w-full max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-2xl -z-10" />
              <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
                <div className="bg-muted/80 backdrop-blur-sm p-4 border-b border-border/50">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="ml-4 h-5 w-40 rounded-md bg-border/60" />
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Brain size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 glass-card p-4 rounded-xl">
                      <p className="text-sm text-foreground/90">
                        Hello! I'm your AI teacher. How can I help with your homework today?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Avatar className="h-9 w-9 border border-border/50">
                        <AvatarImage src="/lovable-uploads/2f665060-79e0-4e92-b767-13c8274f1868.png" alt="Student avatar" />
                        <AvatarFallback className="bg-muted-foreground/20 text-foreground/70 text-xs">
                          ST
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 bg-muted/30 p-4 rounded-xl">
                      <p className="text-sm text-foreground/90">
                        I need help solving this quadratic equation: 3x² + 8x - 16 = 0
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Brain size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 glass-card p-4 rounded-xl">
                      <p className="text-sm text-foreground/90">
                        I'll solve this step by step:
                      </p>
                      <div className="mt-2 pt-2 border-t border-border/50 space-y-1">
                        <p className="text-sm text-foreground/80">1. Using the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a</p>
                        <p className="text-sm text-foreground/80">2. With a=3, b=8, c=-16</p>
                        <p className="text-sm text-foreground/80">3. x = (-8 ± √(64 + 192)) / 6</p>
                        <p className="text-sm text-foreground/80">4. x = (-8 ± √256) / 6 = (-8 ± 16) / 6</p>
                        <p className="text-sm font-medium text-foreground">5. x = 4/3 or x = -4</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-background/50 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-10 rounded-md border border-border bg-background px-3 flex items-center">
                      <span className="text-sm text-muted-foreground">Ask a question...</span>
                    </div>
                    <button className="h-10 w-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
