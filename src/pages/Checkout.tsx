
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowLeft, CreditCard, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Mock plans data
const plans = {
  basic: {
    name: 'Basic Plan',
    price: 9.99,
    features: [
      'Access to all basic tools',
      '100 AI requests per month',
      'Standard response time',
      'Email support'
    ]
  },
  premium: {
    name: 'Premium Plan',
    price: 19.99,
    features: [
      'Access to all premium tools',
      'Unlimited AI requests',
      'Priority response time',
      'Priority support',
      'Advanced features'
    ]
  }
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get('plan') || 'basic';
  const plan = plans[planId] || plans.basic;
  
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardDetails({ ...cardDetails, [name]: formatted });
      return;
    }
    
    // Format expiry date with slash
    if (name === 'expiryDate') {
      let formatted = value.replace(/\D/g, '');
      if (formatted.length > 2) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
      }
      setCardDetails({ ...cardDetails, [name]: formatted });
      return;
    }
    
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setPaymentSuccess(true);
      toast.success('Payment processed successfully!');
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="border-green-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription>
                Your subscription to the {plan.name} has been activated.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6">You now have access to all the features included in your plan.</p>
              <div className="flex flex-col gap-2">
                <Button onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
                <Button variant="ghost" onClick={() => navigate('/')}>
                  Return to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-24 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate('/pricing')} 
            className="mb-8 flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Pricing
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-2xl font-bold mb-6">Checkout</h1>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Enter your card information securely</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Name on Card</label>
                      <Input
                        id="name"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={cardDetails.cardNumber}
                          onChange={handleInputChange}
                          placeholder="4242 4242 4242 4242"
                          maxLength={19}
                          required
                        />
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">For testing, use 4242 4242 4242 4242</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">Expiry Date</label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={cardDetails.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium mb-1">CVC</label>
                        <Input
                          id="cvc"
                          name="cvc"
                          value={cardDetails.cvc}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                      <Shield size={16} />
                      <span>Your payment information is secure</span>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing...' : `Pay $${plan.price.toFixed(2)}`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <Card>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>Monthly subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Included Features:</h3>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-500 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${plan.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${plan.price.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        You will be charged ${plan.price.toFixed(2)} monthly. Cancel anytime.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Checkout;
