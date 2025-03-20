
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms of Service | Edueasee";
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-6">Last updated: June 1, 2025</p>
            
            <div className="prose prose-lg dark:prose-invert">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Edueasee service ("Service"), you agree to be bound by these Terms of Service 
                ("Terms"). If you do not agree to these Terms, you should not use the Service.
              </p>
              
              <h2>2. Description of Service</h2>
              <p>
                Edueasee provides AI-powered educational tools and services that assist with academic tasks, 
                including but not limited to writing assistance, grammar checking, equation solving, and assignment help.
              </p>
              
              <h2>3. User Accounts</h2>
              <p>
                To access certain features of the Service, you will need to create an account. You are responsible for 
                maintaining the confidentiality of your account information and for all activities that occur under your account.
              </p>
              
              <h2>4. User Conduct</h2>
              <p>
                You agree not to use the Service for any purpose that is unlawful or prohibited by these Terms. 
                You may not use the Service in any manner that could damage, disable, overburden, or impair the Service.
              </p>
              
              <h2>5. Payment Terms</h2>
              <p>
                Some features of the Service require payment of fees. All fees are stated in U.S. dollars and do not include taxes. 
                You are responsible for paying all fees and taxes associated with your use of the Service.
              </p>
              
              <h2>6. Subscription and Cancellation</h2>
              <p>
                Subscriptions to the Service will automatically renew unless you cancel your subscription prior to the renewal date. 
                You can cancel your subscription at any time through your account settings.
              </p>
              
              <h2>7. Intellectual Property</h2>
              <p>
                All content included on the Service, including but not limited to text, graphics, logos, and software, 
                is the property of Edueasee or its licensors and is protected by copyright and other intellectual property laws.
              </p>
              
              <h2>8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Edueasee shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including loss of profits, data, or use, arising out of or in connection with these Terms.
              </p>
              
              <h2>9. Disclaimer of Warranties</h2>
              <p>
                The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, 
                including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              
              <h2>10. Modifications to Terms</h2>
              <p>
                Edueasee reserves the right to modify these Terms at any time. We will provide notice of significant changes to these 
                Terms by posting the updated Terms on our website and updating the "Last Updated" date at the top of this page.
              </p>
              
              <h2>11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, 
                without regard to its conflict of law provisions.
              </p>
              
              <h2>12. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:legal@edueasee.com" className="text-primary hover:underline">legal@edueasee.com</a>.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfService;
