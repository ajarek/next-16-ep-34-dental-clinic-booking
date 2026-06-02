import Link from "next/link";
import { ArrowLeft, Calendar, Clock3, Info } from "lucide-react";
import { parseISO } from "date-fns";
import { getServiceById, getTimeSlots, getWeekDays, isDateBlocked, formatDateLabel, formatDateShort } from "@/lib/booking";

interface BookingDatePageProps {
  searchParams: Promise<{
    serviceId?: string;
    date?: string;
  }>;
}

export default async function BookingDatePage({ searchParams }: BookingDatePageProps) {
  const params = await searchParams;
  const service = getServiceById(params.serviceId);
  const selectedDate = params.date ? parseISO(params.date) : new Date();
  const dateOptions = getWeekDays(selectedDate);

  if (!service) {
    return (
      <main className="min-h-screen bg-slate-50 py-24 text-slate-950">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-lg">
          <p className="text-sm font-semibold text-slate-600">Nie wybrano usługi</p>
          <p className="mt-4 text-xl font-semibold">Wybierz usługę w zakładce rezerwacja.</p>
          <Link href="/booking" className="mt-8 inline-flex rounded-3xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700">
            Wróć do wyboru usługi
          </Link>
        </div>
      </main>
    );
  }

  const slots = getTimeSlots(service.durationMinutes);
  const selectedIso = formatDateShort(selectedDate);

  return (
    <main className="min-h-screen bg-slate-50 py-20 text-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Krok 2 — wybierz termin</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950">{service.name}</h1>
            </div>
            <Link href="/booking" className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <ArrowLeft className="h-4 w-4" /> Wróć do usług
            </Link>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Godziny pracy</p>
            <p className="mt-2 text-sm text-slate-600">09:00 - 18:00, z przerwą 13:00 - 14:00</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-sky-600" />
              <p className="text-sm font-semibold text-slate-900">Wybierz dzień</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {dateOptions.map((date) => {
                const iso = formatDateShort(date);
                const isBlocked = isDateBlocked(date);
                const isActive = iso === selectedIso;
                return (
                  <Link
                    key={iso}
                    href={`/booking/date?serviceId=${service.id}&date=${iso}`}
                    className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition ${isBlocked ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400" : "border-slate-200 bg-white text-slate-900 hover:border-sky-300 hover:bg-sky-50"} ${isActive ? "border-sky-500 bg-sky-50 text-sky-700" : ""}`}
                  >
                    <span className="block">{formatDateLabel(date)}</span>
                    <span className="mt-1 block text-xs text-slate-500">{isBlocked ? "Niedostępny" : "Dostępny"}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-sky-600" />
              <p className="text-sm font-semibold text-slate-900">Wybierz godzinę</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {slots.map((time) => (
                <Link
                  key={time}
                  href={`/booking/details?serviceId=${service.id}&date=${selectedIso}&time=${time}`}
                  className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-300 hover:bg-sky-50"
                >
                  {time}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-slate-500" />
              <p className="text-sm text-slate-600">Pamiętaj, że przerwa kliniki między 13:00 a 14:00 jest automatycznie pomijana.</p>
            </div>
          </div>
        </section>

        <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Twój wybór</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">{service.name}</h2>
            <p className="mt-3 text-sm text-slate-600">{service.description}</p>
            <div className="mt-5 space-y-2 text-sm text-slate-700">
              <p>Cena: <span className="font-semibold text-slate-950">{service.price} zł</span></p>
              <p>Czas trwania: <span className="font-semibold text-slate-950">{service.durationMinutes} min</span></p>
              <p>Wybrany dzień: <span className="font-semibold text-slate-950">{formatDateLabel(selectedDate)}</span></p>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Następny krok</p>
            <p className="mt-3 text-sm text-slate-600">Wybierz dostępny termin, aby przejść do danych pacjenta i potwierdzenia.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
