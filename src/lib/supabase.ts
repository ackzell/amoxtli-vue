import { createClient } from '@supabase/supabase-js';

// uses public env vars for client-side runtime
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_KEY;

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
