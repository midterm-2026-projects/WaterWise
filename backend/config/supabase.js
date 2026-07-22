// backend/config/supabase.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

const environmentPath = fileURLToPath(new URL('../.env', import.meta.url));

if (process.env.CI !== 'true') {
  dotenv.config({ path: environmentPath, quiet: true });
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY;
const usesInMemoryData =
  process.env.NODE_ENV === 'test' || process.env.WATERWISE_E2E === 'true' || process.env.WATERWISE_E2E === '1';
  
if ((!supabaseUrl || !supabaseKey) && !usesInMemoryData) {
  throw new Error('Missing Supabase configuration environment variables.');
}

// Tests and E2E flows without credentials use isolated in-memory fixtures.
// Do not construct Supabase in that case: its Realtime client requires a
// WebSocket runtime even when no database query is made.
const unavailableTestClient = {
  from() {
    throw new Error('Supabase is unavailable in the in-memory test runtime.');
  },
};

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : unavailableTestClient;