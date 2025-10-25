/*
  # Authentication and User Data Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `phone` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `location` (text)
      - `city` (text)
      - `country` (text)
      - `price` (numeric)
      - `currency` (text)
      - `image_url` (text)
      - `description` (text)
      - `amenities` (jsonb)
      - `rating` (numeric)
      - `total_reviews` (integer)
      - `property_type` (text)
      - `available_from` (date)
      - `created_at` (timestamptz)
    
    - `saved_properties`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `property_id` (uuid, references properties)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public access to properties
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  currency text DEFAULT 'USD',
  image_url text,
  description text,
  amenities jsonb DEFAULT '[]'::jsonb,
  rating numeric DEFAULT 0,
  total_reviews integer DEFAULT 0,
  property_type text DEFAULT 'apartment',
  available_from date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view properties"
  ON properties FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create saved_properties table
CREATE TABLE IF NOT EXISTS saved_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, property_id)
);

ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved properties"
  ON saved_properties FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved properties"
  ON saved_properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved properties"
  ON saved_properties FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert sample properties
INSERT INTO properties (title, location, city, country, price, currency, image_url, description, amenities, rating, total_reviews, property_type, available_from)
VALUES
  ('Modern Studio Apartment', 'Downtown', 'London', 'United Kingdom', 850, 'GBP', 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800', 'Cozy studio apartment in the heart of London', '["WiFi", "Kitchen", "Laundry", "24/7 Security"]', 4.5, 128, 'studio', '2024-09-01'),
  ('Shared Student House', 'Bloomsbury', 'London', 'United Kingdom', 650, 'GBP', 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=800', 'Shared accommodation near UCL and Kings College', '["WiFi", "Common Room", "Study Area", "Bills Included"]', 4.2, 89, 'shared', '2024-08-15'),
  ('Luxury En-suite Room', 'Kensington', 'London', 'United Kingdom', 1200, 'GBP', 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800', 'Premium en-suite room with private bathroom', '["WiFi", "Gym", "Cinema Room", "Concierge"]', 4.8, 203, 'ensuite', '2024-09-15'),
  ('Budget Twin Room', 'Stratford', 'London', 'United Kingdom', 550, 'GBP', 'https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg?auto=compress&cs=tinysrgb&w=800', 'Affordable twin room with easy transport links', '["WiFi", "Kitchen", "Laundry"]', 4.0, 67, 'twin', '2024-08-01'),
  ('Private One Bedroom Flat', 'Shoreditch', 'London', 'United Kingdom', 1400, 'GBP', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', 'Stylish one-bed flat in trendy Shoreditch', '["WiFi", "Kitchen", "Balcony", "Parking"]', 4.6, 156, 'apartment', '2024-10-01'),
  ('Student Residence', 'Greenwich', 'London', 'United Kingdom', 750, 'GBP', 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800', 'Purpose-built student accommodation', '["WiFi", "Study Rooms", "Social Events", "24/7 Support"]', 4.4, 234, 'studio', '2024-09-01');