
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const DataProcessing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Data Processing | Edueasee";
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
              Data Processing Agreement
            </h1>
            <p className="text-muted-foreground mb-6">Last updated: June 1, 2025</p>
            
            <div className="prose prose-lg dark:prose-invert">
              <p className="lead">
                This Data Processing Agreement ("DPA") forms part of the Terms of Service between Edueasee 
                ("we", "us", "our") and users of our Service ("you", "your", "Customer") and applies to the extent 
                that we process Personal Data on your behalf in the course of providing the Service.
              </p>
              
              <h2>1. Definitions</h2>
              <p>
                "Personal Data" means any information relating to an identified or identifiable natural person.
              </p>
              <p>
                "Processing" means any operation or set of operations which is performed on Personal Data, whether 
                or not by automated means.
              </p>
              <p>
                "Data Protection Laws" means all applicable laws and regulations regarding the processing of Personal Data 
                and privacy.
              </p>
              
              <h2>2. Processing of Personal Data</h2>
              <p>
                We will process Personal Data only on your documented instructions, including with regard to transfers 
                of Personal Data to a third country or an international organization, unless required to do so by law.
              </p>
              <p>
                We will ensure that persons authorized to process the Personal Data have committed themselves to 
                confidentiality or are under an appropriate statutory obligation of confidentiality.
              </p>
              
              <h2>3. Security Measures</h2>
              <p>
                We will implement appropriate technical and organizational measures to ensure a level of security 
                appropriate to the risk, including:
              </p>
              <ul>
                <li>The pseudonymization and encryption of Personal Data</li>
                <li>The ability to ensure the ongoing confidentiality, integrity, availability, and resilience of processing systems and services</li>
                <li>The ability to restore the availability and access to Personal Data in a timely manner in the event of a physical or technical incident</li>
                <li>A process for regularly testing, assessing, and evaluating the effectiveness of technical and organizational measures for ensuring the security of the processing</li>
              </ul>
              
              <h2>4. Sub-processors</h2>
              <p>
                We will not engage another processor without your prior authorization. Where we engage another processor, 
                we will impose the same data protection obligations as set out in this DPA.
              </p>
              
              <h2>5. Data Subject Rights</h2>
              <p>
                We will assist you in responding to requests from data subjects exercising their rights under 
                applicable Data Protection Laws.
              </p>
              
              <h2>6. Data Breach Notification</h2>
              <p>
                We will notify you without undue delay after becoming aware of a personal data breach. We will assist 
                you in ensuring compliance with obligations regarding the security of Personal Data, taking into account 
                the nature of processing and the information available to us.
              </p>
              
              <h2>7. Deletion or Return of Personal Data</h2>
              <p>
                At your choice, we will delete or return all the Personal Data to you after the end of the provision 
                of services relating to processing, and delete existing copies unless storage of the Personal Data is 
                required by law.
              </p>
              
              <h2>8. Audit Rights</h2>
              <p>
                We will make available to you all information necessary to demonstrate compliance with the obligations 
                laid down in this DPA and allow for and contribute to audits, including inspections, conducted by you 
                or another auditor mandated by you.
              </p>
              
              <h2>9. International Transfers</h2>
              <p>
                We will not transfer Personal Data outside of the European Economic Area (EEA) unless appropriate 
                safeguards are in place in accordance with applicable Data Protection Laws.
              </p>
              
              <h2>10. Contact Information</h2>
              <p>
                If you have any questions about this DPA, please contact us at <a href="mailto:privacy@edueasee.com" className="text-primary hover:underline">privacy@edueasee.com</a>.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DataProcessing;
