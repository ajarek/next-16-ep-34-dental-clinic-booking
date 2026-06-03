import Link from "next/link";
import { CheckCircle2, Mail } from "lucide-react";
import { parseISO } from "date-fns";
import { getServiceById, formatDateLabel } from "@/lib/booking";

interface BookingConfirmationPageProps {
  searchParams: Promise<{
    serviceId?: string;
    date?: string;
    time?: string;
    patientName?: string;
  }>;
}

export default async function BookingConfirmationPage({ searchParams }: BookingConfirmationPageProps) {
  const params = await searchParams;
  const service = getServiceById(params.serviceId);
  const date = params.date ? parseISO(params.date) : undefined;

  if (!service || !date || !params.time || !params.patientName) {
    return (
      <main className="min-h-screen bg-background py-24 text-foreground">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-card p-10 shadow-lg">
          <p className="text-sm font-semibold text-muted-foreground">Brak potwierdzenia</p>
          <p className="mt-4 text-xl font-semibold">Proszę wrócić do procesu rezerwacji.</p>
          <Link href="/booking" className="mt-8 inline-flex rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Wróć do rezerwacji
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-20 text-foreground">
      <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-card p-12 shadow-lg">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-semibold text-foreground">Wizyta zapisana!</h1>
            <p className="max-w-2xl text-lg leading-7 text-muted-foreground">Dziękujemy, {params.patientName}. Twoja rezerwacja została przyjęta. Otrzymasz potwierdzenie na adres e-mail.</p>
          </div>

          <div className="mt-10 grid gap-6 rounded-[1.75rem] border border-border bg-muted p-8">
            <div className="flex items-center gap-3 text-foreground">
              <Mail className="h-5 w-5 text-primary" />
              <p className="font-semibold">Email potwierdzenia</p>
            </div>
            <p className="text-sm text-muted-foreground">{params.patientName}, wkrótce otrzymasz e-mail z ustawieniami wizyty oraz przypomnieniem.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Usługa</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{service.name}</p>
              </div>
              <div className="rounded-3xl bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{formatDateLabel(date)}</p>
              </div>
              <div className="rounded-3xl bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Godzina</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{params.time}</p>
              </div>
              <div className="rounded-3xl bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Cena</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{service.price} zł</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Link href="/" className="inline-flex items-center justify-center rounded-3xl border border-border bg-card px-6 py-4 text-sm font-semibold text-foreground hover:bg-muted">
              Powrót do strony głównej
            </Link>
            <Link href="/admin/dashboard" className="inline-flex items-center justify-center rounded-3xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Sprawdź panel administracyjny
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
