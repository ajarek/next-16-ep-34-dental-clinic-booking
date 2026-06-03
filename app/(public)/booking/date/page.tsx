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
      <main className="min-h-screen bg-background py-24 text-foreground">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-card p-10 shadow-lg">
          <p className="text-sm font-semibold text-muted-foreground">Nie wybrano usługi</p>
          <p className="mt-4 text-xl font-semibold">Wybierz usługę w zakładce rezerwacja.</p>
          <Link href="/booking" className="mt-8 inline-flex rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Wróć do wyboru usługi
          </Link>
        </div>
      </main>
    );
  }

  const slots = getTimeSlots(service.durationMinutes);
  const selectedIso = formatDateShort(selectedDate);

  return (
    <main className="min-h-screen bg-background py-20 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="space-y-8 rounded-[2rem] border border-border bg-card p-10 shadow-lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Krok 2 — wybierz termin</p>
              <h1 className="mt-3 text-3xl font-semibold text-foreground">{service.name}</h1>
            </div>
            <Link href="/booking" className="inline-flex items-center gap-2 rounded-3xl border border-border bg-muted px-4 py-3 text-sm font-semibold  hover:bg-muted/80">
              <ArrowLeft className="h-4 w-4" /> Wróć do usług
            </Link>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-muted p-6">
            <p className="text-sm font-semibold text-foreground">Godziny pracy</p>
            <p className="mt-2 text-sm ">09:00 - 18:00, z przerwą 13:00 - 14:00</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">Wybierz dzień</p>
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
                    className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition ${isBlocked ? "cursor-not-allowed border-border bg-muted " : "border-border bg-card  hover:border-primary/50 hover:bg-primary/10"} ${isActive ? "border-primary bg-primary/10 " : ""}`}
                  >
                    <span className="block">{formatDateLabel(date)}</span>
                    <span className="mt-1 block text-xs ">{isBlocked ? "Niedostępny" : "Dostępny"}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">Wybierz godzinę</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {slots.map((time) => (
                <Link
                  key={time}
                  href={`/booking/details?serviceId=${service.id}&date=${selectedIso}&time=${time}`}
                  className="rounded-3xl border-2 border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:bg-primary/10"
                >
                  {time}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-muted p-6">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 " />
              <p className="text-sm ">Pamiętaj, że przerwa kliniki między 13:00 a 14:00 jest automatycznie pomijana.</p>
            </div>
          </div>
        </section>

        <aside className="space-y-6 rounded-[2rem] border border-border bg-card p-8 shadow-lg">
          <div className="rounded-[1.75rem] border border-border bg-muted p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] ">Twój wybór</p>
            <h2 className="mt-4 text-2xl font-semibold text-foreground">{service.name}</h2>
            <p className="mt-3 text-sm ">{service.description}</p>
            <div className="mt-5 space-y-2 text-sm ">
              <p>Cena: <span className="font-semibold text-foreground">{service.price} zł</span></p>
              <p>Czas trwania: <span className="font-semibold text-foreground">{service.durationMinutes} min</span></p>
              <p>Wybrany dzień: <span className="font-semibold text-foreground">{formatDateLabel(selectedDate)}</span></p>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-border bg-muted p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] ">Następny krok</p>
            <p className="mt-3 text-sm ">Wybierz dostępny termin, aby przejść do danych pacjenta i potwierdzenia.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
