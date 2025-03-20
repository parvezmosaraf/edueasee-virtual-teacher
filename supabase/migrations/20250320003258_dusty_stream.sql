/*
  # Update subscriptions and features tables

  1. Tables
    - Ensure subscriptions and subscription_features tables exist
    - Add RLS policies if not exists
    - Insert feature mappings
*/

-- Create subscriptions table if not exists
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  stripe_subscription_id text,
  stripe_customer_id text,
  plan_id text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  current_period_end timestamptz,
  cancel_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscription_features table if not exists
CREATE TABLE IF NOT EXISTS public.subscription_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id text NOT NULL,
  feature_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_features ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can read own subscriptions" ON public.subscriptions;
    DROP POLICY IF EXISTS "Users can read subscription features" ON public.subscription_features;
EXCEPTION
    WHEN undefined_object THEN 
        NULL;
END $$;

-- Create policies
CREATE POLICY "Users can read own subscriptions"
  ON public.subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read subscription features"
  ON public.subscription_features
  FOR SELECT
  TO authenticated
  USING (true);

-- Delete existing feature mappings to avoid duplicates
DELETE FROM public.subscription_features;

-- Insert default subscription features
INSERT INTO public.subscription_features (plan_id, feature_id) VALUES
  -- Free plan features
  ('free', 'rewrite'),
  
  -- Basic plan features
  ('basic', 'rewrite'),
  ('basic', 'paraphrase'),
  ('basic', 'grammar'),
  ('basic', 'document'),
  
  -- Premium plan features
  ('premium', 'rewrite'),
  ('premium', 'paraphrase'),
  ('premium', 'grammar'),
  ('premium', 'document'),
  ('premium', 'equations'),
  ('premium', 'assignment');