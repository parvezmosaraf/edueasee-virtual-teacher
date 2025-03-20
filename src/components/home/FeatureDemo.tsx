
import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, FilePen, CheckCircle2, Loader2 } from 'lucide-react';

const FeatureDemo = () => {
  const [demoText, setDemoText] = useState("The suez canal is a Important waterway that connects the Mediterranean sea with the Red sea and it serves as a important shipping route. It was opened on 1869 and it allowed ships to travel between europe and asia without having to go around africa.");
  const [processedText, setProcessedText] = useState('');
  const [activeTab, setActiveTab] = useState('rewrite');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = () => {
    if (!demoText) return;
    
    setIsProcessing(true);
    
    // Simulate API processing
    setTimeout(() => {
      const processText = () => {
        switch (activeTab) {
          case 'rewrite':
            return "The Suez Canal, a crucial international waterway, connects the Mediterranean and Red Seas, providing a vital shipping route. Inaugurated in 1869, this remarkable engineering achievement significantly reduced the journey between Europe and Asia by eliminating the need to circumnavigate Africa.";
          case 'paraphrase':
            return "The Suez Canal is an essential global maritime passage that links the Mediterranean to the Red Sea, serving as a key shipping corridor. Opened in 1869, this impressive feat of engineering drastically shortened the voyage between European and Asian destinations by removing the requirement to sail around Africa.";
          case 'grammar':
            return "The Suez Canal, a vital international waterway, connects the Mediterranean and Red Seas, functioning as a crucial shipping route. Opened in 1869, this engineering marvel significantly shortened the journey between Europe and Asia by eliminating the need to sail around Africa.";
          default:
            return demoText;
        }
      };
      
      setProcessedText(processText());
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <section id="demo" className="py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            Experience AI-Powered Learning
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Try out our AI tools and see how they can transform your academic work
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="flex border-b border-border/50">
              {[
                { id: 'rewrite', label: 'Article Rewrite', icon: <RefreshCw size={16} /> },
                { id: 'paraphrase', label: 'Paraphrase', icon: <FilePen size={16} /> },
                { id: 'grammar', label: 'Grammar Fix', icon: <CheckCircle2 size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setProcessedText('');
                  }}
                  className={`flex items-center gap-2 px-5 py-4 font-medium text-sm transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label htmlFor="demoInput" className="block text-sm font-medium text-foreground mb-2">
                  Enter sample text
                </label>
                <textarea
                  id="demoInput"
                  rows={5}
                  placeholder={
                    activeTab === 'rewrite'
                      ? "Enter text to rewrite..."
                      : activeTab === 'paraphrase'
                      ? "Enter text to paraphrase..."
                      : "Enter text to correct grammar..."
                  }
                  className="w-full p-3 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  value={demoText}
                  onChange={(e) => setDemoText(e.target.value)}
                />
              </div>

              <div className="flex justify-center mb-6">
                <button
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-70"
                  onClick={handleProcess}
                  disabled={!demoText || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {activeTab === 'rewrite'
                        ? 'Rewrite Text'
                        : activeTab === 'paraphrase'
                        ? 'Paraphrase Text'
                        : 'Fix Grammar'}
                    </>
                  )}
                </button>
              </div>

              {processedText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-md border border-border bg-muted/30 p-4"
                >
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    {activeTab === 'rewrite'
                      ? 'Rewritten Text:'
                      : activeTab === 'paraphrase'
                      ? 'Paraphrased Text:'
                      : 'Corrected Text:'}
                  </h4>
                  <p className="text-foreground">{processedText}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureDemo;
