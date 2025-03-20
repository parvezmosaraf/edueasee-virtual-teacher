import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, BookOpen, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const steps = [
  {
    number: '01',
    title: 'Input Your Task',
    description: 'Share your academic question, upload a document, or speak directly to our AI with your homework challenge.',
    icon: <Upload className="w-6 h-6" />,
    color: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-500'
  },
  {
    number: '02',
    title: 'AI Processing',
    description: 'Our Google Gemini-powered AI analyzes your input and generates accurate, educational responses.',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-500'
  },
  {
    number: '03',
    title: 'Review & Learn',
    description: 'Receive detailed explanations, step-by-step solutions, and educational insights to enhance your understanding.',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-500'
  }
];

const HowItWorks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="container px-4 md:px-6 py-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold tracking-tight sm:text-5xl mb-6"
              >
                How Edueasee Works
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-muted-foreground"
              >
                Our platform makes academic assistance simpler than ever with an intuitive, powerful AI
              </motion.p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 hidden md:block" />

              <div className="grid md:grid-cols-3 gap-8 relative">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative group"
                  >
                    <div className={`h-full rounded-2xl p-8 bg-gradient-to-br ${step.color} backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
                      <div className="relative mb-8">
                        <span className="text-6xl font-bold text-primary/10 absolute -top-4 left-0">
                          {step.number}
                        </span>
                        <div className={`w-14 h-14 rounded-xl bg-white/80 dark:bg-white/10 flex items-center justify-center ${step.iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[360deg]`}>
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                          <ArrowRight className="w-8 h-8 text-primary/20" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-16"
            >
              <a
                href="/signup"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Get Started Now
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HowItWorks;