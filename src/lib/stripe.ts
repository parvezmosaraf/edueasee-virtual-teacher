import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '@/integrations/supabase/client';

const STRIPE_PUBLISHABLE_KEY = 'pk_live_51R4WBDGu0bWGUeWOFeIIu13V2cQGaLXem1201U2asj5YdIIga6wnGwjAat9sVVlB8puQ4z45sdkF7pj8yg5LtQTT00HCWgFnYg';
const STRIPE_PRICES = {
  basic: 'prod_RyTrD2k4nW1Qch',
  premium: 'prod_RyTscqbW4wbgA8'
};

export const stripe = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const createCheckoutSession = async (priceId: string, userId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { priceId, userId }
    });

    if (error) throw error;

    return data.sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const createPortalSession = async (customerId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-portal-session', {
      body: { customerId }
    });

    if (error) throw error;

    return data.url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
};

export const getPriceId = (plan: 'basic' | 'premium') => {
  return STRIPE_PRICES[plan];
};