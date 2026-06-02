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
      <main className="min-h-screen bg-slate-50 py-24 text-slate-950">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-lg">
          <p className="text-sm font-semibold text-slate-600">Brak potwierdzenia</p>
          <p className="mt-4 text-xl font-semibold">Proszę wrócić do procesu rezerwacji.</p>
          <Link href="/booking" className="mt-8 inline-flex rounded-3xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700">
            Wróć do rezerwacji
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-20 text-slate-950">
      <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-lg">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 text-sky-700">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-semibold text-slate-950">Wizyta zapisana!</h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">Dziękujemy, {params.patientName}. Twoja rezerwacja została przyjęta. Otrzymasz potwierdzenie na adres e-mail.</p>
          </div>

          <div className="mt-10 grid gap-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
            <div className="flex items-center gap-3 text-slate-900">
              <Mail className="h-5 w-5 text-sky-600" />
              <p className="font-semibold">Email potwierdzenia</p>
            </div>
            <p className="text-sm text-slate-600">{params.patientName}, wkrótce otrzymasz e-mail z ustawieniami wizyty oraz przypomnieniem.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Usługa</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{service.name}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Data</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{formatDateLabel(date)}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Godzina</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{params.time}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Cena</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{service.price} zł</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Link href="/" className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-100">
              Powrót do strony głównej
            </Link>
            <Link href="/admin/dashboard" className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-4 text-sm font-semibold text-white hover:bg-sky-700">
              Sprawdź panel administracyjny
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
