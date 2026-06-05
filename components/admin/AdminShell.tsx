import Link from "next/link";
import { LayoutDashboard, CalendarDays, ClipboardList, Settings2, ShieldCheck, HomeIcon } from "lucide-react";
import AdminAuth from "@/components/admin/AdminAuth";
import AdminGuard from "@/components/admin/AdminGuard";
import { ModeToggle } from "@/components/ModeToggle";

const navigation = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/appointments", label: "Rezerwacje", icon: ClipboardList },
  { href: "/admin/schedule", label: "Harmonogram", icon: CalendarDays },
  { href: "/admin/settings", label: "Ustawienia", icon: Settings2 },
  { href: "/", label: "Strona główna", icon: HomeIcon },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-400 gap-8 px-4 py-8 lg:px-8">
        <aside className="hidden w-80 shrink-0 rounded-[2rem] border border-border bg-card p-6 shadow-lg lg:block">
          <div className="mb-10 flex items-center gap-3 rounded-3xl bg-muted p-5 text-foreground">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-primary">Panel admina</p>
              <p className="mt-1 text-sm ">Zarządzaj grafikami i rezerwacjami</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium  transition hover:bg-muted hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 rounded-[2rem] border border-border bg-card p-6 shadow-lg">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] ">System zarządzania</p>
              <h1 className="mt-2 text-3xl font-semibold text-foreground">Klinika dentystyczna</h1>
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <div className="rounded-3xl border border-border bg-muted px-4 py-2 text-sm ">Supabase Auth + RLS</div>
              <AdminAuth />
            </div>
          </div>
          <AdminGuard>{children}</AdminGuard>
        </main>
      </div>
    </div>
  );
}
