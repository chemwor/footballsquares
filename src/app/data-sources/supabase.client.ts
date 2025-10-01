import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project URL and anon key
const SUPABASE_URL = 'https://vnrvzaywwtiqhvcjhwhd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZucnZ6YXl3d3RpcWh2Y2pod2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNTYxOTgsImV4cCI6MjA3NDczMjE5OH0.3EuAH1qd1SXXBQ_m7ChTx3-bWCA5tEno3zNXWBhTVz4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

