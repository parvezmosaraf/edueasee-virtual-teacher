import { motion } from 'framer-motion';
import { RefreshCw, FileText, Check, BarChart2, Calculator, BookOpen, Mic, Languages } from 'lucide-react';

const features = [
  {
    icon: <RefreshCw size={24} />,
    title: 'Article Rewrite',
    description: 'AI-powered rewording of content while maintaining original meaning and context.',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    gradient: 'from-blue-500/20 to-indigo-500/20'
  },
  {
    icon: <FileText size={24} />,
    title: 'Paraphrasing',
    description: 'Generate alternative phrasing for sentences and paragraphs to enhance writing.',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    icon: <Check size={24} />,
    title: 'Grammar Fixing',
    description: 'Automatically correct grammar, spelling, and syntax issues in your texts.',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    icon: <BarChart2 size={24} />,
    title: 'Document Analysis',
    description: 'Upload documents for AI-driven insights, summaries, and key point extraction.',
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    gradient: 'from-amber-500/20 to-orange-500/20'
  },
  {
    icon: <Calculator size={24} />,
    title: 'Equation Solver',
    description: 'Solve mathematical equations with step-by-step explanations for better learning.',
    color: 'bg-red-500/10 text-red-600 dark:text-red-400',
    gradient: 'from-red-500/20 to-rose-500/20'
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Assignment Help',
    description: 'AI-powered assistance for various subjects and academic tasks to improve grades.',
    color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    gradient: 'from-sky-500/20 to-cyan-500/20'
  },
  {
    icon: <Mic size={24} />,
    title: 'Voice Input',
    description: 'Input queries using your voice for a hands-free educational experience.',
    color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    gradient: 'from-violet-500/20 to-purple-500/20'
  },
  {
    icon: <Languages size={24} />,
    title: 'Multilingual',
    description: 'Support for multiple languages making education accessible globally.',
    color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    gradient: 'from-teal-500/20 to-emerald-500/20'
  }
];

const Features = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            Comprehensive AI Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Leverage cutting-edge AI technology to enhance your academic performance with these powerful tools.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="group relative"
            >
              <div className={`h-full rounded-2xl p-6 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[360deg]`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;