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
      <main className="min-h-screen bg-background py-24 text-foreground">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-card p-10 shadow-lg">
          <p className="text-sm font-semibold text-muted-foreground">Brak danych rezerwacji</p>
          <p className="mt-4 text-xl font-semibold">Wybierz najpierw usługę, datę i godzinę.</p>
          <Link href="/booking" className="mt-8 inline-flex rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Wróć do wyboru usługi
          </Link>
        </div>
      </main>
    );
  }

  const dateLabel = formatDateLabel(selectedDate);
  const dateIso = formatDateShort(selectedDate);

  return (
    <main className="min-h-screen bg-background py-20 text-foreground">
      <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-card p-10 shadow-lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Krok 3 — dane pacjenta</p>
              <h1 className="mt-3 text-3xl font-semibold text-foreground">Potwierdź wizytę</h1>
            </div>
            <Link href={`/booking/date?serviceId=${service.id}&date=${dateIso}`} className="inline-flex items-center gap-2 rounded-3xl border border-border bg-muted px-4 py-3 text-sm font-semibold  hover:bg-muted/80">
              <ArrowLeft className="h-4 w-4" /> Wróć do wyboru godziny
            </Link>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <form action={createBooking} className="space-y-6 rounded-[1.75rem] border border-border bg-muted p-8">
              <input type="hidden" name="serviceId" value={service.id} />
              <input type="hidden" name="date" value={dateIso} />
              <input type="hidden" name="time" value={selectedTime} />
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-foreground">
                  <User className="h-5 w-5 text-primary" />
                  <p className="font-semibold">Dane pacjenta</p>
                </div>
                <label className="block text-sm font-medium ">
                  Imię i nazwisko
                  <input name="patientName" type="text" required className="mt-2 w-full rounded-3xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </label>
                <label className="block text-sm font-medium ">
                  Email
                  <input name="patientEmail" type="email" required className="mt-2 w-full rounded-3xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </label>
                <label className="block text-sm font-medium ">
                  Telefon
                  <input name="patientPhone" type="tel" required className="mt-2 w-full rounded-3xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </label>
              </div>

              <label className="inline-flex items-center gap-3 text-sm ">
                <input name="consent" type="checkbox" required className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                Wyrażam zgody RODO na kontakt w sprawie rezerwacji.
              </label>

              <button type="submit" className="inline-flex w-full items-center justify-center rounded-3xl bg-primary px-5 py-2 text-lg font-semibold text-primary-foreground transition hover:bg-primary/90">
                Potwierdź wizytę
              </button>
            </form>

            <aside className="space-y-6 rounded-[1.75rem] border border-border bg-card p-8 shadow-sm">
              <div className="rounded-[1.75rem] border border-border bg-muted p-6">
                <div className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="font-semibold">Podsumowanie wizyty</p>
                </div>
                <div className="mt-5 space-y-3 text-sm ">
                  <p>Usługa: <span className="font-semibold ">{service.name}</span></p>
                  <p>Data: <span className="font-semibold ">{dateLabel}</span></p>
                  <p>Godzina: <span className="font-semibold ">{selectedTime}</span></p>
                  <p>Cena: <span className="font-semibold ">{service.price} zł</span></p>
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-border bg-muted p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] ">Informacje</p>
                <p className="mt-3 text-sm leading-6 ">Po potwierdzeniu wizyty otrzymasz e-mail z prośbą o potwierdzenie terminu i przypomnieniem.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
