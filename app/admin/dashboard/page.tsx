"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CheckCircle2 } from "lucide-react";

export default function AdminDashboardClient() {
  const [todayCount, setTodayCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const today = new Date().toISOString().slice(0, 10);
      try {
        const [{ count: t }, { count: total }, { count: comp }] = await Promise.all([
          supabase.from("appointments").select("id", { head: true, count: "exact" }).eq("appointment_date", today),
          supabase.from("appointments").select("id", { head: true, count: "exact" }),
          supabase.from("appointments").select("id", { head: true, count: "exact" }).eq("status", "Zrealizowana"),
        ]);

        if (!mounted) return;
        setTodayCount((t as number) ?? 0);
        setTotalCount((total as number) ?? 0);
        setCompleted((comp as number) ?? 0);
      } catch (err) {
        console.error("Błąd ładowania danych dashboardu:", err);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-[1.75rem] border border-border bg-muted p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] ">Dzisiejsze wizyty</p>
          <p className="mt-4 text-4xl font-semibold text-foreground">{todayCount}</p>
          <p className="mt-2 text-sm ">Wizyt zaplanowanych na dzisiaj</p>
        </div>
        <div className="rounded-[1.75rem] border border-border bg-muted p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] ">Liczba rezerwacji</p>
          <p className="mt-4 text-4xl font-semibold text-foreground">{totalCount}</p>
          <p className="mt-2 text-sm ">Wszystkie aktywne rezerwacje</p>
        </div>
        <div className="rounded-[1.75rem] border border-border bg-muted p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] ">Zrealizowane</p>
          <p className="mt-4 text-4xl font-semibold text-foreground">{completed}</p>
          <p className="mt-2 text-sm ">Wizyt z zakończonym statusem</p>
        </div>
      </div>

      <section className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
        <div className="flex items-center gap-3 text-foreground">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Przegląd grafiku</h2>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[1.75rem] border border-border bg-muted p-5">
            <p className="text-sm t">Najbliższa wizyta</p>
            <p className="mt-4 text-xl font-semibold text-foreground">Sprawdź listę rezerwacji</p>
            <p className="mt-1 text-sm t">Kliknij w zakładkę Rezerwacje, aby zarządzać terminami</p>
          </div>
          <div className="rounded-[1.75rem] border border-border bg-muted p-5">
            <p className="text-sm t">Status systemu</p>
            <p className="mt-4 text-xl font-semibold text-foreground">Online</p>
            <p className="mt-1 text-sm t">Supabase Realtime gotowy do pracy</p>
          </div>
        </div>
      </section>
    </div>
  );
}
