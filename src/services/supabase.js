import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://aerlsafaqwclplfflfnc.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, supabaseKey);

export default supabase;
