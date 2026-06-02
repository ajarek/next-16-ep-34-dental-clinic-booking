import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, User } from "lucide-react";
import { parseISO } from "date-fns";
import { getServiceById, formatDateLabel, formatDateShort } from "@/lib/booking";

interface BookingDetailsPageProps {
  searchParams: Promise<{
    serviceId?: string;
    date?: string;
    time?: string;
  }>;
}

import { supabase } from "@/lib/supabaseClient";

async function createBooking(data: FormData) {
  "use server";

  const serviceId = data.get("serviceId")?.toString();
  const date = data.get("date")?.toString();
  const time = data.get("time")?.toString();
  const patientName = data.get("patientName")?.toString();
  const patientEmail = data.get("patientEmail")?.toString();
  const patientPhone = data.get("patientPhone")?.toString();
  const consent = data.get("consent")?.toString();

  if (!serviceId || !date || !time || !patientName || !patientEmail || !patientPhone || consent !== "on") {
    return;
  }

  const { error } = await supabase.from("appointments").insert({
    service_id: serviceId,
    appointment_date: date,
    appointment_time: time,
    patient_name: patientName,
    patient_email: patientEmail,
    patient_phone: patientPhone,
    status: "Oczekująca",
  });

  if (error) {
    console.error("Błąd tworzenia rezerwacji:", error.message);
    // Ideally we'd return an error to the UI, but for now we'll just not redirect if it fails
    // or we can redirect to an error page.
    return;
  }

  redirect(
    `/booking/confirmation?serviceId=${encodeURIComponent(serviceId)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&patientName=${encodeURIComponent(patientName)}`
  );
}

export default async function BookingDetailsPage({ searchParams }: BookingDetailsPageProps) {
  const params = await searchParams;
  const service = getServiceById(params.serviceId);
  const selectedDate = params.date ? parseISO(params.date) : undefined;
  const selectedTime = params.time;

  if (!service || !selectedDate || !selectedTime) {
    return (
      <main className="min-h-screen bg-slate-50 py-24 text-slate-950">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-lg">
          <p className="text-sm font-semibold text-slate-600">Brak danych rezerwacji</p>
          <p className="mt-4 text-xl font-semibold">Wybierz najpierw usługę, datę i godzinę.</p>
          <Link href="/booking" className="mt-8 inline-flex rounded-3xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700">
            Wróć do wyboru usługi
          </Link>
        </div>
      </main>
    );
  }

  const dateLabel = formatDateLabel(selectedDate);
  const dateIso = formatDateShort(selectedDate);

  return (
    <main className="min-h-screen bg-slate-50 py-20 text-slate-950">
      <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Krok 3 — dane pacjenta</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950">Potwierdź wizytę</h1>
            </div>
            <Link href={`/booking/date?serviceId=${service.id}&date=${dateIso}`} className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <ArrowLeft className="h-4 w-4" /> Wróć do wyboru godziny
            </Link>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <form action={createBooking} className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
              <input type="hidden" name="serviceId" value={service.id} />
              <input type="hidden" name="date" value={dateIso} />
              <input type="hidden" name="time" value={selectedTime} />
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-900">
                  <User className="h-5 w-5 text-sky-600" />
                  <p className="font-semibold">Dane pacjenta</p>
                </div>
                <label className="block text-sm font-medium text-slate-700">
                  Imię i nazwisko
                  <input name="patientName" type="text" required className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                  <input name="patientEmail" type="email" required className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Telefon
                  <input name="patientPhone" type="tel" required className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
                </label>
              </div>

              <label className="inline-flex items-center gap-3 text-sm text-slate-700">
                <input name="consent" type="checkbox" required className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                Wyrażam zgody RODO na kontakt w sprawie rezerwacji.
              </label>

              <button type="submit" className="inline-flex w-full items-center justify-center rounded-3xl bg-sky-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-sky-700">
                Potwierdź wizytę
              </button>
            </form>

            <aside className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-3 text-slate-900">
                  <CheckCircle2 className="h-5 w-5 text-sky-600" />
                  <p className="font-semibold">Podsumowanie wizyty</p>
                </div>
                <div className="mt-5 space-y-3 text-sm text-slate-700">
                  <p>Usługa: <span className="font-semibold text-slate-950">{service.name}</span></p>
                  <p>Data: <span className="font-semibold text-slate-950">{dateLabel}</span></p>
                  <p>Godzina: <span className="font-semibold text-slate-950">{selectedTime}</span></p>
                  <p>Cena: <span className="font-semibold text-slate-950">{service.price} zł</span></p>
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Informacje</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">Po potwierdzeniu wizyty otrzymasz e-mail z prośbą o potwierdzenie terminu i przypomnieniem.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
