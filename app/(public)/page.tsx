import Link from "next/link"
import { ArrowRight, CalendarDays, ShieldCheck, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { services } from "@/lib/booking"
import BorderBeamCornerCutCard from "@/components/ui/border-beam-corner-cut-card/index"
import { Terminal, Zap } from "lucide-react"
export default function Home() {
  return (
    <main className='min-h-screen bg-background text-foreground'>
      <section className='relative overflow-hidden bg-linear-to-br from-background via-background to-muted py-24'>
        <div className='mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center'>
            <div className='max-w-2xl relative bg-[url(/hero.avif)] bg-cover bg-center rounded-[2rem] shadow-xl shadow-primary/10 overflow-hidden'>
              <div className='absolute inset-0 bg-background/40 backdrop-blur-[2px]' />
              <div className='relative z-10 p-10 space-y-6'>
                <span className='inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/20'>
                  <ShieldCheck className='mr-2 h-4 w-4' />
                  Bezpieczne rezerwacje online
                </span>
                <h1 className='text-5xl font-semibold tracking-tight text-foreground sm:text-6xl'>
                  Zarezerwuj wizytę u dentysty w mniej niż 30 sekund.
                </h1>
                <p className='max-w-2xl text-lg leading-8 text-foreground/90 font-medium'>
                  Najbardziej intuicyjny system rezerwacji dla pacjentów i
                  personelu. Premium design, szybki proces oraz pełna kontrola
                  nad grafikami kliniki.
                </p>
                <div className='flex flex-col gap-4 sm:flex-row'>
                  <Button asChild>
                    <Link
                      href='/booking'
                      className='inline-flex items-center gap-2 font-semibold text-primary'
                    >
                      Umów wizytę
                      <ArrowRight className='h-4 w-4' />
                    </Link>
                  </Button>
                  <Link
                    href='/admin/dashboard'
                    className='inline-flex items-center justify-center rounded-3xl border border-border bg-card px-5 py-1 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:bg-muted'
                  >
                    Panel administracyjny
                  </Link>
                </div>
              </div>
            </div>

            <div className='rounded-[2rem] border border-border bg-card p-8 shadow-xl shadow-primary/5'>
              <div className='space-y-6'>
                <div className='flex items-center gap-4 rounded-[1.75rem] bg-muted p-5'>
                  <CalendarDays className='h-7 w-7 text-primary' />
                  <div>
                    <p className='text-sm font-semibold uppercase tracking-[0.3em] '>
                      Umów w 3 krokach
                    </p>
                    <p className='text-sm '>
                      Wybierz usługę, termin i potwierdź dane.
                    </p>
                  </div>
                </div>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='rounded-3xl bg-muted p-5'>
                    <h3 className='text-sm font-semibold text-foreground'>
                      Szybka rezerwacja
                    </h3>
                    <p className='mt-3 text-sm '>
                      Zaplanuj wizytę bez czekania przez telefon.
                    </p>
                  </div>
                  <div className='rounded-3xl bg-muted p-5'>
                    <h3 className='text-sm font-semibold text-foreground'>
                      Kontrola personelu
                    </h3>
                    <p className='mt-3 text-sm '>
                      Grafik, statusy i blokady dni dostępne w panelu.
                    </p>
                  </div>
                  <div className='rounded-3xl bg-muted p-5'>
                    <h3 className='text-sm font-semibold text-foreground'>
                      Nowoczesny design
                    </h3>
                    <p className='mt-3 text-sm '>
                      Premium landing idealny dla kliniki stomatologicznej.
                    </p>
                  </div>
                  <div className='rounded-3xl bg-muted p-5'>
                    <h3 className='text-sm font-semibold text-foreground'>
                      Bezpieczeństwo
                    </h3>
                    <p className='mt-3 text-sm '>
                      Supabase Auth + Role Level Security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className='grid gap-6 lg:grid-cols-3'>
            {services.map((service) => (
              <BorderBeamCornerCutCard
                beamColor='pink'
                key={service.id}
                className='rounded-[2rem] border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
              >
                <div
                  className={`inline-flex rounded-3xl px-4 py-2 text-sm font-semibold ${service.accent}`}
                >
                  {service.durationMinutes} min
                </div>
                <h2 className='mt-6 text-xl font-semibold text-foreground'>
                  {service.name}
                </h2>
                <p className='mt-4 text-sm leading-6 '>{service.description}</p>
                <p className='mt-6 text-3xl font-semibold text-foreground'>
                  {service.price} zł
                </p>
              </BorderBeamCornerCutCard>
            ))}
          </section>

          <section className='grid gap-10 lg:grid-cols-3'>
            <div className='rounded-[2rem] border border-border bg-card p-8 shadow-sm'>
              <h3 className='text-lg font-semibold '>Jak to działa</h3>
              <ol className='mt-6 space-y-4 text-sm '>
                <li className='flex gap-3'>
                  <span className='font-semibold '>1.</span> Wybierz usługę i
                  termin.
                </li>
                <li className='flex gap-3'>
                  <span className='font-semibold '>2.</span> Wpisz dane
                  pacjenta.
                </li>
                <li className='flex gap-3'>
                  <span className='font-semibold '>3.</span> Potwierdź wizytę i
                  odbierz e-mail.
                </li>
              </ol>
            </div>
            <div className='rounded-[2rem] border border-border bg-card p-8 shadow-sm'>
              <h3 className='text-lg font-semibold text-foreground'>
                Opinie pacjentów
              </h3>
              <div className='mt-6 space-y-5 text-sm text-muted-foreground'>
                <blockquote className='rounded-3xl bg-muted text-foreground p-5'>
                  „Rezerwacja była szybka, jasna i wygląda profesjonalnie —
                  idealne dla mojej kliniki.”
                </blockquote>
                <blockquote className='rounded-3xl bg-muted text-foreground p-5'>
                  „Pacjenci doceniają prostotę i dostępne terminy w czasie
                  rzeczywistym.”
                </blockquote>
              </div>
            </div>
            <div className='rounded-[2rem] border border-border bg-card p-8 shadow-sm'>
              <h3 className='text-lg font-semibold text-foreground'>
                Dlaczego warto?
              </h3>
              <div className='mt-6 space-y-4 text-sm '>
                <p className='flex items-start gap-3'>
                  <Smile className='mt-1 h-5 w-5 text-primary' />
                  Przyjazny interfejs dla pacjenta.
                </p>
                <p className='flex items-start gap-3'>
                  <ArrowRight className='mt-1 h-5 w-5 text-primary' />
                  Moduł administracyjny dla personelu.
                </p>
                <p className='flex items-start gap-3'>
                  <CalendarDays className='mt-1 h-5 w-5 text-primary' />
                  Sterowanie godzinami pracy i wolnymi dniiami.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
