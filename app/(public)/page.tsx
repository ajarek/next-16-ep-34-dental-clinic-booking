import Link from "next/link";
import { ArrowRight, CalendarDays, ShieldCheck, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/booking";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-slate-100 py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="max-w-2xl space-y-6">
              <span className="inline-flex items-center rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 ring-1 ring-sky-200">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Bezpieczne rezerwacje online
              </span>
              <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                Zarezerwuj wizytę u dentysty w mniej niż 30 sekund.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Najbardziej intuicyjny system rezerwacji dla pacjentów i personelu. Premium design, szybki proces oraz pełna kontrola nad grafikami kliniki.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild>
                  <Link href="/booking" className="inline-flex items-center gap-2">
                    Umów wizytę
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Link href="/admin/dashboard" className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                  Panel administracyjny
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
              <div className="space-y-6">
                <div className="flex items-center gap-4 rounded-[1.75rem] bg-slate-50 p-5">
                  <CalendarDays className="h-7 w-7 text-sky-600" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">Umów w 3 krokach</p>
                    <p className="text-sm text-slate-600">Wybierz usługę, termin i potwierdź dane.</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <h3 className="text-sm font-semibold text-slate-900">Szybka rezerwacja</h3>
                    <p className="mt-3 text-sm text-slate-600">Zaplanuj wizytę bez czekania przez telefon.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <h3 className="text-sm font-semibold text-slate-900">Kontrola personelu</h3>
                    <p className="mt-3 text-sm text-slate-600">Grafik, statusy i blokady dni dostępne w panelu.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <h3 className="text-sm font-semibold text-slate-900">Nowoczesny design</h3>
                    <p className="mt-3 text-sm text-slate-600">Premium landing idealny dla kliniki stomatologicznej.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <h3 className="text-sm font-semibold text-slate-900">Bezpieczeństwo</h3>
                    <p className="mt-3 text-sm text-slate-600">Supabase Auth + Role Level Security.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className={`inline-flex rounded-3xl px-4 py-2 text-sm font-semibold ${service.accent}`}>
                  {service.durationMinutes} min
                </div>
                <h2 className="mt-6 text-xl font-semibold text-slate-950">{service.name}</h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p>
                <p className="mt-6 text-3xl font-semibold text-slate-950">{service.price} zł</p>
              </div>
            ))}
          </section>

          <section className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">Jak to działa</h3>
              <ol className="mt-6 space-y-4 text-sm text-slate-600">
                <li className="flex gap-3"><span className="font-semibold text-slate-900">1.</span> Wybierz usługę i termin.</li>
                <li className="flex gap-3"><span className="font-semibold text-slate-900">2.</span> Wpisz dane pacjenta.</li>
                <li className="flex gap-3"><span className="font-semibold text-slate-900">3.</span> Potwierdź wizytę i odbierz e-mail.</li>
              </ol>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">Opinie pacjentów</h3>
              <div className="mt-6 space-y-5 text-sm text-slate-600">
                <blockquote className="rounded-3xl bg-slate-50 p-5">„Rezerwacja była szybka, jasna i wygląda profesjonalnie — idealne dla mojej kliniki.”</blockquote>
                <blockquote className="rounded-3xl bg-slate-50 p-5">„Pacjenci doceniają prostotę i dostępne terminy w czasie rzeczywistym.”</blockquote>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">Dlaczego warto?</h3>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <p className="flex items-start gap-3"><Smile className="mt-1 h-5 w-5 text-sky-500" />Przyjazny interfejs dla pacjenta.</p>
                <p className="flex items-start gap-3"><ArrowRight className="mt-1 h-5 w-5 text-sky-500" />Moduł administracyjny dla personelu.</p>
                <p className="flex items-start gap-3"><CalendarDays className="mt-1 h-5 w-5 text-sky-500" />Sterowanie godzinami pracy i wolnymi dniami.</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
