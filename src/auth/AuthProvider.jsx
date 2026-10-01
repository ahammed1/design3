import { useCallback, useEffect, useMemo, useState } from "react";
import { adminEmail, authConfigured, supabase } from "./supabaseClient.js";
import { AuthContext } from "./authStore.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(authConfigured);
  const [sessionError, setSessionError] = useState("");

  useEffect(() => {
    if (!supabase) return undefined;

    let mounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) {
          setSessionError(error.message);
          setLoading(false);
          return;
        }
        setUser(data.session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        if (!mounted) return;
        setSessionError(error.message || "Unable to load the administrator session.");
        setLoading(false);
      });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    if (!supabase) throw new Error("Authentication is not configured. Add the Supabase values to .env.local.");
    if (email.trim().toLowerCase() !== adminEmail) {
      throw new Error("This email is not authorized for administrator access.");
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password,
    });
    if (error) throw error;
  }, []);

  const createAdmin = useCallback(async ({ fullName, email, password }) => {
    if (!supabase) throw new Error("Authentication is not configured. Add the Supabase values to .env.local.");
    if (email.trim().toLowerCase() !== adminEmail) {
      throw new Error(`Only ${adminEmail || "the configured administrator email"} can create the admin account.`);
    }
    const { data, error } = await supabase.auth.signUp({
      email: adminEmail,
      password,
      options: { data: { full_name: fullName.trim(), role: "admin" } },
    });
    if (error) throw error;
    return data;
  }, []);

  const updateProfile = useCallback(async ({ fullName, preferences }) => {
    if (!supabase) throw new Error("Authentication is not configured.");
    const { error } = await supabase.auth.updateUser({
      data: {
        ...user?.user_metadata,
        full_name: fullName.trim(),
        role: "admin",
        preferences,
      },
    });
    if (error) throw error;
  }, [user]);

  const signOut = useCallback(async () => {
    if (!supabase) throw new Error("Authentication is not configured.");
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const isAdmin = Boolean(user?.email && user.email.toLowerCase() === adminEmail);
  const value = useMemo(() => ({
    user,
    loading,
    sessionError,
    configured: authConfigured,
    adminEmail,
    isAdmin,
    signIn,
    createAdmin,
    updateProfile,
    signOut,
  }), [createAdmin, isAdmin, loading, sessionError, signIn, signOut, updateProfile, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
