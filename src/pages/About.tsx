
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About | Edueasee";
  }, []);

  return (
    <>
      <Navbar />
      <main className="py-24">
        <section className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-center"
            >
              About Edueasee
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="prose prose-lg dark:prose-invert mx-auto"
            >
              <p className="lead">
                Edueasee was founded with a mission to make education more accessible, 
                personalized, and efficient for students of all ages and backgrounds.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                Our mission is to leverage the power of artificial intelligence to create 
                educational tools that adapt to individual learning styles, provide 
                instant feedback, and help students overcome academic challenges.
              </p>
              
              <h2>Our Story</h2>
              <p>
                Edueasee began in 2023 when a group of educators and AI specialists 
                came together with a shared vision: to transform the educational 
                experience through technology. We recognized that traditional 
                educational methods weren't meeting the needs of all students, 
                and that AI could help bridge this gap.
              </p>
              
              <h2>Our Values</h2>
              <ul>
                <li><strong>Accessibility:</strong> Education should be available to everyone, regardless of location or background.</li>
                <li><strong>Innovation:</strong> We continuously improve our tools to provide the best learning experience.</li>
                <li><strong>Privacy:</strong> We prioritize the security and privacy of our users' data.</li>
                <li><strong>Empowerment:</strong> We aim to empower students to take control of their learning journey.</li>
              </ul>
              
              <h2>Our Team</h2>
              <p>
                Our team consists of passionate educators, AI specialists, and 
                software engineers who are dedicated to improving education through technology.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 text-center"
            >
              <Link to="/pricing">
                <Button size="lg">
                  Join Edueasee Today
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
