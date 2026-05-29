import { createClient } from '@supabase/supabase-js';

// Debug logs (development only)
if (process.env.NODE_ENV !== 'production') {
  console.log('SUPABASE URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('SUPABASE KEY EXISTS:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// Public client for frontend use
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server‑side client (admin actions). If a service role key is provided we use it, otherwise fall back to the public client.
export const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  : supabase;

// Helper flag indicating whether Supabase environment variables are correctly set
export const isSupabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
