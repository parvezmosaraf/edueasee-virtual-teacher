
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | Edueasee";
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-6">Last updated: June 1, 2025</p>
            
            <div className="prose prose-lg dark:prose-invert">
              <p className="lead">
                At Edueasee, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our service.
              </p>
              
              <h2>1. Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you register for the Service, 
                express interest in obtaining information about us or our products, or otherwise contact us. The personal 
                information we collect may include:
              </p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Payment information</li>
                <li>Educational information</li>
              </ul>
              
              <h3>Usage Data</h3>
              <p>
                We may also collect information about how the Service is accessed and used. This usage data may include:
              </p>
              <ul>
                <li>Your computer's Internet Protocol address (e.g., IP address)</li>
                <li>Browser type and version</li>
                <li>Pages of our Service that you visit</li>
                <li>Time and date of your visit</li>
                <li>Time spent on those pages</li>
                <li>Other diagnostic data</li>
              </ul>
              
              <h2>2. How We Use Your Information</h2>
              <p>
                We may use the information we collect for various purposes, including to:
              </p>
              <ul>
                <li>Provide and maintain our Service</li>
                <li>Notify you about changes to our Service</li>
                <li>Allow you to participate in interactive features of our Service</li>
                <li>Provide customer support</li>
                <li>Gather analysis or valuable information to improve our Service</li>
                <li>Monitor the usage of our Service</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Process payments</li>
              </ul>
              
              <h2>3. Disclosure of Your Information</h2>
              <p>
                We may share your information with:
              </p>
              <ul>
                <li>Service providers who perform services for us</li>
                <li>Business partners with whom we jointly offer products or services</li>
                <li>Affiliates, in which case we will require those affiliates to honor this Privacy Policy</li>
                <li>As required by law, such as to comply with a subpoena or similar legal process</li>
              </ul>
              
              <h2>4. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. 
                While we have taken reasonable steps to secure the personal information you provide to us, please be aware 
                that no security measures are perfect or impenetrable.
              </p>
              
              <h2>5. Your Data Protection Rights</h2>
              <p>
                Depending on your location, you may have the following rights:
              </p>
              <ul>
                <li>The right to access, update, or delete your information</li>
                <li>The right to rectification (to request correction of your information)</li>
                <li>The right to object to our processing of your information</li>
                <li>The right of restriction (to request that we restrict processing of your information)</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              
              <h2>6. Children's Privacy</h2>
              <p>
                Our Service is not directed to anyone under the age of 13. We do not knowingly collect personal information 
                from children under 13. If you are a parent or guardian and you are aware that your child has provided us 
                with personal information, please contact us.
              </p>
              
              <h2>7. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              
              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@edueasee.com" className="text-primary hover:underline">privacy@edueasee.com</a>.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
