import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Your Supabase URL and API key from the Supabase dashboard
const SUPABASE_URL = process.env.SUPABASE_URL!;  // Replace with your actual URL
const SUPABASE_KEY = process.env.SUPABASE_KEY!;  // Replace with your actual API Key

// Create a Supabase client instance
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
