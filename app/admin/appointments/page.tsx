"use client";
import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type ServiceLookup = Record<string, string>;

type AppointmentRow = {
  id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string | null;
};

export default function AdminAppointmentsPageClient() {
  const [appointments, setAppointments] = useState<{
    id: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    service: string;
    date: string;
    time: string;
    status: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const serviceMapRef = useRef<ServiceLookup>({});

  async function handleUpdateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id);
    
    if (error) {
      alert("Błąd aktualizacji statusu: " + error.message);
    }
  }

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);

      const [servicesResult, appointmentsResult] = await Promise.all([
        supabase.from("services").select("id, name"),
        supabase
          .from("appointments")
          .select("id, service_id, patient_name, patient_email, patient_phone, appointment_date, appointment_time, status")
          .order("appointment_date", { ascending: true })
          .limit(500),
      ]);

      if (!mounted) return;

      const services = (servicesResult.data ?? []) as { id: string; name: string }[];
      const serviceLookup = Object.fromEntries(services.map((service) => [service.id, service.name]));
      serviceMapRef.current = serviceLookup;

      if (appointmentsResult.error) {
        setAppointments([]);
      } else {
        setAppointments(
          (appointmentsResult.data as AppointmentRow[]).map((row) => ({
            id: row.id,
            patientName: row.patient_name,
            patientEmail: row.patient_email,
            patientPhone: row.patient_phone,
            service: serviceLookup[row.service_id] ?? row.service_id,
            date: row.appointment_date,
            time: row.appointment_time,
            status: row.status ?? "Oczekująca",
          }))
        );
      }

      setLoading(false);
    };

    load();

    const sub = supabase
      .channel("public:appointments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "appointments" },
        (payload) => {
          setAppointments((prev) => [
            ...prev,
            {
              id: payload.new.id,
              patientName: payload.new.patient_name,
              patientEmail: payload.new.patient_email,
              patientPhone: payload.new.patient_phone,
              service: serviceMapRef.current[payload.new.service_id] ?? payload.new.service_id,
              date: payload.new.appointment_date,
              time: payload.new.appointment_time,
              status: payload.new.status,
            },
          ]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "appointments" },
        (payload) => {
          setAppointments((prev) =>
            prev.map((item) =>
              item.id === payload.new.id
                ? {
                    ...item,
                    status: payload.new.status,
                    date: payload.new.appointment_date,
                    time: payload.new.appointment_time,
                  }
                : item
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "appointments" },
        (payload) => {
          setAppointments((prev) => prev.filter((item) => item.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      try {
        sub.unsubscribe();
      } catch {}
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Zarządzanie rezerwacjami</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">Rezerwacje pacjentów</h2>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <MoreHorizontal className="h-4 w-4" /> Eksportuj CSV
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted ">
            <tr>
              <th className="px-6 py-4 font-semibold">Pacjent</th>
              <th className="px-6 py-4 font-semibold">Usługa</th>
              <th className="px-6 py-4 font-semibold">Data</th>
              <th className="px-6 py-4 font-semibold">Godzina</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center ">Ładowanie...</td>
              </tr>
            ) : (
              appointments.map((item) => (
                <tr key={item.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium text-foreground">{item.patientName}</td>
                  <td className="px-6 py-4 ">{item.service}</td>
                  <td className="px-6 py-4 ">{item.date}</td>
                  <td className="px-6 py-4 ">{item.time}</td>
                  <td className="px-6 py-4 ">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      item.status === 'Zrealizowana' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'Anulowana' ? 'bg-red-100 text-red-700' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleUpdateStatus(item.id, "Anulowana")}
                        className="rounded-3xl border border-border bg-muted px-3 py-2 text-xs font-semibold  transition hover:bg-muted/80"
                      >
                        Anuluj
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(item.id, "Zrealizowana")}
                        className="rounded-3xl border border-border bg-muted px-3 py-2 text-xs font-semibold  transition hover:bg-muted/80"
                      >
                        Zrealizowano
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
