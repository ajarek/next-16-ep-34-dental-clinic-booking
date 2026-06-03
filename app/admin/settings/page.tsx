"use client";
import { useEffect, useState } from "react";
import { ListChecks, Building2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type ServiceRow = {
  id: string;
  name: string;
  duration_minutes: number;
  price: number;
  description: string | null;
};

export default function AdminSettingsPage() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, duration_minutes, price, description")
        .order("name", { ascending: true });

      if (!mounted) return;
      setServices(error ? [] : data ?? []);
      setLoading(false);
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] ">Ustawienia kliniki</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">Dane i usługi</h2>
          </div>
          <div className="rounded-3xl bg-muted px-4 py-3 text-sm ">
            {loading ? "Ładowanie usług..." : `${services.length} usług załadowano`}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 text-foreground">
            <Building2 className="h-5 w-5 text-primary" />
            <p className="font-semibold">Dane kliniki</p>
          </div>
          <div className="mt-6 space-y-4 text-sm ">
            <div className="rounded-3xl border border-border bg-muted px-4 py-4">
              <p className="font-semibold text-foreground">Klinika BlueDent</p>
              <p>Warszawa, ul. Zębowa 12</p>
            </div>
            <div className="rounded-3xl border border-border bg-muted px-4 py-4">
              <p className="font-semibold text-foreground">Gabinetów</p>
              <p>3</p>
            </div>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 text-foreground">
            <ListChecks className="h-5 w-5 text-primary" />
            <p className="font-semibold">Usługi</p>
          </div>
          <div className="mt-6 space-y-4 text-sm ">
            {services.length === 0 ? (
              <div className="rounded-3xl border border-border bg-muted px-4 py-4">Brak usług w bazie danych.</div>
            ) : (
              services.map((service) => (
                <div key={service.id} className="rounded-3xl border border-border bg-muted px-4 py-4">
                  <p className="font-semibold text-foreground">{service.name}</p>
                  <p>{service.duration_minutes} min — {service.price} zł</p>
                  {service.description ? <p className="mt-1 ">{service.description}</p> : null}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
