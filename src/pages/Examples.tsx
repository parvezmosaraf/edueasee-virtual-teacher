
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Examples = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl mb-6"
            >
              See Edueasee in Action
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Explore real examples of how our AI helps students master various subjects
            </motion.p>
          </div>

          <div className="grid gap-12 mt-16">
            {[
              {
                subject: "Mathematics",
                title: "Calculus Problem Solving",
                description: "See how our AI breaks down complex calculus problems with step-by-step explanations.",
                image: "https://i.imgur.com/ebie2Hw.png",
                features: [
                  "Step-by-step solution process",
                  "Visual aids and graphs when needed",
                  "Explanation of underlying concepts",
                  "Alternative solution methods"
                ]
              },
              {
                subject: "Essay Writing",
                title: "Essay Structure and Improvement",
                description: "Watch as our AI analyzes essay structure and provides targeted improvements.",
                image: "https://i.imgur.com/g0x3BLJ.jpeg",
                features: [
                  "Thesis statement analysis",
                  "Paragraph structure feedback",
                  "Transition improvement suggestions",
                  "Citation and reference formatting"
                ]
              },
              {
                subject: "Physics",
                title: "Physics Problem Analysis",
                description: "Our AI breaks down complex physics problems and explains the principles at work.",
                image: "https://i.imgur.com/xIBR1j8.jpeg",
                features: [
                  "Force diagram visualization",
                  "Formula application guidance",
                  "Unit conversion assistance",
                  "Conceptual explanations"
                ]
              },
              {
                subject: "Chemistry",
                title: "Chemical Equation Balancing",
                description: "See how our AI helps balance chemical equations and explain reaction mechanisms.",
                image: "https://i.imgur.com/o1InPVH.png",
                features: [
                  "Step-by-step balancing process",
                  "Reaction mechanism explanation",
                  "Molecular structure visualization",
                  "Stoichiometry calculations"
                ]
              }
            ].map((example, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-xl overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-8">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                      {example.subject}
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{example.title}</h2>
                    <p className="text-muted-foreground mb-6">{example.description}</p>
                    <div className="space-y-2">
                      {example.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2">
                          <Check size={16} className="text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 flex items-center justify-center">
                    <img 
                      src={example.image} 
                      alt={example.title} 
                      className="rounded-lg max-h-80 object-cover" 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary/5 rounded-xl p-8 text-center max-w-3xl mx-auto my-16"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Try It Yourself?</h2>
            <p className="text-muted-foreground mb-6">Join thousands of students who are improving their grades with Edueasee.</p>
            <a 
              href="/signup" 
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Start Learning Now
            </a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Examples;
