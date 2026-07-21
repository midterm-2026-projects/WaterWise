// backend/config/supabase.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

const environmentPath = fileURLToPath(new URL('../.env', import.meta.url));

dotenv.config({ path: environmentPath, quiet: true });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY;
const usesInMemoryData =
  process.env.NODE_ENV === 'test' || process.env.WATERWISE_E2E === 'true';

if ((!supabaseUrl || !supabaseKey) && !usesInMemoryData) {
  throw new Error('Missing Supabase configuration environment variables.');
}

// Tests and E2E flows never query this fallback client; their models use
// isolated in-memory fixtures. It keeps imports database-independent in CI.
const clientUrl = supabaseUrl ?? 'http://127.0.0.1:54321';
const clientKey = supabaseKey ?? 'waterwise-test-key';

export const supabase = createClient(clientUrl, clientKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
