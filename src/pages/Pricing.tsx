
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { isAuthenticated, updateSubscriptionPlan } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlanSelection = (plan: 'basic' | 'premium') => {
    if (isAuthenticated) {
      // If authenticated, update the plan directly and navigate to profile
      if (plan === 'basic') {
        updateSubscriptionPlan('Basic Plan');
      } else {
        updateSubscriptionPlan('Premium Plan');
      }
      navigate('/profile');
    } else {
      // If not authenticated, navigate to signup with plan parameter
      navigate(`/signup?plan=${plan}`);
    }
  };

  const plans = [
    {
      name: 'Free Trial',
      price: isAnnual ? 0 : 0,
      description: 'Try out our basic features with limited usage',
      features: [
        'Access to basic AI tools',
        'Limited to 10 AI requests per day',
        'Basic grammar checking',
        'Standard document analysis',
      ],
      cta: 'Get Started',
      path: isAuthenticated ? '/dashboard' : '/signup',
      highlighted: false,
    },
    {
      name: 'Basic Plan',
      price: isAnnual ? 99 : 9.99,
      description: 'Perfect for students who need regular assistance',
      features: [
        'Access to all basic AI tools',
        '100 AI requests per month',
        'Full grammar checking and correction',
        'Document analysis and summarization',
        'Standard equation solving',
      ],
      cta: 'Choose Basic',
      highlighted: true,
      action: () => handlePlanSelection('basic'),
    },
    {
      name: 'Premium Plan',
      price: isAnnual ? 199 : 19.99,
      description: 'Comprehensive solution for serious academic work',
      features: [
        'Access to all premium AI tools',
        'Unlimited AI requests',
        'Advanced grammar and style checking',
        'Comprehensive document analysis',
        'Complex equation solving',
        'Priority support',
      ],
      cta: 'Choose Premium',
      highlighted: false,
      action: () => handlePlanSelection('premium'),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="py-24">
        <section className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl mb-6"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Choose the plan that best suits your academic needs
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <div className="inline-flex items-center rounded-full border p-1 bg-background">
                <button 
                  onClick={() => setIsAnnual(false)} 
                  className={`px-4 py-2 rounded-full text-sm ${!isAnnual ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setIsAnnual(true)} 
                  className={`px-4 py-2 rounded-full text-sm ${isAnnual ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  Annual
                </button>
              </div>
              {isAnnual && (
                <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                  Save up to 20% with annual billing
                </div>
              )}
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`relative rounded-xl overflow-hidden ${
                  plan.highlighted 
                    ? 'border-2 border-primary shadow-lg' 
                    : 'border shadow'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                    Most Popular
                  </div>
                )}
                <div className={`p-6 ${plan.highlighted ? 'pt-8' : 'pt-6'}`}>
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${typeof plan.price === 'number' ? plan.price.toFixed(2) : plan.price}</span>
                    <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  {plan.action ? (
                    <Button 
                      className={`w-full ${plan.highlighted ? '' : 'bg-secondary hover:bg-secondary/90'}`}
                      variant={plan.highlighted ? 'default' : 'secondary'}
                      onClick={plan.action}
                    >
                      {plan.cta}
                    </Button>
                  ) : (
                    <Link to={plan.path}>
                      <Button 
                        className={`w-full ${plan.highlighted ? '' : 'bg-secondary hover:bg-secondary/90'}`}
                        variant={plan.highlighted ? 'default' : 'secondary'}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  )}
                </div>
                <div className="p-6 bg-muted border-t">
                  <p className="font-medium mb-4">What's included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-primary/5 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    q: 'Can I cancel my subscription?',
                    a: 'Yes, you can cancel your subscription anytime. Once canceled, you\'ll still have access until the end of your billing period.'
                  },
                  {
                    q: 'Is there a free trial?',
                    a: 'Yes, we offer a free plan that lets you try our basic features with limited usage.'
                  },
                  {
                    q: 'What payment methods do you accept?',
                    a: 'We accept all major credit cards including Visa, Mastercard, and American Express.'
                  },
                  {
                    q: 'Can I upgrade or downgrade my plan?',
                    a: 'Yes, you can upgrade or downgrade your plan at any time, with the changes taking effect immediately.'
                  },
                ].map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Pricing;
