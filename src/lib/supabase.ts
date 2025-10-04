import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_KEY;

console.log('Supabase URL:', SUPABASE_URL);
console.log('Supabase Key:', SUPABASE_KEY);

let supabaseClient = null;

if (typeof window !== 'undefined') {
  // Initialize Supabase client only in the browser
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
}

export { supabaseClient };
