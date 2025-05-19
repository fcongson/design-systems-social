import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export function createClient(
  supabaseUrl: string,
  supabaseKey: string,
): SupabaseClient {
  return createBrowserClient(supabaseUrl, supabaseKey);
}
