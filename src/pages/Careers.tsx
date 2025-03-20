
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const openPositions = [
  {
    title: "AI Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time"
  },
  {
    title: "Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time"
  },
  {
    title: "Education Content Specialist",
    department: "Content",
    location: "Remote",
    type: "Full-time"
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time"
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time"
  }
];

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Careers | Edueasee";
  }, []);

  return (
    <>
      <Navbar />
      <main className="py-24">
        <section className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Join Our Team
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Help us transform education and make a meaningful impact on students worldwide
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid gap-8 md:grid-cols-2 mb-16"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  At Edueasee, we're building AI-powered educational tools that adapt to individual 
                  learning styles and help students overcome academic challenges. We believe 
                  education should be accessible, personalized, and empowering for everyone.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Why Join Us?</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Make a positive impact on education worldwide</li>
                  <li>• Work with cutting-edge AI technology</li>
                  <li>• Flexible, remote-first work environment</li>
                  <li>• Competitive compensation and benefits</li>
                  <li>• Collaborative, diverse, and inclusive culture</li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Open Positions</h2>
              <div className="grid gap-4">
                {openPositions.map((position, index) => (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{position.title}</CardTitle>
                          <CardDescription>{position.department}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm px-2 py-1 bg-muted rounded-full">{position.location}</span>
                          <span className="text-sm px-2 py-1 bg-muted rounded-full">{position.type}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex justify-end">
                      <Button variant="outline" className="group">
                        View Position 
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <h2 className="text-2xl font-bold mb-6">Don't See a Perfect Fit?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals who are passionate about education 
                and technology. Send us your resume and tell us how you can contribute.
              </p>
              <Button size="lg">
                Submit Your Application
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Careers;
