import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
const isServer = typeof window === "undefined";

if (!supabaseUrl || !supabaseUrl.startsWith("http")) {
  if (process.env.NODE_ENV === "development") {
    console.error("Invalid or missing NEXT_PUBLIC_SUPABASE_URL");
  }
}

export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith("http"))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as ReturnType<typeof createClient>;

export const supabaseAdmin = (isServer && supabaseUrl && supabaseServiceRoleKey && supabaseUrl.startsWith("http"))
  ? createClient(supabaseUrl, supabaseServiceRoleKey, { auth: { persistSession: false } })
  : null;

export const hasSupabaseAnonymous = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith("http"));
export const hasSupabaseAdmin = Boolean(supabaseUrl && supabaseServiceRoleKey && isServer && supabaseUrl.startsWith("http"));
