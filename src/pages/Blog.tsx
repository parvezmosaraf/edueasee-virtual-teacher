
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    title: "How AI is Transforming Education",
    excerpt: "Artificial intelligence is revolutionizing the way students learn and teachers teach...",
    date: "June 15, 2025",
    author: "Dr. Emily Chen",
    category: "Education Technology",
    slug: "ai-transforming-education",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "5 Ways to Improve Your Study Habits",
    excerpt: "Effective study habits can make all the difference in academic performance...",
    date: "May 28, 2025",
    author: "Marcus Johnson",
    category: "Study Tips",
    slug: "improve-study-habits",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "The Future of Online Learning",
    excerpt: "As technology continues to evolve, online learning is becoming more interactive and effective...",
    date: "April 10, 2025",
    author: "Sarah Williams",
    category: "Education Trends",
    slug: "future-online-learning",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Why Grammar Matters in Academic Writing",
    excerpt: "Good grammar is essential for clear communication in academic writing...",
    date: "March 5, 2025",
    author: "Prof. Robert Thompson",
    category: "Academic Writing",
    slug: "grammar-academic-writing",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  }
];

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog | Edueasee";
  }, []);

  return (
    <>
      <Navbar />
      <main className="py-24">
        <section className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Latest Articles
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Insights and tips on education, AI, and learning techniques from our experts
              </p>
            </motion.div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="overflow-hidden rounded-lg mb-4 aspect-video">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <span className="text-sm text-primary font-medium">{post.category}</span>
                      <h2 className="text-xl font-semibold mt-1 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center mt-4">
                        <span className="text-sm text-muted-foreground">
                          {post.date} • By {post.author}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <Button variant="outline" className="group">
                View all articles 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
