import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Returns a client when both env vars are set, otherwise null. Consumers
// should handle the null case and degrade gracefully (render empty state,
// not crash). This keeps local development usable without real Supabase
// credentials and protects preview deploys that haven't been configured.

let cached: SupabaseClient | null = null;
let checked = false;

export function getSupabaseClient(): SupabaseClient | null {
  if (checked) return cached;
  checked = true;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing; journal fetches will return empty.",
      );
    }
    return null;
  }

  cached = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
