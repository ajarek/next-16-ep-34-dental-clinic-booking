import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/booking";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/booking/date?serviceId=${service.id}`}
      className="group block overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {service.name}
          </p>
          <p className="mt-4 text-2xl font-semibold text-foreground">{service.price} zł</p>
        </div>
        <div className={`rounded-3xl px-3 py-2 text-sm font-semibold ${service.accent}`}>
          {service.durationMinutes} min
        </div>
      </div>

      <p className="mt-6 text-sm leading-6 text-muted-foreground">{service.description}</p>

      <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-primary">
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        Wybierz termin
      </div>
    </Link>
  );
}
