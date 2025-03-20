
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const pressReleases = [
  {
    title: "Edueasee Raises $5M to Expand AI-Powered Educational Tools",
    date: "June 2, 2025",
    excerpt: "Funding will be used to develop new features and expand to international markets."
  },
  {
    title: "Edueasee Partners with Top Universities to Enhance Student Support",
    date: "April 15, 2025",
    excerpt: "New partnerships aim to bring AI tutoring to higher education institutions."
  },
  {
    title: "Edueasee Launches New Grammar Checking Tool for Academic Writing",
    date: "March 8, 2025",
    excerpt: "Advanced AI helps students improve writing skills with context-aware suggestions."
  }
];

const mediaFeatures = [
  {
    source: "TechCrunch",
    title: "How Edueasee is Changing the Education Landscape with AI",
    date: "May 20, 2025",
    link: "#"
  },
  {
    source: "Education Weekly",
    title: "The Promise of AI Tutoring: A Deep Dive into Edueasee",
    date: "April 5, 2025",
    link: "#"
  },
  {
    source: "Forbes",
    title: "30 Under 30: Edueasee Founders Recognized for Innovation in Education",
    date: "January 15, 2025",
    link: "#"
  },
  {
    source: "The New York Times",
    title: "Can AI Make Education More Accessible? Edueasee Says Yes",
    date: "December 10, 2024",
    link: "#"
  }
];

const Press = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Press | Edueasee";
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
                Press & Media
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                News, announcements, and media coverage about Edueasee
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-6">Press Releases</h2>
              <div className="grid gap-6">
                {pressReleases.map((release, index) => (
                  <Card key={index} className="transition-all hover:shadow-md">
                    <CardHeader>
                      <CardDescription>{release.date}</CardDescription>
                      <CardTitle>{release.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{release.excerpt}</p>
                      <Button variant="outline" size="sm">Read More</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-6">Media Coverage</h2>
              <div className="grid gap-4">
                {mediaFeatures.map((feature, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <span className="text-sm font-medium text-primary">{feature.source}</span>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.date}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={feature.link} target="_blank" rel="noopener noreferrer">Read Article</a>
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-6">Media Kit</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Edueasee Media Kit</h3>
                      <p className="text-muted-foreground">
                        Download our logos, product screenshots, and brand guidelines.
                      </p>
                    </div>
                    <Button className="flex items-center gap-2">
                      <Download size={16} />
                      Download Kit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6">Media Inquiries</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    For press and media inquiries, please contact our press team:
                  </p>
                  <div className="mb-2">
                    <strong>Email:</strong> <a href="mailto:press@edueasee.com" className="text-primary hover:underline">press@edueasee.com</a>
                  </div>
                  <div>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Press;
