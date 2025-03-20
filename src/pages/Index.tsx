import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import FeatureDemo from '../components/home/FeatureDemo';
import DashboardFeatures from '../components/home/DashboardFeatures';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DashboardFeatures />
        <FeatureDemo />
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              >
                How Edueasee Works
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-muted-foreground text-lg"
              >
                Our platform makes academic assistance simpler than ever with an intuitive, powerful AI
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  number: '01',
                  title: 'Input Your Task',
                  description: 'Share your academic question, upload a document, or speak directly to our AI with your homework challenge.'
                },
                {
                  number: '02',
                  title: 'AI Processing',
                  description: 'Our Google Gemini-powered AI analyzes your input and generates accurate, educational responses.'
                },
                {
                  number: '03',
                  title: 'Review & Learn',
                  description: 'Receive detailed explanations, step-by-step solutions, and educational insights to enhance your understanding.'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="glass-card p-8 rounded-xl h-full">
                    <div className="text-4xl font-bold text-primary/20 mb-4">{step.number}</div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              >
                What Students Are Saying
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-muted-foreground text-lg"
              >
                Join thousands of satisfied students who have improved their academic performance
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Emily Chen',
                  role: 'Biology Major',
                  image: 'https://i.pravatar.cc/150?img=1',
                  content: 'Edueasee has been a game-changer for my science essays. The paraphrasing tool helped me express complex ideas more clearly, and the document analysis saved me hours of research time.'
                },
                {
                  name: 'Marcus Johnson',
                  role: 'Computer Science Student',
                  image: 'https://i.pravatar.cc/150?img=8',
                  content: 'The equation solver is incredible! It doesn\'t just give me the answer but walks me through each step of complex math problems, helping me truly understand the concepts.'
                },
                {
                  name: 'Sophia Rodriguez',
                  role: 'English Literature Student',
                  image: 'https://i.pravatar.cc/150?img=5',
                  content: 'As a non-native English speaker, the grammar fixing feature has been invaluable. My essays have improved dramatically, and I\'m learning proper grammar patterns through the corrections.'
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic text-foreground/90">{testimonial.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              >
                Ready to Transform Your Learning Experience?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto"
              >
                Join thousands of students who are already using Edueasee to excel in their academic journey.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href="/signup"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
                >
                  Get Started for Free
                </a>
                <a
                  href="/demo"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
                >
                  Watch Demo
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
