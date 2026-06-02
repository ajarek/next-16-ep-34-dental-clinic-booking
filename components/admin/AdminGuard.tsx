"use client";
import { useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      const u = session?.user ?? null;
      if (!mounted) return;
      setUser(u);
      
      const r = (u?.app_metadata?.role as string) || (u?.user_metadata?.role as string) || null;
      setRole(r);
      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      const u = sess?.user ?? null;
      setUser(u);
      const r = (u?.app_metadata?.role as string) || (u?.user_metadata?.role as string) || null;
      setRole(r);
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div className="p-6">Ładowanie...</div>;

  if (!user) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-700">Zaloguj się, aby uzyskać dostęp do panelu administracyjnego.</p>
        {/* AdminAuth is rendered in AdminShell header as login form */}
      </div>
    );
  }

  if (!role || (role !== "admin" && role !== "staff")) {
    return <div className="p-6 text-sm text-red-600">Brak uprawnień. Skontaktuj się z administratorem.</div>;
  }

  return <>{children}</>;
}
