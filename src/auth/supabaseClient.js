import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const adminEmail = import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase() ?? "";
export const authConfigured = Boolean(supabaseUrl && supabaseAnonKey && adminEmail);

export const supabase = authConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
