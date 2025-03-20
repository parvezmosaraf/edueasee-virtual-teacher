
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { FileText, Edit, CheckCircle, Calculator, BookOpen, MessageSquare, ArrowRight } from 'lucide-react';

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

const DashboardFeatures = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section id="dashboard-features" className="py-24 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            AI-Powered Tools
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Discover our suite of specialized tools designed to enhance your academic journey
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.slice(0, 6).map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`glass-card h-full rounded-2xl p-6 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:translate-y-[-2px] bg-gradient-to-br ${feature.color}`}>
                <div className={`rounded-full w-12 h-12 flex items-center justify-center bg-background mb-4 ${feature.textColor}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                {isAuthenticated ? (
                  <Link 
                    to={feature.path} 
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Try it now <ArrowRight size={14} className="ml-1" />
                  </Link>
                ) : (
                  <Link 
                    to="/signup" 
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Sign up to access <ArrowRight size={14} className="ml-1" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to={isAuthenticated ? "/dashboard" : "/signup"}
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {isAuthenticated ? "Access Full Dashboard" : "Unlock All Features"}
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardFeatures;
