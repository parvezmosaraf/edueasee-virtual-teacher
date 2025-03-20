import { createClient } from '@supabase/supabase-js';
import { create } from 'zustand';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  email: string;
  full_name?: string;
}

type SubscriptionPlan = 'Free Trial' | 'Basic Plan' | 'Premium Plan';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  tempAuthEnabled: boolean;
  currentPlan: SubscriptionPlan;
  subscription: any;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  setTempAuth: (enabled: boolean) => void;
  updateSubscriptionPlan: (plan: SubscriptionPlan) => void;
  checkFeatureAccess: (featureId: string) => boolean;
  loadSubscription: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  tempAuthEnabled: false,
  currentPlan: 'Free Trial',
  subscription: null,

  login: async (email, password) => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      if (data.user) {
        const user = {
          id: data.user.id,
          email: data.user.email || '',
          full_name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User'
        };
        
        set({ user, isAuthenticated: true });
        
        // Load subscription data
        await get().loadSubscription();
        
        toast.success('Logged in successfully');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login');
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (email, password, fullName) => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          data: { 
            full_name: fullName,
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        const user = {
          id: data.user.id,
          email: data.user.email || '',
          full_name: fullName
        };
        
        set({ 
          user,
          isAuthenticated: true,
          currentPlan: 'Free Trial'
        });
        
        toast.success('Account created successfully');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account');
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      set({ 
        user: null,
        isAuthenticated: false,
        tempAuthEnabled: false,
        currentPlan: 'Free Trial',
        subscription: null
      });
      
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    } finally {
      set({ isLoading: false });
    }
  },

  setTempAuth: (enabled) => {
    set({ tempAuthEnabled: enabled });
    if (enabled) {
      set({ 
        user: { id: '1', email: 'demo@example.com', full_name: 'Demo User' },
        isAuthenticated: true,
        currentPlan: 'Free Trial'
      });
    } else {
      set({ 
        user: null,
        isAuthenticated: false,
        currentPlan: 'Free Trial'
      });
    }
  },

  loadSubscription: async () => {
    const { user } = get();
    if (!user) return;

    try {
      // Get all active subscriptions for the user
      const { data: subscriptions, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (error) throw error;

      // Get the most recent subscription if multiple exist
      const subscription = subscriptions && subscriptions.length > 0
        ? subscriptions.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )[0]
        : null;

      if (subscription) {
        const plan = subscription.plan_id === 'basic' ? 'Basic Plan' : 
                    subscription.plan_id === 'premium' ? 'Premium Plan' : 
                    'Free Trial';
        
        set({ 
          currentPlan: plan as SubscriptionPlan,
          subscription 
        });
      } else {
        // No active subscription found, set to free trial
        set({
          currentPlan: 'Free Trial',
          subscription: null
        });
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
      // Set default free trial plan on error
      set({
        currentPlan: 'Free Trial',
        subscription: null
      });
    }
  },

  checkFeatureAccess: (featureId: string) => {
    const { currentPlan, subscription } = get();
    
    // If no subscription, only allow access to free features
    if (!subscription) {
      return featureId === 'rewrite';
    }

    const planFeatures = {
      'Free Trial': ['rewrite'],
      'Basic Plan': ['rewrite', 'paraphrase', 'grammar', 'document'],
      'Premium Plan': ['rewrite', 'paraphrase', 'grammar', 'document', 'equations', 'assignment']
    };

    return planFeatures[currentPlan]?.includes(featureId) || false;
  },

  updateSubscriptionPlan: (plan: SubscriptionPlan) => {
    set({ currentPlan: plan });
  }
}));

// Initialize auth state on app load
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    const user = {
      id: session.user.id,
      email: session.user.email || '',
      full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User'
    };
    
    useAuth.setState({ 
      user,
      isAuthenticated: true,
      isLoading: false
    });

    // Load subscription data
    useAuth.getState().loadSubscription();
  } else {
    useAuth.setState({ isLoading: false });
  }
});

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    const user = {
      id: session.user.id,
      email: session.user.email || '',
      full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User'
    };
    
    useAuth.setState({ 
      user,
      isAuthenticated: true,
      isLoading: false
    });

    // Load subscription data
    useAuth.getState().loadSubscription();
  } else if (event === 'SIGNED_OUT') {
    useAuth.setState({ 
      user: null,
      isAuthenticated: false,
      isLoading: false,
      currentPlan: 'Free Trial',
      subscription: null
    });
  }
});