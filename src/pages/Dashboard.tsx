import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { FileText, Edit, CheckCircle, Calculator, BookOpen, MessageSquare, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    id: 'rewrite',
    name: 'Article Rewrite',
    description: 'Reword your content while preserving the original meaning',
    icon: <Edit className="h-6 w-6" />,
    path: '/tools/rewrite',
    color: 'from-blue-500/20 to-indigo-500/20',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'paraphrase',
    name: 'Paraphrasing',
    description: 'Generate alternative phrasings for your sentences',
    icon: <MessageSquare className="h-6 w-6" />,
    path: '/tools/paraphrase',
    color: 'from-green-500/20 to-emerald-500/20',
    textColor: 'text-green-600 dark:text-green-400',
  },
  {
    id: 'grammar',
    name: 'Grammar Fix',
    description: 'Correct grammar, spelling, and syntax errors',
    icon: <CheckCircle className="h-6 w-6" />,
    path: '/tools/grammar',
    color: 'from-purple-500/20 to-pink-500/20',
    textColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    id: 'document',
    name: 'Document Analysis',
    description: 'Analyze and summarize documents for key insights',
    icon: <FileText className="h-6 w-6" />,
    path: '/tools/document',
    color: 'from-amber-500/20 to-orange-500/20',
    textColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    id: 'equations',
    name: 'Equation Solver',
    description: 'Solve mathematical equations with step-by-step explanations',
    icon: <Calculator className="h-6 w-6" />,
    path: '/tools/equations',
    color: 'from-red-500/20 to-rose-500/20',
    textColor: 'text-red-600 dark:text-red-400',
  },
  {
    id: 'assignment',
    name: 'Assignment Helper',
    description: 'Get assistance with various subjects and academic tasks',
    icon: <BookOpen className="h-6 w-6" />,
    path: '/tools/assignment',
    color: 'from-sky-500/20 to-cyan-500/20',
    textColor: 'text-sky-600 dark:text-sky-400',
  },
];

const Dashboard = () => {
  const { user, isAuthenticated, tempAuthEnabled } = useAuth();
  
  useEffect(() => {
    document.title = "Dashboard | Edueasee";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 py-4">
        <div className="container flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-bold text-primary">
            Edueasee
          </Link>
          <nav className="flex items-center space-x-4">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Home size={16} />
              <span>Home</span>
            </Link>
            <Link to="/profile" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-12 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {tempAuthEnabled ? 'Demo Dashboard' : `Welcome back, ${user?.full_name || 'there'}`}
            </h1>
            <p className="text-lg text-muted-foreground">
              {tempAuthEnabled 
                ? 'This is a demo mode. Your progress won\'t be saved.'
                : 'Choose a tool to get started with your academic tasks'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={feature.path} className="block h-full">
                  <div className={`glass-card h-full rounded-2xl p-6 shadow-md transition-all hover:shadow-lg hover:translate-y-[-2px] bg-gradient-to-br ${feature.color}`}>
                    <div className={`rounded-full w-12 h-12 flex items-center justify-center bg-background mb-4 ${feature.textColor}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                    <Button variant="ghost" className="w-full justify-between">
                      Get Started <ArrowRight size={16} />
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
