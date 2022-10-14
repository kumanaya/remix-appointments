import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

import { SUPABASE_URL, SUPABASE_TOKEN } from "./env";

let supabaseClient: SupabaseClient;

declare global {
  var __supabaseClient: SupabaseClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_TOKEN);
} else {
  if (!global.__supabaseClient) {
    global.__supabaseClient = createClient(SUPABASE_URL, SUPABASE_TOKEN);
  }
  supabaseClient = global.__supabaseClient;
}

export { supabaseClient };
