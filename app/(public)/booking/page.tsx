import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/booking";
import { ServiceCard } from "@/components/booking/ServiceCard";

export default function BookingHome() {
  return (
    <main className="min-h-screen bg-slate-50 py-20 text-slate-950">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-lg">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Rezerwacja wizyty</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Wybierz usługę</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Prosty proces rezerwacji w kilku krokach, zaprojektowany dla pacjentów i recepcji kliniki.</p>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100">
              Powrót na stronę główną
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </main>
  );
}
