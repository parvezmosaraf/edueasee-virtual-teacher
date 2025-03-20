
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cookie Policy | Edueasee";
  }, []);

  return (
    <>
      <Navbar />
      <main className="py-24">
        <section className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground mb-6">Last updated: June 1, 2025</p>
            
            <div className="prose prose-lg dark:prose-invert">
              <p className="lead">
                This Cookie Policy explains how Edueasee ("we", "us", or "our") uses cookies and similar 
                technologies to recognize you when you visit our website. It explains what these technologies are 
                and why we use them, as well as your rights to control our use of them.
              </p>
              
              <h2>What Are Cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                Cookies are widely used by website owners to make their websites work, as well as to provide reporting 
                information.
              </p>
              <p>
                Cookies set by the website owner (in this case, Edueasee) are called "first-party cookies". Cookies 
                set by parties other than the website owner are called "third-party cookies". Third-party cookies enable 
                third-party features or functionality to be provided on or through the website (e.g., advertising, interactive 
                content, and analytics).
              </p>
              
              <h2>Why Do We Use Cookies?</h2>
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical 
                reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" 
                cookies. Other cookies also enable us to track and target the interests of our users to enhance the 
                experience on our website. Third parties serve cookies through our website for advertising, analytics, 
                and other purposes.
              </p>
              
              <h2>Types of Cookies We Use</h2>
              <h3>Essential Cookies</h3>
              <p>
                These cookies are strictly necessary to provide you with services available through our website and to 
                use some of its features, such as access to secure areas. Because these cookies are strictly necessary 
                to deliver the website, you cannot refuse them without impacting how our website functions.
              </p>
              
              <h3>Performance and Functionality Cookies</h3>
              <p>
                These cookies are used to enhance the performance and functionality of our website but are non-essential 
                to their use. However, without these cookies, certain functionality may become unavailable.
              </p>
              
              <h3>Analytics and Customization Cookies</h3>
              <p>
                These cookies collect information that is used either in aggregate form to help us understand how our 
                website is being used or how effective our marketing campaigns are, or to help us customize our website 
                for you.
              </p>
              
              <h3>Advertising Cookies</h3>
              <p>
                These cookies are used to make advertising messages more relevant to you. They perform functions like 
                preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in 
                some cases selecting advertisements that are based on your interests.
              </p>
              
              <h2>How Can You Control Cookies?</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences 
                by clicking on the appropriate opt-out links provided in the cookie banner on our website.
              </p>
              <p>
                You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject 
                cookies, you may still use our website though your access to some functionality and areas of our website 
                may be restricted.
              </p>
              
              <h2>Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the 
                cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this 
                Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:privacy@edueasee.com" className="text-primary hover:underline">privacy@edueasee.com</a> or refer to our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CookiePolicy;
