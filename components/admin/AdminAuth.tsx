"use client";
import { useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

export default function AdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignIn(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      if (error) throw error;
    } catch (err) {
      const error = err as Error;
      setMessage(error.message ?? "Błąd logowania");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-muted px-3 py-2 text-sm font-medium text-foreground">{user.email}</div>
        <button onClick={handleSignOut} className="rounded-2xl bg-card border border-border px-3 py-2 text-sm font-medium hover:bg-muted text-foreground">
          Wyloguj
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <form onSubmit={handleSignIn} className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-9 rounded-2xl border border-border bg-input px-3 py-2 text-sm outline-none w-full sm:w-auto text-foreground"
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-9 rounded-2xl border border-border bg-input px-3 py-2 text-sm outline-none w-full sm:w-auto text-foreground"
        />
        <button type="submit" disabled={loading} className="w-full sm:w-auto rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          {loading ? "..." : "Zaloguj"}
        </button>
      </form>
      {message && <p className="text-[10px] text-destructive mr-2">{message}</p>}
    </div>
  );
}
