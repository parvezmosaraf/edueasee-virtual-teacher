/*
  # Create subscriptions and feature access tables

  1. New Tables
    - `subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `stripe_subscription_id` (text)
      - `stripe_customer_id` (text)
      - `plan_id` (text)
      - `status` (text)
      - `current_period_end` (timestamptz)
      - `cancel_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `subscription_features`
      - `id` (uuid, primary key)
      - `plan_id` (text)
      - `feature_id` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
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

-- Create subscription_features table
CREATE TABLE IF NOT EXISTS subscription_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id text NOT NULL,
  feature_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_features ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read subscription features"
  ON subscription_features
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default subscription features
INSERT INTO subscription_features (plan_id, feature_id) VALUES
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