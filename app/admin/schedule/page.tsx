"use client";
import { useEffect, useState } from "react";
import { CalendarDays, Pause } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type BusinessHourRow = {
  id: number;
  day_of_week: number;
  open_time: string;
  close_time: string;
  break_start: string | null;
  break_end: string | null;
};

type BlockedDateRow = {
  id: number;
  blocked_date: string;
  reason: string;
};

const dayLabels = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

export default function AdminSchedulePage() {
  const [businessHours, setBusinessHours] = useState<BusinessHourRow[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDateRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);

      const [hoursResult, blockedResult] = await Promise.all([
        supabase.from("business_hours").select("*").order("day_of_week", { ascending: true }),
        supabase.from("blocked_dates").select("*").order("blocked_date", { ascending: true }),
      ]);

      if (!mounted) return;

      setBlockedDates(blockedResult.data ?? []);
      setBusinessHours(hoursResult.data ?? []);
      setLoading(false);
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Harmonogram pracy</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Godziny otwarcia i blokady</h2>
          </div>
          <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            {loading ? "Ładowanie danych..." : "Dane pobrane z Supabase"}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-slate-900">
            <CalendarDays className="h-5 w-5 text-sky-600" />
            <p className="font-semibold">Godziny pracy</p>
          </div>
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            {businessHours.length === 0 ? (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 px-4 py-3">Brak ustawionych godzin pracy.</div>
            ) : (
              businessHours.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 rounded-3xl border border-slate-100 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <span>{dayLabels[item.day_of_week] ?? `Dzień ${item.day_of_week}`}</span>
                  <span className="font-semibold text-slate-950">
                    {item.open_time} – {item.close_time}
                    {item.break_start && item.break_end ? ` (przerwa ${item.break_start} – ${item.break_end})` : ""}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-slate-900">
            <Pause className="h-5 w-5 text-slate-500" />
            <p className="font-semibold">Blokowane dni</p>
          </div>
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            {blockedDates.length === 0 ? (
              <div className="rounded-3xl border border-slate-100 bg-slate-50 px-4 py-3">Brak zdefiniowanych blokad.</div>
            ) : (
              blockedDates.map((block) => (
                <div key={block.id} className="rounded-3xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="font-semibold text-slate-950">{block.blocked_date}</p>
                  <p>{block.reason}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
