// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pxmdhqsidmsgifuqlgnz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bWRocXNpZG1zZ2lmdXFsZ256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTA5MzAsImV4cCI6MjA2NjMyNjkzMH0.0cWVJ4V6as6vdKPjvnuwctAdF8cMCiL4CxS8vXJ5usY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Schema Setup Instructions:
// 
// 1. Create 'products' table:
// CREATE TABLE products (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   name varchar NOT NULL,
//   description text,
//   price numeric,
//   category varchar NOT NULL,
//   model varchar,
//   featured boolean DEFAULT false,
//   image_url varchar,
//   created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
//   updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
// );
//
// 2. Create 'admin_users' table:
// CREATE TABLE admin_users (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   email varchar UNIQUE NOT NULL,
//   password varchar NOT NULL,
//   created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
// );
//
// 3. Insert default admin user:
// INSERT INTO admin_users (email, password) VALUES ('admin@ashainfrcore.com', 'admin123');
//
// 4. Enable Row Level Security (RLS):
// ALTER TABLE products ENABLE ROW LEVEL SECURITY;
// ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
//
// 5. Create policies for public read access to products:
// CREATE POLICY "Enable read access for all users" ON "public"."products"
// AS PERMISSIVE FOR SELECT
// TO public
// USING (true);
//
// 6. Create policy for admin access to admin_users:
// CREATE POLICY "Enable read access for admin users" ON "public"."admin_users"
// AS PERMISSIVE FOR SELECT
// TO public
// USING (true);